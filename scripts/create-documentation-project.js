#!/usr/bin/env node

/**
 * Script para criar sistema completo de documentação n8n Brasil
 * Cria labels especializados e issues baseadas na análise da documentação oficial
 */

const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const OWNER = 'tatyquebralayout';
const REPO = 'n8n-Doc-pt-BR';

// Labels especializados para documentação
const DOCUMENTATION_LABELS = [
  // === PRIORIDADES ===
  { name: '🔴 Crítica', color: 'B60205', description: 'Conteúdo crítico para funcionalidade básica' },
  { name: '🟠 Alta', color: 'D93F0B', description: 'Conteúdo importante para usuários avançados' },
  { name: '🟡 Média', color: 'FBCA04', description: 'Conteúdo útil mas não essencial' },
  { name: '🟢 Baixa', color: '0E8A16', description: 'Conteúdo complementar ou de referência' },

  // === TIPOS DE CONTEÚDO ===
  { name: '📝 Tradução', color: '1D76DB', description: 'Tradução de conteúdo oficial do n8n' },
  { name: '🆕 Criação', color: '0052CC', description: 'Criação de conteúdo original brasileiro' },
  { name: '🔄 Atualização', color: '5319E7', description: 'Atualização de conteúdo existente' },
  { name: '✅ Revisão', color: '006B75', description: 'Revisão e melhoria de qualidade' },

  // === SEÇÕES DA DOCUMENTAÇÃO ===
  { name: '🚀 Getting Started', color: 'FF6B6B', description: 'Primeiros passos e quickstarts' },
  { name: '⚙️ Interface', color: 'FFA726', description: 'Navegação e uso da interface' },
  { name: '🔗 Integrações', color: '66BB6A', description: 'Nodes, conectores e integrações' },
  { name: '🏗️ Hosting', color: '42A5F5', description: 'Instalação, configuração e hosting' },
  { name: '💾 Dados', color: '9C27B0', description: 'Manipulação e estrutura de dados' },
  { name: '🤖 AI Avançada', color: 'E91E63', description: 'IA, LangChain e automação inteligente' },
  { name: '🔌 API', color: '795548', description: 'API REST e integração programática' },
  { name: '📦 Embed', color: '607D8B', description: 'Incorporação do n8n em aplicações' },

  // === INTEGRAÇÕES BRASILEIRAS ===
  { name: '🇧🇷 PIX', color: '00C853', description: 'Integração com sistema PIX brasileiro' },
  { name: '🇧🇷 Governo', color: '2E7D32', description: 'APIs governamentais brasileiras' },
  { name: '🇧🇷 E-commerce', color: '1976D2', description: 'Marketplaces e e-commerce brasileiro' },
  { name: '🇧🇷 Localização', color: '1565C0', description: 'CEP, endereços e localização' },

  // === TIPOS DE DOCUMENTAÇÃO ===
  { name: '📖 Tutorial', color: 'FFB74D', description: 'Tutoriais passo a passo' },
  { name: '📋 Referência', color: 'A1887F', description: 'Documentação de referência técnica' },
  { name: '💡 Exemplo', color: 'F06292', description: 'Exemplos práticos e casos de uso' },
  { name: '🎯 Caso de Uso', color: 'BA68C8', description: 'Casos de uso específicos' },

  // === QUALIDADE E ESTADO ===
  { name: '🔍 Precisa Revisão', color: 'FFC107', description: 'Conteúdo que precisa de revisão' },
  { name: '📏 Padrão', color: '8BC34A', description: 'Adequação aos padrões de documentação' },
  { name: '🔗 Links Quebrados', color: 'F44336', description: 'Links ou referências quebradas' },
  { name: '🌐 SEO', color: '3F51B5', description: 'Otimização para mecanismos de busca' },

  // === ESPECIAIS ===
  { name: '👥 Boa Primeira Issue', color: '7057FF', description: 'Ideal para novos contribuidores' },
  { name: '💬 Discussão', color: 'EDEDED', description: 'Requer discussão da comunidade' },
  { name: '📋 Epic', color: '8B5CF6', description: 'Grande conjunto de tarefas relacionadas' },
  { name: '🚫 Bloqueada', color: '6B7280', description: 'Bloqueada por dependência externa' }
];

// Issues de documentação baseadas na análise
const DOCUMENTATION_ISSUES = [
  // === CRÍTICAS - Conteúdo essencial faltante ===
  {
    title: '🚀 Criar seção completa de Getting Started',
    body: `## Descrição
A seção Getting Started precisa ser completamente criada com conteúdo traduzido e adaptado para brasileiros.

## Conteúdo Necessário
- [ ] **Quickstart muito rápido** - Tutorial de 5 minutos
- [ ] **Introdução mais longa** - Tutorial detalhado
- [ ] **Escolher seu n8n** - Cloud vs Self-hosted
- [ ] **Cursos em vídeo** - Integração com YouTube
- [ ] **Cursos em texto** - Níveis 1 e 2 completos

## Referência Oficial
- https://docs.n8n.io/getting-started/
- https://docs.n8n.io/getting-started/quickstarts/

## Critérios de Aceitação
- [ ] Todos os quickstarts traduzidos
- [ ] Exemplos adaptados para contexto brasileiro
- [ ] Links funcionais para recursos externos
- [ ] Navegação clara entre seções

## Estimativa
40-60 horas de trabalho`,
    labels: ['🔴 Crítica', '📝 Tradução', '🚀 Getting Started', '📖 Tutorial', '📋 Epic']
  },

  {
    title: '🔗 Traduzir documentação completa de Integrações',
    body: `## Descrição
A documentação oficial do n8n possui mais de 400 integrações que precisam ser traduzidas e categorizadas.

## Escopo Identificado
### Nodes Integrados (Built-in)
- [ ] **Core Nodes** - 50+ nodes essenciais
- [ ] **Action Nodes** - 200+ integrações de aplicações
- [ ] **Trigger Nodes** - 80+ triggers de eventos
- [ ] **Cluster Nodes** - Nodes de IA e LangChain

### Categorias Principais
- [ ] Comunicação (Discord, Slack, Telegram, Gmail)
- [ ] Produtividade (Google Sheets, Notion, Airtable)
- [ ] Desenvolvimento (GitHub, GitLab, Jenkins)
- [ ] E-commerce (Shopify, WooCommerce, Stripe)
- [ ] Marketing (Mailchimp, HubSpot, ActiveCampaign)

## Priorização
1. **Crítica**: Top 20 integrações mais usadas
2. **Alta**: Integrações populares no Brasil
3. **Média**: Integrações específicas de nicho
4. **Baixa**: Integrações menos comuns

## Estimativa
120-180 horas de trabalho`,
    labels: ['🔴 Crítica', '📝 Tradução', '🔗 Integrações', '📋 Epic']
  },

  {
    title: '🏗️ Criar documentação completa de Hosting',
    body: `## Descrição
Documentação de instalação, configuração e hosting precisa ser criada com foco no contexto brasileiro.

## Conteúdo Necessário
### Instalação
- [ ] **npm** - Instalação via Node.js
- [ ] **Docker** - Containerização
- [ ] **Cloud** - n8n Cloud vs alternativas

### Configuração Avançada
- [ ] **Variáveis de ambiente** - Todas as opções
- [ ] **Banco de dados** - PostgreSQL, MySQL
- [ ] **Segurança** - SSL, autenticação, RBAC
- [ ] **Performance** - Queue mode, scaling

### Provedores Brasileiros
- [ ] **Hospedagem nacional** - UOL Host, Locaweb
- [ ] **Cloud brasileiro** - OVHcloud Brasil
- [ ] **VPS nacionais** - Contabo, Vultr

## Referência Oficial
- https://docs.n8n.io/hosting/

## Estimativa
60-80 horas de trabalho`,
    labels: ['🔴 Crítica', '📝 Tradução', '🏗️ Hosting', '📖 Tutorial']
  },

  // === ALTA PRIORIDADE - Conteúdo importante ===
  {
    title: '🤖 Traduzir documentação de AI Avançada',
    body: `## Descrição
A seção Advanced AI é fundamental para usuários que querem usar IA com n8n.

## Conteúdo Oficial
- [ ] **Tutorial de IA** - Build AI workflow
- [ ] **RAG** - Retrieval Augmented Generation
- [ ] **LangChain** - Integração completa
- [ ] **Evaluations** - Avaliação de modelos
- [ ] **Exemplos** - Casos práticos

## Adaptações Brasileiras
- [ ] Exemplos com dados brasileiros
- [ ] Integração com APIs nacionais
- [ ] Casos de uso para empresas BR
- [ ] Compliance e LGPD

## Estimativa
50-70 horas de trabalho`,
    labels: ['🟠 Alta', '📝 Tradução', '🤖 AI Avançada', '💡 Exemplo']
  },

  {
    title: '🔌 Criar documentação completa da API',
    body: `## Descrição
Documentação da API REST do n8n para desenvolvedores.

## Conteúdo Necessário
- [ ] **Autenticação** - API keys, tokens
- [ ] **Endpoints** - Todos os recursos
- [ ] **Playground** - Interface interativa
- [ ] **Exemplos** - Código em múltiplas linguagens

## Referência Oficial
- https://docs.n8n.io/api/

## Estimativa
30-40 horas de trabalho`,
    labels: ['🟠 Alta', '📝 Tradução', '🔌 API', '📋 Referência']
  },

  {
    title: '💾 Traduzir documentação de Dados e Lógica',
    body: `## Descrição
Conceitos fundamentais sobre manipulação de dados e lógica de fluxo.

## Conteúdo Principal
### Lógica de Fluxo
- [ ] **Condicionais** - If/Switch
- [ ] **Loops** - Iteração de dados
- [ ] **Merge** - Combinação de dados
- [ ] **Error Handling** - Tratamento de erros
- [ ] **Sub-workflows** - Workflows aninhados

### Estrutura de Dados
- [ ] **Data Structure** - Como funciona
- [ ] **Data Flow** - Fluxo entre nodes
- [ ] **Transformações** - Manipulação
- [ ] **Binary Data** - Arquivos e mídia

## Estimativa
40-50 horas de trabalho`,
    labels: ['🟠 Alta', '📝 Tradução', '💾 Dados', '📖 Tutorial']
  },

  // === INTEGRAÇÕES BRASILEIRAS - Conteúdo original ===
  {
    title: '🇧🇷 Criar integração completa com PIX',
    body: `## Descrição
Criar documentação completa para integração com o sistema PIX brasileiro.

## Conteúdo a Criar
- [ ] **Introdução ao PIX** - Como funciona
- [ ] **APIs disponíveis** - Bancos e fintechs
- [ ] **Workflows práticos** - Exemplos reais
- [ ] **Segurança** - Boas práticas
- [ ] **Compliance** - Regulamentações

## Integrações Específicas
- [ ] Banco do Brasil
- [ ] Itaú
- [ ] Bradesco
- [ ] Nubank
- [ ] PagSeguro
- [ ] Mercado Pago

## Estimativa
60-80 horas de trabalho`,
    labels: ['🟠 Alta', '🆕 Criação', '🇧🇷 PIX', '🎯 Caso de Uso']
  },

  {
    title: '🇧🇷 Documentar APIs governamentais brasileiras',
    body: `## Descrição
Criar documentação para integração com APIs do governo brasileiro.

## APIs Prioritárias
- [ ] **Receita Federal** - CNPJ, CPF
- [ ] **IBGE** - Dados demográficos
- [ ] **Banco Central** - Dados financeiros
- [ ] **TSE** - Dados eleitorais
- [ ] **INSS** - Dados previdenciários

## Casos de Uso
- [ ] Validação de documentos
- [ ] Consulta de empresas
- [ ] Dados econômicos
- [ ] Compliance fiscal

## Estimativa
40-60 horas de trabalho`,
    labels: ['🟠 Alta', '🆕 Criação', '🇧🇷 Governo', '💡 Exemplo']
  },

  // === MÉDIA PRIORIDADE - Conteúdo útil ===
  {
    title: '📦 Traduzir documentação de Embed',
    body: `## Descrição
Documentação para incorporar n8n em aplicações externas.

## Conteúdo Oficial
- [ ] **Pré-requisitos** - Configuração inicial
- [ ] **Deploy** - Implementação
- [ ] **Configuração** - Customização
- [ ] **White labelling** - Marca própria

## Estimativa
20-30 horas de trabalho`,
    labels: ['🟡 Média', '📝 Tradução', '📦 Embed', '📖 Tutorial']
  },

  {
    title: '🔍 Criar sistema de busca e navegação',
    body: `## Descrição
Implementar sistema de busca eficiente e melhorar navegação.

## Funcionalidades
- [ ] **Busca semântica** - Algolia ou similar
- [ ] **Filtros** - Por categoria, tipo, dificuldade
- [ ] **Tags** - Sistema de etiquetas
- [ ] **Breadcrumbs** - Navegação hierárquica

## Estimativa
30-40 horas de trabalho`,
    labels: ['🟡 Média', '🆕 Criação', '🌐 SEO', '⚙️ Interface']
  },

  {
    title: '🎯 Criar casos de uso específicos para Brasil',
    body: `## Descrição
Desenvolver casos de uso práticos adaptados para o mercado brasileiro.

## Casos Prioritários
- [ ] **E-commerce** - Integração Mercado Livre + ERP
- [ ] **Fintech** - Automação bancária
- [ ] **Agronegócio** - IoT + gestão rural
- [ ] **Educação** - Automação escolar
- [ ] **Saúde** - Telemedicina e prontuários

## Formato
- [ ] Tutorial passo a passo
- [ ] Workflow exportável
- [ ] Vídeo explicativo
- [ ] Documentação técnica

## Estimativa
80-100 horas de trabalho`,
    labels: ['🟡 Média', '🆕 Criação', '🎯 Caso de Uso', '🇧🇷 E-commerce']
  },

  // === BAIXA PRIORIDADE - Conteúdo complementar ===
  {
    title: '📚 Criar glossário técnico português-inglês',
    body: `## Descrição
Glossário completo de termos técnicos do n8n em português.

## Conteúdo
- [ ] **Termos básicos** - Node, Workflow, Trigger
- [ ] **Conceitos avançados** - Webhook, API, OAuth
- [ ] **Traduções** - Equivalências PT-EN
- [ ] **Exemplos** - Uso em contexto

## Estimativa
15-20 horas de trabalho`,
    labels: ['🟢 Baixa', '🆕 Criação', '📋 Referência', '📚 Glossário']
  },

  {
    title: '🎨 Melhorar design e UX da documentação',
    body: `## Descrição
Aprimorar visual e experiência do usuário da documentação.

## Melhorias
- [ ] **Dark mode** - Tema escuro
- [ ] **Responsividade** - Mobile-first
- [ ] **Acessibilidade** - WCAG compliance
- [ ] **Performance** - Otimização de carregamento

## Estimativa
40-50 horas de trabalho`,
    labels: ['🟢 Baixa', '🔄 Atualização', '⚙️ Interface', '🎨 Design']
  }
];

// Função para limpar labels existentes
async function cleanExistingLabels() {
  try {
    console.log('🧹 Limpando labels existentes...');
    
    const { data: existingLabels } = await octokit.rest.issues.listLabelsForRepo({
      owner: OWNER,
      repo: REPO,
    });

    // Manter apenas labels padrão do GitHub
    const defaultLabels = ['bug', 'documentation', 'duplicate', 'enhancement', 'good first issue', 'help wanted', 'invalid', 'question', 'wontfix'];
    
    for (const label of existingLabels) {
      if (!defaultLabels.includes(label.name)) {
        await octokit.rest.issues.deleteLabel({
          owner: OWNER,
          repo: REPO,
          name: label.name,
        });
        console.log(`   ❌ Removido: ${label.name}`);
      }
    }
    
    console.log('✅ Limpeza concluída');
  } catch (error) {
    console.error('❌ Erro ao limpar labels:', error.message);
  }
}

// Função para criar labels
async function createLabels() {
  try {
    console.log('🏷️  Criando labels de documentação...');
    
    for (const label of DOCUMENTATION_LABELS) {
      try {
        await octokit.rest.issues.createLabel({
          owner: OWNER,
          repo: REPO,
          name: label.name,
          color: label.color,
          description: label.description,
        });
        console.log(`   ✅ Criado: ${label.name}`);
      } catch (error) {
        if (error.status === 422) {
          console.log(`   ⚠️  Já existe: ${label.name}`);
        } else {
          console.error(`   ❌ Erro ao criar ${label.name}:`, error.message);
        }
      }
    }
    
    console.log(`✅ ${DOCUMENTATION_LABELS.length} labels criados/verificados`);
  } catch (error) {
    console.error('❌ Erro ao criar labels:', error.message);
  }
}

// Função para fechar issues existentes
async function closeExistingIssues() {
  try {
    console.log('🔒 Fechando issues existentes...');
    
    const { data: existingIssues } = await octokit.rest.issues.listForRepo({
      owner: OWNER,
      repo: REPO,
      state: 'open',
    });

    for (const issue of existingIssues) {
      if (!issue.pull_request) { // Não fechar PRs
        await octokit.rest.issues.update({
          owner: OWNER,
          repo: REPO,
          issue_number: issue.number,
          state: 'closed',
        });
        console.log(`   🔒 Fechada issue #${issue.number}: ${issue.title}`);
      }
    }
    
    console.log('✅ Issues fechadas');
  } catch (error) {
    console.error('❌ Erro ao fechar issues:', error.message);
  }
}

// Função para criar issues
async function createIssues() {
  try {
    console.log('📝 Criando issues de documentação...');
    
    for (let i = 0; i < DOCUMENTATION_ISSUES.length; i++) {
      const issue = DOCUMENTATION_ISSUES[i];
      
      try {
        const response = await octokit.rest.issues.create({
          owner: OWNER,
          repo: REPO,
          title: issue.title,
          body: issue.body,
          labels: issue.labels,
        });
        
        console.log(`   ✅ Issue #${response.data.number}: ${issue.title}`);
        
        // Delay para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`   ❌ Erro ao criar issue "${issue.title}":`, error.message);
      }
    }
    
    console.log(`✅ ${DOCUMENTATION_ISSUES.length} issues criadas`);
  } catch (error) {
    console.error('❌ Erro ao criar issues:', error.message);
  }
}

// Função para criar projeto
async function createProject() {
  try {
    console.log('📋 Criando projeto de documentação...');
    
    const response = await octokit.rest.projects.createForRepo({
      owner: OWNER,
      repo: REPO,
      name: '📚 Documentação n8n Brasil',
      body: 'Projeto para gerenciar toda a criação, tradução e manutenção da documentação n8n em português brasileiro.',
    });
    
    console.log(`✅ Projeto criado: ${response.data.html_url}`);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao criar projeto:', error.message);
    return null;
  }
}

// Função principal
async function main() {
  try {
    console.log('🚀 Iniciando criação do sistema de documentação n8n Brasil...\n');
    
    // 1. Limpar labels existentes
    await cleanExistingLabels();
    console.log('');
    
    // 2. Criar labels especializados
    await createLabels();
    console.log('');
    
    // 3. Fechar issues existentes
    await closeExistingIssues();
    console.log('');
    
    // 4. Criar issues de documentação
    await createIssues();
    console.log('');
    
    // 5. Criar projeto
    const project = await createProject();
    console.log('');
    
    // Resumo final
    console.log('🎉 SISTEMA DE DOCUMENTAÇÃO CRIADO COM SUCESSO!');
    console.log('');
    console.log('📊 RESUMO:');
    console.log(`   🏷️  ${DOCUMENTATION_LABELS.length} labels especializados`);
    console.log(`   📝 ${DOCUMENTATION_ISSUES.length} issues de documentação`);
    console.log(`   📋 1 projeto de gerenciamento`);
    console.log('');
    console.log('🎯 PRÓXIMOS PASSOS:');
    console.log('   1. Revisar e priorizar issues criadas');
    console.log('   2. Adicionar issues ao projeto');
    console.log('   3. Começar pelas issues críticas');
    console.log('   4. Configurar automações do projeto');
    
    if (project) {
      console.log(`   5. Acessar projeto: ${project.html_url}`);
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
    process.exit(1);
  }
}

// Executar script
if (require.main === module) {
  main();
}

module.exports = {
  createLabels,
  createIssues,
  createProject,
  DOCUMENTATION_LABELS,
  DOCUMENTATION_ISSUES
}; 
