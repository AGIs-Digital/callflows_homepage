"use client";

import { Bot } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative bg-secondary dark:bg-secondary/10 min-h-[600px]">
      <div className="container grid lg:grid-cols-[1fr,400px] gap-12 items-center py-24">
        <div className="space-y-6 animate-slideIn">
          <h1 className="text-[56px] font-bold leading-tight text-primary dark:text-white">
          Einfach. Automatisch. Erfolgreich.
          </h1>
          <h2 className="text-4xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-[600px]">
          KI-gestützte Voice Agents
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-[700px]">
          Automatisieren Sie Ihre Kommunikation mit unseren intelligenten Lösungen.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="bg-accent text-gray-900 px-8 py-3 rounded-lg font-medium flex items-center hover:bg-accent/90">
              Demo
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>
        
        <div className="relative h-full">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 animate-float">
            <iframe 
              id="audio_iframe"
              src="https://widget.synthflow.ai/widget/v2/1734458300743x316318366914512640/1734458300564x710091014548361600"
              allow="microphone"
              width="400"
              height="600"
              className="border-none bg-transparent pointer-events-auto"
              style={{ zIndex: 999 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}