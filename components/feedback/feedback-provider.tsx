"use client";

import { FeedbackDialog } from "@/components/feedback/feedback-dialog";
import { useFeedbackStore } from "@/lib/store/feedback";

const [Provider, useStore] = useFeedbackStore;

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <FeedbackContent>{children}</FeedbackContent>
    </Provider>
  );
}

function FeedbackContent({ children }: { children: React.ReactNode }) {
  const isOpen = useStore((state) => state.isOpen);
  const closeDialog = useStore((state) => state.closeDialog);

  return (
    <>
      <FeedbackDialog isOpen={isOpen} onClose={closeDialog} />
      {children}
    </>
  );
}