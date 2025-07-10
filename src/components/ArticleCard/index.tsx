import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
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
  return (
    <Link to={link} className={clsx(styles.articleCard, className)}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <IonicIcon name={icon} size={24} color="currentColor" />
        </div>
        <div className={styles.meta}>
          {author && <span className={styles.author}>{author}</span>}
          {date && <span className={styles.date}>{date}</span>}
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      
      <div className={styles.footer}>
        {views && (
          <span className={styles.views}>
            <IonicIcon name="eye-outline" size={16} />
            {views}
          </span>
        )}
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.slice(0, 2).map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
            {tags.length > 2 && (
              <span className={styles.moreTags}>+{tags.length - 2}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard; 