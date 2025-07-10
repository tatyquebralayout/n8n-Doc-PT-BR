const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = content.replace(
    /^(\s*#+\s+)(.*)$/gm,
    (match, hashes, title) => {
      // Remove aspas simples e duplas do título, mas preserva HTML e markdown
      const cleaned = title.replace(/["']/g, '');
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
console.log('Remoção de aspas em títulos concluída!'); 