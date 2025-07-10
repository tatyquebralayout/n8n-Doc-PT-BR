const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Remove especificamente o }}} extra antes do > nas tags <ion-icon>
  const newContent = content.replace(
    /(<ion-icon[^>]*style=\{\{[^}]+\}\})\}>/g,
    '$1>'
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
console.log('Correção final de tags ion-icon concluída!'); 