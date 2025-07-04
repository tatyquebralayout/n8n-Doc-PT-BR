import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import IonicIcon from '@site/src/components/IonicIcon';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: React.JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Automação Simplificada',
    icon: 'flash-outline',
    description: (
      <>
        O n8n torna a automação de workflows acessível para todos.
        Conecte suas ferramentas favoritas sem precisar escrever código.
      </>
    ),
  },
  {
    title: 'Foque no que Importa',
    icon: 'rocket-outline',
    description: (
      <>
        Deixe o n8n cuidar das tarefas repetitivas enquanto você
        foca no crescimento do seu negócio e na criatividade.
      </>
    ),
  },
  {
    title: 'Documentação Moderna',
    icon: 'book-outline',
    description: (
      <>
        Esta documentação foi criada com Docusaurus e React,
        oferecendo uma experiência de aprendizado moderna e interativa.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <IonicIcon 
          name={icon} 
          size={64} 
          className={styles['homepage-features__svg']} 
        />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          {title}
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles['homepage-features']}>
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