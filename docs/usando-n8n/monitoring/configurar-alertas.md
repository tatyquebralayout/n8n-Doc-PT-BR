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
    "message": "🚨 **Alerta de Workflow**\n\n*Workflow:* {{$json.workflow}}\n*Erro:* {{$json.error}}\n*Hora:* {{$json.timestamp}}\n*Severidade:* {{$json.severity}}"
  }
}
```

**Slack Block Kit**:
```json
{
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "🚨 Alerta de Workflow"
      }
    },
    {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": "*Workflow:*\n{{$json.workflow}}"
        },
        {
          "type": "mrkdwn",
          "text": "*Status:*\n{{$json.status}}"
        }
      ]
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Erro:*\n{{$json.error}}"
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Ver Workflow"
          },
          "url": "{{$json.workflowUrl}}",
          "style": "primary"
        }
      ]
    }
  ]
}
```

### 3. Webhook

**Configuração de Webhook**:
```json
{
  "type": "httpRequest",
  "name": "Send Webhook Alert",
  "parameters": {
    "url": "https://your-webhook-endpoint.com/alerts",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY"
    },
    "body": {
      "workflow": "{{$json.workflow}}",
      "error": "{{$json.error}}",
      "timestamp": "{{$json.timestamp}}",
      "severity": "{{$json.severity}}",
      "environment": "production"
    }
  }
}
```

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Estratégias de Alerta

### 1. Alertas Inteligentes

**Análise de Tendências**:
```javascript
// Code node para análise de tendências
const recentExecutions = $input.all();
const avgExecutionTime = recentExecutions.reduce((sum, exec) => 
  sum + exec.json.executionTime, 0) / recentExecutions.length;

const currentExecution = $input.first().json.executionTime;
const threshold = avgExecutionTime * 1.5; // 50% acima da média

if (currentExecution > threshold) {
  return {
    alert: true,
    severity: 'warning',
    message: `Execução ${Math.round($json.executionTime / 1000)}s acima do normal (${Math.round(threshold / 1000)}s)`,
    trend: 'increasing',
    avgTime: avgExecutionTime
  };
}

return { alert: false };
```

### 2. Escalação de Alertas

**Níveis de Escalação**:
```javascript
const escalationLevels = {
  level1: { delay: 0, channels: ['slack'] },
  level2: { delay: 300000, channels: ['slack', 'email'] }, // 5 min
  level3: { delay: 900000, channels: ['slack', 'email', 'sms'] } // 15 min
};

// Verificar se já houve alertas recentes
const alertCount = await getAlertCount($workflow.name, 3600000); // 1 hora

if (alertCount === 0) {
  return { level: 'level1', channels: escalationLevels.level1.channels };
} else if (alertCount < 3) {
  return { level: 'level2', channels: escalationLevels.level2.channels };
} else {
  return { level: 'level3', channels: escalationLevels.level3.channels };
}
```

### 3. Agregação de Alertas

**Agrupar Alertas Similares**:
```javascript
// Code node para agregação
const recentAlerts = await getRecentAlerts($workflow.name, 300000); // 5 min
const similarAlerts = recentAlerts.filter(alert => 
  alert.errorType === $input.first().json.errorType
);

if (similarAlerts.length > 0) {
  // Agregar com alerta existente
  return {
    aggregate: true,
    alertId: similarAlerts[0].id,
    count: similarAlerts.length + 1,
    message: `${similarAlerts.length + 1} erros similares em 5 minutos`
  };
}

// Criar novo alerta
return {
  aggregate: false,
  newAlert: true,
  recentExecutions: await getRecentExecutions($workflow.name, 10)
};
```

## <ion-icon name="checkmark-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Boas Práticas

### 1. Configuração de Alertas

- **Use agregação** para evitar spam
- **Implemente escalação** para alertas críticos
- **Configure timeouts** apropriados
- **Teste alertas** regularmente
- **Documente procedimentos** de resposta

### 2. Manutenção

- **Atualize canais** de notificação
- **Revise thresholds** periodicamente
- **Monitore falsos positivos**
- **Ajuste configurações** baseado em dados
- **Treine equipe** em procedimentos

### 3. Monitoramento

- **Configure dashboards** de alertas
- **Implemente métricas** de resposta
- **Analise tendências** de alertas
- **Otimize configurações** continuamente
- **Documente incidentes** e resoluções

## <ion-icon name="play-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Exemplos Práticos

### Exemplo 1: Alerta de Workflow Crítico

**Configuração**:
```json
{
  "name": "Monitor Workflow Crítico",
  "nodes": [
    {
      "type": "httpRequest",
      "name": "Check Last Execution",
      "parameters": {
        "url": "https://your-n8n.com/api/v1/workflows/critical-workflow/executions",
        "method": "GET",
        "headers": {
          "Authorization": "Bearer YOUR_API_KEY"
        }
      }
    },
    {
      "type": "code",
      "name": "Analyze Execution",
      "parameters": {
        "jsCode": "// Verificar última execução\nconst lastExecution = $input.first().json.data[0];\nconst now = new Date();\nconst lastRun = new Date(lastExecution.startedAt);\nconst diffMinutes = (now - lastRun) / (1000 * 60);\n\nif (diffMinutes > 30) { // Não executou em 30 minutos\n  return {\n    alert: true,\n    severity: 'critical',\n    message: `Workflow crítico não executou há ${Math.round(diffMinutes)} minutos`\n  };\n}\n\nreturn { alert: false };"
      }
    },
    {
      "type": "if",
      "name": "Check Alert",
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "id": "condition1",
              "leftValue": "={{$json.alert}}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equal"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      }
    },
    {
      "type": "slack",
      "name": "Send Critical Alert",
      "parameters": {
        "webhookUrl": "https://hooks.slack.com/services/YOUR_WEBHOOK",
        "channel": "#critical-alerts",
        "message": "🚨 **ALERTA CRÍTICO**\n\nWorkflow crítico não executou há {{$json.diffMinutes}} minutos!\n\n*Ação imediata necessária.*"
      }
    }
  ]
}
```

### Exemplo 2: Monitoramento de Performance

**Configuração**:
```javascript
// Code node para monitoramento de performance
const executions = $input.all();
const recentExecutions = executions.slice(-10); // Últimas 10 execuções

const avgTime = recentExecutions.reduce((sum, exec) => 
  sum + exec.json.executionTime, 0) / recentExecutions.length;

const currentTime = $input.first().json.executionTime;
const threshold = avgTime * 2; // Dobro da média

if (currentTime > threshold) {
  return {
    alert: true,
    severity: 'warning',
    message: `Performance degradada: ${Math.round(currentTime / 1000)}s (média: ${Math.round(avgTime / 1000)}s)`,
    currentTime: currentTime,
    avgTime: avgTime,
    threshold: threshold
  };
}

return { alert: false };
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Troubleshooting

### Problemas Comuns

**Alertas não funcionam**:
- Verifique configuração de credenciais
- Confirme URLs de webhook
- Valide formato de mensagens
- Teste conectividade de rede

**Falsos positivos**:
- Ajuste thresholds baseado em dados reais
- Implemente filtros mais específicos
- Use agregação para reduzir ruído
- Configure delays apropriados

**Alertas perdidos**:
- Verifique logs de execução
- Confirme configuração de triggers
- Teste canais de notificação
- Valide condições de alerta

### Debugging

**Logs de Debug**:
```javascript
// Adicione logs para debugging
console.log('Alert data:', $input.first().json);
console.log('Threshold:', threshold);
console.log('Condition met:', conditionMet);
```

**Teste de Conectividade**:
```bash
# Teste webhook
curl -X POST "https://hooks.slack.com/services/YOUR_WEBHOOK" \
  -H "Content-Type: application/json" \
  -d '{"text":"Teste de conectividade"}'

# Teste SMTP
telnet smtp.gmail.com 587
```

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Configure alertas** básicos para workflows críticos
2. **Implemente monitoramento** de performance
3. **Configure canais** de notificação
4. **Teste e refine** configurações
5. **Documente procedimentos** de resposta

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- [Monitoramento de Workflows](../execucoes/)
- [Tratamento de Erros](../../logica-e-dados/01-flow-logic/error-handling.md)
- [Configuração de Credenciais](../credenciais/)
- [API do n8n](../../api/referencia/referencia-api.md)
- [Comunidade n8n](../../comunidade/)

---

**<ion-icon name="notifications-outline" style={{ fontSize: '16px', color: '#ea4b71' }}></ion-icon> Pronto para alertar? Comece configurando alertas básicos para seus workflows críticos!** 