---
title: Primeiro Workflow
description: Guia passo a passo para criar seu primeiro workflow no n8n, desde a instalação até a primeira automação
sidebar_position: 1
keywords: [n8n, primeiro, workflow, tutorial, guia, automação, iniciante]
---

# <ion-icon name="play-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Primeiro Workflow

Este guia te levará do zero ao seu primeiro workflow funcional no n8n. Vamos criar uma automação simples que demonstra os conceitos fundamentais da plataforma.

## Pré-requisitos

Antes de começar, certifique-se de que você tem:

- **n8n instalado** e funcionando
- **Acesso à interface web** do n8n
- **Conhecimento básico** de conceitos de automação
- **Dados de exemplo** para testar

## Passo 1: Acessar o n8n

### 1.1 Abrir o n8n

1. **Abra seu navegador** e acesse o n8n
2. **Faça login** com suas credenciais
3. **Clique em "New Workflow"** no menu lateral
4. **Dê um nome** ao seu workflow (ex: "Meu Primeiro Workflow")

### 1.2 Interface Básica

A interface do n8n é dividida em:

- **Menu lateral**: Navegação e configurações
- **Área de trabalho**: Onde você constrói workflows
- **Painel de propriedades**: Configurações dos nodes
- **Barra de ferramentas**: Ações e execução

## Passo 2: Criar um Trigger

### 2.1 Adicionar Manual Trigger

1. **Clique no botão "+"** na área de trabalho
2. **Procure por "Manual"** na lista de nodes
3. **Selecione "Manual Trigger"**
4. **Arraste para a área** de trabalho

### 2.2 Configurar o Trigger

1. **Clique no node** Manual Trigger
2. **No painel de propriedades**, configure:
   - **Name**: "Início"
   - **Description**: "Inicia o workflow manualmente"
3. **Clique em "Save"**

## Passo 3: Adicionar um Node de Processamento

### 3.1 Adicionar Set Node

1. **Clique no "+"** ao lado do Manual Trigger
2. **Procure por "Set"** na lista
3. **Selecione "Set"**
4. **Conecte** ao Manual Trigger

### 3.2 Configurar o Set Node

1. **Clique no node Set**
2. **Configure as propriedades**:

```javascript
// Adicionar campo "mensagem"
{
  "mensagem": "Olá, este é meu primeiro workflow!"
}

// Adicionar campo "data_criacao"
{
  "data_criacao": "{{ $now.toFormat('yyyy-MM-dd HH:mm:ss') }}"
}

// Adicionar campo "usuario"
{
  "usuario": "Desenvolvedor n8n"
}
```

3. **Clique em "Save"**

## Passo 4: Adicionar Saída

### 4.1 Adicionar Debug Helper

1. **Clique no "+"** ao lado do Set node
2. **Procure por "Debug"**
3. **Selecione "Debug Helper"**
4. **Conecte** ao Set node

### 4.2 Configurar Debug Helper

1. **Clique no node Debug Helper**
2. **Configure**:
   - **Name**: "Resultado"
   - **Description**: "Mostra o resultado do processamento"
3. **Clique em "Save"**

## Passo 5: Testar o Workflow

### 5.1 Executar o Workflow

1. **Clique em "Execute Workflow"** na barra de ferramentas
2. **Aguarde** a execução
3. **Verifique** os resultados no Debug Helper

### 5.2 Verificar Resultados

No Debug Helper, você deve ver:

```json
{
  "mensagem": "Olá, este é meu primeiro workflow!",
  "data_criacao": "2024-01-15 14:30:25",
  "usuario": "Desenvolvedor n8n"
}
```

## Passo 6: Salvar e Ativar

### 6.1 Salvar o Workflow

1. **Clique em "Save"** na barra de ferramentas
2. **Digite um nome** para o workflow
3. **Clique em "Save"**

### 6.2 Ativar o Workflow

1. **Clique no toggle** "Active" na barra de ferramentas
2. **Confirme** a ativação
3. **O workflow** agora está ativo e pode ser executado

## Exemplo Prático: Workflow de Notificação

Vamos criar um workflow mais prático que envia uma notificação.

### Estrutura do Workflow

```
Manual Trigger → Set → HTTP Request → Debug Helper
```

### Configuração Detalhada

#### 1. Manual Trigger
- **Name**: "Iniciar Notificação"
- **Description**: "Inicia o processo de notificação"

#### 2. Set Node
```javascript
{
  "titulo": "Notificação do n8n",
  "mensagem": "Este é um teste do meu primeiro workflow!",
  "timestamp": "{{ $now.toISOString() }}",
  "usuario": "Desenvolvedor"
}
```

#### 3. HTTP Request (Webhook)
- **Method**: POST
- **URL**: `https://webhook.site/seu-webhook-id`
- **Headers**: 
  ```json
  {
    "Content-Type": "application/json"
  }
  ```
- **Body**: 
  ```json
  {
    "titulo": "{{ $json.titulo }}",
    "mensagem": "{{ $json.mensagem }}",
    "timestamp": "{{ $json.timestamp }}",
    "usuario": "{{ $json.usuario }}"
  }
  ```

#### 4. Debug Helper
- **Name**: "Resultado"
- **Description**: "Mostra o resultado da notificação"

## Conceitos Fundamentais

### 1. Nodes

**Nodes** são os blocos de construção dos workflows:

- **Trigger Nodes**: Iniciam workflows
- **Regular Nodes**: Processam dados
- **Output Nodes**: Geram resultados

### 2. Connections

**Connections** ligam os nodes:

- **Dados fluem** de um node para outro
- **Cada node** recebe dados do anterior
- **Dados são processados** em sequência

### 3. Data Flow

**O fluxo de dados** funciona assim:

1. **Trigger** inicia o workflow
2. **Dados** são passados para o próximo node
3. **Cada node** processa os dados
4. **Resultado** é passado adiante

### 4. Expressions

**Expressions** permitem usar dados dinâmicos:

```javascript
// Usar dados do node anterior
{{ $json.campo }}

// Usar data/hora atual
{{ $now.toISOString() }}

// Usar dados de nodes específicos
{{ $('Nome do Node').json.campo }}
```

## Próximos Passos

### 1. Explorar Mais Nodes

Experimente outros nodes:

- **HTTP Request**: Fazer chamadas para APIs
- **Code**: Executar código JavaScript
- **If**: Criar condições
- **Switch**: Múltiplas condições
- **Merge**: Combinar dados

### 2. Criar Workflows Mais Complexos

Tente criar workflows que:

- **Processem dados** de APIs
- **Enviem emails** automaticamente
- **Salvem dados** em planilhas
- **Notifiquem** sobre eventos

### 3. Usar Templates

Explore templates prontos:

1. **Vá para "Templates"** no menu lateral
2. **Procure** por templates interessantes
3. **Importe** e adapte para suas necessidades
4. **Estude** como funcionam

## Troubleshooting

### Problemas Comuns

#### Workflow não executa
- Verifique se está ativo
- Confirme se todos os nodes estão conectados
- Verifique se há erros de configuração
- Monitore os logs de execução

#### Dados não aparecem
- Use o Debug Helper para inspecionar dados
- Verifique se os campos estão configurados corretamente
- Confirme se as expressões estão corretas
- Teste com dados de exemplo

#### Node não funciona
- Verifique a configuração do node
- Confirme se as credenciais estão corretas
- Teste com dados simples
- Consulte a documentação do node

### Debug

1. **Use o Debug Helper** frequentemente
2. **Configure logging** detalhado
3. **Teste nodes** individualmente
4. **Monitore execuções**
5. **Verifique logs** de erro

## Boas Práticas

### 1. Nomenclatura

- **Use nomes descritivos** para workflows
- **Nomeie nodes** de forma clara
- **Documente** o propósito de cada node
- **Mantenha** consistência na nomenclatura

### 2. Organização

- **Agrupe nodes** relacionados
- **Use comentários** para explicar lógica
- **Mantenha workflows** organizados
- **Evite workflows** muito complexos

### 3. Teste

- **Teste frequentemente** durante o desenvolvimento
- **Use dados de exemplo** realistas
- **Valide resultados** esperados
- **Configure alertas** para falhas

## Recursos Adicionais

### 1. Documentação

- **Guia oficial**: [docs.n8n.io](https://docs.n8n.io)
- **Exemplos**: Templates e casos de uso
- **Comunidade**: Fóruns e grupos
- **Vídeos**: Tutoriais em vídeo

### 2. Comunidade

- **Fórum oficial**: [community.n8n.io](https://community.n8n.io)
- **GitHub**: Issues e discussões
- **Discord**: Chat em tempo real
- **Redes sociais**: Twitter, LinkedIn

### 3. Templates

- **Marketplace**: Templates oficiais
- **Comunidade**: Templates compartilhados
- **GitHub**: Repositórios de templates
- **Blogs**: Templates em artigos

## Conclusão

Parabéns! Você criou seu primeiro workflow no n8n. Agora você tem uma base sólida para:

- **Criar workflows** mais complexos
- **Automatizar processos** do dia a dia
- **Integrar sistemas** diferentes
- **Melhorar produtividade** com automação

Continue explorando, experimentando e aprendendo. O n8n oferece infinitas possibilidades de automação!

## Próximos Passos

- [Conceitos Básicos](/primeiros-passos/conceitos-basicos.md) - Entender fundamentos
- [Conectar Aplicações](/primeiros-passos/conectar-aplicacoes.md) - Integrar sistemas
- [Expressões n8n](/logica-e-dados/expressoes.md) - Usar dados dinâmicos
- [Templates](/integracoes/templates.md) - Usar templates prontos
- [Casos de Uso](/catalogo/index.md) - Ver exemplos práticos
