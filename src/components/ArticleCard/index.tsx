import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import IonicIcon from '../IonicIcon';
import styles from './styles.module.css';

interface ArticleCardProps {
  title: string;
  description: string;
  author: string;
  date: string;
  views?: number;
  tags?: string[];
  link: string;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  author,
  date,
  views,
  tags,
  link,
  className,
}) => {
  return (
    <Link to={link} className={clsx(styles.articleCard, className)}>
      <div className={styles.articleCardContent}>
        <h3 className={styles.articleCardTitle}>{title}</h3>
        <p className={styles.articleCardDescription}>{description}</p>
        
        <div className={styles.articleCardMeta}>
          <div className={styles.articleCardAuthor}>
            <IonicIcon name="person-outline" size={16} color="var(--ifm-color-primary)" />
            <span>{author}</span>
          </div>
          
          <div className={styles.articleCardDate}>
            <IonicIcon name="time-outline" size={16} color="var(--ifm-color-primary)" />
            <span>{date}</span>
          </div>
          
          {views && (
            <div className={styles.articleCardViews}>
              <IonicIcon name="eye-outline" size={16} color="var(--ifm-color-primary)" />
              <span>{views}</span>
            </div>
          )}
        </div>
        
        {tags && tags.length > 0 && (
          <div className={styles.articleCardTags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.articleCardTag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard; 