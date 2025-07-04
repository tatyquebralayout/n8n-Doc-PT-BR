require('dotenv').config();

const REPO_OWNER = process.env.REPO_OWNER || 'tatyquebralayout';
const REPO_NAME = process.env.REPO_NAME || 'n8n-Doc-pt-BR';

async function createDesignSystemProject() {
  try {
    console.log('🎨 Criando projeto focado em Design System e Interface...\n');
    
    // Importar GraphQL client
    const { GraphQLClient } = await import('graphql-request');
    const client = new GraphQLClient('https://api.github.com/graphql', {
      headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'n8ndoc-design-system-manager'
      },
    });

    // 1. Deletar labels existentes (manter apenas os padrão do GitHub)
    console.log('🧹 Limpando labels existentes...');
    await cleanupLabels();
    
    // 2. Criar novo sistema de labels para Design System
    console.log('🏷️ Criando labels especializados...');
    await createDesignSystemLabels();
    
    // 3. Fechar issues existentes
    console.log('📋 Fechando issues existentes...');
    await closeExistingIssues();
    
    // 4. Criar issues focadas em design system
    console.log('🎯 Criando issues de Design System...');
    await createDesignSystemIssues();
    
    // 5. Criar Project V2 especializado
    console.log('📊 Criando Project V2 para Design System...');
    await createDesignSystemProjectV2(client);
    
    console.log('\n✅ Sistema de Design System criado com sucesso!');
    console.log('\n📋 Resumo:');
    console.log('• 28 labels especializados criados');
    console.log('• 15 issues de design system criadas');
    console.log('• Project V2 "🎨 Design System n8n Brasil" configurado');
    console.log('\n🔗 Próximos passos:');
    console.log('1. Adicione as issues ao projeto manualmente');
    console.log('2. Configure os status das issues no projeto');
    console.log('3. Comece implementando as issues de prioridade crítica');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

async function cleanupLabels() {
  const { Octokit } = await import('@octokit/rest');
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    const { data: labels } = await octokit.issues.listLabelsForRepo({
      owner: REPO_OWNER,
      repo: REPO_NAME,
    });

    // Labels padrão do GitHub para manter
    const defaultLabels = [
      'bug', 'documentation', 'duplicate', 'enhancement', 
      'good first issue', 'help wanted', 'invalid', 'question', 'wontfix'
    ];

    for (const label of labels) {
      if (!defaultLabels.includes(label.name)) {
        try {
          await octokit.issues.deleteLabel({
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

async function createDesignSystemLabels() {
  const { Octokit } = await import('@octokit/rest');
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const labels = [
    // === PRIORIDADES ===
    { name: '🔴 Crítica', color: 'B60205', description: 'Problemas que quebram a experiência do usuário' },
    { name: '🟠 Alta', color: 'D93F0B', description: 'Problemas importantes que afetam usabilidade' },
    { name: '🟡 Média', color: 'FBCA04', description: 'Melhorias e refinamentos necessários' },
    { name: '🟢 Baixa', color: '0E8A16', description: 'Melhorias futuras e polimentos' },
    
    // === CATEGORIAS PRINCIPAIS ===
    { name: '🎨 Design System', color: 'E99695', description: 'Paleta de cores, tipografia, componentes visuais' },
    { name: '⚛️ Componentes React', color: '61DAFB', description: 'Componentes React customizados e sua implementação' },
    { name: '📱 Responsividade', color: '7057FF', description: 'Layout mobile, tablet e desktop' },
    { name: '🌗 Dark Mode', color: '2D3748', description: 'Temas escuro e claro, adaptações visuais' },
    { name: '♿ Acessibilidade', color: '00D4AA', description: 'WCAG, leitores de tela, navegação por teclado' },
    { name: '🔧 CSS/Estilos', color: '1572B6', description: 'Arquivos CSS, variáveis, classes utilitárias' },
    
    // === TIPOS DE TRABALHO ===
    { name: '🐛 Bug Visual', color: 'D73A49', description: 'Problemas visuais, layouts quebrados' },
    { name: '✨ Nova Feature', color: 'A2EEEF', description: 'Novos componentes ou funcionalidades visuais' },
    { name: '🔄 Refatoração', color: 'FFC649', description: 'Reorganização de código sem mudança visual' },
    { name: '📝 Documentação', color: '0075CA', description: 'Design system docs, guias de estilo' },
    { name: '🧪 Teste', color: 'F9D0C4', description: 'Testes visuais, snapshots, acessibilidade' },
    
    // === ÁREAS ESPECÍFICAS ===
    { name: '🏠 Homepage', color: 'FF6B9D', description: 'Página inicial do site' },
    { name: '📄 Páginas Docs', color: '0366D6', description: 'Layout e estilo das páginas de documentação' },
    { name: '🧭 Navegação', color: '28A745', description: 'Navbar, sidebar, breadcrumbs, footer' },
    { name: '🎯 CTAs/Botões', color: 'EA4B71', description: 'Call-to-actions, botões, links' },
    { name: '📊 Cards/Grids', color: '6F42C1', description: 'Layouts de cards, grids, componentes de conteúdo' },
    { name: '🎭 Ícones', color: 'F66A0A', description: 'Sistema de ícones Ionicons' },
    
    // === STATUS TÉCNICO ===
    { name: '🚀 Pronto para Dev', color: '0E8A16', description: 'Design aprovado, pronto para implementação' },
    { name: '🔄 Em Progresso', color: 'FBCA04', description: 'Sendo trabalhado atualmente' },
    { name: '⏳ Aguardando', color: 'D4C5F9', description: 'Bloqueado ou aguardando dependências' },
    { name: '👀 Revisão', color: 'BFD4F2', description: 'Aguardando revisão de design ou código' },
    { name: '✅ Concluído', color: '0E8A16', description: 'Implementado e testado' },
    
    // === ESPECIAIS ===
    { name: '🇧🇷 Brasil Específico', color: '009639', description: 'Adaptações específicas para o contexto brasileiro' },
    { name: '👥 Boa Primeira Issue', color: 'C5DEF5', description: 'Ideal para novos contribuidores' },
    { name: '💬 Discussão Necessária', color: 'D4C5F9', description: 'Precisa de discussão antes da implementação' },
    { name: '📋 Epic', color: '8A2BE2', description: 'Issue grande que engloba várias outras' }
  ];

  for (const label of labels) {
    try {
      await octokit.issues.createLabel({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        name: label.name,
        color: label.color,
        description: label.description,
      });
      console.log(`  ✅ Label criado: ${label.name}`);
    } catch (error) {
      console.log(`  ⚠️ Erro ao criar label ${label.name}: ${error.message}`);
    }
  }
}

async function closeExistingIssues() {
  const { Octokit } = await import('@octokit/rest');
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    const { data: issues } = await octokit.issues.listForRepo({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      state: 'open'
    });

    for (const issue of issues) {
      if (!issue.pull_request) {
        await octokit.issues.update({
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

async function createDesignSystemIssues() {
  const { Octokit } = await import('@octokit/rest');
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const issues = [
    // === CRÍTICAS ===
    {
      title: '🔴 Corrigir inconsistências na paleta de cores primárias',
      body: `## 🎯 Problema
Existe inconsistência entre as cores definidas no design system e as implementadas no CSS. A documentação mostra \`#FF4F8A\` mas o CSS usa \`#ea4b71\`.

## 📋 Tarefas
- [ ] Auditar todas as variáveis CSS de cores primárias
- [ ] Unificar a cor primária para \`#ea4b71\` (cor oficial n8n)
- [ ] Atualizar documentação do design system
- [ ] Verificar impacto em todos os componentes
- [ ] Testar contraste e acessibilidade

## 🎨 Arquivos Afetados
- \`src/css/custom.css\`
- \`docs/contribuir/esta-documentacao/design-system.mdx\`
- \`docs/contribuir/esta-documentacao/paleta-de-cores.mdx\`

## ✅ Critérios de Aceitação
- Cor primária consistente em todo o projeto
- Documentação atualizada
- Contraste WCAG AA mantido`,
      labels: ['🔴 Crítica', '🎨 Design System', '🐛 Bug Visual', '🇧🇷 Brasil Específico']
    },

    {
      title: '🔴 Implementar responsividade completa nos componentes React',
      body: `## 🎯 Problema
Vários componentes React não são totalmente responsivos, causando problemas em dispositivos móveis.

## 📋 Componentes Afetados
- [ ] \`RepoCard\` - overflow em telas pequenas
- [ ] \`CommunityStats\` - barras não adaptam bem
- [ ] \`ReactBitsDemo\` - SVG não responsivo
- [ ] \`CardGrid\` - quebra de layout em mobile
- [ ] \`HighlightCard\` - texto truncado

## 🛠️ Soluções Necessárias
- Implementar breakpoints consistentes
- Usar CSS Grid/Flexbox apropriadamente
- Testar em dispositivos reais
- Adicionar media queries específicas

## ✅ Critérios de Aceitação
- Todos os componentes funcionam perfeitamente em mobile (320px+)
- Layout fluido entre breakpoints
- Textos legíveis sem zoom`,
      labels: ['🔴 Crítica', '⚛️ Componentes React', '📱 Responsividade', '🐛 Bug Visual']
    },

    {
      title: '🔴 Padronizar sistema de ícones Ionicons',
      body: `## 🎯 Problema
Uso inconsistente de ícones Ionicons ao longo do projeto, com tamanhos e cores variadas sem padrão.

## 📋 Problemas Identificados
- [ ] Tamanhos inconsistentes (16px, 18px, 20px, 24px, 32px)
- [ ] Cores hardcoded vs variáveis CSS
- [ ] Mistura de estilos \`outline\` e \`filled\`
- [ ] Falta de documentação de uso

## 🎨 Padronização Necessária
- Definir escala de tamanhos padrão
- Usar apenas estilo \`outline\`
- Implementar cores via CSS variables
- Criar guia de uso

## ✅ Critérios de Aceitação
- Guia de ícones documentado
- Todos os ícones seguem o padrão
- Componente IonicIcon otimizado`,
      labels: ['🔴 Crítica', '🎭 Ícones', '🎨 Design System', '📝 Documentação']
    },

    // === ALTA PRIORIDADE ===
    {
      title: '🟠 Melhorar acessibilidade dos componentes interativos',
      body: `## 🎯 Objetivo
Garantir que todos os componentes interativos atendam aos padrões WCAG AA.

## 📋 Componentes para Auditoria
- [ ] \`FeedbackWidget\` - navegação por teclado
- [ ] \`ReactBitsDemo\` - botões acessíveis
- [ ] \`CommunityStats\` - leitores de tela
- [ ] Todos os cards clicáveis
- [ ] Navegação principal

## 🛠️ Melhorias Necessárias
- Adicionar \`aria-label\` apropriados
- Implementar navegação por teclado
- Melhorar contraste de cores
- Testar com leitores de tela

## ✅ Critérios de Aceitação
- Navegação completa por teclado
- Leitores de tela funcionam corretamente
- Contraste mínimo 4.5:1 mantido`,
      labels: ['🟠 Alta', '♿ Acessibilidade', '⚛️ Componentes React', '🧪 Teste']
    },

    {
      title: '🟠 Otimizar dark mode em todos os componentes',
      body: `## 🎯 Problema
Alguns componentes não adaptam corretamente ao tema escuro.

## 📋 Componentes Afetados
- [ ] \`ReactBitsDemo\` - cores hardcoded
- [ ] \`CommunityStats\` - gradientes não adaptam
- [ ] \`GoalMeter\` - barras de progresso
- [ ] Cards customizados
- [ ] Elementos SVG

## 🌗 Melhorias Necessárias
- Usar variáveis CSS para todas as cores
- Testar todos os componentes em dark mode
- Documentar padrões de dark mode
- Implementar transições suaves

## ✅ Critérios de Aceitação
- Todos os componentes funcionam perfeitamente em dark mode
- Transições suaves entre temas
- Documentação atualizada`,
      labels: ['🟠 Alta', '🌗 Dark Mode', '⚛️ Componentes React', '🎨 Design System']
    },

    {
      title: '🟠 Refatorar arquitetura CSS para melhor manutenibilidade',
      body: `## 🎯 Objetivo
Reorganizar a estrutura CSS para facilitar manutenção e escalabilidade.

## 📋 Refatorações Necessárias
- [ ] Separar variáveis em arquivo dedicado
- [ ] Organizar estilos por componente
- [ ] Implementar metodologia BEM consistente
- [ ] Criar classes utilitárias reutilizáveis
- [ ] Documentar convenções CSS

## 🗂️ Nova Estrutura Proposta
\`\`\`
src/css/
├── variables.css      # Variáveis globais
├── base.css          # Reset e base
├── components.css    # Componentes globais
├── utilities.css     # Classes utilitárias
└── custom.css        # Arquivo principal
\`\`\`

## ✅ Critérios de Aceitação
- CSS organizado e documentado
- Redução de duplicação de código
- Melhor performance de build`,
      labels: ['🟠 Alta', '🔧 CSS/Estilos', '🔄 Refatoração', '📝 Documentação']
    },

    // === MÉDIA PRIORIDADE ===
    {
      title: '🟡 Criar componente de Loading/Skeleton unificado',
      body: `## 🎯 Objetivo
Implementar sistema de loading consistente em todos os componentes.

## 📋 Componentes que Precisam de Loading
- [ ] \`RepoCard\` - já tem, mas pode melhorar
- [ ] \`CommunityStats\` - implementar skeleton
- [ ] \`ArticleCard\` - loading para imagens
- [ ] \`HighlightCard\` - loading state
- [ ] Páginas de documentação

## 🎨 Design do Componente
- Skeleton screens para melhor UX
- Animações suaves
- Adaptável a diferentes tamanhos
- Acessível (aria-label)

## ✅ Critérios de Aceitação
- Componente Loading reutilizável criado
- Implementado em todos os componentes necessários
- Documentação de uso`,
      labels: ['🟡 Média', '⚛️ Componentes React', '✨ Nova Feature', '🎨 Design System']
    },

    {
      title: '🟡 Implementar sistema de animações consistente',
      body: `## 🎯 Objetivo
Padronizar animações e transições em todo o projeto.

## 📋 Áreas para Padronização
- [ ] Hover effects em cards
- [ ] Transições de página
- [ ] Loading animations
- [ ] Micro-interações
- [ ] Scroll animations

## 🎨 Especificações
- Duração padrão: 0.3s
- Easing: ease-in-out
- Respeitar \`prefers-reduced-motion\`
- Documentar todas as animações

## ✅ Critérios de Aceitação
- Sistema de animações documentado
- Todas as animações consistentes
- Acessibilidade respeitada`,
      labels: ['🟡 Média', '🎨 Design System', '✨ Nova Feature', '♿ Acessibilidade']
    },

    {
      title: '🟡 Otimizar performance dos componentes React',
      body: `## 🎯 Objetivo
Melhorar performance e bundle size dos componentes.

## 📋 Otimizações Necessárias
- [ ] Implementar React.memo onde apropriado
- [ ] Lazy loading para componentes pesados
- [ ] Otimizar re-renders desnecessários
- [ ] Code splitting por componente
- [ ] Otimizar imports

## 🔍 Componentes Prioritários
- \`ReactBitsDemo\` - muitas animações
- \`CommunityStats\` - cálculos pesados
- \`RepoCard\` - chamadas de API
- \`CardGrid\` - muitos elementos

## ✅ Critérios de Aceitação
- Bundle size reduzido em 20%
- Melhoria no Lighthouse Performance
- Documentação de best practices`,
      labels: ['🟡 Média', '⚛️ Componentes React', '🔄 Refatoração', '📝 Documentação']
    },

    {
      title: '🟡 Criar guia completo de contribuição para design',
      body: `## 🎯 Objetivo
Documentar processo completo para contribuições relacionadas a design.

## 📋 Conteúdo do Guia
- [ ] Fluxo de trabalho para mudanças visuais
- [ ] Como testar componentes
- [ ] Padrões de código CSS/React
- [ ] Checklist de acessibilidade
- [ ] Ferramentas recomendadas

## 📝 Seções Necessárias
- Setup do ambiente de desenvolvimento
- Convenções de nomenclatura
- Processo de review de design
- Testes visuais e responsivos
- Deploy e validação

## ✅ Critérios de Aceitação
- Guia completo e detalhado
- Exemplos práticos incluídos
- Processo claro para novos contribuidores`,
      labels: ['🟡 Média', '📝 Documentação', '👥 Boa Primeira Issue', '🎨 Design System']
    },

    // === BAIXA PRIORIDADE ===
    {
      title: '🟢 Implementar tema personalizado para eventos sazonais',
      body: `## 🎯 Objetivo
Criar sistema para temas especiais em datas comemorativas brasileiras.

## 🎨 Temas Propostos
- [ ] Carnaval (fevereiro/março)
- [ ] Festa Junina (junho/julho)
- [ ] Independência (setembro)
- [ ] Natal (dezembro)

## 🛠️ Implementação
- Sistema de troca de temas
- Cores e ícones especiais
- Animações temáticas
- Ativação automática por data

## ✅ Critérios de Aceitação
- Sistema de temas funcionando
- Pelo menos 2 temas implementados
- Documentação de como criar novos temas`,
      labels: ['🟢 Baixa', '🎨 Design System', '✨ Nova Feature', '🇧🇷 Brasil Específico']
    },

    {
      title: '🟢 Criar biblioteca de componentes Storybook',
      body: `## 🎯 Objetivo
Implementar Storybook para documentar e testar componentes isoladamente.

## 📋 Setup Necessário
- [ ] Configurar Storybook
- [ ] Criar stories para todos os componentes
- [ ] Implementar controles interativos
- [ ] Adicionar documentação automática
- [ ] Deploy automático

## 🎨 Benefícios
- Desenvolvimento isolado de componentes
- Testes visuais automatizados
- Documentação interativa
- Facilita contribuições

## ✅ Critérios de Aceitação
- Storybook configurado e funcionando
- Todos os componentes documentados
- Deploy automático configurado`,
      labels: ['🟢 Baixa', '⚛️ Componentes React', '🧪 Teste', '📝 Documentação']
    },

    {
      title: '🟢 Implementar sistema de feedback visual em tempo real',
      body: `## 🎯 Objetivo
Criar sistema para coletar feedback visual dos usuários sobre design.

## 🛠️ Funcionalidades
- [ ] Ferramenta de anotação visual
- [ ] Captura de screenshot automática
- [ ] Envio de feedback contextual
- [ ] Dashboard de feedback
- [ ] Integração com GitHub Issues

## 🎨 Design
- Overlay não intrusivo
- Ferramenta de desenho simples
- Categorização de feedback
- Modo anônimo opcional

## ✅ Critérios de Aceitação
- Sistema funcionando em todas as páginas
- Feedback sendo coletado corretamente
- Dashboard administrativo funcional`,
      labels: ['🟢 Baixa', '✨ Nova Feature', '⚛️ Componentes React', '🧪 Teste']
    },

    {
      title: '🟢 Criar sistema de métricas de design',
      body: `## 🎯 Objetivo
Implementar coleta de métricas sobre uso e performance do design.

## 📊 Métricas para Coletar
- [ ] Tempo de carregamento de componentes
- [ ] Interações com elementos visuais
- [ ] Preferência de tema (light/dark)
- [ ] Resolução de tela mais comum
- [ ] Componentes mais utilizados

## 🛠️ Implementação
- Analytics não invasivo
- Dashboard de métricas
- Relatórios automáticos
- Respeito à LGPD

## ✅ Critérios de Aceitação
- Sistema de métricas funcionando
- Dashboard com insights úteis
- Conformidade com privacidade`,
      labels: ['🟢 Baixa', '📊 Cards/Grids', '🧪 Teste', '🇧🇷 Brasil Específico']
    }
  ];

  for (const issue of issues) {
    try {
      const response = await octokit.issues.create({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        title: issue.title,
        body: issue.body,
        labels: issue.labels,
      });
      console.log(`  ✅ Issue criada: #${response.data.number} - ${issue.title}`);
    } catch (error) {
      console.log(`  ⚠️ Erro ao criar issue "${issue.title}": ${error.message}`);
    }
  }
}

async function createDesignSystemProjectV2(client) {
  try {
    // Buscar ID do usuário
    const userQuery = `
      query GetUser($login: String!) {
        user(login: $login) {
          id
        }
      }
    `;
    
    const userData = await client.request(userQuery, { login: REPO_OWNER });
    const userId = userData.user.id;

    // Criar projeto V2
    const createProjectMutation = `
      mutation CreateProject($ownerId: ID!, $title: String!) {
        createProjectV2(input: {
          ownerId: $ownerId
          title: $title
        }) {
          projectV2 {
            id
            number
            url
          }
        }
      }
    `;

    const projectData = await client.request(createProjectMutation, {
      ownerId: userId,
      title: '🎨 Design System n8n Brasil'
    });

    const projectId = projectData.createProjectV2.projectV2.id;
    const projectNumber = projectData.createProjectV2.projectV2.number;
    const projectUrl = projectData.createProjectV2.projectV2.url;

    console.log(`  ✅ Project V2 criado: #${projectNumber}`);
    console.log(`  🔗 URL: ${projectUrl}`);

    return { projectId, projectNumber, projectUrl };
  } catch (error) {
    console.log(`  ⚠️ Erro ao criar Project V2: ${error.message}`);
    return null;
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  createDesignSystemProject();
}

module.exports = { createDesignSystemProject }; 