import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface TagListProps {
  tags: string[];
  maxVisible?: number;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  showCount?: boolean;
  dataTestId?: string;
}

const TagList: React.FC<TagListProps> = ({
  tags,
  maxVisible = 3,
  className,
  size = 'medium',
  variant = 'default',
  showCount = true,
  dataTestId,
}) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  const visibleTags = tags.slice(0, maxVisible);
  const hiddenCount = tags.length - maxVisible;

  return (
    <div 
      className={clsx(styles.tagList, styles[size], styles[variant], className)}
      data-testid={dataTestId || 'tag-list'}
    >
      {visibleTags.map((tag, index) => (
        <span key={index} className={styles.tag}>
          {tag}
        </span>
      ))}
      {hiddenCount > 0 && showCount && (
        <span className={styles.moreTags}>+{hiddenCount}</span>
      )}
    </div>
  );
};

export default TagList; 