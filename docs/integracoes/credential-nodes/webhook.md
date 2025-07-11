# Credenciais Webhook

As credenciais webhook permitem configurar autenticação e segurança para webhooks no n8n.

## Tipos de Autenticação

### Basic Auth
Configure autenticação básica com usuário e senha para proteger seus webhooks.

### API Key
Use chaves de API para autenticar requisições aos webhooks.

### OAuth 2.0
Configure autenticação OAuth 2.0 para integrações mais seguras.

## Configuração

1. Acesse **Settings** > **Credentials**
2. Clique em **Add Credential**
3. Selecione **Webhook**
4. Configure os parâmetros de autenticação
5. Salve as credenciais

## Uso

Após configurar as credenciais, você pode usá-las no node Webhook para autenticar as requisições recebidas.

## Segurança

- Sempre use HTTPS em produção
- Configure rate limiting quando apropriado
- Monitore logs de acesso
- Rotacione chaves regularmente 