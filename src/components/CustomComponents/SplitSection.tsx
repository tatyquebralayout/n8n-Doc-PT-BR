import React from 'react';

interface SplitSectionProps {
  heading: string;
  contentLeft: React.ReactNode;
  contentRight: React.ReactNode;
}

const SplitSection: React.FC<SplitSectionProps> = ({ heading, contentLeft, contentRight }) => {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">{heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>{contentLeft}</div>
        <div>{contentRight}</div>
      </div>
    </section>
  );
};

export default SplitSection; 