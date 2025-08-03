---
title: "Automação de Boletos Bancários no n8n"
description: "Exemplo prático de geração, manipulação e envio de boletos bancários em workflows n8n, com dicas para integração com bancos brasileiros."
keywords: [n8n, boletos, automação bancária, integração bancária, workflow, pdf, pagamentos, bancos brasileiros]
sidebar_position: 1
---

# Automação de Boletos Bancários no n8n

Este exemplo mostra como gerar boletos para clientes, anexar o PDF do boleto a cada item e integrar com APIs de bancos nacionais.

## Estrutura de Dados do Item

```json
[
  {
    "json": {
      "cliente": "João Silva",
      "cpf": "123.456.789-00",
      "valor": 150.00
    },
    "binary": {
      "boleto": {
        "data": "base64...",
        "mimeType": "application/pdf",
        "fileExtension": "pdf",
        "fileName": "boleto-joao.pdf"
      }
    }
  }
]
```

## Dicas para Integração
- Use APIs de bancos homologadas para geração e registro de boletos.
- Valide campos como `cpf`, `valor` e vencimento antes de enviar.
- Armazene o PDF do boleto no campo `binary` para facilitar envio por e-mail ou integração com ERPs.
- Utilize webhooks para receber notificações de pagamento e atualizar o status do item.

> Consulte também: [Estrutura de Dados no n8n](../estrutura-dados) 