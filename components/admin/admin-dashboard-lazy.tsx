"use client";

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy Loading für Admin Components (reduziert Initial Bundle um ~40KB)
const BlogManagement = lazy(() => import('@/app/admin-dashboard/blog-management/page'));
const LeadGenerator = lazy(() => import('@/app/admin-dashboard/lead-generator/page'));

interface AdminDashboardLazyProps {
  component: 'blog-management' | 'lead-generator';
}

export function AdminDashboardLazy({ component }: AdminDashboardLazyProps) {
  const renderComponent = () => {
    switch (component) {
      case 'blog-management':
        return <BlogManagement />;
      case 'lead-generator':
        return <LeadGenerator />;
      default:
        return <div>Component not found</div>;
    }
  };

  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner className="w-8 h-8" />
          <span className="ml-2 text-muted-foreground">
            Lade Admin-Bereich...
          </span>
        </div>
      }
    >
      {renderComponent()}
    </Suspense>
  );
}
