import PatientDashboard from "@/components/dashboard/patient/PatientDashboard";
import { Suspense } from "react";

export const metadata = {
  title: "Patient Dashboard - BioMedLink",
  description: "Access the patient dashboard for managing your BioMedLink operations.",
};

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PatientDashboard />
    </Suspense>
  )
}
