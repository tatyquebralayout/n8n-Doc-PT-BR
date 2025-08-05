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

```json\n{\n  "type": "apiKey",\n  "name": "Stripe API Key",\n  "value": "sk_test_...",\n  "description": "Chave da API do Stripe para processamento de pagamentos"\n}\n```\n\n#### 2. OAuth 2.0\n\n```json\n{\n  "type": "oauth2",\n  "name": "Google Sheets OAuth",\n  "clientId": "your-client-id",\n  "clientSecret": "your-client-secret",\n  "scope": "https://www.googleapis.com/auth/spreadsheets"\n}\n```\n\n#### 3. Basic Authentication\n\n```json\n{\n  "type": "basicAuth",\n  "name": "Database Connection",\n  "username": "db_user",\n  "password": "secure_password"\n}\n```\n\n#### 4. Custom Headers\n\n```json\n{\n  "type": "customHeaders",\n  "name": "Custom API Headers",\n  "headers": {\n    "Authorization": "Bearer token",\n    "X-API-Version": "v2",\n    "Content-Type": "application/json"\n  }\n}\n```\n\n## Criando Credenciais\n\n### Passo 1: Acessar Gerenciador de Credenciais\n\n1. **Navegue** para o menu lateral esquerdo\n2. **Clique** em "Credentials" ou "Credenciais"\n3. **Selecione** "Add Credential" ou "Adicionar Credencial"\n\n### Passo 2: Selecionar Tipo de Credencial\n\n#### Categorias Disponíveis\n\n- **Communication**: Email, Slack, Discord, WhatsApp\n- **Productivity**: Google Workspace, Microsoft 365, Notion\n- **E-commerce**: Shopify, WooCommerce, Stripe\n- **Marketing**: Mailchimp, HubSpot, Facebook Ads\n- **Database**: MySQL, PostgreSQL, MongoDB\n- **Cloud**: AWS, Google Cloud, Azure\n- **Custom**: HTTP Request, Webhook\n\n### Passo 3: Configurar Credenciais\n\n#### Exemplo: Configuração de Email (Gmail)\n\n```json\n{\n  "name": "Gmail - Marketing",\n  "description": "Conta de email para campanhas de marketing",\n  "type": "gmail",\n  "credentials": {\n    "email": "marketing@empresa.com",\n    "password": "app_password_here",\n    "imap": {\n      "host": "imap.gmail.com",\n      "port": 993,\n      "secure": true\n    },\n    "smtp": {\n      "host": "smtp.gmail.com",\n      "port": 587,\n      "secure": false\n    }\n  }\n}\n```\n\n#### Exemplo: Configuração de API (Stripe)\n\n```json\n{\n  "name": "Stripe - Produção",\n  "description": "API do Stripe para processamento de pagamentos",\n  "type": "stripe",\n  "credentials": {\n    "apiKey": "sk_live_...",\n    "webhookSecret": "whsec_...",\n    "apiVersion": "2023-10-16"\n  }\n}\n```\n\n## Configurações Avançadas\n\n### 1. Variáveis de Ambiente\n\n#### Configuração Segura\n\n```bash\n# .env file\nSTRIPE_API_KEY=sk_live_...\nGMAIL_PASSWORD=app_password_here\nDATABASE_URL=postgresql://user:pass@host:port/db\n```\n\n#### Uso no n8n\n\n```json\n{\n  "credentials": {\n    "apiKey": "={{$env.STRIPE_API_KEY}}",\n    "password": "={{$env.GMAIL_PASSWORD}}"\n  }\n}\n```\n\n### 2. Configuração de Proxy\n\n#### Para Ambientes Corporativos\n\n```json\n{\n  "proxy": {\n    "host": "proxy.empresa.com",\n    "port": 8080,\n    "auth": {\n      "username": "proxy_user",\n      "password": "proxy_pass"\n    }\n  }\n}\n```\n\n### 3. Configuração de Timeout\n\n#### Para APIs Lentas\n\n```json\n{\n  "timeout": {\n    "request": 30000,\n    "response": 60000,\n    "retry": {\n      "attempts": 3,\n      "delay": 1000\n    }\n  }\n}\n```\n\n## Melhores Práticas de Segurança\n\n### 1. Nomenclatura Segura\n\n#### Padrão Recomendado\n\n```yaml\n# Formato: [Serviço] - [Ambiente] - [Propósito]\nNome: "Stripe - Produção - Pagamentos"\nNome: "Gmail - Marketing - Campanhas"\nNome: "Database - Desenvolvimento - Testes"\n```\n\n#### Evitar\n\n```yaml\n❌ "API Key"\n❌ "Password"\n❌ "Token"\n❌ "Credential 1"\n```\n\n### 2. Descrições Detalhadas\n\n#### Template de Descrição\n\n```markdown\n## Propósito\nCredencial para [funcionalidade específica]\n\n## Ambiente\n- Produção/Desenvolvimento/Teste\n\n## Permissões\n- Escopo de acesso necessário\n\n## Responsável\n- Nome e contato\n\n## Última Atualização\n- Data e motivo\n```\n\n### 3. Rotação de Credenciais\n\n#### Cronograma de Rotação\n\n```yaml\nRotação Mensal:\n  - API Keys de desenvolvimento\n  - Tokens de teste\n\nRotação Trimestral:\n  - API Keys de produção\n  - Senhas de aplicação\n\nRotação Semestral:\n  - Certificados SSL\n  - Chaves de criptografia\n```\n\n### 4. Monitoramento de Uso\n\n#### Alertas de Segurança\n\n```json\n{\n  "monitoring": {\n    "failedAttempts": {\n      "threshold": 5,\n      "action": "disable_credential"\n    },\n    "unusualUsage": {\n      "threshold": "200%_normal",\n      "action": "alert_admin"\n    },\n    "expiration": {\n      "warningDays": 30,\n      "action": "notify_owner"\n    }\n  }\n}\n```\n\n## Gerenciamento de Credenciais\n\n### 1. Organização por Projeto\n\n#### Estrutura Recomendada\n\n```\n📁 Credenciais\n├── 📁 E-commerce\n│   ├── Stripe - Produção\n│   ├── Shopify - API\n│   └── PayPal - Sandbox\n├── 📁 Marketing\n│   ├── Gmail - Campanhas\n│   ├── Mailchimp - API\n│   └── Facebook Ads\n├── 📁 Database\n│   ├── PostgreSQL - Produção\n│   ├── MySQL - Desenvolvimento\n│   └── MongoDB - Analytics\n└── 📁 Integrações\n    ├── Slack - Notificações\n    ├── Discord - Alertas\n    └── Webhook - Custom\n```\n\n### 2. Versionamento de Credenciais\n\n#### Controle de Versões\n\n```yaml\nVersão Atual:\n  - ID: cred_001\n  - Status: Ativo\n  - Criado: 2024-01-15\n  - Último Uso: 2024-01-20\n\nVersão Anterior:\n  - ID: cred_001_v1\n  - Status: Depreciado\n  - Criado: 2023-12-01\n  - Substituído: 2024-01-15\n```\n\n### 3. Backup e Recuperação\n\n#### Estratégia de Backup\n\n```json\n{\n  "backup": {\n    "frequency": "daily",\n    "retention": "30_days",\n    "encryption": true,\n    "location": "secure_storage",\n    "verification": "weekly"\n  }\n}\n```\n\n## Troubleshooting\n\n### Problemas Comuns\n\n#### 1. Credenciais Expiradas\n\n**Sintomas:**\n\n- Erro 401 (Unauthorized)\n- Erro 403 (Forbidden)\n- Mensagens de token expirado\n\n**Solução:**\n\n- Verificar data de expiração\n- Renovar credenciais\n- Atualizar configurações\n\n#### 2. Rate Limiting\n\n**Sintomas:**\n\n- Erro 429 (Too Many Requests)\n- Execuções falhando intermitentemente\n- Performance degradada\n\n**Solução:**\n\n- Implementar delays entre requests\n- Usar múltiplas credenciais\n- Otimizar frequência de execução\n\n#### 3. Configuração Incorreta\n\n**Sintomas:**\n\n- Erro de conexão\n- Timeout\n- Dados incorretos\n\n**Solução:**\n\n- Validar configurações\n- Testar conectividade\n- Verificar permissões\n\n### Ferramentas de Diagnóstico\n\n#### 1. Teste de Conectividade\n\n```javascript\n// Script para testar credenciais\nasync function testCredential(credentialId) {\n  try {\n    const result = await n8n.testCredential(credentialId);\n    console.log('Credencial válida:', result);\n  } catch (error) {\n    console.error('Erro na credencial:', error);\n  }\n}\n```\n\n#### 2. Validação de Permissões\n\n```json\n{\n  "validation": {\n    "permissions": ["read", "write", "delete"],\n    "scopes": ["user:read", "user:write"],\n    "resources": ["users", "orders", "products"]\n  }\n}\n```\n\n## Configurações Específicas por Serviço\n\n### 1. Google Services\n\n#### Gmail\n\n```json\n{\n  "type": "gmail",\n  "credentials": {\n    "email": "user@gmail.com",\n    "password": "app_password",\n    "imap": {\n      "host": "imap.gmail.com",\n      "port": 993,\n      "secure": true\n    }\n  }\n}\n```\n\n#### Google Sheets\n\n```json\n{\n  "type": "googleSheets",\n  "credentials": {\n    "clientId": "your-client-id",\n    "clientSecret": "your-client-secret",\n    "scope": "https://www.googleapis.com/auth/spreadsheets"\n  }\n}\n```\n\n### 2. Database Connections\n\n#### PostgreSQL\n\n```json\n{\n  "type": "postgres",\n  "credentials": {\n    "host": "localhost",\n    "port": 5432,\n    "database": "mydb",\n    "username": "user",\n    "password": "password",\n    "ssl": {\n      "rejectUnauthorized": false\n    }\n  }\n}\n```\n\n#### MySQL\n\n```json\n{\n  "type": "mysql",\n  "credentials": {\n    "host": "localhost",\n    "port": 3306,\n    "database": "mydb",\n    "username": "user",\n    "password": "password",\n    "ssl": {\n      "ca": "certificate-authority"\n    }\n  }\n}\n```\n\n### 3. Cloud Services\n\n#### AWS\n\n```json\n{\n  "type": "aws",\n  "credentials": {\n    "accessKeyId": "AKIA...",\n    "secretAccessKey": "...",\n    "region": "us-east-1",\n    "sessionToken": "optional-session-token"\n  }\n}\n```\n\n#### Azure\n\n```json\n{\n  "type": "azure",\n  "credentials": {\n    "tenantId": "tenant-id",\n    "clientId": "client-id",\n    "clientSecret": "client-secret",\n    "subscriptionId": "subscription-id"\n  }\n}\n```

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

- [Boas Práticas de Credenciais](boas-praticas)
- [Compartilhamento de Credenciais](compartilhamento)
- [Segurança e Autenticação](../../hosting-n8n/seguranca/autenticacao)
