import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
}) => {
  return (
    <div className={clsx(styles.kpiCard, className)}>
      <div className={styles.kpiCardHeader}>
        {icon && <ion-icon name={icon} style={{fontSize: 36, color: '#10b981'}} />}
        <h3 className={styles.kpiCardTitle}>{title}</h3>
      </div>
      
      <div className={styles.kpiCardValue}>
        {value}
      </div>
      
      {trend && (
        <div className={styles.kpiCardTrend}>
          <span className={clsx(
            styles.trendValue,
            trend.isPositive ? styles.trendPositive : styles.trendNegative
          )}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
          <span className={styles.trendLabel}>vs mês anterior</span>
        </div>
      )}
    </div>
  );
};

export default KpiCard; 