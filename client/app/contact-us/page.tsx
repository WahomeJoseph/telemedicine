import { Suspense } from 'react';
import { Metadata } from 'next';
import { branch, departments } from '@/libs/constants/ContactData'
import { ContactHero } from '@/components/contacts/ContactHero';
import { ContactInfo } from '@/components/contacts/ContactInfo';
import { ContactFormSkeleton } from '@/components/contacts/ContactFormSkeleton';
import { DepartmentListSkeleton } from '@/components/contacts/DepartmentListSkeleton'
import { SocialLinks } from '@/components/contacts/SocialLinks';
import { ContactMap } from '@/components/contacts/ContactMap';
import { ContactFormWrapper } from '@/components/contacts/ContactFormWrapper';
import { DepartmentList } from '@/components/contacts/DepartmentList';

export const metadata: Metadata = {
  title: 'Contact Us - MediConnect | Get Medical Support',
  description: 'Reach out to MediConnect for appointments, emergencies, or general inquiries. Our medical team is available 24/7 to assist you with healthcare needs.',
  keywords: 'contact medical support, healthcare inquiries, hospital contact, medical appointments',
  openGraph: {
    title: 'Contact MediConnect - 24/7 Medical Support',
    description: 'Get in touch with our healthcare professionals',
    images: ['/images/og-contact.jpg'],
    type: 'website',
    url: 'https://mediconnect.com/contact-us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact MediConnect',
    description: '24/7 Medical Support Available',
    images: ['/images/twitter-contact.jpg'],
  },
  alternates: {
    canonical: 'https://mediconnect.com/contact-us',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-teal-50/20">
      <ContactHero />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>

            <div className="lg:col-span-2">
              <Suspense fallback={<ContactFormSkeleton />}>
                <ContactFormWrapper departments={departments} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Find Us Here</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit our centrally located main branch in Nairobi
            </p>
          </div>
          <Suspense fallback={<div className="h-[500px] bg-gray-100 animate-pulse rounded-2xl" />}>
            <ContactMap />
          </Suspense>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Direct Department Contacts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Contact our specialized departments for immediate assistance
            </p>
          </div>
          <Suspense fallback={<DepartmentListSkeleton />}>
            <DepartmentList departments={departments} />
          </Suspense>
        </div>
      </section>

      {/* Social Links */}
      <SocialLinks />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "MediConnect",
            "url": "https://mediconnect.com",
            "logo": "https://mediconnect.com/logo.png",
            "contactPoint": departments.map(dept => ({
              "@type": "ContactPoint",
              "telephone": dept.phone,
              "contactType": dept.name.toLowerCase().replace(/\s+/g, ''),
              "availableLanguage": ["English", "Swahili"]
            })),
            "address": {
              "@type": "PostalAddress",
              "streetAddress": branch.address,
              "addressLocality": branch.location,
              "addressCountry": "KE"
            }
          })
        }}
      />
    </div>
  );
}
