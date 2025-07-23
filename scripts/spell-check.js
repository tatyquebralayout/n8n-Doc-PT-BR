#!/usr/bin/env node

/**
 * Script para verificação ortográfica da documentação
 * Suporta português brasileiro e termos técnicos
 */

const fs = require('fs');
const path = require('path');

class SpellChecker {
  constructor() {
    this.stats = {
      filesChecked: 0,
      wordsChecked: 0,
      errorsFound: 0,
      suggestions: 0
    };
    
    this.errors = [];
    this.technicalTerms = this.loadTechnicalTerms();
    this.commonWords = this.loadCommonWords();
    this.ignoredWords = new Set();
  }

  loadTechnicalTerms() {
    return new Set([
      // Termos técnicos do n8n
      'n8n', 'workflow', 'node', 'webhook', 'api', 'trigger', 'endpoint',
      'automation', 'integração', 'integracoes', 'webhook', 'json', 'xml',
      'http', 'https', 'oauth', 'jwt', 'sql', 'nosql', 'mongodb', 'mysql',
      'postgresql', 'redis', 'elasticsearch', 'docker', 'kubernetes',
      
      // Termos de programação
      'javascript', 'typescript', 'nodejs', 'npm', 'yarn', 'git', 'github',
      'gitlab', 'bitbucket', 'rest', 'graphql', 'websocket', 'cron',
      'regex', 'css', 'html', 'markdown', 'yaml', 'csv', 'pdf',
      
      // Plataformas e serviços
      'gmail', 'outlook', 'slack', 'discord', 'telegram', 'whatsapp',
      'shopify', 'wordpress', 'magento', 'woocommerce', 'stripe', 'paypal',
      'mailchimp', 'hubspot', 'salesforce', 'zendesk', 'jira', 'trello',
      'google', 'microsoft', 'amazon', 'aws', 'azure', 'gcp',
      
      // Termos técnicos gerais
      'backend', 'frontend', 'fullstack', 'devops', 'cloud', 'saas',
      'paas', 'iaas', 'microservices', 'serverless', 'container',
      'deployment', 'pipeline', 'cicd', 'ssl', 'tls', 'cors',
      
      // Termos em português técnico
      'automação', 'configuração', 'configuracao', 'implementação',
      'implementacao', 'funcionalidade', 'parametro', 'parâmetro',
      'usuario', 'usuário', 'autenticação', 'autenticacao',
      'autorização', 'autorizacao', 'validação', 'validacao'
    ]);
  }

  loadCommonWords() {
    return new Set([
      // Palavras comuns em português
      'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'de', 'da', 'do',
      'das', 'dos', 'em', 'na', 'no', 'nas', 'nos', 'para', 'por', 'com',
      'sem', 'sobre', 'entre', 'até', 'desde', 'durante', 'antes', 'depois',
      'e', 'ou', 'mas', 'porém', 'contudo', 'entretanto', 'todavia',
      'que', 'qual', 'quais', 'quando', 'onde', 'como', 'porque', 'se',
      'é', 'são', 'foi', 'foram', 'será', 'serão', 'seja', 'sejam',
      'tem', 'têm', 'ter', 'tendo', 'tido', 'havia', 'há', 'houve',
      'fazer', 'faz', 'fez', 'feito', 'fazendo', 'pode', 'podem', 'poder',
      'deve', 'devem', 'dever', 'vai', 'vão', 'ir', 'indo', 'ido',
      'este', 'esta', 'estes', 'estas', 'esse', 'essa', 'esses', 'essas',
      'aquele', 'aquela', 'aqueles', 'aquelas', 'isto', 'isso', 'aquilo',
      'seu', 'sua', 'seus', 'suas', 'meu', 'minha', 'meus', 'minhas',
      'nosso', 'nossa', 'nossos', 'nossas', 'vosso', 'vossa', 'vossos', 'vossas',
      'muito', 'muita', 'muitos', 'muitas', 'pouco', 'pouca', 'poucos', 'poucas',
      'todo', 'toda', 'todos', 'todas', 'cada', 'qualquer', 'alguns', 'algumas',
      'primeiro', 'primeira', 'segundo', 'segunda', 'último', 'última',
      'próximo', 'próxima', 'anterior', 'seguinte', 'novo', 'nova', 'novos', 'novas',
      'grande', 'grandes', 'pequeno', 'pequena', 'pequenos', 'pequenas',
      'bom', 'boa', 'bons', 'boas', 'melhor', 'melhores', 'pior', 'piores',
      'mais', 'menos', 'maior', 'maiores', 'menor', 'menores', 'mesmo', 'mesma',
      'outro', 'outra', 'outros', 'outras', 'diferente', 'diferentes',
      'importante', 'importantes', 'necessário', 'necessária', 'possível',
      'impossível', 'fácil', 'difícil', 'simples', 'complexo', 'complexa',
      'aqui', 'ali', 'lá', 'aí', 'onde', 'aonde', 'quando', 'agora', 'hoje',
      'ontem', 'amanhã', 'sempre', 'nunca', 'já', 'ainda', 'também', 'apenas',
      'só', 'somente', 'bem', 'mal', 'melhor', 'pior', 'assim', 'então',
      'portanto', 'logo', 'enfim', 'finalmente', 'depois', 'antes', 'durante'
    ]);
  }

  async check() {
    console.log('📝 Iniciando verificação ortográfica...\n');
    
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
      } else if (this.isTextFile(file.name)) {
        await this.checkFile(fullPath, relativePath);
      }
    }
  }

  isTextFile(filename) {
    return ['.md', '.mdx', '.txt'].includes(path.extname(filename));
  }

  async checkFile(filePath, relativePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const cleanContent = this.cleanContent(content);
      
      this.stats.filesChecked++;
      
      console.log(`   🔍 Verificando: ${relativePath}`);
      
      await this.checkText(cleanContent, relativePath);
      
    } catch (error) {
      console.error(`❌ Erro ao verificar ${filePath}:`, error.message);
    }
  }

  cleanContent(content) {
    // Remover front matter
    content = content.replace(/^---[\s\S]*?---\n/m, '');
    
    // Remover blocos de código
    content = content.replace(/```[\s\S]*?```/g, '');
    content = content.replace(/`[^`]+`/g, '');
    
    // Remover links e imagens
    content = content.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
    content = content.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    
    // Remover HTML tags
    content = content.replace(/<[^>]+>/g, '');
    
    // Remover URLs
    content = content.replace(/https?:\/\/[^\s]+/g, '');
    
    // Remover caracteres especiais mas manter acentos
    content = content.replace(/[^\w\sáàâãäéèêëíìîïóòôõöúùûüçñ]/gi, ' ');
    
    return content;
  }

  async checkText(text, filePath) {
    const words = text.toLowerCase()
      .split(/\s+/)
      .map(word => word.trim())
      .filter(word => word.length > 2);
    
    for (const word of words) {
      this.stats.wordsChecked++;
      
      if (this.isWordIncorrect(word)) {
        const suggestions = this.getSuggestions(word);
        
        this.errors.push({
          file: filePath,
          word: word,
          suggestions: suggestions,
          context: this.getContext(text, word)
        });
        
        this.stats.errorsFound++;
        if (suggestions.length > 0) {
          this.stats.suggestions++;
        }
      }
    }
  }

  isWordIncorrect(word) {
    // Ignorar palavras muito curtas
    if (word.length < 3) return false;
    
    // Ignorar números
    if (/^\d+$/.test(word)) return false;
    
    // Ignorar palavras técnicas conhecidas
    if (this.technicalTerms.has(word.toLowerCase())) return false;
    
    // Ignorar palavras comuns
    if (this.commonWords.has(word.toLowerCase())) return false;
    
    // Ignorar palavras na lista de ignorados
    if (this.ignoredWords.has(word.toLowerCase())) return false;
    
    // Verificar se a palavra parece estar incorreta
    return this.hasSpellingIssues(word);
  }

  hasSpellingIssues(word) {
    // Verificações básicas de ortografia
    
    // Palavras com caracteres estranhos
    if (/[^a-záàâãäéèêëíìîïóòôõöúùûüçñ]/i.test(word)) {
      return true;
    }
    
    // Palavras com muitas consoantes seguidas
    if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(word)) {
      return true;
    }
    
    // Palavras que parecem ter erros comuns
    const commonErrors = [
      /ss.*ss/, // Duplo 'ss'
      /rr.*rr/, // Duplo 'rr'
      /ll.*ll/, // Duplo 'll'
      /nn.*nn/, // Duplo 'nn'
      /ção.*ção/, // Duplo 'ção'
      /[aeiou]{4,}/, // Muitas vogais seguidas
    ];
    
    return commonErrors.some(pattern => pattern.test(word));
  }

  getSuggestions(word) {
    const suggestions = [];
    
    // Sugestões para erros comuns
    const commonFixes = {
      'implementacao': 'implementação',
      'configuracao': 'configuração',
      'autenticacao': 'autenticação',
      'autorizacao': 'autorização',
      'validacao': 'validação',
      'integracao': 'integração',
      'funcionalidade': 'funcionalidade',
      'parametro': 'parâmetro',
      'usuario': 'usuário',
      'automatico': 'automático',
      'basico': 'básico',
      'publico': 'público',
      'especifico': 'específico',
      'tecnico': 'técnico',
      'pratico': 'prático',
      'logico': 'lógico',
      'dinamico': 'dinâmico',
      'sincrono': 'síncrono',
      'assincrono': 'assíncrono'
    };
    
    const lowerWord = word.toLowerCase();
    if (commonFixes[lowerWord]) {
      suggestions.push(commonFixes[lowerWord]);
    }
    
    // Sugestões baseadas em proximidade
    for (const [incorrect, correct] of Object.entries(commonFixes)) {
      if (this.calculateDistance(lowerWord, incorrect) <= 2) {
        suggestions.push(correct);
      }
    }
    
    return suggestions.slice(0, 3); // Máximo 3 sugestões
  }

  calculateDistance(a, b) {
    // Algoritmo básico de distância de Levenshtein
    const matrix = [];
    
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[b.length][a.length];
  }

  getContext(text, word) {
    const index = text.toLowerCase().indexOf(word.toLowerCase());
    if (index === -1) return '';
    
    const start = Math.max(0, index - 30);
    const end = Math.min(text.length, index + word.length + 30);
    
    return text.substring(start, end).trim();
  }

  async generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📝 RELATÓRIO DE VERIFICAÇÃO ORTOGRÁFICA');
    console.log('='.repeat(60));
    
    console.log(`📄 Arquivos verificados: ${this.stats.filesChecked}`);
    console.log(`📝 Palavras verificadas: ${this.stats.wordsChecked}`);
    console.log(`❌ Possíveis erros: ${this.stats.errorsFound}`);
    console.log(`💡 Sugestões disponíveis: ${this.stats.suggestions}`);
    
    if (this.errors.length > 0) {
      console.log('\n❌ POSSÍVEIS ERROS ORTOGRÁFICOS:');
      
      // Agrupar erros por arquivo
      const errorsByFile = this.errors.reduce((acc, error) => {
        if (!acc[error.file]) acc[error.file] = [];
        acc[error.file].push(error);
        return acc;
      }, {});
      
      Object.entries(errorsByFile).forEach(([file, fileErrors]) => {
        console.log(`\n📁 ${file}:`);
        
        // Mostrar apenas os primeiros 5 erros por arquivo
        fileErrors.slice(0, 5).forEach(error => {
          console.log(`   ❌ "${error.word}"`);
          if (error.suggestions.length > 0) {
            console.log(`      💡 Sugestões: ${error.suggestions.join(', ')}`);
          }
          if (error.context) {
            console.log(`      📝 Contexto: ...${error.context}...`);
          }
        });
        
        if (fileErrors.length > 5) {
          console.log(`   ... e mais ${fileErrors.length - 5} erro(s)`);
        }
      });
    }
    
    // Salvar relatório detalhado
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      errors: this.errors,
      summary: {
        accuracy: this.stats.wordsChecked > 0 
          ? ((this.stats.wordsChecked - this.stats.errorsFound) / this.stats.wordsChecked * 100).toFixed(1)
          : 100,
        errorRate: this.stats.wordsChecked > 0
          ? (this.stats.errorsFound / this.stats.wordsChecked * 100).toFixed(2)
          : 0
      }
    };
    
    fs.writeFileSync('spell-check-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 Relatório detalhado salvo em: spell-check-report.json');
    
    // Gerar arquivo de palavras ignoradas
    const ignoredList = Array.from(this.technicalTerms).sort();
    fs.writeFileSync('spell-check-dictionary.txt', ignoredList.join('\n'));
    console.log('📚 Dicionário técnico salvo em: spell-check-dictionary.txt');
    
    if (this.stats.errorsFound > 0) {
      console.log(`\n⚠️  ${this.stats.errorsFound} possível(is) erro(s) encontrado(s).`);
      console.log('💡 Revise manualmente, pois podem ser falsos positivos.');
    } else {
      console.log('\n🎉 Nenhum erro ortográfico detectado!');
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const checker = new SpellChecker();
  checker.check().catch(console.error);
}

module.exports = SpellChecker;