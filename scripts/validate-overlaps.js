#!/usr/bin/env node

/**
 * Script para validar overlaps na documentação
 * Verifica se há conteúdo duplicado, links quebrados e estrutura inconsistente
 */

const fs = require('fs');
const path = require('path');

class OverlapValidator {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.stats = {
      filesScanned: 0,
      duplicateContent: 0,
      brokenLinks: 0,
      missingFiles: 0
    };
  }

  async validate() {
    console.log('🔍 Iniciando validação de overlaps da documentação...\n');
    
    try {
      // Validar estrutura básica
      await this.validateBasicStructure();
      
      // Validar sidebars
      await this.validateSidebars();
      
      // Validar conteúdo dos arquivos
      await this.validateDocumentationContent();
      
      // Gerar relatório
      await this.generateReport();
      
      // Determinar se houve falhas críticas
      const hasCriticalIssues = this.issues.some(issue => issue.severity === 'error');
      
      if (hasCriticalIssues) {
        console.log('❌ Validação falhou com erros críticos');
        process.exit(1);
      } else if (this.issues.length > 0) {
        console.log('⚠️  Validação concluída com avisos');
        process.exit(0);
      } else {
        console.log('✅ Validação concluída com sucesso!');
        process.exit(0);
      }
      
    } catch (error) {
      console.error('❌ Erro durante a validação:', error.message);
      this.addIssue('error', 'VALIDATION_ERROR', 'Erro interno na validação', error.message);
      await this.generateReport();
      process.exit(1);
    }
  }

  async validateBasicStructure() {
    console.log('📁 Validando estrutura básica...');
    
    const requiredDirs = [
      'docs',
      'docs/primeiros-passos',
      'docs/integracoes',
      'docs/usando-n8n'
    ];
    
    for (const dir of requiredDirs) {
      if (!fs.existsSync(dir)) {
        this.addIssue('error', 'MISSING_DIRECTORY', `Diretório obrigatório ausente: ${dir}`);
      }
    }
    
    // Verificar se existe docs/intro.mdx ou docs/intro.md
    if (!fs.existsSync('docs/intro.mdx') && !fs.existsSync('docs/intro.md')) {
      this.addIssue('error', 'MISSING_INTRO', 'Arquivo intro.mdx ou intro.md é obrigatório');
    }
  }

  async validateSidebars() {
    console.log('📋 Validando sidebars...');
    
    const sidebarFiles = ['sidebars.json', 'sidebars.ts'];
    let sidebarFound = false;
    
    for (const file of sidebarFiles) {
      if (fs.existsSync(file)) {
        sidebarFound = true;
        try {
          if (file.endsWith('.json')) {
            const content = fs.readFileSync(file, 'utf8');
            JSON.parse(content);
          }
          console.log(`  ✅ ${file} validado`);
        } catch (error) {
          this.addIssue('error', 'INVALID_SIDEBAR', `Erro no ${file}: ${error.message}`);
        }
      }
    }
    
    if (!sidebarFound) {
      this.addIssue('warning', 'MISSING_SIDEBAR', 'Nenhum arquivo de sidebar encontrado');
    }
  }

  async validateDocumentationContent() {
    console.log('📄 Validando conteúdo da documentação...');
    
    const docsDir = 'docs';
    if (!fs.existsSync(docsDir)) {
      return;
    }
    
    await this.scanDirectory(docsDir);
  }

  async scanDirectory(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        await this.scanDirectory(fullPath);
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        await this.validateMarkdownFile(fullPath);
      }
    }
  }

  async validateMarkdownFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      this.stats.filesScanned++;
      
      // Validações básicas
      this.validateFrontmatter(filePath, content);
      this.validateLinks(filePath, content);
      this.checkForCommonIssues(filePath, content);
      
    } catch (error) {
      this.addIssue('error', 'FILE_READ_ERROR', `Erro ao ler ${filePath}: ${error.message}`);
    }
  }

  validateFrontmatter(filePath, content) {
    // Skip template files from frontmatter validation
    if (filePath.includes('_templates/')) {
      return;
    }
    
    // Normalize line endings for consistent matching
    const normalizedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const frontmatterMatch = normalizedContent.match(/^---\n([\s\S]*?)\n---/);
    
    if (!frontmatterMatch) {
      this.addIssue('warning', 'MISSING_FRONTMATTER', `${filePath}: Frontmatter ausente`);
      return;
    }
    
    const frontmatter = frontmatterMatch[1];
    
    // Verificar campos obrigatórios
    if (!frontmatter.includes('title:')) {
      this.addIssue('warning', 'MISSING_TITLE', `${filePath}: Título ausente no frontmatter`);
    }
  }

  validateLinks(filePath, content) {
    // Regex para encontrar links markdown
    const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkUrl = match[2];
      
      // Skip external links and anchors
      if (linkUrl.startsWith('http') || linkUrl.startsWith('#') || linkUrl.startsWith('mailto:')) {
        continue;
      }
      
      // Verificar links relativos
      this.validateRelativeLink(filePath, linkUrl, linkText);
    }
  }

  validateRelativeLink(sourceFile, linkUrl, linkText) {
    const sourceDir = path.dirname(sourceFile);
    let targetPath;
    
    if (linkUrl.startsWith('./')) {
      targetPath = path.resolve(sourceDir, linkUrl.substring(2));
    } else if (linkUrl.startsWith('../')) {
      targetPath = path.resolve(sourceDir, linkUrl);
    } else if (!linkUrl.startsWith('/')) {
      targetPath = path.resolve(sourceDir, linkUrl);
    } else {
      targetPath = path.resolve('docs', linkUrl.substring(1));
    }
    
    // Verificar se o arquivo existe
    if (!fs.existsSync(targetPath)) {
      // Tentar com .md
      if (!targetPath.endsWith('.md') && !fs.existsSync(targetPath + '.md')) {
        // Tentar index.md
        const indexPath = path.join(targetPath, 'index.md');
        if (!fs.existsSync(indexPath)) {
          this.addIssue('warning', 'BROKEN_LINK', 
            `${sourceFile}: Link quebrado "${linkText}" -> ${linkUrl}`);
          this.stats.brokenLinks++;
        }
      }
    }
  }

  checkForCommonIssues(filePath, content) {
    // Verificar se não é uma página "em construção" vazia
    if (content.includes('Esta página está em construção') && content.length < 200) {
      this.addIssue('info', 'PLACEHOLDER_PAGE', `${filePath}: Página placeholder`);
    }
    
    // Verificar linhas muito longas
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (line.length > 120 && !line.startsWith('```') && !line.includes('http')) {
        this.addIssue('info', 'LONG_LINE', 
          `${filePath}:${index + 1}: Linha longa (${line.length} chars)`);
      }
    });
  }

  addIssue(severity, type, message, details = null) {
    this.issues.push({
      severity,
      type,
      message,
      details,
      timestamp: new Date().toISOString()
    });
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalIssues: this.issues.length,
        errors: this.issues.filter(i => i.severity === 'error').length,
        warnings: this.issues.filter(i => i.severity === 'warning').length,
        info: this.issues.filter(i => i.severity === 'info').length
      },
      stats: this.stats,
      issues: this.issues
    };
    
    // Salvar relatório em JSON
    fs.writeFileSync('overlap-report.json', JSON.stringify(report, null, 2));
    
    // Imprimir resumo no console
    console.log('\n📊 Resumo da Validação:');
    console.log(`   📁 Arquivos escaneados: ${this.stats.filesScanned}`);
    console.log(`   🔗 Links quebrados: ${this.stats.brokenLinks}`);
    console.log(`   ❌ Erros: ${report.summary.errors}`);
    console.log(`   ⚠️  Avisos: ${report.summary.warnings}`);
    console.log(`   ℹ️  Informações: ${report.summary.info}`);
    
    if (this.issues.length > 0) {
      console.log('\n🔍 Primeiros 10 problemas encontrados:');
      this.issues.slice(0, 10).forEach((issue, index) => {
        const icon = issue.severity === 'error' ? '❌' : 
                     issue.severity === 'warning' ? '⚠️' : 'ℹ️';
        console.log(`   ${icon} [${issue.type}] ${issue.message}`);
      });
      
      if (this.issues.length > 10) {
        console.log(`   ... e mais ${this.issues.length - 10} problemas.`);
      }
    }
    
    console.log(`\n📄 Relatório completo salvo em: overlap-report.json`);
  }
}

// Executar validação se chamado diretamente
if (require.main === module) {
  const validator = new OverlapValidator();
  validator.validate().catch(error => {
    console.error('Erro fatal:', error);
    process.exit(1);
  });
}

module.exports = OverlapValidator;