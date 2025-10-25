"use client";

import { Check, X, Clock, Users, Phone, Headphones, Bot, Star, AlertTriangle } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import Image from "next/image";

type SolutionProps = {
  title: React.ReactNode;
  icon: React.ReactNode;
  description: string;
  pros: string[];
  cons: string[];
  isHighlighted?: boolean;
};

const Solution = ({ title, icon, description, pros, cons, isHighlighted = false }: SolutionProps) => {
  const { t } = useI18n();
  
  return (
    <div 
      className={cn(
        "group relative rounded-2xl border transition-all duration-300 ease-out backdrop-blur-sm",
        isHighlighted 
          ? "bg-gradient-to-br from-card via-card/95 to-primary/5 shadow-2xl ring-2 ring-accent/40 border-accent/30 p-10 hover:shadow-3xl hover:-translate-y-3 hover:ring-accent/60 scale-105" 
          : "bg-card/60 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 border-border/50 p-8"
      )}
    >
      {isHighlighted && (
        <>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg animate-pulse">
            ✨ {t('comparison.modernSolution')}
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl pointer-events-none"></div>
        </>
      )}
      <div className="flex items-center gap-4 mb-6">
        <div className={cn(
          "p-3 rounded-2xl transition-all duration-300 group-hover:scale-110",
          isHighlighted ? "bg-primary text-white shadow-lg" : "bg-muted/60 group-hover:bg-primary/10"
        )}>
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="space-y-4">
        {cons.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">
              {isHighlighted ? t('comparison.challenges') : t('comparison.cons')}
            </h4>
            <ul className="space-y-2">
              {cons.map((con, index) => (
                <li key={`con-${index}`} className="flex items-start gap-2">
                  {isHighlighted ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <span className="text-sm">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div>
          <h4 className="font-medium mb-2">
            {isHighlighted ? t('comparison.weTakeCare') : t('comparison.pros')}
          </h4>
          <ul className="space-y-2">
            {pros.map((pro, index) => (
              <li key={`pro-${index}`} className="flex items-start gap-3">
                {isHighlighted ? (
                  <div className="bg-accent/20 rounded-full p-1 shrink-0 mt-0.5">
                    <Star className="w-4 h-4 text-accent fill-accent drop-shadow-sm" />
                  </div>
                ) : (
                  <Check className="w-5 h-5 shrink-0 mt-0.5 text-green-500" />
                )}
                <span className={cn(
                  "text-sm",
                  isHighlighted ? "font-medium text-foreground" : ""
                )}>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export function PricingComparisonSection() {
  const { t, locale } = useI18n();
  
  const getSolutionData = (type: string) => {
    const solutions = {
      de: {
        inhouse: {
          title: "Inhouse-Mitarbeiter",
          description: "Eigene Mitarbeiter übernehmen die Telefonie im Unternehmen.",
          pros: ["Persönlicher Kontakt", "Direkte Kontrolle", "Tiefes Produktwissen"],
          cons: ["Hohe Personalkosten", "Begrenzte Verfügbarkeit", "Krankheits-/Urlaubsvertretung nötig", "Skalierungsprobleme bei Spitzen"]
        },
        phone: {
          title: "Telefonanlage",
          description: "Klassische Telefonanlagen mit Menüführung und Warteschleifen.",
          pros: ["Geringe laufende Kosten", "24/7 Verfügbarkeit", "Einfache Implementierung"],
          cons: ["Keine echte Interaktion", "Frustrierende Benutzererfahrung", "Keine Problemlösung", "Verpasste Verkaufschancen"]
        },
        callcenter: {
          title: "Externes Callcenter",
          description: "Ausgelagerte Telefonie an spezialisierte Dienstleister.",
          pros: ["Flexibel skalierbar", "Erweiterte Verfügbarkeit", "Keine Personalverantwortung"],
          cons: ["Hohe Kosten pro Gespräch", "Qualitätsschwankungen", "Geringeres Produktwissen", "Komplexe Vertragsgestaltung"]
        },
        callflows: {
          title: "KI‑Voice‑Agents",
          description: "Vereinen alle Vorteile ohne das die persönliche Note verloren geht.",
          pros: [
            "Orchestration aller Komponenten",
            "Fachexpertise - KI und Automation",
            "Pay-as-you-go ohne Vertragslaufzeit",
            "Umsetzung von Prozesslogik",
            "Individuelle Schnittstellen"
          ],
          cons: [
            "Kosten und technische Strukturen erfordern tiefes Verständnis"
          ]
        }
      },
      en: {
        inhouse: {
          title: "In-house Staff",
          description: "Own employees handle telephony within the company.",
          pros: ["Personal contact", "Direct control", "Deep product knowledge"],
          cons: ["High personnel costs", "Limited availability", "Sick/vacation coverage needed", "Scaling problems during peaks"]
        },
        phone: {
          title: "Phone System",
          description: "Classic phone systems with menu navigation and hold queues.",
          pros: ["Low running costs", "24/7 availability", "Simple implementation"],
          cons: ["No real interaction", "Frustrating user experience", "No problem solving", "Missed sales opportunities"]
        },
        callcenter: {
          title: "External Call Center",
          description: "Outsourced telephony to specialized service providers.",
          pros: ["Flexibly scalable", "Extended availability", "No personnel responsibility"],
          cons: ["High costs per call", "Quality fluctuations", "Less product knowledge", "Complex contract design"]
        },
        callflows: {
          title: "AI Voice Agents",
          description: "Combine all advantages without losing the personal touch.",
          pros: [
            "Orchestration of all components",
            "Expertise - AI and automation",
            "Pay-as-you-go without contract terms",
            "Implementation of process logic",
            "Individual interfaces"
          ],
          cons: [
            "Costs and technical structures require deep understanding"
          ]
        }
      },
      fr: {
        inhouse: {
          title: "Personnel interne",
          description: "Les propres employés gèrent la téléphonie dans l'entreprise.",
          pros: ["Contact personnel", "Contrôle direct", "Connaissance produit approfondie"],
          cons: ["Coûts de personnel élevés", "Disponibilité limitée", "Remplacement maladie/vacances nécessaire", "Problèmes d'échelle lors des pics"]
        },
        phone: {
          title: "Système téléphonique",
          description: "Systèmes téléphoniques classiques avec navigation menu et files d'attente.",
          pros: ["Faibles coûts de fonctionnement", "Disponibilité 24/7", "Implémentation simple"],
          cons: ["Pas d'interaction réelle", "Expérience utilisateur frustrante", "Pas de résolution de problème", "Opportunités de vente manquées"]
        },
        callcenter: {
          title: "Centre d'appels externe",
          description: "Téléphonie externalisée vers des prestataires spécialisés.",
          pros: ["Évolutivité flexible", "Disponibilité étendue", "Pas de responsabilité personnel"],
          cons: ["Coûts élevés par appel", "Fluctuations de qualité", "Moins de connaissance produit", "Conception contractuelle complexe"]
        },
        callflows: {
          title: "Agents Vocaux IA",
          description: "Combinent tous les avantages sans perdre le contact personnel.",
          pros: [
            "Orchestration de tous les composants",
            "Expertise - IA et automatisation",
            "Paiement à l'usage sans durée contractuelle",
            "Implémentation de la logique de processus",
            "Interfaces individuelles"
          ],
          cons: [
            "Les coûts et structures techniques nécessitent une compréhension approfondie"
          ]
        }
      },
      es: {
        inhouse: {
          title: "Personal interno",
          description: "Los propios empleados manejan la telefonía dentro de la empresa.",
          pros: ["Contacto personal", "Control directo", "Conocimiento profundo del producto"],
          cons: ["Altos costos de personal", "Disponibilidad limitada", "Cobertura por enfermedad/vacaciones necesaria", "Problemas de escalabilidad en picos"]
        },
        phone: {
          title: "Sistema telefónico",
          description: "Sistemas telefónicos clásicos con navegación de menú y colas de espera.",
          pros: ["Bajos costos operativos", "Disponibilidad 24/7", "Implementación simple"],
          cons: ["Sin interacción real", "Experiencia de usuario frustrante", "Sin resolución de problemas", "Oportunidades de venta perdidas"]
        },
        callcenter: {
          title: "Centro de llamadas externo",
          description: "Telefonía subcontratada a proveedores de servicios especializados.",
          pros: ["Escalabilidad flexible", "Disponibilidad extendida", "Sin responsabilidad de personal"],
          cons: ["Altos costos por llamada", "Fluctuaciones de calidad", "Menor conocimiento del producto", "Diseño contractual complejo"]
        },
        callflows: {
          title: "Agentes de Voz IA",
          description: "Combinan todas las ventajas sin perder el toque personal.",
          pros: [
            "Orquestación de todos los componentes",
            "Experticia - IA y automatización",
            "Pago por uso sin plazos contractuales",
            "Implementación de lógica de procesos",
            "Interfaces individuales"
          ],
          cons: [
            "Los costos y estructuras técnicas requieren comprensión profunda"
          ]
        }
      }
    };
    
    return solutions[locale]?.[type as keyof typeof solutions['de']] || solutions.de[type as keyof typeof solutions['de']];
  };
  
  return (
    <section className="py-24 bg-gradient-to-b from-tertiary/25 via-tertiary/15 to-secondary/15">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary dark:text-white mb-6">
            {t('comparison.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('comparison.description')} <strong className="text-primary"> {t('comparison.callflowsText')}</strong>
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Traditionelle Lösungen mit gedämpftem Design */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Solution 
              title={getSolutionData('phone').title}
              icon={<Phone className="w-6 h-6" />}
              description={getSolutionData('phone').description}
              pros={getSolutionData('phone').pros}
              cons={getSolutionData('phone').cons}
            />
            
            <Solution 
              title={getSolutionData('callcenter').title}
              icon={<Headphones className="w-6 h-6" />}
              description={getSolutionData('callcenter').description}
              pros={getSolutionData('callcenter').pros}
              cons={getSolutionData('callcenter').cons}
            />
          </div>
          
          {/* KI-Lösung prominenter platziert */}
          <div className="lg:col-span-1">
            <Solution 
              title={<span className='text-accent font-bold text-xl'>{getSolutionData('callflows').title}</span>}
              icon={
                <div className="w-10 h-10 rounded-2xl p-1.5 shadow-lg" style={{ backgroundColor: '#fffff0' }}>
                  <Image 
                    src="/images/callflows_icon.webp" 
                    alt="callflows logo" 
                    width={28} 
                    height={28}
                    className="w-full h-full object-contain"
                  />
                </div>
              }
              description={getSolutionData('callflows').description}
              pros={getSolutionData('callflows').pros}
              cons={getSolutionData('callflows').cons}
              isHighlighted={true}
            />
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('comparison.conclusion')}
          </p>
          
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary font-medium px-4 py-2 rounded-full">
            <Clock className="w-5 h-5" />
            <span>{t('comparison.benefit')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}