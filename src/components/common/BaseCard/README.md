# BaseCard

Componente base para todos os cards da aplicação. Fornece uma estrutura consistente e reutilizável para diferentes tipos de cards.

## 📋 Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `title` | `string` | **obrigatório** | Título do card |
| `description` | `string` | - | Descrição do card |
| `icon` | `string` | - | Nome do ícone Ionic |
| `iconSize` | `number` | `24` | Tamanho do ícone |
| `iconColor` | `string` | `'currentColor'` | Cor do ícone |
| `className` | `string` | - | Classe CSS adicional |
| `children` | `ReactNode` | - | Conteúdo adicional |
| `onClick` | `() => void` | - | Função de clique |
| `href` | `string` | - | URL para link |
| `target` | `string` | - | Target do link |
| `rel` | `string` | - | Rel do link |
| `dataTestId` | `string` | - | ID para testes |

## 🎯 Comportamento

O componente renderiza diferentes elementos baseado nas props fornecidas:

- **Div**: Quando nenhuma interação é especificada
- **Link (`<a>`)**: Quando `href` é fornecido
- **Button**: Quando `onClick` é fornecido (sem `href`)

## 📝 Exemplos de Uso

### Card Básico
```tsx
import { BaseCard } from '@site/src/components/common';

<BaseCard
  title="Título do Card"
  description="Descrição do card"
  icon="star-outline"
/>
```

### Card com Link
```tsx
<BaseCard
  title="Card com Link"
  description="Clique para navegar"
  icon="arrow-forward-outline"
  href="/pagina-destino"
  target="_blank"
  rel="noopener noreferrer"
/>
```

### Card com Botão
```tsx
const handleClick = () => {
  console.log('Card clicado!');
};

<BaseCard
  title="Card Interativo"
  description="Clique para executar ação"
  icon="play-outline"
  onClick={handleClick}
/>
```

### Card com Conteúdo Adicional
```tsx
<BaseCard
  title="Card com Conteúdo"
  description="Descrição principal"
  icon="document-outline"
>
  <div className="additional-content">
    <p>Conteúdo adicional aqui</p>
    <button>Botão adicional</button>
  </div>
</BaseCard>
```

### Card com Ícone Customizado
```tsx
<BaseCard
  title="Card Customizado"
  description="Com ícone personalizado"
  icon="heart-outline"
  iconSize={32}
  iconColor="var(--ifm-color-danger)"
/>
```

## 🎨 Variantes CSS

O componente suporta diferentes classes CSS para customização:

```css
/* Card como link */
.baseCard.asLink {
  cursor: pointer;
}

/* Card como botão */
.baseCard.asButton {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}
```

## 📱 Responsividade

O componente é totalmente responsivo com breakpoints:

- **Desktop**: Layout horizontal com ícone à esquerda
- **Mobile**: Layout vertical com ícone menor

## 🧪 Testes

O componente inclui testes completos para:

- Renderização básica
- Comportamento como link/botão
- Props customizadas
- Interações do usuário
- Acessibilidade

## 🔧 Extensão

Para criar um card customizado baseado no BaseCard:

```tsx
import { BaseCard } from '@site/src/components/common';

const CustomCard = ({ customProp, ...props }) => (
  <BaseCard
    {...props}
    className="custom-card"
    icon={customProp ? 'custom-icon' : props.icon}
  >
    {/* Conteúdo customizado */}
  </BaseCard>
);
```

## ⚡ Performance

- Otimizado para evitar re-renders desnecessários
- Suporte a React.memo quando apropriado
- Lazy loading para ícones pesados

## 🎯 Acessibilidade

- Suporte a navegação por teclado
- ARIA labels apropriados
- Focus management
- Screen reader friendly 