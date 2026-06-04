'use client';

import { Skeleton } from '@/components/ui/Skeleton';

export function AuthSkeleton() {
    return (
        <div className="flex flex-col lg:flex-row rounded-3xl shadow-strong overflow-hidden bg-card border border-border">
            <div className="lg:w-1/2 bg-gradient-to-br from-primary/90 to-accent/90 p-8 lg:p-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-8">
                        <Skeleton variant="rounded" width="40px" height="40px" className="bg-white/20" />
                        <Skeleton variant="text" width="120px" height="24px" className="bg-white/20" />
                    </div>

                    <Skeleton variant="text" width="80%" height="40px" className="bg-white/20" />
                    <Skeleton variant="text" width="60%" height="24px" className="bg-white/20" />

                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                                <Skeleton variant="circular" width="20px" height="20px" className="bg-white/20" />
                                <Skeleton variant="text" width="120px" height="16px" className="bg-white/20" />
                            </div>
                        ))}
                    </div>

                    <div className="border-l-4 border-white/30 pl-4">
                        <Skeleton variant="text" width="90%" height="16px" className="bg-white/20" />
                        <Skeleton variant="text" width="70%" height="16px" className="bg-white/20 mt-2" />
                    </div>

                    <div className="flex justify-between pt-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="text-center">
                                <Skeleton variant="text" width="60px" height="28px" className="bg-white/20 mx-auto" />
                                <Skeleton variant="text" width="80px" height="12px" className="bg-white/20 mx-auto mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="flex gap-1 bg-secondary rounded-xl p-1 mb-8">
                    <Skeleton variant="rounded" width="50%" height="44px" />
                    <Skeleton variant="rounded" width="50%" height="44px" />
                </div>

                <div className="space-y-5">
                    <div>
                        <Skeleton variant="text" width="100px" height="16px" className="mb-2" />
                        <Skeleton variant="rounded" height="48px" />
                    </div>

                    <div>
                        <Skeleton variant="text" width="100px" height="16px" className="mb-2" />
                        <Skeleton variant="rounded" height="48px" />
                    </div>

                    <div className="flex justify-between">
                        <Skeleton variant="text" width="120px" height="16px" />
                        <Skeleton variant="text" width="100px" height="16px" />
                    </div>

                    <Skeleton variant="rounded" height="48px" />
                </div>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <Skeleton variant="text" width="40px" height="16px" className="bg-white px-4" />
                    </div>
                </div>

                <div className="space-y-3">
                    <Skeleton variant="rounded" height="48px" />
                    <Skeleton variant="rounded" height="48px" />
                </div>
            </div>
        </div>
    );
}
