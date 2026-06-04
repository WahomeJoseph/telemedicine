'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { RiDoubleQuotesL } from 'react-icons/ri';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface TestimonialsSectionProps {
  testimonials?: Array<{
    name: string;
    role: string;
    content: string;
    rating: number;
    date: string;
  }>;
}

const defaultTestimonials = [
  { name: 'John Mwangi', role: 'Patient', content: 'Excellent service! The doctors are very professional and caring.', rating: 5, date: '2024-03-15' },
  { name: 'Mary Wanjiku', role: 'Patient', content: 'Best healthcare experience I\'ve ever had. Highly recommended!', rating: 5, date: '2024-03-10' },
  { name: 'Peter Ochieng', role: 'Patient', content: 'State-of-the-art facilities and wonderful staff.', rating: 5, date: '2024-03-05' },
];

export function TestimonialsSection({ testimonials = defaultTestimonials }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by <span className="text-primary">Patients</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our patients have to say
          </p>
        </div>

        {/* Testimonials Grid/Carousel */}
        <div className="relative">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="group hover:shadow-2xl transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
                <div className="p-6">
                  <RiDoubleQuotesL size={30} className="text-primary/30 mb-4" />
                  <p className="text-foreground leading-relaxed mb-4 italic">
                    {testimonial.content}
                  </p>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
