"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  ExternalLink,
  Database,
  Key,
  Clock
} from "lucide-react";

interface DataSourceStatus {
  name: string;
  status: 'active' | 'fallback' | 'inactive';
  description: string;
  cost: string;
  setupUrl?: string;
}

export function SEODashboardInfo() {
  const [dataSources, setDataSources] = useState<DataSourceStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkDataSources();
  }, []);

  const checkDataSources = async () => {
    setLoading(true);
    
    // Prüfe verfügbare APIs
    const sources: DataSourceStatus[] = [
      {
        name: 'Google Search Console',
        status: process.env.GOOGLE_SEARCH_CONSOLE_API_KEY ? 'active' : 'fallback',
        description: 'Clicks, Impressions, CTR, durchschnittliche Position',
        cost: 'Kostenlos',
        setupUrl: 'https://console.cloud.google.com/'
      },
      {
        name: 'Google Analytics 4',
        status: process.env.GOOGLE_ANALYTICS_API_KEY ? 'active' : 'fallback',
        description: 'Sessions, Nutzer, Traffic-Entwicklung',
        cost: 'Kostenlos',
        setupUrl: 'https://console.cloud.google.com/'
      },

    ];

    setDataSources(sources);
    setLoading(false);
  };

  const getStatusIcon = (status: DataSourceStatus['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'fallback':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: DataSourceStatus['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="text-green-600 border-green-200">Echte Daten</Badge>;
      case 'fallback':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Mock-Daten</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-red-600 border-red-200">Nicht aktiv</Badge>;
    }
  };

  const getStatusDescription = (status: DataSourceStatus['status']) => {
    switch (status) {
      case 'active':
        return 'API konfiguriert - verwendet echte Daten';
      case 'fallback':
        return 'API nicht konfiguriert - verwendet realistische Mock-Daten';
      case 'inactive':
        return 'API nicht konfiguriert - keine Daten verfügbar';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Datenquellen-Status
          </CardTitle>
          <CardDescription>Prüfe verfügbare APIs...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Datenquellen-Status
        </CardTitle>
        <CardDescription>
          Übersicht der verfügbaren APIs und Datenquellen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dataSources.map((source, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(source.status)}
                    <h3 className="font-semibold">{source.name}</h3>
                    {getStatusBadge(source.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {source.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {getStatusDescription(source.status)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {source.cost}
                  </Badge>
                  {source.setupUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="h-7 text-xs"
                    >
                      <a href={source.setupUrl} target="_blank" rel="noopener noreferrer">
                        Setup <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zusammenfassung */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Key className="w-4 h-4 text-blue-600" />
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">
              API-Konfiguration
            </h4>
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
            Erstelle eine <code>.env.local</code> Datei mit deinen API-Keys für echte Daten.
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-blue-700 border-blue-200 hover:bg-blue-100"
            >
              <a href="/api-setup">
                API Setup Wizard
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-blue-700 border-blue-200 hover:bg-blue-100"
            >
              <a href="/api-setup/guide" target="_blank">
                Detaillierte Anleitung <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          </div>
        </div>

        {/* Letzte Aktualisierung */}
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          Letzte Prüfung: {new Date().toLocaleString('de-DE')}
        </div>
      </CardContent>
    </Card>
  );
} 