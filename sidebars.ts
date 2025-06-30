import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Configuração completa dos sidebars para n8n Documentation BR
 * Estrutura com 11 seções principais organizadas logicamente
 */
const sidebars: SidebarsConfig = {
  // Tutorial sidebar - "Criar e Usar Workflows"
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🚀 Usando n8n',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '🎯 Getting Started',
          collapsed: false,
          items: [
            'usando-n8n/getting-started/quickstart-rapido',
            'usando-n8n/getting-started/workflow-na-pratica',
          ],
        },
        'usando-n8n/navegacao-editor-ui',
        'usando-n8n/componentes-execucoes',
      ],
    },
    {
      type: 'category',
      label: '⚡ Lógica e Dados',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '🔄 Flow Logic',
          collapsed: false,
          items: [
            'logica-e-dados/flow-logic/splitting',
            'logica-e-dados/flow-logic/merging',
            'logica-e-dados/flow-logic/looping',
            'logica-e-dados/flow-logic/waiting',
            'logica-e-dados/flow-logic/subworkflows',
            'logica-e-dados/flow-logic/error-handling',
          ],
        },
        {
          type: 'category',
          label: '📊 Data Management',
          collapsed: false,
          items: [
            'logica-e-dados/data/data-structure',
            'logica-e-dados/data/data-flow',
            'logica-e-dados/data/data-mapping',
            'logica-e-dados/data/data-pinning-editing-filtering',
            'logica-e-dados/data/data-mocking',
            'logica-e-dados/data/binary-data',
            'logica-e-dados/data/schema-preview',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🔗 Integrações',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '🛠️ Builtin Nodes',
          collapsed: false,
          items: [
            'integracoes/builtin-nodes/webhook',
          ],
        },
        {
          type: 'category',
          label: '⚡ Trigger Nodes',
          collapsed: false,
          items: [
            'integracoes/trigger-nodes/manual-trigger',
            'integracoes/trigger-nodes/webhook-trigger',
            'integracoes/trigger-nodes/schedule-trigger',
          ],
        },
        {
          type: 'category',
          label: '📱 App Nodes',
          collapsed: false,
          items: [
            'integracoes/app-nodes/google-sheets',
            'integracoes/app-nodes/slack',
            'integracoes/app-nodes/gmail',
            'integracoes/app-nodes/trello',
          ],
        },
        {
          type: 'category',
          label: '🌐 Community Nodes',
          collapsed: false,
          items: [
            'integracoes/community-nodes/overview',
            'integracoes/community-nodes/instalacao',
            'integracoes/community-nodes/populares',
          ],
        },
        {
          type: 'category',
          label: '🔐 Credential Nodes',
          collapsed: false,
          items: [
            'integracoes/credential-nodes/oauth',
            'integracoes/credential-nodes/api-keys',
            'integracoes/credential-nodes/basic-auth',
          ],
        },
        {
          type: 'category',
          label: '🔨 Criar Nodes',
          collapsed: false,
          items: [
            'integracoes/criar-nodes/tutorial-desenvolvimento',
            'integracoes/criar-nodes/estrutura-node',
            'integracoes/criar-nodes/publicar-npm',
          ],
        },
        {
          type: 'category',
          label: '🇧🇷 Integrações Brasileiras',
          collapsed: false,
          items: [
            'integracoes-br/pix',
            'integracoes-br/viacep',
            'integracoes-br/cnpj-receita',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🤖 Advanced AI',
      collapsed: false,
      items: [
        'advanced-ai/tutorial-ai',
        'advanced-ai/langchain-overview',
        {
          type: 'category',
          label: '🧠 Nodes IA',
          collapsed: false,
          items: [
            'advanced-ai/nodes-ia/openai-chat',
            'advanced-ai/nodes-ia/memory-manager',
            'advanced-ai/nodes-ia/output-parser',
            'advanced-ai/nodes-ia/react-agent',
            'advanced-ai/nodes-ia/sql-agent',
            'advanced-ai/nodes-ia/workflow-tool',
          ],
        },
        {
          type: 'category',
          label: '💡 Exemplos e Casos',
          collapsed: false,
          items: [
            'advanced-ai/exemplos-casos/rag-com-arquivos',
            'advanced-ai/exemplos-casos/chatbot-suporte',
            'advanced-ai/exemplos-casos/classificacao-dados',
            'advanced-ai/exemplos-casos/geracao-conteudo',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '📚 Recursos do Markdown',
      collapsed: true,
      items: [
        'markdown-features',
      ],
    },
    {
      type: 'category',
      label: '🎓 Tutorial Básico',
      collapsed: true,
      items: [
        'tutorial-basico/instalacao',
        'tutorial-basico/conceitos-basicos',
        'tutorial-basico/primeiro-workflow',
      ],
    },
  ],

  // Deployment sidebar - "Deployment"
  deploymentSidebar: [
    {
      type: 'category',
      label: '🏗️ Hosting n8n',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '📦 Instalação',
          collapsed: false,
          items: [
            'hosting-n8n/instalacao/docker',
            'hosting-n8n/instalacao/npm',
            'hosting-n8n/instalacao/cloud',
            'hosting-n8n/instalacao/desktop',
          ],
        },
        {
          type: 'category',
          label: '⚙️ Configuração',
          collapsed: false,
          items: [
            'hosting-n8n/configuracao/variaveis-ambiente',
            'hosting-n8n/configuracao/database',
            'hosting-n8n/configuracao/queues',
            'hosting-n8n/configuracao/ssl-https',
          ],
        },
        {
          type: 'category',
          label: '📈 Escalonamento',
          collapsed: false,
          items: [
            'hosting-n8n/escalonamento/load-balancing',
            'hosting-n8n/escalonamento/clustering',
            'hosting-n8n/escalonamento/performance',
          ],
        },
        {
          type: 'category',
          label: '🛡️ Segurança',
          collapsed: false,
          items: [
            'hosting-n8n/seguranca/autenticacao',
            'hosting-n8n/seguranca/usuarios-permissoes',
            'hosting-n8n/seguranca/backup-recovery',
            'hosting-n8n/seguranca/monitoring',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🔧 API',
      collapsed: false,
      items: [
        'api/autenticacao',
        'api/paginacao',
        'api/playground',
        'api/referencia-api',
      ],
    },
    {
      type: 'category',
      label: '🌐 Embed',
      collapsed: false,
      items: [
        'embed/prerequisitos',
        'embed/implantacao',
        'embed/configuracao',
        'embed/gerenciar-workflows',
        'embed/white-labelling',
      ],
    },
  ],

  // Catalog sidebar - "Catálogo"
  catalogSidebar: [
    {
      type: 'category',
      label: '🎓 Cursos',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '📗 Nível 1',
          collapsed: false,
          items: [
            'cursos/nivel-um/capitulo-1',
            'cursos/nivel-um/capitulo-2',
            'cursos/nivel-um/capitulo-3',
            'cursos/nivel-um/capitulo-4',
            'cursos/nivel-um/capitulo-5',
          ],
        },
        {
          type: 'category',
          label: '📘 Nível 2',
          collapsed: false,
          items: [
            'cursos/nivel-dois/capitulo-1',
            'cursos/nivel-dois/capitulo-2',
            'cursos/nivel-dois/capitulo-3',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '📖 Referência',
      collapsed: false,
      items: [
        'referencia/glossario',
        'referencia/troubleshooting',
        'referencia/migration-guide',
        'referencia/performance-guide',
        'referencia/changelog',
        'referencia/apis-brasileiras',
      ],
    },
    {
      type: 'category',
      label: '🤝 Contribuir',
      collapsed: false,
      items: [
        'contribuir/guidelines',
        'contribuir/traduzir',
        'contribuir/adicionar-casos-uso',
        'contribuir/codigo-conduta',
        'contribuir/afiliados-e-creators',
        'contribuir/contribuir-codigo-e-docs',
        'contribuir/contribuir-modelos',
        'contribuir/contribuir-community',
        'contribuir/referral-vagas',
      ],
    },
  ],
};

export default sidebars; 