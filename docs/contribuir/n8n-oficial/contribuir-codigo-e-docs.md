---
sidebar_position: 1
title: Contribuir com Código para o n8n
description: Um guia detalhado para contribuir com código diretamente para o projeto n8n oficial
keywords: [n8n, contribuir, código, documentação, open source, pull request, github]
---


# <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Guia para Contribuir com Código para o n8n

Contribuir para o código-fonte do n8n é uma das formas mais impactantes de ajudar o projeto. Este guia detalha o processo, desde a configuração do ambiente até a submissão do seu Pull Request (PR), seguindo as diretrizes oficiais do n8n.

:::warning Contribuição para o Projeto Oficial
As diretrizes abaixo são para o **projeto principal do n8n**. As interações (PRs, issues) são em **inglês**. Para contribuir com **esta documentação em português**, veja a seção "Contribuir para Esta Documentação".
:::

---

## <ion-icon name="play-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Antes de Começar: Itens Essenciais

### **Código de Conduta**

O projeto é governado por um [Código de Conduta](https://github.com/n8n-io/n8n/blob/master/CODE_OF_CONDUCT). Ao participar, você concorda em seguir seus termos.

### **Acordo de Licença de Contribuidor (CLA)**

Para que sua contribuição seja aceita, você **precisa assinar** um Contributor License Agreement (CLA). É um processo simples: ao abrir um Pull Request, um bot irá comentar com um link para você assinar o acordo digitalmente.

---

## <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurando o Ambiente de Desenvolvimento

### **Pré-requisitos**

- **[Node.js](https://nodejs.org/en/):** Versão `18.17` ou mais recente
- **[pnpm](https://pnpm.io/):** Versão `8.6` ou mais recente
- **[Git](https://git-scm.com/)**
- **Ferramentas de Build:** Dependendo do seu sistema operacional:
  - **Debian/Ubuntu:** `sudo apt-get install -y build-essential python`
  - **Windows:** `npm install --global windows-build-tools`
  - **MacOS:** Nenhuma dependência adicional é necessária

### **Alternativa Fácil: Dev Container**

Se você usa **VS Code** e **Docker**, a forma mais fácil de começar é com um [Dev Container](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/n8n-io/n8n). Ele configura o ambiente de desenvolvimento completo automaticamente dentro de um container.

### **Instalação Manual**

1. **Fork:** Faça um [fork do repositório do n8n](https://github.com/n8n-io/n8n) para a sua conta do GitHub

2. **Clone o seu fork:**

```bash
git clone https://github.com/SEU-USUARIO/n8n.git
cd n8n
```

3. **Adicione o repositório original como `upstream`:**

```bash
git remote add upstream https://github.com/n8n-io/n8n.git
```

4. **Instale as dependências:**

```bash
pnpm install
```

5. **Faça o build do projeto:**

```bash
pnpm build
```

---

## <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O Ciclo de Desenvolvimento

1. **Sincronize seu fork:** Antes de criar uma branch, sempre atualize seu repositório local com as últimas mudanças do `upstream`

```bash
git fetch upstream
git rebase upstream/master
```

2. **Inicie o modo de desenvolvimento:**

```bash
pnpm dev
```

3. **Codifique!** Faça suas alterações, correções ou melhorias

4. **TESTE SUAS ALTERAÇÕES!**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Roda todos os testes do projeto
pnpm test
```

---

## <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Diretrizes para Pull Requests (PRs)

### **Requisitos Gerais**

- **PRs Pequenos e Focados:** Cada PR deve resolver apenas **um** problema ou adicionar **uma** funcionalidade
- **Siga o Guia de Estilo:** Seu código deve seguir os padrões do n8n
- **Conformidade com TypeScript:** Não use `// @ts-ignore`
- **Reutilize Código:** Evite duplicar componentes ou lógica que já existem

### **AVISO IMPORTANTE SOBRE NOVOS NODES**

Pull Requests que introduzem **novos nodes não serão aceitos**, a menos que tenham sido explicitamente solicitados pela equipe do n8n.

Se você deseja criar uma nova integração, o caminho correto é [**criar um node comunitário**](https://docs.n8n.io/integrations/creating-nodes/) e publicá-lo no npm.

### **Testes são Obrigatórios**

Seu PR **precisa** incluir testes. A ausência de testes resultará no fechamento automático do seu PR após 14 dias.

### **Título do PR**

Siga estritamente as [convenções de título de PR do n8n](https://github.com/n8n-io/n8n/blob/master/.github/pull_request_title_conventions). Um título mal formatado pode fazer com que o PR seja ignorado.

### **Prazo para Feedback**

Se a equipe do n8n solicitar alterações, você tem **14 dias** para responder ou atualizar o PR. Após esse período, ele será fechado por inatividade.

---

## <ion-icon name="folder-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Estrutura do Repositório

O n8n é um monorepositório. Aqui estão algumas pastas importantes:

- `packages/cli`: Código da linha de comando para rodar o n8n
- `packages/core`: O núcleo que executa os workflows
- `packages/editor-ui`: O frontend do editor de workflows (Vue.js)
- `packages/nodes-base`: O código-fonte para a maioria dos nodes padrão do n8n

---

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Oficiais

- **[Contributing Guide (Oficial)](https://github.com/n8n-io/n8n/blob/master/CONTRIBUTING):** A fonte da verdade para contribuições
- **[Fórum da Comunidade](https://community.n8n.io/):** Para tirar dúvidas e discutir ideias
- **[Documentação de Criação de Nodes](https://docs.n8n.io/integrations/creating-nodes/):** O lugar para aprender a criar suas próprias integrações

---

> <span style={{fontSize: '18px', fontWeight: 'bold'}}>**Contribuir para o n8n é uma forma poderosa de impactar milhares de usuários globalmente!**</span>
