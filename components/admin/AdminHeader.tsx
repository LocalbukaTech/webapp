"use client";

import Image from "next/image";
import { Settings, Bell, LogOut } from "lucide-react";

export function AdminHeader() {
    return (
        <header className="h-14 border-b border-zinc-200 bg-white flex items-center justify-end px-6 gap-3 sticky top-0 z-40">
            {/* Settings */}
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#fffaeb] hover:bg-[#fef3c7] transition-colors text-[#b8860b] shadow-[0_0_8px_2px_rgba(251,190,21,0.25)]">
                <Settings size={20} strokeWidth={1.5} />
            </button>

            {/* Notifications */}
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#fffaeb] hover:bg-[#fef3c7] transition-colors text-[#b8860b] shadow-[0_0_8px_2px_rgba(251,190,21,0.25)]">
                <Bell size={20} strokeWidth={1.5} />
            </button>

            {/* Avatar */}
            <Image
                src="/images/avatar.png"
                alt="Admin Avatar"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover border border-zinc-200"
            />

            {/* Logout */}
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 transition-colors text-red-500 hover:text-red-600">
                <LogOut size={18} strokeWidth={1.5} />
            </button>
        </header>
    );
}

