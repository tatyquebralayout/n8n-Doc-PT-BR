# 🤝 Guia Rápido de Contribuição Técnica

Bem-vindo, contribuidor! Este é o guia rápido para configurar seu ambiente e começar a contribuir com o código da **Documentação n8n Brasil**.

:::warning **Guia Completo no Site!**
Este arquivo é um resumo técnico. Para entender **o quê** e **como** contribuir (padrões de escrita, estilo, código de conduta), por favor, leia nossa seção completa de contribuição no site:

**[➡️ Ver Guias Completos de Contribuição](https://n8n.io.br/docs/contribuir/esta-documentacao/overview)**
:::

## 🚀 Começando

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/) (versão LTS)
- [pnpm](https://pnpm.io/installation) (recomendado)
- [Git](https://git-scm.com/)

### 2. Fork e Clone
```bash
# 1. Faça o Fork do repositório no GitHub
# 2. Clone o seu fork localmente
git clone https://github.com/SEU-USUARIO/n8n-docs-br.git
cd n8n-docs-br
```

### 3. Instalar Dependências
```bash
pnpm install
```

### 4. Rodar o Ambiente de Desenvolvimento
```bash
pnpm start
```
Seu site local estará rodando em `http://localhost:3000`.

## 🛠️ Fluxo de Trabalho Básico

1.  **Crie uma Branch:**
    ```bash
    git checkout -b feature/minha-nova-documentacao
    ```
2.  **Faça suas Alterações:**
    *   Crie ou edite arquivos `.md` dentro da pasta `docs/`.
    *   Siga as diretrizes de escrita disponíveis no site.
3.  **Adicione ao Sidebar:**
    *   Se for uma nova página, adicione a referência no arquivo `sidebars.ts`.
4.  **Teste Localmente:**
    *   Verifique se suas mudanças aparecem corretamente em `http://localhost:3000`.
    *   Certifique-se de que não há links quebrados.
5.  **Faça o Commit:**
    ```bash
    git add .
    git commit -m "feat(escopo): Descreve a sua mudança"
    ```
6.  **Envie o Pull Request (PR):**
    *   Faça o push da sua branch para o seu fork.
    *   Abra um Pull Request no repositório principal, detalhando suas mudanças.

## ✅ Antes de Enviar

- [ ] O `pnpm start` roda sem erros?
- [ ] Você seguiu as diretrizes do site?
- [ ] A mensagem do seu commit está em português e segue o padrão?

---
**Obrigado por ajudar a construir o melhor recurso para a comunidade n8n no Brasil!** 🇧🇷 