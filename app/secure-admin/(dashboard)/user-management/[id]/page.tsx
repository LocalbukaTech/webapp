"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight, Ban, AlertCircle, Play, User } from "lucide-react";
import { AdminTabs } from "@/components/admin/ui/AdminTabs";
import { SuspendAccountModal } from "@/components/admin/ui/SuspendAccountModal";
import { BanUserModal } from "@/components/admin/ui/BanUserModal";
import { usePathname } from "next/navigation";

export default function UserDetails() {
  const [activeTab, setActiveTab] = useState("User Details");
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const pathname = usePathname();
  
  // Extract ID from path or use generic "User 1"
  const userIdSegment = pathname?.split("/").pop();
  const displayId =  userIdSegment || "User 1";

  // Tab Content Renderers
  const renderUserDetails = () => (
    <div className="flex flex-col max-w-5xl mt-8">
      {/* Avatar Container */}
      <div className="w-24 h-24 bg-[#FCF7E8] rounded-xl flex items-center justify-center mb-10 border border-yellow-100">
        <User size={40} className="text-[#a18228]" strokeWidth={1.5} />
      </div>

      {/* Details List */}
      <div className="flex flex-col space-y-5">
        {[
          { label: "User ID", value: "LB-001" },
          { label: "Full Name", value: "James Obi" },
          { label: "Location", value: "Lagos, Nigeria" },
          { label: "Phone Number", value: "090 111 222 333" },
          { label: "Email Address", value: "jamesobi@gmail.com" },
          { label: "Followers", value: "1,056" },
          { label: "Following", value: "290" },
          { label: "Posts", value: "60" },
        ].map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-[15px]">
            <span className="text-gray-500">{item.label}</span>
            <span className="font-semibold text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
      {/* Dummy items matching the design grid */}
      {[
        { views: "3k" }, { views: "1.2k" }, { views: "5k" }, { views: "1.2k" }, { views: "40M" },
        { views: "282k" }, { views: "40M" }, { views: "282k" }, { views: "894k" }, { views: "746k" }
      ].map((item, i) => (
        <div key={i} className="relative aspect-3/4 rounded-xl overflow-hidden bg-gray-200">
          <Image 
            src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=600&fit=crop&q=80&auto=format&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} 
            alt="Food content" 
            fill
            className="object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          
          {/* View Count */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-sm font-semibold drop-shadow-md">
            <Play size={14} fill="currentColor" />
            {item.views}
          </div>
        </div>
      ))}
    </div>
  );

  const renderReportHistory = () => (
    <div className="flex flex-col mt-8 divide-y divide-gray-100">
      {[
        { title: "This account was reported", sub: "Abusive Behavior", date: "4 May, 2025 11:05AM" },
        { title: "This user reported account (ID: B1234)", sub: "Spamming", date: "4 May, 2025 11:05AM" },
        { title: "This user reported account (ID: B1234)", sub: "Spamming", date: "4 May, 2025 11:05AM" },
        { title: "This account was reported", sub: "Abusive Behavior", date: "4 May, 2025 11:05AM" },
      ].map((item, i) => (
        <div key={i} className="flex justify-between py-5 first:pt-0">
          <div className="flex flex-col gap-1">
            <span className="text-[14px] font-bold text-gray-800">{item.title}</span>
            <span className="text-[13px] text-gray-500">{item.sub}</span>
          </div>
          <span className="text-[13px] text-gray-400 font-medium">{item.date}</span>
        </div>
      ))}
    </div>
  );

  const renderLoginLog = () => (
    <div className="flex flex-col mt-8 divide-y divide-gray-100">
      {[
        { event: "Security Login", date: "4 May, 2025 11:05AM" },
        { event: "Security Logout", date: "4 May, 2025 11:05AM" },
        { event: "Security Login", date: "4 May, 2025 11:05AM" },
        { event: "Password Change", date: "4 May, 2025 11:05AM" },
      ].map((item, i) => (
        <div key={i} className="flex justify-between items-center py-5 first:pt-0">
          <span className="text-[14px] font-bold text-gray-800">{item.event}</span>
          <span className="text-[13px] text-gray-400 font-medium">{item.date}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 font-sans">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/secure-admin/user-management" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} />
          User Accounts
        </Link>
        <ChevronRight size={14} className="text-gray-400" />
        <span className="font-semibold text-gray-900">{displayId}</span>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-8 min-h-[600px]">
        
        {/* Title */}
        <h1 className="text-[22px] font-bold text-[#0F172A] mb-8">View User</h1>

        {/* Action Header Container */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end border-b border-gray-100 gap-4 lg:gap-0">
          
          {/* Custom Tabs */}
          <div className="-mb-px">
            <AdminTabs 
              tabs={["User Details", "Content", "Report History", "Login/Activity Log"]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pb-3 lg:pb-4 pr-1">
            <button 
              onClick={() => setIsSuspendModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#FCF7E8] text-[#D39B0A] hover:bg-[#f5ebd0] transition-colors rounded-lg text-sm font-semibold"
            >
              <AlertCircle size={16} />
              Suspend Account
            </button>
            <button 
              onClick={() => setIsBanModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#FEF2F2] text-[#EF4444] hover:bg-[#fee2e2] transition-colors rounded-lg text-sm font-semibold"
            >
              <Ban size={16} />
              Ban User
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="mt-2">
          {activeTab === "User Details" && renderUserDetails()}
          {activeTab === "Content" && renderContent()}
          {activeTab === "Report History" && renderReportHistory()}
          {activeTab === "Login/Activity Log" && renderLoginLog()}
        </div>

      </div>

      <SuspendAccountModal 
        isOpen={isSuspendModalOpen} 
        onClose={() => setIsSuspendModalOpen(false)} 
        onSuspend={() => setIsSuspendModalOpen(false)} 
      />

      <BanUserModal 
        isOpen={isBanModalOpen} 
        onClose={() => setIsBanModalOpen(false)} 
        onBan={() => setIsBanModalOpen(false)} 
      />
    </div>
  );
}
