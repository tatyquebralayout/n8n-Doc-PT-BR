import translatePkg from '@vitalets/google-translate-api';

// Cache de traduções para evitar traduzir o mesmo texto múltiplas vezes
const translationCache = new Map();

// Termos técnicos que não devem ser traduzidos
const technicalTerms = [
  'n8n',
  'workflow',
  'node',
  'nodes',
  'webhook',
  'API',
  'HTTP',
  'JSON',
  'JavaScript',
  'TypeScript',
  'Docker',
  'npm',
  'CLI',
  'UI',
  'URL',
  'ID',
  'OAuth',
  'JWT',
  'REST',
  'GraphQL',
  'SQL',
  'NoSQL',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'RabbitMQ',
  'Kafka',
  'Git',
  'GitHub',
  'GitLab',
  'Bitbucket',
  'CI/CD',
  'DevOps',
  'frontend',
  'backend',
  'full-stack',
  'debug',
  'debugger',
  'breakpoint',
  'console',
  'log',
  'error',
  'warning',
  'info',
  'trace',
  'stack trace',
  'pull request',
  'merge request',
  'commit',
  'branch',
  'fork',
  'clone',
  'push',
  'pull',
  'fetch',
  'merge',
  'rebase',
  'cherry-pick',
  'tag',
  'release',
  'deploy',
  'deployment',
  'build',
  'test',
  'lint',
  'format',
  'refactor',
  'hotfix',
  'bugfix',
  'feature',
  'enhancement',
  'improvement',
  'performance',
  'security',
  'vulnerability',
  'patch',
  'update',
  'upgrade',
  'downgrade',
  'rollback',
  'backup',
  'restore',
  'migrate',
  'migration',
  'schema',
  'database',
  'table',
  'column',
  'index',
  'query',
  'transaction',
  'lock',
  'deadlock',
  'cache',
  'session',
  'cookie',
  'token',
  'authentication',
  'authorization',
  'permission',
  'role',
  'user',
  'admin',
  'administrator',
  'moderator',
  'member',
  'guest',
  'anonymous',
  'public',
  'private',
  'protected',
  'internal',
  'external',
  'localhost',
  'server',
  'client',
  'request',
  'response',
  'status',
  'header',
  'body',
  'payload',
  'parameter',
  'argument',
  'variable',
  'constant',
  'function',
  'method',
  'class',
  'interface',
  'type',
  'enum',
  'namespace',
  'module',
  'package',
  'library',
  'framework',
  'SDK',
  'CDN',
  'SaaS',
  'PaaS',
  'IaaS',
  'FaaS',
  'serverless',
  'microservice',
  'monolith',
  'container',
  'Kubernetes',
  'k8s',
  'pod',
  'service',
  'ingress',
  'egress',
  'load balancer',
  'proxy',
  'reverse proxy',
  'gateway',
  'firewall',
  'VPN',
  'SSL',
  'TLS',
  'HTTPS',
  'SSH',
  'FTP',
  'SFTP',
  'SMTP',
  'POP3',
  'IMAP',
  'DNS',
  'IP',
  'TCP',
  'UDP',
  'WebSocket',
  'Socket.io',
  'REST API',
  'GraphQL API',
  'SOAP',
  'XML',
  'YAML',
  'TOML',
  'INI',
  'CSV',
  'TSV',
  'Markdown',
  'HTML',
  'CSS',
  'SASS',
  'SCSS',
  'LESS',
  'PostCSS',
  'Webpack',
  'Vite',
  'Rollup',
  'Parcel',
  'Babel',
  'ESLint',
  'Prettier',
  'Jest',
  'Mocha',
  'Chai',
  'Cypress',
  'Playwright',
  'Puppeteer',
  'React',
  'Vue',
  'Angular',
  'Svelte',
  'Next.js',
  'Nuxt.js',
  'Gatsby',
  'Express',
  'Fastify',
  'Koa',
  'Hapi',
  'NestJS',
  'Strapi',
  'Directus',
  'Supabase',
  'Firebase',
  'AWS',
  'Azure',
  'Google Cloud',
  'GCP',
  'Vercel',
  'Netlify',
  'Heroku',
  'DigitalOcean',
  'Linode',
  'Vultr',
];

// Garantir compatibilidade entre ESM e CommonJS
let translateFn;
if (typeof translatePkg === 'function') {
  translateFn = translatePkg;
} else if (typeof translatePkg.translate === 'function') {
  translateFn = translatePkg.translate;
} else if (typeof translatePkg.default === 'function') {
  translateFn = translatePkg.default;
} else if (typeof translatePkg.default?.translate === 'function') {
  translateFn = translatePkg.default.translate;
} else {
  throw new Error('Não foi possível resolver a função de tradução do módulo @vitalets/google-translate-api');
}

// Função para proteger termos técnicos antes da tradução
function protectTechnicalTerms(text) {
  let protectedText = text;
  const placeholders = new Map();
  let placeholderIndex = 0;

  // Protege termos técnicos
  technicalTerms.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    protectedText = protectedText.replace(regex, (match) => {
      const placeholder = `__TECH_${placeholderIndex}__`;
      placeholders.set(placeholder, match);
      placeholderIndex++;
      return placeholder;
    });
  });

  // Protege links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  protectedText = protectedText.replace(linkRegex, (match, text, url) => {
    const placeholder = `__LINK_${placeholderIndex}__`;
    placeholders.set(placeholder, match);
    placeholderIndex++;
    return placeholder;
  });

  // Protege código inline
  const codeRegex = /`([^`]+)`/g;
  protectedText = protectedText.replace(codeRegex, (match) => {
    const placeholder = `__CODE_${placeholderIndex}__`;
    placeholders.set(placeholder, match);
    placeholderIndex++;
    return placeholder;
  });

  // Protege blocos de código
  const codeBlockRegex = /```[\s\S]*?```/g;
  protectedText = protectedText.replace(codeBlockRegex, (match) => {
    const placeholder = `__CODEBLOCK_${placeholderIndex}__`;
    placeholders.set(placeholder, match);
    placeholderIndex++;
    return placeholder;
  });

  return { protectedText, placeholders };
}

// Função para restaurar termos protegidos após a tradução
function restoreTechnicalTerms(text, placeholders) {
  let restoredText = text;
  
  placeholders.forEach((original, placeholder) => {
    restoredText = restoredText.replace(placeholder, original);
  });

  return restoredText;
}

// Função principal de tradução
export async function translateText(text, options = {}) {
  const { 
    from = 'en', 
    to = 'pt',
    preserveFormatting = true,
    useCache = true 
  } = options;

  // Verifica o cache
  const cacheKey = `${from}-${to}-${text}`;
  if (useCache && translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    // Protege termos técnicos
    const { protectedText, placeholders } = protectTechnicalTerms(text);

    // Traduz o texto
    const result = await translateFn(protectedText, { from, to });
    let translatedText = result.text;

    // Restaura termos técnicos
    translatedText = restoreTechnicalTerms(translatedText, placeholders);

    // Ajustes pós-tradução
    translatedText = postProcessTranslation(translatedText);

    // Armazena no cache
    if (useCache) {
      translationCache.set(cacheKey, translatedText);
    }

    return translatedText;
  } catch (error) {
    console.error('Erro na tradução:', error);
    // Em caso de erro, retorna o texto original
    return text;
  }
}

// Função para ajustes pós-tradução
function postProcessTranslation(text) {
  // Corrige problemas comuns de tradução
  const corrections = {
    'nó': 'node',
    'nós': 'nodes',
    'fluxo de trabalho': 'workflow',
    'fluxos de trabalho': 'workflows',
    'gancho web': 'webhook',
    'ganchos web': 'webhooks',
    'solicitação de pull': 'pull request',
    'solicitações de pull': 'pull requests',
    'pedido de mesclagem': 'merge request',
    'pedidos de mesclagem': 'merge requests',
    'comprometer-se': 'commit',
    'cometer': 'commit',
    'ramo': 'branch',
    'ramos': 'branches',
    'etiqueta': 'tag',
    'etiquetas': 'tags',
    'liberar': 'release',
    'lançamento': 'release',
    'lançamentos': 'releases',
    'implantar': 'deploy',
    'implantação': 'deployment',
    'construir': 'build',
    'construção': 'build',
    'teste': 'test',
    'testes': 'tests',
    'pelugem': 'lint',
    'fiapo': 'lint',
    'formatar': 'format',
    'formatação': 'formatting',
    'refatorar': 'refactor',
    'refatoração': 'refactoring',
    'correção rápida': 'hotfix',
    'correção de bug': 'bugfix',
    'correção de erro': 'bugfix',
    'recurso': 'feature',
    'recursos': 'features',
    'característica': 'feature',
    'características': 'features',
    'melhoria': 'enhancement',
    'melhorias': 'enhancements',
    'aprimoramento': 'improvement',
    'aprimoramentos': 'improvements',
    'desempenho': 'performance',
    'atuação': 'performance',
    'segurança': 'security',
    'vulnerabilidade': 'vulnerability',
    'vulnerabilidades': 'vulnerabilities',
    'remendo': 'patch',
    'remendos': 'patches',
    'atualizar': 'update',
    'atualização': 'update',
    'atualizações': 'updates',
    'aprimorar': 'upgrade',
    'melhoria': 'upgrade',
    'rebaixar': 'downgrade',
    'rebaixamento': 'downgrade',
    'reverter': 'rollback',
    'reversão': 'rollback',
    'cópia de segurança': 'backup',
    'cópias de segurança': 'backups',
    'restaurar': 'restore',
    'restauração': 'restore',
    'migrar': 'migrate',
    'migração': 'migration',
    'migrações': 'migrations',
    'esquema': 'schema',
    'esquemas': 'schemas',
    'banco de dados': 'database',
    'bancos de dados': 'databases',
    'tabela': 'table',
    'tabelas': 'tables',
    'coluna': 'column',
    'colunas': 'columns',
    'índice': 'index',
    'índices': 'indexes',
    'consulta': 'query',
    'consultas': 'queries',
    'transação': 'transaction',
    'transações': 'transactions',
    'trancar': 'lock',
    'bloqueio': 'lock',
    'bloqueios': 'locks',
    'impasse': 'deadlock',
    'impasses': 'deadlocks',
    'esconderijo': 'cache',
    'sessão': 'session',
    'sessões': 'sessions',
    'biscoito': 'cookie',
    'biscoitos': 'cookies',
    'símbolo': 'token',
    'símbolos': 'tokens',
    'autenticação': 'authentication',
    'autorização': 'authorization',
    'permissão': 'permission',
    'permissões': 'permissions',
    'papel': 'role',
    'papéis': 'roles',
    'usuário': 'user',
    'usuários': 'users',
    'administrador': 'admin',
    'administradores': 'admins',
    'moderador': 'moderator',
    'moderadores': 'moderators',
    'membro': 'member',
    'membros': 'members',
    'convidado': 'guest',
    'convidados': 'guests',
    'anônimo': 'anonymous',
    'público': 'public',
    'privado': 'private',
    'protegido': 'protected',
    'interno': 'internal',
    'externo': 'external',
    'servidor': 'server',
    'servidores': 'servers',
    'cliente': 'client',
    'clientes': 'clients',
    'solicitar': 'request',
    'solicitação': 'request',
    'solicitações': 'requests',
    'resposta': 'response',
    'respostas': 'responses',
    'status': 'status',
    'cabeçalho': 'header',
    'cabeçalhos': 'headers',
    'corpo': 'body',
    'carga útil': 'payload',
    'cargas úteis': 'payloads',
    'parâmetro': 'parameter',
    'parâmetros': 'parameters',
    'argumento': 'argument',
    'argumentos': 'arguments',
    'variável': 'variable',
    'variáveis': 'variables',
    'constante': 'constant',
    'constantes': 'constants',
    'função': 'function',
    'funções': 'functions',
    'método': 'method',
    'métodos': 'methods',
    'classe': 'class',
    'classes': 'classes',
    'interface': 'interface',
    'interfaces': 'interfaces',
    'tipo': 'type',
    'tipos': 'types',
    'enumeração': 'enum',
    'enumerações': 'enums',
    'espaço de nomes': 'namespace',
    'espaços de nomes': 'namespaces',
    'módulo': 'module',
    'módulos': 'modules',
    'pacote': 'package',
    'pacotes': 'packages',
    'biblioteca': 'library',
    'bibliotecas': 'libraries',
    'estrutura': 'framework',
    'estruturas': 'frameworks',
    'recipiente': 'container',
    'recipientes': 'containers',
    'vagem': 'pod',
    'vagens': 'pods',
    'serviço': 'service',
    'serviços': 'services',
    'entrada': 'ingress',
    'saída': 'egress',
    'balanceador de carga': 'load balancer',
    'balanceadores de carga': 'load balancers',
    'procuração': 'proxy',
    'proxy reverso': 'reverse proxy',
    'porta de entrada': 'gateway',
    'portas de entrada': 'gateways',
    'firewall': 'firewall',
    'firewalls': 'firewalls',
  };

  // Aplica correções
  Object.entries(corrections).forEach(([wrong, correct]) => {
    const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
    text = text.replace(regex, correct);
  });

  return text;
}

// Função para traduzir um arquivo Markdown completo
export async function translateMarkdownFile(content, options = {}) {
  const lines = content.split('\n');
  const translatedLines = [];
  let inCodeBlock = false;
  let inFrontMatter = false;
  let frontMatterCount = 0;

  for (const line of lines) {
    // Detecta frontmatter
    if (line === '---') {
      frontMatterCount++;
      if (frontMatterCount === 1) {
        inFrontMatter = true;
      } else if (frontMatterCount === 2) {
        inFrontMatter = false;
      }
      translatedLines.push(line);
      continue;
    }

    // Não traduz frontmatter
    if (inFrontMatter) {
      translatedLines.push(line);
      continue;
    }

    // Detecta blocos de código
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      translatedLines.push(line);
      continue;
    }

    // Não traduz blocos de código
    if (inCodeBlock) {
      translatedLines.push(line);
      continue;
    }

    // Traduz linhas normais
    if (line.trim() === '') {
      translatedLines.push(line);
    } else {
      const translatedLine = await translateText(line, options);
      translatedLines.push(translatedLine);
    }
  }

  return translatedLines.join('\n');
}

// Exporta o cache para persistência (opcional)
export function getTranslationCache() {
  return Object.fromEntries(translationCache);
}

// Carrega cache de traduções (opcional)
export function loadTranslationCache(cache) {
  Object.entries(cache).forEach(([key, value]) => {
    translationCache.set(key, value);
  });
} 