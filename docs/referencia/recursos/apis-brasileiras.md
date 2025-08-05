---
id: apis-brasileiras
title: "APIs Brasileiras para n8n: Catálogo, Exemplos e Integração Nacional"
description: Catálogo de APIs brasileiras populares para integração com n8n, exemplos práticos, tutoriais e casos de uso para o mercado nacional.
sidebar_label: APIs Brasileiras
keywords: [n8n, APIs brasileiras, integração nacional, catálogo APIs n8n, exemplos de integração, tutoriais, automação Brasil, mercado brasileiro]
---

import IonicIcon from '@site/src/components/IonicIcon';

<IonicIcon name="globe-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

Este catálogo especializado lista APIs brasileiras populares que podem ser integradas com n8n, incluindo serviços financeiros, governo, logística, marketplace, comunicação e dezenas de outras APIs nacionais, com exemplos práticos, tutoriais e casos de uso para o mercado brasileiro.

:::info
<IonicIcon name="information-circle-outline" style={{fontSize: '18px', color: '#ea4b71'}} />
**Em construção:** Este catálogo será expandido com tutoriais específicos para cada API brasileira.
:::

## Categorias de APIs

### 🏦 Serviços Financeiros

**APIs bancárias e de pagamento brasileiras:**

- **Banco Central** - Dados econômicos e financeiros
- **PIX** - Sistema de pagamentos instantâneos
- **Boleto Bancário** - Geração e consulta de boletos
- **Cartão de Crédito** - Processamento de pagamentos
- **Criptomoedas** - Integração com exchanges brasileiras

### 🏛️ Governo e Serviços Públicos

**APIs governamentais e serviços públicos:**

- **Receita Federal** - Consulta CNPJ e CPF
- **IBGE** - Dados estatísticos e demográficos
- **Correios** - Rastreamento e cálculo de frete
- **Serasa** - Consulta de dados cadastrais
- **SERPRO** - Serviços de validação

### 🚚 Logística e Transporte

**APIs para logística e transporte:**

- **Correios** - Rastreamento e cálculo de frete
- **Jadlog** - Logística e rastreamento
- **Total Express** - Serviços de entrega
- **Jamef** - Transporte de cargas
- **TNT** - Logística internacional

### 📱 Comunicação e Marketing

**APIs para comunicação e marketing:**

- **WhatsApp Business** - Mensagens e automação
- **Telegram** - Bots e notificações
- **Email Marketing** - Campanhas e automação
- **SMS** - Envio de mensagens
- **Push Notifications** - Notificações em tempo real

### 🛒 E-commerce e Marketplace

**APIs para e-commerce:**

- **Mercado Livre** - Produtos e vendas
- **B2W Digital** - Integração com marketplaces
- **VTEX** - Plataforma de e-commerce
- **Shopify** - Loja online
- **WooCommerce** - E-commerce WordPress

## Como Integrar

### Configuração Básica

Para integrar APIs brasileiras no n8n:

1. **Obtenha credenciais** da API desejada
2. **Configure autenticação** no n8n
3. **Use HTTP Request nodes** para chamadas
4. **Processe respostas** com nodes de dados
5. **Implemente tratamento de erros**

### Exemplo Prático

```javascript
// Exemplo de integração com API de CEP
const cep = $input.first().json.cep;
const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
const data = await response.json();
```

## Próximas Atualizações

- Tutoriais detalhados para cada API
- Exemplos de workflows completos
- Casos de uso específicos do mercado brasileiro
- Guias de troubleshooting para integrações
- Templates de workflows prontos

---

<IonicIcon name="link-outline" style={{fontSize: '16px', color: '#ea4b71'}} />
**Relacionado:** [Integrações Brasileiras](../../integracoes-br/financeiro/compliance-fiscal.md), [HTTP Request](../../integracoes/builtin-nodes/http-requests/http-request)
