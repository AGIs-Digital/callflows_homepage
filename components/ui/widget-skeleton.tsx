"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Mic, Phone, Volume2 } from "@/lib/icons";

interface WidgetSkeletonProps {
  className?: string;
  showAnimations?: boolean;
}

export function WidgetSkeleton({ className, showAnimations = true }: WidgetSkeletonProps) {
  return (
    <div 
      className={cn(
        "w-full h-full bg-gradient-to-br from-background/80 to-muted/50 rounded-xl border border-border/50 p-6 flex flex-col items-center justify-center space-y-6",
        className
      )}
      role="status" 
      aria-label="KI Voice Agent wird geladen..."
    >
      {/* Header Bereich */}
      <div className="w-full space-y-3">
        <Skeleton className="h-6 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>

      {/* Zentrale Mikrofon-Animation */}
      <div className="relative flex flex-col items-center space-y-4">
        <div 
          className={cn(
            "relative p-4 rounded-full bg-primary/10 border-2 border-primary/20",
            showAnimations && "animate-pulse"
          )}
        >
          <Mic 
            className={cn(
              "h-8 w-8 text-primary",
              showAnimations && "animate-bounce"
            )}
          />
          
          {/* Pulsierende Ringe */}
          {showAnimations && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping delay-75" />
            </>
          )}
        </div>
        
        <div className="text-center space-y-2">
          <Skeleton className="h-5 w-32 mx-auto" />
          <Skeleton className="h-3 w-24 mx-auto" />
        </div>
      </div>

      {/* Status Indikatoren */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Phone className="h-4 w-4" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Volume2 className="h-4 w-4" />
          <Skeleton className="h-3 w-14" />
        </div>
      </div>

      {/* Fortschrittsbalken */}
      <div className="w-full space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Verbindung aufbauen...</span>
          <span>0%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className={cn(
              "h-full bg-gradient-to-r from-primary/60 to-primary rounded-full",
              showAnimations && "animate-pulse"
            )}
            style={{ width: "25%" }}
          />
        </div>
      </div>

      {/* Accessibility Text */}
      <div className="sr-only">
        KI Voice Agent wird geladen. Bitte warten Sie einen Moment, während die Verbindung hergestellt wird.
      </div>
    </div>
  );
}
