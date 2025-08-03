import React from 'react';
import clsx from 'clsx';
import BaseCard from '@site/src/components/common/BaseCard';
import TagList from '@site/src/components/common/TagList';
import IonicIcon from '@site/src/components/IonicIcon';
import styles from './styles.module.css';

interface ArticleCardProps {
  title: string;
  description: string;
  link: string;
  author?: string;
  date?: string;
  views?: number;
  tags?: string[];
  icon?: string;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  link,
  author,
  date,
  views,
  tags = [],
  icon = 'document-outline',
  className,
}) => {
  const footerContent = (
    <div className={styles.footer}>
      {views && (
        <span className={styles.views}>
          <IonicIcon name="eye-outline" size={16} />
          {views}
        </span>
      )}
      {tags.length > 0 && (
        <TagList 
          tags={tags} 
          maxVisible={2} 
          size="small"
          className={styles.tags}
        />
      )}
    </div>
  );

  const metaContent = (
    <div className={styles.meta}>
      {author && <span className={styles.author}>{author}</span>}
      {date && <span className={styles.date}>{date}</span>}
    </div>
  );

  return (
    <BaseCard
      title={title}
      description={description}
      icon={icon}
      href={link}
      className={clsx(styles.articleCard, className)}
      dataTestId="article-card"
    >
      {metaContent}
      {footerContent}
    </BaseCard>
  );
};

export default ArticleCard; 