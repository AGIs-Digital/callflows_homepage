import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function ImpressumPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16">
        <h1 className="text-4xl font-bold mb-8">Impressum</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            Callflows GmbH<br />
            Musterstraße 123<br />
            12345 Berlin
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: +49 (0) 123 456789<br />
            E-Mail: info@callflows.de
          </p>

          <h2>Registereintrag</h2>
          <p>
            Eintragung im Handelsregister.<br />
            Registergericht: Amtsgericht Berlin<br />
            Registernummer: HRB 123456
          </p>

          <h2>Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            DE 123456789
          </p>

          <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            Max Mustermann<br />
            Musterstraße 123<br />
            12345 Berlin
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}