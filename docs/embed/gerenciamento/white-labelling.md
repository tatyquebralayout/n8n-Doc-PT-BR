---
sidebar_position: 2
title: White Labelling
description: Personalizar a aparência do n8n para sua marca
keywords: [n8n, embed, white labelling, branding, customização, tema]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="color-palette-outline" size={32} color="#ea4b71" /> White Labelling

Este documento detalha como **personalizar completamente a aparência do n8n embarcado** para sua marca, incluindo cores, logos, fontes, layout, domínio customizado, e integração visual perfeita com sua aplicação principal, criando uma experiência unificada e profissional para seus usuários.

## <IonicIcon name="school-outline" size={24} color="#ea4b71" /> O que você vai aprender

- <IonicIcon name="color-palette-outline" size={16} color="#6b7280" /> Personalização de tema e cores
- <IonicIcon name="image-outline" size={16} color="#6b7280" /> Branding e logos
- <IonicIcon name="code-outline" size={16} color="#6b7280" /> CSS customizado
- <IonicIcon name="globe-outline" size={16} color="#6b7280" /> Domínio customizado
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> Integração visual

---

## <IonicIcon name="color-palette-outline" size={24} color="#ea4b71" /> Personalização de Tema

### <IonicIcon name="settings-outline" size={20} color="#10b981" /> Configuração Básica

#### **Variáveis de Ambiente para Tema**
```bash
# Configurações básicas de tema
N8N_THEME_PRIMARY_COLOR=#ea4b71
N8N_THEME_SECONDARY_COLOR=#10b981
N8N_THEME_ACCENT_COLOR=#f59e0b
N8N_THEME_BACKGROUND_COLOR=#ffffff
N8N_THEME_TEXT_COLOR=#1f2937
N8N_THEME_BORDER_COLOR=#e5e7eb

# Configurações avançadas
N8N_THEME_FONT_FAMILY="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
N8N_THEME_FONT_SIZE_BASE=14px
N8N_THEME_BORDER_RADIUS=8px
N8N_THEME_SHADOW=0 4px 6px -1px rgba(0, 0, 0, 0.1)
```

#### **Configuração via Docker**
```yaml
# docker-compose.yml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    environment:
      - N8N_THEME_PRIMARY_COLOR=#ea4b71
      - N8N_THEME_SECONDARY_COLOR=#10b981
      - N8N_THEME_ACCENT_COLOR=#f59e0b
      - N8N_THEME_BACKGROUND_COLOR=#ffffff
      - N8N_THEME_TEXT_COLOR=#1f2937
      - N8N_THEME_FONT_FAMILY=Inter, sans-serif
      - N8N_THEME_FONT_SIZE_BASE=14px
      - N8N_THEME_BORDER_RADIUS=8px
    volumes:
      - ./custom-theme:/app/custom-theme
    ports:
      - "5678:5678"
```

### <IonicIcon name="color-fill-outline" size={20} color="#10b981" /> Esquemas de Cores

#### **Tema Escuro**
```css
/* dark-theme.css */
:root {
  --n8n-primary-color: #ea4b71;
  --n8n-secondary-color: #10b981;
  --n8n-accent-color: #f59e0b;
  --n8n-background-color: #1f2937;
  --n8n-surface-color: #374151;
  --n8n-text-color: #f9fafb;
  --n8n-text-secondary: #d1d5db;
  --n8n-border-color: #4b5563;
  --n8n-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

/* Aplicar tema escuro */
body[data-theme="dark"] {
  background-color: var(--n8n-background-color);
  color: var(--n8n-text-color);
}

body[data-theme="dark"] .n8n-card {
  background-color: var(--n8n-surface-color);
  border-color: var(--n8n-border-color);
  box-shadow: var(--n8n-shadow);
}
```

#### **Tema Corporativo**
```css
/* corporate-theme.css */
:root {
  --n8n-primary-color: #1e40af;    /* Azul corporativo */
  --n8n-secondary-color: #059669;  /* Verde sucesso */
  --n8n-accent-color: #dc2626;     /* Vermelho alerta */
  --n8n-background-color: #f8fafc;
  --n8n-surface-color: #ffffff;
  --n8n-text-color: #1e293b;
  --n8n-text-secondary: #64748b;
  --n8n-border-color: #e2e8f0;
  --n8n-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

/* Estilo corporativo */
.n8n-header {
  background: linear-gradient(135deg, var(--n8n-primary-color), #3b82f6);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.n8n-button-primary {
  background: var(--n8n-primary-color);
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.n8n-button-primary:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(30, 64, 175, 0.3);
}
```

---

## <IonicIcon name="image-outline" size={24} color="#ea4b71" /> Branding e Logos

### <IonicIcon name="logo-outline" size={20} color="#10b981" /> Configuração de Logo

#### **Logo Principal**
```bash
# Configurar logo principal
N8N_THEME_LOGO_URL=https://sua-empresa.com/logo.png
N8N_THEME_LOGO_WIDTH=150px
N8N_THEME_LOGO_HEIGHT=40px
N8N_THEME_LOGO_ALT="Sua Empresa - Automação"

# Logo para tema escuro
N8N_THEME_LOGO_DARK_URL=https://sua-empresa.com/logo-white.png
```

#### **Favicon e Ícones**
```bash
# Configurar favicon
N8N_THEME_FAVICON_URL=https://sua-empresa.com/favicon.ico
N8N_THEME_APPLE_TOUCH_ICON=https://sua-empresa.com/apple-touch-icon.png

# Ícones para PWA
N8N_THEME_ICON_192=https://sua-empresa.com/icon-192.png
N8N_THEME_ICON_512=https://sua-empresa.com/icon-512.png
```

#### **CSS para Logo Customizado**
```css
/* custom-logo.css */
.n8n-header-logo {
  background-image: url('https://sua-empresa.com/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 150px;
  height: 40px;
}

/* Logo responsivo */
@media (max-width: 768px) {
  .n8n-header-logo {
    width: 120px;
    height: 32px;
  }
}

/* Logo para tema escuro */
body[data-theme="dark"] .n8n-header-logo {
  background-image: url('https://sua-empresa.com/logo-white.png');
}
```

### <IonicIcon name="text-outline" size={20} color="#10b981" /> Texto e Marca

#### **Configuração de Texto**
```bash
# Textos customizados
N8N_THEME_APP_NAME="Sua Empresa - Automação"
N8N_THEME_APP_DESCRIPTION="Plataforma de automação empresarial"
N8N_THEME_FOOTER_TEXT="© 2024 Sua Empresa. Todos os direitos reservados."
N8N_THEME_HELP_TEXT="Precisa de ajuda? Entre em contato com nosso suporte."
```

#### **CSS para Textos Customizados**
```css
/* custom-text.css */
.n8n-app-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: var(--n8n-primary-color);
}

.n8n-app-description {
  font-size: 14px;
  color: var(--n8n-text-secondary);
  margin-top: 4px;
}

.n8n-footer {
  background-color: var(--n8n-surface-color);
  border-top: 1px solid var(--n8n-border-color);
  padding: 16px 24px;
  text-align: center;
  font-size: 12px;
  color: var(--n8n-text-secondary);
}
```

---

## <IonicIcon name="code-outline" size={24} color="#ea4b71" /> CSS Customizado

### <IonicIcon name="brush-outline" size={20} color="#10b981" /> Estilos Avançados

#### **Layout Customizado**
```css
/* custom-layout.css */
/* Header customizado */
.n8n-header {
  background: linear-gradient(135deg, var(--n8n-primary-color), var(--n8n-secondary-color));
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Sidebar customizada */
.n8n-sidebar {
  background-color: var(--n8n-surface-color);
  border-right: 1px solid var(--n8n-border-color);
  width: 280px;
  transition: width 0.3s ease;
}

.n8n-sidebar.collapsed {
  width: 60px;
}

/* Cards customizados */
.n8n-card {
  background: var(--n8n-surface-color);
  border: 1px solid var(--n8n-border-color);
  border-radius: var(--n8n-border-radius);
  box-shadow: var(--n8n-shadow);
  transition: all 0.2s ease;
}

.n8n-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Botões customizados */
.n8n-button {
  border-radius: var(--n8n-border-radius);
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.n8n-button-primary {
  background: var(--n8n-primary-color);
  color: white;
}

.n8n-button-primary:hover {
  background: #d63384;
  transform: translateY(-1px);
}

.n8n-button-secondary {
  background: var(--n8n-secondary-color);
  color: white;
}

.n8n-button-secondary:hover {
  background: #059669;
  transform: translateY(-1px);
}
```

#### **Componentes Específicos**
```css
/* custom-components.css */
/* Nodes customizados */
.n8n-node {
  border-radius: 8px;
  border: 2px solid var(--n8n-border-color);
  background: var(--n8n-surface-color);
  transition: all 0.2s ease;
}

.n8n-node:hover {
  border-color: var(--n8n-primary-color);
  box-shadow: 0 4px 8px rgba(234, 75, 113, 0.2);
}

.n8n-node.selected {
  border-color: var(--n8n-primary-color);
  box-shadow: 0 0 0 3px rgba(234, 75, 113, 0.3);
}

/* Canvas customizado */
.n8n-canvas {
  background: linear-gradient(45deg, #f8fafc 25%, transparent 25%),
              linear-gradient(-45deg, #f8fafc 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #f8fafc 75%),
              linear-gradient(-45deg, transparent 75%, #f8fafc 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

/* Toolbar customizada */
.n8n-toolbar {
  background: var(--n8n-surface-color);
  border-bottom: 1px solid var(--n8n-border-color);
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Status indicators */
.n8n-status-success {
  color: var(--n8n-secondary-color);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
}

.n8n-status-error {
  color: var(--n8n-accent-color);
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
}
```

### <IonicIcon name="phone-portrait-outline" size={20} color="#10b981" /> Responsividade

#### **CSS Responsivo**
```css
/* responsive.css */
/* Mobile (até 768px) */
@media (max-width: 768px) {
  .n8n-header {
    padding: 12px 16px;
  }
  
  .n8n-sidebar {
    position: fixed;
    left: -280px;
    z-index: 1000;
    transition: left 0.3s ease;
  }
  
  .n8n-sidebar.open {
    left: 0;
  }
  
  .n8n-main-content {
    margin-left: 0;
    padding: 16px;
  }
  
  .n8n-card {
    margin-bottom: 16px;
  }
}

/* Tablet (768px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .n8n-sidebar {
    width: 240px;
  }
  
  .n8n-main-content {
    margin-left: 240px;
  }
}

/* Desktop (acima de 1024px) */
@media (min-width: 1025px) {
  .n8n-sidebar {
    width: 280px;
  }
  
  .n8n-main-content {
    margin-left: 280px;
  }
}
```

---

## <IonicIcon name="globe-outline" size={24} color="#ea4b71" /> Domínio Customizado

### <IonicIcon name="settings-outline" size={20} color="#10b981" /> Configuração de Domínio

#### **Proxy Reverso com Nginx**
```nginx
# /etc/nginx/sites-available/n8n-custom
server {
    listen 80;
    server_name automação.suaempresa.com;
    
    # Redirecionar HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name automação.suaempresa.com;
    
    # Certificado SSL
    ssl_certificate /etc/letsencrypt/live/automação.suaempresa.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/automação.suaempresa.com/privkey.pem;
    
    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Headers de segurança
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Proxy para n8n
    location / {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # WebSocket support
    location /ws {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### **Configuração com Docker**
```yaml
# docker-compose.yml com domínio customizado
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
      - ./logs:/var/log/nginx
    depends_on:
      - n8n
    networks:
      - n8n-network

  n8n:
    image: n8nio/n8n
    environment:
      - N8N_HOST=automação.suaempresa.com
      - N8N_PROTOCOL=https
      - N8N_PORT=5678
      - N8N_THEME_PRIMARY_COLOR=#ea4b71
      - N8N_THEME_LOGO_URL=https://suaempresa.com/logo.png
    volumes:
      - n8n_data:/home/node/.n8n
      - ./custom-theme:/app/custom-theme
    networks:
      - n8n-network
    expose:
      - "5678"

volumes:
  n8n_data:

networks:
  n8n-network:
    driver: bridge
```

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> SSL e Segurança

#### **Certificado Let's Encrypt**
```bash
#!/bin/bash
# setup-ssl.sh

DOMAIN="automação.suaempresa.com"
EMAIL="admin@suaempresa.com"

# Instalar Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d $DOMAIN --email $EMAIL --agree-tos --non-interactive

# Configurar renovação automática
sudo crontab -e
# Adicionar linha:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

#### **Headers de Segurança**
```nginx
# security-headers.conf
# Content Security Policy
add_header Content-Security-Policy "
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https:;
    connect-src 'self' https: wss:;
    frame-ancestors 'self';
" always;

# Outros headers de segurança
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

---

## <IonicIcon name="construct-outline" size={24} color="#ea4b71" /> Integração Visual

### <IonicIcon name="link-outline" size={20} color="#10b981" /> Integração com Aplicação Principal

#### **CSS para Integração**
```css
/* integration.css */
/* Remover elementos do n8n que não são necessários */
.n8n-header .n8n-branding {
  display: none;
}

.n8n-sidebar .n8n-navigation-item[data-test-id="settings"] {
  display: none;
}

/* Integrar com header da aplicação principal */
.n8n-header {
  background: transparent;
  border-bottom: 1px solid var(--n8n-border-color);
  padding: 0;
  height: auto;
}

/* Estilo consistente com aplicação principal */
.n8n-button {
  font-family: var(--app-font-family);
  border-radius: var(--app-border-radius);
  font-weight: var(--app-font-weight);
}

.n8n-card {
  border-radius: var(--app-border-radius);
  box-shadow: var(--app-shadow);
}

/* Cores consistentes */
:root {
  --n8n-primary-color: var(--app-primary-color);
  --n8n-secondary-color: var(--app-secondary-color);
  --n8n-accent-color: var(--app-accent-color);
  --n8n-background-color: var(--app-background-color);
  --n8n-surface-color: var(--app-surface-color);
  --n8n-text-color: var(--app-text-color);
  --n8n-border-color: var(--app-border-color);
}
```

#### **JavaScript para Integração**
```javascript
// integration.js
class N8NIntegration {
  constructor() {
    this.init();
  }

  init() {
    // Aguardar carregamento do n8n
    this.waitForN8N().then(() => {
      this.applyCustomTheme();
      this.setupEventListeners();
      this.integrateWithMainApp();
    });
  }

  waitForN8N() {
    return new Promise((resolve) => {
      const checkN8N = () => {
        if (document.querySelector('.n8n-app')) {
          resolve();
        } else {
          setTimeout(checkN8N, 100);
        }
      };
      checkN8N();
    });
  }

  applyCustomTheme() {
    // Aplicar tema customizado
    const theme = {
      primaryColor: '#ea4b71',
      secondaryColor: '#10b981',
      accentColor: '#f59e0b',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      fontFamily: 'Inter, sans-serif'
    };

    // Aplicar variáveis CSS
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `--n8n-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`,
        value
      );
    });
  }

  setupEventListeners() {
    // Escutar eventos do n8n
    document.addEventListener('n8n-workflow-executed', (event) => {
      this.notifyMainApp('workflow-executed', event.detail);
    });

    document.addEventListener('n8n-workflow-error', (event) => {
      this.notifyMainApp('workflow-error', event.detail);
    });
  }

  integrateWithMainApp() {
    // Integrar com aplicação principal
    if (window.parent && window.parent !== window) {
      // Está em iframe
      this.setupIframeIntegration();
    } else {
      // Está em nova aba/janela
      this.setupWindowIntegration();
    }
  }

  setupIframeIntegration() {
    // Comunicação com aplicação principal via postMessage
    window.addEventListener('message', (event) => {
      if (event.origin !== window.parent.location.origin) return;

      switch (event.data.type) {
        case 'n8n-load-workflow':
          this.loadWorkflow(event.data.workflowId);
          break;
        case 'n8n-execute-workflow':
          this.executeWorkflow(event.data.workflowId, event.data.data);
          break;
        case 'n8n-get-status':
          this.getStatus();
          break;
      }
    });
  }

  setupWindowIntegration() {
    // Integração quando n8n está em nova aba
    window.addEventListener('beforeunload', () => {
      if (window.opener) {
        window.opener.postMessage({
          type: 'n8n-closed',
          timestamp: Date.now()
        }, '*');
      }
    });
  }

  notifyMainApp(type, data) {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: `n8n-${type}`,
        data: data,
        timestamp: Date.now()
      }, '*');
    }
  }

  loadWorkflow(workflowId) {
    // Carregar workflow específico
    const url = new URL(window.location);
    url.searchParams.set('workflow', workflowId);
    window.location.href = url.toString();
  }

  executeWorkflow(workflowId, data) {
    // Executar workflow via API
    fetch(`/api/v1/workflows/${workflowId}/trigger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': this.getApiKey()
      },
      body: JSON.stringify({ data })
    })
    .then(response => response.json())
    .then(result => {
      this.notifyMainApp('workflow-executed', result);
    })
    .catch(error => {
      this.notifyMainApp('workflow-error', error);
    });
  }

  getStatus() {
    // Obter status atual do n8n
    const status = {
      workflows: document.querySelectorAll('.n8n-workflow').length,
      activeWorkflows: document.querySelectorAll('.n8n-workflow.active').length,
      lastExecution: this.getLastExecutionTime()
    };

    this.notifyMainApp('status', status);
  }

  getApiKey() {
    // Obter API key do localStorage ou configuração
    return localStorage.getItem('n8n-api-key') || '';
  }

  getLastExecutionTime() {
    // Obter tempo da última execução
    const lastExecution = localStorage.getItem('n8n-last-execution');
    return lastExecution ? new Date(lastExecution) : null;
  }
}

// Inicializar integração
new N8NIntegration();
```

---

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> Boas Práticas

### <IonicIcon name="color-palette-outline" size={20} color="#10b981" /> Design System

#### **Guia de Cores**
```css
/* design-system.css */
:root {
  /* Cores primárias */
  --brand-primary: #ea4b71;
  --brand-primary-light: #f06292;
  --brand-primary-dark: #c2185b;
  
  /* Cores secundárias */
  --brand-secondary: #10b981;
  --brand-secondary-light: #34d399;
  --brand-secondary-dark: #059669;
  
  /* Cores neutras */
  --neutral-50: #f9fafb;
  --neutral-100: #f3f4f6;
  --neutral-200: #e5e7eb;
  --neutral-300: #d1d5db;
  --neutral-400: #9ca3af;
  --neutral-500: #6b7280;
  --neutral-600: #4b5563;
  --neutral-700: #374151;
  --neutral-800: #1f2937;
  --neutral-900: #111827;
  
  /* Estados */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}

/* Aplicar ao n8n */
:root {
  --n8n-primary-color: var(--brand-primary);
  --n8n-secondary-color: var(--brand-secondary);
  --n8n-accent-color: var(--warning);
  --n8n-success-color: var(--success);
  --n8n-error-color: var(--error);
  --n8n-info-color: var(--info);
}
```

#### **Tipografia**
```css
/* typography.css */
:root {
  /* Fontes */
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  
  /* Tamanhos */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;
  
  /* Pesos */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}

/* Aplicar ao n8n */
.n8n-app {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}

.n8n-heading {
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
}

.n8n-code {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
}
```

### <IonicIcon name="shield-outline" size={20} color="#10b981" /> Acessibilidade

#### **WCAG Compliance**
```css
/* accessibility.css */
/* Contraste adequado */
.n8n-text {
  color: var(--neutral-800);
  background-color: var(--neutral-50);
}

/* Foco visível */
.n8n-button:focus,
.n8n-input:focus,
.n8n-link:focus {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}

/* Estados de hover */
.n8n-button:hover,
.n8n-link:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

/* Suporte a modo escuro */
@media (prefers-color-scheme: dark) {
  :root {
    --n8n-background-color: var(--neutral-900);
    --n8n-surface-color: var(--neutral-800);
    --n8n-text-color: var(--neutral-100);
    --n8n-border-color: var(--neutral-700);
  }
}

/* Suporte a redução de movimento */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> Próximos Passos

Agora que você entende o white labelling do n8n:

1. **[Gerenciar Workflows](./gerenciar-workflows)** - Controle total sobre workflows
2. **[Configuração do Embed](../implementacao/configuracao)** - Configurar parâmetros avançados
3. **[API do n8n](../../api)** - Explorar endpoints para integração
4. **[Hosting](../../hosting-n8n)** - Configurar ambiente de produção

---

:::tip **Dica Pro**
Mantenha consistência visual com sua marca em todos os elementos. Use ferramentas como Figma para criar um design system completo antes de implementar.
:::

:::warning **Importante**
Teste o white labelling em diferentes dispositivos e navegadores. Certifique-se de que a acessibilidade não foi comprometida pelas customizações.
:::

:::info **Recurso Adicional**
Considere usar ferramentas como Storybook para documentar e testar componentes customizados do seu design system.
:::
