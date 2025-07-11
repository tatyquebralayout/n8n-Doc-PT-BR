---
title: Diretrizes de Contribuição
description: Diretrizes e padrões para contribuir com a documentação do n8n Brasil
sidebar_label: Diretrizes
---

# <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Diretrizes de Contribuição

Bem-vindo às diretrizes de contribuição para a documentação do n8n Brasil! Este documento estabelece os padrões e processos para contribuir com o projeto.

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Princípios Fundamentais

### 🎯 Missão

Democratizar a automação no Brasil através de documentação clara, acessível e em português brasileiro.

### 🌟 Valores

- **Clareza**: Conteúdo simples e direto
- **Precisão**: Informações técnicas corretas e atualizadas
- **Inclusividade**: Linguagem acessível para todos os níveis
- **Relevância**: Foco no contexto brasileiro

## <ion-icon name="git-pull-request-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Como Contribuir

### 1. **Reportar Problemas**

- Use o template de issue apropriado
- Descreva o problema de forma clara
- Inclua passos para reproduzir
- Mencione sua versão do n8n

### 2. **Sugerir Melhorias**

- Explique o benefício da mudança
- Forneça exemplos quando possível
- Considere o impacto na experiência do usuário

### 3. **Contribuir Conteúdo**

- Siga o [Guia de Estilo](./padroes-e-estilo/guia-de-estilo)
- Use os [Recursos do Markdown](./padroes-e-estilo/markdown-features)
- Teste suas alterações localmente
- Mantenha o foco no usuário brasileiro

## <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Processo de Contribuição

### Para Correções Simples

1. Faça um fork do repositório
2. Crie uma branch para sua correção
3. Faça as alterações necessárias
4. Teste localmente
5. Abra um Pull Request

### Para Novas Funcionalidades

1. Abra uma issue para discussão
2. Aguarde feedback da comunidade
3. Implemente seguindo as diretrizes
4. Documente adequadamente
5. Abra um Pull Request

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Padrões de Qualidade

### ✅ O que fazer

- Escreva em português brasileiro claro
- Use exemplos práticos e relevantes
- Mantenha a estrutura consistente
- Teste todos os links e exemplos
- Siga as convenções de nomenclatura

### ❌ O que evitar

- Jargões desnecessários
- Traduções literais do inglês
- Exemplos não relevantes para o Brasil
- Quebrar a estrutura existente
- Ignorar feedback da comunidade

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Revisão e Aprovação

### Critérios de Aprovação

- [ ] Conteúdo técnico correto
- [ ] Linguagem clara e acessível
- [ ] Exemplos funcionais
- [ ] Estrutura consistente
- [ ] Links funcionando
- [ ] Relevância para o contexto brasileiro

### Processo de Revisão

1. **Revisão automática**: Verificação de links e estrutura
2. **Revisão da comunidade**: Feedback de outros contribuidores
3. **Revisão final**: Aprovação pelos mantenedores

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Úteis

- [Guia de Estilo](./padroes-e-estilo/guia-de-estilo) - Padrões de escrita
- [Recursos do Markdown](./padroes-e-estilo/markdown-features) - Sintaxe e componentes
- [Design System](./padroes-e-estilo/design-system) - Elementos visuais
- [Guia de Tradução](./traducao-e-localizacao/guia-traducao) - Padrões de localização

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Comunicação

### Canais de Comunicação

- **Issues do GitHub**: Para problemas e sugestões
- **Discussions**: Para discussões gerais
- **Pull Requests**: Para contribuições de código

### Código de Conduta

Siga nosso [Código de Conduta](./entendendo-o-projeto/codigo-conduta) em todas as interações.

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Agradecimentos

Obrigado por contribuir com a documentação do n8n Brasil! Sua participação ajuda a tornar a automação mais acessível para todos os brasileiros.

---

**💡 Dica**: Se você tem dúvidas sobre como contribuir, não hesite em abrir uma issue ou participar das discussões da comunidade.

## Processo de Validação Contínua da Documentação

Para garantir a qualidade, transparência e confiança na documentação, siga este processo de validação contínua para todas as páginas em `docs/`:

### 1. Sinalização de Status
- **Páginas validadas**: Devem conter no início do arquivo o aviso:
  ```md
  :::info
  <ion-icon name="shield-checkmark-outline" style={{ fontSize: '18px', color: '#17a2b8' }}></ion-icon> Esta página da documentação foi validada tecnicamente e didaticamente.
  :::
  ```
- **Páginas em progresso**: Devem conter no início do arquivo o aviso:
  ```md
  :::warning
  <ion-icon name="time-outline" style={{ fontSize: '18px', color: '#f59e0b' }}></ion-icon> Esta página ainda está em processo de validação. O conteúdo pode sofrer alterações.
  :::
  ```

### 2. Checklist de Validação
- [ ] Revisão técnica do conteúdo (exatidão, exemplos, comandos, código)
- [ ] Revisão didática (clareza, estrutura, progressão, acessibilidade)
- [ ] Conferência de links internos e externos
- [ ] Consistência visual (ícones, avisos, títulos, cores)
- [ ] Teste prático de tutoriais e exemplos
- [ ] Atualização do status na homepage (src/pages/index.tsx)
- [ ] Atualização do aviso no início do arquivo
- [ ] Registro da validação (data, responsável, observações)

### 3. Orientações para Contribuidores
- Sempre adicione ou atualize o aviso de status ao criar ou editar uma página.
- Ao concluir a validação, altere o aviso de `:::warning` para `:::info`.
- Mantenha o padrão de ícones e cores para garantir clareza ao usuário.
- Se identificar uma página sem aviso, sinalize imediatamente e registre para validação.
- Use o checklist acima para cada página validada.

### 4. Auditoria Periódica
- Realize auditorias automáticas ou manuais periodicamente para garantir que todas as páginas estejam sinalizadas corretamente.
- Gere relatórios de status para acompanhamento do progresso da documentação.

### 5. Transparência e Comunicação
- Mantenha o histórico de validação acessível para a equipe e comunidade.
- Comunique mudanças de status relevantes no changelog ou canal de comunicação do projeto.

---

> **Dica:** Automatize a verificação de avisos com scripts ou ferramentas de CI para garantir que nenhuma página fique sem sinalização adequada.
