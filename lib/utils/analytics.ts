// gtag wird bereits in silent-logger.ts deklariert

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  // Only track in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('Analytics Event:', eventName, properties);
    return;
  }

  try {
    // Send to analytics service
    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }
  } catch (error) {
    console.error('Analytics Error:', error);
  }
}