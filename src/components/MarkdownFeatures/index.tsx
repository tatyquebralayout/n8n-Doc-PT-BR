import React from 'react';
import IonicIcon from '@site/src/components/IonicIcon';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function MarkdownFeatures() {
  return (
    <div>
      <p>Esta página demonstra as funcionalidades avançadas do Markdown/MDX disponíveis na documentação do n8n Brasil.</p>
      <h2><IonicIcon name="code-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Blocos de Código</h2>
      <h3><IonicIcon name="terminal-outline" style={{ fontSize: '20px', color: '#10b981' }} /> Blocos de código com destaque de sintaxe</h3>
      <pre><code className="language-javascript" title="exemplo.js">
        // Exemplo de código JavaScript
        const n8n = require('n8n');

        // Esta função cria um workflow básico
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

        // Exportar a função
        module.exports = {'{'} criarWorkflow {'}'};
      </code></pre>
      <pre><code className="language-json" title="package.json">
        {'{'}
          "name": "meu-projeto-n8n",
          "version": "1.0.0",
          "description": "Projeto exemplo com n8n",
          "dependencies": {'{'}
            "n8n": "^1.0.0"
          {'}'}
        {'}'}
      </code></pre>
      <pre><code className="language-bash" title="Terminal">
        # Instalar dependências
        npm install

        # Iniciar n8n
        npm start

        # Executar workflow
        n8n execute --file workflow.json
      </code></pre>
      <h3><IonicIcon name="copy-outline" style={{ fontSize: '20px', color: '#10b981' }} /> Código inline</h3>
      <p>Use <code>código inline</code> para destacar:</p>
      <ul>
        <li>Comandos: <code>npm install</code></li>
        <li>Variáveis: <code>API_KEY</code></li>
        <li>Valores: <code>true</code>, <code>false</code>, <code>null</code></li>
        <li>Arquivos: <code>package.json</code>, <code>workflow.json</code></li>
      </ul>
      <h2><IonicIcon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Admonitions</h2>
      <h3><IonicIcon name="bulb-outline" style={{ fontSize: '20px', color: '#f59e0b' }} /> Tipos disponíveis</h3>
      <div className="admonition admonition-tip">
        <div className="admonition-heading">
          <h5>Dica Útil</h5>
        </div>
        <div className="admonition-content">
          <p>Este é um admonition do tipo "tip" - use para dicas e sugestões úteis.</p>
        </div>
      </div>
      <div className="admonition admonition-info">
        <div className="admonition-heading">
          <h5>Informação</h5>
        </div>
        <div className="admonition-content">
          <p>Este é um admonition do tipo "info" - use para informações complementares.</p>
        </div>
      </div>
      <div className="admonition admonition-warning">
        <div className="admonition-heading">
          <h5>Atenção</h5>
        </div>
        <div className="admonition-content">
          <p>Este é um admonition do tipo "warning" - use para alertas importantes.</p>
        </div>
      </div>
      <div className="admonition admonition-danger">
        <div className="admonition-heading">
          <h5>Cuidado</h5>
        </div>
        <div className="admonition-content">
          <p>Este é um admonition do tipo "danger" - use para avisos críticos.</p>
        </div>
      </div>
      <h3><IonicIcon name="star-outline" style={{ fontSize: '20px', color: '#f59e0b' }} /> Admonitions com título customizado</h3>
      <div className="admonition admonition-tip">
        <div className="admonition-heading">
          <h5><strong>💡 Dica Avançada</strong></h5>
        </div>
        <div className="admonition-content">
          <p>Você pode personalizar o título dos admonitions para torná-los mais específicos e úteis.</p>
        </div>
      </div>
      <div className="admonition admonition-warning">
        <div className="admonition-heading">
          <h5><strong>⚠️ Importante</strong></h5>
        </div>
        <div className="admonition-content">
          <p>Sempre teste seus workflows antes de colocar em produção!</p>
        </div>
      </div>
    </div>
  );
}
