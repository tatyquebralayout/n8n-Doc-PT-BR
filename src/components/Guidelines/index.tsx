import React from 'react';
import IonicIcon from '@site/src/components/IonicIcon';

export default function Guidelines() {
  return (
    <div className="guidelines-container">
      <h1><IonicIcon name="book-outline" className="guidelines-icon" /> Guia de Contribuição</h1>
      <p>Este guia estabelece os padrões e diretrizes para contribuir com a documentação do n8n Brasil. Siga estas orientações para garantir qualidade e consistência.</p>
      
      <h2><IonicIcon name="checkmark-circle-outline" className="guidelines-icon" /> Princípios Fundamentais</h2>
      <h3>✅ O que fazer</h3>
      <ul>
        <li>Escrever de forma clara e acessível</li>
        <li>Usar exemplos relevantes para o Brasil</li>
        <li>Manter consistência com o estilo existente</li>
        <li>Testar links e funcionalidades</li>
        <li>Documentar mudanças significativas</li>
      </ul>
      <h3>❌ O que evitar</h3>
      <ul>
        <li>Jargões desnecessários</li>
        <li>Traduções literais do inglês</li>
        <li>Exemplos não relevantes para o Brasil</li>
        <li>Quebrar a estrutura existente</li>
        <li>Ignorar feedback da comunidade</li>
      </ul>
      <h2><IonicIcon name="chevron-forward-outline" className="guidelines-icon" /> Revisão e Aprovação</h2>
      <h3>Critérios de Aprovação</h3>
      <ul>
        <li>[ ] Conteúdo técnico correto</li>
        <li>[ ] Linguagem clara e acessível</li>
        <li>[ ] Exemplos funcionais</li>
        <li>[ ] Estrutura consistente</li>
        <li>[ ] Links funcionando</li>
        <li>[ ] Relevância para o contexto brasileiro</li>
      </ul>
      <h3>Processo de Revisão</h3>
      <ol>
        <li><strong>Revisão automática</strong>: Verificação de links e estrutura</li>
        <li><strong>Revisão da comunidade</strong>: Feedback de outros contribuidores</li>
        <li><strong>Revisão final</strong>: Aprovação pelos mantenedores</li>
      </ol>
      <h2><IonicIcon name="school-outline" className="guidelines-icon" /> Recursos Úteis</h2>
      <ul>
        <li><a href="./padroes-e-estilo/guia-de-estilo">Guia de Estilo</a> - Padrões de escrita</li>
        <li><a href="./padroes-e-estilo/markdown-features">Recursos do Markdown</a> - Sintaxe e componentes</li>
        <li><a href="./padroes-e-estilo/design-system">Design System</a> - Elementos visuais</li>
        <li><a href="./traducao-e-localizacao/guia-traducao">Guia de Tradução</a> - Padrões de localização</li>
      </ul>
      <h2><IonicIcon name="chevron-forward-outline" className="guidelines-icon" /> Comunicação</h2>
      <h3>Canais de Comunicação</h3>
      <ul>
        <li><strong>Issues do GitHub</strong>: Para problemas e sugestões</li>
        <li><strong>Discussions</strong>: Para discussões gerais</li>
        <li><strong>Pull Requests</strong>: Para contribuições de código</li>
      </ul>
      <h3>Código de Conduta</h3>
      <p>Siga nosso <a href="./entendendo-o-projeto/codigo-conduta">Código de Conduta</a> em todas as interações.</p>
      <h2><IonicIcon name="chevron-forward-outline" className="guidelines-icon" /> Agradecimentos</h2>
      <p>Obrigado por contribuir com a documentação do n8n Brasil! Sua participação ajuda a tornar a automação mais acessível para todos os brasileiros.</p>
      <hr />
      <p><strong>💡 Dica</strong>: Se você tem dúvidas sobre como contribuir, não hesite em abrir uma issue ou participar das discussões da comunidade.</p>
      <h2>Processo de Validação Contínua da Documentação</h2>
      <p>Para garantir a qualidade, transparência e confiança na documentação, siga este processo de validação contínua para todas as páginas em <code>docs/</code>:</p>
      <h3>1. Sinalização de Status</h3>
      <ul>
        <li><strong>Páginas validadas</strong>: Devem conter no início do arquivo o aviso:
          <pre><code>{`
            :::info
            <ion-icon name="shield-checkmark-outline" style={{fontSize:"18px",color:"#17a2b8"}}></ion-icon> Esta página da documentação foi validada tecnicamente e didaticamente.
            :::
          `}</code></pre>
        </li>
        <li><strong>Páginas em progresso</strong>: Devem conter no início do arquivo o aviso:
          <pre><code>{`
            :::warning
            <ion-icon name="time-outline" style={{fontSize:"18px",color:"#f59e0b"}}></ion-icon> Esta página ainda está em processo de validação. O conteúdo pode sofrer alterações.
            :::
          `}</code></pre>
        </li>
      </ul>
      <h3>2. Checklist de Validação</h3>
      <ul>
        <li>[ ] Revisão técnica do conteúdo (exatidão, exemplos, comandos, código)</li>
        <li>[ ] Revisão didática (clareza, estrutura, progressão, acessibilidade)</li>
        <li>[ ] Conferência de links internos e externos</li>
        <li>[ ] Consistência visual (ícones, avisos, títulos, cores)</li>
        <li>[ ] Teste prático de tutoriais e exemplos</li>
        <li>[ ] Atualização do status na homepage (src/pages/index.tsx)</li>
        <li>[ ] Atualização do aviso no início do arquivo</li>
        <li>[ ] Registro da validação (data, responsável, observações)</li>
      </ul>
      <h3>3. Orientações para Contribuidores</h3>
      <ul>
        <li>Sempre adicione ou atualize o aviso de status ao criar ou editar uma página.</li>
        <li>Ao concluir a validação, altere o aviso de <code>:::warning</code> para <code>:::info</code>.</li>
        <li>Mantenha o padrão de ícones e cores para garantir clareza ao usuário.</li>
        <li>Se identificar uma página sem aviso, sinalize imediatamente e registre para validação.</li>
        <li>Use o checklist acima para cada página validada.</li>
      </ul>
      <h3>4. Auditoria Periódica</h3>
      <ul>
        <li>Realize auditorias automáticas ou manuais periodicamente para garantir que todas as páginas estejam sinalizadas corretamente.</li>
        <li>Gere relatórios de status para acompanhamento do progresso da documentação.</li>
      </ul>
      <h3>5. Transparência e Comunicação</h3>
      <ul>
        <li>Mantenha o histórico de validação acessível para a equipe e comunidade.</li>
        <li>Comunique mudanças de status relevantes no changelog ou canal de comunicação do projeto.</li>
      </ul>
      <hr />
      <blockquote>
        <p><strong>Dica:</strong> Automatize a verificação de avisos com scripts ou ferramentas de CI para garantir que nenhuma página fique sem sinalização adequada.</p>
      </blockquote>
    </div>
  );
}
