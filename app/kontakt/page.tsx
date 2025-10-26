"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { BookingButton } from "@/components/booking/booking-button";
import { useI18n } from "@/lib/i18n";
import { Mail, Phone, MapPin, MessageSquare, Calendar } from "lucide-react";
import { BreadcrumbSEO } from "@/components/ui/breadcrumb-seo";
import Head from "next/head";

export default function KontaktPage() {
  const { t } = useI18n();
  
  return (
    <>
      <Head>
        <title>Kontakt - Beratung zu KI-Telefonie und Voice Agents | callflows</title>
        <meta name="description" content="Kontaktieren Sie callflows für eine kostenlose Beratung zu KI-Telefonie und Voice Agents. Wir helfen Ihnen bei der Automatisierung Ihrer Kundenkommunikation. Jetzt Termin vereinbaren!" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-secondary/20 via-primary/15 to-primary/25 flex flex-col">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-tertiary rounded-full blur-2xl"></div>
        </div>

        <SiteHeader />
        
        {/* Main Content */}
        <main className="flex-1 relative z-10">
          <div className="container max-w-6xl py-12 md:py-20">
            {/* Breadcrumbs */}
            <BreadcrumbSEO 
              items={[
                { name: "Kontakt", url: "https://callflows.de/kontakt" }
              ]}
            />
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6">
                {t('contact.pageTitle')}
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('contactPage.heroSubtitle')}
              </p>
            </div>
            
            {/* Contact Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Contact Form Card */}
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-8 hover:bg-card/80 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{t('contact.formTitle')}</h2>
                    <p className="text-muted-foreground">{t('contactPage.formSubtitle')}</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t('contact.formDescription')}
                </p>
                
                <ContactForm source="contact" />
              </div>
              
              {/* Booking Card */}
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-8 hover:bg-card/80 hover:border-accent/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{t('contact.appointmentTitle')}</h2>
                    <p className="text-muted-foreground">{t('contactPage.appointmentSubtitle')}</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {t('contact.appointmentDescription')}
                </p>
                
                <BookingButton 
                  buttonText={t('contact.bookingButton')} 
                  className="w-full bg-[#FFB703] hover:bg-[#FFB703]/90 text-white font-semibold py-3 mb-8 transition-all duration-300 hover:scale-105"
                  bookingUrl="https://outlook.office.com/book/booking@callflows.de/?ismsaljsauthenabled"
                />
                
                {/* Contact Information */}
                <div className="bg-background/30 backdrop-blur-sm rounded-xl border border-border/30 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {t('contact.contactDataTitle')}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div className="text-sm text-muted-foreground">
                        <div className="font-medium text-foreground">{t('contact.company')}</div>
                        <div>{t('contact.address')}</div>
                        <div>{t('contact.city')}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <a href={`mailto:${t('contact.email')}`} className="text-sm text-primary hover:text-primary/80 transition-colors">
                        {t('contact.email')}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <a href={`tel:${t('contact.phone')}`} className="text-sm text-primary hover:text-primary/80 transition-colors">
                        {t('contact.phone')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional CTA Section */}
            <div className="text-center">
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t('contactPage.additionalCta.title')}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t('contactPage.additionalCta.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a href="/pricing">
                      {t('contactPage.additionalCta.pricesButton')}
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-primary/20 text-primary hover:bg-primary/5 font-semibold px-6 py-3 transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a href="/faq">
                      {t('contactPage.additionalCta.faqButton')}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <SiteFooter />
      </div>
    </>
  );
} 