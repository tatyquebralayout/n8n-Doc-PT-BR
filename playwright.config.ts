import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 2,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Configurações de timeout mais generosas
    actionTimeout: 15000,
    navigationTimeout: 20000,
    // Aguardar carregamento da página
    waitForLoadState: 'domcontentloaded',
    // Configuração de viewport padrão
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000, // 3 minutos
    stderr: 'pipe',
    stdout: 'pipe',
  },

  // Configurações globais de timeout
  timeout: 60000, // 1 minuto por teste
  expect: {
    timeout: 10000, // 10 segundos para expectativas
  },

  // Configurações de retry
  retries: process.env.CI ? 2 : 1,

  // Configurações de output
  outputDir: 'test-results/',
}); 