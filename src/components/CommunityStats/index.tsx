import React from 'react';
import clsx from 'clsx';
import IonicIcon from '@site/src/components/IonicIcon';
import styles from './styles.module.css';

interface CommunityStatsProps {
  contributors?: number;
  translations?: number;
  languages?: number;
  repositories?: number;
  className?: string;
}

const CommunityStats: React.FC<CommunityStatsProps> = ({
  contributors = 0,
  translations = 0,
  languages = 0,
  repositories = 0,
  className,
}) => {
  const stats = [
    {
      label: 'Contribuidores',
      value: contributors,
      icon: 'people-outline',
      color: 'var(--ifm-color-primary)',
    },
    {
      label: 'Traduções',
      value: translations,
      icon: 'language-outline',
      color: 'var(--ifm-color-success)',
    },
    {
      label: 'Idiomas',
      value: languages,
      icon: 'globe-outline',
      color: 'var(--ifm-color-info)',
    },
    {
      label: 'Repositórios',
      value: repositories,
      icon: 'logo-github',
      color: 'var(--ifm-color-warning)',
    },
  ];

  return (
    <div className={clsx(styles.communityStats, className)}>
      <div className={styles.grid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <div className={styles.icon} style={{ color: stat.color }}>
              <IonicIcon name={stat.icon} size={32} />
            </div>
            <div className={styles.content}>
              <div className={styles.value}>{stat.value.toLocaleString()}</div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityStats; 