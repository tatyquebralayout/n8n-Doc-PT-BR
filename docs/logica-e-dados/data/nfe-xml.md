---
title: "Automação de NF-e e XML Fiscal no n8n"
description: "Exemplo prático de manipulação de notas fiscais eletrônicas (NF-e) e arquivos XML em workflows n8n, com dicas para integração com ERPs e Receita Federal."
keywords: [n8n, NF-e, XML, automação fiscal, integração ERP, Receita Federal, workflow, documentos fiscais]
sidebar_position: 2
---

# Automação de NF-e e XML Fiscal no n8n

Este exemplo mostra como trafegar arquivos XML de notas fiscais eletrônicas (NF-e) em automações contábeis e fiscais.

## Estrutura de Dados do Item

```json
[
  {
    "json": {
      "empresa": "Empresa XYZ",
      "cnpj": "12.345.678/0001-99",
      "numero_nfe": "12345"
    },
    "binary": {
      "nfe": {
        "data": "base64...",
        "mimeType": "application/xml",
        "fileExtension": "xml",
        "fileName": "nfe-12345.xml"
      }
    }
  }
]
```

## Dicas para Integração
- Valide o XML da NF-e antes de processar ou enviar para ERPs.
- Utilize campos como `cnpj`, `numero_nfe` e `chave_nfe` para rastreabilidade.
- Armazene o XML no campo `binary` para facilitar integrações com sistemas fiscais e contábeis.
- Considere criptografar ou proteger arquivos sensíveis.

> Consulte também: [Estrutura de Dados no n8n](../estrutura-dados) 