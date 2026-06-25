import Image from 'next/image';
import { Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function AboutSection() {
    const aboutStats = [
        { value: '2k+', label: 'Happy Patients' },
        { value: '2+', label: 'Years of Professional Experience' },
        { value: '3+', label: 'Expert Doctors and Nurses' },
        { value: '99%', label: 'Patient Satisfaction' },
    ];

    return (
        <section className="py-16 sm:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center mb-10 sm:mb-12">
                    <div className="hidden sm:block flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />

                    <h2 className="mx-4 sm:mx-6 text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                        Why Choose <span className="text-primary">BioMedLink</span>
                    </h2>

                    <div className="hidden sm:block flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div className="order-2 lg:order-1 space-y-6">
                        <p className="text-base sm:text-lg text-gray-600 text-justify leading-relaxed">
                            Founded in 2025 with a vision to revolutionize healthcare in
                            Kenya, BioMedLink has grown into the region&apos;s most trusted
                            medical facility. Our journey began when our founder recognized
                            the critical need for quality, accessible healthcare services.
                        </p>

                        <p className="text-base sm:text-lg text-gray-600 text-justify leading-relaxed">
                            Today, we operate a modern medical facility, BioMedPharm, with
                            experienced doctors and nurses. We employ top healthcare
                            professionals and have successfully treated over 2,000 patients
                            across Nairobi.
                        </p>

                        <div className="grid grid-cols-2 gap-4 sm:gap-5 mt-8">
                            {aboutStats.map((stat, idx) => (
                                <Card
                                    key={idx}
                                    className="text-center p-4 sm:p-5 lg:p-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">
                                        {stat.value}
                                    </div>

                                    <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                                        {stat.label}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                                <Image
                                    src="/doctors-ops.jpg"
                                    alt="Medical professionals performing surgery"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 50vw"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:-bottom-6 lg:-left-6 bg-white rounded-xl shadow-2xl p-3 sm:p-4 max-w-[180px] sm:max-w-[220px]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                </div>

                                <div>
                                    <p className="font-bold text-sm sm:text-base text-foreground">
                                        Accredited
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        By KMPDC & NHIF
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}