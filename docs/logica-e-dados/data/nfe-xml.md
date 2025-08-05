---
sidebar_position: 2
title: Automação de NF-e e XML Fiscal no n8n
description: Exemplo prático de manipulação de notas fiscais eletrônicas (NF-e) e arquivos XML em workflows n8n, com dicas para integração com ERPs e Receita Federal.
keywords: [n8n, NF-e, XML, automação fiscal, integração ERP, Receita Federal, workflow, documentos fiscais]
---

<IonicIcon name="document-text-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

## Automação de NF-e e XML Fiscal no n8n

Este exemplo mostra como trafegar arquivos XML de notas fiscais eletrônicas (NF-e) em automações contábeis e fiscais.

---

<IonicIcon name="code-slash-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

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

---

<IonicIcon name="settings-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

## Dicas para Integração

- **Valide o XML da NF-e** antes de processar ou enviar para ERPs
- **Utilize campos como `cnpj`, `numero_nfe` e `chave_nfe`** para rastreabilidade
- **Armazene o XML no campo `binary`** para facilitar integrações com sistemas fiscais e contábeis
- **Considere criptografar ou proteger** arquivos sensíveis

---

<IonicIcon name="chevron-forward-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

## Próximos passos

1. **[Estrutura de Dados](./data-structure)** - Entenda como os dados são organizados
2. **[Dados Binários](./binary-data)** - Trabalhe com arquivos XML
3. **[Transformações de Dados](./data-structure)** - Processe dados fiscais

> *Agora você pode trabalhar com NF-e e XML fiscal no n8n. Use essas técnicas para automatizar processos contábeis e fiscais!*

---

:::tip **Dica Pro**
Sempre valide a estrutura do XML antes de processá-lo para garantir conformidade com as especificações da Receita Federal.
:::

:::warning **Importante**
Mantenha backups seguros dos arquivos XML de NF-e, pois são documentos fiscais importantes.
:::

:::info **Recurso Adicional**
Use bibliotecas XML para parsear e validar documentos fiscais antes de processá-los em seus workflows.
:::
