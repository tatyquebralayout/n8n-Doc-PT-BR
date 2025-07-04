import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import IonicIcon from '@site/src/components/IonicIcon';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  iconColor: string;
  description: React.JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Automação Simplificada',
    icon: 'flash-outline',
    iconColor: '#ea4b71',
    description: (
      <>
        <IonicIcon name="heart-outline" size={16} color="#6b7280" style={{marginRight: '6px'}} />
        O n8n torna a automação de workflows acessível para todos.
        Conecte suas ferramentas favoritas sem precisar escrever código.
      </>
    ),
  },
  {
    title: 'Foque no que Importa',
    icon: 'target-outline',
    iconColor: '#10b981',
    description: (
      <>
        <IonicIcon name="time-outline" size={16} color="#6b7280" style={{marginRight: '6px'}} />
        Deixe o n8n cuidar das tarefas repetitivas enquanto você
        foca no crescimento do seu negócio e na criatividade.
      </>
    ),
  },
  {
    title: 'Documentação Moderna',
    icon: 'book-outline',
    iconColor: '#f59e0b',
    description: (
      <>
        <IonicIcon name="school-outline" size={16} color="#6b7280" style={{marginRight: '6px'}} />
        Esta documentação foi criada com Docusaurus e React,
        oferecendo uma experiência de aprendizado moderna e interativa.
      </>
    ),
  },
];

function Feature({title, icon, iconColor, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <IonicIcon 
          name={icon} 
          size={64} 
          color={iconColor} 
          className={styles.featureSvg} 
          style={{marginBottom: '16px'}}
        />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <IonicIcon name="star-outline" size={18} color="#ea4b71" style={{marginRight: '8px'}} />
          {title}
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
} 