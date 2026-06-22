import Image from 'next/image';
import { Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function AboutSection() {
    const aboutStats = [
        { value: '10k+', label: 'Happy Patients' },
        { value: '15+', label: 'Years Experience' },
        { value: '50+', label: 'Expert Doctors' },
        { value: '98%', label: 'Patient Satisfaction' },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center mb-12">
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
                    <h2 className="mx-6 text-3xl md:text-4xl font-bold text-foreground">
                        Why Choose <span className="text-primary">BioMedLink</span>
                    </h2>
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <p className="text-lg text-muted-foreground text-justify leading-relaxed">
                            Founded in 2025 with a vision to revolutionize healthcare in Kenya, BioMedLink has grown into
                            the region&apos;s most trusted medical facility. Our journey began when our founder recognized the
                            critical need for quality, accessible healthcare services.
                        </p>
                        <p className="text-lg text-muted-foreground text-justify leading-relaxed">
                            Today, we operate a modern medical facility, BioMedPharm, with experienced doctors and nurses, employ the best
                            healthcare professionals, and have successfully treated over 2,000 patients across Nairobi.
                        </p>

                        <div className="grid grid-cols-2 gap-5 mt-8">
                            {aboutStats.map((stat, idx) => (
                                <Card key={idx} className="text-center p-6 hover:shadow-lg transition-shadow">
                                    <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] bg-gradient-to-br from-primary/20 to-accent/20">
                            <Image
                                src="/doctors-ops.jpg"
                                width={800}
                                height={600}
                                alt="Medical professionals performing surgery"
                                className="w-full h-full object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                loading="lazy"
                            />
                        </div>

                        <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-2xl p-4 max-w-[200px]">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Award className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">Accredited</p>
                                    <p className="text-xs text-muted-foreground">By KMPDC & NHIF</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
