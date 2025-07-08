import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface ImpactItem {
  text: string;
  delay?: number;
}

interface AnimatedImpactListProps {
  title: string;
  items: ImpactItem[];
  className?: string;
}

const AnimatedImpactList: React.FC<AnimatedImpactListProps> = ({
  title,
  items,
  className,
}) => {
  return (
    <div className={clsx(styles['animated-impact'], className)}>
      <h3 className={styles['animated-impact__title']}>
        <ion-icon name="sparkles-outline" style={{fontSize: 24, color: 'var(--ifm-color-primary)'}} className={styles['animated-impact__title-icon']} />
        {title}
      </h3>
      
      <ul className={styles['animated-impact__list']}>
        {items.map((item, index) => (
          <li 
            key={index}
            className={styles['animated-impact__item']}
            style={{ animationDelay: `${item.delay || index * 0.1}s` }}
          >
            <ion-icon name="checkmark-circle-outline" style={{fontSize: 20, color: 'var(--ifm-color-success)'}} className={styles['animated-impact__item-icon']} />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimatedImpactList; 