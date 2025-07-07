"use client";
import { ZohoEmbed } from "./zoho-embed";

export function BookingButton() {
  return (
    <ZohoEmbed
      buttonText="Beratungstermin buchen"
      className="bg-accent text-gray-900 hover:bg-accent/90 group"
      variant="default"
      size="default"
      showArrow={true}
    />
  );
} 