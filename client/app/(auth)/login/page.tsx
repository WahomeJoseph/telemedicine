import { Suspense } from 'react';
import type { Metadata } from 'next';

import { AuthContainer } from '@/components/auth/AuthContainer';
import { AuthSkeleton } from '@/components/auth/features/AuthSkeleton';
import { LoginForm } from '@/components/auth/LoginForm';
import { AuthHero } from '@/components/auth/AuthHero';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Access your BioMedLink account to manage appointments, view medical records, and connect with healthcare providers.',
  openGraph: {
    title: 'Sign In to BioMedLink',
    description: 'Secure access to your healthcare portal',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  const heroContent = {
    title: 'Welcome Back To BioMedLink!',
    subtitle: 'Sign in to continue your healthcare journey',
    features: [
      { icon: 'FaUserMd', text: 'Access your medical records' },
      { icon: 'FaClock', text: '24/7 access to doctors' },
      { icon: 'FaHeartbeat', text: 'Track your health metrics' },
      { icon: 'FaAmbulance', text: 'Emergency assistance' },
    ],
    quote:
      '"Your health is our priority. Access quality healthcare from anywhere."',
    stats: [
      { value: '50k+', label: 'Happy Patients' },
      { value: '200+', label: 'Expert Doctors' },
      { value: '24/7', label: 'Support Available' },
    ],
  };

  return (
    <AuthContainer type="login">
      <div className="flex flex-col lg:flex-row rounded-3xl shadow-strong overflow-hidden bg-card border border-border">
        <AuthHero content={heroContent} type="login" />

        <div className="lg:w-1/2 p-8 lg:p-12">
          <Suspense fallback={<AuthSkeleton />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </AuthContainer>
  );
}
