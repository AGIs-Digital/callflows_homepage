"use client";

import { PricingCard } from "@/components/pricing/plan-card";
import { monthlyPlans } from "@/lib/data/pricing-plans";
import { Info, CheckCircle, Shield, Clock, Users, Star } from "lucide-react";

export function PricingTables() {
  return (
    <div className="mb-16">
      {/* Monthly Plans */}
      <div className="mb-20">
        <div className="text-center mb-16">
          {/* Neuer Infotext zur Preisstruktur */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-muted/50 p-12 rounded-xl border">
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Bei <strong className="text-primary">callflows</strong> zahlen Sie während der Laufzeit nur für die <strong>tatsächliche Gesprächszeit</strong> Ihres KI Voice Agents – <strong>ohne versteckte Kosten, ohne Grundgebühren</strong>.
              </p>
              
              <div className="bg-card p-10 rounded-lg border mb-12">
                <h4 className="text-xl font-semibold mb-8 flex items-center gap-3">
                  <Star className="h-6 w-6 text-[#FFB703]" />
                  Was Sie für den Start bekommen
                </h4>
                <p className="text-lg text-muted-foreground mb-8 text-left leading-relaxed">
                  Für den Start fällt eine <strong>einmalige Einrichtungsgebühr</strong> an, deren Höhe sich nach dem individuellen Aufwand richtet. Darin enthalten ist:
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg mb-2">Kompletter Onboarding-Prozess</p>
                      <p className="text-muted-foreground">für Ihre Mitarbeiter</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg mb-2">Wöchentliche Abstimmungs-Calls</p>
                      <p className="text-muted-foreground">während der gesamten Entwicklung</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg mb-2">Technisches Monitoring</p>
                      <p className="text-muted-foreground">während des gesamten Piloten</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg mb-2">Kontinuierliche Optimierung</p>
                      <p className="text-muted-foreground">Ihres KI Voice Agents</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg mb-2">Großzügiges Freiminuten-Kontingent</p>
                      <p className="text-muted-foreground">für den kompletten Pilotmonat</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg mb-2">Maßgeschneidertes CRM-System</p>
                      <p className="text-muted-foreground">speziell für KI-Arbeit und Verwaltung</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-10 mb-12">
                <div className="bg-card p-8 rounded-lg border text-center">
                  <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h5 className="font-semibold text-lg mb-4">1 Monat Pilotphase</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    Einrichtungsgebühr: <strong>50% vor Prototyp</strong>, <strong>50% zum Go-Live</strong>
                  </p>
                </div>
                
                <div className="bg-card p-8 rounded-lg border text-center">
                  <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h5 className="font-semibold text-lg mb-4">Risikofrei testen</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Sie entscheiden</strong> nach dem Pilot, ob Sie dauerhaft durchstarten möchten
            </p>
          </div>
          
                <div className="bg-card p-8 rounded-lg border text-center">
                  <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h5 className="font-semibold text-lg mb-4">Flexible Laufzeit</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Monatlich zahlbar</strong> mit 12 Monaten Laufzeit nach dem Pilot
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 p-8 rounded-lg border border-primary/20">
                <p className="text-center text-muted-foreground font-medium text-lg leading-relaxed">
                  <strong className="text-primary">So starten Sie risikofrei</strong> – mit voller Kontrolle, transparenter Preisstruktur und einem Voice Agent, der exakt zu Ihrem Unternehmen passt.
                </p>
              </div>
            </div>
          </div>
          
          <h3 className="text-4xl text-primary dark:text-white font-bold mb-6">Unsere Monatspakete</h3>
          <p className="text-lg text-muted-foreground mb-12">Alle Preise zzgl. gesetzlicher MwSt.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {monthlyPlans.map((plan) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
            />
          ))}
        </div>
      </div>

      {/* Zusätzliche Minutenpakete Erklärung */}
      <div className="max-w-5xl mx-auto bg-muted p-10 rounded-lg mt-20">
        <div className="flex items-start gap-6">
          <div className="bg-primary rounded-full p-3 flex-shrink-0">
            <Info className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">Zusätzliche Minutenpakete nach Bedarf</h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Neben Ihrem monatlichen Kontingent können Sie jederzeit flexible Minutenpakete hinzubuchen.
            </p>
            
            <div className="space-y-6">
              <div className="bg-card p-8 rounded-md border">
                <h4 className="font-semibold text-lg mb-3">Flexible Erweiterung</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Kaufen Sie zusätzliche Minutenpakete individuell nach Ihrem Bedarf. Wir beraten Sie gerne und empfehlen passende Pakete basierend auf Ihrer Nutzung.
                </p>
              </div>
              
              <div className="bg-card p-8 rounded-md border">
                <h4 className="font-semibold text-lg mb-3">Keine verfallenden Minuten</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Gekaufte Minutenpakete verfallen nicht und dienen als Reserve. Sie werden erst angebrochen, wenn Ihr monatliches Kontingent aufgebraucht ist.
                </p>
              </div>
              
              <div className="bg-card p-8 rounded-md border">
                <h4 className="font-semibold text-lg mb-3">Aktives Monitoring</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Wir überwachen Ihren Verbrauch und empfehlen proaktiv passende Pakete, damit Sie immer die optimale Lösung für Ihre Bedürfnisse haben.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}