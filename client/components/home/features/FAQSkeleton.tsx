import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';

export function FAQSkeleton() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center mb-8">
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-[150px]" />
                    <div className="mx-6">
                        <Skeleton variant="text" width="350px" height="40px" />
                    </div>
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-[150px]" />
                </div>
                <Skeleton variant="text" width="450px" height="28px" className="mx-auto mb-12" />

                <div className="max-w-4xl mx-auto space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Card key={i} className="p-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Skeleton variant="circular" width="16px" height="16px" />
                                    <Skeleton variant="text" width="300px" height="20px" />
                                </div>
                                <Skeleton variant="circular" width="20px" height="20px" />
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl p-8">
                        <Skeleton variant="text" width="250px" height="32px" className="mx-auto mb-4" />
                        <Skeleton variant="text" width="400px" height="20px" className="mx-auto mb-6" />
                        <div className="flex justify-center gap-6">
                            <Skeleton variant="circular" width="48px" height="48px" />
                            <Skeleton variant="circular" width="48px" height="48px" />
                            <Skeleton variant="circular" width="48px" height="48px" />
                            <Skeleton variant="rounded" width="120px" height="48px" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
