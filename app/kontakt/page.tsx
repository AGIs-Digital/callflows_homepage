import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function KontaktPage() {
  return (
    <main className="bg-background">
      <SiteHeader />
      <div className="container max-w-4xl py-16 md:py-24">
        <h1 className="text-4xl font-bold mb-8">Kontakt</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Kontaktieren Sie uns</h2>
            <p className="text-muted-foreground mb-6">
              Haben Sie Fragen zu unseren KI Voice Agents? Wir helfen Ihnen gerne weiter.
            </p>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <Input id="name" placeholder="Ihr Name" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">E-Mail</label>
                <Input id="email" type="email" placeholder="ihre-email@beispiel.de" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Nachricht</label>
                <Textarea id="message" placeholder="Wie können wir Ihnen helfen?" rows={5} />
              </div>
              
              <Button type="submit" className="w-full">Nachricht senden</Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Beratungstermin buchen</h2>
            <p className="text-muted-foreground mb-6">
              Vereinbaren Sie einen Termin für eine persönliche Beratung zu unseren KI Voice Agents.
            </p>
            
            <Link href="https://cal.com/callflows/beratung" target="_blank">
              <Button className="w-full mb-8">Termin buchen</Button>
            </Link>
            
            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold mb-2">Kontaktdaten</h3>
              <p className="text-muted-foreground">
                callflows Abeln Goltz GbR<br />
                Adalbert-Stifter Straße 14<br />
                30655 Hannover<br /><br />
                E-Mail: info@callflows.de<br />
                Telefon: +49-155-60106486
              </p>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
} 