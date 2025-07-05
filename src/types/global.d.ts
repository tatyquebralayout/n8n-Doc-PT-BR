// Declarações de tipos globais para componentes customizados

declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': {
      name?: string;
      src?: string;
      size?: 'small' | 'large' | string;
      style?: React.CSSProperties;
      className?: string;
      color?: string;
      'aria-hidden'?: boolean | 'true' | 'false';
    };
  }
} 