---
sidebar_position: 4
title: Configuração SSL/HTTPS
description: Como configurar SSL e HTTPS para n8n seguro em produção
keywords: [n8n, ssl, https, segurança, certificados, nginx]
---


#  Configuração SSL/HTTPS

Este documento ensina como **configurar SSL/HTTPS** para n8n em produção, abordando obtenção de certificados SSL, configuração de reverse proxy com nginx, renovação automática via Let's Encrypt, implementação de security headers, e melhores práticas de segurança que garantem comunicação criptografada e protegem workflows e credenciais contra interceptação e ataques man-in-the-middle.

##  O que você vai aprender

-  Obtenção de certificados SSL
-  Configuração de reverse proxy
-  Renovação automática
-  Security headers
-  Melhores práticas

---

##  Por que HTTPS é Essencial?

###  Benefícios do HTTPS

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

###  Quando Usar HTTPS

**Sempre use HTTPS em:**
- **Produção** - Qualquer ambiente público
- **Webhooks** - Para receber dados externos
- **APIs** - Para integrações seguras
- **Credenciais** - Para proteger dados sensíveis
- **Compliance** - Para atender regulamentações

---

##  Obtenção de Certificados

###  Let's Encrypt (Gratuito)

#### **Instalação do Certbot**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install certbot python3-certbot-nginx

# CentOS/RHEL
sudo yum install certbot python3-certbot-nginx

# Verificar instalação
certbot --version
```

#### **Gerar Certificado**
```bash
# Gerar certificado para domínio
sudo certbot --nginx -d seudominio.com

# Gerar certificado para múltiplos domínios
sudo certbot --nginx -d seudominio.com -d www.seudominio.com

# Gerar certificado wildcard (requer DNS challenge)
sudo certbot certonly --manual --preferred-challenges=dns -d *.seudominio.com
```

#### **Renovação Automática**
```bash
# Testar renovação
sudo certbot renew --dry-run

# Adicionar ao crontab para renovação automática
sudo crontab -e

# Adicionar linha:
0 12 * * * /usr/bin/certbot renew --quiet
```

###  Certificados Comerciais

#### **Comprar Certificado**
```bash
# Comprar de provedores como:
# - DigiCert
# - GlobalSign
# - Comodo
# - Sectigo

# Após compra, você receberá:
# - certificate.crt (certificado público)
# - private.key (chave privada)
# - ca_bundle.crt (cadeia de certificados)
```

#### **Instalar Certificado Comercial**
```bash
# Criar diretório para certificados
sudo mkdir -p /etc/ssl/certs/n8n
sudo mkdir -p /etc/ssl/private/n8n

# Copiar certificados
sudo cp certificate.crt /etc/ssl/certs/n8n/
sudo cp private.key /etc/ssl/private/n8n/
sudo cp ca_bundle.crt /etc/ssl/certs/n8n/

# Configurar permissões
sudo chmod 644 /etc/ssl/certs/n8n/certificate.crt
sudo chmod 644 /etc/ssl/certs/n8n/ca_bundle.crt
sudo chmod 600 /etc/ssl/private/n8n/private.key
```

---

##  Configuração Nginx

###  Instalação e Configuração Básica

#### **Instalar Nginx**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx

# Iniciar e habilitar
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### **Configuração Básica**
```nginx
# /etc/nginx/sites-available/n8n

# Redirecionar HTTP para HTTPS
server {
    listen 80;
    server_name seudominio.com www.seudominio.com;
    return 301 https://$server_name$request_uri;
}

# Configuração HTTPS
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

###  Configuração Avançada

#### **Otimizações de Performance**
```nginx
# /etc/nginx/nginx.conf

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
# /etc/nginx/sites-available/n8n

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

##  Docker e Containerização

###  Docker Compose com Nginx

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

###  Nginx Configuration para Docker

```nginx
# nginx.conf

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

##  Security Headers

###  Headers Essenciais

```nginx
# Security Headers para n8n

# Força HTTPS
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

# Previne clickjacking
add_header X-Frame-Options DENY always;

# Previne MIME type sniffing
add_header X-Content-Type-Options nosniff always;

# Proteção XSS
add_header X-XSS-Protection "1; mode=block" always;

# Política de referrer
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Content Security Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';" always;

# Permissions Policy
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

###  Configuração Completa

```nginx
# Configuração completa de segurança

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

##  Renovação Automática

###  Script de Renovação

```bash
#!/bin/bash
# renew-ssl.sh

# Renovar certificados Let's Encrypt
certbot renew --quiet

# Recarregar Nginx se certificados foram renovados
if [ $? -eq 0 ]; then
    echo "Certificados renovados com sucesso"
    systemctl reload nginx
else
    echo "Erro na renovação dos certificados"
    exit 1
fi
```

###  Cron Job

```bash
# Adicionar ao crontab
sudo crontab -e

# Renovar certificados duas vezes por dia
0 6,18 * * * /path/to/renew-ssl.sh

# Verificar certificados semanalmente
0 12 * * 0 /usr/bin/certbot renew --dry-run
```

###  Monitoramento

```bash
#!/bin/bash
# check-ssl.sh

DOMAIN="seudominio.com"
DAYS_THRESHOLD=30

# Verificar expiração do certificado
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

##  Testes e Validação

###  Testes de SSL

#### **Verificar Certificado**
```bash
# Verificar certificado
openssl s_client -connect seudominio.com:443 -servername seudominio.com

# Verificar cadeia de certificados
openssl s_client -connect seudominio.com:443 -servername seudominio.com -showcerts

# Verificar configuração SSL
nmap --script ssl-enum-ciphers -p 443 seudominio.com
```

#### **Testes Online**
```bash
# Ferramentas online para testar SSL:
# - https://www.ssllabs.com/ssltest/
# - https://observatory.mozilla.org/
# - https://securityheaders.com/
# - https://csp-evaluator.withgoogle.com/
```

###  Testes de Performance

```bash
# Testar performance HTTPS
curl -w "@curl-format.txt" -o /dev/null -s "https://seudominio.com"

# curl-format.txt:
#      time_namelookup:  %{time_namelookup}\n
#         time_connect:  %{time_connect}\n
#      time_appconnect:  %{time_appconnect}\n
#     time_pretransfer:  %{time_pretransfer}\n
#        time_redirect:  %{time_redirect}\n
#   time_starttransfer:  %{time_starttransfer}\n
#                      ----------\n
#           time_total:  %{time_total}\n
```

---

##  Checklist de Produção

###  SSL/HTTPS

- [ ] Certificado SSL válido instalado
- [ ] Redirecionamento HTTP → HTTPS configurado
- [ ] Configurações SSL seguras aplicadas
- [ ] Renovação automática configurada
- [ ] Certificado testado e validado

###  Nginx

- [ ] Nginx instalado e configurado
- [ ] Proxy reverso funcionando
- [ ] WebSocket support configurado
- [ ] Rate limiting aplicado
- [ ] Logs configurados

###  Segurança

- [ ] Security headers configurados
- [ ] Content Security Policy aplicado
- [ ] Firewall configurado
- [ ] Acesso restrito por IP (se necessário)
- [ ] Monitoramento de certificados ativo

###  Monitoramento

- [ ] Scripts de renovação testados
- [ ] Alertas configurados
- [ ] Logs sendo coletados
- [ ] Performance monitorada
- [ ] Backup de configurações

---

##  Próximos Passos

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
