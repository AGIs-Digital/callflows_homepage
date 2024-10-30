'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function NavigationMenu() {
  const { setTheme, theme } = useTheme();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Link href="/" className="font-bold text-2xl">
            Callflows
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/products" className="text-sm font-medium">
              Products
            </Link>
            <Link href="/solutions" className="text-sm font-medium">
              Solutions
            </Link>
            <Link href="/pricing" className="text-sm font-medium">
              Pricing
            </Link>
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button variant="outline">Sign In</Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </nav>
  );
}