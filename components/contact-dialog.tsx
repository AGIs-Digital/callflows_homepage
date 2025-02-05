"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ContactForm } from "@/components/contact-form";

export function ContactDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="nav-link">
          Kontakt
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary dark:text-white">
            Kontakt aufnehmen
          </DialogTitle>
        </DialogHeader>
        <ContactForm isOpen={isOpen} onOpenChange={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}