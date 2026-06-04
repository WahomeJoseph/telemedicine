'use client';

import { useState, useCallback } from 'react';
import { z } from 'zod';
import { contactFormSchema } from '@/libs/validation/ContactSchema';

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    department: string;
    message: string;
    preferredContact: 'email' | 'phone';
}

export interface ContactFormState {
    isSubmitting: boolean;
    isSubmitted: boolean;
    error: string | null;
}

const initialState: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    department: '',
    message: '',
    preferredContact: 'email'
};

export function useContactForm() {
    const [formData, setFormData] = useState<ContactFormData>(initialState);
    const [state, setState] = useState<ContactFormState>({
        isSubmitting: false,
        isSubmitted: false,
        error: null
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const validateField = useCallback(async (field: keyof ContactFormData, value: string) => {
        try {
            const partialSchema = contactFormSchema.pick({ [field]: true } as { [K in keyof ContactFormData]?: true });
            await partialSchema.parseAsync({ [field]: value });
            setValidationErrors(prev => ({ ...prev, [field]: '' }));
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldError = error.issues[0]?.message;
                setValidationErrors(prev => ({ ...prev, [field]: fieldError || 'Invalid field value' }));
            }
            return false;
        }
    }, []);

    const validateForm = useCallback(async () => {
        try {
            await contactFormSchema.parseAsync(formData);
            setValidationErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: Record<string, string> = {};
                error.issues.forEach((issue) => {
                    if (issue.path[0]) {
                        errors[issue.path[0].toString()] = issue.message;
                    }
                });
                setValidationErrors(errors);
            }
            return false;
        }
    }, [formData]);

    const handleChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name as keyof ContactFormData, value);
    }, [validateField]);

    const submitForm = useCallback(async (apiUrl: string) => {
        const isValid = await validateForm();
        if (!isValid) return false;

        setState(prev => ({ ...prev, isSubmitting: true, error: null }));

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send message');
            }

            setState(prev => ({ ...prev, isSubmitted: true, isSubmitting: false }));
            setFormData(initialState);

            setTimeout(() => {
                setState(prev => ({ ...prev, isSubmitted: false }));
            }, 5000);

            return true;
        } catch (error) {
            setState(prev => ({
                ...prev,
                isSubmitting: false,
                error: error instanceof Error ? error.message : 'Failed to send message'
            }));
            return false;
        }
    }, [formData, validateForm]);

    const resetForm = useCallback(() => {
        setFormData(initialState);
        setValidationErrors({});
        setState({
            isSubmitting: false,
            isSubmitted: false,
            error: null
        });
    }, []);

    return {
        formData,
        state,
        validationErrors,
        handleChange,
        submitForm,
        resetForm,
        isFormValid: Object.keys(validationErrors).length === 0 &&
            !!formData.name && !!formData.email && !!formData.message
    };
}
