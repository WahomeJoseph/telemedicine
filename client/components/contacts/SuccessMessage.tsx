'use client';

import { CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/Button';

interface SuccessMessageProps {
    onReset: () => void;
}

export function SuccessMessage({
    onReset,
}: SuccessMessageProps) {

    return (
        <div className="bg-card rounded-2xl border border-border p-8 shadow-strong text-center">

            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-2">
                Message Sent Successfully!
            </h3>

            <p className="text-muted-foreground mb-6">
                Thank you for reaching out.
                Our team will review your message
                and get back to you within 24 hours.
            </p>

            <div className="space-y-3">

                <Button
                    onClick={onReset}
                    variant="primary"
                >
                    Send Another Message
                </Button>

                <div className="text-sm text-muted-foreground">
                    <p className="mt-1">
                        Check your email for a confirmation message.
                    </p>

                </div>
            </div>
        </div>
    );
}
