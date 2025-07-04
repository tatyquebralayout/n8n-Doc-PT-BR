---
sidebar_position: 2
title: Conceitos Básicos
description: Conceitos fundamentais do n8n que você precisa conhecer
keywords: [n8n, conceitos, workflows, nodes, automação]
---

# <IonicIcon name="bulb-outline" size={32} color="#ea4b71" /> Conceitos Básicos do n8n

Antes de começar a criar seus workflows, é importante entender os conceitos fundamentais do n8n.

## <IonicIcon name="git-network-outline" size={24} color="#ea4b71" /> O que são Workflows?

Um **workflow** é uma sequência de tarefas automatizadas que são executadas em uma ordem específica. No n8n, workflows são representados visualmente como um fluxograma.

### <IonicIcon name="star-outline" size={20} color="#10b981" /> Características dos Workflows
- <IonicIcon name="eye-outline" size={16} color="#6b7280" /> **Visual**: Interface de arrastar e soltar
- <IonicIcon name="options-outline" size={16} color="#6b7280" /> **Flexível**: Pode ser simples ou complexo
- <IonicIcon name="refresh-outline" size={16} color="#6b7280" /> **Reutilizável**: Pode ser executado múltiplas vezes
- <IonicIcon name="trending-up-outline" size={16} color="#6b7280" /> **Escalável**: Suporta desde tarefas simples até processos complexos

## <IonicIcon name="shapes-outline" size={24} color="#ea4b71" /> O que são Nodes?

**Nodes** são os blocos de construção dos workflows. Cada node representa uma tarefa específica ou uma integração com um serviço.

### <IonicIcon name="list-outline" size={20} color="#10b981" /> Tipos de Nodes

#### <IonicIcon name="play-outline" size={18} color="#10b981" /> Trigger Nodes
Iniciam a execução do workflow:
- <IonicIcon name="globe-outline" size={16} color="#6b7280" /> **Webhook**: Recebe dados via HTTP
- <IonicIcon name="time-outline" size={16} color="#6b7280" /> **Schedule**: Executa em horários específicos
- <IonicIcon name="hand-left-outline" size={16} color="#6b7280" /> **Manual Trigger**: Execução manual

#### <IonicIcon name="cog-outline" size={18} color="#10b981" /> Regular Nodes
Executam tarefas específicas:
- <IonicIcon name="cloud-outline" size={16} color="#6b7280" /> **HTTP Request**: Faz requisições para APIs
- <IonicIcon name="create-outline" size={16} color="#6b7280" /> **Set**: Manipula dados
- <IonicIcon name="git-branch-outline" size={16} color="#6b7280" /> **IF**: Lógica condicional

#### <IonicIcon name="arrow-forward-outline" size={18} color="#10b981" /> Output Nodes
Enviam dados para destinos externos:
- <IonicIcon name="mail-outline" size={16} color="#6b7280" /> **Email**: Envia emails
- <IonicIcon name="server-outline" size={16} color="#6b7280" /> **Database**: Salva em banco de dados
- <IonicIcon name="document-outline" size={16} color="#6b7280" /> **File**: Salva arquivos

## <IonicIcon name="swap-horizontal-outline" size={24} color="#ea4b71" /> Fluxo de Dados

### <IonicIcon name="arrow-forward-circle-outline" size={20} color="#10b981" /> Como os Dados Fluem
1. <IonicIcon name="enter-outline" size={16} color="#6b7280" /> **Input**: Dados entram via trigger
2. <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Processing**: Nodes processam e transformam
3. <IonicIcon name="exit-outline" size={16} color="#6b7280" /> **Output**: Dados são enviados ao destino final

### Formato dos Dados
```json
{
"id": 1,
"name": "João Silva",
"email": "joao@exemplo.com",
"timestamp": "2025-01-15T10:30:00Z"
}
```

## <IonicIcon name="code-slash-outline" size={24} color="#ea4b71" /> Expressões

Expressões permitem manipular dados dinamicamente usando JavaScript.

### <IonicIcon name="library-outline" size={20} color="#10b981" /> Exemplos Básicos
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

## <IonicIcon name="link-outline" size={24} color="#ea4b71" /> Conexões

### <IonicIcon name="attach-outline" size={20} color="#10b981" /> Como Conectar Nodes
- <IonicIcon name="move-outline" size={16} color="#6b7280" /> **Clique e arraste** da saída de um node para a entrada de outro
- <IonicIcon name="git-network-outline" size={16} color="#6b7280" /> **Múltiplas conexões** são permitidas
- <IonicIcon name="swap-horizontal-outline" size={16} color="#6b7280" /> **Diferentes tipos** de dados podem fluir pelas conexões

### <IonicIcon name="list-outline" size={20} color="#10b981" /> Tipos de Conexões
- <IonicIcon name="arrow-forward-outline" size={16} color="#6b7280" /> **Main**: Fluxo principal de dados
- <IonicIcon name="alert-circle-outline" size={16} color="#6b7280" /> **Error**: Tratamento de erros
- <IonicIcon name="ellipsis-horizontal-outline" size={16} color="#6b7280" /> **Optional**: Conexões opcionais

## <IonicIcon name="key-outline" size={24} color="#ea4b71" /> Credenciais

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> Gerenciamento Seguro
- <IonicIcon name="lock-closed-outline" size={16} color="#6b7280" /> **Criptografadas**: Todas as credenciais são criptografadas
- <IonicIcon name="refresh-outline" size={16} color="#6b7280" /> **Reutilizáveis**: Uma credencial pode ser usada em múltiplos nodes
- <IonicIcon name="checkmark-circle-outline" size={16} color="#6b7280" /> **Testáveis**: Pode testar conectividade antes de salvar

### <IonicIcon name="options-outline" size={20} color="#10b981" /> Tipos Comuns
- <IonicIcon name="key-outline" size={16} color="#6b7280" /> **API Keys**: Para serviços web
- <IonicIcon name="shield-outline" size={16} color="#6b7280" /> **OAuth2**: Para autenticação moderna
- <IonicIcon name="person-outline" size={16} color="#6b7280" /> **Usuário/Senha**: Para bancos de dados
- <IonicIcon name="document-lock-outline" size={16} color="#6b7280" /> **Certificates**: Para conexões SSL

## <IonicIcon name="play-circle-outline" size={24} color="#ea4b71" /> Execução

### <IonicIcon name="options-outline" size={20} color="#10b981" /> Modos de Execução
- <IonicIcon name="hand-left-outline" size={16} color="#6b7280" /> **Manual**: Executado pelo usuário
- <IonicIcon name="flash-outline" size={16} color="#6b7280" /> **Trigger**: Executado automaticamente
- <IonicIcon name="globe-outline" size={16} color="#6b7280" /> **Webhook**: Executado via HTTP
- <IonicIcon name="time-outline" size={16} color="#6b7280" /> **Schedule**: Executado em horários definidos

### <IonicIcon name="pulse-outline" size={20} color="#10b981" /> Estados de Execução
- <IonicIcon name="checkmark-circle-outline" size={16} color="#6b7280" /> **Success**: Executado com sucesso
- <IonicIcon name="close-circle-outline" size={16} color="#6b7280" /> **Error**: Falha na execução
- <IonicIcon name="time-outline" size={16} color="#6b7280" /> **Waiting**: Aguardando entrada
- <IonicIcon name="play-outline" size={16} color="#6b7280" /> **Running**: Em execução

## <IonicIcon name="bug-outline" size={24} color="#ea4b71" /> Debugging

### <IonicIcon name="build-outline" size={20} color="#10b981" /> Ferramentas de Debug
- <IonicIcon name="list-outline" size={16} color="#6b7280" /> **Execution Log**: Histórico detalhado
- <IonicIcon name="eye-outline" size={16} color="#6b7280" /> **Data Viewer**: Visualizar dados em cada step
- <IonicIcon name="alert-circle-outline" size={16} color="#6b7280" /> **Error Details**: Informações de erro
- <IonicIcon name="speedometer-outline" size={16} color="#6b7280" /> **Performance Metrics**: Tempo de execução

### <IonicIcon name="bulb-outline" size={20} color="#10b981" /> Dicas de Debugging
1. <IonicIcon name="footsteps-outline" size={16} color="#6b7280" /> **Execute step by step** para identificar problemas
2. <IonicIcon name="search-outline" size={16} color="#6b7280" /> **Verifique os dados** em cada node
3. <IonicIcon name="terminal-outline" size={16} color="#6b7280" /> **Use console.log** em expressões JavaScript
4. <IonicIcon name="shield-checkmark-outline" size={16} color="#6b7280" /> **Teste credenciais** separadamente

## <IonicIcon name="arrow-forward-circle-outline" size={24} color="#ea4b71" /> Próximos Passos

Agora que você entende os conceitos básicos, está pronto para:

1. <IonicIcon name="create-outline" size={16} color="#6b7280" /> **[Criar seu primeiro workflow](./primeiro-workflow)**
2. <IonicIcon name="extension-puzzle-outline" size={16} color="#6b7280" /> **[Explorar integrações disponíveis](../integracoes/http-request)**
3. <IonicIcon name="flash-outline" size={16} color="#6b7280" /> **[Configurar triggers](../workflows/triggers)**
4. <IonicIcon name="rocket-outline" size={16} color="#6b7280" /> **[Aprender sobre deployment](../deployment/docker/introducao)**

:::tip Dica Pro
Comece sempre com workflows simples e vá aumentando a complexidade gradualmente. O n8n é muito poderoso, mas é melhor dominar o básico primeiro!
:::

---

**Próximo:** [Primeiro Workflow](./primeiro-workflow) → 