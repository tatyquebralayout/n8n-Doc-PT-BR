import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface GuidanceCardProps {
  title: string;
  description: string;
  iconName?: string;
  variant?: 'info' | 'warning' | 'success' | 'error';
  className?: string;
}

const GuidanceCard: React.FC<GuidanceCardProps> = ({
  title,
  description,
  iconName,
  variant = 'info',
  className,
}) => {
  const cardClass = clsx(
    styles.guidanceCard,
    styles[`guidanceCard--${variant}`],
    className
  );

  return (
    <div className={cardClass}>
      <div className={styles.guidanceCardHeader}>
        {iconName && <ion-icon name={iconName} style={{fontSize: 24, color: 'var(--ifm-color-primary)'}} />}
        <h3 className={styles.guidanceCardTitle}>{title}</h3>
      </div>
      <p className={styles.guidanceCardDescription}>{description}</p>
    </div>
  );
};

export default GuidanceCard; 