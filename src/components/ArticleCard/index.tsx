import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';
import LoadingSkeleton from '@site/src/components/LoadingSkeleton';

interface ArticleCardProps {
  loading?: boolean;
  image?: string;
  title?: string;
  author?: string;
  link?: string;
  description?: string;
  readTime?: string;
  views?: string;
  stats?: React.ReactNode;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  loading = false,
  image,
  title,
  author,
  link,
  description,
  readTime,
  views,
  stats
}) => {
  return (
    <div
      className={styles['article-card']}
      tabIndex={0}
      role="link"
      aria-label={`Acessar artigo: ${title}`}
      onClick={() => link && window.open(link, '_self')}
      onKeyDown={e => {
        if ((e.key === 'Enter' || e.key === ' ') && link) {
          e.preventDefault();
          window.open(link, '_self');
        }
      }}
    >
      {loading ? (
        <LoadingSkeleton variant="rect" width="100%" height={160} style={{ marginBottom: 16 }} />
      ) : (
        image && <img src={image} alt={title} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }} />
      )}
      <div className={styles['article-card__title-link']}>
        {loading ? (
          <LoadingSkeleton variant="line" width="70%" height={24} style={{ marginBottom: 8 }} />
        ) : (
          <Link to={link} className={styles['article-card__title-link']}>
            <h3 className={styles['article-card__title']}>{title}</h3>
          </Link>
        )}
      </div>
      <div className={styles['article-card__description']}>
        {loading ? (
          <LoadingSkeleton variant="line" width="90%" height={16} style={{ marginBottom: 6 }} />
        ) : (
          <p>{description}</p>
        )}
      </div>
      <div className={styles['article-card__footer']}>
        {loading ? (
          <LoadingSkeleton variant="line" width="40%" height={16} />
        ) : (
          <span className={styles['article-card__author']}>
            <IonicIcon name="person-outline" size={16} />
            {author}
          </span>
        )}
        <div className={styles['article-card__stats']}>
          {loading ? (
            <LoadingSkeleton variant="line" width="40%" height={16} />
          ) : (
            <>
              <span className={styles['article-card__stat-item']}>
                <IonicIcon name="time-outline" size={16} />
                {readTime}
              </span>
              <span className={styles['article-card__stat-item']}>
                <IonicIcon name="eye-outline" size={16} />
                {views}
              </span>
            </>
          )}
          {stats && !loading && <span className={styles['article-card__stat-item']}>{stats}</span>}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard; 