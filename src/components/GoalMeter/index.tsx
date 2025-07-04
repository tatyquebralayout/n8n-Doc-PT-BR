import React from 'react';
import styles from './styles.module.css';
import { useInView } from 'react-intersection-observer';
import IonicIcon from '@site/src/components/IonicIcon';

interface GoalMeterProps {
  icon: string;
  title: string;
  currentValue: number;
  targetValue: number;
  unit?: string;
}

const GoalMeter: React.FC<GoalMeterProps> = ({ icon, title, currentValue, targetValue, unit = '' }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const percentage = Math.min((currentValue / targetValue) * 100, 100);

  return (
    <div className={styles.goalMeter} ref={ref}>
      <div className={styles.goalHeader}>
        <IonicIcon name={icon} size={24} />
        <h4 className={styles.goalTitle}>{title}</h4>
      </div>
      <div className={styles.meterBar}>
        <div 
          className={styles.meterProgress}
          style={{ width: inView ? `${percentage}%` : '0%' }}
        />
      </div>
      <div className={styles.goalValues}>
        <span>{currentValue.toLocaleString('pt-BR')}{unit}</span>
        <span>{targetValue.toLocaleString('pt-BR')}{unit}</span>
      </div>
    </div>
  );
};

export default GoalMeter; 