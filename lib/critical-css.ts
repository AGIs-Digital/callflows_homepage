// Critical CSS für Above-the-Fold Content (statischer Export)
export const CRITICAL_CSS = `
/* Critical CSS - Inline für schnellere LCP */
.site-header {
  position: fixed;
  top: 0;
  z-index: 50;
  width: 100%;
  border-bottom: 1px solid hsl(var(--border));
  background-color: hsl(var(--background) / 0.95);
  backdrop-filter: blur(16px);
}

.hero-section {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3.5rem;
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 4rem;
  }
}

/* Loading States für bessere UX */
.loading-skeleton {
  background: linear-gradient(90deg, 
    hsl(var(--muted)) 25%, 
    hsl(var(--muted) / 0.5) 50%, 
    hsl(var(--muted)) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Reduzierte Motion Support */
@media (prefers-reduced-motion: reduce) {
  .loading-skeleton {
    animation: none;
    background: hsl(var(--muted));
  }
}
`;

// CSS für statischen Export optimieren
export const STATIC_OPTIMIZATIONS = `
/* Resource Hints für statischen Export */
<link rel="preload" href="/fonts/Satoshi-Bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/callflows_brand_no_claim.webp" as="image">

/* DNS Prefetch für externe Ressourcen */
<link rel="dns-prefetch" href="//widget.synthflow.ai">
<link rel="dns-prefetch" href="//fonts.gstatic.com">

/* Preconnect für kritische externe Domains */
<link rel="preconnect" href="https://widget.synthflow.ai" crossorigin>
`;
