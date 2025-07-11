---
title: Set Node
description: Guia completo sobre o Set Node no n8n, incluindo configuração, exemplos práticos e boas práticas para manipulação de dados
sidebar_position: 2
keywords: [n8n, set node, manipulação, dados, transformação, campos, valores]
---

# <ion-icon name="add-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Set Node

O **Set Node** é um dos nodes mais versáteis do n8n para manipulação de dados. Ele permite adicionar, modificar ou remover campos dos dados que fluem através do workflow.

## O que é o Set Node?

O **Set Node** permite:

- **Adicionar** novos campos aos dados
- **Modificar** valores de campos existentes
- **Remover** campos desnecessários
- **Renomear** campos para melhor organização
- **Calcular** valores baseados em outros campos
- **Formatar** dados para uso posterior

### Quando Usar o Set Node

- **Transformação** básica de dados
- **Adição** de metadados (timestamps, IDs)
- **Formatação** de campos (datas, números)
- **Cálculos** simples (somas, médias)
- **Limpeza** de dados (remoção de campos)
- **Padronização** de estruturas de dados

## Configuração Básica

### Estrutura do Set Node

```javascript
// Set Node - Estrutura básica
{
  "mode": "keepOnlySet", // ou "keepAllSet", "keepOnlySet", "keepAllExceptSet"
  "values": {
    "string": [
      {
        "name": "novo_campo",
        "value": "valor_do_campo"
      }
    ],
    "number": [
      {
        "name": "quantidade",
        "value": 10
      }
    ],
    "boolean": [
      {
        "name": "ativo",
        "value": true
      }
    ]
  }
}
```

### Modos de Operação

#### 1. Keep All Set
- **Mantém** todos os campos existentes
- **Adiciona** novos campos especificados
- **Modifica** campos existentes se especificados

#### 2. Keep Only Set
- **Remove** todos os campos existentes
- **Mantém** apenas os campos especificados
- **Adiciona** novos campos especificados

#### 3. Keep All Except Set
- **Mantém** todos os campos existentes
- **Remove** apenas os campos especificados
- **Adiciona** novos campos especificados

## Tipos de Valores

### 1. String

```javascript
// Adicionar campo de texto
{
  "name": "status",
  "value": "ativo"
}

// Usar expressão
{
  "name": "nome_completo",
  "value": "{{ $json.nome + ' ' + $json.sobrenome }}"
}

// Formatação de texto
{
  "name": "email_formatado",
  "value": "{{ $json.email.toLowerCase() }}"
}
```

### 2. Number

```javascript
// Adicionar número fixo
{
  "name": "quantidade",
  "value": 100
}

// Cálculo simples
{
  "name": "total",
  "value": "{{ $json.preco * $json.quantidade }}"
}

// Cálculo com desconto
{
  "name": "valor_final",
  "value": "{{ $json.valor * (1 - $json.desconto / 100) }}"
}
```

### 3. Boolean

```javascript
// Valor booleano fixo
{
  "name": "processado",
  "value": true
}

// Condição booleana
{
  "name": "premium",
  "value": "{{ $json.valor > 1000 }}"
}

// Validação
{
  "name": "valido",
  "value": "{{ $json.email && $json.nome }}"
}
```

### 4. Object

```javascript
// Objeto simples
{
  "name": "endereco",
  "value": {
    "rua": "Rua das Flores",
    "numero": 123,
    "cidade": "São Paulo"
  }
}

// Objeto com expressões
{
  "name": "dados_completos",
  "value": {
    "nome": "{{ $json.nome }}",
    "email": "{{ $json.email }}",
    "idade": "{{ $json.idade }}",
    "timestamp": "{{ $now.toISOString() }}"
  }
}
```

### 5. Array

```javascript
// Array simples
{
  "name": "tags",
  "value": ["urgente", "importante", "cliente"]
}

// Array com expressões
{
  "name": "categorias",
  "value": "{{ $json.tags.map(tag => tag.toUpperCase()) }}"
}

// Array filtrado
{
  "name": "produtos_ativos",
  "value": "{{ $json.produtos.filter(p => p.ativo) }}"
}
```

## Exemplos Práticos

### 1. Adicionar Metadados

```javascript
// Set Node - Adicionar metadados
{
  "mode": "keepAllSet",
  "values": {
    "string": [
      {
        "name": "workflow_id",
        "value": "{{ $workflow.id }}"
      },
      {
        "name": "node_name",
        "value": "{{ $node.name }}"
      }
    ],
    "number": [
      {
        "name": "timestamp",
        "value": "{{ $now.toMillis() }}"
      }
    ],
    "string": [
      {
        "name": "data_processamento",
        "value": "{{ $now.toFormat('dd/MM/yyyy HH:mm:ss') }}"
      }
    ]
  }
}
```

### 2. Formatação de Dados

```javascript
// Set Node - Formatação de dados
{
  "mode": "keepAllSet",
  "values": {
    "string": [
      {
        "name": "nome_formatado",
        "value": "{{ $json.nome.charAt(0).toUpperCase() + $json.nome.slice(1).toLowerCase() }}"
      },
      {
        "name": "telefone_formatado",
        "value": "{{ $json.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') }}"
      },
      {
        "name": "cpf_formatado",
        "value": "{{ $json.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') }}"
      }
    ]
  }
}
```

### 3. Cálculos Financeiros

```javascript
// Set Node - Cálculos financeiros
{
  "mode": "keepAllSet",
  "values": {
    "number": [
      {
        "name": "subtotal",
        "value": "{{ $json.preco * $json.quantidade }}"
      },
      {
        "name": "desconto_valor",
        "value": "{{ ($json.preco * $json.quantidade) * ($json.desconto / 100) }}"
      },
      {
        "name": "total",
        "value": "{{ ($json.preco * $json.quantidade) * (1 - $json.desconto / 100) }}"
      },
      {
        "name": "valor_parcela",
        "value": "{{ (($json.preco * $json.quantidade) * (1 - $json.desconto / 100)) / $json.num_parcelas }}"
      }
    ]
  }
}
```

### 4. Validação e Classificação

```javascript
// Set Node - Validação e classificação
{
  "mode": "keepAllSet",
  "values": {
    "boolean": [
      {
        "name": "dados_completos",
        "value": "{{ $json.nome && $json.email && $json.telefone }}"
      },
      {
        "name": "email_valido",
        "value": "{{ /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email) }}"
      },
      {
        "name": "maior_idade",
        "value": "{{ $json.idade >= 18 }}"
      }
    ],
    "string": [
      {
        "name": "categoria_cliente",
        "value": "{{ $json.valor_total > 10000 ? 'Premium' : $json.valor_total > 5000 ? 'Gold' : 'Standard' }}"
      },
      {
        "name": "prioridade",
        "value": "{{ $json.urgente ? 'Alta' : $json.valor_total > 1000 ? 'Média' : 'Baixa' }}"
      }
    ]
  }
}
```

### 5. Limpeza de Dados

```javascript
// Set Node - Limpeza de dados
{
  "mode": "keepOnlySet",
  "values": {
    "string": [
      {
        "name": "nome",
        "value": "{{ $json.nome.trim() }}"
      },
      {
        "name": "email",
        "value": "{{ $json.email.toLowerCase().trim() }}"
      },
      {
        "name": "telefone",
        "value": "{{ $json.telefone.replace(/\D/g, '') }}"
      }
    ],
    "number": [
      {
        "name": "idade",
        "value": "{{ parseInt($json.idade) || 0 }}"
      },
      {
        "name": "valor",
        "value": "{{ parseFloat($json.valor) || 0 }}"
      }
    ],
    "string": [
      {
        "name": "data_processamento",
        "value": "{{ $now.toISOString() }}"
      }
    ]
  }
}
```

### 6. Agregação de Dados

```javascript
// Set Node - Agregação de dados
{
  "mode": "keepAllSet",
  "values": {
    "number": [
      {
        "name": "total_itens",
        "value": "{{ $json.itens.length }}"
      },
      {
        "name": "valor_total",
        "value": "{{ $json.itens.reduce((sum, item) => sum + item.valor, 0) }}"
      },
      {
        "name": "media_valor",
        "value": "{{ $json.itens.reduce((sum, item) => sum + item.valor, 0) / $json.itens.length }}"
      }
    ],
    "string": [
      {
        "name": "categorias",
        "value": "{{ [...new Set($json.itens.map(item => item.categoria))].join(', ') }}"
      }
    ]
  }
}
```

## Casos de Uso Avançados

### 1. Transformação de Estrutura

```javascript
// Set Node - Transformar estrutura de dados
{
  "mode": "keepOnlySet",
  "values": {
    "object": [
      {
        "name": "cliente",
        "value": {
          "id": "{{ $json.id }}",
          "nome": "{{ $json.nome }}",
          "email": "{{ $json.email }}",
          "telefone": "{{ $json.telefone }}"
        }
      },
      {
        "name": "pedido",
        "value": {
          "numero": "{{ $json.numero_pedido }}",
          "data": "{{ $json.data_pedido }}",
          "valor": "{{ $json.valor_total }}",
          "status": "{{ $json.status }}"
        }
      },
      {
        "name": "metadata",
        "value": {
          "processado_em": "{{ $now.toISOString() }}",
          "workflow": "{{ $workflow.name }}",
          "versao": "1.0"
        }
      }
    ]
  }
}
```

### 2. Condicionais Avançadas

```javascript
// Set Node - Condicionais avançadas
{
  "mode": "keepAllSet",
  "values": {
    "string": [
      {
        "name": "status_processamento",
        "value": "{{ $json.erro ? 'Falha' : $json.pendente ? 'Pendente' : 'Sucesso' }}"
      },
      {
        "name": "mensagem",
        "value": "{{ $json.erro ? 'Erro: ' + $json.erro : $json.pendente ? 'Aguardando aprovação' : 'Processado com sucesso' }}"
      }
    ],
    "number": [
      {
        "name": "prioridade",
        "value": "{{ $json.urgente ? 1 : $json.importante ? 2 : 3 }}"
      }
    ],
    "boolean": [
      {
        "name": "requer_aprovacao",
        "value": "{{ $json.valor > 5000 || $json.categoria === 'financeiro' }}"
      }
    ]
  }
}
```

### 3. Manipulação de Arrays

```javascript
// Set Node - Manipulação de arrays
{
  "mode": "keepAllSet",
  "values": {
    "array": [
      {
        "name": "produtos_ativos",
        "value": "{{ $json.produtos.filter(p => p.ativo) }}"
      },
      {
        "name": "categorias_unicas",
        "value": "{{ [...new Set($json.produtos.map(p => p.categoria))] }}"
      },
      {
        "name": "produtos_premium",
        "value": "{{ $json.produtos.filter(p => p.valor > 100).map(p => ({ ...p, categoria: 'Premium' })) }}"
      }
    ],
    "number": [
      {
        "name": "total_produtos",
        "value": "{{ $json.produtos.length }}"
      },
      {
        "name": "produtos_ativos_count",
        "value": "{{ $json.produtos.filter(p => p.ativo).length }}"
      }
    ]
  }
}
```

## Boas Práticas

### 1. Nomenclatura de Campos

```javascript
// ✅ Bom: Nomes descritivos
{
  "name": "data_processamento",
  "value": "{{ $now.toISOString() }}"
}

// ❌ Evitar: Nomes genéricos
{
  "name": "data",
  "value": "{{ $now.toISOString() }}"
}
```

### 2. Validação de Dados

```javascript
// ✅ Bom: Validar antes de usar
{
  "name": "valor_formatado",
  "value": "{{ $json.valor ? parseFloat($json.valor).toFixed(2) : '0.00' }}"
}

// ❌ Evitar: Usar sem validação
{
  "name": "valor_formatado",
  "value": "{{ parseFloat($json.valor).toFixed(2) }}"
}
```

### 3. Organização de Campos

```javascript
// ✅ Bom: Agrupar campos relacionados
{
  "mode": "keepAllSet",
  "values": {
    "string": [
      { "name": "nome", "value": "{{ $json.nome }}" },
      { "name": "email", "value": "{{ $json.email }}" },
      { "name": "telefone", "value": "{{ $json.telefone }}" }
    ],
    "number": [
      { "name": "idade", "value": "{{ $json.idade }}" },
      { "name": "valor", "value": "{{ $json.valor }}" }
    ]
  }
}
```

### 4. Performance

```javascript
// ✅ Bom: Cálculos eficientes
{
  "name": "total",
  "value": "{{ $json.preco * $json.quantidade }}"
}

// ❌ Evitar: Cálculos complexos em Set Node
{
  "name": "estatisticas",
  "value": "{{ $json.itens.reduce((acc, item) => { /* lógica complexa */ }, {}) }}"
}
```

## Troubleshooting

### Problemas Comuns

#### Campo não aparece
- Verifique se o modo está correto
- Confirme se o nome do campo está correto
- Teste com valor simples primeiro
- Verifique se há erros de sintaxe

#### Valor incorreto
- Verifique a expressão usada
- Confirme se os campos de origem existem
- Teste com dados de exemplo
- Use Debug Helper para ver dados

#### Performance lenta
- Evite cálculos complexos
- Use expressões simples
- Limite o número de campos
- Considere usar Code Node para lógica complexa

### Debug

```javascript
// Code Node - Debug de Set Node
const debugSetNode = (dados) => {
  console.log('=== DEBUG SET NODE ===');
  console.log('Dados de entrada:', dados);
  console.log('Campos disponíveis:', Object.keys(dados));
  console.log('Tipos de dados:', Object.entries(dados).map(([k, v]) => `${k}: ${typeof v}`));
  console.log('========================');
  
  return dados;
};

// Usar antes do Set Node
return { json: debugSetNode($json) };
```

## Integração com Outros Nodes

### 1. Set Node + If Node

```javascript
// Set Node - Preparar dados para condição
{
  "mode": "keepAllSet",
  "values": {
    "boolean": [
      {
        "name": "cliente_valido",
        "value": "{{ $json.nome && $json.email && $json.cpf }}"
      }
    ]
  }
}

// If Node - Usar campo criado
{
  "condition": "{{ $json.cliente_valido }}",
  "true": "Processar Cliente",
  "false": "Cliente Inválido"
}
```

### 2. Set Node + HTTP Request

```javascript
// Set Node - Preparar dados para API
{
  "mode": "keepOnlySet",
  "values": {
    "string": [
      {
        "name": "api_key",
        "value": "{{ $credentials.apiKey }}"
      },
      {
        "name": "endpoint",
        "value": "{{ $json.tipo === 'cliente' ? '/clientes' : '/produtos' }}"
      }
    ],
    "object": [
      {
        "name": "payload",
        "value": {
          "nome": "{{ $json.nome }}",
          "email": "{{ $json.email }}",
          "timestamp": "{{ $now.toISOString() }}"
        }
      }
    ]
  }
}
```

## Próximos Passos

- [Code Node](/integracoes/builtin-nodes/core-nodes/code.md) - Lógica customizada
- [If Node](/integracoes/builtin-nodes/logic-control/if.md) - Controle de fluxo
- [Aggregate Node](/integracoes/builtin-nodes/data-processing/aggregate.md) - Agregação de dados
- [Expressões n8n](/logica-e-dados/expressoes.md) - Usar expressões avançadas
- [Data Processing](/integracoes/builtin-nodes/data-processing/index.md) - Outros nodes de processamento
