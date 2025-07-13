"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ArrowLeft, Settings, BarChart, Phone } from "lucide-react";
import { useAuthStore } from "@/lib/auth/auth-store";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DashboardNav } from "@/components/dashboard-nav";
import Link from "next/link";

export default function CustomerDashboardPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'customer') {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  // Laden-Zustand während Authentifizierung geprüft wird
  if (!isAuthenticated || user?.role !== 'customer') {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Zugriff verweigert
            </CardTitle>
            <CardDescription>
              Das Customer-Dashboard ist nur für Kunden zugänglich
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Sie benötigen Kunden-Rechte, um auf dieses Dashboard zuzugreifen.
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
                  <BreadcrumbPage>Customer Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Customer Dashboard</h1>
                <p className="text-muted-foreground">
                  Willkommen zurück, {user?.name}!
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Kunden-Bereich
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
            <div className="lg:col-span-3">
              {/* Dashboard Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Platzhalter-Karten */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Ihre Voice-Agents
                </CardTitle>
                <CardDescription>
                  Übersicht Ihrer KI-Telefonie-Systeme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Diese Funktion wird bald verfügbar sein
                  </p>
                  <Button variant="outline" size="sm">
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Anruf-Statistiken
                </CardTitle>
                <CardDescription>
                  Performance Ihrer Voice-Agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BarChart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Detaillierte Statistiken werden hier angezeigt
                  </p>
                  <Button variant="outline" size="sm">
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Einstellungen
                </CardTitle>
                <CardDescription>
                  Konfiguration Ihrer Voice-Agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Settings className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Konfigurationsoptionen werden hier verfügbar sein
                  </p>
                  <Button variant="outline" size="sm">
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info-Bereich */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Entwicklungsstand</CardTitle>
              <CardDescription>
                Ihr Customer-Dashboard wird gerade entwickelt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Wir arbeiten intensiv an Ihrem personalisierten Dashboard. Bald werden Sie hier folgende Funktionen finden:
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Echtzeit-Überwachung Ihrer Voice-Agents</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Detaillierte Anruf-Statistiken und Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Konfiguration und Anpassung Ihrer KI-Systeme</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Billing und Nutzungsübersicht</span>
                  </li>
                </ul>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Haben Sie Fragen oder Feedback? Kontaktieren Sie uns gerne.
                  </p>
                  <Button asChild className="mt-2">
                    <Link href="/kontakt">
                      Kontakt aufnehmen
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
} 