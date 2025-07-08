---
sidebar_position: 2
title: HTTP Request
description: Fazer chamadas HTTP para APIs e serviços externos
keywords: [n8n, http, request, api, rest, webhook]
---

# <IonicIcon name="cloud-outline" size={32} color="#ea4b71" /> HTTP Request Node

O **HTTP Request Node** permite fazer **chamadas HTTP** para qualquer API ou serviço web. É o node mais versátil para integrar com sistemas externos que não possuem nodes dedicados.

## <IonicIcon name="bulb-outline" size={24} color="#ea4b71" /> **Conceito Principal**

**HTTP Request = "Fazer Chamada para API"**

Este node é uma **AÇÃO** que:
- <IonicIcon name="send-outline" size={16} color="#6b7280" /> **Envia** requisições HTTP (GET, POST, PUT, DELETE)
- <IonicIcon name="download-outline" size={16} color="#6b7280" /> **Recebe** respostas de APIs
- <IonicIcon name="shield-checkmark-outline" size={16} color="#6b7280" /> **Autentica** com diferentes métodos
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Processa** dados de entrada e saída

> **<IonicIcon name="information-circle-outline" size={16} color="#ea4b71" /> Diferença do Webhook:** HTTP Request FAZ chamadas. Webhook RECEBE chamadas.

## <IonicIcon name="settings-outline" size={24} color="#ea4b71" /> **Configurações Principais**

### <IonicIcon name="arrow-forward-outline" size={20} color="#10b981" /> **1. Request Method**
```
GET - Buscar dados (não modifica)
POST - Criar novos dados
PUT - Atualizar dados completos
PATCH - Atualizar dados parciais
DELETE - Remover dados
```

### <IonicIcon name="globe-outline" size={20} color="#10b981" /> **2. URL**
```
https://api.exemplo.com/v1/usuarios
https://jsonplaceholder.typicode.com/posts
https://api.github.com/users/{{$json.username}}
```

### <IonicIcon name="key-outline" size={20} color="#10b981" /> **3. Authentication**
- <IonicIcon name="close-outline" size={16} color="#6b7280" /> **None** - Sem autenticação
- <IonicIcon name="person-outline" size={16} color="#6b7280" /> **Basic Auth** - Usuário/senha
- <IonicIcon name="document-outline" size={16} color="#6b7280" /> **Header Auth** - Token no cabeçalho
- <IonicIcon name="shield-outline" size={16} color="#6b7280" /> **OAuth2** - Fluxo OAuth completo
- <IonicIcon name="code-outline" size={16} color="#6b7280" /> **Custom** - Autenticação personalizada

### <IonicIcon name="list-outline" size={20} color="#10b981" /> **4. Headers**
```
Content-Type: application/json
Authorization: Bearer {{$json.token}}
User-Agent: n8n-workflow/1.0
```

## **Exemplos Práticos**

### **Exemplo 1: Consultar CEP (ViaCEP)**

**Configuração:**
```
Method: GET
URL: https://viacep.com.br/ws/{{$json.cep}}/json/
```

**Entrada:**
```json
{
"cep": "01310-100"
}
```

**Saída:**
```json
{
"cep": "01310-100",
"logradouro": "Avenida Paulista",
"complemento": "",
"bairro": "Bela Vista", 
"localidade": "São Paulo",
"uf": "SP",
"ibge": "3550308",
"gia": "1004",
"ddd": "11",
"siafi": "7107"
}
```

---

### **Exemplo 2: Criar Usuário em API**

**Configuração:**
```
Method: POST
URL: https://jsonplaceholder.typicode.com/users
Headers:
Content-Type: application/json
```

**Body (JSON):**
```json
{
"name": "{{$json.nome}}",
"email": "{{$json.email}}",
"username": "{{$json.nome.toLowerCase().replace(' ', '_')}}",
"address": {
"street": "{{$json.endereco}}",
"city": "{{$json.cidade}}"
}
}
```

**Entrada:**
```json
{
"nome": "João Silva",
"email": "joao@email.com",
"endereco": "Rua das Flores, 123",
"cidade": "São Paulo"
}
```

---

### **Exemplo 3: Atualizar Status no Slack**

**Configuração:**
```
Method: POST
URL: https://slack.com/api/users.profile.set
Headers:
Authorization: Bearer {{$credentials.slackApi.token}}
Content-Type: application/json
```

**Body:**
```json
{
"profile": {
"status_text": "{{$json.status}}",
"status_emoji": "{{$json.emoji}}"
}
}
```

## **Autenticação**

### **1. API Key no Header**
```
Header: X-API-Key
Value: sua-chave-api-aqui
```

### **2. Bearer Token**
```
Header: Authorization 
Value: Bearer {{$json.access_token}}
```

### **3. Basic Auth**
```
Username: seu-usuario
Password: sua-senha
```

### **4. OAuth2**
```
Grant Type: Authorization Code
Auth URL: https://api.exemplo.com/oauth/authorize
Access Token URL: https://api.exemplo.com/oauth/token
Client ID: {{$credentials.oauth.clientId}}
Client Secret: {{$credentials.oauth.clientSecret}}
```

## **Processamento de Dados**

### **Query Parameters**
```
URL: https://api.exemplo.com/search
Parameters:
q: {{$json.busca}}
limit: 10
offset: {{$json.page * 10}}
```

### **Form Data**
```
Content-Type: application/x-www-form-urlencoded

name={{$json.nome}}&email={{$json.email}}
```

### **Multipart (Upload de Arquivo)**
```
Content-Type: multipart/form-data

file: {{$binary.arquivo}}
description: {{$json.descricao}}
```

## **Tratamento de Respostas**

### **Status Codes**
```javascript
// Verificar sucesso
if ($response.statusCode >= 200 && $response.statusCode < 300) {
// Sucesso
} else {
// Erro
}
```

### **Extrair Dados**
```javascript
// Response JSON
const dados = $response.body;
const usuario = dados.data;
const total = dados.meta.total;

// Response Headers
const rateLimit = $response.headers['x-ratelimit-remaining'];
const nextPage = $response.headers['link'];
```

### **Paginação**
```javascript
// Próxima página
const nextUrl = $response.body.pagination.next_url;
if (nextUrl) {
// Fazer próxima chamada
}
```

## **Tratamento de Erros**

### **Retry Logic**
```
Retry on Fail: 3 tentativas
Wait Between Tries: 1000ms (1 segundo)
```

### **Error Handling**
```javascript
// Capturar erro específico
try {
// Fazer requisição
} catch (error) {
if (error.httpCode === 429) {
// Rate limit - aguardar
await new Promise(resolve => setTimeout(resolve, 60000));
} else if (error.httpCode === 404) {
// Recurso não encontrado
return { found: false };
} else {
throw error;
}
}
```

## **APIs Brasileiras Populares**

### **ViaCEP**
```
GET https://viacep.com.br/ws/{cep}/json/
```

### **CNPJ (ReceitaWS)**
```
GET https://receitaws.com.br/v1/cnpj/{{$json.cnpj}}
```

### **Banco Central (PIX)**
```
POST https://api.bcb.gov.br/pix/v1/cobv/
Headers: Authorization: Bearer {{$json.token}}
```

### **Correios (Rastreamento)**
```
GET https://api.correios.com.br/sro/v1/objetos/{{$json.codigo}}
```

## **Dicas de Performance**

### **1. Reutilizar Conexões**
```
Keep Alive: true
Connection: keep-alive
```

### **2. Timeout Adequado**
```
Timeout: 30000ms (30 segundos)
```

### **3. Compression**
```
Accept-Encoding: gzip, deflate
```

### **4. Rate Limiting**
```javascript
// Aguardar entre requests
await new Promise(resolve => setTimeout(resolve, 100));
```

## **Debugging**

### **1. Log Completo**
```javascript
console.log('Request:', {
method: 'POST',
url: 'https://api.exemplo.com/dados',
headers: $request.headers,
body: $request.body
});

console.log('Response:', {
status: $response.statusCode,
headers: $response.headers,
body: $response.body
});
```

### **2. Webhook.site**
Use para testar payloads:
```
URL: https://webhook.site/seu-uuid
```

### **3. Postman/Insomnia**
Teste a API primeiro antes de usar no n8n.

## **Casos de Uso Comuns**

### **1. Integração CRM**
```
POST /api/leads
Criar leads de formulários
```

### **2. Notificações**
```
POST /api/notifications 
Enviar alertas personalizados
```

### **3. Sincronização de Dados**
```
GET /api/customers
PUT /api/customers/{{id}}
Manter dados atualizados
```

### **4. Webhooks Personalizados**
```
POST https://meu-sistema.com/webhook
Notificar sistemas internos
```

## **Próximos Passos**

1. **[Webhook Node](./webhook)** - Para receber chamadas HTTP
2. **[Set Node](../data-processing/set)** - Para manipular dados
3. **[Manual Trigger](../../trigger-nodes/time-based/manual-trigger)** - Para testes manuais

---

** HTTP Request = Sua ponte para qualquer API do mundo!** 
