import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Documentação n8n',
  tagline: 'Uma iniciativa da comunidade brasileira para democratizar a automação, uma linha de código e um workflow de cada vez.',
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

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'release-notes',
        path: 'release-notes',
        routeBasePath: 'release-notes',
        sidebarPath: './sidebars-release-notes.ts',
        editUrl: 'https://github.com/tatyquebralayout/n8n-Doc-pt-BR/tree/main/',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
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
          label: 'Referência',
          type: 'docSidebar',
          sidebarId: 'referenciaSidebar',
          position: 'left',
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
          className: 'navbar-release-notes',
        },
        {
          type: 'dropdown',
          label: 'v1.0.0',
          position: 'right',
          className: 'navbar-version-dropdown',
          items: [
            {
              label: 'v1.0.0 (Atual)',
              href: '/',
              className: 'dropdown-version-current',
            },
            {
              label: 'Beta (Desenvolvimento)',
              href: '/beta',
              className: 'dropdown-version-beta',
            },
            {
              label: 'Ver Todas as Versões',
              href: '/release-notes',
              className: 'dropdown-version-all',
            },
          ],
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
      links: [
        {
          title: '📚 Documentação',
          items: [
            {
              label: 'Começar',
              to: '/intro',
            },
            {
              label: 'Tutorials',
              to: '/tutorial-basico/instalacao',
            },
            {
              label: 'Integrações',
              to: '/integracoes/overview',
            },
            {
              label: 'Deployment',
              to: '/hosting-n8n/instalacao',
            },
          ],
        },
        {
          title: 'Recursos',
          items: [
            {
              label: 'Release Notes',
              to: '/release-notes',
            },
            {
              label: 'Guias Avançados',
              to: '/referencia/guias/performance-guide',
            },
            {
              label: 'APIs Brasileiras',
              to: '/referencia/recursos/apis-brasileiras',
            },
            {
              label: 'Glossário',
              to: '/referencia/recursos/glossario',
            },
          ],
        },
        {
          title: '🤝 Comunidade',
          items: [
            {
              label: 'Como Contribuir',
              to: '/contribuir',
            },
            {
              label: 'Diretrizes',
              to: '/contribuir/esta-documentacao/guidelines',
            },
            {
              label: 'Código de Conduta',
              to: '/contribuir/esta-documentacao/codigo-conduta',
            },
            {
              label: 'Discutir no GitHub',
              href: 'https://github.com/tatyquebralayout/n8n-Doc-pt-BR/discussions',
            },
          ],
        },
        {
          title: '🔗 Links Úteis',
          items: [
            {
              label: 'n8n Oficial',
              href: 'https://n8n.io',
            },
            {
              label: 'Docs Oficial',
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
      ],
      copyright: `
        <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>© ${new Date().getFullYear()} n8n Documentation Brasil</span>
            <span style="color: #ea4b71;">•</span>
            <span>Feito com ❤️ pela comunidade</span>
          </div>
          <div style="font-size: 0.875rem; color: #6b7280;">
            <span>Documentação não oficial do n8n</span>
            <span style="margin: 0 0.5rem;">•</span>
            <a href="https://github.com/tatyquebralayout/n8n-Doc-pt-BR" style="color: #ea4b71;">GitHub</a>
            <span style="margin: 0 0.5rem;">•</span>
            <a href="https://github.com/tatyquebralayout/n8n-Doc-pt-BR/blob/main/LICENSE" style="color: #ea4b71;">MIT License</a>
          </div>
        </div>
      `,
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
      content: 'Explore what\'s new: Latest release notes available now!',
      backgroundColor: '#ea4b71',
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