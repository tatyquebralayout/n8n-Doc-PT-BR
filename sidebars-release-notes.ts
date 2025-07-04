import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  releaseNotesSidebar: [
    {
      type: 'category',
      label: 'n8n',
      items: [
        'n8n-oficial/index',
        {
          type: 'category',
          label: 'n8n',
          link: {
            type: 'doc',
            id: 'n8n-oficial/n8n/index',
          },
          items: [
            'n8n-oficial/n8n/1.101.1',
        'n8n-oficial/n8n/1.101.0',
        'n8n-oficial/n8n/1.100.1',
        'n8n-oficial/n8n/1.100.0',
        'n8n-oficial/n8n/1.99.1',
        'n8n-oficial/n8n/1.99.0',
        'n8n-oficial/n8n/1.98.2',
        'n8n-oficial/n8n/1.98.1',
        'n8n-oficial/n8n/1.98.0',
        'n8n-oficial/n8n/1.97.1',
        'n8n-oficial/n8n/1.95.3'
          ],
        },
      ],
    },
  ],
};

export default sidebars;