"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Injiziert optimierte CSS-Variablen für seamless Theme-Switching
 * - Verhindert Layout-Shifts
 * - Optimiert für Performance
 * - Unterstützt alle Brand-Farben
 */
export function ThemeStyleInjector() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Nur einmal beim Mount injizieren
    if (typeof document === 'undefined') return;

    const style = document.createElement('style');
    style.id = 'callflows-theme-variables';
    
    // Entferne existierende Styles
    const existing = document.getElementById('callflows-theme-variables');
    if (existing) {
      existing.remove();
    }

    style.innerHTML = `
      /* callflows Theme CSS Variables - Optimiert für Performance */
      :root {
        /* Brand Colors - Konstant */
        --brand-primary: #004AAD;
        --brand-secondary: #DEF0F2;
        --brand-tertiary: #0F62D5;
        --brand-accent: #FFB703;
        
        /* Light Theme */
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --card: 0 0% 100%;
        --card-foreground: 222.2 84% 4.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 222.2 84% 4.9%;
        --primary: 221.2 83.2% 53.3%;
        --primary-foreground: 210 40% 98%;
        --secondary: 210 40% 96%;
        --secondary-foreground: 222.2 84% 4.9%;
        --muted: 210 40% 96%;
        --muted-foreground: 215.4 16.3% 46.9%;
        --accent: 210 40% 96%;
        --accent-foreground: 222.2 84% 4.9%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 210 40% 98%;
        --border: 214.3 31.8% 91.4%;
        --input: 214.3 31.8% 91.4%;
        --ring: 221.2 83.2% 53.3%;
        --radius: 0.5rem;
        
        /* Custom callflows variables */
        --section-light: 210 40% 98%;
        --section-dark: 215 25% 27%;
        --gradient-start: var(--brand-secondary);
        --gradient-end: var(--brand-accent);
        --hero-bg: linear-gradient(135deg, var(--brand-secondary) 0%, rgba(255, 183, 3, 0.1) 100%);
        --cta-bg: linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-tertiary) 100%);
      }

      [data-theme="dark"], .dark {
        /* Dark Theme */
        --background: 222.2 84% 4.9%;
        --foreground: 210 40% 98%;
        --card: 222.2 84% 4.9%;
        --card-foreground: 210 40% 98%;
        --popover: 222.2 84% 4.9%;
        --popover-foreground: 210 40% 98%;
        --primary: 217.2 91.2% 59.8%;
        --primary-foreground: 222.2 84% 4.9%;
        --secondary: 217.2 32.6% 17.5%;
        --secondary-foreground: 210 40% 98%;
        --muted: 217.2 32.6% 17.5%;
        --muted-foreground: 215 20.2% 65.1%;
        --accent: 217.2 32.6% 17.5%;
        --accent-foreground: 210 40% 98%;
        --destructive: 0 62.8% 30.6%;
        --destructive-foreground: 210 40% 98%;
        --border: 217.2 32.6% 17.5%;
        --input: 217.2 32.6% 17.5%;
        --ring: 224.3 76.3% 94.1%;
        
        /* Dark theme specific customizations */
        --section-light: 217.2 32.6% 15%;
        --section-dark: 222.2 84% 4.9%;
        --hero-bg: linear-gradient(135deg, rgba(0, 74, 173, 0.1) 0%, rgba(255, 183, 3, 0.05) 100%);
        --cta-bg: linear-gradient(135deg, rgba(0, 74, 173, 0.8) 0%, rgba(15, 98, 213, 0.8) 100%);
      }

      /* Smooth transitions für bessere UX */
      * {
        transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
      }
      
      /* Performance Optimierungen */
      html {
        transition: background-color 0.3s ease;
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
      }
      
      body {
        transition: background-color 0.3s ease;
      }
      
      /* Anti-Flash für kritische Elemente */
      .hero-section, 
      .cta-section,
      .site-header {
        transition: background-color 0.3s ease, color 0.3s ease;
      }
      
      /* Spezielle Hero-Behandlung */
      .hero-gradient {
        background: var(--hero-bg);
        transition: background 0.5s ease;
      }
      
      .cta-gradient {
        background: var(--cta-bg);
        transition: background 0.5s ease;
      }
      
      /* Mobile Optimierungen */
      @media (max-width: 768px) {
        * {
          transition-duration: 100ms; /* Schnellere Transitions auf Mobile */
        }
      }
      
      /* Reduzierte Motion */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
      
      /* System Theme Detection */
      @media (prefers-color-scheme: dark) {
        html:not([data-theme]) {
          color-scheme: dark;
        }
      }
      
      @media (prefers-color-scheme: light) {
        html:not([data-theme]) {
          color-scheme: light;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      if (document.getElementById('callflows-theme-variables')) {
        document.getElementById('callflows-theme-variables')?.remove();
      }
    };
  }, []); // Nur einmal ausführen

  return null; // Keine UI, nur Style-Injection
}
