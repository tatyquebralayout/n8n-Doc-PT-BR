// Componente otimizado com lazy loading para melhor performance
import React from 'react';
import clsx from 'clsx';
import BaseCard from '@site/src/components/common/BaseCard';
import IonicIcon from '@site/src/components/IonicIcon';
import styles from './styles.module.css';

interface GuidanceCardProps {
  title: string;
  description: string;
  icon?: string;
  iconColor?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  estimatedTime?: string;
  difficulty?: number;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const GuidanceCard: React.FC<GuidanceCardProps> = ({
  title,
  description,
  icon = 'bulb-outline',
  iconColor,
  level = 'beginner',
  category,
  estimatedTime,
  difficulty = 1,
  className,
  onClick,
  href,
}) => {
  const getLevelColor = () => {
    switch (level) {
      case 'beginner':
        return 'var(--ifm-color-success)';
      case 'intermediate':
        return 'var(--ifm-color-warning)';
      case 'advanced':
        return 'var(--ifm-color-danger)';
      default:
        return 'var(--ifm-color-primary)';
    }
  };

  const getLevelIcon = () => {
    switch (level) {
      case 'beginner':
        return 'school-outline';
      case 'intermediate':
        return 'library-outline';
      case 'advanced':
        return 'rocket-outline';
      default:
        return 'help-outline';
    }
  };

  const footerContent = (
    <div className={styles.footer}>
      <div className={styles.meta}>
        {category && (
          <span className={styles.category}>
            <IonicIcon name="bookmark-outline" size={14} />
            {category}
          </span>
        )}
        {estimatedTime && (
          <span className={styles.time}>
            <IonicIcon name="time-outline" size={14} />
            {estimatedTime}
          </span>
        )}
      </div>
      <div className={styles.difficulty}>
        <span className={styles.difficultyLabel}>Dificuldade:</span>
        <div className={styles.difficultyStars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <IonicIcon
              key={star}
              name={star <= difficulty ? 'star' : 'star-outline'}
              size={12}
              color={star <= difficulty ? getLevelColor() : 'var(--ifm-color-emphasis-300)'}
            />
          ))}
        </div>
      </div>
      <div className={styles.level}>
        <IonicIcon name={getLevelIcon()} size={16} color={getLevelColor()} />
        <span style={{ color: getLevelColor() }}>
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
      </div>
    </div>
  );

  return (
    <BaseCard
      title={title}
      description={description}
      icon={icon}
      iconColor={iconColor}
      className={clsx(styles.guidanceCard, className)}
      onClick={onClick}
      href={href}
      dataTestId="guidance-card"
    >
      {footerContent}
    </BaseCard>
  );
};

export default GuidanceCard; 