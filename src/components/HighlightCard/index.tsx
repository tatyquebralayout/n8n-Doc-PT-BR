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
  buttonText?: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  loading = false,
  icon,
  category,
  title,
  description,
  link,
  details,
  buttonText = "Leia mais"
}) => {
  return (
    <div
      className={styles.highlightCard}
      tabIndex={0}
      role="link"
      aria-label={`Acessar destaque: ${title}`}
      onClick={() => link && window.open(link, '_self')}
      onKeyDown={e => {
        if ((e.key === 'Enter' || e.key === ' ') && link) {
          e.preventDefault();
          window.open(link, '_self');
        }
      }}
    >
      <div className={styles.cardHeader}>
        {loading ? (
          <LoadingSkeleton variant="circle" width={48} height={48} />
        ) : (
          icon && <IonicIcon name={icon} size={48} className={styles.icon} aria-hidden="true" />
        )}
        {loading ? (
          <LoadingSkeleton variant="line" width={100} height={18} />
        ) : (
          <span className={styles.category}>{category}</span>
        )}
      </div>
      <h3 className={styles.title}>{loading ? <LoadingSkeleton variant="line" width="70%" height={28} /> : title}</h3>
      <p className={styles.description}>{loading ? <LoadingSkeleton variant="line" width="90%" height={18} /> : description}</p>
      <div className={styles.details}>{loading ? <LoadingSkeleton variant="line" width="60%" height={16} /> : details}</div>
      <div className={styles.cardFooter}>
        <Link to={link} className={styles.readMoreLink}>
          {buttonText} <IonicIcon name="arrow-forward-outline" size={20} />
        </Link>
      </div>
    </div>
  );
};

export default HighlightCard; 