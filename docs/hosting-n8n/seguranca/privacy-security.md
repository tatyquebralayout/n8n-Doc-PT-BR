# Privacidade e Segurança

A privacidade e segurança dos dados são fundamentais ao usar o n8n, especialmente considerando a Lei Geral de Proteção de Dados (LGPD) no Brasil. Esta seção aborda as melhores práticas para proteger dados sensíveis e garantir conformidade regulatória.

## Visão Geral

O n8n processa e armazena dados que podem incluir informações pessoais e sensíveis. É sua responsabilidade implementar medidas adequadas de segurança para proteger esses dados e garantir conformidade com a LGPD e outras regulamentações aplicáveis.

## Principais Considerações de Segurança

### Autenticação e Autorização

Configure autenticação robusta para proteger o acesso ao n8n:

```bash
# Configurar autenticação básica
export N8N_BASIC_AUTH_ACTIVE=true
export N8N_BASIC_AUTH_USER=admin
export N8N_BASIC_AUTH_PASSWORD=sua_senha_segura

# Ou usar autenticação OAuth2
export N8N_OAUTH2_ENABLED=true
export N8N_OAUTH2_ISSUER_URL=https://seu-provedor-oauth.com
export N8N_OAUTH2_CLIENT_ID=seu_client_id
export N8N_OAUTH2_CLIENT_SECRET=seu_client_secret
```

### Criptografia de Dados

Implemente criptografia em repouso e em trânsito:

```bash
# Criptografia em trânsito (HTTPS)
export N8N_PROTOCOL=https
export N8N_SSL_KEY=/caminho/para/chave-privada.pem
export N8N_SSL_CERT=/caminho/para/certificado.pem

# Criptografia de credenciais
export N8N_ENCRYPTION_KEY=sua_chave_de_criptografia_32_caracteres
```

### Controle de Acesso

Configure permissões granulares para usuários:

```json
{
  "users": [
    {
      "email": "admin@empresa.com",
      "role": "owner",
      "permissions": ["all"]
    },
    {
      "email": "analista@empresa.com", 
      "role": "member",
      "permissions": ["read", "execute"],
      "restrictedWorkflows": ["workflows-sensiveis"]
    }
  ]
}
```

## Conformidade com LGPD

### Princípios da LGPD

O n8n deve ser configurado seguindo os princípios da LGPD:

**Finalidade**: Defina claramente o propósito do processamento de dados
**Adequação**: Use apenas dados necessários para a finalidade declarada
**Necessidade**: Minimize a coleta e retenção de dados
**Livre Acesso**: Permita que titulares dos dados acessem suas informações
**Qualidade dos Dados**: Mantenha dados precisos e atualizados
**Transparência**: Informe sobre o processamento de dados
**Segurança**: Implemente medidas técnicas e organizacionais
**Não Discriminação**: Não use dados para fins discriminatórios
**Responsabilização**: Demonstre conformidade com a LGPD

### Implementação Prática

#### 1. Mapeamento de Dados

Documente todos os dados processados:

```markdown
## Mapeamento de Dados Pessoais

### Workflow: Integração CRM
- **Dados coletados**: Nome, email, telefone, empresa
- **Finalidade**: Automação de vendas
- **Base legal**: Legítimo interesse
- **Retenção**: 2 anos após último contato
- **Compartilhamento**: Apenas com CRM autorizado
```

#### 2. Consentimento e Base Legal

Configure workflows para respeitar consentimentos:

```javascript
// Verificar consentimento antes do processamento
const consentimento = await verificarConsentimento(email);
if (!consentimento.ativo) {
  throw new Error('Consentimento não autorizado para processamento');
}

// Registrar base legal
await registrarBaseLegal({
  email: email,
  baseLegal: 'legitimo_interesse',
  finalidade: 'automatizacao_vendas',
  timestamp: new Date()
});
```

#### 3. Direitos dos Titulares

Implemente endpoints para atender direitos LGPD:

```javascript
// Endpoint para acesso aos dados
app.get('/api/lgpd/dados/:email', async (req, res) => {
  const { email } = req.params;
  const dados = await buscarDadosPessoais(email);
  res.json({
    dados: dados,
    finalidade: 'automatizacao_vendas',
    baseLegal: 'legitimo_interesse',
    compartilhamento: ['crm_autorizado']
  });
});

// Endpoint para exclusão (direito ao esquecimento)
app.delete('/api/lgpd/dados/:email', async (req, res) => {
  const { email } = req.params;
  await excluirDadosPessoais(email);
  res.json({ message: 'Dados excluídos conforme solicitado' });
});
```

## Configurações de Segurança Avançadas

### Logs de Auditoria

Configure logs detalhados para auditoria:

```bash
# Habilitar logs de auditoria
export N8N_LOG_LEVEL=debug
export N8N_LOG_OUTPUT=file
export N8N_LOG_FILE=/var/log/n8n/audit.log

# Configurar rotação de logs
export N8N_LOG_MAX_SIZE=100MB
export N8N_LOG_MAX_FILES=30
```

### Monitoramento de Segurança

Implemente alertas para atividades suspeitas:

```javascript
// Monitorar tentativas de login
const monitorarLogin = async (email, ip, sucesso) => {
  if (!sucesso) {
    await registrarTentativaFalha(email, ip);
    
    const tentativas = await contarTentativasFalha(email, '1h');
    if (tentativas > 5) {
      await bloquearUsuario(email, '1h');
      await enviarAlertaSeguranca(email, ip);
    }
  }
};
```

### Backup Seguro

Configure backups criptografados:

```bash
# Backup com criptografia
pg_dump n8n_db | gpg --encrypt --recipient admin@empresa.com > backup_$(date +%Y%m%d).sql.gpg

# Backup automático com retenção
#!/bin/bash
BACKUP_DIR="/backups/n8n"
RETENTION_DAYS=30

# Criar backup
pg_dump n8n_db | gpg --encrypt --recipient admin@empresa.com > $BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql.gpg

# Limpar backups antigos
find $BACKUP_DIR -name "*.gpg" -mtime +$RETENTION_DAYS -delete
```

## Checklist de Conformidade

### Configuração Inicial
- [ ] Autenticação robusta configurada
- [ ] HTTPS habilitado
- [ ] Criptografia de credenciais ativa
- [ ] Logs de auditoria habilitados
- [ ] Backup seguro configurado

### LGPD Compliance
- [ ] Mapeamento de dados pessoais documentado
- [ ] Base legal definida para cada workflow
- [ ] Mecanismos de consentimento implementados
- [ ] Endpoints para direitos dos titulares criados
- [ ] Política de retenção de dados definida
- [ ] Procedimentos de exclusão implementados

### Monitoramento Contínuo
- [ ] Alertas de segurança configurados
- [ ] Revisão regular de logs
- [ ] Atualizações de segurança aplicadas
- [ ] Testes de penetração realizados
- [ ] Treinamento da equipe sobre LGPD

## Recursos Adicionais

### Documentação Oficial
- [Guia de Segurança do n8n](https://docs.n8n.io/hosting/security/)
- [Configuração de Autenticação](https://docs.n8n.io/hosting/authentication/)

### Legislação Brasileira
- [Lei Geral de Proteção de Dados (LGPD)](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [Guia da ANPD sobre LGPD](https://www.gov.br/anpd/pt-br)

### Ferramentas de Compliance
- [Checklist LGPD](https://www.gov.br/anpd/pt-br/assuntos/noticias-tecnicas/checklist-lgpd)
- [Ferramentas de Auditoria](https://www.gov.br/anpd/pt-br/assuntos/noticias-tecnicas/ferramentas-de-auditoria)

## Suporte e Contato

Para dúvidas sobre implementação de segurança ou conformidade LGPD:

- **Equipe de Segurança**: security@empresa.com
- **DPO (Encarregado de Dados)**: dpo@empresa.com
- **Suporte Técnico**: suporte@empresa.com

---

**Nota**: Esta documentação fornece orientações gerais. Consulte sempre um advogado especializado em proteção de dados para garantir conformidade completa com a LGPD e outras regulamentações aplicáveis. 