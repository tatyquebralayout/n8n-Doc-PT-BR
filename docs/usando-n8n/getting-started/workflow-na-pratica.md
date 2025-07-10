---
id: workflow-na-pratica
title: Workflow na Prática
sidebar_label: Workflow na Prática
---

# <ion-icon name="git-branch-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Workflow na Prática

Este tutorial mostra como criar um workflow real no n8n, integrando diferentes serviços para resolver um problema do dia a dia. Vamos criar um fluxo que envia uma notificação no Discord sempre que uma nova issue for criada em um repositório do GitHub.

## <ion-icon name="rocket-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você vai aprender

- Como usar triggers baseados em eventos (GitHub Trigger)
- Como configurar nodes de integração (Discord)
- Como mapear e transformar dados entre nodes
- Como testar, depurar e ativar seu workflow

## <ion-icon name="construct-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Passo a Passo: GitHub → Discord

### 1. Crie um novo workflow

- Clique em **New Workflow** e dê um nome (ex: "GitHub Issues para Discord").

### 2. Adicione o Trigger do GitHub

- Clique em **+** e selecione **GitHub Trigger**.
- Configure:
  - **Resource**: Issue
  - **Event**: Created
  - **Repository**: (selecione seu repositório)
  - **Credenciais**: Conecte sua conta GitHub (OAuth ou token)
- Salve e clique em **Listen for events** para registrar o webhook.

### 3. Adicione o Node do Discord

- Clique em **+** após o trigger e selecione **Discord**.
- Escolha a operação **Send Message**.
- Configure:
  - **Channel ID**: ID do canal de destino
  - **Message**: Use dados do trigger, ex:

    ```
    Nova issue criada: {{$json["title"]}}
    Link: {{$json["html_url"]}}
    Autor: {{$json["user"]["login"]}}
    ```

  - **Credenciais**: Conecte seu bot Discord

### 4. Conecte os Nodes

- Arraste a seta do GitHub Trigger para o Discord.

### 5. Teste o Workflow

- Crie uma issue de teste no GitHub.
- Veja a mensagem aparecer no Discord.
- Use o painel lateral para ver logs e dados de entrada/saída.

### 6. Ative o Workflow

- Clique em **Activate** para rodar automaticamente.

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Dicas e Boas Práticas

- Use **expressões** para personalizar mensagens.
- Teste com o **Manual Trigger** antes de ativar triggers reais.
- Consulte a [documentação oficial do GitHub Trigger](https://docs.n8n.io/integrations/builtin/app-nodes/github/#trigger) e do [Discord](https://docs.n8n.io/integrations/builtin/app-nodes/discord/).
- Use o **Data Pinning** para fixar dados de teste.
- Explore outros nodes: Slack, Telegram, Email, Google Sheets.

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Úteis

- [Documentação Oficial n8n](https://docs.n8n.io/)
- [Exemplo de Workflow GitHub → Discord](https://n8n.io/workflows/1342)
- [Comunidade n8n Brasil](https://discord.gg/n8nbrasil)

---

**<ion-icon name="git-branch-outline" style={{ fontSize: '16px', color: '#ea4b71' }}></ion-icon> Pronto para criar automações reais? Experimente outros exemplos e compartilhe seu workflow na comunidade!**
