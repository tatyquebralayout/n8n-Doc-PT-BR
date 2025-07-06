import React from 'react';

interface HighlightProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

const Highlight: React.FC<HighlightProps> = ({ 
  children, 
  color = '#fcd34d',
  className = ''
}) => {
  return (
    <span 
      className={className}
      style={{
        backgroundColor: color,
        padding: '2px 6px',
        borderRadius: '4px',
        fontWeight: '500',
        color: '#1f2937'
      }}
    >
      {children}
    </span>
  );
};

export default Highlight; 