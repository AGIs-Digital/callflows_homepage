"use client";
import { MicrosoftBookingsEmbed } from "./microsoft-bookings-embed";

interface BookingButtonProps {
  buttonText?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showArrow?: boolean;
  bookingUrl?: string;
}

export function BookingButton({ 
  buttonText = "Termin buchen",
  className = "bg-accent text-gray-900 hover:bg-accent/90 group",
  variant = "default",
  size = "default",
  showArrow = true,
  bookingUrl
}: BookingButtonProps) {
  return (
    <MicrosoftBookingsEmbed
      buttonText={buttonText}
      className={className}
      variant={variant}
      size={size}
      showArrow={showArrow}
      bookingUrl={bookingUrl}
    />
  );
} 