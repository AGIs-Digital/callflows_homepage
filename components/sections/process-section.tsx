"use client";

import { useEffect, useRef } from "react";
import { Handshake, ProjectorIcon, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: 1,
    icon: Handshake,
    title: "Kontaktaufnahme",
    description: "Vereinbaren Sie ein unverbindliches Erstgespräch"
  },
  {
    number: 2,
    icon: ProjectorIcon,
    title: "Workshop",
    description: "Gemeinsame Bedarfsanalyse und Lösungsentwicklung"
  },
  {
    number: 3,
    icon: Headphones,
    title: "Support",
    description: "Kontinuierliche Betreuung und technischer Support"
  }
];

export function ProcessSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary dark:text-white">
          So einfach geht's
        </h2>

        <div
          ref={timelineRef}
          className="relative grid md:grid-cols-3 gap-8 md:gap-12"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2 md:translate-x-0 hidden md:block" />

          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "timeline-item opacity-0 transition-all duration-700 ease-out",
                "relative p-6 rounded-lg border bg-card hover:shadow-lg",
                "transform hover:-translate-y-1 transition-transform"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-0 top-8 w-12 h-12 -translate-x-1/2 hidden md:block">
                <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}