#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

console.log('🖼️  Iniciando otimização de imagens...\n');

// Configurações de otimização
const optimizationConfig = {
  jpeg: {
    quality: 85,
    progressive: true,
    mozjpeg: true
  },
  png: {
    quality: 90,
    progressive: true,
    compressionLevel: 9
  },
  webp: {
    quality: 85,
    effort: 6
  }
};

// Função para encontrar todas as imagens
async function findImages(dir) {
  try {
    const files = await glob('**/*.{jpg,jpeg,png,webp}', { cwd: dir });
    return files;
  } catch (error) {
    throw error;
  }
}

// Função para otimizar uma imagem
async function optimizeImage(filePath) {
  try {
    const inputPath = path.join(process.cwd(), filePath);
    const tempPath = inputPath + '.tmp';
    
    // Verificar se o arquivo existe
    if (!fs.existsSync(inputPath)) {
      console.log(`   ⚠️  Arquivo não encontrado: ${filePath}`);
      return false;
    }
    
    // Obter estatísticas do arquivo original
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;
    
    // Determinar formato baseado na extensão
    const ext = path.extname(filePath).toLowerCase();
    let format = 'jpeg';
    
    if (ext === '.png') {
      format = 'png';
    } else if (ext === '.webp') {
      format = 'webp';
    }
    
    // Otimizar imagem
    const image = sharp(inputPath);
    
    // Aplicar configurações baseadas no formato
    if (format === 'jpeg') {
      image.jpeg(optimizationConfig.jpeg);
    } else if (format === 'png') {
      image.png(optimizationConfig.png);
    } else if (format === 'webp') {
      image.webp(optimizationConfig.webp);
    }
    
    // Salvar imagem otimizada em arquivo temporário
    await image.toFile(tempPath);
    
    // Substituir arquivo original
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, inputPath);
    
    // Obter estatísticas do arquivo otimizado
    const optimizedStats = fs.statSync(inputPath);
    const optimizedSize = optimizedStats.size;
    
    // Calcular redução
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`   ✅ ${filePath}: ${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB (${reduction}% redução)`);
    
    return {
      file: filePath,
      originalSize,
      optimizedSize,
      reduction: parseFloat(reduction)
    };
    
  } catch (error) {
    console.log(`   ❌ Erro ao otimizar ${filePath}: ${error.message}`);
    return false;
  }
}

// Função principal
async function optimizeImages() {
  try {
    console.log('🔍 Procurando imagens para otimizar...');
    
    // Encontrar todas as imagens
    const imageFiles = await findImages(process.cwd());
    
    if (imageFiles.length === 0) {
      console.log('   ℹ️  Nenhuma imagem encontrada para otimizar.');
      return;
    }
    
    console.log(`   📁 Encontradas ${imageFiles.length} imagens\n`);
    
    // Debug: mostrar algumas imagens encontradas
    console.log('   🔍 Primeiras 10 imagens encontradas:');
    imageFiles.slice(0, 10).forEach(file => {
      console.log(`      - ${file}`);
    });
    console.log('');
    
    // Filtrar apenas imagens em diretórios relevantes (excluir node_modules)
    const relevantImages = imageFiles.filter(file => 
      file.startsWith('static\\img\\') && 
      !file.includes('node_modules')
    );
    
    console.log(`   🎯 Otimizando ${relevantImages.length} imagens relevantes...\n`);
    
    // Otimizar cada imagem
    const results = [];
    let successCount = 0;
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    
    for (const imageFile of relevantImages) {
      const result = await optimizeImage(imageFile);
      if (result) {
        results.push(result);
        successCount++;
        totalOriginalSize += result.originalSize;
        totalOptimizedSize += result.optimizedSize;
      }
    }
    
    // Relatório final
    console.log('\n📊 RELATÓRIO DE OTIMIZAÇÃO:');
    console.log(`   ✅ Imagens otimizadas: ${successCount}/${relevantImages.length}`);
    console.log(`   📦 Tamanho total original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   📦 Tamanho total otimizado: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   💾 Redução total: ${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}%`);
    
    // Top 5 maiores reduções
    if (results.length > 0) {
      const topReductions = results
        .sort((a, b) => b.reduction - a.reduction)
        .slice(0, 5);
      
      console.log('\n🏆 TOP 5 MAIORES REDUÇÕES:');
      topReductions.forEach((result, index) => {
        console.log(`   ${index + 1}. ${result.file}: ${result.reduction}% redução`);
      });
    }
    
    console.log('\n✅ Otimização de imagens concluída!');
    
  } catch (error) {
    console.error('❌ Erro durante otimização:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  optimizeImages();
}

module.exports = { optimizeImages };