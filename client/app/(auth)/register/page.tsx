import { Suspense } from 'react'
import type { Metadata } from 'next'

import { AuthContainer } from '@/components/auth/AuthContainer'
import { AuthSkeleton } from '@/components/auth/features/AuthSkeleton'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { AuthHero } from '@/components/auth/AuthHero'

export const metadata: Metadata = {
  title: 'Create Account',
  description:
    'Join MediConnect to access quality healthcare services, book appointments, and manage your health online.',
  openGraph: {
    title: 'Join MediConnect Healthcare Family',
    description: 'Start your wellness journey with us',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RegisterPage() {
  const heroContent = {
    title: 'Join Our Healthcare Family!',
    subtitle: 'Create an account to start your wellness journey',
    features: [
      { icon: 'FaShieldAlt', text: 'Secure & confidential' },
      { icon: 'FaHeartbeat', text: 'Personalized care plans' },
      { icon: 'FaStethoscope', text: 'Expert medical advice' },
      { icon: 'FaClock', text: 'Quick appointment booking' },
    ],
    quote: '"Start your journey to better health with us today."',
    stats: [
      { value: 'Free', label: 'Registration' },
      { value: '7 Days', label: 'Free Trial' },
      { value: '100%', label: 'Secure' },
    ],
  }

  return (
    <AuthContainer type="register">
      <div className="flex flex-col lg:flex-row rounded-3xl shadow-strong overflow-hidden bg-card border border-border">
        <AuthHero content={heroContent} type="register" />

        <div className="lg:w-1/2 p-8 lg:p-12">
          <Suspense fallback={<AuthSkeleton />}>
            <RegisterForm />
          </Suspense>
        </div>
      </div>
    </AuthContainer>
  )
}
