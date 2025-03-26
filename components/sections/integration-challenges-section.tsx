"use client";

import { Puzzle, Zap, Layers, Wrench, Lightbulb } from "lucide-react";

export function IntegrationChallengesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Linke Spalte - Text und Herausforderungen */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-primary dark:text-white">
              KI-Integration ohne Komplexität
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Die aktuelle KI-Landschaft stellt Unternehmen vor erhebliche Herausforderungen. 
              Viele Lösungen erfordern die Verknüpfung zahlreicher Einzelkomponenten:
            </p>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
                  <Layers className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Fragmentierte Technologien</h3>
                  <p className="text-sm text-muted-foreground">
                    Separate Tools für Sprachsynthese, Telefonie, KI-Modelle und Steuerungslogik
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
                  <Wrench className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Technisches Know-how</h3>
                  <p className="text-sm text-muted-foreground">
                    Spezialisierte Fachkräfte für Implementierung und Wartung erforderlich
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
                  <Puzzle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Komplexe Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Aufwändige Abstimmung zwischen verschiedenen Systemen und Schnittstellen
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-6 mt-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Lightbulb className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Unsere Lösung</h3>
                  <p className="text-muted-foreground">
                    <strong className="text-primary">callflows</strong> übernimmt die gesamte Komplexität für Sie. 
                    Wir integrieren alle notwendigen Komponenten zu einer schlüsselfertigen Lösung – 
                    ohne dass Sie KI-Expertise oder zusätzliche Vollzeitkräfte benötigen.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Rechte Spalte - Platzhalter für Animation */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 h-[400px] flex items-center justify-center border border-border">
            <div className="text-center">
              <Zap className="w-16 h-16 text-primary/40 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">
                Animation zur Integration verschiedener KI-Komponenten
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                (Platzhalter für Magic UI Animation)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 