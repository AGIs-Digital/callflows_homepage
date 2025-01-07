"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";

interface ContactFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  source?: 'inbound' | 'outbound' | 'enterprise' | 'contact';
  prefilledMessage?: string;
}

export function ContactForm({ 
  isOpen, 
  onOpenChange, 
  source = "contact",
  prefilledMessage = "" 
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: prefilledMessage,
      source: source || 'contact'
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Beim Senden ist ein Fehler aufgetreten');
      }

      setSuccess(true);
      form.reset();
      toast({
        title: "Nachricht gesendet",
        description: "Wir haben Ihre Nachricht erhalten und werden uns zeitnah bei Ihnen melden.",
        duration: 5000,
      });
      
      if (onOpenChange) {
        setTimeout(() => onOpenChange(false), 2000);
      }
    } catch (error) {
      console.error('Kontaktformular Fehler:', error);
      toast({
        title: "Fehler beim Senden",
        description: error instanceof Error ? error.message : "Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
      {success && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Vielen Dank!</h3>
            <p className="text-muted-foreground">Ihre Nachricht wurde erfolgreich gesendet.</p>
            <Button
              onClick={() => {
                setSuccess(false);
                if (onOpenChange) onOpenChange(false);
              }}
              className="mt-4"
              variant="outline"
            >
              Schließen
            </Button>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name *
        </label>
        <Input
          id="name"
          {...form.register("name")}
          className={`w-full ${form.formState.errors.name ? 'border-red-500' : ''}`}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500 mt-1">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          E-Mail *
        </label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
          className={`w-full ${form.formState.errors.email ? 'border-red-500' : ''}`}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Telefon (optional)
        </label>
        <Input
          id="phone"
          type="tel"
          {...form.register("phone")}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Nachricht *
        </label>
        <Textarea
          id="message"
          {...form.register("message")}
          className={`w-full min-h-[150px] ${form.formState.errors.message ? 'border-red-500' : ''}`}
        />
        {form.formState.errors.message && (
          <p className="text-sm text-red-500 mt-1">{form.formState.errors.message.message}</p>
        )}
      </div>

      <input type="hidden" {...form.register("source")} />

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-gray-900"
        disabled={isSubmitting || !form.formState.isValid}
      >
        {isSubmitting ? <LoadingSpinner /> : "Nachricht senden"}
      </Button>
    </form>
  );

  if (isOpen !== undefined) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Kontaktieren Sie uns</DialogTitle>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return formContent;
}