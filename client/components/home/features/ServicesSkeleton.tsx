import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';

export function ServicesSkeleton() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="flex items-center justify-center mb-12">
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-[150px]" />
                    <div className="mx-6">
                        <Skeleton variant="text" width="250px" height="40px" />
                    </div>
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-[150px]" />
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column Image Skeleton */}
                    <div className="relative">
                        <Skeleton variant="rounded" height="500px" className="rounded-2xl" />
                    </div>

                    {/* Right Column Content Skeleton */}
                    <div className="space-y-8">
                        <div>
                            <Skeleton variant="text" width="80%" height="32px" className="mb-4" />
                            <Skeleton variant="text" height="24px" className="mb-2" />
                            <Skeleton variant="text" height="24px" className="mb-2" />
                            <Skeleton variant="text" width="90%" height="24px" className="mb-2" />
                            <Skeleton variant="text" width="95%" height="24px" />
                        </div>

                        {/* Service Cards Grid Skeleton */}
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <Card key={i} className="p-4">
                                    <Skeleton variant="rounded" width="40px" height="40px" className="mb-2" />
                                    <Skeleton variant="text" width="80%" height="20px" />
                                </Card>
                            ))}
                        </div>

                        <Skeleton variant="rounded" width="150px" height="44px" />
                    </div>
                </div>
            </div>
        </section>
    );
}
