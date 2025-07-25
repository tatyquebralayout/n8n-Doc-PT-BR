import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'n8n Brasil 🇧🇷',
  tagline: 'Uma iniciativa da comunidade brasileira para democratizar a automação, uma linha de código e um workflow de cada vez.',
  favicon: 'img/favicon-br.svg',

  // Set the production url of your site here
  url: 'https://n8n-brasil.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/n8n-Doc-PT-BR/',

  organizationName: 'n8n-brasil',
  projectName: 'n8n-Doc-PT-BR',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Experimental Docusaurus Faster for improved performance and newer infrastructure
  future: {
    experimental_faster: true,
    v4: true,
  },

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
    localeConfigs: {
      'pt-BR': {
        label: 'Português',
        direction: 'ltr',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/n8n-brasil/n8n-Doc-PT-BR/tree/main/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          routeBasePath: '/',
          sidebarCollapsed: false,
          breadcrumbs: true,
        },
        blog: false, // Desabilitar blog padrão para usar nossa página customizada
        pages: {
          remarkPlugins: [],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  // Configurações para evitar conflitos de porta
  customFields: {
    port: process.env.PORT || 3000,
  },

  plugins: [
    // Plugin de busca local
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["pt", "en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarPosition: "right",
        docsRouteBasePath: "/",
        indexPages: true,
      },
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],
  
  markdown: {
    mermaid: true,
  },

  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.esm.js',
      type: 'module',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.js',
      nomodule: true,
    },
  ],

  themeConfig: {
    image: 'img/n8n-social-card.jpg',
    
    navbar: {
      title: '',
      logo: {
        alt: 'n8n Brasil - Documentação em Português',
        src: 'img/n8n-color.webp',
        srcDark: 'img/n8n-color_dark.webp',
        href: '/',
        width: 150,
        height: 50,
      },
      items: [
        {
          label: 'Início',
          to: '/',
          position: 'left',
          className: 'navbar-home-link',
          'aria-label': 'Página inicial da documentação n8n Brasil',
          title: 'Página inicial da documentação n8n Brasil',
        },
        
        // Dropdown "Documentação" - Agrupa conteúdo principal
        {
          type: 'dropdown',
          label: 'Documentação n8n',
          position: 'left',
          className: 'navbar-documentation-dropdown',
          'aria-label': 'Acesse guias, tutoriais e referência da documentação n8n em português',
          title: 'Acesse guias, tutoriais e referência da documentação n8n em português',
          items: [
            { label: 'Guia de Instalação do n8n', to: '/primeiros-passos/guia-instalacao', title: 'Guia de Instalação do n8n' },
            { label: 'Primeiros Passos', to: '/primeiros-passos/guia-instalacao', title: 'Primeiros Passos com n8n' },
            { label: 'Guias Avançados', to: '/usando-n8n', title: 'Guias Avançados de Automação n8n' },
            { label: 'Lógica e Dados', to: '/logica-e-dados', title: 'Lógica e Fluxo de Dados no n8n' },
            { label: 'IA Avançada', to: '/advanced-ai', title: 'Inteligência Artificial Avançada no n8n' },
            { label: 'API', to: '/api', title: 'Documentação da API n8n' },
            { label: 'Deployment', to: '/hosting-n8n/instalacao', title: 'Guia de Deployment do n8n' },
            { label: 'Embed', to: '/embed', title: 'Embed n8n' },
          ],
        },
        
        // Dropdown "Integrações" - Destaque para nodes
        {
          type: 'dropdown',
          label: 'Integrações n8n',
          position: 'left',
          className: 'navbar-integrations-dropdown',
          'aria-label': 'Acesse integrações, nodes e recursos brasileiros do n8n',
          title: 'Acesse integrações, nodes e recursos brasileiros do n8n',
          items: [
            { label: 'Todos os Nodes', to: '/integracoes', title: 'Todos os Nodes do n8n' },
            { label: 'Integrações BR', to: '/integracoes-br', title: 'Integrações Brasileiras no n8n' },
            { label: 'Criar Nodes', to: '/integracoes/criar-nodes', title: 'Como criar nodes no n8n' },
          ],
        },
        
        // Dropdown "Comunidade" - Agrupa conteúdo da comunidade
        {
          type: 'dropdown',
          label: 'Comunidade n8n Brasil',
          position: 'left',
          className: 'navbar-community-dropdown',
          'aria-label': 'Conteúdo, artigos e participação da comunidade n8n Brasil',
          title: 'Conteúdo, artigos e participação da comunidade n8n Brasil',
          items: [
            { label: 'Artigos', to: '/comunidade/automacao-iniciantes', title: 'Artigos da Comunidade n8n Brasil' },
            { label: 'Vídeos da Comunidade', to: '/comunidade/videos', title: 'Vídeos da Comunidade n8n Brasil' },
            { label: 'Repositórios da Comunidade', to: '/comunidade/github', title: 'Repositórios da Comunidade n8n Brasil' },
            { label: 'Como Participar', to: '/comunidade/como-participar', title: 'Como Participar da Comunidade n8n Brasil' },
          ],
        },
        // Dropdown "Cursos" - Agrupa cursos em vídeo e texto
        {
          type: 'dropdown',
          label: 'Cursos n8n',
          position: 'left',
          className: 'navbar-courses-dropdown',
          'aria-label': 'Cursos em vídeo e texto sobre n8n',
          title: 'Cursos em vídeo e texto sobre n8n',
          items: [
            { label: 'Visão Geral', to: '/cursos', title: 'Visão Geral dos Cursos n8n' },
            { label: 'Cursos em Vídeo', to: '/cursos/cursos-em-video', title: 'Cursos em Vídeo n8n' },
            { label: 'Cursos em Texto', to: '/cursos/cursos-em-texto', title: 'Cursos em Texto n8n' },
            { label: 'Nível 1 - Básico', to: '/cursos/cursos-em-texto/nivel-um', title: 'Curso Básico n8n' },
            { label: 'Nível 2 - Avançado', to: '/cursos/cursos-em-texto/nivel-dois', title: 'Curso Avançado n8n' },
          ],
        },

        // Dropdown "Contribuir" - Agrupa opções de contribuição
        {
          type: 'dropdown',
          label: 'Contribuir',
          position: 'left',
          className: 'navbar-contribute-dropdown',
          'aria-label': 'Como contribuir com a documentação e o projeto n8n Brasil',
          title: 'Como contribuir com a documentação e o projeto n8n Brasil',
          items: [
            { label: 'Contribuir com n8n oficial', to: '/contribuir/n8n-oficial', title: 'Contribuir com n8n oficial' },
            { label: 'Contribuir com Esta Documentação', to: '/contribuir/esta-documentacao', title: 'Contribuir com Esta Documentação' },
          ],
        },
        {
          label: 'Catálogo de Workflows',
          to: '/catalogo',
          position: 'left',
          className: 'navbar-catalog-link',
          'aria-label': 'Catálogo de Workflows n8n Brasil',
          title: 'Catálogo de Workflows n8n Brasil',
        },
        // {
        //   to: '/release-notes',
        //   label: 'Release Notes',
        //   position: 'left',
        //   className: 'navbar-release-notes-link',
        // },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentação',
          items: [
            {
              label: 'Primeiros Passos',
              to: '/primeiros-passos/guia-instalacao',
            },
            {
              label: 'Usando n8n',
              to: '/usando-n8n',
            },
            {
              label: 'Integrações',
              to: '/integracoes',
            },
            {
              label: 'API',
              to: '/api',
            },
          ],
        },
        {
          title: 'Comunidade',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/n8n',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/n8n-io/n8n',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/c/n8n-io',
            },
            {
              label: 'Blog',
              href: 'https://n8n.io/blog',
            },
          ],
        },
        {
          title: 'Recursos',
          items: [
            {
              label: 'n8n Cloud',
              href: 'https://n8n.io/cloud',
            },
            {
              label: 'Pricing',
              href: 'https://n8n.io/pricing',
            },
            {
              label: 'Enterprise',
              href: 'https://n8n.io/enterprise',
            },
            {
              label: 'Status',
              href: 'https://status.n8n.io',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Privacy Policy',
              href: 'https://n8n.io/privacy',
            },
            {
              label: 'Terms of Service',
              href: 'https://n8n.io/terms',
            },
            {
              label: 'Cookie Policy',
              href: 'https://n8n.io/cookies',
            },
          ],
        },
        {
          title: 'Projeto concebido por',
          items: [
            {
              label: '@tatyquebralayout',
              href: 'https://github.com/tatyquebralayout',
            },
            {
              label: '@CJBiohacker',
              href: 'https://github.com/CJBiohacker',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} n8n Brasil. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'toml'],
    },

    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    announcementBar: {
      id: 'support_us',
      content:
        '🎉 <strong>n8n Brasil</strong> - Documentação completa em português! <a target="_blank" rel="noopener noreferrer" href="https://github.com/n8n-brasil/n8n-Doc-PT-BR">Contribua no GitHub</a>',
      backgroundColor: '#fafbfc',
      textColor: '#091E42',
      isCloseable: false,
    },
  },
} satisfies Config;

export default config; 