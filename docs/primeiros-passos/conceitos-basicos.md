---
sidebar_position: 2
title: Conceitos Básicos
description: Conceitos fundamentais do n8n que você precisa conhecer
keywords: [n8n, conceitos, workflows, nodes, automação]
---

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conceitos Básicos do n8n

Antes de começar a criar seus workflows, é importante entender os conceitos fundamentais do n8n.

## <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que são Workflows?

Um **workflow** é uma sequência de tarefas automatizadas que são executadas em uma ordem específica. No n8n, workflows são representados visualmente como um fluxograma.

### Características dos Workflows

- **Visual**: Interface de arrastar e soltar
- **Flexível**: Pode ser simples ou complexo
- **Reutilizável**: Pode ser executado múltiplas vezes
- **Escalável**: Suporta desde tarefas simples até processos complexos

## <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que são Nodes?

**Nodes** são os blocos de construção dos workflows. Cada node representa uma tarefa específica ou uma integração com um serviço.

### Tipos de Nodes

#### Trigger Nodes

Iniciam a execução do workflow:

- **Webhook**: Recebe dados via HTTP
- **Schedule**: Executa em horários específicos
- **Manual Trigger**: Execução manual

#### Regular Nodes

Executam tarefas específicas:

- **HTTP Request**: Faz requisições para APIs
- **Set**: Manipula dados
- **IF**: Lógica condicional

#### Output Nodes

Enviam dados para destinos externos:

- **Email**: Envia emails
- **Database**: Salva em banco de dados
- **File**: Salva arquivos

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Fluxo de Dados

### Como os Dados Fluem

1. **Input**: Dados entram via trigger
2. **Processing**: Nodes processam e transformam
3. **Output**: Dados são enviados ao destino final

### Formato dos Dados

```json
{
"id": 1,
"name": "João Silva",
"email": "joao@exemplo.com",
"timestamp": "2025-01-15T10:30:00Z"
}
```

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Expressões

Expressões permitem manipular dados dinamicamente usando JavaScript.

### Exemplos Básicos

```javascript
// Acessar dados do item anterior
{{ $json.nome }}

// Transformar texto
{{ $json.email.toLowerCase() }}

// Operações matemáticas
{{ $json.preco * 1.1 }}

// Formatação de data
{{ new Date($json.data).toLocaleDateString('pt-BR') }}
```

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conexões

### Como Conectar Nodes

- **Clique e arraste** da saída de um node para a entrada de outro
- **Múltiplas conexões** são permitidas
- **Diferentes tipos** de dados podem fluir pelas conexões

### Tipos de Conexões

- **Main**: Fluxo principal de dados
- **Error**: Tratamento de erros
- **Optional**: Conexões opcionais

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Credenciais

### Gerenciamento Seguro

- **Criptografadas**: Todas as credenciais são criptografadas
- **Reutilizáveis**: Uma credencial pode ser usada em múltiplos nodes
- **Testáveis**: Pode testar conectividade antes de salvar

### Tipos Comuns

- **API Keys**: Para serviços web
- **OAuth2**: Para autenticação moderna
- **Usuário/Senha**: Para bancos de dados
- **Certificates**: Para conexões SSL

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Execução

### Modos de Execução

- **Manual**: Executado pelo usuário
- **Trigger**: Executado automaticamente
- **Webhook**: Executado via HTTP
- **Schedule**: Executado em horários definidos

### Estados de Execução

- **Success**: Executado com sucesso
- **Error**: Falha na execução
- **Waiting**: Aguardando entrada
- **Running**: Em execução

## <ion-icon name="bug-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Debugging

### Ferramentas de Debug

- **Execution Log**: Histórico detalhado
- **Data Viewer**: Visualizar dados em cada step
- **Error Details**: Informações de erro
- **Performance Metrics**: Tempo de execução

### Dicas de Debugging

1. **Execute step by step** para identificar problemas
2. **Verifique os dados** em cada node
3. **Use console.log** em expressões JavaScript
4. **Teste credenciais** separadamente

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

Agora que você entende os conceitos básicos, está pronto para:

1. **[Criar seu primeiro workflow](./primeiro-workflow)**
2. **[Explorar integrações disponíveis](../integracoes/)**
3. **[Configurar triggers](../integracoes/trigger-nodes/time-based/manual-trigger)**
4. **[Aprender sobre deployment](../hosting-n8n/instalacao)**

:::tip Dica Pro
Comece sempre com workflows simples e vá aumentando a complexidade gradualmente. O n8n é muito poderoso, mas é melhor dominar o básico primeiro!
:::

---

**Próximo:** [Primeiro Workflow](./primeiro-workflow) →
