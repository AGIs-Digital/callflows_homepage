"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFeedbackStore } from "@/lib/store/feedback";

const [, useStore] = useFeedbackStore;

export function FeedbackButton() {
  return (
    <button
      className="fixed bottom-4 right-4 p-3 bg-primary/80 text-white rounded-full 
                 shadow-lg backdrop-blur-sm opacity-50 cursor-not-allowed"
      disabled={true}
      aria-label="KI-Assistent (coming soon)"
    >
      <MessageSquare className="w-6 h-6" />
      <span className="sr-only">KI-Assistent wird bald verfügbar</span>
    </button>
  );
}