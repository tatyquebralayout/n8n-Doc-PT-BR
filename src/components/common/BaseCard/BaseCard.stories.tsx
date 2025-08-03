import type { Meta, StoryObj } from '@storybook/react';
import BaseCard from './index';

const meta: Meta<typeof BaseCard> = {
  title: 'Components/Common/BaseCard',
  component: BaseCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente base para todos os cards da aplicação. Fornece uma estrutura consistente e reutilizável para diferentes tipos de cards.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título do card',
    },
    description: {
      control: 'text',
      description: 'Descrição do card',
    },
    icon: {
      control: 'text',
      description: 'Nome do ícone Ionic',
    },
    iconSize: {
      control: { type: 'number', min: 12, max: 48, step: 2 },
      description: 'Tamanho do ícone',
    },
    iconColor: {
      control: 'color',
      description: 'Cor do ícone',
    },
    className: {
      control: 'text',
      description: 'Classe CSS adicional',
    },
    onClick: {
      action: 'clicked',
      description: 'Função de clique',
    },
    href: {
      control: 'text',
      description: 'URL para link',
    },
    target: {
      control: 'select',
      options: ['_blank', '_self', '_parent', '_top'],
      description: 'Target do link',
    },
    rel: {
      control: 'text',
      description: 'Rel do link',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story básico
export const Default: Story = {
  args: {
    title: 'Card Básico',
    description: 'Este é um card básico com título e descrição.',
    icon: 'star-outline',
  },
};

// Card com link
export const WithLink: Story = {
  args: {
    title: 'Card com Link',
    description: 'Clique para navegar para outra página.',
    icon: 'arrow-forward-outline',
    href: '/pagina-destino',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

// Card com botão
export const WithButton: Story = {
  args: {
    title: 'Card Interativo',
    description: 'Clique para executar uma ação.',
    icon: 'play-outline',
    onClick: () => console.log('Card clicado!'),
  },
};

// Card com conteúdo adicional
export const WithChildren: Story = {
  args: {
    title: 'Card com Conteúdo',
    description: 'Este card tem conteúdo adicional.',
    icon: 'document-outline',
    children: (
      <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--ifm-color-emphasis-50)', borderRadius: '8px' }}>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>Conteúdo adicional aqui</p>
        <button style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', background: 'var(--ifm-color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Botão adicional
        </button>
      </div>
    ),
  },
};

// Card com ícone customizado
export const CustomIcon: Story = {
  args: {
    title: 'Card Customizado',
    description: 'Com ícone personalizado e cor customizada.',
    icon: 'heart-outline',
    iconSize: 32,
    iconColor: 'var(--ifm-color-danger)',
  },
};

// Card sem ícone
export const WithoutIcon: Story = {
  args: {
    title: 'Card sem Ícone',
    description: 'Este card não tem ícone.',
  },
};

// Card sem descrição
export const WithoutDescription: Story = {
  args: {
    title: 'Card sem Descrição',
    icon: 'information-circle-outline',
  },
};

// Card com tema escuro
export const DarkTheme: Story = {
  args: {
    title: 'Card Tema Escuro',
    description: 'Este card se adapta ao tema escuro.',
    icon: 'moon-outline',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Card responsivo
export const Responsive: Story = {
  args: {
    title: 'Card Responsivo',
    description: 'Este card se adapta a diferentes tamanhos de tela.',
    icon: 'phone-portrait-outline',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Card com longa descrição
export const LongDescription: Story = {
  args: {
    title: 'Card com Descrição Longa',
    description: 'Esta é uma descrição muito longa que pode ocupar várias linhas e testar como o componente se comporta com textos extensos. O componente deve manter uma boa aparência mesmo com descrições longas.',
    icon: 'text-outline',
  },
};

// Card com título longo
export const LongTitle: Story = {
  args: {
    title: 'Este é um título muito longo que pode ocupar várias linhas e testar como o componente se comporta com títulos extensos',
    description: 'Descrição normal.',
    icon: 'document-text-outline',
  },
}; 