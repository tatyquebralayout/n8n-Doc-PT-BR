---
sidebar_position: 5
title: "ReAct Agent"
description: Como usar o node ReAct Agent para reasoning e action
keywords: [n8n, react agent, reasoning, action, automação inteligente, agentes IA, workflows autônomos, raciocínio automatizado]
---

## ReAct Agent no n8n: Raciocínio e Ação em Workflows Inteligentes

Este documento descreve o **Agente ReAct (ReAct Agent)**, um tipo de agente de IA que utiliza um loop de "Raciocínio e Ação" para resolver problemas.

## O que é o ReAct Agent?

O ReAct Agent (Reasoning and Acting) é um tipo de agente de IA que combina raciocínio lógico com execução de ações. Ele segue um ciclo de:

1. **Observação**: Analisa o estado atual
2. **Pensamento**: Planeja a próxima ação
3. **Ação**: Executa a ação planejada
4. **Repetição**: Volta ao passo 1

## Funcionalidades Principais

### Raciocínio Inteligente

- Análise de situações complexas
- Planejamento de ações sequenciais
- Tomada de decisão baseada em contexto

### Execução de Ferramentas

- Uso de ferramentas externas
- Integração com APIs
- Execução de workflows

### Ciclo de Aprendizado

- Aprendizado com tentativas anteriores
- Adaptação a novos cenários
- Melhoria contínua de performance

## Configuração Básica

### 1. Definição de Ferramentas

```javascript
// Exemplo de ferramentas disponíveis
const tools = [
  {
    name: "search_web",
    description: "Busca informações na web",
    parameters: {
      query: "string"
    }
  },
  {
    name: "calculate",
    description: "Realiza cálculos matemáticos",
    parameters: {
      expression: "string"
    }
  }
];
```

### 2. Configuração do Agente

- Defina o modelo de IA base
- Configure as ferramentas disponíveis
- Estabeleça limites de iterações

### 3. Prompts de Sistema

- Instruções claras sobre o objetivo
- Regras de comportamento
- Critérios de sucesso

## Casos de Uso

### Análise de Dados

- Processamento de relatórios complexos
- Identificação de padrões
- Geração de insights

### Automação de Processos

- Execução de tarefas sequenciais
- Integração entre sistemas
- Resolução de problemas

### Suporte Inteligente

- Diagnóstico de problemas
- Execução de soluções
- Escalação quando necessário

## Configurações Avançadas

### Ciclos de Raciocínio

```javascript
// Exemplo de ciclo ReAct
const reactCycle = {
  observation: "Analisar dados de entrada",
  thought: "Planejar próximas ações",
  action: "Executar ferramentas",
  iteration: "Repetir até objetivo alcançado"
};
```

### Ferramentas Customizadas

- Desenvolvimento de ferramentas específicas
- Integração com sistemas empresariais
- APIs brasileiras (Serasa, Receita Federal)

### Monitoramento

- Logs de raciocínio
- Métricas de performance
- Análise de decisões

## Integração com Outros Nodes

### Memory Manager

- Mantenha contexto entre execuções
- Aprenda com experiências anteriores
- Otimize decisões futuras

### OpenAI Chat

- Use como modelo base
- Configure prompts específicos
- Implemente fallbacks

### Code Node

- Processe resultados do agente
- Implemente lógica customizada
- Valide decisões tomadas

## Exemplos Práticos

### Análise de Relatórios

```javascript
// Agente para análise de relatórios financeiros
const financialAgent = {
  tools: ["read_pdf", "extract_data", "calculate_metrics"],
  objective: "Analisar relatório e identificar anomalias",
  max_iterations: 10
};
```

### Diagnóstico de Problemas

```javascript
// Agente para diagnóstico técnico
const diagnosticAgent = {
  tools: ["check_system", "search_knowledge_base", "create_ticket"],
  objective: "Identificar e resolver problemas técnicos",
  escalation_threshold: 3
};
```

## Troubleshooting

### Problemas Comuns

- **Loops Infinitos**: Configure limites de iteração
- **Decisões Incorretas**: Melhore prompts e ferramentas
- **Performance Lenta**: Otimize ferramentas e modelo

### Otimizações

- Use ferramentas específicas para cada domínio
- Implemente cache de resultados
- Monitore custos de API

:::tip **Dica**
Comece com agentes simples e expanda gradualmente. Teste extensivamente com dados brasileiros para validar o comportamento.
:::

## Próximos Passos

- [Agente de IA](./ai-agent) - Visão geral de agentes
- [Memory Manager](./memory-manager) - Contexto persistente
- [Exemplos Práticos](../exemplos-casos/index.mdx) - Casos de uso reais

---

**Em desenvolvimento:** Este conteúdo incluirá agentes específicos para processos empresariais brasileiros.
