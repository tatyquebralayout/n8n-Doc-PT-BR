require('dotenv').config();

const REPO_OWNER = process.env.REPO_OWNER || 'tatyquebralayout';
const REPO_NAME = process.env.REPO_NAME || 'n8n-Doc-pt-BR';

async function addIssuesToProject() {
  try {
    console.log('🚀 Adicionando todas as issues ao Project V2...\n');
    
    // Importar GraphQL client
    const { GraphQLClient } = await import('graphql-request');
    const client = new GraphQLClient('https://api.github.com/graphql', {
      headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'n8ndoc-project-manager'
      },
    });
    
    // 1. Buscar o projeto V2 mais recente do usuário
    console.log('📋 Buscando projeto V2 mais recente...');
    const projectQuery = `
      query GetUserProjects($login: String!) {
        user(login: $login) {
          projectsV2(first: 5, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              id
              number
              title
              url
              createdAt
            }
          }
        }
      }
    `;
    
    const projectData = await client.request(projectQuery, { login: REPO_OWNER });
    const projects = projectData.user.projectsV2.nodes;
    
    if (projects.length === 0) {
      console.log('❌ Nenhum projeto V2 encontrado!');
      console.log('💡 Execute primeiro: npm run create-project-v2');
      return;
    }
    
    // Usar o projeto mais recente (que deve ser o #9 que acabamos de criar)
    const latestProject = projects[0];
    console.log(`✅ Projeto encontrado: ${latestProject.title} (#${latestProject.number})`);
    console.log(`🔗 URL: ${latestProject.url}\n`);
    
    // 2. Buscar todas as issues abertas do repositório
    console.log('📝 Buscando issues do repositório...');
    const issuesQuery = `
      query GetRepositoryIssues($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          issues(first: 50, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              id
              number
              title
              url
              labels(first: 10) {
                nodes {
                  name
                  color
                }
              }
              createdAt
            }
          }
        }
      }
    `;
    
    const issuesData = await client.request(issuesQuery, {
      owner: REPO_OWNER,
      name: REPO_NAME
    });
    
    const issues = issuesData.repository.issues.nodes;
    console.log(`✅ Encontradas ${issues.length} issues abertas\n`);
    
    if (issues.length === 0) {
      console.log('ℹ️ Nenhuma issue encontrada para adicionar.');
      return;
    }
    
    // 3. Adicionar cada issue ao projeto
    console.log('➕ Adicionando issues ao projeto...');
    
    let addedIssues = 0;
    let skippedIssues = 0;
    
    for (const issue of issues) {
      try {
        const addItemMutation = `
          mutation AddProjectV2ItemById($projectId: ID!, $contentId: ID!) {
            addProjectV2ItemById(input: {
              projectId: $projectId
              contentId: $contentId
            }) {
              item {
                id
                content {
                  ... on Issue {
                    number
                    title
                  }
                }
              }
            }
          }
        `;
        
        await client.request(addItemMutation, {
          projectId: latestProject.id,
          contentId: issue.id
        });
        
        // Mostrar prioridade baseada nos labels
        const priorityLabel = issue.labels.nodes.find(label => 
          label.name.includes('Prioridade:')
        );
        const priority = priorityLabel ? priorityLabel.name : '⚪ Sem prioridade';
        
        console.log(`  ✅ #${issue.number}: ${issue.title}`);
        console.log(`     ${priority}`);
        
        addedIssues++;
        
        // Pausa para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 300));
        
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`  ➡️ #${issue.number}: Já existe no projeto`);
          skippedIssues++;
        } else {
          console.log(`  ❌ #${issue.number}: Erro - ${error.message}`);
        }
      }
    }
    
    console.log(`\n✅ Processo concluído!`);
    console.log(`📊 Resumo:`);
    console.log(`  ➕ Issues adicionadas: ${addedIssues}`);
    console.log(`  ➡️ Issues já existentes: ${skippedIssues}`);
    console.log(`  📋 Total de issues: ${issues.length}`);
    
    // 4. Mostrar estatísticas por prioridade
    console.log(`\n📈 Distribuição por Prioridade:`);
    const priorityStats = {};
    
    for (const issue of issues) {
      const priorityLabel = issue.labels.nodes.find(label => 
        label.name.includes('Prioridade:')
      );
      
      if (priorityLabel) {
        const priority = priorityLabel.name;
        priorityStats[priority] = (priorityStats[priority] || 0) + 1;
      } else {
        priorityStats['⚪ Sem prioridade'] = (priorityStats['⚪ Sem prioridade'] || 0) + 1;
      }
    }
    
    for (const [priority, count] of Object.entries(priorityStats)) {
      console.log(`  ${priority}: ${count} issues`);
    }
    
    // 5. Links úteis e próximos passos
    console.log(`\n🔗 Links importantes:`);
    console.log(`  📊 Projeto V2: ${latestProject.url}`);
    console.log(`  📝 Issues: https://github.com/${REPO_OWNER}/${REPO_NAME}/issues`);
    console.log(`  🏷️ Labels: https://github.com/${REPO_OWNER}/${REPO_NAME}/labels`);
    
    console.log(`\n💡 Próximos passos:`);
    console.log(`  1. Acesse o projeto V2 para organizar as issues`);
    console.log(`  2. Configure colunas: To Do → In Progress → Review → Done`);
    console.log(`  3. Comece pelas issues 🔴 Críticas!`);
    console.log(`  4. Defina responsáveis para cada issue`);
    console.log(`  5. Configure automações baseadas em labels`);
    
    console.log(`\n🎯 Foco imediato:`);
    const criticalIssues = issues.filter(issue => 
      issue.labels.nodes.some(label => label.name.includes('Crítica'))
    );
    
    if (criticalIssues.length > 0) {
      console.log(`  🚨 ${criticalIssues.length} issues CRÍTICAS precisam de atenção imediata:`);
      for (const issue of criticalIssues) {
        console.log(`     #${issue.number}: ${issue.title}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Erro ao adicionar issues ao projeto:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n💡 Erro de autenticação. Verifique:');
      console.log('  - GITHUB_TOKEN configurado corretamente');
      console.log('  - Token com permissões: repo, project');
    }
    
    if (error.message.includes('GraphQL')) {
      console.log('\n💡 Erro GraphQL. Possíveis causas:');
      console.log('  - Projeto V2 não encontrado');
      console.log('  - Permissões insuficientes');
      console.log('  - API rate limit atingido');
    }
  }
}

// Executar automaticamente
addIssuesToProject(); 
