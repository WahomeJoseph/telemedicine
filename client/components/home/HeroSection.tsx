'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { LucideIcon, Stethoscope, Users, Activity, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const iconMap: Record<string, LucideIcon> = {
    Stethoscope,
    Users,
    Activity,
    Award,
};

interface Stat {
    value: string;
    label: string;
    iconName: keyof typeof iconMap;
    sub: string;
}

interface HeroSectionProps {
    stats: Stat[];
}

export function HeroSection({ stats }: HeroSectionProps) {
    const [isVisible] = useState(true);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=80"
                    alt="Medical professionals providing care"
                    fill
                    className="object-cover"
                    priority
                    quality={85}
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
            </div>

            <div
                className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 transition-all duration-1000 transform ${isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                    }`}
            >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Healthcare that comes
                            <span className="text-accent-light block">
                                {' '}
                                to you
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                            The effect of the treatment on the physical,
                            emotional, and cognitive functions of the
                            individual.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button
                                variant="primary"
                                size="lg"
                                className="bg-primary text-primary hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                <Link href="/book-appointment">
                                    Book An Appointment
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white/30 text-white hover:bg-white/10"
                            >
                                <Link href="/services">Our Services</Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20">
                            {stats.map((stat, idx) => {
                                const Icon = iconMap[stat.iconName];

                                return (
                                    <div
                                        key={idx}
                                        className="text-center group"
                                    >
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>

                                        <p className="text-2xl font-bold text-white">
                                            {stat.value}
                                        </p>

                                        <p className="text-xs text-white/80">
                                            {stat.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
