'use client';

import { Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { departments } from '@/libs/constants/ContactData';
import { useContactForm } from '@/libs/hooks/useContactForm';
import { SuccessMessage } from '@/components/contacts/SuccessMessage';

type Department = (typeof departments)[number];

interface ContactFormWrapperProps {
    departments: Department[];
}

export function ContactFormWrapper({ departments }: ContactFormWrapperProps) {
    const {
        formData,
        state,
        validationErrors,
        handleChange,
        submitForm,
        isFormValid
    } = useContactForm();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitForm('/api/contact');
    };

    if (state.isSubmitted) {
        return <SuccessMessage onReset={() => window.location.reload()} />;
    }

    return (
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-strong">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h2>
                <p className="text-muted-foreground">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
            </div>

            {state.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600">{state.error}</p>
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            error={validationErrors.name}
                            aria-invalid={!!validationErrors.name}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            error={validationErrors.email}
                            aria-invalid={!!validationErrors.email}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Phone Number
                        </label>
                        <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+254 XXX XXX XXX"
                            error={validationErrors.phone}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Department <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            className={`w-full px-4 py-2.5 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all ${validationErrors.department ? 'border-red-500' : 'border-border'
                                }`}
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept.name} value={dept.name}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                        {validationErrors.department && (
                            <p className="mt-1 text-xs text-red-500">{validationErrors.department}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Preferred Contact Method
                    </label>
                    <div className="flex gap-4">
                        {['email', 'phone'].map((method) => (
                            <label key={method} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="preferredContact"
                                    value={method}
                                    checked={formData.preferredContact === method}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-primary"
                                />
                                <span className="text-sm text-foreground capitalize">{method}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you? Please provide as much detail as possible."
                        className={`w-full px-4 py-2.5 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${validationErrors.message ? 'border-red-500' : 'border-border'
                            }`}
                    />
                    {validationErrors.message && (
                        <p className="mt-1 text-xs text-red-500">{validationErrors.message}</p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                        {formData.message.length}/1000 characters
                    </p>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={state.isSubmitting}
                    disabled={!isFormValid || state.isSubmitting}
                    className="py-3.5 shadow-primary-glow"
                >
                    {!state.isSubmitting && <Send className="w-4 h-4 mr-2" />}
                    Send Message
                </Button>

                <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-center text-muted-foreground">
                        By submitting this form, you agree to our{' '}
                        <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                        {' '}and{' '}
                        <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
                        Your information will be kept confidential.
                    </p>
                </div>
            </form>
        </div>
    );
}
