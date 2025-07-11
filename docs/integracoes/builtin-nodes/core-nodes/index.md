---
title: Nodes Core
description: Nodes fundamentais e essenciais para operações básicas no n8n
sidebar_position: 1
keywords: [n8n, core, nodes, básicos, fundamentais, operações]
---

# <ion-icon name="cube-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Nodes Core

Os **Nodes Core** são os componentes fundamentais do n8n, fornecendo funcionalidades essenciais para operações básicas, debug, manipulação de dados e controle de workflows.

## Nodes Disponíveis

### <ion-icon name="code-outline" style={{ fontSize: '20px', color: '#ea4b71' }}></ion-icon> Code

O node **Code** permite executar código JavaScript customizado dentro do workflow, oferecendo controle total sobre a lógica de processamento.

**Principais funcionalidades:**
- Executar código JavaScript
- Manipular dados com lógica customizada
- Implementar algoritmos complexos
- Integrar bibliotecas externas
- Criar funções reutilizáveis

**Casos de uso:**
- Transformações de dados complexas
- Validações customizadas
- Cálculos avançados
- Integração com APIs externas
- Lógica de negócio específica

[Ver documentação completa →](/integracoes/builtin-nodes/core-nodes/code.md)

### <ion-icon name="bug-outline" style={{ fontSize: '20px', color: '#ea4b71' }}></ion-icon> Debug Helper

O node **Debug Helper** é essencial para desenvolvimento e troubleshooting, permitindo inspecionar dados em qualquer ponto do workflow.

**Principais funcionalidades:**
- Inspecionar dados de entrada e saída
- Visualizar estrutura de dados
- Testar expressões
- Validar transformações
- Facilitar desenvolvimento

**Casos de uso:**
- Debug de workflows
- Validação de dados
- Teste de expressões
- Desenvolvimento iterativo
- Troubleshooting

[Ver documentação completa →](/integracoes/builtin-nodes/core-nodes/debug-helper.md)

### <ion-icon name="create-outline" style={{ fontSize: '20px', color: '#ea4b71' }}></ion-icon> Edit Fields (Set)

O node **Edit Fields** permite definir, modificar e remover campos nos dados de forma visual e intuitiva.

**Principais funcionalidades:**
- Definir novos campos
- Modificar valores existentes
- Remover campos desnecessários
- Renomear campos
- Aplicar transformações básicas

**Casos de uso:**
- Padronizar formatos de dados
- Adicionar campos calculados
- Limpar dados de entrada
- Preparar dados para APIs
- Criar estruturas customizadas

[Ver documentação completa →](/integracoes/builtin-nodes/core-nodes/edit-fields-set.md)

### <ion-icon name="play-circle-outline" style={{ fontSize: '20px', color: '#ea4b71' }}></ion-icon> Execute Sub-Workflow

O node **Execute Sub-Workflow** permite executar outros workflows como parte do workflow atual, criando modularidade e reutilização.

**Principais funcionalidades:**
- Executar workflows como sub-rotinas
- Passar dados entre workflows
- Receber resultados de sub-workflows
- Criar workflows modulares
- Reutilizar lógica comum

**Casos de uso:**
- Modularizar workflows complexos
- Reutilizar lógica comum
- Criar bibliotecas de workflows
- Separar responsabilidades
- Facilitar manutenção

[Ver documentação completa →](/integracoes/builtin-nodes/core-nodes/execute-sub-workflow.md)

### <ion-icon name="alert-circle-outline" style={{ fontSize: '20px', color: '#ea4b71' }}></ion-icon> Error Trigger

O node **Error Trigger** permite capturar e processar erros que ocorrem em outros nodes, implementando tratamento de erro robusto.

**Principais funcionalidades:**
- Capturar erros de outros nodes
- Processar falhas de forma controlada
- Implementar retry logic
- Notificar sobre problemas
- Registrar logs de erro

**Casos de uso:**
- Tratamento de erro robusto
- Notificações de falha
- Retry automático
- Logging de problemas
- Recuperação de falhas

[Ver documentação completa →](/integracoes/builtin-nodes/core-nodes/error-trigger.md)

### <ion-icon name="git-branch-outline" style={{ fontSize: '20px', color: '#ea4b71' }}></ion-icon> Workflow Trigger

O node **Workflow Trigger** permite que um workflow seja executado por outro workflow, criando hierarquias e dependências.

**Principais funcionalidades:**
- Disparar workflows de forma programática
- Passar dados entre workflows
- Criar dependências entre workflows
- Orquestrar workflows complexos
- Implementar pipelines de dados

**Casos de uso:**
- Orquestração de workflows
- Pipelines de dados
- Workflows dependentes
- Processamento em etapas
- Automação complexa

[Ver documentação completa →](/integracoes/builtin-nodes/core-nodes/workflow-trigger.md)

## Conceitos Fundamentais

### Hierarquia de Nodes

Os nodes core formam a base sobre a qual outros nodes são construídos:

```
Core Nodes → Built-in Nodes → Community Nodes → Custom Nodes
```

### Fluxo de Dados

Os nodes core processam dados de forma sequencial:

1. **Entrada**: Dados chegam do node anterior
2. **Processamento**: Node executa sua lógica
3. **Saída**: Dados processados são enviados para o próximo node

### Tipos de Operação

- **Transformação**: Modificar dados (Code, Edit Fields)
- **Inspeção**: Visualizar dados (Debug Helper)
- **Controle**: Gerenciar fluxo (Execute Sub-Workflow, Workflow Trigger)
- **Tratamento**: Lidar com erros (Error Trigger)

## Padrões de Uso

### 1. Pipeline de Processamento

```
Dados Brutos → Debug Helper → Code → Edit Fields → Dados Processados
```

**Exemplo:**
1. **Debug Helper** inspeciona dados de entrada
2. **Code** aplica transformações complexas
3. **Edit Fields** padroniza estrutura
4. **Debug Helper** valida resultado final

### 2. Modularização

```
Workflow Principal → Execute Sub-Workflow → Sub-Workflow → Resultado
```

**Exemplo:**
1. Workflow principal recebe dados
2. **Execute Sub-Workflow** chama workflow de validação
3. Sub-workflow valida e retorna resultado
4. Workflow principal processa dados validados

### 3. Tratamento de Erro

```
Node Principal → Error Trigger → Tratamento → Notificação
```

**Exemplo:**
1. Node principal executa operação
2. **Error Trigger** captura falhas
3. Código de tratamento processa erro
4. Notificação é enviada

## Exemplos Práticos

### Exemplo 1: Validação e Transformação de Dados

**Cenário:** Processar dados de clientes com validação e transformação.

**Workflow:**
```
Webhook → Debug Helper → Code (Validação) → Edit Fields → Debug Helper → HTTP Request
```

**Configuração:**
- **Debug Helper**: Inspeciona dados recebidos
- **Code**: Valida email, CPF, telefone
- **Edit Fields**: Padroniza formatos
- **Debug Helper**: Valida dados processados
- **HTTP Request**: Envia para API

### Exemplo 2: Workflow Modular

**Cenário:** Sistema de aprovação com workflows separados.

**Workflow Principal:**
```
Pedido → Execute Sub-Workflow (Validação) → Execute Sub-Workflow (Aprovação) → Confirmação
```

**Sub-Workflows:**
- **Validação**: Verifica dados do pedido
- **Aprovação**: Processa aprovação baseada em regras

### Exemplo 3: Sistema de Monitoramento

**Cenário:** Monitorar APIs e tratar falhas automaticamente.

**Workflow:**
```
Schedule Trigger → HTTP Request → Error Trigger → Code (Retry Logic) → Notificação
```

**Configuração:**
- **Schedule Trigger**: Executa a cada 5 minutos
- **HTTP Request**: Verifica status da API
- **Error Trigger**: Captura falhas de conexão
- **Code**: Implementa retry com backoff
- **Notificação**: Alerta sobre problemas

## Boas Práticas

### Desenvolvimento

1. **Use Debug Helper** frequentemente durante desenvolvimento
2. **Teste código** em pequenos trechos antes de integrar
3. **Documente lógica complexa** nos comentários
4. **Valide dados** em cada etapa
5. **Use versionamento** para workflows

### Performance

1. **Otimize código** para evitar loops desnecessários
2. **Use Edit Fields** para operações simples
3. **Limite execução de sub-workflows** quando possível
4. **Implemente cache** para dados frequentemente acessados
5. **Monitore uso de recursos**

### Manutenção

1. **Modularize workflows** complexos
2. **Implemente logging** adequado
3. **Configure alertas** para falhas
4. **Mantenha documentação** atualizada
5. **Teste regularmente** workflows críticos

## Troubleshooting

### Problemas Comuns

#### Code node não funciona
- Verifique sintaxe JavaScript
- Confirme acesso a variáveis
- Use Debug Helper para inspecionar dados
- Teste código em console primeiro

#### Debug Helper não mostra dados
- Verifique se node está conectado
- Confirme se dados estão chegando
- Use "Include All" para ver dados completos
- Verifique configuração do node

#### Execute Sub-Workflow falha
- Verifique se sub-workflow existe
- Confirme se está ativo
- Valide dados de entrada
- Verifique permissões

#### Error Trigger não captura erros
- Verifique configuração de conexão
- Confirme se erro está sendo gerado
- Valide expressões de condição
- Use Debug Helper para verificar

### Debug

1. **Use Debug Helper** em pontos críticos
2. **Configure logging detalhado**
3. **Teste nodes individualmente**
4. **Valide dados de entrada e saída**
5. **Monitore execuções**

## Expressões Avançadas

### Acesso a Dados

```javascript
// Dados do item atual
$json.campo

// Dados de itens anteriores
$('Node Anterior').json.campo

// Dados de múltiplos nodes
$('Node A').json.campo + $('Node B').json.campo

// Dados binários
$binary.arquivo.data
```

### Manipulação de Arrays

```javascript
// Filtrar array
$json.items.filter(item => item.ativo)

// Mapear array
$json.items.map(item => ({ ...item, processado: true }))

// Reduzir array
$json.numeros.reduce((sum, num) => sum + num, 0)
```

### Validações

```javascript
// Validar email
/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email)

// Validar CPF
function validarCPF(cpf) {
  // Implementação da validação
}

// Validar telefone
/^\(\d{2}\) \d{4,5}-\d{4}$/.test($json.telefone)
```

## Próximos Passos

- [Expressões n8n](/logica-e-dados/expressoes.md) - Usar expressões avançadas
- [Nodes de Dados](/integracoes/builtin-nodes/data-processing/index.md) - Processar dados
- [Nodes de Lógica](/integracoes/builtin-nodes/logic-control/index.md) - Controlar fluxo
- [Tratamento de Erros](/logica-e-dados/flow-logic/error-handling.md) - Lidar com falhas
- [Debugging](/logica-e-dados/flow-logic/debugging.md) - Depurar workflows
