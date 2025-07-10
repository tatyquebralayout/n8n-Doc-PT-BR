import React from 'react';
import clsx from 'clsx';
import IonicIcon from '@site/src/components/IonicIcon';
import styles from './styles.module.css';

interface GuidanceCardProps {
  title: string;
  description: string;
  type?: 'info' | 'success' | 'warning' | 'danger' | 'tip';
  icon?: string;
  children?: React.ReactNode;
  className?: string;
}

const GuidanceCard: React.FC<GuidanceCardProps> = ({
  title,
  description,
  type = 'info',
  icon,
  children,
  className,
}) => {
  const getDefaultIcon = () => {
    switch (type) {
      case 'success':
        return 'checkmark-circle-outline';
      case 'warning':
        return 'warning-outline';
      case 'danger':
        return 'alert-circle-outline';
      case 'tip':
        return 'bulb-outline';
      default:
        return 'information-circle-outline';
    }
  };

  return (
    <div className={clsx(styles.guidanceCard, styles[type], className)}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <IonicIcon name={icon || getDefaultIcon()} size={24} color="currentColor" />
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={styles.description}>{description}</p>
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default GuidanceCard; 