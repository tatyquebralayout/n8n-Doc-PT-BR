import type { Meta, StoryObj } from '@storybook/react';
import TagList from './index';

const meta: Meta<typeof TagList> = {
  title: 'Components/Common/TagList',
  component: TagList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente reutilizável para exibir listas de tags com suporte a truncamento e diferentes variantes visuais.',
      },
    },
  },
  argTypes: {
    tags: {
      control: 'object',
      description: 'Array de tags para exibir',
    },
    maxVisible: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Máximo de tags visíveis',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamanho das tags',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Variante visual',
    },
    showCount: {
      control: 'boolean',
      description: 'Mostrar contador de tags ocultas',
    },
    className: {
      control: 'text',
      description: 'Classe CSS adicional',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story básico
export const Default: Story = {
  args: {
    tags: ['n8n', 'automação', 'workflow'],
  },
};

// Com truncamento
export const WithTruncation: Story = {
  args: {
    tags: ['n8n', 'automação', 'workflow', 'api', 'webhook', 'integrations'],
    maxVisible: 3,
  },
};

// Sem contador
export const WithoutCount: Story = {
  args: {
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
    maxVisible: 2,
    showCount: false,
  },
};

// Diferentes tamanhos
export const Small: Story = {
  args: {
    tags: ['small', 'tags'],
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    tags: ['large', 'tags'],
    size: 'large',
  },
};

// Diferentes variantes
export const Primary: Story = {
  args: {
    tags: ['primary', 'variant'],
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    tags: ['success', 'variant'],
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    tags: ['warning', 'variant'],
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    tags: ['danger', 'variant'],
    variant: 'danger',
  },
};

export const Secondary: Story = {
  args: {
    tags: ['secondary', 'variant'],
    variant: 'secondary',
  },
};

// Tags com caracteres especiais
export const SpecialCharacters: Story = {
  args: {
    tags: ['tag-with-dash', 'tag_with_underscore', 'tag with spaces', 'tag@special'],
  },
};

// Muitas tags
export const ManyTags: Story = {
  args: {
    tags: [
      'n8n',
      'automação',
      'workflow',
      'api',
      'webhook',
      'integrations',
      'javascript',
      'typescript',
      'nodejs',
      'react',
      'vue',
      'angular',
    ],
    maxVisible: 5,
  },
};

// Tags vazias
export const EmptyTags: Story = {
  args: {
    tags: [],
  },
};

// Tags únicas
export const SingleTag: Story = {
  args: {
    tags: ['single-tag'],
  },
};

// Com classe customizada
export const CustomClass: Story = {
  args: {
    tags: ['custom', 'class'],
    className: 'my-custom-tag-list',
  },
}; 