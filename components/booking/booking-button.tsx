"use client";
import { ZohoEmbed } from "./zoho-embed";

interface BookingButtonProps {
  buttonText?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showArrow?: boolean;
}

export function BookingButton({ 
  buttonText = "Beratungstermin buchen",
  className = "bg-accent text-gray-900 hover:bg-accent/90 group",
  variant = "default",
  size = "default",
  showArrow = true
}: BookingButtonProps) {
  return (
    <ZohoEmbed
      buttonText={buttonText}
      className={className}
      variant={variant}
      size={size}
      showArrow={showArrow}
    />
  );
} 