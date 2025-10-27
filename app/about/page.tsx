import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AboutSection } from "@/components/sections/about-section";
import { FoundersWhySection } from "@/components/sections/founders-why-section";
import { TeamQuotesSection } from "@/components/sections/team-quotes-section";
import { CareerCtaSection } from "@/components/sections/career-cta-section";
import { BreadcrumbSEO } from "@/components/ui/breadcrumb-seo";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata = genMeta({
  title: 'Über callflows - KI Telefonie für den Mittelstand',
  description: 'Erfahren Sie mehr über callflows und unser Team. Wir entwickeln KI-Voice-Agents, die Unternehmen bei der Automatisierung ihrer Telefonie unterstützen. Made in Germany.',
  path: '/about',
  keywords: [
    'callflows Team',
    'Über callflows',
    'KI Telefonie Unternehmen',
    'Voice Agent Entwickler',
    'KI Telefonie Deutschland'
  ]
});

export default function AboutPage() {
  return (
    <main className="bg-background">
      <SiteHeader />
      <AboutSection />
      <FoundersWhySection />
      <TeamQuotesSection />
      <CareerCtaSection />
      <SiteFooter />
    </main>
  );
}


