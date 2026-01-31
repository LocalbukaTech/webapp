"use client";

import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { formatCount } from "@/constants/mockVideos";
import { useState } from "react";

interface ActionBarProps {
  likes: number;
  comments: number;
  saves: number;
  shares: number;
}

export function ActionBar({ likes, comments, saves, shares }: ActionBarProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const actions = [
    {
      icon: Heart,
      count: likes,
      label: "Like",
      isActive: isLiked,
      onClick: () => setIsLiked(!isLiked),
      activeClass: "action-btn-liked",
    },
    {
      icon: MessageCircle,
      count: comments,
      label: "Comment",
      isActive: false,
      onClick: () => {},
      activeClass: "",
    },
    {
      icon: Bookmark,
      count: saves,
      label: "Save",
      isActive: isSaved,
      onClick: () => setIsSaved(!isSaved),
      activeClass: "action-btn-saved",
    },
    {
      icon: Share2,
      count: shares,
      label: "Share",
      isActive: false,
      onClick: () => {},
      activeClass: "",
    },
  ];

  return (
    <div className="action-bar">
      {actions.map((action) => (
        <button
          key={action.label}
          className={`action-btn ${action.isActive ? action.activeClass : ""}`}
          onClick={action.onClick}
          aria-label={action.label}
        >
          <div className="action-icon">
            <action.icon
              size={24}
              fill={action.isActive ? "currentColor" : "none"}
            />
          </div>
          <span className="action-count">{formatCount(action.count)}</span>
        </button>
      ))}
    </div>
  );
}
