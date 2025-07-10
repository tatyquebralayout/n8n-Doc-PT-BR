require('dotenv').config();

const REPO_OWNER = process.env.REPO_OWNER || 'tatyquebralayout';
const REPO_NAME = process.env.REPO_NAME || 'n8n-Doc-pt-BR';

async function checkProjectAccess() {
  try {
    console.log('🔍 Verificando acesso ao projeto GitHub...\n');
    
    // Importar Octokit dinamicamente
    const { Octokit } = await import('@octokit/rest');
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
    
    // Verificar acesso ao repositório
    console.log(`📁 Testando acesso ao repositório: ${REPO_OWNER}/${REPO_NAME}`);
    try {
      await octokit.rest.repos.get({
        owner: REPO_OWNER,
        repo: REPO_NAME,
      });
      console.log('✅ Repositório acessível');
    } catch (error) {
      console.log('❌ Erro ao acessar repositório:', error.message);
      return;
    }
    
    // Verificar projetos clássicos do repositório
    console.log('\n📋 Verificando projetos clássicos do repositório...');
    try {
      const repoProjects = await octokit.rest.projects.listForRepo({
        owner: REPO_OWNER,
        repo: REPO_NAME,
      });
      console.log(`✅ Encontrados ${repoProjects.data.length} projetos clássicos no repositório`);
      repoProjects.data.forEach(project => {
        console.log(`  - ${project.name} (ID: ${project.id})`);
      });
    } catch (error) {
      console.log('❌ Erro ao listar projetos do repositório:', error.message);
    }
    
    // Verificar projetos clássicos do usuário
    console.log('\n👤 Verificando projetos clássicos do usuário...');
    try {
      const userProjects = await octokit.rest.projects.listForUser({
        username: REPO_OWNER,
      });
      console.log(`✅ Encontrados ${userProjects.data.length} projetos clássicos do usuário`);
      userProjects.data.forEach(project => {
        console.log(`  - ${project.name} (ID: ${project.id})`);
      });
    } catch (error) {
      console.log('❌ Erro ao listar projetos do usuário:', error.message);
    }
    
    // Verificar issues criadas
    console.log('\n📝 Verificando issues criadas...');
    try {
      const issues = await octokit.rest.issues.listForRepo({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        state: 'open',
        per_page: 20
      });
      console.log(`✅ Encontradas ${issues.data.length} issues abertas`);
      issues.data.forEach(issue => {
        console.log(`  - #${issue.number}: ${issue.title}`);
      });
    } catch (error) {
      console.log('❌ Erro ao listar issues:', error.message);
    }
    
    console.log('\n💡 Diagnóstico:');
    console.log('  • Projects V2 (novos) NÃO são acessíveis via API REST');
    console.log('  • Projects V2 usam GraphQL API, não REST API');
    console.log('  • URL https://github.com/users/tatyquebralayout/projects/7 pode estar privado');
    console.log('  • As issues foram criadas com sucesso e estão disponíveis');
    
    console.log('\n🔧 Soluções:');
    console.log('  1. Verifique se você está logado no GitHub');
    console.log('  2. Acesse: https://github.com/tatyquebralayout/n8n-Doc-pt-BR/issues');
    console.log('  3. Crie um novo projeto V2 se necessário');
    console.log('  4. Adicione as issues #2-#13 ao projeto manualmente');
    
  } catch (error) {
    console.error('❌ Erro durante a verificação:', error.message);
  }
}

checkProjectAccess(); 
