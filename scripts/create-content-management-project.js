#!/usr/bin/env node

/**
 * 📝 Script de Gerenciamento de Conteúdo e Texto
 * Cria projeto GitHub especializado em qualidade de conteúdo e atualização de textos
 */

require('dotenv').config();

const REPO_OWNER = process.env.REPO_OWNER || 'tatyquebralayout';
const REPO_NAME = process.env.REPO_NAME || 'n8n-Doc-pt-BR';

// Labels específicas para gerenciamento de conteúdo
const CONTENT_LABELS = [
  // === PRIORIDADES DE CONTEÚDO ===
  { name: '🔴 Conteúdo Crítico', color: 'B60205', description: 'Conteúdo essencial que está faltando ou quebrado' },
  { name: '🟠 Conteúdo Importante', color: 'D93F0B', description: 'Conteúdo importante que precisa ser atualizado' },
  { name: '🟡 Melhoria de Texto', color: 'FBCA04', description: 'Melhorias de clareza e qualidade do texto' },
  { name: '🟢 Polimento', color: '0E8A16', description: 'Refinamentos e ajustes menores' },

  // === TIPOS DE PROBLEMA DE CONTEÚDO ===
  { name: '📭 Conteúdo Vazio', color: 'E99695', description: 'Páginas ou seções completamente vazias' },
  { name: '🚧 Em Construção', color: 'FFC649', description: 'Conteúdo marcado como "em construção" ou incompleto' },
  { name: '📝 Conteúdo Insuficiente', color: 'BFD4F2', description: 'Conteúdo muito curto ou superficial' },
  { name: '📏 Conteúdo Extenso', color: 'D4C5F9', description: 'Conteúdo muito longo que precisa ser dividido' },
  { name: '🔗 Links Quebrados', color: 'D73A49', description: 'Links que não funcionam ou estão vazios' },
  { name: '📋 Sem Estrutura', color: 'A2EEEF', description: 'Falta de headings e organização clara' },

  // === QUALIDADE DE TEXTO ===
  { name: '🇧🇷 Português BR', color: '009639', description: 'Adequação ao português brasileiro' },
  { name: '✏️ Revisão Ortográfica', color: '7057FF', description: 'Correção de erros de português' },
  { name: '📖 Clareza', color: '0366D6', description: 'Melhorar clareza e compreensão do texto' },
  { name: '🎯 Objetividade', color: '28A745', description: 'Tornar texto mais direto e objetivo' },
  { name: '📚 Didático', color: '6F42C1', description: 'Melhorar aspecto educacional do conteúdo' },

  // === TIPOS DE CONTEÚDO ===
  { name: '📖 Tutorial', color: 'FFB74D', description: 'Tutoriais e guias passo a passo' },
  { name: '📋 Referência', color: 'A1887F', description: 'Documentação de referência técnica' },
  { name: '💡 Exemplo', color: 'F06292', description: 'Exemplos práticos e demonstrações' },
  { name: '🎯 Caso de Uso', color: 'BA68C8', description: 'Casos de uso específicos e cenários' },
  { name: '🔧 Guia Técnico', color: '795548', description: 'Documentação técnica avançada' },
  { name: '🚀 Getting Started', color: 'FF6B6B', description: 'Conteúdo para iniciantes' },

  // === SEÇÕES ESPECÍFICAS ===
  { name: '🏠 Página Inicial', color: 'FF6B9D', description: 'Conteúdo da página inicial' },
  { name: '🔗 Integrações', color: '66BB6A', description: 'Documentação de integrações e nodes' },
  { name: '🏗️ Instalação', color: '42A5F5', description: 'Guias de instalação e configuração' },
  { name: '🤖 IA Avançada', color: 'E91E63', description: 'Conteúdo sobre IA e automação inteligente' },
  { name: '👥 Comunidade', color: '9C27B0', description: 'Conteúdo sobre comunidade e contribuição' },

  // === STATUS DE TRABALHO ===
  { name: '✍️ Escrevendo', color: 'FBCA04', description: 'Conteúdo sendo escrito atualmente' },
  { name: '👀 Revisando', color: 'BFD4F2', description: 'Conteúdo em processo de revisão' },
  { name: '🔄 Atualizando', color: '5319E7', description: 'Conteúdo sendo atualizado' },
  { name: '✅ Pronto', color: '0E8A16', description: 'Conteúdo finalizado e aprovado' },

  // === ESPECIAIS ===
  { name: '🎓 Educacional', color: 'FF9800', description: 'Conteúdo com foco educacional' },
  { name: '⚡ Urgente', color: 'F44336', description: 'Conteúdo que precisa ser atualizado urgentemente' },
  { name: '👥 Colaborativo', color: 'C5DEF5', description: 'Conteúdo que precisa de múltiplos contribuidores' },
  { name: '🔍 Auditoria', color: '8BC34A', description: 'Identificado em auditoria de qualidade' }
];

// Issues específicas para gerenciamento de conteúdo
const CONTENT_ISSUES = [
  // === CRÍTICAS - Conteúdo essencial faltante ===
  {
    title: '🔴 [CRÍTICO] Completar páginas "Em Construção" da seção Contribuir',
    body: `## 🎯 Problema
Várias páginas essenciais da seção "Contribuir" estão marcadas como "Em construção" ou têm conteúdo insuficiente.

## 📋 Páginas Afetadas
- \`docs/contribuir/esta-documentacao/como-contribuir.md\`
- \`docs/contribuir/esta-documentacao/por-que-contribuir.md\`
- \`docs/contribuir/esta-documentacao/exemplos-de-boas-contribuicoes.md\`
- \`docs/contribuir/esta-documentacao/duvidas-ou-sugestoes.md\`

## 📝 Conteúdo Necessário
### Como Contribuir
- [ ] Processo step-by-step para contribuições
- [ ] Setup do ambiente de desenvolvimento
- [ ] Workflow de Pull Request
- [ ] Padrões de código e documentação
- [ ] Checklist de qualidade

### Por que Contribuir
- [ ] Benefícios para a comunidade n8n Brasil
- [ ] Crescimento pessoal e profissional
- [ ] Networking e reconhecimento
- [ ] Impacto no ecossistema nacional

### Exemplos de Boas Contribuições
- [ ] Cases reais de contribuições aceitas
- [ ] Templates e modelos
- [ ] Antes e depois de melhorias
- [ ] Diferentes tipos de contribuição

### Dúvidas ou Sugestões
- [ ] Canais de comunicação oficiais
- [ ] FAQ sobre contribuições
- [ ] Processo de feedback
- [ ] Contatos e suporte

## ✅ Critérios de Aceitação
- [ ] Todas as páginas com conteúdo completo (mín. 800 palavras)
- [ ] Linguagem clara e acessível
- [ ] Exemplos práticos incluídos
- [ ] Links funcionais
- [ ] Consistência com design system
- [ ] Revisão ortográfica completa

## 🎯 Impacto
Essencial para engajar novos contribuidores e facilitar participação da comunidade brasileira.

## 📊 Prioridade
**Crítica** - Estas páginas são fundamentais para o crescimento da comunidade.`,
    labels: ['🔴 Conteúdo Crítico', '🚧 Em Construção', '👥 Comunidade', '✍️ Escrevendo', '🎓 Educacional']
  },

  {
    title: '🔴 [CRÍTICO] Criar conteúdo completo para seção Getting Started',
    body: `## 🎯 Problema
A seção Getting Started é a primeira impressão dos usuários, mas está incompleta.

## 📋 Páginas que Precisam de Conteúdo
- \`docs/tutorial-basico/conceitos-basicos.md\` - Expandir conceitos
- \`docs/tutorial-basico/primeiro-workflow.md\` - Tutorial mais detalhado
- \`docs/usando-n8n/getting-started/quickstart-rapido.md\` - Quickstart de 5 minutos
- \`docs/usando-n8n/getting-started/workflow-na-pratica.md\` - Exemplo prático

## 📝 Conteúdo Necessário
### Conceitos Básicos
- [ ] O que é n8n e para que serve
- [ ] Conceitos fundamentais (nodes, workflows, connections)
- [ ] Terminologia essencial
- [ ] Comparação com outras ferramentas

### Primeiro Workflow
- [ ] Tutorial passo a passo com screenshots
- [ ] Exemplo prático e útil (ex: automação de email)
- [ ] Explicação de cada etapa
- [ ] Troubleshooting comum

### Quickstart Rápido
- [ ] Instalação em 2 minutos
- [ ] Primeiro workflow em 3 minutos
- [ ] Teste e validação
- [ ] Próximos passos

### Workflow na Prática
- [ ] Caso de uso brasileiro real
- [ ] Integração com APIs nacionais
- [ ] Boas práticas desde o início
- [ ] Dicas de otimização

## ✅ Critérios de Aceitação
- [ ] Conteúdo testado na prática
- [ ] Screenshots atualizados
- [ ] Linguagem simples e didática
- [ ] Exemplos funcionais
- [ ] Tempo de conclusão documentado

## 🎯 Impacto
**Crítico** - Primeira impressão determina se usuário continua usando n8n.`,
    labels: ['🔴 Conteúdo Crítico', '🚀 Getting Started', '📖 Tutorial', '✍️ Escrevendo', '🎓 Educacional']
  },

  {
    title: '🟠 [ALTA] Auditoria completa de links quebrados',
    body: `## 🎯 Problema
Existem links quebrados em várias páginas que prejudicam a experiência do usuário.

## 🔍 Tipos de Links para Verificar
- [ ] Links internos entre páginas
- [ ] Links para seções (#anchors)
- [ ] Links para imagens
- [ ] Links externos
- [ ] Links no footer e navbar

## 📋 Páginas Prioritárias
- [ ] Página inicial
- [ ] Seção de integrações
- [ ] Tutoriais básicos
- [ ] Documentação de API
- [ ] Páginas de contribuição

## 🔧 Ferramentas para Usar
- [ ] Script de auditoria automática
- [ ] Verificação manual
- [ ] Teste de build do Docusaurus
- [ ] Verificação de links externos

## ✅ Critérios de Aceitação
- [ ] Todos os links funcionando
- [ ] Build sem warnings
- [ ] Navegação fluida
- [ ] Documentação atualizada

## 🎯 Impacto
**Alto** - Links quebrados prejudicam credibilidade e experiência.`,
    labels: ['🟠 Conteúdo Importante', '🔗 Links Quebrados', '🔍 Auditoria', '🔄 Atualizando']
  },

  {
    title: '🟠 [ALTA] Melhorar qualidade dos textos existentes',
    body: `## 🎯 Problema
Muitos textos podem ser melhorados em clareza, objetividade e adequação ao português brasileiro.

## 📋 Aspectos a Melhorar
### Clareza e Objetividade
- [ ] Simplificar frases complexas
- [ ] Eliminar jargões desnecessários
- [ ] Usar voz ativa quando possível
- [ ] Estruturar informações logicamente

### Português Brasileiro
- [ ] Usar terminologia brasileira
- [ ] Adequar exemplos ao contexto nacional
- [ ] Verificar concordância e regência
- [ ] Padronizar termos técnicos

### Aspecto Didático
- [ ] Adicionar mais exemplos práticos
- [ ] Criar analogias quando útil
- [ ] Estruturar conteúdo progressivamente
- [ ] Incluir dicas e avisos importantes

## 🎯 Páginas Prioritárias
- [ ] Tutoriais básicos
- [ ] Documentação de integrações
- [ ] Guias de instalação
- [ ] Seção de contribuição

## ✅ Critérios de Aceitação
- [ ] Texto mais claro e objetivo
- [ ] Português brasileiro correto
- [ ] Melhor experiência de leitura
- [ ] Feedback positivo da comunidade

## 🎯 Impacto
**Alto** - Qualidade do texto afeta diretamente a compreensão.`,
    labels: ['🟠 Conteúdo Importante', '🇧🇷 Português BR', '📖 Clareza', '👀 Revisando', '🎓 Educacional']
  },

  {
    title: '🟡 [MÉDIA] Expandir conteúdo das integrações brasileiras',
    body: `## 🎯 Problema
As integrações específicas para o Brasil precisam de mais conteúdo e exemplos práticos.

## 📋 Integrações a Expandir
### Financeiro
- [ ] \`docs/integracoes-br/financeiro/pix.md\` - Adicionar mais exemplos
- [ ] Integração com bancos brasileiros
- [ ] Sistemas de pagamento nacionais
- [ ] Compliance financeiro

### Governo
- [ ] \`docs/integracoes-br/governo/cnpj-receita.md\` - Casos de uso
- [ ] APIs governamentais
- [ ] Compliance fiscal
- [ ] Documentação oficial

### Localização
- [ ] \`docs/integracoes-br/localizacao/viacep.md\` - Exemplos avançados
- [ ] Outros serviços de CEP
- [ ] Geolocalização
- [ ] Mapas e rotas

## 📝 Conteúdo Necessário
- [ ] Exemplos práticos funcionais
- [ ] Casos de uso empresariais
- [ ] Troubleshooting específico
- [ ] Melhores práticas
- [ ] Compliance e regulamentações

## ✅ Critérios de Aceitação
- [ ] Pelo menos 3 exemplos por integração
- [ ] Código testado e funcional
- [ ] Documentação clara
- [ ] Relevância para mercado brasileiro

## 🎯 Impacto
**Médio** - Diferencial competitivo para usuários brasileiros.`,
    labels: ['🟡 Melhoria de Texto', '🇧🇷 Português BR', '🔗 Integrações', '💡 Exemplo', '✍️ Escrevendo']
  },

  {
    title: '🟡 [MÉDIA] Criar sistema de templates para conteúdo',
    body: `## 🎯 Objetivo
Criar templates padronizados para facilitar criação de conteúdo consistente.

## 📋 Templates Necessários
### Para Integrações
- [ ] Template para documentação de nodes
- [ ] Template para casos de uso
- [ ] Template para troubleshooting
- [ ] Template para exemplos práticos

### Para Tutoriais
- [ ] Template para tutorial básico
- [ ] Template para tutorial avançado
- [ ] Template para quickstart
- [ ] Template para workflow completo

### Para Contribuição
- [ ] Template para nova página
- [ ] Template para issue de conteúdo
- [ ] Template para revisão
- [ ] Template para tradução

## 📝 Elementos dos Templates
- [ ] Estrutura de headings padronizada
- [ ] Seções obrigatórias
- [ ] Exemplos de conteúdo
- [ ] Checklist de qualidade
- [ ] Metadados necessários

## ✅ Critérios de Aceitação
- [ ] Templates funcionais e testados
- [ ] Documentação de uso
- [ ] Adoção pela equipe
- [ ] Melhoria na consistência

## 🎯 Impacto
**Médio** - Facilita criação de conteúdo consistente e de qualidade.`,
    labels: ['🟡 Melhoria de Texto', '📋 Referência', '🔧 Guia Técnico', '👥 Colaborativo', '📏 Sem Estrutura']
  },

  {
    title: '🟢 [BAIXA] Implementar sistema de feedback de conteúdo',
    body: `## 🎯 Objetivo
Implementar sistema para coletar feedback dos usuários sobre qualidade do conteúdo.

## 📋 Funcionalidades
### Widget de Feedback
- [ ] "Esta página foi útil?" com sim/não
- [ ] Campo para comentários opcionais
- [ ] Categorização do feedback
- [ ] Integração com GitHub Issues

### Analytics de Conteúdo
- [ ] Páginas mais visitadas
- [ ] Páginas com mais feedback negativo
- [ ] Tempo de permanência
- [ ] Taxa de rejeição

### Processo de Melhoria
- [ ] Revisão periódica do feedback
- [ ] Priorização de melhorias
- [ ] Acompanhamento de resultados
- [ ] Comunicação com usuários

## 🔧 Implementação
- [ ] Componente React para feedback
- [ ] API para coleta de dados
- [ ] Dashboard de análise
- [ ] Automação de issues

## ✅ Critérios de Aceitação
- [ ] Sistema funcional implementado
- [ ] Dados sendo coletados
- [ ] Processo de melhoria estabelecido
- [ ] Métricas de qualidade melhorando

## 🎯 Impacto
**Baixo** - Melhoria contínua baseada em feedback real.`,
    labels: ['🟢 Polimento', '🔍 Auditoria', '👥 Colaborativo', '📊 Analytics']
  }
];

class ContentManagementProject {
  constructor() {
    // Remover inicialização do Octokit aqui
  }

  async createProject() {
    try {
      console.log('📝 Criando projeto de Gerenciamento de Conteúdo...\n');
      
      // Inicializar Octokit com import dinâmico
      const { Octokit } = await import('@octokit/rest');
      this.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
      
      // 1. Limpar labels existentes (opcional)
      if (process.argv.includes('--clean-labels')) {
        await this.cleanExistingLabels();
      }
      
      // 2. Criar labels especializadas
      console.log('🏷️ Criando labels de conteúdo...');
      await this.createContentLabels();
      
      // 3. Fechar issues existentes (opcional)
      if (process.argv.includes('--close-existing')) {
        await this.closeExistingIssues();
      }
      
      // 4. Criar issues de conteúdo
      console.log('📋 Criando issues de conteúdo...');
      await this.createContentIssues();
      
      // 5. Criar project board
      console.log('📊 Criando project board...');
      await this.createProjectBoard();
      
      console.log('\n✅ Projeto de Gerenciamento de Conteúdo criado com sucesso!');
      this.printSummary();
      
    } catch (error) {
      console.error('❌ Erro ao criar projeto:', error.message);
      process.exit(1);
    }
  }

  async cleanExistingLabels() {
    console.log('🧹 Limpando labels existentes...');
    
    try {
      const { data: labels } = await this.octokit.rest.issues.listLabelsForRepo({
        owner: REPO_OWNER,
        repo: REPO_NAME,
      });

      const defaultLabels = ['bug', 'documentation', 'duplicate', 'enhancement', 'good first issue', 'help wanted', 'invalid', 'question', 'wontfix'];

      for (const label of labels) {
        if (!defaultLabels.includes(label.name)) {
          try {
            await this.octokit.rest.issues.deleteLabel({
              owner: REPO_OWNER,
              repo: REPO_NAME,
              name: label.name,
            });
            console.log(`  ✅ Label removido: ${label.name}`);
          } catch (error) {
            console.log(`  ⚠️ Erro ao remover label ${label.name}: ${error.message}`);
          }
        }
      }
    } catch (error) {
      console.log(`⚠️ Erro ao listar labels: ${error.message}`);
    }
  }

  async createContentLabels() {
    for (const label of CONTENT_LABELS) {
      try {
        await this.octokit.rest.issues.createLabel({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          name: label.name,
          color: label.color,
          description: label.description,
        });
        console.log(`  ✅ Label criado: ${label.name}`);
      } catch (error) {
        if (error.status === 422) {
          console.log(`  ⚠️ Label já existe: ${label.name}`);
        } else {
          console.log(`  ❌ Erro ao criar label ${label.name}: ${error.message}`);
        }
      }
    }
  }

  async closeExistingIssues() {
    console.log('📋 Fechando issues existentes...');
    
    try {
      const { data: issues } = await this.octokit.rest.issues.listForRepo({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        state: 'open'
      });

      for (const issue of issues) {
        if (!issue.pull_request) {
          await this.octokit.rest.issues.update({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            issue_number: issue.number,
            state: 'closed'
          });
          console.log(`  ✅ Issue fechada: #${issue.number} - ${issue.title}`);
        }
      }
    } catch (error) {
      console.log(`⚠️ Erro ao fechar issues: ${error.message}`);
    }
  }

  async createContentIssues() {
    for (const issue of CONTENT_ISSUES) {
      try {
        const { data: createdIssue } = await this.octokit.rest.issues.create({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          title: issue.title,
          body: issue.body,
          labels: issue.labels,
        });
        
        console.log(`  ✅ Issue criada: ${createdIssue.html_url}`);
      } catch (error) {
        console.log(`  ❌ Erro ao criar issue "${issue.title}": ${error.message}`);
      }
    }
  }

  async createProjectBoard() {
    try {
      const { data: project } = await this.octokit.rest.projects.createForRepo({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        name: '📝 Gerenciamento de Conteúdo',
        body: 'Projeto dedicado à qualidade, atualização e melhoria do conteúdo da documentação n8n Brasil'
      });

      console.log(`  ✅ Project board criado: ${project.html_url}`);

      // Criar colunas
      const columns = [
        '📋 Backlog',
        '🔴 Crítico',
        '🟠 Alta Prioridade',
        '🟡 Média Prioridade',
        '✍️ Escrevendo',
        '👀 Revisando',
        '✅ Concluído'
      ];

      for (const columnName of columns) {
        try {
          await this.octokit.rest.projects.createColumn({
            project_id: project.id,
            name: columnName,
          });
          console.log(`    ✅ Coluna criada: ${columnName}`);
        } catch (error) {
          console.log(`    ❌ Erro ao criar coluna ${columnName}: ${error.message}`);
        }
      }

      return project;
    } catch (error) {
      console.log(`❌ Erro ao criar project board: ${error.message}`);
      return null;
    }
  }

  printSummary() {
    console.log('\n📊 **RESUMO DO PROJETO CRIADO**');
    console.log(`   🏷️ Labels criados: ${CONTENT_LABELS.length}`);
    console.log(`   📋 Issues criadas: ${CONTENT_ISSUES.length}`);
    console.log('   📊 Project board: 📝 Gerenciamento de Conteúdo');
    
    console.log('\n🎯 **PRÓXIMOS PASSOS**');
    console.log('   1. Execute o script de auditoria: npm run audit-content');
    console.log('   2. Adicione as issues ao project board');
    console.log('   3. Priorize as issues críticas');
    console.log('   4. Comece pelas páginas "Em Construção"');
    console.log('   5. Estabeleça processo de revisão');
    
    console.log('\n💡 **DICAS**');
    console.log('   • Use templates para manter consistência');
    console.log('   • Foque na experiência do usuário');
    console.log('   • Teste todo conteúdo prático');
    console.log('   • Colete feedback da comunidade');
    console.log('   • Mantenha português brasileiro correto');
  }
}

// Função principal
async function main() {
  if (!process.env.GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN não encontrado nas variáveis de ambiente');
    console.log('💡 Configure o token seguindo as instruções em scripts/env-example.txt');
    process.exit(1);
  }

  const project = new ContentManagementProject();
  await project.createProject();
}

if (require.main === module) {
  main();
}

module.exports = { ContentManagementProject };