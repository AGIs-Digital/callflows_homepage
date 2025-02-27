"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Agent Dashboard",
    description: "Sehen Sie Ihre Agents und Agent-Teams in einem übersichtlichen Dashboard zur Analyse Ihrer calls",
    image: "/images/dashboard.png",
    hotspots: [
      { x: 20, y: 30, label: "Echtzeit-Statistiken" },
      { x: 70, y: 60, label: "Performance-Tracking" }
    ]
  },
  {
    title: "Realtime Bookings",
    description: "Ihre Voice Agents buchen live Termine direkt in Ihren Kalender - vollautomatisch und in Echtzeit",
    image: "/images/booking.png",
    hotspots: [
      { x: 30, y: 40, label: "Kalender-Integration" },
      { x: 70, y: 20, label: "Echtzeit-Buchungen" }
    ]
  },
  {
    title: "Analytics & Reporting",
    description: "Optionale Transcripts und Recordings für detaillierte Einblicke Ihrer calls für stetige Verbesserungen",
    image: "/images/calldetails.png",
    hotspots: [
      { x: 30, y: 50, label: "Conversion-Tracking" },
      { x: 75, y: 30, label: "Transcripts" }
    ]
  },
  {
    title: "Informationen extrahieren",
    description: "Extrahiert gezielte Informationen aus Ihren calls und verwendet diese für automatisierte Aufgaben",
    image: "/images/question_extractor.png",
    hotspots: [
      { x: 40, y: 20, label: "Informationen extrahieren" },
      { x: 60, y: 70, label: "Automationen erstellen" }
    ]
  }
];

export function ProductPreviewSection() {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  return (
    <section className="py-24 bg-background">
      <div className="container max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary dark:text-white">
          Einblicke in callflows
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
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
            <DialogTitle className="text-2xl font-bold mb-4">
              {selectedFeature?.title}
            </DialogTitle>
            {selectedFeature && (
              <div>
                <div className="aspect-video relative mb-4">
                  <Image
                    src={selectedFeature.image}
                    alt={selectedFeature.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    quality={90}
                  />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedFeature.description}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
