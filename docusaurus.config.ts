import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Documentação n8n Brasil',
  tagline: 'O hub de conhecimento para a comunidade brasileira de automação.',
  favicon: 'img/favicon.ico',

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
    locales: ['pt-BR', 'en'],
    localeConfigs: {
      'pt-BR': {
        label: 'PT-BR',
        direction: 'ltr',
      },
      en: {
        label: 'ENG',
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
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          routeBasePath: '/',
          sidebarCollapsed: false,
          breadcrumbs: false,
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

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'release-notes',
        path: 'release-notes',
        routeBasePath: 'release-notes',
        sidebarPath: './sidebars-release-notes.ts',
        editUrl: 'https://github.com/tatyquebralayout/n8n-Doc-pt-BR/tree/main/',
      },
    ],
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
        width: 120,
        height: 40,
      },
      items: [
        {
          label: 'Início',
          to: '/',
          position: 'left',
          className: 'navbar-home-link',
        },
        {
          label: 'Workflows',
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
        },
        {
          label: 'Deployment',
          type: 'docSidebar', 
          sidebarId: 'deploymentSidebar',
          position: 'left',
        },
        {
          label: 'Cursos',
          type: 'docSidebar',
          sidebarId: 'cursosSidebar',
          position: 'left',
        },
        {
          label: 'Comunidade',
          type: 'docSidebar',
          sidebarId: 'contribuirSidebar',
          position: 'left',
        },
        {
          to: '/release-notes',
          label: 'Release Notes',
          position: 'left',
          className: 'navbar-release-notes',
        },
        {
          type: 'localeDropdown',
          position: 'right',
          dropdownItemsAfter: [],
        },
      ],
      hideOnScroll: false,
    },

    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} n8n. Todos os direitos reservados`,
      links: [],
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml'],
    },

    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },

    announcementBar: {
      id: 'new-release',
      content: 'Explore what\'s new: Latest release notes available now! 🚀',
      backgroundColor: '#FF6D5A',
      textColor: '#FFFFFF',
      isCloseable: true,
    },

    metadata: [
      {name: 'keywords', content: 'n8n, automation, workflow, documentation, integration'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],

  } satisfies Preset.ThemeConfig,
};

export default config; 