// Conteúdo completo e corrigido de sidebars.ts

import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Configuração completa dos sidebars para n8n Documentation BR
 * Estrutura com 11 seções principais organizadas logicamente
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Tutorial Básico',
      items: [
        'tutorial-basico/guia-instalacao',
        'tutorial-basico/instalacao',
        'tutorial-basico/instalacao-cloud',
        'tutorial-basico/instalacao-self-hosted',
        'tutorial-basico/instalacao-npm',
        'tutorial-basico/conceitos-basicos',
        'tutorial-basico/primeiro-workflow'
      ],
    },
    {
      type: 'category',
      label: 'Usando n8n',
      items: [
        'usando-n8n/index',
        {
          type: 'category',
          label: 'Getting Started',
          items: ['usando-n8n/getting-started/quickstart-rapido', 'usando-n8n/getting-started/workflow-na-pratica'],
        },
        {
          type: 'category',
          label: 'Interface',
          items: ['usando-n8n/interface/navegacao-editor-ui'],
        },
        {
          type: 'category',
          label: 'Execuções',
          items: ['usando-n8n/execucoes/componentes-execucoes'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Lógica e Dados',
      items: [
        'logica-e-dados/index',
        {
          type: 'category',
          label: 'Lógica de Fluxo',
          items: [
            'logica-e-dados/flow-logic/error-handling',
            'logica-e-dados/flow-logic/looping',
            'logica-e-dados/flow-logic/merging',
            'logica-e-dados/flow-logic/splitting',
            'logica-e-dados/flow-logic/subworkflows',
            'logica-e-dados/flow-logic/waiting',
          ],
        },
        {
          type: 'category',
          label: 'Dados',
          items: [
            'logica-e-dados/data/binary-data',
            'logica-e-dados/data/data-flow',
            'logica-e-dados/data/data-mapping',
            'logica-e-dados/data/data-mocking',
            'logica-e-dados/data/data-pinning-editing-filtering',
            'logica-e-dados/data/data-structure',
            'logica-e-dados/data/schema-preview',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Integrações',
      items: [
        'integracoes/index',
        {
          type: 'category',
          label: 'Nodes Integrados',
          items: [
            {
              type: 'category',
              label: 'Requisições HTTP',
              items: ['integracoes/builtin-nodes/http-requests/http-request', 'integracoes/builtin-nodes/http-requests/webhook'],
            },
            {
              type: 'category',
              label: 'Processamento de Dados',
              items: ['integracoes/builtin-nodes/data-processing/set'],
            },
            {
              type: 'category',
              label: 'Controle de Lógica',
              items: ['integracoes/builtin-nodes/logic-control/index'],
            },
            {
              type: 'category',
              label: 'Utilitários',
              items: ['integracoes/builtin-nodes/utilities/index'],
            },
          ],
        },
        {
          type: 'category',
          label: 'App Nodes',
          items: [
            {
              type: 'category',
              label: 'Comunicação',
              items: ['integracoes/app-nodes/communication/gmail', 'integracoes/app-nodes/communication/slack'],
            },
            {
              type: 'category',
              label: 'Produtividade',
              items: ['integracoes/app-nodes/productivity/google-sheets', 'integracoes/app-nodes/productivity/trello'],
            },
            {
              type: 'category',
              label: 'E-commerce',
              items: ['integracoes/app-nodes/ecommerce/index'],
            },
            {
              type: 'category',
              label: 'Marketing',
              items: ['integracoes/app-nodes/marketing/index'],
            },
          ],
        },
        {
          type: 'category',
          label: 'Trigger Nodes',
          items: [
            {
              type: 'category',
              label: 'Baseados em Tempo',
              items: ['integracoes/trigger-nodes/time-based/manual-trigger', 'integracoes/trigger-nodes/time-based/schedule-trigger'],
            },
            {
              type: 'category',
              label: 'Baseados em Eventos',
              items: ['integracoes/trigger-nodes/event-based/webhook-trigger'],
            },
            {
              type: 'category',
              label: 'App Triggers',
              items: ['integracoes/trigger-nodes/app-triggers/index'],
            },
          ],
        },
        {
          type: 'category',
          label: 'Credential Nodes',
          items: ['integracoes/credential-nodes/api-keys', 'integracoes/credential-nodes/basic-auth', 'integracoes/credential-nodes/oauth'],
        },
        {
          type: 'category',
          label: 'Community Nodes',
          items: ['integracoes/community-nodes/index', 'integracoes/community-nodes/instalacao', 'integracoes/community-nodes/populares'],
        },
        {
          type: 'category',
          label: 'Criar Nodes',
          items: ['integracoes/criar-nodes/estrutura-node', 'integracoes/criar-nodes/tutorial-desenvolvimento', 'integracoes/criar-nodes/publicar-npm'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Integrações Brasileiras',
      items: [
        {
          type: 'category',
          label: 'Financeiro',
          items: ['integracoes-br/financeiro/pix'],
        },
        {
          type: 'category',
          label: 'Governo',
          items: ['integracoes-br/governo/cnpj-receita'],
        },
        {
          type: 'category',
          label: 'Localização',
          items: ['integracoes-br/localizacao/viacep'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Hosting n8n',
      items: [
        'hosting-n8n/instalacao',
        {
          type: 'category',
          label: 'Instalação',
          items: ['hosting-n8n/instalacao/desktop', 'hosting-n8n/instalacao/npm', 'hosting-n8n/instalacao/docker', 'hosting-n8n/instalacao/cloud'],
        },
        {
          type: 'category',
          label: 'Configuração',
          items: ['hosting-n8n/configuracao/variaveis-ambiente', 'hosting-n8n/configuracao/database', 'hosting-n8n/configuracao/queues', 'hosting-n8n/configuracao/ssl-https'],
        },
        {
          type: 'category',
          label: 'Segurança',
          items: ['hosting-n8n/seguranca/autenticacao', 'hosting-n8n/seguranca/usuarios-permissoes', 'hosting-n8n/seguranca/backup-recovery', 'hosting-n8n/seguranca/monitoring'],
        },
        {
          type: 'category',
          label: 'Escalonamento',
          items: ['hosting-n8n/escalonamento/clustering', 'hosting-n8n/escalonamento/load-balancing', 'hosting-n8n/escalonamento/performance'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Embed',
      items: [
        'embed/index',
        {
          type: 'category',
          label: 'Preparação',
          items: ['embed/preparacao/prerequisitos'],
        },
        {
          type: 'category',
          label: 'Implementação',
          items: ['embed/implementacao/configuracao', 'embed/implementacao/implantacao'],
        },
        {
          type: 'category',
          label: 'Gerenciamento',
          items: ['embed/gerenciamento/gerenciar-workflows', 'embed/gerenciamento/white-labelling'],
        },
      ],
    },
    {
      type: 'category',
      label: 'IA Avançada',
      items: [
        'advanced-ai/index',
        'advanced-ai/tutorial-ai',
        'advanced-ai/langchain-overview',
        {
          type: 'category',
          label: 'Nodes de IA',
          items: [
            'advanced-ai/nodes-ia/index',
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
          label: 'Exemplos e Casos',
          items: [
            'advanced-ai/exemplos-casos/index',
            'advanced-ai/exemplos-casos/chatbot-suporte',
            'advanced-ai/exemplos-casos/classificacao-dados',
            'advanced-ai/exemplos-casos/geracao-conteudo',
            'advanced-ai/exemplos-casos/rag-com-arquivos',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'API',
      items: [
        'api/index',
        {
          type: 'category',
          label: 'Conceitos',
          items: ['api/conceitos/index', 'api/conceitos/autenticacao', 'api/conceitos/paginacao'],
        },
        {
          type: 'category',
          label: 'Ferramentas',
          items: ['api/ferramentas/index', 'api/ferramentas/playground'],
        },
        {
          type: 'category',
          label: 'Referência',
          items: ['api/referencia/index', 'api/referencia/referencia-api'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Referência',
      items: [
        'referencia/index',
        {
          type: 'category',
          label: 'Guias',
          items: ['referencia/guias/migration-guide', 'referencia/guias/performance-guide', 'referencia/guias/troubleshooting'],
        },
        {
          type: 'category',
          label: 'Recursos',
          items: ['referencia/recursos/glossario', 'referencia/recursos/apis-brasileiras'],
        },
        {
          type: 'category',
          label: 'Histórico',
          items: ['referencia/historico/changelog'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Contribuir',
      items: [
        'contribuir/index',
        {
          type: 'category',
          label: 'Contribuir com o Projeto n8n',
          items: [
            'contribuir/projeto-n8n/index',
            'contribuir/projeto-n8n/contribuir-codigo-e-docs',
            'contribuir/projeto-n8n/contribuir-community',
            'contribuir/projeto-n8n/contribuir-modelos',
            'contribuir/projeto-n8n/adicionar-casos-uso',
            'contribuir/projeto-n8n/afiliados-e-creators',
            'contribuir/projeto-n8n/referral-vagas',
          ],
        },
        {
          type: 'category',
          label: 'Contribuir com Esta Documentação',
          items: [
            'contribuir/esta-documentacao/index',
            {
              type: 'category',
              label: 'Entendendo o Projeto',
              items: [
                'contribuir/esta-documentacao/entendendo-o-projeto/sobre-o-projeto',
                'contribuir/esta-documentacao/entendendo-o-projeto/como-contribuir',
                'contribuir/esta-documentacao/entendendo-o-projeto/codigo-conduta',
              ],
            },
            {
              type: 'category',
              label: 'Primeiros Passos',
              items: [
                'contribuir/esta-documentacao/primeiros-passos/getting-started',
                'contribuir/esta-documentacao/primeiros-passos/exemplos-praticos',
              ],
            },
            {
              type: 'category',
              label: 'Padrões e Estilo',
              items: [
                'contribuir/esta-documentacao/padroes-e-estilo/guia-de-estilo',
                'contribuir/esta-documentacao/padroes-e-estilo/markdown-features',
                'contribuir/esta-documentacao/padroes-e-estilo/design-system',
                'contribuir/esta-documentacao/padroes-e-estilo/paleta-cores',
              ],
            },
            {
              type: 'category',
              label: 'Tradução e Localização',
              items: [
                'contribuir/esta-documentacao/traducao-e-localizacao/guia-traducao',
              ],
            },
            {
              type: 'category',
              label: 'Suporte e Dúvidas',
              items: [
                'contribuir/esta-documentacao/suporte-e-duvidas/onde-buscar-ajuda',
              ],
            },
            {
              type: 'category',
              label: 'Recursos Técnicos',
              items: [
                'contribuir/esta-documentacao/recursos-tecnicos/docusaurus-folder',
                'contribuir/esta-documentacao/recursos-tecnicos/paleta-cores',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Comunidade',
      items: [
        'comunidade/index',
        'comunidade/automacao-iniciantes/index',
        'comunidade/casos-uso-avancados/index',
        'comunidade/videos/index',
        'comunidade/github',
        'comunidade/como-participar',
        'comunidade/estatisticas',
      ],
    },
    {
      type: 'category',
      label: 'Cursos',
      items: [
        'cursos/index',
        {
          type: 'category',
          label: 'Cursos em Vídeo',
          items: [
            'cursos/cursos-em-video/index',
            'cursos/cursos-em-video/curso-iniciante',
            'cursos/cursos-em-video/curso-avancado',
          ],
        },
        {
          type: 'category',
          label: 'Cursos em Texto',
          items: [
            'cursos/cursos-em-texto/index',
            {
              type: 'category',
              label: 'Nível Um',
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
              label: 'Nível Dois',
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
};

export default sidebars;
