require('dotenv').config();

const REPO_OWNER = process.env.REPO_OWNER || 'tatyquebralayout';
const REPO_NAME = process.env.REPO_NAME || 'n8n-Doc-pt-BR';

// Sistema de Labels Organizados
const LABEL_SYSTEM = {
  // Labels de Prioridade
  priority: [
    { name: '🔴 Prioridade: Crítica', color: 'B60205', description: 'Problemas que impedem o funcionamento básico' },
    { name: '🟠 Prioridade: Alta', color: 'D93F0B', description: 'Problemas importantes que afetam a experiência' },
    { name: '🟡 Prioridade: Média', color: 'FBCA04', description: 'Melhorias importantes mas não urgentes' },
    { name: '🟢 Prioridade: Baixa', color: '0E8A16', description: 'Melhorias menores e otimizações' }
  ],
  
  // Labels de Categoria
  category: [
    { name: '🐛 Bug', color: 'D73A4A', description: 'Algo não está funcionando corretamente' },
    { name: '📝 Documentação', color: '0075CA', description: 'Melhorias ou correções na documentação' },
    { name: '🎨 Design/UX', color: 'A2EEEF', description: 'Melhorias de interface e experiência do usuário' },
    { name: '⚡ Performance', color: 'E99695', description: 'Otimizações de velocidade e performance' },
    { name: '🔧 Infraestrutura', color: '7057FF', description: 'Configurações, build, deploy e ferramentas' },
    { name: '🌟 Feature', color: '008672', description: 'Nova funcionalidade ou melhoria' },
    { name: '🧹 Manutenção', color: 'FEF2C0', description: 'Limpeza de código e refatoração' },
    { name: '♿ Acessibilidade', color: '5319E7', description: 'Melhorias de acessibilidade' }
  ],
  
  // Labels de Status
  status: [
    { name: '🚀 Pronto para Desenvolvimento', color: '0052CC', description: 'Issue bem definida e pronta para ser trabalhada' },
    { name: '🔄 Em Progresso', color: 'FBCA04', description: 'Trabalho em andamento' },
    { name: '⏳ Aguardando', color: 'F9D0C4', description: 'Aguardando decisão, feedback ou dependência' },
    { name: '🧪 Em Teste', color: 'C5DEF5', description: 'Implementado, aguardando testes' },
    { name: '✅ Concluído', color: '0E8A16', description: 'Trabalho finalizado com sucesso' },
    { name: '❌ Não Será Feito', color: 'FFFFFF', description: 'Issue fechada sem implementação' }
  ],
  
  // Labels Especiais
  special: [
    { name: '🇧🇷 Brasil Específico', color: '009639', description: 'Funcionalidades específicas para o Brasil' },
    { name: '👥 Boa Primeira Issue', color: '7057FF', description: 'Ideal para novos contribuidores' },
    { name: '💬 Discussão Necessária', color: 'D876E3', description: 'Precisa de discussão antes de implementar' },
    { name: '📋 Epic', color: '3E4B9E', description: 'Issue grande que engloba várias tarefas menores' }
  ]
};

// Issues Organizadas por Análise do Projeto
const COMPREHENSIVE_ISSUES = [
  // CATEGORIA: BUGS CRÍTICOS
  {
    title: '🚨 [CRÍTICO] Corrigir links quebrados na navegação principal',
    body: `## 🎯 Problema
Os links para \`/beta\` e \`/integracoes/overview\` estão quebrados em toda a navegação do site.

## 📍 Localização
- **Navbar**: Link "Beta (Desenvolvimento)" no dropdown de versões
- **Footer**: Link "Integrações" na seção Documentação
- **Impacto**: Todas as páginas do site

## 🔧 Solução Proposta
1. **Opção A**: Criar as páginas faltantes
2. **Opção B**: Remover/substituir os links quebrados
3. **Opção C**: Redirecionar para páginas existentes

## ✅ Critérios de Aceitação
- [ ] Todos os links da navegação funcionam
- [ ] Build sem warnings de links quebrados
- [ ] Navegação consistente em todas as páginas

## 📝 Arquivos Afetados
- \`docusaurus.config.ts\` (linhas 151, 181)
- Possivelmente outros arquivos de configuração

## 🔗 Referência
Identificado durante análise de build: warnings de broken links`,
    labels: ['🔴 Prioridade: Crítica', '🐛 Bug', '🔧 Infraestrutura', '🚀 Pronto para Desenvolvimento']
  },

  {
    title: '🚨 [CRÍTICO] Resolver conflito de rotas em /comunidade/videos/',
    body: `## 🎯 Problema
Conflito de rotas detectado: "Attempting to create page at /n8n-Doc-pt-BR/comunidade/videos/, but a page already exists at this route."

## 📍 Localização
- Provavelmente arquivos duplicados na pasta \`docs/comunidade/\`
- Possível conflito entre \`videos.mdx\` e \`videos/index.mdx\`

## 🔧 Solução Proposta
1. Identificar arquivos conflitantes
2. Consolidar em uma única estrutura
3. Atualizar referências no \`sidebars.ts\`
4. Verificar links internos

## ✅ Critérios de Aceitação
- [ ] Build sem warnings de conflito de rotas
- [ ] Página /comunidade/videos/ acessível
- [ ] Navegação funcionando corretamente

## 🚨 Urgência
Este problema pode causar comportamento não determinístico no roteamento.`,
    labels: ['🔴 Prioridade: Crítica', '🐛 Bug', '🔧 Infraestrutura', '🚀 Pronto para Desenvolvimento']
  },

  // CATEGORIA: DOCUMENTAÇÃO ALTA PRIORIDADE
  {
    title: '📝 [ALTA] Completar páginas essenciais de contribuição',
    body: `## 🎯 Objetivo
Finalizar as páginas fundamentais da seção "Contribuir" que estão marcadas como "Em construção".

## 📋 Páginas a Completar
- [ ] \`docs/contribuir/esta-documentacao/como-contribuir.md\`
- [ ] \`docs/contribuir/esta-documentacao/por-que-contribuir.md\`
- [ ] \`docs/contribuir/esta-documentacao/exemplos-de-boas-contribuicoes.md\`
- [ ] \`docs/contribuir/esta-documentacao/duvidas-ou-sugestoes.md\`

## 📝 Conteúdo Necessário
### Como Contribuir
- Processo step-by-step para contribuições
- Setup do ambiente local
- Workflow de PR
- Padrões de código e documentação

### Por que Contribuir
- Benefícios para a comunidade
- Benefícios pessoais/profissionais
- Impacto no ecossistema n8n Brasil

### Exemplos de Boas Contribuições
- Cases reais de contribuições
- Templates e exemplos
- Boas práticas

### Dúvidas ou Sugestões
- Canais de comunicação
- FAQ sobre contribuições
- Processo de feedback

## ✅ Critérios de Aceitação
- [ ] Todas as páginas com conteúdo completo e útil
- [ ] Links internos funcionando
- [ ] Consistência com design system
- [ ] Revisão de português e clareza

## 🎯 Impacto
Essencial para engajar novos contribuidores e facilitar participação da comunidade.`,
    labels: ['🟠 Prioridade: Alta', '📝 Documentação', '👥 Boa Primeira Issue', '🚀 Pronto para Desenvolvimento']
  },

  {
    title: '📝 [ALTA] Criar página /integracoes/overview como hub principal',
    body: `## 🎯 Objetivo
Criar a página \`/integracoes/overview\` que está sendo referenciada em vários lugares mas não existe.

## 📋 Conteúdo Proposto
### Visão Geral das Integrações
- Introdução ao sistema de nodes
- Categorias principais (Core, Trigger, App, Community)
- Guia de navegação pelas integrações
- Estatísticas do ecossistema

### Seções Principais
1. **Quick Start** - Como começar com integrações
2. **Categorias** - Navegação visual por tipo
3. **Populares** - Integrações mais usadas
4. **Brasil** - Foco em integrações brasileiras
5. **Desenvolvimento** - Como criar nodes customizados

## 🔗 Integração com Navegação
- Atualizar footer para apontar para página correta
- Considerar se deve substituir \`/integracoes/index.md\` atual
- Garantir consistência com sidebar

## ✅ Critérios de Aceitação
- [ ] Página acessível em \`/integracoes/overview\`
- [ ] Conteúdo completo e navegável
- [ ] Links do footer funcionando
- [ ] Design consistente com outras páginas hub

## 💡 Alternativa
Pode ser mais simples renomear \`/integracoes/index.md\` para \`overview.md\` e ajustar configurações.`,
    labels: ['🟠 Prioridade: Alta', '📝 Documentação', '🔧 Infraestrutura', '🚀 Pronto para Desenvolvimento']
  },

  // CATEGORIA: FEATURES E MELHORIAS
  {
    title: '🌟 [MÉDIA] Implementar sistema de busca avançada',
    body: `## 🎯 Objetivo
Melhorar a experiência de busca na documentação com filtros e categorização.

## 🚀 Funcionalidades Propostas
- Busca por categoria (Tutoriais, Integrações, API, etc.)
- Filtros por nível (Iniciante, Intermediário, Avançado)
- Busca específica por nodes/integrações
- Sugestões de busca inteligentes

## 🔧 Implementação Técnica
- Configurar Algolia DocSearch (gratuito para projetos open source)
- Ou implementar busca local melhorada
- Adicionar metadados nas páginas para melhor indexação

## ✅ Critérios de Aceitação
- [ ] Busca rápida e precisa
- [ ] Filtros funcionais
- [ ] Interface intuitiva
- [ ] Funciona em mobile

## 📈 Impacto
Facilita navegação em uma documentação extensa, melhorando UX significativamente.`,
    labels: ['🟡 Prioridade: Média', '🌟 Feature', '🎨 Design/UX', '💬 Discussão Necessária']
  },

  {
    title: '🇧🇷 [MÉDIA] Expandir seção de Integrações Brasileiras',
    body: `## 🎯 Objetivo
Ampliar cobertura de APIs e serviços brasileiros na documentação.

## 📋 Integrações a Adicionar
### Financeiro
- [ ] Mercado Pago
- [ ] PagSeguro
- [ ] Stone
- [ ] GetNet
- [ ] Banco Central (APIs abertas)

### Governo/Receita
- [ ] CNPJ Receita Federal (melhorar)
- [ ] CPF/CNPJ validação
- [ ] IBGE APIs
- [ ] Portal da Transparência

### E-commerce
- [ ] Tray
- [ ] VTEX
- [ ] Magento Brasil
- [ ] Loja Integrada

### Logística
- [ ] Correios (rastreamento, frete)
- [ ] Jadlog
- [ ] Total Express
- [ ] Kangu

### Comunicação
- [ ] WhatsApp Business (Brasil)
- [ ] SMS Brasil (várias operadoras)
- [ ] Email marketing brasileiro

## 🔧 Estrutura Proposta
- Tutorial para cada integração
- Exemplos práticos brasileiros
- Casos de uso específicos do mercado BR
- Troubleshooting comum

## ✅ Critérios de Aceitação
- [ ] Pelo menos 10 novas integrações documentadas
- [ ] Exemplos práticos para cada uma
- [ ] Casos de uso brasileiros
- [ ] Testes funcionais dos exemplos

## 🎯 Impacto
Diferencial competitivo focado no mercado brasileiro, agregando valor único.`,
    labels: ['🟡 Prioridade: Média', '🇧🇷 Brasil Específico', '📝 Documentação', '📋 Epic']
  },

  // CATEGORIA: INFRAESTRUTURA E MANUTENÇÃO
  {
    title: '🔧 [MÉDIA] Otimizar performance e build do site',
    body: `## 🎯 Objetivo
Melhorar velocidade de build e performance do site em produção.

## 🔍 Análise Atual
- Build com warnings mas funcional
- 15 componentes React customizados
- CSS customizado extenso (400+ linhas)
- Possível redundância em estilos

## 🚀 Otimizações Propostas
### Build Performance
- [ ] Analisar e otimizar imports
- [ ] Implementar code splitting
- [ ] Otimizar imagens e assets
- [ ] Configurar cache adequado

### Runtime Performance
- [ ] Lazy loading de componentes
- [ ] Otimizar CSS (remover redundâncias)
- [ ] Implementar service worker
- [ ] Comprimir assets

### Developer Experience
- [ ] Melhorar hot reload
- [ ] Configurar linting automático
- [ ] Setup de pre-commit hooks
- [ ] Documentar componentes React

## 📊 Métricas Alvo
- Build time < 30s
- Lighthouse Score > 90
- First Contentful Paint < 2s
- Time to Interactive < 3s

## ✅ Critérios de Aceitação
- [ ] Build sem warnings
- [ ] Métricas de performance atingidas
- [ ] Documentação de performance atualizada`,
    labels: ['🟡 Prioridade: Média', '⚡ Performance', '🔧 Infraestrutura', '🧹 Manutenção']
  },

  {
    title: '🎨 [BAIXA] Melhorar acessibilidade e inclusão',
    body: `## 🎯 Objetivo
Tornar a documentação mais acessível para pessoas com deficiências.

## 🔍 Auditoria de Acessibilidade
- [ ] Executar audit com axe-core
- [ ] Testar com screen readers
- [ ] Verificar contraste de cores
- [ ] Validar navegação por teclado

## 🚀 Melhorias Propostas
### Navegação
- [ ] Skip links para conteúdo principal
- [ ] Navegação por teclado fluida
- [ ] Focus indicators visíveis
- [ ] Breadcrumbs semânticos

### Conteúdo
- [ ] Alt text em todas as imagens
- [ ] Headings hierárquicos corretos
- [ ] ARIA labels onde necessário
- [ ] Descrições para ícones complexos

### Design
- [ ] Verificar contraste WCAG AA
- [ ] Suporte a modo de alto contraste
- [ ] Fontes legíveis e escaláveis
- [ ] Indicadores visuais claros

## 📋 Padrões a Seguir
- WCAG 2.1 Level AA
- Section 508 compliance
- Boas práticas do Docusaurus

## ✅ Critérios de Aceitação
- [ ] Score de acessibilidade > 95%
- [ ] Teste com screen reader bem-sucedido
- [ ] Navegação por teclado completa
- [ ] Documentação de acessibilidade criada`,
    labels: ['🟢 Prioridade: Baixa', '♿ Acessibilidade', '🎨 Design/UX', '👥 Boa Primeira Issue']
  },

  // CATEGORIA: AUTOMAÇÃO E FERRAMENTAS
  {
    title: '🤖 [BAIXA] Implementar automações de qualidade',
    body: `## 🎯 Objetivo
Criar automações para manter qualidade e consistência da documentação.

## 🔧 Automações Propostas
### GitHub Actions
- [ ] Verificação automática de links quebrados
- [ ] Spell check em português
- [ ] Validação de markdown
- [ ] Deploy automático
- [ ] Testes de performance

### Quality Checks
- [ ] Linting de markdown
- [ ] Verificação de imagens otimizadas
- [ ] Validação de metadados
- [ ] Consistência de estilo

### Contribuição
- [ ] Template de issues
- [ ] Template de PRs
- [ ] Checklist automático
- [ ] Assignee automático

## 📋 Ferramentas
- GitHub Actions
- markdownlint
- linkchecker
- lighthouse-ci
- alex (linguagem inclusiva)

## ✅ Critérios de Aceitação
- [ ] CI/CD funcionando
- [ ] Checks automáticos em PRs
- [ ] Documentação de workflows
- [ ] Templates configurados`,
    labels: ['🟢 Prioridade: Baixa', '�� Infraestrutura', '🧹 Manutenção']
  }
];

async function createComprehensiveProject() {
  try {
    console.log('🚀 Criando projeto completo com análise detalhada...\n');
    
    const { Octokit } = await import('@octokit/rest');
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
    
    // 1. Criar todos os labels do sistema
    console.log('🏷️ Criando sistema de labels organizado...');
    
    const allLabels = [
      ...LABEL_SYSTEM.priority,
      ...LABEL_SYSTEM.category,
      ...LABEL_SYSTEM.status,
      ...LABEL_SYSTEM.special
    ];
    
    let createdLabels = 0;
    for (const label of allLabels) {
      try {
        await octokit.rest.issues.createLabel({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          name: label.name,
          color: label.color,
          description: label.description
        });
        
        console.log(`  ✅ Label criado: ${label.name}`);
        createdLabels++;
        
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        if (error.status === 422) {
          console.log(`  ➡️ Label já existe: ${label.name}`);
        } else {
          console.log(`  ❌ Erro ao criar "${label.name}": ${error.message}`);
        }
      }
    }
    
    console.log(`✅ ${createdLabels} labels criados/verificados\n`);
    
    // 2. Criar issues organizadas
    console.log('📝 Criando issues baseadas na análise...');
    
    let createdIssues = 0;
    for (const issue of COMPREHENSIVE_ISSUES) {
      try {
        const createdIssue = await octokit.rest.issues.create({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          title: issue.title,
          body: issue.body,
          labels: issue.labels
        });
        
        console.log(`  ✅ Issue criada: #${createdIssue.data.number} - ${issue.title}`);
        createdIssues++;
        
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.log(`  ❌ Erro ao criar issue "${issue.title}": ${error.message}`);
      }
    }
    
    console.log(`✅ ${createdIssues} issues criadas com sucesso\n`);
    
    // 3. Resumo final
    console.log('🎉 Projeto completo criado com sucesso!\n');
    console.log('📊 Resumo da Criação:');
    console.log(`  🏷️ Labels: ${createdLabels} criados`);
    console.log(`  📝 Issues: ${createdIssues} criadas`);
    console.log(`  📋 Sistema: Organizado por prioridade e categoria`);
    
    console.log('\n🎯 Sistema de Labels Criado:');
    console.log('  🔴🟠🟡🟢 Prioridades: Crítica → Alta → Média → Baixa');
    console.log('  🐛📝🎨⚡🔧🌟🧹♿ Categorias: Bug, Docs, Design, Performance, etc.');
    console.log('  🚀🔄⏳🧪✅❌ Status: Pronto → Progresso → Teste → Concluído');
    console.log('  🇧🇷👥💬📋 Especiais: Brasil, Iniciante, Discussão, Epic');
    
    console.log('\n🔗 Links úteis:');
    console.log(`  📋 Issues: https://github.com/${REPO_OWNER}/${REPO_NAME}/issues`);
    console.log(`  🏷️ Labels: https://github.com/${REPO_OWNER}/${REPO_NAME}/labels`);
    console.log(`  📊 Projects: https://github.com/users/${REPO_OWNER}/projects`);
    
    console.log('\n💡 Próximos passos:');
    console.log('  1. Revisar issues criadas e ajustar se necessário');
    console.log('  2. Adicionar issues ao Project V2');
    console.log('  3. Definir responsáveis e milestones');
    console.log('  4. Começar pelo issues críticas! 🚨');
    
  } catch (error) {
    console.error('❌ Erro ao criar projeto:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n💡 Erro de autenticação. Verifique:');
      console.log('  - GITHUB_TOKEN configurado corretamente');
      console.log('  - Token com permissões: repo, issues');
    }
  }
}

createComprehensiveProject(); 
