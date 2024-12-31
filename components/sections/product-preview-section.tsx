"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "KI Voice Agent Dashboard",
    description: "Übersichtliches Dashboard für alle Ihre Kampagnen und Analysen",
    image: "/images/dashboard-preview.png",
    hotspots: [
      { x: 20, y: 30, label: "Echtzeit-Statistiken" },
      { x: 70, y: 60, label: "Performance-Tracking" }
    ]
  },
  {
    title: "Kampagnen-Management",
    description: "Erstellen und verwalten Sie Ihre Outbound-Kampagnen",
    image: "/images/campaign-preview.png",
    hotspots: [
      { x: 30, y: 40, label: "Kampagnen-Editor" },
      { x: 80, y: 20, label: "Zielgruppen-Definition" }
    ]
  },
  {
    title: "Analytics & Reporting",
    description: "Detaillierte Einblicke in Ihre Calls",
    image: "/images/call-details.png",
    hotspots: [
      { x: 25, y: 50, label: "Conversion-Tracking" },
      { x: 75, y: 30, label: "ROI-Analyse" }
    ]
  },
  {
    title: "Voice Agent Training",
    description: "Trainieren Sie Ihre KI-Agenten für optimale Ergebnisse",
    image: "/images/call-history.png",
    hotspots: [
      { x: 40, y: 20, label: "Gesprächsvorlagen" },
      { x: 60, y: 70, label: "KI-Training" }
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