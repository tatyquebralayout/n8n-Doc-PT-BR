---
sidebar_position: 4
title: Self-hosted (Auto-hospedado)
description: Guia completo para instalação self-hosted do n8n com Docker e configurações avançadas
slug: /tutorial-basico/instalacao-self-hosted
keywords: [n8n, self-hosted, docker, instalação, produção]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="server-outline" size={32} color="#10b981" /> Self-hosted (Auto-hospedado)

O **n8n self-hosted** oferece controle total sobre sua infraestrutura, permitindo personalização completa e integração com ambientes corporativos.

## <IonicIcon name="checkmark-circle-outline" size={24} color="#10b981" /> O que é Self-hosted?

Self-hosted significa que você instala e gerencia o n8n em sua própria infraestrutura – seja um servidor local, VPS, cloud ou Kubernetes.

### **Principais Vantagens:**

- 🔒 **Controle total** - Sua infraestrutura, suas regras
- 🏢 **Integração corporativa** - VPNs, LDAP, redes privadas
- 📊 **Compliance** - Dados nunca saem da sua rede
- 🔧 **Personalização** - Plugins customizados e extensões
- 💰 **Custo controlado** - Sem cobrança por execução

---

## <IonicIcon name="options-outline" size={24} color="#10b981" /> Métodos de Instalação

### <IonicIcon name="logo-docker" size={20} color="#10b981" /> Docker (Recomendado)

A forma mais rápida e confiável para produção:

```bash
# Execução básica
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n

# Com variáveis de ambiente
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  -e N8N_PROTOCOL=https \
  -e N8N_HOST=seu-dominio.com \
  -e GENERIC_TIMEZONE=America/Sao_Paulo \
  n8nio/n8n
```

### <IonicIcon name="logo-npm" size={20} color="#10b981" /> NPM (Node.js)

Para instalação direta via npm:

```bash
# Instalar globalmente
npm install n8n -g

# Executar com configurações
N8N_PROTOCOL=https \
N8N_HOST=seu-dominio.com \
GENERIC_TIMEZONE=America/Sao_Paulo \
n8n start
```

### <IonicIcon name="construct-outline" size={20} color="#10b981" /> Docker Compose (Produção)

Configuração completa com banco de dados:

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_PROTOCOL=https
      - N8N_HOST=seu-dominio.com
      - GENERIC_TIMEZONE=America/Sao_Paulo
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=senha_segura
      - REDIS_URL=redis://redis:6379
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:13
    restart: unless-stopped
    environment:
      - POSTGRES_DB=n8n
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=senha_segura
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    volumes:
      - redis_data:/data

volumes:
  n8n_data:
  postgres_data:
  redis_data:
```

---

## <IonicIcon name="settings-outline" size={24} color="#10b981" /> Configuração Avançada

### **Variáveis de Ambiente Essenciais**

```bash
# Configurações básicas
N8N_PORT=5678
N8N_PROTOCOL=https
N8N_HOST=seu-dominio.com
GENERIC_TIMEZONE=America/Sao_Paulo

# Banco de dados PostgreSQL
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=localhost
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=senha_segura

# Redis para filas
REDIS_URL=redis://localhost:6379

# Segurança
N8N_ENCRYPTION_KEY=sua_chave_32_caracteres
WEBHOOK_URL=https://seu-dominio.com/

# Execuções
EXECUTIONS_PROCESS=main
EXECUTIONS_MODE=regular
```

### **Configuração de SSL/HTTPS**

#### **Com Nginx (Recomendado)**

```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seu-dominio.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### **Com Certbot (Let's Encrypt)**

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Gerar certificado
sudo certbot --nginx -d seu-dominio.com

# Renovação automática
sudo crontab -e
# Adicionar: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## <IonicIcon name="trending-up-outline" size={24} color="#10b981" /> Escalabilidade

### **Configuração de Filas**

Para alta performance, configure Redis:

```bash
# Instalar Redis
sudo apt install redis-server

# Configurar n8n para usar Redis
REDIS_URL=redis://localhost:6379
EXECUTIONS_PROCESS=main
EXECUTIONS_MODE=regular
```

### **Load Balancing**

Com múltiplas instâncias:

```nginx
upstream n8n_backend {
    server 127.0.0.1:5678;
    server 127.0.0.1:5679;
    server 127.0.0.1:5680;
}

server {
    listen 443 ssl;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://n8n_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### **Kubernetes Deployment**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: n8n
spec:
  replicas: 3
  selector:
    matchLabels:
      app: n8n
  template:
    metadata:
      labels:
        app: n8n
    spec:
      containers:
      - name: n8n
        image: n8nio/n8n
        ports:
        - containerPort: 5678
        env:
        - name: N8N_PROTOCOL
          value: "https"
        - name: N8N_HOST
          value: "seu-dominio.com"
        - name: DB_TYPE
          value: "postgresdb"
        - name: DB_POSTGRESDB_HOST
          value: "postgres-service"
```

---

## <IonicIcon name="shield-checkmark-outline" size={24} color="#10b981" /> Segurança

### **Autenticação**

#### **Basic Auth**
```bash
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=senha_segura
```

#### **OAuth2**
```bash
N8N_OAUTH2_ACTIVE=true
N8N_OAUTH2_CLIENT_ID=seu_client_id
N8N_OAUTH2_CLIENT_SECRET=seu_client_secret
N8N_OAUTH2_AUTHORIZATION_URL=https://auth.provider.com/oauth/authorize
N8N_OAUTH2_TOKEN_URL=https://auth.provider.com/oauth/token
```

### **Firewall e Rede**

```bash
# Permitir apenas HTTPS
sudo ufw allow 443/tcp
sudo ufw allow 80/tcp
sudo ufw deny 5678/tcp

# Restringir acesso por IP
sudo ufw allow from 192.168.1.0/24 to any port 5678
```

---

## <IonicIcon name="backup-outline" size={24} color="#10b981" /> Backup e Recuperação

### **Backup Automático**

```bash
#!/bin/bash
# backup-n8n.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/n8n"
N8N_DATA="/home/node/.n8n"

# Criar backup dos dados
tar -czf $BACKUP_DIR/n8n_data_$DATE.tar.gz $N8N_DATA

# Backup do banco PostgreSQL
pg_dump -h localhost -U n8n n8n > $BACKUP_DIR/n8n_db_$DATE.sql

# Manter apenas últimos 7 backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
```

### **Cron Job para Backup**

```bash
# Adicionar ao crontab
0 2 * * * /path/to/backup-n8n.sh
```

---

## <IonicIcon name="analytics-outline" size={24} color="#10b981" /> Monitoramento

### **Logs**

```bash
# Logs detalhados
N8N_LOG_LEVEL=debug n8n start

# Com Docker
docker logs -f n8n_container

# Rotação de logs
logrotate /etc/logrotate.d/n8n
```

### **Health Checks**

```bash
#!/bin/bash
# health-check.sh

URL="https://seu-dominio.com/healthz"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $URL)

if [ $RESPONSE -ne 200 ]; then
    echo "n8n não está respondendo: $RESPONSE"
    # Reiniciar serviço
    docker restart n8n_container
fi
```

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#10b981" /> Próximos Passos

Agora que você tem o n8n self-hosted configurado:

1. **[Configurar Integrações](../integracoes/index)** - Conecte suas aplicações
2. **[Criar Primeiro Workflow](./primeiro-workflow)** - Aprenda a construir workflows
3. **[Conceitos Básicos](./conceitos-basicos)** - Entenda os fundamentos

### **Outros Métodos de Instalação**

- **[n8n Cloud](./instalacao-cloud)** - Serviço hospedado oficial
- **[Instalação Local via npm](./instalacao-npm)** - Para desenvolvimento

---

:::tip **Dica Pro**
Para produção, sempre use **Docker** com **PostgreSQL** e **Redis**. Isso garante consistência, escalabilidade e facilidade de backup.
:::

:::warning **Importante**
Mantenha sempre backups regulares dos dados e do banco de dados. Em caso de falha, você pode restaurar rapidamente.
::: 