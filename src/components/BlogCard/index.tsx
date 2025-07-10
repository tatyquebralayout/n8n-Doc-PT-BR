import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  author: string;
  tags?: string[];
  image?: string;
  featured?: boolean;
  slug: string;
}

export default function BlogCard({
  title,
  description,
  date,
  author,
  tags = [],
  image,
  featured = false,
  slug
}: BlogCardProps): JSX.Element {
  return (
    <article className={clsx(styles.card, featured && styles.featured)}>
      <div className={styles.cardImage}>
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <IonicIcon name="newspaper-outline" />
        )}
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span className={styles.cardDate}>
            <IonicIcon name="calendar-outline" />
            {date}
          </span>
          <span className={styles.cardAuthor}>
            <IonicIcon name="person-outline" />
            {author}
          </span>
        </div>
        
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
        
        {tags.length > 0 && (
          <div className={styles.cardTags}>
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className={styles.cardTag}>
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className={styles.cardTag}>
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        <div className={styles.cardFooter}>
          <Link to={slug} className={styles.readMore}>
            Ler mais
            <IonicIcon name="arrow-forward" className={styles.readMoreIcon} />
          </Link>
        </div>
      </div>
    </article>
  );
} 