"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, PlayCircle, CheckCircle, AlertCircle, Loader2 } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { useAutofill } from "@/hooks/use-autofill";
import { useWidgetCall } from "./use-widget-call";
import { WidgetCallProps, CallStatus, StatusContent } from "./widget-call.types";

export function WidgetCall({ className }: WidgetCallProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const { t } = useI18n();
  
  const {
    callStatus,
    isLoading,
    startCall,
    validatePhoneNumber,
    validateName,
    checkRateLimit
  } = useWidgetCall();
  
  // Autofill Hook - verwendet Cookie-Consent
  const {
    autofillData,
    hasConsent,
    isLoading: autofillLoading,
    saveAutofillData,
    getAutocompleteProps,
    hasStoredData
  } = useAutofill({ storageKey: 'widget-call-data' });

  // Lade gespeicherte Daten beim Mount
  useEffect(() => {
    if (!autofillLoading && hasConsent && autofillData.name) {
      setCustomerName(autofillData.name);
    }
    if (!autofillLoading && hasConsent && autofillData.phone) {
      setPhoneNumber(autofillData.phone);
    }
  }, [autofillData, hasConsent, autofillLoading]);

  // Auto-save bei vorhandenem Consent
  useEffect(() => {
    if (hasConsent && !autofillLoading && (customerName.length > 2 || phoneNumber.length > 5)) {
      const timer = setTimeout(() => {
        saveAutofillData({
          name: customerName,
          phone: phoneNumber
        });
      }, 1000); // Debounce von 1 Sekunde
      return () => clearTimeout(timer);
    }
  }, [customerName, phoneNumber, hasConsent, autofillLoading, saveAutofillData]);

  // Telefonnummer formatieren (international)
  const formatPhoneNumber = (value: string) => {
    // Nur Zahlen, + und Leerzeichen erlauben
    const cleaned = value.replace(/[^\d+\s]/g, '');
    
    // Einfache Formatierung: Gruppiere Ziffern nach +XX
    if (cleaned.startsWith('+')) {
      const parts = cleaned.split(' ');
      if (parts.length === 1) {
        // Erste Gruppe: +XX XXX
        if (cleaned.length > 3) {
          return cleaned.slice(0, 3) + ' ' + cleaned.slice(3);
        }
      }
      return cleaned;
    }
    
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    
    // Auto-save wenn Einverständnis vorhanden
    if (hasConsent && formatted.length > 5) {
      saveAutofillData({ phone: formatted });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setCustomerName(name);
    
    // Auto-save wenn Einverständnis vorhanden
    if (hasConsent && name.length > 2) {
      saveAutofillData({ name });
    }
  };

  const handleStartCall = async () => {
    const phoneValidation = validatePhoneNumber(phoneNumber);
    const nameValidation = validateName(customerName);
    
    if (!phoneValidation.isValid || !nameValidation) {
      return;
    }

    // Rate Limit prüfen
    if (!checkRateLimit()) {
      alert(t('widget.rateLimitExceeded') || 'Zu viele Anfragen. Bitte warten Sie einige Minuten.');
      return;
    }

    try {
      await startCall({
        customer_name: customerName,
        customer_phonenumber: phoneNumber
      });
      
      // Speichere erfolgreiche Daten
      if (hasConsent) {
        saveAutofillData({ 
          name: customerName.trim(), 
          phone: phoneValidation.normalized 
        });
      }
      
    } catch (error) {
      // Error wird bereits im Hook behandelt
      console.error('Call failed:', error);
    }
  };

  const getStatusContent = (): StatusContent => {
    switch (callStatus) {
      case 'calling':
        return {
          icon: <Loader2 className="h-6 w-6 animate-spin text-blue-500" />,
          title: t('widget.statusCalling'),
          description: t('widget.statusCallingDesc'),
          className: "border-blue-200 bg-blue-50 dark:bg-blue-950"
        };
      case 'success':
        return {
          icon: <CheckCircle className="h-6 w-6 text-green-500" />,
          title: t('widget.statusSuccess'),
          description: t('widget.statusSuccessDesc'),
          className: "border-green-200 bg-green-50 dark:bg-green-950"
        };
      case 'error':
        return {
          icon: <AlertCircle className="h-6 w-6 text-red-500" />,
          title: t('widget.statusError'),
          description: t('widget.statusErrorDesc'),
          className: "border-red-200 bg-red-50 dark:bg-red-950"
        };
      default:
        return {
          icon: <Phone className="h-6 w-6 text-primary" />,
          title: t('widget.title'),
          description: t('widget.description'),
          className: "border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5"
        };
    }
  };

  const statusContent = getStatusContent();
  const phoneValidation = validatePhoneNumber(phoneNumber);
  const nameValidation = validateName(customerName);
  const isFormValid = phoneValidation.isValid && nameValidation && !isLoading;

  return (
    <Card className={cn(
      "w-full max-w-md mx-auto transition-all duration-300 shadow-lg hover:shadow-xl",
      statusContent.className,
      className
    )}>
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-3">
          {statusContent.icon}
        </div>
        <CardTitle className="text-xl font-bold">
          {statusContent.title}
        </CardTitle>
        <CardDescription className="text-sm">
          {statusContent.description}
        </CardDescription>
      </CardHeader>
      
      {callStatus === 'idle' && (
        <CardContent className="space-y-4">
          {/* Honeypot-Feld (unsichtbar für Menschen) */}
          <input
            type="text"
            name="website"
            style={{ 
              position: 'absolute', 
              left: '-9999px', 
              opacity: 0, 
              pointerEvents: 'none' 
            }}
            tabIndex={-1}
            autoComplete="off"
          />
          
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t('widget.nameLabel')}
            </label>
            <Input
              id="name"
              type="text"
              placeholder={t('widget.namePlaceholder')}
              value={customerName}
              onChange={handleNameChange}
              className="text-lg"
              {...getAutocompleteProps('name')}
            />
            {customerName && !nameValidation && (
              <p className="text-xs text-red-500">
                {t('widget.nameError') || 'Name muss mindestens 2 Zeichen haben'}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              {t('widget.phoneLabel')}
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder={t('widget.phonePlaceholder')}
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="text-lg"
              {...getAutocompleteProps('phone')}
              inputMode="tel"
            />
            {phoneNumber && !phoneValidation.isValid && (
              <p className="text-xs text-red-500">
                {t('widget.phoneError') || 'Bitte geben Sie eine gültige Telefonnummer ein'}
              </p>
            )}
            {phoneValidation.isValid && phoneValidation.countryCode && (
              <p className="text-xs text-green-600">
                {t('widget.phoneValid')}: {phoneValidation.countryCode}
              </p>
            )}
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {t('widget.privacyHint')}
            </p>
          </div>
          
          <Button
            onClick={handleStartCall}
            disabled={!isFormValid}
            className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t('widget.buttonStarting')}
              </>
            ) : (
              <>
                <PlayCircle className="mr-2 h-5 w-5" />
                {t('widget.buttonStart')}
              </>
            )}
          </Button>
        </CardContent>
      )}
      
      {callStatus !== 'idle' && (
        <CardContent className="text-center py-6">
          <div className="space-y-2">
            {callStatus === 'success' && (
              <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                {t('widget.statusSuccessHint')}
              </p>
            )}
            {callStatus === 'error' && (
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                size="sm"
                className="mt-3"
              >
                {t('widget.buttonRetry')}
              </Button>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
