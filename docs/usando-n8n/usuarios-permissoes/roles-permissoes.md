---
title: Roles e Permissões
sidebar_position: 2
description: Configure roles e permissões granulares para controlar acesso a workflows, credenciais e recursos do n8n
keywords: [n8n, roles, permissões, controle de acesso, segurança, usuários, workflows]
---

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Roles e Permissões

O sistema de roles e permissões do n8n permite controlar com precisão o que cada usuário pode fazer. Neste guia, você aprenderá a configurar permissões granulares para workflows, credenciais e recursos.

## <ion-icon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você aprenderá

- **Sistema de roles** do n8n
- **Tipos de permissões** disponíveis
- **Configuração granular** de acesso
- **Boas práticas** de segurança
- **Auditoria** e monitoramento

## <ion-icon name="people-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Sistema de Roles

### 1. Roles Padrão

**Owner (Proprietário)**:

- Acesso total ao sistema
- Pode gerenciar todos os usuários
- Pode modificar configurações globais
- Pode acessar todos os workflows e credenciais

**Admin (Administrador)**:

- Pode gerenciar usuários
- Pode criar e editar workflows
- Pode gerenciar credenciais
- Pode configurar execuções

**Member (Membro)**:

- Pode executar workflows
- Pode visualizar workflows compartilhados
- Acesso limitado a credenciais
- Pode criar workflows pessoais

**Viewer (Visualizador)**:

- Apenas visualização de workflows
- Não pode executar ou modificar
- Acesso somente leitura

### 2. Roles Customizados

**Desenvolvedor**:

- Pode criar e editar workflows
- Acesso a credenciais de desenvolvimento
- Pode executar workflows de teste
- Não pode acessar dados de produção

**Analista**:

- Pode visualizar execuções
- Pode exportar dados
- Acesso a workflows de relatórios
- Não pode modificar workflows

**Operador**:

- Pode executar workflows específicos
- Pode monitorar execuções
- Acesso limitado a credenciais
- Não pode criar workflows

## <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Tipos de Permissões

### 1. Permissões de Workflow

**Criar**:

- Pode criar novos workflows
- Pode importar workflows
- Pode duplicar workflows existentes

**Editar**:

- Pode modificar workflows
- Pode adicionar/remover nodes
- Pode alterar configurações

**Executar**:

- Pode iniciar workflows manualmente
- Pode agendar execuções
- Pode parar execuções em andamento

**Visualizar**:

- Pode ver estrutura do workflow
- Pode acessar logs de execução
- Pode exportar workflows

**Excluir**:

- Pode remover workflows
- Pode arquivar workflows
- Pode limpar histórico

### 2. Permissões de Credenciais

**Criar**:

- Pode adicionar novas credenciais
- Pode importar credenciais
- Pode configurar tipos de autenticação

**Editar**:

- Pode modificar credenciais existentes
- Pode atualizar senhas/chaves
- Pode alterar configurações

**Usar**:

- Pode usar credenciais em workflows
- Pode testar conexões
- Pode validar autenticação

**Visualizar**:

- Pode ver tipos de credenciais
- Pode ver configurações (sem senhas)
- Pode ver histórico de uso

**Excluir**:

- Pode remover credenciais
- Pode revogar acesso
- Pode limpar histórico

### 3. Permissões de Sistema

**Usuários**:

- Pode gerenciar usuários
- Pode criar/editar roles
- Pode configurar autenticação

**Configurações**:

- Pode alterar configurações globais
- Pode configurar integrações
- Pode gerenciar backups

**Monitoramento**:

- Pode acessar logs do sistema
- Pode configurar alertas
- Pode visualizar métricas

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração de Permissões

### 1. Configuração por Usuário

**Interface do n8n**:

1. Acesse **Settings** → **Users**
2. Selecione o usuário
3. Clique em **Edit**
4. Configure **Role** e **Permissions**
5. Salve as alterações

**Configuração via API**:

```bash
# Atualizar role do usuário
curl -X PUT "https://your-n8n.com/api/v1/users/123" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "admin",
    "permissions": {
      "workflows": ["create", "edit", "execute"],
      "credentials": ["create", "edit", "use"],
      "system": ["users", "settings"]
    }
  }'
```

### 2. Configuração por Workflow

**Permissões granulares**:

```json
{
  "workflowId": "workflow-123",
  "permissions": {
    "users": {
      "user-1": ["view", "execute"],
      "user-2": ["view", "edit", "execute"],
      "user-3": ["view"]
    },
    "roles": {
      "admin": ["view", "edit", "execute", "delete"],
      "developer": ["view", "edit", "execute"],
      "analyst": ["view", "execute"]
    }
  }
}
```

### 3. Configuração por Credencial

**Controle de acesso**:

```json
{
  "credentialId": "credential-456",
  "permissions": {
    "users": {
      "user-1": ["use"],
      "user-2": ["view", "use"],
      "user-3": ["view", "edit", "use"]
    },
    "workflows": {
      "workflow-123": ["use"],
      "workflow-456": ["view", "use"]
    }
  }
}
```

## <ion-icon name="checkmark-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Boas Práticas

### 1. Princípio do Menor Privilégio

**Recomendações**:

- **Conceda apenas** permissões necessárias
- **Revise regularmente** permissões concedidas
- **Remova permissões** quando não mais necessárias
- **Use roles temporários** para tarefas específicas

### 2. Estrutura de Roles

**Hierarquia recomendada**:

```
Owner (1 usuário)
├── Admin (2-3 usuários)
├── Developer (equipe de desenvolvimento)
├── Analyst (equipe de análise)
├── Operator (equipe de operações)
└── Viewer (stakeholders)
```

### 3. Segurança

**Medidas de segurança**:

- **Auditoria regular** de permissões
- **Logs detalhados** de ações
- **Notificações** de mudanças críticas
- **Backup** de configurações de permissões

## <ion-icon name="play-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Exemplos Práticos

### Exemplo 1: Configuração para Startup

**Estrutura de equipe pequena**:

```json
{
  "roles": {
    "founder": {
      "type": "owner",
      "permissions": ["*"]
    },
    "cto": {
      "type": "admin",
      "permissions": ["workflows", "credentials", "users"]
    },
    "developer": {
      "type": "member",
      "permissions": ["workflows:create", "workflows:edit", "credentials:use"]
    },
    "analyst": {
      "type": "viewer",
      "permissions": ["workflows:view", "workflows:execute"]
    }
  }
}
```

### Exemplo 2: Configuração para Empresa

**Estrutura corporativa**:

```json
{
  "roles": {
    "it_admin": {
      "type": "admin",
      "permissions": ["system", "users", "settings"]
    },
    "data_engineer": {
      "type": "developer",
      "permissions": ["workflows:create", "workflows:edit", "credentials:create"]
    },
    "business_analyst": {
      "type": "analyst",
      "permissions": ["workflows:view", "workflows:execute", "data:export"]
    },
    "operations": {
      "type": "operator",
      "permissions": ["workflows:execute", "monitoring:view"]
    }
  }
}
```

### Exemplo 3: Workflow Específico

**Permissões granulares por workflow**:

```json
{
  "workflow": "ETL-Vendas-Crítico",
  "permissions": {
    "users": {
      "data_engineer": ["view", "edit", "execute"],
      "analyst": ["view", "execute"],
      "manager": ["view"],
      "operator": ["execute"]
    },
    "restrictions": {
      "execution_time": "business_hours",
      "approval_required": true,
      "max_executions_per_day": 10
    }
  }
}
```

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Auditoria e Monitoramento

### 1. Logs de Auditoria

**Eventos monitorados**:

- **Criação/edição** de workflows
- **Execução** de workflows
- **Acesso** a credenciais
- **Mudanças** de permissões
- **Logins** e logout

**Configuração de logs**:

```bash
# Habilitar logs de auditoria
N8N_AUDIT_LOGS_ENABLED=true
N8N_AUDIT_LOGS_LEVEL=info
N8N_AUDIT_LOGS_RETENTION=90 # dias
```

### 2. Alertas de Segurança

**Alertas configurar**:

- **Tentativas de acesso** não autorizado
- **Mudanças** em permissões críticas
- **Execução** de workflows sensíveis
- **Criação** de credenciais

### 3. Relatórios

**Relatórios úteis**:

- **Usuários ativos** e suas permissões
- **Workflows** por usuário/role
- **Credenciais** utilizadas
- **Atividade** de execução

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Troubleshooting

### Problemas Comuns

**Usuário não consegue acessar**:

- Verifique role atribuído
- Confirme permissões específicas
- Teste com usuário admin
- Verifique logs de acesso

**Permissões não aplicadas**:

- Reinicie o n8n após mudanças
- Verifique cache de sessão
- Confirme configuração correta
- Teste em navegador privado

**Workflow não executa**:

- Verifique permissões de execução
- Confirme acesso a credenciais
- Verifique agendamento
- Teste execução manual

### Debugging

**Ferramentas úteis**:

```bash
# Verificar permissões do usuário
curl -X GET "https://your-n8n.com/api/v1/users/me" \
  -H "Authorization: Bearer USER_TOKEN"

# Listar workflows acessíveis
curl -X GET "https://your-n8n.com/api/v1/workflows" \
  -H "Authorization: Bearer USER_TOKEN"

# Verificar logs de auditoria
tail -f /var/log/n8n/audit.log
```

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Audite permissões** atuais dos usuários
2. **Configure roles** apropriados para sua equipe
3. **Implemente permissões** granulares
4. **Configure monitoramento** e alertas
5. **Documente políticas** de acesso

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[Criar e Editar Usuários](./criar-editar-usuarios)** - Gerenciamento de usuários
- **[Autenticação](./autenticacao)** - Métodos de login
- **[Segurança](../../hosting-n8n/seguranca)** - Configurações de segurança
- **[Referência](../../referencia)** - Documentação técnica
- **[Comunidade](../../comunidade)** - Suporte e dicas

---

**<ion-icon name="shield-checkmark-outline" style={{ fontSize: '16px', color: '#ea4b71' }}></ion-icon> Pronto para controlar? Comece configurando roles apropriados para sua equipe!**
