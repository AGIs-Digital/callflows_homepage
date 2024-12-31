import { LegalSection } from "@/components/legal/section";
import { LegalLayout } from "@/components/legal/layout";

export default function DatenschutzPage() {
  return (
    <LegalLayout
      title="Datenschutzerklärung"
      subtitle="Informationen zum Schutz Ihrer persönlichen Daten"
    >
      <LegalSection title="1. Datenschutz auf einen Blick">
            <h3 className="font-medium mb-2">Allgemeine Hinweise</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
            wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
            werden können.
            </p>
            <h3 className="font-medium mb-2">Datenerfassung auf dieser Website</h3>
            <p className="text-gray-600 dark:text-gray-300">
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem 
            Impressum dieser Website entnehmen.
            </p>
      </LegalSection>

      <LegalSection title="2. Hosting und Content Delivery Networks (CDN)">
            <p className="text-gray-600 dark:text-gray-300">
            Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser 
            Website erfasst werden, werden auf den Servern des Hosters gespeichert.
            </p>
      </LegalSection>

      <LegalSection title="3. Allgemeine Hinweise und Pflichtinformationen">
            <h3 className="font-medium mb-2">Datenschutz</h3>
            <p className="text-gray-600 dark:text-gray-300">
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
            personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser 
            Datenschutzerklärung.
            </p>
      </LegalSection>
    </LegalLayout>
  );
}