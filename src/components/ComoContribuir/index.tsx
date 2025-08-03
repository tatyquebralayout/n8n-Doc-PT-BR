import React from 'react';
import IonicIcon from '@site/src/components/IonicIcon';
import GuidanceCard from '@site/src/components/GuidanceCard';
import CardGrid from '@site/src/components/CardGrid';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function ComoContribuir() {
  return (
    <div className="como-contribuir-container">
      <h1><IonicIcon name="people-outline" className="contribuir-icon" /> Como Contribuir</h1>
      <p>Contribuir com a documentação do n8n Brasil é uma excelente maneira de ajudar a comunidade brasileira de automação. Este guia mostra como você pode participar.</p>
      
      <h2><IonicIcon name="rocket-outline" className="contribuir-icon" /> Primeiros Passos</h2>
      <p>Antes de começar, certifique-se de que você tem:</p>
      <ul>
        <li>Uma conta no GitHub</li>
        <li>Conhecimento básico de Markdown</li>
        <li>Disposição para aprender e colaborar</li>
      </ul>
      
      <h2><IonicIcon name="settings-outline" className="contribuir-icon" /> Configuração do Ambiente</h2>
      <h3><strong>Setup Local (Contribuição Local)</strong></h3>
      <pre><code className="language-bash" title="Terminal">
        # 1. Fork e clone o repositório oficial da documentação brasileira do n8n
        # (faça o fork para sua conta antes de clonar, se for contribuir)
        git clone https://github.com/tatyquebralayout/n8n-Doc-pt-BR.git
        cd n8n-Doc-pt-BR

        # 2. Instalar dependências
        npm install

        # 3. Iniciar servidor de desenvolvimento
        npm start

        # 4. Abrir no navegador
        # http://localhost:3000
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
      <h2><IonicIcon name="git-branch-outline" className="contribuir-icon" /> <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><IonicIcon name="git-branch-outline" className="contribuir-icon" /> Fluxo de Contribuição</span></h2>
      <h3><strong>Método 1: Edição Rápida (GitHub Web)</strong></h3>
      <p><strong>Ideal para:</strong> Correções simples, typos, pequenas melhorias e quem está começando</p>
      <ol>
        <li><strong><IonicIcon name="search-outline" className="contribuir-icon-small" /></strong> Navegue até a página que quer editar</li>
        <li><strong><IonicIcon name="create-outline" className="contribuir-icon-small" /></strong> Clique em "Editar esta página" no final</li>
        <li><strong><IonicIcon name="git-branch-outline" className="contribuir-icon-small" /></strong> GitHub criará automaticamente um fork</li>
        <li><strong><IonicIcon name="text-outline" className="contribuir-icon-small" /></strong> Faça suas alterações no editor web</li>
        <li><strong><IonicIcon name="save-outline" className="contribuir-icon-small" /></strong> Adicione uma descrição clara das mudanças</li>
        <li><strong><IonicIcon name="paper-plane-outline" className="contribuir-icon-small" /></strong> Clique em "Propose changes"</li>
        <li><strong><IonicIcon name="checkmark-outline" className="contribuir-icon-small" /></strong> Envie o Pull Request</li>
      </ol>
      <div className="admonition admonition-tip">
          <div className="admonition-heading">
              <h5><span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><IonicIcon name="star" className="contribuir-icon-small" style={{color: '#f59e0b'}} /> <span style={{color: '#f59e0b'}}>Vantagem</span></span></h5>
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
      <h2><IonicIcon name="grid-outline" className="contribuir-icon" /> <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><IonicIcon name="document-outline" className="contribuir-icon" /> Tipos de Contribuição</span></h2>
      <h3>Criar Novo Conteúdo</h3>
      <p>Use seu conhecimento para expandir a documentação. Essas contribuições ajudam outras pessoas a resolverem desafios reais no uso do n8n.</p>
      <CardGrid>
        <GuidanceCard title="Tutoriais Práticos" icon="book-outline" description="Crie tutoriais práticos e casos de uso reais para a comunidade brasileira">
          <ul>
            <li>Workflows</li>
            <li>Integrações passo a passo</li>
            <li>Casos de uso aplicados ao dia a dia</li>
            <li>Soluções para problemas comuns</li>
          </ul>
        </GuidanceCard>
        <GuidanceCard title="Guias de Integração" icon="git-network-outline" description="Desenvolva guias para integrações com sistemas e APIs brasileiras">
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