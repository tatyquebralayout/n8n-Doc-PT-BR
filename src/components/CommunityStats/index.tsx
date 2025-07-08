import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface StatItem {
  label: string;
  value: string;
  icon: string;
}

const stats: StatItem[] = [
  {
    label: 'Contribuidores',
    value: '50+',
    icon: 'people-outline',
  },
  {
    label: 'Workflows',
    value: '200+',
    icon: 'git-branch-outline',
  },
  {
    label: 'Integrações',
    value: '100+',
    icon: 'extension-puzzle-outline',
  },
  {
    label: 'Downloads',
    value: '10k+',
    icon: 'download-outline',
  },
];

const CommunityStats: React.FC = () => {
  return (
    <section className={styles['community-stats']}>
      <div className="container">
        <div className="row">
          {stats.map((stat, index) => (
            <div key={index} className={clsx('col col--3')}>
              <div className={styles['community-stats__item']}>
                <ion-icon name={stat.icon} style={{fontSize: 24, color: 'var(--ifm-color-primary)'}} className={styles['community-stats__icon']} aria-hidden="true" />
                <div className={styles['community-stats__content']}>
                  <div className={styles['community-stats__value']}>{stat.value}</div>
                  <div className={styles['community-stats__label']}>{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityStats; 