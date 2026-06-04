export default function Loading() {
    return (
        <div className="min-h-screen">
            <div className="relative h-[500px] bg-gray-200 animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-muted-foreground">Loading contact information...</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                    <div className="lg:col-span-2">
                        <div className="h-[600px] bg-gray-100 rounded-2xl animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}
