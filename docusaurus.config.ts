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
          sidebarCollapsed: true,
          breadcrumbs: true,
        },
