"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video } from "@/types/video";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { ActionBar } from "@/components/video/ActionBar";
import { VideoNavigation } from "@/components/video/VideoNavigation";
import Comments from "@/components/video/comments"; // default import

interface Comment {
  id: string;
  user: string;
  avatar: string;
  time: string;
  text: string;
}

interface VideoFeedProps {
  videos: Video[];
}

export function VideoFeed({ videos }: VideoFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isGlobalMuted, setIsGlobalMuted] = useState(true);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- COMMENTS STATE ---
  const [videoComments, setVideoComments] = useState<{ [videoId: string]: Comment[] }>(() => {
    const initial: { [videoId: string]: Comment[] } = {};
    videos.forEach((v) => {
      initial[v.id] = Array.isArray(v.comments) ? (v.comments as Comment[]) : [];
    });
    return initial;
  });

  // --- ADD COMMENT HANDLER ---
  const handleAddComment = (text: string) => {
    const videoId = videos[currentIndex].id;
    const newComment: Comment = {
      id: Date.now().toString(),
      user: "You",
      time: "Just now",
      text,
      avatar: "",
    };

    setVideoComments((prev) => ({
      ...prev,
      [videoId]: [...(prev[videoId] || []), newComment],
    }));
  };

  // --- COMMENTS DRAWER STATE ---
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const handleMuteChange = useCallback((muted: boolean) => {
    setIsGlobalMuted(muted);
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = setTimeout(() => setIsTransitioning(false), 400);
    }
  }, [currentIndex, isTransitioning]);

  const handleNext = useCallback(() => {
    if (currentIndex < videos.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = setTimeout(() => setIsTransitioning(false), 400);
    }
  }, [currentIndex, videos.length, isTransitioning]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

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

  if (!videos || videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-zinc-500 text-base">
        <p>No videos available</p>
      </div>
    );
  }

  const currentVideo = videos[currentIndex];

  const fadeVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="flex items-center gap-4 h-[calc(100vh-3rem)] max-h-[850px]">
      <div className="flex gap-3 items-end h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideo.id}
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full flex items-center"
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
          comments={videoComments[currentVideo.id]?.length || 0}
          saves={currentVideo.saves}
          shares={currentVideo.shares}
          onCommentClick={() => setIsCommentsOpen(true)} // opens drawer
        />

        {/* --- COMMENTS DRAWER --- */}
        <Comments
          comments={videoComments[currentVideo.id] || []}
          onSend={handleAddComment}
          open={isCommentsOpen} // controlled by ActionBar button
          onClose={() => setIsCommentsOpen(false)} // closes drawer
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
