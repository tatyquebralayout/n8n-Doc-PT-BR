---
title: Conectar Aplicações
sidebar_position: 6
description: Aprenda a conectar diferentes aplicações e serviços no n8n usando credenciais e nodes
keywords: [n8n, conectar aplicações, integrações, credenciais, nodes, APIs]
---

# <ion-icon name="link-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Conectar Aplicações

Conectar aplicações é o coração do n8n. Neste guia, você aprenderá como integrar diferentes serviços e sistemas para criar workflows poderosos e automatizados.

## <ion-icon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você aprenderá

- **Conceitos fundamentais** de integração no n8n
- **Como configurar credenciais** para diferentes serviços
- **Tipos de nodes** disponíveis para integração
- **Boas práticas** para conexões seguras e eficientes
- **Exemplos práticos** de integrações comuns

## <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conceitos Fundamentais

### O que são Nodes?
Nodes são os blocos de construção dos workflows no n8n. Cada node representa uma ação ou integração específica:

- **Trigger Nodes**: Iniciam workflows (webhooks, agendamento, etc.)
- **Action Nodes**: Executam ações (enviar email, criar registro, etc.)
- **Logic Nodes**: Controlam o fluxo (condições, loops, etc.)

### O que são Credenciais?
Credenciais são informações de autenticação necessárias para conectar com serviços externos:

- **API Keys**: Chaves de acesso para APIs
- **OAuth**: Autenticação via terceiros (Google, Microsoft, etc.)
- **Basic Auth**: Usuário e senha
- **Custom**: Configurações específicas por serviço

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurando Credenciais

### 1. Acesse o Gerenciador de Credenciais

1. No n8n, clique em **Settings** (⚙️)
2. Selecione **Credentials**
3. Clique em **Add Credential**

### 2. Escolha o Tipo de Credencial

O n8n oferece centenas de tipos de credenciais pré-configurados:

```json
{
  "Google Sheets": "OAuth 2.0",
  "Slack": "OAuth 2.0", 
  "Gmail": "OAuth 2.0",
  "HTTP Request": "Basic Auth",
  "Custom API": "API Key"
}
```

### 3. Configure as Informações

**Para OAuth 2.0:**
- Siga o fluxo de autorização
- Conceda permissões necessárias
- O n8n gerencia tokens automaticamente

**Para API Key:**
- Cole sua chave de API
- Configure headers adicionais se necessário

**Para Basic Auth:**
- Digite usuário e senha
- Use variáveis de ambiente para produção

### 4. Teste a Conexão

Sempre teste suas credenciais antes de usar em workflows:

1. Clique em **Test** após configurar
2. Verifique se a conexão é bem-sucedida
3. Revise as permissões concedidas

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Tipos de Integrações

### Integrações com Apps Populares

#### Comunicação
- **Slack**: Enviar mensagens, criar canais, gerenciar usuários
- **Discord**: Webhooks, mensagens, gerenciamento de servidor
- **Telegram**: Bots, mensagens, grupos
- **Email (Gmail, Outlook)**: Enviar/receber emails, gerenciar caixa de entrada

#### Produtividade
- **Google Sheets**: Ler/escrever dados, fórmulas, formatação
- **Notion**: Páginas, bancos de dados, integração com workspace
- **Trello**: Cartões, listas, boards, membros
- **Asana**: Tarefas, projetos, equipes

#### E-commerce
- **Shopify**: Produtos, pedidos, clientes, inventário
- **WooCommerce**: Loja online, produtos, vendas
- **Mercado Livre**: Listagens, vendas, mensagens
- **PagSeguro**: Pagamentos, transações, webhooks

#### Marketing
- **Mailchimp**: Campanhas, listas, automações
- **HubSpot**: CRM, marketing, vendas
- **ActiveCampaign**: Automação de marketing, CRM
- **ConvertKit**: Email marketing, sequências

### Integrações com APIs Brasileiras

#### Governo
- **Receita Federal**: Consulta CNPJ, validação de documentos
- **Correios**: Rastreamento, cálculo de frete
- **Banco Central**: Taxas de câmbio, indicadores econômicos

#### Serviços Locais
- **ViaCEP**: Consulta de CEPs
- **Serpro**: Validação de CPF/CNPJ
- **Bancos brasileiros**: APIs de pagamento e transferência

## <ion-icon name="code-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Nodes de Integração

### HTTP Request Node

O node mais versátil para integrações customizadas:

```json
{
  "Method": "POST",
  "URL": "https://api.exemplo.com/dados",
  "Headers": {
    "Authorization": "Bearer {{$credentials.apiKey}}",
    "Content-Type": "application/json"
  },
  "Body": {
    "nome": "{{$json.nome}}",
    "email": "{{$json.email}}"
  }
}
```

### Webhook Node

Para receber dados de aplicações externas:

1. **Configure o webhook** no n8n
2. **Copie a URL** gerada
3. **Configure na aplicação** externa
4. **Processe os dados** recebidos

### Code Node

Para lógica customizada e transformações:

```javascript
// Transformar dados recebidos
const dados = $input.all();
const processados = dados.map(item => ({
  id: item.json.id,
  nome: item.json.nome.toUpperCase(),
  data: new Date(item.json.created_at)
}));

return processados;
```

## <ion-icon name="checkmark-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Boas Práticas

### Segurança

1. **Use variáveis de ambiente** para credenciais em produção
2. **Configure HTTPS** para todas as conexões
3. **Revise permissões** regularmente
4. **Use credenciais específicas** por ambiente

### Performance

1. **Implemente rate limiting** para APIs com limites
2. **Use caching** quando possível
3. **Configure timeouts** adequados
4. **Monitore uso de recursos**

### Manutenção

1. **Documente suas integrações**
2. **Teste regularmente** as conexões
3. **Mantenha credenciais atualizadas**
4. **Configure alertas** para falhas

## <ion-icon name="play-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Exemplos Práticos

### Exemplo 1: Integração Gmail + Google Sheets

**Objetivo**: Salvar emails importantes em uma planilha

1. **Gmail Trigger**: Monitora caixa de entrada
2. **Filter**: Filtra emails importantes
3. **Google Sheets**: Adiciona dados à planilha
4. **Slack**: Notifica sobre novos registros

### Exemplo 2: E-commerce + Marketing

**Objetivo**: Automatizar campanhas baseadas em vendas

1. **Shopify Trigger**: Novo pedido
2. **Customer Data**: Busca dados do cliente
3. **Mailchimp**: Adiciona à lista de compradores
4. **Slack**: Notifica equipe de vendas

### Exemplo 3: API Brasileira + Processamento

**Objetivo**: Validar CPF e enviar para CRM

1. **Webhook**: Recebe dados do formulário
2. **HTTP Request**: Consulta CPF na API
3. **Code**: Processa resultado
4. **HubSpot**: Cria/atualiza contato

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Troubleshooting

### Problemas Comuns

**Erro de Autenticação:**
- Verifique se as credenciais estão corretas
- Confirme se não expiraram
- Teste a conexão manualmente

**Rate Limiting:**
- Implemente delays entre requisições
- Use paginação quando disponível
- Configure retry com backoff

**Dados Inconsistentes:**
- Valide formato dos dados
- Use nodes de transformação
- Implemente tratamento de erros

### Debugging

1. **Use Execution Logs** para ver detalhes
2. **Teste nodes individualmente**
3. **Verifique formato dos dados**
4. **Consulte documentação da API**

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Explore as [Integrações](../../integracoes)** disponíveis
2. **Aprenda sobre [Credenciais](../../usando-n8n/credenciais)** em detalhes
3. **Crie seu primeiro workflow** com integrações
4. **Experimente com [Lógica e Dados](../../logica-e-dados)**

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[Integrações](../../integracoes)** - Catálogo completo de nodes
- **[Credenciais](../../usando-n8n/credenciais)** - Gerenciamento de autenticação
- **[HTTP Requests](../../integracoes/builtin-nodes/http-requests/http-request)** - Integrações customizadas
- **[Webhooks](../../integracoes/trigger-nodes/event-based/webhook-trigger)** - Receber dados externos
- **[Comunidade](../../comunidade)** - Exemplos e ajuda da comunidade

---

**<ion-icon name="link-outline" style={{ fontSize: '16px', color: '#ea4b71' }}></ion-icon> Pronto para conectar suas aplicações? Comece explorando as [integrações disponíveis](../../integracoes)!** 