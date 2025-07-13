"use client";

import { BookingButton } from "@/components/booking/booking-button";
import { useI18n } from "@/lib/i18n";

export function CTASectionSecondary() {
  const { t } = useI18n();

  return (
    <section className="py-20 bg-gradient-to-b from-primary/60 via-primary/5 to-background">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-primary dark:text-white">
            {t('pricing.ctaTitle')}
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            {t('pricing.ctaDescription')}
          </p>
          <BookingButton 
            buttonText={t('pricing.ctaButtonText')}
            className="px-8 py-4"
            variant="default"
            size="lg"
            showArrow={true}
          />
        </div>
      </div>
    </section>
  );
} 