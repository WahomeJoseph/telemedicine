import BookAppointmentPage from "@/components/pages/Booking";
import { Suspense } from "react";

export const metadata = {
  title: "Book Appointment - MediConnect",
  description: "Schedule an appointment with a healthcare provider through MediConnect.",
};

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <BookAppointmentPage />
    </Suspense>
  )
}
