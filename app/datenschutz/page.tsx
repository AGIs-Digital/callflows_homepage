import { LegalSection } from "@/components/legal/section";
import { LegalLayout } from "@/components/legal/layout";
import { generateMetadata } from "@/lib/seo/metadata";

export const metadata = generateMetadata({
  title: "Datenschutzerklärung - Schutz Ihrer Daten",
  description: "Informationen zum Schutz Ihrer persönlichen Daten bei der Nutzung unserer KI-gestützten Voice Agents und automatisierten Kundenkommunikation.",
  path: "/datenschutz",
  keywords: [
    "callflows Datenschutz", 
    "KI Telefonie Datenschutz", 
    "Voice Agent Datensicherheit", 
    "DSGVO KI Sprachassistent",
    "Datenschutz automatisierte Telefonie"
  ]
});

export default function DatenschutzPage() {
  return (
    <LegalLayout
      title="Datenschutzerklärung"
      subtitle="Informationen zum Schutz Ihrer persönlichen Daten"
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-muted-foreground mb-8">
          Der Schutz Ihrer persönlichen Daten hat für callflows höchste Priorität. Hier erfahren Sie, wie wir mit Ihren Daten umgehen und welche Rechte Sie haben.
        </p>
        
        <LegalSection title="1. Verantwortlicher">
          <p className="text-gray-600 dark:text-gray-300">
            Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br /><br />
            callflows Abeln Goltz GbR<br />
            Adalbert-Stifter Straße 14<br />
            30655 Hannover<br />
            E-Mail: info@callflows.de
          </p>
        </LegalSection>

        <LegalSection title="2. Datenerfassung und -verwendung">
          <p className="text-gray-600 dark:text-gray-300">
            Wir erfassen verschiedene Arten von Informationen für verschiedene Zwecke, um unseren Service bereitzustellen und zu verbessern.
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">2.1 Personenbezogene Daten</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Während der Nutzung unseres Services können wir Sie bitten, uns bestimmte personenbezogene Daten mitzuteilen, die zur Kontaktaufnahme oder Identifizierung verwendet werden können ("Personenbezogene Daten"). Zu den personenbezogenen Daten können unter anderem folgende Informationen gehören:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300">
            <li>E-Mail-Adresse</li>
            <li>Vor- und Nachname</li>
            <li>Telefonnummer</li>
            <li>Firmenname</li>
            <li>Adresse</li>
            <li>Cookies und Nutzungsdaten</li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Welche Daten erfassen wir?">
          <p className="text-gray-600 dark:text-gray-300">
            Wir erfassen und verarbeiten personenbezogene Daten nur im notwendigen Umfang. Dies umfasst:<br /><br />
            • Direkt vom Kunden bereitgestellte Daten: Name, E-Mail-Adresse, Telefonnummer<br /><br />
            • Daten aus der Nutzung unseres Dienstes: Gesprächsprotokolle, Transkriptionen (sofern vom Kunden aktiviert)<br /><br />
            • Daten aus der ersten Kontaktaufnahme: Falls ein potenzieller Kunde Interesse an unseren Diensten hat, kann ein Video-Call zur Besprechung der Anforderungen durchgeführt werden. Dieses Gespräch wird aufgezeichnet und spätestens nach 30 Tagen oder mit Live-Schaltung des Agenten gelöscht. Die Aufzeichnung erfolgt nur mit vorheriger ausdrücklicher Einwilligung des Kunden.<br /><br />
            • Automatisch erfasste Daten: IP-Adresse, Browserinformationen (für die Website-Optimierung), Cookies
          </p>
        </LegalSection>

        <LegalSection title="4. Zweck der Datenverarbeitung">
          <p className="text-gray-600 dark:text-gray-300">
            Wir verarbeiten personenbezogene Daten ausschließlich zu folgenden Zwecken:<br /><br />
            • Erstellung, Bereitstellung und Verbesserung der Voice-Agenten<br />
            • Kundenkommunikation und Support<br />
            • Abrechnung und Zahlungsabwicklung (via Stripe)<br />
            • Sicherstellung und Optimierung der Servicequalität<br />
            • Einhaltung gesetzlicher Verpflichtungen
          </p>
        </LegalSection>

        <LegalSection title="5. Weitergabe an Dritte">
          <p className="text-gray-600 dark:text-gray-300">
            Wir geben personenbezogene Daten nicht an unbeteiligte Dritte weiter. Allerdings arbeiten wir mit folgenden Drittanbietern, die für die Erbringung unseres Dienstes erforderlich sind:<br /><br />
            • Synthflow AI (Plattform für Voice-Agenten, Whitelabel-Lösung)<br />
            • Stripe (Zahlungsabwicklung)<br />
            • Hosting-Anbieter (Serverstandort innerhalb der EU)<br /><br />
            Mit diesen Dienstleistern bestehen entsprechende Auftragsverarbeitungsverträge (AVV), um die Einhaltung der DSGVO zu gewährleisten.
          </p>
        </LegalSection>

        <LegalSection title="6. Speicherdauer & Löschung von Daten">
          <p className="text-gray-600 dark:text-gray-300">
            • Kundenbezogene Daten werden so lange gespeichert, wie ein aktives Vertragsverhältnis besteht.<br /><br />
            • Bei einer Kündigung des Abonnements werden alle personenbezogenen Daten gelöscht, sofern keine gesetzliche Aufbewahrungspflicht entgegensteht.<br /><br />
            • Falls der Kunde einer weiteren Speicherung für zukünftige Angebote zustimmt, können Kontaktdaten weiterhin gespeichert werden.<br /><br />
            • Aufzeichnungen aus Erstgesprächen werden spätestens nach 30 Tagen gelöscht.
          </p>
        </LegalSection>

        <LegalSection title="7. Rechte der Nutzer gemäß DSGVO">
          <p className="text-gray-600 dark:text-gray-300">
            Nutzer haben folgende Rechte hinsichtlich ihrer personenbezogenen Daten:<br /><br />
            • Recht auf Auskunft (Art. 15 DSGVO): Welche Daten speichern wir?<br />
            • Recht auf Berichtigung (Art. 16 DSGVO): Korrektur unrichtiger Daten<br />
            • Recht auf Löschung (Art. 17 DSGVO): Daten löschen lassen<br />
            • Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)<br />
            • Recht auf Datenübertragbarkeit (Art. 20 DSGVO)<br />
            • Recht auf Widerspruch gegen bestimmte Verarbeitungen (Art. 21 DSGVO)<br /><br />
            Anfragen können jederzeit an info@callflows.de gestellt werden.
          </p>
        </LegalSection>

        <LegalSection title="8. Cookies & Tracking-Technologien">
          <p className="text-gray-600 dark:text-gray-300">
            • Unsere Website verwendet Cookies, um das Nutzungserlebnis zu verbessern.<br /><br />
            • Beim ersten Besuch der Website erscheint ein Cookie-Banner, das den Nutzer fragt, ob er der Verwendung von Cookies zustimmt oder diese ablehnt.<br /><br />
            • Es werden keine personenbezogenen Cookies gespeichert oder ausgewertet, es sei denn, der Nutzer gibt seine Einwilligung.<br /><br />
            • Falls Analysetools (z. B. Google Analytics, Facebook Pixel) verwendet werden, erfolgt dies nur mit Einwilligung.
          </p>
        </LegalSection>

        <LegalSection title="9. Datensicherheit">
          <p className="text-gray-600 dark:text-gray-300">
            Wir setzen technische und organisatorische Maßnahmen (TOMs) ein, um personenbezogene Daten zu schützen:<br /><br />
            • SSL-Verschlüsselung für sichere Datenübertragung<br />
            • Firewall- und Zugriffskontrollen<br />
            • Passwortschutz und Zwei-Faktor-Authentifizierung (2FA)<br />
            • Eingeschränkte Zugriffsrechte für Mitarbeiter<br />
            • Speicherung auf sicheren Servern innerhalb der EU
          </p>
        </LegalSection>

        <LegalSection title="10. Internationale Datenübermittlung">
          <p className="text-gray-600 dark:text-gray-300">
            • Alle Daten werden ausschließlich innerhalb der EU gespeichert.<br />
            • Es findet keine Übermittlung in Drittländer (z. B. USA) statt.
          </p>
        </LegalSection>

        <LegalSection title="11. Änderungen der Datenschutzerklärung">
          <p className="text-gray-600 dark:text-gray-300">
            Wir behalten uns das Recht vor, diese Datenschutzerklärung zu ändern. Nutzer werden mindestens 14 Tage vor Inkrafttreten per E-Mail oder auf unserer Website informiert.
          </p>
        </LegalSection>

        <LegalSection title="12. Kontakt für Datenschutzanfragen">
          <p className="text-gray-600 dark:text-gray-300">
            Für Datenschutzanfragen oder Ausübung der Nutzerrechte kontaktieren Sie uns unter:<br /><br />
            callflows Abeln Goltz GbR<br />
            E-Mail: info@callflows.de<br />
            Adresse: Adalbert-Stifter Straße 14, 30655 Hannover
          </p>
        </LegalSection>

        <LegalSection title="3. Datensicherheit bei KI Voice Agents">
          <p className="text-gray-600 dark:text-gray-300">
            Bei der Nutzung unserer KI Voice Agents werden Gesprächsdaten verarbeitet, um den Service bereitzustellen. Wir legen größten Wert auf die Sicherheit dieser Daten:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300">
            <li>Alle Gespräche werden verschlüsselt übertragen und gespeichert</li>
            <li>Gesprächsdaten werden ausschließlich auf Servern innerhalb der EU verarbeitet</li>
            <li>Zugriff auf Gesprächsdaten haben nur autorisierte Mitarbeiter</li>
            <li>Gesprächsdaten werden nur so lange gespeichert, wie es für die Bereitstellung des Services notwendig ist</li>
            <li>Auf Wunsch können Gesprächsdaten jederzeit gelöscht werden</li>
          </ul>
        </LegalSection>
      </div>
    </LegalLayout>
  );
}