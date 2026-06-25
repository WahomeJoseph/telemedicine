'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Heart,
    Activity,
    Award,
    Clock,
    Globe,
    CheckCircle2,
    BadgeCheck,
    Shield,
} from 'lucide-react';

const values = [
    {
        icon: Heart,
        title: 'Compassion',
        description:
            'Putting patients first with empathy, understanding, and genuine care in every interaction.',
        color: 'rose',
    },
    {
        icon: Clock,
        title: '24/7 Availability',
        description:
            "Healthcare doesn't wait, and neither do we. Our platform connects you to professionals around the clock.",
        color: 'blue',
    },
    {
        icon: Activity,
        title: 'Accessibility',
        description:
            'Making healthcare affordable and available to underserved communities worldwide.',
        color: 'emerald',
    },
    {
        icon: Award,
        title: 'Clinical Excellence',
        description:
            'We partner only with licensed, vetted professionals to ensure every consultation meets the highest clinical standards.',
        color: 'indigo',
    },
];

const team_strengths = [
    {
        icon: BadgeCheck,
        title: 'Licensed & Vetted',
        description:
            'Every provider on our platform is fully licensed, background-checked, and peer-reviewed before joining.',
    },
    {
        icon: Globe,
        title: 'Multi-Specialty Coverage',
        description:
            'From cardiology to pediatrics, our growing network covers the specialties you need most.',
    },
    {
        icon: Clock,
        title: 'Always Available',
        description:
            'Our rotating team ensures 24/7 coverage so you never have to wait for care.',
    },
    {
        icon: Shield,
        title: 'Continuous Training',
        description:
            'Our providers undergo regular telemedicine-specific training to deliver the best virtual care experience.',
    },
];

export function AboutUsPage() {
    return (
        <section className="pt-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center mt-10 mb-16"
                >
                    <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-wider mb-3">
                        About Us
                    </span>
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
                        <h2 className="mx-6 text-3xl md:text-4xl font-bold text-foreground">
                            Who&apos;re
                            <span className="text-primary">BioMedLink</span>
                        </h2>
                        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        We are a passionate team of healthcare professionals and
                        technologists united by a single belief: quality
                        healthcare should be accessible to everyone, everywhere.
                        Through innovative telemedicine solutions, we&apos;re
                        bridging the gap between patients and healthcare
                        providers.
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto mb-20 space-y-16">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-wider mb-3">
                                Our Mission
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                Making Healthcare Borderless
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We believe geography should never determine the
                                quality of care you receive. Our platform
                                connects patients in remote and underserved
                                areas with world-class medical professionals —
                                instantly, securely, and affordably.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                From virtual consultations to AI-assisted
                                diagnostics, we&apos;re building the future of
                                healthcare — one connection at a time.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-3xl p-12 text-white flex flex-col items-center justify-center text-center min-h-[320px] relative overflow-hidden"
                        >
                            <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full" />
                            <div className="absolute bottom-8 left-8 w-20 h-20 bg-white/10 rounded-full" />
                            <Heart className="w-16 h-16 mb-4 opacity-80" />
                            <p className="text-3xl font-bold mb-2">
                                Our Promise
                            </p>
                            <p className="text-cyan-100 text-lg max-w-xs">
                                Accessible, affordable, and compassionate care
                                for every person on the planet.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-wider mb-3">
                                Our Vision
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                A Future of Connected Care
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We envision a world where quality healthcare is
                                just a click away — no matter where you live. By
                                harnessing the power of technology, we&apos;re
                                breaking down barriers and making medical
                                expertise available to everyone, everywhere.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                From AI-powered diagnostics to virtual reality
                                consultations, we&apos;re building a future
                                where healthcare is more connected, more
                                compassionate, and more accessible than ever
                                before.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-3xl p-12 text-white flex flex-col items-center justify-center text-center min-h-[320px] relative overflow-hidden md:order-first"
                        >
                            <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full" />
                            <div className="absolute bottom-8 left-8 w-20 h-20 bg-white/10 rounded-full" />
                            <Heart className="w-16 h-16 mb-4 opacity-80" />
                            <p className="text-3xl font-bold mb-2">
                                Connected Care
                            </p>
                            <p className="text-cyan-100 text-lg max-w-xs">
                                Healthcare that is more connected, compassionate, 
                                and accessible than ever before.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Our Core Values */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center mb-12"
                >
                    <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-wider mb-3">
                        What Drives Us
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Our Core Values
                    </h3>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {values.map((value, i) => {
                        const Icon = value.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: i * 0.1,
                                }}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 mb-4 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    {value.title}
                                </h4>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Our Team */}
                <div className="grid md:grid-cols-2 gap-16 items-center mt-20 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-wider mb-3">
                            Our Team
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            A Growing Network of Trusted Professionals
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            We don&apos;t just hire healthcare professionals —
                            we build a carefully curated network of specialists
                            who share our passion for accessible healthcare.
                            Every provider is rigorously vetted, continuously
                            trained, and committed to delivering exceptional
                            virtual care.
                        </p>

                        <div className="space-y-3">
                            {[
                                'Board-certified specialists across 6+ disciplines',
                                'Rigorous multi-step vetting process',
                                'Ongoing telemedicine-specific training',
                                'Patient satisfaction scores above 4.8/5',
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {team_strengths.map((strength, i) => {
                            const Icon = strength.icon;
                            return (
                                <motion.div
                                    key={strength.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: i * 0.1,
                                    }}
                                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                                >
                                    <div className="relative">
                                        <div className="w-10 h-10 mb-3 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-sm font-bold text-gray-900 mb-1">
                                            {strength.title}
                                        </h4>
                                        <p className="text-gray-500 text-xs leading-relaxed">
                                            {strength.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            {/* CTA Section*/}
            <section className="py-20 px-4 mt-20 bg-gradient-to-r from-primary to-accent">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Transform Healthcare?
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of patients and providers who trust
                            our platform for quality telemedicine services.
                        </p>
                        <div className="flex flex-wrap gap-6 justify-center">
                            <Link
                                href="/book-appointment"
                                className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:shadow-lg hover:scale-110 transition-all duration-300 inline-flex items-center gap-2"
                            >
                                Book Appointment Now
                            </Link>
                            <Link
                                href="/contact"
                                className="px-6 py-3 bg-white text-primary font-semibold rounded-full hover:shadow-lg hover:scale-110 transition-all duration-300"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </section>
    );
}
