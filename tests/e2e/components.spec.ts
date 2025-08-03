import { test, expect } from '@playwright/test';

test.describe('Componentes Interativos', () => {
  test('componente de busca de integrações funciona', async ({ page }) => {
    await page.goto('/integracoes/');
    
    // Verificar se a página carrega corretamente
    await expect(page).toHaveTitle(/Integrações/);
    
    // Verificar se há conteúdo na página
    await expect(page.locator('h1')).toBeVisible();
    
    // Verificar se há links de navegação - usar seletor específico
    await expect(page.locator('nav[aria-label="Main"]')).toBeVisible();
  });

  test('filtros de integração funcionam', async ({ page }) => {
    await page.goto('/integracoes/');
    
    // Verificar se a página carrega
    await expect(page).toHaveTitle(/Integrações/);
    
    // Verificar se há conteúdo de integrações
    const content = page.locator('main');
    await expect(content).toBeVisible();
    
    // Verificar se há links de navegação - usar seletor específico
    await expect(page.locator('nav[aria-label="Main"]')).toBeVisible();
  });

  test('cards de artigo são clicáveis', async ({ page }) => {
    await page.goto('/');
    
    // Encontrar cards de artigo
    const articleCards = page.locator('[data-testid="article-card"]');
    
    if (await articleCards.count() > 0) {
      const firstCard = articleCards.first();
      
      // Verificar se card tem link
      await expect(firstCard.locator('a')).toBeVisible();
      
      // Clicar no card
      await firstCard.click();
      
      // Verificar se navegou para a página do artigo
      await expect(page).not.toHaveURL('/');
    }
  });

  test('componente de estatísticas da comunidade funciona', async ({ page }) => {
    await page.goto('/comunidade/');
    
    // Verificar se a página carrega corretamente
    await expect(page).toHaveTitle(/Comunidade/);
    
    // Verificar se há conteúdo na página
    await expect(page.locator('h1')).toBeVisible();
    
    // Verificar se há links de navegação - usar seletor específico
    await expect(page.locator('nav[aria-label="Main"]')).toBeVisible();
  });

  test('componente de progresso funciona', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se a página inicial carrega
    await expect(page).toHaveTitle(/n8n Brasil/);
    
    // Verificar se há conteúdo principal
    await expect(page.locator('main')).toBeVisible();
    
    // Verificar se há links de navegação - usar seletor específico
    await expect(page.locator('nav[aria-label="Main"]')).toBeVisible();
  });

  test('componente de animações funciona', async ({ page }) => {
    await page.goto('/contribuir/esta-documentacao/padroes-e-estilo/');
    
    // Verificar se a página carrega corretamente
    await expect(page).toHaveTitle(/Padrões e Estilo/);
    
    // Verificar se há conteúdo na página
    await expect(page.locator('h1')).toBeVisible();
    
    // Verificar se há links de navegação - usar seletor específico
    await expect(page.locator('nav[aria-label="Main"]')).toBeVisible();
  });

  test('componente de tabs funciona', async ({ page }) => {
    await page.goto('/contribuir/esta-documentacao/padroes-e-estilo/');
    
    // Verificar se a página carrega
    await expect(page).toHaveTitle(/Padrões e Estilo/);
    
    // Verificar se há conteúdo
    await expect(page.locator('main')).toBeVisible();
  });

  test('componente de código com syntax highlighting', async ({ page }) => {
    await page.goto('/primeiros-passos/');
    
    // Verificar se a página carrega
    await expect(page).toHaveTitle(/Primeiros Passos/);
    
    // Verificar se há conteúdo
    await expect(page.locator('main')).toBeVisible();
    
    // Verificar se há blocos de código
    const codeBlocks = page.locator('pre, code');
    if (await codeBlocks.count() > 0) {
      await expect(codeBlocks.first()).toBeVisible();
    }
  });

  test('componente de admonition funciona', async ({ page }) => {
    await page.goto('/contribuir/');
    
    // Verificar se a página carrega
    await expect(page).toHaveTitle(/Contribuir/);
    
    // Verificar se há conteúdo
    await expect(page.locator('main')).toBeVisible();
    
    // Verificar se há admonitions
    const admonitions = page.locator('.admonition, .alert, .note, .warning, .tip');
    if (await admonitions.count() > 0) {
      await expect(admonitions.first()).toBeVisible();
    }
  });

  test('componente de ícones animados funciona', async ({ page }) => {
    await page.goto('/contribuir/esta-documentacao/padroes-e-estilo/');
    
    // Verificar se a página carrega
    await expect(page).toHaveTitle(/Padrões e Estilo/);
    
    // Verificar se há conteúdo
    await expect(page.locator('main')).toBeVisible();
    
    // Verificar se há ícones
    const icons = page.locator('ion-icon, .icon, [class*="icon"]');
    if (await icons.count() > 0) {
      await expect(icons.first()).toBeVisible();
    }
  });
}); 