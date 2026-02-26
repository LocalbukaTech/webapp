import { ReactNode } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    // We override the default dark theme locally for the admin area
    <div className="light bg-[#F9F9FB] text-black h-screen overflow-hidden">
      <style>
        {`
          /* Override body styles for Admin Panel ONLY */
          body {
            background-color: #F9F9FB !important;
            color: #1a1a1a !important;
          }
        `}
      </style>
      <AdminLayout>{children}</AdminLayout>
    </div>
  );
}
