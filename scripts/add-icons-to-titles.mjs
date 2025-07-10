#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeamento temático com palavras-chave
const thematicMapping = {
  // Desenvolvimento e Código
  code: {
    keywords: ['código', 'code', 'script', 'função', 'function', 'api', 'desenvolvimento', 'programação', 'javascript', 'typescript', 'python', 'node'],
    icon: 'code-slash-outline'
  },
  
  // Configuração e Instalação
  setup: {
    keywords: ['instalação', 'install', 'configuração', 'setup', 'configurar', 'instalar', 'dependências', 'npm', 'yarn', 'pnpm'],
    icon: 'settings-outline'
  },
  
  // Documentação e Guias
  docs: {
    keywords: ['documentação', 'docs', 'guia', 'guide', 'manual', 'tutorial', 'referência', 'reference'],
    icon: 'document-text-outline'
  },
  
  // Início e Primeiros Passos
  start: {
    keywords: ['início', 'start', 'começar', 'primeiros passos', 'getting started', 'quickstart', 'introdução', 'intro'],
    icon: 'play-circle-outline'
  },
  
  // Segurança e Autenticação
  security: {
    keywords: ['segurança', 'security', 'autenticação', 'auth', 'login', 'senha', 'password', 'token', 'oauth', 'credenciais', 'permissões'],
    icon: 'shield-checkmark-outline'
  },
  
  // Dados e Analytics
  data: {
    keywords: ['dados', 'data', 'analytics', 'estatísticas', 'métricas', 'gráfico', 'chart', 'relatório', 'report', 'análise'],
    icon: 'analytics-outline'
  },
  
  // Integração e Conexões
  integration: {
    keywords: ['integração', 'integration', 'webhook', 'api', 'conexão', 'connect', 'link', 'sync', 'sincronizar'],
    icon: 'git-network-outline'
  },
  
  // Cloud e Servidor
  cloud: {
    keywords: ['cloud', 'nuvem', 'servidor', 'server', 'hosting', 'deploy', 'aws', 'azure', 'gcp', 'docker', 'kubernetes'],
    icon: 'cloud-outline'
  },
  
  // Banco de Dados
  database: {
    keywords: ['database', 'banco de dados', 'db', 'sql', 'mongodb', 'postgres', 'mysql', 'redis', 'query'],
    icon: 'server-outline'
  },
  
  // Workflow e Automação
  workflow: {
    keywords: ['workflow', 'fluxo', 'automação', 'automation', 'processo', 'process', 'tarefa', 'task', 'job'],
    icon: 'git-branch-outline'
  },
  
  // Interface e UI
  interface: {
    keywords: ['interface', 'ui', 'ux', 'design', 'layout', 'componente', 'component', 'tela', 'screen', 'página', 'navegação'],
    icon: 'grid-outline'
  },
  
  // Erro e Debug
  error: {
    keywords: ['erro', 'error', 'bug', 'debug', 'problema', 'issue', 'falha', 'fail', 'exception', 'troubleshoot'],
    icon: 'bug-outline'
  },
  
  // Performance e Otimização
  performance: {
    keywords: ['performance', 'desempenho', 'otimização', 'optimize', 'velocidade', 'speed', 'rápido', 'fast', 'cache'],
    icon: 'speedometer-outline'
  },
  
  // Comunicação e Notificação
  communication: {
    keywords: ['email', 'mail', 'notificação', 'notification', 'mensagem', 'message', 'chat', 'slack', 'discord', 'telegram'],
    icon: 'mail-outline'
  },
  
  // Arquivo e Documentos
  file: {
    keywords: ['arquivo', 'file', 'documento', 'document', 'pdf', 'excel', 'csv', 'json', 'xml', 'upload', 'download'],
    icon: 'document-outline'
  },
  
  // Tempo e Agendamento
  time: {
    keywords: ['tempo', 'time', 'horário', 'schedule', 'agenda', 'cron', 'timer', 'delay', 'wait', 'esperar'],
    icon: 'time-outline'
  },
  
  // Usuário e Pessoas
  user: {
    keywords: ['usuário', 'user', 'pessoa', 'people', 'perfil', 'profile', 'conta', 'account', 'membro', 'member'],
    icon: 'person-outline'
  },
  
  // Ajuda e Suporte
  help: {
    keywords: ['ajuda', 'help', 'suporte', 'support', 'dúvida', 'question', 'faq', 'pergunta', 'resposta', 'solução'],
    icon: 'help-circle-outline'
  },
  
  // Vídeo e Mídia
  media: {
    keywords: ['vídeo', 'video', 'mídia', 'media', 'imagem', 'image', 'foto', 'photo', 'áudio', 'audio'],
    icon: 'videocam-outline'
  },
  
  // Pagamento e Financeiro
  payment: {
    keywords: ['pagamento', 'payment', 'financeiro', 'finance', 'dinheiro', 'money', 'cartão', 'card', 'pix', 'boleto'],
    icon: 'card-outline'
  },
  
  // Localização
  location: {
    keywords: ['localização', 'location', 'endereço', 'address', 'mapa', 'map', 'cep', 'cidade', 'city', 'país'],
    icon: 'location-outline'
  },
  
  // Idioma e Tradução
  language: {
    keywords: ['idioma', 'language', 'tradução', 'translation', 'localização', 'localization', 'português', 'english'],
    icon: 'language-outline'
  },
  
  // Comunidade
  community: {
    keywords: ['comunidade', 'community', 'grupo', 'group', 'fórum', 'forum', 'discussão', 'discussion'],
    icon: 'people-outline'
  },
  
  // Educação e Aprendizado
  education: {
    keywords: ['curso', 'course', 'aula', 'class', 'aprender', 'learn', 'educação', 'education', 'tutorial', 'treinamento'],
    icon: 'school-outline'
  },
  
  // Git e Versionamento
  git: {
    keywords: ['git', 'github', 'gitlab', 'commit', 'branch', 'merge', 'pull request', 'fork', 'clone'],
    icon: 'git-branch-outline'
  },
  
  // Cores e Design
  design: {
    keywords: ['cor', 'color', 'paleta', 'palette', 'tema', 'theme', 'estilo', 'style', 'design', 'visual'],
    icon: 'color-palette-outline'
  },
  
  // Exemplos e Casos
  examples: {
    keywords: ['exemplo', 'example', 'caso', 'case', 'demonstração', 'demo', 'prático', 'practical'],
    icon: 'bulb-outline'
  },
  
  // IA e Machine Learning
  ai: {
    keywords: ['ia', 'ai', 'inteligência artificial', 'machine learning', 'ml', 'chatbot', 'gpt', 'openai', 'langchain'],
    icon: 'sparkles-outline'
  },
  
  // Loop e Repetição
  loop: {
    keywords: ['loop', 'repetir', 'repeat', 'iteração', 'iteration', 'foreach', 'while', 'for'],
    icon: 'repeat-outline'
  },
  
  // Filtro e Busca
  filter: {
    keywords: ['filtro', 'filter', 'busca', 'search', 'pesquisa', 'find', 'procurar', 'query'],
    icon: 'filter-outline'
  },
  
  // Warning e Alerta
  warning: {
    keywords: ['aviso', 'warning', 'alerta', 'alert', 'atenção', 'attention', 'cuidado', 'careful'],
    icon: 'warning-outline'
  },
  
  // Sucesso e Conclusão
  success: {
    keywords: ['sucesso', 'success', 'concluído', 'complete', 'finalizado', 'finished', 'pronto', 'done'],
    icon: 'checkmark-circle-outline'
  },
  
  // Pasta e Organização
  folder: {
    keywords: ['pasta', 'folder', 'diretório', 'directory', 'organizar', 'organize', 'estrutura', 'structure'],
    icon: 'folder-outline'
  },
  
  // Download e Upload
  transfer: {
    keywords: ['download', 'baixar', 'upload', 'enviar', 'transferir', 'transfer', 'importar', 'exportar'],
    icon: 'cloud-download-outline'
  },
  
  // Chave e Variáveis
  key: {
    keywords: ['chave', 'key', 'variável', 'variable', 'env', 'environment', 'config', 'secret'],
    icon: 'key-outline'
  }
};

// Mapeamento direto para títulos específicos
const directTitleMapping = {
  // Títulos exatos em português
  'introdução': 'information-circle-outline',
  'primeiros passos': 'footsteps-outline',
  'instalação': 'download-outline',
  'configuração': 'settings-outline',
  'como contribuir': 'git-pull-request-outline',
  'código de conduta': 'shield-checkmark-outline',
  'changelog': 'time-outline',
  'roadmap': 'map-outline',
  'glossário': 'book-outline',
  'referência da api': 'code-outline',
  'perguntas frequentes': 'help-circle-outline',
  'recursos': 'library-outline',
  'licença': 'document-text-outline',
  'créditos': 'trophy-outline',
  'contato': 'call-outline',
  'sobre': 'information-circle-outline',
  'histórico': 'time-outline',
  'versões': 'git-compare-outline',
  'migração': 'swap-horizontal-outline',
  'atualização': 'refresh-outline',
  'backup': 'save-outline',
  'restauração': 'refresh-circle-outline',
  'monitoramento': 'eye-outline',
  'logs': 'document-text-outline',
  'métricas': 'bar-chart-outline',
  'dashboard': 'grid-outline',
  'relatórios': 'document-attach-outline',
  'notificações': 'notifications-outline',
  'alertas': 'alert-circle-outline',
  'webhooks': 'git-network-outline',
  'plugins': 'extension-puzzle-outline',
  'temas': 'color-palette-outline',
  'templates': 'duplicate-outline',
  'snippets': 'code-outline',
  'atalhos': 'flash-outline',
  'comandos': 'terminal-outline',
  'variáveis': 'key-outline',
  'funções': 'code-slash-outline',
  'classes': 'cube-outline',
  'módulos': 'layers-outline',
  'pacotes': 'cube-outline',
  'dependências': 'git-merge-outline',
  'testes': 'flask-outline',
  'debug': 'bug-outline',
  'deploy': 'rocket-outline',
  'ci/cd': 'sync-outline',
  'docker': 'cube-outline',
  'kubernetes': 'apps-outline',
  'aws': 'cloud-outline',
  'azure': 'cloud-outline',
  'gcp': 'cloud-outline',
  'conclusão': 'checkmark-circle-outline',
  'próximos passos': 'arrow-forward-circle-outline',
  'recursos adicionais': 'add-circle-outline',
  'links úteis': 'link-outline',
  'referências': 'bookmark-outline',
  'bibliografia': 'book-outline',
  'apêndice': 'attach-outline',
  'anexos': 'attach-outline'
};

function getIconForTitle(title, isH1 = true) {
  if (!title) return 'document-outline';
  
  // Limpar e normalizar o título
  const normalized = title.toLowerCase()
    .replace(/<[^>]+>/g, '') // Remove tags HTML
    .replace(/[^\w\s\u00C0-\u00FF-]/g, '') // Mantém acentos
    .trim();
  
  // Primeiro, verificar mapeamento direto
  if (directTitleMapping[normalized]) {
    return directTitleMapping[normalized];
  }
  
  // Depois, buscar por palavras-chave temáticas
  for (const [_theme, config] of Object.entries(thematicMapping)) {
    for (const keyword of config.keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        return config.icon;
      }
    }
  }
  
  // Ícones padrão por tipo de título
  return isH1 ? 'document-outline' : 'chevron-forward-outline';
}

function addIconsToTitles(content) {
  // Processar H1 (# Título)
  const h1Regex = /^#\s+(<ion-icon[^>]*>.*?<\/ion-icon>|<ion-icon[^>]*\/>)?\s*(.*)$/gm;
  content = content.replace(h1Regex, (match, existingIcon, title) => {
    const iconName = getIconForTitle(title, true);
    return `# <ion-icon name="${iconName}" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> ${title.trim()}`;
  });
  
  // Processar H2 (## Título)
  const h2Regex = /^##\s+(<ion-icon[^>]*>.*?<\/ion-icon>|<ion-icon[^>]*\/>)?\s*(.*)$/gm;
  content = content.replace(h2Regex, (match, existingIcon, title) => {
    const iconName = getIconForTitle(title, false);
    return `## <ion-icon name="${iconName}" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> ${title.trim()}`;
  });
  
  return content;
}

// Função para processar arquivo
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = addIconsToTitles(content);
    
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ ${filePath} - Ícones adicionados`);
      return true;
    } else {
      console.log(`⏭️  ${filePath} - Já tem ícones ou não precisa`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return false;
  }
}

// Função para processar diretório recursivamente
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let processedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processedCount += processDirectory(filePath);
    } else if (file.endsWith('.mdx') || file.endsWith('.md')) {
      if (processFile(filePath)) {
        processedCount++;
      }
    }
  }
  
  return processedCount;
}

// Executar o script
console.log('🚀 Iniciando adição de ícones aos títulos H1 e H2...\n');

const docsPath = path.join(__dirname, '..', 'docs');
const totalProcessed = processDirectory(docsPath);

console.log(`\n🎉 Processamento concluído!`);
console.log(`📊 Total de arquivos processados: ${totalProcessed}`);
console.log(`📁 Diretório: ${docsPath}`); 