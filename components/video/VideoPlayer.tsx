"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX, MoreHorizontal, Play, Pause } from "lucide-react";
import { Video } from "@/types/video";
import { VideoOverlay } from "@/components/video/VideoOverlay";

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  isMuted: boolean;
  onMuteChange: (muted: boolean) => void;
}

export function VideoPlayer({ video, isActive, onSwipeUp, onSwipeDown, isMuted, onMuteChange }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const isScrolling = useRef(false);

  // Play/pause icon overlay state
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(false);
  const [lastAction, setLastAction] = useState<"play" | "pause">("pause");
  const iconTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Play/pause based on active state and video changes
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        // Reset video to beginning when switching
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Autoplay might be blocked
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }, [isActive, video.id]);

  const showIcon = useCallback((action: "play" | "pause") => {
    setLastAction(action);
    setShowPlayPauseIcon(true);
    if (iconTimeoutRef.current) clearTimeout(iconTimeoutRef.current);
    iconTimeoutRef.current = setTimeout(() => {
      setShowPlayPauseIcon(false);
    }, 800);
  }, []);

  useEffect(() => {
    return () => {
      if (iconTimeoutRef.current) clearTimeout(iconTimeoutRef.current);
    };
  }, []);

  const togglePlay = () => {
    // Don't toggle play if we were swiping
    if (isScrolling.current) {
      isScrolling.current = false;
      return;
    }
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        showIcon("pause");
      } else {
        videoRef.current.play();
        showIcon("play");
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      onMuteChange(newMuted);
    }
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchEndY.current = null;
    isScrolling.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    // Only process if we have valid start and end positions
    if (touchStartY.current === null || touchEndY.current === null) {
      touchStartY.current = null;
      touchEndY.current = null;
      return;
    }

    const diffY = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (Math.abs(diffY) > minSwipeDistance) {
      isScrolling.current = true;
      
      if (diffY > 0 && onSwipeUp) {
        // Swiped up - go to next video
        onSwipeUp();
      } else if (diffY < 0 && onSwipeDown) {
        // Swiped down - go to previous video
        onSwipeDown();
      }
    }

    // Reset touch positions
    touchStartY.current = null;
    touchEndY.current = null;
  };

  // Mouse wheel handler for desktop scrolling (with debounce)
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    // Debounce wheel events
    if (wheelTimeout.current) return;
    
    const minDelta = 50;

    if (Math.abs(e.deltaY) > minDelta) {
      if (e.deltaY > 0 && onSwipeUp) {
        // Scrolled down - go to next video
        onSwipeUp();
      } else if (e.deltaY < 0 && onSwipeDown) {
        // Scrolled up - go to previous video
        onSwipeDown();
      }
      
      // Set debounce timeout
      wheelTimeout.current = setTimeout(() => {
        wheelTimeout.current = null;
      }, 500);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[380px] h-full bg-black rounded-2xl overflow-hidden cursor-pointer"
      onClick={togglePlay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        preload="auto"
      />

      {/* TikTok-style Play/Pause Icon Overlay */}
      {showPlayPauseIcon && (
        <div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{
            animation: "playPauseFade 0.8s ease-out forwards",
          }}
        >
          <div className="w-20 h-20 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
            {lastAction === "pause" ? (
              <Pause size={40} className="text-white" fill="white" />
            ) : (
              <Play size={40} className="text-white ml-1" fill="white" />
            )}
          </div>
        </div>
      )}

      {/* Paused state — persistent subtle icon */}
      {!isPlaying && !showPlayPauseIcon && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm opacity-70">
            <Play size={40} className="text-white ml-1" fill="white" />
          </div>
        </div>
      )}

      {/* Top Controls */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
        <button
          className="flex items-center justify-center w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full text-white cursor-pointer transition-colors border-none"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full text-white cursor-pointer transition-colors border-none"
          onClick={(e) => e.stopPropagation()}
          aria-label="More options"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Video Overlay */}
      <VideoOverlay
        username={video.username}
        isVerified={video.isVerified}
        hashtags={video.hashtags}
      />
    </div>
  );
}

