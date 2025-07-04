#!/usr/bin/env node

import { Octokit } from '@octokit/rest';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { translate } from '@vitalets/google-translate-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Token do GitHub (opcional para aumentar limite de requisições)
const OWNER = 'n8n-io';
const REPO = 'n8n';
const RELEASES_DIR = path.join(__dirname, '..', 'release-notes', 'n8n-oficial', 'n8n');

// A API do GitHub é usada de forma anônima (limite de 60 reqs/hora por IP).
// Fornecer um GITHUB_TOKEN como variável de ambiente aumenta o limite para 5000 reqs/hora.
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

if (!GITHUB_TOKEN) {
  console.log('INFO: Nenhuma GITHUB_TOKEN encontrado. Usando acesso anônimo à API do GitHub (limite de taxa menor).');
}

// Função para formatar a data em português
function formatDatePT(dateString) {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'America/Sao_Paulo'
  };
  return date.toLocaleDateString('pt-BR', options);
}

// Função para processar o corpo da release mantendo toda a estrutura do changelog
async function processReleaseBody(body) {
  if (!body) return '';

  // 1) Normaliza remoção de emojis visuais que atrapalham a renderização
  let content = body.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu, '');

  // 2) Converte cabeçalhos principais para português + ícones ANTES da tradução
  const headingMap = {
    '##?\\s+Breaking[ -]Changes?': '## ⚠️ Mudanças Incompatíveis',
    '##?\\s+Features?': '## ✨ Novos Recursos',
    '##?\\s+Bug[ -]Fixes?': '## 🐛 Correções de Bugs',
    '##?\\s+Performance': '## 🚀 Melhorias de Performance',
  };
  for (const [pattern, replacement] of Object.entries(headingMap)) {
    const regex = new RegExp(pattern, 'gi');
    content = content.replace(regex, replacement);
  }

  // 3) Traduz o conteúdo de forma direta
  const { text: translatedContent } = await translate(content, { to: 'pt' });

  return '\n' + translatedContent.trim();
}

// Função para gerar o conteúdo do arquivo Markdown
async function generateMarkdownContent(release) {
  const version = release.tag_name.replace('n8n@', '');
  const publishDate = formatDatePT(release.published_at);
  const compareUrl = `https://github.com/n8n-io/n8n/compare/${release.target_commitish}...${release.tag_name}`;
  
  const body = await processReleaseBody(release.body);
  
  const content = `---
title: "n8n@${version}"
description: "Notas de release para a versão ${version} do n8n."
sidebar_label: "${version}"
slug: "${version}"
---

# n8n@${version}

*Publicado em: ${publishDate}*

[Ver comparação no GitHub](${compareUrl})

${body}

---

## 📊 Estatísticas da Release

- **Lançado em:** ${publishDate}
- **Tag:** \`${release.tag_name}\`
- **Autor:** [${release.author.login}](${release.author.html_url})

## 🔗 Links Úteis

- [Release no GitHub](${release.html_url})
- [Changelog Completo](${compareUrl})
- [Download](${release.tarball_url})

---

:::info Nota da Tradução
Esta é uma tradução automática das notas de release oficiais do n8n. Se encontrar algum erro ou tiver sugestões de melhoria, por favor contribua com correções!
:::`;

  return content;
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Função principal
async function syncReleases() {
  try {
    console.log('🔄 Iniciando sincronização das releases do n8n...\n');

    // Busca as últimas releases
    const { data: releases } = await octokit.repos.listReleases({
      owner: OWNER,
      repo: REPO,
      per_page: 5, // Últimas 5 releases
    });

    console.log(`📦 Encontradas ${releases.length} releases\n`);

    // Garante que o diretório existe
    await fs.mkdir(RELEASES_DIR, { recursive: true });

    // Processa cada release
    for (const release of releases) {
      const version = release.tag_name.replace('n8n@', '');
      const fileName = `${version}.md`;
      const filePath = path.join(RELEASES_DIR, fileName);

      console.log(`📝 Processando release ${version}...`);

      // Busca detalhes completos da release
      const { data: fullRelease } = await octokit.repos.getRelease({
        owner: OWNER,
        repo: REPO,
        release_id: release.id,
      });

      // Gera o conteúdo traduzido
      const content = await generateMarkdownContent(fullRelease);

      // Salva o arquivo
      await fs.writeFile(filePath, content, 'utf8');
      
      console.log(`✅ Release ${version} salva com sucesso!\n`);

      // Adiciona um atraso de 10 segundos para não sobrecarregar a API de tradução
      await delay(10000);
    }

    // Atualiza o índice principal e a sidebar de releases
    await updateReleaseNotesSidebar();
    await updateIndex(releases);

    console.log('🎉 Sincronização concluída com sucesso!');

  } catch (error) {
    console.error('❌ Erro durante a sincronização:', error);
    process.exit(1);
  }
}

// Função para atualizar o arquivo index
async function updateIndex(releases) {
  const indexPath = path.join(__dirname, '..', 'release-notes', 'n8n-oficial', 'index.md');
  
  let indexContent = `---
title: "Releases do n8n"
description: "Notas de release oficiais do n8n, traduzidas para português"
sidebar_position: 1
---

# 🚀 Releases do n8n

Bem-vindo às notas de release oficiais do n8n! Aqui você encontra todas as atualizações, correções e novos recursos lançados pela equipe do n8n, traduzidos para português.

## 📋 Versões Disponíveis

### Versões Recentes\n\n`;

  // Adiciona links para as releases
  for (const release of releases.slice(0, 5)) { // Mostra apenas as 5 mais recentes no índice
    const version = release.tag_name.replace('n8n@', '');
    const date = formatDatePT(release.published_at);
    const type = release.prerelease ? 'Pre-release' : 'Release';
    
    indexContent += `- [**v${version}**](./n8n/${version}) - *${date}* - ${type}\n`;
  }

  indexContent += `
## 🔍 Como navegar

Cada release contém:
- **Novos recursos**: Funcionalidades adicionadas
- **Melhorias**: Otimizações e aprimoramentos
- **Correções de bugs**: Problemas resolvidos
- **Breaking changes**: Mudanças que podem afetar workflows existentes

## 🔄 Sincronização

Estas notas são sincronizadas automaticamente do repositório oficial do n8n e traduzidas para facilitar o acesso da comunidade brasileira.

:::info Nota
As traduções são feitas de forma automatizada e revisadas pela comunidade. Se encontrar algum erro, por favor, contribua com correções!
:::`;

  await fs.writeFile(indexPath, indexContent, 'utf8');
  console.log('📑 Índice atualizado com sucesso!');
}

async function updateReleaseNotesSidebar() {
  const sidebarPath = path.join(__dirname, '..', 'sidebars-release-notes.ts');
  const n8nReleasesDir = path.join(RELEASES_DIR);

  // 1. Lê todos os arquivos no diretório
  const files = await fs.readdir(n8nReleasesDir);

  // 2. Filtra e extrai as versões dos nomes dos arquivos
  const versions = files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));

  // 3. Ordena as versões (semver descending)
  versions.sort((a, b) => {
    const partsA = a.split('.').map(Number);
    const partsB = b.split('.').map(Number);
    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
      const partA = partsA[i] || 0;
      const partB = partsB[i] || 0;
      if (partA > partB) return -1;
      if (partA < partB) return 1;
    }
    return 0;
  });

  // 4. Gera a lista de items para a sidebar
  const items = versions.map(v => `'n8n-oficial/n8n/${v}'`).join(',\n        ');

  // 5. Gera o conteúdo completo do arquivo
  const sidebarContent = `import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  releaseNotesSidebar: [
    {
      type: 'doc',
      id: 'index',
    },
    {
      type: 'category',
      label: 'n8n Oficial',
      link: {
        type: 'doc',
        id: 'n8n-oficial/index',
      },
      items: [
        ${items}
      ],
    },
    {
      type: 'category',
      label: 'Nossa Documentação',
      link: {
        type: 'generated-index',
        title: 'Releases da Documentação',
        description: 'Atualizações e melhorias feitas em nosso projeto de documentação.',
        slug: '/nossa-doc',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'nossa-doc',
        },
      ],
    },
  ],
};

export default sidebars;
`;

  // 6. Salva o arquivo da sidebar
  await fs.writeFile(sidebarPath, sidebarContent, 'utf8');
  console.log('🗂️  Sidebar de releases atualizada com sucesso!');
}

// Executa o script
syncReleases(); 