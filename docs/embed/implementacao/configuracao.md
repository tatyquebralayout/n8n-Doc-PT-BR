---
sidebar_position: 2
title: Configuração do Embed
description: Como configurar parâmetros e opções do n8n embarcado
keywords: [n8n, embed, configuração, parâmetros, customização, iframe, SSO, permissões]
---


# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração do Embed

Este guia ensina como **configurar o n8n embarcado** em sua aplicação, cobrindo parâmetros essenciais, permissões, customização visual, integração com autenticação e exemplos práticos para diferentes cenários empresariais.

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Parâmetros de Configuração

### Parâmetros do Iframe

| Parâmetro         | Descrição                                      | Exemplo                                  |
|------------------|------------------------------------------------|------------------------------------------|
| `src`            | URL da instância n8n                            | `https://n8n.suaempresa.com/embed`       |
| `workflowId`     | ID do workflow inicial                         | `?workflowId=123`                        |
| `mode`           | Modo de visualização (`edit`, `view`, `run`)   | `?mode=edit`                             |
| `theme`          | Tema visual (`light`, `dark`, `corporate`)     | `?theme=corporate`                       |
| `lang`           | Idioma da interface                            | `?lang=pt-BR`                            |
| `hideSidebar`    | Oculta a barra lateral                         | `?hideSidebar=true`                      |
| `readonly`       | Modo somente leitura                           | `?readonly=true`                         |
| `token`          | Token de autenticação (JWT, API Key)           | `?token=eyJ...`                          |

#### **Exemplo de iframe**

```html
<iframe
  src="https://n8n.suaempresa.com/embed?workflowId=123&mode=edit&theme=corporate&lang=pt-BR&hideSidebar=true"
  width="100%"
  height="800"
  frameborder="0"
  allowfullscreen
></iframe>
```

### Segurança e CORS

- Configure o header `X-Frame-Options: SAMEORIGIN` ou `ALLOW-FROM` para domínios confiáveis.
- Use `Content-Security-Policy` para restringir origens do iframe:

```nginx
add_header Content-Security-Policy "frame-ancestors 'self' https://app.suaempresa.com" always;
```

- Defina domínios permitidos para CORS:

```bash
N8N_CORS_ALLOW_ORIGIN=https://app.suaempresa.com
```

---

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Permissões e Controle de Acesso

### RBAC e Restrições

- Defina permissões por usuário/grupo via RBAC:

```yaml
N8N_USER_MANAGEMENT_DISABLED=false
N8N_RBAC_ENABLED=true
```

- Permissões por workflow:

```json
{
  "workflowId": "abc123",
  "permissions": {
    "user1@empresa.com": ["read", "write"],
    "user2@empresa.com": ["read"],
    "group:marketing": ["read", "execute"]
  }
}
```

### Integração com SSO

- **SAML**

```yaml
N8N_SAML_ENABLED=true
N8N_SAML_ISSUER=https://sso.suaempresa.com
N8N_SAML_ENTRY_POINT=https://sso.suaempresa.com/sso
N8N_SAML_CERT=/path/to/certificate.pem
```

- **OAuth2**

```yaml
N8N_OAUTH2_AUTH_URL=https://sso.suaempresa.com/oauth/authorize
N8N_OAUTH2_TOKEN_URL=https://sso.suaempresa.com/oauth/token
N8N_OAUTH2_CLIENT_ID=seu_client_id
N8N_OAUTH2_CLIENT_SECRET=seu_client_secret
```

- **LDAP**

```yaml
N8N_LDAP_ENABLED=true
N8N_LDAP_SERVER_URL=ldap://ldap.suaempresa.com:389
N8N_LDAP_BIND_DN=cn=admin,dc=suaempresa,dc=com
N8N_LDAP_BIND_PASSWORD=senha_ldap
N8N_LDAP_BASE_DN=dc=suaempresa,dc=com
```

---

## <ion-icon name="color-palette-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Customização Visual

### Temas e Branding

- Parâmetros de tema: `theme=light`, `theme=dark`, `theme=corporate`
- Personalize cores, logo e fontes via variáveis de ambiente:

```yaml
N8N_THEME_PRIMARY_COLOR=#ea4b71
N8N_THEME_LOGO_URL=https://suaempresa.com/logo.png
N8N_THEME_FONT_FAMILY=Inter, sans-serif
```

- CSS customizado:

```yaml
N8N_CUSTOM_CSS_URL=https://suaempresa.com/n8n_custom.css
```

---

## <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Integração com Sistemas Externos

### Comunicação Host ↔ Embed

- Use `window.postMessage` para comunicação entre o host e o iframe embed:

```js
// No host
iframe.contentWindow.postMessage({ type: 'n8n_load_workflow', workflowId: 'abc123' }, '*');

// No embed
window.addEventListener('message', (event) => {
  if (event.data.type === 'n8n_load_workflow') {
    // Carregar workflow
  }
});
```

- Webhooks para eventos do editor:

```json
{
  "event": "workflow.saved",
  "workflowId": "abc123",
  "user": "user@empresa.com",
  "timestamp": "2024-06-01T12:00:00Z"
}
```

---

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Exemplos Práticos

### Exemplo de Configuração Completa

```html
<iframe
  src="https://n8n.suaempresa.com/embed?workflowId=456&mode=view&theme=dark&lang=pt-BR&readonly=true&token=eyJ..."
  width="100%"
  height="900"
  frameborder="0"
  allowfullscreen
  sandbox="allow-scripts allow-same-origin allow-forms"
></iframe>
```

### Parâmetros Dinâmicos via URL

```js
const params = new URLSearchParams({
  workflowId: '789',
  mode: 'edit',
  theme: 'corporate',
  lang: 'pt-BR',
  hideSidebar: 'true',
  token: 'eyJ...'
});
iframe.src = `https://n8n.suaempresa.com/embed?${params.toString()}`;
```

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Checklist de Configuração

- [ ] Definir domínios permitidos (CORS e CSP)
- [ ] Configurar autenticação (API Key, SSO, OAuth, LDAP)
- [ ] Personalizar tema, logo e idioma
- [ ] Limitar funcionalidades conforme o caso de uso
- [ ] Testar comunicação entre host e embed
- [ ] Validar segurança do iframe

---

:::tip **Dica Pro**
Use tokens de curta duração e renove-os automaticamente para maior segurança no embed.
:::

:::warning **Importante**
Sempre teste o embed em ambiente de homologação antes de liberar para produção. Restrinja domínios e permissões para evitar vazamentos de dados.
:::
