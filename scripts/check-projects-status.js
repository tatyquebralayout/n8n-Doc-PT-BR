#!/usr/bin/env node

/**
 * Script para verificar status dos projetos GitHub
 * Uso: node scripts/check-projects-status.js
 */

const fs = require('fs');
const path = require('path');

// Tentar carregar .env se existir
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=');
        process.env[key.trim()] = value.trim();
      }
    }
  });
}

const REPO_OWNER = process.env.REPO_OWNER || 'tatyquebralayout';
const REPO_NAME = process.env.REPO_NAME || 'n8n-Doc-pt-BR';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN não encontrado nas variáveis de ambiente');
  process.exit(1);
}

let octokit;

async function checkProjectsStatus() {
  try {
    // Importar Octokit dinamicamente
    const { Octokit } = await import('@octokit/rest');
    octokit = new Octokit({ auth: GITHUB_TOKEN });
    
    console.log('🔍 Verificando status dos projetos GitHub...\n');
    console.log(`📁 Repositório: ${REPO_OWNER}/${REPO_NAME}\n`);

    // Listar projetos
    const { data: projects } = await octokit.rest.projects.listForRepo({
      owner: REPO_OWNER,
      repo: REPO_NAME,
    });

    if (projects.length === 0) {
      console.log('📭 Nenhum projeto encontrado.');
      console.log('💡 Execute: npm run setup-projects para criar os projetos');
      return;
    }

    console.log(`📊 Encontrados ${projects.length} projetos:\n`);

    for (const project of projects) {
      console.log(`🔹 **${project.name}**`);
      console.log(`   📝 Descrição: ${project.body || 'Sem descrição'}`);
      console.log(`   🔗 URL: ${project.html_url}`);
      console.log(`   📅 Criado: ${new Date(project.created_at).toLocaleDateString('pt-BR')}`);
      console.log(`   📈 Status: ${project.state}`);

      // Listar colunas
      try {
        const { data: columns } = await octokit.rest.projects.listColumns({
          project_id: project.id,
        });

        console.log(`   📋 Colunas (${columns.length}):`);
        
        for (const column of columns) {
          // Contar cards na coluna
          const { data: cards } = await octokit.rest.projects.listCards({
            column_id: column.id,
          });
          
          console.log(`      • ${column.name}: ${cards.length} cards`);
        }
      } catch (error) {
        console.log(`   ❌ Erro ao buscar colunas: ${error.message}`);
      }

      console.log(''); // Linha em branco
    }

    // Listar issues relacionadas
    const { data: issues } = await octokit.rest.issues.listForRepo({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      state: 'all',
    });

    const openIssues = issues.filter(issue => issue.state === 'open');
    const closedIssues = issues.filter(issue => issue.state === 'closed');

    console.log('📝 **Resumo de Issues:**');
    console.log(`   🟢 Abertas: ${openIssues.length}`);
    console.log(`   ✅ Fechadas: ${closedIssues.length}`);
    console.log(`   📊 Total: ${issues.length}`);

    if (openIssues.length > 0) {
      console.log('\n🔥 **Issues Abertas Prioritárias:**');
      openIssues
        .filter(issue => issue.labels.some(label => label.name.includes('high-priority')))
        .slice(0, 5)
        .forEach(issue => {
          console.log(`   • ${issue.title}`);
          console.log(`     🔗 ${issue.html_url}`);
        });
    }

    console.log('\n✨ **Status dos Projetos Verificado!**');

  } catch (error) {
    console.error('❌ Erro ao verificar projetos:', error.message);
  }
}

if (require.main === module) {
  checkProjectsStatus().catch(console.error);
}

module.exports = { checkProjectsStatus }; 
