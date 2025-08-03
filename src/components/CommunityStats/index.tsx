// Componente otimizado com lazy loading para melhor performance
import React from 'react';
import clsx from 'clsx';
import StatItem from '@site/src/components/common/StatItem';
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
      variant: 'primary' as const,
    },
    {
      label: 'Traduções',
      value: translations,
      icon: 'language-outline',
      variant: 'success' as const,
    },
    {
      label: 'Idiomas',
      value: languages,
      icon: 'globe-outline',
      variant: 'default' as const,
    },
    {
      label: 'Repositórios',
      value: repositories,
      icon: 'logo-github',
      variant: 'warning' as const,
    },
  ];

  return (
    <div className={clsx(styles.communityStats, className)} data-testid="community-stats">
      <div className={styles.grid}>
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            variant={stat.variant}
            dataTestId="community-stat"
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityStats; 