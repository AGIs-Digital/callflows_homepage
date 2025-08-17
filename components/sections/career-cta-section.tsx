"use client";

import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Lightbulb, Heart } from "@/lib/icons";

export function CareerCtaSection() {
  const { t } = useI18n();

  const benefits = [
    {
      icon: Users,
      title: t("about.career.benefit1Title"),
      description: t("about.career.benefit1Description")
    },
    {
      icon: Lightbulb,
      title: t("about.career.benefit2Title"),
      description: t("about.career.benefit2Description")
    },
    {
      icon: Heart,
      title: t("about.career.benefit3Title"),
      description: t("about.career.benefit3Description")
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary/10 to-accent/30">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("about.career.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("about.career.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, idx) => {
            const IconComponent = benefit.icon;
            return (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="bg-card/60 rounded-2xl border p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              {t("about.career.ctaTitle")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("about.career.ctaDescription")}
            </p>
            <Button size="lg" className="group" asChild>
              <a href="mailto:karriere@callflows.de?subject=Bewerbung%20bei%20callflows">
                {t("about.career.ctaButton")}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
