// Global Error Handler for callflows.de
(function() {
  'use strict';
  
  if (typeof window === 'undefined') return;
  
  window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Global error:', { msg, url, lineNo, columnNo, error });
    return false;
  };
  
  window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
  });
})(); 