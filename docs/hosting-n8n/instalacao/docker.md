---
sidebar_position: 1
title: Instalação via Docker
description: Guia completo para instalar n8n usando Docker
keywords: [n8n, docker, deployment, containerização, produção]
---


#  Instalação via Docker

Este guia mostrará como instalar e executar o n8n usando Docker, a forma mais robusta e recomendada para ambientes de produção.

##  O que você vai aprender

-  Como configurar n8n com Docker
-  Variáveis de ambiente essenciais
-  Configuração de volumes e persistência
-  Configuração de rede e segurança
-  Monitoramento e logs
-  Backup e recuperação

##  Pré-requisitos

Antes de começar, certifique-se de ter:

-  **Docker** instalado (versão 20.10 ou superior)
-  **Docker Compose** instalado (versão 1.28 ou superior)
-  **Pelo menos 2GB de RAM** disponível
-  **Porta 5678** disponível (ou outra de sua escolha)

---

##  Instalação Rápida

### **Teste Básico (Desenvolvimento)**
```bash
# Executar n8n com Docker
docker run -it --rm \
--name n8n \
-p 5678:5678 \
n8nio/n8n

# Acessar em http://localhost:5678
```

:::warning Atenção
Este comando é apenas para testes rápidos. Para produção, use Docker Compose com volumes persistentes.
:::

### **Instalação com Persistência**
```bash
# Criar volume para persistência
docker volume create n8n_data

# Executar com volume
docker run -it --rm \
--name n8n \
-p 5678:5678 \
-v n8n_data:/home/node/.n8n \
n8nio/n8n
```

---

##  Docker Compose (Recomendado)

### **Configuração Básica**
Crie um arquivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_PROTOCOL=https
      - N8N_HOST=seu-dominio.com
      - GENERIC_TIMEZONE=America/Sao_Paulo
      - WEBHOOK_URL=https://seu-dominio.com/
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

### **Configuração Completa com Banco de Dados**
```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
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
      - N8N_ENCRYPTION_KEY=sua_chave_32_caracteres
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
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
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

volumes:
  n8n_data:
  postgres_data:
  redis_data:
```

### **Executar com Docker Compose**
```bash
# Iniciar serviços
docker-compose up -d

# Ver logs
docker-compose logs -f n8n

# Parar serviços
docker-compose down
```

---

##  Configuração Avançada

### **Variáveis de Ambiente Essenciais**
```bash
# Configurações básicas
N8N_PORT=5678
N8N_PROTOCOL=https
N8N_HOST=seu-dominio.com
GENERIC_TIMEZONE=America/Sao_Paulo

# Banco de dados PostgreSQL
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=postgres
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=senha_segura

# Redis para filas
REDIS_URL=redis://redis:6379

# Segurança
N8N_ENCRYPTION_KEY=sua_chave_32_caracteres
WEBHOOK_URL=https://seu-dominio.com/

# Execuções
EXECUTIONS_PROCESS=main
EXECUTIONS_MODE=regular
```

### **Configuração de SSL/HTTPS com Nginx**
```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    restart: unless-stopped
    environment:
      - N8N_PROTOCOL=https
      - N8N_HOST=seu-dominio.com
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
    depends_on:
      - n8n
    networks:
      - n8n_network

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

### **Configuração Nginx**
```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream n8n_backend {
        server n8n:5678;
    }

    server {
        listen 80;
        server_name seu-dominio.com;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name seu-dominio.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;

        location / {
            proxy_pass http://n8n_backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

---

##  Escalabilidade

### **Configuração de Filas com Redis**
```yaml
services:
  n8n:
    environment:
      - REDIS_URL=redis://redis:6379
      - EXECUTIONS_PROCESS=main
      - EXECUTIONS_MODE=regular
      - EXECUTIONS_TIMEOUT=300000
      - EXECUTIONS_TIMEOUT_MAX=3600000

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
```

### **Load Balancing com Múltiplas Instâncias**
```yaml
version: '3.8'

services:
  n8n-1:
    image: n8nio/n8n:latest
    environment:
      - EXECUTIONS_PROCESS=main
      - REDIS_URL=redis://redis:6379
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
    depends_on:
      - postgres
      - redis

  n8n-2:
    image: n8nio/n8n:latest
    environment:
      - EXECUTIONS_PROCESS=main
      - REDIS_URL=redis://redis:6379
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
    depends_on:
      - postgres
      - redis

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx-lb.conf:/etc/nginx/nginx.conf
    depends_on:
      - n8n-1
      - n8n-2
```

---

##  Segurança

### **Autenticação Básica**
```yaml
services:
  n8n:
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=senha_segura
```

### **Configuração de Rede**
```yaml
services:
  n8n:
    networks:
      - n8n_internal
    expose:
      - "5678"

  nginx:
    networks:
      - n8n_internal
      - n8n_external
    ports:
      - "443:443"

networks:
  n8n_internal:
    driver: bridge
  n8n_external:
    driver: bridge
```

---

##  Backup e Recuperação

### **Backup Automático**
```bash
#!/bin/bash
# backup-n8n.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/n8n"

# Backup dos volumes Docker
docker run --rm -v n8n_data:/data -v $BACKUP_DIR:/backup alpine tar czf /backup/n8n_data_$DATE.tar.gz -C /data .

# Backup do banco PostgreSQL
docker exec postgres pg_dump -U n8n n8n > $BACKUP_DIR/n8n_db_$DATE.sql

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

##  Monitoramento

### **Logs**
```bash
# Ver logs em tempo real
docker-compose logs -f n8n

# Logs específicos
docker logs n8n_container

# Logs com filtros
docker-compose logs n8n | grep ERROR
```

### **Health Checks**
```bash
#!/bin/bash
# health-check.sh

CONTAINER_NAME="n8n"
HEALTH_URL="http://localhost:5678/healthz"

if ! docker ps | grep -q $CONTAINER_NAME; then
    echo "Container $CONTAINER_NAME não está rodando"
    docker-compose up -d
    exit 1
fi

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ $RESPONSE -ne 200 ]; then
    echo "n8n não está respondendo: $RESPONSE"
    docker-compose restart n8n
fi
```

---

##  Troubleshooting

### **Problemas Comuns**

#### **Container não inicia**
```bash
# Verificar logs
docker-compose logs n8n

# Verificar recursos
docker stats

# Reiniciar container
docker-compose restart n8n
```

#### **Problemas de conectividade**
```bash
# Verificar rede
docker network ls
docker network inspect n8n_network

# Testar conectividade entre containers
docker exec n8n ping postgres
```

#### **Problemas de volume**
```bash
# Verificar volumes
docker volume ls
docker volume inspect n8n_data

# Recriar volume (cuidado: perde dados)
docker-compose down
docker volume rm n8n_data
docker-compose up -d
```

---

##  Próximos Passos

Agora que você tem o n8n rodando com Docker:

1. **[Configuração Avançada](../configuracao/variaveis-ambiente)** - Variáveis de ambiente
2. **[Segurança](../seguranca/autenticacao)** - Configurar autenticação
3. **[Escalonamento](../escalonamento/clustering)** - Preparar para crescimento

### **Outros Métodos de Instalação**
- **[NPM](./npm)** - Instalação via NPM
- **[Cloud](./cloud)** - Deploy em cloud providers
- **[Desktop](./desktop)** - Aplicação desktop

---

:::tip **Dica Pro**
Para produção, sempre use **Docker Compose** com **PostgreSQL** e **Redis**. Isso garante consistência, escalabilidade e facilidade de backup.
:::

:::warning **Importante**
Mantenha sempre backups regulares dos volumes e do banco de dados. Em caso de falha, você pode restaurar rapidamente.
:::

---

** Links úteis:**
-  [Documentação oficial Docker n8n](https://docs.n8n.io/hosting/installation/docker/)
-  [Imagem oficial no Docker Hub](https://hub.docker.com/r/n8nio/n8n)
-  [Repositório n8n no GitHub](https://github.com/n8n-io/n8n)
