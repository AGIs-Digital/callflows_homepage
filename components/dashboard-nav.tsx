"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  Settings, 
  Home,
  LogOut,
  PenTool,
  Search
} from "lucide-react";
import { useAuthStore } from "@/lib/auth/auth-store";

interface DashboardNavProps {
  className?: string;
}

export function DashboardNav({ className }: DashboardNavProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const adminNavItems = [
    {
      title: "Lead Suche",
      href: "/seo-dashboard/lead-generator",
      icon: Search,
      description: "Unternehmensdaten parallel abfragen"
    },
    {
      title: "Blog Management",
      href: "/seo-dashboard/blog-management",
      icon: PenTool,
      description: "Blog-Artikel erstellen und verwalten"
    },
    {
      title: "SEO Dashboard",
      href: "/seo-dashboard",
      icon: BarChart3,
      description: "SEO-Metriken und LLM-Mentions"
    },
    {
      title: "API Setup",
      href: "/api-setup",
      icon: Settings,
      description: "Google APIs konfigurieren"
    }
  ];

  const customerNavItems = [
    {
      title: "Dashboard",
      href: "/customer-dashboard", 
      icon: Users,
      description: "Ihre Voice-Agents und Statistiken"
    }
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : customerNavItems;

  const otherItems = [
    {
      title: "Startseite",
      href: "/",
      icon: Home,
      description: "Zurück zur Hauptseite"
    }
  ];

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Navigation
          </div>
          
          {/* Dashboard-Navigation */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-secondary"
                  )}
                >
                  <Link href={item.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm">{item.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Allgemeine Navigation */}
          <div className="border-t pt-2">
            <div className="space-y-1">
              {otherItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    asChild
                    className="w-full justify-start"
                  >
                    <Link href={item.href}>
                      <Icon className="mr-2 h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Benutzer-Info und Logout */}
          <div className="border-t pt-2">
            <div className="text-xs text-muted-foreground mb-2">
              Angemeldet als: <span className="font-medium">{user?.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Abmelden
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 