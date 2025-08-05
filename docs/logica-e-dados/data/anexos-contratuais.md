---
sidebar_position: 3
title: Automação de Anexos Contratuais e Documentos Digitais no n8n
description: Exemplo prático de manipulação de contratos digitais e anexos em workflows n8n, com dicas para integração com ERPs, CRMs e sistemas jurídicos.
keywords: [n8n, contratos digitais, anexos, automação jurídica, workflow, integração ERP, CRM, documentos digitais]
---

<IonicIcon name="document-text-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

## Automação de Anexos Contratuais e Documentos Digitais no n8n

Este exemplo mostra como trafegar contratos digitais e anexos em automações empresariais.

---

<IonicIcon name="code-slash-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

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

---

<IonicIcon name="settings-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

## Dicas para Integração

- **Utilize campos como `contrato_id`, `empresa` e `cnpj`** para rastreabilidade e integração com ERPs/CRMs
- **Armazene o PDF do contrato no campo `binary`** para facilitar assinatura digital, envio por e-mail ou arquivamento
- **Considere versionar contratos** e manter logs de alterações
- **Implemente controle de acesso** para documentos sensíveis

---

<IonicIcon name="chevron-forward-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

## Próximos passos

1. **[Estrutura de Dados](./data-structure)** - Entenda como os dados são organizados
2. **[Dados Binários](./binary-data)** - Trabalhe com arquivos PDF
3. **[Transformações de Dados](./data-structure)** - Processe documentos digitais

> *Agora você pode trabalhar com contratos digitais e anexos no n8n. Use essas técnicas para automatizar processos jurídicos e empresariais!*

---

:::tip **Dica Pro**
Sempre valide a estrutura dos documentos antes de processá-los para garantir conformidade com requisitos legais.
:::

:::warning **Importante**
Mantenha backups seguros dos contratos digitais, pois são documentos jurídicos importantes.
:::

:::info **Recurso Adicional**
Use bibliotecas de assinatura digital para garantir autenticidade e integridade dos documentos contratuais.
:::
