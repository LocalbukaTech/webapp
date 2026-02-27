"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, SlidersHorizontal, Eye } from "lucide-react";
import { StatusBadge, BadgeStatus } from "@/components/admin/ui/StatusBadge";
import { Pagination } from "@/components/admin/ui/Pagination";
import { MdVerified } from "react-icons/md";

const MOCK_BUKAS = [
  { id: "RT-001", name: "Restaurant Name", address: "No 16, Fola Str, Lagos...", date: "24/12/25", addedBy: "John Doe", status: "Active", verified: true },
  { id: "RT-002", name: "Restaurant Name", address: "No 16, Fola Str, Lagos...", date: "24/12/25", addedBy: "John Doe", status: "Rejected", verified: false },
  { id: "RT-003", name: "Restaurant Name", address: "No 16, Fola Str, Lagos...", date: "24/12/25", addedBy: "John Doe", status: "Pending", verified: false },
  { id: "RT-004", name: "Restaurant Name", address: "No 16, Fola Str, Lagos...", date: "24/12/25", addedBy: "John Doe", status: "Active", verified: true },
  { id: "RT-005", name: "Restaurant Name", address: "No 16, Fola Str, Lagos...", date: "24/12/25", addedBy: "John Doe", status: "Rejected", verified: false },
  { id: "RT-006", name: "Restaurant Name", address: "No 16, Fola Str, Lagos...", date: "24/12/25", addedBy: "John Doe", status: "Pending", verified: false },
  { id: "RT-007", name: "Restaurant Name", address: "No 16, Fola Str, Lagos...", date: "24/12/25", addedBy: "John Doe", status: "Active", verified: false },
  { id: "RT-008", name: "Restaurant Name", address: "No 16, Fola Str, Lagos...", date: "24/12/25", addedBy: "John Doe", status: "Rejected", verified: false },
  { id: "RT-009", name: "Restaurant Name", address: "No 16, Fola Str, Lagos...", date: "24/12/25", addedBy: "John Doe", status: "Pending", verified: false },
  { id: "RT-010", name: "Restaurant Name", address: "No 16, Fola Str, Lagos...", date: "24/12/25", addedBy: "John Doe", status: "Pending", verified: false },
];

export default function BukaManagement() {
  const [selectedRestaurants, setSelectedRestaurants] = useState<Set<string>>(new Set());

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRestaurants(new Set(MOCK_BUKAS.map((b) => b.id)));
    } else {
      setSelectedRestaurants(new Set());
    }
  };

  const handleSelectRestaurant = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRestaurants);
    if (checked) newSelected.add(id);
    else newSelected.delete(id);
    setSelectedRestaurants(newSelected);
  };

  const isAllSelected = MOCK_BUKAS.length > 0 && selectedRestaurants.size === MOCK_BUKAS.length;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Utilities Bar */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-900" size={20} />
          <input
            type="text"
            placeholder="Search by email"
            className="w-full pl-12 pr-4 py-3 bg-[#F8F9FA] border-none rounded-xl text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#fbbe15]"
          />
        </div>

        <div className="flex items-center gap-8 text-sm font-medium text-zinc-600">
          <button className="flex items-center gap-2 hover:text-black transition-colors">
            <Calendar size={18} /> Date
          </button>
          <button className="flex items-center gap-2 hover:text-black transition-colors">
            <SlidersHorizontal size={18} /> Filters
          </button>
        </div>
      </div>

      {/* Main Card (Table) */}
      <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-zinc-900 border-b border-zinc-100">
              <th className="p-5 w-14 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 accent-[#fbbe15] cursor-pointer"
                />
              </th>
              <th className="p-5 font-semibold">ID</th>
              <th className="p-5 font-semibold">Restaurant Name</th>
              <th className="p-5 font-semibold">Address</th>
              <th className="p-5 font-semibold">Date Added</th>
              <th className="p-5 font-semibold">Added By</th>
              <th className="p-5 font-semibold">
                <div className="flex items-center justify-between">
                  Status
                  <SlidersHorizontal size={14} className="text-zinc-300" />
                </div>
              </th>
              <th className="p-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {MOCK_BUKAS.map((buka) => (
              <tr 
                key={buka.id} 
                className={`group hover:bg-zinc-50/50 transition-colors ${selectedRestaurants.has(buka.id) ? 'bg-[#FFF9E5]/30' : ''}`}
              >
                <td className="p-5 text-center">
                  <input
                    type="checkbox"
                    checked={selectedRestaurants.has(buka.id)}
                    onChange={(e) => handleSelectRestaurant(buka.id, e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-300 accent-[#fbbe15] cursor-pointer"
                  />
                </td>
                <td className="p-5 font-medium text-zinc-600">{buka.id}</td>
                <td className="p-5 font-medium text-zinc-900">
                  <div className="flex items-center gap-2">
                    {buka.name}
                    {buka.verified && <MdVerified className="text-[#fbbe15]" size={16} />}
                  </div>
                </td>
                <td className="p-5 text-zinc-500 truncate max-w-[200px]">{buka.address}</td>
                <td className="p-5 text-zinc-500">{buka.date}</td>
                <td className="p-5 text-zinc-500">{buka.addedBy}</td>
                <td className="p-5">
                  <StatusBadge status={buka.status as BadgeStatus} />
                </td>
                <td className="p-5 text-right">
                  <Link href={`/secure-admin/buka-management/${buka.id}`}>
                    <button className="text-zinc-300 hover:text-zinc-900 transition-colors">
                      <Eye size={20} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Inner Pagination */}
        <div className="p-5 border-t border-zinc-100">
          <Pagination currentPage={1} totalPages={10} />
        </div>
      </div>
    </div>
  );
}