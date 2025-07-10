const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Remove o } extra antes do > nas tags <ion-icon>
  let newContent = content.replace(
    /(<ion-icon[^>]*style=\{\{[^}]+\}\})\}>/g,
    '$1>'
  );
  
  // Também remove qualquer } extra que possa ter ficado
  newContent = newContent.replace(
    /(<ion-icon[^>]*)\}>/g,
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
console.log('Correção de todas as tags ion-icon concluída!'); 