---
sidebar_position: 1
title: Contribuir com Código para o n8n
description: Um guia detalhado para contribuir com código diretamente para o projeto n8n oficial.
keywords: [n8n, contribuir, código, documentação, open source, pull request, github]
---

# <IonicIcon name="code-outline" size={32} color="#ea4b71" /> Guia para Contribuir com Código para o n8n

Contribuir para o código-fonte do n8n é uma das formas mais impactantes de ajudar o projeto. Este guia detalha o processo, desde a configuração do ambiente até a submissão do seu Pull Request (PR), seguindo as diretrizes oficiais do n8n.

:::warning Contribuição para o Projeto Oficial
As diretrizes abaixo são para o **projeto principal do n8n**. As interações (PRs, issues) são em **inglês**. Para contribuir com **esta documentação em português**, veja a seção "Contribuir para Esta Documentação".
:::

## <IonicIcon name="checkbox-outline" size={24} color="#ea4b71" /> Antes de Começar: Itens Essenciais

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> 1. Código de Conduta
O projeto é governado por um [Código de Conduta](https://github.com/n8n-io/n8n/blob/master/CODE_OF_CONDUCT.md). Ao participar, você concorda em seguir seus termos.

### <IonicIcon name="document-lock-outline" size={20} color="#10b981" /> 2. Acordo de Licença de Contribuidor (CLA)
Para que sua contribuição seja aceita, você **precisa assinar** um Contributor License Agreement (CLA). É um processo simples: ao abrir um Pull Request, um bot irá comentar com um link para você assinar o acordo digitalmente.

## <IonicIcon name="construct-outline" size={24} color="#ea4b71" /> Configurando o Ambiente de Desenvolvimento

### <IonicIcon name="checkbox-outline" size={20} color="#10b981" /> Pré-requisitos
- <IonicIcon name="logo-nodejs" size={16} color="#6b7280" /> **[Node.js](https://nodejs.org/en/):** Versão `22.16` ou mais recente.
- <IonicIcon name="cube-outline" size={16} color="#6b7280" /> **[pnpm](https://pnpm.io/):** Versão `10.2` ou mais recente.
- A forma recomendada de instalar é via [Corepack](https://nodejs.org/api/corepack.html), que já vem com o Node.js. Para ativar, rode: `corepack enable` e depois `corepack prepare --activate`.
- <IonicIcon name="logo-github" size={16} color="#6b7280" /> **[Git](https://git-scm.com/)**
- <IonicIcon name="build-outline" size={16} color="#6b7280" /> **Ferramentas de Build:** Dependendo do seu sistema operacional, pode ser necessário instalar pacotes adicionais:
- **Debian/Ubuntu:** `sudo apt-get install -y build-essential python`
- **Windows:** `npm install --global windows-build-tools`
- **MacOS:** Nenhuma dependência adicional é necessária.

### <IonicIcon name="logo-docker" size={20} color="#10b981" /> Alternativa Fácil: Dev Container
Se você usa **VS Code** e **Docker**, a forma mais fácil de começar é com um [Dev Container](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/n8n-io/n8n). Ele configura o ambiente de desenvolvimento completo automaticamente dentro de um container.

### <IonicIcon name="terminal-outline" size={20} color="#10b981" /> Instalação Manual
1. <IonicIcon name="git-branch-outline" size={16} color="#6b7280" /> **Fork:** Faça um [fork do repositório do n8n](https://github.com/n8n-io/n8n) para a sua conta do GitHub.

2. <IonicIcon name="download-outline" size={16} color="#6b7280" /> **Clone o seu fork:**
```bash
git clone https://github.com/SEU-USUARIO/n8n.git
cd n8n
```

3. <IonicIcon name="git-network-outline" size={16} color="#6b7280" /> **Adicione o repositório original como `upstream`:**
Isso é crucial para manter seu fork sincronizado com o projeto principal.
```bash
git remote add upstream https://github.com/n8n-io/n8n.git
```

4. <IonicIcon name="cube-outline" size={16} color="#6b7280" /> **Instale as dependências:**
```bash
pnpm install
```

5. <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Faça o build do projeto:**
```bash
pnpm build
```

## <IonicIcon name="refresh-outline" size={24} color="#ea4b71" /> O Ciclo de Desenvolvimento

1. <IonicIcon name="sync-outline" size={16} color="#6b7280" /> **Sincronize seu fork:** Antes de criar uma branch, sempre atualize seu repositório local com as últimas mudanças do `upstream`.
```bash
git fetch upstream
git rebase upstream/master
```

2. <IonicIcon name="play-outline" size={16} color="#6b7280" /> **Inicie o modo de desenvolvimento:**
Este comando irá observar as alterações nos arquivos, reconstruir o projeto automaticamente e recarregar o backend e o frontend.
```bash
pnpm dev
```

3. <IonicIcon name="create-outline" size={16} color="#6b7280" /> **Codifique!** Faça suas alterações, correções ou melhorias.

4. <IonicIcon name="flask-outline" size={16} color="#6b7280" /> **TESTE SUAS ALTERAÇÕES!**
Testes são **obrigatórios**. O n8n possui uma suíte de testes que você deve usar.
```bash
# Roda todos os testes do projeto
pnpm test
```
- Se você alterou um snapshot, rode `pnpm test -u` para atualizá-lo.
- Para verificar a cobertura de testes, use a variável de ambiente: `COVERAGE_ENABLED=true pnpm test`.

## <IonicIcon name="git-pull-request-outline" size={24} color="#ea4b71" /> Diretrizes para Pull Requests (PRs)

Seguir estas regras é fundamental para que seu PR seja revisado e potencialmente aceito.

### <IonicIcon name="checkmark-circle-outline" size={20} color="#10b981" /> Requisitos Gerais
- <IonicIcon name="resize-outline" size={16} color="#6b7280" /> **PRs Pequenos e Focados:** Cada PR deve resolver apenas **um** problema ou adicionar **uma** funcionalidade. PRs grandes que fazem muitas coisas diferentes serão rejeitados.
- <IonicIcon name="brush-outline" size={16} color="#6b7280" /> **Siga o Guia de Estilo:** Seu código deve seguir os padrões do n8n.
- <IonicIcon name="code-slash-outline" size={16} color="#6b7280" /> **Conformidade com TypeScript:** Não use `// @ts-ignore`.
- <IonicIcon name="copy-outline" size={16} color="#6b7280" /> **Reutilize Código:** Evite duplicar componentes ou lógica que já existem.

### <IonicIcon name="warning-outline" size={20} color="#10b981" /> AVISO IMPORTANTE SOBRE NOVOS NODES 
Pull Requests que introduzem **novos nodes não serão aceitos**, a menos que tenham sido explicitamente solicitados pela equipe do n8n.

Se você deseja criar uma nova integração, o caminho correto é [**criar um node comunitário**](https://docs.n8n.io/integrations/creating-nodes/) e publicá-lo no npm.

### <IonicIcon name="flask-outline" size={20} color="#10b981" /> Testes são Obrigatórios
Seu PR **precisa** incluir testes. A ausência de testes resultará no fechamento automático do seu PR após 14 dias.

### <IonicIcon name="text-outline" size={20} color="#10b981" /> Título do PR
Siga estritamente as [convenções de título de PR do n8n](https://github.com/n8n-io/n8n/blob/master/.github/pull_request_title_conventions.md). Um título mal formatado pode fazer com que o PR seja ignorado.

### <IonicIcon name="time-outline" size={20} color="#10b981" /> Prazo para Feedback
Se a equipe do n8n solicitar alterações, você tem **14 dias** para responder ou atualizar o PR. Após esse período, ele será fechado por inatividade, mas pode ser reaberto quando as alterações forem feitas.

## <IonicIcon name="folder-outline" size={24} color="#ea4b71" /> Estrutura do Repositório
O n8n é um monorepositório. Aqui estão algumas pastas importantes:
- <IonicIcon name="terminal-outline" size={16} color="#6b7280" /> `packages/cli`: Código da linha de comando para rodar o n8n.
- <IonicIcon name="hardware-chip-outline" size={16} color="#6b7280" /> `packages/core`: O núcleo que executa os workflows.
- <IonicIcon name="desktop-outline" size={16} color="#6b7280" /> `packages/editor-ui`: O frontend do editor de workflows (Vue.js).
- <IonicIcon name="extension-puzzle-outline" size={16} color="#6b7280" /> `packages/nodes-base`: O código-fonte para a maioria dos nodes padrão do n8n.

## <IonicIcon name="library-outline" size={24} color="#ea4b71" /> Recursos Oficiais
- <IonicIcon name="document-text-outline" size={16} color="#6b7280" /> **[Contributing Guide (Oficial)](https://github.com/n8n-io/n8n/blob/master/CONTRIBUTING.md):** A fonte da verdade para contribuições.
- <IonicIcon name="people-outline" size={16} color="#6b7280" /> **[Fórum da Comunidade](https://community.n8n.io/):** Para tirar dúvidas e discutir ideias.
- <IonicIcon name="book-outline" size={16} color="#6b7280" /> **[Documentação de Criação de Nodes](https://docs.n8n.io/integrations/creating-nodes/):** O lugar para aprender a criar suas próprias integrações.
