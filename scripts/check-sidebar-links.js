const fs = require('fs');
const path = require('path');

// Lista de todos os links do sidebar extraídos do sidebars.ts
const sidebarLinks = [
  'intro',
  'primeiros-passos/instalacao',
  'primeiros-passos/conceitos-basicos',
  'primeiros-passos/primeiro-workflow',
  'usando-n8n/getting-started/quickstart-rapido',
  'usando-n8n/getting-started/workflow-na-pratica',
  'usando-n8n/interface/navegacao-editor-ui',
  'usando-n8n/execucoes/componentes-execucoes',
  'logica-e-dados/01-flow-logic/error-handling',
  'logica-e-dados/01-flow-logic/looping',
  'logica-e-dados/01-flow-logic/merging',
  'logica-e-dados/01-flow-logic/splitting',
  'logica-e-dados/01-flow-logic/subworkflows',
  'logica-e-dados/01-flow-logic/waiting',
  'logica-e-dados/02-data/binary-data',
  'logica-e-dados/02-data/data-flow',
  'logica-e-dados/02-data/data-mapping',
  'logica-e-dados/02-data/data-mocking',
  'logica-e-dados/02-data/data-pinning-editing-filtering',
  'logica-e-dados/02-data/data-structure',
  'logica-e-dados/02-data/schema-preview',
  'integracoes/overview',
  'integracoes/builtin-nodes/http-requests/http-request',
  'integracoes/builtin-nodes/http-requests/webhook',
  'integracoes/builtin-nodes/data-processing/set',
  'integracoes/builtin-nodes/logic-control/index',
  'integracoes/builtin-nodes/utilities/index',
  'integracoes/app-nodes/communication/gmail',
  'integracoes/app-nodes/communication/slack',
  'integracoes/app-nodes/productivity/google-sheets',
  'integracoes/app-nodes/productivity/trello',
  'integracoes/app-nodes/ecommerce/index',
  'integracoes/app-nodes/marketing/index',
  'integracoes/trigger-nodes/time-based/manual-trigger',
  'integracoes/trigger-nodes/time-based/schedule-trigger',
  'integracoes/trigger-nodes/event-based/webhook-trigger',
  'integracoes/trigger-nodes/app-triggers/index',
  'integracoes/credential-nodes/api-keys',
  'integracoes/credential-nodes/basic-auth',
  'integracoes/credential-nodes/oauth',
  'integracoes/community-nodes/index',
  'integracoes/community-nodes/instalacao',
  'integracoes/community-nodes/populares',
  'integracoes/criar-nodes/estrutura-node',
  'integracoes/criar-nodes/tutorial-desenvolvimento',
  'integracoes/criar-nodes/publicar-npm',
  'integracoes-br/financeiro/pix',
  'integracoes-br/governo/cnpj-receita',
  'integracoes-br/localizacao/viacep',
  'hosting-n8n/instalacao',
  'hosting-n8n/instalacao/desktop',
  'hosting-n8n/instalacao/npm',
  'hosting-n8n/instalacao/docker',
  'hosting-n8n/instalacao/cloud',
  'hosting-n8n/configuracao/variaveis-ambiente',
  'hosting-n8n/configuracao/database',
  'hosting-n8n/configuracao/queues',
  'hosting-n8n/configuracao/ssl-https',
  'hosting-n8n/seguranca/autenticacao',
  'hosting-n8n/seguranca/usuarios-permissoes',
  'hosting-n8n/seguranca/backup-recovery',
  'hosting-n8n/seguranca/monitoring',
  'hosting-n8n/escalonamento/clustering',
  'hosting-n8n/escalonamento/load-balancing',
  'hosting-n8n/escalonamento/performance',
  'embed/preparacao/prerequisitos',
  'embed/implementacao/configuracao',
  'embed/implementacao/implantacao',
  'embed/gerenciamento/gerenciar-workflows',
  'embed/gerenciamento/white-labelling',
  'advanced-ai/tutorial-ai',
  'advanced-ai/langchain-overview',
  'advanced-ai/nodes-ia/overview',
  'advanced-ai/nodes-ia/openai-chat',
  'advanced-ai/nodes-ia/memory-manager',
  'advanced-ai/nodes-ia/output-parser',
  'advanced-ai/nodes-ia/react-agent',
  'advanced-ai/nodes-ia/sql-agent',
  'advanced-ai/nodes-ia/workflow-tool',
  'advanced-ai/exemplos-casos/overview',
  'advanced-ai/exemplos-casos/chatbot-suporte',
  'advanced-ai/exemplos-casos/classificacao-dados',
  'advanced-ai/exemplos-casos/geracao-conteudo',
  'advanced-ai/exemplos-casos/rag-com-arquivos',
  'api/conceitos/overview',
  'api/conceitos/autenticacao',
  'api/conceitos/paginacao',
  'api/ferramentas/overview',
  'api/ferramentas/playground',
  'api/referencia/overview',
  'api/referencia/referencia-api',
  'referencia/index',
  'referencia/guias/migration-guide',
  'referencia/guias/performance-guide',
  'referencia/guias/troubleshooting',
  'referencia/recursos/glossario',
  'referencia/recursos/apis-brasileiras',
  'referencia/historico/changelog',
  'contribuir/index',
  'contribuir/n8n-oficial/index',
  'contribuir/n8n-oficial/contribuir-codigo-e-docs',
  'contribuir/n8n-oficial/contribuir-community',
  'contribuir/n8n-oficial/contribuir-modelos',
  'contribuir/n8n-oficial/adicionar-casos-uso',
  'contribuir/n8n-oficial/afiliados-e-creators',
  'contribuir/n8n-oficial/referral-vagas',
  'contribuir/esta-documentacao/index',
  'contribuir/esta-documentacao/por-que-contribuir',
  'contribuir/esta-documentacao/como-contribuir',
  'contribuir/esta-documentacao/guidelines',
  'contribuir/esta-documentacao/guia-de-estilo',
  'contribuir/esta-documentacao/traduzir',
  'contribuir/esta-documentacao/exemplos-de-boas-contribuicoes',
  'contribuir/esta-documentacao/duvidas-ou-sugestoes',
  'contribuir/esta-documentacao/markdown-features',
  'contribuir/esta-documentacao/paleta-de-cores',
  'contribuir/esta-documentacao/docusaurus-folder',
  'contribuir/esta-documentacao/entendendo-o-projeto/codigo-conduta',
  'comunidade/index',
  'comunidade/artigos',
      'comunidade/videos/index',
  'comunidade/github',
  'comunidade/como-participar',
  'comunidade/estatisticas',
  'cursos/index',
  'cursos/cursos-em-video/overview',
  'cursos/cursos-em-video/curso-iniciante',
  'cursos/cursos-em-video/curso-avancado',
  'cursos/cursos-em-texto/overview',
  'cursos/cursos-em-texto/nivel-um/capitulo-1',
  'cursos/cursos-em-texto/nivel-um/capitulo-2',
  'cursos/cursos-em-texto/nivel-um/capitulo-3',
  'cursos/cursos-em-texto/nivel-um/capitulo-4',
  'cursos/cursos-em-texto/nivel-um/capitulo-5',
  'cursos/cursos-em-texto/nivel-dois/capitulo-1',
  'cursos/cursos-em-texto/nivel-dois/capitulo-2',
  'cursos/cursos-em-texto/nivel-dois/capitulo-3',
  'catalogo/index'
];

console.log('\ud83d\udd0d Verificando links do sidebar...\n');

let existingFiles = 0;
let missingFiles = 0;
const missingList = [];

sidebarLinks.forEach(link => {
  const filePath = path.join('docs', `${link}.md`);
  
  if (fs.existsSync(filePath)) {
    console.log(`\u2705 ${link}`);
    existingFiles++;
  } else {
    console.log(`\u274c ${link} - ARQUIVO N\u00c3O ENCONTRADO`);
    missingFiles++;
    missingList.push(link);
  }
});

console.log('\n\ud83d\udcca RESUMO:');
console.log(`\u2705 Arquivos existentes: ${existingFiles}`);
console.log(`\u274c Arquivos faltando: ${missingFiles}`);
console.log(`\ud83d\udcc1 Total verificado: ${sidebarLinks.length}`);

if (missingList.length > 0) {
  console.log('\n\ud83d\udccb ARQUIVOS FALTANDO:');
  missingList.forEach(file => {
    console.log(`   - ${file}.md`);
  });
}

console.log('\n\ud83c\udfaf Status:', missingFiles === 0 ? 'TODOS OS LINKS FUNCIONAIS!' : `${missingFiles} links precisam ser corrigidos`); 
