export default function GlobalLoading() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center">
                <div className="relative w-12 h-12 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-[3px] border-gray-200" />
                    <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-cyan-600 animate-spin" />
                </div>

                <p className="text-gray-400 text-sm">Loading BioMedLink…</p>
            </div>
        </div>
    );
}
