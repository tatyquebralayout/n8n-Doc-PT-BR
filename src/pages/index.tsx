import React, { Suspense, useState, useEffect } from 'react';
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
            <Heading as="h1" className={styles.heroTitle}>
              <IonicIcon name="compass-outline" size={20} color="#ea4b71" />
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>
              <IonicIcon name="globe-outline" size={20} color="var(--ifm-color-primary)" />
              {siteConfig.tagline}
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.getStartedButton}
                to="/intro">
                <IonicIcon name="play-circle-outline" size={20} color="var(--ifm-color-primary)" />
                Comece a Explorar - 5min
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function DocumentationProgress() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  // Metas da documentação
  const totalGoals = 35;
  const completedGoals = 22;
  const progressPercentage = Math.round((completedGoals / totalGoals) * 100);
  
  // Agrupamento por categorias
  const categories = {
    "Fundamentos": [
      { name: "Primeiros Passos", status: "Completo" },
      { name: "Conceitos Básicos", status: "Completo" },
      { name: "Instalação", status: "Completo" },
      { name: "Primeiro Workflow", status: "Completo" },
      { name: "Conectar Aplicações", status: "Completo" },
      { name: "FAQ", status: "Completo" },
    ],
    "Usando n8n": [
      { name: "Interface", status: "Em progresso" },
      { name: "Workflows", status: "Completo" },
      { name: "Credenciais", status: "Em progresso" },
      { name: "Execuções", status: "Em progresso" },
      { name: "Monitoramento", status: "Em progresso" },
      { name: "Usuários e Permissões", status: "Em progresso" },
    ],
    "Lógica e Dados": [
      { name: "Flow Logic", status: "Em progresso" },
      { name: "Data Processing", status: "Em progresso" },
      { name: "Expressões", status: "Completo" },
      { name: "Conexões", status: "Completo" },
      { name: "Execução", status: "Completo" },
    ],
    "Integrações": [
      { name: "Built-in Nodes", status: "Em progresso" },
      { name: "App Nodes", status: "Em progresso" },
      { name: "Trigger Nodes", status: "Em progresso" },
      { name: "Community Nodes", status: "Em progresso" },
      { name: "Criar Nodes", status: "Em progresso" },
      { name: "Templates", status: "Completo" },
    ],
    "Integrações BR": [
      { name: "Financeiro", status: "Em progresso" },
      { name: "Governo", status: "Em progresso" },
      { name: "Localização", status: "Em progresso" },
    ],
    "Hosting e Deployment": [
      { name: "Instalação", status: "Completo" },
      { name: "Configuração", status: "Em progresso" },
      { name: "Segurança", status: "Em progresso" },
      { name: "Escalonamento", status: "Completo" },
      { name: "Compliance", status: "Em progresso" },
    ],
    "Advanced AI": [
      { name: "Overview", status: "Em progresso" },
      { name: "Nodes", status: "Em progresso" },
      { name: "Exemplos", status: "Em progresso" },
      { name: "Tutorial", status: "Em progresso" },
    ],
    "Embed": [
      { name: "Preparação", status: "Completo" },
      { name: "Implementação", status: "Completo" },
      { name: "Gerenciamento", status: "Completo" },
    ],
    "API": [
      { name: "Conceitos", status: "Em progresso" },
      { name: "Ferramentas", status: "Em progresso" },
      { name: "Referência", status: "Em progresso" },
    ],
    "Cursos": [
      { name: "Vídeo", status: "Em progresso" },
      { name: "Texto", status: "Em progresso" },
    ],
    "Comunidade": [
      { name: "Central", status: "Completo" },
      { name: "Estatísticas", status: "Completo" },
      { name: "Casos de Uso", status: "Em progresso" },
      { name: "Vídeos", status: "Em progresso" },
    ],
    "Contribuir": [
      { name: "Esta Documentação", status: "Completo" },
      { name: "n8n Oficial", status: "Completo" },
    ],
    "Referência": [
      { name: "Guias", status: "Em progresso" },
      { name: "Recursos", status: "Em progresso" },
      { name: "Histórico", status: "Em progresso" },
    ],
    "Catálogo": [
      { name: "Workflows", status: "Em progresso" },
      { name: "Serviços BR", status: "Completo" },
      { name: "IA e ML", status: "Completo" },
    ],
    "Release Notes": [
      { name: "n8n Oficial", status: "Em progresso" },
      { name: "Nossa Doc", status: "Em progresso" },
    ],
  };

  // Mapeamento de ícones para cada categoria
  const categoryIcons = {
    "Fundamentos": "rocket-outline",
    "Usando n8n": "settings-outline",
    "Lógica e Dados": "analytics-outline",
    "Integrações": "extension-puzzle-outline",
    "Integrações BR": "flag-outline",
    "Hosting e Deployment": "cloud-upload-outline",
    "Advanced AI": "flash-outline",
    "Embed": "link-outline",
    "API": "code-slash-outline",
    "Cursos": "school-outline",
    "Comunidade": "people-outline",
    "Contribuir": "heart-outline",
    "Referência": "library-outline",
    "Catálogo": "list-outline",
    "Release Notes": "document-text-outline",
  };

  // Animar progresso quando componente montar
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  // Calcular progresso por categoria
  const getCategoryProgress = (items) => {
    const completed = items.filter(item => item.status === "Completo").length;
    return Math.round((completed / items.length) * 100);
  };

  return (
    <section className={styles.progressSection}>
      <div className="container">
        <div className={styles.progressCard}>
          <div className={styles.progressHeader}>
            <IonicIcon name="trophy-outline" size={20} color="#ea4b71" />
            <h2>Progresso da Documentação</h2>
            <div className={styles.progressStats}>
              <span className={styles.progressPercentage}>{animatedProgress}%</span>
              <span className={styles.progressText}>
                {completedGoals} de {totalGoals} metas
              </span>
            </div>
            <button 
              className={styles.expandButton}
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              <IonicIcon 
                name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"} 
                size={16} 
                color="#ea4b71" 
              />
              <span>{isExpanded ? "Ocultar detalhes" : "Ver detalhes"}</span>
            </button>
          </div>
          
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${animatedProgress}%` }}
            ></div>
          </div>

          {isExpanded && (
            <div className={styles.progressDetails}>
              <div className={styles.categoriesGrid}>
                {Object.entries(categories).map(([categoryName, items]) => {
                  const isComplete = getCategoryProgress(items) === 100;
                  return (
                    <div 
                      key={categoryName} 
                      className={`${styles.categoryCard} ${isComplete ? styles.complete : ''}`}
                    >
                      <div className={styles.categoryHeader}>
                        <h3 className={`${styles.categoryTitle} ${isComplete ? styles.complete : ''}`}>
                          <IonicIcon 
                            name={categoryIcons[categoryName]} 
                            size={18} 
                            color={isComplete ? "#28a745" : "#ea4b71"} 
                          />
                          {categoryName}
                        </h3>
                        <div className={styles.categoryProgress}>
                          <span className={`${styles.categoryPercentage} ${isComplete ? styles.complete : ''}`}>
                            {getCategoryProgress(items)}%
                          </span>
                          <div className={styles.categoryBar}>
                            <div 
                              className={`${styles.categoryFill} ${isComplete ? styles.complete : ''}`}
                              style={{ width: `${getCategoryProgress(items)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <ul className={styles.categoryList}>
                        {items.map((item, index) => (
                          <li key={index} className={styles.categoryItem}>
                            <span className={styles.itemName}>{item.name}</span>
                            <span className={styles.itemStatus}>
                              {item.status === "Completo" ? (
                                <IonicIcon name="checkmark-outline" size={12} color="#28a745" />
                              ) : item.status === "Em progresso" ? (
                                <IonicIcon name="refresh-outline" size={12} color="#ffc107" />
                              ) : (
                                <IonicIcon name="time-outline" size={12} color="#6c757d" />
                              )}
                              {item.status}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <div className={styles.progressFooter}>
                <p>
                  <IonicIcon name="heart-outline" size={14} color="#ea4b71" />
                  Ajude-nos a completar a documentação! 
                  <Link to="/contribuir/esta-documentacao" className={styles.contributeLink}>
                    Saiba como contribuir
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactElement {
  return (
    <Layout
      title={`Página Inicial`}
      description="Documentação completa do n8n em português brasileiro - Hub de conhecimento para a comunidade brasileira de automação.">
      <HomepageHeader />
      <DocumentationProgress />
      <main>
        
        <section className={styles.mainFeatures}>
          <div className="container">
            <div className={styles.mainFeaturesGrid}>

              {/* Primeiros Passos */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="school-outline" size={20} color="var(--ifm-color-primary)" />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Primeiros Passos</h4>
                  <p>Aprenda os conceitos fundamentais do n8n passo a passo.</p>
                  <ul>
                    <li><Link to="/primeiros-passos/guia-instalacao">Instalação</Link></li>
                    <li><Link to="/primeiros-passos/conceitos-basicos">Conceitos Básicos</Link></li>
                    <li><Link to="/primeiros-passos/primeiro-workflow">Primeiro Workflow</Link></li>
                  </ul>
                </div>
              </div>

              {/* Guias Avançados */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="bulb-outline" size={20} color="var(--ifm-color-primary)" />
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
                  <IonicIcon name="code-slash-outline" size={20} color="var(--ifm-color-primary)" />
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
                  <IonicIcon name="cloud-upload-outline" size={20} color="var(--ifm-color-primary)" />
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
                  <IonicIcon name="extension-puzzle-outline" size={20} color="var(--ifm-color-primary)" />
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
                  <IonicIcon name="flask-outline" size={20} color="var(--ifm-color-primary)" />
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
                  <IonicIcon name="library-outline" size={20} color="var(--ifm-color-primary)" />
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
                  <IonicIcon name="heart-outline" size={20} color="var(--ifm-color-primary)" />
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
                  <IonicIcon name="link-outline" size={20} color="var(--ifm-color-primary)" />
                </div>
                <div className={styles.mainFeatureContent}>
                  <h4>Links Úteis</h4>
                  <p>Recursos essenciais para acompanhar atualizações e encontrar soluções.</p>
                  <ul>
                    <li><Link to="/referencia/historico/changelog">Changelog</Link></li>
                    <li><Link to="/catalogo">Catálogo de Workflows</Link></li>
                    <li><Link to="/comunidade">Central da Comunidade</Link></li>
                    <li><Link to="/contribuir">Como Contribuir</Link></li>
                  </ul>
                </div>
              </div>

              {/* Cursos e Aprendizado */}
              <div className={styles.mainFeature}>
                <div className={styles.mainFeatureIcon}>
                  <IonicIcon name="school-outline" size={20} color="var(--ifm-color-primary)" />
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
              <IonicIcon name="globe-outline" size={32} color="var(--ifm-color-primary)" />
              Ecossistema n8n Brasil
            </h2>
            <p className={styles.communitySubtitle}>A comunidade é o coração do nosso projeto. Participe!</p>
            
            <div className={styles.communityGrid}>
              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <IonicIcon name="logo-github" size={24} color="var(--ifm-color-primary)" />
                  <h3>Repositório GitHub</h3>
                </div>
                <p>Este é um projeto de código aberto. Colabore com código, documentação ou sugestões.</p>
                <a 
                  href="https://github.com/tatyquebralayout/n8n-Doc-pt-BR" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.communityLink}
                >
                  <IonicIcon name="star-outline" size={16} color="var(--ifm-color-primary)" />
                  Dar uma estrela
                </a>
              </div>
              
              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <IonicIcon name="chatbubbles-outline" size={24} color="var(--ifm-color-primary)" />
                  <h3>Discord</h3>
                </div>
                <p>Participe gratuitamente das discussões e tire dúvidas com a comunidade brasileira no Discord.</p>
                <div className={styles.communityLinkDisabled}>
                  <IonicIcon name="time-outline" size={16} color="var(--ifm-color-primary)" />
                  Em breve
                </div>
              </div>

              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <IonicIcon name="logo-youtube" size={24} color="var(--ifm-color-primary)" />
                  <h3>YouTube</h3>
                </div>
                <p>Canal dedicado a esta documentação em português, com conteúdo didático, entrevistas com profissionais da área de automação e estudos de casos reais.</p>
                <div className={styles.communityLinkDisabled}>
                  <IonicIcon name="time-outline" size={16} color="var(--ifm-color-primary)" />
                  Em breve
                </div>
              </div>

              <div className={styles.communityCard}>
                <div className={styles.communityCardHeader}>
                  <IonicIcon name="newspaper-outline" size={24} color="var(--ifm-color-primary)" />
                  <h3>Newsletter</h3>
                </div>
                <p>Receba atualizações sobre n8n, automação e novidades da documentação brasileira através da nossa newsletter na Substack.</p>
                <div className={styles.communityLinkDisabled}>
                  <IonicIcon name="time-outline" size={16} color="var(--ifm-color-primary)" />
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
                <IonicIcon name="extension-puzzle-outline" size={24} color="var(--ifm-color-primary)" />
              </div>
              <div className={styles.ctaText}>
                <h4>Quer Criar Seus Próprios Nodes?</h4>
                <p>Tenha mentoria, torne-se expert e desenvolva integrações customizadas para o n8n. Aprenda com a comunidade e construa soluções únicas.</p>
              </div>
              <Link to="/integracoes/criar-nodes" className="button button--outline button--primary">
                <IonicIcon name="arrow-forward-outline" size={16} color="var(--ifm-color-primary)" />
                Saiba mais
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
                <IonicIcon name="arrow-forward-outline" size={16} color="var(--ifm-color-primary)" />
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