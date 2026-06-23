import type { Metadata } from "next";
import "./globals.css"
import NavbarWrapper from "./NavbarWrapper";
import { Footer } from "@/components/layout/Footer";  

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: "BioMedLink - Your Telemedicine Hub",
  description: "Connect with top healthcare providers from the comfort of your home. Book appointments, access medical records, and get expert care online.",
  openGraph: {
    title: "BioMedLink - Your Telemedicine Hub",
    description: "Connect with top healthcare providers from the comfort of your home. Book appointments, access medical records, and get expert care online.",
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: "BioMedLink",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BioMedLink Telemedicine Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BioMedLink - Your Telemedicine Hub",
    description: "Connect with top healthcare providers from the comfort of your home.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE || "",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <NavbarWrapper />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
