---
title: Switch Node
description: Guia completo sobre o Switch Node no n8n, incluindo múltiplas condições, roteamento, exemplos práticos e boas práticas
sidebar_position: 2
keywords: [n8n, switch node, múltiplas condições, roteamento, lógica, decisões, fluxo]
---

# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Switch Node

O **Switch Node** é uma ferramenta avançada do n8n para controle de fluxo com múltiplas condições. Ele permite criar workflows dinâmicos com vários caminhos baseados em diferentes critérios.

## O que é o Switch Node?

O **Switch Node** permite:

- **Criar múltiplas condições** em um único node
- **Rotear dados** para diferentes caminhos
- **Implementar lógica complexa** de decisão
- **Processar dados** de forma paralela
- **Criar workflows escaláveis** e organizados
- **Reduzir complexidade** de múltiplos If Nodes

### Quando Usar o Switch Node

- **Classificação** de dados por múltiplos critérios
- **Roteamento** para diferentes processos
- **Validação** com múltiplas regras
- **Processamento** paralelo de dados
- **Workflows** com muitas condições
- **Lógica de negócio** complexa

## Configuração Básica

### Estrutura do Switch Node

```javascript
// Switch Node - Estrutura básica
{
  "rules": [
    {
      "condition": "{{ $json.categoria === 'urgente' }}",
      "output": "Processamento Urgente"
    },
    {
      "condition": "{{ $json.categoria === 'normal' }}",
      "output": "Processamento Normal"
    },
    {
      "condition": "{{ $json.categoria === 'baixa' }}",
      "output": "Processamento Baixa Prioridade"
    }
  ],
  "default": "Processamento Padrão"
}
```

### Tipos de Condições

#### 1. Condições Simples

```javascript
// Verificar valor exato
{
  "condition": "{{ $json.status === 'ativo' }}",
  "output": "Cliente Ativo"
}

// Verificar múltiplos valores
{
  "condition": "{{ $json.categoria === 'premium' || $json.categoria === 'vip' }}",
  "output": "Cliente Premium"
}

// Verificar se campo existe
{
  "condition": "{{ $json.email && $json.email.length > 0 }}",
  "output": "Email Válido"
}
```

#### 2. Condições Numéricas

```javascript
// Faixas de valor
{
  "condition": "{{ $json.valor > 10000 }}",
  "output": "Valor Alto"
}

// Múltiplas faixas
{
  "condition": "{{ $json.valor >= 1000 && $json.valor <= 5000 }}",
  "output": "Valor Médio"
}

// Comparações complexas
{
  "condition": "{{ $json.idade >= 18 && $json.idade <= 65 }}",
  "output": "Idade Válida"
}
```

#### 3. Condições de String

```javascript
// Verificar início de string
{
  "condition": "{{ $json.email.startsWith('admin') }}",
  "output": "Administrador"
}

// Verificar fim de string
{
  "condition": "{{ $json.arquivo.endsWith('.pdf') }}",
  "output": "Documento PDF"
}

// Verificar conteúdo
{
  "condition": "{{ $json.descricao.includes('urgente') }}",
  "output": "Urgente"
}

// Regex
{
  "condition": "{{ /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email) }}",
  "output": "Email Válido"
}
```

#### 4. Condições com Arrays

```javascript
// Verificar se array contém valor
{
  "condition": "{{ $json.tags.includes('importante') }}",
  "output": "Tag Importante"
}

// Verificar tamanho do array
{
  "condition": "{{ $json.itens.length > 10 }}",
  "output": "Muitos Itens"
}

// Verificar se array está vazio
{
  "condition": "{{ $json.produtos.length === 0 }}",
  "output": "Sem Produtos"
}
```

#### 5. Condições com Datas

```javascript
// Verificar se é hoje
{
  "condition": "{{ $json.data === $today }}",
  "output": "Hoje"
}

// Verificar se é fim de semana
{
  "condition": "{{ [0, 6].includes(new Date($json.data).getDay()) }}",
  "output": "Fim de Semana"
}

// Verificar se é horário comercial
{
  "condition": "{{ new Date().getHours() >= 8 && new Date().getHours() <= 18 }}",
  "output": "Horário Comercial"
}
```

## Exemplos Práticos

### 1. Classificação de Clientes

```javascript
// Switch Node - Classificação de clientes
{
  "rules": [
    {
      "condition": "{{ $json.valor_total > 10000 && $json.frequencia > 10 }}",
      "output": "Cliente VIP"
    },
    {
      "condition": "{{ $json.valor_total > 5000 || $json.categoria === 'premium' }}",
      "output": "Cliente Premium"
    },
    {
      "condition": "{{ $json.valor_total > 1000 && $json.ativo }}",
      "output": "Cliente Ativo"
    },
    {
      "condition": "{{ $json.ativo }}",
      "output": "Cliente Regular"
    }
  ],
  "default": "Cliente Inativo"
}
```

### 2. Roteamento de Pedidos

```javascript
// Switch Node - Roteamento de pedidos
{
  "rules": [
    {
      "condition": "{{ $json.urgente && $json.valor > 5000 }}",
      "output": "Aprovação Gerencial"
    },
    {
      "condition": "{{ $json.categoria === 'financeiro' }}",
      "output": "Aprovação Financeira"
    },
    {
      "condition": "{{ $json.valor > 1000 }}",
      "output": "Aprovação Supervisor"
    },
    {
      "condition": "{{ $json.status === 'rascunho' }}",
      "output": "Aguardando Finalização"
    }
  ],
  "default": "Aprovação Automática"
}
```

### 3. Validação de Dados

```javascript
// Switch Node - Validação de dados
{
  "rules": [
    {
      "condition": "{{ !$json.nome || $json.nome.length < 2 }}",
      "output": "Nome Inválido"
    },
    {
      "condition": "{{ !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email) }}",
      "output": "Email Inválido"
    },
    {
      "condition": "{{ !$json.cpf || $json.cpf.length !== 11 }}",
      "output": "CPF Inválido"
    },
    {
      "condition": "{{ $json.idade < 18 }}",
      "output": "Menor de Idade"
    }
  ],
  "default": "Dados Válidos"
}
```

### 4. Processamento por Região

```javascript
// Switch Node - Processamento por região
{
  "rules": [
    {
      "condition": "{{ $json.regiao === 'norte' }}",
      "output": "Processamento Norte"
    },
    {
      "condition": "{{ $json.regiao === 'nordeste' }}",
      "output": "Processamento Nordeste"
    },
    {
      "condition": "{{ $json.regiao === 'centro-oeste' }}",
      "output": "Processamento Centro-Oeste"
    },
    {
      "condition": "{{ $json.regiao === 'sudeste' }}",
      "output": "Processamento Sudeste"
    },
    {
      "condition": "{{ $json.regiao === 'sul' }}",
      "output": "Processamento Sul"
    }
  ],
  "default": "Região Não Identificada"
}
```

### 5. Análise de Performance

```javascript
// Switch Node - Análise de performance
{
  "rules": [
    {
      "condition": "{{ $json.tempo_execucao < 1000 }}",
      "output": "Performance Excelente"
    },
    {
      "condition": "{{ $json.tempo_execucao >= 1000 && $json.tempo_execucao < 5000 }}",
      "output": "Performance Boa"
    },
    {
      "condition": "{{ $json.tempo_execucao >= 5000 && $json.tempo_execucao < 10000 }}",
      "output": "Performance Regular"
    },
    {
      "condition": "{{ $json.tempo_execucao >= 10000 }}",
      "output": "Performance Ruim"
    }
  ],
  "default": "Performance Não Medida"
}
```

## Casos de Uso Avançados

### 1. Múltiplas Condições Aninhadas

```javascript
// Switch Node - Condições complexas
{
  "rules": [
    {
      "condition": "{{ $json.categoria === 'urgente' && $json.valor > 5000 && $json.cliente_vip }}",
      "output": "Processamento VIP Urgente"
    },
    {
      "condition": "{{ $json.categoria === 'urgente' && $json.valor > 5000 }}",
      "output": "Processamento Urgente Alto Valor"
    },
    {
      "condition": "{{ $json.categoria === 'urgente' }}",
      "output": "Processamento Urgente"
    },
    {
      "condition": "{{ $json.valor > 10000 }}",
      "output": "Processamento Alto Valor"
    },
    {
      "condition": "{{ $json.cliente_vip }}",
      "output": "Processamento VIP"
    }
  ],
  "default": "Processamento Padrão"
}
```

### 2. Roteamento Dinâmico

```javascript
// Switch Node - Roteamento dinâmico
{
  "rules": [
    {
      "condition": "{{ $json.tipo === 'venda' && $json.valor > 1000 }}",
      "output": "{{ 'Venda_' + $json.categoria + '_Alto_Valor' }}"
    },
    {
      "condition": "{{ $json.tipo === 'venda' }}",
      "output": "{{ 'Venda_' + $json.categoria }}"
    },
    {
      "condition": "{{ $json.tipo === 'suporte' && $json.prioridade === 'alta' }}",
      "output": "Suporte_Urgente"
    },
    {
      "condition": "{{ $json.tipo === 'suporte' }}",
      "output": "Suporte_Regular"
    }
  ],
  "default": "Processamento_Geral"
}
```

### 3. Validação em Etapas

```javascript
// Switch Node - Validação em etapas
{
  "rules": [
    {
      "condition": "{{ !$json.dados_basicos }}",
      "output": "Validar Dados Básicos"
    },
    {
      "condition": "{{ !$json.dados_financeiros }}",
      "output": "Validar Dados Financeiros"
    },
    {
      "condition": "{{ !$json.documentos }}",
      "output": "Validar Documentos"
    },
    {
      "condition": "{{ !$json.aprovacao }}",
      "output": "Aguardar Aprovação"
    }
  ],
  "default": "Processamento Completo"
}
```

### 4. Análise de Tendências

```javascript
// Switch Node - Análise de tendências
{
  "rules": [
    {
      "condition": "{{ $json.crescimento > 20 && $json.tendencia === 'positiva' }}",
      "output": "Crescimento Forte"
    },
    {
      "condition": "{{ $json.crescimento > 10 && $json.tendencia === 'positiva' }}",
      "output": "Crescimento Moderado"
    },
    {
      "condition": "{{ $json.crescimento > 0 }}",
      "output": "Crescimento Leve"
    },
    {
      "condition": "{{ $json.crescimento < 0 && $json.tendencia === 'negativa' }}",
      "output": "Declínio"
    },
    {
      "condition": "{{ $json.crescimento === 0 }}",
      "output": "Estável"
    }
  ],
  "default": "Tendência Indefinida"
}
```

## Workflows Complexos

### 1. Switch Node com Merge

```
Switch Node → Processamento A → Merge Node
    ↓              ↓              ↓
Switch Node → Processamento B → Merge Node
    ↓              ↓              ↓
Switch Node → Processamento C → Merge Node
```

### 2. Switch Node Aninhado

```javascript
// Primeiro Switch - Categoria
{
  "rules": [
    {
      "condition": "{{ $json.categoria === 'vendas' }}",
      "output": "Switch Vendas"
    },
    {
      "condition": "{{ $json.categoria === 'suporte' }}",
      "output": "Switch Suporte"
    }
  ]
}

// Switch Vendas - Tipo de venda
{
  "rules": [
    {
      "condition": "{{ $json.valor > 1000 }}",
      "output": "Venda Alto Valor"
    },
    {
      "condition": "{{ $json.valor > 500 }}",
      "output": "Venda Médio Valor"
    }
  ],
  "default": "Venda Baixo Valor"
}
```

### 3. Switch Node com Paralelização

```
Switch Node → Processamento Paralelo A
    ↓              ↓
Switch Node → Processamento Paralelo B
    ↓              ↓
Switch Node → Processamento Paralelo C
```

## Boas Práticas

### 1. Ordem das Condições

```javascript
// ✅ Bom: Condições mais específicas primeiro
{
  "rules": [
    {
      "condition": "{{ $json.urgente && $json.valor > 10000 }}",
      "output": "Máxima Prioridade"
    },
    {
      "condition": "{{ $json.urgente }}",
      "output": "Alta Prioridade"
    },
    {
      "condition": "{{ $json.valor > 1000 }}",
      "output": "Média Prioridade"
    }
  ]
}

// ❌ Evitar: Condições genéricas primeiro
{
  "rules": [
    {
      "condition": "{{ $json.valor > 1000 }}",
      "output": "Média Prioridade"
    },
    {
      "condition": "{{ $json.urgente }}",
      "output": "Alta Prioridade"
    }
  ]
}
```

### 2. Nomenclatura de Saídas

```javascript
// ✅ Bom: Nomes descritivos
{
  "output": "Processamento_Urgente_Alto_Valor"
}

// ❌ Evitar: Nomes genéricos
{
  "output": "Option1"
}
```

### 3. Condições Simples

```javascript
// ✅ Bom: Condições claras
{
  "condition": "{{ $json.status === 'ativo' && $json.valor > 1000 }}"
}

// ❌ Evitar: Condições muito complexas
{
  "condition": "{{ $json.status === 'ativo' && $json.valor > 1000 && $json.categoria === 'premium' && $json.regiao === 'sudeste' && $json.idade >= 18 }}"
}
```

### 4. Uso do Default

```javascript
// ✅ Bom: Sempre definir default
{
  "rules": [...],
  "default": "Processamento Padrão"
}

// ❌ Evitar: Deixar sem default
{
  "rules": [...]
}
```

## Troubleshooting

### Problemas Comuns

#### Dados não seguem caminho esperado
- Verifique a ordem das condições
- Confirme se os dados estão corretos
- Teste com dados de exemplo
- Use Debug Helper para ver dados

#### Condições não funcionam
- Verifique sintaxe das expressões
- Confirme se os campos existem
- Teste condições individualmente
- Verifique tipos de dados

#### Performance lenta
- Reduza número de condições
- Simplifique expressões
- Use condições eficientes
- Considere usar If Nodes separados

### Debug

```javascript
// Code Node - Debug de Switch Node
const debugSwitch = (dados) => {
  console.log('=== DEBUG SWITCH ===');
  console.log('Dados:', dados);
  console.log('Campos:', Object.keys(dados));
  console.log('Valores:', Object.entries(dados));
  console.log('====================');
  
  return dados;
};

// Usar antes do Switch Node
return { json: debugSwitch($json) };
```

## Integração com Outros Nodes

### 1. Switch Node + Set Node

```javascript
// Switch Node - Classificar dados
{
  "rules": [
    {
      "condition": "{{ $json.valor > 1000 }}",
      "output": "Alto Valor"
    }
  ],
  "default": "Baixo Valor"
}

// Set Node - Adicionar metadados
{
  "mode": "keepAllSet",
  "values": {
    "string": [
      {
        "name": "categoria_processamento",
        "value": "{{ $json.categoria }}"
      },
      {
        "name": "timestamp_processamento",
        "value": "{{ $now.toISOString() }}"
      }
    ]
  }
}
```

### 2. Switch Node + HTTP Request

```javascript
// Switch Node - Rotear para APIs diferentes
{
  "rules": [
    {
      "condition": "{{ $json.tipo === 'cliente' }}",
      "output": "API Clientes"
    },
    {
      "condition": "{{ $json.tipo === 'produto' }}",
      "output": "API Produtos"
    }
  ],
  "default": "API Geral"
}

// HTTP Request - Usar endpoint dinâmico
{
  "url": "{{ $json.endpoint }}",
  "method": "POST",
  "body": "{{ $json.payload }}"
}
```

## Próximos Passos

- [If Node](/integracoes/builtin-nodes/logic-control/if) - Condições simples
- [Merge Node](/integracoes/builtin-nodes/logic-control/merge) - Combinar dados
- [Code Node](/integracoes/builtin-nodes/core-nodes/code) - Lógica customizada
- [Expressões n8n](/logica-e-dados/expressoes) - Usar expressões em condições
- [Tratamento de Erros](/logica-e-dados/flow-logic/error-handling) - Lidar com falhas
