import type { Meta, StoryObj } from '@storybook/react';
import StatItem from './index';

const meta: Meta<typeof StatItem> = {
  title: 'Components/Common/StatItem',
  component: StatItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Item de estatística reutilizável com suporte a ícones e formatação brasileira de números.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Rótulo da estatística',
    },
    value: {
      control: 'text',
      description: 'Valor da estatística (número ou string)',
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
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamanho do componente',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
      description: 'Variante visual',
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
    label: 'Contribuidores',
    value: 150,
  },
};

// Com ícone
export const WithIcon: Story = {
  args: {
    label: 'Projetos',
    value: 25,
    icon: 'folder-outline',
  },
};

// Com ícone customizado
export const CustomIcon: Story = {
  args: {
    label: 'Downloads',
    value: 1250,
    icon: 'download-outline',
    iconSize: 32,
    iconColor: 'var(--ifm-color-success)',
  },
};

// Diferentes tamanhos
export const Small: Story = {
  args: {
    label: 'Pequeno',
    value: 42,
    icon: 'star-outline',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Grande',
    value: 999,
    icon: 'trophy-outline',
    size: 'large',
  },
};

// Diferentes variantes
export const Primary: Story = {
  args: {
    label: 'Primário',
    value: 100,
    icon: 'heart-outline',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    label: 'Sucesso',
    value: 85,
    icon: 'checkmark-circle-outline',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    label: 'Aviso',
    value: 12,
    icon: 'warning-outline',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    label: 'Perigo',
    value: 3,
    icon: 'alert-circle-outline',
    variant: 'danger',
  },
};

// Valores grandes
export const LargeNumbers: Story = {
  args: {
    label: 'Usuários',
    value: 1234567,
    icon: 'people-outline',
  },
};

// Valores decimais
export const DecimalValues: Story = {
  args: {
    label: 'Taxa de Conversão',
    value: 15.75,
    icon: 'trending-up-outline',
  },
};

// Valores negativos
export const NegativeValues: Story = {
  args: {
    label: 'Perdas',
    value: -25,
    icon: 'trending-down-outline',
  },
};

// Valores zero
export const ZeroValue: Story = {
  args: {
    label: 'Pendências',
    value: 0,
    icon: 'checkmark-outline',
  },
};

// String values
export const StringValue: Story = {
  args: {
    label: 'Status',
    value: 'Ativo',
    icon: 'radio-button-on-outline',
  },
};

// Sem ícone
export const WithoutIcon: Story = {
  args: {
    label: 'Total',
    value: 500,
  },
};

// Com classe customizada
export const CustomClass: Story = {
  args: {
    label: 'Customizado',
    value: 75,
    icon: 'settings-outline',
    className: 'my-custom-stat-item',
  },
};

// Valores com formatação customizada
export const CustomFormatting: Story = {
  args: {
    label: 'Porcentagem',
    value: 95.5,
    icon: 'percentage-outline',
    formatValue: (value) => `${value}%`,
  },
};

// Múltiplos StatItems em grid
export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', width: '100%' }}>
      <StatItem label="Contribuidores" value={150} icon="people-outline" variant="primary" />
      <StatItem label="Projetos" value={25} icon="folder-outline" variant="success" />
      <StatItem label="Downloads" value={1250} icon="download-outline" variant="warning" />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}; 