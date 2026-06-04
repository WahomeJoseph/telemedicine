'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Star, Mail } from 'lucide-react';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface DoctorCardProps {
  doctor: {
    name: string;
    specialty: string;
    experience: string;
    rating: number;
    image: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
  priority?: boolean;
}

export function DoctorCard({ doctor, priority = false }: DoctorCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Card className="relative group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Skeleton loader */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Doctor Info Card */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">{doctor.rating}</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-600 mb-3">{doctor.experience} of experience</p>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Link href={`/doctors/${doctor.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  View Profile
                </Link>
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
              >
                <Link href={`/book-appointment?doctor=${encodeURIComponent(doctor.name)}`}>
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Links - Always visible on desktop */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a
          href={doctor.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
          aria-label={`Connect with ${doctor.name} on LinkedIn`}
        >
          <FaLinkedinIn className="w-4 h-4" />
        </a>
        <a
          href={doctor.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
          aria-label={`Follow ${doctor.name} on Twitter`}
        >
          <FaTwitter className="w-4 h-4" />
        </a>
        <a
          href={`mailto:${doctor.email}`}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
          aria-label={`Email ${doctor.name}`}
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </Card>
  );
}
