#!/usr/bin/env node

/**
 * Script para automatizar criação de projetos GitHub para n8n-Doc-pt-BR
 * Uso: node scripts/setup-github-projects.js
 * 
 * Pré-requisitos:
 * 1. npm install @octokit/rest
 * 2. Configurar GITHUB_TOKEN nas variáveis de ambiente
 */

require('dotenv').config();

const REPO_OWNER = process.env.REPO_OWNER || 'tatyquebralayout';
const REPO_NAME = process.env.REPO_NAME || 'n8n-Doc-pt-BR';

// Estrutura de issues organizadas por categorias
const issueCategories = [
  {
    title: '📝 Documentação Core',
    color: 'D73A4A',
    issues: [
      {
        title: '📚 Revisão da documentação de instalação',
        body: `## Objetivo
Revisar e atualizar toda a documentação de instalação do n8n

## Tarefas
- [ ] Verificar compatibilidade com versões atuais
- [ ] Atualizar screenshots e exemplos
- [ ] Testar instruções passo a passo
- [ ] Adicionar troubleshooting comum

## Critérios de Aceitação
- Documentação testada e funcional
- Screenshots atualizados
- Linguagem clara e objetiva`,
        labels: ['📝 documentação', 'alta prioridade', 'core']
      },
      {
        title: '🔧 Documentação de configuração avançada',
        body: `## Objetivo
Criar documentação detalhada para configurações avançadas

## Tarefas
- [ ] Configurações de ambiente
- [ ] Integração com bancos de dados
- [ ] Configurações de segurança
- [ ] Performance tuning

## Critérios de Aceitação
- Guias completos para cada tópico
- Exemplos práticos incluídos`,
        labels: ['📝 documentação', 'média prioridade', 'configuração']
      },
      {
        title: '📖 Guia de contribuição para o projeto',
        body: `## Objetivo
Criar guia completo para novos contribuidores

## Tarefas
- [ ] Definir processo de contribuição
- [ ] Criar templates de issues/PRs
- [ ] Documentar coding standards
- [ ] Criar guia de setup local

## Critérios de Aceitação
- Processo claro e bem documentado
- Templates funcionais
- Facilita onboarding de novos contribuidores`,
        labels: ['📝 documentação', 'baixa prioridade', 'contribuição']
      }
    ]
  },
  {
    title: '🎨 Design System & UX',
    color: '0075CA',
    issues: [
      {
        title: '🎨 Implementar design system consistente',
        body: `## Objetivo
Criar sistema de design consistente para toda a documentação

## Tarefas
- [ ] Definir paleta de cores
- [ ] Criar componentes reutilizáveis
- [ ] Padronizar tipografia
- [ ] Implementar tokens de design

## Critérios de Aceitação
- Visual consistente em todas as páginas
- Componentes bem documentados
- Facilita manutenção futura`,
        labels: ['🎨 design', 'alta prioridade', 'sistema']
      },
      {
        title: '📱 Otimização para dispositivos móveis',
        body: `## Objetivo
Garantir excelente experiência em dispositivos móveis

## Tarefas
- [ ] Testar responsividade
- [ ] Otimizar navegação mobile
- [ ] Ajustar componentes para touch
- [ ] Verificar performance mobile

## Critérios de Aceitação
- Layout responsivo funcional
- Navegação fácil em mobile
- Performance otimizada`,
        labels: ['🎨 design', 'média prioridade', 'mobile']
      },
      {
        title: '♿ Implementar acessibilidade (a11y)',
        body: `## Objetivo
Tornar a documentação acessível para todos os usuários

## Tarefas
- [ ] Implementar navegação por teclado
- [ ] Adicionar alt-text em imagens
- [ ] Verificar contraste de cores
- [ ] Implementar ARIA labels

## Critérios de Aceitação
- Conformidade com WCAG 2.1
- Testado com screen readers
- Navegação completa por teclado`,
        labels: ['🎨 design', 'alta prioridade', 'acessibilidade']
      }
    ]
  },
  {
    title: '🌎 Localização & Brasil',
    color: '0E8A16',
    issues: [
      {
        title: '🇧🇷 Integração com APIs brasileiras',
        body: `## Objetivo
Documentar integrações específicas para o mercado brasileiro

## Tarefas
- [ ] Integração com Correios
- [ ] APIs de bancos brasileiros
- [ ] Sistemas de pagamento nacionais
- [ ] Compliance LGPD

## Critérios de Aceitação
- Exemplos práticos funcionais
- Documentação clara e detalhada
- Casos de uso reais`,
        labels: ['🌎 brasil', 'alta prioridade', 'apis']
      },
      {
        title: '💼 Casos de uso para empresas brasileiras',
        body: `## Objetivo
Criar exemplos práticos para o contexto empresarial brasileiro

## Tarefas
- [ ] Automação de NFe
- [ ] Integração com ERPs nacionais
- [ ] Workflows para RH brasileiro
- [ ] Compliance fiscal

## Critérios de Aceitação
- Casos de uso documentados
- Exemplos testados e funcionais
- Relevância para mercado brasileiro`,
        labels: ['🌎 brasil', 'média prioridade', 'casos-de-uso']
      },
      {
        title: '📋 Conformidade LGPD e regulamentações',
        body: `## Objetivo
Documentar como usar n8n respeitando a LGPD

## Tarefas
- [ ] Guias de privacidade
- [ ] Configurações de segurança
- [ ] Documentação de compliance
- [ ] Templates para adequação

## Critérios de Aceitação
- Conformidade clara com LGPD
- Guias práticos de implementação
- Templates prontos para uso`,
        labels: ['🌎 brasil', 'alta prioridade', 'compliance']
      }
    ]
  },
  {
    title: '🚀 Infraestrutura & Deploy',
    color: 'F9D71C',
    issues: [
      {
        title: '⚙️ Configurar CI/CD automatizado',
        body: `## Objetivo
Implementar pipeline de CI/CD para o projeto

## Tarefas
- [ ] Configurar GitHub Actions
- [ ] Automatizar testes
- [ ] Deploy automático
- [ ] Verificação de qualidade

## Critérios de Aceitação
- Pipeline funcionando
- Deploys automáticos
- Testes passando`,
        labels: ['🚀 infra', 'alta prioridade', 'ci-cd']
      },
      {
        title: '📊 Implementar analytics e monitoramento',
        body: `## Objetivo
Configurar sistema de analytics para acompanhar uso

## Tarefas
- [ ] Configurar Google Analytics
- [ ] Implementar métricas de performance
- [ ] Dashboard de monitoramento
- [ ] Alertas automáticos

## Critérios de Aceitação
- Analytics funcionando
- Métricas coletadas
- Dashboard operacional`,
        labels: ['🚀 infra', 'média prioridade', 'analytics']
      },
      {
        title: '🐛 Sistema de tracking de bugs',
        body: `## Objetivo
Implementar sistema para rastreamento e correção de bugs

## Tarefas
- [ ] Configurar templates de issues
- [ ] Sistema de labels
- [ ] Processo de triagem
- [ ] SLA para correções

## Critérios de Aceitação
- Sistema organizado
- Processo claro definido
- Tempo de resposta otimizado`,
        labels: ['🚀 infra', 'média prioridade', 'bugs']
      }
    ]
  }
];

async function createLabels(octokit) {
  console.log('🏷️ Criando labels...');
  
  const labelsToCreate = [
    { name: '📝 documentação', color: 'D73A4A', description: 'Melhorias na documentação' },
    { name: '🎨 design', color: '0075CA', description: 'Melhorias no design e UX' },
    { name: '🌎 brasil', color: '0E8A16', description: 'Específico para mercado brasileiro' },
    { name: '🚀 infra', color: 'F9D71C', description: 'Infraestrutura e deploy' },
    { name: 'alta prioridade', color: 'B60205', description: 'Alta prioridade' },
    { name: 'média prioridade', color: 'FBCA04', description: 'Média prioridade' },
    { name: 'baixa prioridade', color: '0E8A16', description: 'Baixa prioridade' },
    { name: 'core', color: '5319E7', description: 'Funcionalidade core' },
    { name: 'configuração', color: 'C2E0C6', description: 'Configurações e setup' },
    { name: 'contribuição', color: 'C5DEF5', description: 'Contribuições da comunidade' },
    { name: 'sistema', color: '0052CC', description: 'Sistema e arquitetura' },
    { name: 'mobile', color: 'FF6B35', description: 'Dispositivos móveis' },
    { name: 'acessibilidade', color: '8B5CF6', description: 'Acessibilidade' },
    { name: 'apis', color: '10B981', description: 'APIs e integrações' },
    { name: 'casos-de-uso', color: '3B82F6', description: 'Casos de uso práticos' },
    { name: 'compliance', color: '6B7280', description: 'Compliance e regulamentações' },
    { name: 'ci-cd', color: 'F59E0B', description: 'CI/CD e automação' },
    { name: 'analytics', color: '8B5CF6', description: 'Analytics e métricas' },
    { name: 'bugs', color: 'EF4444', description: 'Bugs e correções' }
  ];

  for (const label of labelsToCreate) {
    try {
      await octokit.rest.issues.createLabel({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        name: label.name,
        color: label.color,
        description: label.description
      });
      console.log(`  ✅ Label criada: ${label.name}`);
    } catch (error) {
      if (error.status === 422) {
        console.log(`  ➡️ Label já existe: ${label.name}`);
      } else {
        console.log(`  ❌ Erro ao criar label ${label.name}:`, error.message);
      }
    }
  }
}

async function createIssues(octokit) {
  console.log('📋 Criando issues organizadas...');
  
  let totalIssues = 0;
  
  for (const category of issueCategories) {
    console.log(`\n🔨 Categoria: ${category.title}`);
    
    for (const issue of category.issues) {
      try {
        const result = await octokit.rest.issues.create({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          title: issue.title,
          body: issue.body,
          labels: issue.labels
        });
        
        console.log(`  ✅ Issue criada: ${issue.title} (#${result.data.number})`);
        totalIssues++;
      } catch (error) {
        console.log(`  ❌ Erro ao criar issue ${issue.title}:`, error.message);
      }
    }
  }
  
  return totalIssues;
}

async function main() {
  try {
    console.log('🚀 Iniciando configuração do sistema de tarefas GitHub...\n');
    
    console.log(`📁 Repositório: ${REPO_OWNER}/${REPO_NAME}`);
    
    // Importar Octokit dinamicamente
    const { Octokit } = await import('@octokit/rest');
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
    
    // Verificar acesso ao repositório
    try {
      await octokit.rest.repos.get({
        owner: REPO_OWNER,
        repo: REPO_NAME,
      });
      console.log('✅ Acesso ao repositório confirmado\n');
    } catch (error) {
      console.log('❌ Erro: Sem acesso ao repositório ou repositório não encontrado');
      return;
    }
    
    // Criar labels
    await createLabels(octokit);
    
    // Criar issues
    const totalIssues = await createIssues(octokit);
    
    console.log('\n🎉 Configuração concluída!\n');
    console.log('📊 Resumo:');
    console.log(`  ✅ ${totalIssues} issues criadas`);
    console.log(`  🏷️ Labels organizacionais configuradas`);
    
    console.log('\n🔗 Links úteis:');
    console.log(`  📋 Issues: https://github.com/${REPO_OWNER}/${REPO_NAME}/issues`);
    console.log(`  🏷️ Labels: https://github.com/${REPO_OWNER}/${REPO_NAME}/labels`);
    console.log(`  📊 Projeto V2: https://github.com/users/${REPO_OWNER}/projects/7/views/1`);
    
    console.log('\n💡 Próximos passos:');
    console.log('  1. Adicione as issues ao seu projeto V2 manualmente');
    console.log('  2. Configure automações no projeto');
    console.log('  3. Defina milestones e deadlines');
    console.log('  4. Comece a trabalhar nas tarefas! 🚀');
    
  } catch (error) {
    console.error('❌ Erro durante a execução:', error.message);
  }
}

main(); 