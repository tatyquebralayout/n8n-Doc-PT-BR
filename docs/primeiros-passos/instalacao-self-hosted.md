---
sidebar_position: 4
title: Self-hosted (Auto-hospedado)
description: Guia completo para instalação self-hosted do n8n com Docker e configurações avançadas
slug: /primeiros-passos/instalacao-self-hosted
keywords: [n8n, self-hosted, docker, instalação, produção]
---


# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Self-hosted (Auto-hospedado)

O **n8n self-hosted** oferece controle total sobre sua infraestrutura, permitindo personalização completa e integração com ambientes corporativos.

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que é Self-hosted?

Self-hosted significa que você instala e gerencia o n8n em sua própria infraestrutura – seja um servidor local, VPS, cloud ou Kubernetes.

### **Principais Vantagens:**

- **Controle total** - Sua infraestrutura, suas regras
- **Integração corporativa** - VPNs, LDAP, redes privadas
- **Compliance** - Dados nunca saem da sua rede
- **Personalização** - Plugins customizados e extensões
- **Custo controlado** - Sem cobrança por execução

---

## <ion-icon name="swap-horizontal-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Migração para o Cloud

:::info **Migração Sem Interrupção**
<ion-icon name="information-circle-outline" style={{ fontSize: '16px', color: '#3b82f6' }}></ion-icon> Já tem uma instância self-hosted? O n8n oferece ferramentas para migrar workflows e dados para o Cloud sem interrupção dos seus processos.

**Benefícios da migração:**
- **Zero downtime** - Migração sem parar workflows
- **Backup automático** - Seus dados ficam seguros
- **Suporte gerenciado** - Infraestrutura cuidada pelo n8n
- **Escalabilidade automática** - Recursos ajustados conforme necessidade
:::

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Métodos de Instalação

### Docker (Recomendado)

A forma mais rápida e confiável para produção:

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Execução básica
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Com variáveis de ambiente
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  -e N8N_PROTOCOL=https \
  -e N8N_HOST=seu-dominio.com \
  -e GENERIC_TIMEZONE=America/Sao_Paulo \
  n8nio/n8n
```

### NPM (Node.js)

Para instalação direta via npm:

```bash
# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Instalar globalmente
npm install n8n -g

# <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Executar com configurações
N8N_PROTOCOL=https \
N8N_HOST=seu-dominio.com \
GENERIC_TIMEZONE=America/Sao_Paulo \
n8n start
```

### Docker Compose (Produção)

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

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração Avançada

### **Variáveis de Ambiente Essenciais**

```bash
# <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurações básicas
N8N_PORT=5678
N8N_PROTOCOL=https
N8N_HOST=seu-dominio.com
GENERIC_TIMEZONE=America/Sao_Paulo

# <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Banco de dados PostgreSQL
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=localhost
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=senha_segura

# <ion-icon name="server-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Redis para filas
REDIS_URL=redis://localhost:6379

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Segurança
N8N_ENCRYPTION_KEY=sua_chave_32_caracteres
WEBHOOK_URL=https://seu-dominio.com/

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Execuções
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

#### **Com Certbot (Lets Encrypt)**

```bash
# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Gerar certificado
sudo certbot --nginx -d seu-dominio.com

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Renovação automática
sudo crontab -e
# <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Adicionar: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Escalabilidade

### **Configuração de Filas**

Para alta performance, configure Redis:

```bash
# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Instalar Redis
sudo apt install redis-server

# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurar n8n para usar Redis
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

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Segurança

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
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Permitir apenas HTTPS
sudo ufw allow 443/tcp
sudo ufw allow 80/tcp
sudo ufw deny 5678/tcp

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Restringir acesso por IP
sudo ufw allow from 192.168.1.0/24 to any port 5678
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Backup e Recuperação

### **Backup Automático**

```bash
#!/bin/bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> backup-n8n.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/n8n"
N8N_DATA="/home/node/.n8n"

# <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Criar backup dos dados
tar -czf $BACKUP_DIR/n8n_data_$DATE.tar.gz $N8N_DATA

# <ion-icon name="server-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Backup do banco PostgreSQL
pg_dump -h localhost -U n8n n8n > $BACKUP_DIR/n8n_db_$DATE.sql

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Manter apenas últimos 7 backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
```

### **Cron Job para Backup**

```bash
# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Adicionar ao crontab
0 2 * * * /path/to/backup-n8n.sh
```

---

## <ion-icon name="eye-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Monitoramento

### **Logs**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Logs detalhados
N8N_LOG_LEVEL=debug n8n start

# <ion-icon name="cloud-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Com Docker
docker logs -f n8n_container

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Rotação de logs
logrotate /etc/logrotate.d/n8n
```

### **Health Checks**

```bash
#!/bin/bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> health-check.sh

URL="https://seu-dominio.com/healthz"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $URL)

if [ $RESPONSE -ne 200 ]; then
    echo "n8n não está respondendo: $RESPONSE"
    # Reiniciar serviço
    docker restart n8n_container
fi
```

---

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

Agora que você tem o n8n self-hosted configurado:

1. **[Configurar Integrações](../integracoes/)** - Conecte suas aplicações
2. **[Criar Primeiro Workflow](./primeiro-workflow)** - Aprenda a construir workflows
3. **[Conceitos Básicos](./conceitos-basicos)** - Entenda os fundamentos

### **Outros Métodos de Instalação**

- **[n8n Cloud](./instalacao-cloud)** - Serviço hospedado oficial

---

:::tip **Dica Pro**
Para produção, sempre use **Docker** com **PostgreSQL** e **Redis**. Isso garante consistência, escalabilidade e facilidade de backup.
:::

:::warning **Importante**
Mantenha sempre backups regulares dos dados e do banco de dados. Em caso de falha, você pode restaurar rapidamente.
:::
