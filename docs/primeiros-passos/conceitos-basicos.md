---
sidebar_position: 2
title: Conceitos Básicos
description: Conceitos fundamentais do n8n que você precisa conhecer
keywords: [n8n, conceitos, workflows, nodes, automação]
---
import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="bulb-outline" size={32} /> Conceitos Básicos do n8n

Antes de começar a criar seus workflows, é importante entender os conceitos fundamentais do n8n.

## <IonicIcon name="git-network-outline" size={24} /> O que são Workflows?

Um **workflow** é uma sequência de tarefas automatizadas que são executadas em uma ordem específica. No n8n, workflows são representados visualmente como um fluxograma.

### <IonicIcon name="bookmark-outline" size={20} /> Características dos Workflows
- <IonicIcon name="eye-outline" size={16} /> **Visual**: Interface de arrastar e soltar
- <IonicIcon name="options-outline" size={16} /> **Flexível**: Pode ser simples ou complexo
- <IonicIcon name="refresh-outline" size={16} /> **Reutilizável**: Pode ser executado múltiplas vezes
- <IonicIcon name="trending-up-outline" size={16} /> **Escalável**: Suporta desde tarefas simples até processos complexos

## <IonicIcon name="shapes-outline" size={24} /> O que são Nodes?

**Nodes** são os blocos de construção dos workflows. Cada node representa uma tarefa específica ou uma integração com um serviço.

### <IonicIcon name="list-outline" size={20} /> Tipos de Nodes

#### <IonicIcon name="play-outline" size={18} /> Trigger Nodes
Iniciam a execução do workflow:
- <IonicIcon name="globe-outline" size={16} /> **Webhook**: Recebe dados via HTTP
- <IonicIcon name="time-outline" size={16} /> **Schedule**: Executa em horários específicos
- <IonicIcon name="hand-left-outline" size={16} /> **Manual Trigger**: Execução manual

#### <IonicIcon name="cog-outline" size={18} /> Regular Nodes
Executam tarefas específicas:
- <IonicIcon name="cloud-outline" size={16} /> **HTTP Request**: Faz requisições para APIs
- <IonicIcon name="create-outline" size={16} /> **Set**: Manipula dados
- <IonicIcon name="git-branch-outline" size={16} /> **IF**: Lógica condicional

#### <IonicIcon name="arrow-forward-outline" size={18} /> Output Nodes
Enviam dados para destinos externos:
- <IonicIcon name="mail-outline" size={16} /> **Email**: Envia emails
- <IonicIcon name="server-outline" size={16} /> **Database**: Salva em banco de dados
- <IonicIcon name="document-outline" size={16} /> **File**: Salva arquivos

## <IonicIcon name="swap-horizontal-outline" size={24} /> Fluxo de Dados

### <IonicIcon name="arrow-forward-circle-outline" size={20} /> Como os Dados Fluem
1. <IonicIcon name="enter-outline" size={16} /> **Input**: Dados entram via trigger
2. <IonicIcon name="construct-outline" size={16} /> **Processing**: Nodes processam e transformam
3. <IonicIcon name="exit-outline" size={16} /> **Output**: Dados são enviados ao destino final

### Formato dos Dados
```json
{
"id": 1,
"name": "João Silva",
"email": "joao@exemplo.com",
"timestamp": "2025-01-15T10:30:00Z"
}
```

## <IonicIcon name="code-slash-outline" size={24} /> Expressões

Expressões permitem manipular dados dinamicamente usando JavaScript.

### <IonicIcon name="code-outline" size={20} /> Exemplos Básicos
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

## <IonicIcon name="link-outline" size={24} /> Conexões

### <IonicIcon name="attach-outline" size={20} /> Como Conectar Nodes
- <IonicIcon name="move-outline" size={16} /> **Clique e arraste** da saída de um node para a entrada de outro
- <IonicIcon name="git-network-outline" size={16} /> **Múltiplas conexões** são permitidas
- <IonicIcon name="swap-horizontal-outline" size={16} /> **Diferentes tipos** de dados podem fluir pelas conexões

### <IonicIcon name="list-outline" size={20} /> Tipos de Conexões
- <IonicIcon name="arrow-forward-outline" size={16} /> **Main**: Fluxo principal de dados
- <IonicIcon name="alert-circle-outline" size={16} /> **Error**: Tratamento de erros
- <IonicIcon name="ellipsis-horizontal-outline" size={16} /> **Optional**: Conexões opcionais

## <IonicIcon name="key-outline" size={24} /> Credenciais

### <IonicIcon name="shield-checkmark-outline" size={20} /> Gerenciamento Seguro
- <IonicIcon name="lock-closed-outline" size={16} /> **Criptografadas**: Todas as credenciais são criptografadas
- <IonicIcon name="refresh-outline" size={16} /> **Reutilizáveis**: Uma credencial pode ser usada em múltiplos nodes
- <IonicIcon name="checkmark-circle-outline" size={16} /> **Testáveis**: Pode testar conectividade antes de salvar

### <IonicIcon name="options-outline" size={20} /> Tipos Comuns
- <IonicIcon name="key-outline" size={16} /> **API Keys**: Para serviços web
- <IonicIcon name="shield-outline" size={16} /> **OAuth2**: Para autenticação moderna
- <IonicIcon name="person-outline" size={16} /> **Usuário/Senha**: Para bancos de dados
- <IonicIcon name="document-lock-outline" size={16} /> **Certificates**: Para conexões SSL

## <IonicIcon name="play-circle-outline" size={24} /> Execução

### <IonicIcon name="options-outline" size={20} /> Modos de Execução
- <IonicIcon name="hand-left-outline" size={16} /> **Manual**: Executado pelo usuário
- <IonicIcon name="flash-outline" size={16} /> **Trigger**: Executado automaticamente
- <IonicIcon name="globe-outline" size={16} /> **Webhook**: Executado via HTTP
- <IonicIcon name="time-outline" size={16} /> **Schedule**: Executado em horários definidos

### <IonicIcon name="pulse-outline" size={20} /> Estados de Execução
- <IonicIcon name="checkmark-circle-outline" size={16} /> **Success**: Executado com sucesso
- <IonicIcon name="close-circle-outline" size={16} /> **Error**: Falha na execução
- <IonicIcon name="time-outline" size={16} /> **Waiting**: Aguardando entrada
- <IonicIcon name="play-outline" size={16} /> **Running**: Em execução

## <IonicIcon name="bug-outline" size={24} /> Debugging

### <IonicIcon name="build-outline" size={20} /> Ferramentas de Debug
- <IonicIcon name="list-outline" size={16} /> **Execution Log**: Histórico detalhado
- <IonicIcon name="eye-outline" size={16} /> **Data Viewer**: Visualizar dados em cada step
- <IonicIcon name="alert-circle-outline" size={16} /> **Error Details**: Informações de erro
- <IonicIcon name="speedometer-outline" size={16} /> **Performance Metrics**: Tempo de execução

### <IonicIcon name="bulb-outline" size={20} /> Dicas de Debugging
1. <IonicIcon name="footsteps-outline" size={16} /> **Execute step by step** para identificar problemas
2. <IonicIcon name="search-outline" size={16} /> **Verifique os dados** em cada node
3. <IonicIcon name="terminal-outline" size={16} /> **Use console.log** em expressões JavaScript
4. <IonicIcon name="shield-checkmark-outline" size={16} /> **Teste credenciais** separadamente

## <IonicIcon name="arrow-forward-circle-outline" size={24} /> Próximos Passos

Agora que você entende os conceitos básicos, está pronto para:

1. <IonicIcon name="create-outline" size={16} /> **[Criar seu primeiro workflow](./primeiro-workflow)**
2. <IonicIcon name="extension-puzzle-outline" size={16} /> **[Explorar integrações disponíveis](../integracoes/index)**
3. <IonicIcon name="flash-outline" size={16} /> **[Configurar triggers](../integracoes/trigger-nodes/time-based/manual-trigger)**
4. <IonicIcon name="rocket-outline" size={16} /> **[Aprender sobre deployment](../hosting-n8n/instalacao)**

:::tip Dica Pro
Comece sempre com workflows simples e vá aumentando a complexidade gradualmente. O n8n é muito poderoso, mas é melhor dominar o básico primeiro!
:::

---

**Próximo:** [Primeiro Workflow](./primeiro-workflow) → 