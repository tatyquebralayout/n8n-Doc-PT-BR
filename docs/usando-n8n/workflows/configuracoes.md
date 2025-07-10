# Configurações de Workflow

As configurações de workflow permitem personalizar o comportamento, performance e aparência dos seus workflows no n8n. Esta seção aborda todas as opções de configuração disponíveis para otimizar seus workflows.

## Visão Geral

As configurações de workflow oferecem controle granular sobre como seus workflows funcionam, incluindo:

- **Configurações de execução** e performance
- **Configurações de dados** e mapeamento
- **Configurações de interface** e visualização
- **Configurações de segurança** e permissões
- **Configurações de notificação** e alertas

## Acessando as Configurações

### Interface Web

Para acessar as configurações de um workflow:

1. **Abra o workflow** no editor
2. **Clique no ícone de configurações** (⚙️) no canto superior direito
3. **Selecione "Workflow Settings"** no menu

### Configurações Globais

Algumas configurações podem ser definidas globalmente:

```bash
# Configurações de ambiente
export N8N_WORKFLOW_TIMEOUT=3600000
export N8N_WORKFLOW_MAX_EXECUTIONS=1000
export N8N_WORKFLOW_SAVE_DATA_EXECUTION=true
export N8N_WORKFLOW_SAVE_DATA_EXECUTION_ALL=false
```

## Configurações de Execução

### Timeout de Execução

Defina o tempo máximo que um workflow pode executar:

```javascript
// Configurar timeout no workflow
{
  "settings": {
    "executionTimeout": 3600000, // 1 hora em milissegundos
    "executionTimeoutWarning": 3000000 // Aviso 5 minutos antes
  }
}
```

### Limite de Execuções

Configure limites para evitar sobrecarga:

```javascript
// Configurar limites de execução
{
  "settings": {
    "maxExecutions": 1000, // Máximo de execuções por dia
    "maxExecutionsPerMinute": 10, // Limite por minuto
    "retryOnFail": true, // Tentar novamente em caso de falha
    "maxRetries": 3 // Número máximo de tentativas
  }
}
```

### Configurações de Performance

Otimize a performance do workflow:

```javascript
// Configurações de performance
{
  "settings": {
    "saveExecutionProgress": true, // Salvar progresso
    "saveDataOnSuccess": true, // Salvar dados de sucesso
    "saveDataOnError": true, // Salvar dados de erro
    "saveManualExecutions": true, // Salvar execuções manuais
    "saveDataS3": false, // Salvar dados no S3
    "saveDataS3Bucket": "n8n-executions",
    "saveDataS3Region": "us-east-1"
  }
}
```

## Configurações de Dados

### Mapeamento de Dados

Configure como os dados são processados:

```javascript
// Configurações de mapeamento
{
  "settings": {
    "dataMapping": {
      "includeEmptyFields": false, // Incluir campos vazios
      "includeNullValues": false, // Incluir valores nulos
      "maxDataSize": 1048576, // Tamanho máximo de dados (1MB)
      "compressData": true, // Comprimir dados
      "encryptSensitiveData": true // Criptografar dados sensíveis
    }
  }
}
```

### Validação de Dados

Configure validações automáticas:

```javascript
// Configurações de validação
{
  "settings": {
    "validation": {
      "validateInputData": true, // Validar dados de entrada
      "validateOutputData": true, // Validar dados de saída
      "strictMode": false, // Modo estrito
      "customValidators": [
        {
          "field": "email",
          "validator": "email",
          "required": true
        },
        {
          "field": "cpf",
          "validator": "cpf",
          "required": true
        }
      ]
    }
  }
}
```

### Cache de Dados

Configure cache para melhorar performance:

```javascript
// Configurações de cache
{
  "settings": {
    "cache": {
      "enabled": true, // Habilitar cache
      "ttl": 3600000, // Time to live (1 hora)
      "maxSize": 100, // Máximo de itens em cache
      "persistent": false, // Cache persistente
      "cacheDirectory": "/tmp/n8n-cache"
    }
  }
}
```

## Configurações de Interface

### Visualização do Workflow

Personalize a aparência do workflow:

```javascript
// Configurações de visualização
{
  "settings": {
    "ui": {
      "showNodeDetails": true, // Mostrar detalhes dos nodes
      "showExecutionData": true, // Mostrar dados de execução
      "showNodeStatus": true, // Mostrar status dos nodes
      "autoLayout": true, // Layout automático
      "compactMode": false, // Modo compacto
      "theme": "light", // Tema (light/dark)
      "zoomLevel": 100 // Nível de zoom
    }
  }
}
```

### Configurações de Navegação

Configure a navegação no editor:

```javascript
// Configurações de navegação
{
  "settings": {
    "navigation": {
      "enableKeyboardShortcuts": true, // Atalhos de teclado
      "enableMouseGestures": true, // Gestos do mouse
      "enableAutoSave": true, // Salvamento automático
      "autoSaveInterval": 30000, // Intervalo de salvamento (30s)
      "showUnsavedChangesWarning": true // Aviso de mudanças não salvas
    }
  }
}
```

## Configurações de Segurança

### Controle de Acesso

Configure permissões e acesso:

```javascript
// Configurações de segurança
{
  "settings": {
    "security": {
      "requireAuthentication": true, // Requer autenticação
      "allowedUsers": ["admin", "editor"], // Usuários permitidos
      "allowedRoles": ["owner", "admin"], // Roles permitidas
      "restrictExecution": false, // Restringir execução
      "auditLog": true, // Log de auditoria
      "encryptCredentials": true // Criptografar credenciais
    }
  }
}
```

### Configurações de Rede

Configure acesso de rede:

```javascript
// Configurações de rede
{
  "settings": {
    "network": {
      "allowedHosts": ["api.exemplo.com", "webhook.exemplo.com"],
      "blockedHosts": ["malicious-site.com"],
      "proxyEnabled": false,
      "proxyUrl": "http://proxy:8080",
      "timeout": 30000, // Timeout de rede (30s)
      "retryOnNetworkError": true
    }
  }
}
```

## Configurações de Notificação

### Alertas e Notificações

Configure notificações automáticas:

```javascript
// Configurações de notificação
{
  "settings": {
    "notifications": {
      "onSuccess": {
        "enabled": true,
        "channels": ["email", "slack"],
        "recipients": ["admin@empresa.com"]
      },
      "onError": {
        "enabled": true,
        "channels": ["email", "slack", "sms"],
        "recipients": ["admin@empresa.com", "dev@empresa.com"]
      },
      "onTimeout": {
        "enabled": true,
        "channels": ["email"],
        "recipients": ["admin@empresa.com"]
      }
    }
  }
}
```

### Configurações de Email

Configure notificações por email:

```javascript
// Configurações de email
{
  "settings": {
    "email": {
      "smtp": {
        "host": "smtp.gmail.com",
        "port": 587,
        "secure": true,
        "auth": {
          "user": "n8n@empresa.com",
          "pass": "senha-segura"
        }
      },
      "from": "n8n@empresa.com",
      "replyTo": "suporte@empresa.com",
      "template": {
        "success": "Workflow executado com sucesso",
        "error": "Erro na execução do workflow",
        "timeout": "Workflow excedeu o tempo limite"
      }
    }
  }
}
```

## Configurações de Monitoramento

### Métricas e Analytics

Configure coleta de métricas:

```javascript
// Configurações de monitoramento
{
  "settings": {
    "monitoring": {
      "enabled": true,
      "metrics": {
        "executionTime": true,
        "successRate": true,
        "errorRate": true,
        "dataVolume": true,
        "resourceUsage": true
      },
      "alerts": {
        "highErrorRate": {
          "threshold": 0.1, // 10% de erro
          "action": "notify"
        },
        "slowExecution": {
          "threshold": 300000, // 5 minutos
          "action": "notify"
        }
      }
    }
  }
}
```

### Logs e Debugging

Configure logs detalhados:

```javascript
// Configurações de logs
{
  "settings": {
    "logging": {
      "level": "info", // debug, info, warn, error
      "includeExecutionData": true,
      "includeNodeData": true,
      "includeTimestamps": true,
      "logToFile": true,
      "logFile": "/var/log/n8n/workflow.log",
      "maxLogSize": 10485760, // 10MB
      "maxLogFiles": 5
    }
  }
}
```

## Configurações Avançadas

### Configurações de Banco de Dados

Configure persistência de dados:

```javascript
// Configurações de banco de dados
{
  "settings": {
    "database": {
      "type": "postgresql", // postgresql, mysql, sqlite
      "host": "localhost",
      "port": 5432,
      "database": "n8n",
      "username": "n8n_user",
      "password": "senha-segura",
      "ssl": true,
      "pool": {
        "min": 2,
        "max": 10,
        "acquireTimeoutMillis": 30000,
        "createTimeoutMillis": 30000,
        "destroyTimeoutMillis": 5000,
        "idleTimeoutMillis": 30000,
        "reapIntervalMillis": 1000,
        "createRetryIntervalMillis": 200
      }
    }
  }
}
```

### Configurações de Filas

Configure processamento em fila:

```javascript
// Configurações de fila
{
  "settings": {
    "queue": {
      "enabled": true,
      "type": "redis", // redis, bull, bee-queue
      "redis": {
        "host": "localhost",
        "port": 6379,
        "password": "senha-redis",
        "db": 0
      },
      "concurrency": 5, // Execuções simultâneas
      "retryAttempts": 3,
      "retryDelay": 5000
    }
  }
}
```

## Configurações Específicas para Brasil

### Configurações de LGPD

Configure conformidade com LGPD:

```javascript
// Configurações de LGPD
{
  "settings": {
    "lgpd": {
      "enabled": true,
      "dataRetention": {
        "executionData": 90, // Dias para reter dados
        "logs": 365, // Dias para reter logs
        "userData": 730 // Dias para reter dados de usuário
      },
      "dataMasking": {
        "enabled": true,
        "fields": ["cpf", "cnpj", "email", "telefone"],
        "maskPattern": "***"
      },
      "consentTracking": {
        "enabled": true,
        "requireConsent": true,
        "consentExpiry": 365 // Dias para expirar consentimento
      }
    }
  }
}
```

### Configurações de Moeda

Configure para Real brasileiro:

```javascript
// Configurações de moeda
{
  "settings": {
    "currency": {
      "default": "BRL",
      "format": {
        "symbol": "R$",
        "position": "before",
        "decimal": ",",
        "thousands": ".",
        "precision": 2
      },
      "exchangeRates": {
        "enabled": true,
        "api": "https://api.exchangerate-api.com/v4/latest/BRL",
        "updateInterval": 3600000 // 1 hora
      }
    }
  }
}
```

## Aplicando Configurações

### Via Interface

1. **Abra as configurações** do workflow
2. **Navegue pelas abas** de configuração
3. **Modifique os valores** conforme necessário
4. **Clique em "Save"** para aplicar

### Via API

```javascript
// Atualizar configurações via API
const atualizarConfiguracoes = async (workflowId, configuracoes) => {
  const response = await fetch(`/api/v1/workflows/${workflowId}/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify(configuracoes)
  });
  
  return response.json();
};

// Exemplo de uso
const configuracoes = {
  executionTimeout: 1800000,
  saveExecutionProgress: true,
  notifications: {
    onError: {
      enabled: true,
      channels: ['email'],
      recipients: ['admin@empresa.com']
    }
  }
};

await atualizarConfiguracoes('workflow-123', configuracoes);
```

### Via Variáveis de Ambiente

```bash
# Configurações globais via ambiente
export N8N_WORKFLOW_DEFAULT_TIMEOUT=1800000
export N8N_WORKFLOW_SAVE_EXECUTION_PROGRESS=true
export N8N_WORKFLOW_NOTIFICATIONS_ON_ERROR=true
export N8N_WORKFLOW_NOTIFICATIONS_EMAIL=admin@empresa.com
```

## Boas Práticas

### Configurações de Performance

- **Configure timeouts adequados** para evitar travamentos
- **Use cache** para dados frequentemente acessados
- **Limite execuções simultâneas** para evitar sobrecarga
- **Monitore uso de recursos** regularmente

### Configurações de Segurança

- **Habilite autenticação** sempre que possível
- **Criptografe dados sensíveis** automaticamente
- **Configure logs de auditoria** para compliance
- **Restrinja acesso** por usuário e role

### Configurações de Monitoramento

- **Configure alertas proativos** para problemas
- **Monitore métricas importantes** como tempo de execução
- **Configure logs detalhados** para debugging
- **Implemente dashboards** de monitoramento

## Troubleshooting

### Problemas Comuns

**Workflow não executa:**
- Verificar configurações de timeout
- Verificar permissões de usuário
- Verificar configurações de rede

**Performance lenta:**
- Ajustar configurações de cache
- Reduzir execuções simultâneas
- Otimizar configurações de banco de dados

**Notificações não funcionam:**
- Verificar configurações de email/SMTP
- Verificar configurações de webhook
- Verificar permissões de API

## Recursos Adicionais

### Documentação Oficial
- [Workflow Settings](https://docs.n8n.io/workflows/settings/)
- [Configuration Options](https://docs.n8n.io/hosting/configuration/)

### Ferramentas Relacionadas
- **n8n CLI**: Configuração via linha de comando
- **n8n API**: Configuração programática
- **n8n Docker**: Configuração via variáveis de ambiente

---

**Próximo**: [Compartilhamento de Workflows](./compartilhamento) - Compartilhe workflows com sua equipe 