"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Agent Dashboard",
    description: "Sehen Sie Ihre Agents und Agent-Teams in einem Übersichtliches Dashboard zur Analyse Ihrer calls",
    image: "/images/dashboard-preview.png",
    hotspots: [
      { x: 20, y: 30, label: "Echtzeit-Statistiken" },
      { x: 70, y: 60, label: "Performance-Tracking" }
    ]
  },
  {
    title: "Kampagnen-Management",
    description: "Erstellen und verwalten Sie Ihre Outbound-Kampagnen mit Zeitplanung und Zielgruppen",
    image: "/images/campaign-preview.png",
    hotspots: [
      { x: 30, y: 40, label: "Kampagnen-Editor" },
      { x: 70, y: 20, label: "Zielgruppen" }
    ]
  },
  {
    title: "Analytics & Reporting",
    description: "Optionale Transcripts und Recordings für detaillierte Einblicke Ihrer calls für stetige Verbesserungen",
    image: "/images/call-details.png",
    hotspots: [
      { x: 30, y: 50, label: "Transcripts" },
      { x: 75, y: 30, label: "Conversion-Tracking" }
    ]
  },
  {
    title: "Informationen extrahieren",
    description: "Extrahiert gezielte Informationen aus Ihren calls und verwendet diese für automatisierte Aufgaben",
    image: "/images/call-infos.png",
    hotspots: [
      { x: 40, y: 20, label: "Informationen extrahieren" },
      { x: 60, y: 70, label: "Gesprächsvorlagen" }
    ]
  }
];

export function ProductPreviewSection() {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary dark:text-white">
          Einblicke in Callflows
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "group relative rounded-xl overflow-hidden cursor-pointer",
                "transform transition-all duration-300",
                "hover:shadow-xl hover:-translate-y-1"
              )}
              onClick={() => setSelectedFeature(feature)}
            >
              <div className="aspect-video relative">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                {/* Hotspots */}
                {feature.hotspots.map((hotspot, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-accent rounded-full"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  >
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                      {hotspot.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-background">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
          <DialogContent className="max-w-4xl">
            {selectedFeature && (
              <div>
                <div className="aspect-video relative mb-4">
                  <Image
                    src={selectedFeature.image}
                    alt={selectedFeature.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{selectedFeature.title}</h3>
                <p className="text-muted-foreground">{selectedFeature.description}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}