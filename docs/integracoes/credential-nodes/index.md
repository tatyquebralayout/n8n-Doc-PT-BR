---
sidebar_position: 4
title: Credential Nodes
description: Autenticação e credenciais para integrações
keywords: [n8n, credential nodes, autenticação, credenciais, oauth]
---

# <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Credenciais

As **Credenciais** são informações de autenticação que permitem que o n8n se conecte com APIs e serviços externos de forma segura. Elas são essenciais para qualquer integração que requeira autenticação.

## O que são Credenciais?

Credenciais são dados sensíveis (como chaves de API, tokens, usuários e senhas) que são armazenados de forma segura no n8n e usados para autenticar com serviços externos.

### Tipos de Informações Armazenadas

- **Chaves de API**: Tokens de acesso para APIs
- **Usuários e senhas**: Credenciais básicas
- **Tokens OAuth**: Tokens de autenticação OAuth
- **Certificados**: Certificados SSL/TLS
- **Configurações**: URLs base, endpoints, etc.

## Tipos de Credenciais

### 1. Credenciais Predefinidas

Credenciais específicas para integrações suportadas pelo n8n:

- **Configuração otimizada** para cada serviço
- **Validação automática** de formato
- **Interface específica** para cada tipo
- **Documentação integrada** de configuração
- **Suporte oficial** disponível

**Exemplos:**
- Google Sheets
- Slack
- GitHub
- Salesforce
- WhatsApp Business API

### 2. Credenciais Genéricas

Credenciais para serviços não suportados oficialmente:

- **Flexibilidade total** de configuração
- **Múltiplos métodos** de autenticação
- **Configuração manual** de parâmetros
- **Suporte a APIs customizadas**
- **Adaptação a qualquer serviço**

**Métodos disponíveis:**
- Basic Auth
- Header Auth
- OAuth1
- OAuth2
- Custom Auth

## Métodos de Autenticação

### 1. API Key

Autenticação via chave de API no header:

```javascript
// Exemplo de configuração
Header: X-API-Key
Value: sua-chave-api-aqui
```

**Casos de uso:**
- APIs REST simples
- Serviços de terceiros
- APIs internas
- Webhooks seguros

### 2. Bearer Token

Autenticação via token no header Authorization:

```javascript
// Exemplo de configuração
Header: Authorization
Value: Bearer seu-token-aqui
```

**Casos de uso:**
- APIs OAuth2
- JWT tokens
- APIs modernas
- Serviços cloud

### 3. Basic Auth

Autenticação básica com usuário e senha:

```javascript
// Exemplo de configuração
Username: seu-usuario
Password: sua-senha
```

**Casos de uso:**
- APIs legadas
- Sistemas internos
- FTP/SFTP
- Bancos de dados

### 4. OAuth2

Fluxo OAuth2 completo:

```javascript
// Exemplo de configuração
Grant Type: Authorization Code
Auth URL: https://api.exemplo.com/oauth/authorize
Access Token URL: https://api.exemplo.com/oauth/token
Client ID: seu-client-id
Client Secret: seu-client-secret
```

**Casos de uso:**
- Google APIs
- Microsoft APIs
- Redes sociais
- APIs modernas

### 5. Custom Auth

Autenticação customizada:

```javascript
// Exemplo de configuração
Headers: {
  "X-Custom-Header": "valor-customizado",
  "Authorization": "Custom seu-token"
}
```

**Casos de uso:**
- APIs com autenticação única
- Sistemas proprietários
- Integrações customizadas
- APIs internas

## Como Configurar Credenciais

### 1. Acessar Gerenciador de Credenciais

1. **Clique no ícone de credenciais** no menu lateral
2. **Selecione "Add Credential"** para criar nova credencial
3. **Escolha o tipo** de credencial desejado
4. **Preencha os campos** necessários
5. **Teste a conexão** antes de salvar

### 2. Configurar Credenciais Predefinidas

Para serviços suportados:

1. **Selecione o serviço** na lista
2. **Siga as instruções** específicas do serviço
3. **Configure parâmetros** obrigatórios
4. **Teste a conexão**
5. **Salve a credencial**

### 3. Configurar Credenciais Genéricas

Para serviços não suportados:

1. **Escolha o método** de autenticação
2. **Configure parâmetros** específicos
3. **Defina headers** necessários
4. **Teste com a API**
5. **Valide a configuração**

### 4. Testar Credenciais

Sempre teste antes de usar:

1. **Use o botão "Test"** na configuração
2. **Verifique logs** de erro
3. **Confirme permissões** da API
4. **Valide formato** dos dados
5. **Teste com dados reais**

## Boas Práticas de Segurança

### 1. Armazenamento Seguro

- **Nunca compartilhe** credenciais em texto plano
- **Use variáveis de ambiente** quando possível
- **Rotacione credenciais** regularmente
- **Monitore uso** das credenciais
- **Implemente auditoria** de acesso

### 2. Controle de Acesso

- **Limite permissões** ao mínimo necessário
- **Use credenciais específicas** para cada ambiente
- **Implemente autenticação** de dois fatores
- **Monitore tentativas** de acesso
- **Configure alertas** para uso anômalo

### 3. Gerenciamento de Credenciais

- **Documente** todas as credenciais
- **Mantenha inventário** atualizado
- **Configure expiração** quando possível
- **Implemente backup** seguro
- **Treine equipe** em segurança

## Exemplos Práticos

### Exemplo 1: Configurar API do Google Sheets

**Tipo:** Google Sheets
**Método:** OAuth2

**Configuração:**
1. Criar projeto no Google Cloud Console
2. Habilitar Google Sheets API
3. Criar credenciais OAuth2
4. Configurar URLs de redirecionamento
5. Testar conexão

### Exemplo 2: Configurar API do Slack

**Tipo:** Slack
**Método:** Bearer Token

**Configuração:**
1. Criar app no Slack
2. Gerar token de bot
3. Configurar permissões
4. Adicionar token no n8n
5. Testar envio de mensagem

### Exemplo 3: Configurar API Customizada

**Tipo:** Generic API
**Método:** Header Auth

**Configuração:**
1. Obter chave de API do serviço
2. Configurar header de autenticação
3. Definir URL base da API
4. Testar endpoint de exemplo
5. Validar resposta

## Troubleshooting

### Problemas Comuns

#### Credencial não funciona
- Verifique se a credencial está correta
- Confirme se a API está acessível
- Teste com ferramentas externas (Postman)
- Verifique logs de erro
- Confirme permissões da API

#### Erro de autenticação
- Verifique formato da credencial
- Confirme se não expirou
- Valide permissões necessárias
- Teste com credencial de teste
- Consulte documentação da API

#### Token expirado
- Configure refresh token quando possível
- Implemente renovação automática
- Monitore expiração de tokens
- Configure alertas de expiração
- Mantenha backup de credenciais

#### Rate limiting
- Implemente delays entre requisições
- Use paginação quando disponível
- Configure retry com backoff
- Monitore limites da API
- Otimize uso de recursos

### Debug

1. **Use logs detalhados** para identificar problemas
2. **Teste credenciais** individualmente
3. **Verifique configuração** de rede
4. **Confirme formato** dos dados
5. **Monitore uso** de recursos

## Integração com Sistemas Brasileiros

### E-commerce
- **Nuvemshop**: API de pedidos e produtos
- **WooCommerce**: API de vendas
- **Mercado Livre**: API de anúncios e vendas

### Pagamentos
- **PagSeguro**: API de pagamentos
- **Mercado Pago**: API de transações
- **PayPal**: API de pagamentos

### Comunicação
- **WhatsApp Business API**: API de mensagens
- **Telegram Bot API**: API de bots
- **Slack**: API de comunicação

### Governo
- **Receita Federal**: API de CNPJ
- **Correios**: API de rastreamento
- **Banco Central**: API de PIX

## Próximos Passos

- [HTTP Request](/integracoes/builtin-nodes/http-requests/http-request) - Fazer requisições autenticadas
- [Webhook](/integracoes/builtin-nodes/http-requests/webhook) - Receber dados com autenticação
- [Expressões n8n](/logica-e-dados/expressoes) - Usar credenciais dinamicamente
- [Tratamento de Erros](/logica-e-dados/flow-logic/error-handling) - Lidar com falhas de autenticação
- [Segurança](/privacidade-seguranca/security-best-practices) - Boas práticas de segurança
