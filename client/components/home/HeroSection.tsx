'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROTATING_WORDS = [
    'Virtual Care and Consultations',
    'Schedule Appointments and Checkups',
    'In-Person Visits at Our Clinic',
    'Receive Home-Based Care',
];

const HERO_IMAGES = [
    '/surgery.jpg',
    '/surgery.jpg',
    '/surgery.jpg',
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
        <section className="relative min-h-[90svh] lg:min-h-screen flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
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

            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/85 to-cyan-950/80" />

            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-cyan-500/[0.07] rounded-full blur-3xl" />

                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-teal-500/[0.05] rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-20 w-full">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mt-6 mb-6">
                            Healthcare
                            that comes to you
                        </h1>

                        <div className="min-h-[3rem] sm:min-h-[2.5rem] mb-3">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={currentWordIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-base sm:text-lg lg:text-xl text-cyan-400 font-medium uppercase"
                                >
                                    {ROTATING_WORDS[currentWordIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
                            Connect with licensed doctors from the comfort of
                            your home or visit our clinic for expert care.
                            Affordable, secure, and always available when you
                            need it most.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/book-appointment"
                                className="px-7 py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-center transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                            >
                                Book Appointment
                            </Link>

                            <Link
                                href="/our-services"
                                className="px-7 py-3.5 rounded-xl border border-white/10 text-slate-300 text-center hover:text-white hover:border-primary transition-all duration-300"
                            >
                                View Services
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
