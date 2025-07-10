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

## <ion-icon name="pin-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Data Pinning

**Data Pinning** permite congelar temporariamente os dados de saída de um node durante o desenvolvimento do workflow. Isso é útil para trabalhar com dados previsíveis sem fazer requisições repetidas a serviços externos.

### Quando Usar

- **Desenvolvimento**: Para testar workflows com dados consistentes
- **Debugging**: Para isolar problemas em nodes específicos
- **Testes**: Para validar lógica sem depender de APIs externas

### Como Funciona

Quando você "pina" os dados de um node, o n8n usa esses dados fixos em vez de fazer uma nova requisição. Em produção, os dados pinados são ignorados e o node faz requisições normais.

**Para aprender mais:** [Data Pinning](../logica-e-dados/data/data-pinning)

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Node Settings

Cada node possui configurações avançadas que controlam seu comportamento durante a execução.

### Configurações Principais

- **Retry On Fail**: Tenta executar novamente em caso de falha
- **Timeout**: Define tempo limite para requisições
- **Execute Once**: Processa apenas o primeiro item
- **Always Output Data**: Sempre retorna dados, mesmo vazios

### Controles de Erro

- **Stop Workflow**: Para a execução em caso de erro
- **Continue**: Continua para o próximo node
- **Continue (using error output)**: Passa informações de erro adiante

**Para aprender mais:** [Configurações de Nodes](../integracoes/builtin-nodes/core-nodes/)

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Error Handling

O tratamento de erros é fundamental para workflows robustos e confiáveis.

### Tipos de Erro

- **Node Errors**: Falhas em nodes específicos
- **Connection Errors**: Problemas de conectividade
- **Data Errors**: Dados inválidos ou malformados
- **Timeout Errors**: Requisições que excedem o tempo limite

### Estratégias de Tratamento

- **Error Trigger**: Executa workflows específicos quando há erro
- **Retry Logic**: Tenta novamente automaticamente
- **Fallback Paths**: Caminhos alternativos em caso de falha
- **Error Logging**: Registra erros para análise posterior

**Para aprender mais:** [Tratamento de Erros](../logica-e-dados/01-flow-logic/error-handling)

## <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Subworkflows

**Subworkflows** são workflows que podem ser executados dentro de outros workflows, permitindo modularização e reutilização de código.

### Benefícios

- **Modularização**: Quebra workflows complexos em partes menores
- **Reutilização**: Usa o mesmo workflow em múltiplos lugares
- **Manutenção**: Facilita atualizações e correções
- **Organização**: Melhora a estrutura e legibilidade

### Como Funciona

Um workflow principal pode chamar um subworkflow usando o node "Execute Workflow", passando dados como entrada e recebendo o resultado como saída.

**Para aprender mais:** [Subworkflows](../logica-e-dados/01-flow-logic/subworkflows)

## <ion-icon name="swap-horizontal-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Data Transformation

A transformação de dados permite modificar, filtrar e organizar informações conforme necessário.

### Operações Comuns

- **Aggregate**: Agrupa itens relacionados
- **Filter**: Remove itens que não atendem critérios
- **Sort**: Organiza dados em ordem específica
- **Split**: Divide itens em múltiplos
- **Merge**: Combina dados de diferentes fontes

### Nodes de Transformação

- **Set**: Define ou modifica campos
- **Remove Duplicates**: Remove itens duplicados
- **Limit**: Limita o número de itens
- **Code**: Transformação personalizada com JavaScript

**Para aprender mais:** [Transformação de Dados](../logica-e-dados/data/transformacoes-dados)

## <ion-icon name="library-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Templates

**Templates** são workflows pré-construídos que você pode importar e personalizar para suas necessidades.

### Tipos de Templates

- **Oficiais**: Criados pela equipe n8n
- **Comunitários**: Compartilhados pela comunidade
- **Personalizados**: Templates que você cria e compartilha

### Benefícios

- **Início Rápido**: Comece com workflows funcionais
- **Aprendizado**: Veja como outros resolvem problemas
- **Produtividade**: Economize tempo de desenvolvimento
- **Inspiração**: Descubra novas possibilidades

### Como Usar

1. **Importe** um template do marketplace
2. **Configure** credenciais necessárias
3. **Personalize** para suas necessidades
4. **Teste** e ajuste conforme necessário

**Para aprender mais:** [Templates](../integracoes/templates)

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
