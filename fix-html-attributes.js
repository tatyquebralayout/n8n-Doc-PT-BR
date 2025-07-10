const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = content.replace(
    /^(\s*#+\s+)(.*)$/gm,
    (match, hashes, title) => {
      // Adiciona aspas de volta nos atributos HTML
      let cleaned = title;
      
      // Corrige atributos HTML que perderam as aspas
      cleaned = cleaned.replace(/(\w+)=([^"'\s>]+)/g, '$1="$2"');
      
      return hashes + cleaned;
    }
  );
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Corrigido:', filePath);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.md')) {
      processFile(fullPath);
    }
  });
}

walk(path.join(__dirname, 'docs'));
console.log('Correção de atributos HTML concluída!'); 