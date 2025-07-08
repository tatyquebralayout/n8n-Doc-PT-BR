import React, { Suspense } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import LocalIcon from '@site/src/components/LocalIcon';

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
              <ion-icon name="compass-outline" style={{fontSize: 20, color: '#ea4b71', marginRight: 6, verticalAlign: 'middle'}} />
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>
              <ion-icon name="globe-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} />
              {siteConfig.tagline}
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.getStartedButton}
                to="/intro">
                <ion-icon name="play-circle-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} />
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

              {/* Primeiros Passos */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <ion-icon name="school-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Primeiros Passos</h4>
                  <p>Aprenda os conceitos fundamentais do n8n passo a passo.</p>
                  <ul>
                    <li><Link to="/primeiros-passos/instalacao">Instalação</Link></li>
                    <li><Link to="/primeiros-passos/conceitos-basicos">Conceitos Básicos</Link></li>
                    <li><Link to="/primeiros-passos/primeiro-workflow">Primeiro Workflow</Link></li>
                  </ul>
                </div>
              </div>

              {/* Guias Avançados */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <ion-icon name="bulb-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} />
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
                  <ion-icon name="code-slash-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} />
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
                  <ion-icon name="cloud-upload-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} />
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
                  <ion-icon name="extension-puzzle-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} />
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
                  <ion-icon name="flask-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} />
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

              {/* Recursos Técnicos */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <ion-icon name="library-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Recursos Técnicos</h4>
                  <p>Guias de performance, troubleshooting e referências técnicas.</p>
                  <ul>
                    <li><Link to="/referencia/guias/performance-guide">Guia de Performance</Link></li>
                    <li><Link to="/referencia/guias/troubleshooting">Troubleshooting</Link></li>
                    <li><Link to="/referencia/recursos/glossario">Glossário</Link></li>
                    <li><Link to="/referencia/recursos/apis-brasileiras">APIs Brasileiras</Link></li>
                  </ul>
                </div>
              </div>

              {/* Contribuição para Documentação em Português */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <ion-icon name="heart-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Contribua para a Doc em Português</h4>
                  <p>Ajude a construir a melhor documentação do n8n para a comunidade brasileira.</p>
                  <ul>
                    <li><Link to="/contribuir/esta-documentacao">Contribuir com a Doc</Link></li>
                    <li><Link to="/contribuir/esta-documentacao/entendendo-o-projeto/como-contribuir">Como Contribuir</Link></li>
                    <li><Link to="/contribuir/esta-documentacao/padroes-e-estilo/design-system">Padrões de Design</Link></li>
                    <li><Link to="/contribuir/esta-documentacao/traducao-e-localizacao/guia-traducao">Guia de Tradução</Link></li>
                  </ul>
                </div>
              </div>

              {/* Links Úteis */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <ion-icon name="link-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Links Úteis</h4>
                  <p>Recursos essenciais para acompanhar atualizações e encontrar soluções.</p>
                  <ul>
                    <li><Link to="/release-notes">Release Notes</Link></li>
                    <li><Link to="/catalogo">Catálogo de Workflows</Link></li>
                    <li><Link to="/referencia/historico/changelog">Changelog</Link></li>
                    <li><Link to="/comunidade">Central da Comunidade</Link></li>
                  </ul>
                </div>
              </div>

              {/* Cursos e Aprendizado */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <ion-icon name="school-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Cursos e Aprendizado</h4>
                  <p>Aprenda n8n com cursos estruturados em vídeo e texto.</p>
                  <ul>
                    <li><Link to="/cursos/cursos-em-video/curso-iniciante">Curso Iniciante</Link></li>
                    <li><Link to="/cursos/cursos-em-video/curso-avancado">Curso Avançado</Link></li>
                    <li><Link to="/cursos/cursos-em-texto">Cursos em Texto</Link></li>
                    <li><Link to="/cursos">Todos os Cursos</Link></li>
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
              <ion-icon name="globe-outline" style={{fontSize: 32, color: 'var(--ifm-color-primary)'}} />
              Ecossistema n8n Brasil
            </h2>
            <p className={styles.communitySubtitle}>A comunidade é o coração do nosso projeto. Participe!</p>
            
            <div className={styles.communityGrid}>
              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <ion-icon name="logo-github" style={{fontSize: 24, color: 'var(--ifm-color-primary)'}} />
                  <h3>Repositório GitHub</h3>
                </div>
                <p>Este é um projeto de código aberto. Colabore com código, documentação ou sugestões.</p>
                <a 
                  href="https://github.com/tatyquebralayout/n8n-Doc-pt-BR" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.communityLink}
                >
                  <ion-icon name="star-outline" style={{fontSize: 16, color: 'var(--ifm-color-primary)'}} />
                  Dar uma estrela
                </a>
              </div>
              
              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <ion-icon name="chatbubbles-outline" style={{fontSize: 24, color: 'var(--ifm-color-primary)'}} />
                  <h3>Discord</h3>
                </div>
                <p>Participe gratuitamente das discussões e tire dúvidas com a comunidade brasileira no Discord.</p>
                <div className={styles.communityLinkDisabled}>
                  <ion-icon name="time-outline" style={{fontSize: 16, color: 'var(--ifm-color-primary)'}} />
                  Em breve
                </div>
              </div>

              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <ion-icon name="logo-youtube" style={{fontSize: 24, color: 'var(--ifm-color-primary)'}} />
                  <h3>YouTube</h3>
                </div>
                <p>Canal dedicado a esta documentação em português, com conteúdo didático, entrevistas com profissionais da área de automação e estudos de casos reais.</p>
                <div className={styles.communityLinkDisabled}>
                  <ion-icon name="time-outline" style={{fontSize: 16, color: 'var(--ifm-color-primary)'}} />
                  Em breve
                </div>
              </div>

              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <ion-icon name="newspaper-outline" style={{fontSize: 24, color: 'var(--ifm-color-primary)'}} />
                  <h3>Newsletter</h3>
                </div>
                <p>Receba atualizações sobre n8n, automação e novidades da documentação brasileira através da nossa newsletter na Substack.</p>
                <div className={styles.communityLinkDisabled}>
                  <ion-icon name="time-outline" style={{fontSize: 16, color: 'var(--ifm-color-primary)'}} />
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
                <ion-icon name="extension-puzzle-outline" style={{fontSize: 24, color: 'var(--ifm-color-primary)'}} />
              </div>
              <div className={styles.ctaText}>
                <h4>Quer Criar Seus Próprios Nodes?</h4>
                <p>Tenha mentoria, torne-se expert e desenvolva integrações customizadas para o n8n. Aprenda com a comunidade e construa soluções únicas.</p>
              </div>
              <Link to="/integracoes/criar-nodes" className="button button--outline button--primary">
                <ion-icon name="arrow-forward-outline" style={{fontSize: 16, color: 'var(--ifm-color-primary)'}} />
                Saiba mais
              </Link>
            </div>
            <div className={styles.ctaCard}>
              <div className={styles.ctaIcon}>
                <ion-icon name="chatbubble-ellipses-outline" style={{fontSize: 24, color: 'var(--ifm-color-primary)'}} />
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
                <ion-icon name="arrow-forward-outline" style={{fontSize: 16, color: 'var(--ifm-color-primary)'}} />
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