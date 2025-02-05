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
    console.error("Uncaught error:", error, errorInfo);
    if (process.env.NODE_ENV === 'production') {
      // In production, you might want to log to an error tracking service
      // logErrorToService(error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8 rounded-lg border bg-card shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-primary">Etwas ist schiefgelaufen</h2>
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