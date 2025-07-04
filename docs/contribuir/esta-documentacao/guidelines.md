---
sidebar_position: 1
title: Diretrizes para Contribuir
description: Diretrizes específicas para contribuir com esta documentação brasileira do n8n
keywords: [n8n, contribuir, documentação, diretrizes, brasil]
---

# Diretrizes para Contribuir com Esta Documentação

## Propósito

Este documento estabelece as **diretrizes específicas** para contribuir com esta documentação brasileira do n8n. 

:::info Importante
Estas diretrizes são para contribuir com **ESTA documentação técnica**. Para contribuir com o projeto n8n em si, veja a seção "Projeto n8n".
:::

## Padrões de Conteúdo

### Idioma e Localização

- **Português brasileiro** exclusivamente
- Adaptar exemplos para o contexto brasileiro
- Usar moeda brasileira (R$) em exemplos
- Referenciar serviços populares no Brasil
- Considerar fuso horário brasileiro

### Estrutura de Documento

#### Frontmatter Obrigatório
```yaml
---
sidebar_position: 1
title: Título da Página
description: Descrição clara e concisa
keywords: [n8n, palavra-chave-1, palavra-chave-2]
---
```

#### Estrutura Recomendada
```markdown
# Título Principal

Introdução clara do que será abordado.

## O que você vai aprender

- Objetivo 1
- Objetivo 2
- Objetivo 3

## Pré-requisitos

- Requisito necessário 1
- Requisito necessário 2

## Implementação

### Passo 1: Título do Passo
Explicação detalhada...

### Passo 2: Próximo Passo
Continuação lógica...

## Verificação

Como confirmar que funcionou.

## Próximos Passos

Links para documentos relacionados.
```

### Elementos Visuais

#### Emojis Padronizados
| Contexto | Emoji | Uso |
|----------|-------|-----|
| Início/Começar | | Primeiros passos, instalação |
| Configuração | | Setup, configurações |
| Dados | | Manipulação de dados |
| Integração | | Conectores, APIs |
| Segurança | | Autenticação, proteção |
| Nuvem | | Cloud, hospedagem |
| Container | | Docker, containerização |
| Interface | | UI, design, visual |

#### Admonições
```markdown
:::tip Dica
Para dicas úteis e melhores práticas
:::

:::warning Atenção
Para avisos importantes
:::

:::danger Cuidado
Para situações críticas ou destrutivas
:::

:::info Informação
Para informações complementares
:::
```

#### Blocos de Código
```markdown
```bash title="Terminal"
# Comando no terminal
npm install n8n
```

```javascript title="config.js"
// Código JavaScript com título
const config = {
host: 'localhost',
port: 5678
};
```
```

## Organização e Navegação

### Estrutura de Pastas

- **Organize por função**, não por tipo
- **Use subpastas** quando há mais de 3 arquivos relacionados
- **Nomes descritivos** em kebab-case
- **Sem acentos** nos nomes de arquivo

### Sidebar

- **Ordem lógica** de aprendizado
- **Agrupamento temático** claro
- **Labels descritivos** com emojis
- **Hierarquia** máxima de 3 níveis

## Qualidade e Revisão

### Checklist de Conteúdo

- [ ] Português correto e fluente
- [ ] Exemplos testados e funcionais
- [ ] Links internos funcionando
- [ ] Imagens otimizadas (WebP quando possível)
- [ ] Código formatado corretamente
- [ ] Estrutura seguindo padrão estabelecido

### Revisão Técnica

- [ ] Informações atualizadas
- [ ] Comandos testados
- [ ] Screenshots atuais da interface
- [ ] Compatibilidade com versão mais recente do n8n

### Revisão Visual

- [ ] Formatação consistente
- [ ] Emojis seguindo padrão
- [ ] Admonições apropriadas
- [ ] Hierarquia de títulos correta

## Processo de Contribuição

### 1. Planejamento
- Verificar se o tópico já existe
- Definir escopo claro do documento
- Identificar público-alvo

### 2. Desenvolvimento
- Seguir estrutura padrão
- Testar todos os exemplos
- Otimizar imagens

### 3. Revisão
- Auto-revisão usando checklist
- Verificar build local
- Testar navegação

### 4. Submissão
- PR com título descritivo
- Descrição clara das mudanças
- Screenshots se aplicável

## Tipos de Contribuição

### **Documentação Nova**
- Tutoriais de workflows específicos
- Guias de integrações brasileiras
- Casos de uso práticos
- Troubleshooting comum

### **Melhorias Existentes**
- Atualização de conteúdo desatualizado
- Correção de erros
- Melhoria na clareza
- Adição de exemplos

### **Enriquecimento**
- Screenshots atualizados
- Vídeos explicativos
- Diagramas ilustrativos
- Exemplos mais detalhados

## O que Evitar

### Não Fazer
- Copiar conteúdo da documentação oficial sem adaptação
- Usar anglicismos desnecessários
- Criar documentos muito longos (>2000 palavras)
- Misturar conceitos não relacionados
- Referenciar versões desatualizadas

### Cuidado com
- Links externos que podem quebrar
- Screenshots que ficam desatualizados rapidamente
- Informações específicas de versão
- Dependências externas não especificadas

## Estilo de Escrita

### Prefira
- **Tom amigável e acessível**
- **Explicações passo a passo**
- **Exemplos práticos e reais**
- **Linguagem simples e clara**

### Formato
- **Você** (segunda pessoa) para instruções
- **Voz ativa** sempre que possível
- **Frases curtas** e objetivas
- **Parágrafos** de no máximo 4 linhas

### Localização
- **Contexto brasileiro** em exemplos
- **Serviços populares** no Brasil
- **Moeda nacional** (R$) quando aplicável
- **Fuso horário** brasileiro

---

** Lembre-se:** O objetivo é criar a melhor experiência possível para desenvolvedores brasileiros aprenderem n8n!

** Dúvidas?** Abra uma issue no GitHub ou consulte outros documentos desta seção.
