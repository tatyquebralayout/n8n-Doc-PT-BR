#!/usr/bin/env node

/**
 * Script para validação de SEO
 * Verifica fatores importantes de SEO e fornece recomendações
 */

const fs = require('fs');
const path = require('path');

class SEOChecker {
  constructor() {
    this.pages = [];
    this.issues = [];
    this.warnings = [];
    this.stats = {
      pagesChecked: 0,
      seoIssues: 0,
      warnings: 0,
      score: 0
    };
    this.config = {
      minTitleLength: 30,
      maxTitleLength: 60,
      minDescriptionLength: 120,
      maxDescriptionLength: 160
    };
  }

  async check() {
    console.log('🔍 Iniciando verificação de SEO...\n');
    
    try {
      await this.scanPages();
      await this.checkSEOFactors();
      await this.generateReport();
    } catch (error) {
      console.error('❌ Erro durante verificação:', error.message);
      process.exit(1);
    }
  }

  async scanPages() {
    console.log('📄 Escaneando páginas...');
    
    const docsDirs = ['docs', 'src/pages'];
    
    for (const dir of docsDirs) {
      if (fs.existsSync(dir)) {
        await this.scanDirectory(dir);
      }
    }
    
    console.log(`📄 ${this.pages.length} páginas encontradas\n`);
  }

  async scanDirectory(dir, basePath = '') {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      const relativePath = path.join(basePath, file.name);
      
      if (file.isDirectory()) {
        await this.scanDirectory(fullPath, relativePath);
      } else if (this.isMarkdownFile(file.name)) {
        await this.analyzePage(fullPath, relativePath);
      }
    }
  }

  isMarkdownFile(filename) {
    return ['.md', '.mdx'].includes(path.extname(filename));
  }

  async analyzePage(filePath, relativePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { frontMatter, bodyContent } = this.parseFrontMatter(content);
      
      const pageInfo = {
        filePath,
        relativePath,
        frontMatter,
        content: bodyContent,
        title: this.extractTitle(frontMatter, bodyContent),
        description: this.extractDescription(frontMatter, bodyContent),
        headings: this.extractHeadings(bodyContent),
        images: this.extractImages(bodyContent),
        wordCount: this.countWords(bodyContent)
      };
      
      this.pages.push(pageInfo);
      this.stats.pagesChecked++;
      
    } catch (error) {
      this.addIssue('error', `Erro ao analisar ${filePath}: ${error.message}`);
    }
  }

  parseFrontMatter(content) {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);
    
    if (match) {
      try {
        const yamlContent = match[1];
        const frontMatter = {};
        
        // Parse simples de YAML
        yamlContent.split('\n').forEach(line => {
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim().replace(/['"]/g, '');
            frontMatter[key] = value;
          }
        });
        
        return { frontMatter, bodyContent: match[2] };
      } catch (error) {
        return { frontMatter: {}, bodyContent: content };
      }
    }
    
    return { frontMatter: {}, bodyContent: content };
  }

  extractTitle(frontMatter, content) {
    if (frontMatter.title) return frontMatter.title;
    
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) return h1Match[1].trim();
    
    return null;
  }

  extractDescription(frontMatter, content) {
    if (frontMatter.description) return frontMatter.description;
    
    const paragraphs = content
      .replace(/^#.+$/gm, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p && !p.startsWith('#') && !p.startsWith('```'));
    
    return paragraphs.length > 0 ? paragraphs[0].substring(0, 160) : null;
  }

  extractHeadings(content) {
    const headings = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        headings.push({
          level: match[1].length,
          text: match[2].trim()
        });
      }
    }
    
    return headings;
  }

  extractImages(content) {
    const images = [];
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = imgRegex.exec(content)) !== null) {
      images.push({
        alt: match[1],
        src: match[2]
      });
    }
    
    return images;
  }

  countWords(content) {
    return content
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]+`/g, '')
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 0).length;
  }

  async checkSEOFactors() {
    console.log('🔍 Verificando fatores de SEO...');
    
    for (const page of this.pages) {
      await this.checkPageSEO(page);
    }
  }

  async checkPageSEO(page) {
    const pageId = page.relativePath;
    
    // Verificar título
    this.checkTitle(page, pageId);
    
    // Verificar descrição
    this.checkDescription(page, pageId);
    
    // Verificar estrutura de headings
    this.checkHeadingStructure(page, pageId);
    
    // Verificar imagens
    this.checkImages(page, pageId);
    
    // Verificar comprimento do conteúdo
    this.checkContentLength(page, pageId);
  }

  checkTitle(page, pageId) {
    if (!page.title) {
      this.addIssue('error', `${pageId}: Título ausente`);
      return;
    }
    
    const titleLength = page.title.length;
    
    if (titleLength < this.config.minTitleLength) {
      this.addIssue('warning', `${pageId}: Título muito curto (${titleLength} caracteres)`);
    } else if (titleLength > this.config.maxTitleLength) {
      this.addIssue('warning', `${pageId}: Título muito longo (${titleLength} caracteres)`);
    }
  }

  checkDescription(page, pageId) {
    if (!page.description) {
      this.addIssue('error', `${pageId}: Descrição ausente`);
      return;
    }
    
    const descLength = page.description.length;
    
    if (descLength < this.config.minDescriptionLength) {
      this.addIssue('warning', `${pageId}: Descrição muito curta (${descLength} caracteres)`);
    } else if (descLength > this.config.maxDescriptionLength) {
      this.addIssue('warning', `${pageId}: Descrição muito longa (${descLength} caracteres)`);
    }
  }

  checkHeadingStructure(page, pageId) {
    const headings = page.headings;
    
    if (headings.length === 0) {
      this.addIssue('warning', `${pageId}: Nenhum heading encontrado`);
      return;
    }
    
    // Verificar se existe H1
    const h1Count = headings.filter(h => h.level === 1).length;
    if (h1Count === 0) {
      this.addIssue('error', `${pageId}: H1 ausente`);
    } else if (h1Count > 1) {
      this.addIssue('error', `${pageId}: Múltiplos H1 encontrados (${h1Count})`);
    }
  }

  checkImages(page, pageId) {
    for (const img of page.images) {
      if (!img.alt || img.alt.trim() === '') {
        this.addIssue('error', `${pageId}: Imagem sem alt text: ${img.src}`);
      }
    }
  }

  checkContentLength(page, pageId) {
    if (page.wordCount < 200) {
      this.addIssue('warning', `${pageId}: Conteúdo muito curto (${page.wordCount} palavras)`);
    }
  }

  addIssue(type, message) {
    const issue = { type, message, timestamp: new Date().toISOString() };
    
    if (type === 'error') {
      this.issues.push(issue);
      this.stats.seoIssues++;
    } else {
      this.warnings.push(issue);
      this.stats.warnings++;
    }
  }

  calculateSEOScore() {
    const totalChecks = this.pages.length * 5;
    const deductions = (this.stats.seoIssues * 2) + (this.stats.warnings * 1);
    const score = Math.max(0, Math.min(100, 100 - (deductions / totalChecks * 100)));
    
    return Math.round(score);
  }

  async generateReport() {
    this.stats.score = this.calculateSEOScore();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 RELATÓRIO DE SEO');
    console.log('='.repeat(60));
    
    console.log(`📄 Páginas verificadas: ${this.stats.pagesChecked}`);
    console.log(`❌ Problemas críticos: ${this.stats.seoIssues}`);
    console.log(`⚠️  Avisos: ${this.stats.warnings}`);
    console.log(`📈 Score SEO: ${this.stats.score}/100`);
    
    // Mostrar problemas críticos
    if (this.issues.length > 0) {
      console.log('\n❌ PROBLEMAS CRÍTICOS:');
      this.issues.slice(0, 10).forEach(issue => {
        console.log(`   • ${issue.message}`);
      });
    }
    
    // Mostrar principais avisos
    if (this.warnings.length > 0) {
      console.log('\n⚠️  PRINCIPAIS AVISOS:');
      this.warnings.slice(0, 5).forEach(warning => {
        console.log(`   • ${warning.message}`);
      });
    }
    
    // Salvar relatório
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      issues: this.issues,
      warnings: this.warnings
    };
    
    fs.writeFileSync('seo-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 Relatório salvo em: seo-report.json');
    
    if (this.stats.seoIssues > 0) {
      console.log('\n⚠️  Problemas críticos encontrados.');
      process.exit(1);
    } else {
      console.log('\n🎉 Verificação de SEO concluída!');
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const checker = new SEOChecker();
  checker.check().catch(console.error);
}

module.exports = SEOChecker;