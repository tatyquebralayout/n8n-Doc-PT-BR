import React from 'react';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';

interface GuidanceCardProps {
  title: string;
  iconName: string;
  children: React.ReactNode;
}

const GuidanceCard: React.FC<GuidanceCardProps> = ({ title, iconName, children }) => {
  return (
    <div className={styles.guidanceCard}>
      <div className={styles.cardHeader}>
        <IonicIcon name={iconName} size={24} color="#10b981" />
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
};

export default GuidanceCard; 