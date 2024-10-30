"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ContactForm } from "@/components/contact-form";

export function ContactDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-base font-medium text-foreground hover:text-foreground/80">
          Kontakt
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary dark:text-white">
            Kontaktieren Sie uns
          </DialogTitle>
        </DialogHeader>
        <ContactForm />
      </DialogContent>
    </Dialog>
  );
}