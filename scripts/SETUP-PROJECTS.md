# 🚀 Automação de Projetos GitHub

Este script automatiza a criação de **4 projetos GitHub completos** com colunas, issues e cards organizados para o desenvolvimento da documentação n8n em português brasileiro.

## 📋 **O que será criado:**

### **1. 📝 Documentação Core**
- **Objetivo:** Gerenciar criação e tradução do conteúdo principal
- **Colunas:** Backlog → Em Progresso → Revisão → Concluído
- **Issues iniciais:** Tutorial de instalação, Catálogo de integrações BR

### **2. 🎨 Design System & UX**  
- **Objetivo:** Padronização visual e experiência do usuário
- **Colunas:** Design Tokens → Componentes → Responsividade → Finalizado
- **Issues iniciais:** ✅ Sistema de cores (concluído), ✅ Ícones (concluído), Sistema de busca

### **3. 🌎 Localização & Brasil**
- **Objetivo:** Adaptação para realidade brasileira
- **Colunas:** APIs Brasileiras → Casos de Uso BR → Compliance → Completo  
- **Issues iniciais:** Integração PIX, Guia LGPD

### **4. 🚀 Infraestrutura & Deploy**
- **Objetivo:** Melhorias técnicas e pipeline
- **Colunas:** CI/CD → SEO & Analytics → Bugs & Fixes → Deployed
- **Issues iniciais:** Pipeline automático, SEO para Brasil

---

## ⚡ **Como Executar:**

### **1. Configurar Token GitHub**

**Windows (PowerShell):**
```powershell
$env:GITHUB_TOKEN="ghp_seu_token_aqui"
```

**macOS/Linux:**
```bash
export GITHUB_TOKEN="ghp_seu_token_aqui"
```

### **2. Executar Automação**
```bash
npm run setup-projects
```

### **3. Verificar Resultado**
O script irá:
- ✅ Criar 4 projetos completos
- ✅ Adicionar colunas organizadas
- ✅ Criar 8+ issues iniciais
- ✅ Organizar cards nos boards
- ✅ Mostrar links diretos

---

## 🔑 **Como Obter GitHub Token:**

1. **Acesse:** [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. **Clique:** "Generate new token (classic)"
3. **Configure:**
   - **Note:** "n8n-Doc-pt-BR Projects Setup"
   - **Expiration:** 90 days (ou personalizado)
   - **Scopes necessários:**
     - ✅ `repo` (Full control of private repositories)
     - ✅ `write:org` (Write org and team membership)
     - ✅ `project` (Full control of organization projects)
4. **Copie** o token gerado (começa com `ghp_`)

---

## 📊 **Resultado Esperado:**

```
🚀 Iniciando configuração automática dos projetos GitHub...
📁 Repositório: tatyquebralayout/n8n-Doc-pt-BR
✅ Acesso ao repositório confirmado

🔨 Criando projeto: 📝 Documentação Core
✅ Projeto criado: https://github.com/tatyquebralayout/n8n-Doc-pt-BR/projects/1
  📋 Coluna criada: 📝 Backlog
  📋 Coluna criada: 🔄 Em Progresso
  📋 Coluna criada: 👀 Revisão
  📋 Coluna criada: ✅ Concluído
  📝 Issue criada: [CORE] Tutorial básico de instalação completo
    ➡️ Adicionada ao backlog
  📝 Issue criada: [CORE] Catálogo de integrações brasileiras
    ➡️ Adicionada ao backlog

[... mais 3 projetos ...]

🎉 Configuração concluída!

📊 Resumo:
  ✅ 4 projetos criados
  📝 8 issues criadas

🔗 Links dos projetos:
  • 📝 Documentação Core: https://github.com/tatyquebralayout/n8n-Doc-pt-BR/projects/1
  • 🎨 Design System & UX: https://github.com/tatyquebralayout/n8n-Doc-pt-BR/projects/2
  • 🌎 Localização & Brasil: https://github.com/tatyquebralayout/n8n-Doc-pt-BR/projects/3
  • 🚀 Infraestrutura & Deploy: https://github.com/tatyquebralayout/n8n-Doc-pt-BR/projects/4

💡 Próximos passos:
  1. Configure automações adicionais nos projetos
  2. Convide colaboradores
  3. Defina milestones e deadlines
  4. Comece a trabalhar nos cards! 🚀
```

---

## 🛠️ **Personalização:**

Para modificar os projetos, edite o arquivo `scripts/setup-github-projects.js`:

- **Adicionar projetos:** Adicione objetos no array `projects`
- **Modificar colunas:** Altere o array `columns` de cada projeto
- **Adicionar issues:** Adicione objetos no array `initialIssues`
- **Mudar repositório:** Altere `REPO_OWNER` e `REPO_NAME`

---

## 🔧 **Troubleshooting:**

### **❌ Erro: "GITHUB_TOKEN não encontrado"**
**Solução:** Configure a variável de ambiente conforme instruções acima

### **❌ Erro: "403 Forbidden"**
**Solução:** Verifique se o token tem as permissões corretas (`repo`, `project`)

### **❌ Erro: "404 Not Found"**
**Solução:** Verifique se `REPO_OWNER` e `REPO_NAME` estão corretos

### **❌ Rate limiting**
**Solução:** O script já tem pausas automáticas, mas você pode aumentar o delay

---

## 📚 **Referências:**

- [GitHub REST API - Projects](https://docs.github.com/en/rest/projects)
- [Octokit.js Documentation](https://octokit.github.io/rest.js/)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

---

**🎯 Com essa automação, você terá um sistema completo de gerenciamento de projetos configurado em menos de 2 minutos!** 🚀 