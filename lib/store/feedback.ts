"use client";

import { createStore } from '@/lib/store/create-store';

interface FeedbackStore {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useFeedbackStore = createStore<FeedbackStore>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));