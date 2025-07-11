:::info
<ion-icon name="shield-checkmark-outline" style={{ fontSize: '18px', color: '#17a2b8' }}></ion-icon> Esta página da documentação foi validada tecnicamente e didaticamente.
:::

---
sidebar_position: 3
title: Expressões JavaScript
description: Como usar expressões JavaScript para manipular dados dinamicamente no n8n
keywords: [n8n, expressões, javascript, dados, manipulação, variáveis]
---

# <ion-icon name="code-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Expressões JavaScript

As expressões JavaScript são uma das funcionalidades mais poderosas do n8n, permitindo manipular dados dinamicamente e criar lógica complexa em seus workflows.

## <ion-icon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que são Expressões?

Expressões são trechos de código JavaScript que permitem:

- **Acessar dados** de nodes anteriores
- **Transformar valores** dinamicamente
- **Criar lógica condicional** complexa
- **Formatar dados** para diferentes formatos
- **Calcular valores** baseados em outros dados

### Sintaxe Básica

As expressões no n8n são escritas entre chaves duplas:

```javascript
{{ expressão_javascript }}
```

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Variáveis Disponíveis

### $json

Acessa os dados do item atual:

```javascript
// Acessar campo simples
{{ $json.nome }}

// Acessar campo aninhado
{{ $json.endereco.cidade }}

// Acessar array
{{ $json.tags[0] }}
```

### $node

Acessa dados de outros nodes:

```javascript
// Dados do node "HTTP Request"
{{ $node["HTTP Request"].json }}

// Campo específico de outro node
{{ $node["Get Users"].json.email }}

// Primeiro item de outro node
{{ $node["Get Users"].json[0].id }}
```

### $position

Informações sobre a posição do item:

```javascript
// Índice do item (0-based)
{{ $position }}

// Número do item (1-based)
{{ $position + 1 }}
```

### $now

Data e hora atual:

```javascript
// Data atual
{{ $now }}

// Data formatada
{{ $now.toISOString() }}

// Data em português
{{ $now.toLocaleDateString('pt-BR') }}
```

### $today

Data de hoje (sem hora):

```javascript
// Data de hoje
{{ $today }}

// Data formatada
{{ $today.toLocaleDateString('pt-BR') }}
```

## <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Operações Comuns

### Manipulação de Strings

```javascript
// Converter para maiúsculas
{{ $json.nome.toUpperCase() }}

// Converter para minúsculas
{{ $json.email.toLowerCase() }}

// Substituir texto
{{ $json.descricao.replace('antigo', 'novo') }}

// Dividir string
{{ $json.tags.split(',') }}

// Juntar arrays
{{ $json.tags.join(' - ') }}

// Verificar se contém
{{ $json.email.includes('@') }}
```

### Operações Matemáticas

```javascript
// Soma
{{ $json.preco + $json.taxa }}

// Multiplicação
{{ $json.quantidade * $json.preco_unitario }}

// Porcentagem
{{ $json.preco * 1.1 }} // 10% de acréscimo

// Arredondamento
{{ Math.round($json.valor) }}

// Mínimo e máximo
{{ Math.min($json.valor1, $json.valor2) }}
{{ Math.max($json.valor1, $json.valor2) }}
```

### Formatação de Datas

```javascript
// Data atual formatada
{{ new Date().toLocaleDateString('pt-BR') }}

// Data específica
{{ new Date('2024-01-15').toLocaleDateString('pt-BR') }}

// Data com hora
{{ new Date().toLocaleString('pt-BR') }}

// Timestamp
{{ new Date().getTime() }}

// Adicionar dias
{{ new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }}
```

### Lógica Condicional

```javascript
// If simples
{{ $json.status === 'ativo' ? 'Sim' : 'Não' }}

// If com múltiplas condições
{{ $json.valor > 100 ? 'Alto' : $json.valor > 50 ? 'Médio' : 'Baixo' }}

// Verificar se campo existe
{{ $json.email ? $json.email : 'Email não informado' }}

// Verificar tipo
{{ typeof $json.idade === 'number' ? 'Número' : 'Texto' }}
```

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Casos de Uso Práticos

### Formatação de Dados

```javascript
// Formatar CPF
{{ $json.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') }}

// Formatar telefone
{{ $json.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') }}

// Formatar CEP
{{ $json.cep.replace(/(\d{5})(\d{3})/, '$1-$2') }}
```

### Validação de Dados

```javascript
// Validar email
{{ /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email) }}

// Validar CPF (básico)
{{ $json.cpf.length === 11 && /^\d+$/.test($json.cpf) }}

// Verificar se é número
{{ !isNaN($json.valor) && $json.valor > 0 }}
```

### Cálculos Complexos

```javascript
// Calcular desconto
{{ $json.preco * (1 - $json.desconto / 100) }}

// Calcular juros compostos
{{ $json.principal * Math.pow(1 + $json.taxa / 100, $json.periodo) }}

// Calcular média
{{ ($json.nota1 + $json.nota2 + $json.nota3) / 3 }}
```

### Geração de Conteúdo

```javascript
// Gerar ID único
{{ Date.now().toString(36) + Math.random().toString(36).substr(2) }}

// Gerar slug
{{ $json.titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-') }}

// Gerar resumo
{{ $json.conteudo.substring(0, 150) + '...' }}
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Boas Práticas

### Tratamento de Erros

```javascript
// Verificar se campo existe antes de usar
{{ $json.email ? $json.email : '' }}

// Usar try-catch para operações complexas
{{ (() => {
  try {
    return JSON.parse($json.dados);
  } catch (e) {
    return {};
  }
})() }}
```

### Performance

- **Evite loops** complexos em expressões
- **Use cache** para cálculos repetitivos
- **Simplifique** expressões muito longas
- **Teste** expressões antes de usar em produção

### Legibilidade

```javascript
// ❌ Ruim - difícil de ler
{{ $json.dados ? $json.dados.filter(x => x.ativo).map(x => x.nome).join(',') : '' }}

// ✅ Bom - mais legível
{{ (() => {
  if (!$json.dados) return '';
  const ativos = $json.dados.filter(item => item.ativo);
  const nomes = ativos.map(item => item.nome);
  return nomes.join(', ');
})() }}
```

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Debugging de Expressões

### Console.log

```javascript
// Log simples
{{ console.log('Dados:', $json) }}

// Log com contexto
{{ console.log('Processando usuário:', $json.nome, 'ID:', $json.id) }}
```

### Validação

```javascript
// Verificar tipo de dados
{{ typeof $json.valor }}

// Verificar estrutura
{{ JSON.stringify($json, null, 2) }}

// Verificar se é array
{{ Array.isArray($json.items) }}
```

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **[Data Transformation](../data/transformacoes-dados)** - Transformações avançadas de dados
2. **[Error Handling](../01-flow-logic/error-handling)** - Tratamento de erros em expressões
3. **[Debugging](../01-flow-logic/debugging)** - Debugging de workflows com expressões

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Úteis

### Documentação Relacionada

- **[Data Transformation](../data/transformacoes-dados)** - Manipulação de dados
- **[Error Handling](../01-flow-logic/error-handling)** - Tratamento de erros
- **[Debugging](../01-flow-logic/debugging)** - Técnicas de debugging

### Links Externos

- **[JavaScript MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)** - Referência JavaScript
- **[n8n Expressions](https://docs.n8n.io/code-examples/expressions/)** - Documentação oficial
- **[n8n Community](https://community.n8n.io/)** - Fórum para dúvidas

---

**<ion-icon name="code-outline" style={{ fontSize: '16px', color: '#ea4b71' }}></ion-icon> Expressões JavaScript transformam dados estáticos em automações dinâmicas!** 