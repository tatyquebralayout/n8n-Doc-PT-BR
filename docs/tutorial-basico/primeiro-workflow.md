---
sidebar_position: 3
title: Primeiro Workflow
description: Crie seu primeiro workflow em 5 minutos
keywords: [n8n, primeiro workflow, tutorial, webhook, http request]
---

# <IonicIcon name="rocket-outline" size={32} color="#ea4b71" /> Seu Primeiro Workflow

Vamos criar um workflow simples que recebe dados via webhook e os envia para uma API externa. Este tutorial levará apenas **5 minutos**!

## <IonicIcon name="construct-outline" size={24} color="#ea4b71" /> O que vamos construir

Um workflow que:
1. <IonicIcon name="enter-outline" size={16} color="#6b7280" /> **Recebe** dados via webhook
2. <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Transforma** os dados
3. <IonicIcon name="send-outline" size={16} color="#6b7280" /> **Envia** para uma API externa
4. <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Retorna** uma resposta

## <IonicIcon name="checkbox-outline" size={24} color="#ea4b71" /> Pré-requisitos

- <IonicIcon name="download-outline" size={16} color="#6b7280" /> n8n instalado e rodando
- <IonicIcon name="create-outline" size={16} color="#6b7280" /> Acesso ao editor visual
- <IonicIcon name="bulb-outline" size={16} color="#6b7280" /> Conhecimento básico dos [conceitos](./conceitos-basicos)

## <IonicIcon name="list-outline" size={24} color="#ea4b71" /> Passo a Passo

### <IonicIcon name="add-outline" size={20} color="#10b981" /> 1. Criar Novo Workflow

1. <IonicIcon name="globe-outline" size={16} color="#6b7280" /> Acesse o n8n em `http://localhost:5678`
2. <IonicIcon name="add-circle-outline" size={16} color="#6b7280" /> Clique em **"Add Workflow"**
3. <IonicIcon name="create-outline" size={16} color="#6b7280" /> Nomeie como **"Meu Primeiro Workflow"**

### <IonicIcon name="flash-outline" size={20} color="#10b981" /> 2. Adicionar Webhook Trigger

#### <IonicIcon name="add-outline" size={18} color="#10b981" /> Adicionar o Node
1. <IonicIcon name="add-circle-outline" size={16} color="#6b7280" /> Clique em **"Add first step"**
2. <IonicIcon name="search-outline" size={16} color="#6b7280" /> Busque por **"Webhook"**
3. <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> Selecione **"Webhook"** da lista

#### <IonicIcon name="settings-outline" size={18} color="#10b981" /> Configurar o Webhook
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

### <IonicIcon name="construct-outline" size={20} color="#10b981" /> 3. Adicionar Node de Transformação

#### <IonicIcon name="add-outline" size={18} color="#10b981" /> Adicionar Set Node
1. <IonicIcon name="add-circle-outline" size={16} color="#6b7280" /> Clique no **"+"** após o Webhook
2. <IonicIcon name="search-outline" size={16} color="#6b7280" /> Busque por **"Set"**
3. <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> Selecione **"Set"** para manipular dados

#### <IonicIcon name="settings-outline" size={18} color="#10b981" /> Configurar Transformação
```javascript
// Adicione estas transformações
Key: processedAt
Value: {{ new Date().toISOString() }}

Key: originalData
Value: {{ JSON.stringify($json) }}

Key: messageCount
Value: {{ Object.keys($json).length }}
```

### <IonicIcon name="cloud-outline" size={20} color="#10b981" /> 4. Adicionar HTTP Request

#### <IonicIcon name="add-outline" size={18} color="#10b981" /> Adicionar o Node
1. <IonicIcon name="add-circle-outline" size={16} color="#6b7280" /> Clique no **"+"** após o Set
2. <IonicIcon name="search-outline" size={16} color="#6b7280" /> Busque por **"HTTP Request"**
3. <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> Selecione **"HTTP Request"**

#### <IonicIcon name="settings-outline" size={18} color="#10b981" /> Configurar Request
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

### <IonicIcon name="chatbubble-outline" size={20} color="#10b981" /> 5. Adicionar Resposta

#### <IonicIcon name="add-outline" size={18} color="#10b981" /> Adicionar Respond to Webhook
1. <IonicIcon name="add-circle-outline" size={16} color="#6b7280" /> Clique no **"+"** após o HTTP Request
2. <IonicIcon name="search-outline" size={16} color="#6b7280" /> Busque por **"Respond to Webhook"**
3. <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> Selecione o node

#### <IonicIcon name="settings-outline" size={18} color="#10b981" /> Configurar Resposta
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

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> Testando o Workflow

### <IonicIcon name="save-outline" size={20} color="#10b981" /> 1. Salvar e Ativar
1. <IonicIcon name="save-outline" size={16} color="#6b7280" /> Clique em **"Save"** (Ctrl+S)
2. <IonicIcon name="power-outline" size={16} color="#6b7280" /> Clique na **toggle** para ativar o workflow
3. <IonicIcon name="copy-outline" size={16} color="#6b7280" /> Anote a URL do webhook gerada

### <IonicIcon name="terminal-outline" size={20} color="#10b981" /> 2. Testar com cURL
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

### <IonicIcon name="eye-outline" size={20} color="#10b981" /> 3. Verificar Resultado
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

## <IonicIcon name="analytics-outline" size={24} color="#ea4b71" /> Visualizar Execuções

### <IonicIcon name="list-outline" size={20} color="#10b981" /> Acessar o Log
1. <IonicIcon name="desktop-outline" size={16} color="#6b7280" /> Na interface do n8n, vá para **"Executions"**
2. <IonicIcon name="play-circle-outline" size={16} color="#6b7280" /> Clique na execução mais recente
3. <IonicIcon name="eye-outline" size={16} color="#6b7280" /> Visualize os dados em cada node

### <IonicIcon name="bug-outline" size={20} color="#10b981" /> Debug de Dados
- <IonicIcon name="flash-outline" size={16} color="#6b7280" /> **Node Webhook**: Dados originais recebidos
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Node Set**: Dados transformados
- <IonicIcon name="cloud-outline" size={16} color="#6b7280" /> **Node HTTP Request**: Resposta da API externa
- <IonicIcon name="chatbubble-outline" size={16} color="#6b7280" /> **Node Respond**: Resposta final enviada

## <IonicIcon name="trending-up-outline" size={24} color="#ea4b71" /> Melhorias Possíveis

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> 1. Validação de Dados
```javascript
// No node Set, adicione validação
Key: isValid
Value: {{ $json.nome && $json.email ? 'valid' : 'invalid' }}
```

### <IonicIcon name="alert-circle-outline" size={20} color="#10b981" /> 2. Tratamento de Erro
1. <IonicIcon name="add-circle-outline" size={16} color="#6b7280" /> Adicione um node **"IF"** após o Set
2. <IonicIcon name="settings-outline" size={16} color="#6b7280" /> Configure condição: `{{ $json.isValid === 'valid' }}`
3. <IonicIcon name="git-branch-outline" size={16} color="#6b7280" /> Roteie dados inválidos para tratamento diferente

### <IonicIcon name="document-text-outline" size={20} color="#10b981" /> 3. Logging
```javascript
// Adicione log detalhado
Key: logEntry
Value: {{ `Processado: ${$json.nome} em ${new Date().toLocaleString('pt-BR')}` }}
```

## <IonicIcon name="link-outline" size={24} color="#ea4b71" /> Integrações Reais

### <IonicIcon name="apps-outline" size={20} color="#10b981" /> APIs Populares
- <IonicIcon name="logo-slack" size={16} color="#6b7280" /> **Slack**: Enviar notificações
- <IonicIcon name="grid-outline" size={16} color="#6b7280" /> **Google Sheets**: Salvar dados
- <IonicIcon name="mail-outline" size={16} color="#6b7280" /> **Email**: Enviar confirmações
- <IonicIcon name="server-outline" size={16} color="#6b7280" /> **Database**: Persistir informações

### <IonicIcon name="code-outline" size={20} color="#10b981" /> Exemplos de URLs
```javascript
// Slack Webhook
https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

// Discord Webhook 
https://discord.com/api/webhooks/YOUR/DISCORD/WEBHOOK

// Teams Webhook
https://outlook.office.com/webhook/YOUR/TEAMS/WEBHOOK
```

## <IonicIcon name="checkbox-outline" size={24} color="#ea4b71" /> Checklist de Sucesso

- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Workflow criado e nomeado
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Webhook configurado e ativo
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Dados sendo transformados corretamente
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Requisição externa funcionando
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Resposta sendo retornada
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Execuções aparecendo no log
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Teste com dados reais realizado

## <IonicIcon name="arrow-forward-circle-outline" size={24} color="#ea4b71" /> Próximos Passos

Parabéns! Você criou seu primeiro workflow. Agora explore:

1. <IonicIcon name="flash-outline" size={16} color="#6b7280" /> **[Diferentes tipos de triggers](../workflows/triggers)**
2. <IonicIcon name="extension-puzzle-outline" size={16} color="#6b7280" /> **[Mais integrações](../integracoes/webhooks)**
3. <IonicIcon name="code-slash-outline" size={16} color="#6b7280" /> **[Expressões avançadas](../workflows/expressoes)**
4. <IonicIcon name="rocket-outline" size={16} color="#6b7280" /> **[Deploy em produção](../deployment/docker/introducao)**

:::success Sucesso!
Você acabou de criar um workflow funcional que pode receber, processar e responder dados automaticamente. Este é o primeiro passo para automações mais complexas!
:::

---

**Anterior:** [Conceitos Básicos](./conceitos-basicos) ← | → **Próximo:** [Integrações](../integracoes/webhooks) 