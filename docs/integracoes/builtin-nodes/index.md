---
sidebar_position: 1
title: Introdução
description: Nodes nativos e built-in do n8n para funcionalidades fundamentais
keywords: [n8n, builtin nodes, nodes nativos, funcionalidades básicas, core nodes]
---

# <ion-icon name="information-circle-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Introdução

Os nodes built-in são os blocos fundamentais do n8n, fornecendo funcionalidades essenciais que você pode usar em qualquer workflow. Eles são nativos da plataforma e não requerem instalação adicional.

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você encontrará aqui

### Core Nodes

- **Code**: Execute código JavaScript customizado
- **Debug Helper**: Depure e analise dados
- **Edit Fields Set**: Manipule campos de dados
- **Error Trigger**: Capture e trate erros
- **Execute Sub-workflow**: Execute workflows aninhados
- **Workflow Trigger**: Inicie workflows manualmente

### HTTP Requests

- **HTTP Request**: Faça chamadas para APIs REST
- **Webhook**: Receba dados via webhooks

### Data Processing

- **Set**: Configure e manipule dados
- **Transform**: Transforme dados entre formatos

### Logic Control

- **IF**: Lógica condicional
- **Switch**: Múltiplas condições
- **Merge**: Combine dados de diferentes fontes
- **Split**: Divida dados para processamento paralelo

### Utilities

- **Wait**: Pause execução por tempo
- **Date & Time**: Manipule datas e horários
- **Expression**: Use expressões para cálculos

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conceitos Fundamentais

### O que são Built-in Nodes?

Nodes built-in são funcionalidades nativas do n8n que:

- **Não requerem instalação** adicional
- **Sempre disponíveis** em qualquer instância
- **Documentados oficialmente** pelo n8n
- **Mantidos pela equipe** do n8n
- **Compatíveis** com todas as versões

### Categorias de Nodes

- **Core**: Funcionalidades fundamentais
- **HTTP**: Comunicação com APIs
- **Data**: Processamento de dados
- **Logic**: Controle de fluxo
- **Utilities**: Ferramentas auxiliares

### Vantagens dos Built-in Nodes

- **Confiabilidade**: Testados e estáveis
- **Performance**: Otimizados para o n8n
- **Suporte**: Suporte oficial garantido
- **Documentação**: Bem documentados
- **Atualizações**: Recebem atualizações regulares

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Padrões de Uso

### Fluxo de Dados

1. **Trigger**: Inicie o workflow
2. **Process**: Use nodes built-in para processar dados
3. **Transform**: Manipule dados conforme necessário
4. **Output**: Envie dados para destinos

### Combinações Comuns

- **HTTP Request + Set**: Busque dados e configure campos
- **IF + Merge**: Tome decisões e combine resultados
- **Code + Debug**: Processe dados e analise resultados
- **Split + Merge**: Processe dados em paralelo

### Boas Práticas

- **Use nodes apropriados** para cada tarefa
- **Mantenha workflows simples** e legíveis
- **Documente lógica complexa** com comentários
- **Teste cada node** individualmente

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Explore [Core Nodes](./core-nodes/)** para funcionalidades fundamentais
2. **Aprenda [HTTP Requests](./http-requests/)** para conectar com APIs
3. **Use [Data Processing](./data-processing/)** para manipular dados

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[App Nodes](../app-nodes/)** - Integrações com aplicações
- **[Community Nodes](../community-nodes/)** - Nodes da comunidade
- **[Criar Nodes](../criar-nodes/)** - Desenvolva nodes customizados
- **[Flow Logic](../../logica-e-dados/01-flow-logic/)** - Controle de fluxo

---

**<ion-icon name="code-slash-outline" style={{ fontSize: '16px', color: '#ea4b71' }}></ion-icon> Domine os fundamentos para criar workflows poderosos!**
