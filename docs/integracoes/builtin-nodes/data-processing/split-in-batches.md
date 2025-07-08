---
sidebar_position: 2
title: Split In Batches
description: Divida dados em lotes para processamento eficiente em workflows n8n
keywords: [n8n, split, batches, lotes, processamento, dados, performance]
---

# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Split In Batches Node

O **Split In Batches Node** é essencial para processar grandes volumes de dados de forma eficiente, dividindo-os em lotes menores que podem ser processados sequencialmente ou em paralelo.

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Conceito Principal**

**Split In Batches = "Dividir Dados em Lotes"**

O Split In Batches Node é uma **AÇÃO** que:
- **Divide** grandes conjuntos de dados em lotes menores
- **Permite** processamento eficiente de grandes volumes
- **Evita** timeouts e problemas de memória
- **Facilita** operações em paralelo

> **💡 Dica:** Use este node quando tiver muitos dados para processar ou quando APIs têm limites de rate limiting.

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Configurações Principais**

### **1. Batch Size**
```
Número de itens por lote (ex: 100, 500, 1000)
```

### **2. Options**
```
Wait Between Batches - Aguardar entre lotes
Batch Size - Tamanho do lote
Reset - Reiniciar contador de lotes
```

### **3. Wait Between Batches**
```
Delay (ms) - Tempo de espera entre lotes
```

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Exemplos Práticos**

### **Exemplo 1: Processar Lista de Emails**

**Entrada (1000 emails):**
```json
[
  {"email": "joao@email.com", "nome": "João"},
  {"email": "maria@email.com", "nome": "Maria"},
  // ... 998 emails mais
]
```

**Configuração:**
```
Batch Size: 100
Wait Between Batches: 1000ms (1 segundo)
```

**Resultado:**
- **Lote 1**: Emails 1-100
- **Lote 2**: Emails 101-200
- **Lote 3**: Emails 201-300
- ...
- **Lote 10**: Emails 901-1000

### **Exemplo 2: Enviar Notificações em Lotes**

**Workflow:**
```
Manual Trigger → Split In Batches → HTTP Request → Email
```

**Configuração Split In Batches:**
```
Batch Size: 50
Wait Between Batches: 2000ms
```

**Configuração HTTP Request (por lote):**
```
Method: POST
URL: https://api.notificacao.com/batch
Body: {{ JSON.stringify($json) }}
```

### **Exemplo 3: Processar Produtos de E-commerce**

**Entrada (5000 produtos):**
```json
[
  {"id": 1, "nome": "Produto 1", "preco": 100},
  {"id": 2, "nome": "Produto 2", "preco": 200},
  // ... 4998 produtos mais
]
```

**Configuração:**
```
Batch Size: 200
Wait Between Batches: 500ms
```

**Processamento por lote:**
- Atualizar preços
- Sincronizar estoque
- Enviar para API externa

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Casos de Uso Comuns**

### **1. Rate Limiting de APIs**

**Problema:** API tem limite de 100 requisições por minuto
**Solução:** Dividir em lotes de 100 com delay de 60 segundos

```javascript
// Configuração
Batch Size: 100
Wait Between Batches: 60000ms (60 segundos)
```

### **2. Processamento de Arquivos Grandes**

**Problema:** Arquivo CSV com 10.000 linhas
**Solução:** Processar em lotes de 500 linhas

```javascript
// Configuração
Batch Size: 500
Wait Between Batches: 1000ms
```

### **3. Envio de Emails em Massa**

**Problema:** Enviar 5.000 emails sem sobrecarregar servidor
**Solução:** Enviar em lotes de 100 com delay

```javascript
// Configuração
Batch Size: 100
Wait Between Batches: 5000ms (5 segundos)
```

### **4. Sincronização de Dados**

**Problema:** Sincronizar 20.000 registros com sistema externo
**Solução:** Processar em lotes de 1.000

```javascript
// Configuração
Batch Size: 1000
Wait Between Batches: 2000ms
```

## <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Configurações Avançadas**

### **Wait Between Batches**

**Delay Fixo:**
```
Wait Between Batches: 1000ms
```

**Delay Dinâmico (usando expressão):**
```
Wait Between Batches: {{ $json.batch_number * 1000 }}ms
```

**Delay Baseado em Rate Limiting:**
```
Wait Between Batches: {{ Math.ceil(60000 / 100) }}ms  // 100 req/min
```

### **Batch Size Dinâmico**

**Baseado no tipo de dados:**
```
Batch Size: {{ $json.tipo === 'email' ? 100 : 500 }}
```

**Baseado na API:**
```
Batch Size: {{ $json.api_limit || 100 }}
```

**Baseado na performance:**
```
Batch Size: {{ $json.performance === 'high' ? 1000 : 100 }}
```

## <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Otimização de Performance**

### **Escolhendo o Tamanho do Lote**

| Cenário | Tamanho Recomendado | Justificativa |
|---------|-------------------|---------------|
| **APIs com Rate Limiting** | 50-100 | Evitar exceder limites |
| **Processamento Local** | 500-1000 | Máximo de eficiência |
| **Envio de Emails** | 100-200 | Evitar spam filters |
| **Sincronização** | 1000-2000 | Máxima velocidade |
| **Arquivos Grandes** | 500-1000 | Balance entre memória e velocidade |

### **Configuração de Delays**

| Tipo de Operação | Delay Recomendado | Razão |
|------------------|-------------------|-------|
| **APIs Externas** | 1000-5000ms | Rate limiting |
| **Envio de Emails** | 2000-10000ms | Evitar spam |
| **Processamento Local** | 100-500ms | Otimização |
| **Sincronização** | 500-2000ms | Balance |

### **Monitoramento de Performance**

```javascript
// Adicionar métricas ao lote
{
  "batch_number": 1,
  "batch_size": 100,
  "total_items": 1000,
  "processed_items": 100,
  "start_time": "2024-01-15T10:00:00Z",
  "estimated_completion": "2024-01-15T10:10:00Z"
}
```

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Tratamento de Erros**

### **Erro em um Lote**

**Configuração de Retry:**
```
Max Tries: 3
Wait Between Tries: 5000ms
```

**Tratamento de Erro:**
```javascript
// No node seguinte, verificar se houve erro
if ($json.error) {
  // Log do erro
  console.log('Erro no lote:', $json.batch_number, $json.error);
  
  // Continuar processamento
  return { json: { ...$json, status: 'error_handled' } };
}
```

### **Recuperação de Falhas**

**Workflow com Error Handling:**
```
Split In Batches → HTTP Request → Error Trigger → Log Error → Continue
```

**Configuração Error Trigger:**
```
Continue on Fail: true
```

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Exemplos de Workflows**

### **Workflow 1: Envio de Newsletter**

```
Manual Trigger → Split In Batches (100) → Email Node → Wait (2s) → Continue
```

**Configurações:**
- **Split In Batches**: 100 emails por lote
- **Wait**: 2 segundos entre lotes
- **Email Node**: Template personalizado

### **Workflow 2: Sincronização de Produtos**

```
Schedule Trigger → HTTP Request (buscar produtos) → Split In Batches (500) → HTTP Request (atualizar) → Wait (1s) → Continue
```

**Configurações:**
- **Split In Batches**: 500 produtos por lote
- **Wait**: 1 segundo entre lotes
- **HTTP Request**: API de atualização

### **Workflow 3: Processamento de Arquivos**

```
Webhook (upload arquivo) → CSV Parser → Split In Batches (1000) → Process Data → Wait (500ms) → Continue
```

**Configurações:**
- **Split In Batches**: 1000 linhas por lote
- **Wait**: 500ms entre lotes
- **Process Data**: Transformação de dados

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Limitações e Considerações**

### **Limitações Técnicas**
- **Memória**: Cada lote é mantido em memória
- **Timeout**: Workflows têm timeout total
- **Rate Limiting**: APIs externas podem ter limites
- **Concorrência**: Processamento sequencial por padrão

### **Considerações de Design**
- **Tamanho do lote**: Balance entre performance e memória
- **Delays**: Evitar sobrecarregar sistemas externos
- **Error handling**: Tratar falhas em lotes individuais
- **Monitoramento**: Acompanhar progresso dos lotes

### **Boas Práticas**
```javascript
// ✅ Bom: Tamanho de lote apropriado
Batch Size: 100  // Para APIs com rate limiting

// ✅ Bom: Delay adequado
Wait Between Batches: 2000ms  // 2 segundos

// ❌ Evitar: Lotes muito grandes
Batch Size: 10000  // Pode causar timeout

// ❌ Evitar: Sem delay
Wait Between Batches: 0ms  // Pode sobrecarregar API
```

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Próximos Passos**

Agora que você entende o Split In Batches Node:

1. **[Set Node](./set)** - Para manipulação básica de dados
2. **[Aggregate Node](./aggregate)** - Para agregações e resumos
3. **[Code Node](../core-nodes/code)** - Para lógica customizada
4. **[IF Node](../logic-control/if)** - Para controle de fluxo

---

:::tip **Dica Pro**
Use **lotes menores** (50-100) para APIs com rate limiting e **lotes maiores** (500-1000) para processamento local.
:::

:::info **Performance**
O tamanho ideal do lote depende do seu caso de uso. Teste diferentes tamanhos para encontrar o ótimo.
:::

:::warning **Rate Limiting**
Sempre configure delays adequados para evitar exceder limites de APIs externas.
:::

---

**Links úteis:**
- [Documentação oficial do Split In Batches](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.splitinbatches/)
- [Set Node](./set) - Para manipulação de dados
- [Aggregate Node](./aggregate) - Para agregações
- [Code Node](../core-nodes/code) - Para lógica customizada 