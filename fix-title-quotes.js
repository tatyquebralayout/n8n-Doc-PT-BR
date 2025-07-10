const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = content.replace(
    /^(\s*#+\s+)(.*)$/gm,
    (match, hashes, title) => {
      // Remove aspas simples e duplas do título, mas preserva HTML e markdown
      // Preserva aspas dentro de atributos HTML
      let cleaned = title;
      
      // Remove aspas que não estão dentro de atributos HTML
      // Primeiro, vamos marcar temporariamente as aspas dentro de atributos HTML
      cleaned = cleaned.replace(/(\w+)=["']([^"']*)["']/g, (match, attr, value) => {
        return `${attr}=__QUOTE_START__${value}__QUOTE_END__`;
      });
      
      // Remove aspas restantes
      cleaned = cleaned.replace(/["']/g, '');
      
      // Restaura as aspas dos atributos HTML
      cleaned = cleaned.replace(/__QUOTE_START__([^_]+)__QUOTE_END__/g, '"$1"');
      
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
console.log('Correção de aspas em títulos concluída!'); 