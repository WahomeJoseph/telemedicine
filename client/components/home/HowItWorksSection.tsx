import { Card } from '@/components/ui/Card';

interface HowItWorksSectionProps {
    steps: Array<{
        step: string;
        title: string;
        desc: string;
        icon: string;
    }>;
}

export function HowItWorksSection({ steps }: HowItWorksSectionProps) {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-center mb-12">
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
                    <h2 className="mx-6 text-3xl md:text-4xl font-bold text-foreground">
                        How It <span className="text-primary">Works</span>
                    </h2>
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((item, idx) => (
                        <Card key={idx} className="text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="p-8">
                                <div className="relative w-24 h-24 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                    <span className="text-3xl group-hover:text-white transition-colors">{item.icon}</span>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        {item.step}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Stats Banner */}
                <div className="mt-16 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-center text-white">
                    <p className="text-lg font-semibold">
                        ⚡ Average wait time: <span className="font-bold">under 15 minutes</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
