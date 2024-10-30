'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ShinyButton({ children, className, ...props }: ShinyButtonProps) {
  return (
    <button className={cn('shiny-button', className)} {...props}>
      {children}
    </button>
  );
}