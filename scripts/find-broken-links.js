#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Cores para output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Função para colorir texto
function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

// Função para verificar se um arquivo existe
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

// Função para verificar se um diretório existe
function directoryExists(dirPath) {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch (error) {
    return false;
  }
}

// Função para normalizar caminhos
function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/').replace(/\/+/g, '/');
}

// Função para resolver caminhos relativos
function resolveRelativePath(basePath, relativePath) {
  const baseDir = path.dirname(basePath);
  const resolvedPath = path.resolve(baseDir, relativePath);
  return normalizePath(resolvedPath);
}

// Função para extrair links de um arquivo Markdown
function extractLinks(content, filePath) {
  const links = [];
  
  // Regex para diferentes tipos de links
  const linkPatterns = [
    // Links Markdown: [texto](url)
    /\[([^\]]+)\]\(([^)]+)\)/g,
    // Links de imagem: ![alt](url)
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    // Links HTML: <a href="url">
    /<a[^>]+href=["']([^"']+)["'][^>]*>/gi,
    // Links em frontmatter (simplificado)
    /(?:href|url|link):\s*["']([^"']+)["']/gi
  ];

  linkPatterns.forEach((pattern, index) => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const url = match[2] || match[1]; // match[2] para Markdown, match[1] para HTML
      if (url && !url.startsWith('http') && !url.startsWith('mailto:') && !url.startsWith('#')) {
        links.push({
          url: url,
          line: content.substring(0, match.index).split('\n').length,
          context: match[0],
          type: index === 0 ? 'markdown' : index === 1 ? 'image' : index === 2 ? 'html' : 'frontmatter'
        });
      }
    }
  });

  return links;
}

// Função para verificar se um link está quebrado
function isBrokenLink(link, basePath) {
  const { url } = link;
  
  // Ignorar URLs externas e âncoras
  if (url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('#')) {
    return false;
  }

  // Resolver caminho relativo
  const resolvedPath = resolveRelativePath(basePath, url);
  
  // Verificar se o arquivo existe
  if (fileExists(resolvedPath)) {
    return false;
  }

  // Verificar se é um diretório com index.md
  const indexPaths = [
    resolvedPath + '/index.md',
    resolvedPath + '/index.mdx',
    resolvedPath + '.md',
    resolvedPath + '.mdx'
  ];

  for (const indexPath of indexPaths) {
    if (fileExists(indexPath)) {
      return false;
    }
  }

  return true;
}

// Função principal
function findBrokenLinks() {
  console.log(colorize('🔍 Procurando por links quebrados...', 'blue'));
  console.log('');

  const docsDir = path.join(process.cwd(), 'docs');
  const markdownFiles = glob.sync('**/*.{md,mdx}', { cwd: docsDir, absolute: true });
  
  let totalBrokenLinks = 0;
  let filesWithBrokenLinks = 0;

  markdownFiles.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(docsDir, filePath);
      const links = extractLinks(content, filePath);
      const brokenLinks = links.filter(link => isBrokenLink(link, filePath));

      if (brokenLinks.length > 0) {
        filesWithBrokenLinks++;
        totalBrokenLinks += brokenLinks.length;
        
        console.log(colorize(`📄 ${relativePath}`, 'bold'));
        console.log(colorize(`   ${brokenLinks.length} link(s) quebrado(s):`, 'yellow'));
        
        brokenLinks.forEach(link => {
          console.log(colorize(`   ❌ Linha ${link.line}: ${link.url}`, 'red'));
          console.log(`      Contexto: ${link.context.trim()}`);
        });
        console.log('');
      }
    } catch (error) {
      console.log(colorize(`❌ Erro ao processar ${filePath}: ${error.message}`, 'red'));
    }
  });

  console.log(colorize('📊 Resumo:', 'bold'));
  console.log(`   Arquivos com links quebrados: ${filesWithBrokenLinks}`);
  console.log(`   Total de links quebrados: ${totalBrokenLinks}`);
  
  if (totalBrokenLinks === 0) {
    console.log(colorize('✅ Nenhum link quebrado encontrado!', 'green'));
  } else {
    console.log(colorize('⚠️  Links quebrados encontrados. Revise os arquivos listados acima.', 'yellow'));
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  findBrokenLinks();
}

module.exports = { findBrokenLinks, extractLinks, isBrokenLink }; 