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
        {
          type: 'category',
          label: '🖥️ Interface',
          collapsed: false,
          items: [
            'usando-n8n/interface/navegacao-editor-ui',
          ],
        },
        {
          type: 'category',
          label: '▶️ Execuções',
          collapsed: false,
          items: [
            'usando-n8n/execucoes/componentes-execucoes',
          ],
        },
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
      label: '🧩 Nodes e Integrações',
      collapsed: false,
      items: [
        'integracoes/overview',
        {
          type: 'category',
          label: '🛠️ Core Nodes (Nativos)',
          collapsed: false,
          items: [
            {
              type: 'category',
              label: '📊 Processamento de Dados',
              collapsed: false,
              items: [
                'integracoes/builtin-nodes/data-processing/set',
              ],
            },
            {
              type: 'category',
              label: '🌐 Requisições HTTP',
              collapsed: false,
              items: [
                'integracoes/builtin-nodes/http-requests/webhook',
                'integracoes/builtin-nodes/http-requests/http-request',
              ],
            },
            {
              type: 'category',
              label: '🎮 Controle de Lógica',
              collapsed: false,
              items: [
                'integracoes/builtin-nodes/logic-control/index',
              ],
            },
            {
              type: 'category',
              label: '🛠️ Utilitários',
              collapsed: false,
              items: [
                'integracoes/builtin-nodes/utilities/index',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: '⚡ Trigger Nodes (Gatilhos)',
          collapsed: false,
          items: [
            {
              type: 'category',
              label: '⏰ Baseados em Tempo',
              collapsed: false,
              items: [
                'integracoes/trigger-nodes/time-based/manual-trigger',
                'integracoes/trigger-nodes/time-based/schedule-trigger',
              ],
            },
            {
              type: 'category',
              label: '🎯 Baseados em Eventos',
              collapsed: false,
              items: [
                'integracoes/trigger-nodes/event-based/webhook-trigger',
              ],
            },
            {
              type: 'category',
              label: '📱 App Triggers',
              collapsed: false,
              items: [
                'integracoes/trigger-nodes/app-triggers/index',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: '🔗 Integrações com Apps',
          collapsed: false,
          items: [
            {
              type: 'category',
              label: '📊 Produtividade',
              collapsed: false,
              items: [
                'integracoes/app-nodes/productivity/google-sheets',
                'integracoes/app-nodes/productivity/trello',
              ],
            },
            {
              type: 'category',
              label: '💬 Comunicação',
              collapsed: false,
              items: [
                'integracoes/app-nodes/communication/slack',
                'integracoes/app-nodes/communication/gmail',
              ],
            },
            {
              type: 'category',
              label: '🛒 E-commerce',
              collapsed: false,
              items: [
                'integracoes/app-nodes/ecommerce/index',
              ],
            },
            {
              type: 'category',
              label: '📈 Marketing',
              collapsed: false,
              items: [
                'integracoes/app-nodes/marketing/index',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: '🌐 Nodes da Comunidade',
          collapsed: false,
          items: [
            'integracoes/community-nodes/overview',
            'integracoes/community-nodes/instalacao',
            'integracoes/community-nodes/populares',
          ],
        },
        {
          type: 'category',
          label: '🔐 Autenticação e Credenciais',
          collapsed: false,
          items: [
            'integracoes/credential-nodes/oauth',
            'integracoes/credential-nodes/api-keys',
            'integracoes/credential-nodes/basic-auth',
          ],
        },
        {
          type: 'category',
          label: '🔨 Desenvolvimento de Nodes',
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
            {
              type: 'category',
              label: '💰 Financeiro',
              collapsed: false,
              items: [
                'integracoes-br/financeiro/pix',
              ],
            },
            {
              type: 'category',
              label: '🏛️ Governo',
              collapsed: false,
              items: [
                'integracoes-br/governo/cnpj-receita',
              ],
            },
            {
              type: 'category',
              label: '📍 Localização',
              collapsed: false,
              items: [
                'integracoes-br/localizacao/viacep',
              ],
            },
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
            'advanced-ai/nodes-ia/overview',
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
            'advanced-ai/exemplos-casos/overview',
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
        'hosting-n8n/instalacao',
        {
          type: 'category',
          label: '📦 Métodos de Instalação',
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
        {
          type: 'category',
          label: '💡 Conceitos',
          collapsed: false,
          items: [
            'api/conceitos/overview',
            'api/conceitos/autenticacao',
            'api/conceitos/paginacao',
          ],
        },
        {
          type: 'category',
          label: '🛠️ Ferramentas',
          collapsed: false,
          items: [
            'api/ferramentas/overview',
            'api/ferramentas/playground',
          ],
        },
        {
          type: 'category',
          label: '📖 Referência',
          collapsed: false,
          items: [
            'api/referencia/overview',
            'api/referencia/referencia-api',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🌐 Embed',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '🎯 Preparação',
          collapsed: false,
          items: [
            'embed/preparacao/prerequisitos',
          ],
        },
        {
          type: 'category',
          label: '🚀 Implementação',
          collapsed: false,
          items: [
            'embed/implementacao/implantacao',
            'embed/implementacao/configuracao',
          ],
        },
        {
          type: 'category',
          label: '⚙️ Gerenciamento',
          collapsed: false,
          items: [
            'embed/gerenciamento/gerenciar-workflows',
            'embed/gerenciamento/white-labelling',
          ],
        },
      ],
    },
  ],

  // Cursos Sidebar
  cursosSidebar: [
    {
      type: 'category',
      label: '🎓 Cursos',
      collapsed: false,
      items: [
        'cursos/index',
        {
          type: 'category',
          label: '📺 Cursos em Vídeo',
          collapsed: false,
          items: [
            'cursos/cursos-em-video/overview',
            'cursos/cursos-em-video/curso-iniciante',
            'cursos/cursos-em-video/curso-avancado',
          ],
        },
        {
          type: 'category',
          label: '📝 Cursos em Texto',
          collapsed: false,
          items: [
            'cursos/cursos-em-texto/overview',
            {
              type: 'category',
              label: '📗 Nível 1',
              collapsed: false,
              items: [
                'cursos/cursos-em-texto/nivel-um/capitulo-1',
                'cursos/cursos-em-texto/nivel-um/capitulo-2',
                'cursos/cursos-em-texto/nivel-um/capitulo-3',
                'cursos/cursos-em-texto/nivel-um/capitulo-4',
                'cursos/cursos-em-texto/nivel-um/capitulo-5',
              ],
            },
            {
              type: 'category',
              label: '📘 Nível 2',
              collapsed: false,
              items: [
                'cursos/cursos-em-texto/nivel-dois/capitulo-1',
                'cursos/cursos-em-texto/nivel-dois/capitulo-2',
                'cursos/cursos-em-texto/nivel-dois/capitulo-3',
              ],
            },
          ],
        },
      ],
    },
  ],

  // Contribuir Sidebar
  contribuirSidebar: [
    {
      type: 'category',
      label: '🤝 Como Contribuir',
      collapsed: false,
      items: [
        'contribuir/index',
        {
          type: 'category',
          label: '📚 Esta Documentação',
          collapsed: false,
          items: [
            'contribuir/esta-documentacao/overview',
            'contribuir/esta-documentacao/guidelines',
            'contribuir/esta-documentacao/codigo-conduta',
            'contribuir/esta-documentacao/traduzir',
            'contribuir/esta-documentacao/markdown-features',
          ],
        },
        {
          type: 'category',
          label: '🚀 Projeto n8n',
          collapsed: false,
          items: [
            'contribuir/projeto-n8n/overview',
            'contribuir/projeto-n8n/contribuir-codigo-e-docs',
            'contribuir/projeto-n8n/contribuir-modelos',
            'contribuir/projeto-n8n/adicionar-casos-uso',
            'contribuir/projeto-n8n/contribuir-community',
            'contribuir/projeto-n8n/afiliados-e-creators',
            'contribuir/projeto-n8n/referral-vagas',
          ],
        },
      ],
    },
  ],

  // Referencia Sidebar
  referenciaSidebar: [
    {
      type: 'category',
      label: '📖 Referência',
      collapsed: false,
      items: [
        'referencia/index',
        {
          type: 'category',
          label: '📚 Guias',
          collapsed: false,
          items: [
            'referencia/guias/performance-guide',
            'referencia/guias/migration-guide',
            'referencia/guias/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: '🔍 Recursos',
          collapsed: false,
          items: [
            'referencia/recursos/glossario',
            'referencia/recursos/apis-brasileiras',
          ],
        },
        {
          type: 'category',
          label: '📅 Histórico',
          collapsed: false,
          items: [
            'referencia/historico/changelog',
          ],
        },
      ],
    },
  ],
};

export default sidebars; 