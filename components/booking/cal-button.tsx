"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CalButton() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          console.log("Booking successful:", e.detail);
        },
      });
    })();
  }, []);

  return (
    <Button
      className="bg-accent text-gray-900 hover:bg-accent/90 group"
      data-cal-link="callflows/50min"
      data-cal-config='{"layout":"popup"}'
    >
      Beratungstermin buchen
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button>
  );
}