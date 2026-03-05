"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Volume2, VolumeX, Navigation } from "lucide-react";

// ---- Types ----
interface RouteStep {
  instruction: string;
  distance: number; // meters
  location: [number, number]; // [lng, lat] from OSRM
}

// ---- Helper: distance between two [lat,lng] points in meters ----
function haversineDistance(a: [number, number], b: [number, number]): number {
  const R = 6371000;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const sinHalf = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(sinHalf), Math.sqrt(1 - sinHalf));
}

// ---- Hook: fit map once when route loads ----
function AdjustMapBounds({
  origin,
  destination,
  showRoute,
  routePoints,
}: {
  origin: [number, number] | null;
  destination: [number, number];
  showRoute: boolean;
  routePoints: [number, number][];
}) {
  const map = useMap();
  const hasFit = useRef(false);

  useEffect(() => {
    if (showRoute && origin && routePoints.length > 0 && !hasFit.current) {
      // Fit bounds once to show the full route with padding for UI controls
      map.fitBounds(L.latLngBounds(routePoints), {
        paddingTopLeft: [60, 100],
        paddingBottomRight: [60, 80],
      });
      hasFit.current = true;
    } else if (!showRoute) {
      map.setView(destination, 15);
      hasFit.current = false;
    }
  }, [map, origin, destination, showRoute, routePoints]);

  return null;
}

// ---- Component ----
interface MapEmbedProps {
  destinationLat: number;
  destinationLng: number;
  showRoute: boolean;
}

export function MapEmbed({ destinationLat, destinationLng, showRoute }: MapEmbedProps) {
  const [mounted, setMounted] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ duration: number; distance: number } | null>(null);
  const [destinationAddress, setDestinationAddress] = useState<string | null>(null);

  // Turn-by-turn state
  const [routeSteps, setRouteSteps] = useState<RouteStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [currentInstruction, setCurrentInstruction] = useState<string | null>(null);
  const lastAnnouncedStepRef = useRef(-1);

  // Origin icon — standard blue marker for user's current location
  const userIcon = typeof window !== 'undefined' ? new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }) : undefined;

  // Destination icon — LocalBuka logo for the restaurant
  const restaurantIcon = typeof window !== 'undefined' ? new L.Icon({
    iconUrl: '/images/localBuka_logo.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    className: 'rounded-full shadow-lg border-2 border-white',
  }) : undefined;

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
    setMounted(true);
  }, []);

  // ---- Track user location ----
  useEffect(() => {
    if (!showRoute) return;
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        setLocationError(null);
      },
      (err) => {
        console.error("Error getting location:", err);
        setLocationError("Unable to retrieve your location. Please check browser permissions.");
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [showRoute]);

  // ---- Reverse geocode destination once ----
  useEffect(() => {
    if (!destinationAddress && showRoute) {
      (async () => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${destinationLat}&lon=${destinationLng}`
          );
          const data = await res.json();
          if (data?.address) {
            const street = data.address.road || data.address.suburb || data.address.neighbourhood || "";
            const city = data.address.city || data.address.state || "";
            setDestinationAddress([street, city].filter(Boolean).join(", ") || "Destination");
          } else {
            setDestinationAddress("Destination");
          }
        } catch {
          setDestinationAddress("Destination");
        }
      })();
    }
  }, [destinationLat, destinationLng, destinationAddress, showRoute]);

  // ---- Fetch OSRM route with step instructions ----
  useEffect(() => {
    if (!showRoute || !userLocation) {
      setRoutePoints([]);
      setRouteInfo(null);
      setRouteSteps([]);
      return;
    }

    const fetchRoute = async () => {
      setIsLoadingRoute(true);
      try {
        const [userLat, userLng] = userLocation;
        // Request steps=true for turn-by-turn instructions
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${userLng},${userLat};${destinationLng},${destinationLat}?geometries=geojson&overview=full&steps=true`
        );
        const data = await response.json();

        if (data.code === "Ok" && data.routes?.length > 0) {
          const route = data.routes[0];
          const coordinates = route.geometry.coordinates.map(
            (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
          );
          setRoutePoints(coordinates);
          setRouteInfo({
            duration: Math.ceil(route.duration / 60),
            distance: +(route.distance / 1000).toFixed(1),
          });

          // Extract turn-by-turn steps from the first leg
          if (route.legs?.[0]?.steps) {
            const steps: RouteStep[] = route.legs[0].steps
              .filter((s: any) => s.maneuver?.type !== "arrive" || s.maneuver?.type === "arrive")
              .map((s: any) => {
                const maneuver = s.maneuver;
                let instruction = "";

                // Build human-readable instruction from OSRM maneuver
                const type = maneuver.type;
                const modifier = maneuver.modifier || "";
                const streetName = s.name || "";

                if (type === "depart") {
                  instruction = streetName
                    ? `Head ${modifier || "straight"} on ${streetName}`
                    : `Head ${modifier || "straight"}`;
                } else if (type === "arrive") {
                  instruction = "You have arrived at your destination";
                } else if (type === "turn") {
                  instruction = streetName
                    ? `Turn ${modifier} onto ${streetName}`
                    : `Turn ${modifier}`;
                } else if (type === "new name" || type === "continue") {
                  instruction = streetName
                    ? `Continue onto ${streetName}`
                    : `Continue ${modifier || "straight"}`;
                } else if (type === "merge") {
                  instruction = streetName
                    ? `Merge onto ${streetName}`
                    : `Merge ${modifier}`;
                } else if (type === "roundabout" || type === "rotary") {
                  const exit = maneuver.exit || "";
                  instruction = exit
                    ? `Take exit ${exit} from the roundabout`
                    : `Enter the roundabout`;
                } else if (type === "fork") {
                  instruction = streetName
                    ? `Take the ${modifier} fork onto ${streetName}`
                    : `Take the ${modifier} fork`;
                } else if (type === "end of road") {
                  instruction = streetName
                    ? `Turn ${modifier} onto ${streetName}`
                    : `Turn ${modifier} at the end of the road`;
                } else {
                  instruction = streetName
                    ? `${modifier ? modifier.charAt(0).toUpperCase() + modifier.slice(1) : "Continue"} on ${streetName}`
                    : `Continue ${modifier || "straight"}`;
                }

                return {
                  instruction,
                  distance: s.distance,
                  location: [maneuver.location[0], maneuver.location[1]] as [number, number],
                };
              });
            setRouteSteps(steps);
          }
        }
      } catch (err) {
        console.error("Failed to fetch route:", err);
      } finally {
        setIsLoadingRoute(false);
      }
    };

    fetchRoute();
  }, [userLocation, destinationLat, destinationLng, showRoute]);

  // ---- Speak utility with natural human voice ----
  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !voiceEnabled) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;

    // Pick the most natural-sounding voice available
    const voices = synth.getVoices();
    const preferredNames = [
      "Samantha",     // macOS — natural female
      "Karen",        // macOS — natural female (Australian)
      "Daniel",       // macOS — natural male (UK)
      "Moira",        // macOS — natural female (Irish)
      "Google UK English Female",
      "Google UK English Male",
      "Google US English",
      "Microsoft Zira",   // Windows — female
      "Microsoft David",  // Windows — male
    ];
    let selectedVoice = voices.find(v =>
      preferredNames.some(name => v.name.includes(name))
    );
    // Fallback: pick any English voice that isn't compact/electronic
    if (!selectedVoice) {
      selectedVoice = voices.find(v =>
        v.lang.startsWith("en") && !v.name.toLowerCase().includes("compact")
      );
    }
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    synth.speak(utterance);
  }, [voiceEnabled]);

  // Preload voices (some browsers load them async)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // ---- Auto-announce turn-by-turn based on proximity ----
  useEffect(() => {
    if (!voiceEnabled || !userLocation || routeSteps.length === 0) return;

    const ANNOUNCE_DISTANCE = 100; // meters — announce when within 100m of next step

    for (let i = currentStepIndex; i < routeSteps.length; i++) {
      const step = routeSteps[i];
      // OSRM location is [lng, lat], convert to [lat, lng] for haversine
      const stepLatLng: [number, number] = [step.location[1], step.location[0]];
      const dist = haversineDistance(userLocation, stepLatLng);

      if (dist < ANNOUNCE_DISTANCE && i > lastAnnouncedStepRef.current) {
        // Build announcement with distance context
        const nextStep = routeSteps[i + 1];
        let announcement = step.instruction;
        if (nextStep && nextStep.distance > 0) {
          const distMeters = Math.round(nextStep.distance);
          if (distMeters >= 1000) {
            announcement += `. Then in ${(distMeters / 1000).toFixed(1)} kilometers, ${nextStep.instruction}`;
          } else {
            announcement += `. Then in ${distMeters} meters, ${nextStep.instruction}`;
          }
        }

        speak(announcement);
        setCurrentInstruction(step.instruction);
        setCurrentStepIndex(i);
        lastAnnouncedStepRef.current = i;
        break;
      }
    }
  }, [userLocation, routeSteps, currentStepIndex, voiceEnabled, speak]);

  // ---- Announce start when voice is enabled ----
  useEffect(() => {
    if (voiceEnabled && routeSteps.length > 0 && lastAnnouncedStepRef.current === -1) {
      const firstStep = routeSteps[0];
      speak(firstStep.instruction);
      setCurrentInstruction(firstStep.instruction);
      lastAnnouncedStepRef.current = 0;
      setCurrentStepIndex(0);
    }
  }, [voiceEnabled, routeSteps, speak]);

  // Reset announced step when voice is toggled off
  const toggleVoice = useCallback(() => {
    setVoiceEnabled(prev => {
      if (prev) {
        // Turning off
        if (typeof window !== 'undefined') window.speechSynthesis.cancel();
        setCurrentInstruction(null);
        lastAnnouncedStepRef.current = -1;
        setCurrentStepIndex(0);
      }
      return !prev;
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
        Loading Map...
      </div>
    );
  }

  const destination: [number, number] = [destinationLat, destinationLng];

  return (
    <>
      {showRoute && locationError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-1000 bg-red-500/90 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
          {locationError}
        </div>
      )}

      {/* Compact ETA Card - Top Right */}
      {showRoute && routeInfo && (
        <div className="absolute top-3 right-3 z-1000 bg-[#2E68E3] rounded-xl shadow-lg px-3 py-2 text-white min-w-[140px] animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex items-center gap-2">
            <Navigation size={14} className="opacity-80 shrink-0" />
            <span className="text-xs uppercase tracking-wider opacity-80 font-semibold">To</span>
          </div>
          <p className="text-xs font-medium line-clamp-1 mt-0.5 opacity-90">
            {destinationAddress || 'Locating...'}
          </p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl font-bold leading-none">{routeInfo.duration}</span>
            <span className="text-xs opacity-80">min</span>
            <span className="text-xs opacity-60 mx-0.5">·</span>
            <span className="text-xs opacity-80">{routeInfo.distance} km</span>
          </div>
        </div>
      )}

      {/* Turn-by-turn instruction — centered overlay */}
      {showRoute && voiceEnabled && currentInstruction && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1000 w-[85%] max-w-md pointer-events-none">
          <div className="bg-black/70 backdrop-blur-md text-white px-5 py-4 rounded-2xl text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <Navigation size={20} className="mx-auto mb-2 text-[#fbbe15]" />
            <p className="text-sm font-semibold leading-relaxed">{currentInstruction}</p>
          </div>
        </div>
      )}

      {/* Voice Toggle Button */}
      {showRoute && (
        <div className="absolute bottom-20 right-3 z-1000">
          <button
            onClick={toggleVoice}
            className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border-none cursor-pointer ${
              voiceEnabled
                ? 'bg-[#2E68E3] text-white'
                : 'bg-white text-zinc-700 hover:bg-zinc-100'
            }`}
            aria-label={voiceEnabled ? "Mute voice navigation" : "Enable voice navigation"}
          >
            {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      )}

      <MapContainer
        center={destination}
        zoom={15}
        style={{ height: "100%", width: "100%", zIndex: 0, background: "#f8f9fa" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Destination Marker — LocalBuka Logo */}
        <Marker position={destination} icon={restaurantIcon!} />

        {showRoute && userLocation && (
          <>
            {/* Origin Marker — Blue Pin (user location) */}
            <Marker position={userLocation} icon={userIcon!} />

            {/* Route Line - solid */}
            <Polyline
              positions={routePoints.length > 0 ? routePoints : [userLocation, destination]}
              pathOptions={{ color: '#fbbe15', weight: 5, opacity: 0.9 }}
            />
          </>
        )}

        <AdjustMapBounds
          origin={userLocation}
          destination={destination}
          showRoute={showRoute}
          routePoints={routePoints}
        />
      </MapContainer>
    </>
  );
}
