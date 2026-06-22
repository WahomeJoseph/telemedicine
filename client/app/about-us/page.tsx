import { Suspense } from 'react';
import { Metadata } from 'next';
import { AboutUsPage } from '@/components/pages/AboutUsPage';

export const metadata: Metadata = {
    title: 'About Us - BioMedLink | Revolutionizing Healthcare Through Technology',
    description: 'Learn about BioMedLink - our mission to make quality healthcare accessible to everyone through innovative telemedicine solutions, connecting patients with providers seamlessly.',
    keywords: 'telemedicine about, healthcare technology, medical innovation, telemed mission, virtual healthcare',
    openGraph: {
        title: 'About BioMedLink - Revolutionizing Healthcare Through Technology',
        description: 'Making quality healthcare accessible to everyone, anywhere, through innovative telemedicine solutions.',
        images: ['/images/og-about.jpg'],
        type: 'website',
        url: 'https://biomedlink.com/about',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About BioMedLink - Revolutionizing Healthcare',
        description: 'Making quality healthcare accessible to everyone, anywhere.',
        images: ['/images/twitter-about.jpg'],
    },
    alternates: {
        canonical: 'https://biomedlink.com/about',
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/20 to-teal-50/20">
            <Suspense fallback={<AboutSkeleton />}>
                <AboutUsPage />
            </Suspense>

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "MedicalOrganization",
                        "name": "BioMedLink",
                        "url": "https://biomedlink.com",
                        "logo": "https://biomedlink.com/logo.png",
                        "description": "Revolutionizing healthcare through innovative telemedicine technology.",
                        "founder": {
                            "@type": "Person",
                            "name": "Dr. Sarah Johnson"
                        },
                        "address": {
                            "@type": "PostalAddress",
                            "addressCountry": "KE"
                        }
                    })
                }}
            />
        </div>
    );
}

function AboutSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-[400px] bg-gradient-to-br from-cyan-600/50 to-teal-600/50 rounded-b-3xl" />
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="h-64 bg-slate-200 rounded-2xl" />
                    <div className="h-64 bg-slate-200 rounded-2xl" />
                </div>
            </div>
        </div>
    );
}
