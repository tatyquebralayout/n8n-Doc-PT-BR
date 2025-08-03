import React from 'react';
import IonicIcon from '@site/src/components/IonicIcon';

export default function ExemplosPraticos() {
  return (
    <div>
      <p>Esta página apresenta <strong>exemplos práticos de contribuições</strong> que você pode fazer para a documentação, desde correções simples até adições de conteúdo mais complexas.</p>
      <hr />
      <h2><IonicIcon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Tipos de Contribuições</h2>
      <h3><strong>Correções Simples</strong></h3>
      <ul>
        <li>Corrigir erros de digitação</li>
        <li>Atualizar links quebrados</li>
        <li>Melhorar formatação</li>
        <li>Adicionar informações faltantes</li>
      </ul>
      <h3><strong>Melhorias de Conteúdo</strong></h3>
      <ul>
        <li>Expandir seções existentes</li>
        <li>Adicionar exemplos práticos</li>
        <li>Incluir screenshots atualizadas</li>
        <li>Criar novos tutoriais</li>
      </ul>
      <h3><strong>Traduções e Localização</strong></h3>
      <ul>
        <li>Traduzir conteúdo do inglês</li>
        <li>Adaptar exemplos para o contexto brasileiro</li>
        <li>Adicionar integrações com serviços nacionais</li>
      </ul>
      <hr />
      <h2><IonicIcon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> Exemplos Práticos</h2>
      <h3><strong>Exemplo 1: Correção de Link</strong></h3>
      <pre><code className="language-markdown">
        // Antes
        [Guia de Instalação](./instalacao)

        // Depois  
        [Guia de Instalação](./guia-instalacao)
      </code></pre>
      <h3><strong>Exemplo 2: Adição de Exemplo Prático</strong></h3>
      <pre><code className="language-markdown">
        ## &lt;ion-icon name="settings-outline" style={'{'}{'{'} fontSize: '24px', color: '#ea4b71' {'}'}{'}'}&gt;&lt;/ion-icon&gt; Configuração do Webhook

        Para configurar um webhook no n8n:

        1. Acesse a seção de webhooks
        2. Clique em "Novo Webhook"
        3. Configure as opções desejadas

        **Exemplo prático:**
      </code></pre>
      <pre><code className="language-json">
        {'{'}
          "url": "https://api.exemplo.com/webhook",
          "method": "POST",
          "headers": {'{'}
            "Content-Type": "application/json"
          {'}'}
        {'}'}
      </code></pre>
      <h3><strong>Exemplo 3: Tradução e Contextualização</strong></h3>
    </div>
  );
}
