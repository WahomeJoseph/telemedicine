'use client';

export function usePasswordStrength(password: string) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    let strengthText = '';
    let strengthColor = '';

    if (strength <= 2) {
        strengthText = 'Weak';
        strengthColor = 'bg-destructive';
    } else if (strength <= 3) {
        strengthText = 'Fair';
        strengthColor = 'bg-warm';
    } else if (strength <= 4) {
        strengthText = 'Good';
        strengthColor = 'bg-primary';
    } else {
        strengthText = 'Strong';
        strengthColor = 'bg-accent';
    }

    return { strength, strengthText, strengthColor };
}
