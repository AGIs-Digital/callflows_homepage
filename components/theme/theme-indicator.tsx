"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Subtiler Theme-Indikator für visuelle Bestätigung
 * Zeigt kurz an, wenn Theme gewechselt wird
 */
export function ThemeIndicator() {
  const { theme, resolvedTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [lastTheme, setLastTheme] = useState<string | undefined>();

  useEffect(() => {
    if (theme && theme !== lastTheme && lastTheme !== undefined) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timer);
    }
    setLastTheme(theme);
  }, [theme, lastTheme]);

  if (!isVisible) return null;

  const getThemeInfo = () => {
    switch (theme) {
      case "light":
        return { icon: Sun, label: "Helles Design", color: "text-amber-500" };
      case "dark":
        return { icon: Moon, label: "Dunkles Design", color: "text-blue-400" };
      case "system":
        return { 
          icon: Monitor, 
          label: `System (${resolvedTheme === "dark" ? "Dunkel" : "Hell"})`, 
          color: "text-purple-400" 
        };
      default:
        return { icon: Sun, label: "Design", color: "text-gray-400" };
    }
  };

  const themeInfo = getThemeInfo();
  const Icon = themeInfo.icon;

  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 z-50",
        "bg-background/95 backdrop-blur-sm",
        "border border-border rounded-lg",
        "px-3 py-2 shadow-lg",
        "animate-in slide-in-from-bottom-2 fade-in",
        "transition-all duration-200"
      )}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center gap-2">
        <Icon className={cn("h-4 w-4", themeInfo.color)} />
        <span className="text-sm font-medium text-foreground">
          {themeInfo.label}
        </span>
      </div>
    </div>
  );
}

/**
 * Theme-Status für Accessibility (Screen Reader)
 */
export function ThemeStatus() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" 
    ? `System (${resolvedTheme === "dark" ? "Dunkles" : "Helles"} Design)`
    : theme === "dark" 
      ? "Dunkles Design" 
      : "Helles Design";

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      Aktuelles Design: {currentTheme}
    </div>
  );
}
