import React from 'react';
import styles from './styles.module.css';
import LocalIcon from '@site/src/components/LocalIcon';

interface GuidanceCardProps {
  title: string;
  children: React.ReactNode;
  className?: keyof typeof styles;
  iconName?: string;
}

const GuidanceCard: React.FC<GuidanceCardProps> = ({ title, children, className, iconName }) => {
  const cardClass = className ? styles[className] : '';
  return (
    <div className={`${styles['guidance-card']} ${cardClass}`}>
      <div className={styles['guidance-card__title']}>
        {iconName && <LocalIcon name={iconName} size={24} />}
        <h3>{title}</h3>
      </div>
      <div className={styles['guidance-card__content']}>
        {children}
      </div>
    </div>
  );
};

export default GuidanceCard; 