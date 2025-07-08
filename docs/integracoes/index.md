---
sidebar_position: 1
title: Introdução
description: Entenda os diferentes tipos de nodes e integrações disponíveis no n8n.
keywords: [n8n, nodes, integrações, overview, builtin, trigger, app, community]
---

#  Introdução

O poder do n8n está em sua capacidade de conectar centenas de aplicações e serviços. Esta seção é o seu guia para entender e utilizar todo o potencial das integrações.

##  O que são Nodes?

**Nodes** são os blocos fundamentais do n8n. Cada node representa uma ação específica que pode ser executada em um workflow:

-  **Processamento de dados**
-  **Chamadas de API**
-  **Gatilhos para iniciar workflows**
-  **Conexões com aplicações externas**

##  Categorias de Nodes

###  **Core Nodes (Nativos)**
Nodes internos essenciais que vêm instalados por padrão.

**Exemplos principais:**
-  **HTTP Request** - Chamadas para APIs REST
-  **IF** - Lógica condicional
-  **Set** - Manipulação de dados
-  **Function** - Código JavaScript customizado

 **[ Ver Core Nodes →](./builtin-nodes/http-requests/http-request)**

---

###  **Trigger Nodes (Gatilhos)**
Nodes especiais que **iniciam** workflows automaticamente.

**Tipos de gatilhos:**
-  **Manual Trigger** - Execução manual
-  **Webhook Trigger** - Resposta a webhooks
-  **Schedule Trigger** - Execução agendada
-  **Email Trigger** - Baseado em emails

 **[ Ver Trigger Nodes →](./trigger-nodes/time-based/manual-trigger)**

---

###  **Integrações com Apps**

**Categorias principais:**
-  ** Produtividade** - Google Sheets, Notion, Airtable
-  ** Comunicação** - Slack, Teams, Discord 
-  ** Email** - Gmail, Outlook, SendGrid
-  ** E-commerce** - Shopify, WooCommerce, Stripe
-  ** Marketing** - HubSpot, Mailchimp, Facebook

 **[ Ver Integrações →](./app-nodes/productivity/google-sheets)**

---

###  **Nodes da Comunidade**
Integrações criadas pela comunidade global do n8n.

**Características:**
-  **Instalação via npm**
-  **Código open-source** 
-  **Constantemente atualizados**
-  **Cobertura de serviços especializados**

 **[ Ver Community Nodes →](./community-nodes/index)**

---

###  **Autenticação e Credenciais**
Sistemas seguros para gerenciar credenciais.

**Métodos disponíveis:**
-  **OAuth2** - Autenticação moderna
-  **API Keys** - Chaves de API
-  **Basic Auth** - Usuário e senha
-  **Bearer Token** - Tokens de acesso

 **[ Ver Credenciais →](./credential-nodes/oauth)**

---

###  **Desenvolvimento de Nodes**
Aprenda a criar seus próprios nodes customizados.

**Processo completo:**
1.  **Estruturação** - Anatomia de um node
2.  **Desenvolvimento** - Código TypeScript
3.  **Publicação** - NPM e comunidade
4.  **Manutenção** - Updates e melhorias

 **[ Ver Tutorial →](./criar-nodes/tutorial-desenvolvimento)**

##  **Foco Brasileiro**

Além dos nodes globais, temos integrações específicas para o mercado brasileiro:

###  **Financeiro**
-  **PIX** - Sistema de pagamentos instantâneos
-  **Bancos brasileiros** - Integração com APIs bancárias

###  **Governo e Receita**
-  **CNPJ/CPF** - Consultas à Receita Federal
-  **CNAE** - Classificação de atividades
-  **Simples Nacional** - Regime tributário

###  **Localização**
-  **ViaCEP** - Consulta de CEPs
-  **IBGE** - Dados geográficos
-  **Correios** - Rastreamento e frete

 **[ Ver Integrações BR →](../integracoes-br/pix)**

##  **Como Começar?**

###  1. **Para Iniciantes**
```
Core Nodes → Trigger Nodes → Integrações básicas
```

###  2. **Para Desenvolvedores**
```
HTTP Request → Function Node → Custom Nodes
```

###  3. **Para Empresas**
```
App Integrations → Credenciais → Community Nodes
```

##  **Estatísticas do Ecossistema**

| Categoria | Quantidade | Exemplos |
|-----------|------------|----------|
| **Core Nodes** | 20+ | IF, Set, HTTP Request |
| **App Integrations** | 400+ | Google, Slack, Notion |
| **Community Nodes** | 200+ | APIs especializadas |
| **Trigger Types** | 15+ | Webhook, Schedule, Email |

##  **Dicas de Navegação**

-  **Use a busca** para encontrar nodes específicos
-  **Explore por categoria** quando estiver aprendendo
-  **Comece pelos populares** para casos comuns
-  **Foque no seu caso de uso** para ser mais eficiente

##  **Precisa de Ajuda?**

-  **[Documentação oficial](https://docs.n8n.io/integrations/)** - Catálogo completo
-  **[Comunidade n8n](https://community.n8n.io)** - Fórum de discussões
-  **[GitHub](https://github.com/n8n-io/n8n)** - Issues e contribuições

---

** Explore as categorias acima para descobrir todos os nodes disponíveis!**
