---
sidebar_position: 10
title: Recursos do Markdown
description: Demonstração completa dos recursos de Markdown no Docusaurus
keywords: [markdown, docusaurus, recursos, formatação]
---

# Recursos do Markdown

Esta página demonstra os recursos de Markdown disponíveis no Docusaurus.

## Formatação Básica

### Texto

**Texto em negrito** e *texto em itálico* e ***negrito e itálico***.

~~Texto riscado~~ e `código inline`.

### Links

[Link externo](https://n8n.io) e [link interno](./intro).

### Listas

#### Lista não ordenada:
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
- Item 3

#### Lista ordenada:
1. Primeiro item
2. Segundo item
   1. Subitem numerado
   2. Outro subitem
3. Terceiro item

#### Lista de tarefas:
- [x] Tarefa concluída
- [ ] Tarefa pendente
- [ ] Outra tarefa pendente

## Blocos de Código

### Código inline
Use `npm install` para instalar pacotes.

### Blocos de código com destaque de sintaxe

```javascript title="exemplo.js"
// Exemplo de código JavaScript
const n8n = require('n8n');

function criarWorkflow() {
  const workflow = {
    nodes: [
      {
        name: 'Start',
        type: 'n8n-nodes-base.start',
        position: [250, 300]
      }
    ]
  };
  
  return workflow;
}

console.log(criarWorkflow());
```

```python title="exemplo.py"
# Exemplo de código Python
import requests

def fazer_requisicao():
    """Função para fazer requisição HTTP"""
    url = "https://api.exemplo.com/dados"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Erro na requisição: {e}")
        return None

# Chamar a função
dados = fazer_requisicao()
print(dados)
```

## Admonições

### Tipos básicos

:::note Nota
Esta é uma nota informativa.
:::

:::tip Dica
Esta é uma dica útil!
:::

:::info Informação
Esta é uma informação importante.
:::

:::warning Atenção
Esta é uma mensagem de aviso.
:::

:::danger Perigo
Esta é uma mensagem de perigo.
:::

## Citações

> Esta é uma citação simples.

> Esta é uma citação longa que pode ter múltiplas linhas
> e continua aqui. Muito útil para destacar informações
> importantes ou citações de outras fontes.
>
> — Autor da Citação

## Tabelas

| Nó | Tipo | Descrição | Exemplo |
|---------|------|-----------|---------|
| HTTP Request | Ação | Faz requisições HTTP | GET /api/users |
| Set | Dados | Define valores | Manipular dados |
| IF | Lógica | Condições | Fluxo condicional |
| Switch | Lógica | Múltiplas condições | Baseado em valores |

### Tabela com alinhamento

| Esquerda | Centro | Direita |
|:---------|:------:|--------:|
| Texto | Centralizado | 100 |
| Mais texto | Também centro | 200 |
| Último | Final | 300 |

## Detalhes Expansíveis

<details>
<summary>Clique para expandir detalhes</summary>

Este é o conteúdo dentro do bloco de detalhes. Você pode colocar:

- Listas
- **Texto formatado**
- `Código`

```javascript
// Até mesmo blocos de código
console.log("Conteúdo oculto revelado!");
```

</details>

## Emojis

Você pode usar emojis: 🎉 🚀 💡 ⚠️ 🔧 📚

## Separadores

Use três traços `---` para criar separadores horizontais.

---

## Exemplo de Workflow n8n

```json
{
  "name": "Exemplo de Workflow",
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300],
      "parameters": {
        "httpMethod": "POST",
        "path": "meu-webhook"
      }
    },
    {
      "name": "Set",
      "type": "n8n-nodes-base.set",
      "typeVersion": 1,
      "position": [450, 300],
      "parameters": {
        "values": {
          "string": [
            {
              "name": "processedAt",
              "value": "={{ new Date().toISOString() }}"
            }
          ]
        }
      }
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Set",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

---

Esta demonstração cobre os principais recursos de Markdown disponíveis no Docusaurus. Para mais informações, consulte a [documentação oficial do Docusaurus](https://docusaurus.io/docs/markdown-features). 