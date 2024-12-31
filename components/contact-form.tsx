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
import { apiClient } from "@/lib/api/client";

interface FormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().optional(),
  message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange"
  });

  const onSubmit = useCallback(async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSuccess(false);

    try {
      await apiClient.post('/api/contact', data);
      setSuccess(true);

      toast({
        title: "Nachricht gesendet",
        description: "Wir werden uns in Kürze bei Ihnen melden.",
      });
      
      reset();
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Fehler",
        description: "Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [toast, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
      {success && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Vielen Dank!</h3>
            <p className="text-muted-foreground">Ihre Nachricht wurde erfolgreich gesendet.</p>
            <Button
              onClick={() => setSuccess(false)}
              className="mt-4"
              variant="outline"
            >
              Neue Nachricht
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

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-gray-900"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? <LoadingSpinner /> : "Nachricht senden"}
      </Button>
    </form>
  );
}