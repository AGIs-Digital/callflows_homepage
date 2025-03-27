"use client";

import { Check, X, Clock, Users, Phone, Headphones, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

type SolutionProps = {
  title: React.ReactNode;
  icon: React.ReactNode;
  description: string;
  pros: string[];
  cons: string[];
  isHighlighted?: boolean;
};

const Solution = ({ title, icon, description, pros, cons, isHighlighted = false }: SolutionProps) => {
  return (
    <div 
      className={cn(
        "relative rounded-xl border border-border p-6 transition-all",
        isHighlighted 
          ? "bg-gradient-to-br from-primary/5 to-accent/5 shadow-lg" 
          : "bg-card hover:shadow-md"
      )}
    >
      {isHighlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
          Moderne KI Lösung
        </div>
      )}
      <div className="flex items-center gap-4 mb-4">
        <div className={cn(
          "p-3 rounded-full",
          isHighlighted ? "bg-primary text-white" : "bg-muted"
        )}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Vorteile</h4>
          <ul className="space-y-2">
            {pros.map((pro, index) => (
              <li key={`pro-${index}`} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {cons.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Nachteile</h4>
            <ul className="space-y-2">
              {cons.map((con, index) => (
                <li key={`con-${index}`} className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export function PricingComparisonSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary dark:text-white mb-6">
            Kommunikationslösungen im Vergleich
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Die geschäftliche Telefonkommunikation wird heutzutage meist auf drei Arten abgewickelt.
            <strong className="text-primary"> callflows</strong> bietet eine vierte, innovative Option.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Solution 
            title="Inhouse-Mitarbeiter" 
            icon={<Users className="w-5 h-5" />}
            description="Eigene Mitarbeiter übernehmen die Telefonie im Unternehmen."
            pros={[
              "Persönlicher Kontakt",
              "Direkte Kontrolle",
              "Tiefes Produktwissen"
            ]}
            cons={[
              "Hohe Personalkosten",
              "Begrenzte Verfügbarkeit",
              "Krankheits-/Urlaubsvertretung nötig",
              "Skalierungsprobleme bei Spitzen"
            ]}
          />
          
          <Solution 
            title="Telefonanlage" 
            icon={<Phone className="w-5 h-5" />}
            description="Klassische Telefonanlagen mit Menüführung und Warteschleifen."
            pros={[
              "Geringe laufende Kosten",
              "24/7 Verfügbarkeit",
              "Einfache Implementierung"
            ]}
            cons={[
              "Keine echte Interaktion",
              "Frustrierende Benutzererfahrung",
              "Keine Problemlösung",
              "Verpasste Verkaufschancen"
            ]}
          />
          
          <Solution 
            title="Externes Callcenter" 
            icon={<Headphones className="w-5 h-5" />}
            description="Ausgelagerte Telefonie an spezialisierte Dienstleister."
            pros={[
              "Flexibel skalierbar",
              "Erweiterte Verfügbarkeit",
              "Keine Personalverantwortung"
            ]}
            cons={[
              "Hohe Kosten pro Gespräch",
              "Qualitätsschwankungen",
              "Geringeres Produktwissen",
              "Komplexe Vertragsgestaltung"
            ]}
          />
          
          <Solution 
            title={<strong className='text-primary'>callflows</strong>} 
            icon={<Bot className="w-5 h-5" />}
            description="KI-basierte Sprachagenten für automatisierte Telefonie."
            pros={[
              "Eigenständig denken und handeln",
              "Natürliche Gesprächsführung",
              "Automation von Routineaufgaben",
              "Nahtlose Systemintegration",
              "Kostengünstig und unkompliziert",
              "24/7 Verfügbarkeit",
              "Kein Vorwissen notwendig"
            ]}
            cons={[]}
            isHighlighted={true}
          />
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Viele Unternehmen wünschen sich mehr Automatisierung, geringere Personalkosten und eine gleichbleibend hohe Servicequalität – rund um die Uhr. Genau hier setzt unser KI Voice Agent an: Als innovative Option, die moderne KI-Technologie nutzt, um Telefonprozesse effizient und kostengünstig abzubilden.
          </p>
          
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary font-medium px-4 py-2 rounded-full">
            <Clock className="w-5 h-5" />
            <span>Zufriedene Kunden, verbesserte Umsatzchancen</span>
          </div>
        </div>
      </div>
    </section>
  );
}