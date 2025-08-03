import { motion } from 'framer-motion';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

export function AnimatedCounter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        textAlign: 'center',
        padding: '30px',
        background: 'var(--ifm-background-surface-color)',
        borderRadius: '12px',
        border: '2px solid var(--ifm-color-primary)',
        margin: '20px 0'
      }}
    >
      <motion.h3
        key={count}
        initial={{ scale: 1.5, color: '#ea4b71' }}
        animate={{ scale: 1, color: 'var(--ifm-font-color-base)' }}
        transition={{ duration: 0.3 }}
      >
        Contador: {count}
      </motion.h3>
      
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCount(count + 1)}
          style={{
            background: '#ea4b71',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ion-icon name="add"></ion-icon>
          Incrementar
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCount(0)}
          style={{
            background: '#6b7280',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ion-icon name="refresh"></ion-icon>
          Reset
        </motion.button>
      </div>
    </motion.div>
  );
}

export function InteractiveCard() {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      style={{
        background: 'var(--ifm-background-surface-color)',
        border: '1px solid var(--ifm-color-emphasis-200)',
        borderRadius: '12px',
        padding: '20px',
        margin: '20px 0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <h4>Card Interativo</h4>
      <p>Este card possui estados interativos com animações suaves.</p>
      
      <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            color: isLiked ? '#ea4b71' : '#6b7280'
          }}
        >
          <motion.div
            animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <ion-icon name={isLiked ? "heart" : "heart-outline"}></ion-icon>
          </motion.div>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsBookmarked(!isBookmarked)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            color: isBookmarked ? '#f59e0b' : '#6b7280'
          }}
        >
          <motion.div
            animate={{ rotate: isBookmarked ? [0, -10, 10, 0] : 0 }}
            transition={{ duration: 0.4 }}
          >
            <ion-icon name={isBookmarked ? "bookmark" : "bookmark-outline"}></ion-icon>
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
}

interface ConditionalAnimationProps {
  isActive: boolean;
}

export function ConditionalAnimation({ isActive }: ConditionalAnimationProps) {
  return (
    <motion.div
      animate={{
        backgroundColor: isActive ? '#ea4b71' : '#6b7280',
        scale: isActive ? 1.05 : 1
      }}
      transition={{ duration: 0.3 }}
    >
      {isActive ? 'Ativo' : 'Inativo'}
    </motion.div>
  );
}

export function ResponsiveAnimation() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  return (
    <motion.div
      animate={{
        x: isMobile ? 0 : 50,
        scale: isMobile ? 1 : 1.1
      }}
      transition={{ duration: 0.5 }}
    >
      Animação responsiva
    </motion.div>
  );
}

export const AnimatedButton = ({
  children,
  variant = 'primary',
  icon,
  onClick
}) => {
  const variants = {
    primary: { background: '#ea4b71', color: 'white' },
    secondary: { background: '#6b7280', color: 'white' }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        ...variants[variant],
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      {icon && <ion-icon name={icon}></ion-icon>}
      {children}
    </motion.button>
  );
}; 