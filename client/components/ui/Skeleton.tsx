'use client';

import { cn } from '@/libs/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'text' | 'circular' | 'rounded' | 'rectangular';
    width?: string | number;
    height?: string | number;
    animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
    variant = 'rounded',
    width,
    height,
    animation = 'pulse',
    className,
    ...props
}: SkeletonProps) {
    const variants = {
        text: 'rounded',
        circular: 'rounded-full',
        rounded: 'rounded-xl',
        rectangular: 'rounded-none',
    };

    const animations = {
        pulse: 'animate-pulse',
        wave: 'animate-shimmer',
        none: '',
    };

    const styles: React.CSSProperties = {};

    if (width) {
        styles.width = typeof width === 'number' ? `${width}px` : width;
    }

    if (height) {
        styles.height = typeof height === 'number' ? `${height}px` : height;
    }

    return (
        <div
            className={cn(
                'bg-gray-200',
                variants[variant],
                animations[animation],
                className
            )}
            style={styles}
            {...props}
        />
    );
}
