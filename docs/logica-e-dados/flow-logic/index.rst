.. _flow-logic-index:

Lógica de Fluxo no n8n
======================

.. meta::
   :description: Documentação técnica sobre lógica de fluxo, splitting, conditionals e controle de dados no n8n
   :keywords: n8n, lógica de fluxo, splitting, conditionals, if, switch, merge, controle de dados

.. contents:: Índice
   :local:
   :depth: 2

.. _flow-logic-overview:

Visão Geral
-----------

Esta seção contém documentação técnica avançada sobre lógica de fluxo no n8n, incluindo splitting, conditionals, controle de dados e padrões de workflow.

.. note::
   **Documentação Híbrida:**
   
   Esta seção utiliza uma abordagem híbrida com **Markdown** para conteúdo geral e **RST/Sphinx** para documentação técnica avançada.

.. _flow-logic-documentation:

Documentação Disponível
----------------------

.. list-table:: Documentação por Formato
   :header-rows: 1
   :name: flow-logic-docs-table

   * - **Tópico**
     - **Formato**
     - **Descrição**
   * - Splitting de Workflows
     - `Markdown <splitting.md>`_
     - Guia prático com exemplos visuais
   * - Splitting de Workflows (Técnico)
     - `RST <splitting.rst>`_
     - Documentação técnica com validação automática
   * - Conditionals
     - `Markdown <conditionals.md>`_
     - Guia de conditionals e lógica de decisão
   * - Error Handling
     - `Markdown <error-handling.md>`_
     - Tratamento de erros e debugging

.. _flow-logic-features:

Recursos da Documentação Técnica (RST)
-------------------------------------

.. tip::
   **Benefícios da Documentação RST:**

   - ✅ **Validação automática** de links e referências
   - ✅ **Referências cruzadas** precisas entre seções
   - ✅ **Glossário técnico** integrado
   - ✅ **Índice automático** de termos
   - ✅ **Diagramas** com legendas automáticas
   - ✅ **Exemplos de código** com validação
   - ✅ **Geração de PDF** e outros formatos

.. _flow-logic-validation:

Validação Automática
~~~~~~~~~~~~~~~~~~~

A documentação RST inclui validação automática de:

- **Links internos** entre seções
- **Referências cruzadas** entre documentos
- **Exemplos de código** com syntax highlighting
- **Diagramas** com legendas automáticas
- **Glossário técnico** com definições precisas

.. _flow-logic-examples:

Exemplos Técnicos
~~~~~~~~~~~~~~~~~

.. code-block:: javascript
   :caption: Exemplo de Splitting Condicional
   :name: splitting-example-rst

   // Exemplo de splitting condicional
   if (customerValue > 1000) {
       // Caminho premium
       processPremium();
   } else {
       // Caminho padrão
       processStandard();
   }

.. _flow-logic-diagrams:

Diagramas Automáticos
~~~~~~~~~~~~~~~~~~~~~

.. graphviz::
   
   digraph flow_logic_example {
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

.. _flow-logic-glossary:

Glossário Técnico
~~~~~~~~~~~~~~~~~

.. glossary::

   splitting
      Técnica de ramificação condicional em workflows que permite criar múltiplos caminhos de execução baseados em condições específicas.

   conditional
      Estrutura de controle que permite executar diferentes caminhos baseados em condições.

   workflow
      Sequência de operações automatizadas que processam dados de forma específica.

   node
      Bloco de construção fundamental dos workflows no n8n.

   merge
      Processo de reunir múltiplos caminhos de execução em um único fluxo.

.. _flow-logic-references:

Referências Cruzadas
-------------------

.. seealso::
   - :ref:`splitting-workflow`
   - :ref:`workflow-basics`
   - :ref:`data-flow`
   - :ref:`error-handling`

.. _flow-logic-index:

Índice Completo
---------------

.. index::
   single: lógica de fluxo; n8n
   single: splitting; workflow
   single: conditionals; n8n
   single: IF; node
   single: Switch; node
   single: Merge; node
   single: ramificação; condicional
   single: paralelismo; workflow
   single: controle de dados; n8n
   single: validação; automática
   single: referências; cruzadas
   single: glossário; técnico