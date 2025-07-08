---
title: Autenticação
sidebar_position: 3
description: Configure métodos de autenticação seguros para o n8n, incluindo 2FA, OAuth e integração com provedores externos
keywords: [n8n, autenticação, 2FA, OAuth, segurança, login, usuários]
---

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Autenticação

A autenticação é fundamental para proteger seu ambiente n8n. Neste guia, você aprenderá a configurar métodos de autenticação seguros, incluindo autenticação de dois fatores (2FA) e integração com provedores externos.

## <ion-icon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você aprenderá

- **Métodos de autenticação** disponíveis no n8n
- **Configuração de 2FA** para maior segurança
- **Integração com OAuth** e provedores externos
- **Boas práticas** de segurança
- **Troubleshooting** de problemas de autenticação

## <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Métodos de Autenticação

### 1. Autenticação Local

**Usuário e Senha**:
- Método padrão do n8n
- Senhas criptografadas no banco de dados
- Suporte a políticas de senha

**Configuração**:
```bash
# Variáveis de ambiente
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=senha-segura
```

### 2. Autenticação de Dois Fatores (2FA)

**TOTP (Time-based One-Time Password)**:
- Códigos temporários via app (Google Authenticator, Authy)
- Validação em tempo real
- Backup codes para recuperação

**Configuração**:
1. Acesse **Settings** → **Users**
2. Selecione o usuário
3. Clique em **Enable 2FA**
4. Escaneie o QR code com seu app
5. Digite o código de verificação

### 3. OAuth 2.0

**Provedores Suportados**:
- **Google**: Gmail, Google Workspace
- **Microsoft**: Azure AD, Office 365
- **GitHub**: Para desenvolvedores
- **SAML**: Para empresas

**Configuração Google OAuth**:
```bash
# Variáveis de ambiente
N8N_GOOGLE_CLIENT_ID=your-client-id
N8N_GOOGLE_CLIENT_SECRET=your-client-secret
N8N_GOOGLE_CALLBACK_URL=https://your-domain.com/callback
```

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração de Segurança

### 1. Políticas de Senha

**Configurações recomendadas**:
```json
{
  "minLength": 12,
  "requireUppercase": true,
  "requireLowercase": true,
  "requireNumbers": true,
  "requireSpecialChars": true,
  "maxAge": 90, // dias
  "preventReuse": 5 // últimas senhas
}
```

### 2. Sessões e Timeouts

**Configuração de sessão**:
```bash
# Tempo de sessão (em segundos)
N8N_SESSION_LIFETIME=86400 # 24 horas

# Tempo de inatividade
N8N_SESSION_TIMEOUT=3600 # 1 hora

# Renovação automática
N8N_SESSION_EXTEND_ON_ACTIVITY=true
```

### 3. Rate Limiting

**Proteção contra ataques**:
```bash
# Tentativas de login
N8N_LOGIN_ATTEMPTS_LIMIT=5
N8N_LOGIN_ATTEMPTS_TIMEOUT=900 # 15 minutos

# Bloqueio de IP
N8N_IP_WHITELIST=192.168.1.0/24,10.0.0.0/8
```

## <ion-icon name="shield-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Integração com Provedores Externos

### 1. Google OAuth

**Configuração no Google Cloud Console**:

1. **Criar projeto** no Google Cloud Console
2. **Habilitar Google+ API**
3. **Criar credenciais OAuth 2.0**
4. **Configurar URIs de redirecionamento**

**Variáveis de ambiente**:
```bash
N8N_GOOGLE_CLIENT_ID=your-client-id
N8N_GOOGLE_CLIENT_SECRET=your-client-secret
N8N_GOOGLE_CALLBACK_URL=https://your-domain.com/callback
N8N_GOOGLE_SCOPES=email profile
```

### 2. Microsoft Azure AD

**Configuração no Azure Portal**:

1. **Registrar aplicação** no Azure AD
2. **Configurar permissões** necessárias
3. **Gerar client secret**
4. **Configurar redirect URIs**

**Variáveis de ambiente**:
```bash
N8N_MICROSOFT_CLIENT_ID=your-client-id
N8N_MICROSOFT_CLIENT_SECRET=your-client-secret
N8N_MICROSOFT_TENANT_ID=your-tenant-id
N8N_MICROSOFT_CALLBACK_URL=https://your-domain.com/callback
```

### 3. SAML 2.0

**Para ambientes empresariais**:

```bash
# Configuração SAML
N8N_SAML_ENABLED=true
N8N_SAML_ISSUER=your-issuer
N8N_SAML_ENTRY_POINT=https://your-idp.com/sso
N8N_SAML_CERT=path/to/certificate.pem
```

## <ion-icon name="checkmark-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Boas Práticas

### 1. Segurança de Produção

**Recomendações**:
- **Use HTTPS** em todos os ambientes
- **Configure 2FA** para todos os usuários
- **Implemente políticas** de senha forte
- **Monitore logs** de autenticação
- **Use variáveis de ambiente** para credenciais

### 2. Gerenciamento de Usuários

**Processos recomendados**:
- **Onboarding**: Criação padronizada de contas
- **Offboarding**: Desativação imediata
- **Auditoria**: Revisão regular de acessos
- **Treinamento**: Capacitação em segurança

### 3. Monitoramento

**Alertas configurar**:
- **Tentativas de login** falhadas
- **Logins de IPs** desconhecidos
- **Alterações** em configurações de segurança
- **Falhas** de autenticação

## <ion-icon name="play-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Exemplos Práticos

### Exemplo 1: Configuração Google OAuth

**Passo a passo**:

1. **Google Cloud Console**:
   ```bash
   # Criar projeto
   gcloud projects create n8n-auth-project
   
   # Habilitar APIs
   gcloud services enable plus.googleapis.com
   ```

2. **Criar credenciais**:
   - Tipo: OAuth 2.0 Client ID
   - URIs autorizados: `https://your-domain.com`
   - URIs de redirecionamento: `https://your-domain.com/callback`

3. **Configurar n8n**:
   ```bash
   N8N_GOOGLE_CLIENT_ID=your-client-id
   N8N_GOOGLE_CLIENT_SECRET=your-client-secret
   N8N_GOOGLE_CALLBACK_URL=https://your-domain.com/callback
   ```

### Exemplo 2: Implementação 2FA

**Fluxo de configuração**:

```javascript
// Gerar QR code para 2FA
const qrCode = generateTOTPQRCode({
  secret: user.totpSecret,
  label: user.email,
  issuer: 'n8n'
});

// Validar código 2FA
const isValid = validateTOTPCode({
  secret: user.totpSecret,
  code: userInput,
  window: 2 // tolerância de 2 períodos
});
```

### Exemplo 3: Rate Limiting

**Implementação de proteção**:

```javascript
// Middleware de rate limiting
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 tentativas
  message: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
};

// Bloqueio de IP
const ipWhitelist = ['192.168.1.0/24', '10.0.0.0/8'];
const isAllowedIP = (ip) => ipWhitelist.some(range => ipInRange(ip, range));
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Troubleshooting

### Problemas Comuns

**Erro de login**:
- Verifique credenciais
- Confirme se a conta está ativa
- Verifique políticas de senha
- Teste conectividade com provedor

**2FA não funciona**:
- Sincronize relógio do dispositivo
- Use backup codes se necessário
- Reconfigure 2FA se necessário
- Verifique app autenticador

**OAuth falha**:
- Confirme URIs de redirecionamento
- Verifique client ID/secret
- Teste conectividade com provedor
- Revise permissões da aplicação

### Debugging

**Logs úteis**:
```bash
# Logs de autenticação
tail -f /var/log/n8n/auth.log

# Logs de OAuth
grep "oauth" /var/log/n8n/app.log

# Logs de erro
grep "error" /var/log/n8n/error.log
```

**Ferramentas de diagnóstico**:
1. **Teste de conectividade** com provedores
2. **Validação de certificados** SSL/TLS
3. **Verificação de timezone** para 2FA
4. **Análise de logs** detalhada

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Configure 2FA** para todos os usuários
2. **Implemente OAuth** se necessário
3. **Configure políticas** de senha
4. **Monitore logs** de autenticação
5. **Teste cenários** de recuperação

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[Criar e Editar Usuários](./criar-editar-usuarios)** - Gerenciamento de usuários
- **[Roles e Permissões](./roles-permissoes)** - Controle de acesso
- **[Segurança](../../hosting-n8n/seguranca)** - Configurações de segurança
- **[Referência](../../referencia)** - Documentação técnica
- **[Comunidade](../../comunidade)** - Suporte e dicas

---

**<ion-icon name="shield-checkmark-outline" style={{ fontSize: '16px', color: '#ea4b71' }}></ion-icon> Pronto para proteger? Comece configurando 2FA para seus usuários!** 