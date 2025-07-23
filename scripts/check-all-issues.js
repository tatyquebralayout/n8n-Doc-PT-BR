#!/usr/bin/env node

const { findBrokenLinks } = require('./find-broken-links');
const { findDuplicateRoutes } = require('./find-duplicate-routes');
const { findBrokenAnchors } = require('./find-broken-anchors');

// Cores para output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

async function checkAllIssues() {
  console.log(colorize('🔍 VERIFICAÇÃO COMPLETA DE PROBLEMAS', 'bold'));
  console.log(colorize('=====================================', 'blue'));
  console.log('');

  const startTime = Date.now();

  try {
    // 1. Verificar links quebrados
    console.log(colorize('1️⃣  VERIFICANDO LINKS QUEBRADOS', 'bold'));
    console.log(colorize('--------------------------------', 'blue'));
    await findBrokenLinks();
    console.log('');

    // 2. Verificar rotas duplicadas
    console.log(colorize('2️⃣  VERIFICANDO ROTAS DUPLICADAS', 'bold'));
    console.log(colorize('----------------------------------', 'blue'));
    await findDuplicateRoutes();
    console.log('');

    // 3. Verificar âncoras quebradas
    console.log(colorize('3️⃣  VERIFICANDO ÂNCORAS QUEBRADAS', 'bold'));
    console.log(colorize('-----------------------------------', 'blue'));
    await findBrokenAnchors();
    console.log('');

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    console.log(colorize('✅ VERIFICAÇÃO CONCLUÍDA', 'bold'));
    console.log(colorize(`⏱️  Tempo total: ${duration.toFixed(2)} segundos`, 'blue'));
    console.log('');
    console.log(colorize('💡 PRÓXIMOS PASSOS:', 'bold'));
    console.log('   1. Revise os problemas encontrados acima');
    console.log('   2. Corrija links quebrados apontando para arquivos corretos');
    console.log('   3. Remova arquivos duplicados ou use slugs únicos');
    console.log('   4. Corrija âncoras quebradas usando títulos válidos');
    console.log('   5. Execute novamente para verificar as correções');

  } catch (error) {
    console.log(colorize(`❌ Erro durante a verificação: ${error.message}`, 'red'));
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  checkAllIssues();
}

module.exports = { checkAllIssues }; 