'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Mail } from 'lucide-react';
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from '@/components/ui/Button';

const DOCTORS = [
    {
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        experience: '12 years',
        rating: 4.9,
        image: '/doctor-lab.jpg',
        linkedin: "http://www.linkedin.com/in/joseph-wachira-202a70237",
        twitter: "https://x.com/WachiraJoseph17",
        email: "josephwachira589@gmail.com",
    },
    {
        name: 'Dr. Michael Chen',
        specialty: 'Neurologist',
        experience: '15 years',
        rating: 4.8,
        image: '/doctor-lab.jpg',
        linkedin: "http://www.linkedin.com/in/joseph-wachira-202a70237",
        twitter: "https://x.com/WachiraJoseph17",
        email: "josephwachira589@gmail.com",
    },
    {
        name: 'Dr. Amina Hassan',
        specialty: 'Pediatrician',
        experience: '10 years',
        rating: 5.0,
        image: '/doctor-lab.jpg',
        linkedin: "http://www.linkedin.com/in/joseph-wachira-202a70237",
        twitter: "https://x.com/WachiraJoseph17",
        email: "josephwachira589@gmail.com",
    },
];

export function DoctorsSection() {
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header - Exact same layout as original */}
                <div className="text-left mb-8">
                    <h2 className="text-xl md:text-lg uppercase font-bold text-foreground">
                        Our <span className="text-primary">Team</span>
                    </h2>
                    <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Meet the dedicated professionals driving our healthcare services
                    </p>
                </div>

                {/* Doctors Grid - Exact same grid layout */}
                <div className="grid md:grid-cols-3 gap-10">
                    {DOCTORS.map((doctor, index) => (
                        <div key={doctor.name} className="relative group">
                            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                                {/* Image with loading optimization */}
                                <Image
                                    src={doctor.image}
                                    width={400}
                                    height={400}
                                    alt={doctor.name}
                                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${loadedImages[doctor.name] ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    onLoad={() => {
                                        setLoadedImages(prev => ({ ...prev, [doctor.name]: true }));
                                    }}
                                    priority={index === 0} // Only first doctor gets priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                                />

                                {/* Skeleton loader while image loads */}
                                {!loadedImages[doctor.name] && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                {/* Snack bar - Exact same design */}
                                <div className="absolute bottom-4 left-4 right-4 bg-primary/50 text-white p-4 border-l border-accent rounded-2xl shadow-2xl backdrop-blur-xs">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold mb-1">{doctor.name}</h3>
                                            <p className="text-white/90 text-sm">{doctor.specialty}</p>
                                        </div>

                                        {/* Social links - Exact same */}
                                        <div className="flex space-x-2">
                                            <a
                                                href={doctor.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white group/link"
                                                aria-label={`Connect with ${doctor.name} on LinkedIn`}
                                            >
                                                <FaLinkedinIn className="w-4 h-4 text-accent group-hover/link:text-white" />
                                            </a>
                                            <a
                                                href={doctor.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white group/link"
                                                aria-label={`Follow ${doctor.name} on Twitter`}
                                            >
                                                <FaXTwitter className="w-4 h-4 text-accent group-hover/link:text-white" />
                                            </a>
                                            <a
                                                href={`mailto:${doctor.email}`}
                                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white group/link"
                                                aria-label={`Email ${doctor.name}`}
                                            >
                                                <Mail className="w-4 h-4 text-accent group-hover/link:text-white" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        variant="outline" size="lg" className="hover:scale-105 transition-transform">
                        <Link href="/contact-us">
                            Visit Our Facility
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
