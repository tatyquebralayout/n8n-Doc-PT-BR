# Melhores Práticas de Segurança

Esta seção apresenta as melhores práticas de segurança para proteger seus workflows, dados e infraestrutura no n8n, com foco especial no contexto brasileiro e conformidade com LGPD.

## Visão Geral

A segurança no n8n é uma responsabilidade compartilhada. Enquanto o n8n fornece uma plataforma segura, você também deve implementar práticas adequadas para proteger seus dados e workflows.

## Princípios de Segurança

### Princípios Fundamentais

```javascript
// Princípios de segurança implementados
const principiosSeguranca = {
  // Defesa em profundidade
  defesaProfundidade: {
    descricao: 'Múltiplas camadas de proteção',
    implementacao: [
      'Criptografia em múltiplos níveis',
      'Controle de acesso granular',
      'Monitoramento contínuo',
      'Backup e recuperação'
    ]
  },
  
  // Princípio do menor privilégio
  menorPrivilegio: {
    descricao: 'Acesso mínimo necessário para cada função',
    implementacao: [
      'Roles específicas por função',
      'Permissões granulares',
      'Revisão regular de acessos',
      'Revogação automática de privilégios'
    ]
  },
  
  // Segurança por design
  segurancaDesign: {
    descricao: 'Segurança integrada desde o início',
    implementacao: [
      'Revisão de segurança no desenvolvimento',
      'Testes de penetração regulares',
      'Análise de vulnerabilidades',
      'Configurações seguras por padrão'
    ]
  },
  
  // Transparência
  transparencia: {
    descricao: 'Visibilidade completa das práticas de segurança',
    implementacao: [
      'Política de segurança pública',
      'Relatórios de conformidade',
      'Divulgação responsável de vulnerabilidades',
      'Comunicação proativa de incidentes'
    ]
  }
};
```

## Autenticação e Controle de Acesso

### Autenticação Forte

```javascript
// Configurações de autenticação
const autenticacao = {
  // Múltiplos fatores (MFA)
  mfa: {
    habilitado: true,
    metodos: [
      'Aplicativo autenticador (TOTP)',
      'SMS (para backup)',
      'Email (para backup)',
      'Chaves de segurança (FIDO2)'
    ],
    obrigatorio: 'Para todos os usuários',
    excecoes: 'Apenas para contas de emergência'
  },
  
  // Política de senhas
  senhas: {
    comprimento: 'Mínimo 12 caracteres',
    complexidade: [
      'Letras maiúsculas e minúsculas',
      'Números',
      'Caracteres especiais',
      'Sem palavras comuns'
    ],
    expiracao: '90 dias',
    historico: 'Últimas 5 senhas não podem ser reutilizadas'
  },
  
  // Gerenciamento de sessão
  sessao: {
    timeout: '30 minutos de inatividade',
    maxSessoes: '3 sessões simultâneas por usuário',
    logout: 'Logout automático ao fechar navegador',
    renovacao: 'Renovação automática de tokens'
  }
};

// Implementação de MFA
const implementarMFA = async (usuarioId) => {
  const configuracaoMFA = {
    usuarioId: usuarioId,
    metodo: 'totp', // Time-based One-Time Password
    secret: gerarSecret(),
    backupCodes: gerarBackupCodes(),
    habilitado: true
  };
  
  // Salvar configuração
  await salvarConfiguracaoMFA(configuracaoMFA);
  
  // Enviar instruções de configuração
  await enviarInstrucoesMFA(usuarioId, configuracaoMFA);
  
  return configuracaoMFA;
};
```

### Controle de Acesso Baseado em Roles (RBAC)

```javascript
// Estrutura de roles e permissões
const rbac = {
  // Roles principais
  roles: {
    // Administrador
    admin: {
      descricao: 'Acesso completo ao sistema',
      permissoes: [
        'gerenciar_usuarios',
        'gerenciar_workflows',
        'configurar_sistema',
        'visualizar_logs',
        'gerenciar_credenciais'
      ],
      limitacoes: 'Apenas para equipe técnica'
    },
    
    // Gerente
    gerente: {
      descricao: 'Gerenciamento de workflows e usuários',
      permissoes: [
        'criar_workflows',
        'editar_workflows',
        'executar_workflows',
        'gerenciar_usuarios_equipe',
        'visualizar_relatorios'
      ],
      limitacoes: 'Apenas workflows da equipe'
    },
    
    // Desenvolvedor
    desenvolvedor: {
      descricao: 'Desenvolvimento e manutenção de workflows',
      permissoes: [
        'criar_workflows',
        'editar_workflows',
        'testar_workflows',
        'visualizar_logs_execucao'
      ],
      limitacoes: 'Apenas workflows próprios'
    },
    
    // Usuário
    usuario: {
      descricao: 'Uso básico de workflows',
      permissoes: [
        'executar_workflows',
        'visualizar_workflows_publicos',
        'gerenciar_perfil'
      ],
      limitacoes: 'Apenas workflows compartilhados'
    }
  },
  
  // Implementação de RBAC
  implementacao: {
    verificacao: 'Verificação em cada ação',
    cache: 'Cache de permissões para performance',
    auditoria: 'Log de todas as verificações',
    revisao: 'Revisão mensal de permissões'
  }
};

// Verificar permissão
const verificarPermissao = async (usuarioId, acao, recurso) => {
  const usuario = await buscarUsuario(usuarioId);
  const role = await buscarRole(usuario.roleId);
  
  // Verificar se a role tem a permissão
  const temPermissao = role.permissoes.includes(acao);
  
  // Verificar acesso ao recurso específico
  const temAcessoRecurso = await verificarAcessoRecurso(usuarioId, recurso);
  
  // Log da verificação
  await logVerificacaoPermissao({
    usuarioId,
    acao,
    recurso,
    resultado: temPermissao && temAcessoRecurso,
    timestamp: new Date()
  });
  
  return temPermissao && temAcessoRecurso;
};
```

## Criptografia de Dados

### Criptografia em Repouso

```javascript
// Configurações de criptografia
const criptografia = {
  // Algoritmos
  algoritmos: {
    simetrica: 'AES-256-GCM',
    assimetrica: 'RSA-4096',
    hash: 'SHA-256',
    derivacao: 'PBKDF2 com 100.000 iterações'
  },
  
  // Criptografia de dados sensíveis
  dadosSensiveis: {
    credenciais: {
      algoritmo: 'AES-256-GCM',
      chave: 'Derivada de master key',
      iv: 'Único por credencial'
    },
    
    dadosPessoais: {
      algoritmo: 'AES-256-GCM',
      chave: 'Por usuário',
      campos: ['cpf', 'cnpj', 'email', 'telefone']
    },
    
    logs: {
      algoritmo: 'AES-256-GCM',
      chave: 'Por instância',
      rotacao: 'Mensal'
    }
  },
  
  // Gerenciamento de chaves
  gerenciamentoChaves: {
    armazenamento: 'HSM (Hardware Security Module)',
    rotacao: 'Automática a cada 90 dias',
    backup: 'Backup criptografado em local seguro',
    recuperacao: 'Processo de recuperação documentado'
  }
};

// Criptografar dados sensíveis
const criptografarDados = async (dados, tipo) => {
  const configuracao = criptografia.dadosSensiveis[tipo];
  const chave = await obterChave(tipo);
  const iv = gerarIV();
  
  const dadosCriptografados = {
    dados: await criptografar(dados, chave, iv),
    iv: iv,
    algoritmo: configuracao.algoritmo,
    timestamp: new Date().toISOString()
  };
  
  return dadosCriptografados;
};

// Descriptografar dados
const descriptografarDados = async (dadosCriptografados, tipo) => {
  const chave = await obterChave(tipo);
  
  return await descriptografar(
    dadosCriptografados.dados,
    chave,
    dadosCriptografados.iv
  );
};
```

### Criptografia em Trânsito

```javascript
// Configurações de criptografia em trânsito
const criptografiaTransito = {
  // TLS/SSL
  tls: {
    versao: 'TLS 1.3',
    cipherSuites: [
      'TLS_AES_256_GCM_SHA384',
      'TLS_CHACHA20_POLY1305_SHA256',
      'TLS_AES_128_GCM_SHA256'
    ],
    certificados: 'Certificados válidos e atualizados',
    ocsp: 'Verificação OCSP habilitada'
  },
  
  // Headers de segurança
  headers: {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': 'default-src \'self\'',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block'
  },
  
  // Verificação de certificados
  verificacao: {
    validade: 'Verificação automática de validade',
    revogacao: 'Verificação CRL e OCSP',
    cadeia: 'Verificação da cadeia de certificados',
    alertas: 'Alertas para certificados próximos do vencimento'
  }
};
```

## Monitoramento e Auditoria

### Logs de Segurança

```javascript
// Configuração de logs de segurança
const logsSeguranca = {
  // Eventos monitorados
  eventos: {
    autenticacao: [
      'login_sucesso',
      'login_falha',
      'logout',
      'mfa_configuracao',
      'senha_alterada'
    ],
    
    autorizacao: [
      'acesso_permitido',
      'acesso_negado',
      'privilegio_escalado',
      'privilegio_revogado'
    ],
    
    dados: [
      'dados_acessados',
      'dados_modificados',
      'dados_excluidos',
      'dados_exportados'
    ],
    
    sistema: [
      'configuracao_alterada',
      'backup_realizado',
      'vulnerabilidade_detectada',
      'incidente_seguranca'
    ]
  },
  
  // Formato dos logs
  formato: {
    timestamp: 'ISO 8601',
    nivel: 'INFO, WARN, ERROR, CRITICAL',
    usuario: 'ID do usuário',
    acao: 'Descrição da ação',
    recurso: 'Recurso afetado',
    ip: 'Endereço IP',
    userAgent: 'User agent do navegador',
    resultado: 'Sucesso ou falha',
    detalhes: 'Informações adicionais'
  },
  
  // Armazenamento
  armazenamento: {
    local: 'Logs locais criptografados',
    centralizado: 'SIEM (Security Information and Event Management)',
    retencao: '1 ano para logs normais, 7 anos para logs de segurança',
    backup: 'Backup diário dos logs'
  }
};

// Gerar log de segurança
const gerarLogSeguranca = async (evento, detalhes) => {
  const log = {
    timestamp: new Date().toISOString(),
    nivel: detalhes.nivel || 'INFO',
    usuario: detalhes.usuarioId,
    acao: evento,
    recurso: detalhes.recurso,
    ip: detalhes.ip,
    userAgent: detalhes.userAgent,
    resultado: detalhes.resultado,
    detalhes: detalhes.informacoesAdicionais
  };
  
  // Salvar log local
  await salvarLogLocal(log);
  
  // Enviar para SIEM
  await enviarParaSIEM(log);
  
  // Verificar se é evento crítico
  if (detalhes.nivel === 'CRITICAL') {
    await alertarEquipeSeguranca(log);
  }
  
  return log;
};
```

### Monitoramento em Tempo Real

```javascript
// Sistema de monitoramento
const monitoramento = {
  // Detecção de anomalias
  anomalias: {
    login: {
      tentativasFalha: 'Mais de 5 tentativas em 15 minutos',
      horarioIncomum: 'Login fora do horário de trabalho',
      localizacao: 'Login de localização não reconhecida',
      dispositivo: 'Dispositivo não reconhecido'
    },
    
    acesso: {
      recursosNaoAutorizados: 'Tentativa de acesso a recursos não autorizados',
      padraoIncomum: 'Padrão de acesso diferente do normal',
      volumeExcessivo: 'Volume de acessos acima do normal'
    },
    
    dados: {
      exportacaoGrande: 'Exportação de grande volume de dados',
      modificacaoEmMassa: 'Modificação em massa de dados',
      acessoHorarioIncomum: 'Acesso a dados em horário incomum'
    }
  },
  
  // Alertas
  alertas: {
    imediatos: [
      'Tentativas múltiplas de login falha',
      'Acesso a dados sensíveis',
      'Modificação de configurações críticas',
      'Detecção de malware'
    ],
    
    diarios: [
      'Resumo de atividades suspeitas',
      'Relatório de tentativas de acesso negadas',
      'Análise de padrões de uso'
    ],
    
    semanais: [
      'Relatório de conformidade',
      'Análise de vulnerabilidades',
      'Revisão de permissões'
    ]
  }
};

// Sistema de detecção de intrusão
const detecaoIntrusao = {
  // Regras de detecção
  regras: [
    {
      nome: 'Múltiplas tentativas de login',
      condicao: '5+ tentativas falha em 15 min',
      acao: 'Bloquear IP por 1 hora'
    },
    {
      nome: 'Acesso a dados sensíveis',
      condicao: 'Acesso a dados marcados como sensíveis',
      acao: 'Alertar equipe de segurança'
    },
    {
      nome: 'Exportação de dados',
      condicao: 'Exportação > 1000 registros',
      acao: 'Requer aprovação manual'
    }
  ],
  
  // Implementação
  implementacao: {
    verificacao: 'Verificação em tempo real',
    resposta: 'Resposta automática configurável',
    aprendizado: 'Machine learning para detecção de padrões',
    ajuste: 'Ajuste automático de regras'
  }
};
```

## Proteção de Dados Pessoais

### Classificação de Dados

```javascript
// Classificação de dados conforme LGPD
const classificacaoDados = {
  // Dados pessoais
  pessoais: {
    descricao: 'Informações relacionadas a pessoa natural identificada',
    exemplos: ['nome', 'email', 'telefone', 'endereco'],
    protecao: 'Criptografia e controle de acesso'
  },
  
  // Dados pessoais sensíveis
  sensiveis: {
    descricao: 'Dados que podem gerar discriminação',
    exemplos: ['cpf', 'cnpj', 'dados_biometricos', 'dados_saude'],
    protecao: 'Criptografia adicional e acesso restrito'
  },
  
  // Dados de crianças e adolescentes
  menores: {
    descricao: 'Dados de menores de 18 anos',
    protecao: 'Consentimento parental obrigatório',
    verificacao: 'Verificação de idade'
  },
  
  // Dados anonimizados
  anonimizados: {
    descricao: 'Dados que não permitem identificação',
    protecao: 'Proteção reduzida',
    uso: 'Analytics e pesquisa'
  }
};

// Classificar dados automaticamente
const classificarDados = (campo, valor) => {
  const classificacao = {
    campo: campo,
    valor: valor,
    tipo: 'pessoal',
    sensivel: false,
    criptografia: 'padrao'
  };
  
  // Verificar se é sensível
  const camposSensiveis = ['cpf', 'cnpj', 'rg', 'passaporte'];
  if (camposSensiveis.includes(campo.toLowerCase())) {
    classificacao.sensivel = true;
    classificacao.criptografia = 'forte';
  }
  
  // Verificar se é menor de idade
  if (campo === 'data_nascimento') {
    const idade = calcularIdade(valor);
    if (idade < 18) {
      classificacao.menor = true;
      classificacao.consentimentoParental = true;
    }
  }
  
  return classificacao;
};
```

### Mascaramento de Dados

```javascript
// Técnicas de mascaramento
const mascaramento = {
  // Mascaramento de CPF
  cpf: {
    original: '123.456.789-00',
    mascarado: '***.***.***-**',
    parcial: '123.***.***-**'
  },
  
  // Mascaramento de CNPJ
  cnpj: {
    original: '12.345.678/0001-90',
    mascarado: '**.***.***/****-**',
    parcial: '12.***.***/****-**'
  },
  
  // Mascaramento de email
  email: {
    original: 'usuario@empresa.com',
    mascarado: 'u****o@e****a.com',
    parcial: 'usuario@***.com'
  },
  
  // Mascaramento de telefone
  telefone: {
    original: '(11) 99999-9999',
    mascarado: '(**) *****-****',
    parcial: '(11) 99999-****'
  }
};

// Aplicar mascaramento
const aplicarMascaramento = (dados, tipo) => {
  const padroes = {
    cpf: /(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/,
    cnpj: /(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})-(\d{2})/,
    email: /^(.{1,3})(.*)(@.*)$/,
    telefone: /\((\d{2})\)\s(\d{5})-(\d{4})/
  };
  
  const mascaramentos = {
    cpf: (match) => `***.***.***-**`,
    cnpj: (match) => `**.***.***/****-**`,
    email: (match) => `${match[1]}****${match[3]}`,
    telefone: (match) => `(**) *****-****`
  };
  
  return dados.replace(padroes[tipo], mascaramentos[tipo]);
};
```

## Segurança de Workflows

### Validação de Entrada

```javascript
// Validação de dados de entrada
const validacaoEntrada = {
  // Validação de CPF
  cpf: {
    regex: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    validacao: (cpf) => {
      // Remover pontos e traços
      const numeros = cpf.replace(/[^\d]/g, '');
      
      // Verificar se tem 11 dígitos
      if (numeros.length !== 11) return false;
      
      // Verificar se todos os dígitos são iguais
      if (/^(\d)\1{10}$/.test(numeros)) return false;
      
      // Validar dígitos verificadores
      let soma = 0;
      for (let i = 0; i < 9; i++) {
        soma += parseInt(numeros[i]) * (10 - i);
      }
      let resto = 11 - (soma % 11);
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(numeros[9])) return false;
      
      soma = 0;
      for (let i = 0; i < 10; i++) {
        soma += parseInt(numeros[i]) * (11 - i);
      }
      resto = 11 - (soma % 11);
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(numeros[10])) return false;
      
      return true;
    }
  },
  
  // Validação de CNPJ
  cnpj: {
    regex: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    validacao: (cnpj) => {
      // Implementação da validação de CNPJ
      const numeros = cnpj.replace(/[^\d]/g, '');
      
      if (numeros.length !== 14) return false;
      if (/^(\d)\1{13}$/.test(numeros)) return false;
      
      // Validar dígitos verificadores
      let soma = 0;
      let peso = 2;
      
      for (let i = 11; i >= 0; i--) {
        soma += parseInt(numeros[i]) * peso;
        peso = peso === 9 ? 2 : peso + 1;
      }
      
      let resto = soma % 11;
      let digito1 = resto < 2 ? 0 : 11 - resto;
      
      if (parseInt(numeros[12]) !== digito1) return false;
      
      soma = 0;
      peso = 2;
      
      for (let i = 12; i >= 0; i--) {
        soma += parseInt(numeros[i]) * peso;
        peso = peso === 9 ? 2 : peso + 1;
      }
      
      resto = soma % 11;
      let digito2 = resto < 2 ? 0 : 11 - resto;
      
      return parseInt(numeros[13]) === digito2;
    }
  },
  
  // Validação de email
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    validacao: (email) => {
      // Verificar formato básico
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return false;
      
      // Verificar domínio válido
      const dominio = email.split('@')[1];
      if (!dominio.includes('.')) return false;
      
      // Verificar tamanho
      if (email.length > 254) return false;
      
      return true;
    }
  }
};

// Validar dados de entrada
const validarEntrada = (dados, regras) => {
  const erros = [];
  
  for (const [campo, valor] of Object.entries(dados)) {
    if (regras[campo]) {
      const regra = regras[campo];
      
      // Verificar se é obrigatório
      if (regra.obrigatorio && !valor) {
        erros.push(`${campo} é obrigatório`);
        continue;
      }
      
      // Verificar formato
      if (regra.regex && !regra.regex.test(valor)) {
        erros.push(`${campo} tem formato inválido`);
        continue;
      }
      
      // Verificar validação customizada
      if (regra.validacao && !regra.validacao(valor)) {
        erros.push(`${campo} é inválido`);
        continue;
      }
      
      // Verificar tamanho
      if (regra.min && valor.length < regra.min) {
        erros.push(`${campo} deve ter pelo menos ${regra.min} caracteres`);
      }
      
      if (regra.max && valor.length > regra.max) {
        erros.push(`${campo} deve ter no máximo ${regra.max} caracteres`);
      }
    }
  }
  
  return {
    valido: erros.length === 0,
    erros: erros
  };
};
```

### Sanitização de Dados

```javascript
// Sanitização de dados
const sanitizacao = {
  // Remover caracteres perigosos
  caracteres: {
    html: /[<>]/g,
    sql: /['";\\]/g,
    xss: /[<>\"'&]/g
  },
  
  // Sanitizar HTML
  html: (texto) => {
    return texto
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  },
  
  // Sanitizar SQL
  sql: (texto) => {
    return texto
      .replace(/'/g, "''")
      .replace(/"/g, '""')
      .replace(/;/g, '');
  },
  
  // Sanitizar para XSS
  xss: (texto) => {
    return texto
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/&/g, '&amp;');
  }
};

// Aplicar sanitização
const sanitizarDados = (dados, tipo) => {
  const dadosSanitizados = {};
  
  for (const [campo, valor] of Object.entries(dados)) {
    if (typeof valor === 'string') {
      dadosSanitizados[campo] = sanitizacao[tipo](valor);
    } else {
      dadosSanitizados[campo] = valor;
    }
  }
  
  return dadosSanitizados;
};
```

## Backup e Recuperação

### Estratégia de Backup

```javascript
// Estratégia de backup
const estrategiaBackup = {
  // Tipos de backup
  tipos: {
    completo: {
      frequencia: 'Diário',
      retencao: '30 dias',
      criptografia: 'AES-256',
      localizacao: 'Local e nuvem'
    },
    
    incremental: {
      frequencia: 'A cada 4 horas',
      retencao: '7 dias',
      criptografia: 'AES-256',
      localizacao: 'Local e nuvem'
    },
    
    diferencial: {
      frequencia: 'Semanal',
      retencao: '4 semanas',
      criptografia: 'AES-256',
      localizacao: 'Nuvem'
    }
  },
  
  // Configuração de backup
  configuracao: {
    // Dados incluídos
    inclusao: [
      'Workflows',
      'Credenciais (criptografadas)',
      'Configurações',
      'Logs de execução',
      'Dados de usuários'
    ],
    
    // Dados excluídos
    exclusao: [
      'Logs temporários',
      'Cache',
      'Arquivos temporários',
      'Dados de sessão'
    ],
    
    // Verificação
    verificacao: {
      integridade: 'Verificação automática após backup',
      restauracao: 'Teste de restauração semanal',
      performance: 'Monitoramento de tempo de backup'
    }
  }
};

// Executar backup
const executarBackup = async (tipo = 'incremental') => {
  const config = estrategiaBackup.tipos[tipo];
  
  // Criar backup
  const backup = {
    tipo: tipo,
    timestamp: new Date().toISOString(),
    dados: await coletarDadosBackup(),
    checksum: null,
    criptografado: false
  };
  
  // Gerar checksum
  backup.checksum = await gerarChecksum(backup.dados);
  
  // Criptografar
  backup.dados = await criptografar(backup.dados, config.criptografia);
  backup.criptografado = true;
  
  // Salvar backup
  await salvarBackup(backup, config.localizacao);
  
  // Verificar integridade
  const integridade = await verificarIntegridadeBackup(backup);
  
  // Log do backup
  await gerarLogSeguranca('backup_executado', {
    tipo: tipo,
    tamanho: backup.dados.length,
    integridade: integridade,
    localizacao: config.localizacao
  });
  
  return backup;
};
```

### Plano de Recuperação

```javascript
// Plano de recuperação de desastres
const planoRecuperacao = {
  // Cenários de recuperação
  cenarios: {
    // Falha de hardware
    hardware: {
      tempoRecuperacao: '4 horas',
      procedimento: [
        'Identificar falha',
        'Ativar servidor de backup',
        'Restaurar dados',
        'Verificar integridade',
        'Notificar usuários'
      ]
    },
    
    // Ataque de ransomware
    ransomware: {
      tempoRecuperacao: '8 horas',
      procedimento: [
        'Isolar sistemas afetados',
        'Identificar escopo do ataque',
        'Restaurar de backup limpo',
        'Verificar integridade',
        'Implementar medidas de segurança adicionais'
      ]
    },
    
    // Perda de dados
    perdaDados: {
      tempoRecuperacao: '2 horas',
      procedimento: [
        'Identificar dados perdidos',
        'Restaurar de backup mais recente',
        'Verificar integridade',
        'Sincronizar dados perdidos'
      ]
    }
  },
  
  // Testes de recuperação
  testes: {
    frequencia: 'Mensal',
    tipos: [
      'Teste de restauração completa',
      'Teste de restauração parcial',
      'Teste de tempo de recuperação',
      'Teste de integridade de dados'
    ],
    documentacao: 'Relatório detalhado de cada teste'
  }
};
```

## Treinamento e Conscientização

### Programa de Treinamento

```javascript
// Programa de treinamento em segurança
const treinamentoSeguranca = {
  // Módulos de treinamento
  modulos: {
    // Introdução à segurança
    introducao: {
      duracao: '2 horas',
      conteudo: [
        'Princípios de segurança',
        'Ameaças comuns',
        'Responsabilidades do usuário',
        'Políticas de segurança'
      ],
      frequencia: 'Obrigatório para novos funcionários'
    },
    
    // LGPD e proteção de dados
    lgpd: {
      duracao: '3 horas',
      conteudo: [
        'Princípios da LGPD',
        'Direitos do titular',
        'Obrigações da empresa',
        'Melhores práticas'
      ],
      frequencia: 'Anual para todos os funcionários'
    },
    
    // Segurança de workflows
    workflows: {
      duracao: '4 horas',
      conteudo: [
        'Validação de entrada',
        'Sanitização de dados',
        'Controle de acesso',
        'Monitoramento'
      ],
      frequencia: 'Semestral para desenvolvedores'
    },
    
    // Resposta a incidentes
    incidentes: {
      duracao: '2 horas',
      conteudo: [
        'Identificação de incidentes',
        'Procedimentos de resposta',
        'Comunicação',
        'Documentação'
      ],
      frequencia: 'Trimestral para equipe de segurança'
    }
  },
  
  // Avaliação
  avaliacao: {
    tipo: 'Teste online',
    pontuacao: 'Mínimo 80% para aprovação',
    certificacao: 'Certificado de conclusão',
    reciclagem: 'Reciclagem obrigatória em caso de reprovação'
  }
};
```

## Incidentes de Segurança

### Procedimentos de Resposta

```javascript
// Procedimentos de resposta a incidentes
const respostaIncidentes = {
  // Classificação de incidentes
  classificacao: {
    baixo: {
      descricao: 'Impacto mínimo, sem exposição de dados',
      tempoResposta: '24 horas',
      equipe: 'Equipe de suporte'
    },
    
    medio: {
      descricao: 'Impacto moderado, possível exposição limitada',
      tempoResposta: '4 horas',
      equipe: 'Equipe de segurança'
    },
    
    alto: {
      descricao: 'Impacto significativo, exposição de dados sensíveis',
      tempoResposta: '1 hora',
      equipe: 'Equipe de segurança + DPO'
    },
    
    critico: {
      descricao: 'Impacto severo, violação de dados pessoais',
      tempoResposta: 'Imediato',
      equipe: 'Equipe completa + autoridades'
    }
  },
  
  // Procedimentos de resposta
  procedimentos: {
    // Identificação
    identificacao: [
      'Detectar incidente',
      'Classificar severidade',
      'Notificar equipe responsável',
      'Iniciar investigação'
    ],
    
    // Contenção
    contencao: [
      'Isolar sistemas afetados',
      'Bloquear acessos suspeitos',
      'Preservar evidências',
      'Implementar medidas de mitigação'
    ],
    
    // Erradicação
    erradicacao: [
      'Remover causa raiz',
      'Corrigir vulnerabilidades',
      'Restaurar sistemas',
      'Verificar integridade'
    ],
    
    // Recuperação
    recuperacao: [
      'Restaurar serviços',
      'Monitorar estabilidade',
      'Verificar funcionalidade',
      'Notificar usuários'
    ],
    
    // Lições aprendidas
    licoes: [
      'Documentar incidente',
      'Analisar causas',
      'Identificar melhorias',
      'Atualizar procedimentos'
    ]
  }
};
```

---

**Importante**: Estas práticas devem ser implementadas de acordo com as necessidades específicas da sua organização e revisadas regularmente para garantir eficácia contínua. 