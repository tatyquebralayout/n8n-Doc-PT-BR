import React from 'react';

const Details: React.FC<React.DetailsHTMLAttributes<HTMLDetailsElement>> = ({ children, ...props }) => {
  return <details {...props}>{children}</details>;
};

export default Details; 