"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          console.log("Booking successful:", e.detail);
        },
      });
    })();
  }, []);

  return (
    <section className="bg-primary py-24">
      <div className="container text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Bereit für die Zukunft der Kommunikation?
        </h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Starten Sie noch heute mit <strong className="text-[#FFB703]">callflows</strong> und revolutionieren Sie Ihre 
          Kommunikation. Unser Team steht Ihnen bei allen Fragen zur Seite.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-accent text-gray-900 px-8 py-4 rounded-lg font-medium
                     flex items-center hover:bg-accent/90 transition-colors group"
            data-cal-link="callflows/55min"
            data-cal-config='{"layout":"popup"}'
          >
            Beratungstermin buchen
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}