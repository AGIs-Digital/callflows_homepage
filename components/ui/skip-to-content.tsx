"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SkipToContentProps {
  className?: string;
}

export function SkipToContent({ className }: SkipToContentProps) {
  const handleSkipToMain = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSkipToNavigation = () => {
    const navigation = document.getElementById('main-navigation');
    if (navigation) {
      navigation.focus();
      navigation.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className={cn(
        "sr-only focus-within:not-sr-only fixed top-0 left-0 z-[100] p-2 bg-background border border-border rounded-br-lg shadow-lg",
        className
      )}
    >
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSkipToMain}
          className="focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Zum Hauptinhalt springen
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSkipToNavigation}
          className="focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Zur Navigation springen
        </Button>
      </div>
    </div>
  );
}
