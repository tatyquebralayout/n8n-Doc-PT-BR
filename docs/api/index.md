---
sidebar_position: 1
title: API REST do n8n: Integração Programática, Endpoints e Webhooks
description: Documentação completa da API REST do n8n, exemplos de uso, integração programática, endpoints, webhooks e autenticação para automação empresarial.
keywords: [n8n, API, REST, endpoints, autenticação, webhooks, API n8n Brasil, documentação REST, integração programática, exemplos de uso, integração com sistemas externos]
---

# API REST do n8n: Integração Programática, Endpoints e Webhooks

Bem-vindo à documentação da API REST do n8n! Aqui você encontrará tudo o que precisa para integrar e automatizar o n8n programaticamente, com exemplos de uso, endpoints, webhooks, autenticação e integração com sistemas externos para empresas brasileiras.

## O que você encontrará aqui

- [Guia de autenticação e segurança da API n8n](./conceitos/autenticacao)
- [Guia de paginação para grandes volumes de dados](./conceitos/paginacao)
- [Playground interativo para testar a API](./ferramentas/playground)
- [Referência completa dos endpoints da API](./referencia/referencia-api)

---

## <ion-icon name="book-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conceitos {#conceitos}

- **[Visão Geral](./conceitos/)** – Introdução aos conceitos da API
- **[Autenticação](./conceitos/autenticacao)** – Métodos de autenticação e segurança
- **[Paginação](./conceitos/paginacao)** – Como navegar por grandes volumes de dados

---

## <ion-icon name="construct-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Ferramentas {#ferramentas}

- **[Visão Geral das Ferramentas](./ferramentas/)** – Recursos disponíveis
- **[Playground](./ferramentas/playground)** – Teste a API de forma interativa

---

## <ion-icon name="document-text-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Referência {#referencia}

- **[Visão Geral da Referência](./referencia/)** – Documentação completa
- **[Referência da API](./referencia/referencia-api)** – Endpoints e parâmetros detalhados

---

## <ion-icon name="server-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Endpoints Principais {#endpoints-principais}

### Workflows
- `GET /workflows` – Listar workflows
- `POST /workflows` – Criar workflow
- `PUT /workflows/{id}` – Atualizar workflow
- `DELETE /workflows/{id}` – Excluir workflow

### Execuções
- `GET /executions` – Listar execuções
- `POST /workflows/{id}/trigger` – Executar workflow
- `GET /executions/{id}` – Obter detalhes da execução

### Credenciais
- `GET /credentials` – Listar credenciais
- `POST /credentials` – Criar credencial
- `PUT /credentials/{id}` – Atualizar credencial

---

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Comece com os [Conceitos](./conceitos/)** para entender os fundamentos
2. **Explore as [Ferramentas](./ferramentas/)** para recursos práticos
3. **Consulte a [Referência](./referencia/)** para detalhes completos

---

## <ion-icon name="link-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[Primeiros Passos](../primeiros-passos/guia-instalacao)** – Conceitos fundamentais
- **[Usando n8n](../usando-n8n)** – Guias práticos
- **[Integrações](../integracoes)** – Conectar com aplicações externas

---

> <span style={{fontSize: '18px', fontWeight: 'bold'}}>**Automatize o n8n programaticamente e integre automações em seus sistemas!**</span>
