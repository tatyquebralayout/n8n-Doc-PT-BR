# 📁 Scripts de Otimização e Validação

Este diretório contém scripts para otimizar, validar e melhorar a qualidade da documentação do n8n em português brasileiro.

## 📋 Scripts Disponíveis

### 🖼️ `optimize-images.js`
**Otimização e compressão de imagens**

Comprime automaticamente imagens PNG, JPG, JPEG, WebP e SVG para melhorar a performance do site.

```bash
npm run optimize-images
# ou
node scripts/optimize-images.js
```

**Recursos:**
- ✅ Compressão automática de imagens
- ✅ Suporte a PNG, JPG, JPEG, WebP, SVG
- ✅ Preserva qualidade visual
- ✅ Relatório de economia de espaço
- ✅ Backup automático antes da otimização

---

### 🏷️ `generate-meta.js`
**Geração automática de meta tags**

Analisa o conteúdo das páginas e gera meta tags otimizadas para SEO automaticamente.

```bash
npm run generate-meta
# ou
node scripts/generate-meta.js
```

**Recursos:**
- ✅ Meta tags Open Graph
- ✅ Twitter Cards
- ✅ Schema.org structured data
- ✅ Sitemap.xml automático
- ✅ Extração inteligente de títulos e descrições
- ✅ Atualização automática do front matter

**Arquivos gerados:**
- `meta-tags.json` - Meta tags para todas as páginas
- `static/sitemap.xml` - Sitemap do site

---

### 🔍 `check-seo.js`
**Validação de SEO**

Verifica fatores importantes de SEO e fornece recomendações para melhorar o ranking.

```bash
npm run check-seo
# ou
node scripts/check-seo.js
```

**Verificações:**
- ✅ Títulos (comprimento e unicidade)
- ✅ Descrições (comprimento e qualidade)
- ✅ Estrutura de headings (H1, H2, H3...)
- ✅ Alt text em imagens
- ✅ Links internos quebrados
- ✅ Comprimento do conteúdo
- ✅ URLs amigáveis

**Relatório:** `seo-report.json`

---

### 📝 `spell-check.js`
**Verificação ortográfica**

Verifica a ortografia da documentação com suporte ao português brasileiro e termos técnicos.

```bash
npm run spell-check
# ou
node scripts/spell-check.js
```

**Recursos:**
- ✅ Dicionário português brasileiro
- ✅ Termos técnicos do n8n
- ✅ Sugestões de correção
- ✅ Contexto dos erros
- ✅ Relatório detalhado
- ✅ Dicionário personalizável

**Arquivos gerados:**
- `spell-check-report.json` - Relatório detalhado
- `spell-check-dictionary.txt` - Dicionário de termos técnicos

---

### 📐 `format-check.js`
**Verificação de formatação Markdown**

Valida a formatação, estrutura e consistência do Markdown seguindo as melhores práticas.

```bash
npm run format-check
# ou
node scripts/format-check.js
```

**Verificações:**
- ✅ Estrutura de headings
- ✅ Formatação de listas
- ✅ Links e imagens
- ✅ Blocos de código
- ✅ Espaçamento e indentação
- ✅ Comprimento de linhas
- ✅ Front matter

**Relatório:** `format-check-report.json`

---

### ♿ `accessibility-check.js`
**Verificação de acessibilidade**

Valida aspectos fundamentais de acessibilidade seguindo as diretrizes WCAG 2.1 AA.

```bash
npm run accessibility-check
# ou
node scripts/accessibility-check.js
```

**Verificações WCAG 2.1 AA:**
- ✅ Alt text em imagens
- ✅ Hierarquia de headings
- ✅ Textos descritivos em links
- ✅ Legibilidade do conteúdo
- ✅ Contraste de cores
- ✅ Multimídia acessível
- ✅ Estrutura semântica

**Relatório:** `accessibility-report.json`

---

### 🔄 `validate-overlaps.js`
**Validação de sobreposições** *(já existente)*

Verifica se há conteúdo duplicado, links quebrados e estrutura inconsistente.

```bash
npm run validate-overlaps
# ou
node scripts/validate-overlaps.js
```

---

## 🚀 Scripts Combinados

### 📊 `quality-check`
**Verificação completa de qualidade**

Executa todos os scripts de validação em sequência para uma análise completa.

```bash
npm run quality-check
```

**Executa:**
1. `check-seo` - Validação de SEO
2. `spell-check` - Verificação ortográfica
3. `format-check` - Verificação de formatação
4. `accessibility-check` - Verificação de acessibilidade

---

## 🛠️ Dependências

### Dependências Automáticas
Os scripts instalam automaticamente as dependências necessárias:

- **imagemin-cli** - Para otimização de imagens
- **svgo** - Para otimização de SVGs
- **js-yaml** - Para parsing de front matter

### Dependências Opcionais
Para funcionalidades avançadas:

```bash
# Para verificação ortográfica avançada
npm install -g cspell

# Para validação de links externos
npm install -g broken-link-checker
```

---

## 📋 Uso Recomendado

### Durante o Desenvolvimento
```bash
# Verificar qualidade antes de commit
npm run quality-check

# Otimizar imagens após adicionar novas
npm run optimize-images

# Gerar meta tags após criar páginas
npm run generate-meta
```

### No CI/CD Pipeline
```bash
# Validação obrigatória
npm run check-seo
npm run format-check
npm run accessibility-check

# Otimização automática
npm run optimize-images
npm run generate-meta
```

### Antes do Deploy
```bash
# Verificação completa
npm run quality-check

# Gerar arquivos de produção
npm run generate-meta
npm run optimize-images
```

---

## 📊 Relatórios Gerados

Todos os scripts geram relatórios detalhados em JSON:

| Script | Arquivo de Relatório | Conteúdo |
|--------|---------------------|----------|
| `optimize-images` | `optimization-report.json` | Estatísticas de compressão |
| `generate-meta` | `meta-tags.json` | Meta tags geradas |
| `check-seo` | `seo-report.json` | Problemas e score de SEO |
| `spell-check` | `spell-check-report.json` | Erros ortográficos encontrados |
| `format-check` | `format-check-report.json` | Problemas de formatação |
| `accessibility-check` | `accessibility-report.json` | Problemas de acessibilidade |

---

## 🎯 Configuração

### Personalizando Regras

Cada script pode ser personalizado editando as configurações no início do arquivo:

```javascript
// Exemplo: scripts/check-seo.js
const config = {
  minTitleLength: 30,
  maxTitleLength: 60,
  minDescriptionLength: 120,
  maxDescriptionLength: 160
};
```

### Adicionando Palavras ao Dicionário

Para o `spell-check.js`, adicione termos técnicos:

```javascript
// Em loadTechnicalTerms()
'seu-termo-tecnico',
'api-personalizada',
'webhook-customizado'
```

---

## 🔧 Troubleshooting

### Problemas Comuns

**1. Script não executa**
```bash
# Verificar permissões
chmod +x scripts/*.js

# Executar diretamente
node scripts/nome-do-script.js
```

**2. Dependências não encontradas**
```bash
# Limpar cache e reinstalar
npm cache clean --force
npm install
```

**3. Erros de memória com imagens grandes**
```bash
# Aumentar limite de memória
node --max-old-space-size=4096 scripts/optimize-images.js
```

### Logs e Debug

Para debug detalhado, defina a variável de ambiente:

```bash
DEBUG=true npm run script-name
```

---

## 📈 Métricas de Qualidade

### Scores de Referência

| Métrica | Excelente | Bom | Regular | Precisa Melhorar |
|---------|-----------|-----|---------|------------------|
| SEO Score | 90-100 | 70-89 | 50-69 | 0-49 |
| Acessibilidade | 90-100 | 70-89 | 50-69 | 0-49 |
| Formatação | 95-100 | 80-94 | 60-79 | 0-59 |
| Ortografia | 98-100 | 95-97 | 90-94 | 0-89 |

### Metas de Qualidade

- 🎯 **SEO Score**: > 85
- 🎯 **Acessibilidade**: > 90
- 🎯 **Formatação**: > 90
- 🎯 **Ortografia**: > 98
- 🎯 **Performance**: Imagens < 1MB

---

## 🤝 Contribuindo

Para adicionar novos scripts ou melhorar os existentes:

1. Siga o padrão de estrutura dos scripts existentes
2. Adicione documentação completa
3. Inclua testes básicos
4. Atualize este README
5. Adicione o script ao `package.json`

---

## 📚 Recursos Adicionais

- [Guia de SEO para Docusaurus](https://docusaurus.io/docs/seo)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Markdown Style Guide](https://www.markdownguide.org/basic-syntax/)
- [Image Optimization Best Practices](https://web.dev/fast/#optimize-your-images)

---

**🎉 Mantenha a qualidade alta e a documentação acessível para todos!**