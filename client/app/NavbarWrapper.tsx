'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

const noNavbarPaths = [
  '/login',
  '/register',
  '/dashboard/admin',
  '/dashboard/patient',
  '/dashboard/clinician',
  '/book-appointment',
];

const noNavbarPatterns = [
  /^\/dashboard\/.*/,
  /^\/auth\/.*/,
];

export default function NavbarWrapper() {
  const pathname = usePathname();

  const shouldHideNavbar = noNavbarPaths.includes(pathname) ||
    noNavbarPatterns.some(pattern => pattern.test(pathname));

  return !shouldHideNavbar ? <Navbar /> : null;
}
