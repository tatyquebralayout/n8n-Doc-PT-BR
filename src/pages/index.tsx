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
          <Heading as="h1" className={styles.heroTitle}>
            n8n Documentation
          </Heading>
          <p className={styles.heroSubtitle}>
            Documentação completa para automação de workflows com n8n
          </p>
          <div className={styles.heroButtons}>
            <Link
              className={clsx('button button--primary button--lg', styles.getStartedButton)}
              to="/intro">
              Começar agora
            </Link>
            <Link
              className={clsx('button button--outline button--lg', styles.learnMoreButton)}
              to="/release-notes">
              Release Notes
            </Link>
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
              <Link to="/deployment/docker/introducao" className={styles.featureLink}>
                Ver guias de deploy →
              </Link>
            </div>
          </div>

          {/* Card: Catálogo */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <span className={styles.iconEmoji}>🧩</span>
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Catálogo</h3>
              <p className={styles.featureDescription}>
                Explore mais de 400 integrações disponíveis. 
                Documentação detalhada de todos os nodes e suas configurações.
              </p>
              <Link to="/catalog/core/if" className={styles.featureLink}>
                Explorar catálogo →
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

function HomepageQuickLinks() {
  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <div className={styles.quickLinksHeader}>
          <h2>Acesso Rápido</h2>
          <p>Links diretos para as seções mais acessadas</p>
        </div>
        
        <div className={styles.quickLinksGrid}>
          <Link to="/tutorial-basico/instalacao" className={styles.quickLinkItem}>
            <h4>🔧 Instalação</h4>
            <p>Como instalar e configurar o n8n</p>
          </Link>
          
          <Link to="/tutorial-basico/primeiro-workflow" className={styles.quickLinkItem}>
            <h4>✨ Primeiro Workflow</h4>
            <p>Crie seu primeiro workflow em 5 minutos</p>
          </Link>
          
          <Link to="/integracoes/webhooks" className={styles.quickLinkItem}>
            <h4>🔗 Webhooks</h4>
            <p>Conecte aplicações via webhooks</p>
          </Link>
          
          <Link to="/deployment/docker/compose" className={styles.quickLinkItem}>
            <h4>🐳 Docker Compose</h4>
            <p>Deploy com Docker Compose</p>
          </Link>
          
          <Link to="/seguranca/credenciais" className={styles.quickLinkItem}>
            <h4>🛡️ Segurança</h4>
            <p>Gerenciamento de credenciais</p>
          </Link>
          
          <Link to="/catalog/http/http-request" className={styles.quickLinkItem}>
            <h4>🌐 HTTP Request</h4>
            <p>Fazer requisições HTTP</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Início"
      description="Documentação completa do n8n em português brasileiro">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageQuickLinks />
      </main>
    </Layout>
  );
} 