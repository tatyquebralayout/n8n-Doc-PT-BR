---
sidebar_position: 4
title: Configuração SSL/HTTPS
description: Como configurar SSL e HTTPS para n8n seguro em produção
keywords: [n8n, ssl, https, segurança, certificados, nginx]
---


# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração SSL/HTTPS

Este documento ensina como **configurar SSL/HTTPS** para n8n em produção, abordando obtenção de certificados SSL, configuração de reverse proxy com nginx, renovação automática via Let's Encrypt, implementação de security headers, e melhores práticas de segurança que garantem comunicação criptografada e protegem workflows e credenciais contra interceptação e ataques man-in-the-middle.

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você vai aprender

- Obtenção de certificados SSL
- Configuração de reverse proxy
- Renovação automática
- Security headers
- Melhores práticas

---

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Por que HTTPS é Essencial?

### Benefícios do HTTPS

**Sem HTTPS:**

- ❌ **Dados expostos** - Credenciais e workflows visíveis
- ❌ **Man-in-the-middle** - Ataques de interceptação
- ❌ **Sem confiança** - Navegadores bloqueiam recursos
- ❌ **Não compliance** - Violação de regulamentações
- ❌ **Webhooks falham** - Muitos serviços exigem HTTPS

**Com HTTPS:**

- ✅ **Criptografia** - Dados protegidos em trânsito
- ✅ **Autenticação** - Confirma identidade do servidor
- ✅ **Integridade** - Dados não podem ser alterados
- ✅ **Confiança** - Navegadores confiam na conexão
- ✅ **Compliance** - Atende requisitos de segurança

### Quando Usar HTTPS

**Sempre use HTTPS em:**

- **Produção** - Qualquer ambiente público
- **Webhooks** - Para receber dados externos
- **APIs** - Para integrações seguras
- **Credenciais** - Para proteger dados sensíveis
- **Compliance** - Para atender regulamentações

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Obtenção de Certificados

### Lets Encrypt (Gratuito)

#### **Instalação do Certbot**

```bash
# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Ubuntu/Debian
sudo apt update
sudo apt install certbot python3-certbot-nginx

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> CentOS/RHEL
sudo yum install certbot python3-certbot-nginx

# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar instalação
certbot --version
```

#### **Gerar Certificado**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Gerar certificado para domínio
sudo certbot --nginx -d seudominio.com

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Gerar certificado para múltiplos domínios
sudo certbot --nginx -d seudominio.com -d www.seudominio.com

# <ion-icon name="card-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Gerar certificado wildcard (requer DNS challenge)
sudo certbot certonly --manual --preferred-challenges=dns -d *.seudominio.com
```

#### **Renovação Automática**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Testar renovação
sudo certbot renew --dry-run

# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Adicionar ao crontab para renovação automática
sudo crontab -e

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Adicionar linha:
0 12 * * * /usr/bin/certbot renew --quiet
```

### Certificados Comerciais

#### **Comprar Certificado**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Comprar de provedores como:
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> - DigiCert
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> - GlobalSign
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> - Comodo
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> - Sectigo

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Após compra, você receberá:
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> - certificate.crt (certificado público)
# <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> - private.key (chave privada)
# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> - ca_bundle.crt (cadeia de certificados)
```

#### **Instalar Certificado Comercial**

```bash
# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Criar diretório para certificados
sudo mkdir -p /etc/ssl/certs/n8n
sudo mkdir -p /etc/ssl/private/n8n

# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Copiar certificados
sudo cp certificate.crt /etc/ssl/certs/n8n/
sudo cp private.key /etc/ssl/private/n8n/
sudo cp ca_bundle.crt /etc/ssl/certs/n8n/

# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurar permissões
sudo chmod 644 /etc/ssl/certs/n8n/certificate.crt
sudo chmod 644 /etc/ssl/certs/n8n/ca_bundle.crt
sudo chmod 600 /etc/ssl/private/n8n/private.key
```

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração Nginx

### Instalação e Configuração Básica

#### **Instalar Nginx**

```bash
# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Ubuntu/Debian
sudo apt update
sudo apt install nginx

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> CentOS/RHEL
sudo yum install nginx

# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Iniciar e habilitar
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### **Configuração Básica**

```nginx
# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> /etc/nginx/sites-available/n8n

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Redirecionar HTTP para HTTPS
server {
    listen 80;
    server_name seudominio.com www.seudominio.com;
    return 301 https://$server_name$request_uri;
}

# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração HTTPS
server {
    listen 443 ssl http2;
    server_name seudominio.com www.seudominio.com;

    # Certificados SSL
    ssl_certificate /etc/letsencrypt/live/seudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seudominio.com/privkey.pem;

    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Proxy para n8n
    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Configurações específicas para webhooks
    location /webhook/ {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts maiores para webhooks
        proxy_connect_timeout 120s;
        proxy_send_timeout 120s;
        proxy_read_timeout 120s;
    }
}
```

### Configuração Avançada

#### **Otimizações de Performance**

```nginx
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> /etc/nginx/nginx.conf

http {
    # Configurações básicas
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=webhook:10m rate=30r/s;

    # Incluir configurações do site
    include /etc/nginx/sites-enabled/*;
}
```

#### **Configuração com Rate Limiting**

```nginx
# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> /etc/nginx/sites-available/n8n

server {
    listen 443 ssl http2;
    server_name seudominio.com;

    # Certificados SSL
    ssl_certificate /etc/letsencrypt/live/seudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seudominio.com/privkey.pem;

    # Rate limiting para API
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Rate limiting para webhooks
    location /webhook/ {
        limit_req zone=webhook burst=50 nodelay;
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Configuração geral
    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## <ion-icon name="cloud-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Docker e Containerização

### Docker Compose com Nginx

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    restart: unless-stopped
    environment:
      - N8N_PROTOCOL=https
      - N8N_HOST=seudominio.com
      - GENERIC_TIMEZONE=America/Sao_Paulo
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=${DB_PASSWORD}
      - REDIS_URL=redis://redis:6379
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      - postgres
      - redis
    networks:
      - n8n_network

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    depends_on:
      - n8n
    networks:
      - n8n_network

  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    command: certonly --webroot --webroot-path=/var/www/certbot --email seu-email@seudominio.com --agree-tos --no-eff-email -d seudominio.com

  postgres:
    image: postgres:15
    restart: unless-stopped
    environment:
      - POSTGRES_DB=n8n
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - n8n_network

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - n8n_network

volumes:
  n8n_data:
  postgres_data:
  redis_data:

networks:
  n8n_network:
    driver: bridge
```

### Nginx Configuration para Docker

```nginx
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> nginx.conf

events {
    worker_connections 1024;
}

http {
    upstream n8n_backend {
        server n8n:5678;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=webhook:10m rate=30r/s;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript;

    server {
        listen 80;
        server_name seudominio.com;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name seudominio.com;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;

        # Security Headers
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Frame-Options DENY always;
        add_header X-Content-Type-Options nosniff always;
        add_header X-XSS-Protection "1; mode=block" always;

        # API endpoints with rate limiting
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://n8n_backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Webhook endpoints with rate limiting
        location /webhook/ {
            limit_req zone=webhook burst=50 nodelay;
            proxy_pass http://n8n_backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_read_timeout 120s;
        }

        # General proxy
        location / {
            proxy_pass http://n8n_backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Forwarded-Host $host;
            proxy_set_header X-Forwarded-Port $server_port;

            # WebSocket support
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }
}
```

---

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Security Headers

### Headers Essenciais

```nginx
# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Security Headers para n8n

# <ion-icon name="repeat-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Força HTTPS
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Previne clickjacking
add_header X-Frame-Options DENY always;

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Previne MIME type sniffing
add_header X-Content-Type-Options nosniff always;

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Proteção XSS
add_header X-XSS-Protection "1; mode=block" always;

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Política de referrer
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Content Security Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';" always;

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Permissions Policy
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

### Configuração Completa

```nginx
# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração completa de segurança

server {
    listen 443 ssl http2;
    server_name seudominio.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/seudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seudominio.com/privkey.pem;
    
    # SSL Security
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    
    # Content Security Policy para n8n
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https: wss:; frame-ancestors 'none';" always;

    # Proxy configuration
    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Renovação Automática

### Script de Renovação

```bash
#!/bin/bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> renew-ssl.sh

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Renovar certificados Lets Encrypt
certbot renew --quiet

# <ion-icon name="repeat-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recarregar Nginx se certificados foram renovados
if [ $? -eq 0 ]; then
    echo "Certificados renovados com sucesso"
    systemctl reload nginx
else
    echo "Erro na renovação dos certificados"
    exit 1
fi
```

### Cron Job

```bash
# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Adicionar ao crontab
sudo crontab -e

# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Renovar certificados duas vezes por dia
0 6,18 * * * /path/to/renew-ssl.sh

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar certificados semanalmente
0 12 * * 0 /usr/bin/certbot renew --dry-run
```

### Monitoramento

```bash
#!/bin/bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> check-ssl.sh

DOMAIN="seudominio.com"
DAYS_THRESHOLD=30

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar expiração do certificado
EXPIRY_DATE=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2)
EXPIRY_EPOCH=$(date -d "$EXPIRY_DATE" +%s)
CURRENT_EPOCH=$(date +%s)
DAYS_LEFT=$(( ($EXPIRY_EPOCH - $CURRENT_EPOCH) / 86400 ))

if [ $DAYS_LEFT -lt $DAYS_THRESHOLD ]; then
    echo "ALERTA: Certificado SSL expira em $DAYS_LEFT dias"
    # Enviar notificação
    curl -X POST https://hooks.slack.com/services/YOUR/WEBHOOK/URL \
      -H "Content-type: application/json" \
      -d "{\"text\":\"⚠️ Certificado SSL expira em $DAYS_LEFT dias\"}"
fi
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Testes e Validação

### Testes de SSL

#### **Verificar Certificado**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar certificado
openssl s_client -connect seudominio.com:443 -servername seudominio.com

# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar cadeia de certificados
openssl s_client -connect seudominio.com:443 -servername seudominio.com -showcerts

# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar configuração SSL
nmap --script ssl-enum-ciphers -p 443 seudominio.com
```

#### **Testes Online**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Ferramentas online para testar SSL:
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> - https://www.ssllabs.com/ssltest/
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> - https://observatory.mozilla.org/
# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> - https://securityheaders.com/
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> - https://csp-evaluator.withgoogle.com/
```

### Testes de Performance

```bash
# <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Testar performance HTTPS
curl -w "@curl-format.txt" -o /dev/null -s "https://seudominio.com"

# <ion-icon name="repeat-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> curl-format.txt:
# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> time_namelookup:  %{time_namelookup}\n
# <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> time_connect:  %{time_connect}\n
# <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> time_appconnect:  %{time_appconnect}\n
# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> time_pretransfer:  %{time_pretransfer}\n
# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> time_redirect:  %{time_redirect}\n
# <ion-icon name="play-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> time_starttransfer:  %{time_starttransfer}\n
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> ----------\n
# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> time_total:  %{time_total}\n
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Checklist de Produção

### SSL/HTTPS

- [ ] Certificado SSL válido instalado
- [ ] Redirecionamento HTTP → HTTPS configurado
- [ ] Configurações SSL seguras aplicadas
- [ ] Renovação automática configurada
- [ ] Certificado testado e validado

### Nginx

- [ ] Nginx instalado e configurado
- [ ] Proxy reverso funcionando
- [ ] WebSocket support configurado
- [ ] Rate limiting aplicado
- [ ] Logs configurados

### Segurança

- [ ] Security headers configurados
- [ ] Content Security Policy aplicado
- [ ] Firewall configurado
- [ ] Acesso restrito por IP (se necessário)
- [ ] Monitoramento de certificados ativo

### Monitoramento

- [ ] Scripts de renovação testados
- [ ] Alertas configurados
- [ ] Logs sendo coletados
- [ ] Performance monitorada
- [ ] Backup de configurações

---

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

Agora que você configurou SSL/HTTPS:

1. **[Segurança](../seguranca/autenticacao)** - Configure autenticação avançada
2. **[Load Balancing](../escalonamento/load-balancing)** - Configure balanceamento de carga
3. **[Performance](../escalonamento/performance)** - Otimize performance
4. **[Backup e Recovery](../seguranca/backup-recovery)** - Implemente estratégias de backup

---

:::tip **Dica Pro**
Use Let's Encrypt para certificados gratuitos e automáticos. Configure renovação automática para evitar interrupções.
:::

:::warning **Importante**
Sempre teste a renovação de certificados em ambiente de desenvolvimento antes de aplicar em produção. Certificados expirados causam interrupção total do serviço.
:::
