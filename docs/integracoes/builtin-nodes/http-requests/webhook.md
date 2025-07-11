---
title: Node Webhook
description: Aprenda a usar o node Webhook no n8n para receber dados de aplicações e serviços externos
sidebar_position: 2
keywords: [n8n, webhook, trigger, receber dados, api endpoint]
---

# <ion-icon name="link-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Node Webhook

Use o node **Webhook** para criar [webhooks](https://pt.wikipedia.org/wiki/Webhook){:target="_blank" .external-link}, que podem receber dados de aplicações e serviços quando um evento ocorre. É um node trigger, o que significa que pode iniciar um workflow do n8n. Isso permite que serviços se conectem ao n8n e executem um workflow.

Você pode usar o node Webhook como um trigger para um workflow quando quiser receber dados e executar um workflow baseado nesses dados. O node Webhook também suporta retornar os dados gerados no final de um workflow. Isso o torna útil para construir um workflow que processa dados e retorna os resultados, como um endpoint de API.

O webhook permite que você dispare workflows de serviços que não têm um node trigger de aplicação dedicado.

## Quando usar o Webhook

O node Webhook é ideal para:

- **Receber notificações**: Webhooks de sistemas externos (GitHub, Slack, etc.)
- **Criar APIs**: Transformar workflows em endpoints de API
- **Integração bidirecional**: Permitir que sistemas externos chamem seus workflows
- **Automação baseada em eventos**: Executar workflows quando algo acontece em outro sistema

## URLs do Webhook

O node Webhook tem duas **URLs de Webhook**: teste e produção. O n8n exibe as URLs no topo do painel do node.

Selecione **URL de Teste** ou **URL de Produção** para alternar qual URL o n8n exibe.

* **Teste**: O n8n registra um webhook de teste quando você seleciona **Ouvir Evento de Teste** ou **Executar workflow**, se o workflow não estiver ativo. Quando você chama a URL do webhook, o n8n exibe os dados no workflow.
* **Produção**: O n8n registra um webhook de produção quando você ativa o workflow. Ao usar a URL de produção, o n8n não exibe os dados no workflow. Você ainda pode visualizar dados do workflow para uma execução de produção: selecione a aba **Execuções** no workflow, depois selecione a execução do workflow que deseja visualizar.

## Parâmetros do Node

### Método HTTP

O node Webhook suporta os métodos [HTTP Request Methods](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods){:target="_blank" .external-link} padrão:

* **DELETE**: Remover recursos
* **GET**: Buscar dados
* **HEAD**: Obter apenas headers
* **PATCH**: Atualizar parcialmente
* **POST**: Enviar dados (mais comum para webhooks)
* **PUT**: Atualizar dados completos

/// note | Tamanho máximo do payload
O tamanho máximo do payload do webhook é 16MB.
Se você está hospedando o n8n, pode alterar isso usando a [variável de ambiente](/hosting-n8n/configuracao/environment-variables.md) `N8N_PAYLOAD_SIZE_MAX`.
///

### Caminho (Path)

Por padrão, este campo contém um caminho de URL de webhook gerado aleatoriamente, para evitar conflitos com outros nodes de webhook.

Você pode especificar manualmente um caminho de URL, incluindo adicionar parâmetros de rota. Por exemplo, você pode precisar fazer isso se usar o n8n para prototipar uma API e quiser URLs de endpoint consistentes.

O campo **Caminho** pode usar os seguintes formatos:

* `/:variavel`
* `/caminho/:variavel`
* `/:variavel/caminho`
* `/:variavel1/caminho/:variavel2`
* `/:variavel1/:variavel2`

**Exemplos práticos:**
```
/webhook/notificacao
/api/usuarios/:id
/webhook/:tipo/:acao
```

### Métodos de autenticação suportados

Você pode exigir autenticação para qualquer serviço que chame sua URL de webhook. Escolha entre estes métodos de autenticação:

* **Basic auth**: Autenticação básica (usuário/senha)
* **Header auth**: Autenticação via headers
* **JWT auth**: Autenticação via JWT (JSON Web Token)
* **None**: Sem autenticação

Consulte [Credenciais Webhook](/integracoes/credential-nodes/webhook.md) para mais informações sobre como configurar cada tipo de credencial.

### Responder

* **Imediatamente**: O node Webhook retorna o código de resposta e a mensagem **Workflow foi iniciado**.
* **Quando o Último Node Terminar**: O node Webhook retorna o código de resposta e os dados de saída do último node executado no workflow.
* **Usando Node 'Responder ao Webhook'**: O node Webhook responde conforme definido no node [Responder ao Webhook](/integracoes/builtin-nodes/core-nodes/respond-to-webhook.md).

### Código de Resposta

Personalize o [código de resposta HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status){:target="_blank" .external-link} que o node Webhook retorna após execução bem-sucedida. Selecione entre códigos de resposta comuns ou crie um código customizado.

**Códigos comuns:**
- **200 OK**: Sucesso (padrão)
- **201 Created**: Recurso criado
- **202 Accepted**: Requisição aceita para processamento
- **204 No Content**: Sucesso sem conteúdo

### Dados de Resposta

Escolha quais dados incluir no body da resposta:

* **Todas as Entradas**: O Webhook retorna todas as entradas do último node em um array.
* **Primeira Entrada JSON**: O Webhook retorna os dados JSON da primeira entrada do último node em um objeto JSON.
* **Primeira Entrada Binária**: O Webhook retorna os dados binários da primeira entrada do último node em um arquivo binário.
* **Sem Body de Resposta**: O Webhook retorna sem um body.

Aplica-se apenas a **Responder > Quando o Último Node Terminar**.

## Opções do Node

Selecione **Adicionar Opção** para visualizar mais opções de configuração. As opções disponíveis dependem dos parâmetros do seu node.

### Origens Permitidas (CORS)

Configure os domínios de origem cruzada permitidos. Digite uma lista separada por vírgulas de URLs permitidas para requisições de origem cruzada não-preflight. Use `*` (padrão) para permitir todas as origens.

**Exemplo:**
```
https://meuapp.com,https://admin.meuapp.com
```

### Propriedade Binária

Ativar esta configuração permite que o node Webhook receba dados binários, como uma imagem ou arquivo de áudio. Digite o nome da propriedade binária para escrever os dados do arquivo recebido.

### Ignorar Bots

Ignorar requisições de bots como visualizadores de link e web crawlers.

### Lista Branca de IP(s)

Ative isso para limitar quem (ou o quê) pode invocar uma URL de trigger de Webhook. Digite uma lista separada por vírgulas de endereços IP permitidos. O acesso de endereços IP fora da lista branca gera um erro 403. Se deixado em branco, todos os endereços IP podem invocar a URL de trigger do webhook.

**Exemplo:**
```
192.168.1.100,10.0.0.50,203.0.113.0/24
```

### Sem Body de Resposta

Ative isso para impedir que o n8n envie um body com a resposta.

### Body Bruto

Especifique que o node Webhook receberá dados em um formato bruto, como JSON ou XML.

### Tipo de Conteúdo da Resposta

Escolha o formato para o body do webhook.

### Dados de Resposta

Envie dados customizados com a resposta.

### Headers de Resposta

Envie headers extras na resposta do Webhook. Consulte [MDN Web Docs | Response header](https://developer.mozilla.org/pt-BR/docs/Glossary/Response_header){:target="_blank" .external-link} para aprender mais sobre headers de resposta.

### Nome da Propriedade

Por padrão, o n8n retorna todos os dados disponíveis. Você pode escolher retornar uma chave JSON específica, para que o n8n retorne o valor.

## Exemplos Práticos

### Exemplo 1: Webhook simples para receber notificações

**Configuração:**
- **Método HTTP**: POST
- **Caminho**: `/webhook/notificacao`
- **Responder**: Imediatamente
- **Código de Resposta**: 200

**Dados recebidos:**
```json
{
  "evento": "novo_usuario",
  "usuario": {
    "id": 123,
    "nome": "João Silva",
    "email": "joao@exemplo.com"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Exemplo 2: API endpoint para consultar dados

**Configuração:**
- **Método HTTP**: GET
- **Caminho**: `/api/usuarios/:id`
- **Responder**: Quando o Último Node Terminar
- **Dados de Resposta**: Primeira Entrada JSON

**URL de exemplo:**
```
https://seu-n8n.com/webhook/api/usuarios/123
```

**Resposta esperada:**
```json
{
  "id": 123,
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "ativo": true
}
```

### Exemplo 3: Webhook com autenticação

**Configuração:**
- **Método HTTP**: POST
- **Caminho**: `/webhook/seguro`
- **Autenticação**: Header auth
- **Header**: `X-API-Key`

**Requisição com autenticação:**
```bash
curl -X POST \
  https://seu-n8n.com/webhook/seguro \
  -H "X-API-Key: sua-chave-secreta" \
  -H "Content-Type: application/json" \
  -d '{"dados": "exemplo"}'
```

## Casos de Uso Comuns

### 1. Integração com GitHub

Receber notificações quando:
- Um pull request é criado
- Um commit é feito
- Uma issue é aberta

**Configuração:**
- **Método**: POST
- **Caminho**: `/webhook/github`
- **Autenticação**: Header auth (X-Hub-Signature-256)

### 2. Webhook de Pagamento

Receber confirmações de pagamento de gateways como:
- PagSeguro
- Mercado Pago
- PayPal

**Configuração:**
- **Método**: POST
- **Caminho**: `/webhook/pagamento/:gateway`
- **Responder**: Imediatamente

### 3. API para Consultas

Transformar workflows em endpoints de API para:
- Consultar dados de clientes
- Calcular preços
- Validar informações

**Configuração:**
- **Método**: GET/POST
- **Caminho**: `/api/:recurso/:acao`
- **Responder**: Quando o Último Node Terminar

## Troubleshooting

### Problemas Comuns

#### Webhook não está sendo chamado
- Verifique se o workflow está ativo
- Confirme se está usando a URL correta (teste vs produção)
- Verifique se não há firewall bloqueando a requisição

#### Erro 403 - Proibido
- Verifique a configuração de autenticação
- Confirme se o IP está na lista branca (se configurada)
- Verifique se as credenciais estão corretas

#### Erro 404 - Não Encontrado
- Confirme se o caminho está correto
- Verifique se o webhook está registrado
- Teste com a URL de teste primeiro

#### Payload muito grande
- O limite é 16MB por padrão
- Considere comprimir os dados
- Use streaming para arquivos grandes

### Dicas de Debug

1. **Use a URL de teste** para ver os dados recebidos
2. **Configure "Responder: Imediatamente"** para testes rápidos
3. **Use o node Debug Helper** para inspecionar os dados
4. **Teste com Postman** ou curl antes de integrar

## Segurança

### Boas Práticas

1. **Sempre use autenticação** para webhooks de produção
2. **Configure lista branca de IPs** quando possível
3. **Valide os dados recebidos** antes de processar
4. **Use HTTPS** para todas as URLs de produção
5. **Monitore as chamadas** para detectar uso indevido

### Validação de Dados

```javascript
// Exemplo de validação básica
if (!$json.evento || !$json.timestamp) {
  throw new Error('Dados obrigatórios não fornecidos');
}

// Validar formato de timestamp
const timestamp = new Date($json.timestamp);
if (isNaN(timestamp.getTime())) {
  throw new Error('Timestamp inválido');
}
```

## Próximos Passos

- [Node HTTP Request](/integracoes/builtin-nodes/http-requests/http-request.md) - Para fazer requisições HTTP
- [Node Responder ao Webhook](/integracoes/builtin-nodes/core-nodes/respond-to-webhook.md) - Para respostas customizadas
- [Credenciais Webhook](/integracoes/credential-nodes/webhook.md) - Configurar autenticação
- [Expressões n8n](/logica-e-dados/expressoes.md) - Usar dados dinâmicos
- [Tratamento de Erros](/logica-e-dados/flow-logic/error-handling.md) - Lidar com falhas
