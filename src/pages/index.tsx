import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroImageContainer}>
            <img 
              src="img/banner_n8n_ptbr.png" 
              alt="n8n Documentation Brasil - Automatize tudo em português"
              className={styles.heroImage}
            />
          </div>
          <div className={styles.heroTextContent}>
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/intro">
                Comece a Explorar - 5min ⏱️
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresGrid}>
          
          {/* Card: Criar e Usar Workflows */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <span className={styles.iconEmoji}>⚡</span>
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Criar e Usar Workflows</h3>
              <p className={styles.featureDescription}>
                Aprenda a criar workflows poderosos com interface visual intuitiva. 
                Conecte aplicações, transforme dados e automatize processos complexos.
              </p>
              <Link to="/tutorial-basico/instalacao" className={styles.featureLink}>
                Começar tutorial →
              </Link>
            </div>
          </div>

          {/* Card: Deployment */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <span className={styles.iconEmoji}>🚀</span>
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Deployment</h3>
              <p className={styles.featureDescription}>
                Guias completos para implantar n8n em produção. 
                Suporte para Docker, Kubernetes, AWS, Azure e muito mais.
              </p>
              <Link to="/hosting-n8n/instalacao" className={styles.featureLink}>
                Ver guias de deploy →
              </Link>
            </div>
          </div>

          {/* Card: Nodes e Integrações */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <span className={styles.iconEmoji}>🧩</span>
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Nodes e Integrações</h3>
              <p className={styles.featureDescription}>
                Descubra os blocos de construção do n8n: Core nodes, integrações com apps,
                triggers, credenciais e nodes da comunidade.
              </p>
              <Link to="/integracoes/overview" className={styles.featureLink}>
                Explorar nodes →
              </Link>
            </div>
          </div>

          {/* Card: Release Notes */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <span className={styles.iconEmoji}>📋</span>
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Release Notes</h3>
              <p className={styles.featureDescription}>
                Mantenha-se atualizado com as últimas funcionalidades, 
                melhorias e correções de bugs do n8n.
              </p>
              <Link to="/release-notes" className={styles.featureLink}>
                Ver atualizações →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
} 