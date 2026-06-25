'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
    Video,
    Building2,
    CheckCircle2,
    Handshake,
    Syringe,
    Home,
} from 'lucide-react'

const core_services = [
    {
        icon: Syringe,
        title: 'Disease Treatment, Management & Vaccinations',
        description:
            'Expert care for acute and chronic conditions, plus preventive vaccinations to keep you healthy.',
        features: [
            'Comprehensive treatment plans',
            'Chronic disease management',
            'Preventive vaccinations',
        ],
    },
    {
        icon: Video,
        title: 'Virtual Consultations',
        description:
            'Connect with our doctors from anywhere via secure video calls. Get diagnosed, prescribed, and followed up - all from home.',
        features: [
            'Available 24/7',
            'Secure & encrypted',
            'Prescriptions sent digitally',
        ],
    },
    {
        icon: Home,
        title: 'Home-Based Care',
        description:
            'Registered nurses provide in-home care for recovery, chronic conditions, post-surgery support, elderly patients, and individuals with mobility challenges who prefer care at home.',
        features: [
            'Skilled nursing at home',
            'Post-surgery recovery support',
            'Chronic condition management',
        ],
    },
    {
        icon: Building2,
        title: 'In-Person Visits',
        description:
            'Visit our facility for hands-on examinations, lab work, and procedures that require physical presence.',
        features: [
            'Walk-ins welcome',
            'Modern equipment',
            'Comfortable environment',
        ],
    },
    {
        icon: Handshake,
        title: 'Specialist Referrals',
        description:
            'Need care beyond our scope? We connect you with trusted specialist partners and coordinate your entire referral - records, appointments, and follow-up.',
        features: [
            'Vetted partner network',
            'Seamless record transfer',
            'Follow-up coordination',
        ],
    },
]

const care_models = [
    {
        icon: Video,
        label: 'Virtual Care',
        title: 'Healthcare from Anywhere',
        image: '/virtual-care.jpg',
        description:
            'Our telemedicine platform lets you consult licensed doctors via secure video - no travel, no waiting rooms. Ideal for follow-ups, mental health, and non-emergency consultations.',
        points: [
            'Video consultations on any device',
            'Digital prescriptions & sick notes',
            'Secure messaging with your doctor',
            'Appointment scheduling or walk-in queue',
        ],
    },
    {
        icon: Building2,
        label: 'Physical Facility',
        title: 'Hands-On When You Need It',
        image: '/inpatient-care.jpg',
        description:
            'Some things need a human touch. Our clinic is equipped for examinations, lab work, minor procedures, and vaccinations - with the same team you trust online.',
        points: [
            'Modern, comfortable clinic space',
            'On-site lab & basic diagnostics',
            'Same doctors you see virtually',
            'Walk-ins welcome, appointments preferred',
        ],
    },
]

const process = [
    {
        step: '01',
        title: 'Choose Your Care Type',
        description:
            'Select virtual or in-person based on your needs. Not sure? Our intake form will recommend the best option.',
    },
    {
        step: '02',
        title: 'See a Doctor',
        description:
            'Get matched with an available provider. Virtual patients connect in under 15 minutes walk-ins are seen same-day.',
    },
    {
        step: '03',
        title: 'Get Your Care Plan',
        description:
            'Receive your diagnosis, prescriptions, lab orders, or specialist referral - all documented in your secure patient portal.',
    },
    {
        step: '04',
        title: 'Follow-Up & Support',
        description:
            'We check in after your visit. Need a referral? We coordinate with partner specialists and transfer your records seamlessly.',
    },
]

export function ServicesPage() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center mt-10 mb-16"
                >
                    <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-wider mb-3">
                        Our Services
                    </span>
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
                        <h1 className="mx-6 text-3xl md:text-4xl font-bold text-foreground">
                            Care That Comes{' '}
                            <span className="text-primary">to You</span>
                        </h1>
                        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Whether you need a virtual consultation from home,
                        home-based treatment, an in-person visit at our clinic,
                        or a referral to a specialist - we&apos;ve got you
                        covered. Quality healthcare, your way.
                    </p>
                </motion.div>

                {/* Core services */}
                <div className="container mx-auto px-4 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-xl px-4 mb-14"
                    >
                        <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-wider mb-3">
                            How We Serve You
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Ways to Get Care From BioMedLink
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Choose the care model that fits your situation. Start
                            anywhere - we&apos;ll guide you to the right path.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {core_services.map((service, i) => {
                            const Icon = service.icon
                            return (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.1,
                                    }}
                                    className="bg-slate-50 rounded-2xl p-7 relative group hover:shadow-md transition-shadow overflow-hidden"
                                >
                                    <div className="relative">
                                        <div className="w-12 h-12 mb-5 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center">
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed mb-5">
                                            {service.description}
                                        </p>

                                        <div className="space-y-2">
                                            {service.features.map(
                                                (feature) => (
                                                    <div
                                                        key={feature}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                                                        <span className="text-gray-600 text-sm">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                    <div />
                </div>

                {/* Care Models */}
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mt-14 mb-16"
                    >
                        <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-wider mb-3">
                            Hybrid Care
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            The Best of Both Worlds
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            We combine the convenience of telemedicine with the
                            reliability of a physical clinic - so you always get
                            the right type of care.
                        </p>
                    </motion.div>

                    {care_models.map((model, i) => {
                        const Icon = model.icon
                        const isOdd = i % 2 === 1

                        return (
                            <div
                                key={model.label}
                                className="grid md:grid-cols-2 gap-10 md:gap-12 items-center mb-20"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className={
                                        isOdd ? 'md:order-2' : 'md:order-1'
                                    }
                                >
                                    <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
                                        <div className="absolute top-4 right-4 w-28 h-28 bg-white/10 rounded-full" />
                                        <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/10 rounded-full" />

                                        <div className="relative z-10">
                                            <div className="w-12 h-12 mb-5 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>

                                            <span className="inline-block text-cyan-100 font-semibold text-xs uppercase tracking-wider mb-2">
                                                {model.label}
                                            </span>

                                            <h3 className="text-2xl font-bold mb-3">
                                                {model.title}
                                            </h3>

                                            <p className="text-cyan-100 leading-relaxed mb-6">
                                                {model.description}
                                            </p>

                                            <div className="space-y-2.5">
                                                {model.points.map((point) => (
                                                    <div
                                                        key={point}
                                                        className="flex items-center gap-2.5"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4 text-cyan-200 flex-shrink-0" />
                                                        <span className="text-white/90 text-sm">
                                                            {point}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: isOdd ? -20 : 20,
                                    }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className={
                                        isOdd ? 'md:order-1' : 'md:order-2'
                                    }
                                >
                                    <Image
                                        src={model.image}
                                        alt={model.title}
                                        width={420}
                                        height={420}
                                        className="w-full h-[420px] object-cover rounded-3xl shadow-xl"
                                    />
                                </motion.div>
                            </div>
                        )
                    })}
                </div>

                {/* Care Steps */}
                <div className="container mx-auto px-4 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-14"
                    >
                        <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-wider mb-3">
                            Your Journey
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            From Booking to Recovery
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            A seamless experience from your first click to your
                            follow-up - whether virtual or in-person.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                        <div
                            className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent"
                            aria-hidden="true"
                        />

                        {process.map((item, i) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: i * 0.1,
                                }}
                                className="text-center relative"
                            >
                                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg relative overflow-hidden">
                                    <div
                                        className="absolute top-1 right-1 w-6 h-6 bg-white/10 rounded-full"
                                        aria-hidden="true"
                                    />
                                    <span className="text-lg font-bold text-white relative z-10">
                                        {item.step}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-[220px] mx-auto">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
