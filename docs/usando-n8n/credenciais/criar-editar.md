---
sidebar_position: 2
title: Criar e Editar Credenciais
description: Guia passo a passo para criar e editar credenciais no n8n
keywords: [n8n, credenciais, criar, editar, autenticação, API keys]
---


# Criar e Editar Credenciais

As credenciais são fundamentais para conectar o n8n com sistemas externos de forma segura. Este guia aborda como criar, configurar e gerenciar credenciais de forma eficiente e segura.

## Conceitos Fundamentais

### O que são Credenciais

Credenciais no n8n são informações de autenticação armazenadas de forma segura que permitem:

- **Conectar** com APIs externas
- **Autenticar** em serviços de terceiros
- **Acessar** bancos de dados
- **Integrar** com aplicações web

### Tipos de Credenciais

#### 1. API Keys

```json
{
  "type": "apiKey",
  "name": "Stripe API Key",
  "value": "sk_test_...",
  "description": "Chave da API do Stripe para processamento de pagamentos"
}
```

#### 2. OAuth 2.0

```json
{
  "type": "oauth2",
  "name": "Google Sheets OAuth",
  "clientId": "your-client-id",
  "clientSecret": "your-client-secret",
  "scope": "https://www.googleapis.com/auth/spreadsheets"
}
```

#### 3. Basic Authentication

```json
{
  "type": "basicAuth",
  "name": "Database Connection",
  "username": "db_user",
  "password": "secure_password"
}
```

#### 4. Custom Headers

```json
{
  "type": "customHeaders",
  "name": "Custom API Headers",
  "headers": {
    "Authorization": "Bearer token",
    "X-API-Version": "v2",
    "Content-Type": "application/json"
  }
}
```

## Criando Credenciais

### Passo 1: Acessar Gerenciador de Credenciais

1. **Navegue** para o menu lateral esquerdo
2. **Clique** em "Credentials" ou "Credenciais"
3. **Selecione** "Add Credential" ou "Adicionar Credencial"

### Passo 2: Selecionar Tipo de Credencial

#### Categorias Disponíveis

- **Communication**: Email, Slack, Discord, WhatsApp
- **Productivity**: Google Workspace, Microsoft 365, Notion
- **E-commerce**: Shopify, WooCommerce, Stripe
- **Marketing**: Mailchimp, HubSpot, Facebook Ads
- **Database**: MySQL, PostgreSQL, MongoDB
- **Cloud**: AWS, Google Cloud, Azure
- **Custom**: HTTP Request, Webhook

### Passo 3: Configurar Credenciais

#### Exemplo: Configuração de Email (Gmail)

```json
{
  "name": "Gmail - Marketing",
  "description": "Conta de email para campanhas de marketing",
  "type": "gmail",
  "credentials": {
    "email": "marketing@empresa.com",
    "password": "app_password_here",
    "imap": {
      "host": "imap.gmail.com",
      "port": 993,
      "secure": true
    },
    "smtp": {
      "host": "smtp.gmail.com",
      "port": 587,
      "secure": false
    }
  }
}
```

#### Exemplo: Configuração de API (Stripe)

```json
{
  "name": "Stripe - Produção",
  "description": "API do Stripe para processamento de pagamentos",
  "type": "stripe",
  "credentials": {
    "apiKey": "sk_live_...",
    "webhookSecret": "whsec_...",
    "apiVersion": "2023-10-16"
  }
}
```

## Configurações Avançadas

### 1. Variáveis de Ambiente

#### Configuração Segura

```bash
# .env file
STRIPE_API_KEY=sk_live_...
GMAIL_PASSWORD=app_password_here
DATABASE_URL=postgresql://user:pass@host:port/db
```

#### Uso no n8n

```json
{
  "credentials": {
    "apiKey": "={{ $env.STRIPE_API_KEY }}",
    "password": "={{ $env.GMAIL_PASSWORD }}"
  }
}
```

### 2. Configuração de Proxy

#### Para Ambientes Corporativos

```json
{
  "proxy": {
    "host": "proxy.empresa.com",
    "port": 8080,
    "auth": {
      "username": "proxy_user",
      "password": "proxy_pass"
    }
  }
}
```

### 3. Configuração de Timeout

#### Para APIs Lentas

```json
{
  "timeout": {
    "request": 30000,
    "response": 60000,
    "retry": {
      "attempts": 3,
      "delay": 1000
    }
  }
}
```

## Melhores Práticas de Segurança

### 1. Nomenclatura Segura

#### Padrão Recomendado

```yaml
# Formato: [Serviço] - [Ambiente] - [Propósito]
Nome: "Stripe - Produção - Pagamentos"
Nome: "Gmail - Marketing - Campanhas"
Nome: "Database - Desenvolvimento - Testes"
```

#### Evitar

```yaml
❌ "API Key"
❌ "Password"
❌ "Token"
❌ "Credential 1"
```

### 2. Descrições Detalhadas

#### Template de Descrição

```markdown
## Propósito
Credencial para [funcionalidade específica]

## Ambiente
- Produção/Desenvolvimento/Teste

## Permissões
- Escopo de acesso necessário

## Responsável
- Nome e contato

## Última Atualização
- Data e motivo
```

### 3. Rotação de Credenciais

#### Cronograma de Rotação

```yaml
Rotação Mensal:
  - API Keys de desenvolvimento
  - Tokens de teste

Rotação Trimestral:
  - API Keys de produção
  - Senhas de aplicação

Rotação Semestral:
  - Certificados SSL
  - Chaves de criptografia
```

### 4. Monitoramento de Uso

#### Alertas de Segurança

```json
{
  "monitoring": {
    "failedAttempts": {
      "threshold": 5,
      "action": "disable_credential"
    },
    "unusualUsage": {
      "threshold": "200%_normal",
      "action": "alert_admin"
    },
    "expiration": {
      "warningDays": 30,
      "action": "notify_owner"
    }
  }
}
```

## Gerenciamento de Credenciais

### 1. Organização por Projeto

#### Estrutura Recomendada

```
📁 Credenciais
├── 📁 E-commerce
│   ├── Stripe - Produção
│   ├── Shopify - API
│   └── PayPal - Sandbox
├── 📁 Marketing
│   ├── Gmail - Campanhas
│   ├── Mailchimp - API
│   └── Facebook Ads
├── 📁 Database
│   ├── PostgreSQL - Produção
│   ├── MySQL - Desenvolvimento
│   └── MongoDB - Analytics
└── 📁 Integrações
    ├── Slack - Notificações
    ├── Discord - Alertas
    └── Webhook - Custom
```

### 2. Versionamento de Credenciais

#### Controle de Versões

```yaml
Versão Atual:
  - ID: cred_001
  - Status: Ativo
  - Criado: 2024-01-15
  - Último Uso: 2024-01-20

Versão Anterior:
  - ID: cred_001_v1
  - Status: Depreciado
  - Criado: 2023-12-01
  - Substituído: 2024-01-15
```

### 3. Backup e Recuperação

#### Estratégia de Backup

```json
{
  "backup": {
    "frequency": "daily",
    "retention": "30_days",
    "encryption": true,
    "location": "secure_storage",
    "verification": "weekly"
  }
}
```

## Troubleshooting

### Problemas Comuns

#### 1. Credenciais Expiradas

**Sintomas:**

- Erro 401 (Unauthorized)
- Erro 403 (Forbidden)
- Mensagens de token expirado

**Solução:**

- Verificar data de expiração
- Renovar credenciais
- Atualizar configurações

#### 2. Rate Limiting

**Sintomas:**

- Erro 429 (Too Many Requests)
- Execuções falhando intermitentemente
- Performance degradada

**Solução:**

- Implementar delays entre requests
- Usar múltiplas credenciais
- Otimizar frequência de execução

#### 3. Configuração Incorreta

**Sintomas:**

- Erro de conexão
- Timeout
- Dados incorretos

**Solução:**

- Validar configurações
- Testar conectividade
- Verificar permissões

### Ferramentas de Diagnóstico

#### 1. Teste de Conectividade

```javascript
// Script para testar credenciais
async function testCredential(credentialId) {
  try {
    const result = await n8n.testCredential(credentialId);
    console.log('Credencial válida:', result);
  } catch (error) {
    console.error('Erro na credencial:', error);
  }
}
```

#### 2. Validação de Permissões

```json
{
  "validation": {
    "permissions": ["read", "write", "delete"],
    "scopes": ["user:read", "user:write"],
    "resources": ["users", "orders", "products"]
  }
}
```

## Configurações Específicas por Serviço

### 1. Google Services

#### Gmail

```json
{
  "type": "gmail",
  "credentials": {
    "email": "user@gmail.com",
    "password": "app_password",
    "imap": {
      "host": "imap.gmail.com",
      "port": 993,
      "secure": true
    }
  }
}
```

#### Google Sheets

```json
{
  "type": "googleSheets",
  "credentials": {
    "clientId": "your-client-id",
    "clientSecret": "your-client-secret",
    "scope": "https://www.googleapis.com/auth/spreadsheets"
  }
}
```

### 2. Database Connections

#### PostgreSQL

```json
{
  "type": "postgres",
  "credentials": {
    "host": "localhost",
    "port": 5432,
    "database": "mydb",
    "username": "user",
    "password": "password",
    "ssl": {
      "rejectUnauthorized": false
    }
  }
}
```

#### MySQL

```json
{
  "type": "mysql",
  "credentials": {
    "host": "localhost",
    "port": 3306,
    "database": "mydb",
    "username": "user",
    "password": "password",
    "ssl": {
      "ca": "certificate-authority"
    }
  }
}
```

### 3. Cloud Services

#### AWS

```json
{
  "type": "aws",
  "credentials": {
    "accessKeyId": "AKIA...",
    "secretAccessKey": "...",
    "region": "us-east-1",
    "sessionToken": "optional-session-token"
  }
}
```

#### Azure

```json
{
  "type": "azure",
  "credentials": {
    "tenantId": "tenant-id",
    "clientId": "client-id",
    "clientSecret": "client-secret",
    "subscriptionId": "subscription-id"
  }
}
```

## Recursos Adicionais

### Documentação Oficial

- [Credentials Overview](https://docs.n8n.io/credentials/)
- [Security Best Practices](https://docs.n8n.io/security/)
- [API Reference](https://docs.n8n.io/api/)

### Ferramentas de Segurança

- [Credential Scanner](https://github.com/n8n-io/n8n/tree/master/packages/cli/src/commands)
- [Security Audit](https://docs.n8n.io/security/audit/)
- [Encryption Guide](https://docs.n8n.io/security/encryption/)

### Comunidade

- [Security Discussions](https://community.n8n.io/c/security/)
- [Best Practices](https://community.n8n.io/c/best-practices/)
- [Troubleshooting](https://community.n8n.io/c/troubleshooting/)

---

**Próximos Passos:**

- [Boas Práticas de Credenciais](boas-praticas.md)
- [Compartilhamento de Credenciais](compartilhamento.md)
- [Segurança e Autenticação](../../hosting-n8n/seguranca/autenticacao.md)
