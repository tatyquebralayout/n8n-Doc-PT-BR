import React from 'react';
import CardGrid from '@site/src/components/CardGrid';
import GuidanceCard from '@site/src/components/GuidanceCard';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IonicIcon from '@site/src/components/IonicIcon';

export default function ComoContribuir() {
  return (
    <div>
      <p>Este guia oferece um caminho simples e direto para realizar sua primeira contribuição aprovada. Não é necessário ter experiência prévia com projetos open source — qualquer pessoa pode participar e fazer a diferença.</p>
      <p>Seja corrigindo um erro de português ou criando um tutorial completo, cada contribuição fortalece nossa comunidade.</p>
      <hr />
      <h2><IonicIcon name="play-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><IonicIcon name="rocket-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Início Rápido (5 minutos)</span></h2>
      <h3><span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><IonicIcon name="code-outline" style={{ fontSize: '20px', color: '#ea4b71' }} /> Contribuições sem código</span></h3>
      <p>Essas são ótimas opções para começar a contribuir com rapidez e impacto, sem necessidade de ambiente técnico:</p>
      <ul>
        <li><strong>Corrigir erros de digitação</strong> - Encontrou um erro de português ou formatação? Clique em "Editar esta página" no rodapé e envie sua sugestão</li>
        <li><strong>Aprimorar exemplos</strong> - Atualize exemplos existentes ou inclua variações mais claras e contextualizadas para a realidade brasileira</li>
        <li><strong>Reportar problemas</strong> - Identificou informações confusas, incorretas ou desatualizadas? Registre uma issue com uma descrição clara do que pode ser melhorado</li>
      </ul>
      <h3><span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><IonicIcon name="logo-github" style={{ fontSize: '20px', color: '#ea4b71' }} /> <strong><a href="https://github.com/tatyquebralayout/n8n-Doc-pt-BR"><span style={{fontSize: '0.9em'}}>Link Direto para Contribuir</span></a></strong></span></h3>
      <hr />
      <h2><IonicIcon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><IonicIcon name="construct-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Configuração do Ambiente</span></h2>
      <h3><strong>Pré-requisitos</strong></h3>
      <Tabs>
        <TabItem value="github" label="Se escolher editar no GitHub" default>
          <p><strong>Para edições simples:</strong></p>
          <ul>
            <li>Conta no GitHub</li>
            <li>Navegador web (qualquer um)</li>
            <li>Conhecimento básico de Markdown</li>
          </ul>
          <p><strong>✅ Você pode contribuir diretamente pelo GitHub web!</strong></p>
        </TabItem>
        <TabItem value="local" label="Se escolher contribuir localmente">
          <p><strong>Para contribuições avançadas:</strong></p>
          <ul>
            <li>Node.js 18+ instalado</li>
            <li>Git configurado</li>
            <li>Editor de código (VSCode recomendado)</li>
            <li>Terminal/linha de comando</li>
          </ul>
          <p><strong>Principais dependências do projeto:</strong></p>
          <ul>
            <li>Docusaurus 3.8+ (framework da documentação)</li>
            <li>React 19+ (interface)</li>
            <li>TypeScript 5.8+ (tipagem)</li>
            <li>Ionicons (ícones)</li>
            <li>Framer Motion (animações)</li>
          </ul>
          <p><strong>✅ Necessário para testar localmente</strong></p>
        </TabItem>
      </Tabs>
      <h3><strong>Setup Local (Contribuição Local)</strong></h3>
      <pre><code className="language-bash" title="Terminal">
        # &lt;ion-icon name="document-text-outline" style={{"fontSize":"32px","color":"#ea4b71"}}&gt;&lt;/ion-icon&gt; 1. Fork e clone o repositório oficial da documentação brasileira do n8n
        # &lt;ion-icon name="grid-outline" style={{"fontSize":"32px","color":"#ea4b71"}}&gt;&lt;/ion-icon&gt; (faça o fork para sua conta antes de clonar, se for contribuir)
        git clone https://github.com/tatyquebralayout/n8n-Doc-pt-BR.git
        cd n8n-Doc-pt-BR

        # &lt;ion-icon name="settings-outline" style={{"fontSize":"32px","color":"#ea4b71"}}&gt;&lt;/ion-icon&gt; 2. Instalar dependências
        npm install

        # &lt;ion-icon name="code-slash-outline" style={{"fontSize":"32px","color":"#ea4b71"}}&gt;&lt;/ion-icon&gt; 3. Iniciar servidor de desenvolvimento
        npm start

        # &lt;ion-icon name="document-outline" style={{"fontSize":"32px","color":"#ea4b71"}}&gt;&lt;/ion-icon&gt; 4. Abrir no navegador
        # &lt;ion-icon name="document-outline" style={{"fontSize":"32px","color":"#ea4b71"}}&gt;&lt;/ion-icon&gt; http://localhost:3000
      </code></pre>
      <div className="admonition admonition-tip">
          <div className="admonition-heading">
              <h5>Dica importante</h5>
          </div>
          <div className="admonition-content">
              <p>Lembre-se de fazer o fork para sua conta no GitHub antes de clonar, caso queira enviar contribuições!</p>
          </div>
      </div>
      <hr />
      <h2><IonicIcon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><IonicIcon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Fluxo de Contribuição</span></h2>
      <h3><strong>Método 1: Edição Rápida (GitHub Web)</strong></h3>
      <p><strong>Ideal para:</strong> Correções simples, typos, pequenas melhorias e quem está começando</p>
      <ol>
        <li><strong><IonicIcon name="search-outline" style={{ fontSize: '16px' }} /></strong> Navegue até a página que quer editar</li>
        <li><strong><IonicIcon name="create-outline" style={{ fontSize: '16px' }} /></strong> Clique em "Editar esta página" no final</li>
        <li><strong><IonicIcon name="git-branch-outline" style={{ fontSize: '16px' }} /></strong> GitHub criará automaticamente um fork</li>
        <li><strong><IonicIcon name="text-outline" style={{ fontSize: '16px' }} /></strong> Faça suas alterações no editor web</li>
        <li><strong><IonicIcon name="save-outline" style={{ fontSize: '16px' }} /></strong> Adicione uma descrição clara das mudanças</li>
        <li><strong><IonicIcon name="paper-plane-outline" style={{ fontSize: '16px' }} /></strong> Clique em "Propose changes"</li>
        <li><strong><IonicIcon name="checkmark-outline" style={{ fontSize: '16px' }} /></strong> Envie o Pull Request</li>
      </ol>
      <div className="admonition admonition-tip">
          <div className="admonition-heading">
              <h5><span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><IonicIcon name="star" style={{ fontSize: '16px', color: '#f59e0b' }} /> <span style={{color: '#f59e0b'}}>Vantagem</span></span></h5>
          </div>
          <div className="admonition-content">
              <p>Você não precisa instalar nada! Tudo acontece no navegador.</p>
          </div>
      </div>
      <h3><strong>Método 2: Desenvolvimento Local</strong></h3>
      <p>Recomendado para contribuições que envolvem múltiplos arquivos, criação de novos conteúdos ou personalizações mais avançadas. Ideal para pessoas com familiaridade com linha de comando e ambiente de desenvolvimento local.</p>
      <Tabs>
        <TabItem value="passo1" label="1. Preparação">
          <pre><code className="language-bash" title="Terminal">
            # Criar uma nova branch para sua contribuição
            git checkout -b minha-contribuicao
            
            # Verificar arquivos modificados
            git status
          </code></pre>
          <p><strong>Padrão de nomes para branchs:</strong></p>
          <ul>
            <li><code>fix/corrigir-typo-instalacao</code></li>
            <li><code>feat/novo-tutorial-webhook</code></li>
            <li><code>docs/atualizar-guia-docker</code></li>
          </ul>
        </TabItem>
        <TabItem value="passo2" label="2. Desenvolvimento">
          <pre><code className="language-bash" title="Terminal">
            # Iniciar o servidor local
            npm start
            
            # Em outro terminal, edite os arquivos conforme necessário
          </code></pre>
          <p><strong>Durante o desenvolvimento:</strong></p>
          <ul>
            <li>O servidor recarrega automaticamente</li>
            <li>Visualize suas alterações em tempo real</li>
            <li>Teste a responsividade (ex: celular, desktop)</li>
          </ul>
        </TabItem>
        <TabItem value="passo3" label="3. Commit e Push">
          <pre><code className="language-bash" title="Terminal">
            # Adicionar arquivos modificados
            git add .
            
            # Criar um commit com mensagem clara
            git commit -m "feat: adicionar tutorial de webhook"
            
            # Enviar as alterações para o seu fork
            git push origin minha-contribuicao
          </code></pre>
          <p><strong>Padrões de commit (Conventional Commits):</strong></p>
          <ul>
            <li><code>feat:</code> nova funcionalidade</li>
            <li><code>fix:</code> correção de erro</li>
            <li><code>docs:</code> melhoria na documentação</li>
            <li><code>style:</code> ajustes de formatação</li>
          </ul>
        </TabItem>
        <TabItem value="passo4" label="4. Pull Request">
          <ol>
            <li>Acesse seu fork no GitHub</li>
            <li>Clique em <strong>"Compare & pull request"</strong></li>
            <li>Preencha o template com:
              <ul>
                <li>Um título objetivo</li>
                <li>Explicação do que foi alterado</li>
                <li>Imagens, se fizer sentido</li>
                <li>Checklist completo</li>
              </ul>
            </li>
            <li>Envie o PR para revisão</li>
          </ol>
          <div className="admonition admonition-tip">
              <div className="admonition-heading">
                  <h5>Dica</h5>
              </div>
              <div className="admonition-content">
                  <p>Siga o checklist de qualidade abaixo para garantir que seu PR seja aprovado rapidamente.</p>
              </div>
          </div>
        </TabItem>
      </Tabs>
      <hr />
      <h2><IonicIcon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><IonicIcon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Tipos de Contribuição</span></h2>
      <h3>Criar Novo Conteúdo</h3>
      <p>Use seu conhecimento para expandir a documentação. Essas contribuições ajudam outras pessoas a resolverem desafios reais no uso do n8n.</p>
      <CardGrid>
        <GuidanceCard title="Tutoriais Práticos" icon="book-outline">
          <ul>
            <li>Workflows</li>
            <li>Integrações passo a passo</li>
            <li>Casos de uso aplicados ao dia a dia</li>
            <li>Soluções para problemas comuns</li>
          </ul>
        </GuidanceCard>
        <GuidanceCard title="Guias de Integração" icon="git-network-outline">
          <ul>
            <li>Integração com APIs nacionais (ex: ViaCEP, Receita Federal)</li>
            <li>Conexão com sistemas de pagamento no Brasil</li>
            <li>Configuração de ERPs usados localmente</li>
            <li>Automação com plataformas de comunicação e redes sociais</li>
          </ul>
        </GuidanceCard>
      </CardGrid>
    </div>
  )
}