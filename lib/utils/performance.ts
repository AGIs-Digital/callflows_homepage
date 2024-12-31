export function measurePerformance(metricName: string) {
  if (typeof window === 'undefined') return;

  try {
    const entry = performance.mark(metricName);
    
    // Report to analytics
    if (window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: metricName,
        value: entry.startTime,
      });
    }
  } catch (error) {
    console.error('Performance measurement error:', error);
  }
}