import React from 'react';
import IonicIcon from '@site/src/components/IonicIcon';

export default function DocusaurusFolder() {
  return (
    <div>
      <h2><IonicIcon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> O que é?</h2>
      <p>O diretório <code>.docusaurus</code> é uma pasta gerada automaticamente sempre que o site é executado localmente (<code>npm start</code>) ou construído para produção (<code>npm run build</code>). Ele armazena artefatos técnicos essenciais para o funcionamento do site — como rotas, registros de plugins, dados globais e configurações compiladas.</p>
      <div className="admonition admonition-warning">
        <div className="admonition-heading">
          <h5>Importante</h5>
        </div>
        <div className="admonition-content">
          <p><strong>Não edite arquivos dentro do .docusaurus.</strong> Tudo será sobrescrito em cada build.</p>
        </div>
      </div>
      <hr />
      <h2><IonicIcon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Quando e como ele é gerado?</h2>
      <p>O <code>.docusaurus</code> é regenerado automaticamente em três situações comuns:</p>
      <table>
        <thead>
          <tr>
            <th>Ação</th>
            <th>O que acontece</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>npm start</code></td>
            <td>Gera a pasta e mantém atualizada com hot reload</td>
          </tr>
          <tr>
            <td><code>npm run build</code></td>
            <td>Recria do zero, otimizada para produção</td>
          </tr>
          <tr>
            <td><code>npm run clear</code></td>
            <td>Remove .docusaurus; será recriada ao rodar novamente</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <h2><IonicIcon name="folder-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Estrutura interna: o que tem lá dentro?</h2>
      <h3><strong>Arquivos comuns</strong></h3>
      <table>
        <thead>
          <tr>
            <th>Arquivo</th>
            <th>Função</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>routes.js</code></td>
            <td>Define rotas do site</td>
          </tr>
          <tr>
            <td><code>registry.js</code></td>
            <td>Lista todos os componentes React usados</td>
          </tr>
          <tr>
            <td><code>globalData.json</code></td>
            <td>Dados globais compartilhados entre plugins e temas</td>
          </tr>
          <tr>
            <td><code>client-modules.js</code></td>
            <td>Scripts do cliente usados pelo site</td>
          </tr>
          <tr>
            <td><code>codeTranslations.json</code></td>
            <td>Traduções reutilizáveis para internacionalização</td>
          </tr>
          <tr>
            <td><code>site-metadata.json</code></td>
            <td>Informações básicas sobre o site</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
