---
title: ViaCEP
description: Integração com a API ViaCEP para consulta de CEPs brasileiros no n8n
sidebar_position: 1
keywords: [n8n, viacep, cep, endereço, brasil, localização, api]
---

# <ion-icon name="location-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> ViaCEP

O **ViaCEP** é uma API gratuita que permite consultar endereços brasileiros através do CEP. Esta integração permite que você valide e complete endereços automaticamente em seus workflows n8n.

## O que é o ViaCEP?

O ViaCEP é um serviço que fornece dados de endereços brasileiros baseado no CEP (Código de Endereçamento Postal). Ele é mantido pelos Correios e oferece:

- **Consulta gratuita** de CEPs
- **Dados oficiais** dos Correios
- **API REST** simples de usar
- **Sem necessidade** de cadastro
- **Alta disponibilidade** e confiabilidade

### Dados Retornados

Para cada CEP consultado, o ViaCEP retorna:

```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

## Como Usar o ViaCEP no n8n

### 1. Configuração Básica

**Node:** HTTP Request
**Método:** GET
**URL:** `https://viacep.com.br/ws/{{ $json.cep }}/json/`

### 2. Parâmetros

- **cep**: CEP a ser consultado (formato: 00000-000 ou 00000000)

### 3. Exemplo de Configuração

```javascript
// Configuração do HTTP Request
Method: GET
URL: https://viacep.com.br/ws/{{ $json.cep }}/json/
```

## Casos de Uso

### 1. Validação de Endereços

Validar se um CEP existe e retorna dados válidos:

```javascript
// Workflow: Validação de CEP
Webhook → HTTP Request (ViaCEP) → If (CEP válido) → Set → HTTP Request (Salvar)
```

**Configuração:**
- **HTTP Request**: Consulta ViaCEP
- **If**: Verifica se `$json.erro` não existe
- **Set**: Formata dados do endereço
- **HTTP Request**: Salva dados validados

### 2. Preenchimento Automático de Formulários

Completar formulários com dados do CEP:

```javascript
// Workflow: Preenchimento de Formulário
Manual Trigger → HTTP Request (ViaCEP) → Set → HTTP Request (Enviar Formulário)
```

**Configuração:**
- **Manual Trigger**: Entrada do CEP
- **HTTP Request**: Consulta ViaCEP
- **Set**: Mapeia dados para formulário
- **HTTP Request**: Envia formulário preenchido

### 3. Cálculo de Frete

Usar dados do CEP para calcular frete:

```javascript
// Workflow: Cálculo de Frete
Webhook (Pedido) → HTTP Request (ViaCEP) → HTTP Request (API Frete) → Notificação
```

**Configuração:**
- **Webhook**: Recebe pedido com CEP
- **HTTP Request**: Consulta ViaCEP
- **HTTP Request**: Calcula frete com dados do endereço
- **Notificação**: Envia resultado para cliente

### 4. Segmentação Geográfica

Classificar clientes por região:

```javascript
// Workflow: Segmentação Geográfica
Webhook (Novo Cliente) → HTTP Request (ViaCEP) → Switch (Por UF) → Processamento
```

**Configuração:**
- **Webhook**: Recebe dados do cliente
- **HTTP Request**: Consulta ViaCEP
- **Switch**: Direciona por estado (UF)
- **Processamento**: Aplica regras específicas da região

## Exemplos Práticos

### Exemplo 1: Validação de CEP em E-commerce

**Cenário:** Validar CEP durante checkout de e-commerce.

**Workflow:**
```
Webhook (Checkout) → HTTP Request (ViaCEP) → If (CEP Válido) → Processar Pedido
                ↓
            CEP Inválido → Notificar Cliente
```

**Configuração:**
```javascript
// HTTP Request - ViaCEP
Method: GET
URL: https://viacep.com.br/ws/{{ $json.cep }}/json/

// If - Validação
Condition: $json.erro === undefined

// Set - Dados do Endereço
{
  "cep": "{{ $('ViaCEP').json.cep }}",
  "logradouro": "{{ $('ViaCEP').json.logradouro }}",
  "bairro": "{{ $('ViaCEP').json.bairro }}",
  "cidade": "{{ $('ViaCEP').json.localidade }}",
  "estado": "{{ $('ViaCEP').json.uf }}"
}
```

### Exemplo 2: Preenchimento de Formulário de Cadastro

**Cenário:** Preencher automaticamente campos de endereço.

**Workflow:**
```
Manual Trigger → HTTP Request (ViaCEP) → Set → HTTP Request (Salvar Cliente)
```

**Configuração:**
```javascript
// Manual Trigger - Entrada
{
  "cep": "01310-100"
}

// HTTP Request - ViaCEP
Method: GET
URL: https://viacep.com.br/ws/{{ $json.cep }}/json/

// Set - Mapeamento
{
  "nome": "{{ $json.nome }}",
  "email": "{{ $json.email }}",
  "cep": "{{ $('ViaCEP').json.cep }}",
  "endereco": "{{ $('ViaCEP').json.logradouro }}",
  "bairro": "{{ $('ViaCEP').json.bairro }}",
  "cidade": "{{ $('ViaCEP').json.localidade }}",
  "estado": "{{ $('ViaCEP').json.uf }}",
  "ddd": "{{ $('ViaCEP').json.ddd }}"
}
```

### Exemplo 3: Sistema de Delivery

**Cenário:** Validar endereço para delivery.

**Workflow:**
```
Webhook (Pedido) → HTTP Request (ViaCEP) → If (Zona de Entrega) → Agendar Entrega
              ↓
          Fora da Zona → Notificar Indisponibilidade
```

**Configuração:**
```javascript
// HTTP Request - ViaCEP
Method: GET
URL: https://viacep.com.br/ws/{{ $json.cep }}/json/

// If - Zona de Entrega
Condition: $('ViaCEP').json.localidade === "São Paulo" && 
          ($('ViaCEP').json.bairro === "Vila Madalena" || 
           $('ViaCEP').json.bairro === "Pinheiros" ||
           $('ViaCEP').json.bairro === "Vila Olímpia")
```

## Tratamento de Erros

### 1. CEP Não Encontrado

Quando o CEP não existe, o ViaCEP retorna:

```json
{
  "erro": true
}
```

**Tratamento:**
```javascript
// If - CEP Inválido
Condition: $json.erro === true

// Set - Mensagem de Erro
{
  "erro": true,
  "mensagem": "CEP não encontrado. Verifique o número informado.",
  "cep_informado": "{{ $('Manual Trigger').json.cep }}"
}
```

### 2. CEP Inválido

Para CEPs com formato inválido:

```javascript
// Code - Validação de Formato
const cep = $json.cep.replace(/\D/g, '');
if (cep.length !== 8) {
  throw new Error('CEP deve ter 8 dígitos');
}
```

### 3. Rate Limiting

O ViaCEP tem limites de uso:

```javascript
// Code - Tratamento de Rate Limit
try {
  // Fazer requisição
} catch (error) {
  if (error.httpCode === 429) {
    // Aguardar e tentar novamente
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Retry logic
  }
}
```

## Boas Práticas

### 1. Formatação de CEP

Sempre formate o CEP antes da consulta:

```javascript
// Code - Formatação de CEP
const cep = $json.cep.replace(/\D/g, ''); // Remove caracteres não numéricos
const cepFormatado = cep.replace(/^(\d{5})(\d{3})$/, '$1-$2'); // Adiciona hífen
```

### 2. Cache de Consultas

Implemente cache para CEPs consultados frequentemente:

```javascript
// Code - Cache Simples
const cep = $json.cep;
const cacheKey = `cep_${cep}`;

// Verificar cache (implementar conforme sua solução)
const cached = await getFromCache(cacheKey);
if (cached) {
  return { json: cached };
}

// Consultar ViaCEP
const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
const data = await response.json();

// Salvar no cache
await saveToCache(cacheKey, data);

return { json: data };
```

### 3. Validação de Dados

Sempre valide os dados retornados:

```javascript
// Code - Validação de Dados
const data = $json;

if (!data.cep || !data.localidade || !data.uf) {
  throw new Error('Dados incompletos retornados pela API');
}

// Validar formato do CEP
const cepRegex = /^\d{5}-\d{3}$/;
if (!cepRegex.test(data.cep)) {
  throw new Error('Formato de CEP inválido');
}
```

### 4. Tratamento de Timeout

Configure timeouts adequados:

```javascript
// HTTP Request - Configuração
Method: GET
URL: https://viacep.com.br/ws/{{ $json.cep }}/json/
Timeout: 10000 // 10 segundos
```

## Troubleshooting

### Problemas Comuns

#### API não responde
- Verifique conectividade com internet
- Confirme se o ViaCEP está funcionando
- Teste com CEP conhecido (ex: 01001-000)
- Verifique formato do CEP

#### CEP não encontrado
- Confirme se o CEP existe
- Verifique formato (00000-000)
- Teste com CEPs de diferentes regiões
- Consulte site dos Correios

#### Dados incompletos
- Verifique se todos os campos estão sendo retornados
- Confirme se o CEP é válido
- Teste com diferentes CEPs
- Implemente validação de dados

### Debug

1. **Use o node Debug Helper** para inspecionar dados
2. **Teste com CEPs conhecidos** (ex: 01001-000, 20040-007)
3. **Verifique formato** do CEP de entrada
4. **Monitore logs** de erro
5. **Teste a API diretamente** no navegador

## Limitações e Considerações

### Limitações do ViaCEP

- **Rate limiting**: Limite de consultas por minuto
- **Dados dos Correios**: Depende da atualização dos Correios
- **CEP não encontrado**: Alguns CEPs podem não existir
- **Formato fixo**: Apenas CEPs brasileiros

### Considerações de Performance

- **Cache**: Implemente cache para consultas frequentes
- **Batch**: Evite múltiplas consultas simultâneas
- **Timeout**: Configure timeouts adequados
- **Retry**: Implemente retry logic para falhas

### Alternativas

Para casos específicos, considere:

- **APIs pagas**: Maior confiabilidade e suporte
- **Bases locais**: Para consultas muito frequentes
- **APIs alternativas**: Outras fontes de dados de endereço
- **Validação local**: Para CEPs conhecidos

## Próximos Passos

- [HTTP Request](/integracoes/builtin-nodes/http-requests/http-request.md) - Fazer requisições HTTP
- [Expressões n8n](/logica-e-dados/expressoes.md) - Usar dados dinâmicos
- [Tratamento de Erros](/logica-e-dados/flow-logic/error-handling.md) - Lidar com falhas
- [Integrações Brasileiras](/integracoes-br/index.md) - Outras integrações brasileiras
- [Localização](/integracoes-br/localizacao/index.md) - Mais ferramentas de localização
