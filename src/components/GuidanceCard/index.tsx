import React from 'react';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';

interface GuidanceCardProps {
  title: string;
  children: React.ReactNode;
  className?: keyof typeof styles;
  iconName?: string;
}

const GuidanceCard: React.FC<GuidanceCardProps> = ({ title, children, className, iconName }) => {
  const cardClass = className ? styles[className] : '';
  return (
    <div className={`${styles.guidanceCard} ${cardClass}`}>
      <div className={styles.cardHeader}>
        {iconName && <IonicIcon name={iconName} size={24} color="#FFD700" />}
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
};

export default GuidanceCard; 