"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ContactDialog } from "@/components/contact-dialog";

export function CTASection() {
  return (
    <section className="bg-primary py-24">
      <div className="container text-center">
        <h2 className="text-[56px] font-bold text-white mb-6">
          Bereit für die Zukunft der Kommunikation?
        </h2>
        <p className="text-xl text-white/90 mb-12">
          Starten Sie noch heute mit Callflows und revolutionieren Sie Ihre Outbound-Kommunikation
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-accent hover:bg-accent/90 text-gray-900 px-8 py-4 rounded-lg font-medium">
            Jetzt starten
          </button>
          <ContactDialog />
        </div>
      </div>
    </section>
  );
}