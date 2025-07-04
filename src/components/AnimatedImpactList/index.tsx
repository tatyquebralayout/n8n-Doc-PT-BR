import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';

interface AnimatedImpactListProps {
  items: string[];
}

const AnimatedImpactList: React.FC<AnimatedImpactListProps> = ({ items }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`${styles.impactContainer} ${inView ? styles.inView : ''}`}>
      <h3 className={styles.title}>
        <IonicIcon name="sparkles-outline" size={22} color="#ea4b71" />
        Sua contribuição transforma! Veja como:
      </h3>
      <ul className={styles.impactList}>
        {items.map((item, index) => (
          <li
            key={index}
            className={styles.impactItem}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <IonicIcon name="checkmark-circle-outline" size={20} className={styles.itemIcon} />
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
      <p className={styles.footerText}>
        Cada linha que você melhora, cada exemplo que você adiciona e cada dúvida que você esclarece tem um efeito multiplicador. <strong>Participe e ajude a construir a melhor e mais completa documentação do n8n para a comunidade brasileira!</strong>
      </p>
    </div>
  );
};

export default AnimatedImpactList; 