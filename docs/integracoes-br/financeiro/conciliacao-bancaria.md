---
title: Conciliação Bancária
description: Automatizar a conciliação bancária usando n8n para integrar extratos bancários com sistemas contábeis
sidebar_position: 1
keywords: [n8n, conciliação, bancária, financeiro, extrato, contabilidade, brasil]
---

# <ion-icon name="calculator-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conciliação Bancária

A **Conciliação Bancária** é o processo de comparar e igualar os registros de uma empresa com os extratos bancários. Esta automação permite conciliar transações automaticamente, reduzindo erros e economizando tempo.

## O que é Conciliação Bancária?

A conciliação bancária é um processo contábil que:

- **Compara** registros internos com extratos bancários
- **Identifica** diferenças e inconsistências
- **Iguala** saldos entre sistemas
- **Detecta** erros e fraudes
- **Gera** relatórios de conformidade

### Benefícios da Automação

- **Redução de erros** manuais
- **Economia de tempo** significativa
- **Maior precisão** nos relatórios
- **Detecção rápida** de inconsistências
- **Compliance** automático

## Componentes da Conciliação

### 1. Extrato Bancário

Dados do banco que incluem:

```json
{
  "data": "2024-01-15",
  "descricao": "PAGAMENTO FORNECEDOR",
  "valor": -1500.00,
  "tipo": "DEBITO",
  "documento": "DOC123456",
  "saldo": 50000.00
}
```

### 2. Registros Internos

Dados do sistema contábil da empresa:

```json
{
  "data": "2024-01-15",
  "descricao": "Pagamento Fornecedor ABC",
  "valor": 1500.00,
  "tipo": "SAIDA",
  "documento": "DOC123456",
  "categoria": "FORNECEDORES"
}
```

### 3. Regras de Conciliação

Critérios para igualar transações:

- **Data**: Mesmo dia ou período
- **Valor**: Valor idêntico
- **Documento**: Número de documento
- **Descrição**: Texto similar
- **Tipo**: Mesma natureza da transação

## Workflows de Conciliação

### 1. Conciliação Automática

Workflow para conciliação totalmente automática:

```javascript
// Workflow: Conciliação Automática
Schedule Trigger → HTTP Request (Extrato) → HTTP Request (Registros) → Code (Conciliação) → Relatório
```

**Configuração:**
- **Schedule Trigger**: Executa diariamente
- **HTTP Request**: Busca extrato bancário
- **HTTP Request**: Busca registros internos
- **Code**: Algoritmo de conciliação
- **Relatório**: Gera relatório de conciliação

### 2. Conciliação Semi-Automática

Workflow com intervenção manual para casos complexos:

```javascript
// Workflow: Conciliação Semi-Automática
Webhook → HTTP Request (Extrato) → Code (Análise) → Switch (Tipo) → Processamento
```

**Configuração:**
- **Webhook**: Recebe novos registros
- **HTTP Request**: Busca extrato correspondente
- **Code**: Analisa e classifica transações
- **Switch**: Direciona por tipo de conciliação
- **Processamento**: Concilia ou envia para revisão

### 3. Conciliação por Lotes

Workflow para processar grandes volumes:

```javascript
// Workflow: Conciliação por Lotes
Schedule Trigger → HTTP Request (Extrato) → Split In Batches → Code (Conciliação) → Merge → Relatório
```

**Configuração:**
- **Schedule Trigger**: Executa periodicamente
- **HTTP Request**: Busca extrato completo
- **Split In Batches**: Divide em lotes menores
- **Code**: Processa cada lote
- **Merge**: Consolida resultados
- **Relatório**: Gera relatório final

## Exemplos Práticos

### Exemplo 1: Conciliação Automática Simples

**Cenário:** Conciliar transações bancárias com registros contábeis.

**Workflow:**
```
Schedule Trigger → HTTP Request (Banco) → HTTP Request (Contabilidade) → Code (Conciliação) → Relatório
```

**Configuração:**
```javascript
// Schedule Trigger - Execução
Cron: 0 8 * * * // Diariamente às 8h

// HTTP Request - Extrato Bancário
Method: GET
URL: https://api.banco.com.br/extrato
Headers: {
  "Authorization": "Bearer {{ $credentials.banco.token }}"
}

// HTTP Request - Registros Contábeis
Method: GET
URL: https://api.contabilidade.com.br/registros
Headers: {
  "Authorization": "Bearer {{ $credentials.contabilidade.token }}"
}

// Code - Algoritmo de Conciliação
const extrato = $('Extrato Bancário').json;
const registros = $('Registros Contábeis').json;

const conciliacoes = [];
const naoConciliados = [];

for (const transacao of extrato) {
  let encontrado = false;
  
  for (const registro of registros) {
    // Regra 1: Mesmo valor e data
    if (Math.abs(transacao.valor) === Math.abs(registro.valor) && 
        transacao.data === registro.data) {
      
      // Regra 2: Documento similar
      if (transacao.documento && registro.documento &&
          transacao.documento.includes(registro.documento)) {
        
        conciliacoes.push({
          extrato: transacao,
          registro: registro,
          tipo: "AUTOMATICA",
          data_conciliacao: new Date().toISOString()
        });
        
        encontrado = true;
        break;
      }
    }
  }
  
  if (!encontrado) {
    naoConciliados.push(transacao);
  }
}

return {
  json: {
    conciliacoes: conciliacoes,
    nao_conciliados: naoConciliados,
    total_conciliado: conciliacoes.length,
    total_nao_conciliado: naoConciliados.length,
    data_processamento: new Date().toISOString()
  }
};
```

### Exemplo 2: Conciliação com Regras Complexas

**Cenário:** Conciliação com múltiplas regras e categorização automática.

**Workflow:**
```
Webhook → HTTP Request (Extrato) → Code (Análise) → Switch (Categoria) → Conciliação → Notificação
```

**Configuração:**
```javascript
// Code - Análise e Categorização
const transacao = $json;

// Regras de categorização
const categorias = {
  "FORNECEDORES": ["FORNECEDOR", "PAGAMENTO", "COMPRA"],
  "CLIENTES": ["CLIENTE", "RECEBIMENTO", "VENDA"],
  "FUNCIONARIOS": ["FUNCIONARIO", "SALARIO", "FOLHA"],
  "IMPOSTOS": ["IMPOSTO", "TRIBUTO", "FISCAL"],
  "SERVICOS": ["SERVICO", "MANUTENCAO", "CONSULTORIA"]
};

// Categorizar transação
let categoria = "OUTROS";
for (const [cat, palavras] of Object.entries(categorias)) {
  if (palavras.some(palavra => 
    transacao.descricao.toUpperCase().includes(palavra))) {
    categoria = cat;
    break;
  }
}

// Calcular score de confiança
let score = 0;
if (transacao.valor > 0) score += 10;
if (transacao.documento) score += 20;
if (categoria !== "OUTROS") score += 30;

return {
  json: {
    ...transacao,
    categoria: categoria,
    score_confianca: score,
    pode_conciliar_automaticamente: score >= 50
  }
};
```

### Exemplo 3: Conciliação com PIX

**Cenário:** Conciliar transações PIX automaticamente.

**Workflow:**
```
Webhook (PIX) → HTTP Request (Extrato) → Code (Conciliação PIX) → Notificação
```

**Configuração:**
```javascript
// Code - Conciliação PIX
const pix = $json;
const extrato = $('Extrato Bancário').json;

// Buscar transação PIX no extrato
const transacaoPix = extrato.find(t => 
  t.descricao.includes("PIX") && 
  Math.abs(t.valor) === Math.abs(pix.valor) &&
  t.data === pix.data
);

if (transacaoPix) {
  return {
    json: {
      pix: pix,
      extrato: transacaoPix,
      conciliado: true,
      tipo: "PIX",
      data_conciliacao: new Date().toISOString()
    }
  };
} else {
  return {
    json: {
      pix: pix,
      conciliado: false,
      motivo: "Transação PIX não encontrada no extrato",
      data_processamento: new Date().toISOString()
    }
  };
}
```

## Regras de Conciliação

### 1. Regras Básicas

```javascript
// Regra 1: Valor e Data
function regraValorData(extrato, registro) {
  return Math.abs(extrato.valor) === Math.abs(registro.valor) && 
         extrato.data === registro.data;
}

// Regra 2: Documento
function regraDocumento(extrato, registro) {
  return extrato.documento && registro.documento &&
         extrato.documento.includes(registro.documento);
}

// Regra 3: Descrição Similar
function regraDescricao(extrato, registro) {
  const desc1 = extrato.descricao.toLowerCase();
  const desc2 = registro.descricao.toLowerCase();
  return desc1.includes(desc2) || desc2.includes(desc1);
}
```

### 2. Regras Avançadas

```javascript
// Regra 4: Padrões de Transação
function regraPadrao(extrato, registro) {
  const padroes = {
    "PIX": /pix/i,
    "TED": /ted/i,
    "DOC": /doc/i,
    "BOLETO": /boleto/i
  };
  
  for (const [tipo, regex] of Object.entries(padroes)) {
    if (regex.test(extrato.descricao) && regex.test(registro.descricao)) {
      return tipo;
    }
  }
  
  return null;
}

// Regra 5: Categorização Automática
function regraCategoria(transacao) {
  const categorias = {
    "FORNECEDORES": ["fornecedor", "pagamento", "compra"],
    "CLIENTES": ["cliente", "recebimento", "venda"],
    "FUNCIONARIOS": ["funcionario", "salario", "folha"],
    "IMPOSTOS": ["imposto", "tributo", "fiscal"]
  };
  
  for (const [categoria, palavras] of Object.entries(categorias)) {
    if (palavras.some(palavra => 
      transacao.descricao.toLowerCase().includes(palavra))) {
      return categoria;
    }
  }
  
  return "OUTROS";
}
```

## Tratamento de Erros

### 1. Transações Não Conciliadas

```javascript
// Code - Tratamento de Não Conciliados
const naoConciliados = $json.nao_conciliados;

if (naoConciliados.length > 0) {
  // Enviar para revisão manual
  return {
    json: {
      tipo: "REVISAO_MANUAL",
      transacoes: naoConciliados,
      total: naoConciliados.length,
      data_processamento: new Date().toISOString()
    }
  };
}
```

### 2. Duplicatas

```javascript
// Code - Detecção de Duplicatas
const transacoes = $json.transacoes;

const duplicatas = [];
const unicas = [];

for (const transacao of transacoes) {
  const chave = `${transacao.data}_${transacao.valor}_${transacao.documento}`;
  
  if (unicas.find(t => 
    `${t.data}_${t.valor}_${t.documento}` === chave)) {
    duplicatas.push(transacao);
  } else {
    unicas.push(transacao);
  }
}

return {
  json: {
    transacoes_unicas: unicas,
    duplicatas: duplicatas,
    total_duplicatas: duplicatas.length
  }
};
```

### 3. Inconsistências

```javascript
// Code - Detecção de Inconsistências
const conciliacoes = $json.conciliacoes;

const inconsistencias = conciliacoes.filter(c => {
  const extrato = c.extrato;
  const registro = c.registro;
  
  // Verificar inconsistências
  return Math.abs(extrato.valor) !== Math.abs(registro.valor) ||
         extrato.data !== registro.data ||
         (extrato.documento && registro.documento && 
          !extrato.documento.includes(registro.documento));
});

return {
  json: {
    conciliacoes_validas: conciliacoes.filter(c => !inconsistencias.includes(c)),
    inconsistencias: inconsistencias,
    total_inconsistencias: inconsistencias.length
  }
};
```

## Relatórios e Dashboards

### 1. Relatório de Conciliação

```javascript
// Code - Geração de Relatório
const dados = $json;

const relatorio = {
  periodo: {
    inicio: dados.data_inicio,
    fim: dados.data_fim
  },
  resumo: {
    total_transacoes: dados.total_transacoes,
    total_conciliado: dados.total_conciliado,
    total_nao_conciliado: dados.total_nao_conciliado,
    percentual_conciliacao: (dados.total_conciliado / dados.total_transacoes) * 100
  },
  categorias: dados.categorias,
  inconsistencias: dados.inconsistencias,
  data_geracao: new Date().toISOString()
};

return { json: relatorio };
```

### 2. Dashboard de Performance

```javascript
// Code - Métricas de Performance
const historico = $json.historico;

const metricas = {
  tempo_medio_conciliacao: calcularTempoMedio(historico),
  taxa_sucesso: calcularTaxaSucesso(historico),
  categorias_mais_conciliadas: calcularCategorias(historico),
  tendencias: calcularTendencias(historico)
};

return { json: metricas };
```

## Boas Práticas

### 1. Configuração

- **Defina regras claras** de conciliação
- **Configure tolerâncias** para valores e datas
- **Implemente logs** detalhados
- **Configure alertas** para inconsistências
- **Mantenha backup** dos dados

### 2. Performance

- **Processe em lotes** para grandes volumes
- **Implemente cache** para consultas frequentes
- **Otimize algoritmos** de conciliação
- **Monitore tempo** de processamento
- **Configure timeouts** adequados

### 3. Segurança

- **Criptografe dados** sensíveis
- **Implemente autenticação** robusta
- **Configure auditoria** de acesso
- **Mantenha logs** de segurança
- **Configure backup** automático

## Troubleshooting

### Problemas Comuns

#### Conciliação incorreta
- Verifique regras de conciliação
- Confirme formatos de dados
- Valide tolerâncias configuradas
- Teste com dados de exemplo
- Monitore logs de erro

#### Performance lenta
- Otimize algoritmos de busca
- Implemente cache
- Processe em lotes menores
- Monitore uso de recursos
- Configure timeouts adequados

#### Dados inconsistentes
- Valide formatos de entrada
- Verifique integridade dos dados
- Implemente validações
- Configure alertas
- Monitore qualidade dos dados

### Debug

1. **Use o node Debug Helper** para inspecionar dados
2. **Configure logging detalhado**
3. **Teste com dados de exemplo**
4. **Monitore performance**
5. **Valide resultados** manualmente

## Próximos Passos

- [HTTP Request](/integracoes/builtin-nodes/http-requests/http-request.md) - Fazer requisições HTTP
- [Expressões n8n](/logica-e-dados/expressoes.md) - Usar dados dinâmicos
- [Tratamento de Erros](/logica-e-dados/flow-logic/error-handling.md) - Lidar com falhas
- [Integrações Brasileiras](/integracoes-br/index.md) - Outras integrações brasileiras
- [Relatórios Fiscais](/integracoes-br/financeiro/relatorios-fiscais.md) - Gerar relatórios fiscais
