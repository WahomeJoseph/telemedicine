import { Suspense } from "react";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";

export const metadata = {
  title: "Admin Dashboard - MediConnect",
  description: "Access the admin dashboard for managing MediConnect operations.",
};

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDashboard />
    </Suspense>
  )
}
