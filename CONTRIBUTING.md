# 🤝 Guia de Contribuição - n8n Documentation BR

## 📋 Visão Geral

Este guia ajuda contribuidores a entender como construir e manter a documentação do n8n criando uma **experiência excepcional para a comunidade brasileira**.

### 🎯 Objetivo

Desenvolver uma documentação completa, moderna e acessível especificamente para os **usuários brasileiros do n8n**, criando um hub de conhecimento em português que facilite o aprendizado e uso da plataforma de automação mais poderosa do mercado.

## 🏗️ Arquitetura do Projeto

### 📁 Estrutura de Diretórios

```
n8ndoc_BR/
├── 📄 docusaurus.config.ts     # Configuração principal
├── 📄 package.json             # Dependências e scripts
├── 📄 sidebars.ts              # Configuração da navegação principal
├── 📄 sidebars-release-notes.ts # Configuração release notes
├── 📄 tsconfig.json            # Configuração TypeScript
├── 📄 README.md                # Documentação do projeto
├── 📄 CONTRIBUTING.md          # Este guia (você está aqui!)
│
├── 📂 docs/                    # Documentação principal
│   ├── 📄 intro.md             # Página de introdução
│   ├── 📄 markdown-features.md # Demonstração de recursos
│   └── 📂 tutorial-basico/     # Tutoriais básicos
│       ├── 📄 instalacao.md
│       ├── 📄 conceitos-basicos.md
│       └── 📄 primeiro-workflow.md
│
├── 📂 release-notes/           # Sistema de release notes
│   └── 📂 v1.0.0/             # Versão específica
│       ├── 📄 overview.md
│       ├── 📄 new-features.md
│       ├── 📄 improvements.md
│       └── 📄 bug-fixes.md
│
├── 📂 src/                     # Código-fonte customizado
│   ├── 📂 css/
│   │   └── 📄 custom.css       # CSS padrão comunidade
│   ├── 📂 pages/
│   │   ├── 📄 index.tsx        # Homepage personalizada
│   │   └── 📄 index.module.css # Estilos da homepage
│   └── 📂 components/
│       └── 📂 HomepageFeatures/ # Componentes da homepage
│
├── 📂 static/img/              # Imagens e assets
│   ├── 📄 n8n-logo.svg
│   └── 📄 n8n-logo-dark.svg
│
└── 📂 .docusaurus/             # ⚠️ NÃO EDITAR - Gerado automaticamente
    ├── 📄 registry.js
    ├── 📄 routes.js
    └── ... (outros arquivos gerados)
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

### 📐 Layout Principles

1. **Navbar** limpa com navegação horizontal intuitiva
2. **Sidebar** categorizadas com ícones emoji para fácil identificação
3. **Cards** com hover effects e sombras para melhor experiência
4. **Hero section** com gradient e botões estilizados
5. **Footer** minimalista escuro

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

## 🗂️ Sistema de Navegação

### 📍 Sidebars Principais

#### `tutorialSidebar` - "Criar e Usar Workflows"
```typescript
{
  type: 'category',
  label: '🚀 Primeiros Passos',
  collapsed: false,
  items: ['instalacao', 'conceitos-basicos', 'primeiro-workflow']
}
```

#### `deploymentSidebar` - "Deployment"
```typescript
{
  type: 'category', 
  label: '🐳 Docker',
  collapsed: false,
  items: ['docker/introducao', 'docker/compose']
}
```

#### `catalogSidebar` - "Catálogo"
```typescript
{
  type: 'category',
  label: '📋 Nodes Core',
  collapsed: false,
  items: ['catalog/core/if', 'catalog/core/set']
}
```

### 🏷️ Convenções de Nomenclatura

#### Arquivos
- **kebab-case**: `primeiro-workflow.md`
- **Descritivo**: `conceitos-basicos.md`
- **Sem acentos**: `instalacao.md` (não `instalação.md`)

#### Diretórios
- **Hierárquicos**: `tutorial-basico/`, `deployment/docker/`
- **Temáticos**: `catalog/core/`, `integracoes/`

## 🛠️ Fluxo de Desenvolvimento

### 🔧 Setup Local

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar desenvolvimento
npm start

# 3. Acessar site
http://localhost:3000

# 4. Build de produção
npm run build

# 5. Servir build
npm run serve
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

### 📋 Release Notes

#### Estrutura de Versão
```
release-notes/
└── v1.1.0/
    ├── overview.md       # Visão geral da versão
    ├── new-features.md   # Novas funcionalidades  
    ├── improvements.md   # Melhorias
    └── bug-fixes.md      # Correções de bugs
```

#### Template de Release
```yaml
---
sidebar_position: 1
title: Visão Geral v1.1.0
description: Principais novidades da versão 1.1.0
keywords: [n8n, release notes, versão 1.1.0]
---

# n8n v1.1.0 - Visão Geral

**Data de lançamento:** 15 de Março de 2025
**Tipo:** Versão Estável

## 🎉 Principais Destaques

### ⚡ Nova Funcionalidade X
Descrição da funcionalidade...

## 📊 Estatísticas da Versão

| Métrica | Valor |
|---------|-------|
| Novos Nodes | 15 |
| Bugs Corrigidos | 89 |
```

## 🚫 O que NÃO Editar

### ⚠️ Arquivos Gerados (NÃO TOCAR)
- `.docusaurus/` - Pasta gerada automaticamente
- `build/` - Build de produção
- `node_modules/` - Dependências

### 🔒 Arquivos de Configuração (CUIDADO)
- `docusaurus.config.ts` - Só modificar se souber o que está fazendo
- `package.json` - Só para adicionar dependências aprovadas
- `tsconfig.json` - Configuração TypeScript estabelecida

## ✅ Checklist de Qualidade

### 📝 Antes de Submeter

- [ ] Frontmatter completo
- [ ] Links funcionando
- [ ] Código testado
- [ ] Imagens otimizadas
- [ ] Emojis consistentes
- [ ] Navegação atualizada
- [ ] Build local sem erros
- [ ] Design consistente com padrão da comunidade

### 🎨 Verificação Visual

- [ ] Sidebar categorizadas corretamente
- [ ] Cores seguindo paleta estabelecida
- [ ] Botões e links estilizados
- [ ] Cards com hover effects
- [ ] Tipografia consistente
- [ ] Layout responsivo

## 🤝 Processo de Contribuição

### 1. 🍴 Fork do Repositório
```bash
git clone https://github.com/SEU-USER/n8n-docs-br.git
cd n8n-docs-br
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

#### CSS não Aplicando
- Verificar `src/css/custom.css`
- Limpar cache do navegador
- Reiniciar servidor de desenvolvimento

### 📞 Onde Buscar Ajuda

1. **Documentação Docusaurus**: https://docusaurus.io/docs
2. **Issues do Projeto**: [GitHub Issues]
3. **Comunidade n8n**: https://community.n8n.io
4. **Documentação Oficial n8n**: https://docs.n8n.io

## 🎯 Próximos Passos

### 📈 Roadmap de Melhorias

- [ ] **Busca avançada** com filtros
- [ ] **Widget de feedback** integrado
- [ ] **Comentários** nas páginas
- [ ] **Analytics** de uso
- [ ] **PWA** (Progressive Web App)
- [ ] **Versioning** automático

### 🌟 Contribuições Bem-vindas

- 📝 **Novos tutoriais** de workflows
- 🔗 **Integrações** com serviços populares
- 🛠️ **Guias de deployment** em diferentes plataformas
- 🎨 **Melhorias visuais** seguindo padrão da comunidade
- 🌍 **Traduções** para outros idiomas
- 🐛 **Correções** de bugs e melhorias

---

**💡 Lembre-se:** O objetivo é manter uma **experiência consistente e profissional** enquanto fornecemos a melhor documentação possível para o n8n!

**🤝 Obrigado por contribuir!** Cada melhoria ajuda a comunidade n8n brasileira a crescer! 🇧🇷 