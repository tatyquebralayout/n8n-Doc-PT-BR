---
sidebar_position: 1
title: Autenticação e Acesso
description: Como configurar autenticação segura e controle de acesso no n8n
keywords: [n8n, autenticação, segurança, acesso, login, usuarios]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="shield-checkmark-outline" size={32} color="#ea4b71" /> Autenticação e Acesso

Este documento detalha como **configurar autenticação segura** no n8n, abordando métodos de login, integração com LDAP/Active Directory, SSO empresarial, autenticação de dois fatores, controle de sessão, e políticas de segurança que protegem o acesso à plataforma garantindo que apenas usuários autorizados possam criar, modificar ou executar workflows sensíveis em ambiente corporativo.

## <IonicIcon name="school-outline" size={24} color="#ea4b71" /> O que você vai aprender

- <IonicIcon name="key-outline" size={16} color="#6b7280" /> Métodos de autenticação disponíveis
- <IonicIcon name="shield-outline" size={16} color="#6b7280" /> Configuração de segurança avançada
- <IonicIcon name="people-outline" size={16} color="#6b7280" /> Integração com sistemas externos
- <IonicIcon name="phone-portrait-outline" size={16} color="#6b7280" /> Autenticação de dois fatores
- <IonicIcon name="time-outline" size={16} color="#6b7280" /> Controle de sessão e timeout

---

## <IonicIcon name="key-outline" size={24} color="#ea4b71" /> Métodos de Autenticação

### <IonicIcon name="person-outline" size={20} color="#10b981" /> Autenticação Básica

#### **Configuração Básica**
```bash
# Variáveis de ambiente para autenticação básica
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=senha_segura_complexa
```

#### **Docker Compose**
```yaml
services:
  n8n:
    image: n8nio/n8n:latest
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=${N8N_ADMIN_PASSWORD}
    ports:
      - "5678:5678"
```

#### **Política de Senhas**
```bash
# Configurar política de senhas forte
N8N_PASSWORD_POLICY_MIN_LENGTH=12
N8N_PASSWORD_POLICY_REQUIRE_UPPERCASE=true
N8N_PASSWORD_POLICY_REQUIRE_LOWERCASE=true
N8N_PASSWORD_POLICY_REQUIRE_NUMBERS=true
N8N_PASSWORD_POLICY_REQUIRE_SPECIAL_CHARS=true
```

### <IonicIcon name="phone-portrait-outline" size={20} color="#10b981" /> Autenticação de Dois Fatores (2FA)

#### **Configuração 2FA**
```bash
# Ativar 2FA globalmente
N8N_2FA_ENABLED=true
N8N_2FA_REQUIRED=true

# Configurações de 2FA
N8N_2FA_ISSUER=n8n
N8N_2FA_ALGORITHM=SHA1
N8N_2FA_DIGITS=6
N8N_2FA_PERIOD=30
```

#### **Apps Compatíveis**
- **Google Authenticator** - Mais popular
- **Microsoft Authenticator** - Integração com Azure
- **Authy** - Backup na nuvem
- **1Password** - Gerenciador de senhas
- **Bitwarden** - Open source

#### **Configuração por Usuário**
```javascript
// Ativar 2FA para usuário específico
{
  "userId": "user123",
  "twoFactorEnabled": true,
  "twoFactorSecret": "JBSWY3DPEHPK3PXP",
  "backupCodes": [
    "12345678",
    "87654321",
    "11223344"
  ]
}
```

### <IonicIcon name="business-outline" size={20} color="#10b981" /> SSO (Single Sign-On)

#### **SAML 2.0**
```bash
# Configuração SAML
N8N_SAML_ENABLED=true
N8N_SAML_ISSUER=https://seu-identity-provider.com
N8N_SAML_ENTRY_POINT=https://seu-identity-provider.com/sso
N8N_SAML_CERT=/path/to/certificate.pem
N8N_SAML_PRIVATE_KEY=/path/to/private-key.pem
N8N_SAML_SIGNATURE_ALGORITHM=SHA256
```

#### **OAuth 2.0**
```bash
# Configuração OAuth 2.0
N8N_OAUTH2_ENABLED=true
N8N_OAUTH2_CLIENT_ID=seu_client_id
N8N_OAUTH2_CLIENT_SECRET=seu_client_secret
N8N_OAUTH2_AUTH_URL=https://auth.provider.com/oauth/authorize
N8N_OAUTH2_TOKEN_URL=https://auth.provider.com/oauth/token
N8N_OAUTH2_USERINFO_URL=https://auth.provider.com/oauth/userinfo
N8N_OAUTH2_SCOPE=openid profile email
```

#### **OpenID Connect**
```bash
# Configuração OpenID Connect
N8N_OIDC_ENABLED=true
N8N_OIDC_ISSUER=https://accounts.google.com
N8N_OIDC_CLIENT_ID=seu_client_id
N8N_OIDC_CLIENT_SECRET=seu_client_secret
N8N_OIDC_SCOPE=openid profile email
```

### <IonicIcon name="server-outline" size={20} color="#10b981" /> LDAP/Active Directory

#### **Configuração LDAP**
```bash
# Configuração LDAP
N8N_LDAP_ENABLED=true
N8N_LDAP_SERVER_URL=ldap://ldap.empresa.com:389
N8N_LDAP_BIND_DN=cn=admin,dc=empresa,dc=com
N8N_LDAP_BIND_PASSWORD=senha_ldap
N8N_LDAP_BASE_DN=dc=empresa,dc=com
N8N_LDAP_USER_FILTER=(uid={{username}})
N8N_LDAP_USER_ATTRIBUTE=uid
N8N_LDAP_EMAIL_ATTRIBUTE=mail
N8N_LDAP_NAME_ATTRIBUTE=cn
```

#### **Configuração Active Directory**
```bash
# Configuração Active Directory
N8N_LDAP_ENABLED=true
N8N_LDAP_SERVER_URL=ldap://dc.empresa.com:389
N8N_LDAP_BIND_DN=cn=admin,dc=empresa,dc=com
N8N_LDAP_BIND_PASSWORD=senha_ad
N8N_LDAP_BASE_DN=dc=empresa,dc=com
N8N_LDAP_USER_FILTER=(sAMAccountName={{username}})
N8N_LDAP_USER_ATTRIBUTE=sAMAccountName
N8N_LDAP_EMAIL_ATTRIBUTE=mail
N8N_LDAP_NAME_ATTRIBUTE=displayName
N8N_LDAP_GROUP_FILTER=(memberOf=cn=n8n-users,ou=groups,dc=empresa,dc=com)
```

---

## <IonicIcon name="shield-outline" size={24} color="#ea4b71" /> Configurações de Segurança

### <IonicIcon name="lock-closed-outline" size={20} color="#10b981" /> Controle de Sessão

#### **Timeout de Sessão**
```bash
# Configurar timeout de sessão
N8N_SESSION_TIMEOUT=3600  # 1 hora em segundos
N8N_SESSION_SECRET=chave_secreta_muito_longa_e_complexa
N8N_SESSION_COOKIE_SECURE=true
N8N_SESSION_COOKIE_HTTPONLY=true
N8N_SESSION_COOKIE_SAMESITE=strict
```

#### **Limite de Tentativas de Login**
```bash
# Configurar limite de tentativas
N8N_MAX_LOGIN_ATTEMPTS=5
N8N_LOGIN_ATTEMPT_TIMEOUT=900  # 15 minutos
N8N_ACCOUNT_LOCKOUT_DURATION=1800  # 30 minutos
```

#### **Configuração de Cookies**
```bash
# Configurações de segurança de cookies
N8N_COOKIE_SECURE=true
N8N_COOKIE_HTTPONLY=true
N8N_COOKIE_SAMESITE=strict
N8N_COOKIE_DOMAIN=.seudominio.com
N8N_COOKIE_PATH=/
```

### <IonicIcon name="location-outline" size={20} color="#10b981" /> Restrições de IP

#### **Whitelist de IPs**
```bash
# Permitir apenas IPs específicos
N8N_ALLOWED_IPS=192.168.1.0/24,10.0.0.0/8,203.0.113.0/24
N8N_BLOCKED_IPS=203.0.113.100,192.168.1.100
```

#### **Configuração Nginx**
```nginx
# Restrição por IP no Nginx
location / {
    allow 192.168.1.0/24;
    allow 10.0.0.0/8;
    deny all;
    
    proxy_pass http://n8n_backend;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### <IonicIcon name="time-outline" size={20} color="#10b981" /> Horários de Acesso

#### **Configuração de Janelas de Tempo**
```bash
# Configurar horários de acesso
N8N_ACCESS_HOURS_START=09:00
N8N_ACCESS_HOURS_END=18:00
N8N_ACCESS_TIMEZONE=America/Sao_Paulo
N8N_ACCESS_DAYS=monday,tuesday,wednesday,thursday,friday
```

#### **Script de Verificação**
```bash
#!/bin/bash
# check-access-hours.sh

CURRENT_TIME=$(date +%H:%M)
CURRENT_DAY=$(date +%A | tr '[:upper:]' '[:lower:]')
ALLOWED_START="09:00"
ALLOWED_END="18:00"
ALLOWED_DAYS="monday,tuesday,wednesday,thursday,friday"

# Verificar se é dia permitido
if [[ ! $ALLOWED_DAYS =~ $CURRENT_DAY ]]; then
    echo "Acesso negado: Fora dos dias permitidos"
    exit 1
fi

# Verificar se está no horário permitido
if [[ "$CURRENT_TIME" < "$ALLOWED_START" || "$CURRENT_TIME" > "$ALLOWED_END" ]]; then
    echo "Acesso negado: Fora do horário permitido"
    exit 1
fi

echo "Acesso permitido"
exit 0
```

---

## <IonicIcon name="people-outline" size={24} color="#ea4b71" /> Integração com Sistemas Externos

### <IonicIcon name="logo-google" size={20} color="#10b981" /> Google Workspace

#### **Configuração Google OAuth**
```bash
# Configuração para Google Workspace
N8N_OAUTH2_ENABLED=true
N8N_OAUTH2_CLIENT_ID=seu_google_client_id
N8N_OAUTH2_CLIENT_SECRET=seu_google_client_secret
N8N_OAUTH2_AUTH_URL=https://accounts.google.com/o/oauth2/auth
N8N_OAUTH2_TOKEN_URL=https://oauth2.googleapis.com/token
N8N_OAUTH2_USERINFO_URL=https://www.googleapis.com/oauth2/v2/userinfo
N8N_OAUTH2_SCOPE=openid profile email
```

#### **Configuração Google SAML**
```bash
# Configuração SAML com Google
N8N_SAML_ENABLED=true
N8N_SAML_ISSUER=https://accounts.google.com/o/saml2?idpid=seu_idp_id
N8N_SAML_ENTRY_POINT=https://accounts.google.com/o/saml2/idp?idpid=seu_idp_id
N8N_SAML_CERT=/path/to/google_cert.pem
```

### <IonicIcon name="logo-microsoft" size={20} color="#10b981" /> Microsoft Azure AD

#### **Configuração Azure AD**
```bash
# Configuração Azure AD
N8N_OAUTH2_ENABLED=true
N8N_OAUTH2_CLIENT_ID=seu_azure_client_id
N8N_OAUTH2_CLIENT_SECRET=seu_azure_client_secret
N8N_OAUTH2_AUTH_URL=https://login.microsoftonline.com/seu_tenant_id/oauth2/v2.0/authorize
N8N_OAUTH2_TOKEN_URL=https://login.microsoftonline.com/seu_tenant_id/oauth2/v2.0/token
N8N_OAUTH2_USERINFO_URL=https://graph.microsoft.com/v1.0/me
N8N_OAUTH2_SCOPE=openid profile email User.Read
```

#### **Configuração Azure AD SAML**
```bash
# Configuração SAML com Azure AD
N8N_SAML_ENABLED=true
N8N_SAML_ISSUER=https://sts.windows.net/seu_tenant_id/
N8N_SAML_ENTRY_POINT=https://login.microsoftonline.com/seu_tenant_id/saml2
N8N_SAML_CERT=/path/to/azure_cert.pem
```

### <IonicIcon name="logo-github" size={20} color="#10b981" /> GitHub Enterprise

#### **Configuração GitHub OAuth**
```bash
# Configuração GitHub Enterprise
N8N_OAUTH2_ENABLED=true
N8N_OAUTH2_CLIENT_ID=seu_github_client_id
N8N_OAUTH2_CLIENT_SECRET=seu_github_client_secret
N8N_OAUTH2_AUTH_URL=https://github.empresa.com/login/oauth/authorize
N8N_OAUTH2_TOKEN_URL=https://github.empresa.com/login/oauth/access_token
N8N_OAUTH2_USERINFO_URL=https://github.empresa.com/api/v3/user
N8N_OAUTH2_SCOPE=read:user user:email
```

---

## <IonicIcon name="analytics-outline" size={24} color="#ea4b71" /> Monitoramento e Auditoria

### <IonicIcon name="document-text-outline" size={20} color="#10b981" /> Logs de Autenticação

#### **Configuração de Logs**
```bash
# Configurar logs de autenticação
N8N_LOG_LEVEL=info
N8N_LOG_FORMAT=json
N8N_AUTH_LOG_ENABLED=true
N8N_AUTH_LOG_LEVEL=info
N8N_AUTH_LOG_FILE=/var/log/n8n/auth.log
```

#### **Eventos Monitorados**
```javascript
// Eventos de autenticação monitorados
const authEvents = {
  login_success: "Login bem-sucedido",
  login_failed: "Tentativa de login falhou",
  logout: "Logout realizado",
  password_change: "Senha alterada",
  password_reset: "Senha resetada",
  two_factor_enabled: "2FA ativado",
  two_factor_disabled: "2FA desativado",
  account_locked: "Conta bloqueada",
  account_unlocked: "Conta desbloqueada",
  session_expired: "Sessão expirada",
  suspicious_activity: "Atividade suspeita detectada"
};
```

### <IonicIcon name="notifications-outline" size={20} color="#10b981" /> Alertas de Segurança

#### **Configuração de Alertas**
```bash
# Configurar alertas de segurança
N8N_SECURITY_ALERTS_ENABLED=true
N8N_SECURITY_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
N8N_SECURITY_EMAIL_ALERTS=true
N8N_SECURITY_EMAIL_FROM=security@empresa.com
N8N_SECURITY_EMAIL_TO=admin@empresa.com
```

#### **Tipos de Alertas**
```javascript
// Configuração de alertas
const securityAlerts = {
  failedLogins: {
    threshold: 5,
    timeWindow: "15m",
    action: "notify_admin"
  },
  unusualActivity: {
    newLocation: true,
    unusualHours: true,
    action: "notify_user"
  },
  accountLockouts: {
    action: "notify_admin",
    immediate: true
  },
  twoFactorFailures: {
    threshold: 3,
    action: "notify_admin"
  }
};
```

---

## <IonicIcon name="construct-outline" size={24} color="#ea4b71" /> Configuração Avançada

### <IonicIcon name="server-outline" size={20} color="#10b981" /> Proxy Reverso

#### **Configuração Nginx com Autenticação**
```nginx
# Configuração Nginx com autenticação
server {
    listen 443 ssl http2;
    server_name seudominio.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/seudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seudominio.com/privkey.pem;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    # Login endpoint com rate limiting
    location /login {
        limit_req zone=login burst=3 nodelay;
        proxy_pass http://n8n_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API endpoints
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://n8n_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # General proxy
    location / {
        proxy_pass http://n8n_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> Headers de Segurança

#### **Configuração Completa de Headers**
```nginx
# Headers de segurança completos
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Frame-Options DENY always;
add_header X-Content-Type-Options nosniff always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';" always;
```

---

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> Checklist de Segurança

### <IonicIcon name="shield-outline" size={20} color="#10b981" /> Autenticação

- [ ] Autenticação básica configurada
- [ ] 2FA ativado para usuários críticos
- [ ] Política de senhas forte implementada
- [ ] SSO configurado (se aplicável)
- [ ] LDAP/AD integrado (se aplicável)

### <IonicIcon name="lock-closed-outline" size={20} color="#10b981" /> Sessão

- [ ] Timeout de sessão configurado
- [ ] Limite de tentativas de login definido
- [ ] Cookies seguros configurados
- [ ] Sessão secreta definida
- [ ] Logout automático implementado

### <IonicIcon name="location-outline" size={20} color="#10b981" /> Rede

- [ ] Restrições de IP configuradas
- [ ] Firewall configurado
- [ ] VPN implementada (se necessário)
- [ ] Acesso remoto seguro
- [ ] Logs de acesso ativados

### <IonicIcon name="analytics-outline" size={20} color="#10b981" /> Monitoramento

- [ ] Logs de autenticação ativados
- [ ] Alertas de segurança configurados
- [ ] Auditoria de acesso implementada
- [ ] Relatórios de segurança gerados
- [ ] Incidentes documentados

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> Próximos Passos

Agora que você configurou a autenticação:

1. **[Usuários e Permissões](./usuarios-permissoes)** - Configure controle de acesso granular
2. **[Backup e Recovery](./backup-recovery)** - Implemente estratégias de backup
3. **[Monitoramento](./monitoring)** - Configure alertas e métricas

---

:::tip **Dica Pro**
Sempre use HTTPS em produção e configure headers de segurança adequados. Implemente 2FA para todos os usuários administrativos.
:::

:::warning **Importante**
Teste regularmente sua configuração de autenticação e mantenha logs de auditoria por pelo menos 90 dias para compliance.
:::

:::info **Recurso Adicional**
Considere implementar um sistema de gerenciamento de identidade (IAM) para automação de provisionamento e desprovisionamento de usuários.
:::

---

**<IonicIcon name="link-outline" size={16} color="#ea4b71" /> Links úteis:**
- <IonicIcon name="document-text-outline" size={16} color="#6b7280" /> [Documentação oficial n8n](https://docs.n8n.io/)
- <IonicIcon name="shield-checkmark-outline" size={16} color="#6b7280" /> [Guia de Segurança n8n](https://docs.n8n.io/hosting/security/)
- <IonicIcon name="people-outline" size={16} color="#6b7280" /> [Configuração de Usuários](https://docs.n8n.io/hosting/user-management/)
