import React from 'react';
import { useLocation } from '@docusaurus/router';
import DocSidebar from '@theme-original/DocSidebar';
import type { Props } from '@theme/DocSidebar';

export default function DocSidebarWrapper(props: Props): JSX.Element {
  const location = useLocation();
  const isContribuirSection = location.pathname.includes('/contribuir');
  
  if (!isContribuirSection) {
    return <DocSidebar {...props} />;
  }

  // Função para verificar se o link está ativo
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Se estiver na seção contribuir, renderiza o sidebar específico
  return (
    <div className="contribuir-section-only">
      <div className="contribuir-sidebar">
        <div className="contribuir-sidebar-header">
          <h3>Contribuir</h3>
        </div>
        <div className="contribuir-sidebar-content">
          <ul>
            <li><a href="/contribuir" className={isActive('/contribuir') && !location.pathname.includes('/contribuir/') ? 'active' : ''}>Visão Geral</a></li>
            <li>
              <details open={location.pathname.includes('/contribuir/n8n-oficial')}>
                <summary>Contribuir com n8n oficial</summary>
                <ul>
                  <li><a href="/contribuir/n8n-oficial" className={isActive('/contribuir/n8n-oficial') && !location.pathname.includes('/contribuir/n8n-oficial/') ? 'active' : ''}>Visão Geral</a></li>
                  <li><a href="/contribuir/n8n-oficial/contribuir-codigo-e-docs" className={isActive('/contribuir/n8n-oficial/contribuir-codigo-e-docs') ? 'active' : ''}>Contribuir com Código e Docs</a></li>
                  <li><a href="/contribuir/n8n-oficial/contribuir-community" className={isActive('/contribuir/n8n-oficial/contribuir-community') ? 'active' : ''}>Contribuir com a Comunidade</a></li>
                  <li><a href="/contribuir/n8n-oficial/contribuir-modelos" className={isActive('/contribuir/n8n-oficial/contribuir-modelos') ? 'active' : ''}>Contribuir com Modelos</a></li>
                  <li><a href="/contribuir/n8n-oficial/adicionar-casos-uso" className={isActive('/contribuir/n8n-oficial/adicionar-casos-uso') ? 'active' : ''}>Adicionar Casos de Uso</a></li>
                  <li><a href="/contribuir/n8n-oficial/afiliados-e-creators" className={isActive('/contribuir/n8n-oficial/afiliados-e-creators') ? 'active' : ''}>Afiliados e Creators</a></li>
                  <li><a href="/contribuir/n8n-oficial/referral-vagas" className={isActive('/contribuir/n8n-oficial/referral-vagas') ? 'active' : ''}>Vagas de Referência</a></li>
                </ul>
              </details>
            </li>
            <li>
              <details open={location.pathname.includes('/contribuir/esta-documentacao')}>
                <summary>Contribuir com Esta Documentação</summary>
                <ul>
                  <li><a href="/contribuir/esta-documentacao" className={isActive('/contribuir/esta-documentacao') && !location.pathname.includes('/contribuir/esta-documentacao/') ? 'active' : ''}>Visão Geral</a></li>
                  <li>
                    <details open={location.pathname.includes('/contribuir/esta-documentacao/entendendo-o-projeto')}>
                      <summary>01 - Entendendo o Projeto</summary>
                      <ul>
                        <li><a href="/contribuir/esta-documentacao/entendendo-o-projeto/sobre-o-projeto" className={isActive('/contribuir/esta-documentacao/entendendo-o-projeto/sobre-o-projeto') ? 'active' : ''}>Sobre o Projeto</a></li>
                        <li><a href="/contribuir/esta-documentacao/entendendo-o-projeto/como-contribuir" className={isActive('/contribuir/esta-documentacao/entendendo-o-projeto/como-contribuir') ? 'active' : ''}>Como Contribuir</a></li>
                        <li><a href="/contribuir/esta-documentacao/entendendo-o-projeto/codigo-conduta" className={isActive('/contribuir/esta-documentacao/entendendo-o-projeto/codigo-conduta') ? 'active' : ''}>Código de Conduta</a></li>
                        <li><a href="/contribuir/esta-documentacao/entendendo-o-projeto/mentoria" className={isActive('/contribuir/esta-documentacao/entendendo-o-projeto/mentoria') ? 'active' : ''}>Mentoria</a></li>
                        <li><a href="/contribuir/esta-documentacao/entendendo-o-projeto/roadmap" className={isActive('/contribuir/esta-documentacao/entendendo-o-projeto/roadmap') ? 'active' : ''}>Roadmap</a></li>
                        <li><a href="/contribuir/esta-documentacao/entendendo-o-projeto/sistema-overlaps" className={isActive('/contribuir/esta-documentacao/entendendo-o-projeto/sistema-overlaps') ? 'active' : ''}>Sistema Overlaps</a></li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details open={location.pathname.includes('/contribuir/esta-documentacao/primeiros-passos')}>
                      <summary>02 - Primeiros Passos</summary>
                      <ul>
                        <li><a href="/contribuir/esta-documentacao/primeiros-passos" className={isActive('/contribuir/esta-documentacao/primeiros-passos') && !location.pathname.includes('/contribuir/esta-documentacao/primeiros-passos/') ? 'active' : ''}>Visão Geral</a></li>
                        <li><a href="/contribuir/esta-documentacao/primeiros-passos/getting-started" className={isActive('/contribuir/esta-documentacao/primeiros-passos/getting-started') ? 'active' : ''}>Getting Started</a></li>
                        <li><a href="/contribuir/esta-documentacao/primeiros-passos/exemplos-praticos" className={isActive('/contribuir/esta-documentacao/primeiros-passos/exemplos-praticos') ? 'active' : ''}>Exemplos Práticos</a></li>
                        <li><a href="/contribuir/esta-documentacao/primeiros-passos/processo-validacao" className={isActive('/contribuir/esta-documentacao/primeiros-passos/processo-validacao') ? 'active' : ''}>Processo de Validação</a></li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details open={location.pathname.includes('/contribuir/esta-documentacao/padroes-e-estilo')}>
                      <summary>03 - Padrões e Estilo</summary>
                      <ul>
                        <li><a href="/contribuir/esta-documentacao/padroes-e-estilo/intro" className={isActive('/contribuir/esta-documentacao/padroes-e-estilo/intro') ? 'active' : ''}>Introdução</a></li>
                        <li><a href="/contribuir/esta-documentacao/padroes-e-estilo/guia-de-estilo" className={isActive('/contribuir/esta-documentacao/padroes-e-estilo/guia-de-estilo') ? 'active' : ''}>Guia de Estilo</a></li>
                        <li><a href="/contribuir/esta-documentacao/padroes-e-estilo/markdown-features" className={isActive('/contribuir/esta-documentacao/padroes-e-estilo/markdown-features') ? 'active' : ''}>Recursos do Markdown</a></li>
                        <li><a href="/contribuir/esta-documentacao/padroes-e-estilo/design-system" className={isActive('/contribuir/esta-documentacao/padroes-e-estilo/design-system') ? 'active' : ''}>Design System</a></li>
                        <li><a href="/contribuir/esta-documentacao/padroes-e-estilo/paleta-cores" className={isActive('/contribuir/esta-documentacao/padroes-e-estilo/paleta-cores') ? 'active' : ''}>Paleta de Cores</a></li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details open={location.pathname.includes('/contribuir/esta-documentacao/traducao-e-localizacao')}>
                      <summary>04 - Tradução e Localização</summary>
                      <ul>
                        <li><a href="/contribuir/esta-documentacao/traducao-e-localizacao/guia-traducao" className={isActive('/contribuir/esta-documentacao/traducao-e-localizacao/guia-traducao') ? 'active' : ''}>Guia de Tradução</a></li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details open={location.pathname.includes('/contribuir/esta-documentacao/recursos-tecnicos')}>
                      <summary>05 - Recursos Técnicos</summary>
                      <ul>
                        <li><a href="/contribuir/esta-documentacao/recursos-tecnicos/docusaurus-folder" className={isActive('/contribuir/esta-documentacao/recursos-tecnicos/docusaurus-folder') ? 'active' : ''}>Estrutura do Docusaurus</a></li>
                        <li><a href="/contribuir/esta-documentacao/recursos-tecnicos/paleta-cores" className={isActive('/contribuir/esta-documentacao/recursos-tecnicos/paleta-cores') ? 'active' : ''}>Paleta de Cores</a></li>
                        <li><a href="/contribuir/esta-documentacao/recursos-tecnicos/validacao-overlaps" className={isActive('/contribuir/esta-documentacao/recursos-tecnicos/validacao-overlaps') ? 'active' : ''}>Validação Overlaps</a></li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details open={location.pathname.includes('/contribuir/esta-documentacao/suporte-e-duvidas')}>
                      <summary>06 - Suporte e Dúvidas</summary>
                      <ul>
                        <li><a href="/contribuir/esta-documentacao/suporte-e-duvidas/onde-buscar-ajuda" className={isActive('/contribuir/esta-documentacao/suporte-e-duvidas/onde-buscar-ajuda') ? 'active' : ''}>Onde Buscar Ajuda</a></li>
                      </ul>
                    </details>
                  </li>
                  <li><a href="/contribuir/esta-documentacao/guidelines" className={isActive('/contribuir/esta-documentacao/guidelines') ? 'active' : ''}>Diretrizes</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}