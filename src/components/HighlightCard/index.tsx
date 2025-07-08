import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface HighlightCardProps {
  title: string;
  description: string;
  icon?: string;
  buttonText?: string;
  buttonLink?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  description,
  icon,
  buttonText,
  buttonLink,
  variant = 'primary',
  className,
}) => {
  const cardClass = clsx(
    styles.highlightCard,
    styles[`highlightCard--${variant}`],
    className
  );

  const content = (
    <>
      <div className={styles.highlightCardContent}>
        {icon && <ion-icon name={icon} style={{fontSize: 48, color: 'var(--ifm-color-primary)'}} className={styles.icon} aria-hidden="true" />}
        <h3 className={styles.highlightCardTitle}>{title}</h3>
        <p className={styles.highlightCardDescription}>{description}</p>
      </div>
      {buttonText && (
        <div className={styles.highlightCardFooter}>
          <span className={styles.highlightCardButton}>
            {buttonText} <ion-icon name="arrow-forward-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} />
          </span>
        </div>
      )}
    </>
  );

  if (buttonLink) {
    return (
      <Link to={buttonLink} className={cardClass}>
        {content}
      </Link>
    );
  }

  return (
    <div className={cardClass}>
      {content}
    </div>
  );
};

export default HighlightCard; 