require('dotenv').config();

const REPO_OWNER = process.env.REPO_OWNER || 'tatyquebralayout';
const REPO_NAME = process.env.REPO_NAME || 'n8n-Doc-pt-BR';

async function cleanupRepository() {
  try {
    console.log('🧹 Limpando repositório - deletando issues e labels...\n');
    
    // Importar Octokit dinamicamente
    const { Octokit } = await import('@octokit/rest');
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
    
    // 1. Listar e deletar todas as issues
    console.log('📝 Deletando todas as issues...');
    try {
      const issues = await octokit.rest.issues.listForRepo({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        state: 'all',
        per_page: 100
      });
      
      console.log(`📋 Encontradas ${issues.data.length} issues`);
      
      let deletedIssues = 0;
      for (const issue of issues.data) {
        // Não deletar pull requests (issues com pull_request field)
        if (!issue.pull_request) {
          try {
            // GitHub não permite deletar issues via API, então vamos fechá-las
            await octokit.rest.issues.update({
              owner: REPO_OWNER,
              repo: REPO_NAME,
              issue_number: issue.number,
              state: 'closed',
              title: `[DELETADO] ${issue.title}`,
              body: '🗑️ Esta issue foi marcada para exclusão e será removida.'
            });
            
            console.log(`  ✅ Fechada: #${issue.number} - ${issue.title}`);
            deletedIssues++;
            
            // Pausa para evitar rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (error) {
            console.log(`  ❌ Erro ao fechar #${issue.number}: ${error.message}`);
          }
        }
      }
      
      console.log(`✅ ${deletedIssues} issues fechadas com sucesso\n`);
      
    } catch (error) {
      console.log(`❌ Erro ao listar issues: ${error.message}\n`);
    }
    
    // 2. Listar e deletar todos os labels customizados
    console.log('🏷️ Deletando labels customizados...');
    try {
      const labels = await octokit.rest.issues.listLabelsForRepo({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        per_page: 100
      });
      
      console.log(`🏷️ Encontrados ${labels.data.length} labels`);
      
      // Labels padrão do GitHub que não devemos deletar
      const defaultLabels = [
        'bug',
        'documentation',
        'duplicate',
        'enhancement',
        'good first issue',
        'help wanted',
        'invalid',
        'question',
        'wontfix'
      ];
      
      let deletedLabels = 0;
      for (const label of labels.data) {
        // Só deletar labels customizados (não os padrão)
        if (!defaultLabels.includes(label.name.toLowerCase())) {
          try {
            await octokit.rest.issues.deleteLabel({
              owner: REPO_OWNER,
              repo: REPO_NAME,
              name: label.name
            });
            
            console.log(`  ✅ Deletado: ${label.name}`);
            deletedLabels++;
            
            // Pausa para evitar rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (error) {
            console.log(`  ❌ Erro ao deletar "${label.name}": ${error.message}`);
          }
        } else {
          console.log(`  ➡️ Mantido (padrão): ${label.name}`);
        }
      }
      
      console.log(`✅ ${deletedLabels} labels customizados deletados\n`);
      
    } catch (error) {
      console.log(`❌ Erro ao listar labels: ${error.message}\n`);
    }
    
    // 3. Limpar o projeto V2 (remover items)
    console.log('📋 Limpando Project V2...');
    try {
      // Usar GraphQL para limpar o projeto
      const { GraphQLClient } = await import('graphql-request');
      const client = new GraphQLClient('https://api.github.com/graphql', {
        headers: {
          authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'User-Agent': 'n8ndoc-cleanup'
        },
      });
      
      // Buscar o projeto V2 mais recente
      const projectQuery = `
        query GetUserProjects($login: String!) {
          user(login: $login) {
            projectsV2(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
              nodes {
                id
                number
                title
                items(first: 50) {
                  nodes {
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
            }
          }
        }
      `;
      
      const projectData = await client.request(projectQuery, { login: REPO_OWNER });
      const projects = projectData.user.projectsV2.nodes;
      
      if (projects.length > 0) {
        const latestProject = projects[0];
        console.log(`📊 Limpando projeto: ${latestProject.title} (#${latestProject.number})`);
        
        let removedItems = 0;
        for (const item of latestProject.items.nodes) {
          try {
            const deleteItemMutation = `
              mutation DeleteProjectV2Item($projectId: ID!, $itemId: ID!) {
                deleteProjectV2Item(input: {
                  projectId: $projectId
                  itemId: $itemId
                }) {
                  deletedItemId
                }
              }
            `;
            
            await client.request(deleteItemMutation, {
              projectId: latestProject.id,
              itemId: item.id
            });
            
            if (item.content && item.content.number) {
              console.log(`  ✅ Removido do projeto: #${item.content.number} - ${item.content.title}`);
            } else {
              console.log(`  ✅ Item removido do projeto`);
            }
            removedItems++;
            
            // Pausa para evitar rate limiting
            await new Promise(resolve => setTimeout(resolve, 200));
          } catch (error) {
            console.log(`  ❌ Erro ao remover item: ${error.message}`);
          }
        }
        
        console.log(`✅ ${removedItems} items removidos do projeto\n`);
      } else {
        console.log('➡️ Nenhum projeto V2 encontrado\n');
      }
      
    } catch (error) {
      console.log(`❌ Erro ao limpar projeto V2: ${error.message}\n`);
    }
    
    // 4. Resumo final
    console.log('🎉 Limpeza concluída!\n');
    console.log('📊 Resumo:');
    console.log('  ✅ Issues fechadas e marcadas para exclusão');
    console.log('  ✅ Labels customizados removidos');
    console.log('  ✅ Projeto V2 limpo');
    console.log('  ✅ Repositório pronto para recomeçar');
    
    console.log('\n💡 Próximos passos:');
    console.log('  1. Execute: npm run setup-projects (para criar novas issues)');
    console.log('  2. Execute: npm run create-project-v2 (para recriar projeto)');
    console.log('  3. Comece do zero com estrutura limpa! 🚀');
    
  } catch (error) {
    console.error('❌ Erro durante limpeza:', error.message);
    
    if (error.message.includes('authentication')) {
      console.log('\n💡 Verifique se o GITHUB_TOKEN está correto e tem permissões:');
      console.log('  - repo (acesso total ao repositório)');
      console.log('  - project (acesso aos projetos)');
    }
  }
}

// Confirmar antes de executar
console.log('⚠️  ATENÇÃO: Este script irá deletar TODAS as issues e labels customizados!');
console.log('🔄 Iniciando limpeza em 3 segundos...');
console.log('   (Pressione Ctrl+C para cancelar)');

setTimeout(() => {
  cleanupRepository();
}, 3000); 
