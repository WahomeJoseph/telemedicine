'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AuthContainerProps {
  children: ReactNode;
  type: 'login' | 'register';
}

export function AuthContainer({ children }: AuthContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
