"use client";

import React, { useRef } from "react";
import { Puzzle, Layers, Wrench, Lightbulb, FileText, MessageCircle, Database, User, Phone } from "lucide-react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Circle = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-white dark:bg-gray-800 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:text-primary",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

// OpenAI Logo als Komponente
const OpenAILogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="text-foreground dark:text-primary"
  >
    <path
      d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
      fill="currentColor"
    />
  </svg>
);

export function IntegrationChallengesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-section-light-blue dark:bg-[#F5F0FF]/5">
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Linke Spalte - Text und Herausforderungen */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-primary dark:text-white">
              KI-Integration ohne Komplexität
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Die aktuelle KI-Landschaft stellt Unternehmen vor erhebliche Herausforderungen. 
              Viele Lösungen erfordern die Verknüpfung zahlreicher Einzelkomponenten:
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
                  <Layers className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Technische Komplexität</h3>
                  <p className="text-sm text-muted-foreground">
                    Verschiedene Tools für Telefonie, Spracherkennung, KI-Steuerung und Datenintegration
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20">
                  <Wrench className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Aufwändige Konfiguration</h3>
                  <p className="text-sm text-muted-foreground">
                    Komplizierte Einrichtung und ständige Anpassungen an sich ändernde APIs
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <Puzzle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Hoher Ressourcenaufwand</h3>
                  <p className="text-sm text-muted-foreground">
                    Dedizierte Vollzeitkräfte für Entwicklung, Wartung und Optimierung nötig
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-6 mt-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Lightbulb className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Unsere Lösung</h3>
                  <p className="text-muted-foreground">
                    <strong className="text-primary">callflows</strong> übernimmt die gesamte Komplexität für Sie. 
                    Wir integrieren alle notwendigen Komponenten zu einer schlüsselfertigen Lösung – 
                    ohne dass Sie KI-Expertise oder zusätzliche Vollzeitkräfte benötigen.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Rechte Spalte - AnimatedBeam Komponente */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-4 border border-border">
            <div
              className="relative flex h-[400px] w-full items-center justify-center overflow-hidden"
              ref={containerRef}
            >
              <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
                <div className="flex flex-col justify-center gap-6">
                  <Circle ref={div1Ref}>
                    <FileText size={20} className="dark:text-primary" />
                  </Circle>
                  <Circle ref={div2Ref}>
                    <Database size={20} className="dark:text-primary" />
                  </Circle>
                  <Circle ref={div3Ref}>
                    <MessageCircle size={20} className="dark:text-primary" />
                  </Circle>
                  <Circle ref={div4Ref}>
                    <Phone size={20} className="dark:text-primary" />
                  </Circle>
                  <Circle ref={div5Ref}>
                    <OpenAILogo />
                  </Circle>
                </div>
                <div className="flex flex-col justify-center">
                  <Circle ref={div6Ref} className="size-16 bg-primary/10">
                    <div className="rounded-full overflow-hidden w-10 h-10">
                      <Image 
                        src="/icon.png" 
                        alt="callflows" 
                        width={96} 
                        height={96} 
                      />
                    </div>
                  </Circle>
                </div>
                <div className="flex flex-col justify-center">
                  <Circle ref={div7Ref}>
                    <User size={20} className="dark:text-primary" />
                  </Circle>
                </div>
              </div>

              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div6Ref}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div6Ref}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div6Ref}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div4Ref}
                toRef={div6Ref}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div6Ref}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div7Ref}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 