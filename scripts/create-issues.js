// Script para criar issues de gestão de conteúdo

async function getOctokit() {
  const { Octokit } = await import("@octokit/rest");
  return Octokit;
}

const owner = "tatyquebralayout";
const repo = "n8n-Doc-pt-BR";

const ISSUES = [
  {
    title: "?? Completar páginas Em Construção da seção Contribuir",
    body: `## Problema
A seção Contribuir tem várias páginas marcadas como Em Construção que precisam ser completadas.

## Páginas Afetadas
- docs/contribuir/esta-documentacao/
- docs/contribuir/n8n-oficial/

## Tarefas
- [ ] Revisar e completar conteúdo das páginas em construção
- [ ] Adicionar exemplos práticos
- [ ] Criar guias passo a passo
- [ ] Adicionar screenshots quando necessário
- [ ] Revisar e corrigir links

## Prioridade
?? Crítico - Essencial para engajamento da comunidade`,
    labels: ["?? Crítico", "?? Em Construção", "?? Comunidade", "?? Tutorial", "???? Português BR"]
  },
  
  {
    title: "?? Criar conteúdo Getting Started completo",
    body: `## Problema
A seção Getting Started é fundamental para novos usuários mas está incompleta.

## Tarefas
- [ ] Criar guia de instalação simplificado
- [ ] Desenvolver tutorial do primeiro workflow
- [ ] Explicar conceitos fundamentais
- [ ] Adicionar exemplos práticos brasileiros
- [ ] Criar fluxo de aprendizado progressivo

## Prioridade
 Crítico - Primeira impressão dos usuários`,
    labels: [" Crítico", " Getting Started", " Didático", " Português BR", " Tutorial"]
  },
  
  {
    title: " Auditoria e correção de links quebrados",
    body: `## Problema
Vários links internos e externos estão quebrados ou incorretos.

## Tarefas
- [ ] Executar auditoria automática de links
- [ ] Corrigir links quebrados identificados
- [ ] Padronizar formato de links
- [ ] Verificar links externos periodicamente
- [ ] Criar processo de validação contínua

## Prioridade
 Importante - Afeta experiência do usuário`,
    labels: [" Importante", " Links Quebrados", " Automação", " Auditoria"]
  },
  
  {
    title: " Expandir integrações brasileiras",
    body: `## Problema
Faltam integrações específicas para o mercado brasileiro.

## Integrações Prioritárias
- PIX e bancos brasileiros
- Receita Federal (CNPJ/CPF)
- ViaCEP e Correios
- E-commerce nacional

## Tarefas
- [ ] Pesquisar APIs disponíveis
- [ ] Criar documentação das integrações
- [ ] Desenvolver exemplos práticos
- [ ] Testar integrações
- [ ] Criar tutoriais específicos

## Prioridade
 Importante - Diferencial competitivo`,
    labels: [" Importante", " Integrações BR", " Português BR", " Tutorial", " Exemplos"]
  },
  
  {
    title: " Criar sistema de templates para conteúdo",
    body: `## Problema
Falta padronização na criação de novo conteúdo.

## Tarefas
- [ ] Criar templates base
- [ ] Definir estrutura padrão
- [ ] Estabelecer guias de estilo
- [ ] Criar checklist de qualidade
- [ ] Documentar processo de criação

## Prioridade
 Melhoria - Padronização e qualidade`,
    labels: [" Melhoria", " Template", " Melhoria Contínua"]
  }
];

async function createIssues(octokit) {
  console.log(" Criando issues...");
  
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
      
      console.log(` Issue criada: ${issue.title} (#${response.data.number})`);
      createdIssues.push({
        number: response.data.number,
        title: issue.title,
        url: response.data.html_url
      });
    } catch (error) {
      console.error(` Erro ao criar issue ${issue.title}:`, error.message);
    }
  }
  
  return createdIssues;
}

async function main() {
  console.log(" Iniciando criação de issues...");
  console.log(` Repositório: ${owner}/${repo}`);
  
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error(" Token do GitHub não encontrado. Defina GITHUB_TOKEN nas variáveis de ambiente.");
    process.exit(1);
  }
  
  try {
    const OctokitClass = await getOctokit();
    const octokit = new OctokitClass({
      auth: token,
    });
    
    const createdIssues = await createIssues(octokit);
    
    console.log("\n Issues criadas com sucesso!");
    console.log(` Issues criadas: ${createdIssues.length}`);
    
    if (createdIssues.length > 0) {
      console.log("\n Issues criadas:");
      createdIssues.forEach(issue => {
        console.log(`- #${issue.number}: ${issue.title}`);
        console.log(`  ${issue.url}`);
      });
    }
    
    console.log("\n Acesse o repositório para ver as issues:");
    console.log(`https://github.com/${owner}/${repo}/issues`);
    
  } catch (error) {
    console.error(" Erro ao criar issues:", error.message);
    process.exit(1);
  }
}

main();
