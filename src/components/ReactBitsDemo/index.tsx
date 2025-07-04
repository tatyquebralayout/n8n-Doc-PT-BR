import React, { useState } from 'react';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';

const ReactBitsDemo: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className={styles.container}>
      <h2><IonicIcon name="rocket-outline" size={32} /> React Bits Demo - Animações SVG</h2>
      
      {/* Seção de Botões Animados */}
      <div className={styles.section}>
        <h3>Botões Interativos</h3>
        <div className={styles.buttonGroup}>
          <button 
            onClick={handleAnimation}
            className={styles.animatedButton}
          >
            {isAnimating ? <><IonicIcon name="refresh-outline" size={18} /> Animando...</> : <><IonicIcon name="sparkles-outline" size={18} /> Iniciar Animação</>}
          </button>
          
          <button 
            onClick={() => setIsAnimating(false)}
            className={styles.stopButton}
          >
                          <IonicIcon name="stop-circle-outline" size={18} /> Parar
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
              fill="#ea4b71"
              className={styles.animatedCircle}
            />
            
            {/* Linhas animadas */}
            <line
              x1="50"
              y1="100"
              x2="250"
              y2="100"
              stroke="#1e40af"
              strokeWidth="3"
              className={styles.animatedLine}
            />
            
            {/* Texto animado */}
            <text
              x="150"
              y="160"
              textAnchor="middle"
              fill="#374151"
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
            >
              <div className={styles.cardIcon}>
                {index === 0 && <IonicIcon name="flash-outline" size={48} />}
                {index === 1 && <IonicIcon name="git-network-outline" size={48} />}
                {index === 2 && <IonicIcon name="hardware-chip-outline" size={48} />}
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

export default ReactBitsDemo; 