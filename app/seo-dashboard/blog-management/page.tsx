"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Shield, ArrowLeft, PenTool, FileText, Calendar as CalendarIcon2, User, Image, Plus, Trash2, Edit, AlertTriangle } from "lucide-react";
import { useAuthStore } from "@/lib/auth/auth-store";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DashboardNav } from "@/components/dashboard-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedTime: string;
  author: string;
  content: string;
  image: string;
  status: 'draft' | 'scheduled' | 'published';
}

interface NewBlogPost {
  title: string;
  description: string;
  publishedTime: Date | undefined;
  author: string;
  content: string;
  imageFile: File | null;
  slug: string;
}

const AUTHORS = [
  "Tom Abeln",
  "Timo Goltz",
  "Team callflows"
];

export default function BlogManagementPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();
  
  // States
  const [existingPosts, setExistingPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Edit States
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  
  // New Blog Post State
  const [newPost, setNewPost] = useState<NewBlogPost>({
    title: '',
    description: '',
    publishedTime: undefined,
    author: AUTHORS[0],
    content: '',
    imageFile: null,
    slug: ''
  });

  // Edit Blog Post State  
  const [editPost, setEditPost] = useState<NewBlogPost>({
    title: '',
    description: '',
    publishedTime: undefined,
    author: AUTHORS[0],
    content: '',
    imageFile: null,
    slug: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'admin') {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  // Automatisches Generieren der Slug aus dem Titel
  useEffect(() => {
    if (newPost.title) {
      const slug = newPost.title
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setNewPost(prev => ({ ...prev, slug }));
    }
  }, [newPost.title]);

  // Automatisches Generieren der Slug aus dem Titel (für Edit)
  useEffect(() => {
    if (editPost.title) {
      const slug = editPost.title
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setEditPost(prev => ({ ...prev, slug }));
    }
  }, [editPost.title]);

  // Load existing blog posts
  const loadBlogPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/blog/list');
      const data = await response.json();
      
      if (data.success) {
        setExistingPosts(data.posts);
      } else {
        throw new Error(data.message || 'Fehler beim Laden der Blog-Posts');
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Blog-Posts konnten nicht geladen werden."
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadBlogPosts();
  }, [loadBlogPosts]);

  // Delete blog post
  const deleteBlogPost = async (slug: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/blog/delete?slug=${encodeURIComponent(slug)}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Blog-Post gelöscht!",
          description: result.message
        });

        // Refresh posts
        await loadBlogPosts();
        setDeleteDialogOpen(false);
        setPostToDelete(null);
      } else {
        throw new Error(result.message || 'Unbekannter Fehler');
      }

    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error instanceof Error ? error.message : "Blog-Post konnte nicht gelöscht werden."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Open edit dialog
  const openEditDialog = (post: BlogPost) => {
    setEditingPost(post);
    setEditPost({
      title: post.title,
      description: post.description,
      publishedTime: new Date(post.publishedTime),
      author: post.author,
      content: '...', // TODO: Load content from TSX file
      imageFile: null,
      slug: post.slug
    });
    setEditDialogOpen(true);
  };

  // Update blog post
  const updateBlogPost = async () => {
    if (!editingPost || !editPost.title || !editPost.description || !editPost.publishedTime) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus."
      });
      return;
    }

    setIsLoading(true);
    try {
      // FormData für API-Call erstellen
      const formData = new FormData();
      formData.append('originalSlug', editingPost.slug);
      formData.append('title', editPost.title);
      formData.append('description', editPost.description);
      formData.append('publishedTime', editPost.publishedTime.toISOString());
      formData.append('author', editPost.author);
      formData.append('content', editPost.content);
      formData.append('slug', editPost.slug);
      
      if (editPost.imageFile) {
        formData.append('image', editPost.imageFile);
      }

      // API-Call zum Aktualisieren des Blog-Posts
      const response = await fetch('/api/blog/update', {
        method: 'PUT',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Blog-Post aktualisiert!",
          description: result.message
        });

        // Reset edit form
        setEditPost({
          title: '',
          description: '',
          publishedTime: undefined,
          author: AUTHORS[0],
          content: '',
          imageFile: null,
          slug: ''
        });
        setEditingPost(null);
        setEditDialogOpen(false);

        // Refresh posts
        await loadBlogPosts();
      } else {
        throw new Error(result.message || 'Unbekannter Fehler');
      }

    } catch (error) {
      console.error('Error updating blog post:', error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error instanceof Error ? error.message : "Blog-Post konnte nicht aktualisiert werden."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewPost(prev => ({ ...prev, imageFile: file }));
    }
  };

  // Create new blog post
  const createBlogPost = async () => {
    if (!newPost.title || !newPost.description || !newPost.publishedTime || !newPost.content) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus."
      });
      return;
    }

    setIsLoading(true);
    try {
      // FormData für API-Call erstellen
      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('description', newPost.description);
      formData.append('publishedTime', newPost.publishedTime.toISOString());
      formData.append('author', newPost.author);
      formData.append('content', newPost.content);
      formData.append('slug', newPost.slug);
      
      if (newPost.imageFile) {
        formData.append('image', newPost.imageFile);
      }

      // API-Call zum Erstellen des Blog-Posts
      const response = await fetch('/api/blog/create', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Blog-Post erstellt!",
          description: `"${newPost.title}" wurde erfolgreich erstellt und wird zum geplanten Zeitpunkt veröffentlicht.`
        });

        // Reset form
        setNewPost({
          title: '',
          description: '',
          publishedTime: undefined,
          author: AUTHORS[0],
          content: '',
          imageFile: null,
          slug: ''
        });

        // Refresh posts
        await loadBlogPosts();
        setActiveTab("overview");
      } else {
        throw new Error(result.message || 'Unbekannter Fehler');
      }

    } catch (error) {
      console.error('Error creating blog post:', error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error instanceof Error ? error.message : "Blog-Post konnte nicht erstellt werden."
      });
    } finally {
      setIsLoading(false);
    }
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
              Das Blog-Management ist nur für Admin-Benutzer zugänglich
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
                    <Link href="/seo-dashboard">SEO Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Blog Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Blog Management</h1>
                <p className="text-muted-foreground">
                  Erstellen, bearbeiten und verwalten Sie Blog-Artikel
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PenTool className="h-4 w-4" />
                Content Management
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
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Übersicht
                  </TabsTrigger>
                  <TabsTrigger value="create" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Erstellen
                  </TabsTrigger>
                  <TabsTrigger value="manage" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Verwalten
                  </TabsTrigger>
                </TabsList>

                {/* Übersicht Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Blog-Statistiken</CardTitle>
                      <CardDescription>Überblick über Ihre Blog-Artikel</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                          <h3 className="font-semibold text-green-800 dark:text-green-200">
                            Veröffentlicht
                          </h3>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                            {existingPosts.filter(p => p.status === 'published').length}
                          </p>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                            Geplant
                          </h3>
                          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">
                            {existingPosts.filter(p => p.status === 'scheduled').length}
                          </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                            Entwürfe
                          </h3>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                            {existingPosts.filter(p => p.status === 'draft').length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Letzte Blog-Posts</CardTitle>
                      <CardDescription>Die neuesten Artikel in Ihrem Blog</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {existingPosts.slice(0, 5).map((post) => (
                          <div key={post.slug} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium">{post.title}</h4>
                              <p className="text-sm text-muted-foreground">{post.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant={post.status === 'published' ? 'default' : post.status === 'scheduled' ? 'secondary' : 'outline'}>
                                  {post.status === 'published' ? 'Veröffentlicht' : post.status === 'scheduled' ? 'Geplant' : 'Entwurf'}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {post.author} • {format(new Date(post.publishedTime), 'dd.MM.yyyy', { locale: de })}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {existingPosts.length === 0 && (
                          <p className="text-center text-muted-foreground py-8">
                            Noch keine Blog-Posts vorhanden. Erstellen Sie Ihren ersten Artikel!
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Erstellen Tab */}
                <TabsContent value="create" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Neuen Blog-Artikel erstellen</CardTitle>
                      <CardDescription>
                        Erstellen Sie einen neuen Blog-Artikel, der automatisch zum gewählten Zeitpunkt veröffentlicht wird
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Titel */}
                      <div className="space-y-2">
                        <Label htmlFor="title">Titel *</Label>
                        <Input
                          id="title"
                          placeholder="z.B. Neue KI-Funktionen für besseren Kundenservice"
                          value={newPost.title}
                          onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>

                      {/* Slug (automatisch generiert) */}
                      <div className="space-y-2">
                        <Label htmlFor="slug">URL-Slug (automatisch generiert)</Label>
                        <Input
                          id="slug"
                          value={newPost.slug}
                          onChange={(e) => setNewPost(prev => ({ ...prev, slug: e.target.value }))}
                          placeholder="wird-automatisch-generiert"
                        />
                        <p className="text-sm text-muted-foreground">
                          URL: callflows.de/blog/{newPost.slug || 'ihr-artikel-slug'}
                        </p>
                      </div>

                      {/* Beschreibung */}
                      <div className="space-y-2">
                        <Label htmlFor="description">Meta-Beschreibung *</Label>
                        <Textarea
                          id="description"
                          placeholder="Eine prägnante Beschreibung für SEO und Social Media (max. 160 Zeichen)"
                          value={newPost.description}
                          onChange={(e) => setNewPost(prev => ({ ...prev, description: e.target.value }))}
                          maxLength={160}
                        />
                        <p className="text-sm text-muted-foreground">
                          {newPost.description.length}/160 Zeichen
                        </p>
                      </div>

                      {/* Autor und Veröffentlichungsdatum */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="author">Autor *</Label>
                          <Select value={newPost.author} onValueChange={(value) => setNewPost(prev => ({ ...prev, author: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Autor auswählen" />
                            </SelectTrigger>
                            <SelectContent>
                              {AUTHORS.map((author) => (
                                <SelectItem key={author} value={author}>
                                  {author}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Veröffentlichungsdatum *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !newPost.publishedTime && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {newPost.publishedTime ? (
                                  format(newPost.publishedTime, "dd.MM.yyyy", { locale: de })
                                ) : (
                                  <span>Datum auswählen</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={newPost.publishedTime}
                                onSelect={(date) => setNewPost(prev => ({ ...prev, publishedTime: date }))}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      {/* Titelbild Upload */}
                      <div className="space-y-2">
                        <Label htmlFor="image">Titelbild *</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="flex-1"
                          />
                          {newPost.imageFile && (
                                                                                        <Badge variant="secondary" className="flex items-center gap-1">
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <Image className="h-3 w-3" aria-hidden="true" />
                                {newPost.imageFile.name}
                              </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Empfohlene Größe: 1200x630px (JPG, PNG, WebP)
                        </p>
                      </div>

                                    {/* Inhalt */}
              <div className="space-y-2">
                <Label htmlFor="content">Artikel-Inhalt *</Label>
                <Textarea
                  id="content"
                  placeholder="Schreiben Sie hier den Inhalt Ihres Blog-Artikels..."
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={12}
                  className="min-h-[300px]"
                />
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
                    🤖 Intelligente Auto-Formatierung aktiv
                  </h4>
                  <div className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                    <p><strong>Automatisch erkannt:</strong></p>
                    <ul className="list-disc list-inside space-y-0.5 ml-2">
                      <li><strong>Überschriften:</strong> Kurze Zeilen → werden zu H3-Überschriften</li>
                      <li><strong>Listen:</strong> Zeilen mit •, -, *, 1., a) → formatierte Listen</li>
                      <li><strong>URLs:</strong> http(s)://... → automatische Links</li>
                      <li><strong>Wichtige Begriffe:</strong> KI-Telefonie, callflows, DSGVO → hervorgehoben</li>
                      <li><strong>Zitate:</strong> "Text in Anführungszeichen" → Blockquotes</li>
                    </ul>
                    <p className="mt-2"><strong>Markdown:</strong> # Überschrift, **fett**, *kursiv*, `code`, [Link](URL)</p>
                  </div>
                </div>
              </div>

                      {/* Erstellen Button */}
                      <div className="flex justify-end gap-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setNewPost({
                            title: '',
                            description: '',
                            publishedTime: undefined,
                            author: AUTHORS[0],
                            content: '',
                            imageFile: null,
                            slug: ''
                          })}
                        >
                          Zurücksetzen
                        </Button>
                        <Button 
                          onClick={createBlogPost}
                          disabled={isLoading || !newPost.title || !newPost.description || !newPost.publishedTime || !newPost.content}
                        >
                          {isLoading ? 'Erstelle...' : 'Blog-Post erstellen'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Verwalten Tab */}
                <TabsContent value="manage" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Alle Blog-Artikel verwalten</CardTitle>
                      <CardDescription>Bearbeiten, löschen oder den Status Ihrer Artikel ändern</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {existingPosts.map((post) => (
                          <div key={post.slug} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium">{post.title}</h4>
                              <p className="text-sm text-muted-foreground">{post.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant={post.status === 'published' ? 'default' : post.status === 'scheduled' ? 'secondary' : 'outline'}>
                                  {post.status === 'published' ? 'Veröffentlicht' : post.status === 'scheduled' ? 'Geplant' : 'Entwurf'}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {post.author} • {format(new Date(post.publishedTime), 'dd.MM.yyyy HH:mm', { locale: de })}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/blog/${post.slug}`} target="_blank">
                                  Ansehen
                                </Link>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => openEditDialog(post)}
                                disabled={isLoading}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    disabled={isLoading}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="flex items-center gap-2">
                                      <AlertTriangle className="h-5 w-5 text-red-600" />
                                      Blog-Post löschen
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Sind Sie sicher, dass Sie den Blog-Post <strong>"{post.title}"</strong> löschen möchten? 
                                      Diese Aktion kann nicht rückgängig gemacht werden.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => deleteBlogPost(post.slug)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Löschen
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        ))}
                        {existingPosts.length === 0 && (
                          <p className="text-center text-muted-foreground py-8">
                            Noch keine Blog-Posts vorhanden.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Blog-Post bearbeiten</DialogTitle>
            <DialogDescription>
              Bearbeiten Sie die Details Ihres Blog-Posts
            </DialogDescription>
          </DialogHeader>
          
          {editingPost && (
            <div className="space-y-6">
              {/* Titel */}
              <div className="space-y-2">
                <Label htmlFor="edit-title">Titel *</Label>
                <Input
                  id="edit-title"
                  placeholder="z.B. Neue KI-Funktionen für besseren Kundenservice"
                  value={editPost.title}
                  onChange={(e) => setEditPost(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="edit-slug">URL-Slug</Label>
                <Input
                  id="edit-slug"
                  value={editPost.slug}
                  onChange={(e) => setEditPost(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="wird-automatisch-generiert"
                />
                <p className="text-sm text-muted-foreground">
                  URL: callflows.de/blog/{editPost.slug || 'ihr-artikel-slug'}
                </p>
              </div>

              {/* Beschreibung */}
              <div className="space-y-2">
                <Label htmlFor="edit-description">Meta-Beschreibung *</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Eine prägnante Beschreibung für SEO und Social Media (max. 160 Zeichen)"
                  value={editPost.description}
                  onChange={(e) => setEditPost(prev => ({ ...prev, description: e.target.value }))}
                  maxLength={160}
                />
                <p className="text-sm text-muted-foreground">
                  {editPost.description.length}/160 Zeichen
                </p>
              </div>

              {/* Autor und Veröffentlichungsdatum */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-author">Autor *</Label>
                  <Select value={editPost.author} onValueChange={(value) => setEditPost(prev => ({ ...prev, author: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Autor auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {AUTHORS.map((author) => (
                        <SelectItem key={author} value={author}>
                          {author}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Veröffentlichungsdatum *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !editPost.publishedTime && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editPost.publishedTime ? (
                          format(editPost.publishedTime, "dd.MM.yyyy", { locale: de })
                        ) : (
                          <span>Datum auswählen</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={editPost.publishedTime}
                        onSelect={(date) => setEditPost(prev => ({ ...prev, publishedTime: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Titelbild Upload */}
              <div className="space-y-2">
                <Label htmlFor="edit-image">Titelbild (optional - leer lassen um vorhandenes Bild zu behalten)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setEditPost(prev => ({ ...prev, imageFile: file }));
                      }
                    }}
                    className="flex-1"
                  />
                  {editPost.imageFile && (
                                                                <Badge variant="secondary" className="flex items-center gap-1">
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <Image className="h-3 w-3" aria-hidden="true" />
                        {editPost.imageFile.name}
                      </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Aktuelles Bild: {editingPost.image}
                </p>
              </div>

              {/* Inhalt */}
              <div className="space-y-2">
                <Label htmlFor="edit-content">Artikel-Inhalt *</Label>
                <Textarea
                  id="edit-content"
                  placeholder="Schreiben Sie hier den Inhalt Ihres Blog-Artikels..."
                  value={editPost.content}
                  onChange={(e) => setEditPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={12}
                  className="min-h-[300px]"
                />
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
                    🤖 Intelligente Auto-Formatierung aktiv
                  </h4>
                  <div className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                    <p><strong>Automatisch erkannt:</strong></p>
                    <ul className="list-disc list-inside space-y-0.5 ml-2">
                      <li><strong>Überschriften:</strong> Kurze Zeilen → werden zu H3-Überschriften</li>
                      <li><strong>Listen:</strong> Zeilen mit •, -, *, 1., a) → formatierte Listen</li>
                      <li><strong>URLs:</strong> http(s)://... → automatische Links</li>
                      <li><strong>Wichtige Begriffe:</strong> KI-Telefonie, callflows, DSGVO → hervorgehoben</li>
                      <li><strong>Zitate:</strong> "Text in Anführungszeichen" → Blockquotes</li>
                    </ul>
                    <p className="mt-2"><strong>Markdown:</strong> # Überschrift, **fett**, *kursiv*, `code`, [Link](URL)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button 
              onClick={updateBlogPost}
              disabled={isLoading || !editPost.title || !editPost.description || !editPost.publishedTime}
            >
              {isLoading ? 'Speichere...' : 'Änderungen speichern'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </main>
  );
} 