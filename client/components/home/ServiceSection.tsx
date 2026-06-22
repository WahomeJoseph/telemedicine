import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface ServicesSectionProps {
    services: Array<{
        icon: string;
        title: string;
        desc: string;
        color: string;
    }>;
}

export function ServicesSection({ services }: ServicesSectionProps) {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-center mb-12">
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
                    <h2 className="mx-6 text-3xl md:text-4xl font-bold text-foreground">
                        What We <span className="text-primary">Offer</span>
                    </h2>
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Image */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                            <div className="h-[500px] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                                <Image
                                    src="/surgery.jpg"
                                    width={800}
                                    height={600}
                                    alt="Modern medical facility with advanced equipment"
                                    className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={false}
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-2xl font-bold mb-2">Modern Medical Facility</h3>
                                <p className="text-white/90">State-of-the-art equipment and care</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">
                                Comprehensive Healthcare Solutions for All Your Needs
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                                In collaboration with BioMedPharm, BioMedPharm provides comprehensive medical services designed to meet the unique
                                healthcare needs of every patient. Our modern facilities, experienced doctors, nurses and advanced
                                medical technology ensure you receive the best possible care.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                From routine checkups to specialized treatments, we handle it all with the professionalism
                                and compassion that has made us the trusted choice for over 2,000 patients across Nairobi.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {services.slice(0, 4).map((service) => (
                                <div key={service.title} className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 group">
                                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{service.icon}</div>
                                    <h4 className="font-semibold text-foreground text-sm">{service.title}</h4>
                                </div>
                            ))}
                        </div>

                        <Button
                            variant="outline" className="mt-4">
                            <Link href="/services">View All Services →</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
