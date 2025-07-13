"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/lib/auth/auth-store";
import { useI18n } from "@/lib/i18n";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  
  const { login, isLoading, isAuthenticated, user } = useAuthStore();
  const { t } = useI18n();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect basierend auf Rolle
      if (user.role === 'admin') {
        router.push('/seo-dashboard');
      } else if (user.role === 'customer') {
        router.push('/customer-dashboard'); // Wird später implementiert
      }
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Bitte füllen Sie alle Felder aus');
      return;
    }

    const success = await login(email, password);
    
    if (!success) {
      setError('Ungültige Anmeldedaten');
    }
  };

  const fillDemo = (role: 'admin' | 'customer') => {
    if (role === 'admin') {
      setEmail('admin@callflows.de');
      setPassword('callflows2025');
    } else {
      setEmail('kunde@example.com');
      setPassword('kunde123');
    }
  };

  return (
    <main className="bg-background">
      <SiteHeader />
      <div className="pt-24 pb-16 min-h-screen">
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
                  <BreadcrumbPage>Anmelden</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {/* Login Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Lock className="w-6 h-6" />
                Anmelden
              </CardTitle>
              <CardDescription>
                Melden Sie sich bei Ihrem callflows Account an
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail-Adresse</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ihre@email.de"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Passwort</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Anmelden..." : "Anmelden"}
                </Button>
              </form>

              {/* Demo-Zugänge */}
              <div className="border-t pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDemo(!showDemo)}
                  className="w-full mb-2"
                >
                  Demo-Zugänge anzeigen
                </Button>
                
                {showDemo && (
                  <div className="space-y-2">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-1">Admin-Zugang:</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Vollzugriff auf SEO-Dashboard und alle Funktionen
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => fillDemo('admin')}
                        className="w-full"
                      >
                        Admin-Daten ausfüllen
                      </Button>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-1">Kunden-Zugang:</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Zugriff auf Customer-Dashboard (wird später implementiert)
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => fillDemo('customer')}
                        className="w-full"
                      >
                        Kunden-Daten ausfüllen
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>Noch kein Account? <a href="/kontakt" className="text-primary hover:underline">Kontaktieren Sie uns</a></p>
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