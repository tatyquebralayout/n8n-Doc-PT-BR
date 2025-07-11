---
sidebar_position: 2
title: Integração Gmail
description: Como integrar n8n com Gmail para automação de emails e comunicação
keywords: [n8n, gmail, email, integração, automação, comunicação, google]
---

# <ion-icon name="mail-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Integração Gmail

O **Gmail** é a plataforma de email mais utilizada no mundo, e a integração com n8n permite automatizar processos de comunicação, criar workflows de email marketing e gerenciar correspondências de forma inteligente.

## <ion-icon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Visão Geral

A integração n8n-Gmail oferece:

- **Envio automático de emails** baseado em eventos
- **Processamento de emails recebidos** com filtros inteligentes
- **Automação de respostas** e follow-ups
- **Integração com CRM** e sistemas de vendas
- **Email marketing automatizado** com personalização
- **Monitoramento de caixa de entrada** e alertas

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração

### 1. Configurar Google Cloud Project

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Gmail API**
4. Configure a tela de consentimento OAuth

### 2. Criar Credenciais OAuth 2.0

1. Vá para **"APIs & Services" > "Credentials"**
2. Clique em **"Create Credentials" > "OAuth 2.0 Client IDs"**
3. Configure o tipo de aplicação (Web application)
4. Adicione URIs de redirecionamento autorizados
5. Copie o **Client ID** e **Client Secret**

### 3. Configurar Credenciais no n8n

1. No n8n, vá para **Settings > Credentials**
2. Clique em **"Add Credential"**
3. Selecione **"Gmail"**
4. Insira o Client ID e Client Secret
5. Autorize o acesso à conta Gmail

### 4. Permissões Necessárias

O app solicitará as seguintes permissões:

- **Read and send emails** - Ler e enviar emails
- **Manage drafts and send emails** - Gerenciar rascunhos
- **View and modify but not delete your email** - Visualizar e modificar emails
- **View your email address** - Visualizar endereço de email

## <ion-icon name="code-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Nós Disponíveis

### 1. Gmail Trigger

Dispara workflows baseado em eventos do Gmail.

**Eventos disponíveis:**
- `messageReceived` - Novo email recebido
- `messageSent` - Email enviado
- `draftCreated` - Rascunho criado
- `labelAdded` - Label adicionada

**Configuração:**
```json
{
  "event": "messageReceived",
  "filters": {
    "from": "cliente@exemplo.com",
    "subject": "pedido",
    "hasAttachment": true
  }
}
```

### 2. Send Email

Envia emails através do Gmail.

**Configuração básica:**
```json
{
  "to": "destinatario@exemplo.com",
  "subject": "Confirmação de Pedido",
  "text": "Seu pedido foi confirmado com sucesso!",
  "html": "<h1>Pedido Confirmado</h1><p>Obrigado pela compra!</p>"
}
```

**Configuração avançada:**
```json
{
  "to": "{{ $json.email }}",
  "cc": "gerente@empresa.com",
  "bcc": "admin@empresa.com",
  "subject": "Pedido #{{ $json.pedido_id }} - {{ $json.status }}",
  "html": "{{ $('Template Node').json.html_template }}",
  "attachments": [
    {
      "name": "fatura.pdf",
      "data": "{{ $binary.fatura.data }}"
    }
  ]
}
```

### 3. Get Emails

Busca emails da caixa de entrada com filtros.

**Configuração:**
```json
{
  "query": "from:cliente@exemplo.com subject:pedido",
  "maxResults": 10,
  "includeAttachments": true
}
```

### 4. Reply to Email

Responde automaticamente a emails.

**Configuração:**
```json
{
  "messageId": "{{ $json.id }}",
  "text": "Recebemos sua mensagem e responderemos em breve.",
  "html": "<p>Obrigado pelo contato!</p>"
}
```

## <ion-icon name="construct-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Casos de Uso Práticos

### 1. Sistema de Suporte Automatizado

**Cenário**: Processamento automático de tickets de suporte via email.

```mermaid
graph TD
    A[Gmail Trigger] --> B[Analisar Email]
    B --> C[Classificar Ticket]
    C --> D[Slack - Notificar]
    D --> E[Gmail - Auto Reply]
    E --> F[CRM - Criar Ticket]
```

**Configuração do Trigger:**
```json
{
  "event": "messageReceived",
  "filters": {
    "to": "suporte@empresa.com",
    "subject": "suporte OR ajuda OR problema"
  }
}
```

**Configuração da Auto-Resposta:**
```json
{
  "messageId": "{{ $json.id }}",
  "html": `
    <h2>Ticket Recebido</h2>
    <p>Olá {{ $json.from.name }},</p>
    <p>Recebemos sua solicitação de suporte e criamos o ticket #{{ $json.ticket_id }}.</p>
    <p><strong>Assunto:</strong> {{ $json.subject }}</p>
    <p><strong>Prioridade:</strong> {{ $json.prioridade }}</p>
    <p>Nossa equipe entrará em contato em até 24 horas.</p>
    <p>Atenciosamente,<br>Equipe de Suporte</p>
  `
}
```

### 2. Email Marketing Automatizado

**Cenário**: Sequência de emails para leads qualificados.

```mermaid
graph TD
    A[CRM - Novo Lead] --> B[Gmail - Email 1]
    B --> C[Wait - 2 dias]
    C --> D[Gmail - Email 2]
    D --> E[Wait - 3 dias]
    E --> F[Gmail - Email 3]
```

**Configuração do Email:**
```json
{
  "to": "{{ $json.email }}",
  "subject": "{{ $json.nome }}, conheça nossa solução!",
  "html": `
    <div style="font-family: Arial, sans-serif;">
      <h1>Olá {{ $json.nome }}!</h1>
      <p>Obrigado por se interessar pela nossa solução.</p>
      <p>Baseado no seu perfil, acreditamos que podemos ajudar com:</p>
      <ul>
        <li>{{ $json.interesse_1 }}</li>
        <li>{{ $json.interesse_2 }}</li>
      </ul>
      <p><a href="{{ $json.link_demo }}">Agendar Demonstração</a></p>
    </div>
  `
}
```

### 3. Processamento de Pedidos

**Cenário**: Confirmação automática de pedidos recebidos por email.

```mermaid
graph TD
    A[Gmail Trigger] --> B[Extrair Dados]
    B --> C[Validar Pedido]
    C --> D[Processar Pagamento]
    D --> E[Gmail - Confirmação]
    E --> F[Slack - Notificar]
```

**Configuração da Extração:**
```javascript
// Code Node - Extrair dados do email
const emailBody = $json.body;
const pedidoRegex = /pedido[:\s]*#?(\d+)/i;
const valorRegex = /valor[:\s]*R?\$?\s*([\d,]+\.?\d*)/i;

const pedidoMatch = emailBody.match(pedidoRegex);
const valorMatch = emailBody.match(valorRegex);

return {
  pedido_id: pedidoMatch ? pedidoMatch[1] : null,
  valor: valorMatch ? parseFloat(valorMatch[1].replace(',', '.')) : null,
  cliente_email: $json.from.email,
  cliente_nome: $json.from.name,
  status: 'pendente'
};
```

### 4. Monitoramento de Caixa de Entrada

**Cenário**: Alertas quando emails importantes são recebidos.

```mermaid
graph TD
    A[Gmail Trigger] --> B[Analisar Urgência]
    B --> C{Urgente?}
    C -->|Sim| D[Slack - Alerta]
    C -->|Não| E[Log Normal]
    D --> F[SMS - Notificar]
```

**Configuração do Filtro:**
```json
{
  "event": "messageReceived",
  "filters": {
    "subject": "urgente OR emergência OR crítico",
    "from": "gerente@empresa.com OR diretor@empresa.com"
  }
}
```

## <ion-icon name="flash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Expressões e Data Mapping

### Emails Dinâmicos

```javascript
// Email personalizado baseado em dados
{
  "to": "{{ $json.email }}",
  "subject": "{{ $json.nome }}, seu pedido #{{ $json.pedido_id }} foi processado",
  "html": `
    <h1>Olá {{ $json.nome }}!</h1>
    <p>Seu pedido foi processado com sucesso.</p>
    <p><strong>Valor:</strong> R$ {{ $json.valor.toFixed(2) }}</p>
    <p><strong>Prazo de entrega:</strong> {{ $json.prazo_entrega }}</p>
  `
}
```

### Templates Condicionais

```javascript
// Template baseado no status
const template = $json.status === 'aprovado' 
  ? $('Template Aprovado').json.html
  : $('Template Pendente').json.html;

return {
  "to": $json.email,
  "subject": `Pedido ${$json.status.toUpperCase()}`,
  "html": template
};
```

### Filtros Dinâmicos

```javascript
// Filtro baseado em horário
const hora = $now.getHours();
const filtroHora = hora >= 9 && hora <= 18 ? 'normal' : 'urgente';

return {
  "query": `from:cliente@exemplo.com subject:${filtroHora}`,
  "maxResults": 5
};
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Tratamento de Erros

### Retry para Falhas de Envio

```javascript
// Configuração de retry
{
  "maxTries": 3,
  "waitBetweenTries": 5000,
  "continueOnFail": false
}
```

### Fallback para Outros Canais

```mermaid
graph TD
    A[Gmail - Send Email] --> B{Sucesso?}
    B -->|Não| C[Slack - Notificar]
    B -->|Sim| D[Log Success]
    C --> E[SMS - Enviar]
```

## <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Boas Práticas

### 1. Organização de Labels

- **Automação** - Emails processados automaticamente
- **Suporte** - Tickets de suporte
- **Vendas** - Leads e oportunidades
- **Financeiro** - Faturas e pagamentos
- **Urgente** - Requer atenção imediata

### 2. Templates de Email

```html
<!-- Template base -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ subject }}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <header style="background: #f8f9fa; padding: 20px; text-align: center;">
            <h1 style="color: #333;">{{ empresa_nome }}</h1>
        </header>
        
        <main style="padding: 20px;">
            {{ conteudo }}
        </main>
        
        <footer style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
            <p>{{ footer_texto }}</p>
        </footer>
    </div>
</body>
</html>
```

### 3. Rate Limiting

```javascript
// Respeitar limites do Gmail
{
  "maxEmailsPerDay": 500,
  "waitBetweenEmails": 1000,  // 1 segundo
  "batchSize": 10
}
```

### 4. Privacidade e Compliance

- Não envie dados sensíveis por email
- Respeite leis de proteção de dados (LGPD)
- Implemente unsubscribe em emails marketing
- Monitore logs de envio

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Troubleshooting

### Problemas Comuns

**Erro: "Invalid credentials"**
- Verifique se as credenciais OAuth estão corretas
- Reautorize o acesso à conta Gmail
- Confirme se o app tem as permissões necessárias

**Erro: "Quota exceeded"**
- Reduza a frequência de envio
- Implemente rate limiting
- Use contas diferentes para diferentes tipos de email

**Erro: "Message not found"**
- Verifique se o messageId está correto
- Confirme se o email ainda existe na caixa de entrada
- Use IDs relativos em vez de absolutos

### Debugging

```javascript
// Log para debugging
console.log('Gmail Debug:', {
  to: $json.to,
  subject: $json.subject,
  timestamp: $now,
  status: 'sending'
});
```

## <ion-icon name="link-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Integração com Outros Nós

### Fluxo Completo

```mermaid
graph TD
    A[Gmail Trigger] --> B[Code Node - Processar]
    B --> C[Database - Salvar]
    C --> D[Slack - Notificar]
    D --> E[Gmail - Responder]
    E --> F[CRM - Atualizar]
```

### Exemplo de Workflow Completo

```javascript
// 1. Gmail Trigger - Novo email
{
  "event": "messageReceived",
  "filters": {
    "to": "vendas@empresa.com"
  }
}

// 2. Code Node - Extrair lead
const email = $json;
const lead = {
  nome: email.from.name,
  email: email.from.email,
  telefone: extrairTelefone(email.body),
  interesse: extrairInteresse(email.subject),
  origem: 'email',
  data_recebimento: $now
};

return lead;

// 3. Database - Salvar lead
{
  "operation": "insert",
  "table": "leads",
  "data": $json
}

// 4. Slack - Notificar equipe
{
  "channel": "#vendas",
  "text": `🎯 Novo lead via email: ${$json.nome} (${$json.email})`
}

// 5. Gmail - Auto-resposta
{
  "messageId": "{{ $('Gmail Trigger').json.id }}",
  "html": `
    <p>Olá {{ $json.nome }},</p>
    <p>Recebemos sua mensagem e entraremos em contato em breve!</p>
  `
}
```

## <ion-icon name="document-text-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Referências

- **[Gmail Trigger](../../integracoes/trigger-nodes/app-triggers/gmail-trigger)** - Triggers baseados em eventos do Gmail
- **[Code Node](../../integracoes/builtin-nodes/core-nodes/code)** - Processamento customizado de emails
- **[Database Nodes](../../integracoes/builtin-nodes/data-processing)** - Armazenamento de dados de email
- **[Error Handling](../../logica-e-dados/01-flow-logic/error-handling)** - Tratamento de erros em workflows

---

:::warning **Nota de Atenção**
Esta documentação está em processo de validação. Os exemplos práticos e configurações de nós apresentados precisam ser testados e validados em ambientes reais. A intenção é sempre fornecer práticas e exemplos que funcionem corretamente em produção. Se encontrar inconsistências ou problemas, por favor, reporte para que possamos melhorar a qualidade da documentação.
:::

> <ion-icon name="bulb-outline" style={{ fontSize: '18px', color: '#ea4b71' }}></ion-icon> **Dica**: Use a integração Gmail para criar workflows de comunicação automatizados que melhoram a experiência do cliente e aumentam a eficiência da sua equipe. Lembre-se de sempre testar seus templates de email antes de usar em produção.
