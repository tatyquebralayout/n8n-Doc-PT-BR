// Declarações de tipos globais para componentes customizados
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': {
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
        [key: string]: any;
      };
    }
    
    // Garantir que JSX.Element está disponível
    interface Element extends React.ReactElement<any, any> { }
  }
}

export {}; 