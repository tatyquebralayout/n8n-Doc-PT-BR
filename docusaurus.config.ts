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
    // Replace with your project's social card
    image: 'img/banner_n8n_ptbr.png',
    navbar: {
      title: '',
      logo: {
        alt: 'n8n Logo',
        src: 'img/n8n-color.webp',
        srcDark: 'img/n8n-color_dark.webp',
        href: '/',
      },
      items: [
        // Botão "Home" - Link para página inicial
        {
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
            { label: 'Primeiros Passos', to: '/primeiros-passos/guia-instalacao' },
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
        // Dropdown "Cursos" - Agrupa cursos em vídeo e texto
        {
          type: 'dropdown',
          label: 'Cursos',
          position: 'left',
          className: 'navbar-courses-dropdown',
          items: [
            { label: 'Visão Geral', to: '/cursos' },
            { label: 'Cursos em Vídeo', to: '/cursos/cursos-em-video' },
            { label: 'Cursos em Texto', to: '/cursos/cursos-em-texto' },
            { label: 'Nível 1 - Básico', to: '/cursos/cursos-em-texto/nivel-um' },
            { label: 'Nível 2 - Avançado', to: '/cursos/cursos-em-texto/nivel-dois' },
          ],
        },

        // Dropdown "Contribuir" - Como contribuir com o projeto
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
              label: 'Guias Avançados',
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
              label: 'Como Participar',
              to: '/comunidade/como-participar',
            },
            {
              label: 'Artigos',
              to: '/comunidade/automacao-iniciantes',
            },
            {
              label: 'Vídeos',
              to: '/comunidade/videos',
            },
            {
              label: 'GitHub',
              to: '/comunidade/github',
            },
          ],
        },
        {
          title: 'Recursos',
          items: [
            {
              label: 'Cursos',
              to: '/cursos',
            },
            {
              label: 'Release Notes',
              to: '/release-notes',
            },
            {
              label: 'Referência',
              to: '/referencia',
            },
            {
              label: 'FAQ',
              to: '/primeiros-passos/faq',
            },
          ],
        },
        {
          title: 'Links Externos',
          items: [
            {
              label: 'n8n Oficial',
              href: 'https://n8n.io',
            },
            {
              label: 'Documentação Oficial',
              href: 'https://docs.n8n.io',
            },
            {
              label: 'GitHub n8n',
              href: 'https://github.com/n8n-io/n8n',
            },
            {
              label: 'Comunidade n8n',
              href: 'https://community.n8n.io',
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
