# Credenciais HTTP Request

As credenciais HTTP Request permitem configurar autenticação para requisições HTTP no n8n.

## Tipos de Autenticação

### Basic Auth
Configure autenticação básica com usuário e senha.

### Bearer Token
Use tokens Bearer para autenticação baseada em token.

### API Key
Configure chaves de API em headers ou parâmetros.

### OAuth 2.0
Configure autenticação OAuth 2.0 para APIs que suportam este protocolo.

### Digest Auth
Configure autenticação digest quando necessário.

## Configuração

1. Acesse **Settings** > **Credentials**
2. Clique em **Add Credential**
3. Selecione **HTTP Request**
4. Configure os parâmetros de autenticação
5. Salve as credenciais

## Uso

Após configurar as credenciais, você pode usá-las no node HTTP Request para autenticar as requisições enviadas.

## Segurança

- Sempre use HTTPS em produção
- Não armazene credenciais em texto plano
- Use variáveis de ambiente quando possível
- Monitore logs de acesso 