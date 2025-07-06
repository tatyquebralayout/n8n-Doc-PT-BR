import React from 'react';

interface SplitTextProps {
  text: string;
  color?: string;
  className?: string;
  delay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({ 
  text, 
  color = '#0ea5e9', 
  className = '',
  delay = 100
}) => {
  const letters = text.split('');
  
  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <span
          key={index}
          style={{
            color: color,
            display: 'inline-block',
            animation: `splitAnimation 0.6s ease-out ${index * delay}ms both`,
            fontWeight: 'bold'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  );
};

export default SplitText; 