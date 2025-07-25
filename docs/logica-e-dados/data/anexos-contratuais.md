---
title: "Automação de Anexos Contratuais e Documentos Digitais no n8n"
description: "Exemplo prático de manipulação de contratos digitais e anexos em workflows n8n, com dicas para integração com ERPs, CRMs e sistemas jurídicos."
keywords: [n8n, contratos digitais, anexos, automação jurídica, workflow, integração ERP, CRM, documentos digitais]
sidebar_position: 3
---

# Automação de Anexos Contratuais e Documentos Digitais no n8n

Este exemplo mostra como trafegar contratos digitais e anexos em automações empresariais.

## Estrutura de Dados do Item

```json
[
  {
    "json": {
      "empresa": "Empresa ABC",
      "cnpj": "98.765.432/0001-11",
      "contrato_id": "C-2024-001"
    },
    "binary": {
      "contrato": {
        "data": "base64...",
        "mimeType": "application/pdf",
        "fileExtension": "pdf",
        "fileName": "contrato-empresa-abc.pdf"
      }
    }
  }
]
```

## Dicas para Integração
- Utilize campos como `contrato_id`, `empresa` e `cnpj` para rastreabilidade e integração com ERPs/CRMs.
- Armazene o PDF do contrato no campo `binary` para facilitar assinatura digital, envio por e-mail ou arquivamento.
- Considere versionar contratos e manter logs de alterações.

> Consulte também: [Estrutura de Dados no n8n](../estrutura-dados.md) 