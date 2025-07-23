---
title: Analisar Logs
sidebar_position: 2
description: Aprenda a analisar logs do n8n para debugging, monitoramento e otimização de workflows
keywords: [n8n, logs, análise, debugging, monitoramento, troubleshooting, performance]
---

# <ion-icon name="document-text-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Analisar Logs

Os logs são fundamentais para entender o comportamento do n8n e resolver problemas. Neste guia, você aprenderá a analisar logs de execução, sistema e aplicação para debugging e otimização.

## <ion-icon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você aprenderá

- **Tipos de logs** disponíveis no n8n
- **Estrutura** e formato dos logs
- **Técnicas de análise** e debugging
- **Ferramentas** para análise de logs
- **Boas práticas** de monitoramento

## <ion-icon name="layers-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Tipos de Logs

### 1. Logs de Execução

**Execution Logs**:

- Detalhes de cada execução de workflow
- Status de cada node
- Dados de entrada e saída
- Tempo de execução por node

**Estrutura**:

```json
{
  "executionId": "exec-123",
  "workflowId": "workflow-456",
  "status": "success",
  "startedAt": "2024-01-15T10:30:00Z",
  "finishedAt": "2024-01-15T10:30:45Z",
  "nodes": [
    {
      "nodeId": "node-1",
      "name": "HTTP Request",
      "status": "success",
      "startedAt": "2024-01-15T10:30:05Z",
      "finishedAt": "2024-01-15T10:30:10Z",
      "data": {
        "input": {...},
        "output": {...}
      }
    }
  ]
}
```

### 2. Logs de Sistema

**Application Logs**:

- Inicialização do n8n
- Configurações carregadas
- Conexões de banco de dados
- Erros de sistema

**Estrutura**:

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "info",
  "message": "n8n started successfully",
  "context": {
    "version": "1.100.0",
    "environment": "production",
    "database": "postgresql"
  }
}
```

### 3. Logs de Segurança

**Security Logs**:

- Tentativas de login
- Acesso a recursos
- Mudanças de permissões
- Atividades suspeitas

**Estrutura**:

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "warn",
  "event": "login_attempt",
  "user": "user@example.com",
  "ip": "192.168.1.100",
  "success": false,
  "reason": "invalid_password"
}
```

## <ion-icon name="search-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Acessando Logs

### 1. Interface do n8n

**Execution History**:

1. Acesse o workflow
2. Clique em **Executions**
3. Selecione uma execução
4. Visualize logs detalhados

**Sistema**:

1. Acesse **Settings** → **System**
2. Clique em **Logs**
3. Configure nível de log
4. Visualize logs em tempo real

### 2. Arquivos de Log

**Localização padrão**:

```bash
# Logs de aplicação
/var/log/n8n/app.log

# Logs de erro
/var/log/n8n/error.log

# Logs de execução
/var/log/n8n/execution.log

# Logs de segurança
/var/log/n8n/security.log
```

**Comandos úteis**:

```bash
# Ver logs em tempo real
tail -f /var/log/n8n/app.log

# Buscar por erro específico
grep "ERROR" /var/log/n8n/app.log

# Filtrar por data
grep "2024-01-15" /var/log/n8n/app.log

# Contar ocorrências
grep -c "ERROR" /var/log/n8n/app.log
```

### 3. API do n8n

**Endpoint de execuções**:

```bash
# Listar execuções
curl -X GET "https://your-n8n.com/api/v1/executions" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Logs de execução específica
curl -X GET "https://your-n8n.com/api/v1/executions/123" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Análise de Logs

### 1. Padrões de Análise

**Problemas de Performance**:

```bash
# Buscar execuções lentas
grep "execution_time.*>.*5000" /var/log/n8n/execution.log

# Nodes com timeout
grep "timeout" /var/log/n8n/execution.log

# Uso de memória alto
grep "memory.*>.*100MB" /var/log/n8n/execution.log
```

**Erros Comuns**:

```bash
# Erros de autenticação
grep "authentication.*failed" /var/log/n8n/security.log

# Erros de API
grep "API.*error" /var/log/n8n/execution.log

# Erros de banco de dados
grep "database.*error" /var/log/n8n/app.log
```

### 2. Análise Temporal

**Tendências**:

```bash
# Execuções por hora
grep "2024-01-15.*10:" /var/log/n8n/execution.log | wc -l

# Erros por período
grep "ERROR.*2024-01-15" /var/log/n8n/app.log

# Performance por dia da semana
grep "execution_time" /var/log/n8n/execution.log | \
  awk '{print $1, $NF}' | sort
```

### 3. Análise de Workflows

**Workflows específicos**:

```bash
# Logs de workflow específico
grep "workflow-123" /var/log/n8n/execution.log

# Performance por workflow
grep "execution_time" /var/log/n8n/execution.log | \
  grep "workflow-123" | \
  awk '{print $NF}' | \
  sort -n
```

## <ion-icon name="tools-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Ferramentas de Análise

### 1. Ferramentas Nativas

**grep e awk**:

```bash
# Extrair tempos de execução
grep "execution_time" /var/log/n8n/execution.log | \
  awk '{print $1, $NF}' > execution_times.txt

# Estatísticas de erro
grep "ERROR" /var/log/n8n/app.log | \
  awk '{print $5}' | sort | uniq -c | sort -nr

# Análise de IPs
grep "login_attempt" /var/log/n8n/security.log | \
  awk '{print $NF}' | sort | uniq -c
```

**jq para JSON**:

```bash
# Parsear logs JSON
cat /var/log/n8n/execution.log | jq '.executionId, .status, .startedAt'

# Filtrar por status
cat /var/log/n8n/execution.log | jq 'select(.status == "error")'

# Extrair métricas
cat /var/log/n8n/execution.log | jq '.nodes[] | {name: .name, duration: (.finishedAt - .startedAt)}'
```

### 2. Ferramentas Externas

**ELK Stack (Elasticsearch, Logstash, Kibana)**:

```yaml
# Configuração Logstash
input {
  file {
    path => "/var/log/n8n/*.log"
    type => "n8n"
  }
}

filter {
  if [type] == "n8n" {
    json {
      source => "message"
    }
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "n8n-logs-%{+YYYY.MM.dd}"
  }
}
```

**Grafana + Prometheus**:

```yaml
# Métricas do n8n
- job_name: 'n8n'
  static_configs:
    - targets: ['localhost:5678']
  metrics_path: '/metrics'
  scrape_interval: 15s
```

### 3. Scripts Customizados

**Análise de Performance**:

```python
#!/usr/bin/env python3
import json
import sys
from datetime import datetime

def analyze_performance(log_file):
    with open(log_file, 'r') as f:
        for line in f:
            try:
                log = json.loads(line)
                if 'execution_time' in log:
                    duration = log['execution_time']
                    workflow = log.get('workflow_id', 'unknown')
                    print(f"{workflow}: {duration}ms")
            except json.JSONDecodeError:
                continue

if __name__ == "__main__":
    analyze_performance(sys.argv[1])
```

## <ion-icon name="checkmark-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Boas Práticas

### 1. Configuração de Logs

**Níveis de log**:

```bash
# Desenvolvimento
N8N_LOG_LEVEL=debug
N8N_LOG_OUTPUT=console

# Produção
N8N_LOG_LEVEL=info
N8N_LOG_OUTPUT=file
N8N_LOG_FILE=/var/log/n8n/app.log
```

**Rotação de logs**:

```bash
# Configurar logrotate
/var/log/n8n/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 644 n8n n8n
}
```

### 2. Monitoramento

**Alertas configurar**:

- **Taxa de erro** > 5%
- **Tempo de execução** > 5 minutos
- **Falhas consecutivas** > 3
- **Uso de memória** > 80%

**Dashboards**:

- **Execuções por hora**
- **Taxa de sucesso**
- **Tempo médio de execução**
- **Erros por tipo**

### 3. Manutenção

**Limpeza regular**:

- **Arquivar logs** antigos
- **Comprimir logs** antigos
- **Remover logs** desnecessários
- **Backup** de logs importantes

## <ion-icon name="play-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Exemplos Práticos

### Exemplo 1: Análise de Performance

**Script de análise**:

```bash
#!/bin/bash
# analyze_performance.sh

LOG_FILE="/var/log/n8n/execution.log"
OUTPUT_FILE="performance_report.txt"

echo "=== Relatório de Performance n8n ===" > $OUTPUT_FILE
echo "Data: $(date)" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Tempo médio de execução
echo "Tempo médio de execução:" >> $OUTPUT_FILE
grep "execution_time" $LOG_FILE | \
  awk '{sum+=$NF; count++} END {print "Média:", sum/count, "ms"}' >> $OUTPUT_FILE

# Workflows mais lentos
echo "" >> $OUTPUT_FILE
echo "Top 5 workflows mais lentos:" >> $OUTPUT_FILE
grep "execution_time" $LOG_FILE | \
  awk '{print $NF, $0}' | sort -nr | head -5 | \
  awk '{print $2, $3, $NF}' >> $OUTPUT_FILE

# Taxa de erro
echo "" >> $OUTPUT_FILE
echo "Taxa de erro:" >> $OUTPUT_FILE
total=$(grep -c "execution_time" $LOG_FILE)
errors=$(grep -c "status.*error" $LOG_FILE)
rate=$(echo "scale=2; $errors * 100 / $total" | bc)
echo "$rate%" >> $OUTPUT_FILE
```

### Exemplo 2: Monitoramento em Tempo Real

**Script de monitoramento**:

```bash
#!/bin/bash
# monitor_logs.sh

LOG_FILE="/var/log/n8n/app.log"
ALERT_EMAIL="admin@company.com"

# Monitorar erros em tempo real
tail -f $LOG_FILE | while read line; do
    if echo "$line" | grep -q "ERROR"; then
        echo "ERRO DETECTADO: $line" | mail -s "n8n Error Alert" $ALERT_EMAIL
    fi
    
    if echo "$line" | grep -q "execution_time.*>.*300000"; then
        echo "EXECUÇÃO LENTA: $line" | mail -s "n8n Performance Alert" $ALERT_EMAIL
    fi
done
```

### Exemplo 3: Análise de Segurança

**Script de análise de segurança**:

```bash
#!/bin/bash
# security_analysis.sh

SECURITY_LOG="/var/log/n8n/security.log"
REPORT_FILE="security_report.txt"

echo "=== Relatório de Segurança n8n ===" > $REPORT_FILE
echo "Data: $(date)" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Tentativas de login falhadas
echo "Tentativas de login falhadas:" >> $REPORT_FILE
grep "login_attempt.*success.*false" $SECURITY_LOG | \
  awk '{print $NF}' | sort | uniq -c | sort -nr >> $REPORT_FILE

# IPs suspeitos
echo "" >> $REPORT_FILE
echo "IPs com múltiplas tentativas:" >> $REPORT_FILE
grep "login_attempt" $SECURITY_LOG | \
  awk '{print $NF}' | sort | uniq -c | \
  awk '$1 > 5 {print $2, $1 " tentativas"}' >> $REPORT_FILE
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Troubleshooting

### Problemas Comuns

**Logs não aparecem**:

- Verifique configuração de log
- Confirme permissões de arquivo
- Teste nível de log
- Reinicie o n8n

**Logs muito verbosos**:

- Ajuste nível de log
- Configure filtros
- Use rotação de logs
- Implemente sampling

**Performance de análise**:

- Use índices em ferramentas
- Implemente cache
- Use ferramentas especializadas
- Configure agregações

### Debugging

**Ferramentas úteis**:

```bash
# Análise rápida
grep -E "(ERROR|WARN)" /var/log/n8n/app.log | tail -20

# Busca por padrão específico
grep -r "workflow-123" /var/log/n8n/

# Análise de tempo
grep "execution_time" /var/log/n8n/execution.log | \
  awk '{print $NF}' | sort -n | tail -10
```

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Configure níveis** de log apropriados
2. **Implemente rotação** de logs
3. **Configure alertas** baseados em logs
4. **Crie dashboards** de monitoramento
5. **Automatize análise** de logs

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[Configurar Alertas](./configurar-alertas)** - Monitoramento proativo
- **[Execuções](../../usando-n8n/execucoes/index.md)** - Análise de execuções
- **[Referência](../../referencia/index.md)** - Documentação técnica
- **[Comunidade](../../comunidade/index.md)** - Suporte e dicas
- **[Hosting](../../hosting-n8n/index.md)** - Configurações de produção

---

**<ion-icon name="document-text-outline" style={{ fontSize: '16px', color: '#ea4b71' }}></ion-icon> Pronto para analisar? Comece configurando níveis de log apropriados para seu ambiente!**
