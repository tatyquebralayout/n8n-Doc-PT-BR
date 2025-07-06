import React from 'react';
import useAccessibleLink from './useAccessibleLink';

interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  newTab?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
  onCardClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  role?: string;
}

const BaseCard: React.FC<BaseCardProps> = ({
  href,
  newTab = false,
  disabled = false,
  ariaLabel,
  className = '',
  children,
  onCardClick,
  role = 'link',
  ...rest
}) => {
  const accessibleProps = useAccessibleLink({
    href,
    onClick: onCardClick,
    newTab,
    disabled,
    ariaLabel,
  });

  return (
    <div
      className={className}
      {...accessibleProps}
      role={role}
      {...rest}
    >
      {children}
    </div>
  );
};

export default BaseCard; 