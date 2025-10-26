/**
 * Utility function to highlight the brand name "callflows" in primary color
 * Usage: {brandText(t('some.translation.key'))}
 */

export function brandText(text: string | string[]): React.ReactNode {
  // Handle array of strings (for benefits lists, etc.)
  if (Array.isArray(text)) {
    return text.map((item, index) => (
      <span key={index}>{brandText(item)}</span>
    ));
  }

  // Split text by "callflows" (case-insensitive but preserve case)
  const parts = text.split(/(callflows|callflows)/gi);
  
  return parts.map((part, index) => {
    // Check if this part is "callflows" or "callflows"
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

