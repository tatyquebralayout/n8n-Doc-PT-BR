# 🛠️ Configuração e Ambiente Local

Este site é construído com [Docusaurus](https://docusaurus.io/), um gerador de sites estáticos moderno. Para rodar o projeto na sua máquina e visualizar suas alterações antes de contribuir, siga os passos abaixo.

## Requisitos

- **Node.js:** Versão LTS recomendada.
- **pnpm:** O gerenciador de pacotes que usamos. Se não tiver, instale globalmente:
  ```bash
  npm install -g pnpm
  ```

## Passos para Instalação

### 1. Clone o Repositório
Se você planeja contribuir, o ideal é primeiro fazer um [fork do projeto](https://github.com/tatyquebralayout/n8n-Doc-pt-BR/fork) e clonar o seu fork.
```bash
git clone https://github.com/SEU-USUARIO/n8n-Doc-pt-BR.git
cd n8n-Doc-pt-BR
```

### 2. Instale as Dependências
Dentro da pasta do projeto, rode o comando:
```bash
pnpm install
```

### 3. Inicie o Servidor de Desenvolvimento
Para iniciar o site em modo de desenvolvimento, use:
```bash
pnpm start
```

Isso irá iniciar o site em `http://localhost:3000`. O servidor recarrega automaticamente sempre que você faz uma alteração nos arquivos. 