import BookAppointmentPage from "@/components/pages/Booking";
import { Suspense } from "react";

export const metadata = {
  title: "Book Appointment - BioMedLink",
  description: "Schedule an appointment with a healthcare provider through BioMedLink.",
};

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <BookAppointmentPage />
    </Suspense>
  )
}
