"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFeedbackStore } from "@/lib/store/feedback";

const [, useStore] = useFeedbackStore;

export function FeedbackButton() {
  const openDialog = useStore((state) => state.openDialog);

  return (
    <Button
      onClick={openDialog}
      variant="outline"
      size="icon"
      className="fixed bottom-4 right-4 rounded-full h-12 w-12 shadow-lg"
    >
      <MessageSquare className="h-5 w-5" />
      <span className="sr-only">Feedback geben</span>
    </Button>
  );
}