"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { useAutofill } from "@/hooks/use-autofill";
import { SpamProtection, useRateLimit } from "@/components/security/spam-protection";
import { Shield } from "lucide-react";

export interface ContactFormProps {
  defaultSubject?: string;
  onSubmitSuccess?: () => void;
  planType?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  source?: 'starter' | 'business' | 'enterprise' | 'contact';
  prefilledMessage?: string;
}

export function ContactForm({ 
  defaultSubject = "", 
  onSubmitSuccess, 
  source = 'contact',
  prefilledMessage = '',
  planType
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSpamProtectionValid, setIsSpamProtectionValid] = useState(false);
  const { toast } = useToast();
  const { isAllowed, getRemainingTime } = useRateLimit(3, 10 * 60 * 1000);
  
  // Autofill Hook - verwendet jetzt Cookie-Consent
  const {
    autofillData,
    hasConsent,
    isLoading: autofillLoading,
    saveAutofillData,
    getAutocompleteProps
  } = useAutofill({ storageKey: 'ki-callflow-contact-data' });
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: prefilledMessage,
      source: source
    }
  });

  // Lade gespeicherte Daten beim Mount
  useEffect(() => {
    if (!autofillLoading && hasConsent) {
      if (autofillData.name) form.setValue('name', autofillData.name);
      if (autofillData.email) form.setValue('email', autofillData.email);
      if (autofillData.phone) form.setValue('phone', autofillData.phone);
    }
  }, [autofillData, hasConsent, autofillLoading, form]);

  // Auto-save bei vorhandenem Consent (kein Banner mehr notwendig)
  useEffect(() => {
    if (hasConsent && !autofillLoading) {
      const subscription = form.watch((values) => {
        // Speichere automatisch bei Änderungen wenn Consent vorhanden
        if (values.name || values.email || values.phone) {
          const timer = setTimeout(() => {
            saveAutofillData({
              name: values.name || '',
              email: values.email || '',
              phone: values.phone || ''
            });
          }, 1000); // Debounce von 1 Sekunde
          return () => clearTimeout(timer);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [form, hasConsent, autofillLoading, saveAutofillData]);

  // Auto-save Handler
  const handleFieldChange = (field: keyof typeof autofillData, value: string) => {
    if (hasConsent && value && value.length > 1) {
      saveAutofillData({ [field]: value });
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    // Check rate limiting
    if (!isAllowed()) {
      const remainingTime = Math.ceil(getRemainingTime() / 1000 / 60);
      toast({
        title: "Zu viele Anfragen",
        description: `Bitte warten Sie ${remainingTime} Minuten bevor Sie erneut senden.`,
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    // Check spam protection
    if (!isSpamProtectionValid) {
      toast({
        title: "Sicherheitsprüfung fehlgeschlagen",
        description: "Bitte warten Sie einen Moment und versuchen Sie es erneut.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          planType,
          source,
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Beim Senden ist ein Fehler aufgetreten');
      }

      // Speichere erfolgreiche Daten vor Reset
      if (hasConsent) {
        saveAutofillData({
          name: data.name,
          email: data.email,
          phone: data.phone || undefined
        });
      }

      form.reset({
        name: hasConsent ? data.name : '',
        email: hasConsent ? data.email : '',
        phone: hasConsent ? data.phone : '',
        message: '',
        source: source
      });
      
      toast({
        title: "Nachricht gesendet",
        description: "Wir haben Ihre Nachricht erhalten und werden uns zeitnah bei Ihnen melden.",
        duration: 5000,
      });
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
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
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name *
        </label>
        <Input
          id="name"
          {...form.register("name", {
            onChange: (e) => handleFieldChange('name', e.target.value)
          })}
          className={`w-full ${form.formState.errors.name ? 'border-red-500' : ''}`}
          {...getAutocompleteProps('name')}
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
          {...form.register("email", {
            onChange: (e) => handleFieldChange('email', e.target.value)
          })}
          className={`w-full ${form.formState.errors.email ? 'border-red-500' : ''}`}
          {...getAutocompleteProps('email')}
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
          {...form.register("phone", {
            onChange: (e) => handleFieldChange('phone', e.target.value)
          })}
          className="w-full"
          {...getAutocompleteProps('phone')}
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
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={isSubmitting || !form.formState.isValid || !isSpamProtectionValid}
      >
        {isSubmitting ? <LoadingSpinner /> : "Nachricht senden"}
      </Button>
    </form>
  );

  return (
    <SpamProtection 
      onValidationChange={setIsSpamProtectionValid}
      formData={form.watch()}
    >
      <div className="space-y-4">
        {/* Security Status Indicator */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className={`h-4 w-4 ${isSpamProtectionValid ? 'text-green-500' : 'text-yellow-500'}`} />
          <span>
            {isSpamProtectionValid ? 'Sicherheitsprüfung bestanden' : 'Sicherheitsprüfung läuft...'}
          </span>
        </div>

        {formContent}
      </div>
    </SpamProtection>
  );
}