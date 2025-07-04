import React, { useMemo } from 'react';
import styles from './styles.module.css';
import { useInView } from 'react-intersection-observer';
import IonicIcon from '@site/src/components/IonicIcon';
import LoadingSkeleton from '@site/src/components/LoadingSkeleton';

interface CommunityStatsProps {
  loading?: boolean;
}

const stats = [
  {
    icon: 'people-outline',
    value: 8954,
    label: 'Membros Ativos',
    className: 'members',
  },
  {
    icon: 'document-text-outline',
    value: 127,
    label: 'Artigos Publicados',
    className: 'articles',
  },
  {
    icon: 'extension-puzzle-outline',
    value: 34,
    label: 'Custom Nodes',
    className: 'nodes',
  },
  {
    icon: 'copy-outline',
    value: 156,
    label: 'Templates',
    className: 'templates',
  },
];

const CommunityStats = ({ loading = false }: CommunityStatsProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const maxValue = useMemo(() => Math.max(...stats.map(s => s.value)), []);

  return (
    <div className={styles['community-stats__container']} ref={ref}>
      {stats.map((stat, index) => {
        const barWidth = stat.value > 0 ? (stat.value / maxValue) * 100 : 0;
        return (
          <div className={styles['community-stats__item']} key={index}>
            <div className={styles['community-stats__header']}>
              <IonicIcon name={stat.icon} size={24} className={styles['community-stats__icon']} />
              <span className={styles['community-stats__label']}>{stat.label}</span>
            </div>
            <div className={styles['community-stats__bar-container']}>
              <div
                className={styles['community-stats__bar']}
                style={{ width: `${barWidth}%` }}
              />
              <span className={styles['community-stats__value']}>
                {stat.value.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityStats; 