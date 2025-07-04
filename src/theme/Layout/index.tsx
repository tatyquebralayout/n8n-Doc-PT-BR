import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import { useLocation } from '@docusaurus/router';
import { AnimatePresence, motion } from 'framer-motion';

export default function Layout({ children, ...props }) {
  const location = useLocation();

  return (
    <OriginalLayout {...props}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </OriginalLayout>
  );
} 