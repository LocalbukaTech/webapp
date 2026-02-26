"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, SlidersHorizontal, Download, Eye } from "lucide-react";
import { AdminTabs } from "@/components/admin/ui/AdminTabs";
import { StatusBadge, BadgeStatus } from "@/components/admin/ui/StatusBadge";
import { Pagination } from "@/components/admin/ui/Pagination";

// Mock Data matching the screenshot
const MOCK_USERS = [
  { id: "LB-001", email: "user@gmail.com", date: "24/12/25", location: "Lagos, Nigeria", posts: 30, status: "Active" },
  { id: "LB-002", email: "user@gmail.com", date: "24/12/25", location: "Lagos, Nigeria", posts: 30, status: "Banned" },
  { id: "LB-003", email: "user@gmail.com", date: "24/12/25", location: "Lagos, Nigeria", posts: 30, status: "Suspended" },
  { id: "LB-004", email: "user@gmail.com", date: "24/12/25", location: "Lagos, Nigeria", posts: 30, status: "Active" },
  { id: "LB-005", email: "user@gmail.com", date: "24/12/25", location: "Lagos, Nigeria", posts: 30, status: "Banned" },
  { id: "LB-006", email: "user@gmail.com", date: "24/12/25", location: "Lagos, Nigeria", posts: 30, status: "Suspended" },
  { id: "LB-007", email: "user@gmail.com", date: "24/12/25", location: "Lagos, Nigeria", posts: 30, status: "Active" },
  { id: "LB-008", email: "user@gmail.com", date: "24/12/25", location: "Lagos, Nigeria", posts: 30, status: "Banned" },
  { id: "LB-009", email: "user@gmail.com", date: "24/12/25", location: "Lagos, Nigeria", posts: 30, status: "Suspended" },
  { id: "LB-010", email: "user@gmail.com", date: "24/12/25", location: "Lagos, Nigeria", posts: 30, status: "Suspended" },
];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("Real Accounts");
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(new Set(MOCK_USERS.map((u) => u.id)));
    } else {
      setSelectedUsers(new Set());
    }
  };

  // Handle individual select
  const handleSelectUser = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedUsers);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedUsers(newSelected);
  };

  const isAllSelected = MOCK_USERS.length > 0 && selectedUsers.size === MOCK_USERS.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Container holding tabs to align correctly */}
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
        {/* Top Tabs */}
        <div>
          <AdminTabs 
            tabs={["Real Accounts", "Fake/Spam Accounts"]} 
            activeTab={activeTab} 
            onChange={setActiveTab} 
          />
        </div>

        {/* Main Card */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          {activeTab === "Fake/Spam Accounts" ? (
             <div className="flex flex-col items-center justify-center py-32 text-gray-400">
               <SlidersHorizontal size={48} className="mb-4 opacity-20" />
               <h3 className="text-xl font-medium text-gray-500 mb-2">Fake / Spam Accounts</h3>
               <p className="text-sm">This feature is coming soon.</p>
             </div>
          ) : (
             <>
                {/* Top Utilities (Search & Actions) */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  {/* Search */}
                  <div className="relative w-[320px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search by email"
                      className="w-full bg-gray-50 border-none rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-200"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-6 pr-2">
                    {/* Date Picker using native input trick */}
                    <div className="relative flex items-center">
                      <input 
                        type="date" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onClick={(e) => {
                          try {
                            if ('showPicker' in HTMLInputElement.prototype) {
                              e.currentTarget.showPicker();
                            }
                          } catch (err) {}
                        }}
                      />
                      <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors pointer-events-none">
                        <Calendar size={16} />
                        Date
                      </button>
                    </div>
                    
                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      <SlidersHorizontal size={16} />
                      Filters
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      <Download size={16} />
                      Export
                    </button>
                  </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-[auto_1fr_1.5fr_1fr_1.5fr_1fr_1fr_auto] gap-4 px-6 pt-4 pb-2 text-xs font-semibold text-[#1e293b] *:py-1 items-center bg-[#F8F9FA] border-b border-gray-100">
                  {/* Checkbox */}
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={isAllSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-[#fbbe15] focus:ring-[#fbbe15]" 
                    />
                  </div>
                  <div>User ID</div>
                  <div>Email</div>
                  <div>Registration Date</div>
                  <div>Location</div>
                  <div>Total Posts</div>
                  <div>Status</div>
                  <div className="flex justify-end pr-2 text-gray-400"><SlidersHorizontal size={16} /></div>
                </div>

                {/* Table Body */}
                <div className="flex flex-col">
                  {MOCK_USERS.map((user, i) => (
                    <div 
                      key={i} 
                      className={`grid grid-cols-[auto_1fr_1.5fr_1fr_1.5fr_1fr_1fr_auto] gap-4 px-6 items-center text-sm text-gray-600 border-b border-gray-50 hover:bg-gray-50 transition-colors py-[14px] ${selectedUsers.has(user.id) ? 'bg-[#FCF7E8]/30' : ''}`}
                    >
                      {/* Checkbox */}
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={selectedUsers.has(user.id)}
                          onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-[#fbbe15] focus:ring-[#fbbe15]" 
                        />
                      </div>
                      
                      <div className="font-medium text-gray-700">{user.id}</div>
                      <div>{user.email}</div>
                      <div>{user.date}</div>
                      <div>{user.location}</div>
                      <div>{user.posts}</div>
                      <div>
                        <StatusBadge status={user.status as BadgeStatus} />
                      </div>
                      
                      {/* Action Column */}
                      <div className="flex justify-end pr-2">
                        <Link 
                          href={`/secure-admin/user-management/${user.id}`}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Eye size={18} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination currentPage={1} totalPages={10} />
             </>
          )}
        </div>
      </div>
    </div>
  );
}
