import React from 'react';
import styles from './styles.module.css';
import { useInView } from 'react-intersection-observer';
import IonicIcon from '@site/src/components/IonicIcon';

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

const CommunityStats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const maxValue = Math.max(...stats.map(s => s.value));

  return (
    <div className={styles.statsContainer} ref={ref}>
      {stats.map((stat, index) => {
        const barWidth = stat.value > 0 ? (stat.value / maxValue) * 100 : 0;
        return (
          <div className={`${styles.statItem} ${styles[stat.className]}`} key={index}>
            <div className={styles.statHeader}>
                <IonicIcon name={stat.icon} size={24} className={styles.statIcon} />
                <span className={styles.statLabel}>{stat.label}</span>
            </div>
            <div className={styles.statBarContainer}>
              <div
                className={styles.statBar}
                style={{ 
                  width: inView ? `${barWidth}%` : '0%',
                }}
              />
              <span className={styles.statValue}>
                {inView ? stat.value.toLocaleString('pt-BR') : 0}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityStats; 