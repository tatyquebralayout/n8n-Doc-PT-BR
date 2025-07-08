import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const ReactBitsDemo: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const icons = ['flash-outline', 'git-network-outline', 'hardware-chip-outline'];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnimating) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % icons.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isAnimating, icons.length]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    setCurrentIndex(0);
  };

  return (
    <div className={styles.container}>
      <h2><ion-icon name="rocket-outline" style={{fontSize: 32, color: 'var(--ifm-color-primary)'}} /> React Bits Demo - Animações SVG</h2>
      
      <div className={styles.controls}>
        <button 
          onClick={toggleAnimation}
          className={styles.animateButton}
          disabled={isAnimating}
        >
          {isAnimating ? <><ion-icon name="refresh-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} /> Animando...</> : <><ion-icon name="sparkles-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} /> Iniciar Animação</>}
        </button>
        
        <button 
          onClick={stopAnimation}
          className={styles.stopButton}
        >
          <ion-icon name="stop-circle-outline" style={{fontSize: 20, color: 'var(--ifm-color-danger)'}} /> Parar
        </button>
      </div>

      <div className={styles.animationContainer}>
        <div className={styles.iconGrid}>
          {icons.map((icon, index) => (
            <div 
              key={icon}
              className={`${styles.iconCell} ${
                index === currentIndex && isAnimating ? styles.active : ''
              }`}
            >
              {index === 0 && <ion-icon name="flash-outline" style={{fontSize: 48, color: 'var(--ifm-color-primary)'}} />}
              {index === 1 && <ion-icon name="git-network-outline" style={{fontSize: 48, color: 'var(--ifm-color-primary)'}} />}
              {index === 2 && <ion-icon name="hardware-chip-outline" style={{fontSize: 48, color: 'var(--ifm-color-primary)'}} />}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.info}>
        <p>Este componente demonstra animações CSS com ícones Ionicons.</p>
        <p>Ícone ativo: <strong>{icons[currentIndex]}</strong></p>
        <p>Status: <strong>{isAnimating ? 'Animando' : 'Parado'}</strong></p>
      </div>
    </div>
  );
};

export default ReactBitsDemo; 