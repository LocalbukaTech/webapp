"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom hook to fit bounds when route or destination changes
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

  useEffect(() => {
    if (showRoute && origin) {
      if (routePoints.length > 0) {
        map.fitBounds(L.latLngBounds(routePoints), { padding: [50, 50] });
      } else {
        const bounds = L.latLngBounds([origin, destination]);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } else {
      map.setView(destination, 15);
    }
  }, [map, origin, destination, showRoute, routePoints]);

  return null;
}

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

  // Custom Icon for destination to match our brand or look clean
  const destinationIcon = typeof window !== 'undefined' ? new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }) : undefined;

  // Origin icon (e.g. user's location) 
  const originIcon = typeof window !== 'undefined' ? new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }) : undefined;

  useEffect(() => {
    // Required to fix Leaflet's default icon paths in Next.js/Webpack
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
    setMounted(true);
  }, []);

  // Track user location
  useEffect(() => {
    if (!showRoute) return;

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        setLocationError(null);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationError("Unable to retrieve your location. Please check browser permissions.");
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [showRoute]);

  // Fetch reverse geocoded address for destination location once
  useEffect(() => {
    if (!destinationAddress && showRoute) {
      const fetchAddress = async () => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${destinationLat}&lon=${destinationLng}`
          );
          const data = await res.json();
          if (data && data.address) {
            const street = data.address.road || data.address.suburb || data.address.neighbourhood || "";
            const city = data.address.city || data.address.state || "";
            setDestinationAddress([street, city].filter(Boolean).join(", ") || "Destination");
          } else {
            setDestinationAddress("Destination");
          }
        } catch (err) {
          setDestinationAddress("Destination");
        }
      };
      fetchAddress();
    }
  }, [destinationLat, destinationLng, destinationAddress, showRoute]);

  // Fetch route from OSRM when user location is available and showRoute is true
  useEffect(() => {
    if (!showRoute || !userLocation) {
      setRoutePoints([]);
      setRouteInfo(null);
      return;
    }

    const fetchRoute = async () => {
      setIsLoadingRoute(true);
      try {
        const [userLat, userLng] = userLocation;
        // OSRM expects: {longitude},{latitude}
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${userLng},${userLat};${destinationLng},${destinationLat}?geometries=geojson`
        );
        const data = await response.json();
        
        if (data.code === "Ok" && data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          // GeoJSON coordinates are [longitude, latitude], Leaflet needs [latitude, longitude]
          const coordinates = route.geometry.coordinates.map(
            (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
          );
          setRoutePoints(coordinates);
          setRouteInfo({
            duration: Math.ceil(route.duration / 60), // Convert seconds to minutes
            distance: +(route.distance / 1000).toFixed(1) // Convert meters to km
          });
        }
      } catch (err) {
        console.error("Failed to fetch route:", err);
      } finally {
        setIsLoadingRoute(false);
      }
    };

    fetchRoute();
  }, [userLocation, destinationLat, destinationLng, showRoute]);

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

      {showRoute && routeInfo && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-1000 w-[90%] max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 border border-zinc-200">
          <div className="bg-[#2E68E3] p-4 text-white flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-3xl font-bold">
                {routeInfo.duration} <span className="text-base font-normal opacity-80">min</span>
              </span>
              <span className="text-sm opacity-90">{routeInfo.distance} km</span>
            </div>
            <div className="flex flex-col items-end text-right justify-center">
              <span className="text-xs uppercase tracking-wider opacity-80 font-semibold mb-1">To</span>
              <span className="text-sm font-medium line-clamp-2 max-w-[150px]">
                {destinationAddress || 'Locating...'}
              </span>
            </div>
          </div>
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
        
        {/* Destination Marker */}
        <Marker position={destination} icon={destinationIcon!} />

        {showRoute && userLocation && (
          <>
            {/* Origin Marker */}
            <Marker position={userLocation} icon={originIcon!} />
            
            {/* Route Line */}
            {routePoints.length > 0 ? (
              <Polyline 
                positions={routePoints} 
                pathOptions={{ color: '#fbbe15', weight: 5, opacity: 0.8 }} 
              />
            ) : (
              /* Fallback to straight line if routing fails */
              <Polyline 
                positions={[userLocation, destination]} 
                pathOptions={{ color: '#fbbe15', weight: 5, opacity: 0.8, dashArray: '10, 10' }} 
              />
            )}
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
