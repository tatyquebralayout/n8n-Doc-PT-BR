const { createRequire } = require('module');
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');

// Função para importar dinamicamente o Octokit
async function getOctokit() {
  const { Octokit } = await import('@octokit/rest');
  return Octokit;
}

const owner = 'tatyquebralayout';
const repo = 'n8n-Doc-pt-BR';

const LABELS = [
  // Prioridades
  { name: '🔴 Crítico', color: 'FF0000', description: 'Problema crítico que precisa ser resolvido imediatamente' },
  { name: '🟠 Importante', color: 'FF8C00', description: 'Problema importante que deve ser resolvido em breve' },
  { name: '🟡 Melhoria', color: 'FFD700', description: 'Melhoria que pode ser implementada quando possível' },
  { name: '🟢 Polimento', color: '32CD32', description: 'Pequenos ajustes e melhorias de qualidade' },
  
  // Problemas de Conteúdo
  { name: '📭 Vazio', color: 'E6E6FA', description: 'Página ou seção completamente vazia' },
  { name: '🚧 Em Construção', color: 'FFA500', description: 'Conteúdo marcado como "em construção"' },
  { name: '🔗 Links Quebrados', color: 'DC143C', description: 'Links que não funcionam ou estão incorretos' },
  { name: '📋 Sem Estrutura', color: 'D3D3D3', description: 'Conteúdo sem headings ou estrutura adequada' },
  { name: '📝 Conteúdo Insuficiente', color: 'DDA0DD', description: 'Conteúdo muito curto ou superficial' },
  
  // Qualidade
  { name: '🇧🇷 Português BR', color: '009639', description: 'Relacionado à localização em português brasileiro' },
  { name: '📖 Clareza', color: '4169E1', description: 'Melhorar clareza e compreensão do conteúdo' },
  { name: '🎯 Objetividade', color: '8B4513', description: 'Tornar o conteúdo mais direto e objetivo' },
  { name: '📚 Didático', color: '9370DB', description: 'Melhorar aspecto educacional e didático' },
  { name: '🔍 Exemplos', color: '2E8B57', description: 'Adicionar ou melhorar exemplos práticos' },
  
  // Tipos de Conteúdo
  { name: '📋 Tutorial', color: '20B2AA', description: 'Conteúdo de tutorial ou guia passo a passo' },
  { name: '📚 Documentação', color: '4682B4', description: 'Documentação técnica ou referência' },
  { name: '💡 Conceito', color: 'DAA520', description: 'Explicação de conceitos e fundamentos' },
  { name: '🔧 Configuração', color: '696969', description: 'Instruções de configuração e setup' },
  { name: '🌐 Integração', color: '008080', description: 'Conteúdo sobre integrações e conexões' },
  
  // Seções Específicas
  { name: '🚀 Getting Started', color: 'FF6347', description: 'Seção de primeiros passos' },
  { name: '🏗️ Instalação', color: '8B4513', description: 'Guias de instalação e setup' },
  { name: '🔌 Integrações BR', color: '228B22', description: 'Integrações específicas do Brasil' },
  { name: '🎓 Cursos', color: '9932CC', description: 'Conteúdo educacional e cursos' },
  { name: '👥 Comunidade', color: 'FF69B4', description: 'Conteúdo relacionado à comunidade' },
  
  // Status de Trabalho
  { name: '✍️ Escrevendo', color: 'FFA07A', description: 'Conteúdo sendo escrito atualmente' },
  { name: '👀 Revisando', color: 'F0E68C', description: 'Conteúdo em processo de revisão' },
  { name: '🔄 Atualizando', color: 'DEB887', description: 'Conteúdo sendo atualizado' },
  { name: '✅ Pronto', color: '90EE90', description: 'Conteúdo finalizado e aprovado' },
  
  // Gestão
  { name: '📊 Auditoria', color: '6495ED', description: 'Resultado de auditoria de conteúdo' },
  { name: '📈 Melhoria Contínua', color: '32CD32', description: 'Processo de melhoria contínua' },
  { name: '🎯 Meta', color: 'FF1493', description: 'Meta ou objetivo a ser alcançado' },
  { name: '📋 Template', color: 'B0C4DE', description: 'Criação ou uso de templates' },
  { name: '🔄 Automação', color: '778899', description: 'Automação de processos' },
  
  // Especiais
  { name: '🆘 Ajuda Necessária', color: 'FF4500', description: 'Precisa de ajuda da comunidade' },
  { name: '💬 Feedback', color: 'DA70D6', description: 'Relacionado a feedback de usuários' },
  { name: '🏆 Showcase', color: 'FFD700', description: 'Exemplo de boa prática ou destaque' }
];

const ISSUES = [
  {
    title: '📋 Completar páginas "Em Construção" da seção Contribuir',
    body: `## Problema
A seção "Contribuir" tem várias páginas marcadas como "Em Construção" que precisam ser completadas.

## Páginas Afetadas
- docs/contribuir/esta-documentacao/
- docs/contribuir/projeto-n8n/

## Tarefas
- [ ] Revisar e completar conteúdo das páginas "em construção"
- [ ] Adicionar exemplos práticos
- [ ] Criar guias passo a passo
- [ ] Adicionar screenshots quando necessário
- [ ] Revisar e corrigir links

## Prioridade
🔴 Crítico - Essencial para engajamento da comunidade

## Critérios de Aceitação
- [ ] Todas as páginas têm conteúdo completo
- [ ] Conteúdo está em português brasileiro
- [ ] Links funcionam corretamente
- [ ] Exemplos são claros e práticos`,
    labels: ['🔴 Crítico', '🚧 Em Construção', '👥 Comunidade', '📋 Tutorial', '🇧🇷 Português BR']
  },
  
  {
    title: '🚀 Criar conteúdo Getting Started completo',
    body: `## Problema
A seção Getting Started é fundamental para novos usuários mas está incompleta.

## Seções Necessárias
- Introdução ao n8n
- Instalação rápida
- Primeiro workflow
- Conceitos básicos
- Próximos passos

## Tarefas
- [ ] Criar guia de instalação simplificado
- [ ] Desenvolver tutorial do primeiro workflow
- [ ] Explicar conceitos fundamentais
- [ ] Adicionar exemplos práticos brasileiros
- [ ] Criar fluxo de aprendizado progressivo

## Prioridade
🔴 Crítico - Primeira impressão dos usuários

## Critérios de Aceitação
- [ ] Usuário consegue instalar e usar o n8n em 15 minutos
- [ ] Conteúdo é didático e progressivo
- [ ] Exemplos são relevantes para o público brasileiro
- [ ] Links para próximos passos estão claros`,
    labels: ['🔴 Crítico', '🚀 Getting Started', '📚 Didático', '🇧🇷 Português BR', '📋 Tutorial']
  },
  
  {
    title: '🔗 Auditoria e correção de links quebrados',
    body: `## Problema
Vários links internos e externos estão quebrados ou incorretos.

## Escopo
- Links internos entre páginas
- Links para documentação oficial
- Links para recursos externos
- Links para exemplos e tutoriais

## Tarefas
- [ ] Executar auditoria automática de links
- [ ] Corrigir links quebrados identificados
- [ ] Padronizar formato de links
- [ ] Verificar links externos periodicamente
- [ ] Criar processo de validação contínua

## Prioridade
🟠 Importante - Afeta experiência do usuário

## Critérios de Aceitação
- [ ] Todos os links funcionam corretamente
- [ ] Links seguem padrão consistente
- [ ] Processo de validação está implementado`,
    labels: ['🟠 Importante', '🔗 Links Quebrados', '🔄 Automação', '📊 Auditoria']
  },
  
  {
    title: '📖 Melhorar qualidade dos textos existentes',
    body: `## Problema
Muitos textos existentes precisam de melhoria em clareza, objetividade e didática.

## Áreas de Melhoria
- Clareza na explicação
- Objetividade na comunicação
- Qualidade didática
- Consistência terminológica
- Português brasileiro

## Tarefas
- [ ] Revisar textos existentes
- [ ] Padronizar terminologia
- [ ] Melhorar clareza das explicações
- [ ] Adicionar exemplos onde necessário
- [ ] Criar glossário de termos

## Prioridade
🟡 Melhoria - Qualidade geral do conteúdo

## Critérios de Aceitação
- [ ] Textos são claros e objetivos
- [ ] Terminologia é consistente
- [ ] Português brasileiro correto
- [ ] Exemplos são relevantes`,
    labels: ['🟡 Melhoria', '📖 Clareza', '🎯 Objetividade', '🇧🇷 Português BR', '📚 Didático']
  },
  
  {
    title: '🔌 Expandir integrações brasileiras',
    body: `## Problema
Faltam integrações específicas para o mercado brasileiro.

## Integrações Prioritárias
### Financeiro
- PIX
- Bancos brasileiros
- Sistemas de pagamento nacionais

### Governo
- Receita Federal
- CNPJ/CPF
- NFe/NFCe
- SPED

### Localização
- ViaCEP
- Correios
- IBGE

### E-commerce
- Mercado Livre
- Americanas
- Magazine Luiza

## Tarefas
- [ ] Pesquisar APIs disponíveis
- [ ] Criar documentação das integrações
- [ ] Desenvolver exemplos práticos
- [ ] Testar integrações
- [ ] Criar tutoriais específicos

## Prioridade
🟠 Importante - Diferencial competitivo

## Critérios de Aceitação
- [ ] Integrações funcionam corretamente
- [ ] Documentação está completa
- [ ] Exemplos são práticos e úteis
- [ ] Tutoriais são claros`,
    labels: ['🟠 Importante', '🔌 Integrações BR', '🇧🇷 Português BR', '📋 Tutorial', '🔍 Exemplos']
  },
  
  {
    title: '📋 Criar sistema de templates para conteúdo',
    body: `## Problema
Falta padronização na criação de novo conteúdo.

## Templates Necessários
- Template para tutoriais
- Template para documentação de API
- Template para integrações
- Template para conceitos
- Template para troubleshooting

## Tarefas
- [ ] Criar templates base
- [ ] Definir estrutura padrão
- [ ] Estabelecer guias de estilo
- [ ] Criar checklist de qualidade
- [ ] Documentar processo de criação

## Prioridade
🟡 Melhoria - Padronização e qualidade

## Critérios de Aceitação
- [ ] Templates são fáceis de usar
- [ ] Estrutura é consistente
- [ ] Guias de estilo são claros
- [ ] Processo está documentado`,
    labels: ['🟡 Melhoria', '📋 Template', '📈 Melhoria Contínua', '📚 Documentação']
  },
  
  {
    title: '💬 Implementar sistema de feedback de usuários',
    body: `## Problema
Não temos um sistema para coletar feedback dos usuários sobre a documentação.

## Funcionalidades Necessárias
- Widget de feedback por página
- Sistema de avaliação de conteúdo
- Sugestões de melhoria
- Relatórios de feedback
- Integração com GitHub Issues

## Tarefas
- [ ] Pesquisar soluções disponíveis
- [ ] Implementar widget de feedback
- [ ] Criar sistema de coleta
- [ ] Desenvolver relatórios
- [ ] Integrar com workflow de melhoria

## Prioridade
🟢 Polimento - Melhoria contínua

## Critérios de Aceitação
- [ ] Usuários podem dar feedback facilmente
- [ ] Feedback é coletado e organizado
- [ ] Relatórios são gerados automaticamente
- [ ] Integração com GitHub funciona`,
    labels: ['🟢 Polimento', '💬 Feedback', '🔄 Automação', '📈 Melhoria Contínua']
  }
];

async function createLabels(octokit) {
  console.log('🏷️ Criando labels...');
  
  const createdLabels = [];
  
  for (const label of LABELS) {
    try {
      await octokit.rest.issues.createLabel({
        owner,
        repo,
        name: label.name,
        color: label.color,
        description: label.description
      });
      console.log(`✅ Label criada: ${label.name}`);
      createdLabels.push(label.name);
    } catch (error) {
      if (error.status === 422) {
        console.log(`⚠️ Label já existe: ${label.name}`);
      } else {
        console.error(`❌ Erro ao criar label ${label.name}:`, error.message);
      }
    }
  }
  
  return createdLabels;
}

async function createIssues(octokit) {
  console.log('📝 Criando issues...');
  
  const createdIssues = [];
  
  for (const issue of ISSUES) {
    try {
      const response = await octokit.rest.issues.create({
        owner,
        repo,
        title: issue.title,
        body: issue.body,
        labels: issue.labels
      });
      
      console.log(`✅ Issue criada: ${issue.title} (#${response.data.number})`);
      createdIssues.push({
        number: response.data.number,
        title: issue.title,
        url: response.data.html_url
      });
    } catch (error) {
      console.error(`❌ Erro ao criar issue ${issue.title}:`, error.message);
    }
  }
  
  return createdIssues;
}

async function cleanupLabels(octokit) {
  console.log('🧹 Limpando labels antigas...');
  
  try {
    const { data: existingLabels } = await octokit.rest.issues.listLabelsForRepo({
      owner,
      repo
    });
    
    const labelsToDelete = existingLabels.filter(label => 
      label.name.includes('🔴') || 
      label.name.includes('🟠') || 
      label.name.includes('🟡') || 
      label.name.includes('🟢') ||
      label.name.includes('📭') ||
      label.name.includes('🚧') ||
      label.name.includes('🔗') ||
      label.name.includes('📋') ||
      label.name.includes('📝') ||
      label.name.includes('🇧🇷') ||
      label.name.includes('📖') ||
      label.name.includes('🎯') ||
      label.name.includes('📚') ||
      label.name.includes('🔍') ||
      label.name.includes('💡') ||
      label.name.includes('🔧') ||
      label.name.includes('🌐') ||
      label.name.includes('🚀') ||
      label.name.includes('🏗️') ||
      label.name.includes('🔌') ||
      label.name.includes('🎓') ||
      label.name.includes('👥') ||
      label.name.includes('✍️') ||
      label.name.includes('👀') ||
      label.name.includes('🔄') ||
      label.name.includes('✅') ||
      label.name.includes('📊') ||
      label.name.includes('📈') ||
      label.name.includes('🆘') ||
      label.name.includes('💬') ||
      label.name.includes('🏆')
    );
    
    for (const label of labelsToDelete) {
      try {
        await octokit.rest.issues.deleteLabel({
          owner,
          repo,
          name: label.name
        });
        console.log(`🗑️ Label removida: ${label.name}`);
      } catch (error) {
        console.error(`❌ Erro ao remover label ${label.name}:`, error.message);
      }
    }
  } catch (error) {
    console.error('❌ Erro ao listar labels:', error.message);
  }
}

async function closeExistingIssues(octokit) {
  console.log('🔒 Fechando issues existentes relacionadas...');
  
  try {
    const { data: existingIssues } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: 'open'
    });
    
    const issuesToClose = existingIssues.filter(issue => 
      issue.title.includes('Completar páginas') ||
      issue.title.includes('Getting Started') ||
      issue.title.includes('links quebrados') ||
      issue.title.includes('qualidade dos textos') ||
      issue.title.includes('integrações brasileiras') ||
      issue.title.includes('sistema de templates') ||
      issue.title.includes('feedback de usuários') ||
      issue.title.includes('Auditoria') ||
      issue.title.includes('Gestão de Conteúdo')
    );
    
    for (const issue of issuesToClose) {
      try {
        await octokit.rest.issues.update({
          owner,
          repo,
          issue_number: issue.number,
          state: 'closed'
        });
        console.log(`🔒 Issue fechada: ${issue.title} (#${issue.number})`);
      } catch (error) {
        console.error(`❌ Erro ao fechar issue #${issue.number}:`, error.message);
      }
    }
  } catch (error) {
    console.error('❌ Erro ao listar issues:', error.message);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const cleanLabels = args.includes('--clean-labels');
  const closeExisting = args.includes('--close-existing');
  
  console.log('🚀 Iniciando criação do projeto de gestão de conteúdo...');
  console.log(`📁 Repositório: ${owner}/${repo}`);
  
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('❌ Token do GitHub não encontrado. Defina GITHUB_TOKEN nas variáveis de ambiente.');
    process.exit(1);
  }
  
  try {
    const OctokitClass = await getOctokit();
    const octokit = new OctokitClass({
      auth: token,
    });
    
    if (cleanLabels) {
      await cleanupLabels(octokit);
    }
    
    if (closeExisting) {
      await closeExistingIssues(octokit);
    }
    
    const createdLabels = await createLabels(octokit);
    const createdIssues = await createIssues(octokit);
    
    console.log('\n🎉 Projeto de gestão de conteúdo criado com sucesso!');
    console.log(`📊 Labels criadas: ${createdLabels.length}`);
    console.log(`📝 Issues criadas: ${createdIssues.length}`);
    
    if (createdIssues.length > 0) {
      console.log('\n📋 Issues criadas:');
      createdIssues.forEach(issue => {
        console.log(`- #${issue.number}: ${issue.title}`);
        console.log(`  ${issue.url}`);
      });
    }
    
    console.log('\n🔗 Acesse o repositório para ver as issues:');
    console.log(`https://github.com/${owner}/${repo}/issues`);
    
  } catch (error) {
    console.error('❌ Erro ao criar projeto:', error.message);
    process.exit(1);
  }
}

// Verificar se o script está sendo executado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main, createLabels, createIssues }; 