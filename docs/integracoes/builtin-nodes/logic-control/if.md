---
title: If Node
description: Guia completo sobre o If Node no n8n, incluindo condições, operadores, exemplos práticos e boas práticas
sidebar_position: 1
keywords: [n8n, if node, condições, lógica, decisões, operadores, controle de fluxo]
---

# <ion-icon name="checkmark-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> If Node

O **If Node** é um dos nodes mais importantes do n8n para controle de fluxo. Ele permite criar condições e tomar decisões baseadas em dados, direcionando o workflow por diferentes caminhos.

## O que é o If Node?

O **If Node** permite:

- **Criar condições** baseadas em dados
- **Tomar decisões** automaticamente
- **Direcionar fluxo** para diferentes caminhos
- **Validar dados** antes do processamento
- **Implementar lógica de negócio** complexa
- **Criar workflows dinâmicos** e inteligentes

### Quando Usar o If Node

- **Validação** de dados de entrada
- **Classificação** de itens por critérios
- **Filtragem** de dados
- **Roteamento** para diferentes processos
- **Tratamento de erros** condicional
- **Lógica de negócio** baseada em regras

## Configuração Básica

### Estrutura do If Node

```javascript
// If Node - Estrutura básica
{
  "condition": "{{ $json.valor > 100 }}",
  "true": "Caminho para valores altos",
  "false": "Caminho para valores baixos"
}
```

### Tipos de Condições

#### 1. Condição Simples

```javascript
// Verificar se campo existe
{{ $json.nome }}

// Verificar se valor é verdadeiro
{{ $json.ativo === true }}

// Verificar se string não está vazia
{{ $json.email && $json.email.length > 0 }}
```

#### 2. Comparações Numéricas

```javascript
// Maior que
{{ $json.valor > 100 }}

// Menor que
{{ $json.valor < 50 }}

// Igual a
{{ $json.quantidade === 10 }}

// Diferente de
{{ $json.status !== 'ativo' }}

// Maior ou igual
{{ $json.idade >= 18 }}

// Menor ou igual
{{ $json.preco <= 1000 }}
```

#### 3. Comparações de String

```javascript
// Igual a (case sensitive)
{{ $json.categoria === 'Premium' }}

// Igual a (case insensitive)
{{ $json.categoria.toLowerCase() === 'premium' }}

// Contém texto
{{ $json.descricao.includes('importante') }}

// Começa com
{{ $json.nome.startsWith('João') }}

// Termina com
{{ $json.email.endsWith('@gmail.com') }}

// Regex
{{ /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email) }}
```

#### 4. Condições com Arrays

```javascript
// Verificar se array contém valor
{{ $json.tags.includes('urgente') }}

// Verificar tamanho do array
{{ $json.itens.length > 0 }}

// Verificar se array está vazio
{{ $json.produtos.length === 0 }}

// Verificar se todos os itens atendem condição
{{ $json.numeros.every(num => num > 0) }}

// Verificar se algum item atende condição
{{ $json.status.some(s => s === 'erro') }}
```

#### 5. Condições com Datas

```javascript
// Verificar se data é hoje
{{ $json.data === $today }}

// Verificar se data é futura
{{ new Date($json.data) > new Date() }}

// Verificar se data é passada
{{ new Date($json.data) < new Date() }}

// Verificar se data está em intervalo
{{ new Date($json.data) >= new Date('2024-01-01') && 
   new Date($json.data) <= new Date('2024-12-31') }}

// Verificar se é fim de semana
{{ [0, 6].includes(new Date($json.data).getDay()) }}
```

## Operadores Lógicos

### 1. Operador AND (&&)

```javascript
// Múltiplas condições (todas devem ser verdadeiras)
{{ $json.ativo && $json.saldo > 0 && $json.email }}

// Exemplo prático
{{ $json.idade >= 18 && $json.cpf && $json.email.includes('@') }}
```

### 2. Operador OR (||)

```javascript
// Múltiplas condições (pelo menos uma deve ser verdadeira)
{{ $json.categoria === 'Premium' || $json.valor > 1000 }}

// Exemplo prático
{{ $json.status === 'ativo' || $json.status === 'pendente' }}
```

### 3. Operador NOT (!)

```javascript
// Negar condição
{{ !$json.inativo }}

// Exemplo prático
{{ !$json.erro && $json.dados }}
```

### 4. Combinação de Operadores

```javascript
// Condição complexa
{{ ($json.ativo && $json.saldo > 0) || $json.admin }}

// Exemplo prático
{{ ($json.idade >= 18 && $json.cpf) || $json.categoria === 'VIP' }}
```

## Exemplos Práticos

### 1. Validação de Dados

```javascript
// If Node - Validação de cliente
{
  "condition": "{{ $json.nome && $json.email && $json.cpf && $json.idade >= 18 }}",
  "true": "Cliente Válido",
  "false": "Cliente Inválido"
}
```

**Caminho "Cliente Válido":**
- Processar dados do cliente
- Salvar no banco de dados
- Enviar confirmação

**Caminho "Cliente Inválido":**
- Registrar erro
- Enviar notificação
- Solicitar dados corretos

### 2. Classificação por Valor

```javascript
// If Node - Classificação de pedido
{
  "condition": "{{ $json.valor_total > 1000 }}",
  "true": "Pedido Premium",
  "false": "Pedido Standard"
}
```

**Caminho "Pedido Premium":**
- Aplicar desconto especial
- Enviar para processamento prioritário
- Notificar gerente

**Caminho "Pedido Standard":**
- Processamento normal
- Aplicar desconto padrão
- Enviar confirmação

### 3. Filtragem por Status

```javascript
// If Node - Filtragem por status
{
  "condition": "{{ $json.status === 'aprovado' }}",
  "true": "Processar Aprovação",
  "false": "Aguardar Aprovação"
}
```

**Caminho "Processar Aprovação":**
- Executar workflow de aprovação
- Enviar notificação
- Atualizar status

**Caminho "Aguardar Aprovação":**
- Salvar para processamento posterior
- Enviar lembrança
- Monitorar status

### 4. Tratamento de Erros

```javascript
// If Node - Tratamento de erro
{
  "condition": "{{ $json.erro || $json.status === 'falha' }}",
  "true": "Tratar Erro",
  "false": "Processar Sucesso"
}
```

**Caminho "Tratar Erro":**
- Registrar erro no log
- Enviar alerta
- Tentar reprocessamento

**Caminho "Processar Sucesso":**
- Continuar processamento
- Salvar resultado
- Enviar confirmação

### 5. Roteamento por Categoria

```javascript
// If Node - Roteamento por categoria
{
  "condition": "{{ $json.categoria === 'financeiro' }}",
  "true": "Processamento Financeiro",
  "false": "Processamento Geral"
}
```

**Caminho "Processamento Financeiro":**
- Validações específicas
- Aprovação obrigatória
- Auditoria detalhada

**Caminho "Processamento Geral":**
- Validações básicas
- Aprovação automática
- Processamento direto

## Workflows Complexos

### 1. Múltiplos If Nodes em Sequência

```
Manual Trigger → If (Validação) → If (Classificação) → If (Processamento)
                    ↓                    ↓                    ↓
                Validação OK         Premium              Processar
                    ↓                    ↓                    ↓
                Validação Falhou    Standard              Aguardar
```

### 2. If Node com Switch Node

```javascript
// Switch Node - Múltiplas condições
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

### 3. If Node com Merge

```
If Node A → Processamento A
    ↓
If Node B → Processamento B
    ↓
Merge Node → Resultado Final
```

## Boas Práticas

### 1. Condições Claras

```javascript
// ✅ Bom: Condição clara e legível
{{ $json.ativo && $json.saldo > 0 }}

// ❌ Evitar: Condição confusa
{{ $json.a && $json.s > 0 }}
```

### 2. Validação de Dados

```javascript
// ✅ Bom: Validar antes de usar
{{ $json.valor && typeof $json.valor === 'number' && $json.valor > 0 }}

// ❌ Evitar: Usar sem validação
{{ $json.valor > 0 }}
```

### 3. Condições Simples

```javascript
// ✅ Bom: Condições simples
{{ $json.status === 'ativo' }}

// ❌ Evitar: Condições muito complexas
{{ $json.status === 'ativo' && $json.saldo > 0 && $json.email && $json.cpf && $json.idade >= 18 }}
```

### 4. Nomenclatura Descritiva

```javascript
// ✅ Bom: Nomes descritivos
"Cliente Válido"
"Pedido Premium"
"Processamento Urgente"

// ❌ Evitar: Nomes genéricos
"True"
"False"
"Option 1"
```

### 5. Documentação

```javascript
// ✅ Bom: Documentar condições
// Condição: Verifica se cliente tem dados obrigatórios e idade mínima
{{ $json.nome && $json.email && $json.cpf && $json.idade >= 18 }}

// ❌ Evitar: Condição sem contexto
{{ $json.a && $json.b && $json.c }}
```

## Troubleshooting

### Problemas Comuns

#### Condição sempre verdadeira
- Verifique se está usando operadores corretos
- Confirme se os campos existem
- Teste com dados de exemplo
- Use Debug Helper para inspecionar dados

#### Condição sempre falsa
- Verifique se os valores estão corretos
- Confirme se os tipos de dados estão corretos
- Teste com valores simples
- Verifique se há espaços em branco

#### Workflow não segue caminho esperado
- Verifique a lógica da condição
- Confirme se os dados estão corretos
- Teste com diferentes cenários
- Use Debug Helper para ver dados

### Debug

```javascript
// Code Node - Debug de condição
const debugCondicao = (dados, condicao) => {
  console.log('=== DEBUG CONDIÇÃO ===');
  console.log('Dados:', dados);
  console.log('Condição:', condicao);
  console.log('Resultado:', eval(condicao));
  console.log('=====================');
  
  return eval(condicao);
};

// Usar no If Node
{{ debugCondicao($json, '$json.ativo && $json.saldo > 0') }}
```

## Exemplos Avançados

### 1. Validação de Email

```javascript
// If Node - Validação de email
{
  "condition": "{{ /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email) }}",
  "true": "Email Válido",
  "false": "Email Inválido"
}
```

### 2. Verificação de CPF

```javascript
// If Node - Verificação de CPF
{
  "condition": "{{ /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test($json.cpf) }}",
  "true": "CPF Válido",
  "false": "CPF Inválido"
}
```

### 3. Classificação de Cliente

```javascript
// If Node - Classificação de cliente
{
  "condition": "{{ $json.valor_total > 10000 || $json.categoria === 'VIP' }}",
  "true": "Cliente Premium",
  "false": "Cliente Regular"
}
```

### 4. Verificação de Horário

```javascript
// If Node - Verificação de horário comercial
{
  "condition": "{{ new Date().getHours() >= 8 && new Date().getHours() <= 18 && new Date().getDay() >= 1 && new Date().getDay() <= 5 }}",
  "true": "Horário Comercial",
  "false": "Fora do Horário"
}
```

### 5. Validação de Dados Obrigatórios

```javascript
// If Node - Validação de dados obrigatórios
{
  "condition": "{{ $json.nome && $json.nome.trim().length > 0 && $json.email && $json.email.trim().length > 0 && $json.telefone && $json.telefone.trim().length > 0 }}",
  "true": "Dados Completos",
  "false": "Dados Incompletos"
}
```

## Próximos Passos

- [Switch Node](/integracoes/builtin-nodes/logic-control/switch.md) - Múltiplas condições
- [Merge Node](/integracoes/builtin-nodes/logic-control/merge.md) - Combinar dados
- [Code Node](/integracoes/builtin-nodes/core-nodes/code.md) - Lógica customizada
- [Expressões n8n](/logica-e-dados/expressoes.md) - Usar expressões em condições
- [Tratamento de Erros](/logica-e-dados/flow-logic/error-handling.md) - Lidar com falhas
