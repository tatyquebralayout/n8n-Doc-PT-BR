#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando build e páginas...\n');

// Função para verificar se arquivo existe
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Função para listar arquivos em diretório
function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name);
}

// Função para verificar build
function checkBuild() {
  console.log('📦 Verificando build...');
  
  try {
    // Executar build
    execSync('npm run build', { stdio: 'pipe' });
    console.log('✅ Build executado com sucesso');
    
    // Verificar se diretório build existe
    const buildDir = path.join(process.cwd(), 'build');
    if (!fileExists(buildDir)) {
      console.log('❌ Diretório build não encontrado');
      return false;
    }
    
    // Verificar páginas principais
    const mainPages = [
      'index.html',
      'primeiros-passos/index.html',
      'integracoes/index.html',
      'usando-n8n/index.html',
      'comunidade/index.html',
      'contribuir/index.html',
    ];
    
    console.log('📄 Verificando páginas principais...');
    for (const page of mainPages) {
      const pagePath = path.join(buildDir, page);
      if (fileExists(pagePath)) {
        console.log(`✅ ${page}`);
      } else {
        console.log(`❌ ${page} - NÃO ENCONTRADA`);
      }
    }
    
    return true;
  } catch (error) {
    console.log('❌ Erro durante build:', error.message);
    return false;
  }
}

// Função para verificar estrutura de docs
function checkDocsStructure() {
  console.log('\n📚 Verificando estrutura de documentação...');
  
  const docsDir = path.join(process.cwd(), 'docs');
  if (!fileExists(docsDir)) {
    console.log('❌ Diretório docs não encontrado');
    return false;
  }
  
  // Verificar diretórios principais
  const mainDirs = [
    'primeiros-passos',
    'integracoes',
    'usando-n8n',
    'comunidade',
    'contribuir',
  ];
  
  for (const dir of mainDirs) {
    const dirPath = path.join(docsDir, dir);
    if (fileExists(dirPath)) {
      const files = listFiles(dirPath);
      console.log(`✅ ${dir}/ (${files.length} arquivos)`);
      
      // Verificar se tem index
      if (!files.includes('index.mdx') && !files.includes('index.md')) {
        console.log(`⚠️  ${dir}/ - Sem arquivo index`);
      }
    } else {
      console.log(`❌ ${dir}/ - NÃO ENCONTRADO`);
    }
  }
  
  return true;
}

// Função para verificar configuração do Docusaurus
function checkDocusaurusConfig() {
  console.log('\n⚙️  Verificando configuração do Docusaurus...');
  
  const configFiles = [
    'docusaurus.config.js',
    'sidebars.js',
  ];
  
  for (const file of configFiles) {
    if (fileExists(file)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - NÃO ENCONTRADO`);
    }
  }
  
  return true;
}

// Função para gerar relatório
function generateReport(buildOk, docsOk, configOk) {
  const report = {
    timestamp: new Date().toISOString(),
    build: buildOk,
    docsStructure: docsOk,
    config: configOk,
    recommendations: []
  };
  
  if (!buildOk) {
    report.recommendations.push('Verificar erros de build e dependências');
  }
  
  if (!docsOk) {
    report.recommendations.push('Verificar estrutura de documentação');
  }
  
  if (!configOk) {
    report.recommendations.push('Verificar configuração do Docusaurus');
  }
  
  const reportPath = path.join(process.cwd(), 'test-results', 'build-report.json');
  const reportDir = path.dirname(reportPath);
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📊 Relatório salvo em: ${reportPath}`);
  
  return report;
}

// Função principal
async function main() {
  const buildOk = checkBuild();
  const docsOk = checkDocsStructure();
  const configOk = checkDocusaurusConfig();
  
  const report = generateReport(buildOk, docsOk, configOk);
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMO DA VERIFICAÇÃO');
  console.log('='.repeat(50));
  console.log(`Build: ${buildOk ? '✅ OK' : '❌ FALHOU'}`);
  console.log(`Estrutura de docs: ${docsOk ? '✅ OK' : '❌ FALHOU'}`);
  console.log(`Configuração: ${configOk ? '✅ OK' : '❌ FALHOU'}`);
  
  if (report.recommendations.length > 0) {
    console.log('\n💡 Recomendações:');
    report.recommendations.forEach(rec => {
      console.log(`  - ${rec}`);
    });
  }
  
  console.log('='.repeat(50));
  
  return buildOk && docsOk && configOk ? 0 : 1;
}

// Executar se chamado diretamente
if (require.main === module) {
  main().then(exitCode => {
    process.exit(exitCode);
  }).catch(error => {
    console.error('❌ Erro durante verificação:', error);
    process.exit(1);
  });
}

module.exports = { main, checkBuild, checkDocsStructure, checkDocusaurusConfig }; 