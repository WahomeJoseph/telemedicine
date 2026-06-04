import { Skeleton } from '@/components/ui/Skeleton';

export function DoctorsSkeleton() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Skeleton variant="text" width="120px" height="24px" className="mb-4" />
          <Skeleton variant="text" width="400px" height="36px" />
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <div className="h-[400px] rounded-2xl overflow-hidden">
                <Skeleton variant="rounded" className="w-full h-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
