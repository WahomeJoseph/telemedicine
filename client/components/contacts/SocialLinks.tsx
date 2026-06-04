'use client'

import { socialLinks } from '@/libs/constants/ContactData';
import { FaFacebookF, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const iconMap = {
    FaFacebookF,
    FaTwitter,
    FaLinkedin,
    FaInstagram
};

export function SocialLinks() {
    return (
        <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">Connect With Us</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Follow us on social media for health tips, medical updates, and community news
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                    {socialLinks.map((social) => {
                        const Icon = iconMap[social.icon as keyof typeof iconMap];
                        const hoverStyles = social.name === 'Instagram'
                            ? 'hover:bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]'
                            : `hover:bg-[${social.hoverColor}]`;

                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                                aria-label={`Follow us on ${social.name}`}
                            >
                                <div className={`w-12 h-12 bg-card rounded-full flex items-center justify-center transition-all hover:scale-110 hover:text-white ${hoverStyles}`}>
                                    <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                </div>

                                {/* Tooltip */}
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    {social.name}
                                </span>
                            </a>
                        );
                    })}
                </div>

                {/* Newsletter Signup */}
                <div className="mt-12 max-w-md mx-auto">
                    <p className="text-sm text-muted-foreground mb-3">
                        Subscribe to our newsletter for health tips
                    </p>
                    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-4 py-2 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
