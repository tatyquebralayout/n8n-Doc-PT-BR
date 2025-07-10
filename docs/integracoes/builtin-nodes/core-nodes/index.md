---
sidebar_position: 1
title: Core Nodes
description: Nodes fundamentais do n8n para programação e manipulação de dados
keywords: [n8n, core, nodes, fundamentais, programação, javascript, dados]
---

# <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Core Nodes

Os **Core Nodes** são os blocos de construção fundamentais do n8n, oferecendo capacidades de programação e manipulação de dados essenciais para qualquer workflow.

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você encontrará aqui

### Nodes de Programação

- **[Code Node](./code)** - Execute código JavaScript customizado
- **[Function Node](./function)** - Funções simples e rápidas
- **[Expression Node](./expression)** - Expressões JavaScript inline

### Nodes de Manipulação

- **[Edit Fields (Set)](../data-processing/set)** - Definir e modificar campos
- **[Split In Batches](../data-processing/split-in-batches)** - Dividir dados em lotes
- **[Aggregate](../data-processing/aggregate)** - Agregar e resumir dados

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conceitos Fundamentais

### O que são Core Nodes?

Core Nodes são nodes nativos do n8n que fornecem funcionalidades básicas de programação e manipulação de dados. Eles são essenciais para:

- **Programação customizada** com JavaScript
- **Manipulação de dados** e transformações
- **Lógica condicional** e controle de fluxo
- **Agregações** e processamento em lote

### Quando usar Core Nodes?

- ✅ **Lógica customizada** não disponível em outros nodes
- ✅ **Transformações complexas** de dados
- ✅ **Validações avançadas** e tratamento de erros
- ✅ **Integrações personalizadas** com APIs externas
- ✅ **Cálculos matemáticos** e estatísticas

## <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Nodes de Programação

### **Code Node**

O node mais poderoso para programação customizada:

```javascript
// Exemplo: Processar múltiplos itens
const items = $input.all();
const returnData = [];

for (const item of items) {
  // Sua lógica complexa aqui
  const processedData = {
    ...item.json,
    processado: true,
    timestamp: new Date().toISOString()
  };
  
  returnData.push({ json: processedData });
}

return returnData;
```

**Use quando:**

- Lógica complexa envolvendo múltiplos itens
- Integração com APIs externas
- Processamento em lote
- Manipulação de arrays complexos

### **Function Node**

Versão simplificada para operações rápidas:

```javascript
// Exemplo: Transformação simples
return {
  json: {
    ...$json,
    nome_completo: $json.primeiro_nome + ' ' + $json.ultimo_nome,
    processado_em: $now.toISOString()
  }
};
```

**Use quando:**

- Operações simples por item
- Transformações básicas de dados
- Validações rápidas
- Formatação de campos

### **Expression Node**

Expressões JavaScript inline em outros nodes:

```javascript
// Exemplo: URL dinâmica
{{ 'https://api.exemplo.com/usuarios/' + $json.id }}

// Exemplo: Condição dinâmica
{{ $json.valor > 1000 && $json.ativo }}
```

**Use quando:**

- Valores dinâmicos em outros nodes
- Condições simples
- Cálculos básicos
- Formatação inline

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Comparação de Performance

| Node | Complexidade | Performance | Caso de Uso |
|------|-------------|-------------|-------------|
| **Expression** | Baixa | ⭐⭐⭐⭐⭐ | Valores dinâmicos simples |
| **Function** | Média | ⭐⭐⭐⭐ | Operações por item |
| **Code** | Alta | ⭐⭐⭐ | Lógica complexa |

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Exemplos Práticos

### **Exemplo 1: Validação de Dados**

**Function Node:**

```javascript
// Validar dados de entrada
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValido = emailRegex.test($json.email);

const telefoneValido = /^\d{10,11}$/.test(($json.telefone || '').replace(/\D/g, ''));

return {
  json: {
    ...$json,
    validacoes: {
      email_valido: emailValido,
      telefone_valido: telefoneValido,
      todos_validos: emailValido && telefoneValido
    },
    status: (emailValido && telefoneValido) ? 'valido' : 'invalido'
  }
};
```

### **Exemplo 2: Transformação de Dados**

**Code Node:**

```javascript
const items = $input.all();
const returnData = [];

for (const item of items) {
  const data = item.json;
  
  // Padronizar dados
  const processedData = {
    nome_completo: `${data.primeiro_nome} ${data.ultimo_nome}`,
    email: data.email.toLowerCase(),
    telefone: data.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '+55 $1 $2-$3'),
    data_nascimento: new Date(data.data_nascimento).toISOString(),
    idade: Math.floor((new Date() - new Date(data.data_nascimento)) / (365.25 * 24 * 60 * 60 * 1000))
  };
  
  returnData.push({ json: processedData });
}

return returnData;
```

### **Exemplo 3: Integração com API Externa**

**Code Node:**

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

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Boas Práticas

### **Segurança**

```javascript
// ✅ Bom: Validar entrada
const valor = parseFloat($json.valor) || 0;

// ❌ Evitar: Executar código dinâmico
const resultado = eval($json.expressao);
```

### **Performance**

```javascript
// ✅ Bom: Código otimizado
const items = $input.all();
const returnData = items.map(item => ({
  json: { ...item.json, processado: true }
}));

// ❌ Evitar: Loops desnecessários
for (let i = 0; i < items.length; i++) {
  // Código lento
}
```

### **Tratamento de Erros**

```javascript
// ✅ Bom: Try-catch adequado
try {
  const resultado = processarDados($json);
  return { json: { ...$json, resultado } };
} catch (error) {
  return { 
    json: { 
      ...$json, 
      erro: true, 
      mensagem: error.message 
    } 
  };
}
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Limitações e Considerações

### **Limitações Técnicas**

- **Timeout**: 30 segundos por execução (Code/Function Nodes)
- **Memória**: Limite de memória por execução
- **Bibliotecas**: Apenas bibliotecas nativas do Node.js
- **Sistema de arquivos**: Acesso limitado

### **Considerações de Performance**

- **Expression**: Mais rápida para operações simples
- **Function**: Otimizada para processamento por item
- **Code**: Mais flexível, mas pode ser mais lento

### **Debugging**

```javascript
// Logs aparecem na aba "Execution"
console.log('Dados de entrada:', $json);
console.log('Resultado:', resultado);
```

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

Agora que você entende os Core Nodes:

1. **[Code Node](./code)** - Para lógica complexa e customizada
2. **[Function Node](./function)** - Para operações simples e rápidas
3. **[Expression Node](./expression)** - Para expressões inline
4. **[Data Processing](../data-processing/)** - Para manipulação de dados
5. **[Logic Control](../logic-control/)** - Para controle de fluxo

---

:::tip **Dica Pro**
Comece com **Expression** para valores dinâmicos simples, depois use **Function** para operações por item, e finalmente **Code** para lógica complexa.
:::

:::info **Performance**
Use o node mais simples possível para sua necessidade. Expression > Function > Code em ordem de performance.
:::

:::warning **Segurança**
Sempre valide dados de entrada e evite usar `eval()` ou código dinâmico em seus nodes.
:::

---

**Links úteis:**

- [Documentação oficial dos Core Nodes](https://docs.n8n.io/integrations/builtin/cluster-nodes/)
- [JavaScript MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Code Node](./code) - Para lógica complexa
- [Function Node](./function) - Para operações simples
- [Expression Node](./expression) - Para expressões inline
