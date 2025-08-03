#!/usr/bin/env node

/**
 * Script para corrigir problemas de Unicode em matemática
 * Remove caracteres Unicode problemáticos de expressões matemáticas
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Caracteres Unicode problemáticos e suas substituições
const unicodeReplacements = {
  '├¬': 'e', // ë
  '├ú': 'a', // ã
  '├│': 'o', // õ
  '├º': 'u', // ù
  '├Á': 'A', // Á
  '├í': 'a', // á
  'ÔÇô': '-', // en dash
  'ÔÇó': '-', // em dash
  'ÔÇö': '"', // smart quote
  'ÔÇ£': '"', // smart quote
  'ÔÇØ': '"', // smart quote
  'ÔÇÖ': "'", // smart quote
  'ÔÇÖ': "'", // smart quote
};

// Função para corrigir texto Unicode
function fixUnicodeText(text) {
  let fixedText = text;
  
  // Substituir caracteres Unicode problemáticos
  Object.entries(unicodeReplacements).forEach(([unicode, replacement]) => {
    const regex = new RegExp(unicode, 'g');
    fixedText = fixedText.replace(regex, replacement);
  });
  
  return fixedText;
}

// Função para processar expressões matemáticas
function fixMathExpressions(content) {
  // Encontrar expressões matemáticas inline ($...$)
  content = content.replace(/\$([^$]+)\$/g, (match, mathContent) => {
    const fixedMath = fixUnicodeText(mathContent);
    return `$${fixedMath}$`;
  });
  
  // Encontrar expressões matemáticas de bloco ($$...$$)
  content = content.replace(/\$\$([^$]+)\$\$/g, (match, mathContent) => {
    const fixedMath = fixUnicodeText(mathContent);
    return `$$${fixedMath}$$`;
  });
  
  return content;
}

// Função para processar um arquivo
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    const fixedContent = fixMathExpressions(content);
    
    if (originalContent !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ Corrigido: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return false;
  }
}

// Função principal
function main() {
  console.log('🔧 Corrigindo problemas de Unicode em matemática...\n');
  
  // Encontrar todos os arquivos MDX
  const mdxFiles = glob.sync('docs/**/*.mdx');
  const mdFiles = glob.sync('docs/**/*.md');
  const allFiles = [...mdxFiles, ...mdFiles];
  
  let totalFiles = 0;
  let fixedFiles = 0;
  
  allFiles.forEach(filePath => {
    totalFiles++;
    if (processFile(filePath)) {
      fixedFiles++;
    }
  });
  
  console.log(`\n📊 Resumo:`);
  console.log(`- Arquivos processados: ${totalFiles}`);
  console.log(`- Arquivos corrigidos: ${fixedFiles}`);
  console.log(`- Arquivos sem problemas: ${totalFiles - fixedFiles}`);
  
  if (fixedFiles > 0) {
    console.log('\n✅ Correções aplicadas com sucesso!');
  } else {
    console.log('\nℹ️ Nenhum problema de Unicode encontrado.');
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = {
  fixUnicodeText,
  fixMathExpressions,
  processFile
}; 