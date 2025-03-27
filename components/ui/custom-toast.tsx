import { toast as sonnerToast } from "sonner";
import { XCircle, CheckCircle, AlertCircle } from "lucide-react";

export const customToast = {
  success: (title: string, description?: string) => {
    sonnerToast(title, {
      description,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      duration: 5000,
    });
  },
  
  error: (title: string, description?: string) => {
    sonnerToast(title, {
      description,
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      duration: 7000, // Längere Dauer für Fehlermeldungen
    });
  },
  
  warning: (title: string, description?: string) => {
    sonnerToast(title, {
      description,
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
      duration: 6000,
    });
  }
}; 