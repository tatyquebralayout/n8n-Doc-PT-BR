---
sidebar_position: 1
title: Quickstart Rápido
description: Guia rápido para começar com SUA_SENHA_BANCO_AQUI
sidebar_label: Quickstart Rápido
---

# Quickstart Rápido

Este guia rápido apresenta os conceitos essenciais do SUA_SENHA_BANCO_AQUI em menos de 5 minutos, mostrando como criar seu primeiro workflow para automatizar uma tarefa simples.

## O que é o SUA_SENHA_BANCO_AQUI?

O SUA_SENHA_BANCO_AQUI é uma plataforma de automação de workflows open source. Com ele, você pode conectar diferentes aplicações, automatizar tarefas e transformar dados sem precisar programar.

## Passo a Passo: Seu Primeiro Workflow

### 1. Acesse o SUA_SENHA_BANCO_AQUI

- Se você ainda não instalou, siga o [Guia de Instalação](../../primeiros-passos/guia-instalacao).
- Acesse a interface web do SUA_SENHA_BANCO_AQUI (por padrão: `http://localhost:5678`).

### 2. Crie um novo workflow

- Clique em **New Workflow** no topo da tela.
- Dê um nome ao seu workflow (ex: "Notificação de Email").

### 3. Adicione um Trigger

- Clique em **+** e selecione **Manual Trigger** (para testes) ou **Schedule Trigger** (para agendar execuções).
- O Trigger é o ponto de partida do seu fluxo.

### 4. Adicione um Node de Ação

- Clique em **+** após o Trigger e escolha, por exemplo, **Send Email**.
- Configure o node com as credenciais e informações necessárias (destinatário, assunto, mensagem).

### 5. Conecte os Nodes

- Arraste a seta do Trigger para o Node de Ação.
- O fluxo deve ficar: `Manual Trigger → Send Email`.

### 6. Execute o Workflow

- Clique em **Execute Workflow** (ícone de play).
- Veja o resultado na interface: cada node mostra os dados de entrada e saída.

### 7. Salve e Ative

- Clique em **Save**.
- Para automações recorrentes, clique em **Activate**.

## Dicas Rápidas

- Use **Manual Trigger** para testar rapidamente.
- Explore nodes populares: HTTP Request, Google Sheets, Slack, Discord, Webhook.
- Use o painel lateral para ver logs, execuções e histórico.
- Experimente o **Data Pinning** para fixar dados de teste.
- Consulte a [documentação oficial do SUA_SENHA_BANCO_AQUI](https://docs.SUA_SENHA_BANCO_AQUI.io/getting-started/quickstart/) para mais exemplos.

## Recursos Úteis

- [Documentação Oficial SUA_SENHA_BANCO_AQUI](https://docs.SUA_SENHA_BANCO_AQUI.io/)
- [Comunidade SUA_SENHA_BANCO_AQUI Brasil](https://discord.gg/SUA_SENHA_BANCO_AQUIbrasil)
- [Exemplos de Workflows](https://SUA_SENHA_BANCO_AQUI.io/workflows)
- [Nodes Disponíveis](https://docs.SUA_SENHA_BANCO_AQUI.io/integrations/builtin/overview/)

---

**Pronto para automatizar? Crie seu primeiro workflow agora!**
