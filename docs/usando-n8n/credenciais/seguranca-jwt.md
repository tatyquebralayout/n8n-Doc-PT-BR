---
id: seguranca-jwt
title: Segurança em Integrações - Credenciais e Tokens
sidebar_label: Segurança em Integrações
description: Boas práticas de segurança para credenciais e tokens no n8n
---

# 🔒 Segurança em Integrações - Credenciais e Tokens

## ⚠️ O Contexto Real do n8n

O n8n é uma **plataforma de automação** que se conecta com APIs externas. A segurança aqui é sobre **proteger credenciais de integração**, não autenticação web tradicional.

### Como o n8n Funciona

```javascript
// ✅ n8n armazena credenciais de forma segura
// As credenciais são criptografadas no banco de dados
// Não são expostas no frontend
```

## 🚨 Problemas Reais no n8n

### 1. Credenciais Expostas em Logs

```javascript
// ❌ PERIGOSO - Logar credenciais
console.log('API Key:', apiKey)
console.log('Token:', token)

// ✅ SEGURO - Logar apenas metadados
console.log('API conectada:', 'Google Sheets')
console.log('Status:', 'success')
```

### 2. Credenciais em Variáveis de Ambiente

```bash
# ❌ PERIGOSO - Credenciais em texto plano
N8N_GOOGLE_API_KEY=AIzaSyC...
N8N_SLACK_TOKEN=xoxb-123...

# ✅ SEGURO - Usar sistema de credenciais do n8n
# Configurar via interface web ou API
```

### 3. Tokens em Workflows

```javascript
// ❌ PERIGOSO - Token hardcoded
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

// ✅ SEGURO - Usar credenciais do n8n
const credentials = $credentials.googleSheets
```

## 🔧 Configuração Segura no n8n

### 1. Usar Credenciais do n8n

```javascript
// ✅ Configuração segura
const httpRequest = {
  method: 'GET',
  url: 'https://api.exemplo.com/dados',
  authentication: 'genericCredentialType',
  genericAuthType: 'httpHeaderAuth',
  httpHeaderAuth: {
    name: 'Authorization',
    value: 'Bearer {{ $credentials.apiExemplo.token }}'
  }
}
```

### 2. Configurar Credenciais

```bash
# ✅ Variáveis de ambiente para configuração
N8N_ENCRYPTION_KEY=sua_chave_de_32_caracteres
N8N_DATABASE_ENCRYPTION_KEY=sua_chave_de_32_caracteres
N8N_SECRETS_ENCRYPTION_KEY=sua_chave_de_32_caracteres
```

### 3. Headers de Segurança

```nginx
# ✅ Headers para n8n
add_header X-Frame-Options DENY always;
add_header X-Content-Type-Options nosniff always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Strict-Transport-Security "max-age=31536000" always;
```

## 🛡️ Tipos de Credenciais no n8n

### 1. API Keys

```javascript
// ✅ Configuração segura de API Key
{
  "name": "Google Sheets API",
  "type": "googleSheetsOAuth2Api",
  "data": {
    "accessToken": "encrypted_token",
    "refreshToken": "encrypted_refresh_token"
  }
}
```

### 2. OAuth Tokens

```javascript
// ✅ Configuração OAuth2
{
  "name": "Slack Integration",
  "type": "slackOAuth2Api",
  "data": {
    "accessToken": "encrypted_token",
    "scope": "chat:write,channels:read"
  }
}
```

### 3. Basic Auth

```javascript
// ✅ Configuração Basic Auth
{
  "name": "Internal API",
  "type": "httpBasicAuth",
  "data": {
    "user": "encrypted_username",
    "password": "encrypted_password"
  }
}
```

## 🔄 Rotação de Credenciais

### 1. Monitoramento de Expiração

```javascript
// ✅ Verificar expiração de tokens
const checkTokenExpiration = (credentials) => {
  const expiresAt = credentials.expiresAt
  const now = new Date()
  
  if (expiresAt && now > new Date(expiresAt)) {
    // Token expirado - notificar administrador
    console.warn('Token expirado:', credentials.name)
    return false
  }
  
  return true
}
```

### 2. Refresh Automático

```javascript
// ✅ Refresh automático de tokens
const refreshToken = async (credentials) => {
  try {
    const response = await fetch('/oauth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refreshToken: credentials.refreshToken
      })
    })
    
    const newCredentials = await response.json()
    return newCredentials
  } catch (error) {
    console.error('Erro ao renovar token:', error)
    return null
  }
}
```

## 🚫 O que NUNCA fazer no n8n

```javascript
// ❌ NUNCA hardcodar credenciais
const apiKey = "sk-1234567890abcdef"

// ❌ NUNCA logar tokens
console.log('Token:', token)

// ❌ NUNCA expor credenciais em URLs
const url = `https://api.exemplo.com/data?token=${token}`

// ❌ NUNCA armazenar em localStorage
localStorage.setItem('n8n-credentials', JSON.stringify(credentials))
```

## 🔍 Verificação de Segurança

### 1. Auditoria de Credenciais

```javascript
// ✅ Verificar credenciais expostas
const auditCredentials = () => {
  const workflows = getAllWorkflows()
  
  workflows.forEach(workflow => {
    const nodes = workflow.nodes
    
    nodes.forEach(node => {
      if (node.parameters && node.parameters.authentication) {
        // Verificar se usa credenciais do n8n
        if (node.parameters.authentication === 'predefinedCredentialType') {
          console.log('✅ Credencial segura:', node.name)
        } else {
          console.warn('⚠️ Credencial potencialmente insegura:', node.name)
        }
      }
    })
  })
}
```

### 2. Monitoramento de Acesso

```javascript
// ✅ Logs de segurança
const logSecurityEvent = (event) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event: event.type,
    user: event.user,
    workflow: event.workflow,
    ip: event.ip,
    // NUNCA logar credenciais
  }
  
  console.log('🔒 Evento de segurança:', logEntry)
}
```

## 📋 Checklist de Segurança para n8n

- [ ] **Credenciais Criptografadas**: Usar sistema de credenciais do n8n
- [ ] **Variáveis de Ambiente**: Configurar chaves de criptografia
- [ ] **Logs Seguros**: Nunca logar tokens ou senhas
- [ ] **Rotação de Tokens**: Implementar refresh automático
- [ ] **Monitoramento**: Auditoria regular de credenciais
- [ ] **HTTPS**: Sempre usar conexões seguras
- [ ] **Headers de Segurança**: Configurar no proxy/reverse proxy
- [ ] **Backup Seguro**: Criptografar backups de credenciais

## 🔧 Configuração Específica do n8n

### Docker Compose Seguro

```yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n:latest
    environment:
      # Criptografia
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      - N8N_DATABASE_ENCRYPTION_KEY=${N8N_DATABASE_ENCRYPTION_KEY}
      - N8N_SECRETS_ENCRYPTION_KEY=${N8N_SECRETS_ENCRYPTION_KEY}
      
      # Segurança
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=${N8N_ADMIN_USER}
      - N8N_BASIC_AUTH_PASSWORD=${N8N_ADMIN_PASSWORD}
      
      # HTTPS
      - N8N_PROTOCOL=https
      - N8N_SSL_KEY=/certs/private.key
      - N8N_SSL_CERT=/certs/certificate.crt
      
      # Sessão
      - N8N_SESSION_COOKIE_SECURE=true
      - N8N_SESSION_COOKIE_HTTPONLY=true
      - N8N_SESSION_COOKIE_SAMESITE=strict
    volumes:
      - n8n_data:/home/node/.n8n
      - ./certs:/certs:ro
    ports:
      - "5678:5678"
```

### Nginx com Segurança

```nginx
server {
    listen 443 ssl http2;
    server_name n8n.seudominio.com;
    
    # SSL
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # Headers de segurança
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Proxy para n8n
    location / {
        proxy_pass http://n8n:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🎯 Casos de Uso Reais

### 1. Integração com Google Sheets

```javascript
// ✅ Configuração segura
const googleSheetsNode = {
  resource: 'spreadsheet',
  operation: 'read',
  spreadsheetId: '{{ $json.spreadsheetId }}',
  range: 'A1:Z1000',
  // Usa credenciais OAuth2 do n8n automaticamente
}
```

### 2. Webhook Seguro

```javascript
// ✅ Webhook com autenticação
const webhookNode = {
  httpMethod: 'POST',
  path: 'webhook-seguro',
  authentication: 'genericCredentialType',
  genericAuthType: 'httpHeaderAuth',
  httpHeaderAuth: {
    name: 'X-API-Key',
    value: '{{ $credentials.webhookApi.key }}'
  }
}
```

### 3. API Externa com Rate Limiting

```javascript
// ✅ Configuração com rate limiting
const httpRequestNode = {
  method: 'GET',
  url: 'https://api.externa.com/dados',
  authentication: 'genericCredentialType',
  genericAuthType: 'httpHeaderAuth',
  httpHeaderAuth: {
    name: 'Authorization',
    value: 'Bearer {{ $credentials.apiExterna.token }}'
  },
  // Rate limiting automático do n8n
}
```

## 🔗 Recursos Adicionais

- [n8n Security Documentation](https://docs.n8n.io/security/)
- [n8n Credentials Guide](https://docs.n8n.io/integrations/credentials/)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [n8n Community Security](https://community.n8n.io/c/security/)

## 💡 Dica Importante

> **Lembre-se**: No n8n, a segurança é sobre **proteger credenciais de integração**, não sobre autenticação web tradicional. Use sempre o sistema de credenciais integrado da plataforma.

Implemente essas práticas para proteger suas integrações e dados sensíveis no n8n.