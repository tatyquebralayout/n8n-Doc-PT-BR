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

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

// Função para extrair slug do frontmatter
function extractSlug(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const slugMatch = frontmatter.match(/slug:\s*(.+)/);
    if (slugMatch) {
      return slugMatch[1].trim();
    }
  }
  return null;
}

// Função para gerar slug baseado no nome do arquivo
function generateSlugFromFilename(filePath) {
  const basename = path.basename(filePath, path.extname(filePath));
  if (basename === 'index') {
    // Para index.md, usar o nome do diretório pai
    const dirname = path.basename(path.dirname(filePath));
    return dirname === 'docs' ? '/' : `/${dirname}`;
  }
  return `/${basename}`;
}

// Função para gerar rota baseada no caminho do arquivo
function generateRouteFromPath(filePath, docsDir) {
  const relativePath = path.relative(docsDir, filePath);
  const dirname = path.dirname(relativePath);
  const basename = path.basename(relativePath, path.extname(relativePath));
  
  if (basename === 'index') {
    return dirname === '.' ? '/' : `/${dirname}`;
  }
  
  const route = dirname === '.' ? `/${basename}` : `/${dirname}/${basename}`;
  return route;
}

// Função principal
function findDuplicateRoutes() {
  console.log(colorize('🔍 Procurando por rotas duplicadas...', 'blue'));
  console.log('');

  const docsDir = path.join(process.cwd(), 'docs');
  const markdownFiles = glob.sync('**/*.{md,mdx}', { cwd: docsDir, absolute: true });
  
  const routes = new Map();
  const duplicates = [];

  markdownFiles.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(docsDir, filePath);
      
      // Tentar extrair slug do frontmatter
      let route = extractSlug(content);
      
      // Se não houver slug, gerar baseado no caminho
      if (!route) {
        route = generateRouteFromPath(filePath, docsDir);
      }
      
      if (routes.has(route)) {
        duplicates.push({
          route: route,
          files: [routes.get(route), relativePath]
        });
      } else {
        routes.set(route, relativePath);
      }
    } catch (error) {
      console.log(colorize(`❌ Erro ao processar ${filePath}: ${error.message}`, 'red'));
    }
  });

  // Agrupar duplicatas por rota
  const groupedDuplicates = new Map();
  duplicates.forEach(dup => {
    if (!groupedDuplicates.has(dup.route)) {
      groupedDuplicates.set(dup.route, []);
    }
    groupedDuplicates.get(dup.route).push(...dup.files);
  });

  if (groupedDuplicates.size === 0) {
    console.log(colorize('✅ Nenhuma rota duplicada encontrada!', 'green'));
    return;
  }

  console.log(colorize('⚠️  Rotas duplicadas encontradas:', 'yellow'));
  console.log('');

  groupedDuplicates.forEach((files, route) => {
    console.log(colorize(`🔄 Rota: ${route}`, 'bold'));
    console.log(colorize(`   Arquivos:`, 'yellow'));
    files.forEach(file => {
      console.log(`   📄 ${file}`);
    });
    console.log('');
  });

  console.log(colorize('💡 Sugestões para resolver:', 'blue'));
  console.log('   1. Remover arquivos duplicados (index.md vs index.mdx)');
  console.log('   2. Usar slugs únicos no frontmatter');
  console.log('   3. Reorganizar estrutura de diretórios');
  console.log('   4. Consolidar conteúdo em um único arquivo');
}

// Executar se chamado diretamente
if (require.main === module) {
  findDuplicateRoutes();
}

module.exports = { findDuplicateRoutes }; 