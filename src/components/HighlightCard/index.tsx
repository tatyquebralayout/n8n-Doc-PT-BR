import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import LoadingSkeleton from '@site/src/components/LoadingSkeleton';
import IonicIcon from '@site/src/components/IonicIcon';

interface HighlightCardProps {
  loading?: boolean;
  icon?: string;
  category?: string;
  title?: string;
  description?: string;
  link: string;
  details?: React.ReactNode;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  loading = false,
  icon,
  category,
  title,
  description,
  link,
  details
}) => {
  return (
    <div className={styles.highlightCard}>
      <div className={styles.cardHeader}>
        {loading ? (
          <LoadingSkeleton variant="circle" width={32} height={32} />
        ) : (
          icon && <IonicIcon name={icon} size={32} className={styles.icon} />
        )}
        {loading ? (
          <LoadingSkeleton variant="line" width={80} height={18} />
        ) : (
          <span className={styles.category}>{category}</span>
        )}
      </div>
      <div className={styles.cardContent}>
        {loading ? (
          <LoadingSkeleton variant="line" width="70%" height={22} style={{ marginBottom: 8 }} />
        ) : (
          <h3 className={styles.title}>{title}</h3>
        )}
        {loading ? (
          <LoadingSkeleton variant="line" width="90%" height={16} style={{ marginBottom: 6 }} />
        ) : (
          <p className={styles.description}>{description}</p>
        )}
        <div className={styles.details}>
          {loading ? (
            <LoadingSkeleton variant="line" width="60%" height={16} />
          ) : (
            details
          )}
        </div>
      </div>
      <div className={styles.cardFooter}>
        <Link to={link} className={styles.readMoreLink}>
          Leia mais <IonicIcon name="arrow-forward-outline" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default HighlightCard; 