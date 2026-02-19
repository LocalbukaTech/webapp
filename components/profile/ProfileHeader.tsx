"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Settings } from "lucide-react";
import SocialModal from "../social/SocialModal";
import { IoMdShareAlt } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";


interface ProfileHeaderProps {
  name?: string;
  otherName?: string;
  location?: string;
  posts?: number;
  followers?: string;
  following?: number;
  bio?: string;
  avatarSrc?: string;
  otherAvatarSrc?: string;
}

export function ProfileHeader({
  name = "Jane Cooper",
  otherName = "Okafor Emeka",
  location = "Lagos, Nigeria",
  posts = 24,
  followers = "2K",
  following = 341,
  bio = "No bio yet.",
  avatarSrc = "/images/profileAvatar.png",
  otherAvatarSrc = "/images/otherName.png",
}: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const route = usePathname();
  const router = useRouter()
  return (
    <div className="w-full">
      <SocialModal
        open={isFollowersModalOpen}
        onClose={() => setIsFollowersModalOpen(false)}
      />
      <SocialModal
        open={isFollowingModalOpen}
        onClose={() => setIsFollowingModalOpen(false)}
      />
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#FBBE15] overflow-hidden bg-[#FBBE15] ${route === "/other-profile" ? "border-none" : ""}`}>
            <Image
              src={route === "/other-profile" ? otherAvatarSrc : avatarSrc}
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
              <h2 className="text-xl md:text-2xl font-bold text-white">{ route === "/other-profile" ? otherName : name}</h2>
              <IoMdShareAlt size={18} className="text-white" />
            </div>
            <Link
              href="/settings"
              className="flex items-center gap-2 text-white hover:text-[#FBBE15] transition-colors"
            >
              {route === "/profile" && 
                <>
                <Settings size={20} />
                <span className="text-sm font-medium hidden sm:inline">Settings</span>
                </>
              }
            </Link>
          </div>

          <p className="text-sm text-zinc-400 mt-0.5">{location}</p>

          {/* Follow Back Button */}
          {route == '/other-profile' ? (
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
          ) : (
            <button
              onClick={() => { router.push('/settings')}}
              className={`mt-2 px-4 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer border-none bg-[#FBBE15] text-[#1a1a1a] hover:bg-[#e5ab13]`}
            >
              Edit
            </button>
          )}

          {/* Stats */}
          <div className="flex items-center gap-5 mt-3">
            <div className="text-center">
              <span className="text-white font-bold text-base">{posts}</span>
              <p className="text-zinc-400 text-xs">Posts</p>
            </div>
            <button className="text-center cursor-pointer" onClick={() => setIsFollowersModalOpen(true)}>
              <span className="text-white font-bold text-base">{followers}</span>
              <p className="text-zinc-400 text-xs">Followers</p>
            </button>
            <button className="text-center cursor-pointer" onClick={() => setIsFollowingModalOpen(true)}>
              <span className="text-white font-bold text-base">{following}</span>
              <p className="text-zinc-400 text-xs">Following</p>
            </button>
          </div>

          {/* Bio */}
          <p className="text-sm text-zinc-400 mt-2">{bio}</p>
        </div>
      </div>
    </div>
  );
}
