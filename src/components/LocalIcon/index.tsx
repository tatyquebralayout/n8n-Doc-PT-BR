import React from 'react';

interface LocalIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  'aria-hidden'?: boolean;
}

const LocalIcon: React.FC<LocalIconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  'aria-hidden': ariaHidden = false,
}) => {
  const iconPath = `/svg/${name}.svg`;
  
  return (
    <img
      src={iconPath}
      alt={`${name} icon`}
      width={size}
      height={size}
      style={{ color }}
      className={`local-icon ${className}`}
      aria-hidden={ariaHidden}
    />
  );
};

export default LocalIcon; 