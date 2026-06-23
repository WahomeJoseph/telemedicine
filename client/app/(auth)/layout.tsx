import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: {
        template: '%s | BioMedLink',
        default: 'Authentication',
    },
    description: 'Secure access to your BioMedLink healthcare portal',
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-secondary/50 to-background">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="max-w-6xl mx-auto">
                    <Suspense fallback={<AuthLayoutSkeleton />}>
                        {children}
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

function AuthLayoutSkeleton() {
    return (
        <div className="flex flex-col lg:flex-row rounded-3xl shadow-strong overflow-hidden bg-card border border-border">
            <div className="lg:w-1/2 bg-gradient-to-br from-primary/90 to-accent/90 p-8 lg:p-12">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-white/20 rounded w-32" />
                    <div className="h-12 bg-white/20 rounded w-3/4" />
                    <div className="h-20 bg-white/20 rounded" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-16 bg-white/20 rounded" />
                        <div className="h-16 bg-white/20 rounded" />
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="animate-pulse space-y-4">
                    <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto" />
                    <div className="space-y-3">
                        <div className="h-12 bg-gray-200 rounded" />
                        <div className="h-12 bg-gray-200 rounded" />
                        <div className="h-12 bg-primary/20 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}
