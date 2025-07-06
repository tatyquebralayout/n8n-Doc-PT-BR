import React from 'react';

interface ShinyTextProps {
  text: string;
  color?: string;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
  text, 
  color = '#ea4b71', 
  className = '' 
}) => {
  return (
    <span 
      className={`shiny-text ${className}`}
      style={{
        background: `linear-gradient(45deg, ${color}, #ffffff, ${color})`,
        backgroundSize: '200% 200%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'shinyAnimation 2s ease-in-out infinite',
        fontWeight: 'bold'
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText; 