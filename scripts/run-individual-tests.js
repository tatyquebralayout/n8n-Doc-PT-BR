#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Executando testes individuais...\n');

// Função para executar comando
function runCommand(command, description) {
  console.log(`📋 ${description}...`);
  try {
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'pipe',
      cwd: process.cwd(),
      timeout: 120000, // 2 minutos por teste
    });
    console.log(`✅ ${description} - SUCESSO`);
    return { success: true, output };
  } catch (error) {
    console.log(`❌ ${description} - FALHA`);
    console.log(error.stdout || error.message);
    return { success: false, error: error.message };
  }
}

// Função para executar testes unitários individuais
function runUnitTests() {
  console.log('🧪 Executando testes unitários individuais...\n');
  
  const unitTests = [
    {
      name: 'IonicIcon',
      command: 'npm test -- --testNamePattern="IonicIcon" --coverage=false'
    },
    {
      name: 'CardGrid',
      command: 'npm test -- --testNamePattern="CardGrid" --coverage=false'
    },
    {
      name: 'ArticleCard',
      command: 'npm test -- --testNamePattern="ArticleCard" --coverage=false'
    }
  ];
  
  const results = {};
  
  for (const test of unitTests) {
    results[test.name] = runCommand(test.command, `Teste unitário: ${test.name}`);
  }
  
  return results;
}

// Função para executar testes E2E individuais
function runE2ETests() {
  console.log('\n🌐 Executando testes E2E individuais...\n');
  
  const e2eTests = [
    {
      name: 'Navegação',
      command: 'npm run test:e2e -- --grep="Navegação"'
    },
    {
      name: 'Componentes',
      command: 'npm run test:e2e -- --grep="Componentes"'
    },
    {
      name: 'Validação de Conteúdo',
      command: 'npm run test:e2e -- --grep="Validação de Conteúdo"'
    },
    {
      name: 'Acessibilidade',
      command: 'npm run test:e2e -- --grep="@accessibility"'
    },
    {
      name: 'Performance',
      command: 'npm run test:e2e -- --grep="@performance"'
    }
  ];
  
  const results = {};
  
  for (const test of e2eTests) {
    results[test.name] = runCommand(test.command, `Teste E2E: ${test.name}`);
  }
  
  return results;
}

// Função para criar relatório
function createReport(unitResults, e2eResults) {
  const allResults = { ...unitResults, ...e2eResults };
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: Object.keys(allResults).length,
      passed: Object.values(allResults).filter(r => r.success).length,
      failed: Object.values(allResults).filter(r => !r.success).length,
    },
    unitTests: unitResults,
    e2eTests: e2eResults,
    recommendations: []
  };

  // Adicionar recomendações
  const failedTests = Object.entries(allResults).filter(([name, result]) => !result.success);
  
  if (failedTests.length > 0) {
    report.recommendations.push('Verificar testes que falharam individualmente');
    failedTests.forEach(([name, result]) => {
      report.recommendations.push(`Investigar falha em: ${name}`);
    });
  }

  const reportPath = path.join(process.cwd(), 'test-results', 'individual-tests-report.json');
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
  console.log('📊 RESUMO DOS TESTES INDIVIDUAIS');
  console.log('='.repeat(50));
  console.log(`Total de testes: ${report.summary.total}`);
  console.log(`✅ Passou: ${report.summary.passed}`);
  console.log(`❌ Falhou: ${report.summary.failed}`);
  console.log(`📈 Taxa de sucesso: ${((report.summary.passed / report.summary.total) * 100).toFixed(1)}%`);
  
  if (report.summary.failed > 0) {
    console.log('\n❌ Testes que falharam:');
    Object.entries({ ...report.unitTests, ...report.e2eTests }).forEach(([name, result]) => {
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

// Função principal
async function main() {
  // Verificar se servidor está rodando
  console.log('🔍 Verificando servidor...');
  try {
    execSync('curl -f http://localhost:3000 > /dev/null 2>&1', { stdio: 'ignore' });
    console.log('✅ Servidor está rodando');
  } catch {
    console.log('⚠️  Servidor não está rodando. Iniciando...');
    try {
      execSync('npm run start &', { stdio: 'ignore' });
      await new Promise(resolve => setTimeout(resolve, 10000));
    } catch (error) {
      console.log('❌ Erro ao iniciar servidor');
    }
  }
  
  // Executar testes
  const unitResults = runUnitTests();
  const e2eResults = runE2ETests();
  
  // Criar relatório
  const report = createReport(unitResults, e2eResults);
  
  // Exibir resumo
  displaySummary(report);
  
  // Retornar código de saída
  return report.summary.failed === 0 ? 0 : 1;
}

// Executar se chamado diretamente
if (require.main === module) {
  main().then(exitCode => {
    process.exit(exitCode);
  }).catch(error => {
    console.error('❌ Erro durante execução dos testes:', error);
    process.exit(1);
  });
}

module.exports = { main, runUnitTests, runE2ETests, createReport }; 