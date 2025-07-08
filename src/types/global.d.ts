// Declarações de tipos globais para componentes customizados

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        name: string;
        size?: string;
        color?: string;
        className?: string;
        style?: React.CSSProperties;
      };
    }
  }
} 