---
sidebar_position: 1
title: Code Node
description: Execute código JavaScript customizado em seus workflows n8n
keywords: [n8n, code, javascript, custom, script, programação]
---

# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Code Node

O **Code Node** é um dos nodes mais poderosos do n8n, permitindo executar **código JavaScript customizado** diretamente em seus workflows. Com ele, você pode implementar lógica complexa, transformações de dados avançadas e integrações personalizadas.

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Conceito Principal**

**Code Node = "Executar Código JavaScript"**

O Code Node é uma **AÇÃO** que:
- **Executa** código JavaScript customizado
- **Processa** dados de entrada
- **Retorna** dados transformados
- **Permite** lógica complexa e personalizada

> **💡 Dica:** Use o Code Node quando precisar de lógica que não está disponível em outros nodes ou quando quiser máxima flexibilidade.

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Configurações Principais**

### **1. Mode**
```
Run Once for All Items - Executa uma vez para todos os itens
Run Once for Each Item - Executa uma vez para cada item individual
```

### **2. JavaScript Code**
```javascript
// Exemplo básico
const items = $input.all();
const returnData = [];

for (const item of items) {
  // Sua lógica aqui
  const processedItem = {
    ...item.json,
    processed: true,
    timestamp: new Date().toISOString()
  };
  
  returnData.push({ json: processedItem });
}

return returnData;
```

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Exemplos Práticos**

### **Exemplo 1: Transformar Dados de Formulário**

**Entrada:**
```json
{
  "firstName": "João",
  "lastName": "Silva",
  "email": "joao@email.com",
  "phone": "11999999999"
}
```

**Código:**
```javascript
const items = $input.all();
const returnData = [];

for (const item of items) {
  const data = item.json;
  
  // Padronizar dados
  const processedData = {
    nome_completo: `${data.firstName} ${data.lastName}`,
    email: data.email.toLowerCase(),
    telefone: data.phone.replace(/(\d{2})(\d{5})(\d{4})/, '+55 $1 $2-$3'),
    status: 'ativo',
    data_criacao: new Date().toISOString()
  };
  
  returnData.push({ json: processedData });
}

return returnData;
```

**Saída:**
```json
{
  "nome_completo": "João Silva",
  "email": "joao@email.com",
  "telefone": "+55 11 99999-9999",
  "status": "ativo",
  "data_criacao": "2024-01-15T10:30:00.000Z"
}
```

### **Exemplo 2: Validação e Filtragem**

**Código:**
```javascript
const items = $input.all();
const returnData = [];

for (const item of items) {
  const data = item.json;
  
  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    continue; // Pula itens inválidos
  }
  
  // Validar telefone (deve ter 10-11 dígitos)
  const phoneDigits = data.phone.replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    continue;
  }
  
  // Adicionar validação
  const validatedData = {
    ...data,
    validado: true,
    validado_em: new Date().toISOString()
  };
  
  returnData.push({ json: validatedData });
}

return returnData;
```

### **Exemplo 3: Integração com APIs Externas**

**Código:**
```javascript
const items = $input.all();
const returnData = [];

for (const item of items) {
  const data = item.json;
  
  try {
    // Consultar CEP via ViaCEP
    const cep = data.cep.replace(/\D/g, '');
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const cepData = await response.json();
    
    if (!cepData.erro) {
      const enrichedData = {
        ...data,
        endereco: {
          logradouro: cepData.logradouro,
          bairro: cepData.bairro,
          cidade: cepData.localidade,
          estado: cepData.uf,
          cep: cepData.cep
        },
        consultado_em: new Date().toISOString()
      };
      
      returnData.push({ json: enrichedData });
    } else {
      // CEP não encontrado
      returnData.push({ 
        json: { 
          ...data, 
          erro: 'CEP não encontrado',
          cep_informado: cep
        } 
      });
    }
  } catch (error) {
    returnData.push({ 
      json: { 
        ...data, 
        erro: 'Erro na consulta do CEP',
        detalhes: error.message
      } 
    });
  }
}

return returnData;
```

### **Exemplo 4: Cálculos e Agregações**

**Código:**
```javascript
const items = $input.all();

// Calcular estatísticas
let total = 0;
let quantidade = 0;
let valores = [];

for (const item of items) {
  const valor = parseFloat(item.json.valor) || 0;
  total += valor;
  quantidade++;
  valores.push(valor);
}

// Calcular média e mediana
const media = total / quantidade;
const valoresOrdenados = valores.sort((a, b) => a - b);
const mediana = valoresOrdenados[Math.floor(valoresOrdenados.length / 2)];

// Calcular desvio padrão
const somaQuadrados = valores.reduce((acc, valor) => acc + Math.pow(valor - media, 2), 0);
const desvioPadrao = Math.sqrt(somaQuadrados / quantidade);

const estatisticas = {
  total: total.toFixed(2),
  quantidade: quantidade,
  media: media.toFixed(2),
  mediana: mediana.toFixed(2),
  desvio_padrao: desvioPadrao.toFixed(2),
  valor_minimo: Math.min(...valores).toFixed(2),
  valor_maximo: Math.max(...valores).toFixed(2),
  calculado_em: new Date().toISOString()
};

return [{ json: estatisticas }];
```

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Variáveis e Contexto**

### **Variáveis Disponíveis**

```javascript
// Dados de entrada
$input.all()           // Todos os itens de entrada
$input.first()         // Primeiro item
$input.item            // Item atual (em modo "Run Once for Each Item")

// Dados do item
item.json              // Dados JSON do item
item.binary            // Dados binários (arquivos)
item.pairedItem        // Item relacionado

// Contexto do workflow
$workflow              // Informações do workflow
$node                  // Informações do node atual
$position              // Posição do node no workflow

// Funções úteis
$json                  // Acesso direto aos dados JSON
$binary                // Acesso direto aos dados binários
$now                   // Data/hora atual
$today                 // Data atual
```

### **Exemplo com Variáveis de Contexto**

```javascript
const items = $input.all();
const returnData = [];

for (const item of items) {
  const data = item.json;
  
  // Usar contexto do workflow
  const workflowInfo = {
    ...data,
    workflow_id: $workflow.id,
    workflow_name: $workflow.name,
    node_name: $node.name,
    node_position: $position,
    processado_em: $now.toISOString(),
    data_hoje: $today.toISOString().split('T')[0]
  };
  
  returnData.push({ json: workflowInfo });
}

return returnData;
```

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Tratamento de Erros**

### **Try-Catch Básico**

```javascript
const items = $input.all();
const returnData = [];

for (const item of items) {
  try {
    const data = item.json;
    
    // Sua lógica aqui
    const processedData = {
      ...data,
      processado: true
    };
    
    returnData.push({ json: processedData });
  } catch (error) {
    // Log do erro
    console.error('Erro no processamento:', error);
    
    // Retornar item com erro
    returnData.push({
      json: {
        ...item.json,
        erro: true,
        mensagem_erro: error.message,
        stack_trace: error.stack
      }
    });
  }
}

return returnData;
```

### **Validação Robusta**

```javascript
const items = $input.all();
const returnData = [];

for (const item of items) {
  const data = item.json;
  
  // Validar dados obrigatórios
  const camposObrigatorios = ['nome', 'email', 'telefone'];
  const camposFaltantes = camposObrigatorios.filter(campo => !data[campo]);
  
  if (camposFaltantes.length > 0) {
    returnData.push({
      json: {
        ...data,
        erro: true,
        tipo_erro: 'campos_obrigatorios',
        campos_faltantes: camposFaltantes,
        mensagem: `Campos obrigatórios não preenchidos: ${camposFaltantes.join(', ')}`
      }
    });
    continue;
  }
  
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    returnData.push({
      json: {
        ...data,
        erro: true,
        tipo_erro: 'email_invalido',
        mensagem: 'Formato de email inválido'
      }
    });
    continue;
  }
  
  // Processar dados válidos
  const processedData = {
    ...data,
    validado: true,
    processado_em: new Date().toISOString()
  };
  
  returnData.push({ json: processedData });
}

return returnData;
```

## <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Performance e Otimização**

### **Processamento em Lote**

```javascript
const items = $input.all();
const BATCH_SIZE = 100; // Processar 100 itens por vez
const returnData = [];

// Processar em lotes para melhor performance
for (let i = 0; i < items.length; i += BATCH_SIZE) {
  const batch = items.slice(i, i + BATCH_SIZE);
  
  // Processar lote
  for (const item of batch) {
    const data = item.json;
    
    // Lógica de processamento
    const processedData = {
      ...data,
      lote: Math.floor(i / BATCH_SIZE) + 1,
      indice_lote: (i % BATCH_SIZE) + 1
    };
    
    returnData.push({ json: processedData });
  }
  
  // Log de progresso
  console.log(`Processado lote ${Math.floor(i / BATCH_SIZE) + 1} de ${Math.ceil(items.length / BATCH_SIZE)}`);
}

return returnData;
```

### **Cache de Dados**

```javascript
const items = $input.all();
const returnData = [];

// Cache para evitar consultas repetidas
const cache = new Map();

for (const item of items) {
  const data = item.json;
  const chave = data.categoria;
  
  // Verificar cache
  if (cache.has(chave)) {
    const dadosCache = cache.get(chave);
    returnData.push({
      json: {
        ...data,
        dados_categoria: dadosCache,
        origem: 'cache'
      }
    });
    continue;
  }
  
  // Consultar dados (simulado)
  const dadosCategoria = await consultarCategoria(chave);
  
  // Salvar no cache
  cache.set(chave, dadosCategoria);
  
  returnData.push({
    json: {
      ...data,
      dados_categoria: dadosCategoria,
      origem: 'consulta'
    }
  });
}

return returnData;

// Função simulada de consulta
async function consultarCategoria(categoria) {
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    categoria: categoria,
    descricao: `Descrição da categoria ${categoria}`,
    produtos: Math.floor(Math.random() * 100)
  };
}
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Limitações e Considerações**

### **Limitações Técnicas**
- **Timeout**: 30 segundos por execução
- **Memória**: Limite de memória por execução
- **Bibliotecas**: Apenas bibliotecas nativas do Node.js
- **Sistema de arquivos**: Acesso limitado

### **Boas Práticas**
```javascript
// ✅ Bom: Código limpo e bem documentado
const items = $input.all();
const returnData = [];

for (const item of items) {
  const data = item.json;
  
  // Validar dados de entrada
  if (!data.valor) {
    continue;
  }
  
  // Processar dados
  const resultado = processarDados(data);
  
  returnData.push({ json: resultado });
}

return returnData;

// ❌ Evitar: Código complexo sem documentação
const items = $input.all();
return items.map(item => ({ 
  json: { ...item.json, x: eval(item.json.y) } 
}));
```

### **Segurança**
```javascript
// ✅ Seguro: Validar entrada
const data = item.json;
const valor = parseFloat(data.valor) || 0;

// ❌ Inseguro: Executar código dinâmico
const resultado = eval(data.codigo);
```

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Próximos Passos**

Agora que você entende o Code Node:

1. **[Function Node](./function)** - Para funções mais simples
2. **[Expression Node](./expression)** - Para expressões inline
3. **[Set Node](../data-processing/set)** - Para manipulação básica de dados
4. **[IF Node](../logic-control/if.md)** - Para lógica condicional

---

:::tip **Dica Pro**
Use o **Code Node** para lógica complexa e o **Function Node** para operações simples. O Code Node oferece mais flexibilidade, mas o Function Node é mais rápido para tarefas básicas.
:::

:::info **Debugging**
Use `console.log()` para debugar seu código. Os logs aparecem na aba "Execution" do n8n.
:::

:::warning **Performance**
Evite loops infinitos e operações muito pesadas. O n8n tem timeout de 30 segundos por execução.
:::

---

**Links úteis:**
- [Documentação oficial do Code Node](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.code/)
- [JavaScript MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js Documentation](https://nodejs.org/docs/) 