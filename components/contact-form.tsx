"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

interface ContactFormProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  source?: string;
}

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().optional(),
  message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein"),
  source: z.string().optional()
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm({ isOpen, onOpenChange, source = "contact" }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    defaultValues: {
      source
    }
  });

  const onSubmit = useCallback(async (data: ContactFormData) => {
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
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Ein Fehler ist aufgetreten');
      }
      
      setSuccess(true);
      toast({
        title: "Nachricht gesendet",
        description: "Wir haben Ihre Nachricht erhalten und werden uns zeitnah bei Ihnen melden.",
        duration: 5000,
      });
      
      reset();
      if (onOpenChange) {
        setTimeout(() => onOpenChange(false), 2000);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Fehler beim Senden",
        description: error instanceof Error ? error.message : "Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [toast, reset, onOpenChange]);

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
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
          {...register("name")}
          className={`w-full ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          E-Mail *
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className={`w-full ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Telefon (optional)
        </label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Nachricht *
        </label>
        <Textarea
          id="message"
          {...register("message")}
          className={`w-full min-h-[150px] ${errors.message ? 'border-red-500' : ''}`}
        />
        {errors.message && (
          <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      <input type="hidden" {...register("source")} />

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-gray-900"
        disabled={isSubmitting || !isValid}
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