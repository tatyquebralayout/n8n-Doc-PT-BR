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
              <IonicIcon name="rocket-outline" size={32} />
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>
              <IonicIcon name="globe-outline" size={20} />
              {siteConfig.tagline}
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/intro">
                <IonicIcon name="play-circle-outline" size={18} />
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
                  <IonicIcon name="bulb-outline" size={16} />
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
                  <IonicIcon name="cloud-outline" size={16} />
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
                  <IonicIcon name="apps-outline" size={16} />
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
                  <IonicIcon name="heart-outline" size={16} />
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
                  <IonicIcon name="library-outline" size={16} />
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
                  <IonicIcon name="notifications-outline" size={16} />
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
              <IonicIcon name="globe-outline" size={28} />
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
                  Dar uma estrela ⭐
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
                <IonicIcon name="create-outline" size={24} />
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
                <IonicIcon name="chatbubble-ellipses-outline" size={24} />
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