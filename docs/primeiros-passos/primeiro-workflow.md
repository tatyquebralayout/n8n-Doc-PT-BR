---
sidebar_position: 3
title: Primeiro Workflow
description: Crie seu primeiro workflow em 5 minutos
keywords: [n8n, primeiro workflow, tutorial, webhook, http request]
---

#  Seu Primeiro Workflow

Vamos criar um workflow simples que recebe dados via webhook e os envia para uma API externa. Este tutorial levará apenas **5 minutos**!

##  O que vamos construir

Um workflow que:
1.  **Recebe** dados via webhook
2.  **Transforma** os dados
3.  **Envia** para uma API externa
4.  **Retorna** uma resposta

##  Pré-requisitos

-  n8n instalado e rodando
-  Acesso ao editor visual
-  Conhecimento básico dos [conceitos](./conceitos-basicos)

##  Passo a Passo

###  1. Criar Novo Workflow

1.  Acesse o n8n em `http://localhost:5678`
2.  Clique em **"Add Workflow"**
3.  Nomeie como **"Meu Primeiro Workflow"**

###  2. Adicionar Webhook Trigger

####  Adicionar o Node
1.  Clique em **"Add first step"**
2.  Busque por **"Webhook"**
3.  Selecione **"Webhook"** da lista

####  Configurar o Webhook
```javascript
// Configurações básicas
HTTP Method: POST
Path: meu-primeiro-webhook
Authentication: None
```

:::tip Dica
O n8n gerará automaticamente uma URL única para seu webhook. Algo como:
`http://localhost:5678/webhook/meu-primeiro-webhook`
:::

###  3. Adicionar Node de Transformação

####  Adicionar Set Node
1.  Clique no **"+"** após o Webhook
2.  Busque por **"Set"**
3.  Selecione **"Set"** para manipular dados

####  Configurar Transformação
```javascript
// Adicione estas transformações
Key: processedAt
Value: {{ new Date().toISOString() }}

Key: originalData
Value: {{ JSON.stringify($json) }}

Key: messageCount
Value: {{ Object.keys($json).length }}
```

###  4. Adicionar HTTP Request

####  Adicionar o Node
1.  Clique no **"+"** após o Set
2.  Busque por **"HTTP Request"**
3.  Selecione **"HTTP Request"**

####  Configurar Request
```javascript
// Configurações da requisição
Method: POST
URL: https://httpbin.org/post
Headers:
Content-Type: application/json

Body (JSON):
{
"original": {{ $json.originalData }},
"processed_at": "{{ $json.processedAt }}",
"count": {{ $json.messageCount }}
}
```

:::info HTTPBin
Usamos `httpbin.org` para teste. É um serviço que ecoa os dados recebidos, perfeito para testar workflows!
:::

###  5. Adicionar Resposta

####  Adicionar Respond to Webhook
1.  Clique no **"+"** após o HTTP Request
2.  Busque por **"Respond to Webhook"**
3.  Selecione o node

####  Configurar Resposta
```javascript
// Configuração da resposta
Response Code: 200
Response Body:
{
"status": "success",
"message": "Dados processados com sucesso!",
"processed_at": "{{ $json.processedAt }}",
"external_response": {{ JSON.stringify($json) }}
}
```

##  Testando o Workflow

###  1. Salvar e Ativar
1.  Clique em **"Save"** (Ctrl+S)
2.  Clique na **toggle** para ativar o workflow
3.  Anote a URL do webhook gerada

###  2. Testar com cURL
```bash
# Teste básico
curl -X POST \
http://localhost:5678/webhook/meu-primeiro-webhook \
-H "Content-Type: application/json" \
-d '{
"nome": "João Silva",
"email": "joao@exemplo.com",
"idade": 30
}'
```

###  3. Verificar Resultado
Você deve receber uma resposta similar a:
```json
{
"status": "success",
"message": "Dados processados com sucesso!",
"processed_at": "2025-01-15T10:30:00.000Z",
"external_response": {
"json": {
"original": "{\"nome\":\"João Silva\",\"email\":\"joao@exemplo.com\",\"idade\":30}",
"processed_at": "2025-01-15T10:30:00.000Z",
"count": 3
}
}
}
```

##  Visualizar Execuções

###  Acessar o Log
1.  Na interface do n8n, vá para **"Executions"**
2.  Clique na execução mais recente
3.  Visualize os dados em cada node

###  Debug de Dados
-  **Node Webhook**: Dados originais recebidos
-  **Node Set**: Dados transformados
-  **Node HTTP Request**: Resposta da API externa
-  **Node Respond**: Resposta final enviada

##  Melhorias Possíveis

###  1. Validação de Dados
```javascript
// No node Set, adicione validação
Key: isValid
Value: {{ $json.nome && $json.email ? 'valid' : 'invalid' }}
```

###  2. Tratamento de Erro
1.  Adicione um node **"IF"** após o Set
2.  Configure condição: `{{ $json.isValid === 'valid' }}`
3.  Roteie dados inválidos para tratamento diferente

###  3. Logging
```javascript
// Adicione log detalhado
Key: logEntry
Value: {{ `Processado: ${$json.nome} em ${new Date().toLocaleString('pt-BR')}` }}
```

##  Integrações Reais

###  APIs Populares
-  **Slack**: Enviar notificações
-  **Google Sheets**: Salvar dados
-  **Email**: Enviar confirmações
-  **Database**: Persistir informações

###  Exemplos de URLs
```javascript
// Slack Webhook
https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

// Discord Webhook 
https://discord.com/api/webhooks/YOUR/DISCORD/WEBHOOK

// Teams Webhook
https://outlook.office.com/webhook/YOUR/TEAMS/WEBHOOK
```

##  Checklist de Sucesso

-  Workflow criado e nomeado
-  Webhook configurado e ativo
-  Dados sendo transformados corretamente
-  Requisição externa funcionando
-  Resposta sendo retornada
-  Execuções aparecendo no log
-  Teste com dados reais realizado

##  Próximos Passos

Parabéns! Você criou seu primeiro workflow. Agora explore:

1.  **[Diferentes tipos de triggers](../integracoes/trigger-nodes/time-based/manual-trigger)**
2.  **[Mais integrações](../integracoes/index)**
3.  **[Expressões avançadas](../logica-e-dados/02-data/data-mapping)**
4.  **[Deploy em produção](../hosting-n8n/instalacao)**

:::success Sucesso!
Você acabou de criar um workflow funcional que pode receber, processar e responder dados automaticamente. Este é o primeiro passo para automações mais complexas!
:::

---

**Anterior:** [Conceitos Básicos](./conceitos-basicos) ← | → **Próximo:** [Integrações](../integracoes/webhooks) 
