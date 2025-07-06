import React from 'react';

interface GradientTextProps {
  text: string;
  from?: string;
  to?: string;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ 
  text, 
  from = '#f59e0b', 
  to = '#f472b6',
  className = ''
}) => {
  return (
    <span 
      className={className}
      style={{
        background: `linear-gradient(45deg, ${from}, ${to})`,
        backgroundSize: '200% 200%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'gradientAnimation 3s ease-in-out infinite',
        fontWeight: 'bold'
      }}
    >
      {text}
    </span>
  );
};

export default GradientText; 