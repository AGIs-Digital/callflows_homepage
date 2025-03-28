"use client";

import { useEffect } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";

interface CalEmbedProps extends ButtonProps {
  buttonText?: string;
}

export function CalEmbed({ 
  buttonText = "Beratungstermin buchen", 
  className = "",
  ...props 
}: CalEmbedProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#0f26d5" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  return (
    <Button
      className={`${className}`}
      data-cal-link="callflows/55min"
      data-cal-config='{"layout":"popup"}'
      {...props}
    >
      {buttonText}
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button>
  );
} 