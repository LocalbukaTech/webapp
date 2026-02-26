export type UserTab = 'real' | 'fake';

export type UserStatus = 'Active' | 'Flagged' | 'Banned' | 'Suspended';

export interface AdminUser {
    id: string;
    userId: string;
    signUpIp: string;
    email: string;
    registrationDate: string;
    location: string;
    systemFlagReason: string;
    status: UserStatus;
}

export interface RealAccountUser {
    id: string;
    userId: string;
    email: string;
    registrationDate: string;
    location: string;
    totalPosts: number;
    status: UserStatus;
}

export interface UserFiltersState {
    search: string;
    tab: UserTab;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    dateFrom?: string;
    dateTo?: string;
    location?: string;
    status?: string;
    flagReason?: string;
    page?: number;
    pageSize?: number;
}

export interface AdminNavItem {
    icon: React.ReactNode;
    label: string;
    href: string;
}
