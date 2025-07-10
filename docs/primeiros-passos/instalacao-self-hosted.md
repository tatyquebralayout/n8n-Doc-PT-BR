---
sidebar_position: 4
title: Self-hosted (Auto-hospedado)
description: Guia completo para instalação self-hosted do n8n com Docker, configurações avançadas e segurança
slug: /primeiros-passos/instalacao-self-hosted
keywords: [n8n, self-hosted, docker, instalação, produção, segurança]
---

# <IonicIcon name="document-outline" size={24} color="#ea4b71" /> Self-hosted (Auto-hospedado)

O **n8n self-hosted** oferece controle total sobre sua infraestrutura, permitindo personalização completa e integração com ambientes corporativos.

:::warning **Aviso Importante**
<IonicIcon name="alert-triangle-outline" size={16} color="#f59e0b" /> Self-hosting requer conhecimento técnico em administração de servidores, Docker e configurações de rede. Para usuários iniciantes, recomendamos começar com o [n8n Cloud](./instalacao-cloud).
:::

## <IonicIcon name="chevron-forward-outline" size={24} color="#ea4b71" /> Visão Geral

### **O que é Self-hosted?**

Self-hosted significa que você instala e gerencia o n8n em sua própria infraestrutura – seja um servidor local, VPS, cloud ou Kubernetes.

### **Principais Vantagens**

- **Controle total** - Sua infraestrutura, suas regras
- **Integração corporativa** - VPNs, LDAP, redes privadas
- **Compliance** - Dados nunca saem da sua rede
- **Personalização** - Plugins customizados e extensões
- **Custo controlado** - Sem cobrança por execução

### **Requisitos do Sistema**

- **Node.js**: Versão 20.19 a 24.x (para instalação NPM)
- **Docker**: Versão 20.10+ (recomendado)
- **Memória**: Mínimo 2GB RAM (4GB+ recomendado)
- **Armazenamento**: 10GB+ de espaço livre
- **Rede**: Acesso à internet para downloads

---

## <IonicIcon name="settings-outline" size={24} color="#ea4b71" /> Métodos de Instalação

### **<IonicIcon name="cube-outline" size={20} color="#2496ed" /> Docker (Recomendado para Produção)**

Docker é a forma recomendada para instalar o n8n em produção pelos seguintes motivos:

- **Ambiente isolado**: Cada instância do n8n roda em seu próprio container, evitando conflitos com outras aplicações
- **Facilita migrações**: Você pode mover facilmente entre servidores, clouds ou ambientes de desenvolvimento
- **Evita conflitos de dependências**: Não há interferência com versões de Node.js, Python ou outras bibliotecas do sistema
- **Consistência entre sistemas**: Funciona igualmente em Linux, Windows e macOS
- **Facilidade de backup**: Todo o ambiente pode ser versionado e replicado
- **Escalabilidade**: Fácil de escalar horizontalmente com múltiplas instâncias

#### **Instalação Básica**

1. **Criar volume para persistência de dados:**

```bash
docker volume create n8n_data
```

2. **Executar o container:**

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

3. **Acessar o n8n:**

Abra seu navegador e acesse: `http://localhost:5678`

#### **Configuração Avançada**

Para produção, configure variáveis de ambiente essenciais:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  -e N8N_PROTOCOL=https \
  -e N8N_HOST=seu-dominio.com \
  -e GENERIC_TIMEZONE=America/Sao_Paulo \
  -e N8N_ENCRYPTION_KEY=sua_chave_32_caracteres \
  docker.n8n.io/n8nio/n8n
```

### **Docker Compose (Produção Avançada)**

Para ambientes de produção com banco de dados PostgreSQL e Redis:

#### **Arquivo docker-compose.yml**

<details>
<summary><IonicIcon name="code-outline" size={16} color="#2496ed" /> <strong>Ver configuração completa</strong></summary>

Crie um arquivo `docker-compose.yml` com o seguinte conteúdo:

```yaml
version: '3.8'

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_PROTOCOL=https
      - N8N_HOST=seu-dominio.com
      - GENERIC_TIMEZONE=America/Sao_Paulo
      - N8N_ENCRYPTION_KEY=sua_chave_32_caracteres
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=senha_segura
      - REDIS_URL=redis://redis:6379
      - EXECUTIONS_PROCESS=main
      - EXECUTIONS_MODE=regular
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

</details>

#### **Executar os Serviços**

<details>
<summary><IonicIcon name="play-outline" size={16} color="#2496ed" /> <strong>Ver comandos</strong></summary>

```bash
# Iniciar todos os serviços
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Ver logs do n8n
docker-compose logs -f n8n
```

</details>

---

### **<IonicIcon name="extension-puzzle-outline" size={20} color="#cb3837" /> NPM (Node.js)**

Para instalação direta via npm:

#### **Teste Rápido**

Execute sem instalar para testar o n8n:

```bash
npx n8n
```

#### **Instalação Global**

1. **Instalar o n8n:**

```bash
npm install n8n -g
```

2. **Executar com configurações:**

```bash
N8N_PROTOCOL=https \
N8N_HOST=seu-dominio.com \
GENERIC_TIMEZONE=America/Sao_Paulo \
n8n start
```

:::warning **Requisitos Node.js**
<IonicIcon name="alert-triangle-outline" size={16} color="#f59e0b" /> n8n requer Node.js versão entre 20.19 e 24.x. Verifique sua versão com `node --version`.
:::

---

## <IonicIcon name="settings-outline" size={24} color="#ea4b71" /> Configuração

### **Variáveis de Ambiente**

As variáveis de ambiente permitem personalizar as configurações do n8n quando executado em modo self-hosted. Você pode alterar configurações de servidor, banco de dados, segurança e performance através dessas variáveis. Configure-as antes de iniciar o n8n para evitar reconfigurações desnecessárias.

<details>
<summary><IonicIcon name="settings-outline" size={16} color="#ea4b71" /> <strong>Configurações Básicas</strong></summary>

Configure estas variáveis de ambiente essenciais para o funcionamento do n8n em produção.

```bash
# Configurações do servidor
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

</details>

<details>
<summary><IonicIcon name="shield-checkmark-outline" size={16} color="#ea4b71" /> <strong>Configurações de Segurança</strong></summary>

Configure estas variáveis para autenticação básica e restrições de acesso.

```bash
# Autenticação básica
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=senha_segura

# Restrições de acesso
N8N_BLOCK_ENV_ACCESS_IN_NODE=true
N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES=true
N8N_SECURE_COOKIE=true
N8N_SAMESITE_COOKIE=strict
```

</details>

### **Configuração de SSL/HTTPS**

#### **Com Nginx**

Crie um arquivo de configuração do Nginx:

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
        
        # Configurações de segurança
        proxy_set_header X-Frame-Options DENY;
        proxy_set_header X-Content-Type-Options nosniff;
        proxy_set_header X-XSS-Protection "1; mode=block";
    }
}
```

#### **Com Certbot (Lets Encrypt)**

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Gerar certificado
sudo certbot --nginx -d seu-dominio.com

# Configurar renovação automática
sudo crontab -e
# Adicionar: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## <IonicIcon name="chevron-forward-outline" size={24} color="#ea4b71" /> Escalabilidade

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

Para múltiplas instâncias:

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

### **Kubernetes**

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
        image: docker.n8n.io/n8nio/n8n
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

## <IonicIcon name="shield-checkmark-outline" size={24} color="#ea4b71" /> Segurança

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

### **Firewall**

```bash
# Permitir apenas HTTPS
sudo ufw allow 443/tcp
sudo ufw allow 80/tcp
sudo ufw deny 5678/tcp

# Restringir acesso por IP
sudo ufw allow from 192.168.1.0/24 to any port 5678
```

---

## <IonicIcon name="chevron-forward-outline" size={24} color="#ea4b71" /> Backup e Recuperação

### **Script de Backup Automático**

Crie um arquivo `backup-n8n.sh`:

```bash
#!/bin/bash

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

### **Agendar Backup**

```bash
# Adicionar ao crontab para backup diário às 2h
0 2 * * * /path/to/backup-n8n.sh
```

---

## <IonicIcon name="eye-outline" size={24} color="#ea4b71" /> Monitoramento

### **Logs**

```bash
# Logs detalhados
N8N_LOG_LEVEL=debug n8n start

# Com Docker
docker logs -f n8n_container

# Rotação de logs
logrotate /etc/logrotate.d/n8n
```

### **Health Check**

Crie um script `health-check.sh`:

```bash
#!/bin/bash

URL="https://seu-dominio.com/healthz"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $URL)

if [ $RESPONSE -ne 200 ]; then
    echo "n8n não está respondendo: $RESPONSE"
    docker restart n8n_container
fi
```

---

## <IonicIcon name="refresh-outline" size={24} color="#ea4b71" /> Atualizações

### **Docker**

```bash
# Baixar nova imagem
docker pull docker.n8n.io/n8nio/n8n

# Parar e remover container atual
docker stop n8n_container
docker rm n8n_container

# Iniciar com nova imagem
docker run --name n8n_container [suas_opções] docker.n8n.io/n8nio/n8n
```

### **NPM**

```bash
# Atualizar para última versão
npm update -g n8n

# Instalar versão específica
npm install -g n8n@1.81.0

# Instalar versão next
npm install -g n8n@next
```

### **Reverter Atualização**

```bash
# Instalar versão anterior
npm install -g n8n@1.80.0

# Reverter migração do banco
n8n db:revert
```

---

## <IonicIcon name="help-circle-outline" size={24} color="#ea4b71" /> Troubleshooting

### **Problemas Comuns**

#### **Porta em Uso**

```bash
# Verificar porta
netstat -tulpn | grep 5678

# Matar processo
sudo kill -9 <PID>
```

#### **Permissões**

```bash
# Corrigir permissões
sudo chown -R $USER:$USER ~/.n8n
chmod 755 ~/.n8n
```

#### **Memória**

```bash
# Verificar uso de memória
docker stats n8n_container

# Limitar memória
docker run --memory=2g [outras_opções] docker.n8n.io/n8nio/n8n
```

### **Windows**

Se você está enfrentando problemas no Windows:

1. **Verifique o Node.js**: Certifique-se de ter Node.js versão 20.19+ instalado
2. **Permissões**: Execute o terminal como administrador
3. **Firewall**: Verifique se o Windows Defender não está bloqueando
4. **Antivírus**: Adicione exceções para o diretório do n8n

---

## <IonicIcon name="swap-horizontal-outline" size={24} color="#ea4b71" /> Migração para o Cloud

:::info **Migração Sem Interrupção**
<IonicIcon name="information-circle-outline" size={16} color="#3b82f6" /> Já tem uma instância self-hosted? O n8n oferece ferramentas para migrar workflows e dados para o Cloud sem interrupção dos seus processos.

**Benefícios da migração:**
- **Zero downtime** - Migração sem parar workflows
- **Backup automático** - Seus dados ficam seguros
- **Suporte gerenciado** - Infraestrutura cuidada pelo n8n
- **Escalabilidade automática** - Recursos ajustados conforme necessidade
:::

---

## <IonicIcon name="arrow-forward-circle-outline" size={24} color="#ea4b71" /> Próximos Passos

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

:::info **Suporte**
Para problemas específicos, consulte a [documentação oficial](https://docs.n8n.io/hosting/) ou participe da [comunidade n8n](https://community.n8n.io/).
:::
