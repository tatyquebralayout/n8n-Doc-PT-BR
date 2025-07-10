import React from 'react';
import clsx from 'clsx';
import IonicIcon from '@site/src/components/IonicIcon';
import styles from './styles.module.css';

interface HighlightCardProps {
  title: string;
  description?: string;
  icon?: string;
  type?: 'info' | 'success' | 'warning' | 'danger' | 'default';
  children?: React.ReactNode;
  className?: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  description,
  icon = 'star-outline',
  type = 'default',
  children,
  className,
}) => {
  return (
    <div className={clsx(styles.highlightCard, styles[type], className)}>
      <div className={styles.header}>
        {icon && (
          <div className={styles.icon}>
            <IonicIcon name={icon} size={24} color="currentColor" />
          </div>
        )}
        <h3 className={styles.title}>{title}</h3>
      </div>
      {description && <p className={styles.description}>{description}</p>}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default HighlightCard; 