import Image from 'next/image';

interface ServicesSectionProps {
    services: Array<{
        icon: string;
        title: string;
        desc: string;
        color: string;
    }>;
}

export function ServicesSection({ services }: ServicesSectionProps) {
    const featuredServices = services.slice(0, 4);
    const otherServices = services.slice(4);

    return (
        <section className="py-16 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="flex items-center justify-center mb-10 sm:mb-12">
                    <div className="hidden sm:block flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />

                    <h2 className="mx-4 sm:mx-6 text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                        What We <span className="text-primary">Offer</span>
                    </h2>

                    <div className="hidden sm:block flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
                </div>

                {/* Main Section */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

                    {/* Image */}
                    <div className="order-1 lg:order-1">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">

                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 z-10" />

                            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                                <Image
                                    src="/hospital-bed.jpg"
                                    alt="Modern medical facility with advanced equipment"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 50vw"
                                    loading="lazy"
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-20" />

                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white z-30">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                                    Modern Medical Facility
                                </h3>

                                <p className="text-sm sm:text-base text-white/90">
                                    State-of-the-art equipment and care
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="order-2 lg:order-2 space-y-6 lg:space-y-8">

                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                                Comprehensive Healthcare Solutions For Every Need
                            </h3>

                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
                                In collaboration with BioMedPharm, we provide comprehensive
                                medical services tailored to every patient. Our experienced
                                doctors, nurses, and modern medical technology ensure
                                exceptional care.
                            </p>

                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                From routine checkups to specialized treatments, we deliver
                                trusted healthcare with professionalism and compassion.
                            </p>
                        </div>

                        {/* Featured Services */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {featuredServices.map((service) => (
                                <div
                                    key={service.title}
                                    className="bg-gray-50 rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="text-2xl sm:text-3xl mb-2">
                                        {service.icon}
                                    </div>

                                    <h4 className="font-semibold text-sm sm:text-base text-foreground">
                                        {service.title}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional Services */}
                {otherServices.length > 0 && (
                    <div className="mt-10 sm:mt-14">

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                            {otherServices.map((service) => (
                                <div
                                    key={service.title}
                                    className="bg-gray-50 rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="text-2xl sm:text-3xl mb-2">
                                        {service.icon}
                                    </div>

                                    <h4 className="font-medium text-sm sm:text-base text-foreground">
                                        {service.title}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
