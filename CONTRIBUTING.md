# Guia de Contribuição - n8n Documentation BR

## Visão Geral

Este guia estabelece as diretrizes para contribuir com a documentação n8n em português brasileiro, garantindo qualidade, consistência e evitando redundâncias no nosso hub de conhecimento.

## Princípios Fundamentais

### Hub de Conhecimento Sem Redundâncias

Nossa documentação funciona como um hub centralizado de conhecimento onde cada tópico deve ter um local único e bem definido. Evitamos duplicações que podem confundir usuários e dificultar a manutenção.

### Estrutura Hierárquica Clara

A organização segue uma hierarquia lógica que facilita a navegação e localização de informações:
- **Primeiros Passos**: Conceitos básicos e instalação
- **Usando n8n**: Funcionalidades principais e interface
- **Lógica e Dados**: Processamento e manipulação de dados
- **Integrações**: Conectores e nodes
- **Integrações Brasileiras**: Serviços e APIs locais

## Guidelines para Evitar Overlaps

### 1. Verificação Prévia de Conteúdo

Antes de criar nova documentação, **sempre** verifique:

- **Busca no repositório**: Use a funcionalidade de busca para verificar se o tópico já existe
- **Consulta ao `sidebars.json`**: Verifique a estrutura definida no arquivo de configuração
- **Revisão de seções relacionadas**: Examine seções que podem ter conteúdo similar

### 2. Critérios de Decisão para Novos Conteúdos

**Criar novo conteúdo quando:**
- É um tópico completamente novo e não coberto
- Adiciona valor significativo a um tópico existente
- Aborda um aspecto específico não detalhado anteriormente

**NÃO criar quando:**
- O tópico já existe em outra seção
- A informação pode ser integrada a conteúdo existente
- Cria redundância desnecessária

### 3. Processo de Verificação de Overlaps

#### Checklist Pré-Merge

Antes de submeter um pull request, verifique:

- [ ] **Busca por termos relacionados**: Use palavras-chave do `sidebars.json` para verificar overlaps
- [ ] **Revisão de seções afins**: Examine seções listadas em `sectionsToMonitor`
- [ ] **Consulta à estrutura**: Verifique se o conteúdo se encaixa na hierarquia definida
- [ ] **Análise de nomenclatura**: Confirme que não há conflitos de nomenclatura

#### Ferramentas de Verificação

```bash
# Buscar por termos específicos
grep -r "termo-busca" docs/

# Verificar estrutura de arquivos
find docs/ -name "*.md" -exec basename {} \;

# Validar referências cruzadas
grep -r "\[.*\]" docs/ | grep -v "http"
```

### 4. Regras de Organização de Conteúdo

#### Localização de Tópicos

| Tópico | Seção Principal | Subseção |
|--------|----------------|----------|
| Instalação | Primeiros Passos | Guia de Instalação |
| Configuração inicial | Usando n8n | Getting Started |
| Autenticação | Usando n8n | Credenciais |
| Workflows básicos | Usando n8n | Workflows |
| Integrações gerais | Integrações | App Nodes |
| Serviços brasileiros | Integrações Brasileiras | [Categoria específica] |

#### Evitar Redundâncias Específicas

**❌ NÃO fazer:**
- Criar múltiplos arquivos "Em breve" com conteúdo idêntico
- Usar a mesma estrutura para páginas em construção
- Repetir explicações básicas em nodes relacionados
- Usar palavras-chave excessivamente (mais de 5 vezes por arquivo)

**✅ FAZER:**
- Usar templates padronizados para páginas em construção
- Criar conteúdo único para cada node, mesmo que relacionados
- Referenciar conteúdo existente ao invés de duplicar
- Usar sinônimos e variações para evitar repetição excessiva

#### Evitar Duplicações Comuns

**❌ Problemas frequentes:**
- Documentar autenticação em múltiplas seções
- Criar guias de instalação duplicados
- Explicar conceitos básicos em várias seções
- Documentar webhooks em locais diferentes

**✅ Soluções:**
- Centralizar autenticação em "Usando n8n > Credenciais"
- Manter um único guia de instalação em "Primeiros Passos"
- Referenciar conceitos básicos ao invés de repetir
- Consolidar webhooks em "Integrações > HTTP Requests"

### 5. Processo de Revisão

#### Revisão Técnica

1. **Verificação de estrutura**: O conteúdo segue a hierarquia definida?
2. **Análise de overlaps**: Existe conteúdo similar em outras seções?
3. **Validação de links**: Todos os links internos estão funcionando?
4. **Consistência de nomenclatura**: Os termos seguem o padrão estabelecido?

#### Revisão de Conteúdo

1. **Clareza**: A informação está clara e bem organizada?
2. **Completude**: O tópico está adequadamente coberto?
3. **Relevância**: O conteúdo é relevante para o público-alvo?
4. **Atualidade**: A informação está atualizada?

### 6. Resolução de Conflitos

Quando overlaps são identificados:

1. **Análise**: Determine qual conteúdo é mais completo/atualizado
2. **Consolidação**: Combine informações úteis em um local central
3. **Referenciamento**: Use links internos para referenciar conteúdo relacionado
4. **Remoção**: Elimine conteúdo duplicado desnecessário

### 7. Manutenção Contínua

#### Revisões Periódicas

- **Mensal**: Verificar por novos overlaps
- **Trimestral**: Revisar estrutura do `sidebars.json`
- **Semestral**: Avaliar organização geral da documentação

#### Atualizações de Configuração

- Mantenha o `sidebars.json` atualizado
- Adicione novas palavras-chave conforme necessário
- Atualize seções de monitoramento

## Estrutura de Arquivos

### Organização de Diretórios

```
docs/
├── intro.md                    # Página inicial
├── primeiros-passos/           # Conceitos básicos e instalação
├── usando-n8n/                 # Funcionalidades principais
├── logica-e-dados/             # Processamento de dados
├── integracoes/                # Conectores e nodes
├── integracoes-br/             # Serviços brasileiros
├── hosting-n8n/                # Deploy e hospedagem
├── embed/                      # Integração em aplicações
├── comunidade/                 # Recursos da comunidade
├── cursos/                     # Materiais educacionais
├── referencia/                 # Documentação de referência
├── api/                        # Documentação da API
├── advanced-ai/                # Recursos de IA avançados
├── catalogo/                   # Catálogo de recursos
├── privacidade-seguranca/      # Segurança e privacidade
└── contribuir/                 # Guias de contribuição
```

### Convenções de Nomenclatura

- **Arquivos**: Use kebab-case (ex: `guia-instalacao.md`)
- **Diretórios**: Use kebab-case (ex: `primeiros-passos/`)
- **Títulos**: Use Title Case em português
- **IDs**: Use camelCase para identificadores técnicos

## Fluxo de Trabalho

### 1. Preparação

1. Fork do repositório
2. Clone local
3. Instalação de dependências: `pnpm install`
4. Configuração do ambiente de desenvolvimento

### 2. Desenvolvimento

1. Criação de branch: `git checkout -b feature/nome-da-feature`
2. Verificação de overlaps usando o checklist
3. Desenvolvimento seguindo as guidelines
4. Testes locais: `pnpm start`

### 3. Submissão

1. Commit com mensagem descritiva
2. Push para o fork
3. Criação do Pull Request
4. Preenchimento do template de PR

### 4. Revisão

1. Revisão automática de estrutura
2. Revisão manual de conteúdo
3. Aprovação e merge
4. Deploy automático

## Recursos Úteis

### Ferramentas de Verificação

- **Estrutura**: `sidebars.json` - Configuração centralizada
- **Busca**: Funcionalidade de busca do repositório
- **Validação**: Scripts de verificação automática

### Documentação Relacionada

- [Guia de Estilo](docs/contribuir/esta-documentacao/padroes-e-estilo/guia-de-estilo.mdx)
- [Padrões Markdown](docs/contribuir/esta-documentacao/padroes-e-estilo/markdown-features.mdx)
- [Estrutura do Projeto](docs/contribuir/esta-documentacao/01-entendendo-o-projeto/estrutura-projeto.mdx)

### Contatos

- **Issues**: Use o sistema de issues do GitHub
- **Discussões**: Participe das discussões da comunidade
- **Documentação**: Consulte a documentação de contribuição

## Agradecimentos

Obrigado por contribuir com a documentação n8n em português brasileiro! Sua participação ajuda a criar um hub de conhecimento robusto e acessível para toda a comunidade.
