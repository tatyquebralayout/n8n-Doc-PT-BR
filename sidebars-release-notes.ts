import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  releaseNotesSidebar: [
    {
      type: 'category',
      label: 'v1.0.0',
      collapsed: false,
      items: [
        'v1.0.0/overview',
        'v1.0.0/new-features',
        'v1.0.0/improvements',
        'v1.0.0/bug-fixes',
      ],
    },
    // Comentando a seção beta até criarmos os documentos
    /*
    {
      type: 'category',
      label: 'Beta version',
      collapsed: true,
      items: [
        'beta/overview',
        'beta/known-issues',
        'beta/feedback',
      ],
    },
    */
  ],
};

export default sidebars; 