"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Settings, Share2 } from "lucide-react";

interface ProfileHeaderProps {
  name?: string;
  location?: string;
  posts?: number;
  followers?: string;
  following?: number;
  bio?: string;
  avatarSrc?: string;
}

export function ProfileHeader({
  name = "Jane Cooper",
  location = "Lagos, Nigeria",
  posts = 24,
  followers = "2K",
  following = 341,
  bio = "No bio yet.",
  avatarSrc = "/images/profileAvatar.png",
}: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <div className="w-full">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#FBBE15] overflow-hidden bg-[#FBBE15]">
            <Image
              src={avatarSrc}
              alt={name}
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-white">{name}</h2>
              <Share2 size={18} className="text-white" />
            </div>
            <Link
              href="/settings"
              className="flex items-center gap-2 text-white hover:text-[#FBBE15] transition-colors"
            >
              <Settings size={20} />
              <span className="text-sm font-medium hidden sm:inline">Settings</span>
            </Link>
          </div>

          <p className="text-sm text-zinc-400 mt-0.5">{location}</p>

          {/* Follow Back Button */}
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`mt-2 px-4 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer border-none ${
              isFollowing
                ? "bg-transparent border border-[#FBBE15] text-[#FBBE15] hover:bg-[#FBBE15]/10"
                : "bg-[#FBBE15] text-[#1a1a1a] hover:bg-[#e5ab13]"
            }`}
            style={isFollowing ? { border: '1px solid #FBBE15' } : {}}
          >
            {isFollowing ? "Following" : "Follow back"}
          </button>

          {/* Stats */}
          <div className="flex items-center gap-5 mt-3">
            <div className="text-center">
              <span className="text-white font-bold text-base">{posts}</span>
              <p className="text-zinc-400 text-xs">Posts</p>
            </div>
            <div className="text-center">
              <span className="text-white font-bold text-base">{followers}</span>
              <p className="text-zinc-400 text-xs">Followers</p>
            </div>
            <div className="text-center">
              <span className="text-white font-bold text-base">{following}</span>
              <p className="text-zinc-400 text-xs">Following</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-zinc-400 mt-2">{bio}</p>
        </div>
      </div>
    </div>
  );
}
