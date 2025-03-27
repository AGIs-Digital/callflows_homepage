import { LegalSection } from "@/components/legal/section";
import { LegalLayout } from "@/components/legal/layout";
import { ContactInfo } from "./components/contact-info";
import { CompanyInfo } from "./components/company-info";
import { generateMetadata } from "@/lib/seo/metadata";

export const metadata = generateMetadata({
  title: "Impressum - Rechtliche Informationen",
  description: "Rechtliche Informationen und Kontaktdaten der callflows GbR, Anbieter von KI-gestützten Voice Agents für automatisierte Telefonkommunikation.",
  path: "/impressum",
  keywords: [
    "callflows Impressum", 
    "callflows Kontakt", 
    "KI Telefonie Anbieter", 
    "Voice Agent Unternehmen",
    "Telefon KI Kontakt"
  ]
});

export default function ImpressumPage() {
  return (
    <LegalLayout 
      title="Impressum"
      subtitle="Rechtliche Informationen und Kontaktdaten"
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-muted-foreground mb-8">
          Hier finden Sie alle rechtlich relevanten Informationen zu callflows, Ihrem Anbieter für KI-gestützte Voice Agents und automatisierte Telefonkommunikation.
        </p>
        
        <LegalSection title="Angaben gemäß § 5 TMG">
          <CompanyInfo />
        </LegalSection>

        <LegalSection title="Kontakt">
          <ContactInfo />
        </LegalSection>

        <LegalSection title="Umsatzsteuer-Identifikationsnummer">
          <p className="text-gray-600 dark:text-gray-300">
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
            DE423151940
          </p>
        </LegalSection>

        <LegalSection title="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV">
          <p className="text-gray-600 dark:text-gray-300">
            Tom Abeln, Timo Goltz<br />
            Adalbert-Stifter Straße 14<br />
            30655 Hannover<br />
            Deutschland
          </p>
        </LegalSection>
        
        <LegalSection title="Streitschlichtung">
          <p className="text-gray-600 dark:text-gray-300">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://ec.europa.eu/consumers/odr/
            </a>
            <br /><br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </LegalSection>
        
        <LegalSection title="Haftung für Inhalte">
          <p className="text-gray-600 dark:text-gray-300">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </LegalSection>
      </div>
    </LegalLayout>
  );
}