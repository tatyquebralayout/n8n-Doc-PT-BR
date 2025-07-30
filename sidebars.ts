// Conteúdo completo e corrigido de sidebars.ts

import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Configuração completa dos sidebars para n8n Documentation BR
 *
 * Organização padronizada:
 * - Onboarding e primeiros passos
 * - Guias práticos e exemplos de uso
 * - Fundamentos técnicos e arquitetura
 * - Referência e API
 * - Histórico e release notes
 * - Cursos e comunidade
 */
const sidebars: SidebarsConfig = {
  // Onboarding e primeiros passos
  tutorialSidebar: [
    'intro',
    // 'recursos-hibridos',
    {
      type: 'category',
      label: 'Primeiros Passos',
      items: [
        'primeiros-passos/index',
        'primeiros-passos/conceitos-fundamentais',
        'primeiros-passos/guia-instalacao',
        'primeiros-passos/conectar-aplicacoes',
        'primeiros-passos/primeiro-workflow',
        'primeiros-passos/faq',
        'primeiros-passos/troubleshooting'
      ],
    },
    // Guias práticos e exemplos de uso
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
          items: [
            'usando-n8n/interface/index',
            'usando-n8n/interface/navegacao-editor-ui'
          ],
        },
        {
          type: 'category',
          label: 'Execuções',
          items: [
            'usando-n8n/execucoes/index', // Guia prático de execução
            'usando-n8n/execucoes/componentes-execucoes'
          ],
        },
        {
          type: 'category',
          label: 'Credenciais',
          items: [
            'usando-n8n/credenciais/index',
            'usando-n8n/credenciais/criar-editar',
            'usando-n8n/credenciais/compartilhamento',
            'usando-n8n/credenciais/boas-praticas',
            'usando-n8n/credenciais/politicas-seguranca',
            'usando-n8n/credenciais/treinamento-seguranca',
            'usando-n8n/credenciais/seguranca-jwt'
          ],
        },
        {
          type: 'category',
          label: 'Workflows',
          items: [
            'usando-n8n/workflows/index',
            'usando-n8n/workflows/criar-editar',
            'usando-n8n/workflows/historico',
            'usando-n8n/workflows/configuracoes',
            'usando-n8n/workflows/compartilhamento',
            'usando-n8n/workflows/export-import',
            'usando-n8n/workflows/tags',
            'usando-n8n/workflows/workflow-id',
            'usando-n8n/workflows/organizar',
            'usando-n8n/workflows/otimizar' // Guia prático de otimização
          ],
        },
        {
          type: 'category',
          label: 'Monitoramento',
          items: [
            'usando-n8n/monitoring/index',
            'usando-n8n/monitoring/visualizar-execucoes',
            'usando-n8n/monitoring/analisar-logs', // Guia prático de debugging
            'usando-n8n/monitoring/configurar-alertas'
          ],
        },
        {
          type: 'category',
          label: 'Usuários e Permissões',
          items: [
            'usando-n8n/usuarios-permissoes/index',
            'usando-n8n/usuarios-permissoes/criar-editar-usuarios',
            'usando-n8n/usuarios-permissoes/autenticacao',
            'usando-n8n/usuarios-permissoes/roles-permissoes'
          ],
        },
      ],
    },
    // Fundamentos técnicos e arquitetura
    {
      type: 'category',
      label: 'Lógica e Dados',
      items: [
        'logica-e-dados/index',
        // 'logica-e-dados/expressoes',
        // 'logica-e-dados/execucao', // Agora só fundamentos, com link para o prático
        'logica-e-dados/conexoes',
        {
          type: 'category',
          label: 'Lógica de Fluxo',
          items: [
            // 'logica-e-dados/flow-logic/index',
            // 'logica-e-dados/flow-logic/error-handling',
            'logica-e-dados/flow-logic/looping',
            'logica-e-dados/flow-logic/merging',
            'logica-e-dados/flow-logic/splitting',
            'logica-e-dados/flow-logic/subworkflows',
            'logica-e-dados/flow-logic/waiting',
            // 'logica-e-dados/flow-logic/execution-order',
            // 'logica-e-dados/flow-logic/debugging' // Agora só fundamentos, com link para o prático
          ],
        },
        {
          type: 'category',
          label: 'Dados',
          items: [
            'logica-e-dados/data/index',
            'logica-e-dados/data/data-mapping-avancado',
            // 'logica-e-dados/data/transformacoes-dados',
            'logica-e-dados/data/binary-data',
            'logica-e-dados/data/data-mocking',
            // 'logica-e-dados/data/schema-preview',
            'logica-e-dados/data/data-filtering',
            'logica-e-dados/data/data-editing',
            'logica-e-dados/data/agregacoes-estatisticas',
            'logica-e-dados/data/integracao-apis',
            // 'logica-e-dados/data/otimizacao-performance', // Agora só fundamentos, com link para o prático
            // 'logica-e-dados/data/visualizacao-dados',
            'logica-e-dados/data/data-flow-nodes',
            'logica-e-dados/data/data-pinning',
            'logica-e-dados/data/data-structure'
          ],
        },
      ],
    },
    // Referência e API
    {
      type: 'category',
      label: 'Referência',
      items: [
        'referencia/index',
        {
          type: 'category',
          label: 'Guias',
          items: [
            'referencia/guias/index',
            'referencia/guias/migration-guide',
            'referencia/guias/performance-guide',
            'referencia/guias/troubleshooting'
          ],
        },
        {
          type: 'category',
          label: 'Recursos',
          items: [
            'referencia/recursos/index',
            'referencia/recursos/glossario',
            'referencia/recursos/apis-brasileiras'
          ],
        },
        {
          type: 'category',
          label: 'Histórico',
          items: [
            'referencia/historico/index',
            'referencia/historico/changelog'
          ],
        },
      ],
    },
    // Integrações e exemplos
    {
      type: 'category',
      label: 'Integrações',
      items: [
        'integracoes/index',
        'integracoes/templates',
        'integracoes/webhooks',
        {
          type: 'category',
          label: 'Nodes Integrados',
          items: [
            {
              type: 'category',
              label: 'Requisições HTTP',
              items: [
                'integracoes/builtin-nodes/http-requests/index',
                'integracoes/builtin-nodes/http-requests/http-request',
                'integracoes/builtin-nodes/http-requests/webhook'
              ],
            },
            {
              type: 'category',
              label: 'Processamento de Dados',
              items: [
                'integracoes/builtin-nodes/data-processing/index',
                'integracoes/builtin-nodes/data-processing/set',
                'integracoes/builtin-nodes/data-processing/aggregate',
                'integracoes/builtin-nodes/data-processing/split-in-batches'
              ],
            },
            {
              type: 'category',
              label: 'Controle de Lógica',
              items: [
                'integracoes/builtin-nodes/logic-control/index',
                'integracoes/builtin-nodes/logic-control/if',
                'integracoes/builtin-nodes/logic-control/merge',
                'integracoes/builtin-nodes/logic-control/switch',
                'integracoes/builtin-nodes/logic-control/wait'
              ],
            },
            {
              type: 'category',
              label: 'Core Nodes',
              items: [
                'integracoes/builtin-nodes/core-nodes/index',
                // 'integracoes/builtin-nodes/core-nodes/code',
                // 'integracoes/builtin-nodes/core-nodes/debug-helper',
                // 'integracoes/builtin-nodes/core-nodes/edit-fields-set',
                // 'integracoes/builtin-nodes/core-nodes/error-trigger',
                // 'integracoes/builtin-nodes/core-nodes/execute-sub-workflow',
                // 'integracoes/builtin-nodes/core-nodes/expression',
                'integracoes/builtin-nodes/core-nodes/function',
                'integracoes/builtin-nodes/core-nodes/workflow-trigger'
              ],
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
              items: [
                'integracoes/app-nodes/communication/index',
                'integracoes/app-nodes/communication/gmail',
                'integracoes/app-nodes/communication/slack'
              ],
            },
            {
              type: 'category',
              label: 'Produtividade',
              items: [
                'integracoes/app-nodes/productivity/index',
                'integracoes/app-nodes/productivity/google-sheets',
                // 'integracoes/app-nodes/productivity/trello'
              ],
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
              items: [
                'integracoes/trigger-nodes/time-based/index',
                'integracoes/trigger-nodes/time-based/manual-trigger',
                'integracoes/trigger-nodes/time-based/schedule-trigger'
              ],
            },
            {
              type: 'category',
              label: 'Baseados em Eventos',
              items: [
                'integracoes/trigger-nodes/event-based/index',
                'integracoes/trigger-nodes/event-based/webhook-trigger'
              ],
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
          items: [
            'integracoes/criar-nodes/index',
            'integracoes/criar-nodes/estrutura-node',
            'integracoes/criar-nodes/tutorial-desenvolvimento',
            'integracoes/criar-nodes/publicar-npm'
          ],
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
          items: [
            'integracoes-br/financeiro/index',
            'integracoes-br/financeiro/pix',
            'integracoes-br/financeiro/pix-avancado',
            'integracoes-br/financeiro/nfe-integracao',
            'integracoes-br/financeiro/conciliacao-bancaria',
            'integracoes-br/financeiro/relatorios-fiscais'
          ],
        },
        {
          type: 'category',
          label: 'Governo',
          items: [
            'integracoes-br/governo/index',
            'integracoes-br/governo/cnpj-receita'
          ],
        },
        {
          type: 'category',
          label: 'Localização',
          items: [
            'integracoes-br/localizacao/index',
            'integracoes-br/localizacao/viacep'
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Hosting n8n',
      items: [
        'hosting-n8n/index',
        {
          type: 'category',
          label: 'Instalação',
          items: [
            'hosting-n8n/instalacao/index',
            'hosting-n8n/instalacao/desktop',
            'hosting-n8n/instalacao/npm',
            'hosting-n8n/instalacao/docker',
            'hosting-n8n/instalacao/cloud',
            'hosting-n8n/instalacao/aws-brasil',
            'hosting-n8n/instalacao/azure-brasil',
            'hosting-n8n/instalacao/gcp-brasil'
          ],
        },
        {
          type: 'category',
          label: 'Configuração',
          items: [
            'hosting-n8n/configuracao/index',
            'hosting-n8n/configuracao/variaveis-ambiente',
            'hosting-n8n/configuracao/database',
            'hosting-n8n/configuracao/queues',
            'hosting-n8n/configuracao/ssl-https'
          ],
        },
                {
          type: 'category',
          label: 'Segurança',
          items: [
            'hosting-n8n/seguranca/index',
            'hosting-n8n/seguranca/autenticacao',
            'hosting-n8n/seguranca/usuarios-permissoes',
            'hosting-n8n/seguranca/backup-recovery',
            'hosting-n8n/seguranca/monitoring',
            'hosting-n8n/seguranca/privacy-security'
          ],
        },
        {
          type: 'category',
          label: 'Escalonamento',
          items: [
            'hosting-n8n/escalonamento/index',
            'hosting-n8n/escalonamento/clustering',
            'hosting-n8n/escalonamento/load-balancing',
            'hosting-n8n/escalonamento/performance'
          ],
        },
        {
          type: 'category',
          label: 'Compliance',
          items: [
            'hosting-n8n/compliance/index',
            'hosting-n8n/compliance/lgpd'
          ],
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
          items: [
            'embed/preparacao/index',
            'embed/preparacao/prerequisitos'
          ],
        },
        {
          type: 'category',
          label: 'Implementação',
          items: [
            'embed/implementacao/index',
            'embed/implementacao/configuracao',
            'embed/implementacao/implantacao'
          ],
        },
        {
          type: 'category',
          label: 'Gerenciamento',
          items: [
            'embed/gerenciamento/index',
            'embed/gerenciamento/gerenciar-workflows',
            'embed/gerenciamento/white-labelling',
          ],
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
        'advanced-ai/nodes-ia/ai-agent',
        'advanced-ai/nodes-ia/sentiment-analysis',
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
        'advanced-ai/exemplos-casos/ferramentas-ia',
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
          items: [
            'api/conceitos/index',
            'api/conceitos/autenticacao',
            'api/conceitos/paginacao'
          ],
        },
        {
          type: 'category',
          label: 'Ferramentas',
          items: [
            'api/ferramentas/index',
            'api/ferramentas/playground'
          ],
        },
        {
          type: 'category',
          label: 'Referência da API',
          items: [
            'api/referencia/index',
            'api/referencia/referencia-api'
          ],
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
          label: 'Contribuir com n8n oficial',
          items: [
            'contribuir/n8n-oficial/index',
            'contribuir/n8n-oficial/contribuir-codigo-e-docs',
            'contribuir/n8n-oficial/contribuir-community',
            'contribuir/n8n-oficial/contribuir-modelos',
            'contribuir/n8n-oficial/adicionar-casos-uso',
            'contribuir/n8n-oficial/afiliados-e-creators',
            'contribuir/n8n-oficial/referral-vagas',
          ],
        },
        {
          type: 'category',
          label: 'Contribuir com Esta Documentação',
          items: [
                         'contribuir/esta-documentacao/index',
             'contribuir/esta-documentacao/guidelines',
            {
              type: 'category',
              label: 'Entendendo o Projeto',
              items: [
                'contribuir/esta-documentacao/entendendo-o-projeto/index',
                'contribuir/esta-documentacao/entendendo-o-projeto/sobre-o-projeto',
                'contribuir/esta-documentacao/entendendo-o-projeto/como-contribuir',
                'contribuir/esta-documentacao/entendendo-o-projeto/codigo-conduta',
                'contribuir/esta-documentacao/entendendo-o-projeto/mentoria',
                'contribuir/esta-documentacao/entendendo-o-projeto/roadmap',
                'contribuir/esta-documentacao/entendendo-o-projeto/sistema-overlaps'
              ],
            },
            {
              type: 'category',
              label: 'Primeiros Passos',
              items: [
                'contribuir/esta-documentacao/primeiros-passos/index',
                'contribuir/esta-documentacao/primeiros-passos/getting-started',
                'contribuir/esta-documentacao/primeiros-passos/exemplos-praticos',
                'contribuir/esta-documentacao/primeiros-passos/processo-validacao'
              ],
            },
            {
              type: 'category',
              label: 'Padrões e Estilo',
              items: [
                'contribuir/esta-documentacao/padroes-e-estilo/index',
                'contribuir/esta-documentacao/padroes-e-estilo/intro',
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
                'contribuir/esta-documentacao/traducao-e-localizacao/index',
                'contribuir/esta-documentacao/traducao-e-localizacao/guia-traducao',
              ],
            },
            {
              type: 'category',
              label: 'Suporte e Dúvidas',
              items: [
                'contribuir/esta-documentacao/suporte-e-duvidas/index',
                'contribuir/esta-documentacao/suporte-e-duvidas/onde-buscar-ajuda',
              ],
            },
            {
              type: 'category',
              label: 'Recursos Técnicos',
              items: [
                'contribuir/esta-documentacao/recursos-tecnicos/index',
                'contribuir/esta-documentacao/recursos-tecnicos/docusaurus-folder',
                'contribuir/esta-documentacao/recursos-tecnicos/paleta-cores',
                'contribuir/esta-documentacao/recursos-tecnicos/validacao-overlaps'
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
      label: 'Privacidade e Segurança',
      items: [
        'privacidade-seguranca/index',
        'privacidade-seguranca/privacy',
        'privacidade-seguranca/security-best-practices',
        'privacidade-seguranca/lgpd-compliance',
      ],
    },
    {
      type: 'category',
      label: 'Catálogo',
      items: [
        'catalogo/index',
        'catalogo/servicos-brasileiros',
        'catalogo/ia-machine-learning',
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
