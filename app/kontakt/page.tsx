"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ZohoEmbed } from "@/components/booking/zoho-embed";
import { useI18n } from "@/lib/i18n";
import Head from "next/head";

export default function KontaktPage() {
  const { t } = useI18n();
  
  return (
    <>
      <Head>
        <title>Kontakt - Beratung zu KI-Telefonie und Voice Agents | callflows</title>
        <meta name="description" content="Kontaktieren Sie callflows für eine kostenlose Beratung zu KI-Telefonie und Voice Agents. Wir helfen Ihnen bei der Automatisierung Ihrer Kundenkommunikation. Jetzt Termin vereinbaren!" />
      </Head>
      <main className="bg-background">
      <SiteHeader />
      <div className="container max-w-4xl py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">{t('contact.pageTitle')}</h1>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{t('contact.formTitle')}</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
              {t('contact.formDescription')}
            </p>
            
            <form className="space-y-3 md:space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 md:mb-2">{t('contact.nameLabel')}</label>
                <Input id="name" placeholder={t('contact.namePlaceholder')} className="h-8 md:h-10" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 md:mb-2">{t('contact.emailLabel')}</label>
                <Input id="email" type="email" placeholder={t('contact.emailPlaceholder')} className="h-8 md:h-10" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 md:mb-2">{t('contact.messageLabel')}</label>
                <Textarea id="message" placeholder={t('contact.messagePlaceholder')} rows={4} />
              </div>
              <Button type="submit" className="w-full h-8 md:h-10">{t('contact.sendButton')}</Button>
            </form>
          </div>
          
          <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border flex flex-col justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{t('contact.appointmentTitle')}</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                {t('contact.appointmentDescription')}
              </p>
              
              <ZohoEmbed 
                buttonText={t('contact.bookingButton')} 
                className="w-full mb-4 md:mb-8 h-9 md:h-10"
              />
            </div>
            
            <div className="border-t pt-4 md:pt-6 mt-auto">
              <h3 className="text-lg md:text-xl font-semibold mb-2">{t('contact.contactDataTitle')}</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {t('contact.company')}<br />
                {t('contact.address')}<br />
                {t('contact.city')}<br /><br />
                E-Mail: {t('contact.email')}<br />
                Telefon: {t('contact.phone')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
    </>
  );
} 