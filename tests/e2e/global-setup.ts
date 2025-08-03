import { test as base } from '@playwright/test';

// Configuração global para todos os testes
export const test = base.extend({
  // Configuração de timeout mais generosa
  timeout: 30000,
  
  // Configuração de retry para testes instáveis
  retries: 1,
  
  // Configuração de viewport padrão
  use: {
    viewport: { width: 1280, height: 720 },
    // Aguardar carregamento da página
    waitForLoadState: 'networkidle',
    // Configuração de timeout para ações
    actionTimeout: 10000,
    // Configuração de timeout para navegação
    navigationTimeout: 15000,
  },
});

export { expect } from '@playwright/test'; 