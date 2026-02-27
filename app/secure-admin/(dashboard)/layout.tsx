import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    // We override the default dark theme locally for the admin area
    <div className="light bg-[#F9F9FB] text-black h-full w-full">
      <style>
        {`
          /* Override body styles for Admin Panel ONLY */
          body {
            background-color: #F9F9FB !important;
            color: #1a1a1a !important;
          }
        `}
      </style>
      {children}
    </div>
  );
}
