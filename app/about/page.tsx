import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AboutSection } from "@/components/sections/about-section";
import { FoundersWhySection } from "@/components/sections/founders-why-section";
import { TeamQuotesSection } from "@/components/sections/team-quotes-section";

export default function AboutPage() {
  return (
    <main className="bg-background">
      <SiteHeader />
      <AboutSection />
      <FoundersWhySection />
      <TeamQuotesSection />
      <SiteFooter />
    </main>
  );
}


