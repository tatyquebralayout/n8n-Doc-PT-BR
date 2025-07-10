// Declarações de tipos globais para componentes customizados
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        name?: string;
        src?: string;
        size?: string | number;
        color?: string;
        className?: string;
        style?: React.CSSProperties;
        ios?: string;
        md?: string;
        'aria-hidden'?: boolean | 'true' | 'false';
        'aria-label'?: string;
      };
    }
    
    // Garantir que JSX.Element está disponível
    interface Element extends React.ReactElement<any, any> { }
  }
}

export {}; 