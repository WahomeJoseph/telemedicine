'use client'

import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { Button } from '@/components/ui/Button'

export function SocialAuthButtons() {
    const [comingSoonProvider, setComingSoonProvider] = useState<string | null>(null)

    const socialButtons = [
        {
            provider: 'google',
            label: 'Continue with Google',
            icon: FcGoogle,
            className: 'border border-border text-foreground cursor-not-allowed',
            iconColor: 'text-foreground',
        },
        {
            provider: 'apple',
            label: 'Continue with Apple',
            icon: FaApple,
            className: 'bg-foreground text-white cursor-not-allowed',
            iconColor: 'text-white',
        },
        {
            provider: 'facebook',
            label: 'Continue with Facebook',
            icon: FaFacebook,
            className: 'bg-[#1877f2] text-white cursor-not-allowed',
            iconColor: 'text-white',
        },
    ]

    const handleComingSoon = (provider: string) => {
        setComingSoonProvider(provider)

        setTimeout(() => {
            setComingSoonProvider(null)
        }, 1200)
    }

    return (
        <div className="space-y-3">
            {socialButtons.map(({ provider, label, icon: Icon, className, iconColor }) => (
                <Button
                    key={provider}
                    type="button"
                    variant="ghost"
                    fullWidth
                    size="lg"
                    disabled
                    onClick={() => handleComingSoon(provider)}
                    className={`transition-all hover-none duration-200 ${className}`}
                >
                    {comingSoonProvider === provider ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Coming soon...
                        </div>
                    ) : (
                        <>
                            <Icon className={`w-5 h-5 mr-3 ${iconColor}`} />
                            {label}
                        </>
                    )}
                </Button>
            ))}
        </div>
    )
}
