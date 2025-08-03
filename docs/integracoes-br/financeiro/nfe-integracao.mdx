---
title: NFE Integração
description: Integração com Nota Fiscal Eletrônica (NFE) para automatizar processos fiscais no n8n
sidebar_position: 2
keywords: [n8n, nfe, nota fiscal, eletrônica, fiscal, brasil, sefaz]
---

# <ion-icon name="document-text-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> NFE Integração

A **Nota Fiscal Eletrônica (NFE)** é um documento fiscal obrigatório no Brasil. Esta integração permite automatizar processos relacionados à NFE, incluindo emissão, consulta, cancelamento e relatórios fiscais.

## O que é NFE?

A NFE é um documento fiscal eletrônico que:

- **Substitui** a nota fiscal em papel
- **É obrigatória** para a maioria das operações comerciais
- **É validada** pela SEFAZ (Secretaria da Fazenda)
- **Gera XML** com assinatura digital
- **Permite consulta** online da validade

### Benefícios da Automação

- **Emissão automática** de NFEs
- **Validação** em tempo real
- **Integração** com sistemas ERP
- **Relatórios** fiscais automáticos
- **Compliance** fiscal automático

## Componentes da NFE

### 1. Dados do Emitente

Informações da empresa emissora:

```json
{
  "cnpj": "00.000.000/0001-00",
  "razao_social": "EMPRESA EXEMPLO LTDA",
  "nome_fantasia": "EMPRESA EXEMPLO",
  "ie": "123.456.789",
  "endereco": {
    "logradouro": "Rua Exemplo",
    "numero": "123",
    "bairro": "Centro",
    "municipio": "São Paulo",
    "uf": "SP",
    "cep": "01001-000"
  }
}
```

### 2. Dados do Destinatário

Informações do cliente:

```json
{
  "cnpj": "11.111.111/0001-11",
  "razao_social": "CLIENTE EXEMPLO LTDA",
  "endereco": {
    "logradouro": "Av. Cliente",
    "numero": "456",
    "bairro": "Bairro Cliente",
    "municipio": "Rio de Janeiro",
    "uf": "RJ",
    "cep": "20040-007"
  }
}
```

### 3. Itens da Nota

Produtos ou serviços:

```json
{
  "itens": [
    {
      "codigo": "001",
      "descricao": "Produto Exemplo",
      "ncm": "12345678",
      "cfop": "5102",
      "quantidade": 10,
      "valor_unitario": 100.00,
      "valor_total": 1000.00
    }
  ]
}
```

## Workflows de NFE

### 1. Emissão Automática

Workflow para emissão automática de NFE:

```javascript
// Workflow: Emissão Automática de NFE
Webhook (Pedido) → Validação → HTTP Request (SEFAZ) → Processamento → Notificação
```

**Configuração:**
- **Webhook**: Recebe dados do pedido
- **Validação**: Valida dados obrigatórios
- **HTTP Request**: Envia para SEFAZ
- **Processamento**: Processa resposta
- **Notificação**: Notifica resultado

### 2. Consulta de Status

Workflow para consultar status de NFE:

```javascript
// Workflow: Consulta de Status
Schedule Trigger → HTTP Request (Consulta) → Processamento → Relatório
```

**Configuração:**
- **Schedule Trigger**: Executa periodicamente
- **HTTP Request**: Consulta SEFAZ
- **Processamento**: Analisa status
- **Relatório**: Gera relatório de status

### 3. Cancelamento Automático

Workflow para cancelamento de NFE:

```javascript
// Workflow: Cancelamento de NFE
Webhook (Cancelamento) → Validação → HTTP Request (Cancelamento) → Confirmação
```

**Configuração:**
- **Webhook**: Recebe solicitação de cancelamento
- **Validação**: Valida permissões e prazo
- **HTTP Request**: Envia cancelamento para SEFAZ
- **Confirmação**: Confirma cancelamento

## Exemplos Práticos

### Exemplo 1: Emissão Automática de NFE

**Cenário:** Emitir NFE automaticamente quando um pedido é aprovado.

**Workflow:**
```
Webhook (Pedido Aprovado) → Validação → HTTP Request (SEFAZ) → Processamento → Notificação
```

**Configuração:**
```javascript
// Webhook - Dados do Pedido
{
  "pedido_id": "12345",
  "cliente": {
    "cnpj": "11.111.111/0001-11",
    "razao_social": "CLIENTE EXEMPLO LTDA"
  },
  "itens": [
    {
      "codigo": "001",
      "descricao": "Produto A",
      "quantidade": 5,
      "valor_unitario": 100.00
    }
  ]
}

// Code - Validação de Dados
const pedido = $json;

// Validar dados obrigatórios
const validacoes = {
  cliente_cnpj: pedido.cliente.cnpj && pedido.cliente.cnpj.length === 18,
  cliente_razao_social: pedido.cliente.razao_social && pedido.cliente.razao_social.length > 0,
  itens: pedido.itens && pedido.itens.length > 0,
  valores: pedido.itens.every(item => item.valor_unitario > 0)
};

const dadosValidos = Object.values(validacoes).every(v => v);

if (!dadosValidos) {
  throw new Error('Dados do pedido inválidos para emissão de NFE');
}

// Preparar dados para NFE
const nfeData = {
  emitente: {
    cnpj: "00.000.000/0001-00",
    razao_social: "EMPRESA EXEMPLO LTDA",
    ie: "123.456.789"
  },
  destinatario: pedido.cliente,
  itens: pedido.itens.map(item => ({
    ...item,
    ncm: "12345678",
    cfop: "5102",
    valor_total: item.quantidade * item.valor_unitario
  })),
  total: pedido.itens.reduce((sum, item) => sum + (item.quantidade * item.valor_unitario), 0)
};

return { json: nfeData };
```

### Exemplo 2: Consulta de Status de NFE

**Cenário:** Consultar status de NFEs emitidas.

**Workflow:**
```
Schedule Trigger → HTTP Request (Consulta) → Code (Análise) → Relatório
```

**Configuração:**
```javascript
// Schedule Trigger - Execução
Cron: 0 */2 * * * // A cada 2 horas

// HTTP Request - Consulta SEFAZ
Method: POST
URL: https://api.sefaz.gov.br/nfe/consulta
Headers: {
  "Content-Type": "application/json",
  "Authorization": "Bearer {{ $credentials.sefaz.token }}"
}
Body: {
  "cnpj_emitente": "00.000.000/0001-00",
  "data_inicio": "{{ $now.minus({ days: 1 }).toFormat('yyyy-MM-dd') }}",
  "data_fim": "{{ $now.toFormat('yyyy-MM-dd') }}"
}

// Code - Análise de Status
const consulta = $json;

const analise = {
  total_nfes: consulta.nfes.length,
  aprovadas: consulta.nfes.filter(nfe => nfe.status === "AUTORIZADA").length,
  canceladas: consulta.nfes.filter(nfe => nfe.status === "CANCELADA").length,
  pendentes: consulta.nfes.filter(nfe => nfe.status === "PENDENTE").length,
  rejeitadas: consulta.nfes.filter(nfe => nfe.status === "REJEITADA").length
};

// Alertas para problemas
const alertas = [];
if (analise.rejeitadas > 0) {
  alertas.push(`NFEs rejeitadas: ${analise.rejeitadas}`);
}
if (analise.pendentes > 5) {
  alertas.push(`Muitas NFEs pendentes: ${analise.pendentes}`);
}

return {
  json: {
    analise: analise,
    alertas: alertas,
    nfes: consulta.nfes,
    data_consulta: new Date().toISOString()
  }
};
```

### Exemplo 3: Cancelamento Automático de NFE

**Cenário:** Cancelar NFE automaticamente quando pedido é cancelado.

**Workflow:**
```
Webhook (Pedido Cancelado) → Validação → HTTP Request (Cancelamento) → Confirmação
```

**Configuração:**
```javascript
// Webhook - Pedido Cancelado
{
  "pedido_id": "12345",
  "nfe_numero": "000001",
  "motivo_cancelamento": "Solicitação do cliente"
}

// Code - Validação de Cancelamento
const cancelamento = $json;

// Verificar se NFE pode ser cancelada
const nfe = await consultarNFE(cancelamento.nfe_numero);

if (nfe.status !== "AUTORIZADA") {
  throw new Error(`NFE não pode ser cancelada. Status atual: ${nfe.status}`);
}

// Verificar prazo de cancelamento (24h)
const dataEmissao = new Date(nfe.data_emissao);
const agora = new Date();
const horasDecorridas = (agora - dataEmissao) / (1000 * 60 * 60);

if (horasDecorridas > 24) {
  throw new Error('Prazo para cancelamento expirado (24h)');
}

// Preparar dados para cancelamento
const cancelamentoData = {
  nfe_numero: cancelamento.nfe_numero,
  justificativa: cancelamento.motivo_cancelamento,
  protocolo: nfe.protocolo
};

return { json: cancelamentoData };
```

## Integração com SEFAZ

### 1. Autenticação

```javascript
// Code - Autenticação SEFAZ
const credentials = {
  cnpj: "00.000.000/0001-00",
  certificado: "certificado.p12",
  senha: "senha_certificado"
};

// Gerar token de acesso
const token = await gerarTokenSEFAZ(credentials);

return { json: { token: token } };
```

### 2. Emissão de NFE

```javascript
// HTTP Request - Emissão NFE
Method: POST
URL: https://api.sefaz.gov.br/nfe/emissao
Headers: {
  "Content-Type": "application/json",
  "Authorization": "Bearer {{ $credentials.sefaz.token }}"
}
Body: {
  "emitente": $json.emitente,
  "destinatario": $json.destinatario,
  "itens": $json.itens,
  "total": $json.total,
  "forma_pagamento": "01", // Dinheiro
  "tipo_operacao": "0" // Saída
}
```

### 3. Consulta de Status

```javascript
// HTTP Request - Consulta Status
Method: GET
URL: https://api.sefaz.gov.br/nfe/status/{{ $json.nfe_numero }}
Headers: {
  "Authorization": "Bearer {{ $credentials.sefaz.token }}"
}
```

## Tratamento de Erros

### 1. NFE Rejeitada

```javascript
// Code - Tratamento de Rejeição
const resposta = $json;

if (resposta.status === "REJEITADA") {
  const erro = {
    nfe_numero: resposta.nfe_numero,
    motivo: resposta.motivo_rejeicao,
    codigo: resposta.codigo_rejeicao,
    data_rejeicao: new Date().toISOString()
  };
  
  // Enviar para correção manual
  return {
    json: {
      tipo: "CORRECAO_MANUAL",
      erro: erro,
      dados_originais: $('Webhook').json
    }
  };
}
```

### 2. Timeout da SEFAZ

```javascript
// Code - Tratamento de Timeout
try {
  const resposta = await enviarNFE($json);
  return { json: resposta };
} catch (error) {
  if (error.code === "TIMEOUT") {
    // Retry com backoff
    await new Promise(resolve => setTimeout(resolve, 5000));
    const resposta = await enviarNFE($json);
    return { json: resposta };
  }
  throw error;
}
```

### 3. Certificado Expirado

```javascript
// Code - Verificação de Certificado
const certificado = await verificarCertificado();

if (certificado.expirado) {
  // Notificar administrador
  return {
    json: {
      tipo: "ALERTA_CERTIFICADO",
      mensagem: "Certificado digital expirado",
      data_expiracao: certificado.data_expiracao,
      acao_necessaria: "Renovar certificado digital"
    }
  };
}
```

## Relatórios Fiscais

### 1. Relatório de NFEs Emitidas

```javascript
// Code - Relatório de NFEs
const nfes = $json.nfes;

const relatorio = {
  periodo: {
    inicio: $json.data_inicio,
    fim: $json.data_fim
  },
  resumo: {
    total_emitidas: nfes.length,
    total_valor: nfes.reduce((sum, nfe) => sum + nfe.valor_total, 0),
    aprovadas: nfes.filter(nfe => nfe.status === "AUTORIZADA").length,
    canceladas: nfes.filter(nfe => nfe.status === "CANCELADA").length
  },
  por_cliente: nfes.reduce((acc, nfe) => {
    const cliente = nfe.destinatario.razao_social;
    if (!acc[cliente]) acc[cliente] = { total: 0, nfes: [] };
    acc[cliente].total += nfe.valor_total;
    acc[cliente].nfes.push(nfe);
    return acc;
  }, {}),
  data_geracao: new Date().toISOString()
};

return { json: relatorio };
```

### 2. Dashboard Fiscal

```javascript
// Code - Dashboard Fiscal
const dados = $json;

const dashboard = {
  metricas: {
    nfes_hoje: dados.nfes.filter(nfe => 
      nfe.data_emissao.startsWith(new Date().toISOString().split('T')[0])).length,
    valor_hoje: dados.nfes.filter(nfe => 
      nfe.data_emissao.startsWith(new Date().toISOString().split('T')[0]))
      .reduce((sum, nfe) => sum + nfe.valor_total, 0),
    pendentes: dados.nfes.filter(nfe => nfe.status === "PENDENTE").length
  },
  tendencias: {
    ultimos_7_dias: calcularTendencia(dados.nfes, 7),
    ultimos_30_dias: calcularTendencia(dados.nfes, 30)
  },
  alertas: gerarAlertas(dados)
};

return { json: dashboard };
```

## Boas Práticas

### 1. Segurança

- **Use certificados digitais** válidos
- **Mantenha senhas** seguras
- **Implemente auditoria** de acesso
- **Configure backup** de certificados
- **Monitore expiração** de certificados

### 2. Performance

- **Implemente cache** para consultas
- **Configure timeouts** adequados
- **Processe em lotes** quando possível
- **Monitore tempo** de resposta
- **Configure retry** com backoff

### 3. Compliance

- **Mantenha logs** de todas as operações
- **Configure alertas** para problemas
- **Implemente validações** robustas
- **Documente processos** fiscais
- **Configure backup** de dados

## Troubleshooting

### Problemas Comuns

#### NFE rejeitada
- Verifique dados obrigatórios
- Confirme formato dos dados
- Valide certificado digital
- Consulte códigos de erro
- Teste com dados de exemplo

#### Timeout da SEFAZ
- Configure timeouts adequados
- Implemente retry logic
- Monitore conectividade
- Verifique certificado
- Configure alertas

#### Certificado expirado
- Monitore data de expiração
- Configure alertas antecipados
- Mantenha backup de certificados
- Documente processo de renovação
- Configure notificações

### Debug

1. **Use o node Debug Helper** para inspecionar dados
2. **Configure logging detalhado**
3. **Teste com dados de exemplo**
4. **Monitore logs da SEFAZ**
5. **Valide certificado digital**

## Próximos Passos

- [HTTP Request](/integracoes/builtin-nodes/http-requests/http-request) - Fazer requisições HTTP
- [Expressões n8n](/logica-e-dados/expressoes) - Usar dados dinâmicos
- [Tratamento de Erros](/logica-e-dados/flow-logic/error-handling) - Lidar com falhas
- [Integrações Brasileiras](/integracoes-br/index) - Outras integrações brasileiras
- [Compliance Fiscal](/integracoes-br/financeiro/compliance-fiscal) - Conformidade fiscal
