import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  link: string;
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Primeiros Passos',
    description: 'Aprenda os conceitos básicos do n8n e crie seu primeiro workflow de automação.',
    icon: 'rocket-outline',
    link: '/primeiros-passos',
  },
  {
    title: 'Integrações',
    description: 'Explore centenas de integrações prontas para conectar suas aplicações favoritas.',
    icon: 'extension-puzzle-outline',
    link: '/integracoes',
  },
  {
    title: 'Lógica e Dados',
    description: 'Domine o fluxo de dados, transformações e lógica condicional nos workflows.',
    icon: 'git-branch-outline',
    link: '/logica-e-dados',
  },
  {
    title: 'Hosting e Deploy',
    description: 'Configure e implante o n8n em diferentes ambientes de produção.',
    icon: 'cloud-upload-outline',
    link: '/hosting-n8n',
  },
  {
    title: 'IA Avançada',
    description: 'Integre inteligência artificial e machine learning nos seus workflows.',
    icon: 'sparkles-outline',
    link: '/advanced-ai',
  },
  {
    title: 'Comunidade',
    description: 'Conecte-se com outros usuários, compartilhe experiências e contribua.',
    icon: 'people-outline',
    link: '/comunidade',
  },
];

function Feature({title, description, icon, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Link to={link} className={styles.featureLink}>
          <div className={styles.featureIcon}>
            <ion-icon name={icon} style={{fontSize: 48, color: 'var(--ifm-color-primary)'}} />
          </div>
          <div className="text--center padding-horiz--md">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
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