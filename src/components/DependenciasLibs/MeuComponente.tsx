import React, { useState } from 'react';
import { motion } from 'framer-motion';

const styles = {
  container: {
    padding: '1rem',
    border: '2px solid var(--ifm-color-primary)',
    borderRadius: '8px',
    background: 'var(--ifm-background-color)',
    transition: 'all 0.3s ease',
    position: 'relative' as 'relative',
  },
  title: {
    color: 'var(--ifm-color-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  content: {
    color: 'var(--ifm-font-color-base)',
  },
  tooltip: {
    position: 'absolute' as 'absolute',
    top: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--ifm-color-primary)',
    color: 'white',
    padding: '0.5rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
  },
};

interface MeuComponenteProps {
  title: string;
  animated?: boolean;
  children?: React.ReactNode;
}

const MeuComponente: React.FC<MeuComponenteProps> = ({
  title,
  animated = true,
  children
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={styles.container}
      initial={animated ? { opacity: 0 } : {}}
      animate={animated ? { opacity: 1 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <h3 style={styles.title}>
        <ion-icon name="star-outline"></ion-icon>
        {title}
      </h3>
      
      <div style={styles.content}>
        {children}
      </div>
      
      {isHovered && (
        <motion.div
          style={styles.tooltip}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          Dica interativa!
        </motion.div>
      )}
    </motion.div>
  );
};

export default MeuComponente;
