#!/usr/bin/env node

/**
 * Script para verificação básica de acessibilidade
 * Valida aspectos fundamentais de acessibilidade na documentação
 */

const fs = require('fs');
const path = require('path');

class AccessibilityChecker {
  constructor() {
    this.stats = {
      filesChecked: 0,
      issuesFound: 0,
      warningsFound: 0,
      accessibilityScore: 0
    };
    
    this.issues = [];
    this.warnings = [];
    this.guidelines = this.loadGuidelines();
  }

  loadGuidelines() {
    return {
      // WCAG 2.1 Level AA guidelines relevantes para documentação
      images: {
        requireAltText: true,
        descriptiveAltText: true,
        decorativeImages: true
      },
      
      structure: {
        headingHierarchy: true,
        skipNavigation: true,
        landmarkRoles: true
      },
      
      links: {
        descriptiveText: true,
        keyboardAccessible: true,
        externalLinkIndication: true
      },
      
      content: {
        readabilityLevel: 'intermediate',
        colorContrast: true,
        textSize: true
      },
      
      multimedia: {
        transcripts: true,
        captions: true,
        audioDescription: true
      }
    };
  }

  async check() {
    console.log('♿ Iniciando verificação de acessibilidade...\n');
    
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
      
      this.stats.filesChecked++;
      
      console.log(`   ♿ Verificando: ${relativePath}`);
      
      // Verificações de acessibilidade
      this.checkImageAccessibility(content, relativePath);
      this.checkHeadingStructure(content, relativePath);
      this.checkLinkAccessibility(content, relativePath);
      this.checkContentAccessibility(content, relativePath);
      this.checkMultimediaAccessibility(content, relativePath);
      
    } catch (error) {
      console.error(`❌ Erro ao verificar ${filePath}:`, error.message);
    }
  }

  checkImageAccessibility(content, filePath) {
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = imgRegex.exec(content)) !== null) {
      const altText = match[1];
      const imgSrc = match[2];
      const lineNumber = content.substring(0, match.index).split('\n').length;
      
      // Verificar presença de alt text
      if (this.guidelines.images.requireAltText && !altText.trim()) {
        this.addIssue('error', filePath, lineNumber, 
          `Imagem sem alt text: ${imgSrc}`);
      }
      
      // Verificar qualidade do alt text
      if (this.guidelines.images.descriptiveAltText && altText.trim()) {
        if (this.isAltTextProblematic(altText)) {
          this.addIssue('warning', filePath, lineNumber, 
            `Alt text pouco descritivo: "${altText}"`);
        }
      }
      
      // Verificar imagens decorativas
      if (this.guidelines.images.decorativeImages) {
        if (this.isDecorativeImage(imgSrc, altText)) {
          this.addIssue('info', filePath, lineNumber, 
            'Considere usar alt="" para imagens decorativas');
        }
      }
    }
  }

  isAltTextProblematic(altText) {
    const problematicTerms = [
      'imagem', 'figura', 'foto', 'screenshot', 'captura',
      'image', 'picture', 'photo', 'graphic', 'icon'
    ];
    
    const lowerAlt = altText.toLowerCase();
    
    // Alt text muito curto
    if (altText.length < 10) return true;
    
    // Alt text que apenas descreve o tipo de mídia
    if (problematicTerms.some(term => lowerAlt.includes(term))) {
      return true;
    }
    
    // Alt text com apenas pontuação ou números
    if (/^[^a-zA-ZÀ-ÿ]*$/.test(altText)) return true;
    
    return false;
  }

  isDecorativeImage(imgSrc, altText) {
    const decorativePatterns = [
      /icon/i, /logo/i, /decoration/i, /border/i, /divider/i,
      /separator/i, /bullet/i, /arrow/i
    ];
    
    return decorativePatterns.some(pattern => pattern.test(imgSrc)) && 
           altText.length < 20;
  }

  checkHeadingStructure(content, filePath) {
    const lines = content.split('\n');
    const headings = [];
    
    lines.forEach((line, index) => {
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        headings.push({
          level: headingMatch[1].length,
          text: headingMatch[2],
          line: index + 1
        });
      }
    });
    
    if (this.guidelines.structure.headingHierarchy) {
      this.validateHeadingHierarchy(headings, filePath);
    }
  }

  validateHeadingHierarchy(headings, filePath) {
    if (headings.length === 0) return;
    
    // Verificar se há H1
    const h1Count = headings.filter(h => h.level === 1).length;
    if (h1Count === 0) {
      this.addIssue('error', filePath, 1, 
        'Página sem H1 principal - importante para leitores de tela');
    } else if (h1Count > 1) {
      this.addIssue('warning', filePath, 1, 
        'Múltiplos H1 podem confundir leitores de tela');
    }
    
    // Verificar hierarquia sequencial
    for (let i = 1; i < headings.length; i++) {
      const current = headings[i];
      const previous = headings[i - 1];
      
      if (current.level > previous.level + 1) {
        this.addIssue('warning', filePath, current.line, 
          `Hierarquia de heading quebrada: H${previous.level} → H${current.level}`);
      }
    }
    
    // Verificar headings vazios
    headings.forEach(heading => {
      if (!heading.text.trim()) {
        this.addIssue('error', filePath, heading.line, 
          'Heading vazio - inacessível para leitores de tela');
      }
    });
  }

  checkLinkAccessibility(content, filePath) {
    const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkUrl = match[2];
      const lineNumber = content.substring(0, match.index).split('\n').length;
      
      // Verificar texto descritivo
      if (this.guidelines.links.descriptiveText) {
        if (this.isLinkTextProblematic(linkText)) {
          this.addIssue('warning', filePath, lineNumber, 
            `Texto de link pouco descritivo: "${linkText}"`);
        }
      }
      
      // Verificar links externos
      if (this.guidelines.links.externalLinkIndication) {
        if (this.isExternalLink(linkUrl) && !this.hasExternalIndication(linkText)) {
          this.addIssue('info', filePath, lineNumber, 
            'Considere indicar que o link é externo');
        }
      }
      
      // Verificar URLs como texto
      if (linkText === linkUrl && this.isLongUrl(linkUrl)) {
        this.addIssue('warning', filePath, lineNumber, 
          'URL longa como texto do link - dificulta leitores de tela');
      }
    }
  }

  isLinkTextProblematic(linkText) {
    const problematicTexts = [
      'aqui', 'clique aqui', 'saiba mais', 'leia mais', 'veja mais',
      'here', 'click here', 'read more', 'see more', 'more',
      'link', 'este link'
    ];
    
    const lowerText = linkText.toLowerCase().trim();
    
    // Texto muito curto
    if (linkText.length < 4) return true;
    
    // Textos genéricos
    if (problematicTexts.includes(lowerText)) return true;
    
    // Apenas números ou pontuação
    if (/^[^a-zA-ZÀ-ÿ]*$/.test(linkText)) return true;
    
    return false;
  }

  isExternalLink(url) {
    return url.startsWith('http') && !url.includes(process.env.SITE_URL || 'localhost');
  }

  hasExternalIndication(linkText) {
    const indicators = ['externo', 'external', '↗', '🔗', 'nova aba', 'new tab'];
    const lowerText = linkText.toLowerCase();
    return indicators.some(indicator => lowerText.includes(indicator));
  }

  isLongUrl(url) {
    return url.length > 50;
  }

  checkContentAccessibility(content, filePath) {
    // Verificar legibilidade básica
    this.checkReadability(content, filePath);
    
    // Verificar uso de cores como única informação
    this.checkColorDependence(content, filePath);
    
    // Verificar contraste de texto (simulado)
    this.checkTextContrast(content, filePath);
  }

  checkReadability(content, filePath) {
    const sentences = content
      .replace(/```[\s\S]*?```/g, '') // Remover código
      .split(/[.!?]+/)
      .filter(s => s.trim().length > 0);
    
    let longSentences = 0;
    let complexWords = 0;
    let totalWords = 0;
    
    sentences.forEach(sentence => {
      const words = sentence.trim().split(/\s+/);
      totalWords += words.length;
      
      // Sentenças muito longas (>25 palavras)
      if (words.length > 25) {
        longSentences++;
      }
      
      // Palavras complexas (>3 sílabas)
      words.forEach(word => {
        if (this.countSyllables(word) > 3) {
          complexWords++;
        }
      });
    });
    
    const avgWordsPerSentence = totalWords / sentences.length;
    const complexWordRatio = complexWords / totalWords;
    
    if (avgWordsPerSentence > 20) {
      this.addIssue('info', filePath, 1, 
        'Sentenças muito longas podem dificultar a compreensão');
    }
    
    if (complexWordRatio > 0.15) {
      this.addIssue('info', filePath, 1, 
        'Alto uso de palavras complexas - considere simplificar');
    }
  }

  countSyllables(word) {
    // Aproximação simples para contagem de sílabas
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    
    const vowelPattern = /[aeiouáéíóúàèìòùâêîôûãõy]/g;
    const matches = word.match(vowelPattern);
    return matches ? Math.max(1, matches.length - (word.endsWith('e') ? 1 : 0)) : 1;
  }

  checkColorDependence(content, filePath) {
    const colorReferences = [
      /vermelho|red/gi, /verde|green/gi, /azul|blue/gi,
      /amarelo|yellow/gi, /laranja|orange/gi, /roxo|purple/gi,
      /rosa|pink/gi, /cinza|gray|grey/gi
    ];
    
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      colorReferences.forEach(pattern => {
        if (pattern.test(line) && !this.hasAlternativeIndicator(line)) {
          this.addIssue('warning', filePath, index + 1, 
            'Referência à cor sem indicador alternativo');
        }
      });
    });
  }

  hasAlternativeIndicator(line) {
    const indicators = [
      'ícone', 'icon', 'símbolo', 'symbol', 'formato', 'shape',
      'posição', 'position', 'tamanho', 'size', 'texto', 'text'
    ];
    
    const lowerLine = line.toLowerCase();
    return indicators.some(indicator => lowerLine.includes(indicator));
  }

  checkTextContrast(content, filePath) {
    // Verificar uso de texto em itálico ou negrito excessivo
    const emphasisCount = (content.match(/\*[^*]+\*|_[^_]+_/g) || []).length;
    const strongCount = (content.match(/\*\*[^*]+\*\*|__[^_]+__/g) || []).length;
    const totalWords = content.split(/\s+/).length;
    
    const emphasisRatio = (emphasisCount + strongCount) / totalWords;
    
    if (emphasisRatio > 0.1) {
      this.addIssue('info', filePath, 1, 
        'Uso excessivo de ênfase pode dificultar a leitura');
    }
  }

  checkMultimediaAccessibility(content, filePath) {
    // Verificar vídeos e áudios
    const mediaRegex = /!\[([^\]]*)\]\(([^)]+\.(mp4|webm|ogg|mp3|wav|m4a))\)/gi;
    let match;
    
    while ((match = mediaRegex.exec(content)) !== null) {
      const altText = match[1];
      const mediaSrc = match[2];
      const extension = match[3];
      const lineNumber = content.substring(0, match.index).split('\n').length;
      
      if (['mp4', 'webm', 'ogg'].includes(extension)) {
        // Vídeo
        if (!this.hasTranscriptReference(content, mediaSrc)) {
          this.addIssue('warning', filePath, lineNumber, 
            'Vídeo sem referência à transcrição ou legendas');
        }
      } else if (['mp3', 'wav', 'm4a'].includes(extension)) {
        // Áudio
        if (!this.hasTranscriptReference(content, mediaSrc)) {
          this.addIssue('warning', filePath, lineNumber, 
            'Áudio sem transcrição disponível');
        }
      }
    }
  }

  hasTranscriptReference(content, mediaSrc) {
    const transcriptKeywords = [
      'transcrição', 'transcript', 'legenda', 'caption',
      'subtítulo', 'subtitle', 'texto alternativo'
    ];
    
    const lowerContent = content.toLowerCase();
    return transcriptKeywords.some(keyword => lowerContent.includes(keyword));
  }

  addIssue(type, file, line, message) {
    const issue = {
      type,
      file,
      line,
      message,
      timestamp: new Date().toISOString()
    };
    
    if (type === 'error') {
      this.issues.push(issue);
      this.stats.issuesFound++;
    } else {
      this.warnings.push(issue);
      this.stats.warningsFound++;
    }
  }

  calculateAccessibilityScore() {
    const totalChecks = this.stats.filesChecked * 10; // 10 verificações por arquivo
    const errorWeight = 3;
    const warningWeight = 1;
    
    const deductions = (this.stats.issuesFound * errorWeight) + (this.stats.warningsFound * warningWeight);
    const score = Math.max(0, Math.min(100, 100 - (deductions / totalChecks * 100)));
    
    return Math.round(score);
  }

  async generateReport() {
    this.stats.accessibilityScore = this.calculateAccessibilityScore();
    
    console.log('\n' + '='.repeat(60));
    console.log('♿ RELATÓRIO DE ACESSIBILIDADE');
    console.log('='.repeat(60));
    
    console.log(`📄 Arquivos verificados: ${this.stats.filesChecked}`);
    console.log(`❌ Problemas críticos: ${this.stats.issuesFound}`);
    console.log(`⚠️  Avisos: ${this.stats.warningsFound}`);
    console.log(`♿ Score de acessibilidade: ${this.stats.accessibilityScore}/100`);
    
    // Classificar score
    let scoreClass = '';
    if (this.stats.accessibilityScore >= 90) scoreClass = '🟢 Excelente';
    else if (this.stats.accessibilityScore >= 70) scoreClass = '🟡 Bom';
    else if (this.stats.accessibilityScore >= 50) scoreClass = '🟠 Regular';
    else scoreClass = '🔴 Precisa melhorar';
    
    console.log(`📊 Classificação: ${scoreClass}`);
    
    // Mostrar problemas por categoria
    this.showIssuesByCategory();
    
    // Mostrar problemas críticos
    if (this.issues.length > 0) {
      console.log('\n❌ PROBLEMAS CRÍTICOS DE ACESSIBILIDADE:');
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
      issues: this.issues,
      warnings: this.warnings,
      guidelines: this.guidelines,
      wcagLevel: 'AA'
    };
    
    fs.writeFileSync('accessibility-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 Relatório detalhado salvo em: accessibility-report.json');
    
    if (this.stats.issuesFound > 0) {
      console.log('\n⚠️  Problemas críticos de acessibilidade encontrados.');
      process.exit(1);
    } else {
      console.log('\n🎉 Verificação de acessibilidade concluída!');
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
    if (message.includes('Imagem') || message.includes('alt')) return '🖼️  Imagens';
    if (message.includes('Heading') || message.includes('H1')) return '📝 Estrutura';
    if (message.includes('Link') || message.includes('link')) return '🔗 Links';
    if (message.includes('cor') || message.includes('color')) return '🎨 Cores';
    if (message.includes('Vídeo') || message.includes('Áudio')) return '🎬 Multimídia';
    if (message.includes('legibilidade') || message.includes('compreensão')) return '📖 Legibilidade';
    return '♿ Geral';
  }

  generateRecommendations() {
    console.log('\n💡 RECOMENDAÇÕES WCAG 2.1 AA:');
    
    const recommendations = [];
    
    if (this.stats.issuesFound > 0) {
      recommendations.push('• Corrija os problemas críticos para conformidade WCAG');
    }
    
    const imageIssues = [...this.issues, ...this.warnings]
      .filter(i => i.message.includes('Imagem') || i.message.includes('alt')).length;
    if (imageIssues > 0) {
      recommendations.push('• Adicione alt text descritivo em todas as imagens');
    }
    
    const headingIssues = [...this.issues, ...this.warnings]
      .filter(i => i.message.includes('Heading') || i.message.includes('H1')).length;
    if (headingIssues > 0) {
      recommendations.push('• Mantenha hierarquia lógica de headings (H1→H2→H3...)');
    }
    
    const linkIssues = [...this.issues, ...this.warnings]
      .filter(i => i.message.includes('Link') || i.message.includes('link')).length;
    if (linkIssues > 0) {
      recommendations.push('• Use textos descritivos em links (evite "clique aqui")');
    }
    
    recommendations.push('• Teste com leitores de tela como NVDA ou JAWS');
    recommendations.push('• Valide com ferramentas como axe-core ou WAVE');
    recommendations.push('• Considere usuários com deficiências cognitivas');
    
    if (recommendations.length === 1) {
      recommendations.push('• Acessibilidade está em excelente estado!');
    }
    
    recommendations.forEach(rec => console.log(rec));
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const checker = new AccessibilityChecker();
  checker.check().catch(console.error);
}

module.exports = AccessibilityChecker;