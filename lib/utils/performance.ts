// gtag wird bereits in analytics.ts deklariert

export function measurePerformance(metricName: string, value?: number) {
  if (typeof window === 'undefined') return;

  try {
    const entry = performance.mark(metricName);
    const performanceValue = value || entry.startTime;
    
    // Report to analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'performance_metric', {
        metric_name: metricName,
        value: performanceValue,
        page_location: window.location.href
      });
    }

    // Log für Development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${metricName} - ${performanceValue}ms`);
    }
  } catch (error) {
    console.error('Performance measurement error:', error);
  }
}

export function measureWidgetPerformance() {
  if (typeof window === 'undefined') return;

  // Core Web Vitals für Widget-Performance
  try {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      measurePerformance('widget_lcp', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (entry.processingStart) {
          measurePerformance('widget_fid', entry.processingStart - entry.startTime);
        }
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      measurePerformance('widget_cls', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });

  } catch (error) {
    console.error('Widget performance measurement error:', error);
  }
}