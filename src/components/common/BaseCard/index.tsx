import React from 'react';
import clsx from 'clsx';
import IonicIcon from '@site/src/components/IonicIcon';
import styles from './styles.module.css';

interface BaseCardProps {
  title: string;
  description?: string;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  dataTestId?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

const BaseCard: React.FC<BaseCardProps> = ({
  title,
  description,
  icon,
  iconSize = 24,
  iconColor = 'currentColor',
  className,
  children,
  onClick,
  href,
  target,
  rel,
  dataTestId,
  variant = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
}) => {
  const cardContent = (
    <>
      <div className={styles.header}>
        {icon && (
          <div className={styles.icon}>
            <IonicIcon 
              name={icon} 
              size={iconSize} 
              color={iconColor} 
            />
          </div>
        )}
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
      </div>
      {children && <div className={styles.children}>{children}</div>}
      {loading && (
        <div className={styles.loading}>
          <IonicIcon name="refresh-outline" size={16} />
          <span>Carregando...</span>
        </div>
      )}
    </>
  );

  const cardProps = {
    className: clsx(
      styles.baseCard, 
      styles[variant], 
      styles[size],
      disabled && styles.disabled,
      loading && styles.loading,
      className
    ),
    'data-testid': dataTestId || 'base-card',
    disabled: disabled || loading,
  };

  if (href) {
    return (
      <a 
        href={href} 
        target={target} 
        rel={rel}
        onClick={onClick}
        {...cardProps}
      >
        {cardContent}
      </a>
    );
  }

  if (onClick) {
    return (
      <button 
        onClick={onClick}
        type="button"
        {...cardProps}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <div {...cardProps}>
      {cardContent}
    </div>
  );
};

export default BaseCard; 