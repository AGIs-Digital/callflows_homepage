"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";

// Global Booking Modal Context
const BookingModalContext = createContext<{
  isOpen: boolean;
  openModal: (url: string) => void;
  closeModal: () => void;
}>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {}
});

// Provider Component
export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingUrl, setBookingUrl] = useState("");

  const openModal = (url: string) => {
    setBookingUrl(url);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setBookingUrl("");
  };

  return (
    <BookingModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      
      {/* Global Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-[90vw] h-[80vh] max-w-5xl bg-white rounded-lg overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <X size={16} />
            </button>
            
            <iframe
              src={bookingUrl}
              className="w-full h-full"
              frameBorder="0"
              title="Terminbuchung"
            />
          </div>
        </div>
      )}
    </BookingModalContext.Provider>
  );
}

interface MicrosoftBookingsEmbedProps {
  buttonText?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showArrow?: boolean;
  bookingUrl?: string;
}

export function MicrosoftBookingsEmbed({ 
  buttonText = "Termin buchen", 
  className,
  variant = "default",
  size = "default",
  showArrow = false,
  bookingUrl = "https://outlook.office.com/book/info1@callflows.de/?ismsaljsauthenabled"
}: MicrosoftBookingsEmbedProps) {
  const { openModal } = useContext(BookingModalContext);

  return (
    <Button
      onClick={() => openModal(bookingUrl)}
      variant={variant}
      size={size}
      className={className}
    >
      <Calendar className="w-4 h-4 mr-2" />
      {buttonText}
    </Button>
  );
}
