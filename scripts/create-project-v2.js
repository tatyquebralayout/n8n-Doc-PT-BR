require('dotenv').config();

const REPO_OWNER = process.env.REPO_OWNER || 'tatyquebralayout';
const REPO_NAME = process.env.REPO_NAME || 'n8n-Doc-pt-BR';

// Configuração do projeto V2
const PROJECT_CONFIG = {
  title: '📋 n8n Documentação PT-BR',
  description: 'Projeto para gerenciar a criação e manutenção da documentação n8n em português brasileiro',
  visibility: 'PRIVATE', // ou 'PUBLIC'
  template: 'FEATURE_BOARD' // ou 'TABLE', 'ROADMAP', 'BUG_TRIAGE'
};

// Issues que queremos adicionar ao projeto
const ISSUES_TO_ADD = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

async function createProjectV2() {
  try {
    console.log('🚀 Criando Project V2 usando GraphQL API...\n');
    
    // Importar graphql-request
    const { GraphQLClient } = await import('graphql-request');
    
    // Configurar cliente GraphQL
    const client = new GraphQLClient('https://api.github.com/graphql', {
      headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'n8ndoc-automation'
      },
    });
    
    // 1. Primeiro, obter o ID do usuário/organização
    console.log('👤 Obtendo informações do usuário...');
    const userQuery = `
      query GetUser($login: String!) {
        user(login: $login) {
          id
          login
          name
        }
      }
    `;
    
    const userData = await client.request(userQuery, { login: REPO_OWNER });
    const ownerId = userData.user.id;
    console.log(`✅ Usuário encontrado: ${userData.user.name} (${userData.user.login})`);
    
    // 2. Criar o projeto V2
    console.log('\n📋 Criando Project V2...');
    const createProjectMutation = `
      mutation CreateProjectV2($ownerId: ID!, $title: String!) {
        createProjectV2(input: {
          ownerId: $ownerId
          title: $title
        }) {
          projectV2 {
            id
            number
            title
            url
            shortDescription
            public
            closed
            createdAt
            updatedAt
          }
        }
      }
    `;
    
    const projectData = await client.request(createProjectMutation, {
      ownerId: ownerId,
      title: PROJECT_CONFIG.title
    });
    
    const project = projectData.createProjectV2.projectV2;
    console.log(`✅ Projeto criado: ${project.title}`);
    console.log(`   📊 Número: #${project.number}`);
    console.log(`   🔗 URL: ${project.url}`);
    console.log(`   🆔 ID: ${project.id}`);
    
    // 3. Obter informações do repositório para pegar as issues
    console.log('\n📝 Obtendo issues do repositório...');
    const repoQuery = `
      query GetRepository($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          id
          issues(first: 20, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
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
    
    const repoData = await client.request(repoQuery, {
      owner: REPO_OWNER,
      name: REPO_NAME
    });
    
    const issues = repoData.repository.issues.nodes;
    console.log(`✅ Encontradas ${issues.length} issues`);
    
    // 4. Adicionar issues ao projeto
    console.log('\n➕ Adicionando issues ao projeto...');
    let addedIssues = 0;
    
    for (const issue of issues) {
      if (ISSUES_TO_ADD.includes(issue.number)) {
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
          projectId: project.id,
          contentId: issue.id
        });
          
          console.log(`  ✅ Adicionada: #${issue.number} - ${issue.title}`);
          addedIssues++;
          
          // Pequena pausa para evitar rate limiting
          await new Promise(resolve => setTimeout(resolve, 200));
          
        } catch (error) {
          console.log(`  ❌ Erro ao adicionar #${issue.number}: ${error.message}`);
        }
      }
    }
    
    // 5. Criar campos customizados (opcional)
    console.log('\n🏷️ Configurando campos customizados...');
    
    const createFieldMutation = `
      mutation CreateProjectV2Field($projectId: ID!, $dataType: ProjectV2CustomFieldType!, $name: String!, $options: [ProjectV2SingleSelectFieldOptionInput!]) {
        createProjectV2Field(input: {
          projectId: $projectId
          dataType: $dataType
          name: $name
          singleSelectOptions: $options
        }) {
          projectV2Field {
            id
            name
          }
        }
      }
    `;
    
    // Campo de Prioridade
    try {
      const priorityOptions = [
        { name: "🔴 Alta", color: "RED" },
        { name: "🟡 Média", color: "YELLOW" },
        { name: "🟢 Baixa", color: "GREEN" }
      ];
      
      await client.request(createFieldMutation, {
        projectId: project.id,
        dataType: 'SINGLE_SELECT',
        name: 'Prioridade',
        options: priorityOptions
      });
      
      console.log('  ✅ Campo "Prioridade" criado');
    } catch (error) {
      console.log(`  ➡️ Campo "Prioridade" pode já existir: ${error.message}`);
    }
    
    // Campo de Categoria
    try {
      const categoryOptions = [
        { name: "📝 Documentação", color: "PINK" },
        { name: "🎨 Design", color: "BLUE" },
        { name: "🌎 Brasil", color: "GREEN" },
        { name: "🚀 Infraestrutura", color: "ORANGE" }
      ];
      
      await client.request(createFieldMutation, {
        projectId: project.id,
        dataType: 'SINGLE_SELECT',
        name: 'Categoria',
        options: categoryOptions
      });
      
      console.log('  ✅ Campo "Categoria" criado');
    } catch (error) {
      console.log(`  ➡️ Campo "Categoria" pode já existir: ${error.message}`);
    }
    
    // 6. Resumo final
    console.log('\n🎉 Project V2 criado com sucesso!\n');
    console.log('📊 Resumo:');
    console.log(`  ✅ Projeto: ${project.title}`);
    console.log(`  📋 Número: #${project.number}`);
    console.log(`  🔗 URL: ${project.url}`);
    console.log(`  📝 Issues adicionadas: ${addedIssues}/${ISSUES_TO_ADD.length}`);
    console.log(`  🏷️ Campos customizados: Prioridade, Categoria`);
    
    console.log('\n🔗 Links úteis:');
    console.log(`  📊 Projeto V2: ${project.url}`);
    console.log(`  📋 Issues: https://github.com/${REPO_OWNER}/${REPO_NAME}/issues`);
    console.log(`  🏷️ Labels: https://github.com/${REPO_OWNER}/${REPO_NAME}/labels`);
    
    console.log('\n💡 Próximos passos:');
    console.log('  1. Acesse o projeto V2 criado');
    console.log('  2. Configure automações baseadas em labels');
    console.log('  3. Organize as issues nas colunas desejadas');
    console.log('  4. Defina responsáveis e deadlines');
    console.log('  5. Comece a trabalhar! 🚀');
    
    return project;
    
  } catch (error) {
    console.error('❌ Erro ao criar Project V2:', error.message);
    
    if (error.message.includes('graphql-request')) {
      console.log('\n💡 Instalando dependência necessária...');
      console.log('Execute: npm install graphql-request');
    }
    
    if (error.message.includes('authentication')) {
      console.log('\n💡 Verifique se o GITHUB_TOKEN está correto e tem as permissões:');
      console.log('  - repo (acesso total ao repositório)');
      console.log('  - project (acesso aos projetos)');
    }
  }
}

// Adicionar comando para instalar dependência se necessário
async function installDependencies() {
  try {
    await import('graphql-request');
    return true;
  } catch (error) {
    console.log('📦 Instalando graphql-request...');
    const { exec } = require('child_process');
    return new Promise((resolve) => {
      exec('npm install graphql-request', (error, _stdout, _stderr) => {
        if (error) {
          console.log('❌ Erro ao instalar dependência:', error.message);
          resolve(false);
        } else {
          console.log('✅ Dependência instalada com sucesso');
          resolve(true);
        }
      });
    });
  }
}

async function main() {
  const hasGraphQL = await installDependencies();
  if (hasGraphQL) {
    await createProjectV2();
  }
}

main(); 
