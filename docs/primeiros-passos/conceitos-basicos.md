---
title: Conceitos Básicos
description: Fundamentos essenciais para entender e usar o n8n, incluindo workflows, nodes, triggers e automação
sidebar_position: 1
keywords: [n8n, conceitos, básicos, fundamentos, workflows, nodes, triggers, automação]
---

# <ion-icon name="library-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conceitos Básicos

Esta página complementa a seção de **[Conceitos Fundamentais](./conceitos-fundamentais)** com informações adicionais e exemplos práticos para iniciantes.

:::tip **Antes de continuar**
Recomendamos ler primeiro a seção **[Conceitos Fundamentais](./conceitos-fundamentais)** para entender os conceitos básicos do n8n.
:::

## Workflows

### O que é um Workflow?

Um **workflow** é uma sequência de ações automatizadas que processam dados de uma forma específica. É como uma receita que o n8n segue para realizar uma tarefa.

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

## Nodes

### O que são Nodes?

**Nodes** são os blocos de construção dos workflows. Cada node tem uma função específica e processa dados de uma forma particular.

### Tipos de Nodes

#### 1. Trigger Nodes
**Iniciam** workflows automaticamente:

- **Manual Trigger**: Execução manual
- **Schedule Trigger**: Execução programada
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

## Triggers

### O que são Triggers?

Para uma explicação completa de triggers, **[consulte nossa seção de Conceitos Fundamentais](./conceitos-fundamentais)**. Em resumo, **Triggers** são nodes especiais que iniciam workflows. Eles "disparam" a execução baseado em eventos ou condições.

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

## Data Flow

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

### Acesso a Dados

Use **expressions** para acessar dados:

```javascript
// Dados do item atual
{{ $json.nome }}

// Dados de nodes anteriores
{{ $('Node Anterior').json.campo }}

// Dados de múltiplos nodes
{{ $('Node A').json.valor + $('Node B').json.valor }}
```

## Expressions

### O que são Expressions?

**Expressions** são fórmulas que permitem usar dados dinâmicos e fazer cálculos no n8n.

### Tipos de Expressions

#### 1. Acesso a Dados
```javascript
// Dados do item atual
{{ $json.campo }}

// Dados de nodes específicos
{{ $('Nome do Node').json.campo }}

// Dados de todos os items
{{ $input.all() }}
```

#### 2. Funções de Data/Hora
```javascript
// Data atual
{{ $now.toISOString() }}

// Data formatada
{{ $now.toFormat('dd/MM/yyyy HH:mm') }}

// Data calculada
{{ $now.minus({ days: 7 }).toISOString() }}
```

#### 3. Manipulação de Texto
```javascript
// Concatenar strings
{{ $json.nome + ' ' + $json.sobrenome }}

// Converter para maiúsculo
{{ $json.texto.toUpperCase() }}

// Substituir texto
{{ $json.texto.replace('antigo', 'novo') }}
```

#### 4. Cálculos Matemáticos
```javascript
// Soma
{{ $json.valor1 + $json.valor2 }}

// Multiplicação
{{ $json.quantidade * $json.preco }}

// Porcentagem
{{ ($json.valor * 10) / 100 }}
```

## Connections

### O que são Connections?

**Connections** são as linhas que ligam os nodes, definindo como os dados fluem através do workflow.

### Tipos de Connections

#### 1. Connection Simples
- **Um node** para **um node**
- **Fluxo linear** de dados
- **Processamento sequencial**

#### 2. Connection Condicional
- **Múltiplos caminhos** baseados em condições
- **Decisões** no workflow
- **Processamento paralelo**

#### 3. Connection de Merge
- **Múltiplos inputs** para **um output**
- **Consolidação** de dados
- **Sincronização** de fluxos

### Configuração de Connections

```javascript
// Exemplo: Connection com condição
{
  "condition": "{{ $json.valor > 100 }}",
  "source": "Node A",
  "target": "Node B"
}
```

## Execução de Workflows

Para uma explicação completa de execuções, **[consulte nossa seção de Conceitos Fundamentais](./conceitos-fundamentais)**. Em resumo:

### Como os Workflows Executam

1. **Trigger** é ativado
2. **Dados** são coletados
3. **Nodes** processam sequencialmente
4. **Resultado** é gerado
5. **Log** é registrado

### Estados de Execução

- **Running**: Em execução
- **Completed**: Concluído com sucesso
- **Failed**: Falhou
- **Waiting**: Aguardando trigger

### Monitoramento

- **Execution History**: Histórico de execuções
- **Logs**: Detalhes de cada execução
- **Metrics**: Estatísticas de performance
- **Alerts**: Notificações de problemas

## Credenciais

### O que são Credenciais?

**Credenciais** são informações de autenticação armazenadas de forma segura no n8n para conectar com APIs e serviços externos.

### Tipos de Credenciais

#### 1. API Keys
```javascript
{
  "apiKey": "sua-chave-api-aqui"
}
```

#### 2. OAuth2
```javascript
{
  "clientId": "seu-client-id",
  "clientSecret": "seu-client-secret",
  "accessToken": "token-de-acesso"
}
```

#### 3. Basic Auth
```javascript
{
  "username": "seu-usuario",
  "password": "sua-senha"
}
```

### Segurança

- **Criptografia**: Credenciais são criptografadas
- **Acesso controlado**: Apenas usuários autorizados
- **Auditoria**: Logs de acesso às credenciais
- **Rotação**: Troca periódica de credenciais

## Templates

### O que são Templates?

**Templates** são workflows pré-configurados que podem ser importados e adaptados para suas necessidades.

### Benefícios dos Templates

- **Acelerar desenvolvimento**: Comece com base sólida
- **Aprender boas práticas**: Veja como outros resolvem problemas
- **Reduzir erros**: Use soluções testadas
- **Padronizar processos**: Mantenha consistência

### Como Usar Templates

1. **Navegue** para a seção Templates
2. **Procure** por template adequado
3. **Importe** o template
4. **Configure** credenciais
5. **Adapte** para suas necessidades
6. **Teste** e ative

## Boas Práticas

### 1. Nomenclatura

- **Use nomes descritivos** para workflows e nodes
- **Mantenha consistência** na nomenclatura
- **Documente** o propósito de cada elemento
- **Evite nomes genéricos** como "Node 1", "Node 2"

### 2. Organização

- **Agrupe nodes** relacionados
- **Use comentários** para explicar lógica
- **Mantenha workflows** organizados
- **Evite workflows** muito complexos

### 3. Performance

- **Otimize consultas** de API
- **Use cache** quando possível
- **Processe em lotes** para grandes volumes
- **Monitore** tempo de execução

### 4. Segurança

- **Proteja credenciais** adequadamente
- **Valide dados** de entrada
- **Implemente autenticação** quando necessário
- **Monitore** acesso e uso

### 5. Manutenção

- **Teste regularmente** workflows
- **Mantenha documentação** atualizada
- **Configure alertas** para problemas
- **Faça backup** de workflows importantes

## Troubleshooting

### Problemas Comuns

#### Workflow não executa
- Verifique se está ativo
- Confirme se trigger está configurado
- Verifique logs de erro
- Teste com dados simples

#### Dados não aparecem
- Use Debug Helper para inspecionar dados
- Verifique configuração de nodes
- Confirme se expressões estão corretas
- Teste com dados de exemplo

#### Node não funciona
- Verifique configuração do node
- Confirme se credenciais estão corretas
- Teste com dados simples
- Consulte documentação do node

### Debug

1. **Use Debug Helper** frequentemente
2. **Configure logging** detalhado
3. **Teste nodes** individualmente
4. **Monitore execuções**
5. **Verifique logs** de erro

## Próximos Passos

Agora que você entende os conceitos básicos:

1. **[Primeiro Workflow](/primeiros-passos/primeiro-workflow)** - Criar seu primeiro workflow
2. **[Expressões n8n](/logica-e-dados/expressoes)** - Aprender expressões avançadas
3. **[HTTP Request](/integracoes/builtin-nodes/http-requests/http-request)** - Fazer chamadas para APIs
4. **[Templates](/integracoes/templates)** - Usar templates prontos
5. **[Casos de Uso](/catalogo/index)** - Ver exemplos práticos

## Recursos Adicionais

### Documentação
- **Guia oficial**: [docs.n8n.io](https://docs.n8n.io)
- **Exemplos**: Templates e casos de uso
- **API Reference**: Documentação da API

### Comunidade
- **Fórum**: [community.n8n.io](https://community.n8n.io)
- **GitHub**: Issues e discussões
- **Discord**: Chat em tempo real

### Aprendizado
- **Vídeos**: Tutoriais em vídeo
- **Blog**: Artigos e dicas
- **Webinars**: Sessões ao vivo

---

Com esses conceitos básicos, você está pronto para começar a criar workflows no n8n. Lembre-se: a prática é a melhor forma de aprender. Experimente, teste e explore as possibilidades!
