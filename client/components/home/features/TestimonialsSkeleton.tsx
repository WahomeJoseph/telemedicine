import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';

export function TestimonialsSkeleton() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <Skeleton variant="text" width="250px" height="40px" className="mx-auto mb-4" />
                    <Skeleton variant="text" width="400px" height="24px" className="mx-auto" />
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="p-6">
                            <Skeleton variant="rounded" width="30px" height="30px" className="mb-4" />
                            <Skeleton variant="text" height="80px" className="mb-4" />
                            <div className="flex gap-1 mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Skeleton key={star} variant="circular" width="16px" height="16px" />
                                ))}
                            </div>
                            <div className="flex items-center pt-4 border-t border-gray-100">
                                <Skeleton variant="circular" width="48px" height="48px" />
                                <div className="ml-3">
                                    <Skeleton variant="text" width="120px" height="20px" className="mb-1" />
                                    <Skeleton variant="text" width="80px" height="16px" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
