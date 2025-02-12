"use client";

import { PricingCard } from "@/components/pricing/plan-card";
import { monthlyPlans, minutePackages } from "@/lib/data/pricing-plans";

export function PricingTables() {
  return (
    <div className="mb-12">
      {/* Monthly Plans */}
      <div className="mb-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Monatliche Pakete mit Freiminuten</h3>
          <p className="text-muted-foreground mb-2">
            Feste monatliche Kosten mit inkludierten Freiminuten, jederzeit monatlich kündbar
          </p>
          <p className="text-sm text-muted-foreground">Alle Preise zzgl. gesetzlicher MwSt.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {monthlyPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>

      {/* Minute Packages Table */}
      <div className="mt-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Zusätzliche Minutenpakete</h3>
          <p className="text-muted-foreground mb-2">
            Sparen Sie mit unseren Minutenpaketen gegenüber dem Standardpreis von 0,99 €/Minute
          </p>
          <p className="text-sm text-muted-foreground">Alle Preise zzgl. gesetzlicher MwSt.</p>
        </div>
        <div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-4 px-6 text-left">Paket</th>
                <th className="py-4 px-6 text-right">Minuten</th>
                <th className="py-4 px-6 text-right">Preis/Minute</th>
                <th className="py-4 px-6 text-right">Gesamtpreis</th>
                <th className="py-4 px-6 text-right">Ersparnis</th>
              </tr>
            </thead>
            <tbody>
              {minutePackages.map((pkg, index) => (
                <tr key={pkg.name} className={index !== minutePackages.length - 1 ? "border-b" : ""}>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium">{pkg.name}</div>
                      <div className="text-sm text-muted-foreground">{pkg.description}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">{pkg.minutes.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right">{pkg.pricePerMinute.toFixed(2).replace('.', ',')} €</td>
                  <td className="py-4 px-6 text-right font-medium">{pkg.totalPrice.toLocaleString()} €</td>
                  <td className="py-4 px-6 text-right text-green-600">{pkg.savings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Information */}
        <div className="mt-16 space-y-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">So funktioniert es:</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Minuten vorausbuchen: Du zahlst den jeweiligen Paketpreis und erhältst das entsprechende Kontingent.</li>
              <li>• Flexibel einsetzen: Jede Minute kann für Inbound oder Outbound-Anrufe genutzt werden (sofern nicht anders vereinbart).</li>
              <li>• Weitersparen: Solltest du mehr Minuten benötigen als im Paket enthalten, kannst du jederzeit nachbuchen – oder unsere Einzeltarif-Option (0,99 € /Min) nutzen.</li>
            </ul>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg">
            <p className="text-muted-foreground">
              <strong>Übrigens:</strong> Unser KI-Voice-Agent arbeitet rund um die Uhr und ersetzt nicht nur „Telefonie", 
              sondern auch aufwändige Prozesse in Terminierung, Support oder Verkauf. So sparst du langfristig 
              Personalkosten und steigerst die Erreichbarkeit deines Unternehmens.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Warum lohnen sich Minutenpakete?</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Planungssicherheit: Sie wissen genau, welche Kosten auf Sie zukommen.</li>
              <li>• Attraktiver Rabatt: Mit größeren Volumina sinken Ihre Kosten pro Minute deutlich.</li>
              <li>• Flexibles Upgrade: Ist Ihr Kontingent aufgebraucht, können Sie jederzeit ein neues Paket buchen oder in den Einzelpreis von 0,99 €/Min wechseln.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Beispielrechnung</h4>
            <p className="text-muted-foreground mb-4">
              Stellen Sie sich vor, Sie benötigen pro Monat ca. 5.000 Minuten.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Ohne Paket würden Sie 5.000 × 0,99 € = 4.950 € bezahlen.</li>
              <li>• Mit „Pro"-Paket (5.000 Min für 4.250 €) sparen Sie rund 700 € – das sind ca. 14 % gegenüber dem Standard-Einzelpreis.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Jetzt durchstarten</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Wählen Sie das Minuten-Paket, das zu Ihrem Bedarf passt.</li>
              <li>• Buchen Sie optional weitere Outbound-/Inbound-Agents oder automatisierte Workflows, um Ihren Voice Agent noch leistungsstärker zu machen.</li>
              <li>• Genießen Sie 24/7 Erreichbarkeit Ihrer KI-basierten Telefonassistenz bei klaren und kalkulierbaren Kosten.</li>
            </ul>
          </div>

          <div className="bg-primary/5 p-6 rounded-lg">
            <p className="font-medium mb-2">
              Sie haben Fragen oder möchten ein größeres Paket über 20.000 Minuten?
            </p>
            <p className="text-muted-foreground">
              Kontaktieren Sie uns – wir erstellen Ihnen gerne ein individuelles Angebot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}