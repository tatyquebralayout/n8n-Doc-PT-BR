import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface GoalMeterProps {
  current: number;
  target: number;
  title: string;
  icon?: string;
  unit?: string;
  className?: string;
}

const GoalMeter: React.FC<GoalMeterProps> = ({
  current,
  target,
  title,
  icon,
  unit = '',
  className,
}) => {
  const percentage = Math.min((current / target) * 100, 100);
  const progressClass = percentage >= 100 ? styles.completed : styles.inProgress;

  return (
    <div className={clsx(styles.goalMeter, className)}>
      <div className={styles.goalMeterHeader}>
        {icon && <ion-icon name={icon} style={{fontSize: 24, color: 'var(--ifm-color-primary)'}} />}
        <h3 className={styles.goalMeterTitle}>{title}</h3>
      </div>
      
      <div className={styles.goalMeterProgress}>
        <div className={styles.goalMeterBar}>
          <div 
            className={clsx(styles.goalMeterFill, progressClass)}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className={styles.goalMeterStats}>
          <span className={styles.goalMeterCurrent}>
            {current}{unit}
          </span>
          <span className={styles.goalMeterTarget}>
            / {target}{unit}
          </span>
        </div>
      </div>
      
      <div className={styles.goalMeterPercentage}>
        {Math.round(percentage)}% completo
      </div>
    </div>
  );
};

export default GoalMeter; 