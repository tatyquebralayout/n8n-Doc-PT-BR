---
sidebar_position: 1
title: Variáveis de Ambiente
description: Como configurar variáveis de ambiente para n8n em diferentes ambientes
keywords: [n8n, environment variables, variáveis ambiente, configuração, deployment]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="settings-outline" size={32} color="#ea4b71" /> Variáveis de Ambiente

Este documento explica como **configurar variáveis de ambiente** para n8n em diferentes contextos de deployment, abordando variáveis essenciais de produção, configuração de segurança, otimização de performance, separação entre ambientes (dev/staging/prod), e gerenciamento seguro de credenciais através de environment variables que facilitam deployment automatizado e configuração flexível sem hardcoding.

## <IonicIcon name="school-outline" size={24} color="#ea4b71" /> O que você vai aprender

- <IonicIcon name="settings-outline" size={16} color="#6b7280" /> Variáveis essenciais para produção
- <IonicIcon name="shield-checkmark-outline" size={16} color="#6b7280" /> Configurações de segurança
- <IonicIcon name="rocket-outline" size={16} color="#6b7280" /> Otimização de performance
- <IonicIcon name="folder-outline" size={16} color="#6b7280" /> Separação de ambientes
- <IonicIcon name="key-outline" size={16} color="#6b7280" /> Gerenciamento de credenciais

---

## <IonicIcon name="flash-outline" size={24} color="#ea4b71" /> Configuração Básica

### <IonicIcon name="globe-outline" size={20} color="#10b981" /> Variáveis Essenciais

```bash
# Configurações básicas
N8N_PORT=5678
N8N_PROTOCOL=https
N8N_HOST=seu-dominio.com
GENERIC_TIMEZONE=America/Sao_Paulo

# URL para webhooks (importante!)
WEBHOOK_URL=https://seu-dominio.com/

# Fuso horário brasileiro
GENERIC_TIMEZONE=America/Sao_Paulo
```

### <IonicIcon name="server-outline" size={20} color="#10b981" /> Banco de Dados

```bash
# PostgreSQL (Recomendado)
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=localhost
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=senha_segura

# MySQL (Alternativa)
DB_TYPE=mysqldb
DB_MYSQLDB_HOST=localhost
DB_MYSQLDB_PORT=3306
DB_MYSQLDB_DATABASE=n8n
DB_MYSQLDB_USER=n8n
DB_MYSQLDB_PASSWORD=senha_segura
```

### <IonicIcon name="key-outline" size={20} color="#10b981" /> Segurança

```bash
# Chave de criptografia (32 caracteres)
N8N_ENCRYPTION_KEY=sua_chave_32_caracteres_aqui

# Autenticação básica
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=senha_segura

# Desabilitar gerenciamento de usuários (se usar auth externa)
N8N_USER_MANAGEMENT_DISABLED=false
```

---

## <IonicIcon name="shield-checkmark-outline" size={24} color="#ea4b71" /> Configurações de Segurança

### <IonicIcon name="lock-closed-outline" size={20} color="#10b981" /> Autenticação

#### **Basic Auth**
```bash
# Ativar autenticação básica
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=senha_segura

# Para múltiplos usuários (separar por vírgula)
N8N_BASIC_AUTH_USER=admin,usuario1,usuario2
N8N_BASIC_AUTH_PASSWORD=senha1,senha2,senha3
```

#### **OAuth2**
```bash
# Configurar OAuth2
N8N_OAUTH2_ACTIVE=true
N8N_OAUTH2_CLIENT_ID=seu_client_id
N8N_OAUTH2_CLIENT_SECRET=seu_client_secret
N8N_OAUTH2_AUTHORIZATION_URL=https://auth.provider.com/oauth/authorize
N8N_OAUTH2_TOKEN_URL=https://auth.provider.com/oauth/token
```

### <IonicIcon name="shield-outline" size={20} color="#10b981" /> Criptografia

```bash
# Chave de criptografia obrigatória
N8N_ENCRYPTION_KEY=sua_chave_32_caracteres_aqui

# Gerar chave segura
openssl rand -hex 16
# ou
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### <IonicIcon name="eye-off-outline" size={20} color="#10b981" /> Privacidade de Dados

```bash
# Configurações LGPD
EXECUTIONS_DATA_SAVE_ON_ERROR=none
EXECUTIONS_DATA_SAVE_ON_SUCCESS=none
EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false

# Limpeza automática de dados
EXECUTIONS_DATA_PRUNE=true
EXECUTIONS_DATA_MAX_AGE=168  # 7 dias em horas
EXECUTIONS_DATA_PRUNE_TIMEOUT=3600  # 1 hora
```

---

## <IonicIcon name="rocket-outline" size={24} color="#ea4b71" /> Performance e Escalabilidade

### <IonicIcon name="trending-up-outline" size={20} color="#10b981" /> Redis para Filas

```bash
# Configurar Redis para processamento distribuído
REDIS_URL=redis://localhost:6379

# Configurações de execução
EXECUTIONS_PROCESS=main
EXECUTIONS_MODE=regular

# Para alta performance
EXECUTIONS_TIMEOUT=300000  # 5 minutos
EXECUTIONS_TIMEOUT_MAX=3600000  # 1 hora
```

### <IonicIcon name="hardware-chip-outline" size={20} color="#10b981" /> Recursos do Sistema

```bash
# Limites de memória
NODE_OPTIONS="--max-old-space-size=4096"

# Timeouts de conexão
N8N_TIMEOUT=30000  # 30 segundos
N8N_TIMEOUT_MAX=300000  # 5 minutos
```

### <IonicIcon name="analytics-outline" size={20} color="#10b981" /> Logs e Monitoramento

```bash
# Nível de logs
N8N_LOG_LEVEL=info  # debug, info, warn, error

# Logs estruturados
N8N_LOG_FORMAT=json

# Métricas de performance
N8N_METRICS=true
```

---

## <IonicIcon name="folder-outline" size={24} color="#ea4b71" /> Separação de Ambientes

### <IonicIcon name="code-outline" size={20} color="#10b981" /> Desenvolvimento

```bash
# .env.development
N8N_PORT=5678
N8N_PROTOCOL=http
N8N_HOST=localhost
GENERIC_TIMEZONE=America/Sao_Paulo

# Banco SQLite para desenvolvimento
DB_TYPE=sqlite
DB_SQLITE_DATABASE=/home/node/.n8n/database.sqlite

# Logs detalhados
N8N_LOG_LEVEL=debug
N8N_LOG_FORMAT=simple

# Sem autenticação para desenvolvimento
N8N_BASIC_AUTH_ACTIVE=false
```

### <IonicIcon name="construct-outline" size={20} color="#10b981" /> Staging

```bash
# .env.staging
N8N_PORT=5678
N8N_PROTOCOL=https
N8N_HOST=staging.seudominio.com
GENERIC_TIMEZONE=America/Sao_Paulo

# PostgreSQL staging
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=staging-db.seudominio.com
DB_POSTGRESDB_DATABASE=n8n_staging
DB_POSTGRESDB_USER=n8n_staging
DB_POSTGRESDB_PASSWORD=senha_staging

# Autenticação básica
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=staging_user
N8N_BASIC_AUTH_PASSWORD=senha_staging

# Logs moderados
N8N_LOG_LEVEL=info
```

### <IonicIcon name="server-outline" size={20} color="#10b981" /> Produção

```bash
# .env.production
N8N_PORT=5678
N8N_PROTOCOL=https
N8N_HOST=seudominio.com
GENERIC_TIMEZONE=America/Sao_Paulo

# PostgreSQL produção
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=prod-db.seudominio.com
DB_POSTGRESDB_DATABASE=n8n_production
DB_POSTGRESDB_USER=n8n_production
DB_POSTGRESDB_PASSWORD=senha_producao_segura

# Redis para filas
REDIS_URL=redis://redis.seudominio.com:6379

# Segurança máxima
N8N_ENCRYPTION_KEY=chave_32_caracteres_producao
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=senha_producao_segura

# Performance otimizada
EXECUTIONS_PROCESS=main
EXECUTIONS_MODE=regular
EXECUTIONS_TIMEOUT=300000
EXECUTIONS_TIMEOUT_MAX=3600000

# Logs de produção
N8N_LOG_LEVEL=warn
N8N_LOG_FORMAT=json
```

---

## <IonicIcon name="construct-outline" size={24} color="#ea4b71" /> Docker e Containerização

### <IonicIcon name="logo-docker" size={20} color="#10b981" /> Docker Compose

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      # Configurações básicas
      - N8N_PROTOCOL=https
      - N8N_HOST=seudominio.com
      - GENERIC_TIMEZONE=America/Sao_Paulo
      - WEBHOOK_URL=https://seudominio.com/
      
      # Banco de dados
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=${DB_PASSWORD}
      
      # Redis
      - REDIS_URL=redis://redis:6379
      
      # Segurança
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      
      # Performance
      - EXECUTIONS_PROCESS=main
      - EXECUTIONS_MODE=regular
      - EXECUTIONS_TIMEOUT=300000
      
      # Logs
      - N8N_LOG_LEVEL=info
      - N8N_LOG_FORMAT=json
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
      - POSTGRES_PASSWORD=${DB_PASSWORD}
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

### <IonicIcon name="cloud-outline" size={20} color="#10b981" /> Kubernetes

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
        image: n8nio/n8n:latest
        ports:
        - containerPort: 5678
        env:
        - name: N8N_PROTOCOL
          value: "https"
        - name: N8N_HOST
          value: "seudominio.com"
        - name: GENERIC_TIMEZONE
          value: "America/Sao_Paulo"
        - name: DB_TYPE
          value: "postgresdb"
        - name: DB_POSTGRESDB_HOST
          value: "postgres-service"
        - name: DB_POSTGRESDB_DATABASE
          value: "n8n"
        - name: DB_POSTGRESDB_USER
          valueFrom:
            secretKeyRef:
              name: n8n-secrets
              key: db-user
        - name: DB_POSTGRESDB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: n8n-secrets
              key: db-password
        - name: N8N_ENCRYPTION_KEY
          valueFrom:
            secretKeyRef:
              name: n8n-secrets
              key: encryption-key
        - name: REDIS_URL
          value: "redis://redis-service:6379"
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
```

---

## <IonicIcon name="key-outline" size={24} color="#ea4b71" /> Gerenciamento de Credenciais

### <IonicIcon name="lock-closed-outline" size={20} color="#10b981" /> Variáveis Sensíveis

```bash
# Nunca commite estas variáveis no código!
N8N_ENCRYPTION_KEY=sua_chave_32_caracteres_aqui
DB_POSTGRESDB_PASSWORD=senha_super_segura
N8N_BASIC_AUTH_PASSWORD=senha_admin
REDIS_PASSWORD=senha_redis
```

### <IonicIcon name="folder-outline" size={20} color="#10b981" /> Arquivo .env

```bash
# .env (não commitar no git)
N8N_ENCRYPTION_KEY=sua_chave_32_caracteres_aqui
DB_POSTGRESDB_PASSWORD=senha_super_segura
N8N_BASIC_AUTH_PASSWORD=senha_admin
REDIS_PASSWORD=senha_redis
```

### <IonicIcon name="cloud-outline" size={20} color="#10b981" /> Secrets Management

#### **Docker Secrets**
```yaml
# docker-compose.yml
services:
  n8n:
    image: n8nio/n8n:latest
    secrets:
      - n8n_encryption_key
      - db_password
    environment:
      - N8N_ENCRYPTION_KEY_FILE=/run/secrets/n8n_encryption_key
      - DB_POSTGRESDB_PASSWORD_FILE=/run/secrets/db_password

secrets:
  n8n_encryption_key:
    file: ./secrets/n8n_encryption_key.txt
  db_password:
    file: ./secrets/db_password.txt
```

#### **Kubernetes Secrets**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: n8n-secrets
type: Opaque
data:
  encryption-key: <base64-encoded-key>
  db-password: <base64-encoded-password>
  basic-auth-password: <base64-encoded-password>
```

---

## <IonicIcon name="analytics-outline" size={24} color="#ea4b71" /> Monitoramento e Debugging

### <IonicIcon name="document-text-outline" size={20} color="#10b981" /> Logs

```bash
# Níveis de log
N8N_LOG_LEVEL=debug    # Mais detalhado
N8N_LOG_LEVEL=info     # Informações gerais
N8N_LOG_LEVEL=warn     # Apenas avisos
N8N_LOG_LEVEL=error    # Apenas erros

# Formato de logs
N8N_LOG_FORMAT=simple  # Formato simples
N8N_LOG_FORMAT=json    # Formato JSON (recomendado)
```

### <IonicIcon name="speedometer-outline" size={20} color="#10b981" /> Métricas

```bash
# Ativar métricas
N8N_METRICS=true

# Endpoint de métricas
N8N_METRICS_ENDPOINT=/metrics

# Métricas personalizadas
N8N_METRICS_PREFIX=n8n_
```

### <IonicIcon name="notifications-outline" size={20} color="#10b981" /> Health Checks

```bash
# Endpoint de health check
N8N_HEALTH_CHECK_ENDPOINT=/healthz

# Configurações de health check
N8N_HEALTH_CHECK_TIMEOUT=5000
N8N_HEALTH_CHECK_INTERVAL=30000
```

---

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> Checklist de Produção

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> Segurança

- [ ] `N8N_ENCRYPTION_KEY` configurada (32 caracteres)
- [ ] `N8N_BASIC_AUTH_ACTIVE=true` ou OAuth2 configurado
- [ ] `N8N_PROTOCOL=https` em produção
- [ ] Senhas fortes para banco de dados
- [ ] Firewall configurado
- [ ] SSL/HTTPS configurado

### <IonicIcon name="rocket-outline" size={20} color="#10b981" /> Performance

- [ ] `REDIS_URL` configurado para filas
- [ ] `EXECUTIONS_PROCESS=main` configurado
- [ ] `EXECUTIONS_MODE=regular` configurado
- [ ] Timeouts adequados configurados
- [ ] Recursos do sistema adequados

### <IonicIcon name="folder-outline" size={20} color="#10b981" /> Configuração

- [ ] `GENERIC_TIMEZONE=America/Sao_Paulo`
- [ ] `WEBHOOK_URL` configurado corretamente
- [ ] Banco de dados PostgreSQL configurado
- [ ] Logs configurados para produção
- [ ] Backup configurado

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> Próximos Passos

Agora que você configurou as variáveis de ambiente:

1. **[Configuração de Database](./database)** - Configure banco de dados PostgreSQL
2. **[Configuração de Filas](./queues)** - Configure Redis para processamento escalável
3. **[Configuração SSL/HTTPS](./ssl-https)** - Configure HTTPS seguro
4. **[Segurança](../seguranca/autenticacao)** - Configure autenticação avançada

---

:::tip **Dica Pro**
Sempre use variáveis de ambiente para configurações sensíveis. Nunca hardcode senhas ou chaves no código!
:::

:::warning **Importante**
Em produção, sempre use HTTPS (`N8N_PROTOCOL=https`) e configure uma chave de criptografia forte (`N8N_ENCRYPTION_KEY`).
:::
