---
sidebar_position: 3
title: Aggregate
description: Agrupe e resuma dados em workflows n8n
keywords: [n8n, aggregate, agrupar, resumir, dados, estatísticas, agregação]
---

# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Aggregate Node

O **Aggregate Node** permite **agrupar e resumir dados** de forma eficiente, criando estatísticas e relatórios a partir de grandes conjuntos de dados. É essencial para análise de dados e geração de insights.

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Conceito Principal**

**Aggregate = "Agrupar e Resumir Dados"**

O Aggregate Node é uma **AÇÃO** que:

- **Agrupa** dados por campos específicos
- **Calcula** estatísticas (soma, média, contagem, etc.)
- **Resume** grandes volumes de dados
- **Gera** relatórios e insights

> **💡 Dica:** Use este node para criar dashboards, relatórios e análises de dados em seus workflows.

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Configurações Principais**

### **1. Group By**

```
Campo(s) para agrupar os dados (ex: categoria, data, região)
```

### **2. Aggregation Functions**

```
Sum - Soma de valores
Average - Média aritmética
Count - Contagem de itens
Min - Valor mínimo
Max - Valor máximo
First - Primeiro valor
Last - Último valor
```

### **3. Fields to Aggregate**

```
Campos numéricos para aplicar as funções de agregação
```

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Exemplos Práticos**

### **Exemplo 1: Vendas por Categoria**

**Entrada:**

```json
[
  {"categoria": "Eletrônicos", "valor": 1500, "quantidade": 3},
  {"categoria": "Eletrônicos", "valor": 2000, "quantidade": 2},
  {"categoria": "Roupas", "valor": 500, "quantidade": 5},
  {"categoria": "Roupas", "valor": 300, "quantidade": 3},
  {"categoria": "Livros", "valor": 200, "quantidade": 10}
]
```

**Configuração:**

```
Group By: categoria
Fields to Aggregate:
  - valor (Sum)
  - quantidade (Sum)
  - valor (Average)
  - quantidade (Count)
```

**Saída:**

```json
[
  {
    "categoria": "Eletrônicos",
    "valor_sum": 3500,
    "quantidade_sum": 5,
    "valor_average": 1750,
    "quantidade_count": 2
  },
  {
    "categoria": "Roupas",
    "valor_sum": 800,
    "quantidade_sum": 8,
    "valor_average": 400,
    "quantidade_count": 2
  },
  {
    "categoria": "Livros",
    "valor_sum": 200,
    "quantidade_sum": 10,
    "valor_average": 200,
    "quantidade_count": 1
  }
]
```

### **Exemplo 2: Vendas por Mês e Região**

**Entrada:**

```json
[
  {"mes": "2024-01", "regiao": "SP", "vendas": 5000, "clientes": 50},
  {"mes": "2024-01", "regiao": "RJ", "vendas": 3000, "clientes": 30},
  {"mes": "2024-02", "regiao": "SP", "vendas": 6000, "clientes": 60},
  {"mes": "2024-02", "regiao": "RJ", "vendas": 4000, "clientes": 40}
]
```

**Configuração:**

```
Group By: mes, regiao
Fields to Aggregate:
  - vendas (Sum)
  - clientes (Sum)
  - vendas (Average)
```

**Saída:**

```json
[
  {
    "mes": "2024-01",
    "regiao": "SP",
    "vendas_sum": 5000,
    "clientes_sum": 50,
    "vendas_average": 5000
  },
  {
    "mes": "2024-01",
    "regiao": "RJ",
    "vendas_sum": 3000,
    "clientes_sum": 30,
    "vendas_average": 3000
  },
  {
    "mes": "2024-02",
    "regiao": "SP",
    "vendas_sum": 6000,
    "clientes_sum": 60,
    "vendas_average": 6000
  },
  {
    "mes": "2024-02",
    "regiao": "RJ",
    "vendas_sum": 4000,
    "clientes_sum": 40,
    "vendas_average": 4000
  }
]
```

### **Exemplo 3: Análise de Produtos**

**Entrada:**

```json
[
  {"produto": "Notebook", "preco": 3000, "estoque": 10, "categoria": "Eletrônicos"},
  {"produto": "Mouse", "preco": 50, "estoque": 100, "categoria": "Eletrônicos"},
  {"produto": "Camiseta", "preco": 80, "estoque": 200, "categoria": "Roupas"},
  {"produto": "Calça", "preco": 150, "estoque": 50, "categoria": "Roupas"}
]
```

**Configuração:**

```
Group By: categoria
Fields to Aggregate:
  - preco (Sum, Average, Min, Max)
  - estoque (Sum, Average)
  - produto (Count)
```

**Saída:**

```json
[
  {
    "categoria": "Eletrônicos",
    "preco_sum": 3050,
    "preco_average": 1525,
    "preco_min": 50,
    "preco_max": 3000,
    "estoque_sum": 110,
    "estoque_average": 55,
    "produto_count": 2
  },
  {
    "categoria": "Roupas",
    "preco_sum": 230,
    "preco_average": 115,
    "preco_min": 80,
    "preco_max": 150,
    "estoque_sum": 250,
    "estoque_average": 125,
    "produto_count": 2
  }
]
```

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Funções de Agregação**

### **Funções Disponíveis**

| Função | Descrição | Exemplo |
|--------|-----------|---------|
| **Sum** | Soma todos os valores | `[1,2,3] → 6` |
| **Average** | Média aritmética | `[1,2,3] → 2` |
| **Count** | Conta itens | `[a,b,c] → 3` |
| **Min** | Valor mínimo | `[1,2,3] → 1` |
| **Max** | Valor máximo | `[1,2,3] → 3` |
| **First** | Primeiro valor | `[a,b,c] → a` |
| **Last** | Último valor | `[a,b,c] → c` |

### **Exemplos de Uso**

**Soma de Vendas:**

```
Field: vendas
Function: Sum
Result: Total de vendas do grupo
```

**Média de Preços:**

```
Field: preco
Function: Average
Result: Preço médio do grupo
```

**Contagem de Pedidos:**

```
Field: pedido_id
Function: Count
Result: Número de pedidos no grupo
```

**Faixa de Preços:**

```
Field: preco
Functions: Min, Max
Result: Preço mínimo e máximo do grupo
```

## <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Casos de Uso Avançados**

### **1. Relatório de Vendas Diárias**

**Entrada (vendas do mês):**

```json
[
  {"data": "2024-01-01", "vendas": 1000, "clientes": 10},
  {"data": "2024-01-01", "vendas": 1500, "clientes": 15},
  {"data": "2024-01-02", "vendas": 2000, "clientes": 20},
  {"data": "2024-01-02", "vendas": 1200, "clientes": 12}
]
```

**Configuração:**

```
Group By: data
Fields to Aggregate:
  - vendas (Sum)
  - clientes (Sum)
  - vendas (Average)
```

**Saída (resumo diário):**

```json
[
  {
    "data": "2024-01-01",
    "vendas_sum": 2500,
    "clientes_sum": 25,
    "vendas_average": 1250
  },
  {
    "data": "2024-01-02",
    "vendas_sum": 3200,
    "clientes_sum": 32,
    "vendas_average": 1600
  }
]
```

### **2. Análise de Performance por Vendedor**

**Entrada:**

```json
[
  {"vendedor": "João", "vendas": 5000, "comissao": 500, "mes": "2024-01"},
  {"vendedor": "João", "vendas": 6000, "comissao": 600, "mes": "2024-02"},
  {"vendedor": "Maria", "vendas": 4000, "comissao": 400, "mes": "2024-01"},
  {"vendedor": "Maria", "vendas": 7000, "comissao": 700, "mes": "2024-02"}
]
```

**Configuração:**

```
Group By: vendedor
Fields to Aggregate:
  - vendas (Sum, Average)
  - comissao (Sum, Average)
  - mes (Count)
```

**Saída:**

```json
[
  {
    "vendedor": "João",
    "vendas_sum": 11000,
    "vendas_average": 5500,
    "comissao_sum": 1100,
    "comissao_average": 550,
    "mes_count": 2
  },
  {
    "vendedor": "Maria",
    "vendas_sum": 11000,
    "vendas_average": 5500,
    "comissao_sum": 1100,
    "comissao_average": 550,
    "mes_count": 2
  }
]
```

### **3. Análise de Produtos por Categoria e Fornecedor**

**Entrada:**

```json
[
  {"categoria": "Eletrônicos", "fornecedor": "TechCorp", "preco": 1000, "estoque": 50},
  {"categoria": "Eletrônicos", "fornecedor": "TechCorp", "preco": 2000, "estoque": 30},
  {"categoria": "Eletrônicos", "fornecedor": "ElectroMax", "preco": 1500, "estoque": 40},
  {"categoria": "Roupas", "fornecedor": "FashionCo", "preco": 100, "estoque": 200}
]
```

**Configuração:**

```
Group By: categoria, fornecedor
Fields to Aggregate:
  - preco (Sum, Average, Min, Max)
  - estoque (Sum, Average)
```

**Saída:**

```json
[
  {
    "categoria": "Eletrônicos",
    "fornecedor": "TechCorp",
    "preco_sum": 3000,
    "preco_average": 1500,
    "preco_min": 1000,
    "preco_max": 2000,
    "estoque_sum": 80,
    "estoque_average": 40
  },
  {
    "categoria": "Eletrônicos",
    "fornecedor": "ElectroMax",
    "preco_sum": 1500,
    "preco_average": 1500,
    "preco_min": 1500,
    "preco_max": 1500,
    "estoque_sum": 40,
    "estoque_average": 40
  },
  {
    "categoria": "Roupas",
    "fornecedor": "FashionCo",
    "preco_sum": 100,
    "preco_average": 100,
    "preco_min": 100,
    "preco_max": 100,
    "estoque_sum": 200,
    "estoque_average": 200
  }
]
```

## <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Otimização de Performance**

### **Escolhendo Campos para Agrupar**

**Campos Ideais para Agrupamento:**

- ✅ **Categorias** (categoria, tipo, status)
- ✅ **Datas** (ano, mês, dia)
- ✅ **Regiões** (estado, cidade, país)
- ✅ **IDs** (vendedor_id, cliente_id)

**Campos a Evitar:**

- ❌ **Valores únicos** (IDs de transação)
- ❌ **Campos com muitos valores distintos**
- ❌ **Campos numéricos contínuos**

### **Campos para Agregação**

**Campos Numéricos Ideais:**

- ✅ **Valores monetários** (vendas, preços, comissões)
- ✅ **Quantidades** (estoque, quantidade, contadores)
- ✅ **Métricas** (pontuação, rating, performance)

### **Exemplo de Configuração Otimizada**

**Entrada (vendas):**

```json
[
  {"categoria": "Eletrônicos", "vendedor": "João", "vendas": 1000, "quantidade": 5},
  {"categoria": "Eletrônicos", "vendedor": "João", "vendas": 2000, "quantidade": 10},
  {"categoria": "Roupas", "vendedor": "Maria", "vendas": 500, "quantidade": 20}
]
```

**Configuração Otimizada:**

```
Group By: categoria, vendedor
Fields to Aggregate:
  - vendas (Sum, Average)
  - quantidade (Sum, Average)
```

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Tratamento de Dados**

### **Dados Faltantes**

**Configuração para Ignorar Nulos:**

```
Skip Empty Values: true
```

**Exemplo:**

```json
// Entrada com valores nulos
[
  {"categoria": "A", "valor": 100},
  {"categoria": "A", "valor": null},
  {"categoria": "B", "valor": 200}
]

// Saída (null ignorado)
[
  {"categoria": "A", "valor_sum": 100},
  {"categoria": "B", "valor_sum": 200}
]
```

### **Valores Zero vs Nulos**

**Configuração:**

```
Include Zero Values: true
Skip Empty Values: true
```

**Resultado:**

- **Zero (0)**: Incluído nas agregações
- **Null/Undefined**: Ignorado nas agregações

### **Formatação de Resultados**

**Usando Code Node após Aggregate:**

```javascript
const items = $input.all();
const returnData = [];

for (const item of items) {
  const data = item.json;
  
  // Formatar valores monetários
  const formattedData = {
    ...data,
    vendas_sum: parseFloat(data.vendas_sum).toFixed(2),
    vendas_average: parseFloat(data.vendas_average).toFixed(2),
    percentual: ((data.vendas_sum / 10000) * 100).toFixed(1) + '%'
  };
  
  returnData.push({ json: formattedData });
}

return returnData;
```

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Exemplos de Workflows**

### **Workflow 1: Relatório de Vendas Mensal**

```
Schedule Trigger → HTTP Request (buscar vendas) → Aggregate → Email (relatório)
```

**Configuração Aggregate:**

```
Group By: mes, categoria
Fields to Aggregate:
  - vendas (Sum)
  - quantidade (Sum)
  - pedidos (Count)
```

### **Workflow 2: Dashboard de Performance**

```
Webhook (novos dados) → Aggregate → HTTP Request (atualizar dashboard)
```

**Configuração Aggregate:**

```
Group By: vendedor, mes
Fields to Aggregate:
  - vendas (Sum, Average)
  - comissao (Sum)
  - clientes (Count)
```

### **Workflow 3: Análise de Produtos**

```
Manual Trigger → CSV Parser → Aggregate → Set (formatação) → HTTP Request (salvar)
```

**Configuração Aggregate:**

```
Group By: categoria, fornecedor
Fields to Aggregate:
  - preco (Sum, Average, Min, Max)
  - estoque (Sum, Average)
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Limitações e Considerações**

### **Limitações Técnicas**

- **Memória**: Grandes conjuntos de dados podem consumir muita memória
- **Performance**: Agrupamentos complexos podem ser lentos
- **Campos**: Apenas campos existentes podem ser agrupados
- **Tipos**: Apenas campos numéricos podem ser agregados

### **Considerações de Design**

- **Campos de agrupamento**: Escolha campos com valores discretos
- **Funções de agregação**: Use funções apropriadas para cada tipo de dado
- **Performance**: Teste com conjuntos de dados reais
- **Resultados**: Valide se os resultados fazem sentido

### **Boas Práticas**

```javascript
// ✅ Bom: Campos de agrupamento apropriados
Group By: categoria, mes, vendedor

// ✅ Bom: Funções de agregação adequadas
Fields: vendas (Sum, Average), quantidade (Sum), pedidos (Count)

// ❌ Evitar: Muitos campos de agrupamento
Group By: id, timestamp, valor, categoria, vendedor, cliente, produto

// ❌ Evitar: Agregar campos não numéricos
Fields: nome (Sum), email (Average)  // Não faz sentido
```

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Próximos Passos**

Agora que você entende o Aggregate Node:

1. **[Set Node](./set)** - Para manipulação básica de dados
2. **[Split In Batches](./split-in-batches)** - Para processamento em lotes
3. **[Code Node](../core-nodes/code)** - Para lógica customizada
4. **[IF Node](../logic-control/if.md)** - Para controle de fluxo

---

:::tip **Dica Pro**
Use o **Aggregate Node** para criar relatórios e dashboards. Combine com **Code Node** para formatação personalizada dos resultados.
:::

:::info **Performance**
Escolha campos de agrupamento com valores discretos e evite agrupar por campos com muitos valores únicos.
:::

:::warning **Dados**
Certifique-se de que os campos numéricos estão no formato correto antes da agregação.
:::

---

**Links úteis:**

- [Documentação oficial do Aggregate](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.aggregate/)
- [Set Node](./set) - Para manipulação de dados
- [Split In Batches](./split-in-batches) - Para processamento em lotes
- [Code Node](../core-nodes/code) - Para lógica customizada
