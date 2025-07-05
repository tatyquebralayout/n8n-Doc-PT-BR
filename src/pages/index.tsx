import React, { Suspense } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import IonicIcon from '@site/src/components/IonicIcon';

import styles from './index.module.css';

const HomepageFeatures = React.lazy(() => import('@site/src/components/HomepageFeatures'));

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
            <Heading as="h1" className={styles.heroTitle}>
              <svg width="20" height="20" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
                <path d="M315.27 33L96 304h128l-31.51 173.23a2.36 2.36 0 002.33 2.77h0a2.36 2.36 0 001.89-.95L416 208H288l31.66-173.25a2.45 2.45 0 00-2.44-2.75h0a2.42 2.42 0 00-1.95 1z" stroke="#ea4b71" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </svg>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>
              <IonicIcon name="globe-outline" size={20} />
              {siteConfig.tagline}
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.getStartedButton}
                to="/intro">
                <IonicIcon name="play-circle-outline" size={20} />
                Comece a Explorar - 5min
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Página Inicial`}
      description="Documentação completa do n8n em português brasileiro - Hub de conhecimento para a comunidade brasileira de automação.">
      <HomepageHeader />
      <main>
        <Suspense fallback={<div>Carregando recursos...</div>}>
          <HomepageFeatures />
        </Suspense>
        
        <section className={styles.mainFeatures}>
          <div className="container">
            <div className={styles.mainFeaturesGrid}>

            <div className={styles.mainFeature}>
              <div className={styles.mainFeatureIcon}>
                <IonicIcon name="git-network-outline" size={20} />
              </div>
              <div className={styles.mainFeatureContent}>
                <h4>Workflows Poderosos</h4>
                <p>
                  <svg width="20" height="20" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
                    <path d="M315.27 33L96 304h128l-31.51 173.23a2.36 2.36 0 002.33 2.77h0a2.36 2.36 0 001.89-.95L416 208H288l31.66-173.25a2.45 2.45 0 00-2.44-2.75h0a2.42 2.42 0 00-1.95 1z" stroke="#ea4b71" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  </svg>
                  Aprenda a criar automações complexas com guias detalhados.
                </p>
              </div>
              <Link to="/tutorial-basico/primeiro-workflow" className={styles.mainFeatureLink}>
                <IonicIcon name="arrow-forward-outline" size={16} />
              </Link>
            </div>

            <div className={styles.mainFeature}>
              <div className={styles.mainFeatureIcon}>
                <IonicIcon name="server-outline" size={20} />
              </div>
              <div className={styles.mainFeatureContent}>
                <h4>Hospedagem e Deploy</h4>
                <p>
                  <svg width="16" height="16" viewBox="0 0 512 512" fill="none" style={{verticalAlign: 'middle'}}><path d="M400 240c-8.89-89.54-71-144-144-144-69 0-113.44 48.2-128 96-60 6-112 43.59-112 112 0 66 54 112 120 112h260c55 0 100-27.44 100-88 0-59.82-53-85.76-96-88z" stroke="#ea4b71" stroke-width="32" stroke-linejoin="round" fill="none"/></svg>
                  Domine a instalação do n8n em qualquer ambiente.
                </p>
              </div>
              <Link to="/hosting-n8n/instalacao" className={styles.mainFeatureLink}>
                <IonicIcon name="arrow-forward-outline" size={16} />
              </Link>
            </div>

            <div className={styles.mainFeature}>
              <div className={styles.mainFeatureIcon}>
                <IonicIcon name="extension-puzzle-outline" size={20} />
              </div>
              <div className={styles.mainFeatureContent}>
                <h4>Integrações</h4>
                <p>
                  <svg width="16" height="16" viewBox="0 0 512 512" fill="none" style={{verticalAlign: 'middle'}}><rect x="64" y="64" width="80" height="80" rx="40" stroke="#ea4b71" stroke-width="32" fill="none"/><rect x="216" y="64" width="80" height="80" rx="40" stroke="#ea4b71" stroke-width="32" fill="none"/><rect x="368" y="64" width="80" height="80" rx="40" stroke="#ea4b71" stroke-width="32" fill="none"/><rect x="64" y="216" width="80" height="80" rx="40" stroke="#ea4b71" stroke-width="32" fill="none"/><rect x="216" y="216" width="80" height="80" rx="40" stroke="#ea4b71" stroke-width="32" fill="none"/><rect x="368" y="216" width="80" height="80" rx="40" stroke="#ea4b71" stroke-width="32" fill="none"/><rect x="64" y="368" width="80" height="80" rx="40" stroke="#ea4b71" stroke-width="32" fill="none"/><rect x="216" y="368" width="80" height="80" rx="40" stroke="#ea4b71" stroke-width="32" fill="none"/><rect x="368" y="368" width="80" height="80" rx="40" stroke="#ea4b71" stroke-width="32" fill="none"/></svg>
                  Conecte centenas de apps com nodes prontos para usar.
                </p>
              </div>
              <Link to="/integracoes" className={styles.mainFeatureLink}>
                <IonicIcon name="arrow-forward-outline" size={16} />
              </Link>
            </div>

            <div className={styles.mainFeature}>
              <div className={styles.mainFeatureIcon}>
                <IonicIcon name="people-outline" size={20} />
              </div>
              <div className={styles.mainFeatureContent}>
                <h4>Comunidade Ativa</h4>
                <p>
                  <svg width="16" height="16" viewBox="0 0 512 512" fill="none" style={{verticalAlign: 'middle'}}><path d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z" stroke="#ea4b71" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
                  Faça parte de uma comunidade que colabora e cresce junto.
                </p>
              </div>
              <Link to="/comunidade" className={styles.mainFeatureLink}>
                <IonicIcon name="arrow-forward-outline" size={16} />
              </Link>
            </div>

            <div className={styles.mainFeature}>
              <div className={styles.mainFeatureIcon}>
                <IonicIcon name="grid-outline" size={20} />
              </div>
              <div className={styles.mainFeatureContent}>
                <h4>Catálogo de Workflows</h4>
                <p>
                  <svg width="25" height="25" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
                    <rect x="96" y="64" width="320" height="384" rx="48" stroke="#ea4b71" stroke-width="32" fill="none"/>
                    <rect x="176" y="128" width="160" height="256" rx="32" stroke="#ea4b71" stroke-width="32" fill="none"/>
                  </svg>
                  Templates prontos para resolver seus problemas.
                </p>
              </div>
              <Link to="/catalogo" className={styles.mainFeatureLink}>
                <IonicIcon name="arrow-forward-outline" size={16} />
              </Link>
            </div>

            <div className={styles.mainFeature}>
              <div className={styles.mainFeatureIcon}>
                <IonicIcon name="document-text-outline" size={20} />
              </div>
              <div className={styles.mainFeatureContent}>
                <h4>Release Notes</h4>
                <p>
                  <svg width="16" height="16" viewBox="0 0 512 512" fill="none" style={{verticalAlign: 'middle'}}><path d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16" stroke="#ea4b71" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
                  Fique por dentro das últimas atualizações.
                </p>
              </div>
              <Link to="/release-notes" className={styles.mainFeatureLink}>
                <IonicIcon name="arrow-forward-outline" size={16} />
              </Link>
            </div>
          </div>
          </div>
        </section>

        <section className={styles.communitySection}>
        <div className="container">
          <div className={styles.communityContent}>
            <h2 className={styles.communityTitle}>
              <IonicIcon name="globe-outline" size={32} color="var(--ifm-color-primary)" />
              Ecossistema n8n Brasil
            </h2>
            <p className={styles.communitySubtitle}>A comunidade é o coração do nosso projeto. Participe!</p>
            
            <div className={styles.communityGrid}>
              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <IonicIcon name="logo-github" size={24} />
                  <h3>Repositório GitHub</h3>
                </div>
                <p>Este é um projeto de código aberto. Colabore com código, documentação ou sugestões.</p>
                <a 
                  href="https://github.com/tatyquebralayout/n8n-Doc-pt-BR" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.communityLink}
                >
                  <IonicIcon name="star-outline" size={16} />
                  Dar uma estrela
                </a>
              </div>
              
              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <IonicIcon name="chatbubbles-outline" size={24} />
                  <h3>Discord</h3>
                </div>
                <p>Participe gratuitamente das discussões e tire dúvidas com a comunidade brasileira no Discord.</p>
                <div className={styles.communityLinkDisabled}>
                  <IonicIcon name="time-outline" size={16} />
                  Em breve
                </div>
              </div>

              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <IonicIcon name="logo-youtube" size={24} />
                  <h3>YouTube</h3>
                </div>
                <p>Canal dedicado a esta documentação em português, com conteúdo didático, entrevistas com profissionais da área de automação e estudos de casos reais.</p>
                <div className={styles.communityLinkDisabled}>
                  <IonicIcon name="time-outline" size={16} />
                  Em breve
                </div>
              </div>

              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <IonicIcon name="newspaper-outline" size={24} />
                  <h3>Newsletter</h3>
                </div>
                <p>Receba atualizações sobre n8n, automação e novidades da documentação brasileira através da nossa newsletter na Substack.</p>
                <div className={styles.communityLinkDisabled}>
                  <IonicIcon name="time-outline" size={16} />
                  Em breve
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaGrid}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaIcon}>
                <IonicIcon name="create-outline" size={24} color="var(--ifm-color-primary)" />
              </div>
              <div className={styles.ctaText}>
                <h4>Quer Contribuir?</h4>
                <p>Ajude a construir a melhor documentação para a comunidade brasileira.</p>
              </div>
              <Link to="/contribuir" className="button button--outline button--primary">
                <IonicIcon name="arrow-forward-outline" size={16} />
                Saber mais
              </Link>
            </div>
            <div className={styles.ctaCard}>
              <div className={styles.ctaIcon}>
                <IonicIcon name="chatbubble-ellipses-outline" size={24} color="var(--ifm-color-primary)" />
              </div>
              <div className={styles.ctaText}>
                <h4>Tem uma Dúvida?</h4>
                <p>Abra uma discussão no GitHub para obter ajuda da comunidade.</p>
              </div>
              <a 
                href="https://github.com/tatyquebralayout/n8n-Doc-pt-BR/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="button button--outline button--primary"
              >
                <IonicIcon name="arrow-forward-outline" size={16} />
                Abrir discussão
              </a>
            </div>
          </div>
        </div>
      </section>
      </main>
    </Layout>
  );
} 