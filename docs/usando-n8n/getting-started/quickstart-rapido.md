---
sidebar_position: 1
title: Quickstart Rápido
sidebar_label: Quickstart Rápido
---

# <ion-icon name="play-circle-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Quickstart Rápido

Este guia rápido apresenta os conceitos essenciais do n8n em menos de 5 minutos, mostrando como criar seu primeiro workflow para automatizar uma tarefa simples.

## <ion-icon name="rocket-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que é o n8n?
O n8n é uma plataforma de automação de workflows open source. Com ele, você pode conectar diferentes aplicações, automatizar tarefas e transformar dados sem precisar programar.

## <ion-icon name="construct-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Passo a Passo: Seu Primeiro Workflow

### 1. Acesse o n8n
- Se você ainda não instalou, siga o [Guia de Instalação](../../primeiros-passos/guia-instalacao).
- Acesse a interface web do n8n (por padrão: http://localhost:5678).

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

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Dicas Rápidas
- Use **Manual Trigger** para testar rapidamente.
- Explore nodes populares: HTTP Request, Google Sheets, Slack, Discord, Webhook.
- Use o painel lateral para ver logs, execuções e histórico.
- Experimente o **Data Pinning** para fixar dados de teste.
- Consulte a [documentação oficial do n8n](https://docs.n8n.io/getting-started/quickstart/) para mais exemplos.

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Úteis
- [Documentação Oficial n8n](https://docs.n8n.io/)
- [Comunidade n8n Brasil](https://discord.gg/n8nbrasil)
- [Exemplos de Workflows](https://n8n.io/workflows)
- [Nodes Disponíveis](https://docs.n8n.io/integrations/builtin/overview/)

---

**<ion-icon name="play-circle-outline" style={{ fontSize: '16px', color: '#ea4b71' }}></ion-icon> Pronto para automatizar? Crie seu primeiro workflow agora!**
