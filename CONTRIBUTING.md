# 🛠️ Como Contribuir e Configurar o Ambiente

Este guia contém as instruções essenciais para configurar seu ambiente de desenvolvimento local e começar a contribuir para a Documentação n8n Brasil.

## Requisitos

- **Node.js:** Versão LTS (Long-Term Support) é recomendada. Você pode baixar em [nodejs.org](https://nodejs.org/).
- **pnpm:** Usamos o `pnpm` como nosso gerenciador de pacotes para garantir instalações rápidas e consistentes. Se você não o tiver, pode instalá-lo globalmente via npm:
  ```bash
  npm install -g pnpm
  ```

## Passos para Começar

### 1. Fork e Clone
Para evitar problemas com permissões e facilitar o envio de Pull Requests, o fluxo ideal é:
- **Fork:** Primeiro, faça um [fork deste repositório](https://github.com/tatyquebralayout/n8n-Doc-pt-BR/fork) para a sua própria conta no GitHub.
- **Clone:** Em seguida, clone o *seu fork* para a sua máquina local.
  ```bash
  # Substitua SEU-USUARIO pelo seu nome de usuário no GitHub
  git clone https://github.com/SEU-USUARIO/n8n-Doc-pt-BR.git
  cd n8n-Doc-pt-BR
  ```

### 2. Instale as Dependências
Com o `pnpm` instalado e dentro da pasta do projeto, rode o seguinte comando para instalar todas as dependências necessárias:
```bash
pnpm install
```

### 3. Inicie o Servidor Local
Para iniciar o site em modo de desenvolvimento, use o comando:
```bash
pnpm start
```
Isso iniciará um servidor local, geralmente em `http://localhost:3000`. O site será aberto automaticamente no seu navegador e será recarregado sempre que você salvar uma alteração nos arquivos.

## Fluxo de Contribuição
1. Crie uma nova `branch` para sua alteração (`git checkout -b minha-feature`).
2. Faça as mudanças desejadas nos arquivos `.md` dentro da pasta `docs/`.
3. Adicione e "comite" seus arquivos (`git add .` e `git commit -m "feat: descreve a mudança"`).
4. Envie o `push` para o seu fork (`git push origin minha-feature`).
5. Abra um **Pull Request** no repositório original.

Obrigado por ajudar a construir este projeto! 