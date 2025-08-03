import React from 'react';
import IonicIcon from '@site/src/components/IonicIcon';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MeuComponente from './MeuComponente';

export default function DependenciasLibs() {
  return (
    <div>
      <p>Este guia detalha todas as dependências do projeto e como adicionar novas funcionalidades de forma consistente.</p>
      <hr />
      <h2><IonicIcon name="checkmark-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <strong>Dependências Atuais</strong></h2>
      <h3><strong>🏗️ Base do Sistema</strong></h3>
      <pre><code className="language-json">
        {`{
          // === DOCUSAURUS CORE ===
          "@docusaurus/core": "^3.8.1",                    // Framework principal
          "@docusaurus/preset-classic": "^3.8.1",          // Preset padrão
          "@docusaurus/theme-mermaid": "^3.8.1",           // Diagramas
          "@mdx-js/react": "^3.1.0",                       // MDX processing ✅
          
          // === REACT ECOSYSTEM ===
          "react": "^18.3.1",                              // React base
          "react-dom": "^18.3.1",                          // React DOM
          
          // === UI & ANIMATIONS ===
          "@mui/material": "^7.2.0",                       // Material UI
          "ionicons": "^8.0.10",                          // Ícones ✅
          "framer-motion": "^12.23.0",                    // Animações ✅
          
          // === SISTEMA HÍBRIDO ===
          "restructured": "^0.0.12",                      // RST parser ✅
          "katex": "^0.16.9",                             // Math rendering ✅
          "rehype-katex": "^7.0.0",                       // Math MDX ✅
          "remark-math": "^6.0.0"                         // Math parsing ✅
        }`}
      </code></pre>
      <hr />
      <h2><IonicIcon name="add-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <strong>Como Adicionar Novas Dependências</strong></h2>
      <h3><strong>🔍 Processo de Avaliação</strong></h3>
      <Tabs>
        <TabItem value="analise" label="1. Análise">
          <p><strong>Antes de adicionar qualquer dependência:</strong></p>
          <ul>
            <li>✅ A funcionalidade é realmente necessária?</li>
            <li>✅ Já existe alternativa nativa/interna?</li>
            <li>✅ A biblioteca é bem mantida e atualizada?</li>
            <li>✅ Compatível com React 18+ e Docusaurus 3+?</li>
            <li>✅ Tamanho do bundle é aceitável?</li>
          </ul>
          <p><strong>Ferramentas de análise:</strong></p>
          <pre><code className="language-bash">
            # Verificar tamanho
            npm install bundlephobia-cli -g
            bundlephobia package-name
            
            # Verificar compatibilidade
            npm view package-name peerDependencies
          </code></pre>
        </TabItem>
        <TabItem value="instalacao" label="2. Instalação">
          <p><strong>Instalação por prioridade:</strong></p>
          <pre><code className="language-bash">
            # 🔥 Alta prioridade (UI/UX)
            npm install @headlessui/react @floating-ui/react
            
            # 🚀 Média prioridade (Funcionalidade)
            npm install @monaco-editor/react fuse.js
            
            # ⭐ Baixa prioridade (Futuro)
            npm install @vercel/analytics
          </code></pre>
          <p><strong>Sempre instalar types quando disponível:</strong></p>
          <pre><code className="language-bash">
            npm install @types/package-name -D
          </code></pre>
        </TabItem>
        <TabItem value="configuracao" label="3. Configuração">
          <p><strong>Configurar no projeto:</strong></p>
          <ol>
            <li><strong>Adicionar em MDXComponents.tsx:</strong>
              <pre><code className="language-typescript">
                import NewComponent from 'new-library';
                
                export default {'{'}
                  ...components,
                  NewComponent
                {'}'};
              </code></pre>
            </li>
            <li><strong>Configurar docusaurus.config.ts se necessário:</strong>
              <pre><code className="language-typescript">
                export default {'{'}
                  plugins: [
                    // Novo plugin se necessário
                  ]
                {'}'};
              </code></pre>
            </li>
            <li><strong>Documentar uso:</strong>
              <pre><code className="language-markdown">
                ## Como usar NewComponent
                
                &lt;NewComponent prop="value" /&gt;
              </code></pre>
            </li>
          </ol>
        </TabItem>
      </Tabs>
      <hr />
      <h2><IonicIcon name="construct-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <strong>Criando Novos Componentes</strong></h2>
      <h3><strong>📁 Estrutura Recomendada</strong></h3>
      <pre><code>
        src/components/
        ├── MeuNovoComponente/
        │   ├── index.tsx           # Componente principal
        │   ├── styles.module.css   # Estilos específicos
        │   └── types.ts           # Types TypeScript
      </code></pre>
      <h3><strong>🛠️ Template de Componente</strong></h3>
      <MeuComponente title="Meu Componente Animado" animated={true}>
        <p>Este é um exemplo de componente reutilizável.</p>
      </MeuComponente>
    </div>
  );
}
