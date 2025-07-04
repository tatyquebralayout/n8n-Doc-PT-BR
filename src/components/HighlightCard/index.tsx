import React from 'react';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';

export default function HighlightCard({
  icon,
  iconColor = '#ea4b71',
  category,
  title,
  description,
  link,
  details,
}) {
  return (
    <a href={link} className={styles.highlightCard}>
      <div className={styles.cardHeader}>
        <IonicIcon name={icon} size={20} color={iconColor} />
        <span className={styles.category}>{category}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.details}>
        {details}
      </div>
    </a>
  );
} 