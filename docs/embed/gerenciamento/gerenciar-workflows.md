---
sidebar_position: 1
title: Gerenciar Workflows Embarcados
description: Como gerenciar e controlar workflows em n8n embarcado
keywords: [n8n, embed, workflows, gerenciamento, controle, permissões]
---


# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Gerenciar Workflows Embarcados

Este documento detalha como **gerenciar workflows em n8n embarcado**, incluindo controle de acesso granular, versionamento integrado, backup automático, sincronização com sistemas externos, auditoria de mudanças, e estratégias de governança que garantem controle total sobre automações criadas dentro do ambiente embarcado mantendo compliance e segurança empresarial.

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você vai aprender

- Gerenciamento via API REST
- Controle de acesso e permissões
- Versionamento de workflows
- Auditoria e logs
- Backup e recovery

---

## <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Gerenciamento via API REST

### Endpoints Principais

O n8n oferece uma API REST completa para gerenciar workflows programaticamente:

#### **Workflows**

```bash
# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Listar todos os workflows
GET /api/v1/workflows

# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Obter workflow específico
GET /api/v1/workflows/{id}

# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Criar novo workflow
POST /api/v1/workflows
Content-Type: application/json

{
  "name": "Workflow de Teste",
  "active": false,
  "nodes": [...],
  "connections": {...}
}

# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Atualizar workflow
PUT /api/v1/workflows/{id}

# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Excluir workflow
DELETE /api/v1/workflows/{id}

# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Ativar/desativar workflow
PATCH /api/v1/workflows/{id}
{
  "active": true
}
```

#### **Execuções**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Listar execuções
GET /api/v1/executions

# <ion-icon name="document-text-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Executar workflow manualmente
POST /api/v1/workflows/{id}/trigger
Content-Type: application/json

{
  "data": {
    "campo1": "valor1",
    "campo2": "valor2"
  }
}

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Obter detalhes da execução
GET /api/v1/executions/{id}

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Parar execução em andamento
POST /api/v1/executions/{id}/stop
```

### Autenticação

#### **API Key (Recomendado)**

```bash
# <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Gerar API Key
curl -X POST "https://seu-n8n.com/api/v1/auth/api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Key para Embed",
    "scopes": ["workflow:read", "workflow:write", "execution:read"]
  }'

# <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Usar API Key
curl -H "X-N8N-API-KEY: sua_api_key" \
  https://seu-n8n.com/api/v1/workflows
```

#### **OAuth 2.0**

```bash
# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurar OAuth 2.0
{
  "client_id": "seu_client_id",
  "client_secret": "seu_client_secret",
  "authorization_url": "https://seu-n8n.com/oauth/authorize",
  "token_url": "https://seu-n8n.com/oauth/token"
}
```

---

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Controle de Acesso e Permissões

### Sistema RBAC

O n8n implementa Role-Based Access Control (RBAC) para controle granular de acesso:

#### **Roles Disponíveis**

```javascript
// Roles padrão do n8n
const roles = {
  owner: {
    description: "Acesso total ao sistema",
    permissions: ["*"]
  },
  admin: {
    description: "Gerenciamento de usuários e configurações",
    permissions: [
      "user:read", "user:write",
      "workflow:read", "workflow:write",
      "credential:read", "credential:write"
    ]
  },
  editor: {
    description: "Criar e editar workflows",
    permissions: [
      "workflow:read", "workflow:write",
      "execution:read", "execution:write"
    ]
  },
  viewer: {
    description: "Apenas visualizar workflows",
    permissions: [
      "workflow:read",
      "execution:read"
    ]
  }
}
```

#### **Permissões por Workflow**

```javascript
// Configurar permissões específicas por workflow
{
  "workflowId": "abc123",
  "permissions": {
    "user1@empresa.com": ["read", "write"],
    "user2@empresa.com": ["read"],
    "group:marketing": ["read", "execute"]
  }
}
```

### Integração com Sistemas Externos

#### **SAML/SSO**

```yaml
# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração SAML
N8N_SAML_ENABLED=true
N8N_SAML_ISSUER=https://seu-identity-provider.com
N8N_SAML_ENTRY_POINT=https://seu-identity-provider.com/sso
N8N_SAML_CERT=/path/to/certificate.pem
```

#### **LDAP/Active Directory**

```yaml
# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração LDAP
N8N_LDAP_ENABLED=true
N8N_LDAP_SERVER_URL=ldap://ldap.empresa.com:389
N8N_LDAP_BIND_DN=cn=admin,dc=empresa,dc=com
N8N_LDAP_BIND_PASSWORD=senha_ldap
N8N_LDAP_BASE_DN=dc=empresa,dc=com
```

---

## <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Versionamento de Workflows

### Histórico Automático

O n8n mantém histórico completo de versões automaticamente:

#### **Versões Automáticas**

```javascript
// Cada salvamento gera uma nova versão
{
  "workflowId": "abc123",
  "versions": [
    {
      "version": 5,
      "timestamp": "2024-01-15T10:30:00Z",
      "author": "usuario@empresa.com",
      "changes": "Adicionado node de validação",
      "active": true
    },
    {
      "version": 4,
      "timestamp": "2024-01-14T15:45:00Z",
      "author": "usuario@empresa.com",
      "changes": "Corrigido bug no webhook",
      "active": false
    }
  ]
}
```

#### **API de Versionamento**

```bash
# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Listar versões de um workflow
GET /api/v1/workflows/{id}/versions

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Obter versão específica
GET /api/v1/workflows/{id}/versions/{version}

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Restaurar versão anterior
POST /api/v1/workflows/{id}/versions/{version}/restore

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Comparar versões
GET /api/v1/workflows/{id}/versions/compare?from=3&to=5
```

### Documentação de Mudanças

#### **Comentários de Versão**

```javascript
// Adicionar comentário ao salvar
{
  "name": "Workflow de Vendas",
  "versionComment": "Adicionada validação de CPF e integração com CRM",
  "nodes": [...],
  "connections": {...}
}
```

#### **Changelog Automático**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Gerar changelog entre versões
curl -X GET "https://seu-n8n.com/api/v1/workflows/{id}/changelog?from=1&to=5" \
  -H "X-N8N-API-KEY: sua_api_key"
```

---

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Auditoria e Logs

### Logs de Atividade

#### **Eventos Auditados**

```javascript
// Tipos de eventos registrados
const auditEvents = {
  "workflow.created": "Workflow criado",
  "workflow.updated": "Workflow atualizado",
  "workflow.deleted": "Workflow excluído",
  "workflow.executed": "Workflow executado",
  "user.login": "Usuário fez login",
  "user.logout": "Usuário fez logout",
  "credential.accessed": "Credencial acessada",
  "permission.changed": "Permissão alterada"
}
```

#### **API de Auditoria**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Obter logs de atividade
GET /api/v1/audit-logs?start=2024-01-01&end=2024-01-31

# <ion-icon name="person-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Filtrar por usuário
GET /api/v1/audit-logs?user=usuario@empresa.com

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Filtrar por tipo de evento
GET /api/v1/audit-logs?event=workflow.updated

# <ion-icon name="cloud-download-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Exportar logs
GET /api/v1/audit-logs/export?format=csv
```

### Alertas de Segurança

#### **Configuração de Alertas**

```javascript
// Configurar alertas para atividades suspeitas
{
  "securityAlerts": {
    "failedLogins": {
      "threshold": 5,
      "timeWindow": "15m",
      "action": "notify_admin"
    },
    "workflowDeletions": {
      "action": "notify_admin",
      "immediate": true
    },
    "unusualActivity": {
      "newLocation": true,
      "unusualHours": true,
      "action": "notify_user"
    }
  }
}
```

#### **Integração com Sistemas de Monitoramento**

```bash
# <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Webhook para alertas
POST /webhook/security-alerts
{
  "event": "workflow.deleted",
  "user": "usuario@empresa.com",
  "workflow": "Workflow Crítico",
  "timestamp": "2024-01-15T10:30:00Z",
  "ip": "192.168.1.100"
}
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Backup e Recovery

### Backup Automático

#### **Script de Backup**

```bash
#!/bin/bash
# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> backup-workflows.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/n8n"
API_KEY="sua_api_key"
N8N_URL="https://seu-n8n.com"

# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Criar diretório de backup
mkdir -p $BACKUP_DIR

# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Backup de workflows
curl -H "X-N8N-API-KEY: $API_KEY" \
  "$N8N_URL/api/v1/workflows" \
  | jq '.' > "$BACKUP_DIR/workflows_$DATE.json"

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Backup de credenciais
curl -H "X-N8N-API-KEY: $API_KEY" \
  "$N8N_URL/api/v1/credentials" \
  | jq '.' > "$BACKUP_DIR/credentials_$DATE.json"

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Comprimir backup
tar -czf "$BACKUP_DIR/n8n_backup_$DATE.tar.gz" \
  "$BACKUP_DIR/workflows_$DATE.json" \
  "$BACKUP_DIR/credentials_$DATE.json"

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Manter apenas últimos 30 backups
find $BACKUP_DIR -name "n8n_backup_*.tar.gz" -mtime +30 -delete

echo "Backup criado: $BACKUP_DIR/n8n_backup_$DATE.tar.gz"
```

#### **Cron Job para Backup**

```bash
# <ion-icon name="time-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Adicionar ao crontab
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Backup diário às 2h da manhã
0 2 * * * /path/to/backup-workflows.sh

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Backup semanal completo
0 2 * * 0 /path/to/backup-workflows-full.sh
```

### Restauração

#### **Restaurar Workflows**

```bash
#!/bin/bash
# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> restore-workflows.sh

BACKUP_FILE="$1"
API_KEY="sua_api_key"
N8N_URL="https://seu-n8n.com"

# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Extrair backup
tar -xzf $BACKUP_FILE

# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Restaurar workflows
jq -c '.[]' workflows_*.json | while read workflow; do
  curl -X POST \
    -H "X-N8N-API-KEY: $API_KEY" \
    -H "Content-Type: application/json" \
    -d "$workflow" \
    "$N8N_URL/api/v1/workflows"
done

echo "Workflows restaurados com sucesso"
```

---

## <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Sincronização e Integração

### Webhooks

#### **Sincronização com Sistemas Externos**

```javascript
// Webhook para sincronizar workflows
{
  "url": "https://sistema-externo.com/webhook/n8n",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer token_externo",
    "Content-Type": "application/json"
  },
  "body": {
    "event": "workflow.updated",
    "workflow": {
      "id": "abc123",
      "name": "Workflow de Vendas",
      "version": 5,
      "active": true
    },
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Integração com Git

#### **Sincronização com Repositório**

```bash
#!/bin/bash
# <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> sync-with-git.sh

WORKFLOW_DIR="/tmp/n8n-workflows"
GIT_REPO="https://github.com/empresa/n8n-workflows.git"
API_KEY="sua_api_key"
N8N_URL="https://seu-n8n.com"

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Clonar repositório
git clone $GIT_REPO $WORKFLOW_DIR

# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Baixar workflows atuais
curl -H "X-N8N-API-KEY: $API_KEY" \
  "$N8N_URL/api/v1/workflows" \
  | jq '.' > "$WORKFLOW_DIR/workflows.json"

# <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Commit e push
cd $WORKFLOW_DIR
git add .
git commit -m "Sync workflows $(date)"
git push origin main

echo "Workflows sincronizados com Git"
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Boas Práticas

### Nomenclatura e Documentação

#### **Padrões de Nomenclatura**

```javascript
// Estrutura recomendada para nomes de workflows
const namingPatterns = {
  "departamento.funcionalidade.acao": "marketing.leads.enviar-email",
  "sistema.integracao.processo": "crm.salesforce.sincronizar-contatos",
  "ambiente.tipo.workflow": "prod.vendas.processar-pedidos"
}
```

#### **Documentação de Workflows**

```javascript
// Metadados para documentação
{
  "name": "Processar Pedidos de Venda",
  "description": "Workflow para processar pedidos vindos do e-commerce",
  "owner": "equipe-vendas@empresa.com",
  "tags": ["vendas", "e-commerce", "pedidos"],
  "version": "1.2.0",
  "lastUpdated": "2024-01-15T10:30:00Z",
  "dependencies": ["CRM", "Sistema de Pagamento"],
  "expectedExecutionTime": "5-10 minutos",
  "frequency": "Real-time via webhook"
}
```

### Segurança

#### **Proteção de Dados Sensíveis**

```javascript
// Configurações de segurança
{
  "security": {
    "maskSensitiveData": true,
    "logRetentionDays": 90,
    "requireMFA": true,
    "sessionTimeout": 3600,
    "maxLoginAttempts": 5,
    "passwordPolicy": {
      "minLength": 12,
      "requireUppercase": true,
      "requireLowercase": true,
      "requireNumbers": true,
      "requireSpecialChars": true
    }
  }
}
```

#### **Monitoramento de Performance**

```javascript
// Métricas de monitoramento
{
  "monitoring": {
    "executionTime": {
      "warning": 300000, // 5 minutos
      "critical": 600000  // 10 minutos
    },
    "errorRate": {
      "warning": 0.05, // 5%
      "critical": 0.10  // 10%
    },
    "queueSize": {
      "warning": 100,
      "critical": 500
    }
  }
}
```

---

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

Agora que você entende o gerenciamento de workflows embarcados:

1. **[White Labelling](./white-labelling)** - Personalizar a aparência do n8n
2. **[Configuração do Embed](../implementacao/configuracao)** - Configurar parâmetros avançados
3. **[API do n8n](../../api)** - Explorar todos os endpoints disponíveis
4. **[Segurança](../../hosting-n8n/seguranca/autenticacao)** - Implementar autenticação avançada

---

:::tip **Dica Pro**
Configure alertas automáticos para workflows críticos e mantenha backups regulares. Use a API para integrar o n8n com seus sistemas de monitoramento existentes.
:::

:::warning **Importante**
Sempre teste workflows em ambiente de desenvolvimento antes de aplicar em produção. Mantenha logs de auditoria por pelo menos 90 dias para compliance.
:::

:::info **Recurso Adicional**
Considere usar ferramentas de CI/CD para automatizar o deployment de workflows entre ambientes (dev, staging, prod).
:::
