---
sidebar_position: 2
title: Usuários e Permissões
description: Como gerenciar usuários e configurar permissões granulares no n8n
keywords: [n8n, usuários, permissões, rbac, controle acesso, roles]
---


#  Usuários e Permissões

Este documento detalha **gerenciamento de usuários e permissões** no n8n, incluindo criação de roles customizados, controle granular de acesso, permissões por workflow, segregação de ambientes, auditoria de ações, e implementação de RBAC (Role-Based Access Control) que garante princípio de menor privilégio e conformidade com políticas de segurança empresarial em organizações de grande porte.

##  O que você vai aprender

-  Sistema RBAC (Role-Based Access Control)
-  Controle granular de permissões
-  Auditoria e monitoramento
-  Segregação de ambientes
-  Templates de roles organizacionais

---

##  Sistema RBAC

###  Roles Padrão

#### **Owner (Proprietário)**
```javascript
// Role com acesso total ao sistema
const ownerRole = {
  name: "owner",
  description: "Acesso total ao sistema",
  permissions: [
    "user:read", "user:write", "user:delete",
    "workflow:read", "workflow:write", "workflow:delete", "workflow:execute",
    "credential:read", "credential:write", "credential:delete",
    "execution:read", "execution:write", "execution:delete",
    "settings:read", "settings:write",
    "audit:read", "audit:write"
  ]
};
```

#### **Admin (Administrador)**
```javascript
// Role para administração do sistema
const adminRole = {
  name: "admin",
  description: "Gerenciamento de usuários e configurações",
  permissions: [
    "user:read", "user:write",
    "workflow:read", "workflow:write", "workflow:execute",
    "credential:read", "credential:write",
    "execution:read", "execution:write",
    "settings:read", "settings:write",
    "audit:read"
  ]
};
```

#### **Editor (Editor)**
```javascript
// Role para criação e edição de workflows
const editorRole = {
  name: "editor",
  description: "Criar e editar workflows",
  permissions: [
    "workflow:read", "workflow:write", "workflow:execute",
    "credential:read", "credential:write",
    "execution:read", "execution:write"
  ]
};
```

#### **Viewer (Visualizador)**
```javascript
// Role para apenas visualização
const viewerRole = {
  name: "viewer",
  description: "Apenas visualizar workflows",
  permissions: [
    "workflow:read",
    "execution:read"
  ]
};
```

###  Roles Customizados

#### **Criar Role Customizado**
```javascript
// Exemplo: Role para equipe de marketing
const marketingRole = {
  name: "marketing",
  description: "Acesso a workflows de marketing",
  permissions: [
    "workflow:read",
    "workflow:write",
    "workflow:execute",
    "credential:read",
    "execution:read",
    "execution:write"
  ],
  restrictions: {
    workflowTags: ["marketing", "social-media"],
    credentialTypes: ["mailchimp", "facebook", "google-ads"]
  }
};

// Exemplo: Role para equipe financeira
const financeRole = {
  name: "finance",
  description: "Acesso a dados financeiros",
  permissions: [
    "workflow:read",
    "workflow:write",
    "workflow:execute",
    "credential:read",
    "execution:read"
  ],
  restrictions: {
    workflowTags: ["finance", "accounting"],
    credentialTypes: ["stripe", "paypal", "quickbooks"],
    dataAccess: {
      sensitiveFields: ["amount", "card_number", "ssn"],
      maskSensitiveData: true
    }
  }
};
```

---

##  Controle Granular de Acesso

###  Permissões por Workflow

#### **Configuração de Permissões**
```javascript
// Configurar permissões específicas por workflow
{
  "workflowId": "abc123",
  "name": "Workflow de Vendas",
  "permissions": {
    "user1@empresa.com": ["read", "write", "execute"],
    "user2@empresa.com": ["read", "execute"],
    "user3@empresa.com": ["read"],
    "group:marketing": ["read", "write"],
    "group:sales": ["read", "write", "execute"],
    "group:finance": ["read"]
  },
  "restrictions": {
    "executionTime": "09:00-18:00",
    "allowedDays": ["monday", "tuesday", "wednesday", "thursday", "friday"],
    "maxExecutionsPerDay": 100,
    "requireApproval": false
  }
}
```

#### **Permissões por Tag**
```javascript
// Configurar permissões baseadas em tags
{
  "tagPermissions": {
    "marketing": {
      "roles": ["marketing", "admin"],
      "permissions": ["read", "write", "execute"]
    },
    "finance": {
      "roles": ["finance", "admin"],
      "permissions": ["read", "write"],
      "restrictions": {
        "requireApproval": true,
        "auditRequired": true
      }
    },
    "hr": {
      "roles": ["hr", "admin"],
      "permissions": ["read", "write"],
      "restrictions": {
        "dataEncryption": true,
        "accessLogging": true
      }
    }
  }
}
```

###  Permissões por Credencial

#### **Controle de Acesso a Credenciais**
```javascript
// Configurar acesso a credenciais
{
  "credentialId": "cred123",
  "name": "API Stripe",
  "type": "stripeApi",
  "permissions": {
    "user1@empresa.com": ["read", "use"],
    "user2@empresa.com": ["read"],
    "group:finance": ["read", "use"],
    "group:admin": ["read", "use", "write", "delete"]
  },
  "restrictions": {
    "allowedIPs": ["192.168.1.0/24", "10.0.0.0/8"],
    "allowedHours": "09:00-18:00",
    "maxUsagePerDay": 1000,
    "requireApproval": true
  }
}
```

#### **Credenciais Sensíveis**
```javascript
// Configuração para credenciais sensíveis
{
  "credentialId": "cred456",
  "name": "Database Admin",
  "type": "postgres",
  "sensitivity": "high",
  "permissions": {
    "admin@empresa.com": ["read", "use"],
    "dba@empresa.com": ["read", "use"]
  },
  "security": {
    "encryption": true,
    "auditLogging": true,
    "sessionTimeout": 1800,
    "require2FA": true,
    "accessNotification": true
  }
}
```

---

##  Segregação de Ambientes

###  Ambientes Separados

#### **Configuração de Ambientes**
```javascript
// Configuração para múltiplos ambientes
const environments = {
  development: {
    name: "Development",
    description: "Ambiente de desenvolvimento",
    roles: ["developer", "admin"],
    restrictions: {
      maxExecutionsPerDay: 1000,
      allowedIPs: ["192.168.1.0/24"],
      dataRetention: 7
    }
  },
  staging: {
    name: "Staging",
    description: "Ambiente de homologação",
    roles: ["tester", "admin"],
    restrictions: {
      maxExecutionsPerDay: 500,
      allowedIPs: ["192.168.2.0/24"],
      dataRetention: 30,
      requireApproval: true
    }
  },
  production: {
    name: "Production",
    description: "Ambiente de produção",
    roles: ["operator", "admin"],
    restrictions: {
      maxExecutionsPerDay: 10000,
      allowedIPs: ["10.0.0.0/8"],
      dataRetention: 365,
      requireApproval: true,
      auditRequired: true
    }
  }
};
```

#### **Isolamento de Dados**
```javascript
// Configuração de isolamento
{
  "dataIsolation": {
    "development": {
      "database": "n8n_dev",
      "credentials": "dev_credentials",
      "workflows": "dev_workflows"
    },
    "staging": {
      "database": "n8n_staging",
      "credentials": "staging_credentials",
      "workflows": "staging_workflows"
    },
    "production": {
      "database": "n8n_prod",
      "credentials": "prod_credentials",
      "workflows": "prod_workflows"
    }
  }
}
```

---

##  Auditoria e Monitoramento

###  Logs de Auditoria

#### **Configuração de Auditoria**
```bash
# Configurar logs de auditoria
N8N_AUDIT_ENABLED=true
N8N_AUDIT_LOG_LEVEL=info
N8N_AUDIT_LOG_FILE=/var/log/n8n/audit.log
N8N_AUDIT_RETENTION_DAYS=90
N8N_AUDIT_MASK_SENSITIVE_DATA=true
```

#### **Eventos Auditados**
```javascript
// Eventos que são registrados na auditoria
const auditEvents = {
  // Autenticação
  "auth.login": "Login de usuário",
  "auth.logout": "Logout de usuário",
  "auth.failed_login": "Tentativa de login falhou",
  "auth.password_change": "Senha alterada",
  "auth.2fa_enabled": "2FA ativado",
  "auth.2fa_disabled": "2FA desativado",
  
  // Usuários
  "user.created": "Usuário criado",
  "user.updated": "Usuário atualizado",
  "user.deleted": "Usuário deletado",
  "user.role_changed": "Role alterada",
  "user.suspended": "Usuário suspenso",
  
  // Workflows
  "workflow.created": "Workflow criado",
  "workflow.updated": "Workflow atualizado",
  "workflow.deleted": "Workflow deletado",
  "workflow.executed": "Workflow executado",
  "workflow.activated": "Workflow ativado",
  "workflow.deactivated": "Workflow desativado",
  
  // Credenciais
  "credential.created": "Credencial criada",
  "credential.updated": "Credencial atualizada",
  "credential.deleted": "Credencial deletada",
  "credential.accessed": "Credencial acessada",
  
  // Execuções
  "execution.started": "Execução iniciada",
  "execution.completed": "Execução completada",
  "execution.failed": "Execução falhou",
  "execution.cancelled": "Execução cancelada"
};
```

###  Alertas de Segurança

#### **Configuração de Alertas**
```javascript
// Configurar alertas de segurança
{
  "securityAlerts": {
    "permissionEscalation": {
      "enabled": true,
      "action": "notify_admin",
      "immediate": true
    },
    "unusualAccess": {
      "enabled": true,
      "threshold": 10,
      "timeWindow": "1h",
      "action": "notify_admin"
    },
    "sensitiveDataAccess": {
      "enabled": true,
      "action": "notify_admin",
      "log": true
    },
    "workflowDeletion": {
      "enabled": true,
      "action": "notify_admin",
      "requireApproval": true
    }
  }
}
```

#### **Notificações**
```javascript
// Configuração de notificações
{
  "notifications": {
    "email": {
      "enabled": true,
      "from": "security@empresa.com",
      "to": ["admin@empresa.com", "security@empresa.com"],
      "template": "security_alert"
    },
    "slack": {
      "enabled": true,
      "webhook": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL",
      "channel": "#security-alerts"
    },
    "webhook": {
      "enabled": true,
      "url": "https://sistema-seguranca.empresa.com/webhook",
      "headers": {
        "Authorization": "Bearer token_seguranca"
      }
    }
  }
}
```

---

##  Templates de Roles Organizacionais

###  Startup (10-50 funcionários)

#### **Roles Essenciais**
```javascript
// Configuração para startup
const startupRoles = {
  founder: {
    name: "Founder",
    description: "Fundador com acesso total",
    permissions: ["*"],
    users: ["founder@startup.com"]
  },
  developer: {
    name: "Developer",
    description: "Desenvolvedor com acesso técnico",
    permissions: [
      "workflow:read", "workflow:write", "workflow:execute",
      "credential:read", "credential:write",
      "execution:read", "execution:write"
    ],
    users: ["dev1@startup.com", "dev2@startup.com"]
  },
  operator: {
    name: "Operator",
    description: "Operador com acesso limitado",
    permissions: [
      "workflow:read", "workflow:execute",
      "credential:read",
      "execution:read"
    ],
    users: ["ops@startup.com"]
  }
};
```

###  Empresa Média (50-500 funcionários)

#### **Roles Departamentais**
```javascript
// Configuração para empresa média
const mediumCompanyRoles = {
  // TI
  it_admin: {
    name: "IT Admin",
    description: "Administrador de TI",
    permissions: [
      "user:read", "user:write",
      "workflow:read", "workflow:write", "workflow:execute",
      "credential:read", "credential:write",
      "execution:read", "execution:write",
      "settings:read", "settings:write",
      "audit:read"
    ]
  },
  developer: {
    name: "Developer",
    description: "Desenvolvedor",
    permissions: [
      "workflow:read", "workflow:write", "workflow:execute",
      "credential:read", "credential:write",
      "execution:read", "execution:write"
    ]
  },
  
  // Marketing
  marketing_manager: {
    name: "Marketing Manager",
    description: "Gerente de Marketing",
    permissions: [
      "workflow:read", "workflow:write", "workflow:execute",
      "credential:read",
      "execution:read", "execution:write"
    ],
    restrictions: {
      workflowTags: ["marketing", "social-media", "email"]
    }
  },
  marketing_analyst: {
    name: "Marketing Analyst",
    description: "Analista de Marketing",
    permissions: [
      "workflow:read", "workflow:execute",
      "credential:read",
      "execution:read"
    ],
    restrictions: {
      workflowTags: ["marketing", "analytics"]
    }
  },
  
  // Vendas
  sales_manager: {
    name: "Sales Manager",
    description: "Gerente de Vendas",
    permissions: [
      "workflow:read", "workflow:write", "workflow:execute",
      "credential:read",
      "execution:read", "execution:write"
    ],
    restrictions: {
      workflowTags: ["sales", "crm", "leads"]
    }
  },
  sales_rep: {
    name: "Sales Representative",
    description: "Representante de Vendas",
    permissions: [
      "workflow:read", "workflow:execute",
      "credential:read",
      "execution:read"
    ],
    restrictions: {
      workflowTags: ["sales", "leads"]
    }
  }
};
```

###  Empresa Grande (500+ funcionários)

#### **Roles Corporativos**
```javascript
// Configuração para empresa grande
const largeCompanyRoles = {
  // Administração
  system_admin: {
    name: "System Administrator",
    description: "Administrador do Sistema",
    permissions: [
      "user:read", "user:write", "user:delete",
      "workflow:read", "workflow:write", "workflow:delete", "workflow:execute",
      "credential:read", "credential:write", "credential:delete",
      "execution:read", "execution:write", "execution:delete",
      "settings:read", "settings:write",
      "audit:read", "audit:write"
    ]
  },
  security_admin: {
    name: "Security Administrator",
    description: "Administrador de Segurança",
    permissions: [
      "user:read", "user:write",
      "audit:read", "audit:write",
      "settings:read", "settings:write"
    ],
    restrictions: {
      requireApproval: true,
      auditRequired: true
    }
  },
  
  // Desenvolvimento
  dev_lead: {
    name: "Development Lead",
    description: "Líder de Desenvolvimento",
    permissions: [
      "workflow:read", "workflow:write", "workflow:execute",
      "credential:read", "credential:write",
      "execution:read", "execution:write"
    ],
    restrictions: {
      environments: ["development", "staging"]
    }
  },
  senior_developer: {
    name: "Senior Developer",
    description: "Desenvolvedor Sênior",
    permissions: [
      "workflow:read", "workflow:write", "workflow:execute",
      "credential:read", "credential:write",
      "execution:read", "execution:write"
    ],
    restrictions: {
      environments: ["development"]
    }
  },
  junior_developer: {
    name: "Junior Developer",
    description: "Desenvolvedor Júnior",
    permissions: [
      "workflow:read", "workflow:write",
      "credential:read",
      "execution:read"
    ],
    restrictions: {
      environments: ["development"],
      requireApproval: true
    }
  },
  
  // Operações
  operations_manager: {
    name: "Operations Manager",
    description: "Gerente de Operações",
    permissions: [
      "workflow:read", "workflow:write", "workflow:execute",
      "credential:read",
      "execution:read", "execution:write"
    ],
    restrictions: {
      environments: ["staging", "production"]
    }
  },
  operations_analyst: {
    name: "Operations Analyst",
    description: "Analista de Operações",
    permissions: [
      "workflow:read", "workflow:execute",
      "credential:read",
      "execution:read"
    ],
    restrictions: {
      environments: ["production"]
    }
  }
};
```

---

##  Checklist de Implementação

###  Configuração Inicial

- [ ] Roles padrão configuradas
- [ ] Roles customizados criados
- [ ] Usuários atribuídos às roles
- [ ] Permissões granulares definidas
- [ ] Restrições de acesso configuradas

###  Segurança

- [ ] Princípio do menor privilégio aplicado
- [ ] Auditoria ativada
- [ ] Alertas configurados
- [ ] Logs de acesso ativados
- [ ] Backup de configurações

###  Monitoramento

- [ ] Métricas de acesso coletadas
- [ ] Relatórios de auditoria gerados
- [ ] Alertas funcionando
- [ ] Dashboard de monitoramento
- [ ] Revisão regular de permissões

###  Documentação

- [ ] Política de acesso documentada
- [ ] Procedimentos de onboarding
- [ ] Procedimentos de offboarding
- [ ] Matriz de responsabilidades
- [ ] Plano de continuidade

---

##  Próximos Passos

Agora que você configurou usuários e permissões:

1. **[Backup e Recovery](./backup-recovery)** - Implemente estratégias de backup
2. **[Monitoramento](./monitoring)** - Configure alertas e métricas
3. **[Autenticação](./autenticacao)** - Configure métodos de login seguros

---

:::tip **Dica Pro**
Implemente o princípio do menor privilégio: dê apenas as permissões necessárias para cada usuário realizar suas funções.
:::

:::warning **Importante**
Revise regularmente as permissões dos usuários e mantenha logs de auditoria por pelo menos 90 dias para compliance.
:::

:::info **Recurso Adicional**
Considere implementar um sistema de aprovação para mudanças de permissões críticas e acesso a dados sensíveis.
:::

---

** Links úteis:**
-  [Documentação oficial n8n](https://docs.n8n.io/)
-  [Gerenciamento de Usuários](https://docs.n8n.io/hosting/user-management/)
-  [Segurança n8n](https://docs.n8n.io/hosting/security/)
