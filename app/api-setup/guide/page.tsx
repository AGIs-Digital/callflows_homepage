"use client";

import { useAuthStore } from "@/lib/auth/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Cloud,
  Search,
  BarChart3,
  Key,
  Settings,
  TestTube,
  BookOpen,
  Phone
} from "lucide-react";
import Link from "next/link";

export default function APISetupGuidePage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/api-setup">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zum Setup
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Google APIs Setup - Detaillierte Anleitung
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Schritt-für-Schritt Anleitung zur Einrichtung der Google APIs für echte SEO-Daten
          </p>
        </div>

        {/* Übersicht */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Übersicht
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Zeitaufwand: ~30 Minuten
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-green-600">
                  Kostenlos
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Echte SEO-Daten
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Diese Anleitung führt Sie durch die Einrichtung der <strong>kostenlosen Google APIs</strong> für echte SEO-Daten in Ihrem Dashboard.
            </p>
          </CardContent>
        </Card>

        {/* Voraussetzungen */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Voraussetzungen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Google Account mit Zugang zu:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Google Cloud Console</li>
                  <li>Google Search Console (mit callflows.de verifiziert)</li>
                  <li>Google Analytics 4 (GA4) Property</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Zugriffsrechte:</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Zugriffsrechte auf die callflows.de Domain
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schritt 1: Google Cloud Projekt */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              Schritt 1: Google Cloud Projekt erstellen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1.1 Cloud Console öffnen</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Gehe zu <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
                  <li>Klicke auf <strong>"Neues Projekt erstellen"</strong></li>
                  <li><strong>Projektname:</strong> callflows-seo-apis</li>
                  <li><strong>Organisation:</strong> (optional)</li>
                  <li>Klicke <strong>"Erstellen"</strong></li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold mb-2">1.2 Projekt auswählen</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Stelle sicher, dass das neue Projekt ausgewählt ist (oben links)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schritt 2: Search Console API */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Schritt 2: Google Search Console API
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">2.1 API aktivieren</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li><strong>Navigation:</strong> APIs & Services → Bibliothek</li>
                  <li><strong>Suche:</strong> "Google Search Console API"</li>
                  <li>Klicke auf <strong>"Google Search Console API"</strong></li>
                  <li>Klicke <strong>"Aktivieren"</strong></li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2.2 API-Key erstellen</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li><strong>Navigation:</strong> APIs & Services → Anmeldedaten</li>
                  <li>Klicke <strong>"+ Anmeldedaten erstellen"</strong></li>
                  <li>Wähle <strong>"API-Schlüssel"</strong></li>
                  <li><strong>Kopiere den API-Key</strong> (sicher aufbewahren!)</li>
                  <li><strong>Optional:</strong> Klicke "Einschränken" für bessere Sicherheit</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2.3 Search Console Domain verifizieren</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Gehe zu <a href="https://search.google.com/search-console/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Search Console</a></li>
                  <li>Klicke <strong>"Property hinzufügen"</strong></li>
                  <li><strong>URL-Präfix:</strong> https://callflows.de</li>
                  <li><strong>Verifizierung:</strong> HTML-Tag, DNS oder Datei-Upload</li>
                  <li>Warte auf die Bestätigung</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schritt 3: Analytics API */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Schritt 3: Google Analytics 4 API
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">3.1 Analytics Reporting API aktivieren</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li><strong>Navigation:</strong> APIs & Services → Bibliothek</li>
                  <li><strong>Suche:</strong> "Google Analytics Reporting API"</li>
                  <li>Klicke <strong>"Aktivieren"</strong></li>
                  <li><strong>Zusätzlich:</strong> Suche "Google Analytics Data API" → <strong>"Aktivieren"</strong></li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3.2 Service Account erstellen (empfohlen)</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li><strong>Navigation:</strong> APIs & Services → Anmeldedaten</li>
                  <li>Klicke <strong>"+ Anmeldedaten erstellen"</strong> → <strong>"Service-Konto"</strong></li>
                  <li><strong>Name:</strong> callflows-analytics-service</li>
                  <li><strong>Beschreibung:</strong> "SEO Dashboard Analytics Access"</li>
                  <li>Klicke <strong>"Erstellen und fortfahren"</strong></li>
                  <li><strong>Rolle:</strong> "Betrachter" → <strong>"Weiter"</strong> → <strong>"Fertig"</strong></li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3.3 Service Account Key herunterladen</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Klicke auf das erstellte Service-Konto</li>
                  <li><strong>Tab:</strong> "Schlüssel"</li>
                  <li>Klicke <strong>"Schlüssel hinzufügen"</strong> → <strong>"Neuen Schlüssel erstellen"</strong></li>
                  <li><strong>Format:</strong> JSON</li>
                  <li><strong>Datei herunterladen</strong> und sicher aufbewahren</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schritt 4: Environment-Variablen */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Schritt 4: Environment-Variablen konfigurieren
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">4.1 .env.local Datei erstellen</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Erstelle eine Datei <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">.env.local</code> im Projektroot:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`# Google Search Console API
GOOGLE_SEARCH_CONSOLE_API_KEY=your-search-console-api-key-here

# Google Analytics 4 API
GOOGLE_ANALYTICS_API_KEY=your-analytics-api-key-here
GA4_PROPERTY_ID=your-ga4-property-id-here

# Optional: Service Account für erweiterte Analytics
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY_HERE\\n-----END PRIVATE KEY-----"`}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schritt 5: APIs testen */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="w-5 h-5" />
              Schritt 5: APIs testen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">5.1 Anwendung neustarten</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <code className="text-sm text-gray-800 dark:text-gray-200">npm run dev</code>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">5.2 Dashboard testen</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Gehe zu <code>http://localhost:3000/login</code></li>
                  <li>Logge dich als Admin ein:
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li><strong>E-Mail:</strong> admin@callflows.de</li>
                      <li><strong>Passwort:</strong> callflows2025</li>
                    </ul>
                  </li>
                  <li>Besuche das SEO-Dashboard</li>
                  <li>Prüfe die <strong>API-Status-Sektion</strong> unten</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fehlerbehebung */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Fehlerbehebung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-red-600">API-Fehler 401 (Unauthorized)</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Problem:</strong> API-Key falsch oder abgelaufen<br />
                  <strong>Lösung:</strong> API-Key in Cloud Console überprüfen
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-red-600">API-Fehler 403 (Forbidden)</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Problem:</strong> API nicht aktiviert oder keine Berechtigung<br />
                  <strong>Lösung:</strong> APIs in Cloud Console aktivieren
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-red-600">Keine Search Console Daten</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Problem:</strong> Domain nicht verifiziert<br />
                  <strong>Lösung:</strong> callflows.de in Search Console hinzufügen
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Bei Problemen:</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li><strong>Browser-Konsole</strong> auf Fehlermeldungen prüfen</li>
                  <li><strong>API-Status</strong> im Dashboard unten kontrollieren</li>
                  <li><strong>Google Cloud Logs</strong> für detaillierte Fehlerinfos</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dokumentation:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li><a href="https://developers.google.com/webmaster-tools/search-console-api-original" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Search Console API</a></li>
                  <li><a href="https://developers.google.com/analytics/devguides/reporting" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics Reporting API</a></li>
                  <li><a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Zurück Button */}
        <div className="text-center">
          <Link href="/api-setup">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zum API Setup
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 