import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function KontaktPage() {
  return (
    <>
      <SiteHeader />
      <main className="py-16">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">Kontaktieren Sie uns</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Wir sind hier, um Ihnen bei allen Fragen zu helfen
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="grid gap-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/20 dark:bg-secondary/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Musterstraße 123<br />
                      12345 Berlin
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/20 dark:bg-secondary/10 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <p className="text-gray-600 dark:text-gray-300">+49 (0) 123 456789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/20 dark:bg-secondary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">E-Mail</h3>
                    <p className="text-gray-600 dark:text-gray-300">info@callflows.de</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/20 dark:bg-secondary/10 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Öffnungszeiten</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Mo-Fr: 9:00 - 17:00 Uhr<br />
                      Sa-So: Geschlossen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}