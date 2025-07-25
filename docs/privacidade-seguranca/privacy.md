---
title: Política de Privacidade n8n: Proteção de Dados, LGPD e Direitos do Usuário
description: Política de privacidade do n8n, proteção de dados pessoais, LGPD, direitos do titular, segurança e transparência para empresas brasileiras.
keywords: [política de privacidade n8n, proteção de dados pessoais, LGPD, direitos do titular, segurança de dados, transparência, compliance, automação segura]
---

# Política de Privacidade n8n: Proteção de Dados, LGPD e Direitos do Usuário

Esta política de privacidade descreve como o n8n coleta, usa, armazena e protege seus dados pessoais, em conformidade com a LGPD, garantindo transparência, segurança e direitos do titular para empresas brasileiras.

## Visão Geral

O n8n está comprometido em proteger sua privacidade e garantir que você tenha controle total sobre seus dados pessoais. Esta política explica como tratamos suas informações e quais direitos você tem.

## Dados que Coletamos

### Dados Fornecidos por Você

```javascript
// Tipos de dados que você pode fornecer
const dadosFornecidos = {
  // Informações de conta
  conta: {
    nome: 'string',
    email: 'string',
    senha: 'string (criptografada)',
    empresa: 'string',
    cargo: 'string'
  },
  
  // Dados de uso
  uso: {
    workflows: 'array',
    execucoes: 'array',
    configuracoes: 'object',
    preferencias: 'object'
  },
  
  // Dados de suporte
  suporte: {
    mensagens: 'string',
    logs: 'string',
    screenshots: 'file',
    informacoesSistema: 'object'
  }
};
```

### Dados Coletados Automaticamente

```javascript
// Dados coletados automaticamente
const dadosAutomaticos = {
  // Dados técnicos
  tecnicos: {
    ip: 'string',
    userAgent: 'string',
    cookies: 'string',
    logs: 'array'
  },
  
  // Dados de uso
  uso: {
    paginasVisitadas: 'array',
    tempoSessao: 'number',
    acoesRealizadas: 'array',
    erros: 'array'
  },
  
  // Dados de dispositivo
  dispositivo: {
    tipo: 'string',
    sistemaOperacional: 'string',
    navegador: 'string',
    resolucao: 'string'
  }
};
```

### Dados de Terceiros

```javascript
// Dados que podem vir de terceiros
const dadosTerceiros = {
  // Integrações
  integracoes: {
    google: 'dados de autenticação',
    github: 'dados de repositório',
    slack: 'dados de workspace',
    crm: 'dados de clientes'
  },
  
  // Serviços de analytics
  analytics: {
    googleAnalytics: 'dados de navegação',
    mixpanel: 'dados de comportamento',
    hotjar: 'dados de interação'
  }
};
```

## Como Usamos Seus Dados

### Finalidades Principais

```javascript
// Finalidades do tratamento de dados
const finalidades = {
  // Fornecimento de serviços
  servicos: {
    descricao: 'Fornecer e manter os serviços do n8n',
    baseLegal: 'Execução de contrato',
    dados: ['conta', 'uso', 'tecnicos']
  },
  
  // Melhoria de serviços
  melhoria: {
    descricao: 'Melhorar e otimizar nossos serviços',
    baseLegal: 'Interesse legítimo',
    dados: ['uso', 'analytics']
  },
  
  // Suporte ao cliente
  suporte: {
    descricao: 'Fornecer suporte técnico e atendimento',
    baseLegal: 'Execução de contrato',
    dados: ['conta', 'suporte', 'tecnicos']
  },
  
  // Comunicação
  comunicacao: {
    descricao: 'Enviar atualizações e notificações',
    baseLegal: 'Consentimento',
    dados: ['conta', 'preferencias']
  },
  
  // Segurança
  seguranca: {
    descricao: 'Proteger contra fraudes e abusos',
    baseLegal: 'Interesse legítimo',
    dados: ['tecnicos', 'uso']
  }
};
```

### Base Legal (LGPD)

Todas as nossas operações têm base legal adequada conforme a LGPD:

- **Consentimento**: Quando você autoriza explicitamente
- **Execução de Contrato**: Para fornecer nossos serviços
- **Interesse Legítimo**: Para melhorar serviços e segurança
- **Obrigação Legal**: Para cumprir leis aplicáveis

## Compartilhamento de Dados

### Quando Compartilhamos

```javascript
// Cenários de compartilhamento
const compartilhamento = {
  // Prestadores de serviço
  prestadores: {
    descricao: 'Empresas que nos ajudam a fornecer serviços',
    exemplos: ['AWS', 'Google Cloud', 'Stripe'],
    dados: ['tecnicos', 'uso'],
    protecao: 'Acordos de proteção de dados'
  },
  
  // Cumprimento legal
  legal: {
    descricao: 'Quando exigido por lei ou autoridade',
    exemplos: ['Tribunais', 'Autoridades fiscais'],
    dados: 'Conforme exigido',
    protecao: 'Apenas dados necessários'
  },
  
  // Segurança
  seguranca: {
    descricao: 'Para proteger direitos e segurança',
    exemplos: ['Prevenção de fraudes', 'Investigação de crimes'],
    dados: ['tecnicos', 'uso'],
    protecao: 'Procedimentos rigorosos'
  }
};
```

### Nós NÃO Vendemos Dados

```javascript
// Compromisso de não venda
const naoVendemos = {
  compromisso: 'Nunca vendemos, alugamos ou comercializamos seus dados pessoais',
  excecoes: [
    'Com sua autorização explícita',
    'Como parte de fusão ou aquisição (com proteções)',
    'Dados anonimizados para pesquisa'
  ]
};
```

## Armazenamento e Segurança

### Localização dos Dados

```javascript
// Onde armazenamos seus dados
const localizacao = {
  // Dados principais
  principal: {
    local: 'Brasil (São Paulo)',
    provedor: 'AWS Brasil',
    certificacao: 'ISO 27001, SOC 2',
    backup: 'Redundância geográfica'
  },
  
  // Dados de backup
  backup: {
    local: 'Brasil (Rio de Janeiro)',
    provedor: 'Google Cloud Brasil',
    frequencia: 'Diária',
    retencao: '30 dias'
  },
  
  // Dados de analytics
  analytics: {
    local: 'Estados Unidos',
    provedor: 'Google Analytics',
    anonimizacao: 'IPs anonimizados',
    conformidade: 'Privacy Shield'
  }
};
```

### Medidas de Segurança

```javascript
// Medidas de proteção implementadas
const seguranca = {
  // Criptografia
  criptografia: {
    emTransito: 'TLS 1.3',
    emRepouso: 'AES-256',
    senhas: 'bcrypt com salt',
    chaves: 'Gerenciamento HSM'
  },
  
  // Controle de acesso
  acesso: {
    autenticacao: 'MFA obrigatório',
    autorizacao: 'Princípio do menor privilégio',
    sessao: 'Tokens JWT com expiração',
    auditoria: 'Logs de todas as ações'
  },
  
  // Infraestrutura
  infraestrutura: {
    redes: 'Firewalls e WAF',
    aplicacao: 'Testes de penetração regulares',
    monitoramento: 'Detecção de intrusão 24/7',
    backup: 'Backup automático e criptografado'
  }
};
```

## Seus Direitos (LGPD)

### Direitos do Titular

Conforme a LGPD, você tem os seguintes direitos:

```javascript
// Direitos garantidos pela LGPD
const direitosLGPD = {
  // Direito de acesso
  acesso: {
    descricao: 'Saber quais dados temos sobre você',
    como: 'Solicitar relatório completo',
    prazo: '15 dias úteis'
  },
  
  // Direito de correção
  correcao: {
    descricao: 'Corrigir dados incorretos ou incompletos',
    como: 'Editar no painel ou solicitar correção',
    prazo: '15 dias úteis'
  },
  
  // Direito de exclusão
  exclusao: {
    descricao: 'Solicitar exclusão de seus dados',
    como: 'Solicitar via email ou painel',
    prazo: '15 dias úteis',
    excecoes: ['Dados necessários para cumprimento legal']
  },
  
  // Direito de portabilidade
  portabilidade: {
    descricao: 'Receber seus dados em formato estruturado',
    como: 'Solicitar exportação',
    prazo: '15 dias úteis',
    formato: 'JSON, CSV, XML'
  },
  
  // Direito de oposição
  oposicao: {
    descricao: 'Opor-se ao tratamento de dados',
    como: 'Solicitar parada do tratamento',
    prazo: '15 dias úteis'
  },
  
  // Direito de revisão
  revisao: {
    descricao: 'Revisar decisões automatizadas',
    como: 'Solicitar revisão humana',
    prazo: '15 dias úteis'
  }
};
```

### Como Exercer Seus Direitos

```javascript
// Processo para exercer direitos
const exercerDireitos = {
  // Via painel
  painel: {
    acesso: 'Configurações > Privacidade',
    correcao: 'Editar perfil diretamente',
    exclusao: 'Configurações > Excluir conta'
  },
  
  // Via email
  email: {
    endereco: 'privacy@n8n.io',
    assunto: 'Exercício de Direitos LGPD',
    informacoes: [
      'Nome completo',
      'Email da conta',
      'Direito que deseja exercer',
      'Justificativa (se aplicável)'
    ]
  },
  
  // Via formulário
  formulario: {
    url: 'https://n8n.io/privacy-rights',
    campos: [
      'Identificação',
      'Direito solicitado',
      'Detalhes da solicitação'
    ]
  }
};
```

## Retenção de Dados

### Política de Retenção

```javascript
// Tempo de retenção por tipo de dado
const retencao = {
  // Dados de conta
  conta: {
    ativa: 'Enquanto a conta estiver ativa',
    inativa: '2 anos após inatividade',
    excluida: '30 dias após exclusão (backup)'
  },
  
  // Dados de uso
  uso: {
    workflows: 'Enquanto a conta estiver ativa',
    execucoes: '90 dias (padrão), 1 ano (premium)',
    logs: '30 dias (padrão), 1 ano (premium)'
  },
  
  // Dados de suporte
  suporte: {
    tickets: '2 anos após resolução',
    logs: '1 ano após resolução',
    comunicacoes: '2 anos após último contato'
  },
  
  // Dados de analytics
  analytics: {
    anonimizados: '26 meses',
    identificados: '13 meses',
    agregados: 'Indefinido (sem identificação)'
  }
};
```

### Exceções à Retenção

```javascript
// Situações que podem estender a retenção
const excecoesRetencao = {
  // Obrigação legal
  legal: {
    descricao: 'Quando exigido por lei ou regulamento',
    exemplo: 'Dados fiscais por 5 anos',
    base: 'Art. 37, §1º da LGPD'
  },
  
  // Investigação
  investigacao: {
    descricao: 'Para investigar violações de segurança',
    exemplo: 'Logs de acesso suspeito',
    prazo: 'Até conclusão da investigação'
  },
  
  // Litígio
  litigio: {
    descricao: 'Quando há processo judicial em andamento',
    exemplo: 'Dados relevantes para defesa',
    prazo: 'Até resolução do litígio'
  }
};
```

## Cookies e Tecnologias Similares

### Tipos de Cookies

```javascript
// Cookies que utilizamos
const cookies = {
  // Cookies essenciais
  essenciais: {
    descricao: 'Necessários para funcionamento básico',
    exemplos: ['sessao', 'autenticacao', 'seguranca'],
    duracao: 'Sessão ou 1 ano',
    desabilitar: 'Não possível (quebra funcionalidade)'
  },
  
  // Cookies de funcionalidade
  funcionalidade: {
    descricao: 'Melhoram a experiência do usuário',
    exemplos: ['preferencias', 'idioma', 'tema'],
    duracao: '1 ano',
    desabilitar: 'Possível (perda de personalização)'
  },
  
  // Cookies de analytics
  analytics: {
    descricao: 'Ajudam a entender o uso do serviço',
    exemplos: ['google-analytics', 'mixpanel'],
    duracao: '2 anos',
    desabilitar: 'Possível (sem impacto funcional)'
  },
  
  // Cookies de marketing
  marketing: {
    descricao: 'Usados para publicidade personalizada',
    exemplos: ['facebook-pixel', 'google-ads'],
    duracao: '2 anos',
    desabilitar: 'Possível (sem impacto funcional)'
  }
};
```

### Gerenciamento de Cookies

```javascript
// Como gerenciar cookies
const gerenciarCookies = {
  // Via navegador
  navegador: {
    chrome: 'Configurações > Privacidade e Segurança > Cookies',
    firefox: 'Configurações > Privacidade e Segurança > Cookies',
    safari: 'Preferências > Privacidade > Cookies',
    edge: 'Configurações > Cookies e Permissões'
  },
  
  // Via nosso site
  site: {
    banner: 'Banner de consentimento na primeira visita',
    painel: 'Configurações > Privacidade > Cookies',
    granular: 'Controle individual por categoria'
  },
  
  // Ferramentas de terceiros
  terceiros: {
    descricao: 'Ferramentas para gerenciar cookies',
    exemplos: ['Cookiebot', 'OneTrust', 'TrustArc']
  }
};
```

## Transferências Internacionais

### Transferência de Dados

```javascript
// Transferências para outros países
const transferencias = {
  // Estados Unidos
  eua: {
    finalidade: 'Analytics e serviços de nuvem',
    baseLegal: 'Adequação (Privacy Shield)',
    protecao: 'Cláusulas contratuais padrão',
    dados: ['analytics', 'backup']
  },
  
  // União Europeia
  ue: {
    finalidade: 'Serviços de suporte e desenvolvimento',
    baseLegal: 'Adequação (GDPR)',
    protecao: 'Mesmo nível de proteção',
    dados: ['suporte', 'desenvolvimento']
  },
  
  // Outros países
  outros: {
    finalidade: 'Serviços específicos',
    baseLegal: 'Cláusulas contratuais',
    protecao: 'Garantias contratuais',
    dados: 'Apenas dados necessários'
  }
};
```

### Garantias de Proteção

```javascript
// Medidas para proteger dados transferidos
const garantias = {
  // Cláusulas contratuais
  clausulas: {
    descricao: 'Cláusulas padrão da UE para transferências',
    protecao: 'Mesmo nível de proteção',
    aplicacao: 'Todas as transferências'
  },
  
  // Criptografia
  criptografia: {
    descricao: 'Dados criptografados durante transferência',
    padrao: 'TLS 1.3',
    adicional: 'Criptografia de ponta a ponta'
  },
  
  // Auditoria
  auditoria: {
    descricao: 'Auditoria regular de compliance',
    frequencia: 'Anual',
    escopo: 'Todos os provedores'
  }
};
```

## Menores de Idade

### Proteção de Menores

```javascript
// Política para menores de idade
const menores = {
  // Idade mínima
  idadeMinima: {
    valor: 16,
    base: 'Art. 14 da LGPD',
    excecao: '13 anos com consentimento parental'
  },
  
  // Verificação
  verificacao: {
    metodo: 'Declaração de idade',
    validacao: 'Documentação quando necessário',
    responsabilidade: 'Responsável legal'
  },
  
  // Consentimento parental
  consentimentoParental: {
    quando: 'Menores de 16 anos',
    como: 'Formulário específico',
    validacao: 'Contato com responsável'
  }
};
```

## Atualizações da Política

### Processo de Atualização

```javascript
// Como atualizamos esta política
const atualizacoes = {
  // Notificação
  notificacao: {
    metodo: 'Email e notificação no painel',
    prazo: '30 dias antes da mudança',
    destaque: 'Mudanças significativas'
  },
  
  // Consentimento
  consentimento: {
    quando: 'Mudanças que afetam base legal',
    como: 'Novo consentimento explícito',
    prazo: 'Antes da aplicação'
  },
  
  // Histórico
  historico: {
    disponivel: 'Link para versões anteriores',
    formato: 'PDF com data de versão',
    retencao: '5 anos'
  }
};
```

## Contato e Dúvidas

### Oficial de Proteção de Dados (DPO)

```javascript
// Informações do DPO
const dpo = {
  // Contato
  contato: {
    nome: 'Dr. João Silva',
    email: 'dpo@n8n.io',
    telefone: '+55 11 99999-9999',
    endereco: 'Rua das Flores, 123 - São Paulo/SP'
  },
  
  // Responsabilidades
  responsabilidades: [
    'Orientar sobre LGPD',
    'Receber reclamações',
    'Avaliar impacto de dados',
    'Treinar funcionários'
  ],
  
  // Disponibilidade
  disponibilidade: {
    horario: 'Segunda a Sexta, 9h às 18h',
    resposta: '48 horas úteis',
    confidencialidade: 'Garantida'
  }
};
```

### Canais de Contato

```javascript
// Como entrar em contato
const contato = {
  // Privacidade
  privacidade: {
    email: 'privacy@n8n.io',
    formulario: 'https://n8n.io/privacy-contact',
    resposta: '15 dias úteis'
  },
  
  // Segurança
  seguranca: {
    email: 'security@n8n.io',
    programa: 'https://hackerone.com/n8n',
    resposta: '24 horas'
  },
  
  // Suporte geral
  suporte: {
    email: 'suporte@n8n-brasil.com',
    whatsapp: '+55 11 99999-9999',
    chat: 'Disponível no painel'
  }
};
```

## Disposições Finais

### Jurisdição

Esta política está sujeita às leis brasileiras, especialmente a LGPD (Lei nº 13.709/2018).

### Versão

Esta política foi atualizada pela última vez em: **15 de Janeiro de 2024**

### Aplicabilidade

Esta política se aplica a todos os usuários do n8n, independentemente de sua localização, quando utilizam nossos serviços.

---

**Importante**: Esta política pode ser atualizada periodicamente. Recomendamos que você a revise regularmente para se manter informado sobre como protegemos seus dados. 