// Script para identificar títulos problemáticos no frontmatter YAML
const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs');
const FILE_EXTENSIONS = ['.md', '.mdx'];

function getAllFiles(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, files);
    } else if (FILE_EXTENSIONS.includes(path.extname(fullPath))) {
      files.push(fullPath);
    }
  });
  return files;
}

function checkTitleQuotes(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const frontmatterMatch = content.match(/^---([\s\S]*?)---/);
  if (!frontmatterMatch) return null;
  const frontmatter = frontmatterMatch[1];
  const lines = frontmatter.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('title:')) {
      const value = line.slice(6).trim();
      // Detecta se NÃO está entre aspas e contém dois pontos, vírgula ou outros caracteres especiais
      if (
        !/^['"].*['"]$/.test(value) &&
        /[:,]/.test(value)
      ) {
        return { line: i + 1, value: value, file: filePath };
      }
    }
  }
  return null;
}

function main() {
  const files = getAllFiles(DOCS_DIR);
  let found = false;
  files.forEach(file => {
    const result = checkTitleQuotes(file);
    if (result) {
      found = true;
      console.log(`Arquivo: ${result.file}`);
      console.log(`  Linha: ${result.line}`);
      console.log(`  Valor: ${result.value}`);
      console.log('-----------------------------------');
    }
  });
  if (!found) {
    console.log('Nenhum título problemático encontrado.');
  }
}

main(); 