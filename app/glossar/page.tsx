import Link from "next/link";
import Head from "next/head";

export default function GlossarIndex() {
  return (
    <>
      <Head>
        <title>Glossar | KI‑callflows & Terminologie</title>
        <meta name="description" content="Glossar zu KI‑callflows: Begriffe, Unterschiede zu klassischen Callflows und Voice Agents, Integrationen und Monitoring." />
      </Head>
      <main className="container max-w-6xl py-16 bg-gradient-to-b from-secondary/30 via-accent/20 to-accent/35">
        <h1 className="text-3xl font-bold mb-6">Glossar</h1>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link className="text-primary underline" href="/glossar/ki-callflow">KI‑callflow</Link>
          </li>
        </ul>
      </main>
    </>
  );
}


