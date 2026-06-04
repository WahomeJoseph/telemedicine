'use client';

import { motion } from 'framer-motion';

interface HeroContent {
  title: string;
  subtitle: string;
  quote: string;
}

interface AuthHeroProps {
  content: HeroContent;
  type: 'login' | 'register';
}

export function AuthHero({ content, type }: AuthHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="lg:w-1/2 bg-gradient-to-br from-primary/90 to-accent/90 p-8 lg:p-12 pt-20 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute bottom-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medical-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0v40M0 20h40" stroke="white" strokeWidth="1" fill="none" opacity="0.1" />
              <circle cx="20" cy="20" r="3" fill="white" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-pattern)" />
        </svg>
      </div>

      <div className="relative py-28 z-10">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div className="w-full h-10 text-xl bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              {content.subtitle}
            </div>
          </div>
        </div>

        <motion.div
          key={type}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            {content.title}
          </h1>
          <div className="border-l-4 border-white/30 pl-4 mb-8">
            <p className="text-white/80 italic text-sm leading-relaxed">
              {content.quote}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
