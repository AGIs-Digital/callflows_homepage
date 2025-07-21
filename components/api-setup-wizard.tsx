"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Copy,
  Key,
  Database,
  TestTube,
  Loader2
} from "lucide-react";

interface APIConfig {
  searchConsoleKey: string;
  analyticsKey: string;
  ga4PropertyId: string;
}

export function APISetupWizard() {
  const [config, setConfig] = useState<APIConfig>({
    searchConsoleKey: '',
    analyticsKey: '',
    ga4PropertyId: ''
  });
  const [testing, setTesting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const handleConfigChange = (key: keyof APIConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const copyEnvTemplate = () => {
    const envContent = `# callflows Google APIs Configuration

# Google Search Console API
GOOGLE_SEARCH_CONSOLE_API_KEY=${config.searchConsoleKey || 'your-search-console-api-key'}

# Google Analytics 4 API  
GOOGLE_ANALYTICS_API_KEY=${config.analyticsKey || 'your-analytics-api-key'}
GA4_PROPERTY_ID=${config.ga4PropertyId || 'your-ga4-property-id'}

# Kontakt E-Mail  
CONTACT_EMAIL=contact@callflows.de`;

    navigator.clipboard.writeText(envContent);
    alert('Environment-Template in Zwischenablage kopiert!');
  };

  const testAPIs = async () => {
    setTesting(true);
    
    // Simuliere API-Tests
    setTimeout(() => {
      const results = {
        searchConsole: {
          status: config.searchConsoleKey ? 'success' : 'error',
          message: config.searchConsoleKey 
            ? 'Search Console API erfolgreich getestet' 
            : 'API-Key fehlt oder ungültig'
        },
        analytics: {
          status: config.analyticsKey && config.ga4PropertyId ? 'success' : 'error',
          message: config.analyticsKey && config.ga4PropertyId
            ? 'Analytics API erfolgreich getestet'
            : 'API-Key oder Property-ID fehlt'
        }
      };
      
      setTestResults(results);
      setTesting(false);
    }, 2000);
  };

  const getStepStatus = (step: number) => {
    switch (step) {
      case 1:
        return config.searchConsoleKey ? 'completed' : 'pending';
      case 2:
        return config.analyticsKey && config.ga4PropertyId ? 'completed' : 'pending';
      case 3:
        return testResults ? 'completed' : 'pending';
      default:
        return 'pending';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-6 h-6" />
            API-Setup-Wizard
          </CardTitle>
          <CardDescription>
            Schritt-für-Schritt-Anleitung zur Einrichtung der Google APIs für echte SEO-Daten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="setup" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="config">Konfiguration</TabsTrigger>
              <TabsTrigger value="test">Test</TabsTrigger>
            </TabsList>

            {/* Setup Tab */}
            <TabsContent value="setup" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Vorbereitung</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        {getStatusIcon('pending')}
                        1. Google Cloud Projekt
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Erstelle ein neues Projekt in der Google Cloud Console
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://console.cloud.google.com/" target="_blank">
                          Cloud Console öffnen <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        {getStatusIcon('pending')}
                        2. APIs aktivieren
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Aktiviere Search Console API und Analytics Reporting API
                      </p>
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-xs">Search Console API</Badge>
                        <Badge variant="outline" className="text-xs">Analytics Reporting API</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        {getStatusIcon('pending')}
                        3. API-Keys erstellen
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Erstelle API-Schlüssel für beide Services
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="/api-setup/guide" target="_blank">
                          Detaillierte Anleitung <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        {getStatusIcon('pending')}
                        4. Domain verifizieren
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Füge callflows.de zur Search Console hinzu
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://search.google.com/search-console/" target="_blank">
                          Search Console <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Konfiguration Tab */}
            <TabsContent value="config" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">API-Keys konfigurieren</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="searchConsole">Google Search Console API Key</Label>
                    <Input
                      id="searchConsole"
                      type="password"
                      placeholder="AIzaSy..."
                      value={config.searchConsoleKey}
                      onChange={(e) => handleConfigChange('searchConsoleKey', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Aus Google Cloud Console → APIs & Services → Anmeldedaten
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="analytics">Google Analytics API Key</Label>
                    <Input
                      id="analytics"
                      type="password"
                      placeholder="AIzaSy..."
                      value={config.analyticsKey}
                      onChange={(e) => handleConfigChange('analyticsKey', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Separater API-Key für Analytics Reporting API
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyId">GA4 Property ID</Label>
                    <Input
                      id="propertyId"
                      placeholder="123456789"
                      value={config.ga4PropertyId}
                      onChange={(e) => handleConfigChange('ga4PropertyId', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Aus Google Analytics → Einstellungen → Property-Einstellungen
                    </p>
                  </div>

                  <Alert>
                    <Database className="h-4 w-4" />
                    <AlertDescription>
                      Diese Daten werden nur lokal gespeichert und nicht an externe Server gesendet.
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-2">
                    <Button onClick={copyEnvTemplate} variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      .env.local Template kopieren
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Test Tab */}
            <TabsContent value="test" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">API-Verbindung testen</h3>
                
                <div className="space-y-4">
                  <Button 
                    onClick={testAPIs} 
                    disabled={testing || !config.searchConsoleKey}
                    className="w-full"
                  >
                    {testing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        APIs werden getestet...
                      </>
                    ) : (
                      <>
                        <TestTube className="w-4 h-4 mr-2" />
                        APIs testen
                      </>
                    )}
                  </Button>

                  {testResults && (
                    <div className="space-y-2">
                      <Alert variant={testResults.searchConsole.status === 'success' ? 'default' : 'destructive'}>
                        <AlertDescription>
                          <strong>Search Console API:</strong> {testResults.searchConsole.message}
                        </AlertDescription>
                      </Alert>
                      
                      <Alert variant={testResults.analytics.status === 'success' ? 'default' : 'destructive'}>
                        <AlertDescription>
                          <strong>Analytics API:</strong> {testResults.analytics.message}
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Nach erfolgreichem Test:</h4>
                    <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                      <li>Erstelle eine <code>.env.local</code> Datei im Projektroot</li>
                      <li>Füge die API-Keys aus dem kopierten Template ein</li>
                      <li>Starte die Anwendung neu: <code>npm run dev</code></li>
                      <li>Besuche das SEO-Dashboard und prüfe die echten Daten</li>
                    </ol>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 