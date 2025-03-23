"use client";

import { MinutePackage } from "@/lib/types/pricing";
import { Button } from "@/components/ui/button";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface MinutePackageCardProps {
  package: MinutePackage;
}

export function MinutePackageCard({ package: pkg }: MinutePackageCardProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          console.log("Booking successful:", e.detail);
        },
      });
    })();
  }, []);

  const isCustomPackage = pkg.isCustom || pkg.minutes === 0;

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-bold">{pkg.name}</h3>
        <p className="text-sm text-muted-foreground">{pkg.description}</p>
      </div>

      {isCustomPackage ? (
        <div className="mb-6">
          <div className="flex items-baseline mb-2">
            <span className="text-2xl font-bold">Preis auf Anfrage</span>
          </div>
          <p className="text-sm text-muted-foreground">Individuelles Minutenkontingent</p>
        </div>
      ) : (
        <div className="mb-6">
          <div className="flex items-baseline mb-2">
            <span className="text-2xl font-bold">{pkg.totalPrice.toLocaleString('de-DE')} €</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{pkg.minutes.toLocaleString('de-DE')} Minuten</p>
            <p className="text-sm text-muted-foreground">{pkg.pricePerMinute.toFixed(2).replace('.', ',')} € pro Minute</p>
            <p className="text-sm text-green-600">Ersparnis: {pkg.savings}</p>
          </div>
        </div>
      )}

      <Button 
        className="w-full" 
        variant="outline"
        data-cal-link="callflows/55min"
        data-cal-config='{"layout":"popup"}'
      >
        {isCustomPackage ? "Individuelles Angebot" : "Jetzt buchen"}
      </Button>
    </div>
  );
} 