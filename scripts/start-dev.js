#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando n8n Documentation BR...');

// Função para verificar se uma porta está em uso
function isPortInUse(port) {
  try {
    execSync(`netstat -ano | findstr :${port}`, { stdio: 'ignore' });
    return true;
  } catch (_error) {
    return false;
  }
}

// Função para matar processo em uma porta
function killPort(port) {
  try {
    console.log(`🔫 Matando processo na porta ${port}...`);
    execSync(`npx kill-port ${port}`, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.log(`⚠️  Não foi possível matar processo na porta ${port}`);
    return false;
  }
}

// Função para encontrar porta livre
function findFreePort(startPort = 3000) {
  let port = startPort;
  while (isPortInUse(port) && port < startPort + 10) {
    port++;
  }
  return port;
}

// Função principal
function startDev() {
  const defaultPort = 3000;
  
  console.log('🔍 Verificando portas disponíveis...');
  
  if (isPortInUse(defaultPort)) {
    console.log(`⚠️  Porta ${defaultPort} está em uso`);
    
    // Tenta matar o processo
    if (killPort(defaultPort)) {
      console.log('✅ Processo anterior finalizado');
    } else {
      // Se não conseguir matar, procura porta alternativa
      const freePort = findFreePort(defaultPort + 1);
      console.log(`🔄 Usando porta alternativa: ${freePort}`);
      
      // Atualiza o package.json temporariamente
      const packagePath = path.join(__dirname, '..', 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      packageJson.scripts.start = `docusaurus start --port ${freePort}`;
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
      
      console.log(`📝 Package.json atualizado para usar porta ${freePort}`);
    }
  }
  
  console.log('🚀 Iniciando Docusaurus...');
  
  try {
    execSync('npm run start', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Erro ao iniciar Docusaurus:', error.message);
    process.exit(1);
  }
}

// Executa o script
startDev(); 
