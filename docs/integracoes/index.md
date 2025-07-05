---
title: Integrações
sidebar_label: Visão Geral
description: Entenda os diferentes tipos de nodes e integrações disponíveis no n8n.
keywords: [n8n, nodes, integrações, overview, builtin, trigger, app, community]
---
import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="extension-puzzle-outline" size={32} /> Visão Geral de Integrações

O poder do n8n está em sua capacidade de conectar centenas de aplicações e serviços. Esta seção é o seu guia para entender e utilizar todo o potencial das integrações.

## <IonicIcon name="help-circle-outline" size={24} color="#ea4b71" /> O que são Nodes?

**Nodes** são os blocos fundamentais do n8n. Cada node representa uma ação específica que pode ser executada em um workflow:

- <IonicIcon name="cog-outline" size={16} color="#6b7280" /> **Processamento de dados**
- <IonicIcon name="wifi-outline" size={16} color="#6b7280" /> **Chamadas de API**
- <IonicIcon name="play-outline" size={16} color="#6b7280" /> **Gatilhos para iniciar workflows**
- <IonicIcon name="link-outline" size={16} color="#6b7280" /> **Conexões com aplicações externas**

## <IonicIcon name="grid-outline" size={24} color="#ea4b71" /> Categorias de Nodes

### <IonicIcon name="library-outline" size={20} color="#10b981" /> **Core Nodes (Nativos)**
Nodes internos essenciais que vêm instalados por padrão.

**Exemplos principais:**
- <IonicIcon name="globe-outline" size={16} color="#6b7280" /> **HTTP Request** - Chamadas para APIs REST
- <IonicIcon name="git-branch-outline" size={16} color="#6b7280" /> **IF** - Lógica condicional
- <IonicIcon name="create-outline" size={16} color="#6b7280" /> **Set** - Manipulação de dados
- <IonicIcon name="code-outline" size={16} color="#6b7280" /> **Function** - Código JavaScript customizado

<IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" /> **[ Ver Core Nodes →](./builtin-nodes/http-requests/webhook)**

---

### <IonicIcon name="flash-outline" size={20} color="#10b981" /> **Trigger Nodes (Gatilhos)**
Nodes especiais que **iniciam** workflows automaticamente.

**Tipos de gatilhos:**
- <IonicIcon name="hand-left-outline" size={16} color="#6b7280" /> **Manual Trigger** - Execução manual
- <IonicIcon name="wifi-outline" size={16} color="#6b7280" /> **Webhook Trigger** - Resposta a webhooks
- <IonicIcon name="time-outline" size={16} color="#6b7280" /> **Schedule Trigger** - Execução agendada
- <IonicIcon name="mail-outline" size={16} color="#6b7280" /> **Email Trigger** - Baseado em emails

<IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" /> **[ Ver Trigger Nodes →](./trigger-nodes/time-based/manual-trigger)**

---

### <IonicIcon name="apps-outline" size={20} color="#10b981" /> **Integrações com Apps**

**Categorias principais:**
- <IonicIcon name="briefcase-outline" size={16} color="#6b7280" /> ** Produtividade** - Google Sheets, Notion, Airtable
- <IonicIcon name="chatbubbles-outline" size={16} color="#6b7280" /> ** Comunicação** - Slack, Teams, Discord 
- <IonicIcon name="mail-outline" size={16} color="#6b7280" /> ** Email** - Gmail, Outlook, SendGrid
- <IonicIcon name="storefront-outline" size={16} color="#6b7280" /> ** E-commerce** - Shopify, WooCommerce, Stripe
- <IonicIcon name="megaphone-outline" size={16} color="#6b7280" /> ** Marketing** - HubSpot, Mailchimp, Facebook

<IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" /> **[ Ver Integrações →](./app-nodes/productivity/google-sheets)**

---

### <IonicIcon name="people-outline" size={20} color="#10b981" /> **Nodes da Comunidade**
Integrações criadas pela comunidade global do n8n.

**Características:**
- <IonicIcon name="download-outline" size={16} color="#6b7280" /> **Instalação via npm**
- <IonicIcon name="code-outline" size={16} color="#6b7280" /> **Código open-source** 
- <IonicIcon name="refresh-outline" size={16} color="#6b7280" /> **Constantemente atualizados**
- <IonicIcon name="extension-puzzle-outline" size={16} color="#6b7280" /> **Cobertura de serviços especializados**

<IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" /> **[ Ver Community Nodes →](./community-nodes/overview)**

---

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> **Autenticação e Credenciais**
Sistemas seguros para gerenciar credenciais.

**Métodos disponíveis:**
- <IonicIcon name="key-outline" size={16} color="#6b7280" /> **OAuth2** - Autenticação moderna
- <IonicIcon name="card-outline" size={16} color="#6b7280" /> **API Keys** - Chaves de API
- <IonicIcon name="person-outline" size={16} color="#6b7280" /> **Basic Auth** - Usuário e senha
- <IonicIcon name="finger-print-outline" size={16} color="#6b7280" /> **Bearer Token** - Tokens de acesso

<IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" /> **[ Ver Credenciais →](./credential-nodes/oauth)**

---

### <IonicIcon name="construct-outline" size={20} color="#10b981" /> **Desenvolvimento de Nodes**
Aprenda a criar seus próprios nodes customizados.

**Processo completo:**
1. <IonicIcon name="cube-outline" size={16} color="#6b7280" /> **Estruturação** - Anatomia de um node
2. <IonicIcon name="code-outline" size={16} color="#6b7280" /> **Desenvolvimento** - Código TypeScript
3. <IonicIcon name="cloud-upload-outline" size={16} color="#6b7280" /> **Publicação** - NPM e comunidade
4. <IonicIcon name="refresh-circle-outline" size={16} color="#6b7280" /> **Manutenção** - Updates e melhorias

<IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" /> **[ Ver Tutorial →](./criar-nodes/tutorial-desenvolvimento)**

## <IonicIcon name="location-outline" size={24} color="#ea4b71" /> **Foco Brasileiro**

Além dos nodes globais, temos integrações específicas para o mercado brasileiro:

### <IonicIcon name="card-outline" size={20} color="#10b981" /> **Financeiro**
- <IonicIcon name="flash-outline" size={16} color="#6b7280" /> **PIX** - Sistema de pagamentos instantâneos
- <IonicIcon name="business-outline" size={16} color="#6b7280" /> **Bancos brasileiros** - Integração com APIs bancárias

### <IonicIcon name="shield-outline" size={20} color="#10b981" /> **Governo e Receita**
- <IonicIcon name="document-text-outline" size={16} color="#6b7280" /> **CNPJ/CPF** - Consultas à Receita Federal
- <IonicIcon name="list-outline" size={16} color="#6b7280" /> **CNAE** - Classificação de atividades
- <IonicIcon name="calculator-outline" size={16} color="#6b7280" /> **Simples Nacional** - Regime tributário

### <IonicIcon name="navigate-outline" size={20} color="#10b981" /> **Localização**
- <IonicIcon name="pin-outline" size={16} color="#6b7280" /> **ViaCEP** - Consulta de CEPs
- <IonicIcon name="map-outline" size={16} color="#6b7280" /> **IBGE** - Dados geográficos
- <IonicIcon name="mail-outline" size={16} color="#6b7280" /> **Correios** - Rastreamento e frete

<IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" /> **[ Ver Integrações BR →](../integracoes-br/pix)**

## <IonicIcon name="play-outline" size={24} color="#ea4b71" /> **Como Começar?**

### <IonicIcon name="school-outline" size={20} color="#10b981" /> 1. **Para Iniciantes**
```
Core Nodes → Trigger Nodes → Integrações básicas
```

### <IonicIcon name="code-outline" size={20} color="#10b981" /> 2. **Para Desenvolvedores**
```
HTTP Request → Function Node → Custom Nodes
```

### <IonicIcon name="business-outline" size={20} color="#10b981" /> 3. **Para Empresas**
```
App Integrations → Credenciais → Community Nodes
```

## <IonicIcon name="analytics-outline" size={24} color="#ea4b71" /> **Estatísticas do Ecossistema**

| Categoria | Quantidade | Exemplos |
|-----------|------------|----------|
| **Core Nodes** | 20+ | IF, Set, HTTP Request |
| **App Integrations** | 400+ | Google, Slack, Notion |
| **Community Nodes** | 200+ | APIs especializadas |
| **Trigger Types** | 15+ | Webhook, Schedule, Email |

## <IonicIcon name="compass-outline" size={24} color="#ea4b71" /> **Dicas de Navegação**

- <IonicIcon name="search-outline" size={16} color="#6b7280" /> **Use a busca** para encontrar nodes específicos
- <IonicIcon name="library-outline" size={16} color="#6b7280" /> **Explore por categoria** quando estiver aprendendo
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Comece pelos populares** para casos comuns
- <IonicIcon name="target-outline" size={16} color="#6b7280" /> **Foque no seu caso de uso** para ser mais eficiente

## <IonicIcon name="help-circle-outline" size={24} color="#ea4b71" /> **Precisa de Ajuda?**

- <IonicIcon name="book-outline" size={16} color="#6b7280" /> **[Documentação oficial](https://docs.n8n.io/integrations/)** - Catálogo completo
- <IonicIcon name="people-outline" size={16} color="#6b7280" /> **[Comunidade n8n](https://community.n8n.io)** - Fórum de discussões
- <IonicIcon name="logo-github" size={16} color="#6b7280" /> **[GitHub](https://github.com/n8n-io/n8n)** - Issues e contribuições

---

** Explore as categorias acima para descobrir todos os nodes disponíveis!**