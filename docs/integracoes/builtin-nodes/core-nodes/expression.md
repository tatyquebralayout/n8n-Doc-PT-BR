---
sidebar_position: 3
title: Expression Node
description: Use expressões JavaScript inline em outros nodes do n8n
keywords: [n8n, expression, javascript, inline, expressões, variáveis]
---

# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Expression Node

O **Expression Node** não é um node tradicional, mas sim um **sistema de expressões** que permite usar código JavaScript inline em outros nodes do n8n. É fundamental para acessar dados dinâmicos e criar valores calculados.

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Conceito Principal**

**Expression = "Código JavaScript Inline"**

As expressões permitem:
- **Acessar** dados de outros nodes
- **Calcular** valores dinamicamente
- **Transformar** dados em tempo real
- **Criar** lógica condicional inline

> **💡 Dica:** As expressões são usadas em campos de outros nodes, não como um node separado.

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Sintaxe Básica**

### **1. Estrutura das Expressões**
```javascript
{{ expressão JavaScript }}
```

### **2. Exemplos Simples**
```javascript
{{ $json.nome }}                    // Acessar campo 'nome'
{{ $json.preco * 1.1 }}            // Calcular com 10% de acréscimo
{{ $json.ativo ? 'Sim' : 'Não' }}  // Condicional ternário
{{ new Date().toISOString() }}     // Data/hora atual
```

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Variáveis Disponíveis**

### **Acesso a Dados**
```javascript
// Dados do item atual
$json                    // Dados JSON do item atual
$binary                  // Dados binários (se houver)

// Dados de outros nodes
$('Nome do Node').json   // Dados de um node específico
$('Node 1').json.campo   // Campo específico de um node

// Contexto
$now                     // Data/hora atual
$today                   // Data atual
$workflow                // Informações do workflow
$node                    // Informações do node atual
$position                // Posição do item (0, 1, 2...)
$index                   // Índice do item (1, 2, 3...)
```

### **Exemplos de Uso**
```javascript
// Acessar dados do item atual
{{ $json.email }}
{{ $json.nome + ' ' + $json.sobrenome }}

// Acessar dados de outro node
{{ $('HTTP Request').json.results[0].name }}

// Usar contexto
{{ $now.toISOString() }}
{{ $workflow.name }}
```

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Casos de Uso Práticos**

### **1. HTTP Request - URL Dinâmica**

**Configuração:**
```
Method: GET
URL: {{ 'https://api.exemplo.com/usuarios/' + $json.id }}
```

**Exemplo com dados:**
```json
// Dados de entrada
{
  "id": 123,
  "nome": "João"
}

// URL resultante
https://api.exemplo.com/usuarios/123
```

### **2. Email - Assunto Dinâmico**

**Configuração:**
```
To: {{ $json.email }}
Subject: {{ 'Pedido #' + $json.numero_pedido + ' - ' + $json.status }}
Body: |
  Olá {{ $json.nome }},
  
  Seu pedido #{{ $json.numero_pedido }} foi {{ $json.status }}.
  
  Valor: R$ {{ $json.valor.toFixed(2) }}
  
  Obrigado!
```

### **3. Set Node - Campos Calculados**

**Configuração:**
```
Campo: nome_completo
Valor: {{ $json.primeiro_nome + ' ' + $json.ultimo_nome }}

Campo: idade
Valor: {{ Math.floor((new Date() - new Date($json.data_nascimento)) / (365.25 * 24 * 60 * 60 * 1000)) }}

Campo: categoria
Valor: {{ $json.valor > 1000 ? 'premium' : 'standard' }}
```

### **4. IF Node - Condições Dinâmicas**

**Configuração:**
```
Condição: {{ $json.valor > 500 && $json.ativo }}
```

**Exemplo com múltiplas condições:**
```javascript
{{ 
  $json.valor > 1000 ? 'alta' : 
  $json.valor > 500 ? 'media' : 
  'baixa' 
}}
```

### **5. Schedule Trigger - Horário Dinâmico**

**Configuração:**
```
Cron Expression: {{ '0 ' + $json.hora + ' * * *' }}
```

**Exemplo:**
```json
// Dados de entrada
{
  "hora": 9,
  "minuto": 30
}

// Cron resultante
0 9 * * *
```

## <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Expressões Avançadas**

### **Manipulação de Arrays**

```javascript
// Acessar primeiro elemento
{{ $json.produtos[0].nome }}

// Contar elementos
{{ $json.produtos.length }}

// Filtrar e mapear
{{ $json.produtos.filter(p => p.preco > 100).map(p => p.nome).join(', ') }}

// Somar valores
{{ $json.produtos.reduce((total, p) => total + p.preco, 0).toFixed(2) }}
```

### **Manipulação de Strings**

```javascript
// Capitalizar
{{ $json.nome.charAt(0).toUpperCase() + $json.nome.slice(1) }}

// Substituir caracteres
{{ $json.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') }}

// Extrair domínio
{{ $json.email.split('@')[1] }}

// Gerar slug
{{ $json.titulo.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }}
```

### **Cálculos Matemáticos**

```javascript
// Cálculo com desconto
{{ ($json.preco * (1 - $json.desconto / 100)).toFixed(2) }}

// Calcular impostos
{{ ($json.preco * 0.17).toFixed(2) }}  // ICMS 17%

// Média de valores
{{ ($json.valor1 + $json.valor2 + $json.valor3) / 3 }}

// Porcentagem
{{ ((($json.atual - $json.anterior) / $json.anterior) * 100).toFixed(1) + '%' }}
```

### **Condicionais Complexas**

```javascript
// Múltiplas condições
{{ 
  $json.idade < 18 ? 'menor' : 
  $json.idade < 25 ? 'jovem' : 
  $json.idade < 60 ? 'adulto' : 
  'idoso' 
}}

// Validação múltipla
{{ 
  $json.email && $json.telefone && $json.nome ? 'completo' : 'incompleto' 
}}

// Status baseado em múltiplos critérios
{{ 
  $json.ativo && $json.saldo > 0 && $json.ultimo_acesso ? 'ativo' : 'inativo' 
}}
```

### **Formatação de Datas**

```javascript
// Data atual formatada
{{ new Date().toLocaleDateString('pt-BR') }}

// Data específica
{{ new Date($json.data_nascimento).toLocaleDateString('pt-BR') }}

// Data e hora
{{ new Date().toLocaleString('pt-BR') }}

// Timestamp
{{ new Date().getTime() }}

// Data relativa
{{ 
  Math.floor((new Date() - new Date($json.data_criacao)) / (1000 * 60 * 60 * 24)) + ' dias atrás' 
}}
```

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Validações e Tratamento de Erros**

### **Validação de Campos**

```javascript
// Verificar se campo existe
{{ $json.email ? $json.email : 'Email não informado' }}

// Valor padrão
{{ $json.categoria || 'geral' }}

// Validar formato de email
{{ 
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email) ? 'válido' : 'inválido' 
}}

// Validar CPF
{{ 
  $json.cpf && $json.cpf.replace(/\D/g, '').length === 11 ? 'válido' : 'inválido' 
}}
```

### **Tratamento de Erros**

```javascript
// Verificar se é número
{{ 
  !isNaN($json.valor) ? parseFloat($json.valor).toFixed(2) : 'valor inválido' 
}}

// Verificar se array existe
{{ 
  Array.isArray($json.produtos) ? $json.produtos.length : 0 
}}

// Verificar se objeto existe
{{ 
  $json.endereco && $json.endereco.rua ? $json.endereco.rua : 'Endereço não informado' 
}}
```

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Exemplos por Node**

### **HTTP Request Node**

```javascript
// URL dinâmica
{{ 'https://api.exemplo.com/' + $json.endpoint }}

// Headers dinâmicos
Authorization: {{ 'Bearer ' + $json.token }}
Content-Type: {{ $json.tipo || 'application/json' }}

// Body dinâmico
{{ JSON.stringify({
  nome: $json.nome,
  email: $json.email,
  timestamp: new Date().toISOString()
}) }}
```

### **Email Node**

```javascript
// Assunto personalizado
{{ 'Notificação: ' + $json.tipo + ' - ' + $json.id }}

// Corpo do email
{{ `
Olá ${$json.nome},

Seu pedido #${$json.numero} foi ${$json.status}.

Detalhes:
- Produto: ${$json.produto}
- Valor: R$ ${$json.valor.toFixed(2)}
- Data: ${new Date($json.data).toLocaleDateString('pt-BR')}

Obrigado!
` }}
```

### **Set Node**

```javascript
// Campo calculado
nome_completo: {{ $json.primeiro_nome + ' ' + $json.ultimo_nome }}

// Campo com formatação
telefone_formatado: {{ $json.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') }}

// Campo com validação
status: {{ $json.ativo && $json.saldo > 0 ? 'ativo' : 'inativo' }}

// Campo com data
processado_em: {{ new Date().toISOString() }}
```

### **IF Node**

```javascript
// Condição simples
{{ $json.valor > 1000 }}

// Condição múltipla
{{ $json.ativo && $json.saldo > 0 && $json.ultimo_acesso }}

// Condição com validação
{{ $json.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email) }}
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Limitações e Considerações**

### **Limitações das Expressões:**
- **Escopo limitado**: Apenas uma linha de código
- **Sem loops**: Não podem conter loops complexos
- **Sem funções**: Não podem definir funções
- **Performance**: Expressões complexas podem impactar performance

### **Boas Práticas:**
```javascript
// ✅ Bom: Expressão simples e clara
{{ $json.nome + ' ' + $json.sobrenome }}

// ✅ Bom: Validação com valor padrão
{{ $json.categoria || 'padrão' }}

// ❌ Evitar: Expressão muito complexa
{{ $json.produtos.filter(p => p.preco > 100).map(p => p.nome).join(', ') }}

// ❌ Evitar: Lógica complexa
{{ eval($json.expressao) }}  // Perigoso!
```

### **Debugging:**
```javascript
// Usar console.log para debug (aparece nos logs do n8n)
{{ console.log('Dados:', $json) || $json.nome }}

// Verificar tipo de dados
{{ typeof $json.valor }}

// Verificar se campo existe
{{ $json.hasOwnProperty('campo') }}
```

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Próximos Passos**

Agora que você entende as expressões:

1. **[Code Node](./code)** - Para lógica complexa
2. **[Function Node](./function)** - Para funções simples
3. **[Set Node](../data-processing/set)** - Para manipulação básica de dados
4. **[IF Node](../logic-control/if.md)** - Para lógica condicional

---

:::tip **Dica Pro**
Use **expressões** para valores dinâmicos simples e **Function/Code Nodes** para lógica complexa. As expressões são mais rápidas para operações básicas.
:::

:::info **Performance**
Expressões são executadas para cada item, então mantenha-as simples para melhor performance.
:::

:::warning **Segurança**
Evite usar `eval()` ou código dinâmico em expressões. Sempre valide dados de entrada.
:::

---

**Links úteis:**
- [Documentação oficial das Expressões](https://docs.n8n.io/code-examples/expressions/)
- [JavaScript MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Code Node](./code) - Para lógica complexa
- [Function Node](./function) - Para funções simples 