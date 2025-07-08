---
title: Configurar Alertas
sidebar_position: 3
description: Configure alertas inteligentes para monitorar workflows, performance e segurança do n8n
keywords: [n8n, alertas, monitoramento, notificações, workflows, performance, segurança]
---

# <ion-icon name="notifications-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurar Alertas

Alertas proativos são essenciais para manter seu ambiente n8n saudável e produtivo. Neste guia, você aprenderá a configurar alertas inteligentes para monitorar workflows, performance e segurança.

## <ion-icon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você aprenderá

- **Tipos de alertas** disponíveis no n8n
- **Configuração** de condições e triggers
- **Canais de notificação** (email, Slack, webhook)
- **Estratégias** de alerta inteligente
- **Boas práticas** de monitoramento

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Tipos de Alertas

### 1. Alertas de Workflow

**Falhas de Execução**:
- Workflow falhou completamente
- Node específico falhou
- Timeout de execução
- Erro de credencial

**Performance**:
- Tempo de execução muito alto
- Uso excessivo de recursos
- Taxa de erro elevada
- Execuções em fila

**Disponibilidade**:
- Workflow não executou no horário
- Trigger não funcionou
- Webhook não respondeu
- Agendamento falhou

### 2. Alertas de Sistema

**Recursos**:
- Uso de CPU alto (>80%)
- Uso de memória alto (>90%)
- Espaço em disco baixo (<10%)
- Conexões de banco esgotadas

**Segurança**:
- Tentativas de login falhadas
- Acesso não autorizado
- Mudanças em configurações críticas
- Credenciais expiradas

**Infraestrutura**:
- Serviço n8n parou
- Banco de dados indisponível
- Rede lenta ou instável
- Backup falhou

### 3. Alertas de Negócio

**Dados**:
- Volume de dados anormal
- Dados duplicados detectados
- Validação de dados falhou
- Sincronização atrasada

**Integrações**:
- API externa indisponível
- Rate limit atingido
- Autenticação expirou
- Dados inconsistentes

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração de Alertas

### 1. Alertas de Workflow

**Error Trigger Node**:
```json
{
  "workflow": {
    "nodes": [
      {
        "type": "errorTrigger",
        "name": "Error Handler",
        "parameters": {
          "conditions": [
            {
              "field": "errorType",
              "operator": "equals",
              "value": "execution"
            }
          ]
        }
      },
      {
        "type": "slack",
        "name": "Send Alert",
        "parameters": {
          "channel": "#alerts",
          "message": "Workflow {{$workflow.name}} falhou: {{$json.error}}"
        }
      }
    ]
  }
}
```

**Monitoramento de Performance**:
```javascript
// Code node para verificar performance
const executionTime = $input.first().json.executionTime;
const threshold = 300000; // 5 minutos

if (executionTime > threshold) {
  return {
    alert: true,
    message: `Workflow executou em ${executionTime}ms (limite: ${threshold}ms)`,
    executionTime: executionTime,
    workflow: $workflow.name
  };
}

return { alert: false };
```

### 2. Alertas de Sistema

**Monitoramento de Recursos**:
```bash
# Script de monitoramento
#!/bin/bash

# Verificar uso de CPU
cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)

if [ $(echo "$cpu_usage > 80" | bc) -eq 1 ]; then
    curl -X POST "https://hooks.slack.com/services/YOUR_WEBHOOK" \
      -H "Content-Type: application/json" \
      -d "{\"text\":\"⚠️ CPU usage: ${cpu_usage}%\"}"
fi

# Verificar uso de memória
memory_usage=$(free | grep Mem | awk '{printf("%.2f", $3/$2 * 100.0)}')

if [ $(echo "$memory_usage > 90" | bc) -eq 1 ]; then
    curl -X POST "https://hooks.slack.com/services/YOUR_WEBHOOK" \
      -H "Content-Type: application/json" \
      -d "{\"text\":\"⚠️ Memory usage: ${memory_usage}%\"}"
fi
```

### 3. Alertas de Segurança

**Monitoramento de Login**:
```javascript
// Code node para monitorar tentativas de login
const loginAttempts = $input.all();

// Agrupar por IP
const ipAttempts = {};
loginAttempts.forEach(attempt => {
  const ip = attempt.json.ip;
  if (!ipAttempts[ip]) {
    ipAttempts[ip] = { success: 0, failed: 0 };
  }
  
  if (attempt.json.success) {
    ipAttempts[ip].success++;
  } else {
    ipAttempts[ip].failed++;
  }
});

// Verificar IPs suspeitos
const suspiciousIPs = [];
Object.entries(ipAttempts).forEach(([ip, attempts]) => {
  if (attempts.failed > 5) {
    suspiciousIPs.push({
      ip: ip,
      failed: attempts.failed,
      success: attempts.success
    });
  }
});

if (suspiciousIPs.length > 0) {
  return {
    alert: true,
    message: "IPs suspeitos detectados",
    suspiciousIPs: suspiciousIPs
  };
}

return { alert: false };
```

## <ion-icon name="mail-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Canais de Notificação

### 1. Email

**Configuração SMTP**:
```bash
# Variáveis de ambiente
N8N_EMAIL_SMTP_HOST=smtp.gmail.com
N8N_EMAIL_SMTP_PORT=587
N8N_EMAIL_SMTP_USER=alerts@company.com
N8N_EMAIL_SMTP_PASS=your-password
N8N_EMAIL_FROM=alerts@company.com
```

**Template de Email**:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .alert { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; }
        .critical { background-color: #f8d7da; border: 1px solid #f5c6cb; }
        .info { background-color: #d1ecf1; border: 1px solid #bee5eb; }
    </style>
</head>
<body>
    <div class="alert {{$json.severity}}">
        <h2>{{$json.title}}</h2>
        <p><strong>Workflow:</strong> {{$json.workflow}}</p>
        <p><strong>Erro:</strong> {{$json.error}}</p>
        <p><strong>Hora:</strong> {{$json.timestamp}}</p>
        <p><a href="{{$json.workflowUrl}}">Ver Workflow</a></p>
    </div>
</body>
</html>
```

### 2. Slack

**Webhook Configuration**:
```json
{
  "type": "slack",
  "name": "Send Alert",
  "parameters": {
    "webhookUrl": "https://hooks.slack.com/services/YOUR_WEBHOOK",
    "channel": "#alerts",
    "text": "{{$json.message}}",
    "attachments": [
      {
        "color": "{{$json.severity == 'critical' ? 'danger' : 'warning'}}",
        "fields": [
          {
            "title": "Workflow",
            "value": "{{$json.workflow}}",
            "short": true
          },
          {
            "title": "Status",
            "value": "{{$json.status}}",
            "short": true
          }
        ]
      }
    ]
  }
}
```

### 3. Webhook

**Endpoint Customizado**:
```javascript
// Code node para webhook customizado
const alertData = {
  timestamp: new Date().toISOString(),
  severity: $json.severity || 'warning',
  workflow: $workflow.name,
  message: $json.message,
  details: $json.details || {},
  environment: process.env.NODE_ENV
};

// Enviar para sistema de monitoramento
const response = await fetch('https://your-monitoring-system.com/alerts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.MONITORING_API_KEY}`
  },
  body: JSON.stringify(alertData)
});

return { sent: response.ok, status: response.status };
```

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Estratégias de Alerta

### 1. Alertas Inteligentes

**Thresholds Dinâmicos**:
```javascript
// Calcular threshold baseado em histórico
const historicalData = await getHistoricalExecutions(7); // 7 dias
const avgExecutionTime = historicalData.reduce((sum, exec) => sum + exec.duration, 0) / historicalData.length;
const threshold = avgExecutionTime * 2; // 2x a média

if ($json.executionTime > threshold) {
  return {
    alert: true,
    message: `Execução ${Math.round($json.executionTime / 1000)}s acima do normal (${Math.round(threshold / 1000)}s)`
  };
}
```

**Agregação de Alertas**:
```javascript
// Evitar spam de alertas
const alertKey = `${$workflow.name}-${$json.errorType}`;
const recentAlerts = await getRecentAlerts(alertKey, 300); // 5 minutos

if (recentAlerts.length < 3) { // Máximo 3 alertas por 5 minutos
  return { alert: true, message: $json.message };
}

return { alert: false, reason: 'Too many recent alerts' };
```

### 2. Escalação de Alertas

**Níveis de Escalação**:
```javascript
const escalationLevels = {
  level1: { delay: 0, channels: ['slack'] },
  level2: { delay: 300000, channels: ['slack', 'email'] }, // 5 min
  level3: { delay: 900000, channels: ['slack', 'email', 'sms'] } // 15 min
};

const alertCount = await getAlertCount($workflow.name, 3600000); // 1 hora

if (alertCount >= 5) {
  return { level: 'level3', channels: escalationLevels.level3.channels };
} else if (alertCount >= 2) {
  return { level: 'level2', channels: escalationLevels.level2.channels };
} else {
  return { level: 'level1', channels: escalationLevels.level1.channels };
}
```

### 3. Alertas Contextuais

**Informações Adicionais**:
```javascript
// Enriquecer alerta com contexto
const context = {
  workflow: $workflow.name,
  executionId: $execution.id,
  timestamp: new Date().toISOString(),
  environment: process.env.NODE_ENV,
  user: $execution.user?.email || 'system',
  relatedWorkflows: await getRelatedWorkflows($workflow.name),
  recentExecutions: await getRecentExecutions($workflow.name, 10)
};

return {
  alert: true,
  message: $json.message,
  context: context,
  severity: determineSeverity($json.error, context)
};
```

## <ion-icon name="checkmark-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Boas Práticas

### 1. Configuração de Alertas

**Recomendações**:
- **Configure thresholds** realistas
- **Use agregação** para evitar spam
- **Implemente escalação** para alertas críticos
- **Teste alertas** regularmente
- **Documente** condições de alerta

### 2. Manutenção

**Tarefas regulares**:
- **Revise thresholds** mensalmente
- **Analise falsos positivos**
- **Atualize canais** de notificação
- **Limpe alertas** antigos
- **Otimize** condições de alerta

### 3. Monitoramento

**Métricas importantes**:
- **Taxa de alertas** por workflow
- **Tempo de resposta** a alertas
- **Falsos positivos** vs verdadeiros
- **Cobertura** de monitoramento

## <ion-icon name="play-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Exemplos Práticos

### Exemplo 1: Alerta de Workflow Crítico

**Workflow de Monitoramento**:
```json
{
  "name": "Critical Workflow Monitor",
  "nodes": [
    {
      "type": "scheduleTrigger",
      "name": "Check Every 5 Minutes",
      "parameters": {
        "rule": {
          "interval": [5, "minutes"]
        }
      }
    },
    {
      "type": "httpRequest",
      "name": "Check Workflow Status",
      "parameters": {
        "method": "GET",
        "url": "https://your-n8n.com/api/v1/workflows/critical-workflow/executions",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "httpBasicAuth"
      }
    },
    {
      "type": "code",
      "name": "Analyze Status",
      "parameters": {
        "jsCode": "// Verificar última execução\nconst lastExecution = $input.first().json.data[0];\nconst now = new Date();\nconst lastRun = new Date(lastExecution.startedAt);\nconst diffMinutes = (now - lastRun) / (1000 * 60);\n\nif (diffMinutes > 30) { // Não executou em 30 minutos\n  return {\n    alert: true,\n    severity: 'critical',\n    message: `Workflow crítico não executou há ${Math.round(diffMinutes)} minutos`\n  };\n}\n\nreturn { alert: false };"
      }
    },
    {
      "type": "slack",
      "name": "Send Critical Alert",
      "parameters": {
        "webhookUrl": "{{$credentials.slackWebhook}}",
        "channel": "#critical-alerts",
        "text": "🚨 {{$json.message}}"
      }
    }
  ]
}
```

### Exemplo 2: Alerta de Performance

**Monitor de Performance**:
```javascript
// Code node para monitorar performance
const executions = $input.all();
const performanceData = executions.map(exec => ({
  workflow: exec.json.workflowName,
  duration: exec.json.executionTime,
  status: exec.json.status,
  timestamp: exec.json.startedAt
}));

// Calcular métricas
const avgDuration = performanceData.reduce((sum, exec) => sum + exec.duration, 0) / performanceData.length;
const slowExecutions = performanceData.filter(exec => exec.duration > avgDuration * 2);

if (slowExecutions.length > 0) {
  return {
    alert: true,
    message: `${slowExecutions.length} execuções lentas detectadas`,
    details: {
      averageDuration: Math.round(avgDuration),
      slowExecutions: slowExecutions.map(exec => ({
        workflow: exec.workflow,
        duration: exec.duration,
        timestamp: exec.timestamp
      }))
    }
  };
}

return { alert: false };
```

### Exemplo 3: Alerta de Segurança

**Monitor de Segurança**:
```javascript
// Code node para monitorar segurança
const securityEvents = $input.all();
const suspiciousEvents = [];

securityEvents.forEach(event => {
  // Tentativas de login falhadas
  if (event.json.event === 'login_attempt' && !event.json.success) {
    if (event.json.attempts > 5) {
      suspiciousEvents.push({
        type: 'multiple_failed_logins',
        user: event.json.user,
        ip: event.json.ip,
        attempts: event.json.attempts
      });
    }
  }
  
  // Acesso a recursos sensíveis
  if (event.json.resource && event.json.resource.includes('credential')) {
    suspiciousEvents.push({
      type: 'credential_access',
      user: event.json.user,
      resource: event.json.resource,
      timestamp: event.json.timestamp
    });
  }
});

if (suspiciousEvents.length > 0) {
  return {
    alert: true,
    severity: 'high',
    message: `${suspiciousEvents.length} eventos de segurança suspeitos`,
    events: suspiciousEvents
  };
}

return { alert: false };
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Troubleshooting

### Problemas Comuns

**Alertas não funcionam**:
- Verifique configuração de credenciais
- Confirme webhooks/endpoints
- Teste conectividade
- Verifique logs de erro

**Muitos falsos positivos**:
- Ajuste thresholds
- Implemente agregação
- Revise condições
- Use dados históricos

**Alertas não chegam**:
- Verifique configuração SMTP
- Confirme webhook URLs
- Teste canais individualmente
- Verifique rate limits

### Debugging

**Ferramentas úteis**:
```bash
# Testar webhook
curl -X POST "https://hooks.slack.com/services/YOUR_WEBHOOK" \
  -H "Content-Type: application/json" \
  -d '{"text":"Test alert"}'

# Verificar logs de alerta
grep "alert" /var/log/n8n/app.log

# Testar email
echo "Test alert" | mail -s "n8n Alert Test" admin@company.com
```

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Configure alertas** básicos para workflows críticos
2. **Implemente monitoramento** de recursos do sistema
3. **Configure canais** de notificação apropriados
4. **Teste alertas** em ambiente de desenvolvimento
5. **Monitore e otimize** configurações

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[Analisar Logs](./analisar-logs)** - Análise de logs para debugging
- **[Execuções](../../usando-n8n/execucoes)** - Monitoramento de execuções
- **[Segurança](../../hosting-n8n/seguranca)** - Configurações de segurança
- **[Referência](../../referencia)** - Documentação técnica
- **[Comunidade](../../comunidade)** - Suporte e dicas

---

**<ion-icon name="notifications-outline" style={{ fontSize: '16px', color: '#ea4b71' }}></ion-icon> Pronto para alertar? Comece configurando alertas básicos para seus workflows críticos!** 