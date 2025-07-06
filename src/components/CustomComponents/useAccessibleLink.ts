import { useCallback } from 'react';

interface UseAccessibleLinkProps {
  href?: string;
  onClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  newTab?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

export function useAccessibleLink({ href, onClick, newTab = false, disabled = false, ariaLabel }: UseAccessibleLinkProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (onClick) {
        onClick(e);
      } else if (href) {
        if (newTab) {
          window.open(href, '_blank', 'noopener noreferrer');
        } else {
          window.open(href, '_self');
        }
      }
    },
    [href, onClick, newTab, disabled]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
        e.preventDefault();
        handleClick(e);
      }
    },
    [handleClick, disabled]
  );

  return {
    tabIndex: disabled ? -1 : 0,
    role: 'link',
    'aria-label': ariaLabel,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    'aria-disabled': disabled,
  } as const;
}

export default useAccessibleLink; 