'use client';

import { Skeleton } from '@/components/ui/Skeleton';

export function DepartmentListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-start justify-between mb-3">
            <Skeleton variant="rounded" width="32px" height="32px" />
            <Skeleton variant="rounded" width="80px" height="24px" />
          </div>
          
          <Skeleton variant="text" width="80%" height="24px" className="mb-2" />
          <Skeleton variant="text" width="100%" height="16px" className="mb-3" />
          
          <div className="space-y-2 pt-3 border-t border-border">
            <Skeleton variant="text" width="70%" height="16px" />
            <Skeleton variant="text" width="85%" height="16px" />
            <Skeleton variant="text" width="50%" height="16px" />
          </div>
        </div>
      ))}
    </div>
  );
}
