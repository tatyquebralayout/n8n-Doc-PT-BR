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
            { label: 'Tutorial Básico', to: '/tutorial-basico/instalacao' },
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
            { label: 'Central da Comunidade', to: '/comunidade' },
            { label: 'Contribuir com o Projeto n8n', to: '/contribuir/projeto-n8n' },
            { label: 'Contribuir com Esta Documentação', to: '/contribuir/esta-documentacao' },
          ],
        },
        {
          label: 'Cursos',
          type: 'docSidebar',
          sidebarId: 'cursosSidebar',
          position: 'left',
        },
        {
          label: 'Contribuir',
          type: 'docSidebar',
          sidebarId: 'contribuirSidebar',
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
              href: '/release-notes/nossa-doc',
              className: 'dropdown-version-beta',
            },
            {
              label: 'Ver Todas as Versões',
              href: '/release-notes',
              className: 'dropdown-version-all',
            },
          ],
        },

      ],
      hideOnScroll: false,
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentação',
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
              to: '/integracoes',
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
          title: 'Comunidade',
          items: [
            {
              label: 'Central da Comunidade',
              to: '/comunidade',
            },
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
          title: 'Links Úteis',
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
        {
          title: 'Iniciativa',
          items: [
            {
              html: `
                <div class="footer-initiators">
                  <div class="initiator">
                    <img src="https://avatars.githubusercontent.com/u/172347696?v=4" alt="Tatiana Barros" class="initiator-avatar">
                    <div>
                      <div class="initiator-name">Tatiana Barros</div>
                      <div class="initiator-title">Technology Evangelist</div>
                      <div class="initiator-links">
                        <a href="https://github.com/tatyquebralayout">GitHub</a>
                        <span>•</span>
                        <a href="https://www.linkedin.com/in/umataldetatiana">LinkedIn</a>
                      </div>
                    </div>
                  </div>
                  <div class="initiator">
                    <img src="https://avatars.githubusercontent.com/u/48963612?v=4" alt="Carlos de Lima Junior" class="initiator-avatar">
                    <div>
                      <div class="initiator-name">Carlos de Lima Junior</div>
                      <div class="initiator-title">Software Developer</div>
                      <div class="initiator-links">
                        <a href="https://github.com/CJBiohacker">GitHub</a>
                        <span>•</span>
                        <a href="https://www.linkedin.com/in/carlosjunior137">LinkedIn</a>
                      </div>
                    </div>
                  </div>
                </div>
              `,
            },
          ],
        },
      ],
      copyright: `
        <div class="footer-copyright">
          <div>
            <span>© ${new Date().getFullYear()} n8n Documentation Brasil</span>
            <span class="separator">•</span>
            <span>Feito com <span class="heart">♥</span> pela comunidade</span>
          </div>
          <div class="copyright-links">
            <span>Documentação não oficial do n8n</span>
            <span class="separator">•</span>
            <a href="https://github.com/tatyquebralayout/n8n-Doc-pt-BR">GitHub</a>
            <span class="separator">•</span>
            <a href="https://github.com/tatyquebralayout/n8n-Doc-pt-BR/blob/main/LICENSE">MIT License</a>
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
      respectPrefersColorScheme: false,
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
      backgroundColor: 'var(--ifm-color-primary)',
      textColor: '#FFFFFF',
      isCloseable: true,
    },

    metadata: [
      {name: 'keywords', content: 'n8n, automation, workflow, documentation, integration'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],

    themes: ['@docusaurus/theme-mermaid'],
    markdown: {
      mermaid: true,
    },

  } satisfies Preset.ThemeConfig,
};

export default config; 