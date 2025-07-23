"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";
import { useAuthStore } from "@/lib/auth/auth-store";
import { BarChart3, Users } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">{t('common.menu')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 py-6">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-foreground/60"
              )}
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                pathname === "/pricing" ? "text-primary" : "text-foreground/60"
              )}
            >
              {t('nav.pricing')}
            </Link>
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                pathname.startsWith("/blog") ? "text-primary" : "text-foreground/60"
              )}
            >
              {t('nav.blog')}
            </Link>
            <Link
              href="/#about"
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                pathname === "/#about" ? "text-primary" : "text-foreground/60"
              )}
            >
              {t('nav.about')}
            </Link>
            <Link
              href="/kontakt"
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                pathname === "/kontakt" ? "text-primary" : "text-foreground/60"
              )}
            >
              {t('nav.contact')}
            </Link>
            
            {/* Dashboard-Links für eingeloggte Benutzer */}
            {isAuthenticated && user?.role === 'admin' && (
              <Link
                href="/seo-dashboard"
                onClick={() => setOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary flex items-center gap-2",
                  pathname === "/seo-dashboard" ? "text-primary" : "text-foreground/60"
                )}
              >
                <BarChart3 className="h-5 w-5" />
                Admin Dashboard
              </Link>
            )}
            
            {isAuthenticated && user?.role === 'customer' && (
              <Link
                href="/customer-dashboard"
                onClick={() => setOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary flex items-center gap-2",
                  pathname === "/customer-dashboard" ? "text-primary" : "text-foreground/60"
                )}
              >
                <Users className="h-5 w-5" />
                Dashboard
              </Link>
            )}
            
            {/* Auth-Bereich */}
            {isAuthenticated ? (
              <>
                <div className="border-t pt-4">
                  <div className="text-sm text-muted-foreground mb-2">
                    Angemeldet als:
                  </div>
                  <div className="text-base font-medium mb-4">
                    {user?.name} ({user?.role})
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="w-full"
                  >
                    Abmelden
                  </Button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-lg font-medium text-primary"
              >
                {t('common.login')}
              </Link>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
} 