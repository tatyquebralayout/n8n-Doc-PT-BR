---
sidebar_position: 1
title: Variáveis de Ambiente
description: Como configurar variáveis de ambiente para n8n em diferentes ambientes
keywords: [n8n, environment variables, variáveis ambiente, configuração, deployment]
---


# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Variáveis de Ambiente

Este documento explica como **configurar variáveis de ambiente** para n8n em diferentes contextos de deployment, abordando variáveis essenciais de produção, configuração de segurança, otimização de performance, separação entre ambientes (dev/staging/prod), e gerenciamento seguro de credenciais através de environment variables que facilitam deployment automatizado e configuração flexível sem hardcoding.

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você vai aprender

-  Variáveis essenciais para produção
-  Configurações de segurança
-  Otimização de performance
-  Separação de ambientes
-  Gerenciamento de credenciais

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração Básica

###  Variáveis Essenciais

```bash
# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurações básicas
N8N_PORT=5678
N8N_PROTOCOL=https
N8N_HOST=seu-dominio.com
GENERIC_TIMEZONE=America/Sao_Paulo

# <ion-icon name="git-network-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> URL para webhooks (importante!)
WEBHOOK_URL=https://seu-dominio.com/

# <ion-icon name="time-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Fuso horário brasileiro
GENERIC_TIMEZONE=America/Sao_Paulo
```

###  Banco de Dados

```bash
# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> PostgreSQL (Recomendado)
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=localhost
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=senha_segura

# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> MySQL (Alternativa)
DB_TYPE=mysqldb
DB_MYSQLDB_HOST=localhost
DB_MYSQLDB_PORT=3306
DB_MYSQLDB_DATABASE=n8n
DB_MYSQLDB_USER=n8n
DB_MYSQLDB_PASSWORD=senha_segura
```

###  Segurança

```bash
# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Chave de criptografia (32 caracteres)
N8N_ENCRYPTION_KEY=sua_chave_32_caracteres_aqui

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Autenticação básica
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=senha_segura

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Desabilitar gerenciamento de usuários (se usar auth externa)
N8N_USER_MANAGEMENT_DISABLED=false
```

---

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurações de Segurança

###  Autenticação

#### **Basic Auth**
```bash
# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Ativar autenticação básica
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=senha_segura

# <ion-icon name="person-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Para múltiplos usuários (separar por vírgula)
N8N_BASIC_AUTH_USER=admin,usuario1,usuario2
N8N_BASIC_AUTH_PASSWORD=senha1,senha2,senha3
```

#### **OAuth2**
```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurar OAuth2
N8N_OAUTH2_ACTIVE=true
N8N_OAUTH2_CLIENT_ID=seu_client_id
N8N_OAUTH2_CLIENT_SECRET=seu_client_secret
N8N_OAUTH2_AUTHORIZATION_URL=https://auth.provider.com/oauth/authorize
N8N_OAUTH2_TOKEN_URL=https://auth.provider.com/oauth/token
```

###  Criptografia

```bash
# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Chave de criptografia obrigatória
N8N_ENCRYPTION_KEY=sua_chave_32_caracteres_aqui

# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Gerar chave segura
openssl rand -hex 16
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> ou
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

###  Privacidade de Dados

```bash
# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurações LGPD
EXECUTIONS_DATA_SAVE_ON_ERROR=none
EXECUTIONS_DATA_SAVE_ON_SUCCESS=none
EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false

# <ion-icon name="analytics-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Limpeza automática de dados
EXECUTIONS_DATA_PRUNE=true
EXECUTIONS_DATA_MAX_AGE=168  # 7 dias em horas
EXECUTIONS_DATA_PRUNE_TIMEOUT=3600  # 1 hora
```

---

## <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Performance e Escalabilidade

###  Redis para Filas

```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurar Redis para processamento distribuído
REDIS_URL=redis://localhost:6379

# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurações de execução
EXECUTIONS_PROCESS=main
EXECUTIONS_MODE=regular

# <ion-icon name="speedometer-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Para alta performance
EXECUTIONS_TIMEOUT=300000  # 5 minutos
EXECUTIONS_TIMEOUT_MAX=3600000  # 1 hora
```

###  Recursos do Sistema

```bash
# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Limites de memória
NODE_OPTIONS="--max-old-space-size=4096"

# <ion-icon name="git-network-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Timeouts de conexão
N8N_TIMEOUT=30000  # 30 segundos
N8N_TIMEOUT_MAX=300000  # 5 minutos
```

###  Logs e Monitoramento

```bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Nível de logs
N8N_LOG_LEVEL=info  # debug, info, warn, error

# <ion-icon name="folder-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Logs estruturados
N8N_LOG_FORMAT=json

# <ion-icon name="analytics-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Métricas de performance
N8N_METRICS=true
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Separação de Ambientes

###  Desenvolvimento

```bash
# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> .env.development
N8N_PORT=5678
N8N_PROTOCOL=http
N8N_HOST=localhost
GENERIC_TIMEZONE=America/Sao_Paulo

# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Banco SQLite para desenvolvimento
DB_TYPE=sqlite
DB_SQLITE_DATABASE=/home/node/.n8n/database.sqlite

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Logs detalhados
N8N_LOG_LEVEL=debug
N8N_LOG_FORMAT=simple

# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Sem autenticação para desenvolvimento
N8N_BASIC_AUTH_ACTIVE=false
```

###  Staging

```bash
# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> .env.staging
N8N_PORT=5678
N8N_PROTOCOL=https
N8N_HOST=staging.seudominio.com
GENERIC_TIMEZONE=America/Sao_Paulo

# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> PostgreSQL staging
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=staging-db.seudominio.com
DB_POSTGRESDB_DATABASE=n8n_staging
DB_POSTGRESDB_USER=n8n_staging
DB_POSTGRESDB_PASSWORD=senha_staging

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Autenticação básica
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=staging_user
N8N_BASIC_AUTH_PASSWORD=senha_staging

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Logs moderados
N8N_LOG_LEVEL=info
```

###  Produção

```bash
# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> .env.production
N8N_PORT=5678
N8N_PROTOCOL=https
N8N_HOST=seudominio.com
GENERIC_TIMEZONE=America/Sao_Paulo

# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> PostgreSQL produção
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=prod-db.seudominio.com
DB_POSTGRESDB_DATABASE=n8n_production
DB_POSTGRESDB_USER=n8n_production
DB_POSTGRESDB_PASSWORD=senha_producao_segura

# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Redis para filas
REDIS_URL=redis://redis.seudominio.com:6379

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Segurança máxima
N8N_ENCRYPTION_KEY=chave_32_caracteres_producao
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=senha_producao_segura

# <ion-icon name="speedometer-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Performance otimizada
EXECUTIONS_PROCESS=main
EXECUTIONS_MODE=regular
EXECUTIONS_TIMEOUT=300000
EXECUTIONS_TIMEOUT_MAX=3600000

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Logs de produção
N8N_LOG_LEVEL=warn
N8N_LOG_FORMAT=json
```

---

## <ion-icon name="cloud-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Docker e Containerização

###  Docker Compose

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

###  Kubernetes

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

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Gerenciamento de Credenciais

###  Variáveis Sensíveis

```bash
# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Nunca commite estas variáveis no código!
N8N_ENCRYPTION_KEY=sua_chave_32_caracteres_aqui
DB_POSTGRESDB_PASSWORD=senha_super_segura
N8N_BASIC_AUTH_PASSWORD=senha_admin
REDIS_PASSWORD=senha_redis
```

###  Arquivo .env

```bash
# <ion-icon name="git-branch-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> .env (não commitar no git)
N8N_ENCRYPTION_KEY=sua_chave_32_caracteres_aqui
DB_POSTGRESDB_PASSWORD=senha_super_segura
N8N_BASIC_AUTH_PASSWORD=senha_admin
REDIS_PASSWORD=senha_redis
```

###  Secrets Management

#### **Docker Secrets**
```yaml
# <ion-icon name="cloud-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> docker-compose.yml
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

## <ion-icon name="bug-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Monitoramento e Debugging

###  Logs

```bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Níveis de log
N8N_LOG_LEVEL=debug    # Mais detalhado
N8N_LOG_LEVEL=info     # Informações gerais
N8N_LOG_LEVEL=warn     # Apenas avisos
N8N_LOG_LEVEL=error    # Apenas erros

# <ion-icon name="repeat-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Formato de logs
N8N_LOG_FORMAT=simple  # Formato simples
N8N_LOG_FORMAT=json    # Formato JSON (recomendado)
```

###  Métricas

```bash
# <ion-icon name="analytics-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Ativar métricas
N8N_METRICS=true

# <ion-icon name="analytics-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Endpoint de métricas
N8N_METRICS_ENDPOINT=/metrics

# <ion-icon name="analytics-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Métricas personalizadas
N8N_METRICS_PREFIX=n8n_
```

###  Health Checks

```bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Endpoint de health check
N8N_HEALTH_CHECK_ENDPOINT=/healthz

# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurações de health check
N8N_HEALTH_CHECK_TIMEOUT=5000
N8N_HEALTH_CHECK_INTERVAL=30000
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Checklist de Produção

###  Segurança

- [ ] `N8N_ENCRYPTION_KEY` configurada (32 caracteres)
- [ ] `N8N_BASIC_AUTH_ACTIVE=true` ou OAuth2 configurado
- [ ] `N8N_PROTOCOL=https` em produção
- [ ] Senhas fortes para banco de dados
- [ ] Firewall configurado
- [ ] SSL/HTTPS configurado

###  Performance

- [ ] `REDIS_URL` configurado para filas
- [ ] `EXECUTIONS_PROCESS=main` configurado
- [ ] `EXECUTIONS_MODE=regular` configurado
- [ ] Timeouts adequados configurados
- [ ] Recursos do sistema adequados

###  Configuração

- [ ] `GENERIC_TIMEZONE=America/Sao_Paulo`
- [ ] `WEBHOOK_URL` configurado corretamente
- [ ] Banco de dados PostgreSQL configurado
- [ ] Logs configurados para produção
- [ ] Backup configurado

---

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

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
