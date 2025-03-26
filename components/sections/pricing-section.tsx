"use client";

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
        <div className="text-center">
          <div className="max-w-3xl mx-auto bg-accent/10 p-6 rounded-lg">
            {isPhase1Active ? (
              <div className="mb-8">
                <p className="text-lg font-semibold text-primary mb-4">
                  🎉 Phase 1 - Early Bird Angebot 🎉
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Dauerhaft reduzierter Minutenpreis für das erste Paket</li>
                  <li>• Gratis onboaring</li>
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
                  <li>• Einrichtungsgebühr entfällt!</li>
                </ul>
                <div className="mt-4">
                  <Countdown 
                    endDate={phase2EndDate}
                    remainingSpots={8}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}