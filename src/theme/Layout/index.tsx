import React from 'react';
import OriginalLayout from '@theme-original/Layout';

export default function Layout({ children, ...props }) {
  return (
    <OriginalLayout {...props}>
      {children}
    </OriginalLayout>
  );
} 