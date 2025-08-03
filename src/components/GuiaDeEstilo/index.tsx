import React from 'react';
import IonicIcon from '@site/src/components/IonicIcon';

export default function GuiaDeEstilo() {
  return (
    <div>
      <p>Este guia estabelece os padrões de estilo para manter a consistência e qualidade da documentação do n8n Brasil.</p>
      <h2><IonicIcon name="document-text-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Princípios Fundamentais</h2>
      <h3>🎯 Clareza</h3>
      <ul>
        <li>Use linguagem simples e direta</li>
        <li>Evite jargões desnecessários</li>
        <li>Prefira frases curtas e objetivas</li>
      </ul>
      <h3>🌍 Contexto Brasileiro</h3>
      <ul>
        <li>Use exemplos locais quando relevante</li>
        <li>Considere a realidade das empresas brasileiras</li>
        <li>Adapte referências para o contexto nacional</li>
      </ul>
      <h3>📚 Acessibilidade</h3>
      <ul>
        <li>Escreva para diferentes níveis de conhecimento</li>
        <li>Forneça explicações quando necessário</li>
        <li>Use estrutura hierárquica clara</li>
      </ul>
      <h2><IonicIcon name="code-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Padrões de Escrita</h2>
      <h3>Frontmatter Padrão</h3>
      <p>Todos os arquivos devem seguir este padrão de frontmatter:</p>
      <pre><code className="language-yaml">
        ---
        title: Título da Página
        description: Descrição clara e concisa
        keywords: [n8n, palavra-chave1, palavra-chave2]
        sidebar_position: 1
        ---
      </code></pre>
      <h3>Estrutura de Títulos</h3>
      <pre><code className="language-markdown">
        # Título Principal (H1) - Apenas um por página
        ## Seção Principal (H2)
        ### Subseção (H3)
        #### Detalhes (H4) - Use com moderação
      </code></pre>
      <h3>Uso de Ícones</h3>
      <p>Use ícones Ionicons de forma consistente:</p>
      <pre><code className="language-mdx">
        # &lt;ion-icon name="document-outline" style={'{'}{'{'} fontSize: '32px', color: '#ea4b71' {'}'}{'}'}&gt;&lt;/ion-icon&gt; Título Principal
        ## &lt;ion-icon name="settings-outline" style={'{'}{'{'} fontSize: '24px', color: '#ea4b71' {'}'}{'}'}&gt;&lt;/ion-icon&gt; Seção
      </code></pre>
      <h2><IonicIcon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Exemplos de Código</h2>
      <h3>Blocos de Código</h3>
      <p>Sempre especifique a linguagem:</p>
      <pre><code className="language-javascript" title="exemplo.js">
        // Exemplo correto de código JavaScript
        const n8n = require('n8n');

        // Sempre use comentários explicativos
        function criarWorkflow() {'{'}
          const workflow = {'{'}
            nodes: [
              {'{'}
                name: 'Start',
                type: 'n8n-nodes-base.start',
                position: [250, 300]
              {'}'}
            ]
          {'}'};
          return workflow;
        {'}'}
      </code></pre>
      <h3>Código Inline</h3>
      <p>Use <code>código inline</code> para:</p>
      <ul>
        <li>Nomes de arquivos: <code>package.json</code></li>
        <li>Comandos: <code>npm install</code></li>
        <li>Variáveis: <code>API_KEY</code></li>
        <li>Valores específicos: <code>true</code>, <code>false</code></li>
      </ul>
      <h2><IonicIcon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Admonitions</h2>
      <p>Use admonitions para destacar informações importantes:</p>
      <div className="admonition admonition-tip">
          <div className="admonition-heading">
              <h5>Dica</h5>
          </div>
          <div className="admonition-content">
              <p>Use tips para sugestões úteis e melhores práticas.</p>
          </div>
      </div>
      <div className="admonition admonition-warning">
          <div className="admonition-heading">
              <h5>Atenção</h5>
          </div>
          <div className="admonition-content">
              <p>Use warnings para alertar sobre possíveis problemas.</p>
          </div>
      </div>
      <div className="admonition admonition-danger">
          <div className="admonition-heading">
              <h5>Cuidado</h5>
          </div>
          <div className="admonition-content">
              <p>Use danger para avisos críticos e problemas graves.</p>
          </div>
      </div>
      <div className="admonition admonition-info">
          <div className="admonition-heading">
              <h5>Informação</h5>
          </div>
          <div className="admonition-content">
              <p>Use info para informações complementares.</p>
          </div>
      </div>
    </div>
  );
}
