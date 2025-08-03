// Componente otimizado com lazy loading para melhor performance
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface CardGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

const CardGrid: React.FC<CardGridProps> = ({
  children,
  columns = 3,
  gap = 'medium',
  className,
}) => {
  return (
    <div 
      className={clsx(
        styles.cardGrid, 
        styles[`columns${columns}`], 
        styles[`gap${gap}`], 
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardGrid; 