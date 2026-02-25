"use client";

import { useState, useMemo, useCallback } from "react";
import { UserTabs } from "@/components/admin/user-management/UserTabs";
import { UserFilters, EMPTY_FILTERS } from "@/components/admin/user-management/UserFilters";
import type { DateRange, FilterState } from "@/components/admin/user-management/UserFilters";
import { UserTable } from "@/components/admin/user-management/UserTable";
import { UserPagination } from "@/components/admin/user-management/UserPagination";
import { mockRealUsers, mockFakeUsers } from "@/constants/mockUsers";
import type { UserTab, AdminUser } from "@/types/admin";

const ITEMS_PER_PAGE = 10;

/**
 * Parse a DD/MM/YY date string into a Date object.
 * Assumes years 00–49 = 2000–2049, 50–99 = 1950–1999.
 */
function parseMockDate(dateStr: string): Date {
    const parts = dateStr.split("/");
    if (parts.length !== 3) return new Date(0);
    const [day, month, shortYear] = parts.map(Number);
    const year = shortYear < 50 ? 2000 + shortYear : 1900 + shortYear;
    return new Date(year, month - 1, day);
}

export function UserManagementPage() {
    // ── Core state ──
    const [activeTab, setActiveTab] = useState<UserTab>("fake");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // ── Filter state (lifted) ──
    const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
    const [dateRange, setDateRange] = useState<DateRange | null>(null);

    // Data source
    const allUsers = activeTab === "real" ? mockRealUsers : mockFakeUsers;

    // ── Combined filtering pipeline ──
    const filteredUsers = useMemo(() => {
        let result: AdminUser[] = allUsers;

        // 1) Search
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (u) =>
                    u.email.toLowerCase().includes(q) ||
                    u.userId.toLowerCase().includes(q)
            );
        }

        // 2) Location filter
        if (filters.location) {
            result = result.filter((u) => u.location === filters.location);
        }

        // 3) Status filter
        if (filters.status) {
            result = result.filter((u) => u.status === filters.status);
        }

        // 4) System Flag Reason filter
        if (filters.flagReason) {
            result = result.filter((u) => u.systemFlagReason === filters.flagReason);
        }

        // 5) Date range filter
        if (dateRange) {
            const from = new Date(dateRange.from);
            const to = new Date(dateRange.to);
            // Set 'to' to end of day
            to.setHours(23, 59, 59, 999);
            result = result.filter((u) => {
                const d = parseMockDate(u.registrationDate);
                return d >= from && d <= to;
            });
        }

        return result;
    }, [allUsers, searchQuery, filters, dateRange]);

    // ── Active filter count ──
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.location) count++;
        if (filters.status) count++;
        if (filters.flagReason) count++;
        return count;
    }, [filters]);

    // ── Pagination ──
    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedUsers = filteredUsers.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE
    );

    // ── Handlers ──
    const handleToggleSelect = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleToggleSelectAll = () => {
        if (selectedIds.size === paginatedUsers.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(paginatedUsers.map((u) => u.id)));
        }
    };

    const handleTabChange = (tab: UserTab) => {
        setActiveTab(tab);
        setCurrentPage(1);
        setSelectedIds(new Set());
        setSearchQuery("");
        setFilters(EMPTY_FILTERS);
        setDateRange(null);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSelectedIds(new Set());
    };

    const handleFilterChange = useCallback(
        (f: FilterState) => {
            setFilters(f);
            setCurrentPage(1);
            setSelectedIds(new Set());
        },
        []
    );

    const handleDateChange = useCallback(
        (range: DateRange | null) => {
            setDateRange(range);
            setCurrentPage(1);
            setSelectedIds(new Set());
        },
        []
    );

    const handleClearFilters = useCallback(() => {
        setSearchQuery("");
        setFilters(EMPTY_FILTERS);
        setDateRange(null);
        setCurrentPage(1);
        setSelectedIds(new Set());
    }, []);

    const handleExport = (format: "csv" | "excel") => {
        // Build CSV / Excel from the current filteredUsers
        if (format === "csv") {
            const header = "User ID,Sign-Up IP,Email,Registration Date,Location,Status,System Flag Reason";
            const rows = filteredUsers.map(
                (u) => `${u.userId},${u.signUpIp},${u.email},${u.registrationDate},${u.location},${u.status},${u.systemFlagReason}`
            );
            const csv = [header, ...rows].join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "users_export.csv";
            link.click();
            URL.revokeObjectURL(url);
        } else {
            // For Excel, fall back to CSV with .xls extension (real Excel would need a library)
            const header = "User ID\tSign-Up IP\tEmail\tRegistration Date\tLocation\tStatus\tSystem Flag Reason";
            const rows = filteredUsers.map(
                (u) => `${u.userId}\t${u.signUpIp}\t${u.email}\t${u.registrationDate}\t${u.location}\t${u.status}\t${u.systemFlagReason}`
            );
            const tsv = [header, ...rows].join("\n");
            const blob = new Blob([tsv], { type: "application/vnd.ms-excel" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "users_export.xls";
            link.click();
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-[1200px]">
            {/* Tabs */}
            <UserTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Filters + info bar */}
            <UserFilters
                searchQuery={searchQuery}
                onSearchChange={(q) => {
                    setSearchQuery(q);
                    setCurrentPage(1);
                }}
                filters={filters}
                dateRange={dateRange}
                activeFilterCount={activeFilterCount}
                filteredResultCount={filteredUsers.length}
                totalResultCount={allUsers.length}
                onDateChange={handleDateChange}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                onExport={handleExport}
            />

            {/* Table */}
            <UserTable
                users={paginatedUsers}
                selectedIds={selectedIds}
                onToggleSelect={handleToggleSelect}
                onToggleSelectAll={handleToggleSelectAll}
                allSelected={paginatedUsers.length > 0 && selectedIds.size === paginatedUsers.length}
            />

            {/* Pagination */}
            {totalPages > 1 && (
                <UserPagination
                    currentPage={safePage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
