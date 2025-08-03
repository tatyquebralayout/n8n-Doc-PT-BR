# Testes - n8n Documentação PT-BR

Este diretório contém todos os testes para a documentação do n8n em português brasileiro.

## Estrutura

```
tests/
├── e2e/                    # Testes end-to-end
│   ├── components.spec.ts  # Testes de componentes
│   ├── content-validation.spec.ts  # Validação de conteúdo
│   ├── global-setup.ts     # Configuração global
│   └── ...
└── README.md              # Este arquivo
```

## Tipos de Testes

### Testes Unitários
- **Localização**: `src/**/__tests__/` e `src/**/*.{test,spec}.{js,jsx,ts,tsx}`
- **Framework**: Jest + React Testing Library
- **Cobertura**: 70% mínima (branches, functions, lines, statements)

### Testes E2E
- **Framework**: Playwright
- **Navegadores**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Timeout**: 60 segundos por teste
- **Retry**: 1 retry em desenvolvimento, 2 em CI

## Scripts Disponíveis

### Execução de Testes
```bash
# Todos os testes
npm run test:all

# Testes individuais (evita timeouts)
npm run test:individual

# Verificar build antes dos testes
npm run test:check-build

# Execução completa com verificação
npm run test:fix
```

### Testes Específicos
```bash
# Testes unitários
npm test                    # Todos os testes unitários
npm test -- --coverage     # Com cobertura
npm test -- --watch        # Modo watch

# Testes E2E
npm run test:e2e           # Todos os testes E2E
npm run test:e2e:ui        # Interface visual
npm run test:e2e:headed    # Com navegador visível
npm run test:e2e:debug     # Modo debug

# Testes específicos
npm run test:accessibility # Testes de acessibilidade
npm run test:performance   # Testes de performance
npm run test:visual        # Testes visuais
```

## Configurações

### Jest (Testes Unitários)
- **Preset**: ts-jest
- **Environment**: jsdom
- **Coverage**: text, lcov, html, json
- **Timeout**: 10 segundos
- **Transform**: Suporte completo a TypeScript e React

### Playwright (Testes E2E)
- **Base URL**: http://localhost:3000
- **Timeout**: 60 segundos por teste
- **Retry**: 1-2 tentativas
- **Workers**: 2 em desenvolvimento, 1 em CI
- **Screenshots**: Apenas em falhas
- **Videos**: Apenas em falhas

## Problemas Resolvidos

### 1. Jest Coverage
- **Problema**: Instrumentação falhando devido a incompatibilidade do babel-plugin-istanbul
- **Solução**: Configuração otimizada do ts-jest com suporte nativo a cobertura
- **Melhorias**: 
  - Threshold de 70% para todas as métricas
  - Exclusão de arquivos desnecessários
  - Suporte a transformações TypeScript

### 2. E2E 404 Errors
- **Problema**: Páginas não encontradas durante execução dos testes
- **Solução**: 
  - Verificação de build antes dos testes
  - Tratamento de erros mais robusto
  - Timeouts aumentados
  - Verificação de servidor antes dos testes

### 3. Timeouts
- **Problema**: Testes demorando muito para executar
- **Solução**:
  - Script para testes individuais
  - Timeouts otimizados
  - Configuração de workers
  - Retry configurável

## Relatórios

Os testes geram relatórios em:
- `test-results/test-report.json` - Relatório geral
- `test-results/individual-tests-report.json` - Testes individuais
- `test-results/build-report.json` - Verificação de build
- `coverage/` - Cobertura de testes unitários
- `playwright-report/` - Relatórios do Playwright

## Troubleshooting

### Servidor não inicia
```bash
# Verificar se porta está livre
npm run kill-port

# Iniciar servidor manualmente
npm run start
```

### Testes E2E falham
```bash
# Verificar build
npm run test:check-build

# Executar testes individuais
npm run test:individual
```

### Cobertura baixa
```bash
# Verificar configuração do Jest
npm test -- --coverage --verbose

# Verificar arquivos excluídos
cat jest.config.js
```

## Melhorias Implementadas

### Configuração Jest
- ✅ Suporte completo a TypeScript
- ✅ Cobertura otimizada
- ✅ Timeouts configuráveis
- ✅ Transformações customizadas

### Configuração Playwright
- ✅ Múltiplos navegadores
- ✅ Timeouts aumentados
- ✅ Retry configurável
- ✅ Relatórios detalhados

### Scripts de Suporte
- ✅ Verificação de build
- ✅ Testes individuais
- ✅ Relatórios automáticos
- ✅ Troubleshooting integrado

### Tratamento de Erros
- ✅ Verificação de servidor
- ✅ Tratamento de 404
- ✅ Timeouts robustos
- ✅ Logs detalhados

## Próximos Passos

1. **Monitoramento**: Implementar monitoramento contínuo dos testes
2. **Performance**: Otimizar tempo de execução dos testes
3. **Cobertura**: Aumentar cobertura para 80%
4. **Automação**: Integrar com CI/CD
5. **Documentação**: Adicionar mais exemplos de testes 