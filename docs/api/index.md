---
sidebar_position: 1
title: API
description: Documentação completa da API REST do n8n
keywords: [n8n, API, REST, endpoints, autenticação, webhooks]
---

# API do n8n

Bem-vindo à documentação da API REST do n8n! Aqui você encontrará tudo o que precisa para integrar e automatizar o n8n programaticamente.

## O que você encontrará aqui

### 📚 Conceitos
- **Visão Geral**: Introdução aos conceitos da API
- **Autenticação**: Métodos de autenticação e segurança
- **Paginação**: Como navegar por grandes volumes de dados

### 🛠️ Ferramentas
- **Visão Geral das Ferramentas**: Recursos disponíveis
- **Playground**: Teste a API de forma interativa

### 📖 Referência
- **Visão Geral da Referência**: Documentação completa
- **Referência da API**: Endpoints e parâmetros detalhados

## Conceitos Fundamentais

### API REST
O n8n oferece uma API REST completa que permite:
- Gerenciar workflows programaticamente
- Executar workflows via API
- Acessar dados e metadados
- Configurar integrações remotamente

### Autenticação
A API suporta múltiplos métodos de autenticação:
- API Keys para acesso programático
- OAuth 2.0 para aplicações de terceiros
- Autenticação básica para desenvolvimento

### Webhooks
Integre o n8n com sistemas externos através de webhooks:
- Receba dados de aplicações externas
- Dispare workflows baseados em eventos
- Sincronize dados em tempo real

## Endpoints Principais

### Workflows
- `GET /workflows` - Listar workflows
- `POST /workflows` - Criar workflow
- `PUT /workflows/{id}` - Atualizar workflow
- `DELETE /workflows/{id}` - Excluir workflow

### Execuções
- `GET /executions` - Listar execuções
- `POST /workflows/{id}/trigger` - Executar workflow
- `GET /executions/{id}` - Obter detalhes da execução

### Credenciais
- `GET /credentials` - Listar credenciais
- `POST /credentials` - Criar credencial
- `PUT /credentials/{id}` - Atualizar credencial

## Próximos Passos

1. **Comece com os [Conceitos](./conceitos/index)** para entender os fundamentos
2. **Explore as [Ferramentas](./ferramentas/index)** para recursos práticos
3. **Consulte a [Referência](./referencia/index)** para detalhes completos

## Recursos Relacionados

- **[Tutorial Básico](../tutorial-basico/instalacao)** - Conceitos fundamentais
- **[Usando n8n](../usando-n8n)** - Guias práticos
- **[Integrações](../integracoes)** - Conectar com aplicações externas 