import PatientDashboard from "@/components/dashboard/patient/PatientDashboard";
import { Suspense } from "react";

export const metadata = {
  title: "Patient Dashboard - MediConnect",
  description: "Access the patient dashboard for managing your MediConnect operations.",
};

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PatientDashboard />
    </Suspense>
  )
}
