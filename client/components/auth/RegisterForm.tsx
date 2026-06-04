'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { registerSchema, RegisterFormData } from '@/libs/validation/AuthValidation'
import { useAuthStore } from '@/libs/hooks/useAuthStore'
import { SocialAuthButtons } from './SocialAuthButton'
import { PasswordStrengthIndicator } from './features/PasswordStreghtIndicator'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { usePasswordStrength } from '@/libs/hooks/usePasswordStrength'
import { authApi } from '@/services/apis'

export function RegisterForm() {
  const router = useRouter()
  const {
    isLoading,
    error,
    setError,
    clearError,
    setLoading
  } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setFocus,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
    },
  })

  const password = watch('password')
  const { strength, strengthText, strengthColor } = usePasswordStrength(password)

  useEffect(() => {
    setFocus('name')
  }, [setFocus])

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearError()
      setLoading(true)

      const { ...registerData } = data

      const response = await authApi.register(registerData)

      router.push('/dashboard')
      router.refresh()

    } catch (error: unknown) {
      setError((error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-1 bg-secondary rounded-xl p-1 mb-8">
        <Link
          href="/login"
          className="flex-1 py-2.5 rounded-lg font-semibold transition-all duration-300 text-muted-foreground hover:text-foreground"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="flex-1 py-2.5 rounded-lg font-semibold transition-all duration-300 bg-card text-primary shadow-soft"
        >
          Sign Up
        </Link>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
          >
            <p className="text-sm text-destructive">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('name')}
          type="text"
          label="Full Name"
          placeholder="John Doe"
          error={errors.name?.message}
          disabled={isLoading || isSubmitting}
          autoComplete="name"
          required
        />

        <Input
          {...register('email')}
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          error={errors.email?.message}
          disabled={isLoading || isSubmitting}
          autoComplete="email"
          required
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              className={`w-full px-4 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 pr-12 ${errors.password
                ? 'border-destructive focus:ring-destructive/20'
                : 'border-border focus:border-primary'
                }`}
              disabled={isLoading || isSubmitting}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

          {password && (
            <PasswordStrengthIndicator
              strength={strength}
              strengthText={strengthText}
              strengthColor={strengthColor}
            />
          )}

          {errors.password && (
            <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className={`w-full px-4 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 pr-12 ${errors.confirmPassword
                ? 'border-destructive focus:ring-destructive/20'
                : 'border-border focus:border-primary'
                }`}
              disabled={isLoading || isSubmitting}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <input
            {...register('acceptedTerms')}
            type="checkbox"
            className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
          />
          <label className="text-sm text-muted-foreground">
            I agree to the{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.acceptedTerms && (
          <p className="text-xs text-destructive -mt-2">{errors.acceptedTerms.message}</p>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          isLoading={isLoading || isSubmitting}
          disabled={isLoading || isSubmitting}
          className="shadow-primary-glow"
        >
          Create Account
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">OR</span>
        </div>
      </div>

      <SocialAuthButtons />

      <p className="text-center text-xs text-muted-foreground mt-6">
        By creating an account, you agree to our{' '}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>
        {' '}and{' '}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p>
    </motion.div>
  )
}
