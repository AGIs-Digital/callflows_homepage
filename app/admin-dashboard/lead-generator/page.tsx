"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Search, Download, AlertCircle, Shield, ArrowLeft, Edit, Check, X } from "lucide-react";
import { SearchResult, LeadSearchConfig } from "@/lib/types/lead-scraping";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/lib/auth/auth-store";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DashboardNav } from "@/components/dashboard-nav";
import Link from "next/link";

export default function LeadGeneratorPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [config, setConfig] = useState<LeadSearchConfig>({
    query: "Friseur Hannover"
  });
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [editableResults, setEditableResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [editingPhone, setEditingPhone] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 100;
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'admin') {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  const handleSearch = async () => {
    if (!config.query.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie eine Suchanfrage ein.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setResults([]);
    setEditableResults([]);
    setErrors([]);
    setCurrentPage(1);

    try {
      // Immer Vercel API verwenden (auch auf localhost für einfacheres Testing)
      const apiUrl = 'https://api.callflows.de/api/lead-search';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.results);
        setEditableResults(data.results);
        if (data.errors && data.errors.length > 0) {
          setErrors(data.errors);
        }
        toast({
          title: "Suche abgeschlossen",
          description: `${data.results.length} Ergebnisse gefunden.`,
        });
      } else {
        throw new Error(data.message || 'Unbekannter Fehler');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Fehler bei der Suche",
        description: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    if (editableResults.length === 0) {
      toast({
        title: "Keine Daten",
        description: "Es sind keine Ergebnisse zum Exportieren vorhanden.",
        variant: "destructive"
      });
      return;
    }

    try {
      // CSV Header
      const headers = ['Lead - Titel', 'Kontakt - Name', 'Telefonnummer', 'Organisation - Name'];
      
      // Daten in CSV Format umwandeln
      const csvData = editableResults.map(result => [
        'Neuer Lead',
        'Max Mustermann', 
        result.phone || '',
        result.companyName || ''
      ]);

      // CSV Content erstellen (mit korrektem CSV-Escaping)
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => row.map(field => 
          // CSV-Escaping: Felder mit Kommas/Anführungszeichen in Anführungszeichen setzen
          typeof field === 'string' && (field.includes(',') || field.includes('"') || field.includes('\n'))
            ? `"${field.replace(/"/g, '""')}"`
            : field
        ).join(','))
      ].join('\n');

      // Dateiname im Format: Jahr_Monat_Tag_Suchbegriff
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      
      // Suchbegriff bereinigen: Leerzeichen durch Unterstriche ersetzen
      const cleanSearchTerm = config.query
        .replace(/\s+/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
      
      const fileName = `${year}_${month}_${day}_${cleanSearchTerm}.csv`;
      
      // CSV-Datei herunterladen
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

      toast({
        title: "Export erfolgreich",
        description: `${editableResults.length} Leads als CSV-Datei exportiert.`,
      });
    } catch (error) {
      console.error('CSV export error:', error);
      toast({
        title: "Export fehlgeschlagen", 
        description: "Beim Exportieren der CSV-Datei ist ein Fehler aufgetreten.",
        variant: "destructive"
      });
    }
  };

  const updatePhone = (index: number, newPhone: string) => {
    const updatedResults = [...editableResults];
    updatedResults[index] = { ...updatedResults[index], phone: newPhone };
    setEditableResults(updatedResults);
    setEditingPhone(null);
  };

  // Pagination Logic
  const totalPages = Math.ceil(editableResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = editableResults.slice(startIndex, endIndex);

  const getSourceBadgeVariant = (source: SearchResult['source']): "default" | "secondary" | "destructive" | "outline" => {
          const variants: Record<SearchResult['source'], "default" | "secondary" | "destructive" | "outline"> = {
        'google': 'default',
        '11880': 'secondary',
      };
    return variants[source] || 'default';
  };

  // Laden-Zustand während Authentifizierung geprüft wird
  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Zugriff verweigert
            </CardTitle>
            <CardDescription>
              Die Lead Suche ist nur für Admin-Benutzer zugänglich
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Sie benötigen Admin-Rechte, um auf diese Seite zuzugreifen.
            </p>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/login">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anmelden
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/">
                  Startseite
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

    return (
    <main className="bg-background">
      <SiteHeader />
      <div className="pt-24 pb-16">
        <div className="container">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Startseite</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/admin-dashboard">Admin Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Lead Suche</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  Unternehmensdaten aus mehreren Quellen parallel abfragen
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Search className="h-4 w-4" />
                Datenquellen Management
              </div>
            </div>
          </div>
          
          {/* Dashboard Layout mit Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <DashboardNav />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Kompaktes Eingabeformular */}
              <Card className="mb-4">
                <CardContent className="pt-6">
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <Label htmlFor="query" className="text-sm font-medium">Suchanfrage</Label>
                      <Input
                        id="query"
                        placeholder="z.B. Friseur Hannover"
                        value={config.query}
                        onChange={(e) => setConfig((prev: LeadSearchConfig) => ({ ...prev, query: e.target.value }))}
                        className="mt-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !isLoading && config.query.trim()) {
                            handleSearch();
                          }
                        }}
                      />
                    </div>
                    <Button 
                      onClick={handleSearch} 
                      disabled={isLoading || !config.query.trim()}
                      className="shrink-0"
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner className="mr-2 h-4 w-4" />
                          Suchen...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Suchen
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Fehlermeldungen */}
              {errors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-1">
                      <p className="font-medium">Einige Quellen konnten nicht abgerufen werden:</p>
                      <ul className="list-disc list-inside text-sm">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Ergebnisse mit scrollbarer Tabelle */}
              {editableResults.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Suchergebnisse</CardTitle>
                        <CardDescription>
                          {editableResults.length} Leads gefunden • Seite {currentPage} von {totalPages} • Telefonnummern editierbar
                        </CardDescription>
                      </div>
                      <Button onClick={exportToCSV} variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Als CSV exportieren
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="border rounded-md">
                      {/* Scrollbare Tabelle mit fester Höhe */}
                      <div className="max-h-[calc(100vh-24rem)] overflow-auto">
                        <Table>
                          <TableHeader className="sticky top-0 bg-background z-10">
                            <TableRow>
                              <TableHead className="w-20">Quelle</TableHead>
                              <TableHead className="min-w-48">Firmenname</TableHead>
                              <TableHead className="w-52">Telefonnummer <span className="text-xs text-muted-foreground">(editierbar)</span></TableHead>
                              <TableHead className="min-w-48">Website</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {currentResults.map((result, index) => {
                              const globalIndex = startIndex + index;
                              return (
                            <TableRow key={index}>
                              <TableCell>
                                <Badge variant={getSourceBadgeVariant(result.source)}>
                                  {result.source}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">
                                {result.companyName}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {editingPhone === globalIndex ? (
                                    <div className="flex items-center gap-1">
                                      <Input
                                        defaultValue={result.phone || ''}
                                        placeholder="Telefonnummer..."
                                        className="w-40"
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            updatePhone(globalIndex, e.currentTarget.value);
                                          } else if (e.key === 'Escape') {
                                            setEditingPhone(null);
                                          }
                                        }}
                                        autoFocus
                                      />
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={(e) => {
                                          const input = e.currentTarget.parentElement?.querySelector('input');
                                          if (input) updatePhone(globalIndex, input.value);
                                        }}
                                      >
                                        <Check className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setEditingPhone(null)}
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <span>{result.phone || '-'}</span>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setEditingPhone(globalIndex)}
                                        className="opacity-60 hover:opacity-100"
                                      >
                                        <Edit className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                {result.url ? (
                                  <a 
                                    href={result.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    {result.url.length > 50 ? `${result.url.substring(0, 50)}...` : result.url}
                                  </a>
                                ) : '-'}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="border-t px-6 py-4 flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Zeige {startIndex + 1}-{Math.min(endIndex, editableResults.length)} von {editableResults.length} Ergebnissen
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Zurück
                        </Button>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNumber = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                            if (pageNumber > totalPages) return null;
                            return (
                              <Button
                                key={pageNumber}
                                variant={pageNumber === currentPage ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(pageNumber)}
                                className="w-8 h-8 p-0"
                              >
                                {pageNumber}
                              </Button>
                            );
                          })}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Weiter
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
                </Card>
              )}

              {/* Leerer Zustand */}
              {!isLoading && editableResults.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Noch keine Suche durchgeführt</h3>
                    <p className="text-muted-foreground">
                      Geben Sie eine Suchanfrage ein und klicken Sie auf "Leads suchen", um zu beginnen.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 