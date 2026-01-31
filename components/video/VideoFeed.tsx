"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video } from "@/types/video";
import { VideoPlayer } from "./VideoPlayer";
import { ActionBar } from "./ActionBar";
import { VideoNavigation } from "./VideoNavigation";

interface VideoFeedProps {
  videos: Video[];
}

export function VideoFeed({ videos }: VideoFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isGlobalMuted, setIsGlobalMuted] = useState(true);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMuteChange = useCallback((muted: boolean) => {
    setIsGlobalMuted(muted);
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
      
      // Clear any existing timeout
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      transitionTimeoutRef.current = setTimeout(() => setIsTransitioning(false), 400);
    }
  }, [currentIndex, isTransitioning]);

  const handleNext = useCallback(() => {
    if (currentIndex < videos.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
      
      // Clear any existing timeout
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      transitionTimeoutRef.current = setTimeout(() => setIsTransitioning(false), 400);
    }
  }, [currentIndex, videos.length, isTransitioning]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrevious]);

  // Ensure we have videos
  if (!videos || videos.length === 0) {
    return (
      <div className="video-feed-empty">
        <p>No videos available</p>
      </div>
    );
  }

  const currentVideo = videos[currentIndex];

  // Fade animation variants (no position change, just opacity)
  const fadeVariants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <div className="video-feed">
      <div className="video-feed-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideo.id}
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="video-player-wrapper"
          >
            <VideoPlayer
              video={currentVideo}
              isActive={true}
              onSwipeUp={handleNext}
              onSwipeDown={handlePrevious}
              isMuted={isGlobalMuted}
              onMuteChange={handleMuteChange}
            />
          </motion.div>
        </AnimatePresence>
        <ActionBar
          likes={currentVideo.likes}
          comments={currentVideo.comments}
          saves={currentVideo.saves}
          shares={currentVideo.shares}
        />
      </div>
      <VideoNavigation
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoPrevious={currentIndex > 0}
        canGoNext={currentIndex < videos.length - 1}
      />
    </div>
  );
}
