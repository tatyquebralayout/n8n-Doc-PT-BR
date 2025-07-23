#!/usr/bin/env node

/**
 * Script para gerar meta tags para páginas
 * Analisa conteúdo e gera meta tags otimizadas para SEO
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class MetaGenerator {
  constructor() {
    this.pages = [];
    this.config = this.loadConfig();
    this.stats = {
      pagesProcessed: 0,
      metaGenerated: 0,
      errors: 0
    };
  }

  loadConfig() {
    const defaultConfig = {
      siteTitle: 'n8n Documentação BR',
      siteDescription: 'Documentação completa do n8n em português brasileiro',
      siteUrl: 'https://n8n-docs-br.netlify.app',
      defaultImage: '/img/n8n-social-card.png',
      author: 'Comunidade n8n Brasil',
      twitterHandle: '@n8n_io',
      language: 'pt-BR',
      keywords: ['n8n', 'automação', 'workflow', 'documentação', 'português']
    };

    try {
      const configPath = 'docusaurus.config.js';
      if (fs.existsSync(configPath)) {
        // Tentar extrair configurações do Docusaurus
        const configContent = fs.readFileSync(configPath, 'utf8');
        const urlMatch = configContent.match(/url:\s*['"]([^'"]+)['"]/);
        const titleMatch = configContent.match(/title:\s*['"]([^'"]+)['"]/);
        const taglineMatch = configContent.match(/tagline:\s*['"]([^'"]+)['"]/);
        
        if (urlMatch) defaultConfig.siteUrl = urlMatch[1];
        if (titleMatch) defaultConfig.siteTitle = titleMatch[1];
        if (taglineMatch) defaultConfig.siteDescription = taglineMatch[1];
      }
    } catch (error) {
      console.warn('⚠️  Não foi possível carregar configurações do Docusaurus');
    }

    return defaultConfig;
  }

  async generate() {
    console.log('🏷️  Iniciando geração de meta tags...\n');
    
    try {
      await this.scanPages();
      await this.generateMetaTags();
      await this.generateSitemap();
      await this.generateReport();
    } catch (error) {
      console.error('❌ Erro durante geração:', error.message);
      process.exit(1);
    }
  }

  async scanPages() {
    console.log('🔍 Escaneando páginas...');
    
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
        urlPath: this.generateUrlPath(relativePath),
        frontMatter,
        content: bodyContent,
        title: this.extractTitle(frontMatter, bodyContent),
        description: this.extractDescription(frontMatter, bodyContent),
        keywords: this.extractKeywords(frontMatter, bodyContent),
        lastModified: fs.statSync(filePath).mtime
      };
      
      this.pages.push(pageInfo);
      this.stats.pagesProcessed++;
      
    } catch (error) {
      this.stats.errors++;
      console.error(`❌ Erro ao analisar ${filePath}:`, error.message);
    }
  }

  parseFrontMatter(content) {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);
    
    if (match) {
      try {
        const frontMatter = yaml.load(match[1]) || {};
        return { frontMatter, bodyContent: match[2] };
      } catch (error) {
        return { frontMatter: {}, bodyContent: content };
      }
    }
    
    return { frontMatter: {}, bodyContent: content };
  }

  generateUrlPath(relativePath) {
    let urlPath = relativePath
      .replace(/\\/g, '/')
      .replace(/\.mdx?$/, '')
      .replace(/\/index$/, '');
    
    if (urlPath.startsWith('docs/')) {
      urlPath = urlPath.substring(5);
    }
    
    if (urlPath.startsWith('src/pages/')) {
      urlPath = urlPath.substring(10);
    }
    
    return urlPath ? `/${urlPath}` : '/';
  }

  extractTitle(frontMatter, content) {
    if (frontMatter.title) return frontMatter.title;
    
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) return h1Match[1].trim();
    
    return 'Documentação n8n';
  }

  extractDescription(frontMatter, content) {
    if (frontMatter.description) return frontMatter.description;
    
    // Extrair primeiro parágrafo
    const paragraphs = content
      .replace(/^#.+$/gm, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p && !p.startsWith('#') && !p.startsWith('```'));
    
    if (paragraphs.length > 0) {
      let description = paragraphs[0].substring(0, 160);
      if (description.length === 160) {
        description = description.substring(0, description.lastIndexOf(' ')) + '...';
      }
      return description;
    }
    
    return this.config.siteDescription;
  }

  extractKeywords(frontMatter, content) {
    let keywords = [...this.config.keywords];
    
    if (frontMatter.keywords && Array.isArray(frontMatter.keywords)) {
      keywords = keywords.concat(frontMatter.keywords);
    }
    
    if (frontMatter.tags && Array.isArray(frontMatter.tags)) {
      keywords = keywords.concat(frontMatter.tags);
    }
    
    // Extrair palavras-chave do conteúdo
    const contentKeywords = content
      .toLowerCase()
      .match(/\b(n8n|workflow|automação|node|trigger|webhook|api|integração|dados)\b/g);
    
    if (contentKeywords) {
      keywords = keywords.concat(contentKeywords);
    }
    
    return [...new Set(keywords)].slice(0, 10); // Máximo 10 keywords únicas
  }

  async generateMetaTags() {
    console.log('🏷️  Gerando meta tags...');
    
    const metaOutput = {
      pages: {},
      globalMeta: this.generateGlobalMeta()
    };
    
    for (const page of this.pages) {
      const meta = this.generatePageMeta(page);
      metaOutput.pages[page.urlPath] = meta;
      this.stats.metaGenerated++;
      
      // Atualizar front matter do arquivo se necessário
      await this.updatePageFrontMatter(page, meta);
    }
    
    // Salvar arquivo de meta tags
    fs.writeFileSync('meta-tags.json', JSON.stringify(metaOutput, null, 2));
    console.log('📄 Meta tags salvas em: meta-tags.json');
  }

  generateGlobalMeta() {
    return {
      siteName: this.config.siteTitle,
      siteDescription: this.config.siteDescription,
      siteUrl: this.config.siteUrl,
      defaultImage: this.config.defaultImage,
      author: this.config.author,
      language: this.config.language,
      twitterHandle: this.config.twitterHandle
    };
  }

  generatePageMeta(page) {
    const fullUrl = `${this.config.siteUrl}${page.urlPath}`;
    const imageUrl = page.frontMatter.image || this.config.defaultImage;
    const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${this.config.siteUrl}${imageUrl}`;
    
    return {
      title: `${page.title} | ${this.config.siteTitle}`,
      description: page.description,
      keywords: page.keywords.join(', '),
      url: fullUrl,
      image: fullImageUrl,
      type: page.urlPath === '/' ? 'website' : 'article',
      lastModified: page.lastModified.toISOString(),
      
      // Open Graph
      og: {
        title: page.title,
        description: page.description,
        url: fullUrl,
        image: fullImageUrl,
        type: page.urlPath === '/' ? 'website' : 'article',
        siteName: this.config.siteTitle
      },
      
      // Twitter Card
      twitter: {
        card: 'summary_large_image',
        title: page.title,
        description: page.description,
        image: fullImageUrl,
        site: this.config.twitterHandle
      },
      
      // Schema.org
      schema: {
        '@context': 'https://schema.org',
        '@type': page.urlPath === '/' ? 'WebSite' : 'Article',
        name: page.title,
        description: page.description,
        url: fullUrl,
        image: fullImageUrl,
        dateModified: page.lastModified.toISOString(),
        author: {
          '@type': 'Organization',
          name: this.config.author
        }
      }
    };
  }

  async updatePageFrontMatter(page, meta) {
    try {
      const content = fs.readFileSync(page.filePath, 'utf8');
      const { frontMatter, bodyContent } = this.parseFrontMatter(content);
      
      // Atualizar apenas se não existir ou estiver desatualizado
      let needsUpdate = false;
      
      if (!frontMatter.title && page.title !== 'Documentação n8n') {
        frontMatter.title = page.title;
        needsUpdate = true;
      }
      
      if (!frontMatter.description) {
        frontMatter.description = page.description;
        needsUpdate = true;
      }
      
      if (!frontMatter.keywords && page.keywords.length > 0) {
        frontMatter.keywords = page.keywords;
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        const newFrontMatter = yaml.dump(frontMatter);
        const newContent = `---\n${newFrontMatter}---\n${bodyContent}`;
        fs.writeFileSync(page.filePath, newContent);
        console.log(`   ✅ Atualizado: ${page.relativePath}`);
      }
      
    } catch (error) {
      console.error(`   ❌ Erro ao atualizar ${page.filePath}:`, error.message);
    }
  }

  async generateSitemap() {
    console.log('🗺️  Gerando sitemap...');
    
    const urls = this.pages.map(page => {
      const lastmod = page.lastModified.toISOString().split('T')[0];
      const priority = page.urlPath === '/' ? '1.0' : '0.8';
      
      return `  <url>
    <loc>${this.config.siteUrl}${page.urlPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
    }).join('\n');
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
    
    fs.writeFileSync('static/sitemap.xml', sitemap);
    console.log('🗺️  Sitemap salvo em: static/sitemap.xml');
  }

  async generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RELATÓRIO DE GERAÇÃO DE META TAGS');
    console.log('='.repeat(60));
    
    console.log(`📄 Páginas processadas: ${this.stats.pagesProcessed}`);
    console.log(`🏷️  Meta tags geradas: ${this.stats.metaGenerated}`);
    console.log(`❌ Erros: ${this.stats.errors}`);
    
    // Estatísticas por tipo de página
    const pageTypes = this.pages.reduce((acc, page) => {
      const type = page.urlPath.startsWith('/docs') ? 'docs' : 'pages';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📊 Distribuição por tipo:');
    Object.entries(pageTypes).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} páginas`);
    });
    
    // Verificar páginas sem descrição
    const pagesWithoutDesc = this.pages.filter(p => p.description === this.config.siteDescription);
    if (pagesWithoutDesc.length > 0) {
      console.log(`\n⚠️  ${pagesWithoutDesc.length} página(s) usando descrição padrão`);
    }
    
    console.log('\n📁 Arquivos gerados:');
    console.log('   📄 meta-tags.json - Meta tags para todas as páginas');
    console.log('   🗺️  static/sitemap.xml - Sitemap do site');
    
    if (this.stats.errors > 0) {
      console.log(`\n⚠️  ${this.stats.errors} erro(s) encontrado(s). Verifique os logs acima.`);
    } else {
      console.log('\n🎉 Geração de meta tags concluída com sucesso!');
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const generator = new MetaGenerator();
  generator.generate().catch(console.error);
}

module.exports = MetaGenerator;