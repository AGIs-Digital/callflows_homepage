"use client";

import { useState, useEffect } from 'react';
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Heart, AlertCircle, Loader2, Sparkles as SparklesIcon } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "@/components/magicui/sparkles";
import { SparklesCore } from "@/components/ui/sparkles";
import { useI18n } from "@/lib/i18n";
import { useRateLimit } from "@/components/security/spam-protection";

export default function LoginPage() {
  const { t, tArray } = useI18n();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  // Rate Limiting: Max 5 Redirects pro 10 Minuten
  const { isAllowed, getRemainingTime } = useRateLimit(5, 10 * 60 * 1000);

  // Lade Willkommensnachrichten aus Übersetzungen
  const welcomeMessages = tArray('login.welcomeMessages');

  // Rotiere Willkommensnachrichten alle 3.5 Sekunden für freundlicheren Rhythmus
  useEffect(() => {
    if (welcomeMessages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % welcomeMessages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [welcomeMessages.length]);

  // Entferne ALLE username Parameter aus der URL (verhindert Endlosschleifen komplett)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      
      // Entferne ALLE username Parameter aus der URL (egal auf welcher Domain)
      // Das verhindert Endlosschleifen komplett
      if (currentUrl.includes('username=')) {
        // Verwende mehrfache Regex-Replacements um alle Vorkommen zu entfernen
        let cleanUrl = currentUrl;
        let previousUrl = '';
        
        // Wiederhole bis keine Änderungen mehr auftreten (entfernt auch verschachtelte Parameter)
        while (cleanUrl !== previousUrl) {
          previousUrl = cleanUrl;
          // Entferne alle Vorkommen von ?username=... oder &username=...
          cleanUrl = cleanUrl.replace(/\?username=[^?&]*/g, '?');
          cleanUrl = cleanUrl.replace(/&username=[^?&]*/g, '');
          cleanUrl = cleanUrl.replace(/\?$/, '');
          cleanUrl = cleanUrl.replace(/\?&/g, '&');
          cleanUrl = cleanUrl.replace(/&&+/g, '&');
        }
        
        // Wenn die URL mit ? oder & endet, entferne es
        cleanUrl = cleanUrl.replace(/[?&]$/, '');
        
        if (cleanUrl !== currentUrl) {
          window.history.replaceState({}, '', cleanUrl);
        }
      }
    }
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Verhindere mehrfache Submits
    if (isRedirecting) {
      return;
    }
    
    // Rate Limit prüfen
    if (!isAllowed()) {
      const remainingMinutes = Math.ceil(getRemainingTime() / 1000 / 60);
      setError(`Zu viele Anfragen. Bitte warten Sie ${remainingMinutes} ${remainingMinutes === 1 ? 'Minute' : 'Minuten'} bevor Sie es erneut versuchen.`);
      return;
    }
    
    const normalizedEmail = (email || "").trim().toLowerCase();
    
    if (!normalizedEmail) {
      setError(t('login.emailErrorEmpty'));
      return;
    }

    // Email-Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      setError(t('login.emailErrorInvalid'));
      return;
    }

    // Starte Animation
    setIsAnimating(true);
    setIsRedirecting(true);

    // Kurze Verzögerung für Animation
    await new Promise(resolve => setTimeout(resolve, 800));

    // Entscheide basierend auf Domain
    const isInternal = normalizedEmail.endsWith("@callflows.de");
    
    // Prüfe, ob wir bereits auf der EspoCRM-Domain sind (verhindert Endlosschleife)
    if (typeof window !== 'undefined' && window.location.hostname === 'app.callflows.de') {
      // Wir sind bereits auf EspoCRM - nicht nochmal redirecten
      setTimeout(() => {
        setIsRedirecting(false);
        setIsAnimating(false);
      }, 2000);
      return;
    }
    
    // Lösung: Speichere Username im Cookie (funktioniert über Subdomains)
    // Fallback: localStorage und Query-Parameter falls Cookies blockiert sind
    let cookieSupported = false;
    
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + 5 * 60 * 1000); // 5 Minuten Gültigkeit
      
      // Setze Cookie mit domain=.callflows.de (funktioniert über Subdomains)
      document.cookie = `callflows_username=${encodeURIComponent(normalizedEmail)}; expires=${expires.toUTCString()}; path=/; domain=.callflows.de; SameSite=Lax`;
      document.cookie = `callflows_username_timestamp=${Date.now()}; expires=${expires.toUTCString()}; path=/; domain=.callflows.de; SameSite=Lax`;
      
      // Prüfe, ob Cookie gesetzt wurde
      cookieSupported = document.cookie.includes('callflows_username');
      
      // Fallback: Auch localStorage setzen (falls Cookie nicht funktioniert)
      localStorage.setItem('callflows_username', normalizedEmail);
      localStorage.setItem('callflows_username_timestamp', Date.now().toString());
    } catch (e) {
      // Cookie/localStorage nicht verfügbar
      console.warn('Cookie/localStorage nicht verfügbar');
    }
    
    // Redirect-URL bestimmen - IMMER OHNE Query-Parameter
    // Der Username wird über Cookie/localStorage übertragen, nicht über URL
    const adminBaseUrl = 'https://app.callflows.de/';
    const customerBaseUrl = 'https://app.callflows.de/portal/user/';
    const targetUrl = isInternal ? adminBaseUrl : customerBaseUrl;
    
    // WICHTIG: Kein Query-Parameter mehr - das verhindert Endlosschleifen komplett
    // Der CTO-Code auf der EspoCRM-Seite muss Cookie/localStorage lesen
    
    // Setze Redirect-Status nach 5 Sekunden zurück (falls User zurückkommt)
    setTimeout(() => {
      setIsRedirecting(false);
      setIsAnimating(false);
    }, 5000);
    
    // Einfacher Redirect OHNE Query-Parameter - fertig
    // Der Username wird über Cookie/localStorage übertragen
    window.location.href = targetUrl;
  };

  return (
    <main className="bg-background flex flex-col min-h-screen">
      <SiteHeader />
      <div className="flex-1 pt-16 pb-4 relative overflow-hidden flex flex-col bg-[#FFFFF0] dark:bg-background">
        {/* Subtile warme Akzente auf warmem Hintergrund */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Sparkles Effect */}
        <Sparkles 
          sparklesCount={80}
          colors={[
            "hsl(var(--primary) / 0.7)",
            "hsl(var(--accent) / 0.7)",
            "hsl(var(--primary) / 0.5)",
            "hsl(var(--accent) / 0.5)",
          ]}
          minSize={2}
          maxSize={4}
          speed={0.8}
        />
        
        <div className="container relative z-10 flex-1 flex flex-col">
          {/* Breadcrumbs */}
          <div className="mb-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">{t('login.breadcrumbHome')}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{t('login.breadcrumbLogin')}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {/* Pre-Login Form */}
          <div className="flex items-center justify-center flex-1 pt-2 pb-0 relative">
            {/* Sparkles Effect unter der Card */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-40 pointer-events-none">
              
              {/* SparklesCore */}
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={500}
                className="w-full h-full"
                particleColor="#0F62D5"
                speed={0.9}
              />
              
              {/* Radial Gradient Mask */}
              <div className="absolute inset-0 w-full h-full bg-[#FFFFF0] dark:bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
            
            <motion.div 
              className="w-full max-w-md relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card 
                className={`w-full relative overflow-hidden border-primary/30 shadow-xl dark:shadow-primary/15
                  bg-gradient-to-br from-card via-card to-primary/5 dark:from-card dark:via-card dark:to-primary/12
                  backdrop-blur-sm transition-all duration-500
                  ${isAnimating ? 'animate-magic-glow' : ''}`}
                id="prelogin-form-card"
              >

                
                {/* Magical Glow Effect */}
                {isAnimating && (
                  <motion.div 
                    className="absolute inset-0 animate-shimmer-sweep pointer-events-none z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                
                <CardHeader className="text-center relative z-10 pb-3">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <CardTitle className="flex items-center justify-center gap-3 text-2xl mb-2">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.15, 1],
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      >
                        <Heart className="w-7 h-7 text-primary fill-primary/20" />
                      </motion.div>
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {t('login.title')}
                      </span>
                    </CardTitle>
                  </motion.div>
                  
                  {/* Rotierende Willkommensnachricht */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="min-h-[3.5rem] flex items-center justify-center px-4"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentMessageIndex}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="text-center"
                      >
                        <CardDescription className="text-base font-medium text-foreground/95 leading-relaxed">
                          {welcomeMessages.length > 0 
                            ? welcomeMessages[currentMessageIndex] 
                            : t('login.welcomeMessages.0')}
                        </CardDescription>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="mt-3"
                  >
                    <p className="text-sm text-muted-foreground">
                      {t('login.description')}
                    </p>
                  </motion.div>
                </CardHeader>
                
                <CardContent className="space-y-5 relative z-10 pb-4">
                  <form onSubmit={handleSubmit} className="space-y-4" id="prelogin-form">
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      <Label htmlFor="email" className="text-base font-medium">
                        {t('login.emailLabel')}
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t('login.emailPlaceholder')}
                          required
                          className="pl-11 h-12 text-base transition-all duration-300
                            focus:ring-2 focus:ring-primary/50 focus:border-primary
                            focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]
                            hover:border-primary/50 border-2"
                          disabled={isRedirecting}
                        />
                      </div>
                    </motion.div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full h-12 text-base font-semibold relative overflow-hidden
                          bg-gradient-to-r from-primary via-primary/95 to-primary
                          hover:from-primary/95 hover:via-primary hover:to-primary/95
                          shadow-lg hover:shadow-xl hover:shadow-primary/25
                          transition-all duration-300
                          hover:scale-[1.02] active:scale-[0.98]"
                        disabled={isRedirecting}
                      >
                        <AnimatePresence mode="wait">
                          {isRedirecting ? (
                            <motion.span
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center justify-center gap-2"
                            >
                              <Loader2 className="h-5 w-5 animate-spin" />
                              {t('login.buttonConnecting')}
                            </motion.span>
                          ) : (
                            <motion.span
                              key="submit"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center justify-center gap-2"
                            >
                              <SparklesIcon className="h-5 w-5" />
                              {t('login.buttonSubmit')}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </form>

                  <motion.div 
                    className="text-center text-sm text-muted-foreground pt-3 border-t border-border/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <p className="leading-relaxed">
                      {t('login.noAccount')}{' '}
                      <Link 
                        href="/kontakt" 
                        className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors inline-flex items-center gap-1"
                      >
                        {t('login.contactUs')}
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
} 