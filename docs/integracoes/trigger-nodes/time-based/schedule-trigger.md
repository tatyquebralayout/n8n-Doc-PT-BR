---
title: Schedule Trigger
description: Guia completo sobre o Schedule Trigger no n8n, incluindo agendamento, cron, exemplos práticos e boas práticas
sidebar_position: 2
keywords: [n8n, schedule trigger, agendamento, cron, execução automática, tempo, automação]
---

# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Schedule Trigger

O **Schedule Trigger** é uma ferramenta essencial do n8n para automação baseada em tempo. Ele permite executar workflows automaticamente em horários específicos, criando automações verdadeiramente independentes de intervenção humana.

## O que é o Schedule Trigger?

O **Schedule Trigger** permite:

- **Executar workflows** automaticamente em horários específicos
- **Agendar tarefas** recorrentes (diárias, semanais, mensais)
- **Criar automações** baseadas em tempo
- **Sincronizar dados** periodicamente
- **Gerar relatórios** automáticos
- **Manter sistemas** atualizados

### Quando Usar o Schedule Trigger

- **Backup** automático de dados
- **Sincronização** periódica entre sistemas
- **Relatórios** diários, semanais ou mensais
- **Limpeza** automática de dados antigos
- **Monitoramento** contínuo de sistemas
- **Processamento** em lotes programados

## Configuração Básica

### Estrutura do Schedule Trigger

```javascript
// Schedule Trigger - Estrutura básica
{
  "rule": {
    "interval": [
      {
        "field": "minute",
        "value": 0
      },
      {
        "field": "hour",
        "value": 9
      }
    ]
  },
  "options": {
    "timezone": "America/Sao_Paulo"
  }
}
```

### Tipos de Agendamento

#### 1. Agendamento Simples

```javascript
// Executar todos os dias às 9h
{
  "rule": {
    "interval": [
      {
        "field": "minute",
        "value": 0
      },
      {
        "field": "hour",
        "value": 9
      }
    ]
  }
}

// Executar a cada 30 minutos
{
  "rule": {
    "interval": [
      {
        "field": "minute",
        "value": "*/30"
      }
    ]
  }
}
```

#### 2. Agendamento com Cron

```javascript
// Executar às 8h, 12h e 18h todos os dias
{
  "rule": {
    "cronExpression": "0 8,12,18 * * *"
  }
}

// Executar às 9h de segunda a sexta
{
  "rule": {
    "cronExpression": "0 9 * * 1-5"
  }
}

// Executar no primeiro dia do mês às 6h
{
  "rule": {
    "cronExpression": "0 6 1 * *"
  }
}
```

#### 3. Agendamento Avançado

```javascript
// Executar a cada 2 horas durante horário comercial
{
  "rule": {
    "interval": [
      {
        "field": "minute",
        "value": 0
      },
      {
        "field": "hour",
        "value": "*/2"
      }
    ]
  },
  "options": {
    "timezone": "America/Sao_Paulo"
  }
}
```

## Exemplos Práticos

### 1. Backup Diário

```javascript
// Schedule Trigger - Backup diário às 2h da manhã
{
  "rule": {
    "interval": [
      {
        "field": "minute",
        "value": 0
      },
      {
        "field": "hour",
        "value": 2
      }
    ]
  },
  "options": {
    "timezone": "America/Sao_Paulo"
  }
}
```

**Workflow:**
```
Schedule Trigger → Database (exportar dados) → Cloud Storage (salvar backup) → Email (notificar conclusão)
```

### 2. Sincronização de Dados

```javascript
// Schedule Trigger - Sincronizar a cada 15 minutos
{
  "rule": {
    "interval": [
      {
        "field": "minute",
        "value": "*/15"
      }
    ]
  }
}
```

**Workflow:**
```
Schedule Trigger → API Externa (buscar dados) → Database (atualizar) → Log (registrar mudanças)
```

### 3. Relatório Semanal

```javascript
// Schedule Trigger - Relatório toda segunda às 8h
{
  "rule": {
    "cronExpression": "0 8 * * 1"
  },
  "options": {
    "timezone": "America/Sao_Paulo"
  }
}
```

**Workflow:**
```
Schedule Trigger → Database (consultar dados da semana) → Code (processar relatório) → Email (enviar relatório)
```

### 4. Limpeza Mensal

```javascript
// Schedule Trigger - Limpeza no primeiro dia do mês às 3h
{
  "rule": {
    "cronExpression": "0 3 1 * *"
  }
}
```

**Workflow:**
```
Schedule Trigger → Database (identificar dados antigos) → Delete (remover dados) → Log (registrar limpeza)
```

### 5. Monitoramento Contínuo

```javascript
// Schedule Trigger - Monitorar a cada 5 minutos
{
  "rule": {
    "interval": [
      {
        "field": "minute",
        "value": "*/5"
      }
    ]
  }
}
```

**Workflow:**
```
Schedule Trigger → HTTP Request (verificar status) → If (status ok?) → Slack (alertar se erro)
```

## Casos de Uso Avançados

### 1. Agendamento Condicional

```javascript
// Code Node - Verificar se deve executar
const verificarExecucao = () => {
  const agora = new Date();
  const hora = agora.getHours();
  const diaSemana = agora.getDay();
  
  // Executar apenas em horário comercial (segunda a sexta, 8h às 18h)
  const horarioComercial = diaSemana >= 1 && diaSemana <= 5 && hora >= 8 && hora <= 18;
  
  // Executar apenas se não for feriado
  const feriados = ['2024-01-01', '2024-12-25']; // Exemplo
  const hoje = agora.toISOString().split('T')[0];
  const naoFeriado = !feriados.includes(hoje);
  
  return horarioComercial && naoFeriado;
};

// Schedule Trigger - A cada hora
{
  "rule": {
    "interval": [
      {
        "field": "minute",
        "value": 0
      }
    ]
  }
}

// If Node - Verificar condições
{
  "condition": "{{ verificarExecucao() }}",
  "true": "Executar Workflow",
  "false": "Pular Execução"
}
```

### 2. Agendamento Dinâmico

```javascript
// Code Node - Calcular próximo agendamento
const calcularProximoAgendamento = () => {
  const agora = new Date();
  const proximaExecucao = new Date(agora);
  
  // Próxima execução às 9h do próximo dia útil
  proximaExecucao.setDate(proximaExecucao.getDate() + 1);
  proximaExecucao.setHours(9, 0, 0, 0);
  
  // Ajustar para próximo dia útil se for fim de semana
  const diaSemana = proximaExecucao.getDay();
  if (diaSemana === 0) { // Domingo
    proximaExecucao.setDate(proximaExecucao.getDate() + 1);
  } else if (diaSemana === 6) { // Sábado
    proximaExecucao.setDate(proximaExecucao.getDate() + 2);
  }
  
  return proximaExecucao.toISOString();
};

// Schedule Trigger - Diário às 9h
{
  "rule": {
    "interval": [
      {
        "field": "minute",
        "value": 0
      },
      {
        "field": "hour",
        "value": 9
      }
    ]
  }
}
```

### 3. Agendamento com Retry

```javascript
// Schedule Trigger - Executar a cada 30 minutos
{
  "rule": {
    "interval": [
      {
        "field": "minute",
        "*/30"
      }
    ]
  }
}

// Code Node - Lógica com retry
const executarComRetry = async (operacao, maxTentativas = 3) => {
  for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
    try {
      const resultado = await operacao();
      console.log(`Execução bem-sucedida na tentativa ${tentativa}`);
      return resultado;
    } catch (error) {
      console.error(`Tentativa ${tentativa} falhou:`, error.message);
      
      if (tentativa === maxTentativas) {
        throw new Error(`Falha após ${maxTentativas} tentativas`);
      }
      
      // Aguardar antes da próxima tentativa
      await new Promise(resolve => setTimeout(resolve, 5000 * tentativa));
    }
  }
};
```

### 4. Agendamento com Dados Dinâmicos

```javascript
// Schedule Trigger - Executar a cada hora
{
  "rule": {
    "interval": [
      {
        "field": "minute",
        "value": 0
      }
    ]
  }
}

// Code Node - Gerar dados baseados no horário
const gerarDadosPorHorario = () => {
  const agora = new Date();
  const hora = agora.getHours();
  
  const configuracao = {
    hora_execucao: hora,
    periodo: hora < 12 ? 'manha' : hora < 18 ? 'tarde' : 'noite',
    prioridade: hora >= 9 && hora <= 17 ? 'alta' : 'baixa',
    destinatarios: hora < 12 ? ['equipe_manha'] : ['equipe_tarde']
  };
  
  return configuracao;
};
```

## Expressões Cron

### Sintaxe Básica

```javascript
// Formato: minuto hora dia mês dia_semana
"0 9 * * *"     // Todos os dias às 9h
"0 */2 * * *"   // A cada 2 horas
"0 8 * * 1-5"   // Segunda a sexta às 8h
"0 0 1 * *"     // Primeiro dia do mês à meia-noite
"0 12 * * 0"    // Domingo ao meio-dia
```

### Exemplos Comuns

```javascript
// Backup diário às 2h
"0 2 * * *"

// Limpeza semanal no domingo às 3h
"0 3 * * 0"

// Relatório mensal no primeiro dia às 8h
"0 8 1 * *"

// Monitoramento a cada 15 minutos
"*/15 * * * *"

// Sincronização a cada 2 horas durante o dia
"0 8-18/2 * * 1-5"

// Backup trimestral (primeiro dia de janeiro, abril, julho, outubro)
"0 2 1 1,4,7,10 *"
```

## Boas Práticas

### 1. Escolha de Horários

```javascript
// ✅ Bom: Horários de baixo tráfego
{
  "cronExpression": "0 2 * * *"  // 2h da manhã
}

// ❌ Evitar: Horários de pico
{
  "cronExpression": "0 9 * * *"  // 9h da manhã (horário comercial)
}
```

### 2. Frequência Adequada

```javascript
// ✅ Bom: Frequência baseada na necessidade
{
  "cronExpression": "0 */6 * * *"  // A cada 6 horas
}

// ❌ Evitar: Frequência muito alta
{
  "cronExpression": "*/1 * * * *"  // A cada minuto
}
```

### 3. Timezone Correto

```javascript
// ✅ Bom: Especificar timezone
{
  "rule": {
    "cronExpression": "0 9 * * *"
  },
  "options": {
    "timezone": "America/Sao_Paulo"
  }
}

// ❌ Evitar: Usar timezone padrão
{
  "rule": {
    "cronExpression": "0 9 * * *"
  }
}
```

### 4. Tratamento de Erros

```javascript
// ✅ Bom: Implementar tratamento de erros
const executarComTratamento = async () => {
  try {
    const resultado = await operacao();
    console.log('Execução bem-sucedida:', resultado);
    return resultado;
  } catch (error) {
    console.error('Erro na execução:', error.message);
    
    // Notificar erro
    await notificarErro(error);
    
    // Registrar para análise
    await registrarErro(error);
    
    throw error;
  }
};
```

## Troubleshooting

### Problemas Comuns

#### Workflow não executa
- Verifique se o Schedule Trigger está ativo
- Confirme se o timezone está correto
- Teste com agendamento simples
- Verifique logs de execução

#### Execução em horário errado
- Verifique configuração de timezone
- Confirme sintaxe da expressão cron
- Teste com horário específico
- Use Debug Helper para verificar

#### Execução duplicada
- Verifique se não há múltiplos Schedule Triggers
- Confirme se o workflow não está sendo executado por outros meios
- Implemente controle de concorrência
- Use locks ou flags

### Debug

```javascript
// Code Node - Debug de Schedule Trigger
const debugSchedule = () => {
  const agora = new Date();
  
  console.log('=== DEBUG SCHEDULE TRIGGER ===');
  console.log('Data/hora atual:', agora.toISOString());
  console.log('Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
  console.log('Dia da semana:', agora.getDay());
  console.log('Hora:', agora.getHours());
  console.log('Minuto:', agora.getMinutes());
  console.log('=============================');
  
  return {
    timestamp: agora.toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dia_semana: agora.getDay(),
    hora: agora.getHours(),
    minuto: agora.getMinutes()
  };
};

// Usar no início do workflow
return { json: debugSchedule() };
```

## Integração com Outros Nodes

### 1. Schedule Trigger + Set Node

```javascript
// Schedule Trigger - Executar diariamente às 8h
{
  "rule": {
    "cronExpression": "0 8 * * *"
  }
}

// Set Node - Adicionar metadados
{
  "mode": "keepAllSet",
  "values": {
    "string": [
      {
        "name": "tipo_execucao",
        "value": "agendada"
      },
      {
        "name": "timestamp_execucao",
        "value": "{{ $now.toISOString() }}"
      },
      {
        "name": "workflow_id",
        "value": "{{ $workflow.id }}"
      }
    ]
  }
}
```

### 2. Schedule Trigger + If Node

```javascript
// Schedule Trigger - Executar a cada hora
{
  "rule": {
    "interval": [
      {
        "field": "minute",
        "value": 0
      }
    ]
  }
}

// If Node - Verificar horário comercial
{
  "condition": "{{ new Date().getHours() >= 8 && new Date().getHours() <= 18 }}",
  "true": "Processamento Normal",
  "false": "Processamento Reduzido"
}
```

### 3. Schedule Trigger + HTTP Request

```javascript
// Schedule Trigger - Executar a cada 15 minutos
{
  "rule": {
    "interval": [
      {
        "field": "minute",
        "value": "*/15"
      }
    ]
  }
}

// HTTP Request - Verificar status da API
{
  "url": "https://api.exemplo.com/health",
  "method": "GET",
  "timeout": 10000
}

// If Node - Verificar resposta
{
  "condition": "{{ $json.status === 'ok' }}",
  "true": "API Funcionando",
  "false": "API com Problemas"
}
```

## Próximos Passos

- [Manual Trigger](/integracoes/trigger-nodes/time-based/manual-trigger) - Execução manual
- [Webhook Trigger](/integracoes/trigger-nodes/event-based/webhook-trigger) - Eventos externos
- [If Node](/integracoes/builtin-nodes/logic-control/if) - Controle de fluxo
- [Set Node](/integracoes/builtin-nodes/data-processing/set) - Manipulação de dados
- [Monitoring](/usando-n8n/monitoring/index) - Monitorar execuções
