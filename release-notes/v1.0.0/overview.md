---
sidebar_position: 1
title: Visão Geral v1.0.0
description: Principais novidades da versão 1.0.0 do n8n
keywords: [n8n, release notes, versão 1.0.0, novidades]
---

# n8n v1.0.0 - Visão Geral

**Data de lançamento:** 15 de Janeiro de 2025  
**Tipo:** Versão Estável

A versão 1.0.0 marca um marco importante na evolução do n8n, trazendo melhorias significativas de performance, novas integrações e uma experiência de usuário aprimorada.

## 🎉 Principais Destaques

### ⚡ Performance Aprimorada
- **50% mais rápido** na execução de workflows
- Otimização do uso de memória
- Cache inteligente para requisições repetidas

### 🔗 Novas Integrações
- **+25 novos nodes** incluindo:
  - Microsoft Teams
  - Figma
  - Linear
  - Stripe v2
  - OpenAI GPT-4

### 🎨 Interface Renovada
- Nova interface de usuário mais intuitiva
- Editor de expressões melhorado
- Modo escuro nativo

### 🛡️ Segurança Reforçada
- Criptografia end-to-end para credenciais
- Auditoria de execuções
- Controle de acesso baseado em funções (RBAC)

## 📊 Estatísticas da Versão

| Métrica | Valor |
|---------|-------|
| Novos Nodes | 25 |
| Bugs Corrigidos | 147 |
| Melhorias | 89 |
| Contribuidores | 23 |

## 🚀 Como Atualizar

### Docker
```bash
docker pull n8nio/n8n:1.0.0
```

### npm
```bash
npm update n8n@1.0.0
```

### Docker Compose
```yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n:1.0.0
    # ... resto da configuração
```

## ⚠️ Mudanças Importantes

:::warning Atenção
Algumas funcionalidades foram depreciadas nesta versão. Consulte o [Guia de Migração](./migration-guide) para mais detalhes.
:::

- Node do Google Sheets v1 foi descontinuado
- API REST v1 será removida em versões futuras
- Formato de credenciais antigo não é mais suportado

## 🔗 Links Úteis

- [Novas Funcionalidades](./new-features)
- [Melhorias](./improvements) 
- [Correções de Bugs](./bug-fixes)
- [Guia de Migração](./migration-guide)

---

**Próxima versão:** v1.1.0 (prevista para Março de 2025) 