"use client";

import { BookingButton } from "@/components/booking/booking-button";
import { useI18n } from "@/lib/i18n";

export function CTASectionSecondary() {
  const { t } = useI18n();

  return (
    <section className="py-20 bg-gradient-to-b from-primary/35 via-accent/30 to-accent/40">
      <div className="container max-w-6xl text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-primary dark:text-white">
            {t('pricing.ctaTitle')}
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            {t('pricing.ctaDescription')}
          </p>
          <BookingButton 
            buttonText={t('pricing.ctaButtonText')}
            className="bg-accent hover:bg-accent/90 text-gray-900 font-semibold px-8 py-4 text-lg gap-2"
            size="lg"
            showArrow={true}
          />
        </div>
      </div>
    </section>
  );
} 