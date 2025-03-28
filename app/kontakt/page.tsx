import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalEmbed } from "@/components/booking/cal-embed";

export default function KontaktPage() {
  return (
    <main className="bg-background">
      <SiteHeader />
      <div className="container max-w-4xl py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Kontakt</h1>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Kontaktieren Sie uns</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
              Haben Sie Fragen zu unseren KI Voice Agents? Wir helfen Ihnen gerne weiter.
            </p>
            
            <form className="space-y-3 md:space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <Input id="name" placeholder="Ihr Name" className="h-9 md:h-10" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">E-Mail</label>
                <Input id="email" type="email" placeholder="ihre-email@beispiel.de" className="h-9 md:h-10" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Nachricht</label>
                <Textarea 
                  id="message" 
                  placeholder="Wie können wir Ihnen helfen?" 
                  rows={1} 
                  className="min-h-[60px] md:min-h-[80px]" 
                />
              </div>
              
              <Button type="submit" className="w-full h-9 md:h-10">Nachricht senden</Button>
            </form>
          </div>
          
          <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border flex flex-col justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Beratungstermin buchen</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                Vereinbaren Sie einen Termin für eine persönliche Beratung zu unseren KI Voice Agents.
              </p>
              
              <CalEmbed 
                buttonText="Termin buchen" 
                className="w-full mb-4 md:mb-8 h-9 md:h-10"
              />
            </div>
            
            <div className="border-t pt-4 md:pt-6 mt-auto">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Kontaktdaten</h3>
              <p className="text-sm md:text-base text-muted-foreground">
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