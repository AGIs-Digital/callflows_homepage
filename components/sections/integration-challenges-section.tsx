"use client";

import React, { useRef } from "react";
import { Puzzle, Layers, Wrench, Lightbulb, FileText, MessageCircle, Database, User, Phone } from "lucide-react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

const Circle = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border dark:border-accent/70 bg-white dark:bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:shadow-[0_0_20px_-12px_rgba(255,255,255,0.1)]",
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
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-secondary via-secondary/50 to-secondary/30">
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Linke Spalte - Text und Herausforderungen */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-primary">
              {t('integrationChallenges.title')}
            </h2>
            
            <p className="text-lg text-black">
              {t('integrationChallenges.description')}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-100 ">
                  <Layers className="w-5 h-5 text-red-600 " />
                </div>
                <div>
                  <h3 className="text-tertiary font-bold">{t('integrationChallenges.challenge1.title')}</h3>
                  <p className="text-sm text-black">
                    {t('integrationChallenges.challenge1.description')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100 ">
                  <Wrench className="w-5 h-5 text-amber-600 " />
                </div>
                <div>
                  <h3 className="text-tertiary font-bold">{t('integrationChallenges.challenge2.title')}</h3>
                  <p className="text-sm text-black">
                    {t('integrationChallenges.challenge2.description')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Puzzle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-tertiary font-bold">{t('integrationChallenges.challenge3.title')}</h3>
                  <p className="text-sm text-black">
                    {t('integrationChallenges.challenge3.description')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-black pt-6 mt-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Lightbulb className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-3xl text-accent font-bold mb-2 underline decoration-black">{t('integrationChallenges.solutionTitle')}</h2>
                  <p className="text-lg text-black">
                    <strong className="text-primary">callflows</strong> {t('integrationChallenges.solutionDescription').replace('callflows', '')}
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
                  <Circle ref={div6Ref} className="size-16 bg-primary/10 dark:bg-primary/20 p-2">
                    <div className="rounded-full overflow-hidden w-12 h-12">
                      <Image 
                        src="/icon.png" 
                        alt="callflows" 
                        width={96} 
                        height={96}
                        className="w-full h-full object-cover"
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
                pathColor="hsl(var(--muted-foreground))"
                pathOpacity={0.6}
                gradientStartColor="hsl(var(--primary))"
                gradientStopColor="hsl(var(--accent))"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div6Ref}
                pathColor="hsl(var(--muted-foreground))"
                pathOpacity={0.6}
                gradientStartColor="hsl(var(--primary))"
                gradientStopColor="hsl(var(--accent))"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div6Ref}
                pathColor="hsl(var(--muted-foreground))"
                pathOpacity={0.6}
                gradientStartColor="hsl(var(--primary))"
                gradientStopColor="hsl(var(--accent))"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div4Ref}
                toRef={div6Ref}
                pathColor="hsl(var(--muted-foreground))"
                pathOpacity={0.6}
                gradientStartColor="hsl(var(--primary))"
                gradientStopColor="hsl(var(--accent))"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div6Ref}
                pathColor="hsl(var(--muted-foreground))"
                pathOpacity={0.6}
                gradientStartColor="hsl(var(--primary))"
                gradientStopColor="hsl(var(--accent))"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div7Ref}
                pathColor="hsl(var(--muted-foreground))"
                pathOpacity={0.6}
                gradientStartColor="hsl(var(--primary))"
                gradientStopColor="hsl(var(--accent))"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 