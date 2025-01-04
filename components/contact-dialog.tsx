"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ContactForm } from "@/components/contact-form";

export function ContactDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="bg-white hover:bg-white/90 text-gray-900 px-8 py-4 rounded-lg font-medium">
          Kontakt aufnehmen
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary dark:text-white">
            Kontaktieren Sie uns
          </DialogTitle>
        </DialogHeader>
        <ContactForm isOpen={isOpen} onOpenChange={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}