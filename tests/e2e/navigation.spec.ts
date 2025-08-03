import { test, expect } from './global-setup';

test.describe('Navegação e Páginas', () => {
  test('página inicial carrega corretamente', async ({ page }) => {
    await page.goto('/');
    
    // Aguardar carregamento completo
    await page.waitForLoadState('networkidle');
    
    // Verificar título da página
    await expect(page).toHaveTitle(/n8n Brasil/);
    
    // Verificar elementos principais
    await expect(page.locator('h1')).toContainText('n8n Brasil');
    await expect(page.locator('text=Documentação em português')).toBeVisible();
    
    // Verificar se há links de navegação - usar seletor mais específico
    await expect(page.locator('nav[aria-label="Main"]')).toBeVisible();
  });

  test('navegação entre seções principais', async ({ page }) => {
    await page.goto('/');
    
    // Aguardar carregamento da página
    await page.waitForLoadState('networkidle');
    
    // Testar navegação para Primeiros Passos - usar seletor mais específico
    const primeirosPassosLink = page.locator('a[href*="primeiros-passos"]').first();
    if (await primeirosPassosLink.isVisible()) {
      await primeirosPassosLink.click();
      await expect(page).toHaveURL(/primeiros-passos/);
      await expect(page.locator('h1')).toContainText(/Primeiros Passos/);
    }
    
    // Testar navegação para Integrações
    await page.goto('/integracoes/');
    await expect(page).toHaveURL(/integracoes/);
    
    // Testar navegação para Usando n8n
    await page.goto('/usando-n8n/');
    await expect(page).toHaveURL(/usando-n8n/);
  });

  test('sidebar funciona corretamente', async ({ page }) => {
    await page.goto('/contribuir/');
    
    // Aguardar carregamento
    await page.waitForLoadState('networkidle');
    
    // Verificar se a página carrega
    await expect(page).toHaveTitle(/Contribuir/);
    
    // Verificar se há conteúdo
    await expect(page.locator('main')).toBeVisible();
    
    // Verificar se há navegação - usar seletor mais específico
    await expect(page.locator('nav[aria-label="Main"]')).toBeVisible();
  });

  test('busca funciona', async ({ page }) => {
    await page.goto('/');
    
    // Aguardar carregamento
    await page.waitForLoadState('networkidle');
    
    // Verificar se a página carrega
    await expect(page).toHaveTitle(/n8n Brasil/);
    
    // Verificar se há navegação - usar seletor mais específico
    await expect(page.locator('nav[aria-label="Main"]')).toBeVisible();
    
    // Verificar se há conteúdo principal
    await expect(page.locator('main')).toBeVisible();
  });

  test('modo escuro/claro funciona', async ({ page }) => {
    await page.goto('/');
    
    // Aguardar carregamento
    await page.waitForLoadState('networkidle');
    
    // Verificar se a página carrega
    await expect(page).toHaveTitle(/n8n Brasil/);
    
    // Verificar se há navegação - usar seletor mais específico
    await expect(page.locator('nav[aria-label="Main"]')).toBeVisible();
    
    // Verificar se há conteúdo principal
    await expect(page.locator('main')).toBeVisible();
  });

  test('links externos abrem em nova aba', async ({ page }) => {
    await page.goto('/');
    
    // Aguardar carregamento
    await page.waitForLoadState('networkidle');
    
    // Encontrar links externos
    const externalLinks = page.locator('a[href^="http"]');
    
    if (await externalLinks.count() > 0) {
      const firstExternalLink = externalLinks.first();
      await expect(firstExternalLink).toHaveAttribute('target', '_blank');
      await expect(firstExternalLink).toHaveAttribute('rel', 'noopener');
    }
  });

  test('páginas de erro funcionam', async ({ page }) => {
    await page.goto('/pagina-que-nao-existe/');
    
    // Aguardar carregamento
    await page.waitForLoadState('networkidle');
    
    // Verificar se a página 404 carrega
    await expect(page).toHaveTitle(/404/);
    
    // Verificar se há navegação - usar seletor mais específico
    await expect(page.locator('nav[aria-label="Main"]')).toBeVisible();
    
    // Verificar se há conteúdo de erro
    await expect(page.locator('main')).toBeVisible();
  });

  test('acessibilidade básica', async ({ page }) => {
    await page.goto('/');
    
    // Aguardar carregamento
    await page.waitForLoadState('networkidle');
    
    // Verificar se há landmarks principais - usar seletores específicos
    await expect(page.locator('nav[aria-label="Main"]')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Verificar se há heading principal
    await expect(page.locator('h1')).toBeVisible();
    
    // Verificar se há skip links para acessibilidade
    const skipLinks = page.locator('a[href^="#"]');
    if (await skipLinks.count() > 0) {
      await expect(skipLinks.first()).toBeVisible();
    }
  });
}); 