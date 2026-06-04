'use client';

import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton'

export function ContactFormSkeleton() {
  return (
    <Card className="p-6 md:p-8">
      <div className="mb-6">
        <Skeleton variant="text" width="200px" height="32px" className="mb-2" />
        <Skeleton variant="text" width="300px" height="20px" />
      </div>
      
      <div className="space-y-5">
        {/* Name and Email fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Skeleton variant="text" width="80px" height="16px" className="mb-2" />
            <Skeleton variant="rounded" height="48px" />
          </div>
          <div>
            <Skeleton variant="text" width="80px" height="16px" className="mb-2" />
            <Skeleton variant="rounded" height="48px" />
          </div>
        </div>
        
        {/* Phone and Department */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Skeleton variant="text" width="80px" height="16px" className="mb-2" />
            <Skeleton variant="rounded" height="48px" />
          </div>
          <div>
            <Skeleton variant="text" width="80px" height="16px" className="mb-2" />
            <Skeleton variant="rounded" height="48px" />
          </div>
        </div>
        
        {/* Preferred Contact */}
        <div>
          <Skeleton variant="text" width="150px" height="16px" className="mb-2" />
          <div className="flex gap-4">
            <Skeleton variant="rounded" width="80px" height="20px" />
            <Skeleton variant="rounded" width="80px" height="20px" />
          </div>
        </div>
        
        {/* Message */}
        <div>
          <Skeleton variant="text" width="80px" height="16px" className="mb-2" />
          <Skeleton variant="rounded" height="120px" />
        </div>
        
        {/* Submit Button */}
        <Skeleton variant="rounded" height="52px" />
      </div>
    </Card>
  );
}
