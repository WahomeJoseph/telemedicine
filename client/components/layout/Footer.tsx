import Link from 'next/link';
import {
    Phone,
    Mail,
    MapPin,
} from 'lucide-react';
import {
    FaFacebookF,
    FaXTwitter,
    FaInstagram,
    FaWhatsapp,
} from 'react-icons/fa6';

const nav_links = [
    {
        heading: 'Care',
        links: [
            { label: 'Our Services', href: '/our-services' },
            { label: 'Clinic Visit', href: '/book-appointment' },
            { label: 'Virtual Consult', href: '/book-appointment' },
            { label: 'Home-Based Care', href: '/book-appointment' },
            { label: 'Specialist Referral', href: '/book-appointment' },  
        ],
    },
    {
        heading: 'Company',
        links: [
            { label: 'About Us', href: '/about-us' },
            { label: 'Contact', href: '/contact-us' },
            { label: 'Careers', href: '/' },
            { label: 'Blog', href: '/' },
        ],
    },
    {
        heading: 'Legal',
        links: [
            { label: 'Privacy Policy', href: '/' },
            { label: 'Terms of Service', href: '/' },
        ],
    },
];

const contact = [
    {
        icon: Phone,
        value: '+254 768 166 223',
        href: 'tel:+254768166223',
    },
    {
        icon: Mail,
        value: 'lewisgichohi6@gmail.com',
        href: 'mailto:lewisgichohi6@gmail.com',
    },
    {
        icon: MapPin,
        value: 'Nairobi, Kenya',
        href: 'https://maps.google.com/?q=-1.2921,36.8219',
    },
];

const SOCIALS = [
    { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com/biomedlink' },
    { icon: FaXTwitter, label: 'X', href: 'https://x.com/biomedlink' },
    { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/254768166223' },
    { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com/biomedlink' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300">
            {/* Main footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-xl font-bold text-white">
                                Bio
                                <span className="text-cyan-400">Med</span>
                                Link
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
                            Quality healthcare, your way. Virtual consultations,
                            in-person visits, and specialist referrals — all in
                            one place.
                        </p>

                        {/* Contact info */}
                        <div className="space-y-2.5">
                            {contact.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.value}
                                        href={item.href}
                                        target={
                                            item.href.startsWith('http')
                                                ? '_blank'
                                                : undefined
                                        }
                                        rel={
                                            item.href.startsWith('http')
                                                ? 'noopener noreferrer'
                                                : undefined
                                        }
                                        className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                                    >
                                        <Icon className="w-4 h-4 flex-shrink-0" />
                                        {item.value}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {nav_links.map((group) => (
                        <div key={group.heading}>
                            <h4 className="text-white text-sm font-semibold mb-4">
                                {group.heading}
                            </h4>
                            <ul className="space-y-2.5">
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                        © {currentYear} BioMedLink. All rights reserved.
                    </p>

                    {/* Socials */}
                    <div className="flex items-center gap-3">
                        {SOCIALS.map((social) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow us on ${social.label}`}
                                    className="w-8 h-8 bg-slate-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
