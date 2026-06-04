'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PartnerLogoProps {
  src: string;
  alt: string;
  name: string;
}

export function PartnerLogo({ src, alt, name }: PartnerLogoProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
          {!hasError ? (
            <Image
              src={src}
              alt={alt}
              width={64}
              height={64}
              className="max-h-16 max-w-16 object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
              onError={() => setHasError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500">{name.charAt(0)}</span>
            </div>
          )}
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
      </div>
    </div>
  );
}
