---
sidebar_position: 3
title: Adicionar Casos de Uso
description: Como estruturar e documentar casos de uso práticos para a comunidade n8n.
keywords: [n8n, casos de uso, exemplos, contribuir, automação, workflow]
---

# 💡 Como Estruturar e Adicionar Casos de Uso

Compartilhar um caso de uso é uma das maneiras mais eficazes de contribuir. Um bom exemplo prático pode inspirar e ajudar dezenas de outros usuários. Um caso de uso bem estruturado é a base para um excelente **template de workflow** ou um **artigo de blog**.

Este guia oferece uma estrutura para pensar e documentar suas automações.

## 1. Identifique o Problema
Todo bom caso de uso começa com um problema claro. Pergunte-se:
- Qual tarefa repetitiva ou processo manual este workflow automatiza?
- Qual dor ou ineficiência ele resolve? (Ex: economizar tempo, evitar erros humanos, integrar sistemas que não se falam).
- Quem é o público para esta solução? (Ex: equipes de marketing, desenvolvedores, analistas de dados).

## 2. Desenvolva a Solução (O Workflow)
Crie o workflow no n8n com as seguintes boas práticas em mente:
- **Clareza:** Organize os nodes de forma lógica. Um workflow que se parece com um "prato de espaguete" é difícil de entender.
- **Documentação Interna:** Use as "Sticky Notes" (notas adesivas) generosamente para explicar o que cada grupo de nodes faz. Descreva a lógica, a configuração necessária e quaisquer truques que você usou.
- **Modularidade:** Se for um workflow complexo, considere dividi-lo em partes menores ou usar sub-workflows.

## 3. Documente o Caso de Uso
Agora, transforme sua solução em conteúdo que possa ser compartilhado.

### Estrutura Sugerida
- **Título:** Um nome claro e descritivo. (Ex: "Como Sincronizar Leads do Facebook com o Google Sheets em Tempo Real").
- **O Problema:** Descreva o cenário e a dor que a automação resolve.
- **A Solução:** Dê uma visão geral de como o workflow funciona.
- **Ferramentas Utilizadas:** Liste os principais nodes e serviços (Ex: n8n, Google Sheets, Slack, OpenAI).
- **Passo a Passo:** Detalhe as etapas mais importantes.
  - Como configurar as credenciais.
  - Quais opções marcar nos nodes-chave.
  - Como lidar com a estrutura de dados (JSON) em pontos críticos.
- **O Workflow (JSON):** Exporte o workflow e cole o código JSON em um bloco de código.

## 4. Compartilhe sua Criação
Com o caso de uso bem documentado, você tem duas excelentes opções:

1.  **Transforme em um Template:** Siga as diretrizes de [contribuição de modelos](./contribuir-modelos.md) e submeta seu workflow ao n8n Creator Hub.
2.  **Escreva um Artigo para o Blog:** Use sua documentação como base para um tutorial e siga as diretrizes do [programa para criadores](./afiliados-e-creators.md).

Pensar em termos de "casos de uso" eleva a qualidade das suas contribuições e maximiza o impacto que você tem na comunidade n8n.
