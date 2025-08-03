const http = require('http');

function checkServer() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:3000', (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Servidor está funcionando na porta 3000');
        resolve(true);
      } else {
        console.log(`❌ Servidor retornou status ${res.statusCode}`);
        reject(new Error(`Status code: ${res.statusCode}`));
      }
    });

    req.on('error', (err) => {
      console.log('❌ Servidor não está funcionando na porta 3000');
      console.log('💡 Execute "npm run start" primeiro');
      reject(err);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Timeout ao conectar com o servidor'));
    });
  });
}

async function main() {
  try {
    await checkServer();
    process.exit(0);
  } catch (error) {
    console.error('Erro ao verificar servidor:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkServer }; 