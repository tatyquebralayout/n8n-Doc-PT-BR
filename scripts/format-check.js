#!/usr/bin/env node

/**
 * Script para verificação de formatação markdown
 * Valida estrutura, consistência e diretrizes de estilo
 */

const fs = require('fs');
const path = require('path');

class FormatChecker {
  constructor() {
    this.stats = {
      filesChecked: 0,
      issuesFound: 0,
      warningsFound: 0,
      fixableIssues: 0
    };
    
    this.issues = [];
    this.warnings = [];
    this.rules = this.loadRules();
  }

  loadRules() {
    return {
      // Regras de estrutura
      maxLineLength: 120,
      requireH1: true,
      maxConsecutiveEmptyLines: 2,
      requireFrontMatter: true,
      
      // Regras de formatação
      codeBlockLanguage: true,
      linkValidation: true,
      imageAltText: true,
      headingStyle: 'atx', // # Heading vs Heading\n=======
      
      // Regras de estilo
      listStyle: 'dash', // - vs *
      emphasisStyle: 'asterisk', // *emphasis* vs _emphasis_
      strongStyle: 'asterisk', // **strong** vs __strong__
      
      // Regras específicas
      trailingWhitespace: true,
      tabsVsSpaces: 'spaces',
      punctuationSpacing: true
    };
  }

  async check() {
    console.log('📐 Iniciando verificação de formatação...\n');
    
    try {
      await this.scanFiles();
      await this.generateReport();
    } catch (error) {
      console.error('❌ Erro durante verificação:', error.message);
      process.exit(1);
    }
  }

  async scanFiles() {
    console.log('📄 Escaneando arquivos...');
    
    const docsDirs = ['docs', 'src/pages'];
    
    for (const dir of docsDirs) {
      if (fs.existsSync(dir)) {
        await this.scanDirectory(dir);
      }
    }
    
    console.log(`📄 ${this.stats.filesChecked} arquivos verificados\n`);
  }

  async scanDirectory(dir, basePath = '') {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      const relativePath = path.join(basePath, file.name);
      
      if (file.isDirectory()) {
        await this.scanDirectory(fullPath, relativePath);
      } else if (this.isMarkdownFile(file.name)) {
        await this.checkFile(fullPath, relativePath);
      }
    }
  }

  isMarkdownFile(filename) {
    return ['.md', '.mdx'].includes(path.extname(filename));
  }

  async checkFile(filePath, relativePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      this.stats.filesChecked++;
      
      console.log(`   📐 Verificando: ${relativePath}`);
      
      // Verificações gerais do arquivo
      this.checkFileStructure(content, lines, relativePath);
      
      // Verificações linha por linha
      lines.forEach((line, index) => {
        this.checkLine(line, index + 1, relativePath);
      });
      
      // Verificações de conteúdo
      this.checkContent(content, relativePath);
      
    } catch (error) {
      console.error(`❌ Erro ao verificar ${filePath}:`, error.message);
    }
  }

  checkFileStructure(content, lines, filePath) {
    // Verificar front matter
    if (this.rules.requireFrontMatter) {
      if (!content.startsWith('---\n')) {
        this.addIssue('error', filePath, 1, 'Front matter ausente no início do arquivo');
      }
    }
    
    // Verificar H1
    if (this.rules.requireH1) {
      const hasH1 = lines.some(line => /^#\s+/.test(line));
      if (!hasH1) {
        this.addIssue('error', filePath, 1, 'Heading H1 ausente');
      }
    }
    
    // Verificar linhas vazias consecutivas
    let emptyLineCount = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === '') {
        emptyLineCount++;
        if (emptyLineCount > this.rules.maxConsecutiveEmptyLines) {
          this.addIssue('warning', filePath, i + 1, 
            `Muitas linhas vazias consecutivas (${emptyLineCount})`);
        }
      } else {
        emptyLineCount = 0;
      }
    }
    
    // Verificar final do arquivo
    if (content.endsWith('\n\n\n')) {
      this.addIssue('warning', filePath, lines.length, 
        'Muitas linhas vazias no final do arquivo');
    } else if (!content.endsWith('\n')) {
      this.addIssue('warning', filePath, lines.length, 
        'Arquivo deve terminar com uma linha vazia');
    }
  }

  checkLine(line, lineNumber, filePath) {
    // Verificar comprimento da linha
    if (line.length > this.rules.maxLineLength) {
      this.addIssue('warning', filePath, lineNumber, 
        `Linha muito longa (${line.length} caracteres, máximo ${this.rules.maxLineLength})`);
    }
    
    // Verificar whitespace no final
    if (this.rules.trailingWhitespace && line.endsWith(' ')) {
      this.addIssue('warning', filePath, lineNumber, 
        'Espaços em branco no final da linha', true);
    }
    
    // Verificar tabs vs espaços
    if (this.rules.tabsVsSpaces === 'spaces' && line.includes('\t')) {
      this.addIssue('warning', filePath, lineNumber, 
        'Usar espaços ao invés de tabs', true);
    }
    
    // Verificar headings
    this.checkHeadings(line, lineNumber, filePath);
    
    // Verificar listas
    this.checkLists(line, lineNumber, filePath);
    
    // Verificar ênfase e negrito
    this.checkEmphasis(line, lineNumber, filePath);
    
    // Verificar pontuação
    this.checkPunctuation(line, lineNumber, filePath);
  }

  checkHeadings(line, lineNumber, filePath) {
    // Verificar estilo ATX vs Setext
    if (this.rules.headingStyle === 'atx') {
      if (/^.+\n[=-]+$/.test(line)) {
        this.addIssue('warning', filePath, lineNumber, 
          'Usar estilo ATX para headings (# Heading)', true);
      }
    }
    
    // Verificar heading ATX
    const headingMatch = line.match(/^(#{1,6})\s*(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      
      // Verificar espaço após #
      if (!text && line !== headingMatch[1]) {
        this.addIssue('warning', filePath, lineNumber, 
          'Adicionar espaço após # em headings', true);
      }
      
      // Verificar heading vazio
      if (!text.trim()) {
        this.addIssue('error', filePath, lineNumber, 'Heading vazio');
      }
      
      // Verificar # no final (GitHub style)
      if (text.endsWith('#')) {
        this.addIssue('warning', filePath, lineNumber, 
          'Remover # no final do heading', true);
      }
    }
  }

  checkLists(line, lineNumber, filePath) {
    // Verificar estilo de listas
    const listMatch = line.match(/^(\s*)([*+-]|\d+\.)\s+(.*)$/);
    if (listMatch) {
      const marker = listMatch[2];
      
      // Verificar estilo de marcador
      if (this.rules.listStyle === 'dash' && (marker === '*' || marker === '+')) {
        this.addIssue('warning', filePath, lineNumber, 
          'Usar - para listas não ordenadas', true);
      } else if (this.rules.listStyle === 'asterisk' && marker === '-') {
        this.addIssue('warning', filePath, lineNumber, 
          'Usar * para listas não ordenadas', true);
      }
      
      // Verificar espaço após marcador
      if (!line.match(/^(\s*)([*+-]|\d+\.)\s+/)) {
        this.addIssue('warning', filePath, lineNumber, 
          'Adicionar espaço após marcador de lista', true);
      }
    }
  }

  checkEmphasis(line, lineNumber, filePath) {
    // Verificar ênfase simples
    if (this.rules.emphasisStyle === 'asterisk') {
      if (/_[^_]+_/.test(line) && !line.includes('__')) {
        this.addIssue('warning', filePath, lineNumber, 
          'Usar * para ênfase ao invés de _', true);
      }
    } else if (this.rules.emphasisStyle === 'underscore') {
      if (/\*[^*]+\*/.test(line) && !line.includes('**')) {
        this.addIssue('warning', filePath, lineNumber, 
          'Usar _ para ênfase ao invés de *', true);
      }
    }
    
    // Verificar negrito
    if (this.rules.strongStyle === 'asterisk') {
      if (/__[^_]+__/.test(line)) {
        this.addIssue('warning', filePath, lineNumber, 
          'Usar ** para negrito ao invés de __', true);
      }
    } else if (this.rules.strongStyle === 'underscore') {
      if (/\*\*[^*]+\*\*/.test(line)) {
        this.addIssue('warning', filePath, lineNumber, 
          'Usar __ para negrito ao invés de **', true);
      }
    }
  }

  checkPunctuation(line, lineNumber, filePath) {
    if (!this.rules.punctuationSpacing) return;
    
    // Verificar espaços em pontuação
    const punctuationIssues = [
      { pattern: /\s+[.,;:!?]/, message: 'Remover espaço antes da pontuação' },
      { pattern: /[.,;:!?][^\s]/, message: 'Adicionar espaço após pontuação' },
      { pattern: /\s{2,}/, message: 'Múltiplos espaços consecutivos' }
    ];
    
    punctuationIssues.forEach(issue => {
      if (issue.pattern.test(line)) {
        this.addIssue('warning', filePath, lineNumber, issue.message, true);
      }
    });
  }

  checkContent(content, filePath) {
    // Verificar blocos de código
    if (this.rules.codeBlockLanguage) {
      const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
      codeBlocks.forEach(block => {
        if (block.startsWith('```\n')) {
          const lineNumber = content.substring(0, content.indexOf(block))
            .split('\n').length;
          this.addIssue('warning', filePath, lineNumber, 
            'Especificar linguagem em blocos de código', true);
        }
      });
    }
    
    // Verificar links
    if (this.rules.linkValidation) {
      this.checkLinks(content, filePath);
    }
    
    // Verificar imagens
    if (this.rules.imageAltText) {
      this.checkImages(content, filePath);
    }
  }

  checkLinks(content, filePath) {
    const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkUrl = match[2];
      const lineNumber = content.substring(0, match.index).split('\n').length;
      
      // Verificar texto do link
      if (!linkText.trim()) {
        this.addIssue('warning', filePath, lineNumber, 
          'Link sem texto descritivo');
      }
      
      // Verificar URLs internas
      if (!linkUrl.startsWith('http') && !linkUrl.startsWith('#')) {
        const linkPath = linkUrl.replace(/^\//, '').replace(/#.*$/, '');
        if (linkPath && !fs.existsSync(linkPath)) {
          this.addIssue('error', filePath, lineNumber, 
            `Link interno quebrado: ${linkUrl}`);
        }
      }
      
      // Verificar URLs repetidas
      if (linkText.toLowerCase() === 'aqui' || linkText.toLowerCase() === 'clique aqui') {
        this.addIssue('warning', filePath, lineNumber, 
          'Evitar texto de link genérico como "aqui" ou "clique aqui"');
      }
    }
  }

  checkImages(content, filePath) {
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = imgRegex.exec(content)) !== null) {
      const altText = match[1];
      const imgSrc = match[2];
      const lineNumber = content.substring(0, match.index).split('\n').length;
      
      // Verificar alt text
      if (!altText.trim()) {
        this.addIssue('error', filePath, lineNumber, 
          `Imagem sem alt text: ${imgSrc}`);
      }
      
      // Verificar se a imagem existe
      if (!imgSrc.startsWith('http')) {
        const imgPath = path.join('static', imgSrc.replace(/^\//, ''));
        if (!fs.existsSync(imgPath)) {
          this.addIssue('error', filePath, lineNumber, 
            `Imagem não encontrada: ${imgSrc}`);
        }
      }
    }
  }

  addIssue(type, file, line, message, fixable = false) {
    const issue = {
      type,
      file,
      line,
      message,
      fixable,
      timestamp: new Date().toISOString()
    };
    
    if (type === 'error') {
      this.issues.push(issue);
      this.stats.issuesFound++;
    } else {
      this.warnings.push(issue);
      this.stats.warningsFound++;
    }
    
    if (fixable) {
      this.stats.fixableIssues++;
    }
  }

  async generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📐 RELATÓRIO DE VERIFICAÇÃO DE FORMATAÇÃO');
    console.log('='.repeat(60));
    
    console.log(`📄 Arquivos verificados: ${this.stats.filesChecked}`);
    console.log(`❌ Problemas encontrados: ${this.stats.issuesFound}`);
    console.log(`⚠️  Avisos: ${this.stats.warningsFound}`);
    console.log(`🔧 Problemas corrigíveis: ${this.stats.fixableIssues}`);
    
    // Calcular score de qualidade
    const totalIssues = this.stats.issuesFound + this.stats.warningsFound;
    const qualityScore = this.stats.filesChecked > 0 
      ? Math.max(0, 100 - (totalIssues / this.stats.filesChecked * 10))
      : 100;
    
    console.log(`📊 Score de qualidade: ${Math.round(qualityScore)}/100`);
    
    // Mostrar problemas por categoria
    this.showIssuesByCategory();
    
    // Mostrar problemas críticos
    if (this.issues.length > 0) {
      console.log('\n❌ PROBLEMAS CRÍTICOS:');
      this.issues.slice(0, 10).forEach(issue => {
        console.log(`   📄 ${issue.file}:${issue.line} - ${issue.message}`);
      });
      
      if (this.issues.length > 10) {
        console.log(`   ... e mais ${this.issues.length - 10} problema(s)`);
      }
    }
    
    // Mostrar principais avisos
    if (this.warnings.length > 0) {
      console.log('\n⚠️  PRINCIPAIS AVISOS:');
      this.warnings.slice(0, 5).forEach(warning => {
        console.log(`   📄 ${warning.file}:${warning.line} - ${warning.message}`);
        if (warning.fixable) {
          console.log(`      🔧 Corrigível automaticamente`);
        }
      });
      
      if (this.warnings.length > 5) {
        console.log(`   ... e mais ${this.warnings.length - 5} aviso(s)`);
      }
    }
    
    // Gerar recomendações
    this.generateRecommendations();
    
    // Salvar relatório detalhado
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      qualityScore: Math.round(qualityScore),
      issues: this.issues,
      warnings: this.warnings,
      rules: this.rules
    };
    
    fs.writeFileSync('format-check-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 Relatório detalhado salvo em: format-check-report.json');
    
    if (this.stats.issuesFound > 0) {
      console.log('\n⚠️  Problemas críticos encontrados. Recomenda-se correção.');
      process.exit(1);
    } else {
      console.log('\n🎉 Formatação está em conformidade!');
    }
  }

  showIssuesByCategory() {
    const allIssues = [...this.issues, ...this.warnings];
    const categories = {};
    
    allIssues.forEach(issue => {
      const category = this.categorizeIssue(issue.message);
      if (!categories[category]) categories[category] = 0;
      categories[category]++;
    });
    
    if (Object.keys(categories).length > 0) {
      console.log('\n📊 Problemas por categoria:');
      Object.entries(categories)
        .sort(([,a], [,b]) => b - a)
        .forEach(([category, count]) => {
          console.log(`   ${category}: ${count} ocorrência(s)`);
        });
    }
  }

  categorizeIssue(message) {
    if (message.includes('Heading') || message.includes('H1')) return '📝 Headings';
    if (message.includes('Link') || message.includes('link')) return '🔗 Links';
    if (message.includes('Imagem') || message.includes('alt')) return '🖼️  Imagens';
    if (message.includes('linha') || message.includes('espaço')) return '📐 Espaçamento';
    if (message.includes('lista')) return '📋 Listas';
    if (message.includes('código')) return '💻 Código';
    if (message.includes('pontuação')) return '📝 Pontuação';
    return '📄 Geral';
  }

  generateRecommendations() {
    console.log('\n💡 RECOMENDAÇÕES:');
    
    const recommendations = [];
    
    if (this.stats.fixableIssues > 0) {
      recommendations.push(`• ${this.stats.fixableIssues} problema(s) podem ser corrigidos automaticamente`);
    }
    
    const headingIssues = [...this.issues, ...this.warnings]
      .filter(i => i.message.includes('Heading') || i.message.includes('H1')).length;
    if (headingIssues > 0) {
      recommendations.push('• Revisar estrutura de headings para melhor hierarquia');
    }
    
    const linkIssues = [...this.issues, ...this.warnings]
      .filter(i => i.message.includes('Link') || i.message.includes('link')).length;
    if (linkIssues > 0) {
      recommendations.push('• Verificar e corrigir links quebrados ou mal formatados');
    }
    
    const imageIssues = [...this.issues, ...this.warnings]
      .filter(i => i.message.includes('Imagem') || i.message.includes('alt')).length;
    if (imageIssues > 0) {
      recommendations.push('• Adicionar alt text descritivo em todas as imagens');
    }
    
    if (this.stats.warningsFound > this.stats.issuesFound * 2) {
      recommendations.push('• Considerar automatizar correção de formatação com ferramentas como Prettier');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('• Formatação está excelente! Continue mantendo os padrões.');
    }
    
    recommendations.forEach(rec => console.log(rec));
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const checker = new FormatChecker();
  checker.check().catch(console.error);
}

module.exports = FormatChecker;