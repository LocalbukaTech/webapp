import { AdminLayout } from "@/components/admin/AdminLayout";

export default function SecureAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AdminLayout>{children}</AdminLayout>;
}
