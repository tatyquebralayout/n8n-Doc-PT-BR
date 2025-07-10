---
sidebar_position: 1
title: Introdução
description: Aprenda sobre lógica de fluxo e manipulação de dados no n8n
keywords: [n8n, lógica, dados, workflow, automação, fluxo]
---

# <ion-icon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Introdução

Esta seção aborda os conceitos fundamentais de lógica de fluxo e manipulação de dados no n8n, essenciais para criar workflows robustos e eficientes.

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você encontrará aqui

### Lógica de Fluxo (Flow Logic)

- **Error Handling**: Como lidar com erros em workflows
- **Looping**: Executar operações repetitivas automaticamente
- **Merging**: Combinar dados de diferentes fontes
- **Splitting**: Dividir dados para processamento paralelo
- **Subworkflows**: Organizar workflows em módulos reutilizáveis
- **Waiting**: Pausar execução por tempo ou condições
- **Debugging**: Técnicas e ferramentas de debugging

### Expressões e Conexões

- **Expressões JavaScript**: Manipulação dinâmica de dados
- **Conexões entre Nodes**: Fluxo de dados e lógica
- **Execução de Workflows**: Modos e estados de execução

### Dados (Data)

- **Data Structure**: Estrutura de dados no n8n
- **Data Flow**: Como os dados fluem entre nodes
- **Transforming Data**: Transformar dados entre formatos
- **Data Mapping**: Mapear e transformar dados
- **Binary Data**: Trabalhar com arquivos e dados binários
- **Data Pinning & Editing**: Manipular dados em tempo real
- **Data Filtering**: Filtrar dados baseado em condições
- **Data Mocking**: Criar dados de teste
- **Schema Preview**: Visualizar estrutura de dados

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conceitos Fundamentais

### Lógica de Fluxo

A lógica de fluxo determina como seu workflow se comporta em diferentes situações. Você aprenderá a:

- Controlar o fluxo de execução entre nodes
- Lidar com erros graciosamente
- Otimizar performance com operações paralelas
- Criar workflows modulares e reutilizáveis
- Implementar loops e condições complexas

### Manipulação de Dados

O n8n oferece ferramentas poderosas para trabalhar com dados:

- Transformar dados entre diferentes formatos
- Filtrar e validar informações
- Combinar dados de múltiplas fontes
- Estruturar dados para uso posterior
- Processar dados binários e arquivos

## <ion-icon name="link-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Seções Relacionadas

Para usar efetivamente a lógica de fluxo e dados, você precisa entender:

- **[Data Structure](./data/data-structure)**: Estrutura fundamental dos dados no n8n
- **[Data Flow](./data/data-flow-nodes)**: Como os dados se movem entre nodes

Ao construir sua lógica, você usará os **[Core Nodes](../integracoes/builtin-nodes/core-nodes/)**, incluindo:

**Divisão (Splitting):**

- **[IF](../integracoes/builtin-nodes/logic-control/if)** e **[Switch](../integracoes/builtin-nodes/logic-control/switch)**

**Combinação (Merging):**

- **[Merge](../integracoes/builtin-nodes/logic-control/merge)** e **[Code](../integracoes/builtin-nodes/core-nodes/code)**

**Loops:**

- **[IF](../integracoes/builtin-nodes/logic-control/if)** e **[Split in Batches](../integracoes/builtin-nodes/data-processing/split-in-batches)**

**Aguardar:**

- **[Wait](../integracoes/builtin-nodes/logic-control/wait)**

**Sub-workflows:**

- **[Execute Workflow](../integracoes/builtin-nodes/core-nodes/execute-sub-workflow)**

**Tratamento de Erros:**

- **[Error Trigger](../integracoes/builtin-nodes/core-nodes/error-trigger)**

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Comece com [Data Structure](./data/data-structure)** para entender como os dados são organizados
2. **Aprenda sobre [Data Flow](./data/data-flow-nodes)** para entender como os dados se movem
3. **Explore [Error Handling](./01-flow-logic/error-handling)** para criar workflows robustos

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[Primeiros Passos](/primeiros-passos/guia-instalacao)** - Conceitos fundamentais
- **[Usando n8n](../usando-n8n)** - Guias práticos
- **[Integrações](../integracoes)** - Conectar com aplicações externas
- **[Core Nodes](../integracoes/builtin-nodes/core-nodes/)** - Nodes fundamentais para lógica
