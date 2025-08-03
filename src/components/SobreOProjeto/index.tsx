import React from 'react';
import IonicIcon from '@site/src/components/IonicIcon';

export default function SobreOProjeto() {
  return (
    <div>
      <h3>O que é esta documentação?</h3>
      <p>A <strong>Documentação n8n Brasil</strong> é mantida <strong>por e para a comunidade brasileira</strong>. Nosso propósito é tornar o aprendizado do n8n mais acessível, com conteúdo técnico em português e exemplos contextualizados à realidade local.</p>
      <hr />
      <h3><IonicIcon name="rocket-outline" style={{ fontSize: '24px', color: '#10b981' }} /> Nossa missão</h3>
      <h4>Para quem utiliza n8n no Brasil</h4>
      <ul>
        <li>Superar barreiras de idioma com conteúdo em português</li>
        <li>Apresentar exemplos e integrações alinhados ao contexto nacional (CEP, Receita Federal, PagSeguro…)</li>
        <li>Criar tutoriais que abordem desafios comuns do dia a dia</li>
        <li>Fortalecer o ecossistema do n8n em território brasileiro</li>
      </ul>
      <h4>Relação com a documentação oficial</h4>
      <ul>
        <li>Fornece <strong>traduções contextualizadas</strong>, com adaptação cultural</li>
        <li>Apresenta <strong>exemplos práticos brasileiros</strong></li>
        <li>Disponibiliza suporte comunitário em português</li>
      </ul>
      <hr />
      <h3><IonicIcon name="settings-outline" style={{ fontSize: '24px', color: '#10b981' }} /> Como o projeto funciona</h3>
      <h4>Infraestrutura técnica</h4>
      <ul>
        <li>Site construído com <strong>Docusaurus + React</strong></li>
        <li>Conteúdo em <strong>Markdown/MDX</strong>, com componentes interativos</li>
        <li>Contribuições via <strong>GitHub (fork → PR)</strong></li>
        <li>Publicação automática via <strong>GitHub Pages</strong></li>
      </ul>
      <h4>Estrutura de conteúdo</h4>
      <ol>
        <li>Primeiros passos com o n8n</li>
        <li>Navegação e execução de fluxos</li>
        <li>Manipulação de dados e lógica</li>
        <li>Integrações globais e conectores</li>
        <li>Integrações com serviços brasileiros</li>
        <li>Hospedagem e configuração</li>
        <li>Inteligência artificial no n8n</li>
        <li>API REST</li>
        <li>Guias técnicos e resolução de problemas</li>
      </ol>
      <hr />
      <h3><IonicIcon name="heart-outline" style={{ fontSize: '24px', color: '#10b981' }} /> Valores que nos guiam</h3>
      <table>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Aplicação prática</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Qualidade</strong></td>
            <td>Conteúdo validado, atualizado e revisado por pares</td>
          </tr>
          <tr>
            <td><strong>Acessibilidade</strong></td>
            <td>Linguagem clara, exemplos concretos e abordagem inclusiva</td>
          </tr>
          <tr>
            <td><strong>Sustentabilidade</strong></td>
            <td>Projeto vivo, aberto e com valorização de cada colaboração</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <h3><IonicIcon name="people-outline" style={{ fontSize: '24px', color: '#10b981' }} /> Para quem é este projeto</h3>
      <ul>
        <li><strong>Pessoas desenvolvedoras</strong> que desejam aprender e aplicar n8n com exemplos reais</li>
        <li><strong>Organizações brasileiras</strong> interessadas em automações adaptadas ao seu contexto</li>
        <li><strong>Pessoas iniciantes ou estudantes</strong> em busca de tutoriais claros e acessíveis</li>
        <li><strong>Colaboradoras e colaboradores</strong> com interesse em escrita técnica e apoio comunitário</li>
      </ul>
      <hr />
      <h3><IonicIcon name="arrow-forward-outline" style={{ fontSize: '24px', color: '#10b981' }} /> Próximos passos</h3>
      <ul>
        <li>Expandir integrações com serviços nacionais</li>
        <li>Criar tutoriais em vídeo e estudos de caso</li>
        <li>Promover workshops e eventos colaborativos</li>
      </ul>
      <hr />
      <h3><IonicIcon name="hand-left-outline" style={{ fontSize: '24px', color: '#10b981' }} /> Como contribuir</h3>
      <ul>
        <li><strong>Escreva tutoriais</strong> ou traduza conteúdos existentes</li>
        <li><strong>Revise e melhore</strong> materiais já publicados</li>
        <li><strong>Compartilhe casos de uso</strong> com a comunidade</li>
        <li><strong>Divulgue o projeto</strong> para alcançar mais pessoas</li>
      </ul>
      <hr />
      <h3>Nosso objetivo final</h3>
      <blockquote>
        <p><span style={{fontSize: '18px', fontWeight: 'bold'}}><strong>Construir uma documentação onde qualquer pessoa no Brasil se sente capaz de contribuir, aprender e crescer com o n8n — com segurança e confiança.</strong></span></p>
      </blockquote>
    </div>
  );
}
