---
sidebar_position: 4
title: Monitoramento e Alertas
description: Como implementar monitoramento abrangente e sistema de alertas para n8n
keywords: [n8n, monitoramento, alertas, observabilidade, métricas]
---


# <ion-icon name="warning-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Monitoramento e Alertas

Este documento explica como **implementar monitoramento abrangente** do n8n, abordando métricas de performance, logs estruturados, alertas proativos, dashboards de observabilidade, integração com ferramentas de APM, e sistemas de notificação que detectam problemas antes que afetem usuários finais, garantindo visibilidade completa sobre saúde e performance das automações em produção.

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você vai aprender

- Métricas essenciais de monitoramento
- Configuração de alertas
- Dashboards de observabilidade
- Integração com ferramentas APM
- Logs estruturados

---

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Métricas Essenciais

### Métricas de Sistema

#### **CPU e Memória**

```bash
#!/bin/bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> system-metrics.sh

echo "=== Métricas do Sistema ==="

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> CPU
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
echo "CPU Usage: ${CPU_USAGE}%"

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Memória
MEMORY_USAGE=$(free | grep Mem | awk '{printf("%.2f", $3/$2 * 100.0)}')
echo "Memory Usage: ${MEMORY_USAGE}%"

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Disco
DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | cut -d'%' -f1)
echo "Disk Usage: ${DISK_USAGE}%"

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Load Average
LOAD_AVG=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | cut -d',' -f1)
echo "Load Average: $LOAD_AVG"
```

#### **Métricas de Rede**

```bash
#!/bin/bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> network-metrics.sh

echo "=== Métricas de Rede ==="

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Conexões ativas
ACTIVE_CONNECTIONS=$(netstat -an | grep ESTABLISHED | wc -l)
echo "Active Connections: $ACTIVE_CONNECTIONS"

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Conexões n8n
N8N_CONNECTIONS=$(netstat -an | grep :5678 | grep ESTABLISHED | wc -l)
echo "n8n Connections: $N8N_CONNECTIONS"

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Tráfego de rede
NETWORK_IN=$(cat /proc/net/dev | grep eth0 | awk '{print $2}')
NETWORK_OUT=$(cat /proc/net/dev | grep eth0 | awk '{print $10}')
echo "Network In: $NETWORK_IN bytes"
echo "Network Out: $NETWORK_OUT bytes"
```

### Métricas de Aplicação

#### **Métricas n8n**

```bash
#!/bin/bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> n8n-metrics.sh

N8N_URL="http://localhost:5678"
API_KEY="sua_api_key"

echo "=== Métricas n8n ==="

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Status da aplicação
if curl -f -s "$N8N_URL/healthz" > /dev/null; then
    echo "n8n Status: ✅ Online"
else
    echo "n8n Status: ❌ Offline"
    exit 1
fi

# <ion-icon name="git-branch-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Número de workflows
WORKFLOW_COUNT=$(curl -s -H "X-N8N-API-KEY: $API_KEY" \
  "$N8N_URL/api/v1/workflows" | jq '. | length')
echo "Total Workflows: $WORKFLOW_COUNT"

# <ion-icon name="git-branch-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Workflows ativos
ACTIVE_WORKFLOWS=$(curl -s -H "X-N8N-API-KEY: $API_KEY" \
  "$N8N_URL/api/v1/workflows" | jq '[.[] | select(.active == true)] | length')
echo "Active Workflows: $ACTIVE_WORKFLOWS"

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Execuções nas últimas 24h
EXECUTIONS_24H=$(curl -s -H "X-N8N-API-KEY: $API_KEY" \
  "$N8N_URL/api/v1/executions?limit=1000" | \
  jq '[.[] | select(.startedAt > "'$(date -d '24 hours ago' -Iseconds)'")] | length')
echo "Executions (24h): $EXECUTIONS_24H"

# <ion-icon name="bug-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Taxa de erro
ERROR_RATE=$(curl -s -H "X-N8N-API-KEY: $API_KEY" \
  "$N8N_URL/api/v1/executions?limit=1000" | \
  jq '[.[] | select(.startedAt > "'$(date -d '1 hour ago' -Iseconds)'")] | 
       [.[] | select(.status == "error")] | length as $errors | 
       [.[] | select(.startedAt > "'$(date -d '1 hour ago' -Iseconds)'")] | length as $total | 
       if $total > 0 then ($errors * 100 / $total) else 0 end')
echo "Error Rate (1h): ${ERROR_RATE}%"
```

#### **Métricas de Performance**

```bash
#!/bin/bash
# <ion-icon name="speedometer-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> performance-metrics.sh

echo "=== Métricas de Performance ==="

# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Tempo de resposta da API
API_RESPONSE_TIME=$(curl -o /dev/null -s -w "%{time_total}" \
  http://localhost:5678/api/v1/workflows)
echo "API Response Time: ${API_RESPONSE_TIME}s"

# <ion-icon name="grid-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Tempo de resposta da UI
UI_RESPONSE_TIME=$(curl -o /dev/null -s -w "%{time_total}" \
  http://localhost:5678/)
echo "UI Response Time: ${UI_RESPONSE_TIME}s"

# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Uso de memória do Node.js
NODE_MEMORY=$(docker exec n8n node -e "
const mem = process.memoryUsage();
console.log(Math.round(mem.rss / 1024 / 1024));
" 2>/dev/null || echo "N/A")
echo "Node.js Memory: ${NODE_MEMORY}MB"

# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Uso de CPU do Node.js
NODE_CPU=$(docker stats --no-stream --format "{{.CPUPerc}}" n8n 2>/dev/null || echo "N/A")
echo "Node.js CPU: $NODE_CPU"
```

---

## <ion-icon name="color-palette-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Sistema de Alertas

### Configuração de Alertas

#### **Script de Monitoramento**

```bash
#!/bin/bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> n8n-monitoring.sh

# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurações
WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
EMAIL_ALERTS="admin@empresa.com"
ALERT_THRESHOLD_CPU=80
ALERT_THRESHOLD_MEMORY=85
ALERT_THRESHOLD_DISK=90
ALERT_THRESHOLD_ERROR_RATE=5
ALERT_THRESHOLD_RESPONSE_TIME=5

# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Função para enviar alerta
send_alert() {
    local message="$1"
    local severity="$2"
    
    # Slack
    curl -X POST $WEBHOOK_URL \
      -H "Content-type: application/json" \
      -d "{\"text\":\"$severity $message\"}"
    
    # Email
    echo "$message" | mail -s "n8n Alert: $severity" $EMAIL_ALERTS
    
    # Log
    echo "$(date): $severity - $message" >> /var/log/n8n/alerts.log
}

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar CPU
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
if (( $(echo "$CPU_USAGE > $ALERT_THRESHOLD_CPU" | bc -l) )); then
    send_alert "CPU usage is ${CPU_USAGE}%" "⚠️"
fi

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar memória
MEMORY_USAGE=$(free | grep Mem | awk '{printf("%.0f", $3/$2 * 100.0)}')
if [ $MEMORY_USAGE -gt $ALERT_THRESHOLD_MEMORY ]; then
    send_alert "Memory usage is ${MEMORY_USAGE}%" "⚠️"
fi

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar disco
DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | cut -d'%' -f1)
if [ $DISK_USAGE -gt $ALERT_THRESHOLD_DISK ]; then
    send_alert "Disk usage is ${DISK_USAGE}%" "🚨"
fi

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar n8n
if ! curl -f -s http://localhost:5678/healthz > /dev/null; then
    send_alert "n8n is not responding" "🚨"
fi

# <ion-icon name="bug-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar taxa de erro
ERROR_RATE=$(curl -s -H "X-N8N-API-KEY: $API_KEY" \
  "http://localhost:5678/api/v1/executions?limit=1000" | \
  jq '[.[] | select(.startedAt > "'$(date -d '10 minutes ago' -Iseconds)'")] | 
       [.[] | select(.status == "error")] | length as $errors | 
       [.[] | select(.startedAt > "'$(date -d '10 minutes ago' -Iseconds)'")] | length as $total | 
       if $total > 0 then ($errors * 100 / $total) else 0 end')

if (( $(echo "$ERROR_RATE > $ALERT_THRESHOLD_ERROR_RATE" | bc -l) )); then
    send_alert "Error rate is ${ERROR_RATE}%" "🚨"
fi

# <ion-icon name="time-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar tempo de resposta
RESPONSE_TIME=$(curl -o /dev/null -s -w "%{time_total}" \
  http://localhost:5678/api/v1/workflows)

if (( $(echo "$RESPONSE_TIME > $ALERT_THRESHOLD_RESPONSE_TIME" | bc -l) )); then
    send_alert "Response time is ${RESPONSE_TIME}s" "⚠️"
fi
```

### Alertas Baseados em Tempo

#### **Alertas de Horário**

```bash
#!/bin/bash
# <ion-icon name="time-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> time-based-alerts.sh

# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurações
CURRENT_HOUR=$(date +%H)
CURRENT_DAY=$(date +%u)  # 1=Monday, 7=Sunday
BUSINESS_HOURS_START=9
BUSINESS_HOURS_END=18

# <ion-icon name="time-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar se está em horário comercial
if [ $CURRENT_DAY -ge 1 ] && [ $CURRENT_DAY -le 5 ]; then
    if [ $CURRENT_HOUR -ge $BUSINESS_HOURS_START ] && [ $CURRENT_HOUR -lt $BUSINESS_HOURS_END ]; then
        # Em horário comercial - alertas mais rigorosos
        ALERT_THRESHOLD_CPU=70
        ALERT_THRESHOLD_MEMORY=80
        ALERT_THRESHOLD_ERROR_RATE=2
    else
        # Fora do horário comercial - alertas mais flexíveis
        ALERT_THRESHOLD_CPU=90
        ALERT_THRESHOLD_MEMORY=90
        ALERT_THRESHOLD_ERROR_RATE=10
    fi
else
    # Fim de semana - alertas muito flexíveis
    ALERT_THRESHOLD_CPU=95
    ALERT_THRESHOLD_MEMORY=95
    ALERT_THRESHOLD_ERROR_RATE=20
fi

echo "Current thresholds - CPU: ${ALERT_THRESHOLD_CPU}%, Memory: ${ALERT_THRESHOLD_MEMORY}%, Error Rate: ${ALERT_THRESHOLD_ERROR_RATE}%"
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Dashboards de Observabilidade

### Grafana Dashboard

#### **Configuração do Grafana**

```yaml
# <ion-icon name="cloud-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> docker-compose.yml para Grafana
version: '3.8'

services:
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./grafana/datasources:/etc/grafana/provisioning/datasources

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus

volumes:
  grafana_data:
  prometheus_data:
```

#### **Configuração Prometheus**

```yaml
# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> prometheus/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'n8n'
    static_configs:
      - targets: ['n8n:5678']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']
```

#### **Dashboard n8n**

```json
{
  "dashboard": {
    "title": "n8n Monitoring Dashboard",
    "panels": [
      {
        "title": "System Metrics",
        "type": "graph",
        "targets": [
          {
            "expr": "cpu_usage_percent",
            "legendFormat": "CPU Usage"
          },
          {
            "expr": "memory_usage_percent",
            "legendFormat": "Memory Usage"
          }
        ]
      },
      {
        "title": "n8n Metrics",
        "type": "graph",
        "targets": [
          {
            "expr": "n8n_workflows_total",
            "legendFormat": "Total Workflows"
          },
          {
            "expr": "n8n_workflows_active",
            "legendFormat": "Active Workflows"
          }
        ]
      },
      {
        "title": "Execution Metrics",
        "type": "graph",
        "targets": [
          {
            "expr": "n8n_executions_total",
            "legendFormat": "Total Executions"
          },
          {
            "expr": "n8n_executions_failed",
            "legendFormat": "Failed Executions"
          }
        ]
      }
    ]
  }
}
```

### Datadog Integration

#### **Configuração Datadog**

```yaml
# <ion-icon name="analytics-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> datadog-agent.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: datadog-config
data:
  datadog.yaml: |
    api_key: YOUR_DATADOG_API_KEY
    site: datadoghq.com
    
    logs:
      enabled: true
      container_collect_all: true
    
    apm_config:
      enabled: true
    
    process_config:
      enabled: true
      process_collection:
        enabled: true
```

#### **Custom Metrics**

```javascript
// n8n-datadog-metrics.js
const { StatsD } = require('hot-shots');

const dogstatsd = new StatsD({
  host: 'localhost',
  port: 8125,
  prefix: 'n8n.'
});

// Métricas de workflow
function trackWorkflowExecution(workflowId, duration, status) {
  dogstatsd.timing('workflow.execution_time', duration, [`workflow_id:${workflowId}`]);
  dogstatsd.increment('workflow.executions', 1, [`status:${status}`, `workflow_id:${workflowId}`]);
}

// Métricas de erro
function trackError(errorType, errorMessage) {
  dogstatsd.increment('errors.total', 1, [`type:${errorType}`]);
  dogstatsd.event('n8n.error', errorMessage, {
    alert_type: 'error',
    tags: [`error_type:${errorType}`]
  });
}

// Métricas de performance
function trackAPIPerformance(endpoint, duration, statusCode) {
  dogstatsd.timing('api.response_time', duration, [`endpoint:${endpoint}`]);
  dogstatsd.increment('api.requests', 1, [`endpoint:${endpoint}`, `status:${statusCode}`]);
}
```

---

## <ion-icon name="folder-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Logs Estruturados

### Configuração de Logs

#### **Configuração n8n**

```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração de logs estruturados
N8N_LOG_LEVEL=info
N8N_LOG_FORMAT=json
N8N_LOG_FILE=/var/log/n8n/n8n.log
N8N_LOG_MAX_SIZE=100MB
N8N_LOG_MAX_FILES=10
```

#### **Formato JSON de Logs**

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "info",
  "message": "Workflow execution started",
  "workflowId": "abc123",
  "workflowName": "Email Marketing Campaign",
  "userId": "user456",
  "executionId": "exec789",
  "metadata": {
    "nodeCount": 15,
    "estimatedDuration": 300000,
    "priority": "high"
  }
}
```

### Centralização de Logs

#### **ELK Stack Configuration**

```yaml
# <ion-icon name="cloud-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> docker-compose-elk.yml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:8.11.0
    ports:
      - "5044:5044"
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch

volumes:
  elasticsearch_data:
```

#### **Logstash Pipeline**

```ruby
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> logstash/pipeline/n8n.conf
input {
  beats {
    port => 5044
  }
}

filter {
  if [fields][service] == "n8n" {
    json {
      source => "message"
    }
    
    date {
      match => [ "timestamp", "ISO8601" ]
      target => "@timestamp"
    }
    
    mutate {
      add_field => {
        "service" => "n8n"
        "environment" => "%{ENVIRONMENT}"
      }
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "n8n-logs-%{+YYYY.MM.dd}"
  }
}
```

---

## <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Integração com Ferramentas APM

### New Relic

#### **Configuração New Relic**

```javascript
// newrelic.js
'use strict';

exports.config = {
  app_name: ['n8n'],
  license_key: 'YOUR_NEW_RELIC_LICENSE_KEY',
  logging: {
    level: 'info'
  },
  distributed_tracing: {
    enabled: true
  },
  transaction_tracer: {
    enabled: true,
    transaction_threshold: 5,
    record_sql: 'obfuscated',
    stack_trace_threshold: 0.5,
    explain_threshold: 0.5
  },
  error_collector: {
    enabled: true,
    collect_events: true
  },
  browser_monitoring: {
    enable: true
  }
};
```

### AppDynamics

#### **Configuração AppDynamics**

```javascript
// appdynamics.js
const appd = require('appdynamics');

appd.profile({
  controllerHostName: 'your-controller-host',
  controllerPort: 8090,
  controllerSslEnabled: false,
  accountName: 'your-account',
  accountAccessKey: 'your-access-key',
  applicationName: 'n8n',
  tierName: 'n8n-tier',
  nodeName: 'n8n-node'
});

// Custom business transactions
appd.startBT('Workflow Execution', 'Workflow');
// ... workflow execution code ...
appd.endBT();
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Checklist de Monitoramento

### Métricas

- [ ] Métricas de sistema configuradas
- [ ] Métricas de aplicação implementadas
- [ ] Métricas de negócio definidas
- [ ] Coleta automática configurada
- [ ] Retenção de dados definida

### Alertas

- [ ] Alertas críticos configurados
- [ ] Alertas de warning configurados
- [ ] Escalação de alertas definida
- [ ] Canais de notificação configurados
- [ ] Testes de alertas realizados

### Dashboards

- [ ] Dashboard principal criado
- [ ] Dashboards específicos por equipe
- [ ] Métricas em tempo real
- [ ] Histórico de dados
- [ ] Exportação de relatórios

### Logs

- [ ] Logs estruturados configurados
- [ ] Centralização de logs implementada
- [ ] Retenção de logs definida
- [ ] Busca e filtros configurados
- [ ] Alertas baseados em logs

---

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

Agora que você configurou o monitoramento:

1. **[Autenticação](./autenticacao)** - Configure métodos de login seguros
2. **[Usuários e Permissões](./usuarios-permissoes)** - Configure controle de acesso
3. **[Backup e Recovery](./backup-recovery)** - Implemente estratégias de backup

---

:::tip **Dica Pro**
Configure alertas proativos que detectam problemas antes que afetem os usuários. Use métricas de negócio além das técnicas.
:::

:::warning **Importante**
Teste regularmente seus alertas e dashboards. Métricas sem ação não agregam valor.
:::

:::info **Recurso Adicional**
Considere implementar SLOs (Service Level Objectives) e SLIs (Service Level Indicators) para medir a qualidade do serviço.
:::

---

**Links úteis:**

- [Documentação oficial n8n](https://docs.n8n.io/)
- [Monitoramento n8n](https://docs.n8n.io/hosting/monitoring/)
- [Segurança n8n](https://docs.n8n.io/hosting/security/)
