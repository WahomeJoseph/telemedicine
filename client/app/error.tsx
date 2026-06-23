'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-md"
            >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-2xl flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>

                {/* Message */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Something went wrong
                </h1>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    We hit an unexpected error. This has been logged and
                    we&apos;re looking into it. You can try again or head back
                    home.
                </p>

                {/* Actions */}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-semibold transition-colors duration-300 inline-flex items-center gap-2 text-sm"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors inline-flex items-center gap-1"
                    >
                        Go home
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {/* Error digest — helpful for support */}
                {error.digest && (
                    <p className="mt-8 text-xs text-gray-300">
                        Error ID: {error.digest}
                    </p>
                )}
            </motion.div>
        </div>
    );
}
