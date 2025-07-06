import React from 'react';

interface BoxNoteProps {
  type: 'info' | 'warning' | 'danger'; // You can add more types as needed
  children: React.ReactNode;
}

const BoxNote: React.FC<BoxNoteProps> = ({ type, children }) => {
  const typeClasses = {
    info: 'bg-blue-100 border-blue-500 text-blue-800',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-800',
    danger: 'bg-red-100 border-red-500 text-red-800',
  };

  return (
    <div className={`p-4 border-l-4 ${typeClasses[type]} rounded-md`}>
      {children}
    </div>
  );
};

export default BoxNote; 