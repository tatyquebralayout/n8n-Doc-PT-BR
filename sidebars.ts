import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Tutorial sidebar - usando documentos existentes
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🚀 Primeiros Passos',
      collapsed: false,
      items: [
        'tutorial-basico/instalacao',
        'tutorial-basico/conceitos-basicos',
        'tutorial-basico/primeiro-workflow',
      ],
    },
    {
      type: 'category',
      label: '📝 Recursos do Markdown',
      collapsed: false,
      items: [
        'markdown-features',
      ],
    },
  ],

  // Deployment sidebar - estrutura básica
  deploymentSidebar: [
    {
      type: 'category',
      label: '🚀 Começando',
      collapsed: false,
      items: [
        'intro', // Reutilizando página existente temporariamente
      ],
    },
    {
      type: 'category',
      label: '📚 Guias Básicos',
      collapsed: false,
      items: [
        'tutorial-basico/instalacao',
        'tutorial-basico/conceitos-basicos',
      ],
    },
  ],

  // Catalog sidebar - estrutura básica  
  catalogSidebar: [
    {
      type: 'category',
      label: '📚 Documentação',
      collapsed: false,
      items: [
        'intro',
        'markdown-features',
      ],
    },
    {
      type: 'category',
      label: '🎓 Tutoriais',
      collapsed: false,
      items: [
        'tutorial-basico/instalacao',
        'tutorial-basico/conceitos-basicos',
        'tutorial-basico/primeiro-workflow',
      ],
    },
  ],
};

export default sidebars; 