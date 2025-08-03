---
sidebar_position: 3
title: Otimização de Performance
description: Como otimizar performance do n8n para máxima eficiência em produção
keywords: [n8n, performance, otimização, eficiência, produção, tuning]
---


# <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Otimização de Performance

Este documento detalha como **otimizar performance do n8n** para máxima eficiência, incluindo configuração de workers, ajuste de timeouts, otimização de queries de banco, gerenciamento de memória, monitoramento de recursos, e técnicas avançadas de tuning que maximizam throughput e minimizam latência em workflows de alta demanda para operações empresariais críticas.

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você vai aprender

- Configuração de workers otimizada
- Ajuste de timeouts e limites
- Otimização de banco de dados
- Gerenciamento de memória
- Monitoramento de performance

---

## <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Por que Otimizar Performance?

### Impacto da Performance

**Performance Baixa:**

- ❌ **Workflows lentos** - Execuções demoram muito
- ❌ **Timeout de execuções** - Falhas por tempo limite
- ❌ **Recursos desperdiçados** - CPU e memória mal utilizados
- ❌ **Experiência ruim** - Interface lenta e travamentos
- ❌ **Custos altos** - Mais servidores necessários

**Performance Otimizada:**

- ✅ **Execuções rápidas** - Workflows executam em segundos
- ✅ **Alta disponibilidade** - Sistema sempre responsivo
- ✅ **Recursos eficientes** - Melhor utilização de hardware
- ✅ **Experiência fluida** - Interface rápida e responsiva
- ✅ **Custos reduzidos** - Menos servidores necessários

### Quando Otimizar

**Otimize performance quando:**

- Workflows demoram **mais de 30 segundos**
- Sistema fica **lento com muitos usuários**
- **Timeouts frequentes** nas execuções
- **Uso de CPU/memória** muito alto
- Precisa **processar mais workflows** simultaneamente

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração de Workers

### Otimização de Workers

#### **Configuração Base**

```bash
# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração otimizada para workers
EXECUTIONS_PROCESS=worker
EXECUTIONS_MODE=regular

# <ion-icon name="color-palette-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurações de concorrência
EXECUTIONS_TIMEOUT=300000  # 5 minutos
EXECUTIONS_TIMEOUT_MAX=3600000  # 1 hora
EXECUTIONS_DATA_SAVE_ON_ERROR=all
EXECUTIONS_DATA_SAVE_ON_SUCCESS=all
```

#### **Configuração Avançada**

```bash
# <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurações avançadas de performance
EXECUTIONS_DATA_PRUNE=true
EXECUTIONS_DATA_MAX_AGE=168  # 7 dias
EXECUTIONS_DATA_PRUNE_TIMEOUT=3600  # 1 hora

# <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurações de retry
EXECUTIONS_RETRY_ON_ERROR=true
EXECUTIONS_RETRY_ON_FAILURE=true
EXECUTIONS_RETRY_ATTEMPTS=3
EXECUTIONS_RETRY_DELAY=5000  # 5 segundos
```

### Múltiplos Workers

#### **Docker Compose com Workers Otimizados**

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
      - EXECUTIONS_TIMEOUT=300000
      - EXECUTIONS_TIMEOUT_MAX=3600000
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
    depends_on:
      - postgres
      - redis
    networks:
      - n8n_network

  # Workers de execução otimizados
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
      - EXECUTIONS_TIMEOUT=300000
      - EXECUTIONS_TIMEOUT_MAX=3600000
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
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
      - EXECUTIONS_TIMEOUT=300000
      - EXECUTIONS_TIMEOUT_MAX=3600000
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
    depends_on:
      - postgres
      - redis
    networks:
      - n8n_network

  # Banco de dados otimizado
  postgres:
    image: postgres:15
    restart: unless-stopped
    environment:
      - POSTGRES_DB=n8n
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./postgresql.conf:/etc/postgresql/postgresql.conf
    command: postgres -c config_file=/etc/postgresql/postgresql.conf
    deploy:
      resources:
        limits:
          memory: 4G
          cpus: '2.0'
        reservations:
          memory: 2G
          cpus: '1.0'
    networks:
      - n8n_network

  # Redis otimizado
  redis:
    image: redis:7-alpine
    restart: unless-stopped
    command: redis-server --appendonly yes --maxmemory 1gb --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
        reservations:
          memory: 512M
          cpus: '0.25'
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

## <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Otimização de Timeouts

### Configuração de Timeouts

#### **Timeouts por Tipo de Operação**

```bash
# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Timeouts para operações simples (30 segundos)
EXECUTIONS_TIMEOUT=30000

# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Timeouts para operações complexas (5 minutos)
EXECUTIONS_TIMEOUT_MAX=300000

# <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Timeouts para webhooks (2 minutos)
WEBHOOK_TIMEOUT=120000

# <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Timeouts de conexão HTTP (10 segundos)
HTTP_TIMEOUT=10000

# <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Timeouts de banco de dados (30 segundos)
DB_TIMEOUT=30000
```

#### **Configuração Avançada de Timeouts**

```bash
# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurações específicas por tipo de workflow
EXECUTIONS_TIMEOUT_SIMPLE=30000    # Operações simples
EXECUTIONS_TIMEOUT_COMPLEX=300000  # Operações complexas
EXECUTIONS_TIMEOUT_WEBHOOK=120000  # Webhooks
EXECUTIONS_TIMEOUT_API=60000       # APIs externas

# <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurações de retry com backoff
EXECUTIONS_RETRY_BACKOFF=exponential
EXECUTIONS_RETRY_BACKOFF_FACTOR=2
EXECUTIONS_RETRY_MAX_DELAY=300000
```

### Estratégias de Timeout

#### **Timeout Adaptativo**

```javascript
// Estratégia de timeout baseada no tipo de operação
const timeoutStrategies = {
  simple: 30000,      // 30s para operações simples
  complex: 300000,    // 5min para operações complexas
  webhook: 120000,    // 2min para webhooks
  api: 60000,         // 1min para APIs externas
  database: 30000     // 30s para operações de banco
};

// Aplicar timeout baseado no tipo
function getTimeoutForOperation(type) {
  return timeoutStrategies[type] || timeoutStrategies.simple;
}
```

---

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Otimização de Banco de Dados

### PostgreSQL Otimizado

#### **postgresql.conf - Otimizações**

```bash
# <ion-icon name="server-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> /etc/postgresql/15/main/postgresql.conf

# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Memória
shared_buffers = 1GB              # 25% da RAM
effective_cache_size = 3GB        # 75% da RAM
work_mem = 16MB                   # Para queries complexas
maintenance_work_mem = 256MB      # Para manutenção

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conexões
max_connections = 200             # Ajuste conforme necessidade
max_worker_processes = 8          # Para paralelização
max_parallel_workers = 8          # Para queries paralelas
max_parallel_workers_per_gather = 4

# <ion-icon name="document-text-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Logs
log_destination = 'stderr'
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_rotation_age = 1d
log_rotation_size = 100MB
log_min_duration_statement = 1000  # Log queries > 1s

# <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Performance
random_page_cost = 1.1            # Para SSDs
effective_io_concurrency = 200    # Para SSDs
checkpoint_completion_target = 0.9
wal_buffers = 32MB
checkpoint_segments = 32
checkpoint_timeout = 5min

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Autovacuum
autovacuum = on
autovacuum_max_workers = 3
autovacuum_naptime = 1min
autovacuum_vacuum_threshold = 50
autovacuum_analyze_threshold = 50
```

#### **Índices Otimizados**

```sql
-- Índices para melhorar performance
CREATE INDEX CONCURRENTLY idx_executions_created_at ON executions(created_at);
CREATE INDEX CONCURRENTLY idx_executions_workflow_id ON executions(workflow_id);
CREATE INDEX CONCURRENTLY idx_executions_status ON executions(status);
CREATE INDEX CONCURRENTLY idx_workflows_active ON workflows(active);

-- Índices compostos
CREATE INDEX CONCURRENTLY idx_executions_workflow_status ON executions(workflow_id, status);
CREATE INDEX CONCURRENTLY idx_executions_created_status ON executions(created_at, status);

-- Índices para webhooks
CREATE INDEX CONCURRENTLY idx_webhook_entity ON webhook_entity(webhook_id);
CREATE INDEX CONCURRENTLY idx_webhook_entity_path ON webhook_entity(path);
```

### Manutenção de Banco

#### **Script de Manutenção**

```bash
#!/bin/bash
# <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> database-maintenance.sh

DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="n8n"
DB_USER="n8n"

echo "=== Manutenção do Banco de Dados ==="
echo

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Vacuum e analyze
echo "1. Executando VACUUM e ANALYZE..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "VACUUM ANALYZE;"
echo

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Reindex
echo "2. Reindexando tabelas..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "REINDEX DATABASE $DB_NAME;"
echo

# <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Estatísticas
echo "3. Atualizando estatísticas..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "ANALYZE;"
echo

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Limpeza de execuções antigas
echo "4. Limpando execuções antigas..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "
DELETE FROM executions 
WHERE created_at < NOW() - INTERVAL '30 days' 
AND status IN ('success', 'error');"
echo

echo "Manutenção concluída!"
```

---

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Gerenciamento de Memória

### Configuração de Memória

#### **Limites de Memória Node.js**

```bash
# <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurar limites de memória para Node.js
NODE_OPTIONS="--max-old-space-size=4096 --max-semi-space-size=512"

# <ion-icon name="cloud-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Para containers Docker
docker run -e NODE_OPTIONS="--max-old-space-size=4096" n8nio/n8n
```

#### **Configuração de Memória Redis**

```bash
# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração Redis otimizada
# <ion-icon name="server-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> redis.conf
maxmemory 1gb
maxmemory-policy allkeys-lru
maxmemory-samples 10

# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurações de persistência
save 900 1
save 300 10
save 60 10000
appendonly yes
appendfsync everysec
```

### Monitoramento de Memória

#### **Script de Monitoramento de Memória**

```bash
#!/bin/bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> memory-monitor.sh

echo "=== Monitoramento de Memória ==="
echo

# <ion-icon name="color-palette-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Memória do sistema
echo "1. Memória do Sistema:"
free -h
echo

# <ion-icon name="person-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Memória dos containers
echo "2. Memória dos Containers:"
docker stats --no-stream --format "table {{.Container}}\t{{.MemUsage}}\t{{.MemPerc}}"
echo

# <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Memória do Node.js
echo "3. Memória do Node.js:"
for container in n8n-main n8n-worker-1 n8n-worker-2; do
    echo "=== $container ==="
    docker exec $container node -e "
        const mem = process.memoryUsage();
        console.log('RSS:', Math.round(mem.rss / 1024 / 1024) + 'MB');
        console.log('Heap Used:', Math.round(mem.heapUsed / 1024 / 1024) + 'MB');
        console.log('Heap Total:', Math.round(mem.heapTotal / 1024 / 1024) + 'MB');
    "
done
echo

# <ion-icon name="server-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Memória Redis
echo "4. Memória Redis:"
redis-cli info memory | grep -E "(used_memory_human|maxmemory_human)"
echo

# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Alertas de memória
MEMORY_THRESHOLD=85
for container in n8n-main n8n-worker-1 n8n-worker-2; do
    MEMORY_PERC=$(docker stats --no-stream --format "{{.MemPerc}}" $container | sed 's/%//')
    if (( $(echo "$MEMORY_PERC > $MEMORY_THRESHOLD" | bc -l) )); then
        echo "⚠️ ALERTA: $container usando $MEMORY_PERC% de memória"
    fi
done
```

---

## <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Monitoramento de Performance

### Métricas de Performance

#### **Script de Métricas**

```bash
#!/bin/bash
# <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> performance-metrics.sh

echo "=== Métricas de Performance ==="
echo

# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> CPU e memória
echo "1. Uso de Recursos:"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
echo

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Execuções por minuto
echo "2. Execuções por Minuto:"
EXECUTIONS_PER_MIN=$(psql -h localhost -U n8n -d n8n -t -c "
SELECT COUNT(*) FROM executions 
WHERE created_at > NOW() - INTERVAL '1 minute';")
echo "Execuções no último minuto: $EXECUTIONS_PER_MIN"
echo

# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Tempo médio de execução
echo "3. Tempo Médio de Execução:"
AVG_EXECUTION_TIME=$(psql -h localhost -U n8n -d n8n -t -c "
SELECT AVG(EXTRACT(EPOCH FROM (finished_at - started_at))) 
FROM executions 
WHERE finished_at IS NOT NULL 
AND created_at > NOW() - INTERVAL '1 hour';")
echo "Tempo médio (última hora): ${AVG_EXECUTION_TIME}s"
echo

# <ion-icon name="bug-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Taxa de erro
echo "4. Taxa de Erro:"
ERROR_RATE=$(psql -h localhost -U n8n -d n8n -t -c "
SELECT 
    ROUND(
        (COUNT(CASE WHEN status = 'error' THEN 1 END) * 100.0 / COUNT(*)), 2
    ) as error_rate
FROM executions 
WHERE created_at > NOW() - INTERVAL '1 hour';")
echo "Taxa de erro (última hora): ${ERROR_RATE}%"
echo

# <ion-icon name="server-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Filas Redis
echo "5. Status das Filas:"
echo "Jobs na fila: $(redis-cli llen n8n:queue:jobs)"
echo "Webhooks na fila: $(redis-cli llen n8n:queue:webhooks)"
echo "Jobs processados: $(redis-cli get n8n:stats:processed || echo '0')"
echo "Jobs falharam: $(redis-cli get n8n:stats:failed || echo '0')"
```

### Alertas de Performance

#### **Configuração de Alertas**

```bash
#!/bin/bash
# <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> performance-alerts.sh

# <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurações
WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
CPU_THRESHOLD=80
MEMORY_THRESHOLD=85
ERROR_RATE_THRESHOLD=5
EXECUTION_TIME_THRESHOLD=60

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar CPU
for container in n8n-main n8n-worker-1 n8n-worker-2; do
    CPU_USAGE=$(docker stats --no-stream --format "{{.CPUPerc}}" $container | sed 's/%//')
    if (( $(echo "$CPU_USAGE > $CPU_THRESHOLD" | bc -l) )); then
        curl -X POST $WEBHOOK_URL \
          -H "Content-type: application/json" \
          -d "{\"text\":\"⚠️ CPU alta em $container: ${CPU_USAGE}%\"}"
    fi
done

# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar memória
for container in n8n-main n8n-worker-1 n8n-worker-2; do
    MEMORY_USAGE=$(docker stats --no-stream --format "{{.MemPerc}}" $container | sed 's/%//')
    if (( $(echo "$MEMORY_USAGE > $MEMORY_THRESHOLD" | bc -l) )); then
        curl -X POST $WEBHOOK_URL \
          -H "Content-type: application/json" \
          -d "{\"text\":\"⚠️ Memória alta em $container: ${MEMORY_USAGE}%\"}"
    fi
done

# <ion-icon name="bug-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar taxa de erro
ERROR_RATE=$(psql -h localhost -U n8n -d n8n -t -c "
SELECT ROUND((COUNT(CASE WHEN status = 'error' THEN 1 END) * 100.0 / COUNT(*)), 2)
FROM executions 
WHERE created_at > NOW() - INTERVAL '10 minutes';" | xargs)

if (( $(echo "$ERROR_RATE > $ERROR_RATE_THRESHOLD" | bc -l) )); then
    curl -X POST $WEBHOOK_URL \
      -H "Content-type: application/json" \
      -d "{\"text\":\"🚨 Taxa de erro alta: ${ERROR_RATE}%\"}"
fi

# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar tempo de execução
AVG_TIME=$(psql -h localhost -U n8n -d n8n -t -c "
SELECT AVG(EXTRACT(EPOCH FROM (finished_at - started_at)))
FROM executions 
WHERE finished_at IS NOT NULL 
AND created_at > NOW() - INTERVAL '10 minutes';" | xargs)

if (( $(echo "$AVG_TIME > $EXECUTION_TIME_THRESHOLD" | bc -l) )); then
    curl -X POST $WEBHOOK_URL \
      -H "Content-type: application/json" \
      -d "{\"text\":\"🐌 Tempo de execução alto: ${AVG_TIME}s\"}"
fi
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Técnicas Avançadas de Tuning

### Otimização de Workflows

#### **Boas Práticas de Performance**

```javascript
// 1. Usar batch processing para grandes volumes
const batchSize = 100;
const items = await getItems();
for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await processBatch(batch);
}

// 2. Implementar cache para dados frequentes
const cache = new Map();
async function getCachedData(key) {
    if (cache.has(key)) {
        return cache.get(key);
    }
    const data = await fetchData(key);
    cache.set(key, data);
    return data;
}

// 3. Usar paralelismo quando possível
const promises = items.map(item => processItem(item));
const results = await Promise.all(promises);

// 4. Implementar retry com backoff exponencial
async function retryWithBackoff(fn, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => 
                setTimeout(resolve, Math.pow(2, i) * 1000)
            );
        }
    }
}
```

### Otimização de Rede

#### **Configuração de Rede**

```bash
# <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Otimizações de rede para Linux
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> /etc/sysctl.conf

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Buffer sizes
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.core.rmem_default = 262144
net.core.wmem_default = 262144

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> TCP optimizations
net.ipv4.tcp_rmem = 4096 65536 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216
net.ipv4.tcp_congestion_control = bbr
net.ipv4.tcp_window_scaling = 1
net.ipv4.tcp_timestamps = 1

# <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Connection tracking
net.netfilter.nf_conntrack_max = 262144
net.netfilter.nf_conntrack_tcp_timeout_established = 86400
```

---

## <ion-icon name="bug-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Troubleshooting

### Problemas Comuns

#### **Performance lenta**

```bash
# <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar uso de recursos
docker stats --no-stream

# <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar logs de performance
docker logs n8n-main | grep -E "(slow|timeout|error)"

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar queries lentas no banco
psql -h localhost -U n8n -d n8n -c "
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;"
```

#### **Memory leaks**

```bash
# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar uso de memória
docker exec n8n-main node -e "
const mem = process.memoryUsage();
console.log('RSS:', Math.round(mem.rss / 1024 / 1024) + 'MB');
console.log('Heap Used:', Math.round(mem.heapUsed / 1024 / 1024) + 'MB');
"

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar garbage collection
docker exec n8n-main node --trace-gc -e "console.log('GC test')"
```

#### **Timeouts frequentes**

```bash
# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar configurações de timeout
docker exec n8n-main env | grep -E "(TIMEOUT|EXECUTIONS)"

# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar logs de timeout
docker logs n8n-main | grep -i timeout

# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Ajustar timeouts se necessário
# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Editar variáveis de ambiente e reiniciar
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Checklist de Produção

### Configuração

- [ ] Workers configurados adequadamente
- [ ] Timeouts otimizados
- [ ] Banco de dados otimizado
- [ ] Redis configurado
- [ ] Memória configurada

### Performance

- [ ] Métricas sendo coletadas
- [ ] Alertas configurados
- [ ] Monitoramento ativo
- [ ] Logs estruturados
- [ ] Backup de configurações

### Monitoramento

- [ ] Dashboard de performance
- [ ] Alertas funcionando
- [ ] Logs centralizados
- [ ] Métricas históricas
- [ ] Relatórios automáticos

### Manutenção

- [ ] Scripts de manutenção
- [ ] Limpeza automática
- [ ] Backup regular
- [ ] Testes de performance
- [ ] Documentação atualizada

---

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

Agora que você otimizou a performance:

1. **[Clustering](./clustering)** - Configure clustering para alta disponibilidade
2. **[Load Balancing](./load-balancing)** - Configure balanceamento de carga
3. **[Segurança](../seguranca/autenticacao)** - Configure autenticação avançada
4. **[Backup e Recovery](../seguranca/backup-recovery)** - Implemente estratégias de backup

---

:::tip **Dica Pro**
Monitore regularmente as métricas de performance e ajuste as configurações conforme necessário. Performance é um processo contínuo de otimização.
:::

:::warning **Importante**
Sempre teste as otimizações em ambiente de desenvolvimento antes de aplicar em produção. Mudanças de performance podem afetar a estabilidade do sistema.
:::
