import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';

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
    <div className={styles.card}>
      <Link to={link} className={styles.titleLink}>
        <h3 className={styles.title}>{title}</h3>
      </Link>
      <p className={styles.description}>{description}</p>
      <div className={styles.footer}>
        <span className={styles.author}>
          <IonicIcon name="person-outline" size={16} />
          {author}
        </span>
        <div className={styles.stats}>
          <span className={styles.statItem}>
            <IonicIcon name="time-outline" size={16} />
            {readTime}
          </span>
          <span className={styles.statItem}>
            <IonicIcon name="eye-outline" size={16} />
            {views}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard; 