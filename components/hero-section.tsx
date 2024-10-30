"use client";

import { Bot } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-secondary dark:bg-secondary/10 min-h-[600px]">
      <div className="container grid lg:grid-cols-[1fr,400px] gap-12 items-center py-24">
        <div className="space-y-6">
          <h1 className="text-[56px] font-bold leading-tight text-primary dark:text-white">
            KI-gestützte<br />Outbound Calls
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-[600px]">
            Automatisieren Sie Ihre Outbound-Kommunikation mit unserem
            intelligenten Voice Agent. Einfach. Automatisch. Erfolgreich.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="bg-accent text-gray-900 px-8 py-3 rounded-lg font-medium flex items-center hover:bg-accent/90">
              Demo anfordern
              <span className="ml-2">→</span>
            </button>
            <button className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-8 py-3 rounded-lg font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              Mehr erfahren
            </button>
          </div>
        </div>
        
        <div className="relative h-full">
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg w-[280px]">
              <Bot className="w-12 h-12 text-primary mb-4" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Aktiver Anruf</p>
              <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mt-2">
                <div className="w-1/2 h-full bg-primary rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}