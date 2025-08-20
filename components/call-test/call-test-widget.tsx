"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, PlayCircle, CheckCircle, AlertCircle, Loader2 } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

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

  // Telefonnummer formatieren (deutsch)
  const formatPhoneNumber = (value: string) => {
    // Nur Zahlen und + erlauben
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // Deutsche Formatierung: +49 XXX XXXXXXXX (bis zu 11 Ziffern nach +49)
    if (cleaned.startsWith('+49')) {
      const numbers = cleaned.slice(3);
      if (numbers.length <= 3) return `+49 ${numbers}`;
      if (numbers.length <= 11) return `+49 ${numbers.slice(0, 3)} ${numbers.slice(3)}`;
      return `+49 ${numbers.slice(0, 3)} ${numbers.slice(3, 11)}`;
    }
    
    // Wenn mit 0 anfängt, zu +49 konvertieren (bis zu 11 Ziffern nach 0)
    if (cleaned.startsWith('0')) {
      const numbers = cleaned.slice(1);
      if (numbers.length <= 3) return `+49 ${numbers}`;
      if (numbers.length <= 11) return `+49 ${numbers.slice(0, 3)} ${numbers.slice(3)}`;
      return `+49 ${numbers.slice(0, 3)} ${numbers.slice(3, 11)}`;
    }
    
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const isValidPhoneNumber = (phone: string) => {
    // Validierung für deutsche Nummern
    const cleanNumber = phone.replace(/\s/g, '');
    return /^\+49\d{10,11}$/.test(cleanNumber) || /^0\d{9,10}$/.test(cleanNumber);
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

      // Direkter Make.com Webhook Call (statischer Export kompatibel)
      const MAKE_WEBHOOK_URL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL || 
        'https://hook.eu1.make.com/YOUR_WEBHOOK_ID_HERE'; // Fallback für Development
      
      // Development: Verwende Mock Response wenn Webhook nicht verfügbar
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      // Saubere JSON-Struktur für Make.com - KEINE Verschachtelung
      const finalPayload = {
        phone: normalizedNumber,
        name: customerName.trim()
      };

      let response;
      
      if (isDevelopment && MAKE_WEBHOOK_URL.includes('YOUR_WEBHOOK_ID_HERE')) {
        // Development Mock: Simuliere erfolgreichen Webhook Call
        response = {
          ok: true,
          status: 200,
          json: async () => ({ success: true, callId: `dev_${Date.now()}` })
        };
        // Kein künstlicher Delay - Widget ist sofort bereit
      } else {
        // Production: Echter Make.com Webhook Call mit Form-Data
        const formData = new FormData();
        formData.append('phone', normalizedNumber);
        formData.append('name', customerName.trim());
        
        response = await fetch(MAKE_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors', // Umgeht CORS-Probleme in Development
          headers: {
            'User-Agent': 'callflows-widget/1.0',
            'X-Webhook-Source': 'callflows-widget'
            // KEIN Content-Type Header - FormData setzt das automatisch
          },
          body: formData,
        });
      }

      if (response.ok || (response.status === 0 && !isDevelopment)) {
        // Status 0 bei no-cors Mode ist normal und bedeutet Request wurde gesendet
        setCallStatus('success');
        // Reset nach 3 Sekunden (schnellere UX)
        setTimeout(() => {
          setCallStatus('idle');
          setPhoneNumber('');
          setCustomerName('');
        }, 3000);
        

      } else {
        throw new Error(`Make.com Webhook Error: ${response.status}`);
      }
    } catch (error) {
      // Error handling ohne console logs für production
      setCallStatus('error');
      // Reset nach 3 Sekunden (schnellere UX)
      setTimeout(() => {
        setCallStatus('idle');
      }, 3000);
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
              onChange={(e) => setCustomerName(e.target.value)}
              className="text-lg"
              autoComplete="name"
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
              autoComplete="tel"
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
