---
sidebar_position: 2
title: Criar e Editar Credenciais
description: Guia passo a passo para criar e editar credenciais no n8n
keywords: [n8n, credenciais, criar, editar, autenticação, API keys]
---


#  Criar e Editar Credenciais

Aprenda como criar e editar credenciais no n8n para conectar suas aplicações e serviços de forma segura.

---

##  1 | Onde Encontrar Credenciais

###  Menu de Credenciais

1. **Acesse o menu lateral** → Clique em **"Credenciais"**
2. **Visualize todas as credenciais** existentes
3. **Filtre por tipo** de credencial ou serviço
4. **Pesquise** credenciais específicas

###  Criar Nova Credencial

1. **Clique em "+ Adicionar Credencial"**
2. **Selecione o tipo** de credencial desejado
3. **Preencha os campos** obrigatórios
4. **Teste a conexão** antes de salvar
5. **Salve a credencial** com um nome descritivo

---

##  2 | Tipos de Credenciais

###  API Keys

**Mais comum** para integrações modernas:

```json
{
  "apiKey": "sk-1234567890abcdef",
  "baseUrl": "https://api.exemplo.com"
}
```

**Exemplos de uso:**
- OpenAI, Google APIs, Stripe
- Serviços SaaS modernos
- APIs RESTful

###  Username/Password

**Tradicional** para sistemas legados:

```json
{
  "username": "usuario@empresa.com",
  "password": "senha_segura_123"
}
```

**Exemplos de uso:**
- Sistemas de email (SMTP, IMAP)
- Bancos de dados
- Sistemas internos

###  OAuth 2.0

**Seguro** para aplicações de terceiros:

```json
{
  "clientId": "123456789.apps.googleusercontent.com",
  "clientSecret": "GOCSPX-abcdefghijklmnop",
  "accessToken": "ya29.a0AfH6SMC...",
  "refreshToken": "1//04dX..."
}
```

**Exemplos de uso:**
- Google Workspace, Microsoft 365
- Redes sociais (Twitter, LinkedIn)
- Serviços de nuvem

---

##  3 | Criando sua Primeira Credencial

###  Exemplo: Google Sheets

1. **Selecione "Google Sheets"** na lista de credenciais
2. **Clique em "Criar"**
3. **Preencha os campos:**
   - **Nome**: "Google Sheets - Projeto Principal"
   - **Escopo**: Selecione os escopos necessários
4. **Clique em "Autorizar"**
5. **Faça login** na sua conta Google
6. **Conceda permissões** ao n8n
7. **Teste a conexão**
8. **Salve a credencial**

:::tip **Dica Pro**
Use nomes descritivos para suas credenciais. Em vez de "Google", use "Google Sheets - Marketing" ou "Google Drive - Financeiro".
:::

---

##  4 | Editando Credenciais

###  Ações Disponíveis

1. **Editar**: Modificar campos da credencial
2. **Duplicar**: Criar cópia para outro projeto
3. **Testar**: Verificar se a conexão ainda funciona
4. **Excluir**: Remover credencial (cuidado!)

###  Renovando Tokens

**Para credenciais OAuth que expiram:**

1. **Acesse a credencial**
2. **Clique em "Renovar Token"**
3. **Faça login novamente** se necessário
4. **Confirme as permissões**
5. **Teste a conexão**

---

##  5 | Boas Práticas

###  Segurança

- ✅ **Use senhas fortes** e únicas
- ✅ **Ative 2FA** quando disponível
- ✅ **Renove tokens** regularmente
- ✅ **Monitore logs** de acesso
- ❌ **Nunca compartilhe** credenciais por email
- ❌ **Não use credenciais** pessoais em workflows corporativos

###  Organização

- 📁 **Agrupe por projeto**: "Projeto A - Google Sheets"
- 📁 **Use prefixos**: "DEV-", "PROD-", "TEST-"
- 📁 **Inclua data**: "Slack - Marketing - 2024"
- 📁 **Documente uso**: Adicione notas quando necessário

---

##  6 | Próximos passos

1. **[Compartilhamento de Credenciais](./compartilhamento)** - Trabalhar em equipe
2. **[Boas Práticas](./boas-praticas)** - Manter segurança
3. **[Usar Credenciais em Workflows](../execucoes/componentes-execucoes)** - Aplicar na prática

> *Agora que você sabe criar credenciais, está pronto para conectar suas aplicações e automatizar seus processos!*

---

:::warning **Importante**
Sempre teste suas credenciais após criá-las ou editá-las. Uma credencial inválida pode quebrar workflows inteiros.
::: 
