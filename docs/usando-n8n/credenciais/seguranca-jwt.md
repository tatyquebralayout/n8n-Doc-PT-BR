---
id: seguranca-jwt
title: Segurança JWT - Nunca Guarde no localStorage
sidebar_label: Segurança JWT
description: Boas práticas de segurança para autenticação JWT no n8n
---

# 🔒 Segurança JWT - Nunca Guarde no localStorage

## ⚠️ O Problema do localStorage

Você terminou de implementar autenticação com JWT e pensa:

> "É só salvar o token no localStorage, né?"

**Errado. Muito errado.**

Você pode estar abrindo uma porta para hackers sem perceber.

## 🚨 Vulnerabilidade XSS

Se sua aplicação tiver qualquer brecha de **Cross-Site Scripting (XSS)**, um atacante pode injetar JavaScript malicioso e acessar o localStorage.

```javascript
// ❌ PERIGOSO - Token pode ser roubado
const token = localStorage.getItem('token')
// Agora esse token pode ser usado por terceiros
```

**Resultado**: O atacante está autenticado como seu usuário.

## ✅ Solução Segura: Cookies HttpOnly

Armazene o JWT em um **cookie seguro** com a flag `HttpOnly`.

Esse tipo de cookie:
- ✅ **Não pode ser acessado via JavaScript**
- ✅ **Nem por você, nem por scripts maliciosos**
- ✅ **Enviado automaticamente pelo navegador**

```http
Set-Cookie: token=eyJhbGciOiJI...; HttpOnly; Secure; SameSite=Strict
```

## 🔧 Implementação no n8n

### Configuração do Servidor

```javascript
// ✅ Configuração segura
app.post('/login', (req, res) => {
  const token = jwt.sign(payload, secret, { expiresIn: '1h' })
  
  res.cookie('token', token, {
    httpOnly: true,        // Não acessível via JS
    secure: true,          // Apenas HTTPS
    sameSite: 'strict',    // Proteção CSRF
    maxAge: 3600000        // 1 hora
  })
  
  res.json({ success: true })
})
```

### Middleware de Autenticação

```javascript
// ✅ Verificação segura
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' })
    }
    req.user = user
    next()
  })
}
```

## 🛡️ Configurações de Segurança

### 1. HttpOnly
```javascript
httpOnly: true  // Bloqueia acesso via JavaScript
```

### 2. Secure
```javascript
secure: true    // Apenas em conexões HTTPS
```

### 3. SameSite
```javascript
sameSite: 'strict'  // Proteção contra CSRF
```

### 4. Expiração
```javascript
maxAge: 3600000  // 1 hora em milissegundos
```

## 🔄 Refresh Tokens

Para sessões longas, use **refresh tokens**:

```javascript
// ✅ Token de acesso (curta duração)
const accessToken = jwt.sign(payload, secret, { expiresIn: '15m' })

// ✅ Refresh token (longa duração)
const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '7d' })

res.cookie('accessToken', accessToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 900000  // 15 minutos
})

res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 604800000  // 7 dias
})
```

## 🚫 O que NUNCA fazer

```javascript
// ❌ NUNCA faça isso
localStorage.setItem('token', token)
sessionStorage.setItem('token', token)

// ❌ NUNCA exponha tokens no console
console.log('Token:', token)

// ❌ NUNCA envie tokens em URLs
fetch('/api/data?token=' + token)
```

## 🔍 Verificação de Segurança

### Teste de Vulnerabilidade

```javascript
// ✅ Teste se o token está protegido
try {
  const token = localStorage.getItem('token')
  console.log('Token encontrado:', !!token)
} catch (error) {
  console.log('✅ Token protegido - não acessível via JS')
}
```

### Headers de Segurança

```javascript
// ✅ Headers de segurança adicionais
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
})
```

## 📋 Checklist de Segurança

- [ ] **HttpOnly**: Cookies não acessíveis via JavaScript
- [ ] **Secure**: Apenas HTTPS
- [ ] **SameSite**: Proteção CSRF
- [ ] **Expiração**: Tokens com tempo de vida limitado
- [ ] **Refresh Tokens**: Para sessões longas
- [ ] **Headers de Segurança**: XSS, CSRF, etc.
- [ ] **Logs Seguros**: Nunca logar tokens
- [ ] **Validação**: Verificar tokens em todas as requisições

## 🔗 Recursos Adicionais

- [OWASP JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [MDN HttpOnly Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies)
- [JWT.io](https://jwt.io/) - Debugger e documentação

## 💡 Dica Importante

> **Lembre-se**: Segurança não é um recurso opcional. É fundamental para proteger seus usuários e sua aplicação.

## 🔧 Configuração Específica do n8n

### Variáveis de Ambiente

```bash
# Configuração de cookies seguros no n8n
N8N_SESSION_COOKIE_HTTPONLY=true
N8N_SESSION_COOKIE_SECURE=true
N8N_SESSION_COOKIE_SAMESITE=strict
N8N_SESSION_TIMEOUT=3600
```

### Headers de Segurança no Nginx

```nginx
# Headers de segurança para n8n
add_header X-Frame-Options DENY always;
add_header X-Content-Type-Options nosniff always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

## 🚨 Casos de Uso Específicos

### 1. Webhooks com JWT

```javascript
// ✅ Webhook seguro com JWT
app.post('/webhook', authenticateToken, (req, res) => {
  // Processar webhook apenas se autenticado
  const { data } = req.body
  // Processar dados...
  res.json({ success: true })
})
```

### 2. API Keys vs JWT

```javascript
// ✅ Para APIs públicas, use API Keys
const apiKey = req.headers['x-api-key']
if (!apiKey || !validApiKeys.includes(apiKey)) {
  return res.status(401).json({ error: 'API Key inválida' })
}

// ✅ Para autenticação de usuários, use JWT
const token = req.cookies.token
if (!token) {
  return res.status(401).json({ error: 'Token não fornecido' })
}
```

### 3. Rate Limiting

```javascript
// ✅ Rate limiting para endpoints JWT
const rateLimit = require('express-rate-limit')

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 tentativas
  message: 'Muitas tentativas de login'
})

app.post('/login', authLimiter, (req, res) => {
  // Processar login...
})
```

## 🔍 Monitoramento e Logs

### Logs Seguros

```javascript
// ✅ Logs sem expor tokens
app.use((req, res, next) => {
  const { method, url, ip } = req
  console.log(`${method} ${url} - ${ip}`)
  
  // ❌ NUNCA logar tokens
  // console.log('Token:', req.cookies.token)
  
  next()
})
```

### Alertas de Segurança

```javascript
// ✅ Alertas para tentativas suspeitas
app.post('/login', (req, res) => {
  const { email, ip } = req
  
  if (failedAttempts[email] > 3) {
    console.warn(`⚠️ Múltiplas tentativas de login para ${email} de ${ip}`)
    // Enviar alerta para administrador
  }
})
```

## 📊 Métricas de Segurança

### Monitoramento de Tokens

```javascript
// ✅ Métricas de segurança
const securityMetrics = {
  totalLogins: 0,
  failedLogins: 0,
  tokenValidations: 0,
  suspiciousActivities: 0
}

// Atualizar métricas em cada operação
app.post('/login', (req, res) => {
  securityMetrics.totalLogins++
  // Processar login...
})
```

## 🎯 Implementação Gradual

### Fase 1: Configuração Básica
1. Configurar cookies HttpOnly
2. Implementar expiração de tokens
3. Adicionar headers de segurança

### Fase 2: Autenticação Avançada
1. Implementar refresh tokens
2. Adicionar rate limiting
3. Configurar logs seguros

### Fase 3: Monitoramento
1. Implementar alertas de segurança
2. Adicionar métricas de segurança
3. Configurar auditoria completa

## 🔗 Referências Técnicas

- [RFC 7519 - JSON Web Token](https://tools.ietf.org/html/rfc7519)
- [OWASP Session Management](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management_Testing)
- [MDN SameSite Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#samesite_attribute)
- [n8n Security Documentation](https://docs.n8n.io/security/)

Implemente essas práticas desde o início do seu projeto para evitar vulnerabilidades graves no futuro.