"use client";

import { useState } from "react";
import BaseModal from "./BaseModal";
import UserRow from "./UserRow";
import { SocialUser } from "./types";

interface Props {
  open: boolean;
  onClose: () => void;
}

type TabType = "following" | "followers" | "suggested";

export default function SocialModal({ open, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("following");

  
  const followersData: SocialUser[] = [
    { id: "1", name: "Anika Press", username: "anikapress", avatar: "/avatars/Anika Press.jpg", actionLabel: "Follow back" },
    { id: "2", name: "Tatiana Stanton", username: "tati", avatar: "/avatars/Tatiana Stanton.png", actionLabel: "Follow back" },
    { id: "3", name: "Gustavo Mango", username: "gustavo", avatar: "/avatars/Gustavo Mango.png", actionLabel: "Unfollow" },
    { id: "4", name: "Haylie Carder", username: "haylie", avatar: "/avatars/Haylie Carder.png", actionLabel: "Follow back" },
    { id: "5", name: "Rayna Carder", username: "rayna", avatar: "/avatars/Rayna Carder.png", actionLabel: "Unfollow" },
    { id: "6", name: "Tiana Baptista", username: "tiana", avatar: "/avatars/Tiana Baptista.png", actionLabel: "Unfollow" },
    { id: "7", name: "Charlie Schleifer", username: "charlie", avatar: "/avatars/Charlie Schleifer.png", actionLabel: "Unfollow" },
    { id: "8", name: "Paityn Levin", username: "paityn", avatar: "/avatars/Paityn Levin.png", actionLabel: "Follow back" },
    { id: "9", name: "Maren Baptista", username: "maren", avatar: "/avatars/Maren Baptista.png", actionLabel: "Follow back" },
  ];

  const followingData: SocialUser[] = [
    { id: "f1", name: "Anika Press", username: "anikapress", avatar: "/avatars/Anika Press.jpg", actionLabel: "Unfollow" },
    { id: "f2", name: "Tatiana Stanton", username: "tati", avatar: "/avatars/Tatiana Stanton.png", actionLabel: "Unfollow" },
    { id: "f3", name: "Gustavo Mango", username: "gustavo", avatar: "/avatars/Gustavo Mango.png", actionLabel: "Unfollow" },
    { id: "f4", name: "Haylie Carder", username: "haylie", avatar: "/avatars/Haylie Carder.png", actionLabel: "Unfollow" },
    { id: "f5", name: "Rayna Carder", username: "rayna", avatar: "/avatars/Rayna Carder.png", actionLabel: "Unfollow" },
    { id: "f6", name: "Tiana Baptista", username: "tiana", avatar: "/avatars/Tiana Baptista.png", actionLabel: "Unfollow" },
    { id: "f7", name: "Charlie Schleifer", username: "charlie", avatar: "/avatars/Charlie Schleifer.png", actionLabel: "Unfollow" },
    { id: "f8", name: "Paityn Levin", username: "paityn", avatar: "/avatars/Paityn Levin.png", actionLabel: "Unfollow" },
    { id: "f9", name: "Maren Baptista", username: "maren", avatar: "/avatars/Maren Baptista.png", actionLabel: "Unfollow" },
  ];

  const suggestedData: SocialUser[] = [
    { id: "s1", name: "Okafor Emeka", username: "emeka", avatar: "/avatars/Okafor Emeka.jpg", actionLabel: "Follow" },
    { id: "s2", name: "Tatiana Stanton", username: "tati", avatar: "/avatars/Tatiana Stanton.png", actionLabel: "Follow" },
    { id: "s3", name: "Gustavo Mango", username: "gustavo", avatar: "/avatars/Gustavo Mango.png", actionLabel: "Follow" },
    { id: "s4", name: "Haylie Carder", username: "haylie", avatar: "/avatars/Haylie Carder.png", actionLabel: "Follow" },
    { id: "s5", name: "Rayna Carder", username: "rayna", avatar: "/avatars/Rayna Carder.png", actionLabel: "Follow" },
    { id: "s6", name: "Tiana Baptista", username: "tiana", avatar: "/avatars/Tiana Baptista.png", actionLabel: "Follow" },
    { id: "s7", name: "Charlie Schleifer", username: "charlie", avatar: "/avatars/Charlie Schleifer.png", actionLabel: "Follow" },
    { id: "s8", name: "Paityn Levin", username: "paityn", avatar: "/avatars/Paityn Levin.png", actionLabel: "Follow" },
    { id: "s9", name: "Maren Baptista", username: "maren", avatar: "/avatars/Maren Baptista.png", actionLabel: "Follow" },
  ];

  const currentData = 
    activeTab === "following" ? followingData : 
    activeTab === "followers" ? followersData : suggestedData;

  // Design Polish: Matches the muted gray font and bold highlight from Figma
  const tabStyle = (tab: TabType) =>
    `flex-1 text-center pb-3 text-[12px] font-bold cursor-pointer transition-all border-b-2
    ${activeTab === tab ? "text-white border-[#FFC107]" : "text-[#71717A] border-transparent"}`;

return (
    <BaseModal open={open} onClose={onClose} title="Jane Cooper">
      <div className="flex border-b flex-col -mx-6 -mb-6">
        
        {/* Top Section - Tabs */}
        <div className=" bg-[#121212] px-4 pt-2">
          <div className="flex border-b border-[#333333]">
            <div className={tabStyle("following")} onClick={() => setActiveTab("following")}>Following (2k)</div>
            <div className={tabStyle("followers")} onClick={() => setActiveTab("followers")}>Followers (341)</div>
            <div className={tabStyle("suggested")} onClick={() => setActiveTab("suggested")}>Suggested</div>
          </div>
        </div>

        {/* Bottom Section - List */}
        <div className="bg-[#1F1F1F] overflow-y-auto h-[480px] px-4 py-3 custom-scrollbar rounded-b-2xl">
          <div className="flex flex-col gap-2">
            {currentData.map((u) => (
              <UserRow key={`${activeTab}-${u.id}`} user={u} />
            ))}
          </div>
        </div>
      </div>
    </BaseModal>
  );
  
}