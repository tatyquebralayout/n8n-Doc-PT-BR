---
title: IF Node
sidebar_position: 1
---

# IF Node

O **IF Node** é um dos nodes mais importantes do n8n para controle de fluxo condicional. Ele permite que você execute diferentes caminhos em seu workflow baseado em condições específicas.

## Visão Geral

O IF Node avalia uma condição e direciona o fluxo de dados para diferentes saídas baseado no resultado (verdadeiro ou falso).

## Como Funciona

### Estrutura Básica
```
Entrada → IF Node → Saída A (condição verdadeira)
                → Saída B (condição falsa)
```

### Tipos de Condição

#### 1. **Condições Simples**
- Comparações básicas (igual, diferente, maior, menor)
- Verificação de valores nulos/vazios
- Verificação de tipos de dados

#### 2. **Condições Complexas**
- Múltiplas condições com operadores lógicos (AND, OR)
- Expressões personalizadas
- Verificação de arrays e objetos

## Configuração

### Parâmetros Principais

| Parâmetro | Descrição | Exemplo |
|-----------|-----------|---------|
| **Condição** | Expressão a ser avaliada | `{{ $json.temperature > 25 }}` |
| **Operador** | Tipo de comparação | `equals`, `not equals`, `contains` |
| **Valor 1** | Primeiro valor para comparação | `{{ $json.status }}` |
| **Valor 2** | Segundo valor para comparação | `"active"` |

### Operadores Disponíveis

#### Comparação
- `equals` - Igual a
- `not equals` - Diferente de
- `larger` - Maior que
- `smaller` - Menor que
- `larger equals` - Maior ou igual a
- `smaller equals` - Menor ou igual a

#### String
- `contains` - Contém
- `not contains` - Não contém
- `starts with` - Começa com
- `ends with` - Termina com
- `regex` - Expressão regular

#### Array/Object
- `exists` - Existe
- `not exists` - Não existe
- `is empty` - Está vazio
- `is not empty` - Não está vazio

## Exemplos Práticos

### Exemplo 1: Filtro por Status
```json
{
  "condition": "equals",
  "value1": "{{ $json.status }}",
  "value2": "active"
}
```

### Exemplo 2: Verificação de Temperatura
```json
{
  "condition": "larger",
  "value1": "{{ $json.temperature }}",
  "value2": 25
}
```

### Exemplo 3: Verificação de Array
```json
{
  "condition": "contains",
  "value1": "{{ $json.tags }}",
  "value2": "urgent"
}
```

## Casos de Uso Comuns

### 1. **Filtro de Dados**
- Separar registros por categoria
- Filtrar por status ou prioridade
- Validar dados obrigatórios

### 2. **Controle de Fluxo**
- Executar diferentes ações baseado em condições
- Implementar lógica de retry
- Criar workflows condicionais

### 3. **Validação**
- Verificar se campos obrigatórios existem
- Validar formatos de dados
- Implementar regras de negócio

## Boas Práticas

### 1. **Use Expressões Claras**
```javascript
// ✅ Bom
{{ $json.status === 'active' }}

// ❌ Evite
{{ $json.s === 'a' }}
```

### 2. **Combine Múltiplas Condições**
```javascript
// ✅ Múltiplas condições
{{ $json.status === 'active' && $json.priority === 'high' }}

// ✅ Usando operadores do IF Node
// Configure múltiplas condições no node
```

### 3. **Trate Valores Nulos**
```javascript
// ✅ Verificação segura
{{ $json.temperature && $json.temperature > 25 }}

// ✅ Usando operador exists
// Configure: exists, value1: {{ $json.temperature }}
```

## Troubleshooting

### Problemas Comuns

#### 1. **Condição Sempre Falsa**
- Verifique se os valores estão sendo passados corretamente
- Confirme o tipo de dados (string vs number)
- Use debug para verificar os valores

#### 2. **Erro de Sintaxe**
- Verifique aspas em strings
- Confirme a sintaxe das expressões
- Use o validador de expressões do n8n

#### 3. **Valores Nulos**
- Sempre verifique se o campo existe antes de comparar
- Use operadores `exists` e `is empty` quando apropriado

### Debug
1. Use o **Debug Node** antes do IF para verificar os dados
2. Configure logs detalhados no IF Node
3. Teste condições individualmente

## Integração com Outros Nodes

### Nodes Relacionados
- **[Switch Node](../logic-control/switch)** - Para múltiplas condições
- **[Merge Node](../logic-control/merge)** - Para combinar fluxos
- **[Wait Node](../logic-control/wait)** - Para pausas condicionais

### Workflow Exemplo
```
Webhook → IF (status = active) → Processar
                              → Notificar (inativo)
```

## Recursos Avançados

### Expressões Personalizadas
```javascript
// Verificação complexa
{{ 
  $json.temperature > 25 && 
  $json.humidity < 80 && 
  $json.status === 'active' 
}}
```

### Condições Dinâmicas
```javascript
// Usar valores de outros nodes
{{ $json.value > $('Set Variable').item.json.threshold }}
```

## Próximos Passos

- **[Switch Node](../logic-control/switch)** - Para múltiplas condições
- **[Merge Node](../logic-control/merge)** - Para combinar fluxos
- **[Error Handling](../../../logica-e-dados/01-flow-logic/error-handling)** - Para tratamento de erros 