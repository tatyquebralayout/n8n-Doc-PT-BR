---
sidebar_position: 6
title: Credenciais Webhook
description: Como configurar autenticação e segurança para webhooks no n8n
keywords: [n8n, webhook, autenticação, segurança, credenciais]
---

<IonicIcon name="link-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

As credenciais webhook permitem configurar autenticação e segurança para webhooks no n8n. Este documento explica como configurar diferentes tipos de autenticação para webhooks, incluindo Basic Auth, API Key, OAuth 2.0 e outras formas de proteger seus endpoints de webhook.

## Tipos de Autenticação

### Basic Auth

Configure autenticação básica com usuário e senha para proteger seus webhooks:

```javascript
// Configuração Basic Auth para Webhook
{
  "name": "Webhook Basic Auth",
  "username": "webhook-user",
  "password": "webhook-password",
  "url": "https://seu-dominio.com/webhook"
}
```

### API Key

Use chaves de API para autenticar requisições aos webhooks:

```javascript
// Configuração API Key para Webhook
{
  "name": "Webhook API Key",
  "api_key": "sua-webhook-api-key",
  "url": "https://seu-dominio.com/webhook",
  "headers": {
    "X-Webhook-Key": "{{$credentials.apiKey}}"
  }
}
```

### OAuth 2.0

Configure autenticação OAuth 2.0 para integrações mais seguras:

```javascript
// Configuração OAuth 2.0 para Webhook
{
  "name": "Webhook OAuth 2.0",
  "client_id": "seu-client-id",
  "client_secret": "seu-client-secret",
  "auth_url": "https://api.exemplo.com/oauth/authorize",
  "token_url": "https://api.exemplo.com/oauth/token",
  "redirect_uri": "https://seu-dominio.com/webhook/callback"
}
```

## Configuração

### Passo a Passo

1. **Acesse Settings > Credentials**
2. **Clique em "Add Credential"**
3. **Selecione "Webhook"**
4. **Configure os parâmetros de autenticação**
5. **Salve as credenciais**

### Configuração Avançada

```javascript
// Configuração avançada para webhook
{
  "name": "Webhook Seguro",
  "url": "https://seu-dominio.com/webhook",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "X-Webhook-Signature": "{{$credentials.signature}}",
    "X-Webhook-Timestamp": "{{$now}}"
  },
  "security": {
    "validate_signature": true,
    "timeout": 30000,
    "max_payload_size": "10MB"
  }
}
```

## Uso

### No Webhook Node

Após configurar as credenciais, você pode usá-las no node Webhook:

```javascript
// Exemplo de uso no Webhook Node
{
  "webhook": {
    "url": "https://seu-dominio.com/webhook",
    "method": "POST",
    "authentication": "{{$credentials.webhook}}",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": "{{$json}}"
  }
}
```

### Validação de Assinatura

```javascript
// Validação de assinatura HMAC
{
  "signature_validation": {
    "enabled": true,
    "algorithm": "sha256",
    "secret": "{{$credentials.webhookSecret}}",
    "header": "X-Webhook-Signature",
    "timestamp_header": "X-Webhook-Timestamp"
  }
}
```

## Segurança

### Boas Práticas

- **Sempre use HTTPS** em produção
- **Configure rate limiting** quando apropriado
- **Monitore logs** de acesso
- **Rotacione chaves** regularmente

### Configuração Segura

```javascript
// Configuração de segurança para webhook
{
  "security": {
    "use_https": true,
    "validate_ssl": true,
    "rate_limiting": {
      "enabled": true,
      "requests_per_minute": 100,
      "burst_limit": 10
    },
    "ip_whitelist": [
      "192.168.1.0/24",
      "10.0.0.0/8"
    ],
    "timeout": 30000
  }
}
```

### Validação de Payload

```javascript
// Validação de payload
{
  "payload_validation": {
    "enabled": true,
    "max_size": "10MB",
    "allowed_content_types": [
      "application/json",
      "application/xml"
    ],
    "required_fields": [
      "event_type",
      "timestamp",
      "data"
    ]
  }
}
```

## Troubleshooting

### Problemas Comuns

#### Webhook não recebe dados

**Sintomas:**

- Webhook não responde
- Dados não chegam
- Timeout de requisições

**Soluções:**

```javascript
// Verificar configuração do webhook
{
  "webhook_check": {
    "url": "{{$credentials.webhookUrl}}",
    "method": "{{$credentials.method}}",
    "headers": "{{$credentials.headers}}",
    "timeout": "{{$credentials.timeout}}"
  }
}
```

#### Erro de autenticação

**Sintomas:**

- Erro 401 Unauthorized
- Erro 403 Forbidden
- Credenciais rejeitadas

**Soluções:**

```javascript
// Verificar autenticação
{
  "auth_check": {
    "auth_type": "{{$credentials.authType}}",
    "credentials_valid": "{{$credentials.isValid}}",
    "last_used": "{{$credentials.lastUsed}}"
  }
}
```

#### Rate limiting

**Sintomas:**

- Erro 429 Too Many Requests
- Webhook lento
- Limite de requisições atingido

**Soluções:**

```javascript
// Configurar rate limiting
{
  "rate_limit": {
    "requests_per_minute": 60,
    "delay_between_requests": 1000,
    "retry_after_seconds": 60
  }
}
```

### Debug de Problemas

#### Verificar Conectividade

```javascript
// Teste de conectividade
{
  "connectivity_test": {
    "url": "{{$credentials.webhookUrl}}",
    "method": "GET",
    "timeout": 10000,
    "expected_status": 200
  }
}
```

#### Logs de Acesso

```bash
# Verificar logs do n8n
n8n logs --level debug | grep "Webhook"

# Verificar logs de webhook
n8n logs --level error | grep "webhook"
```

## Exemplos Práticos

### Exemplo 1: Webhook para Notificações

```javascript
// Configuração para notificações
{
  "webhook": {
    "name": "Notificações Webhook",
    "url": "https://api.exemplo.com/webhook/notifications",
    "method": "POST",
    "headers": {
      "Authorization": "Bearer {{$credentials.webhookToken}}",
      "Content-Type": "application/json",
      "X-Event-Type": "notification"
    },
    "body": {
      "event": "{{$json.event}}",
      "timestamp": "{{$now}}",
      "data": "{{$json.data}}"
    }
  }
}
```

### Exemplo 2: Webhook Seguro com Assinatura

```javascript
// Configuração com assinatura HMAC
{
  "webhook": {
    "name": "Webhook Seguro",
    "url": "https://seu-dominio.com/webhook/secure",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "X-Webhook-Signature": "{{$hmac($json, $credentials.secret, 'sha256')}}",
      "X-Webhook-Timestamp": "{{$now}}"
    },
    "security": {
      "validate_signature": true,
      "timeout": 30000
    }
  }
}
```

### Exemplo 3: Webhook com Rate Limiting

```javascript
// Configuração com rate limiting
{
  "webhook": {
    "name": "Webhook com Rate Limiting",
    "url": "https://api.exemplo.com/webhook/limited",
    "method": "POST",
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

## Integração com Sistemas Brasileiros

### PagSeguro Webhooks

```javascript
// Configuração PagSeguro
{
  "webhook": {
    "name": "PagSeguro Webhook",
    "url": "https://seu-dominio.com/webhook/pagseguro",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "X-PagSeguro-Signature": "{{$credentials.pagseguroSignature}}"
    },
    "validation": {
      "validate_signature": true,
      "allowed_ips": ["pagseguro.com.br"]
    }
  }
}
```

### Mercado Pago Webhooks

```javascript
// Configuração Mercado Pago
{
  "webhook": {
    "name": "Mercado Pago Webhook",
    "url": "https://seu-dominio.com/webhook/mercadopago",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "X-MercadoPago-Signature": "{{$credentials.mercadopagoSignature}}"
    },
    "validation": {
      "validate_signature": true,
      "allowed_ips": ["mercadopago.com"]
    }
  }
}
```

### WhatsApp Business API Webhooks

```javascript
// Configuração WhatsApp
{
  "webhook": {
    "name": "WhatsApp Webhook",
    "url": "https://seu-dominio.com/webhook/whatsapp",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "X-Hub-Signature": "{{$credentials.whatsappSignature}}"
    },
    "validation": {
      "validate_signature": true,
      "verify_token": "{{$credentials.verifyToken}}"
    }
  }
}
```

## Próximos Passos

- [API Keys](/integracoes/credential-nodes/api-keys) - Configurar autenticação com chaves
- [Basic Authentication](/integracoes/credential-nodes/basic-auth) - Configurar autenticação básica
- [OAuth Authentication](/integracoes/credential-nodes/oauth) - Configurar OAuth 2.0
- [Webhook Node](/integracoes/builtin-nodes/http-requests/webhook) - Configurar webhooks
- [Troubleshooting](/usando-n8n/troubleshooting) - Resolução de problemas
