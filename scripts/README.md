# Scripts de Verificação de Problemas

Este diretório contém scripts para detectar e corrigir problemas comuns na documentação.

## 📋 Scripts Disponíveis

### 1. `find-broken-links.js`
Detecta links quebrados em arquivos Markdown.

**Uso:**
```bash
npm run check-broken-links
# ou
node scripts/find-broken-links.js
```

**O que detecta:**
- Links que apontam para arquivos inexistentes
- Links relativos quebrados
- Links para diretórios sem index.md

### 2. `find-duplicate-routes.js`
Identifica rotas duplicadas no projeto.

**Uso:**
```bash
npm run check-duplicate-routes
# ou
node scripts/find-duplicate-routes.js
```

**O que detecta:**
- Arquivos index.md e index.mdx no mesmo diretório
- Slugs duplicados no frontmatter
- Conflitos de rotas

### 3. `find-broken-anchors.js`
Encontra âncoras quebradas nos arquivos.

**Uso:**
```bash
npm run check-broken-anchors
# ou
node scripts/find-broken-anchors.js
```

**O que detecta:**
- Âncoras que não correspondem a títulos
- Links com âncoras inválidas
- Códigos de cor sendo interpretados como âncoras

### 4. `check-all-issues.js`
Executa todas as verificações de uma vez.

**Uso:**
```bash
npm run check-all-issues
# ou
node scripts/check-all-issues.js
```

## 🔍 Comandos de Busca Rápida

### Links Quebrados
```bash
# Buscar links Markdown que podem estar quebrados
grep -r "\[.*\]([^h][^t][^t][^p].*)" docs/ --include="*.md" --include="*.mdx"

# Buscar links para arquivos específicos
grep -r "hosting-n8n/instalacao" docs/ --include="*.md" --include="*.mdx"

# Buscar links relativos
grep -r "\[.*\](\.\./.*)" docs/ --include="*.md" --include="*.mdx"
```

### Rotas Duplicadas
```bash
# Encontrar arquivos index duplicados
find docs/ -name "index.md" -o -name "index.mdx" | sort

# Verificar duplicatas no mesmo diretório
find docs/ -name "index.*" | sed 's/\/index\.[^\/]*$//' | sort | uniq -d
```

### Âncoras Quebradas
```bash
# Buscar links com âncoras
grep -r "\[.*\](.*#.*)" docs/ --include="*.md" --include="*.mdx"

# Extrair todos os títulos
grep -r "^#{1,6}\s" docs/ --include="*.md" --include="*.mdx"
```

## 📊 Resultados da Última Verificação

### Links Quebrados
- **82 arquivos** com problemas
- **360 links** quebrados no total

**Principais problemas encontrados:**
- Links para arquivos inexistentes em `integracoes-br/`
- Referências a arquivos removidos como `hosting-n8n/instalacao.md`
- Links para seções que não existem

### Rotas Duplicadas
- **4 rotas** duplicadas encontradas:
  - `/contribuir` (index.md + index.mdx)
  - `/comunidade/videos` (index.md + index.mdx)
  - `/comunidade/casos-uso-avancados` (index.md + index.mdx)
  - `/comunidade/automacao-iniciantes` (index.md + index.mdx)

### Âncoras Quebradas
- **240 arquivos** com problemas
- **3.099 âncoras** quebradas no total

**Principais problemas:**
- Códigos de cor sendo interpretados como âncoras (#ea4b71, #10b981, etc.)
- Âncoras que não correspondem a títulos existentes
- Links internos quebrados

## 🛠️ Como Corrigir

### 1. Links Quebrados
```bash
# Substituir links para arquivos removidos
find docs/ -name "*.md" -o -name "*.mdx" -exec sed -i 's/hosting-n8n\/instalacao\.md/hosting-n8n\/instalacao\/index.md/g' {} \;

# Corrigir links para seções que não existem
# Verificar se os arquivos de destino existem antes de corrigir
```

### 2. Rotas Duplicadas
```bash
# Remover arquivos .md duplicados (manter .mdx)
rm docs/contribuir/index.md
rm docs/comunidade/videos/index.md
rm docs/comunidade/casos-uso-avancados/index.md
rm docs/comunidade/automacao-iniciantes/index.md
```

### 3. Âncoras Quebradas
```bash
# Remover códigos de cor que estão sendo interpretados como âncoras
# Usar CSS classes em vez de códigos hexadecimais inline
# Verificar se os títulos correspondem às âncoras usadas
```

## 📝 Próximos Passos

1. **Execute a verificação completa:**
   ```bash
   npm run check-all-issues
   ```

2. **Corrija os problemas prioritários:**
   - Links quebrados que impedem navegação
   - Rotas duplicadas que causam conflitos
   - Âncoras que quebram navegação interna

3. **Teste as correções:**
   ```bash
   npm run build
   ```

4. **Execute novamente para verificar:**
   ```bash
   npm run check-all-issues
   ```

## 💡 Dicas

- **Sempre teste** após fazer correções
- **Faça backup** antes de executar substituições automáticas
- **Revise manualmente** os resultados antes de aplicar correções
- **Use os comandos grep** para problemas específicos
- **Mantenha os scripts atualizados** conforme a estrutura do projeto evolui

## 🔧 Dependências

Os scripts requerem:
- Node.js
- `glob` (já incluído no projeto)
- `fs` e `path` (módulos nativos do Node.js)

## 📞 Suporte

Se encontrar problemas com os scripts:
1. Verifique se todas as dependências estão instaladas
2. Confirme que está executando no diretório raiz do projeto
3. Verifique se os arquivos de configuração estão corretos
4. Consulte os logs de erro para detalhes específicos