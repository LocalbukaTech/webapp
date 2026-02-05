"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#1a1a1a]">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}
