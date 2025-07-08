---
sidebar_position: 3
title: Configuração de Filas
description: Como configurar sistema de filas para processamento escalável no n8n
keywords: [n8n, queues, filas, redis, bull, processamento, escalabilidade]
---


# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração de Filas

Este documento detalha como **configurar sistema de filas** para processamento escalável no n8n, incluindo setup do Redis, configuração de workers, gerenciamento de jobs, tratamento de falhas, monitoramento de performance, e estratégias de distribuição de carga que permitem processar grandes volumes de workflows simultaneamente sem degradar a performance do sistema principal.

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você vai aprender

-  Configuração do Redis para filas
-  Setup de workers distribuídos
-  Gerenciamento de jobs e falhas
-  Monitoramento de performance
-  Estratégias de escalabilidade

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Por que usar Filas?

###  Benefícios das Filas

**Sem Filas (Processamento Síncrono):**
- ❌ **Bloqueio** - Um workflow trava todos os outros
- ❌ **Timeout** - Execuções longas causam timeouts
- ❌ **Recursos limitados** - Apenas uma execução por vez
- ❌ **Sem escalabilidade** - Não pode distribuir carga

**Com Filas (Processamento Assíncrono):**
- ✅ **Paralelismo** - Múltiplas execuções simultâneas
- ✅ **Resiliência** - Falhas não afetam outras execuções
- ✅ **Escalabilidade** - Adicione workers conforme necessário
- ✅ **Performance** - Melhor utilização de recursos
- ✅ **Monitoramento** - Visibilidade completa do processamento

###  Quando Usar Filas

**Use filas quando:**
- Processa **muitos workflows** simultaneamente
- Tem **execuções longas** (>30 segundos)
- Precisa de **alta disponibilidade**
- Quer **distribuir carga** entre servidores
- Precisa de **retry automático** em falhas

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração Redis

###  Instalação Rápida

#### **Ubuntu/Debian**
```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalar Redis
sudo apt update
sudo apt install redis-server

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Iniciar serviço
sudo systemctl start redis-server
sudo systemctl enable redis-server

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar status
sudo systemctl status redis-server
redis-cli ping
```

#### **CentOS/RHEL**
```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalar Redis
sudo yum install redis

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Iniciar serviço
sudo systemctl start redis
sudo systemctl enable redis

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar status
sudo systemctl status redis
redis-cli ping
```

#### **Docker**
```bash
# <ion-icon name="cloud-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Executar Redis com Docker
docker run -d \
  --name redis-n8n \
  -p 6379:6379 \
  -v redis_data:/data \
  redis:7-alpine redis-server --appendonly yes
```

###  Configuração Avançada

#### **redis.conf - Otimizações**
```bash
# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> /etc/redis/redis.conf

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Memória
maxmemory 512mb
maxmemory-policy allkeys-lru

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Persistência
save 900 1
save 300 10
save 60 10000
appendonly yes
appendfsync everysec

# <ion-icon name="speedometer-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Performance
tcp-keepalive 300
timeout 0
tcp-backlog 511

# <ion-icon name="document-text-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Logs
loglevel notice
logfile /var/log/redis/redis-server.log

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Segurança
requirepass senha_redis_segura
bind 127.0.0.1
```

#### **Configuração de Segurança**
```bash
# <ion-icon name="person-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Criar usuário dedicado
sudo adduser --system --group --no-create-home redis

# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurar permissões
sudo chown redis:redis /var/lib/redis
sudo chmod 750 /var/lib/redis

# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurar firewall
sudo ufw allow from 192.168.1.0/24 to any port 6379
```

###  Variáveis de Ambiente

```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração básica Redis
REDIS_URL=redis://localhost:6379

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Com autenticação
REDIS_URL=redis://:senha_redis@localhost:6379

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Com SSL/TLS
REDIS_URL=rediss://:senha_redis@localhost:6380

# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurações avançadas
REDIS_PREFIX=n8n
REDIS_DB=0
REDIS_TIMEOUT=30000
```

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração n8n

###  Variáveis de Ambiente

```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração de filas
REDIS_URL=redis://localhost:6379

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Modo de execução
EXECUTIONS_PROCESS=main
EXECUTIONS_MODE=regular

# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurações de workers
EXECUTIONS_TIMEOUT=300000  # 5 minutos
EXECUTIONS_TIMEOUT_MAX=3600000  # 1 hora

# <ion-icon name="bug-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Retry e falhas
EXECUTIONS_RETRY_ON_ERROR=true
EXECUTIONS_RETRY_ON_FAILURE=true
EXECUTIONS_RETRY_ATTEMPTS=3
EXECUTIONS_RETRY_DELAY=5000  # 5 segundos
```

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
      
      # Banco de dados
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=${DB_PASSWORD}
      
      # Redis para filas
      - REDIS_URL=redis://redis:6379
      
      # Configurações de execução
      - EXECUTIONS_PROCESS=main
      - EXECUTIONS_MODE=regular
      - EXECUTIONS_TIMEOUT=300000
      - EXECUTIONS_TIMEOUT_MAX=3600000
      
      # Segurança
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      - postgres
      - redis
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
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - n8n_network

  redis-commander:
    image: rediscommander/redis-commander:latest
    restart: unless-stopped
    environment:
      - REDIS_HOSTS=local:redis:6379:0:${REDIS_PASSWORD}
    ports:
      - "8081:8081"
    depends_on:
      - redis
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

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Workers Distribuídos

###  Configuração de Workers

#### **Worker Principal (Main)**
```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração para worker principal
EXECUTIONS_PROCESS=main
EXECUTIONS_MODE=regular

# <ion-icon name="git-branch-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Este worker processa:
# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> - Execuções manuais
# <ion-icon name="git-network-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> - Webhooks
# <ion-icon name="grid-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> - Interface de usuário
# <ion-icon name="git-branch-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> - Gerenciamento de workflows
```

#### **Workers de Execução**
```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração para workers de execução
EXECUTIONS_PROCESS=worker
EXECUTIONS_MODE=regular

# <ion-icon name="git-branch-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Este worker processa apenas:
# <ion-icon name="git-branch-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> - Execuções de workflows
# <ion-icon name="git-branch-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> - Jobs da fila
# <ion-icon name="bug-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> - Retry de falhas
```

###  Múltiplos Workers

#### **Docker Compose com Workers**
```yaml
version: '3.8'

services:
  # Worker principal
  n8n-main:
    image: n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - EXECUTIONS_PROCESS=main
      - EXECUTIONS_MODE=regular
      - REDIS_URL=redis://redis:6379
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=${DB_PASSWORD}
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
    depends_on:
      - postgres
      - redis
    networks:
      - n8n_network

  # Workers de execução
  n8n-worker-1:
    image: n8nio/n8n:latest
    restart: unless-stopped
    environment:
      - EXECUTIONS_PROCESS=worker
      - EXECUTIONS_MODE=regular
      - REDIS_URL=redis://redis:6379
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=${DB_PASSWORD}
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
    depends_on:
      - postgres
      - redis
    networks:
      - n8n_network

  n8n-worker-2:
    image: n8nio/n8n:latest
    restart: unless-stopped
    environment:
      - EXECUTIONS_PROCESS=worker
      - EXECUTIONS_MODE=regular
      - REDIS_URL=redis://redis:6379
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=${DB_PASSWORD}
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
    depends_on:
      - postgres
      - redis
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
  postgres_data:
  redis_data:

networks:
  n8n_network:
    driver: bridge
```

---

## <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Gerenciamento de Jobs

###  Tipos de Jobs

#### **Execuções de Workflow**
```javascript
// Job de execução de workflow
{
  id: 'workflow-execution-123',
  type: 'workflow',
  data: {
    workflowId: 'abc123',
    triggerData: { /* dados do trigger */ },
    executionMode: 'regular'
  },
  priority: 0,
  delay: 0,
  attempts: 3
}
```

#### **Webhooks**
```javascript
// Job de webhook
{
  id: 'webhook-456',
  type: 'webhook',
  data: {
    workflowId: 'def456',
    method: 'POST',
    headers: { /* headers */ },
    body: { /* payload */ }
  },
  priority: 1, // Prioridade alta para webhooks
  attempts: 3
}
```

###  Retry e Falhas

#### **Configuração de Retry**
```bash
# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurações de retry
EXECUTIONS_RETRY_ON_ERROR=true
EXECUTIONS_RETRY_ON_FAILURE=true
EXECUTIONS_RETRY_ATTEMPTS=3
EXECUTIONS_RETRY_DELAY=5000  # 5 segundos
EXECUTIONS_RETRY_BACKOFF=exponential  # exponential, linear
```

#### **Tratamento de Falhas**
```javascript
// Estratégias de retry
const retryStrategies = {
  exponential: (attempt) => Math.pow(2, attempt) * 1000, // 1s, 2s, 4s
  linear: (attempt) => attempt * 1000, // 1s, 2s, 3s
  fixed: (attempt) => 5000 // Sempre 5s
};
```

---

## <ion-icon name="eye-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Monitoramento

###  Métricas Redis

#### **Comandos de Monitoramento**
```bash
# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Status do Redis
redis-cli info

# <ion-icon name="analytics-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Estatísticas de memória
redis-cli info memory

# <ion-icon name="analytics-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Estatísticas de comandos
redis-cli info stats

# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Lista de chaves
redis-cli keys "*"

# <ion-icon name="time-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Monitorar comandos em tempo real
redis-cli monitor

# <ion-icon name="git-branch-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar jobs na fila
redis-cli llen n8n:queue:jobs
redis-cli llen n8n:queue:webhooks
```

#### **Script de Monitoramento**
```bash
#!/bin/bash
# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> monitor-redis.sh

REDIS_HOST="localhost"
REDIS_PORT="6379"
REDIS_PASSWORD="senha_redis"

# <ion-icon name="analytics-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Métricas básicas
echo "=== Status Redis ==="
redis-cli -h $REDIS_HOST -p $REDIS_PORT -a $REDIS_PASSWORD info server | grep uptime_in_seconds

echo "=== Memória ==="
redis-cli -h $REDIS_HOST -p $REDIS_PORT -a $REDIS_PASSWORD info memory | grep used_memory_human

echo "=== Filas n8n ==="
echo "Jobs na fila: $(redis-cli -h $REDIS_HOST -p $REDIS_PORT -a $REDIS_PASSWORD llen n8n:queue:jobs)"
echo "Webhooks na fila: $(redis-cli -h $REDIS_HOST -p $REDIS_PORT -a $REDIS_PASSWORD llen n8n:queue:webhooks)"
echo "Jobs processados: $(redis-cli -h $REDIS_HOST -p $REDIS_PORT -a $REDIS_PASSWORD get n8n:stats:processed)"
echo "Jobs falharam: $(redis-cli -h $REDIS_HOST -p $REDIS_PORT -a $REDIS_PASSWORD get n8n:stats:failed)"
```

###  Alertas

#### **Script de Alertas**
```bash
#!/bin/bash
# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> redis-alerts.sh

REDIS_HOST="localhost"
REDIS_PORT="6379"
REDIS_PASSWORD="senha_redis"

# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar se Redis está respondendo
if ! redis-cli -h $REDIS_HOST -p $REDIS_PORT -a $REDIS_PASSWORD ping > /dev/null 2>&1; then
    echo "ALERTA: Redis não está respondendo!"
    # Enviar notificação
    curl -X POST https://hooks.slack.com/services/YOUR/WEBHOOK/URL \
      -H "Content-type: application/json" \
      -d '{"text":"🚨 Redis não está respondendo!"}'
    exit 1
fi

# <ion-icon name="grid-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar fila muito grande
QUEUE_SIZE=$(redis-cli -h $REDIS_HOST -p $REDIS_PORT -a $REDIS_PASSWORD llen n8n:queue:jobs)
if [ $QUEUE_SIZE -gt 1000 ]; then
    echo "ALERTA: Fila muito grande ($QUEUE_SIZE jobs)"
    # Enviar notificação
    curl -X POST https://hooks.slack.com/services/YOUR/WEBHOOK/URL \
      -H "Content-type: application/json" \
      -d "{\"text\":\"⚠️ Fila muito grande: $QUEUE_SIZE jobs\"}"
fi
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Escalabilidade

###  Cluster Redis

#### **Redis Sentinel**
```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração Sentinel
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> sentinel.conf
port 26379
sentinel monitor mymaster 127.0.0.1 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 10000
sentinel parallel-syncs mymaster 1
```

#### **Redis Cluster**
```bash
# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Criar cluster Redis
redis-cli --cluster create \
  127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 \
  127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 \
  --cluster-replicas 1
```

###  Cloud Redis

#### **AWS ElastiCache**
```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração ElastiCache
REDIS_URL=redis://seu-cluster.xyz.cache.amazonaws.com:6379

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Com autenticação
REDIS_URL=redis://:senha@seu-cluster.xyz.cache.amazonaws.com:6379
```

#### **Google Cloud Memorystore**
```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração Memorystore
REDIS_URL=redis://10.0.0.1:6379

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Com autenticação
REDIS_URL=redis://:senha@10.0.0.1:6379
```

---

## <ion-icon name="bug-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Troubleshooting

###  Problemas Comuns

#### **Redis não conecta**
```bash
# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar se Redis está rodando
sudo systemctl status redis-server

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar porta
netstat -tlnp | grep 6379

# <ion-icon name="git-network-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Testar conexão
redis-cli ping

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar logs
sudo tail -f /var/log/redis/redis-server.log
```

#### **Jobs não processam**
```bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar se workers estão rodando
docker ps | grep n8n

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar logs dos workers
docker logs n8n-worker-1

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar fila
redis-cli llen n8n:queue:jobs

# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar configurações
docker exec n8n-worker-1 env | grep EXECUTIONS
```

#### **Performance lenta**
```bash
# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar uso de memória Redis
redis-cli info memory

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar comandos lentos
redis-cli slowlog get 10

# <ion-icon name="analytics-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar estatísticas
redis-cli info stats

# <ion-icon name="speedometer-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Limpar cache se necessário
redis-cli flushdb
```

###  Scripts de Diagnóstico

#### **Diagnóstico Completo**
```bash
#!/bin/bash
# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> diagnose-queues.sh

echo "=== Diagnóstico de Filas n8n ==="
echo

echo "1. Status do Redis:"
redis-cli ping
echo

echo "2. Informações do sistema:"
redis-cli info server | grep -E "(redis_version|uptime_in_seconds|connected_clients)"
echo

echo "3. Uso de memória:"
redis-cli info memory | grep -E "(used_memory_human|maxmemory_human)"
echo

echo "4. Filas n8n:"
echo "Jobs: $(redis-cli llen n8n:queue:jobs)"
echo "Webhooks: $(redis-cli llen n8n:queue:webhooks)"
echo "Retry: $(redis-cli llen n8n:queue:retry)"
echo

echo "5. Estatísticas:"
echo "Processados: $(redis-cli get n8n:stats:processed || echo '0')"
echo "Falharam: $(redis-cli get n8n:stats:failed || echo '0')"
echo "Em execução: $(redis-cli get n8n:stats:running || echo '0')"
echo

echo "6. Workers ativos:"
docker ps --filter "name=n8n" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo

echo "7. Logs recentes:"
docker logs --tail 20 n8n-main 2>&1 | grep -E "(ERROR|WARN|worker|queue)"
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Checklist de Produção

###  Configuração

- [ ] Redis instalado e configurado
- [ ] Autenticação Redis configurada
- [ ] Variáveis de ambiente configuradas
- [ ] Conexão Redis testada
- [ ] Workers configurados corretamente

###  Performance

- [ ] Configurações de memória otimizadas
- [ ] Persistência Redis configurada
- [ ] Workers distribuídos adequadamente
- [ ] Timeouts configurados
- [ ] Retry policies definidas

###  Monitoramento

- [ ] Scripts de monitoramento configurados
- [ ] Alertas configurados
- [ ] Métricas sendo coletadas
- [ ] Logs estruturados
- [ ] Dashboard de monitoramento

###  Segurança

- [ ] Senha Redis configurada
- [ ] Acesso restrito por IP
- [ ] SSL/TLS configurado (se necessário)
- [ ] Backup Redis configurado
- [ ] Logs de acesso ativados

---

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

Agora que você configurou as filas:

1. **[Configuração SSL/HTTPS](./ssl-https)** - Configure HTTPS seguro
2. **[Segurança](../seguranca/autenticacao)** - Configure autenticação avançada
3. **[Load Balancing](../escalonamento/load-balancing)** - Configure balanceamento de carga
4. **[Performance](../escalonamento/performance)** - Otimize performance

---

:::tip **Dica Pro**
Configure pelo menos 2-3 workers para alta disponibilidade. Monitore a fila regularmente e ajuste o número de workers conforme a carga.
:::

:::warning **Importante**
Sempre configure backup do Redis e teste a recuperação. Filas perdidas podem causar interrupção de workflows críticos.
:::
