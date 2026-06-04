import AdminDashboardLayout from "@/components/dashboard/admin/AdminDashboardLayout";
import { Suspense } from "react";

export default function page({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminDashboardLayout>
                {children}
            </AdminDashboardLayout>
        </Suspense>
    )
}
