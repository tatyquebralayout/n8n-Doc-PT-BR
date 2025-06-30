#!/usr/bin/env node

import { Octokit } from '@octokit/rest';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detect repo (e.g., tati/n8n-Doc-pt-BR) from env or fallback
const REPO_FULL = process.env.GITHUB_REPOSITORY ?? 'tatyquebralayout/n8n-Doc-pt-BR';
const [OWNER, REPO] = REPO_FULL.split('/');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const RELEASES_DIR = path.join(__dirname, '..', 'release-notes', 'nossa-doc');

const octokit = new Octokit({ auth: GITHUB_TOKEN });

function formatDatePT(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    year: 'numeric', month: 'long', day: 'numeric',
    timeZone: 'America/Sao_Paulo',
  });
}

async function generateContent(release) {
  const version = release.tag_name.replace(/^v/, '');
  const date = formatDatePT(release.published_at);
  const compareUrl = `https://github.com/${OWNER}/${REPO}/compare/${release.target_commitish}...${release.tag_name}`;

  return `---
sidebar_position: 1
title: Visão Geral v${version}
description: Notas da documentação versão ${version}
---

# Documentação v${version} - Visão Geral

**Data de lançamento:** ${date}

## 📝 Resumo

${release.body ?? '_Sem descrição_'}

## 🔗 Links

- [Release no GitHub](${release.html_url})
- [Diff Completo](${compareUrl})
`;
}

async function updateIndex(releases) {
  const indexPath = path.join(RELEASES_DIR, 'index.md');
  let md = `---\ntitle: Releases da Nossa Doc\nsidebar_position: 1\n---\n\n# 📚 Releases da Nossa Documentação\n\nVersões recentes:\n\n`;
  for (const rel of releases.slice(0,5)) {
    const v = rel.tag_name.replace(/^v/, '');
    const d = formatDatePT(rel.published_at);
    md += `- [v${v}](./v${v}/overview) — ${d}\n`;
  }
  await fs.writeFile(indexPath, md, 'utf8');
}

async function sync() {
  const { data: releases } = await octokit.repos.listReleases({ owner: OWNER, repo: REPO, per_page: 10 });
  await fs.mkdir(RELEASES_DIR, { recursive: true });
  for (const rel of releases) {
    const version = rel.tag_name.replace(/^v/, '');
    const dir = path.join(RELEASES_DIR, `v${version}`);
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, 'overview.md');
    const content = await generateContent(rel);
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`✔︎ v${version}`);
  }
  await updateIndex(releases);
  console.log('✅ Nossa doc releases sincronizadas');
}

sync().catch(err=>{ console.error(err); process.exit(1);} ); 