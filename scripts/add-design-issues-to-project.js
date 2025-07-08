require('dotenv').config();

const REPO_OWNER = process.env.REPO_OWNER || 'tatyquebralayout';
const REPO_NAME = process.env.REPO_NAME || 'n8n-Doc-pt-BR';

async function addDesignIssuesToProject() {
  try {
    console.log('🎨 Adicionando issues de Design System ao projeto...\n');
    
    // Importar GraphQL client
    const { GraphQLClient } = await import('graphql-request');
    const client = new GraphQLClient('https://api.github.com/graphql', {
      headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'n8ndoc-design-system-manager'
      },
    });
    
    // 1. Buscar o projeto V2 mais recente (projeto #10)
    console.log('📋 Buscando projeto V2 "🎨 Design System n8n Brasil"...');
    const projectQuery = `
      query GetUserProjects($login: String!) {
        user(login: $login) {
          projectsV2(first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              id
              number
              title
              url
            }
          }
        }
      }
    `;
    
    const projectData = await client.request(projectQuery, { login: REPO_OWNER });
    const designProject = projectData.user.projectsV2.nodes.find(p => 
      p.title.includes('Design System') || p.number === 10
    );
    
    if (!designProject) {
      throw new Error('Projeto V2 de Design System não encontrado');
    }
    
    console.log(`  ✅ Projeto encontrado: #${designProject.number} - ${designProject.title}`);
    console.log(`  🔗 URL: ${designProject.url}`);
    
    // 2. Buscar issues do repositório (issues #23-#36)
    console.log('\n📋 Buscando issues de Design System...');
    const { Octokit } = await import('@octokit/rest');
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
    
    const { data: issues } = await octokit.issues.listForRepo({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      state: 'open',
      per_page: 100
    });
    
    // Filtrar apenas issues de design system (issues #23-#36)
    const designIssues = issues.filter(issue => 
      issue.number >= 23 && issue.number <= 36 && !issue.pull_request
    );
    
    console.log(`  ✅ Encontradas ${designIssues.length} issues de Design System`);
    
    // 3. Adicionar cada issue ao projeto
    console.log('\n🔗 Adicionando issues ao projeto...');
    let addedCount = 0;
    
    for (const issue of designIssues) {
      try {
        const addToProjectMutation = `
          mutation AddIssueToProject($projectId: ID!, $contentId: ID!) {
            addProjectV2ItemById(input: {
              projectId: $projectId
              contentId: $contentId
            }) {
              item {
                id
              }
            }
          }
        `;
        
        await client.request(addToProjectMutation, {
          projectId: designProject.id,
          contentId: issue.node_id
        });
        
        console.log(`  ✅ Issue adicionada: #${issue.number} - ${issue.title}`);
        addedCount++;
        
        // Pequena pausa para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.log(`  ⚠️ Erro ao adicionar issue #${issue.number}: ${error.message}`);
      }
    }
    
    console.log(`\n🎉 Processo concluído!`);
    console.log(`📊 Resumo:`);
    console.log(`  • ${addedCount} issues adicionadas com sucesso`);
    console.log(`  • Projeto: ${designProject.title}`);
    console.log(`  • URL: ${designProject.url}`);
    
    console.log(`\n🔗 Próximos passos:`);
    console.log(`1. Acesse o projeto: ${designProject.url}`);
    console.log(`2. Configure os status das issues (Todo, In Progress, Done)`);
    console.log(`3. Priorize as issues críticas (🔴) primeiro`);
    console.log(`4. Atribua responsáveis conforme necessário`);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  addDesignIssuesToProject();
}

module.exports = { addDesignIssuesToProject }; 
