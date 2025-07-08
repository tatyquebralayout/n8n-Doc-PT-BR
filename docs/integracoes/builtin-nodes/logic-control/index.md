---
sidebar_position: 1
title: Nodes de Lógica e Controle
description: Guia prático dos nodes nativos de lógica condicional, controle de fluxo, splitting, merging, looping e tratamento de erros no n8n
keywords: [n8n, lógica, controle, condicional, fluxo, if, switch, merge, loop, erro]
---

import IonicIcon from '@site/src/components/IonicIcon';
import Admonition from '@theme/Admonition';

# <IonicIcon name="git-branch-outline" size={32} color="#ea4b71" /> Nodes de Lógica e Controle

Os nodes de lógica e controle do n8n permitem criar **workflows inteligentes, adaptativos e robustos**. Com eles, você implementa decisões condicionais, múltiplos caminhos, loops, tratamento de erros e junção de dados, tornando suas automações muito mais poderosas.

## <IonicIcon name="school-outline" size={24} color="#ea4b71" /> O que você vai encontrar aqui

- **[Splitting: Ramificação Condicional](../../../logica-e-dados/01-flow-logic/splitting)**
- **[Node IF: Decisão Binária](#node-if)**
- **[Node Switch: Decisão Multicondicional](#node-switch)**
- **[Node Merge: Reunindo Ramificações](#node-merge)**
- **[Looping: Repetição e Processamento em Lote](../../../logica-e-dados/01-flow-logic/looping)**
- **[Tratamento de Erros](../../../logica-e-dados/01-flow-logic/error-handling)**
- **Boas práticas, debugging e troubleshooting**
- **Casos de uso reais**

---

## <IonicIcon name="git-compare-outline" size={24} color="#ea4b71" /> Visão Geral dos Nodes

| Node         | Finalidade                  | Saídas         | Quando usar?                  |
|--------------|-----------------------------|----------------|-------------------------------|
| [IF](#node-if)      | Decisão binária (Sim/Não)      | true, false    | Separar fluxo em dois caminhos |
| [Switch](#node-switch)  | Decisão múltipla (casos)        | 1 por regra    | Vários caminhos possíveis      |
| [Merge](#node-merge)   | Reunir ramificações             | 1              | Consolidar dados/fluxos        |
| [Looping](../../../logica-e-dados/01-flow-logic/looping)   | Repetição/processamento em lote | -              | Iterar sobre listas/arrays      |

---

## <IonicIcon name="git-branch-outline" size={24} color="#ea4b71" /> Splitting: Ramificação Condicional

Crie pontos de decisão no seu workflow para que cada item siga o caminho adequado, usando **IF** e **Switch**. Veja o guia completo:

- [Splitting: Como ramificar fluxos e criar lógica condicional →](../../../logica-e-dados/01-flow-logic/splitting)

---

## <IonicIcon name="help-circle-outline" size={20} color="#10b981" /> Node IF: Decisão Binária {#node-if}

Use o node IF para separar o fluxo em dois caminhos (Sim/Não, Verdadeiro/Falso).

**Exemplo:**
> Se o valor do pedido for maior que R$ 1000, envie para aprovação manual. Caso contrário, processe automaticamente.

```mermaid
graph TD
    A[Pedido Recebido] --> B{Valor > R$ 1000?}
    B -->|Sim| C[Aprovação Manual]
    B -->|Não| D[Processamento Automático]
```

- [Guia detalhado: Splitting e IF →](../../../logica-e-dados/01-flow-logic/splitting)
- [Documentação oficial IF Node (EN)](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.if/)

---

## <IonicIcon name="options-outline" size={20} color="#10b981" /> Node Switch: Decisão Multicondicional {#node-switch}

O node Switch permite criar múltiplos caminhos baseados em diferentes valores ou regras.

**Exemplo:**
> Classifique leads por origem: Google Ads → Marketing Pago, Redes Sociais → Social Media, Website → Vendas Inbound, Indicação → Relacionamento.

```mermaid
graph TD
    A[Lead Recebido] --> B{Origem do Lead}
    B -->|Google Ads| C[Marketing Pago]
    B -->|Redes Sociais| D[Social Media]
    B -->|Website| E[Vendas Inbound]
    B -->|Indicação| F[Relacionamento]
    B -->|Outros| G[Triagem Geral]
```

- [Guia detalhado: Splitting e Switch →](../../../logica-e-dados/01-flow-logic/splitting)
- [Documentação oficial Switch Node (EN)](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.switch/)

---

## <IonicIcon name="git-merge-outline" size={20} color="#10b981" /> Node Merge: Reunindo Ramificações {#node-merge}

Após ramificar o fluxo, use o node Merge para reunir os caminhos e consolidar dados.

**Exemplo:**
> Após diferentes aprovações (financeiro, RH, diretoria), reúna todos os resultados para uma ação final.

```mermaid
graph TD
    A[Financeiro] --> D[Merge]
    B[RH] --> D
    C[Diretoria] --> D
    D --> E[Processo Final]
```

- [Guia detalhado: Merge →](../../../logica-e-dados/01-flow-logic/merging)
- [Documentação oficial Merge Node (EN)](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.merge/)

---

## <IonicIcon name="refresh-outline" size={20} color="#10b981" /> Looping: Repetição e Processamento em Lote

Implemente loops para processar arrays, repetir ações e criar automações dinâmicas:
- [Guia de Looping →](../../../logica-e-dados/01-flow-logic/looping)

---

## <IonicIcon name="warning-outline" size={20} color="#ea4b71" /> Tratamento de Erros

Garanta workflows resilientes com nodes de tratamento de erro, retry automático e notificações:
- [Guia de Tratamento de Erros →](../../../logica-e-dados/01-flow-logic/error-handling)

---

## <IonicIcon name="bulb-outline" size={20} color="#10b981" /> Boas Práticas e Troubleshooting

- Use **Always Output Data** em IF/Switch para garantir merges corretos
- Nomeie nodes e caminhos de forma clara
- Teste expressões no editor antes de usar
- Use [Debug Helper](/integracoes/builtin-nodes/core-nodes/debug-helper) e Execution History para depuração
- Consulte [Splitting: Troubleshooting e dicas](../../../logica-e-dados/01-flow-logic/splitting#troubleshooting-problemas-comuns)

---

## <IonicIcon name="storefront-outline" size={20} color="#10b981" /> Exemplos e Casos de Uso

- E-commerce: Processamento de pedidos por tipo de pagamento
- Marketing: Segmentação de leads
- Aprovação de férias: múltiplas regras e sub-workflows
- Workflows paralelos com Merge

Veja exemplos completos em:
- [Splitting: Casos de uso e exemplos práticos →](../../../logica-e-dados/01-flow-logic/splitting#casos-de-uso-comuns)
- [Catálogo de Workflows](/catalogo)

---

<Admonition type="info" title="Recursos Oficiais e Comunidade">
- [Documentação oficial n8n](https://docs.n8n.io/)
- [Exemplos de Workflows](https://n8n.io/workflows)
- [Fórum da Comunidade](https://community.n8n.io/)
</Admonition> 
