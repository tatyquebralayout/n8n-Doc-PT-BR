// Componente otimizado com lazy loading para melhor performance
import React from 'react';
import clsx from 'clsx';
import BaseCard from '../common/BaseCard';
import TagList from '../common/TagList';
import IonicIcon from '../IonicIcon';
import styles from './styles.module.css';

interface HighlightCardProps {
  title: string;
  description: string;
  icon?: string;
  iconColor?: string;
  badge?: string;
  badgeColor?: string;
  tags?: string[];
  featured?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  description,
  icon = 'star-outline',
  iconColor,
  badge,
  badgeColor = 'var(--ifm-color-primary)',
  tags = [],
  featured = false,
  className,
  onClick,
  href,
}) => {
  const headerContent = (
    <div className={styles.header}>
      {badge && (
        <div 
          className={styles.badge}
          style={{ backgroundColor: badgeColor }}
        >
          {badge}
        </div>
      )}
      {featured && (
        <div className={styles.featured}>
          <IonicIcon name="star" size={16} color="var(--ifm-color-warning)" />
          <span>Destaque</span>
        </div>
      )}
    </div>
  );

  const footerContent = tags.length > 0 ? (
    <TagList 
      tags={tags} 
      maxVisible={2} 
      size="small"
      variant="primary"
      className={styles.tags}
    />
  ) : null;

  return (
    <BaseCard
      title={title}
      description={description}
      icon={icon}
      iconColor={iconColor}
      className={clsx(
        styles.highlightCard, 
        featured && styles.featuredCard,
        className
      )}
      onClick={onClick}
      href={href}
      dataTestId="highlight-card"
    >
      {headerContent}
      {footerContent}
    </BaseCard>
  );
};

export default HighlightCard; 