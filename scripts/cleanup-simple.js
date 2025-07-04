require('dotenv').config();

const REPO_OWNER = process.env.REPO_OWNER || 'tatyquebralayout';
const REPO_NAME = process.env.REPO_NAME || 'n8n-Doc-pt-BR';

async function simpleCleanup() {
  try {
    console.log('🧹 Limpeza simples - fechando issues e removendo labels...\n');
    
    // Importar Octokit dinamicamente
    const { Octokit } = await import('@octokit/rest');
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
    
    // 1. Fechar todas as issues abertas
    console.log('📝 Fechando todas as issues abertas...');
    try {
      const issues = await octokit.rest.issues.listForRepo({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        state: 'open',
        per_page: 100
      });
      
      console.log(`📋 Encontradas ${issues.data.length} issues abertas`);
      
      let closedIssues = 0;
      for (const issue of issues.data) {
        if (!issue.pull_request) {
          try {
            await octokit.rest.issues.update({
              owner: REPO_OWNER,
              repo: REPO_NAME,
              issue_number: issue.number,
              state: 'closed'
            });
            
            console.log(`  ✅ Fechada: #${issue.number} - ${issue.title}`);
            closedIssues++;
            
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (error) {
            console.log(`  ❌ Erro ao fechar #${issue.number}: ${error.message}`);
          }
        }
      }
      
      console.log(`✅ ${closedIssues} issues fechadas\n`);
      
    } catch (error) {
      console.log(`❌ Erro ao listar issues: ${error.message}\n`);
    }
    
    // 2. Deletar labels customizados (mantendo os padrão)
    console.log('🏷️ Removendo labels customizados...');
    try {
      const labels = await octokit.rest.issues.listLabelsForRepo({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        per_page: 100
      });
      
      console.log(`🏷️ Encontrados ${labels.data.length} labels`);
      
      // Labels padrão que devemos manter
      const keepLabels = [
        'bug', 'documentation', 'duplicate', 'enhancement', 
        'good first issue', 'help wanted', 'invalid', 'question', 'wontfix'
      ];
      
      let deletedLabels = 0;
      for (const label of labels.data) {
        if (!keepLabels.includes(label.name.toLowerCase())) {
          try {
            await octokit.rest.issues.deleteLabel({
              owner: REPO_OWNER,
              repo: REPO_NAME,
              name: label.name
            });
            
            console.log(`  ✅ Removido: ${label.name}`);
            deletedLabels++;
            
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (error) {
            console.log(`  ❌ Erro ao remover "${label.name}": ${error.message}`);
          }
        } else {
          console.log(`  ➡️ Mantido: ${label.name}`);
        }
      }
      
      console.log(`✅ ${deletedLabels} labels removidos\n`);
      
    } catch (error) {
      console.log(`❌ Erro ao processar labels: ${error.message}\n`);
    }
    
    // 3. Resumo
    console.log('🎉 Limpeza concluída!\n');
    console.log('📊 O que foi feito:');
    console.log('  ✅ Issues fechadas');
    console.log('  ✅ Labels customizados removidos');
    console.log('  ✅ Repositório limpo');
    
    console.log('\n💡 Próximos passos:');
    console.log('  1. Execute: npm run setup-projects');
    console.log('  2. Execute: npm run create-project-v2');
    console.log('  3. Comece do zero! 🚀');
    
  } catch (error) {
    console.error('❌ Erro durante limpeza:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n💡 Erro de autenticação. Verifique se:');
      console.log('  - GITHUB_TOKEN está configurado corretamente');
      console.log('  - Token tem permissões: repo, issues, project');
      console.log('  - Token não expirou');
    }
  }
}

simpleCleanup(); 