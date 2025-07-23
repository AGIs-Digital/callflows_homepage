"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from "@/components/site-header";

import { SEODashboard } from "@/components/seo-dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/lib/auth/auth-store";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DashboardNav } from "@/components/dashboard-nav";
import Link from "next/link";

export default function SEODashboardPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'admin') {
      router.push('/');
    } else {
      // Admin-Benutzer automatisch zur Lead Suche weiterleiten
      router.push('/seo-dashboard/lead-generator');
    }
  }, [isAuthenticated, user, router]);

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
              Das SEO-Dashboard ist nur für Admin-Benutzer zugänglich
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Sie benötigen Admin-Rechte, um auf dieses Dashboard zuzugreifen.
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
                  <BreadcrumbPage>Admin Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  Zentrale Verwaltung für Lead-Generierung, Blog-Management und SEO-Tools
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                Admin-Bereich
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
              <SEODashboard />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 