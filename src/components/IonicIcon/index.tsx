import React from 'react';

interface IonicIconProps {
  name: string;
  size?: 'small' | 'large' | number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const IonicIcon: React.FC<IonicIconProps> = ({ 
  name, 
  size = 'large', 
  color,
  className = '',
  style = {}
}) => {
  const iconElement = React.createElement('ion-icon', {
    name,
    size: typeof size === 'number' ? undefined : size,
    style: {
      fontSize: typeof size === 'number' ? `${size}px` : undefined,
      color: color || 'currentColor',
      ...style
    },
    className
  });

  return iconElement;
};

export default IonicIcon; 