"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/ui/animated-text";

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-30rem)] bg-secondary dark:bg-secondary/10 overflow-hidden">
      <div className="container relative grid lg:grid-cols-[1fr,400px] gap-8 items-center py-16 md:py-24 px-4 md:px-8">
        <div className="relative z-10 space-y-6 md:space-y-8 animate-slideIn">
          <h1 className="text-3xl sm:text-4xl md:text-[56px] font-bold leading-tight text-primary dark:text-white">
            <AnimatedText
              words={["Einfach.", "Automatisch.", "Erfolgreich."]}
              className="leading-tight"
            />
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-4xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-[600px]">
            KI-gestützte Voice Agents
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-full md:max-w-[700px]">
            Automatisieren Sie Ihre Kommunikation mit unseren intelligenten Lösungen.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="bg-accent text-gray-900 px-6 md:px-8 py-3 rounded-lg font-medium 
                             flex items-center hover:bg-accent/90 transition-colors">
              Demo
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>

        {/* Widget Container */}
        <div className={cn(
          "relative lg:static",
          "flex justify-center lg:justify-end w-full",
          "mt-8 lg:mt-0"
        )}>
          <div className={cn(
            "relative lg:absolute",
            "lg:right-0 lg:top-1/2 lg:-translate-y-1/2",
            "w-full max-w-[400px] aspect-[2/3]",
            "z-20"
          )}>
            <iframe 
              id="audio_iframe"
              src="https://widget.synthflow.ai/widget/v2/1734458300743x316318366914512640/1734458300564x710091014548361600"
              allow="microphone"
              className={cn(
                "border-none bg-transparent",
                "rounded-lg shadow-lg",
                "transition-transform duration-300",
                "hover:scale-[1.02]",
                "w-full h-full"
              )}
              style={{
                pointerEvents: "auto",
                zIndex: 999
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}