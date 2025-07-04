import React from 'react';
import styles from './styles.module.css';

interface CardGridProps {
  children: React.ReactNode;
}

const CardGrid: React.FC<CardGridProps> = ({ children }) => {
  return (
    <div className={styles.cardGrid}>
      {children}
    </div>
  );
};

export default React.memo(CardGrid); 