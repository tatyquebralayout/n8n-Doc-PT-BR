---
sidebar_position: 2
title: Function Node
description: Execute funções JavaScript simples e rápidas em seus workflows n8n
keywords: [n8n, function, javascript, simples, rápido, operações]
---

# <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Function Node

O **Function Node** é uma versão simplificada do Code Node, ideal para **operações rápidas e simples** em JavaScript. Ele executa uma função para cada item de entrada, oferecendo performance superior para tarefas básicas.

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Conceito Principal**

**Function Node = "Função Simples por Item"**

O Function Node é uma **AÇÃO** que:

- **Executa** uma função para cada item individual
- **Processa** dados de entrada de forma isolada
- **Retorna** dados transformados item por item
- **Oferece** performance superior para operações simples

> **💡 Dica:** Use o Function Node para operações simples e o Code Node para lógica complexa que envolve múltiplos itens.

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Configurações Principais**

### **1. Function Code**

```javascript
// Estrutura básica
return {
  json: {
    // Seus dados processados aqui
  }
};
```

### **2. Variáveis Disponíveis**

```javascript
// Dados do item atual
$json              // Dados JSON do item
$binary            // Dados binários (se houver)
$position          // Posição do item (0, 1, 2...)
$index             // Índice do item (1, 2, 3...)

// Contexto
$now               // Data/hora atual
$today             // Data atual
$workflow          // Informações do workflow
$node              // Informações do node atual
```

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Exemplos Práticos**

### **Exemplo 1: Transformação Simples de Dados**

**Entrada:**

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "idade": 30
}
```

**Função:**

```javascript
return {
  json: {
    nome_completo: $json.nome,
    email_normalizado: $json.email.toLowerCase(),
    faixa_etaria: $json.idade < 18 ? 'menor' : $json.idade < 60 ? 'adulto' : 'idoso',
    processado_em: $now.toISOString()
  }
};
```

**Saída:**

```json
{
  "nome_completo": "João Silva",
  "email_normalizado": "joao@email.com",
  "faixa_etaria": "adulto",
  "processado_em": "2024-01-15T10:30:00.000Z"
}
```

### **Exemplo 2: Validação de Dados**

**Função:**

```javascript
// Validar email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValido = emailRegex.test($json.email);

// Validar idade
const idadeValida = $json.idade >= 0 && $json.idade <= 120;

// Validar nome
const nomeValido = $json.nome && $json.nome.trim().length > 0;

return {
  json: {
    ...$json,
    validacoes: {
      email_valido: emailValido,
      idade_valida: idadeValida,
      nome_valido: nomeValido,
      todos_validos: emailValido && idadeValida && nomeValido
    },
    status: (emailValido && idadeValida && nomeValido) ? 'valido' : 'invalido'
  }
};
```

### **Exemplo 3: Formatação de Dados**

**Função:**

```javascript
// Formatar telefone
const telefone = $json.telefone || '';
const telefoneFormatado = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

// Formatar CPF
const cpf = $json.cpf || '';
const cpfFormatado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

// Formatar data
const data = new Date($json.data_nascimento);
const dataFormatada = data.toLocaleDateString('pt-BR');

return {
  json: {
    ...$json,
    telefone_formatado: telefoneFormatado,
    cpf_formatado: cpfFormatado,
    data_formatada: dataFormatada,
    idade: Math.floor((new Date() - data) / (365.25 * 24 * 60 * 60 * 1000))
  }
};
```

### **Exemplo 4: Cálculos Matemáticos**

**Função:**

```javascript
// Calcular desconto
const preco = parseFloat($json.preco) || 0;
const desconto = parseFloat($json.desconto) || 0;
const precoComDesconto = preco * (1 - desconto / 100);

// Calcular impostos
const icms = precoComDesconto * 0.17; // 17% ICMS
const pis = precoComDesconto * 0.0165; // 1.65% PIS
const cofins = precoComDesconto * 0.076; // 7.6% COFINS

// Calcular total
const total = precoComDesconto + icms + pis + cofins;

return {
  json: {
    ...$json,
    calculos: {
      preco_original: preco,
      desconto_aplicado: desconto,
      preco_com_desconto: precoComDesconto.toFixed(2),
      impostos: {
        icms: icms.toFixed(2),
        pis: pis.toFixed(2),
        cofins: cofins.toFixed(2),
        total_impostos: (icms + pis + cofins).toFixed(2)
      },
      total_final: total.toFixed(2)
    }
  }
};
```

### **Exemplo 5: Manipulação de Texto**

**Função:**

```javascript
// Capitalizar nome
const nome = $json.nome || '';
const nomeCapitalizado = nome
  .toLowerCase()
  .split(' ')
  .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
  .join(' ');

// Gerar slug
const titulo = $json.titulo || '';
const slug = titulo
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .trim('-');

// Extrair domínio do email
const email = $json.email || '';
const dominio = email.split('@')[1] || '';

return {
  json: {
    ...$json,
    nome_capitalizado: nomeCapitalizado,
    slug: slug,
    dominio_email: dominio,
    palavras_titulo: titulo.split(' ').length
  }
};
```

### **Exemplo 6: Condicionais e Lógica**

**Função:**

```javascript
// Determinar categoria por idade
let categoria;
if ($json.idade < 18) {
  categoria = 'menor';
} else if ($json.idade < 25) {
  categoria = 'jovem';
} else if ($json.idade < 60) {
  categoria = 'adulto';
} else {
  categoria = 'idoso';
}

// Determinar prioridade por valor
let prioridade;
if ($json.valor > 1000) {
  prioridade = 'alta';
} else if ($json.valor > 500) {
  prioridade = 'media';
} else {
  prioridade = 'baixa';
}

// Determinar status por múltiplos critérios
const status = ($json.ativo && $json.saldo > 0 && $json.ultimo_acesso) ? 'ativo' : 'inativo';

return {
  json: {
    ...$json,
    categoria_idade: categoria,
    prioridade_valor: prioridade,
    status_conta: status,
    processado_em: $now.toISOString()
  }
};
```

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Operações Avançadas**

### **Manipulação de Arrays**

**Função:**

```javascript
// Filtrar e mapear arrays
const produtos = $json.produtos || [];
const produtosFiltrados = produtos
  .filter(produto => produto.preco > 0)
  .map(produto => ({
    ...produto,
    preco_com_imposto: produto.preco * 1.2,
    categoria: produto.categoria || 'geral'
  }));

// Calcular totais
const totalProdutos = produtosFiltrados.length;
const valorTotal = produtosFiltrados.reduce((total, produto) => total + produto.preco, 0);

return {
  json: {
    ...$json,
    produtos_processados: produtosFiltrados,
    resumo: {
      total_produtos: totalProdutos,
      valor_total: valorTotal.toFixed(2),
      media_preco: totalProdutos > 0 ? (valorTotal / totalProdutos).toFixed(2) : 0
    }
  }
};
```

### **Manipulação de Objetos**

**Função:**

```javascript
// Mesclar objetos
const dadosBasicos = {
  id: $json.id,
  nome: $json.nome,
  email: $json.email
};

const dadosAdicionais = {
  timestamp: $now.toISOString(),
  processado_por: 'function_node',
  versao: '1.0'
};

// Remover campos sensíveis
const { senha, token, ...dadosSeguros } = $json;

return {
  json: {
    ...dadosBasicos,
    ...dadosAdicionais,
    dados_publicos: dadosSeguros,
    campos_removidos: ['senha', 'token']
  }
};
```

### **Validações Complexas**

**Função:**

```javascript
// Validar CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  
  if (cpf.length !== 11) return false;
  
  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Calcular primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let dv1 = resto < 2 ? 0 : resto;
  
  // Calcular segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let dv2 = resto < 2 ? 0 : resto;
  
  return cpf.charAt(9) == dv1 && cpf.charAt(10) == dv2;
}

// Validar CNPJ
function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, '');
  
  if (cnpj.length !== 14) return false;
  
  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  
  // Calcular primeiro dígito verificador
  let soma = 0;
  let peso = 2;
  for (let i = 11; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }
  let resto = soma % 11;
  let dv1 = resto < 2 ? 0 : 11 - resto;
  
  // Calcular segundo dígito verificador
  soma = 0;
  peso = 2;
  for (let i = 12; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }
  resto = soma % 11;
  let dv2 = resto < 2 ? 0 : 11 - resto;
  
  return cnpj.charAt(12) == dv1 && cnpj.charAt(13) == dv2;
}

return {
  json: {
    ...$json,
    validacoes: {
      cpf_valido: validarCPF($json.cpf || ''),
      cnpj_valido: validarCNPJ($json.cnpj || ''),
      email_valido: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email || ''),
      telefone_valido: /^\d{10,11}$/.test(($json.telefone || '').replace(/\D/g, ''))
    }
  }
};
```

## <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Performance vs Code Node**

### **Quando usar Function Node:**

- ✅ Operações simples por item
- ✅ Transformações básicas de dados
- ✅ Validações rápidas
- ✅ Formatação de campos
- ✅ Cálculos matemáticos simples

### **Quando usar Code Node:**

- ✅ Lógica complexa envolvendo múltiplos itens
- ✅ Agregações e estatísticas
- ✅ Integração com APIs externas
- ✅ Processamento em lote
- ✅ Manipulação de arrays complexos

### **Comparação de Performance:**

```javascript
// Function Node - Mais rápido para operações simples
return {
  json: {
    ...$json,
    processado: true,
    timestamp: $now.toISOString()
  }
};

// Code Node - Mais flexível para lógica complexa
const items = $input.all();
const returnData = [];

for (const item of items) {
  // Lógica complexa aqui
  returnData.push({ json: item.json });
}

return returnData;
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Limitações e Considerações**

### **Limitações do Function Node:**

- **Escopo isolado**: Cada item é processado independentemente
- **Sem acesso a outros itens**: Não pode referenciar dados de outros itens
- **Sem loops**: Não pode iterar sobre múltiplos itens
- **Sem async/await**: Não suporta operações assíncronas

### **Boas Práticas:**

```javascript
// ✅ Bom: Código simples e direto
return {
  json: {
    ...$json,
    processado: true
  }
};

// ❌ Evitar: Lógica complexa
return {
  json: {
    ...$json,
    resultado: eval($json.expressao) // Perigoso!
  }
};
```

### **Tratamento de Erros:**

```javascript
// Tratamento básico de erros
try {
  const resultado = parseFloat($json.valor) * 1.1;
  
  return {
    json: {
      ...$json,
      valor_calculado: resultado.toFixed(2)
    }
  };
} catch (error) {
  return {
    json: {
      ...$json,
      erro: true,
      mensagem: 'Erro no cálculo'
    }
  };
}
```

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Próximos Passos**

Agora que você entende o Function Node:

1. **[Code Node](./code)** - Para lógica mais complexa
2. **[Expression Node](./expression)** - Para expressões inline
3. **[Set Node](../data-processing/set)** - Para manipulação básica de dados
4. **[IF Node](../logic-control/if.md)** - Para lógica condicional

---

:::tip **Dica Pro**
Use o **Function Node** para operações simples e rápidas. É mais performático que o Code Node para transformações básicas de dados.
:::

:::info **Performance**
O Function Node é otimizado para processar um item por vez, oferecendo melhor performance para operações simples.
:::

:::warning **Limitações**
Lembre-se: o Function Node não pode acessar outros itens ou executar operações assíncronas. Use o Code Node para esses casos.
:::

---

**Links úteis:**

- [Documentação oficial do Function Node](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.function/)
- [JavaScript MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Code Node](./code) - Para lógica mais complexa
