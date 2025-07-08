---
sidebar_position: 5
title: Agregações e Estatísticas
description: Técnicas para calcular estatísticas, agregações e análises de dados no n8n
keywords: [n8n, agregações, estatísticas, cálculos, análise de dados, métricas, relatórios]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="analytics-outline" size={32} color="#ea4b71" /> Agregações e Estatísticas

Aprenda técnicas avançadas para calcular estatísticas, criar agregações e gerar análises de dados que forneçam insights valiosos para seus workflows.

---

## <IonicIcon name="calculator-outline" size={24} color="#ea4b71" /> 1 | Estatísticas Básicas

### <IonicIcon name="trending-up-outline" size={20} color="#10b981" /> Métricas de Tendência Central

**Calcular médias, medianas e modas:**

```javascript
// Média aritmética
{{ (function(valores) {
  const soma = valores.reduce((acc, val) => acc + val, 0);
  return soma / valores.length;
})($json.vendas.map(v => v.valor)) }}

// Mediana
{{ (function(valores) {
  const ordenados = valores.sort((a, b) => a - b);
  const meio = Math.floor(ordenados.length / 2);
  return ordenados.length % 2 === 0 
    ? (ordenados[meio - 1] + ordenados[meio]) / 2 
    : ordenados[meio];
})($json.vendas.map(v => v.valor)) }}

// Moda (valor mais frequente)
{{ (function(valores) {
  const frequencias = {};
  valores.forEach(valor => {
    frequencias[valor] = (frequencias[valor] || 0) + 1;
  });
  return Object.keys(frequencias).reduce((a, b) => 
    frequencias[a] > frequencias[b] ? a : b
  );
})($json.vendas.map(v => v.valor)) }}
```

### <IonicIcon name="pulse-outline" size={20} color="#10b981" /> Medidas de Dispersão

**Calcular variância e desvio padrão:**

```javascript
// Variância
{{ (function(valores) {
  const media = valores.reduce((acc, val) => acc + val, 0) / valores.length;
  const quadrados = valores.map(val => Math.pow(val - media, 2));
  return quadrados.reduce((acc, val) => acc + val, 0) / valores.length;
})($json.vendas.map(v => v.valor)) }}

// Desvio padrão
{{ (function(valores) {
  const media = valores.reduce((acc, val) => acc + val, 0) / valores.length;
  const quadrados = valores.map(val => Math.pow(val - media, 2));
  const variancia = quadrados.reduce((acc, val) => acc + val, 0) / valores.length;
  return Math.sqrt(variancia);
})($json.vendas.map(v => v.valor)) }}
```

---

## <IonicIcon name="git-merge-outline" size={24} color="#ea4b71" /> 2 | Agregações por Grupo

### <IonicIcon name="folder-outline" size={20} color="#10b981" /> Agrupar por Categoria

**Exemplo: Análise de vendas por categoria:**

```javascript
// Agregar vendas por categoria
{{ (function(vendas) {
  return vendas.reduce((acc, venda) => {
    const categoria = venda.categoria;
    
    if (!acc[categoria]) {
      acc[categoria] = {
        categoria: categoria,
        total_vendas: 0,
        quantidade: 0,
        ticket_medio: 0,
        vendas: []
      };
    }
    
    acc[categoria].total_vendas += venda.valor;
    acc[categoria].quantidade += venda.quantidade;
    acc[categoria].vendas.push(venda);
    
    return acc;
  }, {});
})($json.vendas) }}
```

### <IonicIcon name="calendar-outline" size={20} color="#10b981" /> Agregações Temporais

**Análise por período:**

```javascript
// Agregar por mês
{{ (function(vendas) {
  return vendas.reduce((acc, venda) => {
    const data = new Date(venda.data);
    const mes = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[mes]) {
      acc[mes] = {
        mes: mes,
        total: 0,
        quantidade: 0,
        vendas_diarias: 0,
        dias: new Set()
      };
    }
    
    acc[mes].total += venda.valor;
    acc[mes].quantidade += venda.quantidade;
    acc[mes].dias.add(data.toDateString());
    
    return acc;
  }, {});
})($json.vendas) }}
```

---

## <IonicIcon name="bar-chart-outline" size={24} color="#ea4b71" /> 3 | Análises de Distribuição

### <IonicIcon name="pie-chart-outline" size={20} color="#10b981" /> Distribuição de Frequências

**Criar histogramas e distribuições:**

```javascript
// Distribuição de valores por faixa
{{ (function(valores) {
  const faixas = [
    { min: 0, max: 100, label: '0-100' },
    { min: 101, max: 500, label: '101-500' },
    { min: 501, max: 1000, label: '501-1000' },
    { min: 1001, max: Infinity, label: '1000+' }
  ];
  
  return faixas.map(faixa => ({
    faixa: faixa.label,
    quantidade: valores.filter(val => val >= faixa.min && val <= faixa.max).length,
    percentual: (valores.filter(val => val >= faixa.min && val <= faixa.max).length / valores.length) * 100
  }));
})($json.vendas.map(v => v.valor)) }}
```

### <IonicIcon name="stats-chart-outline" size={20} color="#10b981" /> Percentis e Quartis

**Calcular percentis para análise:**

```javascript
// Calcular percentis
{{ (function(valores, percentil) {
  const ordenados = valores.sort((a, b) => a - b);
  const indice = Math.ceil((percentil / 100) * ordenados.length) - 1;
  return ordenados[indice];
})($json.vendas.map(v => v.valor), 90) }}

// Quartis (25%, 50%, 75%)
{{ (function(valores) {
  const ordenados = valores.sort((a, b) => a - b);
  return {
    q1: ordenados[Math.floor(ordenados.length * 0.25)],
    q2: ordenados[Math.floor(ordenados.length * 0.50)],
    q3: ordenados[Math.floor(ordenados.length * 0.75)]
  };
})($json.vendas.map(v => v.valor)) }}
```

---

## <IonicIcon name="trending-up-outline" size={24} color="#ea4b71" /> 4 | Análises de Tendência

### <IonicIcon name="arrow-up-outline" size={20} color="#10b981" /> Crescimento e Decrescimento

**Calcular taxas de crescimento:**

```javascript
// Taxa de crescimento mensal
{{ (function(vendas) {
  const porMes = vendas.reduce((acc, venda) => {
    const mes = new Date(venda.data).toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long' 
    });
    acc[mes] = (acc[mes] || 0) + venda.valor;
    return acc;
  }, {});
  
  const meses = Object.keys(porMes).sort();
  const taxas = [];
  
  for (let i = 1; i < meses.length; i++) {
    const atual = porMes[meses[i]];
    const anterior = porMes[meses[i-1]];
    const taxa = ((atual - anterior) / anterior) * 100;
    taxas.push({
      mes: meses[i],
      valor: atual,
      taxa_crescimento: taxa,
      tendencia: taxa > 0 ? 'crescimento' : 'decrescimento'
    });
  }
  
  return taxas;
})($json.vendas) }}
```

### <IonicIcon name="repeat-outline" size={20} color="#10b981" /> Sazonalidade

**Identificar padrões sazonais:**

```javascript
// Análise de sazonalidade por dia da semana
{{ (function(vendas) {
  const porDia = vendas.reduce((acc, venda) => {
    const dia = new Date(venda.data).toLocaleDateString('pt-BR', { weekday: 'long' });
    acc[dia] = (acc[dia] || 0) + venda.valor;
    return acc;
  }, {});
  
  const media = Object.values(porDia).reduce((acc, val) => acc + val, 0) / Object.keys(porDia).length;
  
  return Object.entries(porDia).map(([dia, valor]) => ({
    dia: dia,
    valor: valor,
    variacao_media: ((valor - media) / media) * 100
  }));
})($json.vendas) }}
```

---

## <IonicIcon name="people-outline" size={24} color="#ea4b71" /> 5 | Análises de Clientes

### <IonicIcon name="person-circle-outline" size={20} color="#10b981" /> Segmentação RFM

**Análise RFM (Recency, Frequency, Monetary):**

```javascript
// Análise RFM de clientes
{{ (function(clientes) {
  const hoje = new Date();
  
  return clientes.map(cliente => {
    const ultimaCompra = new Date(cliente.ultima_compra);
    const recency = Math.floor((hoje - ultimaCompra) / (1000 * 60 * 60 * 24));
    
    return {
      cliente_id: cliente.id,
      nome: cliente.nome,
      recency: recency,
      frequency: cliente.total_compras,
      monetary: cliente.valor_total,
      score_rfm: (recency * 0.3) + (cliente.total_compras * 0.3) + (cliente.valor_total * 0.4),
      segmento: (function() {
        if (recency <= 30 && cliente.total_compras >= 5 && cliente.valor_total >= 1000) return 'VIP';
        if (recency <= 90 && cliente.total_compras >= 3 && cliente.valor_total >= 500) return 'Premium';
        if (recency <= 180 && cliente.total_compras >= 1) return 'Regular';
        return 'Inativo';
      })()
    };
  });
})($json.clientes) }}
```

### <IonicIcon name="trophy-outline" size={20} color="#10b981" /> Ranking e Top Performers

**Identificar melhores clientes:**

```javascript
// Top 10 clientes por valor
{{ (function(clientes) {
  return clientes
    .sort((a, b) => b.valor_total - a.valor_total)
    .slice(0, 10)
    .map((cliente, index) => ({
      ranking: index + 1,
      cliente_id: cliente.id,
      nome: cliente.nome,
      valor_total: cliente.valor_total,
      percentual_total: (cliente.valor_total / clientes.reduce((acc, c) => acc + c.valor_total, 0)) * 100
    }));
})($json.clientes) }}
```

---

## <IonicIcon name="analytics-outline" size={24} color="#ea4b71" /> 6 | Métricas de Performance

### <IonicIcon name="speedometer-outline" size={20} color="#10b981" /> KPIs de Negócio

**Calcular indicadores-chave:**

```javascript
// KPIs de vendas
{{ (function(vendas) {
  const total = vendas.reduce((acc, v) => acc + v.valor, 0);
  const quantidade = vendas.reduce((acc, v) => acc + v.quantidade, 0);
  const clientes_unicos = new Set(vendas.map(v => v.cliente_id)).size;
  
  return {
    receita_total: total,
    quantidade_vendida: quantidade,
    ticket_medio: total / vendas.length,
    clientes_unicos: clientes_unicos,
    vendas_por_cliente: vendas.length / clientes_unicos,
    valor_medio_por_cliente: total / clientes_unicos
  };
})($json.vendas) }}
```

### <IonicIcon name="trending-down-outline" size={20} color="#10b981" /> Análise de Churn

**Calcular taxa de abandono:**

```javascript
// Análise de churn
{{ (function(clientes) {
  const hoje = new Date();
  const periodo_analise = 90; // dias
  
  const ativos = clientes.filter(c => {
    const ultima_atividade = new Date(c.ultima_atividade);
    return (hoje - ultima_atividade) <= (periodo_analise * 24 * 60 * 60 * 1000);
  });
  
  const inativos = clientes.filter(c => {
    const ultima_atividade = new Date(c.ultima_atividade);
    return (hoje - ultima_atividade) > (periodo_analise * 24 * 60 * 60 * 1000);
  });
  
  return {
    total_clientes: clientes.length,
    clientes_ativos: ativos.length,
    clientes_inativos: inativos.length,
    taxa_churn: (inativos.length / clientes.length) * 100,
    taxa_retencao: (ativos.length / clientes.length) * 100
  };
})($json.clientes) }}
```

---

## <IonicIcon name="document-text-outline" size={24} color="#ea4b71" /> 7 | Relatórios Automatizados

### <IonicIcon name="newspaper-outline" size={20} color="#10b981" /> Resumo Executivo

**Gerar relatório resumido:**

```javascript
// Relatório executivo de vendas
{{ (function(vendas, clientes) {
  const total_vendas = vendas.reduce((acc, v) => acc + v.valor, 0);
  const media_venda = total_vendas / vendas.length;
  const top_categoria = (function() {
    const porCategoria = vendas.reduce((acc, v) => {
      acc[v.categoria] = (acc[v.categoria] || 0) + v.valor;
      return acc;
    }, {});
    return Object.entries(porCategoria).sort((a, b) => b[1] - a[1])[0];
  })();
  
  return {
    periodo: {
      inicio: new Date(Math.min(...vendas.map(v => new Date(v.data)))).toLocaleDateString('pt-BR'),
      fim: new Date(Math.max(...vendas.map(v => new Date(v.data)))).toLocaleDateString('pt-BR')
    },
    metricas: {
      total_vendas: total_vendas,
      quantidade_transacoes: vendas.length,
      ticket_medio: media_venda,
      clientes_ativos: new Set(vendas.map(v => v.cliente_id)).size
    },
    destaque: {
      categoria_mais_vendida: top_categoria[0],
      valor_categoria: top_categoria[1],
      percentual_categoria: (top_categoria[1] / total_vendas) * 100
    },
    tendencias: {
      crescimento_mensal: 15.5, // Exemplo
      sazonalidade: 'Alta temporada',
      previsao_proximo_mes: total_vendas * 1.1
    }
  };
})($json.vendas, $json.clientes) }}
```

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> 8 | Próximos passos

1. **[Integração com APIs](./integracao-apis)** - Mapeamento de respostas
2. **[Otimização de Performance](./otimizacao-performance)** - Melhorar eficiência
3. **[Visualização de Dados](./visualizacao-dados)** - Criar dashboards

> *Agora você domina técnicas de agregação e estatística. Use essas habilidades para criar análises poderosas e insights valiosos!*

---

:::tip **Dica Pro**
Crie templates de relatórios que podem ser reutilizados com diferentes conjuntos de dados. Isso acelera a criação de análises.
:::

:::warning **Importante**
Sempre valide os dados antes de calcular estatísticas. Dados inconsistentes podem gerar resultados enganosos.
:::

:::info **Recurso Adicional**
Use o Google Sheets node para exportar análises e criar dashboards interativos com os dados processados.
::: 
