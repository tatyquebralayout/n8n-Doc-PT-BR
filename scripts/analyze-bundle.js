const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-analysis.html',
      generateStatsFile: true,
      statsFilename: 'bundle-stats.json',
    }),
  ],
};

// Script para executar análise de bundle
async function analyzeBundle() {
  console.log('🔍 Iniciando análise de bundle...');
  
  try {
    // Executar build com análise
    const { execSync } = require('child_process');
    
    // Configurar variável de ambiente para análise
    process.env.ANALYZE = 'true';
    
    console.log('📦 Executando build com análise...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('✅ Análise de bundle concluída!');
    console.log('📊 Relatórios gerados:');
    console.log('   - bundle-analysis.html (visualização interativa)');
    console.log('   - bundle-stats.json (dados detalhados)');
    
  } catch (error) {
    console.error('❌ Erro na análise de bundle:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  analyzeBundle();
}

module.exports = { analyzeBundle }; 