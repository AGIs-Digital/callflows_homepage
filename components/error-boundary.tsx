"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // iOS Safari spezifisches Error Logging
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown';
    const isIOSSafari = /iPad|iPhone|iPod/.test(userAgent) && /Safari/.test(userAgent);
    
    const errorDetails = {
      error: error.message,
      stack: error.stack,
      errorInfo,
      userAgent: userAgent.substring(0, 100), // Limit für Storage
      isIOSSafari,
      timestamp: new Date().toISOString()
    };
    
    console.error("Uncaught error:", errorDetails);
    
    if (process.env.NODE_ENV === 'production') {
      // iOS spezifisches Error Tracking
      if (isIOSSafari && (window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: `iOS Safari Error: ${error.message}`,
          fatal: true,
          custom_map: errorDetails
        });
      }
    }
    
    // Callback für Custom Error Handling
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8 rounded-lg border bg-card shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Etwas ist schiefgelaufen</h2>
            <p className="text-muted-foreground mb-6">
              Ein unerwarteter Fehler ist aufgetreten. Bitte laden Sie die Seite neu.
            </p>
            <button
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium
                         hover:bg-primary/90 transition-colors"
              onClick={() => this.setState({ hasError: false })}
            >
              Neu laden
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}