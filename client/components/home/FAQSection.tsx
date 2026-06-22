'use client';

import { useState } from 'react';
import { ChevronDown, Heart, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface FAQSectionProps {
    faqs?: Array<{
        q: string;
        a: string;
    }>;
}

const defaultFaqs = [
    {
        q: 'How do I schedule an appointment?',
        a: 'You can schedule an appointment through multiple channels: (1) Online through our booking system on the website, (2) By calling our appointment desk at +254 797 596 9701, (3) By visiting any of our branches in person, or (4) Through our mobile app available on iOS and Android. We recommend booking at least 2-3 days in advance for regular checkups.'
    },
    {
        q: 'What insurance plans do you accept?',
        a: 'We accept most major insurance plans including AAR, Jubilee, APA, CIC, Resolution Health, and NHIF. We also accept international insurance plans for medical tourists. Please contact our billing department at +254 797 596 9702 to verify your specific insurance coverage before your visit.'
    },
    {
        q: 'Do you offer telemedicine services?',
        a: 'Yes, we offer comprehensive telemedicine services including video consultations, phone consultations, and online prescription refills. You can book a virtual appointment through our website or mobile app. Telemedicine is available for follow-up visits, prescription management, mental health consultations, and minor acute conditions.'
    },
    {
        q: 'What are your emergency services?',
        a: 'We provide 24/7 emergency services at our Nairobi Main Branch with dedicated emergency physicians, trauma care, cardiac emergency unit, and ambulance services. For immediate emergency assistance, call our emergency hotline at +254 797 596 9758. Our average emergency response time is under 10 minutes within Nairobi.'
    },
    {
        q: 'How do I access my medical records?',
        a: 'You can access your medical records through our secure patient portal. After creating an account, you can view lab results, download prescriptions, access visit summaries, and request record transfers. For assistance, contact our medical records department at +254 797 596 9703.'
    },
    {
        q: 'What payment methods do you accept?',
        a: 'We accept cash, credit/debit cards (Visa, Mastercard, American Express), mobile money (M-Pesa), bank transfers, and all major insurance cards. We also offer flexible payment plans for qualifying patients. Our billing department can help you understand your payment options.'
    },
    {
        q: 'Do you offer home healthcare services?',
        a: 'Yes, we offer home healthcare services including nursing care, physiotherapy, lab sample collection, and doctor home visits. These services are available within Nairobi and surrounding areas. Additional fees apply for home visits.'
    },
    {
        q: 'How do I prepare for my first visit?',
        a: 'For your first visit, please bring: (1) A valid ID, (2) Your insurance card (if applicable), (3) Any relevant medical records or test results, (4) A list of current medications, and (5) Arrive 15 minutes early to complete registration. You can also pre-register online to save time.'
    },
];

export function FAQSection({ faqs = defaultFaqs }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
                    <h2 className="mx-6 text-3xl md:text-4xl font-bold text-foreground">
                        Frequently Asked <span className="text-primary">Questions</span>
                    </h2>
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
                </div>
                <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                    Get answers to common questions about our medical services
                </p>

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="flex items-center justify-between w-full p-5 text-left cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                        <Heart className="w-4 h-4 text-primary inline mr-2" />
                                        {faq.q}
                                    </span>
                                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                                    <div className="px-5 pb-5">
                                        <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* CTA Panel */}
                <div className="text-center mt-12">
                    <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                            Our medical experts are here to help. Contact us now for personalized assistance.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <div className="flex items-center justify-center gap-6">
                                <Link href="tel:+254768166223" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition duration-300 group">
                                    <Phone className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                                </Link>
                                <Link href="mailto:lewisgichohi6@gmail.com" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition duration-300 group">
                                    <Mail className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                                </Link>
                                <Link href="https://wa.me/254768166223" target="_blank" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition duration-300 group">
                                    <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.164-4.146l.362.215c1.562.926 3.36 1.417 5.205 1.417 5.424 0 9.839-4.414 9.841-9.838.001-2.627-1.022-5.099-2.879-6.958-1.856-1.858-4.327-2.882-6.955-2.882-5.424 0-9.839 4.415-9.841 9.84 0 2.131.673 4.206 1.94 5.934l.252.342-.997 3.637 3.852-1.012z" />
                                    </svg>
                                </Link>
                            </div>
                            <Button
                                className="px-6 py-3 bg-primary text-primary font-semibold rounded-full hover:shadow-xl transition-all duration-300">
                                <Link href="/contact-us">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
