#!/usr/bin/env node

/**
 * Script para adicionar issues de documentação ao projeto GitHub
 * Busca todas as issues abertas e adiciona ao projeto de documentação
 */

import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const OWNER = 'tatyquebralayout';
const REPO = 'n8n-Doc-pt-BR';

// Função para buscar projeto por nome
async function findProjectByName(projectName) {
  try {
    console.log(`🔍 Buscando projeto: ${projectName}...`);
    
    const { data: projects } = await octokit.rest.projects.listForRepo({
      owner: OWNER,
      repo: REPO,
    });
    
    const project = projects.find(p => p.name === projectName);
    
    if (project) {
      console.log(`✅ Projeto encontrado: ${project.html_url}`);
      return project;
    } else {
      console.log(`❌ Projeto não encontrado: ${projectName}`);
      return null;
    }
  } catch (error) {
    console.error('❌ Erro ao buscar projeto:', error.message);
    return null;
  }
}

// Função para buscar colunas do projeto
async function getProjectColumns(projectId) {
  try {
    console.log('📋 Buscando colunas do projeto...');
    
    const { data: columns } = await octokit.rest.projects.listColumns({
      project_id: projectId,
    });
    
    console.log(`✅ Encontradas ${columns.length} colunas`);
    return columns;
  } catch (error) {
    console.error('❌ Erro ao buscar colunas:', error.message);
    return [];
  }
}

// Função para criar colunas padrão se não existirem
async function createDefaultColumns(projectId) {
  try {
    console.log('🏗️  Criando colunas padrão...');
    
    const defaultColumns = [
      { name: '📋 Backlog', position: 'first' },
      { name: '🔴 Crítica', position: 'last' },
      { name: '🟠 Alta Prioridade', position: 'last' },
      { name: '🟡 Média Prioridade', position: 'last' },
      { name: '🟢 Baixa Prioridade', position: 'last' },
      { name: '🚀 Em Progresso', position: 'last' },
      { name: '✅ Concluído', position: 'last' }
    ];
    
    const createdColumns = [];
    
    for (const column of defaultColumns) {
      try {
        const response = await octokit.rest.projects.createColumn({
          project_id: projectId,
          name: column.name,
        });
        
        console.log(`   ✅ Coluna criada: ${column.name}`);
        createdColumns.push(response.data);
      } catch (error) {
        if (error.status === 422) {
          console.log(`   ⚠️  Coluna já existe: ${column.name}`);
        } else {
          console.error(`   ❌ Erro ao criar coluna ${column.name}:`, error.message);
        }
      }
    }
    
    return createdColumns;
  } catch (error) {
    console.error('❌ Erro ao criar colunas:', error.message);
    return [];
  }
}

// Função para buscar issues de documentação
async function getDocumentationIssues() {
  try {
    console.log('📝 Buscando issues de documentação...');
    
    const { data: issues } = await octokit.rest.issues.listForRepo({
      owner: OWNER,
      repo: REPO,
      state: 'open',
      per_page: 100,
    });
    
    // Filtrar apenas issues (não PRs) que são de documentação
    const docIssues = issues.filter(issue => 
      !issue.pull_request && 
      issue.labels.some(label => 
        label.name.includes('📝 Tradução') || 
        label.name.includes('🆕 Criação') ||
        label.name.includes('🔄 Atualização') ||
        label.name.includes('Getting Started') ||
        label.name.includes('Integrações') ||
        label.name.includes('Hosting') ||
        label.name.includes('AI Avançada') ||
        label.name.includes('API') ||
        label.name.includes('Dados') ||
        label.name.includes('PIX') ||
        label.name.includes('Governo')
      )
    );
    
    console.log(`✅ Encontradas ${docIssues.length} issues de documentação`);
    return docIssues;
  } catch (error) {
    console.error('❌ Erro ao buscar issues:', error.message);
    return [];
  }
}

// Função para determinar coluna baseada nas labels
function determineColumn(issue, columns) {
  const labels = issue.labels.map(label => label.name);
  
  // Prioridade baseada nas labels
  if (labels.includes('🔴 Crítica')) {
    return columns.find(col => col.name === '🔴 Crítica');
  } else if (labels.includes('🟠 Alta')) {
    return columns.find(col => col.name === '🟠 Alta Prioridade');
  } else if (labels.includes('🟡 Média')) {
    return columns.find(col => col.name === '🟡 Média Prioridade');
  } else if (labels.includes('🟢 Baixa')) {
    return columns.find(col => col.name === '🟢 Baixa Prioridade');
  }
  
  // Se não encontrar prioridade, colocar no backlog
  return columns.find(col => col.name === '📋 Backlog');
}

// Função para adicionar issue ao projeto
async function addIssueToProject(issue, columnId) {
  try {
    const response = await octokit.rest.projects.createCard({
      column_id: columnId,
      content_id: issue.id,
      content_type: 'Issue',
    });
    
    console.log(`   ✅ Issue #${issue.number} adicionada: ${issue.title}`);
    return response.data;
  } catch (error) {
    if (error.status === 422) {
      console.log(`   ⚠️  Issue #${issue.number} já está no projeto`);
    } else {
      console.error(`   ❌ Erro ao adicionar issue #${issue.number}:`, error.message);
    }
    return null;
  }
}

// Função principal
async function main() {
  try {
    console.log('🚀 Iniciando adição de issues ao projeto de documentação...\n');
    
    // 1. Buscar projeto
    const project = await findProjectByName('📚 Documentação n8n Brasil');
    if (!project) {
      console.error('❌ Projeto não encontrado. Execute primeiro o script create-documentation-project.mjs');
      process.exit(1);
    }
    console.log('');
    
    // 2. Buscar/criar colunas
    let columns = await getProjectColumns(project.id);
    if (columns.length === 0) {
      columns = await createDefaultColumns(project.id);
    }
    console.log('');
    
    // 3. Buscar issues de documentação
    const issues = await getDocumentationIssues();
    if (issues.length === 0) {
      console.log('⚠️  Nenhuma issue de documentação encontrada');
      process.exit(0);
    }
    console.log('');
    
    // 4. Adicionar issues ao projeto
    console.log('📌 Adicionando issues ao projeto...');
    let addedCount = 0;
    
    for (const issue of issues) {
      const targetColumn = determineColumn(issue, columns);
      
      if (targetColumn) {
        const card = await addIssueToProject(issue, targetColumn.id);
        if (card) {
          addedCount++;
        }
        
        // Delay para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        console.log(`   ⚠️  Coluna não encontrada para issue #${issue.number}`);
      }
    }
    
    console.log('');
    
    // Resumo final
    console.log('🎉 ISSUES ADICIONADAS AO PROJETO COM SUCESSO!');
    console.log('');
    console.log('📊 RESUMO:');
    console.log(`   📝 ${issues.length} issues de documentação encontradas`);
    console.log(`   📌 ${addedCount} issues adicionadas ao projeto`);
    console.log(`   📋 ${columns.length} colunas organizadas`);
    console.log('');
    console.log('🎯 PRÓXIMOS PASSOS:');
    console.log('   1. Revisar organização das issues no projeto');
    console.log('   2. Atribuir responsáveis às issues');
    console.log('   3. Começar pelas issues críticas');
    console.log('   4. Configurar automações do projeto');
    console.log(`   5. Acessar projeto: ${project.html_url}`);
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
    process.exit(1);
  }
}

// Executar script
main(); 