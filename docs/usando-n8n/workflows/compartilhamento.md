# Compartilhamento de Workflows

O compartilhamento de workflows permite colaborar com sua equipe, distribuir automações e reutilizar soluções. Esta seção aborda todas as formas de compartilhar workflows no n8n de forma segura e eficiente.

## Visão Geral

O compartilhamento de workflows oferece múltiplas opções para colaboração:

- **Compartilhamento interno** com membros da equipe
- **Compartilhamento público** via templates
- **Exportação/importação** de workflows
- **Versionamento** e controle de mudanças
- **Compartilhamento seguro** com controle de acesso

## Tipos de Compartilhamento

### Compartilhamento Interno

Compartilhe workflows com membros da sua organização:

```javascript\n// Compartilhar workflow com usuários específicos\nconst compartilharWorkflow = async (workflowId, usuarios, permissoes) => {\n  const response = await fetch(`/api/v1/workflows/${workflowId}/share`, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'Authorization': 'Bearer YOUR_API_KEY'\n    },\n    body: JSON.stringify({\n      users: usuarios,\n      permissions: permissoes,\n      message: 'Workflow compartilhado para colaboração'\n    })\n  });\n  \n  return response.json();\n};\n\n// Exemplo de uso\nconst usuarios = ['joao@empresa.com', 'maria@empresa.com'];\nconst permissoes = ['read', 'execute'];\n\nawait compartilharWorkflow('workflow-123', usuarios, permissoes);\n```\n\n### Compartilhamento por Role\n\nCompartilhe baseado em funções organizacionais:\n\n```javascript\n// Compartilhar com roles específicas\nconst compartilharPorRole = async (workflowId, roles, permissoes) => {\n  const response = await fetch(`/api/v1/workflows/${workflowId}/share/roles`, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'Authorization': 'Bearer YOUR_API_KEY'\n    },\n    body: JSON.stringify({\n      roles: roles,\n      permissions: permissoes,\n      inheritPermissions: true // Herdar permissões da role\n    })\n  });\n  \n  return response.json();\n};\n\n// Exemplo: Compartilhar com equipe de desenvolvimento\nawait compartilharPorRole('workflow-123', ['developer', 'admin'], ['read', 'write', 'execute']);\n```\n\n### Compartilhamento Público\n\nCrie templates públicos para a comunidade:\n\n```javascript\n// Publicar workflow como template\nconst publicarTemplate = async (workflowId, metadata) => {\n  const response = await fetch(`/api/v1/workflows/${workflowId}/publish`, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'Authorization': 'Bearer YOUR_API_KEY'\n    },\n    body: JSON.stringify({\n      public: true,\n      template: true,\n      metadata: {\n        name: metadata.nome,\n        description: metadata.descricao,\n        category: metadata.categoria,\n        tags: metadata.tags,\n        version: metadata.versao,\n        author: metadata.autor,\n        license: metadata.licenca\n      }\n    })\n  });\n  \n  return response.json();\n};\n\n// Exemplo: Publicar template de automação de vendas\nconst metadata = {\n  nome: 'Automação de Vendas - CRM',\n  descricao: 'Workflow para automatizar processo de vendas com integração CRM',\n  categoria: 'Vendas',\n  tags: ['crm', 'vendas', 'automação', 'brasil'],\n  versao: '1.0.0',\n  autor: 'Equipe n8n Brasil',\n  licenca: 'MIT'\n};\n\nawait publicarTemplate('workflow-123', metadata);\n```\n\n## Permissões de Compartilhamento\n\n### Níveis de Permissão\n\nDefina diferentes níveis de acesso:\n\n```javascript\n// Configurar permissões granulares\nconst configurarPermissoes = {\n  // Permissões básicas\n  read: {\n    description: 'Visualizar workflow',\n    actions: ['view', 'export']\n  },\n  \n  // Permissões de execução\n  execute: {\n    description: 'Executar workflow',\n    actions: ['run', 'test', 'debug']\n  },\n  \n  // Permissões de edição\n  write: {\n    description: 'Editar workflow',\n    actions: ['edit', 'save', 'duplicate']\n  },\n  \n  // Permissões administrativas\n  admin: {\n    description: 'Administrar workflow',\n    actions: ['share', 'delete', 'configure', 'permissions']\n  }\n};\n\n// Aplicar permissões\nconst aplicarPermissoes = async (workflowId, usuario, permissoes) => {\n  const response = await fetch(`/api/v1/workflows/${workflowId}/permissions`, {\n    method: 'PUT',\n    headers: {\n      'Content-Type': 'application/json',\n      'Authorization': 'Bearer YOUR_API_KEY'\n    },\n    body: JSON.stringify({\n      user: usuario,\n      permissions: permissoes,\n      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias\n    })\n  });\n  \n  return response.json();\n};\n```\n\n### Controle de Acesso Temporal\n\nConfigure permissões com prazo de validade:\n\n```javascript\n// Compartilhamento temporário\nconst compartilhamentoTemporal = async (workflowId, usuarios, duracao) => {\n  const expiracao = new Date(Date.now() + duracao * 60 * 60 * 1000); // duracao em horas\n  \n  const response = await fetch(`/api/v1/workflows/${workflowId}/share/temporary`, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'Authorization': 'Bearer YOUR_API_KEY'\n    },\n    body: JSON.stringify({\n      users: usuarios,\n      permissions: ['read', 'execute'],\n      expiresAt: expiracao,\n      notifyExpiration: true\n    })\n  });\n  \n  return response.json();\n};\n\n// Exemplo: Compartilhar por 24 horas\nawait compartilhamentoTemporal('workflow-123', ['consultor@empresa.com'], 24);\n```\n\n## Compartilhamento Seguro\n\n### Criptografia de Dados Sensíveis\n\nProteja informações confidenciais:\n\n```javascript\n// Configurar criptografia para compartilhamento\nconst configurarCriptografia = {\n  enabled: true,\n  algorithm: 'AES-256-GCM',\n  keyRotation: {\n    enabled: true,\n    interval: 30, // dias\n    autoRotate: true\n  },\n  sensitiveFields: [\n    'api_key',\n    'password',\n    'token',\n    'secret',\n    'cpf',\n    'cnpj'\n  ]\n};\n\n// Criptografar workflow antes do compartilhamento\nconst criptografarWorkflow = async (workflowId, chavePublica) => {\n  const workflow = await buscarWorkflow(workflowId);\n  \n  // Criptografar credenciais sensíveis\n  const workflowCriptografado = {\n    ...workflow,\n    nodes: workflow.nodes.map(node => {\n      if (node.credentials) {\n        return {\n          ...node,\n          credentials: criptografarCredenciais(node.credentials, chavePublica)\n        };\n      }\n      return node;\n    })\n  };\n  \n  return workflowCriptografado;\n};\n```\n\n### Assinatura Digital\n\nVerifique a autenticidade dos workflows:\n\n```javascript\n// Assinar workflow digitalmente\nconst assinarWorkflow = async (workflowId, chavePrivada) => {\n  const workflow = await buscarWorkflow(workflowId);\n  const hash = await gerarHash(JSON.stringify(workflow));\n  const assinatura = await assinarHash(hash, chavePrivada);\n  \n  return {\n    workflow: workflow,\n    signature: assinatura,\n    timestamp: new Date().toISOString(),\n    author: 'autor@empresa.com'\n  };\n};\n\n// Verificar assinatura\nconst verificarAssinatura = async (workflowAssinado, chavePublica) => {\n  const hash = await gerarHash(JSON.stringify(workflowAssinado.workflow));\n  const valido = await verificarHash(hash, workflowAssinado.signature, chavePublica);\n  \n  return {\n    valid: valido,\n    timestamp: workflowAssinado.timestamp,\n    author: workflowAssinado.author\n  };\n};\n```\n\n## Templates e Bibliotecas\n\n### Biblioteca de Templates\n\nOrganize templates por categoria:\n\n```javascript\n// Criar biblioteca de templates\nconst bibliotecaTemplates = {\n  vendas: {\n    nome: 'Automações de Vendas',\n    descricao: 'Templates para automação de processos de vendas',\n    templates: [\n      {\n        id: 'vendas-lead-scoring',\n        nome: 'Lead Scoring Automático',\n        descricao: 'Classifica leads automaticamente baseado em comportamento',\n        tags: ['vendas', 'lead', 'scoring', 'crm'],\n        versao: '1.2.0',\n        downloads: 1250\n      },\n      {\n        id: 'vendas-follow-up',\n        nome: 'Follow-up Automático',\n        descricao: 'Automatiza follow-up com prospects',\n        tags: ['vendas', 'follow-up', 'email', 'automação'],\n        versao: '1.1.0',\n        downloads: 890\n      }\n    ]\n  },\n  \n  financeiro: {\n    nome: 'Automações Financeiras',\n    descricao: 'Templates para processos financeiros',\n    templates: [\n      {\n        id: 'financeiro-conciliacao',\n        nome: 'Conciliação Bancária',\n        descricao: 'Automatiza conciliação bancária',\n        tags: ['financeiro', 'banco', 'conciliação', 'contabilidade'],\n        versao: '1.0.0',\n        downloads: 567\n      }\n    ]\n  }\n};\n```\n\n### Marketplace de Templates\n\nCrie um marketplace para a comunidade:\n\n```javascript\n// Configurar marketplace\nconst marketplaceConfig = {\n  name: 'n8n Brasil Marketplace',\n  description: 'Marketplace de templates para automação',\n  categories: [\n    'Vendas',\n    'Marketing',\n    'Financeiro',\n    'RH',\n    'Suporte',\n    'E-commerce',\n    'Integrações BR'\n  ],\n  \n  // Sistema de avaliação\n  rating: {\n    enabled: true,\n    minRating: 1,\n    maxRating: 5,\n    requireReview: true\n  },\n  \n  // Sistema de downloads\n  downloads: {\n    trackDownloads: true,\n    requireAuth: false,\n    limitPerUser: 100\n  },\n  \n  // Sistema de monetização\n  monetization: {\n    enabled: false,\n    currency: 'BRL',\n    paymentMethods: ['pix', 'cartao', 'boleto']\n  }\n};\n```\n\n## Colaboração em Tempo Real\n\n### Edição Colaborativa\n\nTrabalhe em equipe no mesmo workflow:\n\n```javascript\n// Configurar edição colaborativa\nconst configuracaoColaborativa = {\n  enabled: true,\n  maxCollaborators: 10,\n  conflictResolution: 'manual', // manual, auto, prompt\n  \n  // Controle de versões\n  versioning: {\n    enabled: true,\n    autoSave: true,\n    saveInterval: 30000, // 30 segundos\n    maxVersions: 50\n  },\n  \n  // Comentários e feedback\n  comments: {\n    enabled: true,\n    allowAttachments: true,\n    notifyMentions: true\n  },\n  \n  // Histórico de mudanças\n  changeTracking: {\n    enabled: true,\n    trackUser: true,\n    trackTimestamp: true,\n    trackChanges: true\n  }\n};\n\n// Adicionar comentário ao workflow\nconst adicionarComentario = async (workflowId, comentario) => {\n  const response = await fetch(`/api/v1/workflows/${workflowId}/comments`, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'Authorization': 'Bearer YOUR_API_KEY'\n    },\n    body: JSON.stringify({\n      text: comentario.texto,\n      nodeId: comentario.nodeId,\n      position: comentario.posicao,\n      mentions: comentario.mentions\n    })\n  });\n  \n  return response.json();\n};\n```\n\n### Notificações de Colaboração\n\nMantenha a equipe informada:\n\n```javascript\n// Configurar notificações de colaboração\nconst notificacoesColaboracao = {\n  onShare: {\n    enabled: true,\n    channels: ['email', 'slack'],\n    template: 'Workflow compartilhado com você por {{author}}'\n  },\n  \n  onComment: {\n    enabled: true,\n    channels: ['email', 'slack'],\n    template: 'Novo comentário no workflow {{workflowName}}'\n  },\n  \n  onEdit: {\n    enabled: true,\n    channels: ['slack'],\n    template: 'Workflow {{workflowName}} foi editado por {{user}}'\n  },\n  \n  onPublish: {\n    enabled: true,\n    channels: ['email', 'slack', 'teams'],\n    template: 'Novo template publicado: {{templateName}}'\n  }\n};\n```\n\n## Compartilhamento Específico para Brasil\n\n### Templates Brasileiros\n\nCrie templates específicos para o mercado brasileiro:\n\n```javascript\n// Templates específicos do Brasil\nconst templatesBrasil = {\n  nfe: {\n    nome: 'Automação NFe',\n    descricao: 'Automatiza emissão e envio de NFes',\n    integracoes: ['sefaz', 'email', 'whatsapp'],\n    campos: ['cnpj', 'inscricao_estadual', 'cfop', 'icms']\n  },\n  \n  pix: {\n    nome: 'Automação PIX',\n    descricao: 'Processa pagamentos PIX automaticamente',\n    integracoes: ['banco_central', 'webhook', 'email'],\n    campos: ['chave_pix', 'valor', 'descricao', 'beneficiario']\n  },\n  \n  lgpd: {\n    nome: 'Compliance LGPD',\n    descricao: 'Automatiza processos de conformidade LGPD',\n    integracoes: ['database', 'email', 'api'],\n    campos: ['consentimento', 'finalidade', 'retencao', 'exclusao']\n  },\n  \n  serasa: {\n    nome: 'Consulta Serasa',\n    descricao: 'Consulta dados de crédito no Serasa',\n    integracoes: ['serasa_api', 'crm', 'email'],\n    campos: ['cpf', 'cnpj', 'score', 'restricoes']\n  }\n};\n```\n\n### Integrações Brasileiras\n\nCompartilhe workflows com integrações locais:\n\n```javascript\n// Workflows com integrações brasileiras\nconst integracoesBrasil = {\n  receita: {\n    nome: 'Consulta Receita Federal',\n    descricao: 'Consulta dados de empresas na Receita',\n    api: 'https://receitaws.com.br/v1/cnpj/',\n    campos: ['cnpj', 'razao_social', 'situacao', 'endereco']\n  },\n  \n  viacep: {\n    nome: 'Consulta ViaCEP',\n    descricao: 'Consulta endereços pelo CEP',\n    api: 'https://viacep.com.br/ws/',\n    campos: ['cep', 'logradouro', 'bairro', 'cidade', 'estado']\n  },\n  \n  correios: {\n    nome: 'Rastreamento Correios',\n    descricao: 'Rastreia encomendas dos Correios',\n    api: 'https://rastreamento.correios.com.br/app/index.php',\n    campos: ['codigo_rastreio', 'status', 'historico', 'prazo']\n  }\n};\n```\n\n## Workflows de Compartilhamento\n\n### Workflow: Aprovação de Compartilhamento\n\n```mermaid\ngraph TD\n    A[Manual Trigger: Solicitar Compartilhamento] --> B[Code: Validar Permissões]\n    B --> C[Decision: Usuário Autorizado?]\n    C -->|Sim| D[Code: Notificar Aprovador]\n    C -->|Não| E[Send Email: Acesso Negado]\n    D --> F[Wait: Aprovação Manual]\n    F --> G[Decision: Aprovado?]\n    G -->|Sim| H[Code: Compartilhar Workflow]\n    G -->|Não| I[Send Email: Compartilhamento Negado]\n    H --> J[Send Notification: Workflow Compartilhado]\n```\n\n### Workflow: Distribuição de Templates\n\n```mermaid\ngraph TD\n    A[Schedule Trigger: Verificar Novos Templates] --> B[Code: Validar Qualidade]\n    B --> C[Code: Categorizar Template]\n    C --> D[Code: Gerar Preview]\n    D --> E[HTTP Request: Publicar no Marketplace]\n    E --> F[Code: Notificar Comunidade]\n    F --> G[Send Email: Newsletter]\n```

## Boas Práticas

### Segurança

- **Sempre valide permissões** antes de compartilhar
- **Use criptografia** para dados sensíveis
- **Implemente auditoria** de compartilhamentos
- **Configure expiração** para acessos temporários

### Colaboração

- **Documente workflows** antes de compartilhar
- **Use comentários** para explicar lógica complexa
- **Mantenha versionamento** de mudanças
- **Notifique mudanças** importantes

### Organização

- **Categorize templates** adequadamente
- **Use tags descritivas** para facilitar busca
- **Mantenha biblioteca atualizada** regularmente
- **Solicite feedback** dos usuários

## Troubleshooting

### Problemas Comuns

**Workflow não compartilhado:**

- Verificar permissões do usuário
- Verificar configurações de rede
- Verificar tamanho do workflow

**Permissões não aplicadas:**

- Verificar configurações de role
- Verificar herança de permissões
- Verificar expiração de acesso

**Template não publicado:**

- Verificar metadados obrigatórios
- Verificar validação de qualidade
- Verificar configurações de marketplace

## Recursos Adicionais

### Documentação Oficial

- [Workflow Sharing](https://docs.n8n.io/workflows/sharing/)
- [Templates](https://docs.n8n.io/workflows/templates/)

### Ferramentas Relacionadas

- **n8n Templates**: Biblioteca oficial de templates
- **GitHub**: Versionamento de workflows
- **Slack**: Notificações de colaboração

---

**Próximo**: [Exportação e Importação](./export-import) - Mova workflows entre ambientes
