---
sidebar_position: 5
title: Execução de Workflows
description: Como executar workflows e entender os diferentes modos de execução no n8n
keywords: [n8n, execução, workflows, triggers, modos, estados]
---

# <ion-icon name="play-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Execução de Workflows

A execução é o processo pelo qual um workflow é ativado e processado pelo n8n. Entender os diferentes modos de execução é fundamental para criar automações eficientes e confiáveis.

## <ion-icon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que é Execução?

Execução é o processo de:

- **Ativar** um workflow através de um trigger
- **Processar** dados através dos nodes
- **Executar** operações definidas
- **Retornar** resultados ou erros

### Componentes da Execução

- **Trigger**: Inicia a execução
- **Nodes**: Processam dados
- **Conexões**: Definem fluxo
- **Resultado**: Saída final

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Modos de Execução

### Manual Execution

Execução iniciada pelo usuário:

- **Trigger**: Manual Trigger
- **Controle**: Total pelo usuário
- **Uso**: Testes e execuções pontuais
- **Dados**: Definidos pelo usuário

#### Como Usar

1. **Abra** o workflow
2. **Clique** em "Execute Workflow"
3. **Configure** dados de entrada (opcional)
4. **Execute** e monitore resultados

### Automatic Execution

Execução baseada em eventos ou tempo:

- **Trigger**: Schedule, Webhook, Event
- **Controle**: Automático
- **Uso**: Automações contínuas
- **Dados**: Baseados no trigger

#### Tipos de Triggers Automáticos

- **Schedule**: Baseado em tempo
- **Webhook**: Baseado em HTTP requests
- **Event**: Baseado em eventos de apps
- **Polling**: Verificação periódica

### API Execution

Execução via API REST:

- **Trigger**: HTTP request para API
- **Controle**: Programático
- **Uso**: Integração com sistemas externos
- **Dados**: Enviados via API

#### Endpoint da API

```bash
POST /api/v1/workflows/{id}/trigger
Content-Type: application/json

{
  "data": {
    "nome": "João Silva",
    "email": "joao@exemplo.com"
  }
}
```

## <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Estados de Execução

### Success

Execução concluída com sucesso:

- **Status**: Verde
- **Significado**: Todos os nodes executaram
- **Ação**: Dados processados normalmente
- **Log**: Detalhes completos disponíveis

### Error

Execução falhou:

- **Status**: Vermelho
- **Significado**: Erro em algum node
- **Ação**: Workflow parou ou usou error handling
- **Log**: Detalhes do erro disponíveis

### Waiting

Execução aguardando:

- **Status**: Amarelo
- **Significado**: Aguardando input ou condição
- **Ação**: Pausado temporariamente
- **Log**: Status de espera

### Running

Execução em andamento:

- **Status**: Azul
- **Significado**: Processando ativamente
- **Ação**: Executando nodes
- **Log**: Progresso em tempo real

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Tipos de Execução

### Single Execution

Execução de um item por vez:

- **Comportamento**: Processa um item
- **Performance**: Mais lento para muitos itens
- **Memória**: Menor uso
- **Debugging**: Mais fácil

### Batch Execution

Execução de múltiplos itens:

- **Comportamento**: Processa vários itens
- **Performance**: Mais rápido
- **Memória**: Maior uso
- **Debugging**: Mais complexo

### Parallel Execution

Execução simultânea:

- **Comportamento**: Múltiplas execuções simultâneas
- **Performance**: Máxima velocidade
- **Recursos**: Alto uso de CPU/memória
- **Limitações**: Rate limits de APIs

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurações de Execução

### Timeout

Define tempo limite para execução:

```bash
# Configurar timeout global
N8N_TIMEOUT=300000  # 5 minutos

# Configurar timeout por node
# No node: Settings → Timeout
```

### Retry Logic

Configurar tentativas automáticas:

```javascript
// Configurar retry no node
{
  "retryOnFail": true,
  "maxTries": 3,
  "waitBetweenTries": 5000
}
```

### Rate Limiting

Controlar velocidade de execução:

```javascript
// Configurar delay entre execuções
{
  "options": {
    "delay": 1000  // 1 segundo
  }
}
```

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Monitoramento de Execução

### Execution Log

Histórico detalhado de execuções:

- **Dados de entrada**: O que foi recebido
- **Dados de saída**: O que foi processado
- **Tempo de execução**: Performance
- **Erros**: Detalhes de falhas

### Performance Metrics

Métricas de performance:

- **Tempo total**: Duração da execução
- **Tempo por node**: Performance individual
- **Uso de memória**: Consumo de recursos
- **Throughput**: Itens processados por segundo

### Real-time Monitoring

Monitoramento em tempo real:

- **Status atual**: Estado da execução
- **Progresso**: Porcentagem concluída
- **Logs live**: Logs em tempo real
- **Alertas**: Notificações de problemas

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Problemas Comuns

### Timeout Errors

**Problema:** Execução demora muito

**Soluções:**
- Aumentar timeout
- Otimizar workflow
- Usar processamento em lotes
- Implementar cache

### Memory Issues

**Problema:** Uso excessivo de memória

**Soluções:**
- Processar em lotes menores
- Limpar dados desnecessários
- Usar streaming quando possível
- Monitorar uso de recursos

### Rate Limiting

**Problema:** APIs bloqueiam por excesso de requests

**Soluções:**
- Implementar delays
- Usar rate limiting
- Distribuir carga
- Implementar retry com backoff

### Infinite Loops

**Problema:** Workflow executa indefinidamente

**Soluções:**
- Verificar condições de parada
- Implementar contadores
- Usar timeouts
- Testar com dados limitados

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Debugging de Execução

### Step-by-Step Debugging

1. **Execute manualmente** para controle total
2. **Verifique dados** em cada node
3. **Analise logs** detalhadamente
4. **Teste condições** individualmente

### Log Analysis

```javascript
// Log no início da execução
{{ console.log('Iniciando execução:', $now) }}

// Log de dados importantes
{{ console.log('Dados processados:', $json) }}

// Log de performance
{{ console.log('Tempo de execução:', Date.now() - startTime) }}
```

### Error Tracking

- **Capture erros** com error handling
- **Log detalhes** de falhas
- **Implemente alertas** para problemas
- **Monitore tendências** de erro

## <ion-icon name="trending-up-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Otimização

### Performance

- **Processe em lotes** quando possível
- **Use cache** para dados repetitivos
- **Implemente filtros** antecipados
- **Monitore recursos** de sistema

### Reliability

- **Implemente retry logic** robusto
- **Use error handling** adequado
- **Teste com dados reais** antes de produção
- **Monitore execuções** continuamente

### Scalability

- **Use subworkflows** para modularizar
- **Implemente load balancing** quando necessário
- **Distribua carga** entre múltiplas instâncias
- **Monitore capacidade** do sistema

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **[Execution Order](../01-flow-logic/execution-order)** - Entender ordem de execução
2. **[Error Handling](../01-flow-logic/error-handling)** - Tratamento robusto de erros
3. **[Monitoring](../usando-n8n/monitoring/)** - Monitoramento de workflows

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Úteis

### Documentação Relacionada

- **[Execution Order](../01-flow-logic/execution-order)** - Ordem de execução
- **[Error Handling](../01-flow-logic/error-handling)** - Tratamento de erros
- **[Monitoring](../usando-n8n/monitoring/)** - Monitoramento

### Links Externos

- **[n8n Execution](https://docs.n8n.io/workflows/execution/)** - Documentação oficial
- **[n8n API](https://docs.n8n.io/api/)** - API de execução
- **[n8n Community](https://community.n8n.io/)** - Fórum para dúvidas

---

**<ion-icon name="play-circle-outline" style={{ fontSize: '16px', color: '#ea4b71' }}></ion-icon> Execuções bem configuradas garantem workflows confiáveis e eficientes!** 