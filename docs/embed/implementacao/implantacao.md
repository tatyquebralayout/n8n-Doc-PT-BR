---
sidebar_position: 1
title: Implantação do Embed
description: Como implantar e configurar n8n embarcado em produção
keywords: [n8n, embed, implantação, deployment, produção, iframe, SSO, segurança]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="rocket-outline" size={32} color="#ea4b71" /> Implantação do Embed

Este guia explica como **implantar o n8n embarcado** em ambiente de produção, cobrindo segurança, autenticação, performance, monitoramento, exemplos de deployment e troubleshooting para garantir integração robusta e segura com sua aplicação.

---

## <IonicIcon name="shield-checkmark-outline" size={24} color="#ea4b71" /> Segurança e Boas Práticas

### <IonicIcon name="lock-closed-outline" size={20} color="#10b981" /> Checklist de Segurança para Iframes

- Use `X-Frame-Options: SAMEORIGIN` ou `ALLOW-FROM` para restringir domínios
- Implemente `Content-Security-Policy` para limitar origens do embed
- Ative HTTPS obrigatório para todas as comunicações
- Restrinja tokens de autenticação por tempo e escopo
- Valide permissões do usuário a cada requisição

#### **Exemplo de headers Nginx**
```nginx
add_header X-Frame-Options "ALLOW-FROM https://app.suaempresa.com" always;
add_header Content-Security-Policy "frame-ancestors 'self' https://app.suaempresa.com" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

---

## <IonicIcon name="key-outline" size={24} color="#ea4b71" /> SSO e Autenticação

### <IonicIcon name="people-outline" size={20} color="#10b981" /> Passos para SSO Empresarial

- Configure SAML, OAuth2 ou LDAP conforme o sistema da empresa
- Mapeie usuários e permissões automaticamente
- Use tokens JWT ou API Key para autenticação do embed
- Exemplo de configuração SAML:
```yaml
N8N_SAML_ENABLED=true
N8N_SAML_ISSUER=https://sso.suaempresa.com
N8N_SAML_ENTRY_POINT=https://sso.suaempresa.com/sso
N8N_SAML_CERT=/path/to/certificate.pem
```
- Exemplo de configuração OAuth2:
```yaml
N8N_OAUTH2_AUTH_URL=https://sso.suaempresa.com/oauth/authorize
N8N_OAUTH2_TOKEN_URL=https://sso.suaempresa.com/oauth/token
N8N_OAUTH2_CLIENT_ID=seu_client_id
N8N_OAUTH2_CLIENT_SECRET=seu_client_secret
```

---

## <IonicIcon name="speedometer-outline" size={24} color="#ea4b71" /> Performance e Otimização

### <IonicIcon name="flash-outline" size={20} color="#10b981" /> Recomendações

- Use lazy loading para carregar o embed apenas quando necessário
- Ative cache de assets estáticos (CSS, JS, imagens)
- Monitore o tempo de carregamento do iframe
- Utilize CDN para servir arquivos estáticos do n8n
- Limite o número de workflows carregados por vez

#### **Exemplo de cache Nginx**
```nginx
location ~* \.(js|css|png|jpg|svg)$ {
  expires 30d;
  add_header Cache-Control "public, max-age=2592000";
}
```

---

## <IonicIcon name="analytics-outline" size={24} color="#ea4b71" /> Monitoramento e Troubleshooting

### <IonicIcon name="bug-outline" size={20} color="#10b981" /> Logs e Alertas

- Ative logs de acesso e auditoria no backend do n8n
- Configure alertas para falhas de autenticação e erros de integração
- Use webhooks para notificar eventos críticos (ex: workflow.error, workflow.saved)
- Exemplo de webhook para monitoramento:
```json
{
  "event": "workflow.error",
  "workflowId": "abc123",
  "user": "user@empresa.com",
  "timestamp": "2024-06-01T12:00:00Z",
  "error": "Token inválido"
}
```

### <IonicIcon name="help-circle-outline" size={20} color="#10b981" /> Estratégias de Fallback

- Exiba mensagens de erro amigáveis no embed
- Implemente retry automático para falhas temporárias
- Redirecione para tela de login em caso de sessão expirada
- Mantenha logs detalhados para análise de incidentes

---

## <IonicIcon name="server-outline" size={24} color="#ea4b71" /> Exemplos de Deployment

### <IonicIcon name="logo-docker" size={20} color="#10b981" /> Docker Compose para Produção

```yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    environment:
      - N8N_HOST=n8n.suaempresa.com
      - N8N_PROTOCOL=https
      - N8N_PORT=5678
      - N8N_USER_MANAGEMENT_DISABLED=false
      - N8N_RBAC_ENABLED=true
      - N8N_THEME_PRIMARY_COLOR=#ea4b71
      - N8N_THEME_LOGO_URL=https://suaempresa.com/logo.png
      - N8N_SAML_ENABLED=true
      - N8N_SAML_ISSUER=https://sso.suaempresa.com
      - N8N_SAML_ENTRY_POINT=https://sso.suaempresa.com/sso
      - N8N_SAML_CERT=/path/to/certificate.pem
    volumes:
      - n8n_data:/home/node/.n8n
    ports:
      - "5678:5678"
    restart: always
    depends_on:
      - postgres
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=senha_forte
      - POSTGRES_DB=n8n
    volumes:
      - pg_data:/var/lib/postgresql/data
volumes:
  n8n_data:
  pg_data:
```

### <IonicIcon name="globe-outline" size={20} color="#10b981" /> Proxy Reverso com Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name n8n.suaempresa.com;

    ssl_certificate /etc/letsencrypt/live/n8n.suaempresa.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/n8n.suaempresa.com/privkey.pem;

    add_header X-Frame-Options "ALLOW-FROM https://app.suaempresa.com" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://app.suaempresa.com" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### <IonicIcon name="code-outline" size={20} color="#10b981" /> CI/CD para Automação de Deployment

- Use GitHub Actions, GitLab CI ou outra ferramenta para automatizar build e deploy
- Exemplo de job para deploy automático:
```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy para servidor
        run: |
          docker-compose pull
          docker-compose up -d
```

---

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> Checklist de Produção

- [ ] HTTPS obrigatório e certificado válido
- [ ] Domínios permitidos configurados (CORS e CSP)
- [ ] SSO e autenticação integrados
- [ ] Permissões e RBAC revisados
- [ ] Monitoramento e alertas ativos
- [ ] Mensagens de erro amigáveis e logs detalhados
- [ ] Backup e restore testados
- [ ] CI/CD automatizado para deploy

---

:::tip **Dica Pro**
Automatize o deploy do embed com CI/CD e monitore o uso do iframe para identificar gargalos de performance.
:::

:::warning **Importante**
Nunca exponha o n8n embed sem HTTPS e sem restrição de domínios. Teste todos os fluxos de autenticação e fallback antes de liberar para produção.
:::
