"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBorderAll,
    faCircleUser,
    faStore,
    faFileLines,
    faBullhorn,
    faChartLine,
    faUserGear,
    type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

type NavItem = {
    label: string;
    href: string;
    faIcon: IconDefinition;
    flip?: boolean;
};

const adminNavItems: NavItem[] = [
    { faIcon: faBorderAll, label: "Dashboard", href: "/secure-admin" },
    { faIcon: faCircleUser, label: "User Management", href: "/secure-admin/user-management" },
    { faIcon: faStore, label: "Buka Management", href: "/secure-admin/buka-management" },
    { faIcon: faFileLines, label: "Content Moderation", href: "/secure-admin/content-moderation" },
    { faIcon: faBullhorn, label: "Ad Placements", href: "/secure-admin/ad-placements", flip: true },
    { faIcon: faChartLine, label: "Analytics & Reporting", href: "/secure-admin/analytics" },
    { faIcon: faUserGear, label: "Roles", href: "/secure-admin/roles" },
];

interface AdminSidebarProps {
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

export function AdminSidebar({ isCollapsed, onToggleCollapse }: AdminSidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "hidden md:flex flex-col justify-between min-h-screen border-r border-zinc-200 bg-white transition-[width] duration-300 sticky top-0 h-screen",
                isCollapsed ? "w-[72px] px-3 py-6 items-center" : "w-[240px] p-6"
            )}
        >
            <div className={cn("flex flex-col gap-6", isCollapsed ? "w-full items-center" : "")}>
                {/* Logo + Collapse Toggle */}
                <div className={cn(
                    "flex items-center",
                    isCollapsed ? "justify-center" : "justify-between"
                )}>
                    <Link
                        href="/secure-admin"
                        className={cn(
                            "flex items-center gap-2",
                            isCollapsed ? "justify-center" : ""
                        )}
                    >
                        {!isCollapsed && (
                            <span
                                className="text-xl text-zinc-900 font-normal"
                                style={{ fontFamily: 'var(--font-hakuna), sans-serif' }}
                            >
                                LocalBuka
                            </span>
                        )}
                        <Image
                            src="/images/localBuka_logo.png"
                            alt="LocalBuka"
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full"
                            priority
                        />
                    </Link>

                    <button
                        onClick={onToggleCollapse}
                        className={cn(
                            "w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-zinc-600 transition-colors rounded",
                            isCollapsed ? "mt-4" : ""
                        )}
                    >
                        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className={cn("flex flex-col gap-1", isCollapsed ? "w-full" : "")}>
                    {adminNavItems.map((item) => {
                        const isActive = item.href === "/secure-admin"
                            ? pathname === "/secure-admin"
                            : pathname?.startsWith(item.href);

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors",
                                    isActive
                                        ? "bg-[#fbbe15]/10 text-[#b8860b]"
                                        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700",
                                    isCollapsed ? "justify-center px-2" : ""
                                )}
                                title={isCollapsed ? item.label : undefined}
                            >
                                <FontAwesomeIcon
                                    icon={item.faIcon}
                                    flip={item.flip ? "horizontal" : undefined}
                                    className={cn(
                                        "w-[18px] h-[18px] flex-shrink-0",
                                        isActive ? "text-[#b8860b]" : ""
                                    )}
                                />
                                {!isCollapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
