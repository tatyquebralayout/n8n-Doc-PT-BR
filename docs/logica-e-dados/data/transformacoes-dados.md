---
sidebar_position: 4
title: Transformações de Dados
description: Técnicas para transformar, normalizar e preparar dados para diferentes sistemas
keywords: [n8n, transformações, normalização, preparação de dados, conversão, formatação]
---


# <ion-icon name="analytics-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Transformações de Dados

Aprenda técnicas eficientes para transformar dados entre diferentes formatos, normalizar informações e preparar dados para integração com diversos sistemas.

---

## <ion-icon name="repeat-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 1 | Tipos de Transformação

###  Transformações Estruturais

**Modificar a estrutura dos dados:**

- **Flatten**: Converter objetos aninhados em estrutura plana
- **Nest**: Agrupar dados em estruturas hierárquicas
- **Pivot**: Rotacionar dados de linhas para colunas
- **Unpivot**: Rotacionar dados de colunas para linhas

###  Transformações de Formato

**Alterar o formato dos dados:**

- **JSON ↔ XML**: Conversão entre formatos
- **CSV ↔ JSON**: Transformação de tabelas
- **Base64**: Codificação/decodificação
- **URL Encoding**: Codificação de URLs

---

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 2 | Normalização de Dados

###  Padronização de Campos

**Exemplo: Normalizar endereços brasileiros:**

```javascript
// Input: Dados inconsistentes
{
  "endereco": "Rua das Flores, 123 - Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01234-567"
}

// Output: Dados normalizados
{
  "logradouro": "Rua das Flores",
  "numero": "123",
  "complemento": "Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01234-567",
  "pais": "Brasil"
}
```

###  Validação e Correção

**Validar e corrigir dados:**

```javascript
// Validar e corrigir telefone
{{ (function(telefone) {
  // Remove caracteres não numéricos
  const numeros = telefone.replace(/\D/g, '');
  
  // Verifica se tem 10 ou 11 dígitos
  if (numeros.length === 11) {
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (numeros.length === 10) {
    return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return 'Telefone inválido';
})($json.telefone) }}
```

---

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 3 | Agregação de Dados

###  Cálculos de Resumo

**Exemplo: Agregar vendas por categoria:**

```javascript
// Input: Lista de vendas
[
  { "categoria": "Eletrônicos", "valor": 1500, "quantidade": 2 },
  { "categoria": "Roupas", "valor": 300, "quantidade": 5 },
  { "categoria": "Eletrônicos", "valor": 800, "quantidade": 1 },
  { "categoria": "Livros", "valor": 200, "quantidade": 4 }
]

// Output: Resumo por categoria
[
  {
    "categoria": "Eletrônicos",
    "total_vendas": 2300,
    "quantidade_total": 3,
    "ticket_medio": 766.67
  },
  {
    "categoria": "Roupas",
    "total_vendas": 300,
    "quantidade_total": 5,
    "ticket_medio": 60
  },
  {
    "categoria": "Livros",
    "total_vendas": 200,
    "quantidade_total": 4,
    "ticket_medio": 50
  }
]
```

###  Análises Temporais

**Agregar dados por período:**

```javascript
// Agrupar por mês
{{ (function(vendas) {
  return vendas.reduce((acc, venda) => {
    const mes = new Date(venda.data).toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long' 
    });
    
    if (!acc[mes]) {
      acc[mes] = { mes, total: 0, quantidade: 0 };
    }
    
    acc[mes].total += venda.valor;
    acc[mes].quantidade += venda.quantidade;
    
    return acc;
  }, {});
})($json.vendas) }}
```

---

## <ion-icon name="filter-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 4 | Filtros e Segmentação

###  Filtros Condicionais

**Exemplo: Segmentar clientes por valor:**

```javascript
// Segmentar clientes
{{ (function(clientes) {
  return {
    vip: clientes.filter(c => c.valor_total > 10000),
    premium: clientes.filter(c => c.valor_total > 5000 && c.valor_total <= 10000),
    regular: clientes.filter(c => c.valor_total <= 5000)
  };
})($json.clientes) }}
```

###  Busca e Filtros

**Filtrar por critérios complexos:**

```javascript
// Filtrar produtos em estoque
{{ $json.produtos.filter(produto => 
  produto.estoque > 0 && 
  produto.status === 'ativo' &&
  produto.preco > 0
) }}

// Buscar por texto
{{ $json.clientes.filter(cliente => 
  cliente.nome.toLowerCase().includes($json.termo_busca.toLowerCase()) ||
  cliente.email.toLowerCase().includes($json.termo_busca.toLowerCase())
) }}
```

---

## <ion-icon name="repeat-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 5 | Conversão de Formatos

###  JSON para CSV

**Converter dados estruturados para tabela:**

```javascript
// Converter JSON para CSV
{{ (function(dados) {
  if (!dados || dados.length === 0) return '';
  
  // Obter cabeçalhos
  const headers = Object.keys(dados[0]);
  
  // Criar linha de cabeçalho
  const headerRow = headers.join(',');
  
  // Criar linhas de dados
  const dataRows = dados.map(item => 
    headers.map(header => {
      const value = item[header];
      // Escapar vírgulas e aspas
      return typeof value === 'string' && value.includes(',') 
        ? `"${value}"` 
        : value;
    }).join(',')
  );
  
  return [headerRow, ...dataRows].join('\n');
})($json.dados) }}
```

###  XML para JSON

**Converter XML estruturado:**

```javascript
// Converter XML para JSON
{{ (function(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  
  function xmlToJson(xml) {
    const obj = {};
    
    if (xml.nodeType === 1) { // Element node
      if (xml.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) { // Text node
      obj = xml.nodeValue;
    }
    
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
        
        if (typeof(obj[nodeName]) === 'undefined') {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) === 'undefined') {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    
    return obj;
  }
  
  return xmlToJson(xmlDoc);
})($json.xml_data) }}
```

---

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 6 | Enriquecimento de Dados

###  Adicionar Informações

**Exemplo: Enriquecer dados de clientes:**

```javascript
// Enriquecer dados de clientes
{{ $json.clientes.map(cliente => ({
  ...cliente,
  // Adicionar informações calculadas
  idade: new Date().getFullYear() - new Date(cliente.data_nascimento).getFullYear(),
  tempo_cliente: Math.floor((new Date() - new Date(cliente.data_cadastro)) / (1000 * 60 * 60 * 24 * 365)),
  // Adicionar segmentação
  segmento: cliente.valor_total > 10000 ? 'VIP' : cliente.valor_total > 5000 ? 'Premium' : 'Regular',
  // Adicionar informações de localização
  regiao: cliente.estado === 'SP' || cliente.estado === 'RJ' ? 'Sudeste' : 'Outras regiões'
})) }}
```

###  Join de Dados

**Combinar dados de diferentes fontes:**

```javascript
// Join de produtos com categorias
{{ (function(produtos, categorias) {
  return produtos.map(produto => {
    const categoria = categorias.find(cat => cat.id === produto.categoria_id);
    return {
      ...produto,
      categoria_nome: categoria ? categoria.nome : 'Sem categoria',
      categoria_descricao: categoria ? categoria.descricao : ''
    };
  });
})($json.produtos, $json.categorias) }}
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 7 | Sanitização e Limpeza

###  Limpeza de Dados

**Remover dados inconsistentes:**

```javascript
// Limpar dados de clientes
{{ $json.clientes.map(cliente => ({
  nome: cliente.nome.trim().replace(/\s+/g, ' '),
  email: cliente.email.toLowerCase().trim(),
  telefone: cliente.telefone.replace(/\D/g, ''),
  cpf: cliente.cpf.replace(/\D/g, ''),
  // Remover campos vazios
  ...Object.fromEntries(
    Object.entries(cliente).filter(([key, value]) => 
      value !== null && value !== undefined && value !== ''
    )
  )
})) }}
```

###  Validação de Integridade

**Verificar qualidade dos dados:**

```javascript
// Validar integridade dos dados
{{ (function(dados) {
  const erros = [];
  
  dados.forEach((item, index) => {
    // Verificar campos obrigatórios
    if (!item.nome || !item.email) {
      erros.push(`Item ${index}: Campos obrigatórios faltando`);
    }
    
    // Verificar formato de email
    if (item.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.email)) {
      erros.push(`Item ${index}: Email inválido`);
    }
    
    // Verificar CPF
    if (item.cpf && item.cpf.length !== 11) {
      erros.push(`Item ${index}: CPF inválido`);
    }
  });
  
  return {
    dados_validos: dados.filter((item, index) => 
      !erros.some(erro => erro.includes(`Item ${index}`))
    ),
    erros: erros,
    total_validos: dados.length - erros.length,
    total_erros: erros.length
  };
})($json.dados) }}
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 8 | Próximos passos

1. **[Agregações e Estatísticas](./agregacoes-estatisticas)** - Cálculos complexos
2. **[Integração com APIs](./integracao-apis)** - Mapeamento de respostas
3. **[Otimização de Performance](./otimizacao-performance)** - Melhorar eficiência

> *Agora você domina técnicas de transformação de dados. Use essas habilidades para integrar sistemas diferentes e manter dados consistentes!*

---

:::tip **Dica Pro**
Crie templates de transformação reutilizáveis para formatos comuns como CPF, telefone, endereços brasileiros, etc.
:::

:::warning **Importante**
Sempre valide os dados após transformações para garantir que a integridade foi mantida.
:::

:::info **Recurso Adicional**
Use o Set node para transformações complexas que envolvem múltiplas etapas de processamento.
::: 
