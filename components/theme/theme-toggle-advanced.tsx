"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type ThemeOption = "light" | "dark" | "system";

interface ThemeInfo {
  id: ThemeOption;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const themes: ThemeInfo[] = [
  {
    id: "light",
    label: "Hell",
    icon: Sun,
    description: "Helles Design für alle Situationen"
  },
  {
    id: "dark", 
    label: "Dunkel",
    icon: Moon,
    description: "Dunkles Design schont die Augen"
  },
  {
    id: "system",
    label: "System",
    icon: Monitor,
    description: "Automatisch je nach Systemeinstellung"
  }
];

/**
 * Erweiteter Theme Toggle mit Dropdown und System-Detection
 * Features:
 * - 3 Modi: Hell, Dunkel, System
 * - Visuelles Feedback
 * - Accessibility optimiert
 * - Mobile-friendly
 * - Smooth Animations
 */
export function ThemeToggleAdvanced() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Anti-Flash während Hydration
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-9 h-9 p-0"
        disabled
      >
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
        <span className="sr-only">Theme wird geladen...</span>
      </Button>
    );
  }

  const currentTheme = theme as ThemeOption;
  const currentThemeInfo = themes.find(t => t.id === currentTheme) || themes[2];
  
  // Zeige das tatsächlich aktive Theme-Icon
  const displayTheme = currentTheme === "system" ? systemTheme as ThemeOption : currentTheme;
  const displayThemeInfo = themes.find(t => t.id === displayTheme) || themes[0];

  const handleThemeChange = (newTheme: ThemeOption) => {
    // Smooth transition mit kurzer Verzögerung für Animation
    document.documentElement.style.transition = "background-color 0.3s ease, color 0.3s ease";
    setTheme(newTheme);
    
    // Entferne Transition nach Animation
    setTimeout(() => {
      document.documentElement.style.transition = "";
    }, 300);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-9 h-9 p-0 relative",
            "hover:bg-accent/50 focus:bg-accent/50",
            "transition-all duration-200",
            "focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
          aria-label={`Aktuell: ${currentThemeInfo.label}. Klicken zum Ändern.`}
          title={`Design: ${currentThemeInfo.label} - ${currentThemeInfo.description}`}
        >
          <div className="relative w-4 h-4">
            {/* Theme Icon mit Smooth Transition */}
            <displayThemeInfo.icon 
              className={cn(
                "h-4 w-4 absolute inset-0",
                "transition-all duration-300 ease-in-out",
                "text-foreground"
              )}
            />
            
            {/* System Indicator für visuelles Feedback */}
            {currentTheme === "system" && (
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full border border-background animate-pulse" />
            )}
          </div>
          
          <span className="sr-only">
            Design-Einstellungen öffnen
          </span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-48 p-1"
        sideOffset={8}
      >
        {themes.map((themeInfo) => {
          const isActive = currentTheme === themeInfo.id;
          const Icon = themeInfo.icon;
          
          return (
            <DropdownMenuItem
              key={themeInfo.id}
              onClick={() => handleThemeChange(themeInfo.id)}
              className={cn(
                "flex items-start gap-3 p-3 cursor-pointer",
                "focus:bg-accent focus:text-accent-foreground",
                "transition-colors duration-150",
                isActive && "bg-accent/50 text-accent-foreground"
              )}
            >
              <Icon className={cn(
                "h-4 w-4 mt-0.5 flex-shrink-0",
                isActive ? "text-primary" : "text-muted-foreground"
              )} />
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-medium text-sm",
                    isActive && "text-primary"
                  )}>
                    {themeInfo.label}
                  </span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-tight">
                  {themeInfo.description}
                </p>
                
                {/* System Theme zusätzliche Info */}
                {themeInfo.id === "system" && (
                  <p className="text-xs text-primary/70">
                    Derzeit: {systemTheme === "dark" ? "Dunkel" : "Hell"}
                  </p>
                )}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Kompakter Theme Toggle für Mobile/Header
 * Schneller Wechsel zwischen Hell/Dunkel (ohne System)
 */
export function ThemeToggleCompact() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 p-0" disabled>
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";
  
  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn(
        "w-9 h-9 p-0 relative",
        "hover:bg-accent/50 focus:bg-accent/50",
        "transition-all duration-200",
        "focus:ring-2 focus:ring-ring focus:ring-offset-2"
      )}
      aria-label={`Zu ${isDark ? "hellem" : "dunklem"} Design wechseln`}
      title={`Zu ${isDark ? "hellem" : "dunklem"} Design wechseln`}
    >
      <Sun className={cn(
        "h-4 w-4 absolute inset-0",
        "transition-all duration-300",
        "rotate-0 scale-100",
        isDark && "-rotate-90 scale-0"
      )} />
      <Moon className={cn(
        "h-4 w-4 absolute inset-0", 
        "transition-all duration-300",
        "rotate-90 scale-0",
        isDark && "rotate-0 scale-100"
      )} />
      <span className="sr-only">
        Design zwischen hell und dunkel umschalten
      </span>
    </Button>
  );
}
