const fs = require('fs');
const path = require('path');

function fixIonIconTitle(title) {
  // Corrige o atributo name para sempre estar entre aspas duplas
  title = title.replace(/<ion-icon\s+name=(["']?)([\w-]+)\1/gi, '<ion-icon name="$2"');

  // Remove qualquer atributo style (com ou sem aspas) e força o padrão correto SEM aspas ao redor das chaves
  title = title.replace(/style=(["']?)\{?\{?([^\}\}]*)\}?\}?(["']?)/gi, (match, q1, styleContent, q2) => {
    // Extrai fontSize e color se existirem
    let fontSizeMatch = styleContent.match(/fontSize:?['"\s]*(\d+px)['"\s]*/i);
    let colorMatch = styleContent.match(/color:?['"\s]*(#[0-9a-fA-F]{6})['"\s]*/i);
    let fontSize = fontSizeMatch ? fontSizeMatch[1] : '24px';
    let color = colorMatch ? colorMatch[1] : '#ea4b71';
    return `style={{ fontSize: '${fontSize}', color: '${color}' }}`;
  });

  // Remove qualquer coisa após o fechamento do style={{ ... }} antes do >
  // Garante que termine exatamente com }} antes do >
  title = title.replace(/(style=\{\{[^}]+\}\})[^>}]*/g, '$1');

  return title;
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = content.replace(
    /^(\s*#+\s+)(.*)$/gm,
    (match, hashes, title) => {
      // Só processa se tiver <ion-icon
      if (title.includes('<ion-icon')) {
        return hashes + fixIonIconTitle(title);
      }
      return match;
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
console.log('Correção de títulos com ion-icon concluída!'); 