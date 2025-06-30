---
sidebar_position: 1
title: Set Node
description: Definir, modificar e manipular dados em workflows
keywords: [n8n, set, data, manipulação, workflow]
---

# 🔧 Set Node

O **Set Node** é fundamental para **manipular dados** em workflows n8n. Ele permite definir, modificar, adicionar ou remover campos de dados que fluem entre os nodes.

## 🎯 **Conceito Principal**

**Set Node = "Definir/Configurar Dados"**

O Set Node é uma **AÇÃO** que:
- ✅ **Modifica** dados existentes
- ✅ **Adiciona** novos campos
- ✅ **Remove** campos desnecessários
- ✅ **Transforma** estruturas de dados

> **💡 Diferença do Trigger:** Set é uma AÇÃO que processa dados. Triggers INICIAM workflows.

## ⚙️ **Configurações Principais**

### **1. Keep Only Set**
```
☑️ Ativado  = Mantém apenas os campos definidos
☐ Desativado = Mantém campos originais + novos
```

### **2. Modos de Operação**

#### **Manual Mode** (Mais comum)
Definir campos manualmente:
```
Campo: nome
Valor: João Silva

Campo: email  
Valor: joao@email.com
```

#### **JSON Mode** (Avançado)
Definir via JSON:
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "timestamp": "{{new Date().toISOString()}}"
}
```

## 📊 **Exemplos Práticos**

### **Exemplo 1: Padronizar Dados de Formulário**

**Entrada:**
```json
{
  "firstName": "João",
  "lastName": "Silva", 
  "userEmail": "joao@email.com",
  "phone": "11999999999"
}
```

**Configuração Set:**
```
nome_completo: {{$json.firstName}} {{$json.lastName}}
email: {{$json.userEmail}}
telefone: +55{{$json.phone}}
status: ativo
data_cadastro: {{new Date().toISOString()}}
```

**Saída:**
```json
{
  "nome_completo": "João Silva",
  "email": "joao@email.com", 
  "telefone": "+5511999999999",
  "status": "ativo",
  "data_cadastro": "2024-01-15T10:30:00.000Z"
}
```

---

### **Exemplo 2: Preparar Dados para API**

**Entrada (múltiplos campos):**
```json
{
  "customer_name": "Maria Santos",
  "customer_email": "maria@empresa.com",
  "order_total": 299.90,
  "order_items": ["Produto A", "Produto B"],
  "internal_notes": "Cliente VIP",
  "system_id": "12345"
}
```

**Set Node (Keep Only Set = ☑️):**
```
client: {{$json.customer_name}}
email: {{$json.customer_email}}
value: {{$json.order_total}}
products: {{$json.order_items}}
```

**Saída (limpa para API):**
```json
{
  "client": "Maria Santos",
  "email": "maria@empresa.com",
  "value": 299.90,
  "products": ["Produto A", "Produto B"]
}
```

---

### **Exemplo 3: Adicionar Metadados**

**Entrada:**
```json
{
  "produto": "Notebook",
  "preco": 2500.00
}
```

**Set Node (Keep Only Set = ☐):**
```
categoria: eletronicos
desconto: {{$json.preco * 0.1}}
preco_final: {{$json.preco - ($json.preco * 0.1)}}
promocao: true
```

**Saída (dados originais + novos):**
```json
{
  "produto": "Notebook",
  "preco": 2500.00,
  "categoria": "eletronicos", 
  "desconto": 250.00,
  "preco_final": 2250.00,
  "promocao": true
}
```

## 🔄 **Expressões Úteis**

### **Datas e Tempo**
```javascript
// Data atual
data_atual: {{new Date().toISOString()}}

// Data formatada BR
data_br: {{new Date().toLocaleDateString('pt-BR')}}

// Timestamp
timestamp: {{Date.now()}}

// Data específica
prazo: {{new Date(Date.now() + 7*24*60*60*1000).toISOString()}}
```

### **Manipulação de Strings**
```javascript
// Uppercase
nome_maiusculo: {{$json.nome.toUpperCase()}}

// Lowercase  
email_minusculo: {{$json.email.toLowerCase()}}

// Primeira letra maiúscula
nome_formatado: {{$json.nome.charAt(0).toUpperCase() + $json.nome.slice(1)}}

// Remover espaços
telefone_limpo: {{$json.telefone.replace(/\s/g, '')}}
```

### **Cálculos e Números**
```javascript
// Operações matemáticas
total_com_imposto: {{$json.valor * 1.1}}
percentual: {{($json.vendas / $json.meta) * 100}}

// Arredondamento
valor_arredondado: {{Math.round($json.valor * 100) / 100}}

// Formatação moeda BR
preco_formatado: {{$json.valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}}
```

### **Arrays e Objetos**
```javascript
// Tamanho do array
total_itens: {{$json.produtos.length}}

// Primeiro item
primeiro_produto: {{$json.produtos[0]}}

// Juntar array
lista_produtos: {{$json.produtos.join(', ')}}

// Extrair propriedade
ids_produtos: {{$json.produtos.map(p => p.id)}}
```

## 🚨 **Casos de Uso Comuns**

### **1. Limpeza de Dados**
```
// Remover campos desnecessários
Keep Only Set: ☑️
Manter apenas: nome, email, telefone
```

### **2. Enriquecimento de Dados**
```
// Adicionar informações contextuais
origem: webhook
processado_em: {{new Date().toISOString()}}
versao_workflow: 1.2
```

### **3. Transformação de Formato**
```
// De snake_case para camelCase
firstName: {{$json.first_name}}
lastName: {{$json.last_name}}
userEmail: {{$json.user_email}}
```

### **4. Preparação para Diferentes APIs**
```
// Formato para Slack
text: Novo pedido de {{$json.customer_name}}
color: good

// Formato para Google Sheets
A: {{$json.customer_name}}
B: {{$json.order_total}}
C: {{new Date().toLocaleDateString('pt-BR')}}
```

## ⚡ **Dicas de Performance**

### **1. Use Keep Only Set quando possível**
- Reduz payload de dados
- Melhora performance
- Evita vazamento de dados sensíveis

### **2. Expressões Simples**
```javascript
// ✅ Bom
nome: {{$json.first_name}}

// ❌ Evitar (muito complexo)
dados: {{JSON.stringify($json).replace(/"/g, "'").substring(0, 100)}}
```

### **3. Validação de Dados**
```javascript
// Verificar se campo existe
email: {{$json.email || 'nao-informado@email.com'}}
telefone: {{$json.phone || 'Não informado'}}
```

## 🔗 **Próximos Passos**

Depois de dominar o Set Node, explore:

1. **[HTTP Request](../http-requests/http-request)** - Para enviar dados modificados
2. **[Webhook](../http-requests/webhook)** - Para receber dados externos
3. **[Manual Trigger](../../trigger-nodes/time-based/manual-trigger)** - Para testes manuais

---

**🎯 Set Node = Seu canivete suíço para transformação de dados!** 