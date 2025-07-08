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

              {/* Tutorial Básico */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="school-outline" size={20} />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Tutorial Básico</h4>
                  <p>Aprenda os conceitos fundamentais do n8n passo a passo.</p>
                  <ul>
                    <li><Link to="/tutorial-basico/instalacao">Instalação</Link></li>
                    <li><Link to="/tutorial-basico/conceitos-basicos">Conceitos Básicos</Link></li>
                    <li><Link to="/tutorial-basico/primeiro-workflow">Primeiro Workflow</Link></li>
                  </ul>
                </div>
              </div>

              {/* Guias Avançados */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="bulb-outline" size={20} />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Guias Avançados</h4>
                  <p>Explore recursos avançados e casos de uso complexos.</p>
                  <ul>
                    <li><Link to="/usando-n8n">Usando n8n</Link></li>
                    <li><Link to="/logica-e-dados">Lógica e Dados</Link></li>
                    <li><Link to="/advanced-ai">IA Avançada</Link></li>
                    <li><Link to="/embed">Embed</Link></li>
                  </ul>
                </div>
              </div>

              {/* Referência da API */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="code-slash-outline" size={20} />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Referência da API</h4>
                  <p>Documentação completa da API REST do n8n.</p>
                  <ul>
                    <li><Link to="/api">API</Link></li>
                    <li><Link to="/api/conceitos">Conceitos</Link></li>
                    <li><Link to="/api/ferramentas">Ferramentas</Link></li>
                    <li><Link to="/api/referencia">Referência</Link></li>
                  </ul>
                </div>
              </div>

              {/* Deployment */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="cloud-upload-outline" size={20} />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Deployment</h4>
                  <p>Guias para implantação em diferentes ambientes.</p>
                  <ul>
                    <li><Link to="/hosting-n8n/instalacao">Instalação</Link></li>
                    <li><Link to="/hosting-n8n/configuracao">Configuração</Link></li>
                    <li><Link to="/hosting-n8n/seguranca">Segurança</Link></li>
                    <li><Link to="/hosting-n8n/escalonamento">Escalonamento</Link></li>
                  </ul>
                </div>
              </div>

              {/* Nós (Nodes) */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="extension-puzzle-outline" size={20} />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Nós (Nodes)</h4>
                  <p>Documentação detalhada de todos os nós disponíveis.</p>
                  <ul>
                    <li><Link to="/integracoes">Integrações</Link></li>
                    <li><Link to="/integracoes-br">Integrações Brasileiras</Link></li>
                  </ul>
                </div>
              </div>

              {/* Exemplos */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="flask-outline" size={20} />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Exemplos</h4>
                  <p>Workflows práticos e casos de uso reais.</p>
                  <ul>
                    <li><Link to="/comunidade">Comunidade</Link></li>
                    <li><Link to="/cursos">Cursos</Link></li>
                    <li><Link to="/referencia">Referência</Link></li>
                  </ul>
                </div>
              </div>

              {/* Recursos Adicionais */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="book-outline" size={20} />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Recursos Adicionais</h4>
                  <p>Links úteis para contribuir, releases e catálogo.</p>
                  <ul>
                    <li><Link to="/contribuir">Como Contribuir</Link></li>
                    <li><Link to="/release-notes">Release Notes</Link></li>
                    <li><Link to="/catalogo">Catálogo</Link></li>
                  </ul>
                </div>
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