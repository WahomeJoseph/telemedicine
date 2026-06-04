import { OptimizedImage } from '@/components/ui/OptimizedImage';
import heroImage from '@/public/hospital-bed.jpg';

export function ContactHero() {
  return (
    <section className="relative pt-32 pb-20 md:pb-24 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={heroImage.src}
          alt="Medical professional helping patient at MediConnect"
          fill
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="animate-fade-up">
          <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
            ✨ Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            We&apos;re here to help 24/7. Reach out through any channel below,
            and our medical team will respond promptly.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-white/80">Emergency Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">&lt; 1hr</div>
              <div className="text-sm text-white/80">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-white/80">Confidential</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
