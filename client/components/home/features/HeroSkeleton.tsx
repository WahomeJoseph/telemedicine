export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="h-16 bg-gray-300 rounded-lg w-3/4 mb-6 animate-pulse" />
            <div className="h-16 bg-gray-300 rounded-lg w-2/3 mb-8 animate-pulse" />
            <div className="h-6 bg-gray-300 rounded w-full mb-4 animate-pulse" />
            <div className="h-6 bg-gray-300 rounded w-5/6 mb-8 animate-pulse" />
            <div className="flex gap-4">
              <div className="h-12 w-40 bg-gray-300 rounded-full animate-pulse" />
              <div className="h-12 w-40 bg-gray-300 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="aspect-video bg-gray-300 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
