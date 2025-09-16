"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * Moderner Theme Provider mit optimierter Performance und UX
 * - Verhindert Theme-Flashing beim ersten Laden
 * - Unterstützt System-Präferenzen intelligent
 * - Optimiert für Mobile und Desktop
 */
export function ModernThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextThemesProvider 
      {...props}
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="callflows-theme"
    >
      {/* Anti-Flash-Container mit CSS-Variablen */}
      <div 
        className={mounted ? "" : "theme-loading"}
        suppressHydrationWarning
        style={{
          // CSS Custom Properties für nahtlose Theme-Übergänge
          colorScheme: 'light dark',
        }}
      >
        {children}
      </div>
      
      {/* Inline CSS für Anti-Flash und Transitions */}
      <style jsx global>{`
        /* Theme Loading State - verhindert Flash */
        .theme-loading * {
          transition: none !important;
        }
        
        /* Smooth Theme Transitions */
        html {
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        body {
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        /* Theme-spezifische Transitions */
        [data-theme="light"],
        [data-theme="dark"] {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Reduzierte Motion für Accessibility */
        @media (prefers-reduced-motion: reduce) {
          html, body, * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
        
        /* Dark Mode Optimierungen */
        @media (prefers-color-scheme: dark) {
          html {
            color-scheme: dark;
          }
        }
        
        @media (prefers-color-scheme: light) {
          html {
            color-scheme: light;
          }
        }
      `}</style>
    </NextThemesProvider>
  );
}
