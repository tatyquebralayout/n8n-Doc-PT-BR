# Node Responder ao Webhook

O node **Respond to Webhook** permite enviar respostas customizadas para requisições webhook recebidas.

## Funcionalidades

### Resposta Customizada
- Defina o código de status HTTP
- Configure headers de resposta
- Envie dados estruturados

### Controle de Fluxo
- Responda baseado em condições
- Envie diferentes tipos de resposta
- Controle o timing da resposta

### Integração com Workflows
- Use dados de outros nodes
- Processe informações antes de responder
- Mantenha contexto entre execuções

## Configuração

### Parâmetros Básicos
- **Response Code**: Código de status HTTP (200, 201, 400, etc.)
- **Response Headers**: Headers customizados para a resposta
- **Response Body**: Conteúdo da resposta (JSON, XML, texto)

### Parâmetros Avançados
- **Response Mode**: Como processar a resposta
- **Options**: Configurações adicionais de resposta

## Casos de Uso

### APIs REST
- Crie endpoints customizados
- Retorne dados processados
- Implemente validações

### Webhooks de Terceiros
- Confirme recebimento de dados
- Retorne status de processamento
- Envie notificações

### Integração com Sistemas
- Resposta para sistemas externos
- Confirmação de operações
- Retorno de resultados

## Exemplos

### Resposta Simples
```json
{
  "status": "success",
  "message": "Dados processados com sucesso"
}
```

### Resposta com Dados
```json
{
  "status": "success",
  "data": {
    "id": "12345",
    "processed_at": "2024-01-01T10:00:00Z"
  }
}
```

## Integração

Este node é frequentemente usado em conjunto com o [node Webhook](/integracoes/builtin-nodes/http-requests/webhook) para criar APIs completas. 