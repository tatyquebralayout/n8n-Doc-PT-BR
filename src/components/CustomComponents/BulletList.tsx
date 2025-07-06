import React from 'react';

interface BulletListProps {
  items: string[];
  color?: string;
  className?: string;
}

const BulletList: React.FC<BulletListProps> = ({ 
  items, 
  color = '#10b981',
  className = ''
}) => {
  return (
    <ul 
      className={className}
      style={{
        listStyle: 'none',
        padding: 0,
        margin: '1rem 0'
      }}
    >
      {items.map((item, index) => (
        <li 
          key={index}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '0.5rem',
            gap: '0.5rem'
          }}
        >
          <span 
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: color,
              borderRadius: '50%',
              marginTop: '0.5rem',
              flexShrink: 0
            }}
          />
          <span 
            dangerouslySetInnerHTML={{ __html: item }}
            style={{ flex: 1 }}
          />
        </li>
      ))}
    </ul>
  );
};

export default BulletList; 