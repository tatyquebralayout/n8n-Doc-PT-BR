import React, { useState } from 'react';
import styles from './styles.module.css';
import LocalIcon from '@site/src/components/LocalIcon';

const ReactBitsDemo: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className={styles.container}>
      <h2><LocalIcon name="rocket-outline" size={32} /> React Bits Demo - Animações SVG</h2>
      
      {/* Seção de Botões Animados */}
      <div className={styles.section}>
        <h3>Botões Interativos</h3>
        <div className={styles.buttonGroup}>
          <button 
            onClick={handleAnimation}
            className={styles.animatedButton}
            aria-label={isAnimating ? 'Parar animação' : 'Iniciar animação'}
          >
            {isAnimating ? <><LocalIcon name="refresh-outline" size={20} /> Animando...</> : <><LocalIcon name="sparkles-outline" size={20} /> Iniciar Animação</>}
          </button>
          
          <button 
            onClick={() => setIsAnimating(false)}
            className={styles.stopButton}
            aria-label="Parar animação"
          >
            <LocalIcon name="stop-circle-outline" size={20} /> Parar
          </button>
        </div>
      </div>

      {/* Seção de SVG Animado */}
      <div className={styles.section}>
        <h3>SVG Animado</h3>
        <div className={styles.svgContainer}>
          <svg 
            width="300" 
            height="200" 
            viewBox="0 0 300 200"
            className={`${styles.svgDemo} ${isAnimating ? styles.animating : ''}`}
          >
            {/* Círculo animado */}
            <circle
              cx="150"
              cy="100"
              r="30"
              fill="currentColor"
              className={styles.animatedCircle}
            />
            
            {/* Linhas animadas */}
            <line
              x1="50"
              y1="100"
              x2="250"
              y2="100"
              stroke="currentColor"
              strokeWidth="3"
              className={styles.animatedLine}
            />
            
            {/* Texto animado */}
            <text
              x="150"
              y="160"
              textAnchor="middle"
              fill="currentColor"
              fontSize="18"
              fontWeight="bold"
              className={styles.animatedText}
            >
              n8n Brasil
            </text>
          </svg>
        </div>
      </div>

      {/* Seção de Cards Interativos */}
      <div className={styles.section}>
        <h3>Cards Interativos</h3>
        <div className={styles.cardGrid}>
          {['Workflows', 'Integrações', 'Automação'].map((title, index) => (
            <div
              key={index}
              className={`${styles.card} ${isAnimating ? styles.cardAnimating : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
              tabIndex={0}
              role="button"
              aria-label={`Card interativo: ${title}`}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Aqui você pode definir uma ação para o card, se desejar
                }
              }}
            >
              <div className={styles.cardIcon} aria-hidden="true">
                {index === 0 && <LocalIcon name="flash-outline" size={48} />}
                {index === 1 && <LocalIcon name="git-network-outline" size={48} />}
                {index === 2 && <LocalIcon name="hardware-chip-outline" size={48} />}
              </div>
              <h4>{title}</h4>
              <p>Exemplo de card animado com React Bits</p>
            </div>
          ))}
        </div>
      </div>

      {/* Indicador de Status */}
      <div className={styles.status}>
        <div className={`${styles.statusIndicator} ${isAnimating ? styles.active : ''}`}>
          <div className={styles.statusDot}></div>
          <span>{isAnimating ? 'Animação Ativa' : 'Animação Parada'}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ReactBitsDemo); 