'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Mail } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Button } from '@/components/ui/Button';

const DOCTORS = [
    {
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        experience: '12 years',
        rating: 4.9,
        image: '/doctor-lab.jpg',
        linkedin: 'http://www.linkedin.com/in/joseph-wachira-202a70237',
        twitter: 'https://x.com/WachiraJoseph17',
        email: 'josephwachira589@gmail.com',
    },
    {
        name: 'Dr. Michael Chen',
        specialty: 'Neurologist',
        experience: '15 years',
        rating: 4.8,
        image: '/doctor-lab.jpg',
        linkedin: 'http://www.linkedin.com/in/joseph-wachira-202a70237',
        twitter: 'https://x.com/WachiraJoseph17',
        email: 'josephwachira589@gmail.com',
    },
    {
        name: 'Dr. Amina Hassan',
        specialty: 'Pediatrician',
        experience: '10 years',
        rating: 5.0,
        image: '/doctor-lab.jpg',
        linkedin: 'http://www.linkedin.com/in/joseph-wachira-202a70237',
        twitter: 'https://x.com/WachiraJoseph17',
        email: 'josephwachira589@gmail.com',
    },
];

export function DoctorsSection() {
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>(
        {}
    );

    return (
        <section className="py-16 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 sm:mb-12">
                    <h2 className="text-sm sm:text-base lg:text-lg uppercase font-bold tracking-wider text-primary mb-2">
                        Our Team
                    </h2>

                    <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 max-w-3xl leading-tight">
                        Meet the dedicated professionals driving our healthcare
                        services
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {DOCTORS.map((doctor, index) => (
                        <div
                            key={doctor.name}
                            className="relative group h-full"
                        >
                            <div className="relative overflow-hidden rounded-2xl shadow-xl">

                                <div className="relative aspect-[4/5]">
                                    <Image
                                        src={doctor.image}
                                        alt={doctor.name}
                                        fill
                                        className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                                            loadedImages[doctor.name]
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        }`}
                                        onLoad={() => {
                                            setLoadedImages((prev) => ({
                                                ...prev,
                                                [doctor.name]: true,
                                            }));
                                        }}
                                        priority={index === 0}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />

                                    {!loadedImages[doctor.name] && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                </div>

                                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-primary/60 backdrop-blur-md text-white p-3 sm:p-4 border-l-2 border-accent rounded-xl sm:rounded-2xl shadow-2xl">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-sm sm:text-lg font-bold truncate">
                                                {doctor.name}
                                            </h3>

                                            <p className="text-xs sm:text-sm text-white/90">
                                                {doctor.specialty}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                            <a
                                                href={doctor.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-primary"
                                                aria-label={`Connect with ${doctor.name} on LinkedIn`}
                                            >
                                                <FaLinkedinIn className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                                            </a>

                                            <a
                                                href={doctor.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-primary"
                                                aria-label={`Follow ${doctor.name} on X`}
                                            >
                                                <FaXTwitter className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                                            </a>

                                            <a
                                                href={`mailto:${doctor.email}`}
                                                className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-primary"
                                                aria-label={`Email ${doctor.name}`}
                                            >
                                                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10 sm:mt-12">
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto hover:scale-105 transition-transform"
                    >
                        <Link href="/contact-us">
                            Visit Our Facility
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
