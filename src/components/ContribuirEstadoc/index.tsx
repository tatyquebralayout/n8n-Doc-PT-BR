import React from 'react';
import IonicIcon from '@site/src/components/IonicIcon';

export default function ContribuirEstadoc() {
  return (
    <div>
      <div className="admonition admonition-info">
        <div className="admonition-heading">
          <h5><IonicIcon name="shield-checkmark-outline" style={{ fontSize: '18px', color: '#17a2b8' }} /> Esta página da documentação foi validada tecnicamente e didaticamente.</h5>
        </div>
      </div>
      <p>Contribuir com esta documentação é uma forma de compartilhar conhecimento, apoiar outras pessoas da comunidade e fortalecer o ecossistema do n8n no Brasil.</p>
      <p>Este guia oferece uma visão geral das possibilidades de colaboração, com caminhos acessíveis para diferentes níveis de familiaridade técnica.</p>
      <hr />
      <h2><IonicIcon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><IonicIcon name="layers-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Como esta seção está organizada</span></h2>
      <p>A documentação está dividida em tópicos temáticos para facilitar a navegação:</p>
      <h3><strong>01. Entendendo o Projeto</strong></h3>
      <ul>
        <li><a href="./entendendo-o-projeto/sobre-o-projeto">Sobre o Projeto</a></li>
        <li><a href="./entendendo-o-projeto/como-contribuir">Como Contribuir</a></li>
        <li><a href="./entendendo-o-projeto/codigo-conduta">Código de Conduta</a></li>
      </ul>
      <h3><strong>02. Primeiros Passos</strong></h3>
      <ul>
        <li><a href="./primeiros-passos/getting-started">Getting Started</a></li>
      </ul>
      <h3><strong>03. Padrões e Estilo</strong></h3>
      <ul>
        <li><a href="./padroes-e-estilo/guia-de-estilo">Diretrizes para Contribuir</a></li>
        <li><a href="./padroes-e-estilo/markdown-features">Recursos do Markdown</a></li>
        <li><a href="./padroes-e-estilo/design-system">Design System</a></li>
      </ul>
      <h3><strong>04. Tradução e Localização</strong></h3>
      <ul>
        <li><a href="./traducao-e-localizacao/guia-traducao">Guia de Tradução</a></li>
      </ul>
      <h3><strong>05. Recursos Técnicos</strong></h3>
      <ul>
        <li><a href="./recursos-tecnicos/docusaurus-folder">Entendendo o diretório .docusaurus</a></li>
        <li><a href="./recursos-tecnicos/paleta-cores">Paleta de Cores</a></li>
      </ul>
      <h3><strong>06. Suporte e Dúvidas</strong></h3>
      <ul>
        <li><a href="./suporte-e-duvidas/onde-buscar-ajuda">Onde Buscar Ajuda</a></li>
      </ul>
      <hr />
      <h2><IonicIcon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><IonicIcon name="walk-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Comece por aqui</span></h2>
      <p>Se você está começando agora, siga esta sugestão de percurso:</p>
      <ol>
        <li>Leia o <a href="./entendendo-o-projeto/sobre-o-projeto">Sobre o Projeto</a> para entender o propósito</li>
        <li>Acesse o <a href="./primeiros-passos/getting-started">Getting Started</a> para preparar seu ambiente ou contribuir via GitHub Web</li>
        <li>Consulte as <a href="./padroes-e-estilo/guia-de-estilo">Diretrizes</a> antes de escrever ou revisar conteúdos</li>
      </ol>
      <hr />
      <h2><IonicIcon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><IonicIcon name="checkmark-done-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Antes de enviar sua contribuição</span></h2>
      <p>Confira este checklist rápido:</p>
      <ul>
        <li>[ ] O conteúdo está claro, direto e sem erros de gramática?</li>
        <li>[ ] Os exemplos são práticos e refletem contextos reais?</li>
        <li>[ ] Foi seguido o padrão de formatação com frontmatter e Markdown correto?</li>
        <li>[ ] Os links e componentes utilizados funcionam normalmente?</li>
      </ul>
      <hr />
      <h2><IonicIcon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><IonicIcon name="rocket-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Seu impacto</span></h2>
      <p>Cada melhoria que você faz — seja uma correção ortográfica ou um novo tutorial — ajuda outras pessoas a aprenderem com mais confiança. Esta documentação é feita em comunidade, com múltiplas vozes, experiências e realidades.</p>
      <p>Se tiver dúvidas, o canal de suporte está à disposição. A sua contribuição começa com um primeiro passo simples.</p>
      <hr />
      <blockquote>
        <p><span style={{fontSize: '18px', fontWeight: 'bold'}}><strong>Obrigado por fazer parte deste projeto. Vamos construir juntos uma documentação técnica acessível, confiável e plural.</strong></span></p>
      </blockquote>
    </div>
  );
}
