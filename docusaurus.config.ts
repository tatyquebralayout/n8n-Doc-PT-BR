import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "n8n Brasil 🇧🇷",
  tagline:
    "Uma iniciativa da comunidade brasileira para democratizar a automação, uma linha de código e um workflow de cada vez.",
  favicon: "img/favicon-br.svg",

  // Set the production url of your site here
  url: "https://n8n-brasil.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: "/n8n-Doc-PT-BR/",

  organizationName: "n8n-brasil",
  projectName: "n8n-Doc-PT-BR",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Experimental Docusaurus Faster - TEMPORARIAMENTE DESABILITADO devido a problemas MDX
  // future: {
  //   experimental_faster: true,
  //   v4: true,
  // },

  i18n: {
    defaultLocale: "pt-BR",
    locales: ["pt-BR"],
    localeConfigs: {
      "pt-BR": {
        label: "Português",
        direction: "ltr",
      },
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/n8n-brasil/n8n-Doc-PT-BR/tree/main/",
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          routeBasePath: "/",
          sidebarCollapsed: false,
          breadcrumbs: true,
          // Configuração para suporte matemático com KaTeX - TEMPORARIAMENTE DESABILITADO
          // remarkPlugins: [require('remark-math')],
          // rehypePlugins: [
          //   [require('rehype-katex'), {
          //     strict: false,
          //     trust: true,
          //     throwOnError: false,
          //     errorColor: '#cc0000',
          //     macros: {
          //       "\\RR": "\\mathbb{R}",
          //       "\\NN": "\\mathbb{N}",
          //       "\\ZZ": "\\mathbb{Z}",
          //       "\\QQ": "\\mathbb{Q}",
          //       "\\CC": "\\mathbb{C}"
          //     },
          //     minRuleThickness: 0.05,
          //     colorIsTextColor: false,
          //     maxSize: Infinity,
          //     maxExpand: 1000
          //   }]
          // ],
          exclude: [
            '**/contribuir/**',
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
          ],

        },
        blog: false, // Desabilitar blog padrão para usar nossa página customizada
        pages: {
          remarkPlugins: [],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          changefreq: "weekly",
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
    // Plugin de docs separado para a seção Contribuir - REABILITADO para resolver renderização
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'contribuir',
        path: 'docs/contribuir',
        routeBasePath: 'contribuir',
        sidebarPath: './sidebars-contribuir.ts',
        editUrl: 'https://github.com/n8n-brasil/n8n-Doc-PT-BR/tree/main/',
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
        sidebarCollapsed: false,
        breadcrumbs: true,
        exclude: [
          '**/_*.{js,jsx,ts,tsx,md,mdx}',
          '**/_*/**',
          '**/*.test.{js,jsx,ts,tsx}',
          '**/__tests__/**',
        ],
      },
    ],
    
    // Plugin de busca local - TEMPORARIAMENTE DESABILITADO devido a conflito de dependências
    // [
    //   require.resolve("@easyops-cn/docusaurus-search-local"),
    //   {
    //     hashed: true,
    //     language: ["pt", "en"],
    //     highlightSearchTermsOnTargetPage: true,
    //     explicitSearchResultPath: true,
    //     docsRouteBasePath: "/",
    //     indexPages: true,
    //   },
    // ],
  ],

  themes: ["@docusaurus/theme-mermaid"],

  markdown: {
    mermaid: true,
  },

  scripts: [
    {
      src: "https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.esm.js",
      type: "module",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.js",
      nomodule: true,
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/banner_n8n_ptbr.png",
    navbar: {
      title: "",
      logo: {
        alt: "n8n Logo",
        src: "img/n8n-color.webp",
        srcDark: "img/n8n-color_dark.webp",
        href: "/",
      },
      items: [
        // Botão "Home" - Link para página inicial
        {
          to: "/",
          position: "left",
          className: "navbar-home-link",
        },

        // Dropdown "Documentação" - Agrupa conteúdo principal
        {
          type: "dropdown",
          label: "Documentação",
          position: "left",
          className: "navbar-documentation-dropdown",
          items: [
            {
              label: "Guia de Instalação do n8n",
              to: "/primeiros-passos/guia-instalacao",
            },
            {
              label: "Primeiros Passos",
              to: "/primeiros-passos/guia-instalacao",
            },
            { label: "Guias Avançados", to: "/usando-n8n" },
            { label: "Lógica e Dados", to: "/logica-e-dados" },
            { label: "IA Avançada", to: "/advanced-ai" },
            { label: "API", to: "/api" },
            { label: "Deployment", to: "/hosting-n8n/instalacao" },
            { label: "Embed", to: "/embed" },
          ],
        },

        // Dropdown "Integrações" - Destaque para nodes
        {
          type: "dropdown",
          label: "Integrações",
          position: "left",
          className: "navbar-integrations-dropdown",
          items: [
            { label: "Todos os Nodes", to: "/integracoes" },
            { label: "Integrações BR", to: "/integracoes-br" },
            { label: "Criar Nodes", to: "/integracoes/criar-nodes" },
          ],
        },

        // Dropdown "Comunidade" - Agrupa conteúdo da comunidade
        {
          type: "dropdown",
          label: "Comunidade",
          position: "left",
          className: "navbar-community-dropdown",
          items: [
            { label: "Artigos", to: "/comunidade/automacao-iniciantes" },
            { label: "Vídeos da Comunidade", to: "/comunidade/videos" },
            { label: "Repositórios da Comunidade", to: "/comunidade/github" },
            { label: "Como Participar", to: "/comunidade/como-participar" },
          ],
        },
        // Dropdown "Cursos" - Agrupa cursos em vídeo e texto
        {
          type: "dropdown",
          label: "Cursos",
          position: "left",
          className: "navbar-courses-dropdown",
          items: [
            { label: "Visão Geral", to: "/cursos" },
            { label: "Cursos em Vídeo", to: "/cursos/cursos-em-video" },
            { label: "Cursos em Texto", to: "/cursos/cursos-em-texto" },
            {
              label: "Nível 1 - Básico",
              to: "/cursos/cursos-em-texto/nivel-um",
            },
            {
              label: "Nível 2 - Avançado",
              to: "/cursos/cursos-em-texto/nivel-dois",
            },
          ],
        },

        // Dropdown "Contribuir" - Como contribuir com o projeto
        {
          type: "dropdown",
          label: "Contribuir",
          position: "left",
          className: "navbar-contribute-dropdown",
          items: [
            { label: 'Contribuir com n8n oficial', to: '/contribuir/n8n-oficial' },
            { label: 'Contribuir com Esta Documentação', to: '/contribuir/esta-documentacao' },
          ],
        },
        {
          label: "Catálogo",
          to: "/catalogo",
          position: "left",
          className: "navbar-catalog-link",
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
      style: "dark",
      links: [
        {
          title: "Documentação",
          items: [
            {
              label: "Primeiros Passos",
              to: "/primeiros-passos/guia-instalacao",
            },
            {
              label: "Guias Avançados",
              to: "/usando-n8n",
            },
            {
              label: "Integrações",
              to: "/integracoes",
            },
            {
              label: "API",
              to: "/api",
            },
          ],
        },
        {
          title: "Comunidade",
          items: [
            {
              label: "Como Participar",
              to: "/comunidade/como-participar",
            },
            {
              label: "Artigos",
              to: "/comunidade/automacao-iniciantes",
            },
            {
              label: "Vídeos",
              to: "/comunidade/videos",
            },
            {
              label: "GitHub",
              to: "/comunidade/github",
            },
          ],
        },
        {
          title: "Recursos",
          items: [
            {
              label: "Cursos",
              to: "/cursos",
            },
            {
              label: "Release Notes",
              to: "/release-notes",
            },
            {
              label: "Referência",
              to: "/referencia",
            },
            {
              label: "FAQ",
              to: "/primeiros-passos/faq",
            },
          ],
        },
        {
          title: "Links Externos",
          items: [
            {
              label: "n8n Oficial",
              href: "https://n8n.io",
            },
            {
              label: "Documentação Oficial",
              href: "https://docs.n8n.io",
            },
            {
              label: "GitHub n8n",
              href: "https://github.com/n8n-io/n8n",
            },
            {
              label: "Comunidade n8n",
              href: "https://community.n8n.io",
            },
          ],
        },
        {
          title: "Legal",
          items: [
            {
              label: "Privacy Policy",
              href: "https://n8n.io/privacy",
            },
            {
              label: "Terms of Service",
              href: "https://n8n.io/terms",
            },
            {
              label: "Cookie Policy",
              href: "https://n8n.io/cookies",
            },
          ],
        },
        {
          title: "Projeto concebido por",
          items: [
            {
              label: "@tatyquebralayout",
              href: "https://github.com/tatyquebralayout",
            },
            {
              label: "@CJBiohacker",
              href: "https://github.com/CJBiohacker",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} n8n Brasil. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "yaml", "toml"],
    },

    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    announcementBar: {
      id: "support_us",
      content:
        '🎉 <strong>n8n Brasil</strong> - Documentação completa em português! <a target="_blank" rel="noopener noreferrer" href="https://github.com/n8n-brasil/n8n-Doc-PT-BR">Contribua no GitHub</a>',
      backgroundColor: "#fafbfc",
      textColor: "#091E42",
      isCloseable: false,
    },

    metadata: [
      { name: "author", content: "Tatiana Barros, Carlos de Lima Junior" },
      {
        name: "description",
        content:
          "Documentação não oficial do n8n em português brasileiro (pt-BR), criada por Tatiana Barros e Carlos de Lima Junior, com o objetivo de democratizar a automação de processos através da filosofia Open Source.",
      },
      {
        name: "keywords",
        content:
          "n8n, n8n Brasil, documentação n8n, n8n em português, n8n pt-br, automação de processos, automação de workflow, integração de sistemas, plataforma de integração, código aberto, open source, low-code, no-code, tutorial n8n, guia n8n, exemplos n8n, nodes n8n, webhooks, API, criar nodes, automação de marketing, automação financeira, IA, inteligência artificial, machine learning, LangChain, embedding, automação com IA, análise de dados, processamento de dados, pipelines de dados, ETL, governança de dados, segurança de dados, hospedagem n8n, deploy n8n, comunidade n8n, developer relations, automação para desenvolvedores, automação para negócios",
      },
      { name: "robots", content: "index, follow" },
      // Open Graph
      {
        property: "og:title",
        content:
          "n8n Brasil - Documentação não oficial em Português Brasileiro",
      },
      {
        property: "og:description",
        content:
          "A maior documentação de n8n em pt-BR. Aprenda a automatizar processos, integrar sistemas e criar workflows com tutoriais, guias e exemplos práticos.",
      },
      {
        property: "og:image",
        content:
          "https://n8n-brasil.github.io/n8n-Doc-PT-BR/img/banner_n8n_ptbr.png",
      },
      {
        property: "og:url",
        content: "https://n8n-brasil.github.io/n8n-Doc-PT-BR/",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt-BR" },
      { property: "og:locale:alternate", content: "en-US" },
      { property: "og:site_name", content: "n8n Docs Brasil" },
      { property: "og:image:alt", content: "Banner do n8n Docs Brasil" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "n8n Brasil - Documentação não oficial em Português Brasileiro",
      },
      // Google Site Verification removido - não necessário para projeto open source
    ],
  },
} satisfies Config;

export default config;
