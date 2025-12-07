"use client";

import { useState, useEffect, useMemo } from "react";
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

  // Telefonnummer formatieren (nur deutsche Nummern, keine Leerzeichen)
  const formatPhoneNumber = (value: string) => {
    // Entferne alle Zeichen außer Zahlen und +
    let cleaned = value.replace(/[^\d+]/g, '');
    
    // Wenn mit 0 beginnt UND noch kein + vorhanden ist, konvertiere zu +49
    if (cleaned.startsWith('0') && !cleaned.includes('+')) {
      // Entferne die führende 0 und füge +49 hinzu
      cleaned = '+49' + cleaned.slice(1);
    }
    
    // Wenn + vorhanden ist
    if (cleaned.includes('+')) {
      // Wenn bereits +49 vorhanden ist, erlaube nur +49
      if (cleaned.startsWith('+49')) {
        // Erlaube nur +49, entferne alle anderen + Zeichen
        cleaned = '+49' + cleaned.slice(3).replace(/\+/g, '');
      } 
      // Wenn +4 eingegeben wird (auf dem Weg zu +49), erlaube es
      else if (cleaned.startsWith('+4')) {
        // Erlaube +4 (kann zu +49 werden)
        cleaned = '+4' + cleaned.slice(2).replace(/\+/g, '');
      }
      // Wenn nur + eingegeben wird, erlaube es
      else if (cleaned === '+') {
        return '+';
      }
      // Wenn + mit anderen Zahlen beginnt (außer +4), blockiere es
      else {
        const plusIndex = cleaned.indexOf('+');
        // Wenn + nicht am Anfang steht oder andere Länder-Codes, entferne alles ab +
        if (plusIndex !== 0 || !cleaned.startsWith('+4')) {
          cleaned = cleaned.slice(0, plusIndex) + cleaned.slice(plusIndex + 1).replace(/\+/g, '');
        }
      }
    }
    
    // Wenn mit +49 beginnt, begrenze auf max 11 Ziffern nach +49
    if (cleaned.startsWith('+49')) {
      const digits = cleaned.slice(3);
      const limitedDigits = digits.slice(0, 11);
      return '+49' + limitedDigits;
    }
    
    // Wenn mit +4 beginnt (aber noch nicht +49), erlaube weitere Eingabe
    if (cleaned.startsWith('+4')) {
      const digits = cleaned.slice(2);
      // Wenn 9 folgt, wird es zu +49
      if (digits.startsWith('9')) {
        const remainingDigits = digits.slice(1).slice(0, 11);
        return '+49' + remainingDigits;
      }
      // Sonst erlaube weitere Eingabe (max 1 weitere Ziffer für +49)
      return '+4' + digits.slice(0, 1);
    }
    
    // Wenn nur + vorhanden ist
    if (cleaned === '+') {
      return '+';
    }
    
    // Wenn noch eine 0 vorhanden ist (sollte nicht passieren nach Konvertierung, aber als Fallback)
    if (cleaned.startsWith('0')) {
      const limitedDigits = cleaned.slice(0, 12); // 0 + max 11 Ziffern
      return limitedDigits;
    }
    
    // Für andere Fälle: nur Zahlen
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
    // Verwende die bereits memoized Validierung
    const phoneValidation = phoneValidationMemo;
    const nameValidationResult = nameValidation;
    
    // Debug-Logging für Validierung
    if (process.env.NODE_ENV === 'development') {
      const cleanedPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
      console.log('📞 Validation Check:', {
        originalPhone: phoneNumber,
        cleanedPhone,
        phoneLength: cleanedPhone.length,
        phoneAfterPlus49: cleanedPhone.startsWith('+49') ? cleanedPhone.slice(3) : null,
        digitsAfterPlus49: cleanedPhone.startsWith('+49') ? cleanedPhone.slice(3).length : null,
        phoneValid: phoneValidation.isValid,
        normalized: phoneValidation.normalized,
        nameValid: nameValidationResult,
        name: customerName
      });
    }
    
    if (!phoneValidation.isValid || !nameValidationResult) {
      const cleanedPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
      console.error('❌ Validation failed:', {
        phone: phoneNumber,
        cleanedPhone,
        phoneValid: phoneValidation.isValid,
        nameValid: nameValidationResult,
        phoneValidationResult: phoneValidation
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
      console.error('❌ Call failed:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
      }
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
  
  // Memoize validation to prevent unnecessary re-renders and infinite loops
  const phoneValidationMemo = useMemo(() => {
    if (!phoneNumber || phoneNumber.length === 0) {
      return { isValid: false, normalized: '', countryCode: undefined };
    }
    const cleaned = phoneNumber.replace(/[\s\-\(\)]/g, '');
    return validatePhoneNumber(cleaned);
  }, [phoneNumber, validatePhoneNumber]);
  
  const nameValidation = useMemo(() => validateName(customerName), [customerName, validateName]);
  const isFormValid = phoneValidationMemo.isValid && nameValidation && !isLoading;

  // Debug: Log validation result in development (nur bei tatsächlichen Änderungen)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && phoneNumber && phoneNumber.length > 0) {
      console.log('📞 Phone validation:', {
        input: phoneNumber,
        cleaned: phoneNumber.replace(/[\s\-\(\)]/g, ''),
        isValid: phoneValidationMemo.isValid,
        normalized: phoneValidationMemo.normalized,
        countryCode: phoneValidationMemo.countryCode
      });
    }
  }, [phoneNumber, phoneValidationMemo.isValid, phoneValidationMemo.normalized]); // Nur Primitives als Dependencies

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
            {phoneNumber && !phoneValidationMemo.isValid && (
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
