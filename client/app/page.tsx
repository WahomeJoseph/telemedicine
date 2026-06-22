import { Suspense } from 'react';
import { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { HeroSkeleton } from '@/components/home/features/HeroSkeleton';
import { ServicesSection } from '@/components/home/ServiceSection';
import { ServicesSkeleton } from '@/components/home/features/ServicesSkeleton';
import { AboutSection } from '@/components/home/AboutSection';
import { DoctorsSkeleton } from '@/components/home/features/DoctorSkeleton';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TestimonialsSkeleton } from '@/components/home/features/TestimonialsSkeleton';
import { PartnersSkeleton } from '@/components/home/features/PartnersSkeleton';
import { FAQSkeleton } from '@/components/home/features/FAQSkeleton';
import { SERVICES, PARTNERS, HOW_IT_WORKS } from '@/libs/constants/HomeData';
import { DoctorsSection } from '@/components/home/DoctorsSection'
import { TestimonialsSection } from '@/components/home/TestimonialSection';
import { PartnersSection } from '@/components/home/PartnersSection';
import { FAQSection } from '@/components/home/FAQSection';

export const metadata: Metadata = {
  title: 'MediConnect — Professional Healthcare Services | 24/7 Medical Care in Kenya',
  description: 'Expert doctors and modern facilities. Book appointments, access emergency care, and get quality healthcare services at MediConnect. 24/7 medical support available.',
  keywords: 'hospital, doctors, healthcare, medical clinic, emergency care, pharmacy, Nairobi hospital, telemedicine',
  authors: [{ name: 'MediConnect' }],
  openGraph: {
    title: 'MediConnect — Professional Healthcare Services',
    description: 'Expert medical care at your service. Book appointments with top doctors in Kenya.',
    url: 'https://mediconnect.com',
    siteName: 'MediConnect',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MediConnect Healthcare Services',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MediConnect — Professional Healthcare Services',
    description: 'Expert medical care at your service. Book appointments with top doctors.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://mediconnect.com',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      {/* Services Section */}
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesSection services={SERVICES} />
      </Suspense>

      {/* About Section - Static */}
      <AboutSection />

      {/* Doctors Section - Lazy Load */}
      <Suspense fallback={<DoctorsSkeleton />}>
        <DoctorsSection />
      </Suspense>

      {/* How It Works Section - Static */}
      <HowItWorksSection steps={HOW_IT_WORKS} />

      {/* Testimonials Section - Lazy Load */}
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsSection />
      </Suspense>

      {/* Partners Section - Lazy Load */}
      <Suspense fallback={<PartnersSkeleton />}>
        <PartnersSection partners={PARTNERS} />
      </Suspense>

      {/* FAQ Section - Lazy Load */}
      <Suspense fallback={<FAQSkeleton />}>
        <FAQSection />
      </Suspense>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "MediConnect",
            "url": "https://mediconnect.com",
            "logo": "https://mediconnect.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+2547975969757",
              "contactType": "customer service",
              "availableLanguage": ["English", "Swahili"]
            },
            "sameAs": [
              "https://www.facebook.com/mediconnect",
              "https://twitter.com/mediconnect",
              "https://www.linkedin.com/company/mediconnect"
            ],
            "medicalSpecialty": ["General Practice", "Cardiology", "Neurology", "Pediatrics"],
            "availableService": SERVICES.map(service => ({
              "@type": "MedicalProcedure",
              "name": service.title,
              "description": service.desc
            }))
          })
        }}
      />
    </div>
  );
}
