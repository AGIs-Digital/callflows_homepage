"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  BarChart3, 
  Users, 
  Target,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Bot
} from "lucide-react";
import SEOMonitor, { type SEOMetrics, type KeywordData, type LLMMention } from "@/lib/seo/monitoring";
import { SEODashboardInfo } from "@/components/seo-dashboard-info";

export function SEODashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const seoMonitor = new SEOMonitor();

  useEffect(() => {
    loadSEOData();
  }, []);

  const loadSEOData = async () => {
    setLoading(true);
    try {
      const data = await seoMonitor.generateSEOReport();
      setMetrics(data);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error loading SEO data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: KeywordData['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable':
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
      case 'new':
        return <Target className="w-4 h-4 text-blue-500" />;
    }
  };

  const getSentimentColor = (sentiment: LLMMention['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-8 space-y-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          <h1 className="text-2xl font-bold">SEO Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="p-8 text-center">
        <p>Fehler beim Laden der SEO-Daten</p>
        <Button onClick={loadSEOData} className="mt-4">
          Erneut versuchen
        </Button>
      </div>
    );
  }

  const alerts = seoMonitor.checkKeywordAlerts(metrics.keywords);
  const topKeywords = metrics.keywords
    .filter(k => k.position !== null)
    .sort((a, b) => (a.position || 999) - (b.position || 999))
    .slice(0, 10);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          <h1 className="text-3xl font-bold">SEO Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Letztes Update: {lastRefresh.toLocaleString('de-DE')}
          </p>
          <Button onClick={loadSEOData} size="sm" variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Aktualisieren
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organischer Traffic</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.organicTraffic.sessions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{metrics.organicTraffic.change}% vs. vorherigen Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top 10 Rankings</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.rankings.top10}</div>
            <p className="text-xs text-muted-foreground">
              von {metrics.keywords.length} Keywords
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LLM Mentions</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.llmMentions.length}</div>
            <p className="text-xs text-muted-foreground">
              Diese Woche
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            {alerts.length > 0 ? (
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
            <p className="text-xs text-muted-foreground">
              Aktive Warnungen
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              SEO Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border ${
                    alert.severity === 'high' 
                      ? 'border-red-200 bg-red-50' 
                      : alert.severity === 'medium'
                      ? 'border-orange-200 bg-orange-50'
                      : 'border-green-200 bg-green-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{alert.keyword}</p>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                    </div>
                    <Badge variant={
                      alert.severity === 'high' ? 'destructive' : 
                      alert.severity === 'medium' ? 'default' : 
                      'secondary'
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Top Keywords Performance
            </CardTitle>
            <CardDescription>
              Beste Rankings der wichtigsten Keywords
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topKeywords.map((keyword, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{keyword.keyword}</span>
                      {getTrendIcon(keyword.trend)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Volume: {keyword.searchVolume.toLocaleString()} | 
                      Position: {keyword.position || 'Nicht gerankt'}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      keyword.position && keyword.position <= 3 ? 'default' :
                      keyword.position && keyword.position <= 10 ? 'secondary' :
                      'outline'
                    }>
                      #{keyword.position || '100+'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* LLM Mentions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              LLM Mentions
            </CardTitle>
            <CardDescription>
              Erwähnungen in KI-Systemen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.llmMentions.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Keine LLM-Mentions in den letzten 7 Tagen
                </p>
              ) : (
                metrics.llmMentions.slice(0, 5).map((mention, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{mention.source}</Badge>
                          <Badge className={getSentimentColor(mention.sentiment)}>
                            {mention.sentiment}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{mention.query}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {mention.mention}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rankings Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Rankings Verteilung</CardTitle>
          <CardDescription>
            Wie verteilen sich unsere Keywords in den Suchergebnissen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Top 3 Positionen</span>
              <span className="font-bold">{metrics.rankings.top3} Keywords</span>
            </div>
            <Progress value={(metrics.rankings.top3 / metrics.keywords.length) * 100} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span>Top 10 Positionen</span>
              <span className="font-bold">{metrics.rankings.top10} Keywords</span>
            </div>
            <Progress value={(metrics.rankings.top10 / metrics.keywords.length) * 100} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span>Top 100 Positionen</span>
              <span className="font-bold">{metrics.rankings.top100} Keywords</span>
            </div>
            <Progress value={(metrics.rankings.top100 / metrics.keywords.length) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* API-Status Information */}
      <div className="mt-8">
        <SEODashboardInfo />
      </div>
    </div>
  );
} 