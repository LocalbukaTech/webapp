"use client";

import { useState, useMemo, useCallback } from "react";
import { UserTabs } from "@/components/admin/user-management/UserTabs";
import { UserFilters, EMPTY_FILTERS } from "@/components/admin/user-management/UserFilters";
import type { DateRange, FilterState } from "@/components/admin/user-management/UserFilters";
import { UserTable } from "@/components/admin/user-management/UserTable";
import { RealAccountsTable } from "@/components/admin/user-management/RealAccountsTable";
import { UserPagination } from "@/components/admin/user-management/UserPagination";
import { mockRealAccountUsers, mockFakeUsers } from "@/constants/mockUsers";
import type { UserTab } from "@/types/admin";

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
    const [activeTab, setActiveTab] = useState<UserTab>("real");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // ── Filter state (lifted) ──
    const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
    const [dateRange, setDateRange] = useState<DateRange | null>(null);

    // ── Data sources (different per tab) ──
    const allRealUsers = mockRealAccountUsers;
    const allFakeUsers = mockFakeUsers;

    // ── Combined filtering pipeline for REAL accounts ──
    const filteredRealUsers = useMemo(() => {
        if (activeTab !== "real") return [];
        let result = [...allRealUsers];

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

        // 4) Date range filter
        if (dateRange) {
            const from = new Date(dateRange.from);
            const to = new Date(dateRange.to);
            to.setHours(23, 59, 59, 999);
            result = result.filter((u) => {
                const d = parseMockDate(u.registrationDate);
                return d >= from && d <= to;
            });
        }

        return result;
    }, [activeTab, allRealUsers, searchQuery, filters, dateRange]);

    // ── Combined filtering pipeline for FAKE/SPAM accounts ──
    const filteredFakeUsers = useMemo(() => {
        if (activeTab !== "fake") return [];
        let result = [...allFakeUsers];

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
            to.setHours(23, 59, 59, 999);
            result = result.filter((u) => {
                const d = parseMockDate(u.registrationDate);
                return d >= from && d <= to;
            });
        }

        return result;
    }, [activeTab, allFakeUsers, searchQuery, filters, dateRange]);

    // ── Derived values based on active tab ──
    const filteredUsers = activeTab === "real" ? filteredRealUsers : filteredFakeUsers;
    const totalUsers = activeTab === "real" ? allRealUsers.length : allFakeUsers.length;

    // ── Active filter count ──
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.location) count++;
        if (filters.status) count++;
        if (filters.flagReason && activeTab === "fake") count++;
        return count;
    }, [filters, activeTab]);

    // ── Pagination ──
    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedRealUsers = activeTab === "real"
        ? filteredRealUsers.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)
        : [];
    const paginatedFakeUsers = activeTab === "fake"
        ? filteredFakeUsers.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)
        : [];

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
        const currentPageIds = activeTab === "real"
            ? paginatedRealUsers.map((u) => u.id)
            : paginatedFakeUsers.map((u) => u.id);

        if (selectedIds.size === currentPageIds.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(currentPageIds));
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
        if (activeTab === "real") {
            // Export real accounts
            const header = "User ID,Email,Registration Date,Location,Total Posts,Status";
            const rows = filteredRealUsers.map(
                (u) => `${u.userId},${u.email},${u.registrationDate},${u.location},${u.totalPosts},${u.status}`
            );
            const content = [header, ...rows].join("\n");
            const blob = new Blob([content], { type: format === "csv" ? "text/csv" : "application/vnd.ms-excel" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `real_users_export.${format === "csv" ? "csv" : "xls"}`;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            // Export fake/spam accounts
            const sep = format === "csv" ? "," : "\t";
            const header = `User ID${sep}Sign-Up IP${sep}Email${sep}Registration Date${sep}Location${sep}Status${sep}System Flag Reason`;
            const rows = filteredFakeUsers.map(
                (u) => `${u.userId}${sep}${u.signUpIp}${sep}${u.email}${sep}${u.registrationDate}${sep}${u.location}${sep}${u.status}${sep}${u.systemFlagReason}`
            );
            const content = [header, ...rows].join("\n");
            const blob = new Blob([content], { type: format === "csv" ? "text/csv" : "application/vnd.ms-excel" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `fake_spam_users_export.${format === "csv" ? "csv" : "xls"}`;
            link.click();
            URL.revokeObjectURL(url);
        }
    };

    const currentPageUsers = activeTab === "real" ? paginatedRealUsers : paginatedFakeUsers;
    const allSelectedOnPage = currentPageUsers.length > 0 && selectedIds.size === currentPageUsers.length;

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Outer white container holds everything */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                {/* Tabs — inside the white container */}
                <div className="px-6 pt-5">
                    <UserTabs activeTab={activeTab} onTabChange={handleTabChange} />
                </div>

                {/* Filters + info bar */}
                <div className="px-6 pt-5 pb-4">
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
                        totalResultCount={totalUsers}
                        onDateChange={handleDateChange}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearFilters}
                        onExport={handleExport}
                        showFlagReasonFilter={activeTab === "fake"}
                        searchPlaceholder={activeTab === "real" ? "Search by email" : "Search by email or ID"}
                    />
                </div>

                {/* Table — border-only wrapper (no bg, inherits white from parent) */}
                <div className="mx-6 border border-gray-200 rounded-lg overflow-hidden">
                    {activeTab === "real" ? (
                        <RealAccountsTable
                            users={paginatedRealUsers}
                            selectedIds={selectedIds}
                            onToggleSelect={handleToggleSelect}
                            onToggleSelectAll={handleToggleSelectAll}
                            allSelected={allSelectedOnPage}
                        />
                    ) : (
                        <UserTable
                            users={paginatedFakeUsers}
                            selectedIds={selectedIds}
                            onToggleSelect={handleToggleSelect}
                            onToggleSelectAll={handleToggleSelectAll}
                            allSelected={allSelectedOnPage}
                        />
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-5">
                        <UserPagination
                            currentPage={safePage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
