import axios from 'axios';
import { translate } from '@vitalets/google-translate-api';
import fs from 'fs';
import path from 'path';

const GITHUB_API_URL = 'https://api.github.com/repos/n8n-io/n8n/releases';
const OUTPUT_DIR = path.resolve(process.cwd(), 'release-notes/n8n-oficial/n8n');

async function syncReleases() {
  console.log('Buscando releases do repositório n8n-io/n8n...');

  try {
    // Garante que o diretório de saída exista
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Busca as releases da API do GitHub
    const { data: releases } = await axios.get(GITHUB_API_URL, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      params: {
        per_page: 5, // Vamos começar com as 5 mais recentes
      },
    });

    console.log(`Encontradas ${releases.length} releases recentes.`);

    for (const release of releases) {
      const { name, tag_name, body, published_at } = release;

      // Ignora releases sem corpo (body) ou que sejam rascunhos (draft)
      if (!body || release.draft) {
        console.log(`Ignorando release: ${name} (sem conteúdo ou é um rascunho)`);
        continue;
      }
      
      console.log(`\n--- Processando Release: ${name} (${tag_name}) ---`);

      // Limpa o nome da tag para usar como nome do arquivo (ex: 'n8n@1.100.1' -> '1.100.1')
      const version = tag_name.replace('n8n@', '');

      // Traduz o corpo da release
      console.log('Traduzindo o conteúdo...');
      const { text: translatedBody } = await translate(body, { to: 'pt' });
      
      // Monta o conteúdo final do arquivo Markdown
      const fileContent = `---
title: "${name}"
description: "Notas de release para a versão ${version} do n8n."
sidebar_label: "${version}"
---

*Publicado em: ${new Date(published_at).toLocaleDateString('pt-BR')}*

${translatedBody}
`;
      
      // Define o nome do arquivo e o caminho completo
      const fileName = `${version}.md`;
      const filePath = path.join(OUTPUT_DIR, fileName);
      
      // Salva o arquivo
      fs.writeFileSync(filePath, fileContent);
      console.log(`✅ Release salva em: ${filePath}`);
    }

    console.log('\nSincronização concluída com sucesso!');

  } catch (error) {
    console.error('Ocorreu um erro durante a sincronização:', error.message);
  }
}

syncReleases(); 