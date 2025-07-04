import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import IonicIcon from '@site/src/components/IonicIcon';

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
              <IonicIcon name="rocket-outline" size={32} color="#fff" style={{marginRight: '12px'}} />
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">
              <IonicIcon name="globe-outline" size={20} color="#fff" style={{marginRight: '8px'}} />
              {siteConfig.tagline}
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/intro">
                <IonicIcon name="play-circle-outline" size={18} color="#ea4b71" style={{marginRight: '8px'}} />
                Comece a Explorar - 5min
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
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>
                <IonicIcon name="git-network-outline" size={20} color="#ea4b71" style={{marginRight: '8px'}} />
                Criar e Usar Workflows
              </h3>
              <p className={styles.featureDescription}>
                <IonicIcon name="bulb-outline" size={16} color="#6b7280" style={{marginRight: '6px'}} />
                Aprenda a criar workflows poderosos com interface visual intuitiva. 
                Conecte aplicações, transforme dados e automatize processos complexos.
              </p>
              <Link to="/tutorial-basico/instalacao" className={styles.featureLink}>
                <IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" style={{marginRight: '6px'}} />
                Começar tutorial →
              </Link>
            </div>
          </div>

          {/* Card: Deployment */}
          <div className={styles.featureCard}>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>
                <IonicIcon name="server-outline" size={20} color="#ea4b71" style={{marginRight: '8px'}} />
                Deployment
              </h3>
              <p className={styles.featureDescription}>
                <IonicIcon name="cloud-outline" size={16} color="#6b7280" style={{marginRight: '6px'}} />
                Guias completos para implantar n8n em produção. 
                Suporte para Docker, Kubernetes, AWS, Azure e muito mais.
              </p>
              <Link to="/hosting-n8n/instalacao" className={styles.featureLink}>
                <IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" style={{marginRight: '6px'}} />
                Ver guias de deploy →
              </Link>
            </div>
          </div>

          {/* Card: Nodes e Integrações */}
          <div className={styles.featureCard}>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>
                <IonicIcon name="extension-puzzle-outline" size={20} color="#ea4b71" style={{marginRight: '8px'}} />
                Nodes e Integrações
              </h3>
              <p className={styles.featureDescription}>
                <IonicIcon name="apps-outline" size={16} color="#6b7280" style={{marginRight: '6px'}} />
                Descubra os blocos de construção do n8n: Core nodes, integrações com apps,
                triggers, credenciais e nodes da comunidade.
              </p>
              <Link to="/integracoes/overview" className={styles.featureLink}>
                <IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" style={{marginRight: '6px'}} />
                Explorar nodes →
              </Link>
            </div>
          </div>

          {/* Card: Comunidade */}
          <div className={styles.featureCard}>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>
                <IonicIcon name="people-outline" size={20} color="#ea4b71" style={{marginRight: '8px'}} />
                Comunidade n8n Brasil
              </h3>
              <p className={styles.featureDescription}>
                <IonicIcon name="heart-outline" size={16} color="#6b7280" style={{marginRight: '6px'}} />
                Conecte-se com outros usuários brasileiros, tire dúvidas, compartilhe experiências
                e contribua para o crescimento da automação no Brasil.
              </p>
              <Link to="/comunidade" className={styles.featureLink}>
                <IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" style={{marginRight: '6px'}} />
                Participar da comunidade →
              </Link>
            </div>
          </div>

          {/* Card: Catálogo */}
          <div className={styles.featureCard}>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>
                <IonicIcon name="grid-outline" size={20} color="#ea4b71" style={{marginRight: '8px'}} />
                Catálogo de Workflows
              </h3>
              <p className={styles.featureDescription}>
                <IonicIcon name="library-outline" size={16} color="#6b7280" style={{marginRight: '6px'}} />
                Explore nossa coleção de workflows prontos para usar. Templates
                testados e documentados para acelerar sua automação.
              </p>
              <Link to="/catalogo" className={styles.featureLink}>
                <IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" style={{marginRight: '6px'}} />
                Explorar catálogo →
              </Link>
            </div>
          </div>

          {/* Card: Release Notes */}
          <div className={styles.featureCard}>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>
                <IonicIcon name="document-text-outline" size={20} color="#ea4b71" style={{marginRight: '8px'}} />
                Release Notes
              </h3>
              <p className={styles.featureDescription}>
                <IonicIcon name="notifications-outline" size={16} color="#6b7280" style={{marginRight: '6px'}} />
                Mantenha-se atualizado com as últimas funcionalidades, 
                melhorias e correções de bugs do n8n.
              </p>
              <Link to="/release-notes" className={styles.featureLink}>
                <IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" style={{marginRight: '6px'}} />
                Ver atualizações →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className={styles.communitySection}>
      <div className="container">
        <div className={styles.communityContent}>
          <h2 className={styles.communityTitle}>
            <IonicIcon name="globe-outline" size={28} color="#ea4b71" style={{marginRight: '12px'}} />
            Ecossistema n8n Brasil
          </h2>
          <p className={styles.communityDescription}>
            Estamos construindo um ecossistema robusto ao redor do n8n no Brasil. Esta documentação é o ponto de partida
            de uma iniciativa que visa criar uma comunidade técnica forte, conectar profissionais, e acelerar a adoção
            de automação no mercado brasileiro através de conteúdo, discussões e colaboração.
          </p>
          
          <div className={styles.communityGrid}>
            {/* GitHub Repository */}
            <div className={styles.communityCard}>
              <div className={styles.communityCardHeader}>
                <IonicIcon name="logo-github" size={24} color="#ea4b71" />
                <h3>Repositório GitHub</h3>
              </div>
              <p>Dê uma estrela no nosso repositório e contribua com o projeto!</p>
              <a 
                href="https://github.com/tatyquebralayout/n8n-Doc-pt-BR" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.communityLink}
              >
                <IonicIcon name="star-outline" size={16} color="#ea4b71" style={{marginRight: '6px'}} />
                Dar uma estrela ⭐
              </a>
            </div>

            {/* Discord */}
            <div className={styles.communityCard}>
              <div className={styles.communityCardHeader}>
                <IonicIcon name="chatbubbles-outline" size={24} color="#ea4b71" />
                <h3>Discord</h3>
              </div>
              <p>Participe gratuitamente das discussões e tire dúvidas com a comunidade brasileira no Discord.</p>
              <div className={styles.communityLinkDisabled}>
                <IonicIcon name="time-outline" size={16} color="#6b7280" style={{marginRight: '6px'}} />
                Em breve
              </div>
            </div>

            {/* YouTube */}
            <div className={styles.communityCard}>
              <div className={styles.communityCardHeader}>
                <IonicIcon name="logo-youtube" size={24} color="#ea4b71" />
                <h3>YouTube</h3>
              </div>
              <p>Canal dedicado a esta documentação em português, com conteúdo didático, entrevistas com profissionais da área de automação e estudos de casos reais.</p>
              <div className={styles.communityLinkDisabled}>
                <IonicIcon name="time-outline" size={16} color="#6b7280" style={{marginRight: '6px'}} />
                Em breve
              </div>
            </div>

            {/* Newsletter Substack */}
            <div className={styles.communityCard}>
              <div className={styles.communityCardHeader}>
                <IonicIcon name="newspaper-outline" size={24} color="#ea4b71" />
                <h3>Newsletter</h3>
              </div>
              <p>Receba atualizações sobre n8n, automação e novidades da documentação brasileira através da nossa newsletter na Substack.</p>
              <div className={styles.communityLinkDisabled}>
                <IonicIcon name="time-outline" size={16} color="#6b7280" style={{marginRight: '6px'}} />
                Em breve
              </div>
            </div>

            {/* Artigos da Comunidade */}
            <div className={styles.communityCard}>
              <div className={styles.communityCardHeader}>
                <IonicIcon name="create-outline" size={24} color="#ea4b71" />
                <h3>Escreva para a Comunidade</h3>
              </div>
              <p>Você é um creator n8n? Submeta seus links de divulgação para ter maior alcance na comunidade brasileira de automação.</p>
              <Link 
                to="/comunidade/artigos" 
                className={styles.communityLink}
              >
                <IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" style={{marginRight: '6px'}} />
                Divulgue seu conteúdo →
              </Link>
            </div>

            {/* Discussões GitHub */}
            <div className={styles.communityCard}>
              <div className={styles.communityCardHeader}>
                <IonicIcon name="chatbubble-ellipses-outline" size={24} color="#ea4b71" />
                <h3>Discussões Técnicas</h3>
              </div>
              <p>Participe de discussões técnicas no GitHub da Doc Brasil. Construa um ambiente que fortaleça tecnicamente nossa comunidade brasileira de automação.</p>
              <a 
                href="https://github.com/tatyquebralayout/n8n-Doc-pt-BR/discussions/1" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.communityLink}
              >
                <IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" style={{marginRight: '6px'}} />
                Participar das discussões →
              </a>
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
        <CommunitySection />
      </main>
    </Layout>
  );
} 