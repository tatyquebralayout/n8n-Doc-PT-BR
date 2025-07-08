import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'n8n Brasil 🇧🇷',
  tagline: 'Uma iniciativa da comunidade brasileira para democratizar a automação, uma linha de código e um workflow de cada vez.',
  favicon: 'img/favicon-br.svg',

  // Set the production url of your site here
  url: 'https://tatyquebralayout.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/n8n-Doc-pt-BR/',

  organizationName: 'tatyquebralayout',
  projectName: 'n8n-Doc-pt-BR',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

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
          editUrl: 'https://github.com/tatyquebralayout/n8n-Doc-pt-BR/tree/main/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          routeBasePath: '/',
          sidebarCollapsed: false,
          breadcrumbs: true,
        },
        blog: false, // Disable blog
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
        alt: 'n8n Logo',
        src: 'img/n8n-logo.svg',
        srcDark: 'img/n8n-logo-dark.svg',
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
        },
        
        // Dropdown "Documentação" - Agrupa conteúdo principal
        {
          type: 'dropdown',
          label: 'Documentação',
          position: 'left',
          className: 'navbar-documentation-dropdown',
          items: [
            { label: 'Guia de Instalação do n8n', to: '/primeiros-passos/guia-instalacao' },
            { label: 'Primeiros Passos', to: '/primeiros-passos/instalacao' },
            { label: 'Guias Avançados', to: '/usando-n8n' },
            { label: 'Lógica e Dados', to: '/logica-e-dados' },
            { label: 'IA Avançada', to: '/advanced-ai' },
            { label: 'API', to: '/api' },
            { label: 'Deployment', to: '/hosting-n8n/instalacao' },
            { label: 'Embed', to: '/embed' },
          ],
        },
        
        // Dropdown "Integrações" - Destaque para nodes
        {
          type: 'dropdown',
          label: 'Integrações',
          position: 'left',
          className: 'navbar-integrations-dropdown',
          items: [
            { label: 'Todos os Nodes', to: '/integracoes' },
            { label: 'Integrações BR', to: '/integracoes-br' },
            { label: 'Criar Nodes', to: '/integracoes/criar-nodes' },
          ],
        },
        
        // Dropdown "Comunidade" - Agrupa conteúdo da comunidade
        {
          type: 'dropdown',
          label: 'Comunidade',
          position: 'left',
          className: 'navbar-community-dropdown',
          items: [
            { label: 'Artigos', to: '/comunidade/automacao-iniciantes' },
            { label: 'Vídeos da Comunidade', to: '/comunidade/videos' },
            { label: 'Repositórios da Comunidade', to: '/comunidade/github' },
            { label: 'Como Participar', to: '/comunidade/como-participar' },
          ],
        },
        {
          label: 'Cursos',
          to: '/cursos',
          position: 'left',
        },
        // Dropdown "Contribuir" - Agrupa opções de contribuição
        {
          type: 'dropdown',
          label: 'Contribuir',
          position: 'left',
          className: 'navbar-contribute-dropdown',
          items: [
            { label: 'Contribuir com n8n oficial', to: '/contribuir/n8n-oficial' },
            { label: 'Contribuir com Esta Documentação', to: '/contribuir/esta-documentacao' },
          ],
        },
        {
          label: 'Catálogo',
          to: '/catalogo',
          position: 'left',
          className: 'navbar-catalog-link',
        },
        {
          to: '/release-notes',
          label: 'Release Notes',
          position: 'left',
          className: 'navbar-release-notes-link',
        },
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
              to: '/primeiros-passos/instalacao',
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
        '🎉 <strong>n8n Brasil</strong> - Documentação completa em português! <a target="_blank" rel="noopener noreferrer" href="https://github.com/tatyquebralayout/n8n-Doc-pt-BR">Contribua no GitHub</a>',
      backgroundColor: '#fafbfc',
      textColor: '#091E42',
      isCloseable: false,
    },
  },
} satisfies Config;

export default config; 