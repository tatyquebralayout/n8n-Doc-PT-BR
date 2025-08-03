#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando execução de testes...\n');

// Função para executar comando e capturar output
function runCommand(command, description) {
  console.log(`📋 ${description}...`);
  try {
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'pipe',
      cwd: process.cwd(),
      timeout: 300000, // 5 minutos de timeout
    });
    console.log(`✅ ${description} - SUCESSO`);
    return { success: true, output };
  } catch (error) {
    console.log(`❌ ${description} - FALHA`);
    console.log(error.stdout || error.message);
    return { success: false, error: error.message, output: error.stdout };
  }
}

// Função para criar relatório
function createReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: Object.keys(results).length,
      passed: Object.values(results).filter(r => r.success).length,
      failed: Object.values(results).filter(r => !r.success).length,
    },
    details: results,
    recommendations: []
  };

  // Adicionar recomendações baseadas nos resultados
  if (results.unit && !results.unit.success) {
    report.recommendations.push('Verificar configuração do Jest e dependências');
  }
  
  if (results.e2e && !results.e2e.success) {
    report.recommendations.push('Verificar se o servidor está rodando na porta 3000');
    report.recommendations.push('Verificar se todas as páginas existem no build');
  }

  const reportPath = path.join(process.cwd(), 'test-results', 'test-report.json');
  const reportDir = path.dirname(reportPath);
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📊 Relatório salvo em: ${reportPath}`);
  
  return report;
}

// Função para exibir resumo
function displaySummary(report) {
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMO DOS TESTES');
  console.log('='.repeat(50));
  console.log(`Total de suites: ${report.summary.total}`);
  console.log(`✅ Passou: ${report.summary.passed}`);
  console.log(`❌ Falhou: ${report.summary.failed}`);
  console.log(`📈 Taxa de sucesso: ${((report.summary.passed / report.summary.total) * 100).toFixed(1)}%`);
  
  if (report.summary.failed > 0) {
    console.log('\n❌ Testes que falharam:');
    Object.entries(report.details).forEach(([name, result]) => {
      if (!result.success) {
        console.log(`  - ${name}: ${result.error || 'Erro desconhecido'}`);
      }
    });
  }

  if (report.recommendations.length > 0) {
    console.log('\n💡 Recomendações:');
    report.recommendations.forEach(rec => {
      console.log(`  - ${rec}`);
    });
  }
  
  console.log('='.repeat(50));
}

// Função para verificar se servidor está rodando
function checkServer() {
  try {
    execSync('curl -f http://localhost:3000 > /dev/null 2>&1', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Executar testes
async function runTests() {
  const results = {};
  
  // Verificar se servidor está rodando antes dos testes E2E
  console.log('🔍 Verificando se servidor está rodando...');
  if (!checkServer()) {
    console.log('⚠️  Servidor não está rodando. Iniciando servidor...');
    try {
      execSync('npm run start &', { stdio: 'ignore' });
      // Aguardar servidor iniciar
      await new Promise(resolve => setTimeout(resolve, 10000));
    } catch (error) {
      console.log('❌ Erro ao iniciar servidor');
    }
  }
  
  // Testes unitários
  results.unit = runCommand(
    'npm test -- --coverage --watchAll=false --verbose',
    'Executando testes unitários'
  );
  
  // Testes E2E
  results.e2e = runCommand(
    'npm run test:e2e -- --reporter=html,json,junit',
    'Executando testes E2E'
  );
  
  // Testes de acessibilidade
  results.accessibility = runCommand(
    'npm run test:accessibility',
    'Executando testes de acessibilidade'
  );
  
  // Testes de performance
  results.performance = runCommand(
    'npm run test:performance',
    'Executando testes de performance'
  );
  
  // Validação de qualidade
  results.quality = runCommand(
    'npm run quality-check',
    'Executando validação de qualidade'
  );
  
  // Criar relatório
  const report = createReport(results);
  
  // Exibir resumo
  displaySummary(report);
  
  // Retornar código de saída
  return report.summary.failed === 0 ? 0 : 1;
}

// Executar se chamado diretamente
if (require.main === module) {
  runTests().then(exitCode => {
    process.exit(exitCode);
  }).catch(error => {
    console.error('❌ Erro durante execução dos testes:', error);
    process.exit(1);
  });
}

module.exports = { runTests, createReport, displaySummary }; 