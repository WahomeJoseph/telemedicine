'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Video } from 'lucide-react';

const ROTATING_WORDS = [
    'Virtual Care and Consultations',
    'Schedule Appointments and Checkups',
    'In-Person Visits at Our Clinic',
    'Receive Home-Based Care',
];

const HERO_IMAGES = [
    '/surgery.jpg', // doctor with patient
    '/surgery.jpg', // modern clinic interior
    '/surgery.jpg', // virtual consultation
];

export function HeroSection() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const nextImage = useCallback(() => {
        setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(nextImage, 6000);
        return () => clearInterval(interval);
    }, [nextImage]);

    return (
        <section className="relative min-h-screen flex items-center pt-10 overflow-hidden">
            {/* Sliding background images */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${HERO_IMAGES[currentImage]}')`,
                    }}
                    aria-hidden="true"
                />
            </AnimatePresence>

            {/* Color overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/85 to-cyan-950/80" />

            {/* Decorative blurs */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.07] rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/[0.05] rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                            Healthcare
                            <br />
                            that comes to you
                        </h1>

                        <div className="h-8 mb-8">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={currentWordIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-lg text-cyan-400 font-medium uppercase"
                                >
                                    {ROTATING_WORDS[currentWordIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        <p className="text-slate-400 text-base leading-relaxed max-w-md mb-10">
                            Connect with licensed doctors from home or visit our
                            clinic. Affordable, secure, and always available
                            when you need care.
                        </p>

                        <div className="flex items-center gap-2.5">
                            <Link
                                href="/book-appointment"
                                className="group px-7 py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-2"
                            >
                                Book Appointment
                            </Link>
                            <Link
                                href="/our-services"
                                className="px-7 py-3.5 text-slate-400 rounded-xl shadow-md hover:text-white text-sm font-medium transition-colors duration-300 inline-flex items-center gap-1 hover:bg-gradient-to-r from-primary to-accent"
                            >
                                View services
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden lg:block"
                    >
                        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-3xl p-8 relative">
                            <div
                                className="absolute -top-3 -right-3 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"
                                aria-hidden="true"
                            />

                            <div className="space-y-3 mb-8">
                                {[
                                    {
                                        icon: Video,
                                        title: 'Start Virtual Consult',
                                        sub: 'Connect in under 15 min',
                                        href: '/book-appointment',
                                    },
                                    {
                                        icon: Clock,
                                        title: 'Schedule Clinic Visit',
                                        sub: 'Mon–Sat, 24/7 availability',
                                        href: '/book-appointment',
                                    },
                                    {
                                        icon: Star,
                                        title: 'Receive and Enjoy Healthcare',
                                        sub: 'Mon–Sat, 24/7 availability',
                                        href: '/book-appointment',
                                    },
                                ].map((action) => {
                                    const Icon = action.icon;
                                    return (
                                        <Link
                                            key={action.title}
                                            href={action.href}
                                            className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.06] hover:border-cyan-500/20 hover:bg-white/[0.03] transition-all duration-300 group"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                                                <Icon className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <div>
                                                <p className="text-white text-sm font-semibold">
                                                    {action.title}
                                                </p>
                                                <p className="text-slate-500 text-xs">
                                                    {action.sub}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Slide indicators — bottom of hero */}
                <div className="flex justify-center lg:justify-start gap-2 mt-12">
                    {HERO_IMAGES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentImage(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                i === currentImage
                                    ? 'w-8 bg-cyan-400'
                                    : 'w-4 bg-white/20 hover:bg-white/40'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
