"use client";

import { BadgeCheck } from "lucide-react";

interface VideoOverlayProps {
  username: string;
  isVerified: boolean;
  hashtags: string[];
}

export function VideoOverlay({ username, isVerified, hashtags }: VideoOverlayProps) {
  return (
    <div className="video-overlay">
      <div className="video-overlay-content">
        <div className="video-username">
          <span>{username}</span>
          {isVerified && (
            <BadgeCheck className="verified-badge" size={16} />
          )}
        </div>
        <div className="video-hashtags">
          {hashtags.map((tag) => (
            <span key={tag} className="hashtag">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
