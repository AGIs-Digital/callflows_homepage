import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LegalSection } from "./components/legal-section";
import { ContactInfo } from "./components/contact-info";
import { CompanyInfo } from "./components/company-info";

export default function ImpressumPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">Impressum</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Rechtliche Informationen und Kontaktdaten
          </p>
        </div>
        
        <div className="space-y-8">
          <LegalSection title="Angaben gemäß § 5 TMG">
            <CompanyInfo />
          </LegalSection>

          <LegalSection title="Kontakt">
            <ContactInfo />
          </LegalSection>

          <LegalSection title="Umsatzsteuer-ID">
            <p className="text-gray-600 dark:text-gray-300">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              25/235/00307
            </p>
          </LegalSection>

          <LegalSection title="EU-Streitschlichtung">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              </p>
              <a 
                href="https://ec.europa.eu/consumers/odr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              <p className="text-gray-600 dark:text-gray-300">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>
          </LegalSection>

          <LegalSection title="Verbraucherstreitbeilegung">
            <p className="text-gray-600 dark:text-gray-300">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </LegalSection>

          <LegalSection title="Zentrale Kontaktstelle (DSA)">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Unsere zentrale Kontaktstelle für Nutzer und Behörden nach Art. 11, 12 DSA erreichen Sie wie folgt:
              </p>
              <ContactInfo />
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                Die für den Kontakt zur Verfügung stehenden Sprachen sind: Deutsch, Englisch.
              </p>
            </div>
          </LegalSection>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}