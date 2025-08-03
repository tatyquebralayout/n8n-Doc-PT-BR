import React from 'react';
import IonicIcon from '@site/src/components/IonicIcon';

export default function GettingStartedContribuidor() {
  return (
    <div>
      <p>Este guia orienta os primeiros passos técnicos para contribuir com esta documentação. Você pode usar o <strong>GitHub Web</strong>, que é mais simples, ou configurar um <strong>ambiente local de desenvolvimento</strong>, ideal para alterações maiores.</p>
      <hr />
      <h2><IonicIcon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><IonicIcon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Escolha sua Abordagem</span></h2>
      <h3>GitHub Web (mais simples)</h3>
      <p>Ideal para edições rápidas e novos artigos via navegador:</p>
      <ul>
        <li>✅ Acesso direto sem instalar nada</li>
        <li>✅ Fácil para correções ou melhorias pontuais</li>
        <li>✅ Interface intuitiva do GitHub</li>
        <li>❌ Sem visualização local das alterações</li>
        <li>❌ Limitações para alterações complexas</li>
      </ul>
      <h3>Desenvolvimento Local (mais completo)</h3>
      <p>Indicado para contribuições técnicas mais robustas:</p>
      <ul>
        <li>✅ Controle total sobre a estrutura do projeto</li>
        <li>✅ Teste local antes de enviar</li>
        <li>✅ Visualização em tempo real das mudanças</li>
        <li>✅ Possibilidade de trabalhar offline</li>
        <li>❌ Requer configuração de ambiente</li>
      </ul>
      <hr />
      <h2><IonicIcon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><IonicIcon name="logo-github" style={{ fontSize: '24px', color: '#ea4b71' }} /> GitHub Web</span></h2>
      <h3><IonicIcon name="git-branch-outline" style={{ fontSize: '20px', color: '#ea4b71' }} /> Passo 1 – Fazer Fork</h3>
      <ol>
        <li>Acesse: <a href="https://github.com/tatyquebralayout/n8n-Doc-pt-BR">https://github.com/tatyquebralayout/n8n-Doc-pt-BR</a></li>
        <li>Clique em <strong>Fork</strong> no canto superior direito</li>
        <li>Confirme na sua conta GitHub</li>
        <li>Aguarde a criação do fork na sua conta</li>
      </ol>
      <p><strong>O que acontece:</strong> Uma cópia do repositório é criada na sua conta, permitindo que você trabalhe sem afetar o original.</p>
      <h3><IonicIcon name="create-outline" style={{ fontSize: '20px', color: '#ea4b71' }} /> Passo 2 – Editar Arquivo</h3>
      <p><strong>Para corrigir conteúdo existente:</strong></p>
      <ul>
        <li>Navegue até o arquivo desejado no seu fork</li>
        <li>Clique no ícone de lápis "Edit this file"</li>
        <li>Faça suas alterações no editor web</li>
        <li>Use a aba "Preview" para ver como ficará</li>
      </ul>
      <p><strong>Para criar novo conteúdo:</strong></p>
      <ul>
        <li>Vá até a pasta de destino no seu fork</li>
        <li>Clique em "Add file" &gt; "Create new file"</li>
        <li>Digite o nome do arquivo com extensão (ex: <code>meu-artigo.mdx</code>)</li>
        <li>Escreva seu conteúdo seguindo o padrão da documentação</li>
      </ul>
      <h3><IonicIcon name="checkmark-outline" style={{ fontSize: '20px', color: '#ea4b71' }} /> Passo 3 – Commit</h3>
      <p>Use mensagens descritivas seguindo o padrão:</p>
      <div className="admonition admonition-tip">
          <div className="admonition-heading">
              <h5><strong>Exemplo de Commit Message</strong></h5>
          </div>
          <div className="admonition-content">
            <pre><code>
              feat: adicionar tutorial sobre integração com ViaCEP
              fix: corrigir link quebrado na página de instalação
              docs: atualizar exemplo de configuração do webhook
            </code></pre>
          </div>
      </div>
      <p><strong>Processo:</strong></p>
      <ol>
        <li>Scroll até "Commit changes"</li>
        <li>Crie uma nova branch (recomendado) ou use a main</li>
        <li>Escreva uma mensagem descritiva</li>
        <li>Clique em "Commit changes"</li>
      </ol>
      <h3><IonicIcon name="git-pull-request-outline" style={{ fontSize: '20px', color: '#ea4b71' }} /> Passo 4 – Pull Request</h3>
      <ol>
        <li>Clique em "Compare & pull request"</li>
        <li>Preencha o título seguindo o padrão: <code>feat: descrição da mudança</code></li>
        <li>Na descrição, explique:
          <ul>
            <li>O que foi alterado/adicinado</li>
            <li>Por que a mudança é necessária</li>
            <li>Como testar (se aplicável)</li>
          </ul>
        </li>
        <li>Clique em "Create pull request"</li>
      </ol>
    </div>
  );
}
