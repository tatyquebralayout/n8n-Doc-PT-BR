---
sidebar_position: 5
title: Credenciais HTTP Request
description: Como configurar autenticação para requisições HTTP no n8n
keywords: [n8n, http request, autenticação, credenciais, headers]
---

<IonicIcon name="globe-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

As credenciais HTTP Request permitem configurar autenticação para requisições HTTP no n8n. Este documento explica como configurar diferentes tipos de autenticação para requisições HTTP, incluindo Basic Auth, Bearer Token, API Key, OAuth 2.0 e autenticação customizada.

## Tipos de Autenticação

### Basic Auth

Configure autenticação básica com usuário e senha:

```javascript
// Configuração Basic Auth
{
  "name": "Basic Auth Credential",
  "username": "seu-usuario",
  "password": "sua-senha",
  "url": "https://api.exemplo.com"
}
```

### Bearer Token

Use tokens Bearer para autenticação baseada em token:

```javascript
// Configuração Bearer Token
{
  "name": "Bearer Token Credential",
  "token": "seu-bearer-token",
  "url": "https://api.exemplo.com",
  "headers": {
    "Authorization": "Bearer {{$credentials.token}}"
  }
}
```

### API Key

Configure chaves de API em headers ou parâmetros:

```javascript
// Configuração API Key
{
  "name": "API Key Credential",
  "api_key": "sua-api-key",
  "url": "https://api.exemplo.com",
  "headers": {
    "X-API-Key": "{{$credentials.apiKey}}"
  }
}
```

### OAuth 2.0

Configure autenticação OAuth 2.0 para APIs que suportam este protocolo:

```javascript
// Configuração OAuth 2.0
{
  "name": "OAuth 2.0 Credential",
  "client_id": "seu-client-id",
  "client_secret": "seu-client-secret",
  "auth_url": "https://api.exemplo.com/oauth/authorize",
  "token_url": "https://api.exemplo.com/oauth/token",
  "redirect_uri": "https://seu-dominio.com/callback"
}
```

### Digest Auth

Configure autenticação digest quando necessário:

```javascript
// Configuração Digest Auth
{
  "name": "Digest Auth Credential",
  "username": "seu-usuario",
  "password": "sua-senha",
  "realm": "realm-exemplo",
  "url": "https://api.exemplo.com"
}
```

## Configuração

### Passo a Passo

1. **Acesse Settings > Credentials**
2. **Clique em "Add Credential"**
3. **Selecione "HTTP Request"**
4. **Configure os parâmetros de autenticação**
5. **Salve as credenciais**

### Configuração Avançada

```javascript
// Configuração avançada
{
  "name": "HTTP Request Avançado",
  "url": "https://api.exemplo.com",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer {{$credentials.token}}",
    "X-Custom-Header": "valor-customizado"
  },
  "timeout": 30000,
  "retry": {
    "attempts": 3,
    "delay": 1000
  }
}
```

## Uso

### No HTTP Request Node

Após configurar as credenciais, você pode usá-las no node HTTP Request:

```javascript
// Exemplo de uso no HTTP Request Node
{
  "method": "GET",
  "url": "https://api.exemplo.com/dados",
  "authentication": "{{$credentials.httpRequest}}",
  "headers": {
    "Accept": "application/json"
  }
}
```

### Com Expressões

```javascript
// Uso com expressões
{
  "request": {
    "method": "{{$json.method}}",
    "url": "{{$credentials.url}}/{{$json.endpoint}}",
    "headers": {
      "Authorization": "{{$credentials.authHeader}}",
      "Content-Type": "application/json"
    }
  }
}
```

## Segurança

### Boas Práticas

- **Sempre use HTTPS** em produção
- **Não armazene credenciais** em texto plano
- **Use variáveis de ambiente** quando possível
- **Monitore logs** de acesso

### Configuração Segura

```javascript
// Configuração segura
{
  "security": {
    "use_https": true,
    "validate_ssl": true,
    "timeout": 30000,
    "max_redirects": 5
  },
  "monitoring": {
    "log_requests": true,
    "log_errors": true,
    "alert_on_failure": true
  }
}
```

## Troubleshooting

### Problemas Comuns

#### Erro de autenticação

**Sintomas:**

- Erro 401 Unauthorized
- Erro 403 Forbidden
- Credenciais não reconhecidas

**Soluções:**

```javascript
// Verificar credenciais
{
  "debug": {
    "url": "{{$credentials.url}}",
    "method": "{{$credentials.method}}",
    "headers": "{{$credentials.headers}}",
    "auth_type": "{{$credentials.authType}}"
  }
}
```

#### Timeout de conexão

**Sintomas:**

- Erro de timeout
- Conexão lenta
- Requisições não completam

**Soluções:**

```javascript
// Configurar timeout
{
  "timeout": {
    "request": 60000,
    "response": 30000,
    "connection": 10000
  }
}
```

### Debug de Problemas

#### Verificar Configuração

```javascript
// Teste de conectividade
{
  "test_request": {
    "method": "GET",
    "url": "{{$credentials.url}}/health",
    "headers": {
      "Authorization": "{{$credentials.authHeader}}"
    },
    "timeout": 10000
  }
}
```

#### Logs de Erro

```bash
# Verificar logs do n8n
n8n logs --level debug | grep "HTTP Request"

# Verificar logs específicos
n8n logs --level error | grep "authentication"
```

## Exemplos Práticos

### Exemplo 1: API REST

```javascript
// Configuração para API REST
{
  "workflow": {
    "trigger": "webhook",
    "action": "api_call",
    "http_request": {
      "method": "POST",
      "url": "https://api.exemplo.com/dados",
      "headers": {
        "Authorization": "Bearer {{$credentials.token}}",
        "Content-Type": "application/json"
      },
      "body": "{{$json}}"
    }
  }
}
```

### Exemplo 2: Webhook Seguro

```javascript
// Configuração para webhook
{
  "webhook": {
    "url": "https://seu-dominio.com/webhook",
    "method": "POST",
    "headers": {
      "X-Webhook-Key": "{{$credentials.webhookKey}}",
      "Content-Type": "application/json"
    },
    "security": {
      "validate_signature": true,
      "timeout": 30000
    }
  }
}
```

### Exemplo 3: API com Rate Limiting

```javascript
// Configuração com rate limiting
{
  "api_config": {
    "base_url": "https://api.exemplo.com",
    "auth": "{{$credentials.httpRequest}}",
    "rate_limit": {
      "requests_per_minute": 60,
      "delay_between_requests": 1000
    },
    "retry": {
      "max_attempts": 3,
      "backoff_multiplier": 2
    }
  }
}
```

## Próximos Passos

- [API Keys](/integracoes/credential-nodes/api-keys) - Configurar autenticação com chaves
- [Basic Authentication](/integracoes/credential-nodes/basic-auth) - Configurar autenticação básica
- [OAuth Authentication](/integracoes/credential-nodes/oauth) - Configurar OAuth 2.0
- [HTTP Request Node](/integracoes/builtin-nodes/http-requests/http-request) - Fazer requisições autenticadas
- [Troubleshooting](/usando-n8n/troubleshooting) - Resolução de problemas
