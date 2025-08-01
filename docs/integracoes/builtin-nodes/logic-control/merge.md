---
title: Merge Node
description: Guia completo sobre o Merge Node no n8n, incluindo combinação de dados, sincronização, exemplos práticos e boas práticas
sidebar_position: 3
keywords: [n8n, merge node, combinação, dados, sincronização, união, fluxo]
---

# <ion-icon name="git-merge-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Merge Node

O **Merge Node** é uma ferramenta essencial do n8n para combinar dados de múltiplas fontes. Ele permite unir informações de diferentes caminhos do workflow, criando datasets consolidados e enriquecidos.

## O que é o Merge Node?

O **Merge Node** permite:

- **Combinar** dados de múltiplos nodes
- **Sincronizar** informações de diferentes fontes
- **Enriquecer** dados com informações adicionais
- **Consolidar** resultados de processamentos paralelos
- **Criar** datasets completos e estruturados
- **Unificar** fluxos de dados separados

### Quando Usar o Merge Node

- **Consolidação** de dados de múltiplas APIs
- **Enriquecimento** de dados com informações complementares
- **Unificação** de resultados de processamentos paralelos
- **Criação** de relatórios consolidados
- **Sincronização** de dados de diferentes sistemas
- **Combinação** de dados de diferentes períodos

## Configuração Básica

### Estrutura do Merge Node

```javascript
// Merge Node - Estrutura básica
{
  "mode": "combine", // combine, append, overwrite
  "combineBy": "id", // Campo para combinar dados
  "options": {
    "combineMode": "multiplex", // multiplex, waitForAll
    "combineBy": "id"
  }
}
```

### Modos de Operação

#### 1. Combine Mode

```javascript
// Combinar dados baseado em campo comum
{
  "mode": "combine",
  "combineBy": "id",
  "options": {
    "combineMode": "multiplex"
  }
}
```

**Funcionamento:**
- Combina dados que têm o mesmo valor no campo especificado
- Cria um item consolidado com dados de todas as fontes
- Mantém a estrutura original dos dados

#### 2. Append Mode

```javascript
// Anexar dados de diferentes fontes
{
  "mode": "append",
  "options": {
    "combineMode": "multiplex"
  }
}
```

**Funcionamento:**
- Adiciona dados de uma fonte aos dados de outra
- Cria arrays com todos os itens
- Útil para consolidar listas

#### 3. Overwrite Mode

```javascript
// Sobrescrever dados com informações mais recentes
{
  "mode": "overwrite",
  "combineBy": "id",
  "options": {
    "combineMode": "multiplex"
  }
}
```

**Funcionamento:**
- Substitui dados antigos por novos
- Mantém apenas a versão mais recente
- Útil para atualizações de dados

### Modos de Combinação

#### 1. Multiplex

```javascript
// Processar dados assim que chegarem
{
  "combineMode": "multiplex"
}
```

**Características:**
- Processa dados assim que chegam de qualquer fonte
- Não espera por todas as fontes
- Mais rápido e eficiente
- Pode resultar em dados incompletos

#### 2. Wait for All

```javascript
// Aguardar dados de todas as fontes
{
  "combineMode": "waitForAll"
}
```

**Características:**
- Aguarda dados de todas as fontes antes de processar
- Garante dados completos
- Pode ser mais lento
- Útil para dados interdependentes

## Exemplos Práticos

### 1. Enriquecimento de Dados de Cliente

```javascript
// Merge Node - Enriquecer dados de cliente
{
  "mode": "combine",
  "combineBy": "cliente_id",
  "options": {
    "combineMode": "multiplex"
  }
}
```

**Fontes de dados:**
- **Fonte 1:** Dados básicos do cliente (nome, email, telefone)
- **Fonte 2:** Histórico de compras (total, frequência, última compra)
- **Fonte 3:** Dados de endereço (CEP, cidade, estado)

**Resultado:**
```json
{
  "cliente_id": "12345",
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999",
  "total_compras": 15000,
  "frequencia": 5,
  "ultima_compra": "2024-01-15",
  "cep": "01234-567",
  "cidade": "São Paulo",
  "estado": "SP"
}
```

### 2. Consolidação de Vendas por Região

```javascript
// Merge Node - Consolidar vendas
{
  "mode": "append",
  "options": {
    "combineMode": "waitForAll"
  }
}
```

**Fontes de dados:**
- **Fonte 1:** Vendas da região Norte
- **Fonte 2:** Vendas da região Sul
- **Fonte 3:** Vendas da região Sudeste

**Resultado:**
```json
[
  {
    "regiao": "Norte",
    "vendas": 5000,
    "clientes": 50
  },
  {
    "regiao": "Sul",
    "vendas": 8000,
    "clientes": 80
  },
  {
    "regiao": "Sudeste",
    "vendas": 12000,
    "clientes": 120
  }
]
```

### 3. Atualização de Produtos

```javascript
// Merge Node - Atualizar produtos
{
  "mode": "overwrite",
  "combineBy": "produto_id",
  "options": {
    "combineMode": "multiplex"
  }
}
```

**Fontes de dados:**
- **Fonte 1:** Dados básicos do produto (nome, categoria, preço)
- **Fonte 2:** Dados atualizados (preço, estoque, status)

**Resultado:**
```json
{
  "produto_id": "P001",
  "nome": "Notebook Dell",
  "categoria": "Eletrônicos",
  "preco": 3500.00, // Atualizado
  "estoque": 15,    // Novo campo
  "status": "ativo" // Novo campo
}
```

### 4. Relatório Consolidado

```javascript
// Merge Node - Relatório consolidado
{
  "mode": "combine",
  "combineBy": "data",
  "options": {
    "combineMode": "waitForAll"
  }
}
```

**Fontes de dados:**
- **Fonte 1:** Vendas do dia
- **Fonte 2:** Clientes novos
- **Fonte 3:** Produtos mais vendidos

**Resultado:**
```json
{
  "data": "2024-01-15",
  "vendas": {
    "total": 15000,
    "quantidade": 25
  },
  "clientes": {
    "novos": 5,
    "ativos": 120
  },
  "produtos": [
    {
      "nome": "Notebook",
      "quantidade": 10
    },
    {
      "nome": "Mouse",
      "quantidade": 15
    }
  ]
}
```

## Casos de Uso Avançados

### 1. Merge com Transformação de Dados

```javascript
// Code Node - Preparar dados para merge
const prepararDados = (dados) => {
  return dados.map(item => ({
    ...item,
    timestamp: new Date().toISOString(),
    fonte: 'sistema_principal'
  }));
};

// Merge Node - Combinar dados
{
  "mode": "combine",
  "combineBy": "id",
  "options": {
    "combineMode": "multiplex"
  }
}

// Code Node - Processar dados consolidados
const processarConsolidado = (dados) => {
  return {
    ...dados,
    total_campos: Object.keys(dados).length,
    processado_em: new Date().toISOString()
  };
};
```

### 2. Merge com Validação

```javascript
// Code Node - Validar dados antes do merge
const validarDados = (dados) => {
  const validacoes = {
    tem_id: dados.id && dados.id.length > 0,
    tem_nome: dados.nome && dados.nome.length > 0,
    tem_email: dados.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)
  };
  
  const todasValidas = Object.values(validacoes).every(v => v);
  
  if (!todasValidas) {
    console.warn('Dados inválidos:', dados, validacoes);
    return null;
  }
  
  return dados;
};

// Merge Node - Combinar apenas dados válidos
{
  "mode": "combine",
  "combineBy": "id",
  "options": {
    "combineMode": "multiplex"
  }
}
```

### 3. Merge com Agregação

```javascript
// Aggregate Node - Agregar dados por categoria
{
  "groupBy": ["categoria"],
  "aggregations": [
    {
      "field": "valor",
      "operation": "sum",
      "name": "total_categoria"
    },
    {
      "field": "id",
      "operation": "count",
      "name": "quantidade_categoria"
    }
  ]
}

// Merge Node - Combinar com dados originais
{
  "mode": "combine",
  "combineBy": "categoria",
  "options": {
    "combineMode": "multiplex"
  }
}
```

### 4. Merge com Cache

```javascript
// Code Node - Cache de dados
const cache = new Map();

const obterComCache = async (id) => {
  if (cache.has(id)) {
    return cache.get(id);
  }
  
  const dados = await buscarDados(id);
  cache.set(id, dados);
  return dados;
};

// Merge Node - Combinar dados frescos com cache
{
  "mode": "combine",
  "combineBy": "id",
  "options": {
    "combineMode": "multiplex"
  }
}
```

## Workflows Complexos

### 1. Merge com Múltiplas Fontes

```
Fonte A → Processamento A → Merge Node
    ↓              ↓              ↓
Fonte B → Processamento B → Merge Node → Resultado Consolidado
    ↓              ↓              ↓
Fonte C → Processamento C → Merge Node
```

### 2. Merge Hierárquico

```javascript
// Primeiro Merge - Dados básicos
{
  "mode": "combine",
  "combineBy": "cliente_id"
}

// Segundo Merge - Dados financeiros
{
  "mode": "combine",
  "combineBy": "cliente_id"
}

// Terceiro Merge - Dados de endereço
{
  "mode": "combine",
  "combineBy": "cliente_id"
}
```

### 3. Merge com Paralelização

```
Dados Originais → Switch Node → Processamento A → Merge Node
      ↓              ↓              ↓              ↓
Dados Originais → Switch Node → Processamento B → Merge Node
      ↓              ↓              ↓              ↓
Dados Originais → Switch Node → Processamento C → Merge Node
```

## Boas Práticas

### 1. Escolha do Campo de Combinação

```javascript
// ✅ Bom: Campo único e estável
{
  "combineBy": "id"
}

// ❌ Evitar: Campo que pode mudar
{
  "combineBy": "nome"
}
```

### 2. Modo de Combinação

```javascript
// ✅ Bom: Multiplex para dados independentes
{
  "combineMode": "multiplex"
}

// ✅ Bom: Wait for All para dados interdependentes
{
  "combineMode": "waitForAll"
}
```

### 3. Validação de Dados

```javascript
// ✅ Bom: Validar antes do merge
const dadosValidados = dados.filter(item => 
  item.id && item.nome && item.email
);

// ❌ Evitar: Merge sem validação
// Pode resultar em dados inconsistentes
```

### 4. Tratamento de Erros

```javascript
// ✅ Bom: Tratar dados ausentes
const dadosCompletos = dados.map(item => ({
  ...item,
  fonte: item.fonte || 'desconhecida',
  timestamp: item.timestamp || new Date().toISOString()
}));

// ❌ Evitar: Ignorar dados ausentes
// Pode causar problemas no merge
```

## Troubleshooting

### Problemas Comuns

#### Dados não são combinados
- Verifique se o campo de combinação existe
- Confirme se os valores são iguais
- Teste com dados de exemplo
- Use Debug Helper para ver dados

#### Merge lento
- Use multiplex para dados independentes
- Reduza o número de fontes
- Otimize as consultas de dados
- Considere usar cache

#### Dados duplicados
- Verifique se há campos únicos
- Use overwrite mode quando apropriado
- Implemente validação de duplicatas
- Considere usar Aggregate Node

### Debug

```javascript
// Code Node - Debug de Merge Node
const debugMerge = (dados) => {
  console.log('=== DEBUG MERGE ===');
  console.log('Dados recebidos:', dados);
  console.log('Número de itens:', dados.length);
  console.log('Campos disponíveis:', Object.keys(dados[0] || {}));
  console.log('Exemplo de item:', dados[0]);
  console.log('==================');
  
  return dados;
};

// Usar após o Merge Node
return { json: debugMerge($json) };
```

## Integração com Outros Nodes

### 1. Merge Node + Set Node

```javascript
// Merge Node - Combinar dados
{
  "mode": "combine",
  "combineBy": "id"
}

// Set Node - Adicionar metadados
{
  "mode": "keepAllSet",
  "values": {
    "string": [
      {
        "name": "fonte_consolidada",
        "value": "{{ $json.fonte_1 || $json.fonte_2 || 'múltiplas' }}"
      },
      {
        "name": "timestamp_merge",
        "value": "{{ $now.toISOString() }}"
      }
    ]
  }
}
```

### 2. Merge Node + Aggregate Node

```javascript
// Merge Node - Combinar dados de vendas
{
  "mode": "append",
  "options": {
    "combineMode": "waitForAll"
  }
}

// Aggregate Node - Calcular totais
{
  "groupBy": ["regiao"],
  "aggregations": [
    {
      "field": "vendas",
      "operation": "sum",
      "name": "total_vendas"
    },
    {
      "field": "clientes",
      "operation": "sum",
      "name": "total_clientes"
    }
  ]
}
```

### 3. Merge Node + If Node

```javascript
// Merge Node - Combinar dados de cliente
{
  "mode": "combine",
  "combineBy": "cliente_id"
}

// If Node - Verificar dados completos
{
  "condition": "{{ $json.nome && $json.email && $json.telefone }}",
  "true": "Dados Completos",
  "false": "Dados Incompletos"
}
```

## Próximos Passos

- [Switch Node](/integracoes/builtin-nodes/logic-control/switch) - Múltiplas condições
- [If Node](/integracoes/builtin-nodes/logic-control/if) - Controle de fluxo
- [Aggregate Node](/integracoes/builtin-nodes/data-processing/aggregate) - Agregação de dados
- [Set Node](/integracoes/builtin-nodes/data-processing/set) - Manipulação de dados
- [Expressões n8n](/logica-e-dados/expressoes) - Usar expressões em merge
