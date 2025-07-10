declare namespace JSX {
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
} 