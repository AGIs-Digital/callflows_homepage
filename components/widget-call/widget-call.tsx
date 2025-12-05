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
  } = useWidgetCall({
    enableTurnstile: true,
    turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  });
  
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

  // Telefonnummer formatieren (nur deutsche Nummern)
  const formatPhoneNumber = (value: string) => {
    // Entferne alle Zeichen außer Zahlen und +
    let cleaned = value.replace(/[^\d+]/g, '');
    
    // Blockiere alle Länder-Codes außer +49
    if (cleaned.includes('+')) {
      // Wenn + vorhanden ist, prüfe ob es +49 ist
      if (cleaned.startsWith('+49')) {
        // Erlaube nur +49, entferne alle anderen + Zeichen
        cleaned = '+49' + cleaned.slice(3).replace(/\+/g, '');
      } else {
        // Alle anderen Länder-Codes blockieren: entferne + und alles danach bis zur nächsten Zahl
        // Wenn jemand +1, +33, +44 etc. eingibt, entferne den gesamten Teil mit +
        const plusIndex = cleaned.indexOf('+');
        if (plusIndex !== -1) {
          // Entferne alles ab dem + wenn es nicht +49 ist
          cleaned = cleaned.slice(0, plusIndex) + cleaned.slice(plusIndex + 1).replace(/\+/g, '');
        }
      }
    }
    
    // Wenn mit +49 beginnt, formatiere deutsche Nummer
    if (cleaned.startsWith('+49')) {
      const digits = cleaned.slice(3);
      // Maximal 11 Ziffern nach +49 erlauben
      const limitedDigits = digits.slice(0, 11);
      if (limitedDigits.length === 0) {
        return '+49';
      } else if (limitedDigits.length <= 3) {
        return '+49 ' + limitedDigits;
      } else if (limitedDigits.length <= 6) {
        return '+49 ' + limitedDigits.slice(0, 3) + ' ' + limitedDigits.slice(3);
      } else if (limitedDigits.length <= 9) {
        return '+49 ' + limitedDigits.slice(0, 3) + ' ' + limitedDigits.slice(3, 6) + ' ' + limitedDigits.slice(6);
      } else {
        return '+49 ' + limitedDigits.slice(0, 3) + ' ' + limitedDigits.slice(3, 6) + ' ' + limitedDigits.slice(6, 9) + ' ' + limitedDigits.slice(9);
      }
    }
    
    // Wenn mit 0 beginnt (deutsche Nummer ohne Ländercode), formatiere lokal
    if (cleaned.startsWith('0')) {
      // Maximal 11 Ziffern nach 0 erlauben
      const limitedDigits = cleaned.slice(0, 12); // 0 + max 11 Ziffern
      if (limitedDigits.length <= 3) {
        return limitedDigits;
      } else if (limitedDigits.length <= 6) {
        return limitedDigits.slice(0, 3) + ' ' + limitedDigits.slice(3);
      } else if (limitedDigits.length <= 9) {
        return limitedDigits.slice(0, 3) + ' ' + limitedDigits.slice(3, 6) + ' ' + limitedDigits.slice(6);
      } else {
        return limitedDigits.slice(0, 3) + ' ' + limitedDigits.slice(3, 6) + ' ' + limitedDigits.slice(6, 9) + ' ' + limitedDigits.slice(9);
      }
    }
    
    // Für andere Fälle: nur Zahlen (kein + erlaubt wenn nicht +49)
    return cleaned.replace(/\+/g, '');
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
    // Entferne Formatierung vor Validierung (Leerzeichen, etc.)
    const cleanedPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
    const phoneValidation = validatePhoneNumber(cleanedPhone);
    const nameValidation = validateName(customerName);
    
    if (!phoneValidation.isValid || !nameValidation) {
      console.error('Validation failed:', {
        phone: phoneNumber,
        cleanedPhone,
        phoneValid: phoneValidation.isValid,
        nameValid: nameValidation
      });
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
        customer_phonenumber: phoneValidation.normalized // Verwende normalisierte Nummer
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
          icon: <Loader2 className="h-6 w-6 lg:h-8 lg:w-8 animate-spin text-blue-500" />,
          title: t('widget.statusCalling'),
          description: t('widget.statusCallingDesc'),
          className: "border-blue-200 bg-blue-50 dark:bg-blue-950"
        };
      case 'success':
        return {
          icon: <CheckCircle className="h-6 w-6 lg:h-8 lg:w-8 text-green-500" />,
          title: t('widget.statusSuccess'),
          description: t('widget.statusSuccessDesc'),
          className: "border-green-200 bg-green-50 dark:bg-green-950"
        };
      case 'error':
        return {
          icon: <AlertCircle className="h-6 w-6 lg:h-8 lg:w-8 text-red-500" />,
          title: t('widget.statusError'),
          description: t('widget.statusErrorDesc'),
          className: "border-red-200 bg-red-50 dark:bg-red-950"
        };
      default:
        return {
          icon: <Phone className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />,
          title: t('widget.title'),
          description: t('widget.description'),
          className: "border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5"
        };
    }
  };

  const statusContent = getStatusContent();
  // Entferne Formatierung für Validierung (Leerzeichen, etc.)
  const cleanedPhoneForValidation = phoneNumber.replace(/[\s\-\(\)]/g, '');
  const phoneValidation = validatePhoneNumber(cleanedPhoneForValidation);
  const nameValidation = validateName(customerName);
  const isFormValid = phoneValidation.isValid && nameValidation && !isLoading;
  
  // Debug: Log validation result in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && phoneNumber) {
      console.log('📞 Phone validation:', {
        input: phoneNumber,
        cleaned: cleanedPhoneForValidation,
        isValid: phoneValidation.isValid,
        normalized: phoneValidation.normalized,
        countryCode: phoneValidation.countryCode
      });
    }
  }, [phoneNumber, cleanedPhoneForValidation, phoneValidation]);

  return (
    <Card className={cn(
      "w-full max-w-md mx-auto transition-all duration-300 shadow-lg hover:shadow-xl",
      statusContent.className,
      className
    )}>
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl lg:text-2xl xl:text-3xl font-bold flex items-center justify-center gap-2 lg:gap-3">
          {statusContent.icon}
          <span>
            {statusContent.title.split(/(callflows)/gi).map((part, i) => 
              part.toLowerCase() === 'callflows' ? (
                <span key={i} className="text-primary">{part}</span>
              ) : part
            )}
          </span>
        </CardTitle>
        <CardDescription className="text-sm lg:text-base xl:text-lg mt-2">
          {statusContent.description.split(/(Carla)/gi).map((part, i) => 
            part.toLowerCase() === 'carla' ? (
              <span key={i} className="text-primary font-semibold">Carla</span>
            ) : part
          )}
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
            <label htmlFor="name" className="text-sm lg:text-base font-medium">
              {t('widget.nameLabel')}
            </label>
            <Input
              id="name"
              type="text"
              placeholder={t('widget.namePlaceholder')}
              value={customerName}
              onChange={handleNameChange}
              className="text-lg lg:text-xl"
              {...getAutocompleteProps('name')}
            />
            {customerName && !nameValidation && (
              <p className="text-xs text-red-500">
                {t('widget.nameError') || 'Name muss mindestens 2 Zeichen haben'}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm lg:text-base font-medium">
              {t('widget.phoneLabel')}
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder={t('widget.phonePlaceholder')}
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="text-lg lg:text-xl"
              {...getAutocompleteProps('phone')}
              inputMode="tel"
            />
            {phoneNumber && !phoneValidation.isValid && (
              <p className="text-xs text-red-500">
                {t('widget.phoneError') || 'Bitte geben Sie eine gültige Telefonnummer ein'}
              </p>
            )}
          </div>

          <div className="text-center">
            <p className="text-xs lg:text-sm text-muted-foreground">
              {t('widget.privacyHint')}
            </p>
          </div>
          
          <Button
            onClick={handleStartCall}
            disabled={!isFormValid}
            className="w-full bg-primary hover:bg-primary/90 text-white py-6 lg:py-7 text-lg lg:text-xl font-semibold"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 lg:h-6 lg:w-6 animate-spin" />
                {t('widget.buttonStarting')}
              </>
            ) : (
              <>
                <PlayCircle className="mr-2 h-5 w-5 lg:h-6 lg:w-6" />
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
