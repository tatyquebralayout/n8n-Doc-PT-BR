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
            '01-usando-n8n/01-getting-started/quickstart-rapido',
            '01-usando-n8n/01-getting-started/workflow-na-pratica',
          ],
        },
        '01-usando-n8n/02-navegacao-editor-ui',
        '01-usando-n8n/03-componentes-execucoes',
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
            '02-logica-e-dados/01-flow-logic/splitting',
            '02-logica-e-dados/01-flow-logic/merging',
            '02-logica-e-dados/01-flow-logic/looping',
            '02-logica-e-dados/01-flow-logic/waiting',
            '02-logica-e-dados/01-flow-logic/subworkflows',
            '02-logica-e-dados/01-flow-logic/error-handling',
          ],
        },
        {
          type: 'category',
          label: '📊 Data Management',
          collapsed: false,
          items: [
            '02-logica-e-dados/02-data/data-structure',
            '02-logica-e-dados/02-data/data-flow',
            '02-logica-e-dados/02-data/data-mapping',
            '02-logica-e-dados/02-data/data-pinning-editing-filtering',
            '02-logica-e-dados/02-data/data-mocking',
            '02-logica-e-dados/02-data/binary-data',
            '02-logica-e-dados/02-data/schema-preview',
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
            '03-integracoes/builtin-nodes/webhook',
          ],
        },
        {
          type: 'category',
          label: '⚡ Trigger Nodes',
          collapsed: false,
          items: [
            '03-integracoes/trigger-nodes/manual-trigger',
            '03-integracoes/trigger-nodes/webhook-trigger',
            '03-integracoes/trigger-nodes/schedule-trigger',
          ],
        },
        {
          type: 'category',
          label: '📱 App Nodes',
          collapsed: false,
          items: [
            '03-integracoes/app-nodes/google-sheets',
            '03-integracoes/app-nodes/slack',
            '03-integracoes/app-nodes/gmail',
            '03-integracoes/app-nodes/trello',
          ],
        },
        {
          type: 'category',
          label: '🌐 Community Nodes',
          collapsed: false,
          items: [
            '03-integracoes/community-nodes/overview',
            '03-integracoes/community-nodes/instalacao',
            '03-integracoes/community-nodes/populares',
          ],
        },
        {
          type: 'category',
          label: '🔐 Credential Nodes',
          collapsed: false,
          items: [
            '03-integracoes/credential-nodes/oauth',
            '03-integracoes/credential-nodes/api-keys',
            '03-integracoes/credential-nodes/basic-auth',
          ],
        },
        {
          type: 'category',
          label: '🔨 Criar Nodes',
          collapsed: false,
          items: [
            '03-integracoes/criar-nodes/tutorial-desenvolvimento',
            '03-integracoes/criar-nodes/estrutura-node',
            '03-integracoes/criar-nodes/publicar-npm',
          ],
        },
        {
          type: 'category',
          label: '🇧🇷 Integrações Brasileiras',
          collapsed: false,
          items: [
            '04-integracoes-br/pix',
            '04-integracoes-br/viacep',
            '04-integracoes-br/cnpj-receita',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🤖 Advanced AI',
      collapsed: false,
      items: [
        '08-advanced-ai/tutorial-ai',
        '08-advanced-ai/langchain-overview',
        {
          type: 'category',
          label: '🧠 Nodes IA',
          collapsed: false,
          items: [
            '08-advanced-ai/nodes-ia/openai-chat',
            '08-advanced-ai/nodes-ia/memory-manager',
            '08-advanced-ai/nodes-ia/output-parser',
            '08-advanced-ai/nodes-ia/react-agent',
            '08-advanced-ai/nodes-ia/sql-agent',
            '08-advanced-ai/nodes-ia/workflow-tool',
          ],
        },
        {
          type: 'category',
          label: '💡 Exemplos e Casos',
          collapsed: false,
          items: [
            '08-advanced-ai/exemplos-casos/rag-com-arquivos',
            '08-advanced-ai/exemplos-casos/chatbot-suporte',
            '08-advanced-ai/exemplos-casos/classificacao-dados',
            '08-advanced-ai/exemplos-casos/geracao-conteudo',
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
            '05-hosting-n8n/instalacao/docker',
            '05-hosting-n8n/instalacao/npm',
            '05-hosting-n8n/instalacao/cloud',
            '05-hosting-n8n/instalacao/desktop',
          ],
        },
        {
          type: 'category',
          label: '⚙️ Configuração',
          collapsed: false,
          items: [
            '05-hosting-n8n/configuracao/variaveis-ambiente',
            '05-hosting-n8n/configuracao/database',
            '05-hosting-n8n/configuracao/queues',
            '05-hosting-n8n/configuracao/ssl-https',
          ],
        },
        {
          type: 'category',
          label: '📈 Escalonamento',
          collapsed: false,
          items: [
            '05-hosting-n8n/escalonamento/load-balancing',
            '05-hosting-n8n/escalonamento/clustering',
            '05-hosting-n8n/escalonamento/performance',
          ],
        },
        {
          type: 'category',
          label: '🛡️ Segurança',
          collapsed: false,
          items: [
            '05-hosting-n8n/seguranca/autenticacao',
            '05-hosting-n8n/seguranca/usuarios-permissoes',
            '05-hosting-n8n/seguranca/backup-recovery',
            '05-hosting-n8n/seguranca/monitoring',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🔧 API',
      collapsed: false,
      items: [
        '06-api/autenticacao',
        '06-api/paginacao',
        '06-api/playground',
        '06-api/referencia-api',
      ],
    },
    {
      type: 'category',
      label: '🌐 Embed',
      collapsed: false,
      items: [
        '07-embed/prerequisitos',
        '07-embed/implantacao',
        '07-embed/configuracao',
        '07-embed/gerenciar-workflows',
        '07-embed/white-labelling',
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
            '09-cursos/nivel-um/capitulo-1',
            '09-cursos/nivel-um/capitulo-2',
            '09-cursos/nivel-um/capitulo-3',
            '09-cursos/nivel-um/capitulo-4',
            '09-cursos/nivel-um/capitulo-5',
          ],
        },
        {
          type: 'category',
          label: '📘 Nível 2',
          collapsed: false,
          items: [
            '09-cursos/nivel-dois/capitulo-1',
            '09-cursos/nivel-dois/capitulo-2',
            '09-cursos/nivel-dois/capitulo-3',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '📖 Referência',
      collapsed: false,
      items: [
        '10-referencia/glossario',
        '10-referencia/troubleshooting',
        '10-referencia/migration-guide',
        '10-referencia/performance-guide',
        '10-referencia/changelog',
        '10-referencia/apis-brasileiras',
      ],
    },
    {
      type: 'category',
      label: '🤝 Contribuir',
      collapsed: false,
      items: [
        '11-contribuir/guidelines',
        '11-contribuir/traduzir',
        '11-contribuir/adicionar-casos-uso',
        '11-contribuir/codigo-conduta',
        '11-contribuir/afiliados-e-creators',
        '11-contribuir/contribuir-codigo-e-docs',
        '11-contribuir/contribuir-modelos',
        '11-contribuir/contribuir-community',
        '11-contribuir/referral-vagas',
      ],
    },
  ],
};

export default sidebars; 