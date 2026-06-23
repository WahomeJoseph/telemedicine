'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react';
import {
    FaFacebookF,
    FaXTwitter,
    FaInstagram,
    FaWhatsapp,
} from 'react-icons/fa6';

const contact_info = [
    {
        icon: Phone,
        label: 'Call Us',
        value: '+254 768 166 223',
        sub: 'Homecare & virtual consults',
        href: 'tel:+254768166223',
    },
    {
        icon: Mail,
        label: 'Email Us',
        value: 'lewisgichohi6@gmail.com',
        sub: 'We reply within 24hrs',
        href: 'mailto:lewisgichohi6@gmail.com',
    },
    {
        icon: MapPin,
        label: 'Visit Us',
        value: 'Nairobi, Kenya',
        sub: 'Walk-ins welcome',
        href: 'https://maps.google.com/?q=-1.2921,36.8219',
    },
    {
        icon: Clock,
        label: 'Hours',
        value: 'Mon–Sat: 6AM–10PM',
        sub: '24/7 Emergency Care',
        href: null,
    },
];

const socials = [
    {
        icon: FaFacebookF,
        label: 'Facebook',
        href: 'https://facebook.com/biomedlink',
    },
    {
        icon: FaXTwitter,
        label: 'X (Twitter)',
        href: 'https://x.com/biomedlink',
    },
    {
        icon: FaWhatsapp,
        label: 'WhatsApp',
        href: 'https://wa.me/254768166223',
    },
    {
        icon: FaInstagram,
        label: 'Instagram',
        href: 'https://instagram.com/biomedlink',
    },
];

const MAP_SRC = 'https://maps.google.com/?q=Nairobi,Kenya&output=embed';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState<
        'idle' | 'submitting' | 'success' | 'error'
    >('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to send message');

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch {
            setStatus('error');
            setErrorMessage(
                'Something went wrong. Please try again or call us directly.'
            );
        }
    };

    const isValid =
        formData.name.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.message.trim() !== '';

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-900 mb-1 capitalize">
                Send us a message
            </h2>
            <p className="text-gray-500 text-sm mb-8">
                Fill out the form and we&apos;ll get back to you within 24
                hours.
            </p>

            {/* Success state */}
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3"
                    >
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-emerald-800 font-semibold text-sm">
                                Message sent!
                            </p>
                            <p className="text-emerald-600 text-xs mt-0.5">
                                We&apos;ll get back to you within 24 hours.
                                Check your email for a confirmation.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error state */}
            <AnimatePresence>
                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-red-600 text-sm">{errorMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Full Name{' '}
                            <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email{' '}
                            <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone{' '}
                        <span className="text-gray-300 font-normal">
                            (optional)
                        </span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+254 700 000 000"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Message{' '}
                        <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all resize-none text-sm"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!isValid || status === 'submitting'}
                    className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm"
                >
                    {status === 'submitting' ? (
                        <span className="inline-flex items-center gap-2">
                            <svg
                                className="animate-spin w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    className="opacity-25"
                                />
                                <path
                                    d="M4 12a8 8 0 018-8"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    className="opacity-75"
                                />
                            </svg>
                            Sending…
                        </span>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Send Message
                        </>
                    )}
                </button>

                <p className="text-xs text-center text-gray-400 pt-2">
                    By submitting, you agree to our{' '}
                    <Link
                        href="/privacy"
                        className="text-cyan-600 hover:underline"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </form>
        </motion.div>
    );
}

export function ContactPageSection() {
    return (
        <section className="py-24 bg-slate-50">

            {/* Hero Section */}
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center mt-10 mb-8"
                >
                    <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-wider mb-3">
                        Contact Us
                    </span>
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent max-w-[150px]" />
                        <h1 className="mx-6 text-3xl md:text-4xl font-bold text-gray-900">
                            Get in{' '}
                            <span className="text-cyan-600">Touch</span>
                        </h1>
                        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent max-w-[150px]" />
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Have a question, need an appointment, or just want to
                        say hello? We&apos;re here to help.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {contact_info.map((item, i) => {
                        const Icon = item.icon;
                        const Wrapper = item.href ? 'a' : 'div';
                        const wrapperProps = item.href
                            ? {
                                href: item.href,
                                target: item.href.startsWith('http')
                                    ? '_blank'
                                    : undefined,
                                rel: item.href.startsWith('http')
                                    ? 'noopener noreferrer'
                                    : undefined,
                            }
                            : {};

                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: i * 0.1,
                                }}
                            >
                                <Wrapper
                                    {...wrapperProps}
                                    className="bg-white rounded-2xl p-5 text-center group cursor-pointer hover:shadow-md transition-shadow block"
                                >
                                    <div className="w-10 h-10 mx-auto mb-3 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <p className="font-semibold text-gray-900 text-sm">
                                        {item.value}
                                    </p>
                                    <p className="text-gray-400 text-xs mt-0.5">
                                        {item.sub}
                                    </p>
                                </Wrapper>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Contact Section */}
            <div className="container mx-auto px-4 mt-16 max-w-5xl">
                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    <div className="lg:col-span-3">
                        <ContactForm />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Quick note */}
                        <div className="bg-slate-50 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                Before you write
                            </h3>
                            <div className="space-y-3">
                                {[
                                    'For emergencies, please call us directly.',
                                    'We respond to all messages within 24 hours.',
                                    'Need a virtual consult? You can book one directly.',
                                    'Require home visit via Home-Based care programme? Call us directly.',
                                ].map((note) => (
                                    <div
                                        key={note}
                                        className="flex items-start gap-2"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-600 text-sm">
                                            {note}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/book-appointment"
                                className="bg-gradient-to-r from-primary to-accent px-6 py-3 rounded-md mt-5 inline-flex items-center gap-2 text-white text-sm font-semibold hover:shadow-lg transition-all duration-300"
                            >
                                Book an appointment instead
                            </Link>
                        </div>

                        {/* Socials */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">
                                Follow us
                            </h3>
                            <div className="flex gap-3">
                                {socials.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Follow us on ${social.label}`}
                                            className="w-10 h-10 bg-slate-100 hover:bg-cyan-600 rounded-xl flex items-center justify-center text-gray-500 hover:text-white transition-all duration-300"
                                        >
                                            <Icon className="w-4 h-4" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Map Section */}
            <div className="container mx-auto px-4 mt-16  max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Find Us
                    </h2>
                    <p className="text-gray-500">
                        Visit our clinic in Nairobi, Kenya. We&apos;re here to provide you with the best healthcare services.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
                >
                    <iframe
                        title="BioMedLink Clinic Location"
                        src={MAP_SRC}
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full"
                    />
                </motion.div>
            </div>

        </section>
    );
}
