"use client";

import { BookingButton } from "@/components/booking/booking-button";

interface MinutePackageCardProps {
  package: {
    name: string;
    description: string;
    minutes: number;
    totalPrice: number;
    pricePerMinute: number;
    savings: string;
    isCustom?: boolean;
  };
}

export function MinutePackageCard({ package: pkg }: MinutePackageCardProps) {
  const isCustomPackage = pkg.isCustom || pkg.minutes === 0;

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-bold">{pkg.name}</h3>
        <p className="text-s text-muted-foreground">{pkg.description}</p>
      </div>

      {isCustomPackage ? (
        <div className="mb-6">
          <div className="flex items-baseline mb-2">
            <span className="text-2xl font-bold">Preis auf Anfrage</span>
          </div>
          <p className="text-s text-muted-foreground">Individuelles Minutenkontingent</p>
        </div>
      ) : (
        <div className="mb-6">
          <div className="flex items-baseline mb-2">
            <span className="text-2xl font-bold">{pkg.totalPrice.toLocaleString('de-DE')} €</span>
          </div>
          <div className="space-y-1">
            <p className="text-s text-muted-foreground">{pkg.minutes.toLocaleString('de-DE')} Minuten</p>
            <p className="text-s text-muted-foreground">{pkg.pricePerMinute.toFixed(2).replace('.', ',')} € pro Minute</p>
            <p className="text-s text-green-600">Ersparnis: {pkg.savings}</p>
          </div>
        </div>
      )}

      <div className="w-full">
        <BookingButton />
      </div>
    </div>
  );
} 