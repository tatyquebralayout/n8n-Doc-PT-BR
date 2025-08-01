# <ion-icon name="chatbubbles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Integração WhatsApp

A integração WhatsApp permite automatizar comunicações através da API oficial do WhatsApp Business, enviando mensagens, recebendo notificações e gerenciando conversas de forma programática.

## O que você encontrará aqui

Esta documentação abrange:

- **Configuração da API**: Como configurar o WhatsApp Business API
- **Envio de mensagens**: Diferentes tipos de mensagens suportadas
- **Recebimento de mensagens**: Webhooks e notificações
- **Automações comuns**: Workflows típicos de WhatsApp
- **Conformidade**: Regras e boas práticas

## Conceitos Fundamentais

### WhatsApp Business API

A API oficial do WhatsApp Business permite:

- **Envio de mensagens**: Texto, mídia, documentos
- **Recebimento de mensagens**: Webhooks em tempo real
- **Gestão de conversas**: Status e histórico
- **Automação**: Integração com sistemas

### Tipos de Mensagens

1. **Mensagens de Texto**: Conteúdo textual simples
2. **Mensagens de Mídia**: Imagens, áudios, vídeos
3. **Mensagens de Documento**: PDFs, planilhas
4. **Mensagens de Localização**: Coordenadas geográficas
5. **Mensagens de Contato**: Compartilhar contatos

## Configuração Básica

### Pré-requisitos

1. **Conta WhatsApp Business**: Aprovada pelo WhatsApp
2. **Número de Telefone**: Verificado e ativo
3. **Token de Acesso**: Gerado na plataforma Meta
4. **Webhook URL**: Endpoint para receber notificações

### Configuração de Credenciais

```json
{
  "accessToken": "seu_token_aqui",
  "phoneNumberId": "seu_phone_number_id",
  "businessAccountId": "seu_business_account_id",
  "webhookVerifyToken": "token_verificacao_webhook"
}
```

## Casos de Uso Comuns

### 1. Notificações Automáticas

```mermaid
graph LR
    A[Evento do Sistema] --> B[Verificar Regras]
    B --> C[Enviar WhatsApp]
    C --> D[Registrar Envio]
    D --> E[Monitorar Entrega]
```

### 2. Atendimento ao Cliente

```mermaid
graph LR
    A[Mensagem Recebida] --> B[Classificar Intenção]
    B --> C{Urgente?}
    C -->|Sim| D[Encaminhar Humano]
    C -->|Não| E[Resposta Automática]
```

### 3. Campanhas de Marketing

```mermaid
graph LR
    A[Lista de Contatos] --> B[Enviar Mensagem]
    B --> C[Monitorar Respostas]
    C --> D[Atualizar Status]
    D --> E[Gerar Relatório]
```

## Workflows Práticos

### Workflow: Confirmação de Pedido

1. **Trigger**: Novo pedido no sistema
2. **Validação**: Verificar dados do cliente
3. **Envio**: WhatsApp com confirmação
4. **Acompanhamento**: Status de entrega
5. **Feedback**: Solicitar avaliação

### Workflow: Suporte ao Cliente

1. **Recebimento**: Mensagem do cliente
2. **Análise**: Classificar tipo de suporte
3. **Roteamento**: Direcionar para setor correto
4. **Resposta**: Enviar solução ou agendamento
5. **Follow-up**: Acompanhar resolução

## Configuração de Webhooks

### Endpoint de Recebimento

```javascript
// Exemplo de webhook para receber mensagens
{
  "method": "POST",
  "url": "https://seu-dominio.com/webhook/whatsapp",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "object": "whatsapp_business_account",
    "entry": [
      {
        "id": "phone_number_id",
        "changes": [
          {
            "value": {
              "messaging_product": "whatsapp",
              "messages": [...]
            }
          }
        ]
      }
    ]
  }
}
```

## Boas Práticas

### Conformidade

- **Horário de Envio**: Respeitar horário comercial
- **Consentimento**: Obter permissão do cliente
- **Opt-out**: Permitir cancelamento fácil
- **Conteúdo**: Evitar spam e conteúdo inadequado

### Performance

- **Rate Limiting**: Respeitar limites da API
- **Retry Logic**: Implementar retry em caso de falha
- **Monitoramento**: Acompanhar métricas de entrega
- **Logs**: Registrar todas as interações

## Próximos Passos

- [Automação de Email](/integracoes-br/marketing/email-automation) - Campanhas multicanal
- [Integração CRM](/integracoes-br/financeiro/crm-integration) - Gestão de clientes
- [Análise de Sentimento](/advanced-ai/nodes-ia/sentiment-analysis) - Análise de feedback
- [Webhooks](/integracoes/webhooks) - Eventos em tempo real

## Recursos Relacionados

- [HTTP Request](/integracoes/builtin-nodes/http-requests/http-request) - Fazer chamadas para APIs
- [Webhook Trigger](/integracoes/trigger-nodes/event-based/webhook-trigger) - Receber notificações
- [Expressões n8n](/logica-e-dados/expressoes) - Processar dados dinamicamente
- [Tratamento de Erros](/logica-e-dados/flow-logic/error-handling) - Lidar com falhas 