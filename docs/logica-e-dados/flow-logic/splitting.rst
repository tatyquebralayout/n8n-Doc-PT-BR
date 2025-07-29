.. _splitting-workflow:

Splitting de Workflows: Criando Lógica Condicional no n8n
=========================================================

.. meta::
   :description: Como dividir e distribuir dados em workflows n8n usando conditionals
   :keywords: n8n, split, dividir, dados, distribuição, conditionals, if, switch, ramificação

.. contents:: Índice
   :local:
   :depth: 2

.. _splitting-overview:

Visão Geral
-----------

O **splitting** (ramificação condicional) é uma técnica fundamental no n8n que permite criar workflows inteligentes com múltiplos caminhos de execução baseados em condições específicas.

.. note::
   **Objetivos de Aprendizado:**
   
   1. Definir o que é *splitting* (ramificação condicional) no n8n
   2. Identificar por que e quando aplicar essa técnica
   3. Conhecer os nós essenciais – **IF**, **Switch** e **Merge** – e suas configurações críticas
   4. Construir um fluxo multi‑ramo, passo a passo, a partir de um fluxo linear
   5. Controlar a ordem de execução, paralelismo e a opção **Always Output Data**
   6. Aplicar boas práticas e evitar armadilhas comuns em ambientes de produção

.. _splitting-concept:

Entendendo o Conceito de Splitting
----------------------------------

.. tip::
   **Analogia Prática:**
   
   Splitting em workflows é como criar um **ponto de decisão** em um processo automatizado. Imagine que você é um gerente de atendimento ao cliente que precisa distribuir tickets de suporte: tickets simples vão para o nível 1, problemas técnicos vão para especialistas, e reclamações urgentes vão direto para supervisores.
   
   **No n8n, splitting funciona exatamente assim** - você cria pontos onde o workflow "decide" qual caminho seguir baseado em condições específicas.

O que é Splitting de Workflow?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

No n8n, um :ref:`workflow <primeiro-workflow>` percorre naturalmente um **único caminho sequencial**. *Splitting* transforma esse caminho em **ramificações paralelas**: cada item é avaliado por um nó condicional (:ref:`IF <if-node>` ou :ref:`Switch <switch-node>`) e roteado ao ramo que corresponde aos seus dados.

.. warning::
   **Importante: Não confunda com Split Out**
   
   **Splitting** ≠ **Split Out**
   
   - **Split Out**: Quebra uma lista em itens individuais para :ref:`processamento em loop <looping>`
   - **Splitting condicional**: Mantém o item intacto e decide *qual* caminho ele seguirá

.. graphviz::
   
   digraph splitting_comparison {
       rankdir=LR;
       node [shape=box, style=filled];
       
       A [label="Lista de Itens", fillcolor="#e1f5fe"];
       B [label="Tipo de Processamento", fillcolor="#ffebee"];
       C [label="Quebrar em Itens Individuais", fillcolor="#fff3e0"];
       D [label="Rotear Item por Condição", fillcolor="#e8f5e8"];
       E [label="Item 1", fillcolor="#f3e5f5"];
       F [label="Item 2", fillcolor="#f3e5f5"];
       G [label="Item 3", fillcolor="#f3e5f5"];
       H [label="Caminho A", fillcolor="#e8f5e8"];
       I [label="Caminho B", fillcolor="#e8f5e8"];
       
       A -> B;
       B -> C [label="Split Out"];
       B -> D [label="Splitting Condicional"];
       C -> E;
       C -> F;
       C -> G;
       D -> H;
       D -> I;
   }

.. _splitting-benefits:

Por que e quando usar Splitting?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table:: Benefícios do Splitting por Situação
   :header-rows: 1
   :name: splitting-benefits-table

   * - **Situação**
     - **Benefício do Splitting**
   * - Filas de suporte com múltiplos SLAs
     - Priorização automática conforme urgência e plano
   * - Campanhas de marketing multilíngues
     - Mensagens corretas por país ou segmento sem scripts extras
   * - Processamento de pagamentos
     - Diferenciar rotas de antifraude para valores altos ou clientes novos
   * - Aprovações corporativas
     - Automação de fluxos de aprovação baseados em valor e categoria
   * - Triagem de leads
     - Distribuição automática para equipes especializadas

.. _splitting-comparison:

Comparação: Antes vs Depois
~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Workflow Linear**

.. graphviz::
   
   digraph linear_workflow {
       rankdir=LR;
       node [shape=box, style=filled];
       
       A [label="Entrada", fillcolor="#e1f5fe"];
       B [label="Processamento", fillcolor="#f3e5f5"];
       C [label="Saída", fillcolor="#e8f5e8"];
       
       A -> B -> C;
   }

**Limitações:**

- Todos os itens seguem o mesmo caminho
- Não há personalização baseada em dados
- Processamento uniforme para todos os casos

**Workflow com Splitting**

.. graphviz::
   
   digraph splitting_workflow {
       rankdir=LR;
       node [shape=box, style=filled];
       
       A [label="Entrada", fillcolor="#e1f5fe"];
       B [label="Condição", fillcolor="#ffebee"];
       C [label="Processamento A", fillcolor="#fff3e0"];
       D [label="Processamento B", fillcolor="#e8f5e8"];
       E [label="Merge", fillcolor="#fce4ec"];
       F [label="Saída", fillcolor="#f1f8e9"];
       
       A -> B;
       B -> C [label="Condição A"];
       B -> D [label="Condição B"];
       C -> E;
       D -> E;
       E -> F;
   }

**Vantagens:**

- Processamento personalizado por tipo
- Lógica de negócio complexa
- Flexibilidade total de roteamento

.. _splitting-nodes:

Nós Essenciais para Splitting
-----------------------------

.. _if-node:

Node IF
~~~~~~~

O node **IF** é o componente mais básico para splitting condicional.

.. code-block:: javascript
   :caption: Lógica do node IF
   :name: if-node-logic

   // Lógica do node IF
   if (valor_pedido > 1000) {
       // Caminho "true" - Aprovação manual
       enviarParaAprovacao();
   } else {
       // Caminho "false" - Processamento automático
       processarAutomaticamente();
   }

.. seealso::
   - :ref:`if-node-configuration`
   - :ref:`switch-node`
   - :ref:`merge-node`

.. _switch-node:

Node Switch
~~~~~~~~~~~

O node **Switch** permite múltiplas condições em uma única estrutura.

.. code-block:: javascript
   :caption: Lógica do node Switch
   :name: switch-node-logic

   // Lógica do node Switch
   switch (origem_lead) {
       case "google_ads":
           // Caminho 1
           enviarParaMarketingPago();
           break;
       case "redes_sociais":
           // Caminho 2
           enviarParaSocialMedia();
           break;
       case "website":
           // Caminho 3
           enviarParaVendasInbound();
           break;
       case "indicacao":
           // Caminho 4
           enviarParaRelacionamento();
           break;
       default:
           // Caminho padrão
           enviarParaTriagem();
   }

.. _merge-node:

Node Merge
~~~~~~~~~~

O node **Merge** reúne múltiplos caminhos em um único fluxo.

.. graphviz::
   
   digraph merge_workflow {
       rankdir=LR;
       node [shape=box, style=filled];
       
       A [label="Pedido", fillcolor="#e1f5fe"];
       B [label="Cliente VIP?", fillcolor="#ffebee"];
       C [label="Desconto VIP 15%", fillcolor="#fff3e0"];
       D [label="Desconto Padrão 5%", fillcolor="#e8f5e8"];
       E [label="Merge", fillcolor="#fce4ec"];
       F [label="Processar Pagamento", fillcolor="#f3e5f5"];
       G [label="Enviar Confirmação", fillcolor="#f1f8e9"];
       
       A -> B;
       B -> C [label="Sim"];
       B -> D [label="Não"];
       C -> E;
       D -> E;
       E -> F;
       F -> G;
   }

.. _splitting-examples:

Exemplos Práticos
-----------------

.. _splitting-support-example:

Exemplo: Sistema de Suporte Técnico
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Estrutura de Decisão em 3 Níveis:**

1. **Primeiro Split**: Tipo de problema (Software/Hardware/Rede)
2. **Segundo Split**: Criticidade (Baixa/Média/Alta)
3. **Terceiro Split**: Cliente (VIP/Standard)

**Resultado**: 18 combinações possíveis (3 × 3 × 2) com tratamento específico para cada uma

.. code-block:: json
   :caption: Configuração do Workflow de Suporte
   :name: support-workflow-config

   {
     "name": "Sistema de Suporte Técnico",
     "nodes": [
       {
         "name": "Receber Ticket",
         "type": "n8n-nodes-base.webhookTrigger",
         "parameters": {}
       },
       {
         "name": "Classificar Tipo",
         "type": "n8n-nodes-base.switch",
         "parameters": {
           "conditions": [
             {
               "leftValue": "{{ $json.tipo }}",
               "rightValue": "software"
             },
             {
               "leftValue": "{{ $json.tipo }}",
               "rightValue": "hardware"
             },
             {
               "leftValue": "{{ $json.tipo }}",
               "rightValue": "rede"
             }
           ]
         }
       }
     ]
   }

.. _splitting-ecommerce-example:

Exemplo: E-commerce
~~~~~~~~~~~~~~~~~~

**Classificação de Pedidos:**

- **Pedidos < R$ 100**: Processamento automático
- **Pedidos R$ 100-500**: Revisão manual
- **Pedidos > R$ 500**: Aprovação gerencial

.. code-block:: javascript
   :caption: Lógica de Classificação de Pedidos
   :name: ecommerce-classification

   // Classificação de pedidos por valor
   const valorPedido = $json.valor_total;
   
   if (valorPedido < 100) {
       return { categoria: "automatico", sla: "2h" };
   } else if (valorPedido <= 500) {
       return { categoria: "manual", sla: "24h" };
   } else {
       return { categoria: "gerencial", sla: "48h" };
   }

.. _splitting-best-practices:

Boas Práticas
-------------

.. _splitting-performance:

Performance
~~~~~~~~~~~

- **Use condições simples** quando possível
- **Evite aninhamento excessivo** de IFs
- **Considere paralelismo** para caminhos independentes
- **Monitore execução** de cada ramo

.. _splitting-maintenance:

Manutenibilidade
~~~~~~~~~~~~~~~~

- **Documente a lógica** de cada ramo
- **Use nomes descritivos** para nodes
- **Teste cada caminho** individualmente
- **Mantenha consistência** na nomenclatura

.. _splitting-debugging:

Debugging
~~~~~~~~~

- **Use Debug Helper** em cada ramo
- **Configure logging** detalhado
- **Monitore execução** em tempo real
- **Valide dados** de entrada

.. _splitting-troubleshooting:

Troubleshooting
--------------

.. _splitting-common-issues:

Problemas Comuns
~~~~~~~~~~~~~~~~

**Dados não chegam ao destino esperado:**

- Verifique condições de conexão
- Confirme formato dos dados
- Teste com dados de exemplo
- Monitore logs de execução

**Workflow lento:**

- Otimize condições complexas
- Use paralelismo quando possível
- Implemente caching
- Monitore uso de recursos

**Erros de merge:**

- Verifique se todos os caminhos convergem
- Confirme estrutura de dados
- Use nodes de validação
- Implemente tratamento de erros

.. _splitting-references:

Referências
----------

.. seealso::
   - :ref:`workflow-basics`
   - :ref:`data-flow`
   - :ref:`error-handling`
   - :ref:`performance-optimization`

.. _splitting-glossary:

Glossário
---------

.. glossary::

   splitting
      Técnica de ramificação condicional em workflows que permite criar múltiplos caminhos de execução baseados em condições específicas.

   node IF
      Nó condicional que permite criar decisões binárias (verdadeiro/falso) em workflows.

   node Switch
      Nó condicional que permite criar múltiplas condições em uma única estrutura.

   node Merge
      Nó que reúne múltiplos caminhos de execução em um único fluxo.

   ramificação condicional
      Processo de dividir o fluxo de execução baseado em condições específicas.

   paralelismo
      Execução simultânea de múltiplos caminhos de workflow.

.. _splitting-index:

Índice
------

.. index::
   single: splitting; workflow
   single: conditionals; n8n
   single: IF; node
   single: Switch; node
   single: Merge; node
   single: ramificação; condicional
   single: paralelismo; workflow