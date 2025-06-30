# 🤝 Guia de Contribuição - Documentação n8n Brasil

## 📋 Visão Geral

Este guia é especificamente para **contribuir com esta documentação brasileira** do n8n. 

:::warning Atenção: Duas formas de contribuir
Existem **duas formas distintas** de contribuir:

1. **📚 Esta Documentação** - Melhorar, traduzir e expandir esta documentação brasileira
2. **🚀 Projeto n8n** - Contribuir diretamente com o projeto n8n (código, nodes, etc.)

**Este guia aborda apenas a primeira!** Para contribuir com o projeto n8n, veja a seção "Projeto n8n" na navegação.
:::

### 🎯 Objetivo

Desenvolver uma documentação completa, moderna e acessível especificamente para os **usuários brasileiros do n8n**, criando um hub de conhecimento em português que facilite o aprendizado e uso da plataforma.

## 🏗️ Arquitetura do Projeto

### 📁 Estrutura de Diretórios

```
n8ndoc_BR/
├── 📄 docusaurus.config.ts     # Configuração principal
├── 📄 package.json             # Dependências e scripts
├── 📄 sidebars.ts              # Configuração da navegação principal
├── 📄 README.md                # Documentação do projeto
├── 📄 CONTRIBUTING.md          # Este guia (você está aqui!)
│
├── 📂 docs/                    # Documentação principal
│   ├── 📄 intro.md             # Página de introdução
│   ├── 📂 01-usando-n8n/       # Como usar n8n
│   ├── 📂 02-logica-e-dados/   # Lógica e manipulação de dados
│   ├── 📂 03-integracoes/      # Integrações disponíveis
│   ├── 📂 04-integracoes-br/   # Integrações brasileiras
│   ├── 📂 05-hosting-n8n/      # Hospedagem e deployment
│   ├── 📂 06-api/              # API do n8n
│   ├── 📂 07-embed/            # n8n embarcado
│   ├── 📂 08-advanced-ai/      # IA avançada
│   ├── 📂 09-cursos/           # Cursos estruturados
│   ├── 📂 10-referencia/       # Referências e recursos
│   └── 📂 11-contribuir/       # Guias de contribuição
│
├── 📂 src/                     # Código-fonte customizado
│   ├── 📂 css/
│   │   └── 📄 custom.css       # CSS padrão comunidade
│   ├── 📂 pages/
│   │   └── 📄 index.tsx        # Homepage personalizada
│   └── 📂 components/
│       └── 📂 HomepageFeatures/ # Componentes da homepage
│
└── 📂 static/img/              # Imagens e assets
    ├── 📄 n8n-logo.svg
    └── 📄 n8n-logo-dark.svg
```

## 🎨 Design System - Padrão Comunidade BR

### 🌈 Paleta de Cores

```css
/* Cores principais (n8n) */
--ifm-color-primary: #FF6D5A;
--ifm-color-primary-dark: #FF5D47;
--ifm-color-primary-light: #FF7D6D;

/* Cores neutras (padrão) */
--ifm-color-gray-100: #f8f9fa;
--ifm-color-gray-600: #6c757d;
--ifm-color-gray-900: #212529;
```

### 📝 Tipografia

```css
/* Fonte principal */
--ifm-font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
--ifm-font-size-base: 14px;
--ifm-line-height-base: 1.6;
```

## 📝 Padrões de Escrita

### 🏷️ Frontmatter Obrigatório

```yaml
---
sidebar_position: 1
title: Título da Página
description: Descrição SEO da página
keywords: [palavra1, palavra2, palavra3]
---
```

### 📊 Estrutura de Conteúdo

```markdown
# Título Principal

Breve introdução explicando o que será abordado.

## 🎯 O que você vai aprender

- Tópico 1
- Tópico 2
- Tópico 3

## 📋 Pré-requisitos

- Requisito 1
- Requisito 2

## 🔧 Passo a Passo

### 1. Primeiro Passo
Explicação detalhada...

### 2. Segundo Passo
Explicação detalhada...

## ✅ Verificação

Como verificar se funcionou...

## 🎯 Próximos Passos

Links para próximos tutoriais...
```

### 🎨 Elementos Visuais

#### Admonições
```markdown
:::tip Dica
Dicas importantes para o usuário.
:::

:::warning Atenção
Avisos importantes.
:::

:::danger Perigo
Situações críticas.
:::
```

#### Código
```markdown
```bash title="Terminal"
npm install n8n
```

```javascript title="exemplo.js"
// Código JavaScript
const config = { ... };
```
```

#### Emojis Padronizados
- 🚀 **Primeiros Passos**
- ⚡ **Workflows** 
- 🔗 **Integrações**
- 🐳 **Docker**
- ☁️ **Cloud**
- 🛡️ **Segurança**
- 📊 **Dados**
- 🎨 **Interface**
- 🔧 **Configuração**

## 🛠️ Fluxo de Desenvolvimento

### 🔧 Setup Local

```bash
# 1. Fork o repositório no GitHub
# 2. Clone seu fork
git clone https://github.com/SEU-USUARIO/n8ndoc_BR.git
cd n8ndoc_BR

# 3. Instalar dependências
npm install

# 4. Iniciar desenvolvimento
npm start

# 5. Acessar site
http://localhost:3000
```

### 📝 Adicionando Nova Documentação

#### 1. Criar Arquivo
```bash
touch docs/categoria/novo-tutorial.md
```

#### 2. Adicionar Frontmatter
```yaml
---
sidebar_position: 3
title: Novo Tutorial
description: Descrição do tutorial
keywords: [n8n, tutorial, categoria]
---
```

#### 3. Atualizar Sidebar
```typescript
// Em sidebars.ts
items: [
  'categoria/tutorial-existente',
  'categoria/novo-tutorial', // ← Adicionar aqui
]
```

#### 4. Testar Localmente
```bash
npm start
# Verificar em http://localhost:3000
```

## ✅ Checklist de Qualidade

### 📝 Antes de Submeter

- [ ] Frontmatter completo
- [ ] Links funcionando
- [ ] Código testado
- [ ] Imagens otimizadas
- [ ] Emojis consistentes
- [ ] Navegação atualizada
- [ ] Build local sem erros
- [ ] Português correto e acessível

### 🎨 Verificação Visual

- [ ] Sidebar organizadas corretamente
- [ ] Cores seguindo paleta estabelecida
- [ ] Botões e links estilizados
- [ ] Layout responsivo

## 🤝 Processo de Contribuição

### 1. 🍴 Fork do Repositório
```bash
git clone https://github.com/SEU-USER/n8ndoc_BR.git
cd n8ndoc_BR
```

### 2. 🌿 Criar Branch
```bash
git checkout -b feature/nova-documentacao
```

### 3. ✏️ Fazer Alterações
- Seguir padrões deste guia
- Testar localmente
- Verificar qualidade

### 4. 📤 Submeter PR
- Título descritivo
- Descrição detalhada
- Screenshots se necessário
- Mencionar issues relacionadas

## 🆘 Solução de Problemas

### 🐛 Erros Comuns

#### Erro de Build
```bash
# Limpar cache
npm run clear

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

#### Links Quebrados
```bash
# Verificar links
npm run build
# Erros aparecerão no console
```

### 📞 Onde Buscar Ajuda

1. **Documentação Docusaurus**: https://docusaurus.io/docs
2. **Issues do Projeto**: [GitHub Issues]
3. **Documentação Oficial n8n**: https://docs.n8n.io

## 🎯 Tipos de Contribuição Bem-vindas

### 📝 **Documentação**
- Novos tutoriais de workflows
- Guias passo a passo
- Exemplos práticos
- Casos de uso brasileiros

### 🔧 **Melhorias Técnicas**
- Correções de links quebrados
- Otimização de imagens
- Melhoria na navegação
- Correções de português

### 🎨 **Design e UX**
- Melhorias visuais
- Componentes reutilizáveis
- Responsividade
- Acessibilidade

### 🌍 **Localização**
- Tradução de conteúdo
- Adaptação para contexto brasileiro
- Exemplos com serviços brasileiros

## 🚫 O que NÃO Fazer

### ⚠️ Não Editar
- `.docusaurus/` - Pasta gerada automaticamente
- `build/` - Build de produção
- `node_modules/` - Dependências

### 🔒 Cuidado ao Editar
- `docusaurus.config.ts` - Configuração principal
- `package.json` - Dependências do projeto
- `sidebars.ts` - Estrutura de navegação

---

**💡 Lembre-se:** Este guia é para contribuir com **esta documentação**. Para contribuir com o **projeto n8n**, veja a seção "🚀 Projeto n8n" na navegação.

**🤝 Obrigado por contribuir!** Cada melhoria ajuda a comunidade n8n brasileira a crescer! 🇧🇷 