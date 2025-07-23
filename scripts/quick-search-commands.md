# Comandos de Busca Rápida para Problemas

Este arquivo contém comandos de busca para localizar rapidamente problemas específicos no projeto.

## 🔍 Links Quebrados

### Buscar links que apontam para arquivos inexistentes
```bash
# Buscar links Markdown que podem estar quebrados
grep -r "\[.*\]([^h][^t][^t][^p].*)" docs/ --include="*.md" --include="*.mdx"

# Buscar links que apontam para arquivos .md específicos
grep -r "\.md" docs/ --include="*.md" --include="*.mdx" | grep -v "\.mdx"

# Buscar links relativos que podem estar quebrados
grep -r "\[.*\](\.\./.*)" docs/ --include="*.md" --include="*.mdx"
```

### Verificar links para arquivos específicos
```bash
# Buscar links para hosting-n8n/instalacao (arquivo removido)
grep -r "hosting-n8n/instalacao" docs/ --include="*.md" --include="*.mdx"

# Buscar links para arquivos index duplicados
grep -r "index\.md" docs/ --include="*.md" --include="*.mdx"
```

## 🔄 Rotas Duplicadas

### Encontrar arquivos index duplicados
```bash
# Buscar todos os arquivos index.md e index.mdx
find docs/ -name "index.md" -o -name "index.mdx" | sort

# Verificar se há index.md e index.mdx no mesmo diretório
find docs/ -name "index.*" | sed 's/\/index\.[^\/]*$//' | sort | uniq -d
```

### Buscar slugs duplicados no frontmatter
```bash
# Extrair todos os slugs do frontmatter
grep -r "slug:" docs/ --include="*.md" --include="*.mdx" | sed 's/.*slug:\s*//' | sort | uniq -d
```

## 🎯 Âncoras Quebradas

### Buscar âncoras em links
```bash
# Buscar links com âncoras
grep -r "\[.*\](.*#.*)" docs/ --include="*.md" --include="*.mdx"

# Buscar âncoras específicas que podem estar quebradas
grep -r "#[a-zA-Z0-9-]*" docs/ --include="*.md" --include="*.mdx" | grep -v "^#"
```

### Verificar títulos que geram âncoras
```bash
# Extrair todos os títulos (H1-H6)
grep -r "^#{1,6}\s" docs/ --include="*.md" --include="*.mdx"

# Buscar títulos com caracteres especiais que podem gerar âncoras inválidas
grep -r "^#{1,6}\s.*[^a-zA-Z0-9\s-]" docs/ --include="*.md" --include="*.mdx"
```

## 📁 Estrutura de Arquivos

### Verificar arquivos órfãos
```bash
# Encontrar arquivos que não são referenciados no sidebar
find docs/ -name "*.md" -o -name "*.mdx" | while read file; do
  if ! grep -q "$(basename "$file" | sed 's/\.[^.]*$//')" sidebars.ts; then
    echo "Possível arquivo órfão: $file"
  fi
done
```

### Verificar referências no sidebar
```bash
# Extrair todas as referências do sidebar
grep -r "docs/" sidebars.ts | sed 's/.*docs\///' | sed 's/["'\''].*//' | sort
```

## 🚨 Problemas Específicos

### Buscar problemas conhecidos
```bash
# Buscar referências a arquivos removidos
grep -r "instalacao\.md" docs/ --include="*.md" --include="*.mdx"

# Buscar links que podem estar quebrados após reorganização
grep -r "\.\./\.\./" docs/ --include="*.md" --include="*.mdx"

# Buscar links absolutos que podem estar incorretos
grep -r "\[.*\]\(/.*\)" docs/ --include="*.md" --include="*.mdx"
```

## 🔧 Comandos de Correção

### Substituir links quebrados
```bash
# Substituir links para hosting-n8n/instalacao.md
find docs/ -name "*.md" -o -name "*.mdx" -exec sed -i 's/hosting-n8n\/instalacao\.md/hosting-n8n\/instalacao\/index.md/g' {} \;

# Substituir links para arquivos index duplicados
find docs/ -name "*.md" -o -name "*.mdx" -exec sed -i 's/\([^\/]\)index\.md/\1index/g' {} \;
```

### Verificar e corrigir âncoras
```bash
# Gerar slugs válidos para títulos
grep -r "^#{1,6}\s" docs/ --include="*.md" --include="*.mdx" | while read line; do
  title=$(echo "$line" | sed 's/^#{1,6}\s*//')
  slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9\s-]//g' | sed 's/\s\+/-/g' | sed 's/-\+/-/g')
  echo "Título: $title -> Slug: $slug"
done
```

## 📊 Comandos de Estatísticas

### Contar problemas por tipo
```bash
# Contar links quebrados
grep -r "\[.*\]([^h][^t][^t][^p].*)" docs/ --include="*.md" --include="*.mdx" | wc -l

# Contar arquivos index duplicados
find docs/ -name "index.*" | sed 's/\/index\.[^\/]*$//' | sort | uniq -d | wc -l

# Contar âncoras quebradas
grep -r "\[.*\](.*#.*)" docs/ --include="*.md" --include="*.mdx" | wc -l
```

## 🎯 Comandos Específicos por Seção

### Verificar seção hosting-n8n
```bash
# Buscar problemas específicos na seção hosting-n8n
grep -r "hosting-n8n" docs/ --include="*.md" --include="*.mdx" | grep -E "(instalacao|configuracao)"

# Verificar estrutura de diretórios
find docs/hosting-n8n/ -type f -name "*.md" -o -name "*.mdx" | sort
```

### Verificar seção embed
```bash
# Buscar problemas na seção embed
grep -r "embed" docs/ --include="*.md" --include="*.mdx" | grep -E "(preparacao|gerenciamento)"

# Verificar links internos da seção embed
grep -r "\[.*\](\.\./.*)" docs/embed/ --include="*.md" --include="*.mdx"
```

## 💡 Dicas de Uso

1. **Execute os scripts Node.js primeiro** para uma análise completa
2. **Use os comandos grep** para problemas específicos
3. **Combine comandos** para análises mais detalhadas
4. **Verifique sempre** antes de fazer substituições automáticas
5. **Teste as correções** executando o build novamente

## 🚀 Execução Rápida

```bash
# Executar verificação completa
node scripts/check-all-issues.js

# Executar verificações individuais
node scripts/find-broken-links.js
node scripts/find-duplicate-routes.js
node scripts/find-broken-anchors.js
``` 