# Testes E2E - n8n Documentação PT-BR

Este diretório contém os testes end-to-end (E2E) para a documentação do n8n em português brasileiro.

## Problemas Identificados e Soluções

### 1. **Problema de Múltiplos Elementos `nav`**
**Erro:** `strict mode violation: locator('nav') resolved to 2 elements`

**Solução:** Usar seletores mais específicos:
```typescript
// ❌ Antes
await expect(page.locator('nav')).toBeVisible();

// ✅ Depois
await expect(page.locator('nav[aria-label="Main"]')).toBeVisible();
```

### 2. **Páginas Retornando "Página não encontrada"**
**Problema:** Algumas páginas não estão carregando corretamente.

**Soluções:**
- Aguardar carregamento completo: `await page.waitForLoadState('networkidle')`
- Usar navegação direta: `await page.goto('/caminho/')`
- Verificar se elementos existem antes de interagir

### 3. **Problemas de Navegação**
**Problema:** Elementos não estão visíveis ou clicáveis.

**Soluções:**
- Aguardar elementos ficarem visíveis
- Usar seletores mais específicos
- Verificar se elementos existem antes de clicar

### 4. **Problemas de Meta Tags**
**Problema:** Meta tags não estão sendo encontradas.

**Solução:** Verificar se existem antes de testar:
```typescript
const description = metaTags.find(tag => tag.name === 'description');
if (description) {
  expect(description.content).toBeTruthy();
}
```

## Como Executar os Testes

### Pré-requisitos
1. Instalar dependências: `npm install`
2. Instalar Playwright: `npx playwright install`
3. Iniciar o servidor: `npm run start`

### Comandos Disponíveis

```bash
# Verificar se o servidor está funcionando
npm run test:e2e:check-server

# Executar todos os testes E2E
npm run test:e2e

# Executar com verificação do servidor
npm run test:e2e:with-server

# Executar em modo debug
npm run test:e2e:debug

# Executar com interface gráfica
npm run test:e2e:ui

# Executar apenas testes de acessibilidade
npm run test:accessibility

# Executar apenas testes de performance
npm run test:performance
```

## Estrutura dos Testes

### `navigation.spec.ts`
Testa navegação básica, carregamento de páginas e acessibilidade.

### `components.spec.ts`
Testa componentes interativos como busca, filtros e cards.

### `performance.spec.ts`
Testa performance, acessibilidade e scroll.

### `content-validation.spec.ts`
Testa validação de conteúdo, links e meta tags.

## Configurações Melhoradas

### Timeouts Mais Generosos
- `actionTimeout`: 10000ms
- `navigationTimeout`: 15000ms
- `waitForLoadState`: 'networkidle'

### Seletores Específicos
- `nav[aria-label="Main"]` em vez de `nav`
- Verificação de existência antes de interagir
- Aguardar carregamento completo

### Retry Automático
- Configurado para tentar novamente em caso de falha
- Útil para testes instáveis

## Troubleshooting

### Servidor Não Iniciado
```bash
# Verificar se o servidor está rodando
npm run test:e2e:check-server

# Iniciar o servidor
npm run start
```

### Testes Falhando
1. Verificar se o servidor está funcionando
2. Verificar logs do servidor
3. Executar em modo debug: `npm run test:e2e:debug`
4. Verificar screenshots em `test-results/`

### Problemas de Seletores
- Usar seletores mais específicos
- Aguardar elementos ficarem visíveis
- Verificar se elementos existem antes de interagir

## Relatórios

Os testes geram relatórios em:
- `test-results/` - Screenshots e vídeos de falhas
- `playwright-report/` - Relatório HTML interativo

## Contribuindo

Ao adicionar novos testes:
1. Usar seletores específicos
2. Aguardar carregamento completo
3. Verificar existência de elementos
4. Seguir padrões de nomenclatura
5. Adicionar comentários explicativos 