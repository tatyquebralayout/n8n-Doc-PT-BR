import React from 'react';
import styles from './styles.module.css';

interface ArticleCardProps {
  title: string;
  author: string;
  link: string;
  description: string;
  readTime: string;
  views: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, author, link, description, readTime, views }) => {
  return (
    <a href={link} className={styles.card} target="_blank" rel="noopener noreferrer">
      <h3>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.footer}>
        <span className={styles.author}>por {author}</span>
        <div className={styles.stats}>
          <span>{readTime}</span>
          <span>{views}</span>
        </div>
      </div>
    </a>
  );
};

export default ArticleCard; 