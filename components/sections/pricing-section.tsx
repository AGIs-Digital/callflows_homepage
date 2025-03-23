"use client";

import { PricingTables } from "@/components/pricing/tables";
import { Countdown } from "@/components/ui/countdown";
import { useEffect, useState } from "react";

export function PricingSection() {
  const [isPhase1Active, setIsPhase1Active] = useState(true);
  const phase1EndDate = "2025-04-01";
  const phase2EndDate = "2025-06-01";

  useEffect(() => {
    const checkPhase = () => {
      const now = new Date().getTime();
      const phase1End = new Date(phase1EndDate).getTime();
      setIsPhase1Active(now < phase1End);
    };

    checkPhase();
    const timer = setInterval(checkPhase, 1000 * 60); // Prüfe jede Minute

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white dark:bg-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white mb-4 md:mb-6 px-4">
            Transparente Preisgestaltung
          </h2>
          <div className="max-w-2xl mx-auto bg-accent/10 p-6 rounded-lg">
            {isPhase1Active ? (
              <div className="mb-8">
                <p className="text-lg font-semibold text-primary mb-4">
                  🎉 Phase 1 - Early Bird Angebot 🎉
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Dauerhaft reduzierte Monatsgebühr für das Starter-Paket</li>
                  <li>• Einrichtungsgebühr entfällt</li>
                  <li>• Garantierte Preisbindung für das gewählte Paket</li>
                </ul>
                <div className="mt-4">
                  <Countdown 
                    endDate={phase1EndDate}
                    remainingSpots={3}
                  />
                </div>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold text-primary mb-4">
                  🚀 Phase 2 - Launch Special 🚀
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Keine einmalige Einrichtungsgebühr</li>
                  <li>• Reguläre Paketpreise</li>
                </ul>
                <div className="mt-4">
                  <Countdown 
                    endDate={phase2EndDate}
                    remainingSpots={13}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <PricingTables />
      </div>
    </section>
  );
}