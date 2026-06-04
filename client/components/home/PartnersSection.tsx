'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';

interface PartnersSectionProps {
  partners: Array<{
    name: string;
    logo: string;
  }>;
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (name: string) => {
    setFailedImages(prev => new Set(prev).add(name));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
          <h2 className="mx-6 text-3xl md:text-4xl font-bold text-foreground">
            Our <span className="text-primary">Insurance Partners</span>
          </h2>
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {partners.map((partner, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                  {!failedImages.has(partner.name) ? (
                    <Image
                      width={64}
                      height={64}
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-16 max-w-16 object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                      onError={() => handleImageError(partner.name)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-400">{partner.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {partner.name}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
