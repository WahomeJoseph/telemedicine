import PatientDashboardLayout from "@/components/dashboard/patient/PatientDashboardLayout";
import { Suspense } from "react";

export default function page({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PatientDashboardLayout>
        {children}
      </PatientDashboardLayout>
    </Suspense>
  )
}
