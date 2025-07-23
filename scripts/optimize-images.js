#!/usr/bin/env node

/**
 * Script para otimizar e comprimir imagens
 * Comprime imagens PNG, JPG, JPEG, WebP e SVG para melhorar performance
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ImageOptimizer {
  constructor() {
    this.stats = {
      totalFiles: 0,
      optimizedFiles: 0,
      totalSizeBefore: 0,
      totalSizeAfter: 0,
      errors: 0
    };
    
    this.supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
    this.imageDirs = ['static/img', 'docs', 'src/assets', 'static/assets'];
  }

  async optimize() {
    console.log('🖼️  Iniciando otimização de imagens...\n');
    
    try {
      await this.checkDependencies();
      await this.findAndOptimizeImages();
      await this.generateReport();
    } catch (error) {
      console.error('❌ Erro durante otimização:', error.message);
      process.exit(1);
    }
  }

  async checkDependencies() {
    console.log('🔍 Verificando dependências...');
    
    const dependencies = [
      { cmd: 'npx imagemin-cli --version', name: 'imagemin-cli', install: 'npm install -g imagemin-cli' },
      { cmd: 'npx svgo --version', name: 'svgo', install: 'npm install -g svgo' }
    ];

    for (const dep of dependencies) {
      try {
        execSync(dep.cmd, { stdio: 'ignore' });
        console.log(`✅ ${dep.name} disponível`);
      } catch (error) {
        console.log(`⚠️  ${dep.name} não encontrado. Instalando...`);
        try {
          execSync(dep.install, { stdio: 'inherit' });
          console.log(`✅ ${dep.name} instalado com sucesso`);
        } catch (installError) {
          console.warn(`⚠️  Não foi possível instalar ${dep.name}. Continuando sem esta otimização.`);
        }
      }
    }
    console.log('');
  }

  async findAndOptimizeImages() {
    for (const dir of this.imageDirs) {
      if (fs.existsSync(dir)) {
        console.log(`📁 Processando diretório: ${dir}`);
        await this.processDirectory(dir);
      }
    }
  }

  async processDirectory(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        await this.processDirectory(fullPath);
      } else if (this.isImageFile(file.name)) {
        await this.optimizeImage(fullPath);
      }
    }
  }

  isImageFile(filename) {
    const ext = path.extname(filename).toLowerCase();
    return this.supportedFormats.includes(ext);
  }

  async optimizeImage(imagePath) {
    try {
      const originalSize = fs.statSync(imagePath).size;
      const ext = path.extname(imagePath).toLowerCase();
      
      this.stats.totalFiles++;
      this.stats.totalSizeBefore += originalSize;
      
      console.log(`   🔧 Otimizando: ${imagePath}`);
      
      let optimized = false;
      
      if (ext === '.svg') {
        optimized = await this.optimizeSVG(imagePath);
      } else if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        optimized = await this.optimizeRasterImage(imagePath);
      }
      
      if (optimized) {
        const newSize = fs.statSync(imagePath).size;
        this.stats.totalSizeAfter += newSize;
        this.stats.optimizedFiles++;
        
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
        console.log(`   ✅ Reduzido em ${savings}% (${this.formatBytes(originalSize)} → ${this.formatBytes(newSize)})`);
      } else {
        this.stats.totalSizeAfter += originalSize;
        console.log(`   ℹ️  Já otimizada ou erro na otimização`);
      }
      
    } catch (error) {
      this.stats.errors++;
      console.error(`   ❌ Erro ao otimizar ${imagePath}:`, error.message);
    }
  }

  async optimizeSVG(imagePath) {
    try {
      const command = `npx svgo "${imagePath}" --output "${imagePath}" --config='{"plugins":[{"name":"preset-default","params":{"overrides":{"removeViewBox":false}}}]}'`;
      execSync(command, { stdio: 'ignore' });
      return true;
    } catch (error) {
      return false;
    }
  }

  async optimizeRasterImage(imagePath) {
    try {
      const dir = path.dirname(imagePath);
      const filename = path.basename(imagePath);
      const tempPath = path.join(dir, `temp_${filename}`);
      
      // Criar cópia temporária
      fs.copyFileSync(imagePath, tempPath);
      
      const command = `npx imagemin "${tempPath}" --out-dir="${dir}" --plugin=imagemin-mozjpeg --plugin=imagemin-pngquant`;
      execSync(command, { stdio: 'ignore' });
      
      // Verificar se a otimização gerou arquivo menor
      const optimizedPath = path.join(dir, filename);
      if (fs.existsSync(optimizedPath)) {
        const originalSize = fs.statSync(tempPath).size;
        const optimizedSize = fs.statSync(optimizedPath).size;
        
        if (optimizedSize < originalSize) {
          fs.unlinkSync(tempPath);
          return true;
        } else {
          // Se não houve melhoria, manter original
          fs.copyFileSync(tempPath, imagePath);
          fs.unlinkSync(tempPath);
          return false;
        }
      }
      
      fs.unlinkSync(tempPath);
      return false;
    } catch (error) {
      return false;
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RELATÓRIO DE OTIMIZAÇÃO DE IMAGENS');
    console.log('='.repeat(60));
    
    console.log(`📁 Arquivos processados: ${this.stats.totalFiles}`);
    console.log(`✅ Arquivos otimizados: ${this.stats.optimizedFiles}`);
    console.log(`❌ Erros: ${this.stats.errors}`);
    
    const totalSavings = this.stats.totalSizeBefore - this.stats.totalSizeAfter;
    const savingsPercent = this.stats.totalSizeBefore > 0 
      ? ((totalSavings / this.stats.totalSizeBefore) * 100).toFixed(1)
      : 0;
    
    console.log(`💾 Tamanho original: ${this.formatBytes(this.stats.totalSizeBefore)}`);
    console.log(`💾 Tamanho final: ${this.formatBytes(this.stats.totalSizeAfter)}`);
    console.log(`💰 Economia total: ${this.formatBytes(totalSavings)} (${savingsPercent}%)`);
    
    // Gerar relatório JSON
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      totalSavings,
      savingsPercent: parseFloat(savingsPercent)
    };
    
    fs.writeFileSync('optimization-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 Relatório detalhado salvo em: optimization-report.json');
    
    if (this.stats.errors > 0) {
      console.log(`\n⚠️  ${this.stats.errors} erro(s) encontrado(s). Verifique os logs acima.`);
    }
    
    if (totalSavings > 0) {
      console.log('\n🎉 Otimização concluída com sucesso!');
    } else {
      console.log('\nℹ️  Nenhuma otimização adicional possível.');
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const optimizer = new ImageOptimizer();
  optimizer.optimize().catch(console.error);
}

module.exports = ImageOptimizer;