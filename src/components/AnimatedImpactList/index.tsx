import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './styles.module.css';
import LocalIcon from '@site/src/components/LocalIcon';

interface AnimatedImpactListProps {
  items: string[];
}

const AnimatedImpactList: React.FC<AnimatedImpactListProps> = ({ items }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`${styles['animated-impact__container']} ${inView ? styles.inView : ''}`}>
      <h3 className={styles['animated-impact__title']}>
        <LocalIcon name="sparkles-outline" size={24} className={styles['animated-impact__title-icon']} />
        Sua contribuição transforma! Veja como:
      </h3>
      <ul className={styles['animated-impact__list']}>
        {items.map((item, index) => (
          <li
            key={index}
            className={styles['animated-impact__item']}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <LocalIcon name="checkmark-circle-outline" size={20} className={styles['animated-impact__item-icon']} />
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
      <p className={styles['animated-impact__footer']}>
        Cada linha que você melhora, cada exemplo que você adiciona e cada dúvida que você esclarece tem um efeito multiplicador. <strong>Participe e ajude a construir a melhor e mais completa documentação do n8n para a comunidade brasileira!</strong>
      </p>
    </div>
  );
};

export default AnimatedImpactList; 