// Script de métricas de performance
(function() {
  'use strict';
  
  // Declarações globais para evitar erros de linting
  /* global PerformanceObserver, gtag */
  
  // Função para medir métricas de performance
  function measurePerformance() {
    // First Contentful Paint (FCP)
    if ('PerformanceObserver' in window) {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FCP:', entry.startTime);
          // Enviar para analytics
          if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
              name: 'fcp',
              value: Math.round(entry.startTime)
            });
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    }
    
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        // Enviar para analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'timing_complete', {
            name: 'lcp',
            value: Math.round(lastEntry.startTime)
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }
    
    // First Input Delay (FID)
    if ('PerformanceObserver' in window) {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
          // Enviar para analytics
          if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
              name: 'fid',
              value: Math.round(entry.processingStart - entry.startTime)
            });
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    }
    
    // Cumulative Layout Shift (CLS)
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log('CLS:', clsValue);
            // Enviar para analytics
            if (typeof gtag !== 'undefined') {
              gtag('event', 'timing_complete', {
                name: 'cls',
                value: Math.round(clsValue * 1000)
              });
            }
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }
  
  // Função para monitorar erros
  function monitorErrors() {
    window.addEventListener('error', function(e) {
      console.error('JavaScript Error:', e.error);
      // Enviar erro para analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
          description: e.error.message,
          fatal: false
        });
      }
    });
    
    window.addEventListener('unhandledrejection', function(e) {
      console.error('Unhandled Promise Rejection:', e.reason);
      // Enviar erro para analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
          description: e.reason,
          fatal: false
        });
      }
    });
  }
  
  // Função para monitorar recursos
  function monitorResources() {
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.initiatorType === 'img' || entry.initiatorType === 'script') {
            console.log('Resource Load:', entry.name, entry.duration);
            // Enviar para analytics se demorou muito
            if (entry.duration > 1000) {
              if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                  name: 'resource_load',
                  value: Math.round(entry.duration),
                  custom_parameter: entry.name
                });
              }
            }
          }
        });
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
    }
  }
  
  // Função para monitorar navegação
  function monitorNavigation() {
    // Monitora mudanças de rota
    if (window.location) {
      let currentPath = window.location.pathname;
      
      setInterval(() => {
        if (window.location.pathname !== currentPath) {
          currentPath = window.location.pathname;
          console.log('Navigation:', currentPath);
          // Enviar para analytics
          if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href
            });
          }
        }
      }, 100);
    }
  }
  
  // Inicializa monitoramento quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      measurePerformance();
      monitorErrors();
      monitorResources();
      monitorNavigation();
    });
  } else {
    measurePerformance();
    monitorErrors();
    monitorResources();
    monitorNavigation();
  }
})();
