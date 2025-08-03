import React from 'react';
import clsx from 'clsx';
import IonicIcon from '@site/src/components/IonicIcon';
import styles from './styles.module.css';

interface StatItemProps {
  label: string;
  value: number | string;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  formatValue?: (value: number | string) => string;
  dataTestId?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  icon,
  iconSize = 24,
  iconColor = 'currentColor',
  className,
  size = 'medium',
  variant = 'default',
  formatValue,
  dataTestId,
}) => {
  const formatDisplayValue = () => {
    if (formatValue) {
      return formatValue(value);
    }
    
    if (typeof value === 'number') {
      // Usar formatação brasileira (vírgula como separador decimal, ponto como separador de milhares)
      return value.toLocaleString('pt-BR');
    }
    
    return String(value);
  };

  return (
    <div 
      className={clsx(styles.statItem, styles[size], styles[variant], className)}
      data-testid={dataTestId || 'stat-item'}
    >
      {icon && (
        <div className={styles.icon} style={{ color: iconColor }}>
          <IonicIcon name={icon} size={iconSize} />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.value} data-testid="stat-value">
          {formatDisplayValue()}
        </div>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  );
};

export default StatItem; 