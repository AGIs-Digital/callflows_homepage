import { DatenschutzContent } from "./datenschutz-content";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata = genMeta({
  title: 'Datenschutz bei KI-Telefonie und Voice Agents',
  description: 'Erfahren Sie, wie callflows Datenschutz und DSGVO-Konformität bei KI-Telefonie gewährleistet. Alle Informationen zu Datenverarbeitung, Speicherung und Ihren Rechten.',
  path: '/datenschutz',
  keywords: [
    'Datenschutz KI Telefonie',
    'DSGVO Voice Agent',
    'Datenschutz Voice Bot',
    'KI Telefonie DSGVO',
    'Datenschutz automatisierte Telefonie'
  ]
});

export default function DatenschutzPage() {
  return <DatenschutzContent />;
}