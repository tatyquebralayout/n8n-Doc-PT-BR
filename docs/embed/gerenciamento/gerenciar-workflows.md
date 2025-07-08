---
sidebar_position: 1
title: Gerenciar Workflows Embarcados
description: Como gerenciar e controlar workflows em n8n embarcado
keywords: [n8n, embed, workflows, gerenciamento, controle, permissões]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="settings-outline" size={32} color="#ea4b71" /> Gerenciar Workflows Embarcados

Este documento detalha como **gerenciar workflows em n8n embarcado**, incluindo controle de acesso granular, versionamento integrado, backup automático, sincronização com sistemas externos, auditoria de mudanças, e estratégias de governança que garantem controle total sobre automações criadas dentro do ambiente embarcado mantendo compliance e segurança empresarial.

## <IonicIcon name="school-outline" size={24} color="#ea4b71" /> O que você vai aprender

- <IonicIcon name="server-outline" size={16} color="#6b7280" /> Gerenciamento via API REST
- <IonicIcon name="shield-checkmark-outline" size={16} color="#6b7280" /> Controle de acesso e permissões
- <IonicIcon name="git-branch-outline" size={16} color="#6b7280" /> Versionamento de workflows
- <IonicIcon name="analytics-outline" size={16} color="#6b7280" /> Auditoria e logs
- <IonicIcon name="backup-outline" size={16} color="#6b7280" /> Backup e recovery

---

## <IonicIcon name="server-outline" size={24} color="#ea4b71" /> Gerenciamento via API REST

### <IonicIcon name="flash-outline" size={20} color="#10b981" /> Endpoints Principais

O n8n oferece uma API REST completa para gerenciar workflows programaticamente:

#### **Workflows**
```bash
# Listar todos os workflows
GET /api/v1/workflows

# Obter workflow específico
GET /api/v1/workflows/{id}

# Criar novo workflow
POST /api/v1/workflows
Content-Type: application/json

{
  "name": "Workflow de Teste",
  "active": false,
  "nodes": [...],
  "connections": {...}
}

# Atualizar workflow
PUT /api/v1/workflows/{id}

# Excluir workflow
DELETE /api/v1/workflows/{id}

# Ativar/desativar workflow
PATCH /api/v1/workflows/{id}
{
  "active": true
}
```

#### **Execuções**
```bash
# Listar execuções
GET /api/v1/executions

# Executar workflow manualmente
POST /api/v1/workflows/{id}/trigger
Content-Type: application/json

{
  "data": {
    "campo1": "valor1",
    "campo2": "valor2"
  }
}

# Obter detalhes da execução
GET /api/v1/executions/{id}

# Parar execução em andamento
POST /api/v1/executions/{id}/stop
```

### <IonicIcon name="key-outline" size={20} color="#10b981" /> Autenticação

#### **API Key (Recomendado)**
```bash
# Gerar API Key
curl -X POST "https://seu-n8n.com/api/v1/auth/api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Key para Embed",
    "scopes": ["workflow:read", "workflow:write", "execution:read"]
  }'

# Usar API Key
curl -H "X-N8N-API-KEY: sua_api_key" \
  https://seu-n8n.com/api/v1/workflows
```

#### **OAuth 2.0**
```bash
# Configurar OAuth 2.0
{
  "client_id": "seu_client_id",
  "client_secret": "seu_client_secret",
  "authorization_url": "https://seu-n8n.com/oauth/authorize",
  "token_url": "https://seu-n8n.com/oauth/token"
}
```

---

## <IonicIcon name="shield-checkmark-outline" size={24} color="#ea4b71" /> Controle de Acesso e Permissões

### <IonicIcon name="people-outline" size={20} color="#10b981" /> Sistema RBAC

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

### <IonicIcon name="construct-outline" size={20} color="#10b981" /> Integração com Sistemas Externos

#### **SAML/SSO**
```yaml
# Configuração SAML
N8N_SAML_ENABLED=true
N8N_SAML_ISSUER=https://seu-identity-provider.com
N8N_SAML_ENTRY_POINT=https://seu-identity-provider.com/sso
N8N_SAML_CERT=/path/to/certificate.pem
```

#### **LDAP/Active Directory**
```yaml
# Configuração LDAP
N8N_LDAP_ENABLED=true
N8N_LDAP_SERVER_URL=ldap://ldap.empresa.com:389
N8N_LDAP_BIND_DN=cn=admin,dc=empresa,dc=com
N8N_LDAP_BIND_PASSWORD=senha_ldap
N8N_LDAP_BASE_DN=dc=empresa,dc=com
```

---

## <IonicIcon name="git-branch-outline" size={24} color="#ea4b71" /> Versionamento de Workflows

### <IonicIcon name="time-outline" size={20} color="#10b981" /> Histórico Automático

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
# Listar versões de um workflow
GET /api/v1/workflows/{id}/versions

# Obter versão específica
GET /api/v1/workflows/{id}/versions/{version}

# Restaurar versão anterior
POST /api/v1/workflows/{id}/versions/{version}/restore

# Comparar versões
GET /api/v1/workflows/{id}/versions/compare?from=3&to=5
```

### <IonicIcon name="document-text-outline" size={20} color="#10b981" /> Documentação de Mudanças

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
# Gerar changelog entre versões
curl -X GET "https://seu-n8n.com/api/v1/workflows/{id}/changelog?from=1&to=5" \
  -H "X-N8N-API-KEY: sua_api_key"
```

---

## <IonicIcon name="analytics-outline" size={24} color="#ea4b71" /> Auditoria e Logs

### <IonicIcon name="eye-outline" size={20} color="#10b981" /> Logs de Atividade

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
# Obter logs de atividade
GET /api/v1/audit-logs?start=2024-01-01&end=2024-01-31

# Filtrar por usuário
GET /api/v1/audit-logs?user=usuario@empresa.com

# Filtrar por tipo de evento
GET /api/v1/audit-logs?event=workflow.updated

# Exportar logs
GET /api/v1/audit-logs/export?format=csv
```

### <IonicIcon name="notifications-outline" size={20} color="#10b981" /> Alertas de Segurança

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
# Webhook para alertas
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

## <IonicIcon name="backup-outline" size={24} color="#ea4b71" /> Backup e Recovery

### <IonicIcon name="save-outline" size={20} color="#10b981" /> Backup Automático

#### **Script de Backup**
```bash
#!/bin/bash
# backup-workflows.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/n8n"
API_KEY="sua_api_key"
N8N_URL="https://seu-n8n.com"

# Criar diretório de backup
mkdir -p $BACKUP_DIR

# Backup de workflows
curl -H "X-N8N-API-KEY: $API_KEY" \
  "$N8N_URL/api/v1/workflows" \
  | jq '.' > "$BACKUP_DIR/workflows_$DATE.json"

# Backup de credenciais
curl -H "X-N8N-API-KEY: $API_KEY" \
  "$N8N_URL/api/v1/credentials" \
  | jq '.' > "$BACKUP_DIR/credentials_$DATE.json"

# Comprimir backup
tar -czf "$BACKUP_DIR/n8n_backup_$DATE.tar.gz" \
  "$BACKUP_DIR/workflows_$DATE.json" \
  "$BACKUP_DIR/credentials_$DATE.json"

# Manter apenas últimos 30 backups
find $BACKUP_DIR -name "n8n_backup_*.tar.gz" -mtime +30 -delete

echo "Backup criado: $BACKUP_DIR/n8n_backup_$DATE.tar.gz"
```

#### **Cron Job para Backup**
```bash
# Adicionar ao crontab
# Backup diário às 2h da manhã
0 2 * * * /path/to/backup-workflows.sh

# Backup semanal completo
0 2 * * 0 /path/to/backup-workflows-full.sh
```

### <IonicIcon name="refresh-outline" size={20} color="#10b981" /> Restauração

#### **Restaurar Workflows**
```bash
#!/bin/bash
# restore-workflows.sh

BACKUP_FILE="$1"
API_KEY="sua_api_key"
N8N_URL="https://seu-n8n.com"

# Extrair backup
tar -xzf $BACKUP_FILE

# Restaurar workflows
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

## <IonicIcon name="sync-outline" size={24} color="#ea4b71" /> Sincronização e Integração

### <IonicIcon name="globe-outline" size={20} color="#10b981" /> Webhooks

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

### <IonicIcon name="git-branch-outline" size={20} color="#10b981" /> Integração com Git

#### **Sincronização com Repositório**
```bash
#!/bin/bash
# sync-with-git.sh

WORKFLOW_DIR="/tmp/n8n-workflows"
GIT_REPO="https://github.com/empresa/n8n-workflows.git"
API_KEY="sua_api_key"
N8N_URL="https://seu-n8n.com"

# Clonar repositório
git clone $GIT_REPO $WORKFLOW_DIR

# Baixar workflows atuais
curl -H "X-N8N-API-KEY: $API_KEY" \
  "$N8N_URL/api/v1/workflows" \
  | jq '.' > "$WORKFLOW_DIR/workflows.json"

# Commit e push
cd $WORKFLOW_DIR
git add .
git commit -m "Sync workflows $(date)"
git push origin main

echo "Workflows sincronizados com Git"
```

---

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> Boas Práticas

### <IonicIcon name="naming-outline" size={20} color="#10b981" /> Nomenclatura e Documentação

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

### <IonicIcon name="shield-outline" size={20} color="#10b981" /> Segurança

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

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> Próximos Passos

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
