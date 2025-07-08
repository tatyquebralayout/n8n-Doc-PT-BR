---
sidebar_position: 2
title: Visualizar Execuções
description: Como acompanhar e analisar execuções de workflows no n8n
keywords: [n8n, execuções, visualizar, status, histórico, resultados]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="eye-outline" size={32} color="#ea4b71" /> Visualizar Execuções

Aprenda como acompanhar o status, analisar resultados e entender o que aconteceu em cada execução dos seus workflows.

---

## <IonicIcon name="list-outline" size={24} color="#ea4b71" /> 1 | Onde Encontrar Execuções

### <IonicIcon name="apps-outline" size={20} color="#10b981" /> Menu de Execuções

1. **Acesse o menu lateral** → Clique em **"Execuções"**
2. **Visualize todas as execuções** recentes
3. **Filtre por workflow** específico
4. **Pesquise** por data, status ou conteúdo

### <IonicIcon name="time-outline" size={20} color="#10b981" /> Histórico de Execuções

**Informações disponíveis:**
- **Data e hora** da execução
- **Workflow** executado
- **Status** (Sucesso, Erro, Em andamento)
- **Duração** da execução
- **Trigger** que iniciou

---

## <IonicIcon name="color-palette-outline" size={24} color="#ea4b71" /> 2 | Status das Execuções

### <IonicIcon name="checkmark-circle-outline" size={20} color="#10b981" /> Status de Sucesso

**Características:**
- **Cor verde** no indicador
- **Todos os nodes** executaram com sucesso
- **Dados processados** conforme esperado
- **Logs limpos** sem erros

### <IonicIcon name="close-circle-outline" size={20} color="#ef4444" /> Status de Erro

**Características:**
- **Cor vermelha** no indicador
- **Um ou mais nodes** falharam
- **Execução interrompida** no ponto de falha
- **Logs com detalhes** do erro

### <IonicIcon name="pause-circle-outline" size={20} color="#f59e0b" /> Status de Aguardando

**Características:**
- **Cor amarela** no indicador
- **Workflow pausado** temporariamente
- **Aguardando input** manual ou condição
- **Pode ser retomado** quando necessário

### <IonicIcon name="play-circle-outline" size={20} color="#3b82f6" /> Status de Em Andamento

**Características:**
- **Cor azul** no indicador
- **Execução ativa** no momento
- **Nodes sendo processados** sequencialmente
- **Tempo real** de progresso

---

## <IonicIcon name="document-text-outline" size={24} color="#ea4b71" /> 3 | Detalhes da Execução

### <IonicIcon name="information-circle-outline" size={20} color="#10b981" /> Informações Gerais

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

### <IonicIcon name="git-branch-outline" size={20} color="#10b981" /> Fluxo de Execução

**Visualização do caminho:**

1. **Trigger** → Iniciou a execução
2. **Node 1** → Processou dados (200ms)
3. **Node 2** → Fez requisição HTTP (1.5s)
4. **Node 3** → Transformou dados (100ms)
5. **Node 4** → Enviou notificação (500ms)
6. **Finalizado** → Sucesso total

---

## <IonicIcon name="analytics-outline" size={24} color="#ea4b71" /> 4 | Análise de Performance

### <IonicIcon name="speedometer-outline" size={20} color="#10b981" /> Métricas de Tempo

**Tempos importantes:**

| Métrica | Descrição | Exemplo |
|---------|-----------|---------|
| **Tempo Total** | Duração completa da execução | 2m 30s |
| **Tempo por Node** | Tempo gasto em cada node | Node 2: 1.5s |
| **Tempo de Espera** | Tempo entre nodes | 100ms |
| **Tempo de Processamento** | Tempo ativo de processamento | 2m 15s |

### <IonicIcon name="trending-up-outline" size={20} color="#10b981" /> Análise de Tendências

**Compare execuções:**

- **Performance ao longo do tempo**
- **Padrões de uso** (horários, dias)
- **Crescimento** no volume de dados
- **Melhorias** após otimizações

---

## <IonicIcon name="search-outline" size={24} color="#ea4b71" /> 5 | Filtros e Busca

### <IonicIcon name="funnel-outline" size={20} color="#10b981" /> Filtros Disponíveis

**Filtre execuções por:**

- **Status**: Sucesso, Erro, Em andamento
- **Workflow**: Nome específico do workflow
- **Data**: Período de tempo
- **Trigger**: Tipo de gatilho
- **Duração**: Tempo de execução

### <IonicIcon name="search-circle-outline" size={20} color="#10b981" /> Busca Avançada

**Pesquise por:**

- **ID da execução** específico
- **Conteúdo** dos dados processados
- **Mensagens de erro** específicas
- **Usuário** que executou
- **Tags** ou metadados

---

## <IonicIcon name="download-outline" size={24} color="#ea4b71" /> 6 | Exportar e Compartilhar

### <IonicIcon name="document-download-outline" size={20} color="#10b981" /> Exportar Dados

**Formatos disponíveis:**

- **JSON**: Dados completos da execução
- **CSV**: Dados tabulares para análise
- **PDF**: Relatório formatado
- **Logs**: Arquivo de texto com logs

### <IonicIcon name="share-outline" size={20} color="#10b981" /> Compartilhar Execuções

**Opções de compartilhamento:**

- **Link direto** para a execução
- **Screenshot** do resultado
- **Relatório** resumido
- **Dados específicos** selecionados

---

## <IonicIcon name="settings-outline" size={24} color="#ea4b71" /> 7 | Configurações de Visualização

### <IonicIcon name="options-outline" size={20} color="#10b981" /> Personalizar Interface

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

### <IonicIcon name="eye-off-outline" size={20} color="#10b981" /> Ocultar Informações Sensíveis

**Proteja dados sensíveis:**

- **Mascarar** credenciais nos logs
- **Ocultar** dados pessoais
- **Reduzir** detalhes de debug
- **Limitar** acesso por usuário

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> 8 | Próximos passos

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
