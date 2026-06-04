import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';

export function PartnersSkeleton() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-[150px]" />
          <div className="mx-6">
            <Skeleton variant="text" width="250px" height="40px" />
          </div>
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-[150px]" />
        </div>

        {/* Partners Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="p-6">
              <div className="flex flex-col items-center">
                <Skeleton variant="rounded" width="80px" height="80px" className="mb-4" />
                <Skeleton variant="text" width="100px" height="16px" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
