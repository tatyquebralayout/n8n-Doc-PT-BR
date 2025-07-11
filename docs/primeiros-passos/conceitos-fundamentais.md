---
title: Conceitos Fundamentais
description: Fundamentos essenciais e definições básicas do n8n - workflows, nodes, triggers, data flow e automação
sidebar_position: 1
keywords: [n8n, conceitos, fundamentais, básicos, workflows, nodes, triggers, automação, data flow]
---

# <ion-icon name="library-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conceitos Fundamentais

Esta seção apresenta os conceitos fundamentais que formam a base do n8n. Entender estes conceitos é essencial para criar workflows eficientes e aproveitar ao máximo a plataforma.

## <ion-icon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que é o n8n?

O **n8n** (pronuncia-se "n-eight-n") é uma plataforma de automação de workflows que permite conectar diferentes aplicações e serviços através de uma interface visual. Ele é:

- **Open source**: Código aberto e gratuito
- **Visual**: Interface gráfica para criar workflows
- **Flexível**: Suporta centenas de integrações
- **Poderoso**: Permite automações complexas
- **Escalável**: Funciona para projetos pequenos e grandes

### Principais Características

- **Editor visual de workflows** com mais de **400 integrações** nativas
- **Nós de código** em JavaScript/Python para lógica específica
- **Triggers avançados**: webhooks, automações agendadas e ações via IA
- **Autonomia total**: pode ser executado localmente ou na nuvem
- **Gratuito e open-source** sob licença "fair-code"

## <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Workflows

### O que é um Workflow?

Um **workflow** é uma sequência visual de etapas automatizadas que processam dados de uma forma específica. É como uma receita que o n8n segue para realizar uma tarefa.

**Exemplo simples:**
```
Receber dados → Processar → Enviar resultado
```

### Componentes de um Workflow

1. **Trigger**: Inicia o workflow
2. **Nodes**: Processam os dados
3. **Connections**: Ligam os nodes
4. **Data**: Informações que fluem entre nodes

### Tipos de Workflows

#### 1. Workflows Simples
- **Um trigger** + **poucos nodes**
- **Tarefa específica** e bem definida
- **Fácil de entender** e manter

**Exemplo:** Enviar email quando receber webhook

#### 2. Workflows Complexos
- **Múltiplos triggers** e **muitos nodes**
- **Lógica condicional** e **loops**
- **Integração** com vários sistemas

**Exemplo:** Sistema completo de CRM com múltiplas integrações

#### 3. Workflows em Paralelo
- **Múltiplos caminhos** de execução
- **Processamento simultâneo**
- **Agregação** de resultados

**Exemplo:** Consultar múltiplas APIs e consolidar dados

## <ion-icon name="cube-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Nodes

### O que são Nodes?

**Nodes** são os blocos de construção dos workflows. Cada node tem uma função específica e processa dados de uma forma particular. É como uma peça de LEGO: pequena, funcional, e que se encaixa em outras.

### Tipos de Nodes

#### 1. Trigger Nodes
**Iniciam** workflows automaticamente:

- **Manual Trigger**: Execução manual pelo usuário
- **Schedule Trigger**: Execução programada (cron)
- **Webhook**: Recebe dados de sistemas externos
- **Polling**: Consulta APIs periodicamente

#### 2. Regular Nodes
**Processam** dados durante o workflow:

- **HTTP Request**: Faz chamadas para APIs
- **Set**: Define ou modifica campos
- **Code**: Executa código JavaScript
- **If**: Cria condições e decisões
- **Switch**: Múltiplas condições

#### 3. Output Nodes
**Geram** resultados ou ações:

- **Email**: Envia emails
- **Slack**: Envia mensagens
- **Database**: Salva dados
- **File**: Cria arquivos

### Configuração de Nodes

Cada node tem **propriedades** configuráveis:

```javascript
// Exemplo: Configuração de HTTP Request
{
  "method": "POST",
  "url": "https://api.exemplo.com/dados",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "nome": "{{ $json.nome }}",
    "email": "{{ $json.email }}"
  }
}
```

## <ion-icon name="play-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Triggers

### O que são Triggers?

**Triggers** são nodes especiais que iniciam workflows. Eles "disparam" a execução baseado em eventos ou condições. Todo workflow começa com um trigger.

### Tipos de Triggers

#### 1. Manual Trigger
- **Execução manual** pelo usuário
- **Teste** de workflows
- **Debug** e desenvolvimento

#### 2. Schedule Trigger
- **Execução programada** (cron)
- **Tarefas recorrentes**
- **Backups automáticos**

```javascript
// Exemplo: Executar diariamente às 8h
Cron: 0 8 * * *
```

#### 3. Webhook Trigger
- **Recebe dados** de sistemas externos
- **Execução em tempo real**
- **Integração** com APIs

```javascript
// Exemplo: URL do webhook
https://seu-n8n.com/webhook/meu-webhook
```

#### 4. Polling Trigger
- **Consulta APIs** periodicamente
- **Verifica** mudanças
- **Sincronização** de dados

## <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Connections

**Connections** são as ligações entre nodes que definem o fluxo de dados. Elas mostram por onde os dados vão passar e em que ordem. Conectar bem significa garantir que a informação certa chegue ao lugar certo — sem ruídos.

## <ion-icon name="flash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Execution (Execução)

Cada vez que um workflow é ativado, ocorre uma execução. O n8n pega seus dados reais, segue o fluxo definido, e gera um resultado — seja um e-mail enviado, uma planilha atualizada ou uma decisão automatizada.

## <ion-icon name="swap-horizontal-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Data Flow

### Como os Dados Fluem

O **fluxo de dados** é fundamental no n8n:

1. **Trigger** inicia o workflow
2. **Dados** são passados para o próximo node
3. **Cada node** processa os dados
4. **Resultado** é passado adiante

### Estrutura de Dados

Os dados no n8n são organizados em **items**:

```json
{
  "json": {
    "nome": "João Silva",
    "email": "joao@exemplo.com",
    "idade": 30
  },
  "binary": {
    "arquivo": {
      "data": "base64...",
      "mimeType": "application/pdf"
    }
  }
}
```

### Data Mapping (Mapeamento de Dados)

Você pode usar os dados gerados por um node anterior nos próximos passos. Esse processo é chamado de data mapping. É como dizer: "pegue o nome que veio do formulário e insira aqui no e-mail".

Use **expressions** para acessar dados:

```javascript
// Dados do item atual
{{ $json.nome }}

// Dados de nodes anteriores
{{ $('Node Anterior').json.email }}
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Error Handling (Tratamento de Erros)

Em automação, erros podem acontecer — e tudo bem. O n8n permite criar caminhos de tratamento de erros que detectam, registram e até corrigem falhas automaticamente. Isso torna seus fluxos mais confiáveis e resilientes.

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

Agora que você entende os conceitos fundamentais:

1. **[Instalação](./guia-instalacao)** - Configure seu ambiente n8n
2. **[Primeiro Workflow](./primeiro-workflow)** - Crie sua primeira automação
3. **[Conectar Aplicações](./conectar-aplicacoes)** - Aprenda sobre integrações
4. **[Usando n8n](../../usando-n8n/getting-started/)** - Explore a interface

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[Integrações](../../integracoes/)** - Explore todos os nodes disponíveis
- **[Lógica e Dados](../../logica-e-dados/)** - Conceitos avançados de fluxo
- **[Usando n8n](../../usando-n8n/)** - Guias práticos para usar a interface
- **[Glossário](../../referencia/recursos/glossario)** - Termos técnicos do n8n 