const fs = require('fs');
const path = require('path');
const https = require('https');

// Lista de SVGs comuns que realmente existem no Ionicons v8.0.10
const commonSvgs = [
  'checkmark-circle-outline',
  'checkmark-outline',
  'close-circle-outline',
  'information-circle-outline',
  'warning-outline',
  'help-circle-outline',
  'settings-outline',
  'search-outline',
  'add-circle-outline',
  'remove-circle-outline',
  'play-outline',
  'pause-outline',
  'stop-outline',
  'refresh-outline',
  'sync-outline',
  'download-outline',
  'upload-outline',
  'share-outline',
  'link-outline',
  'copy-outline',
  'cut-outline',
  'trash-outline',
  'folder-outline',
  'document-outline',
  'image-outline',
  'video-outline',
  'musical-notes-outline',
  'person-outline',
  'people-outline',
  'heart-outline',
  'star-outline',
  'thumbs-up-outline',
  'thumbs-down-outline',
  'chatbubble-outline',
  'mail-outline',
  'call-outline',
  'location-outline',
  'time-outline',
  'calendar-outline',
  'notifications-outline',
  'home-outline',
  'grid-outline',
  'list-outline',
  'menu-outline',
  'close-outline',
  'chevron-down-outline',
  'chevron-up-outline',
  'chevron-forward-outline',
  'chevron-back-outline',
  'arrow-down-outline',
  'arrow-up-outline',
  'arrow-forward-outline',
  'arrow-back-outline',
  'rocket-outline',
  'compass-outline',
  'globe-outline',
  'planet-outline',
  'school-outline',
  'library-outline',
  'book-outline',
  'newspaper-outline',
  'megaphone-outline',
  'trophy-outline',
  'medal-outline',
  'ribbon-outline',
  'gift-outline',
  'handshake-outline',
  'happy-outline',
  'sad-outline',
  'skull-outline',
  'flask-outline',
  'bulb-outline',
  'construct-outline',
  'color-palette-outline',
  'brush-outline',
  'pencil-outline',
  'create-outline',
  'save-outline',
  'open-outline',
  'resize-outline',
  'shapes-outline',
  'layers-outline',
  'cube-outline',
  'extension-puzzle-outline',
  'hardware-chip-outline',
  'terminal-outline',
  'code-outline',
  'code-slash-outline',
  'git-branch-outline',
  'git-network-outline',
  'logo-github',
  'logo-youtube',
  'logo-markdown'
];

// Função para baixar SVG
function downloadSvg(iconName) {
  return new Promise((resolve, reject) => {
    const url = `https://unpkg.com/ionicons@8.0.10/dist/ionicons/svg/${iconName}.svg`;
    
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve(data));
      } else {
        reject(new Error(`HTTP ${res.statusCode}: ${url}`));
      }
    }).on('error', reject);
  });
}

// Função para verificar se SVG está quebrado
function isBrokenSvg(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes('Not found: /ionicons@8.0.10/dist/ionicons/svg/');
  } catch (error) {
    return true; // Arquivo não existe
  }
}

// Função principal
async function fixCommonSvgs() {
  const svgDir = path.join(__dirname, 'static', 'svg');
  let fixedCount = 0;
  let errorCount = 0;

  console.log('🔧 Corrigindo SVGs comuns do Ionicons...\n');

  for (const iconName of commonSvgs) {
    const filePath = path.join(svgDir, `${iconName}.svg`);
    
    // Verificar se o arquivo existe e está quebrado
    if (fs.existsSync(filePath) && isBrokenSvg(filePath)) {
      try {
        console.log(`📥 Baixando ${iconName}.svg...`);
        const svgContent = await downloadSvg(iconName);
        
        fs.writeFileSync(filePath, svgContent);
        console.log(`✅ ${iconName}.svg corrigido`);
        fixedCount++;
        
      } catch (error) {
        console.log(`❌ Erro ao baixar ${iconName}.svg: ${error.message}`);
        errorCount++;
      }
    } else if (!fs.existsSync(filePath)) {
      try {
        console.log(`📥 Baixando ${iconName}.svg (arquivo não existia)...`);
        const svgContent = await downloadSvg(iconName);
        
        fs.writeFileSync(filePath, svgContent);
        console.log(`✅ ${iconName}.svg criado`);
        fixedCount++;
        
      } catch (error) {
        console.log(`❌ Erro ao baixar ${iconName}.svg: ${error.message}`);
        errorCount++;
      }
    } else {
      console.log(`⏭️ ${iconName}.svg já está correto`);
    }
    
    // Pequena pausa para não sobrecarregar o servidor
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n🎉 Concluído!`);
  console.log(`✅ ${fixedCount} SVGs corrigidos`);
  console.log(`❌ ${errorCount} erros`);
}

// Executar o script
fixCommonSvgs().catch(console.error); 