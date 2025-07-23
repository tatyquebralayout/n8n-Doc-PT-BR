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

// Função para gerar slug de um título
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}

// Função para extrair títulos de um arquivo
function extractHeadings(content) {
  const headings = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const slug = generateSlug(text);
      
      headings.push({
        level,
        text,
        slug,
        line: index + 1
      });
    }
  });
  
  return headings;
}

// Função para extrair âncoras de um arquivo
function extractAnchors(content, filePath) {
  const anchors = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Links com âncoras: [texto](arquivo.md#ancora)
    const linkAnchorMatch = line.match(/\[([^\]]+)\]\(([^)]+)#([^)]+)\)/g);
    if (linkAnchorMatch) {
      linkAnchorMatch.forEach(match => {
        const urlMatch = match.match(/\[([^\]]+)\]\(([^)]+)#([^)]+)\)/);
        if (urlMatch) {
          const url = urlMatch[2];
          const anchor = urlMatch[3];
          
          // Se o link é relativo, resolver o caminho
          if (!url.startsWith('http') && !url.startsWith('mailto:')) {
            anchors.push({
              url: url,
              anchor: anchor,
              line: index + 1,
              context: match,
              type: 'link'
            });
          }
        }
      });
    }
    
    // Âncoras diretas: #ancora
    const directAnchorMatch = line.match(/#([a-zA-Z0-9-]+)/g);
    if (directAnchorMatch) {
      directAnchorMatch.forEach(match => {
        const anchor = match.substring(1); // Remove o #
        anchors.push({
          url: null,
          anchor: anchor,
          line: index + 1,
          context: match,
          type: 'direct'
        });
      });
    }
  });
  
  return anchors;
}

// Função para verificar se uma âncora existe no arquivo de destino
function checkAnchorExists(anchor, targetFilePath) {
  try {
    if (!fs.existsSync(targetFilePath)) {
      return false;
    }
    
    const content = fs.readFileSync(targetFilePath, 'utf8');
    const headings = extractHeadings(content);
    
    // Verificar se a âncora corresponde a algum título
    return headings.some(heading => heading.slug === anchor);
  } catch (error) {
    return false;
  }
}

// Função para resolver caminho do arquivo
function resolveFilePath(basePath, url) {
  if (!url) return null;
  
  const baseDir = path.dirname(basePath);
  const resolvedPath = path.resolve(baseDir, url);
  
  // Tentar diferentes extensões
  const extensions = ['.md', '.mdx', ''];
  for (const ext of extensions) {
    const testPath = resolvedPath + ext;
    if (fs.existsSync(testPath)) {
      return testPath;
    }
  }
  
  // Se não encontrar com extensão, verificar se é um diretório com index
  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
    const indexPaths = [
      path.join(resolvedPath, 'index.md'),
      path.join(resolvedPath, 'index.mdx')
    ];
    
    for (const indexPath of indexPaths) {
      if (fs.existsSync(indexPath)) {
        return indexPath;
      }
    }
  }
  
  return null;
}

// Função principal
function findBrokenAnchors() {
  console.log(colorize('🔍 Procurando por âncoras quebradas...', 'blue'));
  console.log('');

  const docsDir = path.join(process.cwd(), 'docs');
  const markdownFiles = glob.sync('**/*.{md,mdx}', { cwd: docsDir, absolute: true });
  
  let totalBrokenAnchors = 0;
  let filesWithBrokenAnchors = 0;

  markdownFiles.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(docsDir, filePath);
      const anchors = extractAnchors(content, filePath);
      const brokenAnchors = [];

      anchors.forEach(anchor => {
        if (anchor.type === 'link') {
          // Verificar âncora em link externo
          const targetFilePath = resolveFilePath(filePath, anchor.url);
          if (targetFilePath && !checkAnchorExists(anchor.anchor, targetFilePath)) {
            brokenAnchors.push({
              ...anchor,
              targetFile: path.relative(docsDir, targetFilePath)
            });
          }
        } else if (anchor.type === 'direct') {
          // Verificar âncora no mesmo arquivo
          const headings = extractHeadings(content);
          if (!headings.some(heading => heading.slug === anchor.anchor)) {
            brokenAnchors.push(anchor);
          }
        }
      });

      if (brokenAnchors.length > 0) {
        filesWithBrokenAnchors++;
        totalBrokenAnchors += brokenAnchors.length;
        
        console.log(colorize(`📄 ${relativePath}`, 'bold'));
        console.log(colorize(`   ${brokenAnchors.length} âncora(s) quebrada(s):`, 'yellow'));
        
        brokenAnchors.forEach(anchor => {
          if (anchor.type === 'link') {
            console.log(colorize(`   ❌ Linha ${anchor.line}: ${anchor.url}#${anchor.anchor}`, 'red'));
            console.log(`      Arquivo de destino: ${anchor.targetFile}`);
          } else {
            console.log(colorize(`   ❌ Linha ${anchor.line}: #${anchor.anchor}`, 'red'));
          }
          console.log(`      Contexto: ${anchor.context.trim()}`);
        });
        console.log('');
      }
    } catch (error) {
      console.log(colorize(`❌ Erro ao processar ${filePath}: ${error.message}`, 'red'));
    }
  });

  console.log(colorize('📊 Resumo:', 'bold'));
  console.log(`   Arquivos com âncoras quebradas: ${filesWithBrokenAnchors}`);
  console.log(`   Total de âncoras quebradas: ${totalBrokenAnchors}`);
  
  if (totalBrokenAnchors === 0) {
    console.log(colorize('✅ Nenhuma âncora quebrada encontrada!', 'green'));
  } else {
    console.log(colorize('⚠️  Âncoras quebradas encontradas. Revise os arquivos listados acima.', 'yellow'));
    console.log(colorize('💡 Dica: Use títulos com hífens para gerar âncoras válidas.', 'blue'));
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  findBrokenAnchors();
}

module.exports = { findBrokenAnchors, extractHeadings, generateSlug }; 