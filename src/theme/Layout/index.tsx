import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import Navbar from '../Navbar';

export default function Layout({ children, ...props }) {
  return (
    <OriginalLayout {...props}>
      <Navbar />
      {children}
    </OriginalLayout>
  );
} 