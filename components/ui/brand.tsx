/**
 * Brand component for "callflows" - always renders in primary color
 * Usage: <Brand /> renders "callflows" in primary color
 */

export function Brand() {
  return (
    <span className="text-primary font-semibold">callflows</span>
  );
}

/**
 * Utility function to wrap "callflows" in text with primary color styling
 * Usage: {brandText("Your text with callflows here")}
 */
export function brandText(text: string): React.ReactNode {
  if (!text) return text;
  
  // Split text by "callflows" (case-insensitive but preserve original case)
  const parts = text.split(/(callflows)/gi);
  
  return parts.map((part, index) => {
    if (part.toLowerCase() === 'callflows') {
      return (
        <span key={index} className="text-primary font-semibold">
          {part}
        </span>
      );
    }
    return part;
  });
}

