import React from 'react';
import CountUp from 'react-countup';
import styles from './styles.module.css';
import { useInView } from 'react-intersection-observer';
import LocalIcon from '@site/src/components/LocalIcon';

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
    <div className={styles['goal-meter']} ref={ref}>
      <div className={styles['goal-meter__header']}>
        <LocalIcon name={icon} size={24} />
        <h4 className={styles['goal-meter__title']}>{title}</h4>
      </div>
      <div className={styles['goal-meter__bar']}>
        <div 
          className={styles['goal-meter__progress']}
          style={{
            width: inView ? `${percentage}%` : '0%',
          }}
        />
      </div>
      <div className={styles['goal-meter__values']}>
        <span>
          {inView ? (
            <CountUp
              start={0}
              end={currentValue}
              duration={2}
              delay={0.5}
              useEasing={true}
              separator="."
              decimal=","
              preserveValue={true}
            />
          ) : (
            '0'
          )}
          {unit}
        </span>
        <span>
          {inView ? (
            <CountUp
              start={0}
              end={targetValue}
              duration={2}
              delay={0.3}
              useEasing={true}
              separator="."
              decimal=","
              preserveValue={true}
            />
          ) : (
            '0'
          )}
          {unit}
        </span>
      </div>
    </div>
  );
};

export default GoalMeter; 