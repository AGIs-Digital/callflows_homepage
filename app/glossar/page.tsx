import { GlossarContent } from "./glossar-content";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata = genMeta({
  title: 'Glossar: KI-callflow, Voice Agent & Co.',
  description: 'Was ist ein KI-callflow? Wie unterscheidet er sich von einem Voice Agent? Alle Begriffe rund um KI-Telefonie, automatisierte Anrufe und Voice Bots verständlich erklärt.',
  path: '/glossar',
  keywords: [
    'KI-callflow',
    'Voice Agent Definition',
    'KI Telefonie Begriffe',
    'Glossar automatisierte Telefonie',
    'Callflow Erklärung'
  ]
});

export default function GlossarIndex() {
  return <GlossarContent />;
}
