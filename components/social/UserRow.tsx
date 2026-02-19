/* eslint-disable @next/next/no-img-element */
import { SocialUser } from "./types";

interface Props {
  user: SocialUser;
}

export default function UserRow({ user }: Props) {
  // Logic: "Follow" or "Follow back" gets the yellow background
  const isYellow = user.actionLabel === "Follow" || user.actionLabel === "Follow back";

  return (
    <div className="flex items-center justify-between py-3 px-2 rounded-lg transition-colors hover:bg-white/5">
      
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 flex-shrink-0">
          <img
            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff`}
            className="w-full h-full rounded-full object-cover border border-gray-800"
            alt={user.name}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; 
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff`;
            }}
          />
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-white text-[14px] font-semibold">
            {user.name}
          </span>
          <span className="text-gray-500 text-[12px] mt-0.5">
            @{user.username}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        className={`min-w-[95px] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-tight transition-all active:scale-95
          ${isYellow 
            ? "bg-[#FFC107] text-black" 
            : "bg-white text-black"
          }`}
      >
        {user.actionLabel}
      </button>
    </div>
  );
}