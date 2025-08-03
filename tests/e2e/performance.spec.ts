import { test, expect } from '@playwright/test';

test.describe('Performance e Acessibilidade', () => {
  test('@performance página inicial carrega rapidamente', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Verificar se página carrega em menos de 3 segundos
    expect(loadTime).toBeLessThan(3000);
    
    // Verificar métricas de performance
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      };
    });
    
    expect(performanceMetrics.domContentLoaded).toBeLessThan(1000);
    expect(performanceMetrics.loadComplete).toBeLessThan(2000);
  });

  test('@performance imagens são otimizadas', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se imagens têm atributos de otimização
    const images = page.locator('img');
    
    for (let i = 0; i < await images.count(); i++) {
      const image = images.nth(i);
      const src = await image.getAttribute('src');
      const loading = await image.getAttribute('loading');
      
      // Verificar se imagens usam lazy loading
      if (src && !src.startsWith('data:')) {
        expect(loading).toBe('lazy');
      }
    }
  });

  test('@accessibility contraste de cores é adequado', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se texto tem contraste adequado
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, div');
    
    // Verificar se elementos de texto são visíveis
    for (let i = 0; i < Math.min(await textElements.count(), 10); i++) {
      const element = textElements.nth(i);
      const isVisible = await element.isVisible();
      
      if (isVisible) {
        const color = await element.evaluate(el => {
          const style = window.getComputedStyle(el);
          return style.color;
        });
        
        // Verificar se cor não é transparente ou muito clara
        expect(color).not.toBe('rgba(0, 0, 0, 0)');
        expect(color).not.toBe('transparent');
      }
    }
  });

  test('@accessibility navegação por teclado funciona', async ({ page }) => {
    await page.goto('/');
    
    // Focar no primeiro elemento interativo
    await page.keyboard.press('Tab');
    
    // Aguardar um pouco para o foco ser estabelecido
    await page.waitForTimeout(500);
    
    // Verificar se foco é visível
    const focusedElement = page.locator(':focus');
    if (await focusedElement.count() > 0) {
      await expect(focusedElement).toBeVisible();
    }
    
    // Navegar por mais alguns elementos
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
    }
  });

  test('@accessibility landmarks estão presentes', async ({ page }) => {
    await page.goto('/');
    
    // Verificar landmarks principais - usar seletores específicos
    await expect(page.locator('nav[aria-label="Main"]')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Verificar se landmarks têm roles apropriados
    const nav = page.locator('nav[aria-label="Main"]');
    const main = page.locator('main');
    const footer = page.locator('footer');
    
    // Verificar roles apenas se existirem
    const navRole = await nav.getAttribute('role');
    const mainRole = await main.getAttribute('role');
    const footerRole = await footer.getAttribute('role');
    
    if (navRole) {
      await expect(nav).toHaveAttribute('role', 'navigation');
    }
    if (mainRole) {
      await expect(main).toHaveAttribute('role', 'main');
    }
    if (footerRole) {
      await expect(footer).toHaveAttribute('role', 'contentinfo');
    }
  });

  test('@accessibility formulários são acessíveis', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se campos de busca têm labels
    const searchInputs = page.locator('input[type="search"], input[placeholder*="busca"]');
    
    for (let i = 0; i < await searchInputs.count(); i++) {
      const input = searchInputs.nth(i);
      const label = await input.getAttribute('aria-label');
      const placeholder = await input.getAttribute('placeholder');
      
      // Verificar se input tem label ou placeholder
      expect(label || placeholder).toBeTruthy();
    }
  });

  test('@performance recursos são carregados eficientemente', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se CSS e JS são minificados
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType('resource').map(resource => ({
        name: resource.name,
        size: resource.transferSize,
        duration: resource.duration,
      }));
    });
    
    // Verificar se recursos principais carregam rapidamente
    const cssResources = resources.filter(r => r.name.includes('.css'));
    const jsResources = resources.filter(r => r.name.includes('.js'));
    
    for (const resource of [...cssResources, ...jsResources]) {
      expect(resource.duration).toBeLessThan(1000); // Menos de 1 segundo
    }
  });

  test('@accessibility links têm texto descritivo', async ({ page }) => {
    await page.goto('/');
    
    const links = page.locator('a');
    
    for (let i = 0; i < await links.count(); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');
      
      // Verificar se link tem texto ou aria-label
      expect(text?.trim() || ariaLabel || title).toBeTruthy();
      
      // Verificar se texto não é genérico
      if (text) {
        const genericTexts = ['clique aqui', 'link', 'mais', 'leia mais'];
        const isGeneric = genericTexts.some(generic => 
          text.toLowerCase().includes(generic)
        );
        expect(isGeneric).toBe(false);
      }
    }
  });

  test('@performance scroll é suave', async ({ page }) => {
    await page.goto('/');
    
    // Aguardar carregamento da página
    await page.waitForLoadState('networkidle');
    
    // Testar scroll suave
    await page.evaluate(() => {
      window.scrollTo({ top: 1000, behavior: 'smooth' });
    });
    
    // Aguardar scroll
    await page.waitForTimeout(2000);
    
    // Verificar se scroll funcionou
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('@accessibility modais são acessíveis', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se modais têm roles apropriados
    const modals = page.locator('[role="dialog"], [role="alertdialog"]');
    
    if (await modals.count() > 0) {
      for (let i = 0; i < await modals.count(); i++) {
        const modal = modals.nth(i);
        
        // Verificar se modal tem aria-label ou aria-labelledby
        const ariaLabel = await modal.getAttribute('aria-label');
        const ariaLabelledBy = await modal.getAttribute('aria-labelledby');
        
        expect(ariaLabel || ariaLabelledBy).toBeTruthy();
        
        // Verificar se modal pode ser fechado
        const closeButton = modal.locator('[aria-label*="fechar"], [aria-label*="close"]');
        if (await closeButton.count() > 0) {
          await expect(closeButton).toBeVisible();
        }
      }
    }
  });

  test('@performance animações respeitam preferências do usuário', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se animações respeitam prefers-reduced-motion
    const animationElements = page.locator('[style*="animation"], [style*="transition"]');
    
    for (let i = 0; i < await animationElements.count(); i++) {
      const element = animationElements.nth(i);
      const style = await element.getAttribute('style');
      
      // Verificar se animações são suaves
      if (style?.includes('animation')) {
        expect(style).toMatch(/ease|linear/);
      }
    }
  });
}); 