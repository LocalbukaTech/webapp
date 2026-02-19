"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AccountInformationProps {
  activeSubTab: string;
  onSubTabChange: (tab: string) => void;
}

const subTabs = [
  { id: "account", label: "Account" },
  { id: "password", label: "Password & Security" },
  { id: "delete", label: "Delete Account" },
  { id: "logout", label: "Logout" },
];

export function AccountInformation({ activeSubTab, onSubTabChange }: AccountInformationProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Sub-tabs */}
      <div className="flex gap-0 border-b border-white/10">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSubTabChange(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-all border-b-2 cursor-pointer bg-transparent whitespace-nowrap ${
                isActive
                  ? "border-[#FBBE15] text-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 pt-6">
        {activeSubTab === "account" && <AccountTab />}
        {activeSubTab === "password" && <PasswordTab />}
        {activeSubTab === "delete" && <DeleteTab />}
        {activeSubTab === "logout" && <LogoutTab />}
      </div>
    </div>
  );
}

function AccountTab() {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("James");
  const [lastName, setLastName] = useState("Ade");
  const email = "jamesgreat@gmail.com";
  const [avatarSrc, setAvatarSrc] = useState("/images/Image2.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarSrc(url);
      toast({
        title: "Photo Updated",
        description: "Your profile photo has been changed.",
        variant: "success",
      });
    }
  };

  const handleSave = () => {
    toast({
      title: "Account Updated",
      description: "Your account information has been saved successfully.",
      variant: "success",
    });
  };

  return (
    <div className="flex flex-col gap-5 max-w-lg">
      {/* Avatar with file picker */}
      <div className="relative w-20 h-20">
        <Image
          src={avatarSrc}
          alt="Profile"
          width={80}
          height={80}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <button
          onClick={handleAvatarClick}
          className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#2a2a2a] border border-white/20 flex items-center justify-center cursor-pointer"
        >
          <Camera size={14} className="text-zinc-400" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* First Name */}
      <div className="relative">
        <label className="absolute top-2 left-3 text-[11px] text-zinc-500">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full pt-6 pb-2 px-3 bg-[#2a2a2a] border border-[#FBBE15]/50 rounded-lg text-white text-sm focus:outline-none focus:border-[#FBBE15] transition-colors"
        />
      </div>

      {/* Last Name */}
      <div className="relative">
        <label className="absolute top-2 left-3 text-[11px] text-zinc-500">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full pt-6 pb-2 px-3 bg-[#2a2a2a] border border-[#FBBE15]/50 rounded-lg text-white text-sm focus:outline-none focus:border-[#FBBE15] transition-colors"
        />
      </div>

      {/* Email (read-only) */}
      <div className="relative">
        <input
          type="email"
          value={email}
          readOnly
          className="w-full py-3 px-3 bg-[#333] border border-white/10 rounded-lg text-zinc-500 text-sm cursor-not-allowed"
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="px-16 py-3 bg-[#FBBE15] text-[#1a1a1a] font-semibold text-sm rounded-lg hover:bg-[#e5ab13] transition-colors cursor-pointer border-none"
        >
          Save
        </button>
      </div>
    </div>
  );
}

function PasswordTab() {
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("/images/Image2.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarSrc(url);
      toast({
        title: "Photo Updated",
        description: "Your profile photo has been changed.",
        variant: "success",
      });
    }
  };

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
      variant: "success",
    });
  };

  return (
    <div className="flex flex-col gap-5 max-w-lg">
      {/* Avatar with file picker */}
      <div className="relative w-20 h-20">
        <Image
          src={avatarSrc}
          alt="Profile"
          width={80}
          height={80}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <button
          onClick={handleAvatarClick}
          className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#2a2a2a] border border-white/20 flex items-center justify-center cursor-pointer"
        >
          <Camera size={14} className="text-zinc-400" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* New Password */}
      <div className="relative">
        <label className="absolute top-2 left-3 text-[11px] text-zinc-500 z-10">New Password</label>
        <input
          type={showNew ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full pt-6 pb-2 px-3 pr-10 bg-white border border-[#FBBE15]/50 rounded-lg text-[#1a1a1a] text-sm focus:outline-none focus:border-[#FBBE15] transition-colors"
        />
        <button
          onClick={() => setShowNew(!showNew)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer bg-transparent border-0"
        >
          {showNew ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <label className="absolute top-2 left-3 text-[11px] text-zinc-500 z-10">Confirm New Password</label>
        <input
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full pt-6 pb-2 px-3 pr-10 bg-white border border-[#FBBE15]/50 rounded-lg text-[#1a1a1a] text-sm focus:outline-none focus:border-[#FBBE15] transition-colors"
        />
        <button
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer bg-transparent border-0"
        >
          {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="px-16 py-3 bg-[#FBBE15] text-[#1a1a1a] font-semibold text-sm rounded-lg hover:bg-[#e5ab13] transition-colors cursor-pointer border-none"
        >
          Save
        </button>
      </div>
    </div>
  );
}

function DeleteTab() {
  const { toast } = useToast();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const handleDelete = () => {
    setShowDialog(false);
    toast({
      title: "Account Deleted",
      description: "Your account has been permanently deleted.",
      variant: "destructive",
    });
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="max-w-2xl">
        <p className="text-zinc-300 text-sm leading-relaxed">
          <span className="text-red-500 font-semibold">Deleting</span> your account is permanent and cannot be undone. All your data, order history, and rewards will be removed. If you&apos;re sure, click the{" "}
          <span className="text-red-500 font-semibold">Delete button</span> below to proceed.
        </p>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => setShowDialog(true)}
          className="px-16 py-3 bg-red-600 text-white font-semibold text-sm rounded-lg hover:bg-red-700 transition-colors cursor-pointer border-none"
        >
          Delete
        </button>
      </div>

      {/* Confirm Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#2a2a2a] rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">Delete Account?</h3>
            <p className="text-sm text-zinc-400 mb-6">
              This action is permanent and cannot be undone. All your data will be lost.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDialog(false)}
                className="px-6 py-2.5 bg-transparent border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors cursor-pointer border-none"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LogoutTab() {
  const { toast } = useToast();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const handleSignOut = () => {
    setShowDialog(false);
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
      variant: "success",
    });
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <p className="text-zinc-400 text-sm">
        Safely log out of your account to protect your information.
      </p>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => setShowDialog(true)}
          className="px-16 py-3 bg-[#FBBE15] text-[#1a1a1a] font-semibold text-sm rounded-lg hover:bg-[#e5ab13] transition-colors cursor-pointer border-none"
        >
          Sign Out
        </button>
      </div>

      {/* Confirm Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#2a2a2a] rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">Sign Out?</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Are you sure you want to sign out of your account?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDialog(false)}
                className="px-6 py-2.5 bg-transparent border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-6 py-2.5 bg-[#FBBE15] text-[#1a1a1a] text-sm font-semibold rounded-lg hover:bg-[#e5ab13] transition-colors cursor-pointer border-none"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
