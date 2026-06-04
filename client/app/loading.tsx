export default function Loading() {
    return (
        <div className="min-h-screen">
            <div className="relative h-screen bg-gray-100 animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-muted-foreground">Loading MediConnect...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
