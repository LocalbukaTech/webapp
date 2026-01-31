"use client";

import { ChevronUp, ChevronDown } from "lucide-react";

interface VideoNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function VideoNavigation({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: VideoNavigationProps) {
  return (
    <div className="video-navigation">
      <button
        className={`nav-arrow ${!canGoPrevious ? "nav-arrow-disabled" : ""}`}
        onClick={onPrevious}
        disabled={!canGoPrevious}
        aria-label="Previous video"
      >
        <ChevronUp size={24} />
      </button>
      <button
        className={`nav-arrow ${!canGoNext ? "nav-arrow-disabled" : ""}`}
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next video"
      >
        <ChevronDown size={24} />
      </button>
    </div>
  );
}
