import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';

interface HighlightCardProps {
  icon: string;
  category: string;
  title: string;
  description: string;
  link: string;
  details?: React.ReactNode;
}

export default function HighlightCard({
  icon,
  category,
  title,
  description,
  link,
  details,
}: HighlightCardProps): React.ReactElement {
  return (
    <div className={styles.highlightCard}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <IonicIcon name={icon} size={24} className={styles.icon} />
          <span className={styles.category}>{category}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {details && <div className={styles.details}>{details}</div>}
      </div>
      <div className={styles.cardFooter}>
        <Link to={link} className={styles.readMoreLink}>
          Leia mais <IonicIcon name="arrow-forward-outline" size={16} />
        </Link>
      </div>
    </div>
  );
} 