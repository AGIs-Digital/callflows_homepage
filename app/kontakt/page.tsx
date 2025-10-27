import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactPageContent } from "./contact-page-content";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata = genMeta({
  title: 'Kontakt - Beratung zu KI-Telefonie und Voice Agents',
  description: 'Kontaktieren Sie callflows für eine kostenlose Beratung zu KI-Telefonie und Voice Agents. Wir helfen Ihnen bei der Automatisierung Ihrer Kundenkommunikation. Jetzt Termin vereinbaren!',
  path: '/kontakt',
  keywords: [
    'KI Telefonie Beratung',
    'Voice Agent Beratung',
    'KI Telefonie Kontakt',
    'Automatisierte Telefonie Demo',
    'KI Kundenservice Termin'
  ]
});

export default function KontaktPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-secondary/20 via-primary/15 to-primary/25 flex flex-col">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-tertiary rounded-full blur-2xl"></div>
        </div>

        <SiteHeader />
        
        {/* Main Content */}
        <ContactPageContent />
        
        <SiteFooter />
      </div>
    </>
  );
} 