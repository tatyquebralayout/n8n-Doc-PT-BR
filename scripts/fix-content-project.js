// Script para criar labels e issues de gestão de conteúdo

async function getOctokit() {
  const { Octokit } = await import("@octokit/rest");
  return Octokit;
}

const owner = "tatyquebralayout";
const repo = "n8n-Doc-pt-BR";

const LABELS = [
  { name: " Crítico", color: "FF0000", description: "Problema crítico que precisa ser resolvido imediatamente" },
  { name: " Importante", color: "FF8C00", description: "Problema importante que deve ser resolvido em breve" },
  { name: " Melhoria", color: "FFD700", description: "Melhoria que pode ser implementada quando possível" },
  { name: " Polimento", color: "32CD32", description: "Pequenos ajustes e melhorias de qualidade" },
  { name: " Vazio", color: "E6E6FA", description: "Página ou seção completamente vazia" },
  { name: " Em Construção", color: "FFA500", description: "Conteúdo marcado como em construção" },
  { name: " Links Quebrados", color: "DC143C", description: "Links que não funcionam ou estão incorretos" },
  { name: " Português BR", color: "009639", description: "Relacionado à localização em português brasileiro" },
  { name: " Clareza", color: "4169E1", description: "Melhorar clareza e compreensão do conteúdo" },
  { name: " Tutorial", color: "20B2AA", description: "Conteúdo de tutorial ou guia passo a passo" },
  { name: " Getting Started", color: "FF6347", description: "Seção de primeiros passos" },
  { name: " Integrações BR", color: "228B22", description: "Integrações específicas do Brasil" },
  { name: " Comunidade", color: "FF69B4", description: "Conteúdo relacionado à comunidade" },
  { name: " Didático", color: "9370DB", description: "Melhorar aspecto educacional e didático" },
  { name: " Automação", color: "778899", description: "Automação de processos" },
  { name: " Auditoria", color: "6495ED", description: "Resultado de auditoria de conteúdo" },
  { name: " Feedback", color: "DA70D6", description: "Relacionado a feedback de usuários" },
  { name: " Template", color: "B0C4DE", description: "Criação ou uso de templates" },
  { name: " Melhoria Contínua", color: "32CD32", description: "Processo de melhoria contínua" },
  { name: " Exemplos", color: "2E8B57", description: "Adicionar ou melhorar exemplos práticos" },
  { name: " Objetividade", color: "8B4513", description: "Tornar o conteúdo mais direto e objetivo" }
];

async function createLabels(octokit) {
  console.log(" Criando labels...");
  
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
      console.log(` Label criada: ${label.name}`);
      createdLabels.push(label.name);
    } catch (error) {
      if (error.status === 422) {
        console.log(` Label já existe: ${label.name}`);
      } else {
        console.error(` Erro ao criar label ${label.name}:`, error.message);
      }
    }
  }
  
  return createdLabels;
}

async function main() {
  console.log(" Iniciando criação de labels...");
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
    
    const createdLabels = await createLabels(octokit);
    
    console.log("\n Labels criadas com sucesso!");
    console.log(` Labels criadas: ${createdLabels.length}`);
    
    console.log("\n Acesse o repositório para ver as labels:");
    console.log(`https://github.com/${owner}/${repo}/labels`);
    
  } catch (error) {
    console.error(" Erro ao criar labels:", error.message);
    process.exit(1);
  }
}

main();
