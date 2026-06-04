'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authApi } from '@/services/apis'
import { motion, AnimatePresence } from 'framer-motion'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { loginSchema, LoginFormData } from '@/libs/validation/AuthValidation'
import { useAuthStore } from '@/libs/hooks/useAuthStore'
import { SocialAuthButtons } from './SocialAuthButton'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function LoginForm() {
    const router = useRouter()
    const {
        setAuth,
        setLoading,
        setError,
        clearError,
        isLoading,
        error,
    } = useAuthStore()
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setFocus,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    })

    useEffect(() => {
        setFocus('email')
    }, [setFocus])

    const onSubmit = async (data: LoginFormData) => {
        clearError()
        setLoading(true)
        try {
            const res = await authApi.login(data)
            const { token, refreshToken, user } = res.data.data
            setAuth(user, token, refreshToken)
            await new Promise(resolve => setTimeout(resolve, 500))

            const roleRoutes = {
                admin: '/dashboard/admin',
                doctor: '/dashboard/doctor',
                clinician: '/dashboard/clinician',
                patient: '/dashboard/patient',
            }
            const redirectPath = roleRoutes[user.role as keyof typeof roleRoutes] || '/dashboard/patient'
            router.push(redirectPath)
        } catch (error: unknown) {
            const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'An error occurred during login. Please try again.'
            setError(message)
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
                    className="flex-1 py-2.5 rounded-lg font-semibold transition-all duration-300 bg-card text-primary shadow-soft"
                >
                    Sign In
                </Link>
                <Link
                    href="/register"
                    className="flex-1 py-2.5 rounded-lg font-semibold transition-all duration-300 text-muted-foreground hover:text-foreground"
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                    {...register('email')}
                    type="email"
                    label="Email Address"
                    placeholder="name@example.com"
                    error={errors.email?.message}
                    disabled={isLoading || isSubmitting}
                    autoComplete="email"
                    required
                />

                <div>
                    <div className="flex justify-between mb-2">
                        <label className="block text-sm font-medium text-foreground">
                            Password
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="relative">
                        <input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className={`w-full px-4 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 pr-12 ${errors.password
                                ? 'border-destructive focus:ring-destructive/20'
                                : 'border-border focus:border-primary'
                                }`}
                            disabled={isLoading || isSubmitting}
                            autoComplete="current-password"
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
                    {errors.password && (
                        <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
                    )}
                </div>

                <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            {...register('rememberMe')}
                            type="checkbox"
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            Remember me
                        </span>
                    </label>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="lg"
                    isLoading={isLoading || isSubmitting}
                    disabled={isLoading || isSubmitting}
                    className="shadow-primary-glow"
                >
                    Sign In
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
                By continuing, you agree to our{' '}
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
