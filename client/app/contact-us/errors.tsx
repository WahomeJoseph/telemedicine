'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log error to monitoring service
        console.error('Contact page error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Something went wrong!</h2>
                <p className="text-muted-foreground mb-6">
                    We couldn&apos;t load the contact page. Please try again or contact support directly.
                </p>
                <div className="space-x-4">
                    <Button onClick={reset} variant="primary">
                        Try again
                    </Button>
                    <Button onClick={() => window.location.href = '/'} variant="outline">
                        Go home
                    </Button>
                </div>
                {process.env.NODE_ENV === 'development' && (
                    <pre className="mt-6 p-4 bg-red-50 rounded-lg text-left text-sm overflow-auto">
                        {error.message}
                    </pre>
                )}
            </div>
        </div>
    );
}
