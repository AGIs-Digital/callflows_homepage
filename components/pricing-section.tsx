"use client";

import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: 199,
    features: [
      "Bis zu 1.000 Anrufe/Monat",
      "Basis Analyse-Dashboard",
      "Email Support"
    ],
    buttonText: "Jetzt starten",
    buttonVariant: "default"
  },
  {
    name: "Professional",
    price: 399,
    features: [
      "Bis zu 5.000 Anrufe/Monat",
      "Erweiterte Analysen",
      "Prioritäts-Support",
      "Custom Integrationen"
    ],
    buttonText: "Jetzt starten",
    buttonVariant: "default",
    highlighted: true
  },
  {
    name: "Enterprise",
    price: 799,
    features: [
      "Unbegrenzte Anrufe",
      "KI-Training auf Ihre Bedürfnisse",
      "24/7 Premium Support",
      "Dedizierter Account Manager"
    ],
    buttonText: "Kontakt aufnehmen",
    buttonVariant: "outline"
  }
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-24 bg-white dark:bg-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-primary dark:text-white mb-6">
            Transparente Preisgestaltung
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Wählen Sie den Plan, der zu Ihren Anforderungen passt
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-base ${!isYearly ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
              Monatlich
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-base ${isYearly ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
              Jährlich (10% Rabatt)
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const monthlyPrice = plan.price;
            const yearlyPrice = Math.round(plan.price * 0.9);
            const displayPrice = isYearly ? yearlyPrice : monthlyPrice;

            return (
              <div
                key={plan.name}
                className={`rounded-xl p-8 ${
                  plan.highlighted
                    ? 'border-2 border-primary shadow-lg dark:bg-gray-800'
                    : 'border border-gray-200 dark:border-gray-700 dark:bg-gray-800'
                }`}
              >
                <h3 className="text-3xl font-bold mb-6 dark:text-white">{plan.name}</h3>
                <div className="mb-8">
                  <span className="text-5xl font-bold dark:text-white">{displayPrice}€</span>
                  <span className="text-gray-600 dark:text-gray-300 text-lg">/Monat</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300 text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-4 px-6 rounded-lg text-base font-medium transition-colors ${
                    plan.buttonVariant === 'outline'
                      ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                      : 'bg-accent text-gray-900 hover:bg-accent/90'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}