---
sidebar_position: 2
title: Visualizar Execuções
description: Como acompanhar e analisar execuções de workflows no n8n
keywords: [n8n, execuções, visualizar, status, histórico, resultados]
---


#  Visualizar Execuções

Aprenda como acompanhar o status, analisar resultados e entender o que aconteceu em cada execução dos seus workflows.

---

##  1 | Onde Encontrar Execuções

###  Menu de Execuções

1. **Acesse o menu lateral** → Clique em **"Execuções"**
2. **Visualize todas as execuções** recentes
3. **Filtre por workflow** específico
4. **Pesquise** por data, status ou conteúdo

###  Histórico de Execuções

**Informações disponíveis:**
- **Data e hora** da execução
- **Workflow** executado
- **Status** (Sucesso, Erro, Em andamento)
- **Duração** da execução
- **Trigger** que iniciou

---

##  2 | Status das Execuções

###  Status de Sucesso

**Características:**
- **Cor verde** no indicador
- **Todos os nodes** executaram com sucesso
- **Dados processados** conforme esperado
- **Logs limpos** sem erros

###  Status de Erro

**Características:**
- **Cor vermelha** no indicador
- **Um ou mais nodes** falharam
- **Execução interrompida** no ponto de falha
- **Logs com detalhes** do erro

###  Status de Aguardando

**Características:**
- **Cor amarela** no indicador
- **Workflow pausado** temporariamente
- **Aguardando input** manual ou condição
- **Pode ser retomado** quando necessário

###  Status de Em Andamento

**Características:**
- **Cor azul** no indicador
- **Execução ativa** no momento
- **Nodes sendo processados** sequencialmente
- **Tempo real** de progresso

---

##  3 | Detalhes da Execução

###  Informações Gerais

**Ao clicar em uma execução:**

```json
{
  "executionId": "abc123-def456-ghi789",
  "workflowName": "Enviar Relatório Diário",
  "startTime": "2024-01-15T09:00:00Z",
  "endTime": "2024-01-15T09:02:30Z",
  "duration": "2m 30s",
  "status": "success",
  "trigger": "schedule",
  "nodesExecuted": 5,
  "dataProcessed": 150
}
```

###  Fluxo de Execução

**Visualização do caminho:**

1. **Trigger** → Iniciou a execução
2. **Node 1** → Processou dados (200ms)
3. **Node 2** → Fez requisição HTTP (1.5s)
4. **Node 3** → Transformou dados (100ms)
5. **Node 4** → Enviou notificação (500ms)
6. **Finalizado** → Sucesso total

---

##  4 | Análise de Performance

###  Métricas de Tempo

**Tempos importantes:**

| Métrica | Descrição | Exemplo |
|---------|-----------|---------|
| **Tempo Total** | Duração completa da execução | 2m 30s |
| **Tempo por Node** | Tempo gasto em cada node | Node 2: 1.5s |
| **Tempo de Espera** | Tempo entre nodes | 100ms |
| **Tempo de Processamento** | Tempo ativo de processamento | 2m 15s |

###  Análise de Tendências

**Compare execuções:**

- **Performance ao longo do tempo**
- **Padrões de uso** (horários, dias)
- **Crescimento** no volume de dados
- **Melhorias** após otimizações

---

##  5 | Filtros e Busca

###  Filtros Disponíveis

**Filtre execuções por:**

- **Status**: Sucesso, Erro, Em andamento
- **Workflow**: Nome específico do workflow
- **Data**: Período de tempo
- **Trigger**: Tipo de gatilho
- **Duração**: Tempo de execução

###  Busca Avançada

**Pesquise por:**

- **ID da execução** específico
- **Conteúdo** dos dados processados
- **Mensagens de erro** específicas
- **Usuário** que executou
- **Tags** ou metadados

---

##  6 | Exportar e Compartilhar

###  Exportar Dados

**Formatos disponíveis:**

- **JSON**: Dados completos da execução
- **CSV**: Dados tabulares para análise
- **PDF**: Relatório formatado
- **Logs**: Arquivo de texto com logs

###  Compartilhar Execuções

**Opções de compartilhamento:**

- **Link direto** para a execução
- **Screenshot** do resultado
- **Relatório** resumido
- **Dados específicos** selecionados

---

##  7 | Configurações de Visualização

###  Personalizar Interface

**Configurações disponíveis:**

```json
{
  "display": {
    "showTimestamps": true,
    "showDuration": true,
    "showDataSize": true,
    "autoRefresh": false,
    "refreshInterval": 30
  },
  "filters": {
    "defaultStatus": "all",
    "defaultTimeRange": "24h",
    "maxResults": 100
  }
}
```

###  Ocultar Informações Sensíveis

**Proteja dados sensíveis:**

- **Mascarar** credenciais nos logs
- **Ocultar** dados pessoais
- **Reduzir** detalhes de debug
- **Limitar** acesso por usuário

---

##  8 | Próximos passos

1. **[Analisar Logs](./analisar-logs)** - Investigar problemas detalhadamente
2. **[Configurar Alertas](./configurar-alertas)** - Receber notificações automáticas
3. **[Otimizar Performance](../workflows/otimizar)** - Melhorar tempos de execução

> *Agora você sabe como acompanhar suas execuções. Use essas informações para manter seus workflows funcionando perfeitamente!*

---

:::tip **Dica Pro**
Configure alertas para execuções que falham ou demoram mais que o esperado. Isso ajuda a identificar problemas rapidamente.
:::

:::warning **Importante**
Mantenha logs de execuções por pelo menos 30 dias para análise de tendências e troubleshooting.
:::

:::info **Recurso Adicional**
Use a API do n8n para integrar dados de execução com ferramentas externas de monitoramento como Grafana ou Datadog.
::: 
