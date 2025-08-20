"use client";

import { Check, X, Clock, Users, Phone, Headphones, Bot } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

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
        "group relative rounded-2xl border border-border/50 p-8 transition-all duration-300 ease-out backdrop-blur-sm",
        isHighlighted 
          ? "bg-card/80 shadow-xl ring-2 ring-primary/30 hover:shadow-2xl hover:-translate-y-2" 
          : "bg-card/60 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20"
      )}
    >
      {isHighlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
          {t('comparison.modernSolution')}
        </div>
      )}
      <div className="flex items-center gap-4 mb-6">
        <div className={cn(
          "p-4 rounded-2xl transition-all duration-300 group-hover:scale-110",
          isHighlighted ? "bg-primary text-white shadow-lg" : "bg-muted/60 group-hover:bg-primary/10"
        )}>
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">{t('comparison.pros')}</h4>
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
            <h4 className="font-medium mb-2">{t('comparison.cons')}</h4>
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
          title: "KI‑callflows",
          description: "KI‑callflows orchestrieren Stimme, Prozesslogik, Daten und Aktionen – Ende‑zu‑Ende automatisierte Telefonprozesse.",
          pros: [
            "Orchestriert Stimme, Logik & Daten",
            "Natürliche Dialoge, Rückfragen, Validierung",
            "Automatisiert Routine & triggert Aktionen",
            "Nahtlose System‑Integrationen (CRM/ERP/Helpdesk)",
            "Skalierbar und kosteneffizient",
            "Kein Vorwissen notwendig"
          ],
          cons: []
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
          title: "AI callflows",
          description: "AI callflows orchestrate voice, process logic, data and actions – end‑to‑end automated phone processes.",
          pros: [
            "Orchestrates voice, logic & data",
            "Natural dialogues, follow‑ups, validation",
            "Automates routine and triggers actions",
            "Seamless integrations (CRM/ERP/Helpdesk)",
            "Scalable and cost‑efficient",
            "No prior expertise required"
          ],
          cons: []
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
          title: "AI callflows",
          description: "Les AI callflows orchestrent la voix, la logique de processus, les données et les actions – processus téléphoniques automatisés de bout en bout.",
          pros: [
            "Orchestre voix, logique & données",
            "Dialogues naturels, relances, validation",
            "Automatise la routine & déclenche des actions",
            "Intégrations transparentes (CRM/ERP/Helpdesk)",
            "Évolutif et rentable",
            "Aucune expertise préalable requise"
          ],
          cons: []
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
          title: "AI callflows",
          description: "Los AI callflows orquestan voz, lógica de procesos, datos y acciones – procesos telefónicos automatizados de extremo a extremo.",
          pros: [
            "Orquesta voz, lógica y datos",
            "Diálogos naturales, repreguntas, validación",
            "Automatiza rutina y dispara acciones",
            "Integraciones transparentes (CRM/ERP/Helpdesk)",
            "Escalable y eficiente en costos",
            "Sin experiencia previa requerida"
          ],
          cons: []
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
          
          <Solution 
            title={<strong className='text-primary'>{getSolutionData('callflows').title}</strong>}
            icon={<Bot className="w-6 h-6" />}
            description={getSolutionData('callflows').description}
            pros={getSolutionData('callflows').pros}
            cons={getSolutionData('callflows').cons}
            isHighlighted={true}
          />
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