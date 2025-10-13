"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, PlayCircle, CheckCircle, AlertCircle, Loader2 } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { useAutofill } from "@/hooks/use-autofill";

interface CallTestWidgetProps {
  className?: string;
}

type CallStatus = 'idle' | 'calling' | 'success' | 'error';

export function CallTestWidget({ className }: CallTestWidgetProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useI18n();
  
  // Autofill Hook - verwendet jetzt Cookie-Consent
  const {
    autofillData,
    hasConsent,
    isLoading: autofillLoading,
    saveAutofillData,
    getAutocompleteProps,
    hasStoredData
  } = useAutofill({ storageKey: 'ki-callflow-widget-data' });

  // Lade gespeicherte Daten beim Mount
  useEffect(() => {
    if (!autofillLoading && hasConsent && autofillData.name) {
      setCustomerName(autofillData.name);
    }
    if (!autofillLoading && hasConsent && autofillData.phone) {
      setPhoneNumber(autofillData.phone);
    }
  }, [autofillData, hasConsent, autofillLoading]);

  // Auto-save bei vorhandenem Consent (kein Banner mehr notwendig)
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
    // Nur Zahlen und + erlauben
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // Maximal 15 Ziffern (E.164 Standard für internationale Nummern)
    const maxDigits = 15;
    const digitsOnly = cleaned.replace(/\+/g, '');
    if (digitsOnly.length > maxDigits) {
      // Kürze auf maximal 15 Ziffern
      const trimmed = '+' + digitsOnly.slice(0, maxDigits);
      return trimmed;
    }
    
    // Deutsche Nummern mit 0 zu +49 konvertieren
    if (cleaned.startsWith('0') && !cleaned.startsWith('00')) {
      const numbers = cleaned.slice(1);
      if (numbers.length <= 3) return `+49 ${numbers}`;
      return `+49 ${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    }
    
    // Deutsche Formatierung: +49 XXX XXXXXXXX
    if (cleaned.startsWith('+49')) {
      const numbers = cleaned.slice(3);
      if (numbers.length <= 3) return `+49 ${numbers}`;
      return `+49 ${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    }
    
    // Internationale Nummern: einfach zurückgeben
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

  const isValidPhoneNumber = (phone: string) => {
    // Validierung für internationale Telefonnummern (E.164 Standard)
    const cleanNumber = phone.replace(/\s/g, '');
    
    // Internationale Nummer: + gefolgt von 7-15 Ziffern
    // Beispiele: +1234567890, +44123456789, +4915209971998
    if (/^\+\d{7,15}$/.test(cleanNumber)) {
      return true;
    }
    
    // Deutsche Nummer ohne +: 0 gefolgt von 5-12 Ziffern (wird zu +49 konvertiert)
    // Beispiele: 04771841, 015209971998
    if (/^0\d{5,12}$/.test(cleanNumber)) {
      return true;
    }
    
    return false;
  };

  const isValidName = (name: string) => {
    // Name muss mindestens 2 Zeichen haben und darf nur Buchstaben, Leerzeichen und Bindestriche enthalten
    return name.trim().length >= 2 && /^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(name.trim());
  };

  const handleStartCall = async () => {
    if (!isValidPhoneNumber(phoneNumber) || !isValidName(customerName)) {
      setCallStatus('error');
      return;
    }

    setIsLoading(true);
    setCallStatus('calling');

    try {
      // Nummer normalisieren (zu +49 Format)
      let normalizedNumber = phoneNumber.replace(/\s/g, '');
      if (normalizedNumber.startsWith('0')) {
        normalizedNumber = '+49' + normalizedNumber.slice(1);
      }

      // Call über PHP-Bridge mit Rate-Limiting und Validierung
      const response = await fetch('/api/call-test.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: normalizedNumber,
          customerName: customerName.trim()
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setCallStatus('success');
        
        // Speichere erfolgreiche Daten
        if (hasConsent) {
          saveAutofillData({ 
            name: customerName.trim(), 
            phone: normalizedNumber 
          });
        }
        
        // Reset nach 15 Sekunden (genug Zeit für Anruf-Erwartung)
        setTimeout(() => {
          setCallStatus('idle');
          if (!hasConsent) {
            // Nur löschen wenn kein Autofill aktiv
            setPhoneNumber('');
            setCustomerName('');
          }
        }, 15000);
      } else {
        // Zeige spezifische Fehlermeldung von der API
        throw new Error(result.error || 'Anruf konnte nicht gestartet werden');
      }
    } catch (error) {
      // Error handling ohne console logs für production
      setCallStatus('error');
      // Reset nach 8 Sekunden (mehr Zeit zum Lesen der Fehlermeldung)
      setTimeout(() => {
        setCallStatus('idle');
      }, 8000);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusContent = () => {
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
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {t('widget.privacyHint')}
            </p>
          </div>
          
          <Button
            onClick={handleStartCall}
            disabled={!isValidPhoneNumber(phoneNumber) || !isValidName(customerName) || isLoading}
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
                onClick={() => setCallStatus('idle')}
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
