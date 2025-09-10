// Mobile-First Critical CSS Optimierung
export const mobileCriticalCSS = `
/* Mobile-Critical Above-the-Fold Styles */
@media (max-width: 768px) {
  /* Hero Section Mobile */
  .hero-section {
    padding: 1rem;
    min-height: 100vh;
  }
  
  /* Typography Mobile */
  h1 {
    font-size: 2rem;
    line-height: 1.1;
    margin-bottom: 1rem;
  }
  
  /* Navigation Mobile */
  .mobile-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 50;
    backdrop-filter: blur(8px);
  }
  
  /* Critical Button Styles */
  .cta-button {
    width: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    font-weight: 600;
  }
  
  /* Loading States */
  .loading-placeholder {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
}
`;

export function injectMobileCriticalCSS() {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = mobileCriticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
  }
}
