const fs = require('fs');
const path = require('path');
const https = require('https');

// Lista de SVGs que estão quebrados (contêm "Not found:")
const brokenSvgs = [
  'bug-outline',
  'business-outline', 
  'calendar-outline',
  'card-outline',
  'chart-line-outline',
  'chatbubble-ellipses-outline',
  'chatbubble-outline',
  'chatbubbles-outline',
  'checkbox-outline',
  'checkmark-circle',
  'checkmark-done-outline',
  'checkmark-outline',
  'chevron-down-outline',
  'close-circle-outline',
  'cloud-upload-outline',
  'code-slash-outline',
  'code-working-outline',
  'color-fill-outline',
  'color-filter-outline',
  'color-palette-outline',
  'construct-outline',
  'contrast-outline',
  'create-outline',
  'cube-outline',
  'desktop-outline',
  'document-outline',
  'download-outline',
  'ellipse-outline',
  'extension-puzzle-outline',
  'eye-outline',
  'flask-outline',
  'folder-outline',
  'gift-outline',
  'git-network-outline',
  'git-pull-request-outline',
  'grid-outline',
  'hand-left-outline',
  'hand-right-outline',
  'handshake-outline',
  'happy-outline',
  'hardware-chip-outline',
  'image-outline',
  'information-circle-outline',
  'language-outline',
  'layers-outline',
  'leaf-outline',
  'library-outline',
  'link-outline',
  'list-outline',
  'location-outline',
  'logo-markdown',
  'medal-outline',
  'megaphone-outline',
  'newspaper-outline',
  'open-outline',
  'paper-plane-outline',
  'people-circle-outline',
  'person-outline',
  'pin-outline',
  'planet-outline',
  'play-circle-outline',
  'play-outline',
  'pulse-outline',
  'quote-outline',
  'refresh-outline',
  'remove-outline',
  'resize-outline',
  'ribbon-outline',
  'save-outline',
  'school-outline',
  'search-outline',
  'settings-outline',
  'shapes-outline',
  'share-outline',
  'shield-checkmark-outline',
  'skull-outline',
  'star-filled',
  'stats-chart-outline',
  'stop-circle-outline',
  'sync-outline',
  'target-outline',
  'terminal-outline',
  'text-outline',
  'thumbs-up-outline',
  'trending-up-outline',
  'trophy-outline',
  'videocam-outline',
  'walk-outline',
  'warning'
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
async function fixBrokenSvgs() {
  const svgDir = path.join(__dirname, 'static', 'svg');
  let fixedCount = 0;
  let errorCount = 0;

  console.log('🔧 Iniciando correção de SVGs quebrados...\n');

  for (const iconName of brokenSvgs) {
    const filePath = path.join(svgDir, `${iconName}.svg`);
    
    // Verificar se o arquivo existe e está quebrado
    if (fs.existsSync(filePath) && isBrokenSvg(filePath)) {
      try {
        console.log(`📥 Baixando ${iconName}.svg...`);
        const svgContent = await downloadSvg(iconName);
        
        fs.writeFileSync(filePath, svgContent);
        console.log(`✅ ${iconName}.svg corrigido`);
        fixedCount++;
        
        // Pequena pausa para não sobrecarregar o servidor
        await new Promise(resolve => setTimeout(resolve, 100));
        
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
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.log(`❌ Erro ao baixar ${iconName}.svg: ${error.message}`);
        errorCount++;
      }
    } else {
      console.log(`⏭️ ${iconName}.svg já está correto`);
    }
  }

  console.log(`\n🎉 Concluído!`);
  console.log(`✅ ${fixedCount} SVGs corrigidos`);
  console.log(`❌ ${errorCount} erros`);
  
  if (errorCount > 0) {
    console.log(`\n💡 Alguns ícones podem não existir na versão 8.0.10 do Ionicons.`);
    console.log(`   Verifique: https://ionic.io/ionicons/v8/cheatsheet.html`);
  }
}

// Executar o script
fixBrokenSvgs().catch(console.error); 