import React from 'react';
import styles from './styles.module.css';

interface LoadingSkeletonProps {
  variant?: 'rect' | 'circle' | 'line';
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  className?: string;
  ariaLabel?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'rect',
  width = '100%',
  height = '1.5rem',
  style = {},
  className = '',
  ariaLabel = 'Carregando...'
}) => {
  return (
    <span
      className={[
        styles['loading-skeleton'],
        styles[`loading-skeleton--${variant}`],
        className
      ].join(' ')}
      style={{ width, height, ...style }}
      aria-busy="true"
      aria-label={ariaLabel}
      role="status"
    />
  );
};

export default LoadingSkeleton; 