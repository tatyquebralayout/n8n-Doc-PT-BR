---
sidebar_position: 3
title: Integração com NFe
description: Automatizar geração, envio e gestão de Notas Fiscais Eletrônicas no n8n
keywords: [n8n, nfe, nota fiscal, sefaz, automação, fiscal, contabilidade]
---


# <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Integração com NFe

Aprenda a automatizar a geração, envio e gestão de Notas Fiscais Eletrônicas (NFe) integrando com a SEFAZ e sistemas contábeis brasileiros.

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 1 | Configuração da NFe

### Certificado Digital

**Configuração do certificado A1:**

```javascript
// Configuração certificado digital
{
  "certificado": {
    "tipo": "A1",
    "arquivo": "certificado.pfx",
    "senha": "senha_certificado",
    "validade": "2025-12-31",
    "emissor": "SERASA",
    "cnpj": "12.345.678/0001-90"
  },
  "ambiente": {
    "producao": false,
    "homologacao": true,
    "sefaz": "SP" // Estado da SEFAZ
  }
}
```

### Dados da Empresa

**Informações obrigatórias:**

```javascript
// Dados da empresa emissora
{
  "empresa": {
    "razao_social": "Empresa LTDA",
    "nome_fantasia": "Empresa",
    "cnpj": "12.345.678/0001-90",
    "ie": "123.456.789.012",
    "endereco": {
      "logradouro": "Rua das Flores, 123",
      "bairro": "Centro",
      "cidade": "São Paulo",
      "estado": "SP",
      "cep": "01234-567"
    },
    "telefone": "(11) 1234-5678",
    "email": "fiscal@empresa.com.br"
  }
}
```

---

## <ion-icon name="folder-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 2 | Estrutura da NFe

### Cabeçalho da Nota

**Dados básicos da NFe:**

```javascript
// Cabeçalho NFe
{
  "nfe": {
    "versao": "4.00",
    "id": "NFe12345678901234567890123456789012345678901234",
    "tipo_emissao": "1", // Normal
    "finalidade": "1", // Normal
    "consumidor_final": "1", // Sim
    "presenca_comprador": "1", // Operação presencial
    "processo_emissao": "0", // Aplicativo do contribuinte
    "data_emissao": "2024-01-15T10:30:00-03:00",
    "tipo_operacao": "0", // Saída
    "natureza_operacao": "Venda de mercadoria",
    "serie": "1",
    "numero": "123456"
  }
}
```

### Dados do Destinatário

**Informações do cliente:**

```javascript
// Destinatário
{
  "destinatario": {
    "tipo": "F", // Física ou J para Jurídica
    "cpf_cnpj": "123.456.789-01",
    "nome": "João Silva",
    "endereco": {
      "logradouro": "Rua do Cliente, 456",
      "numero": "456",
      "complemento": "Apto 101",
      "bairro": "Vila Nova",
      "cidade": "São Paulo",
      "estado": "SP",
      "cep": "04567-890",
      "pais": "BRASIL"
    },
    "telefone": "(11) 98765-4321",
    "email": "joao@email.com"
  }
}
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 3 | Itens da Nota

### Produtos e Serviços

**Estrutura dos itens:**

```javascript
// Itens da NFe
{
  "itens": [
    {
      "numero": "1",
      "codigo": "PROD001",
      "descricao": "Produto A",
      "ncm": "12345678",
      "cfop": "5102",
      "unidade": "UN",
      "quantidade": 2,
      "valor_unitario": 50.00,
      "valor_total": 100.00,
      "icms": {
        "origem": "0",
        "cst": "102",
        "aliquota": 18.00,
        "base_calculo": 100.00,
        "valor": 18.00
      },
      "pis": {
        "cst": "01",
        "aliquota": 1.65,
        "base_calculo": 100.00,
        "valor": 1.65
      },
      "cofins": {
        "cst": "01",
        "aliquota": 7.6,
        "base_calculo": 100.00,
        "valor": 7.60
      }
    }
  ]
}
```

### Cálculos Fiscais

**Automatizar cálculos:**

```javascript
// Cálculo automático de impostos
{{ (function(item) {
  const valorTotal = item.quantidade * item.valor_unitario;
  const baseIcms = valorTotal;
  const valorIcms = baseIcms * (item.icms.aliquota / 100);
  const valorPis = valorTotal * (item.pis.aliquota / 100);
  const valorCofins = valorTotal * (item.cofins.aliquota / 100);
  
  return {
    ...item,
    valor_total: valorTotal,
    icms: {
      ...item.icms,
      base_calculo: baseIcms,
      valor: valorIcms
    },
    pis: {
      ...item.pis,
      base_calculo: valorTotal,
      valor: valorPis
    },
    cofins: {
      ...item.cofins,
      base_calculo: valorTotal,
      valor: valorCofins
    }
  };
})($json.item) }}
```

---

## <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 4 | Envio para SEFAZ

### Autorização

**Workflow de autorização:**

```javascript
// Workflow: Autorização NFe
{
  "trigger": "Nova venda confirmada",
  "processo": [
    {
      "step": 1,
      "acao": "Validar dados da venda",
      "validacoes": [
        "Cliente com CPF/CNPJ válido",
        "Produtos com NCM correto",
        "Valores calculados corretamente"
      ]
    },
    {
      "step": 2,
      "acao": "Gerar XML da NFe",
      "template": "nfe_template.xml"
    },
    {
      "step": 3,
      "acao": "Assinar XML",
      "certificado": "certificado_a1.pfx"
    },
    {
      "step": 4,
      "acao": "Enviar para SEFAZ",
      "endpoint": "https://nfe.fazenda.sp.gov.br/ws/nfeautorizacao4.asmx"
    },
    {
      "step": 5,
      "acao": "Processar resposta",
      "acoes": [
        "Salvar protocolo",
        "Gerar DANFE",
        "Enviar por email"
      ]
    }
  ]
}
```

### Tratamento de Respostas

**Processar retornos da SEFAZ:**

```javascript
// Processar resposta da SEFAZ
{{ (function(resposta) {
  const status = resposta.status;
  
  switch(status) {
    case '100': // Autorizada
      return {
        status: 'AUTORIZADA',
        protocolo: resposta.protocolo,
        acoes: [
          'Salvar NFe no banco',
          'Gerar DANFE',
          'Enviar por email',
          'Atualizar estoque'
        ]
      };
    case '110': // Denegada
      return {
        status: 'DENEGADA',
        motivo: resposta.motivo,
        acoes: [
          'Notificar equipe fiscal',
          'Corrigir dados',
          'Reenviar após correção'
        ]
      };
    case '301': // Rejeitada
      return {
        status: 'REJEITADA',
        motivo: resposta.motivo,
        acoes: [
          'Corrigir erro específico',
          'Validar dados',
          'Reenviar'
        ]
      };
    default:
      return {
        status: 'ERRO',
        motivo: 'Status desconhecido',
        acoes: ['Contatar suporte']
      };
  }
})($json.resposta_sefaz) }}
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 5 | Geração de DANFE

### Template do DANFE

**Estrutura do documento:**

```javascript
// Template DANFE
{
  "danfe": {
    "cabecalho": {
      "logo_empresa": "logo.png",
      "razao_social": "Empresa LTDA",
      "cnpj": "12.345.678/0001-90",
      "numero_nfe": "NFe 123.456",
      "data_emissao": "15/01/2024",
      "protocolo": "123456789012345"
    },
    "destinatario": {
      "nome": "João Silva",
      "cpf": "123.456.789-01",
      "endereco": "Rua do Cliente, 456 - São Paulo/SP"
    },
    "itens": [
      {
        "codigo": "PROD001",
        "descricao": "Produto A",
        "qtd": "2",
        "un": "UN",
        "vl_unit": "R$ 50,00",
        "vl_total": "R$ 100,00"
      }
    ],
    "totais": {
      "subtotal": "R$ 100,00",
      "icms": "R$ 18,00",
      "pis": "R$ 1,65",
      "cofins": "R$ 7,60",
      "total": "R$ 127,25"
    }
  }
}
```

### Envio Automático

**Workflow de envio:**

```javascript
// Enviar DANFE por email
{
  "trigger": "NFe autorizada",
  "processo": [
    {
      "step": 1,
      "acao": "Gerar PDF do DANFE",
      "template": "danfe_template.html"
    },
    {
      "step": 2,
      "acao": "Preparar email",
      "dados": {
        "para": "{{ $json.cliente.email }}",
        "assunto": "NFe {{ $json.numero }} - Empresa LTDA",
        "corpo": "Segue em anexo a NFe {{ $json.numero }}"
      }
    },
    {
      "step": 3,
      "acao": "Anexar DANFE",
      "arquivo": "danfe_{{ $json.numero }}.pdf"
    },
    {
      "step": 4,
      "acao": "Enviar email",
      "servico": "SMTP"
    },
    {
      "step": 5,
      "acao": "Registrar envio",
      "log": "Email enviado para {{ $json.cliente.email }}"
    }
  ]
}
```

---

## <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 6 | Integração com Sistemas

### ERP e CRM

**Sincronização com sistemas:**

```javascript
// Integração com ERP
{
  "trigger": "NFe autorizada",
  "sincronizacoes": [
    {
      "sistema": "ERP",
      "acao": "Atualizar fatura",
      "dados": {
        "fatura_id": "{{ $json.fatura_id }}",
        "status": "FATURADA",
        "nfe_numero": "{{ $json.numero_nfe }}",
        "nfe_protocolo": "{{ $json.protocolo }}"
      }
    },
    {
      "sistema": "CRM",
      "acao": "Atualizar cliente",
      "dados": {
        "cliente_id": "{{ $json.cliente_id }}",
        "ultima_compra": "{{ $json.data_emissao }}",
        "valor_total": "{{ $json.valor_total }}"
      }
    },
    {
      "sistema": "Estoque",
      "acao": "Baixar produtos",
      "dados": {
        "itens": "{{ $json.itens }}"
      }
    }
  ]
}
```

### Contabilidade

**Integração contábil:**

```javascript
// Lançamentos contábeis
{
  "contabilidade": {
    "debito": [
      {
        "conta": "1.1.01.001", // Clientes
        "valor": "{{ $json.valor_total }}",
        "historico": "Venda NFe {{ $json.numero }}"
      }
    ],
    "credito": [
      {
        "conta": "3.1.01.001", // Receita de Vendas
        "valor": "{{ $json.valor_produtos }}",
        "historico": "Venda NFe {{ $json.numero }}"
      },
      {
        "conta": "2.1.01.001", // ICMS a Recolher
        "valor": "{{ $json.valor_icms }}",
        "historico": "ICMS NFe {{ $json.numero }}"
      }
    ]
  }
}
```

---

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 7 | Relatórios Fiscais

### Relatórios Obrigatórios

**Relatórios para SEFAZ:**

```javascript
// Relatório de NFe emitidas
{{ (function(nfes) {
  const periodo = {
    inicio: "2024-01-01",
    fim: "2024-01-31"
  };
  
  const filtradas = nfes.filter(nfe => 
    nfe.data_emissao >= periodo.inicio && 
    nfe.data_emissao <= periodo.fim
  );
  
  return {
    periodo: periodo,
    total_nfes: filtradas.length,
    valor_total: filtradas.reduce((acc, nfe) => acc + nfe.valor_total, 0),
    icms_total: filtradas.reduce((acc, nfe) => acc + nfe.valor_icms, 0),
    por_estado: filtradas.reduce((acc, nfe) => {
      const estado = nfe.destinatario.estado;
      acc[estado] = (acc[estado] || 0) + 1;
      return acc;
    }, {}),
    canceladas: filtradas.filter(nfe => nfe.status === 'CANCELADA').length
  };
})($json.nfes) }}
```

### Arquivos SPED

**Geração de SPED:**

```javascript
// Estrutura SPED Fiscal
{
  "sped": {
    "bloco_0": {
      "0000": {
        "cod_ver": "017",
        "cod_fin": "0",
        "dt_ini": "01012024",
        "dt_fin": "31012024",
        "nome": "Empresa LTDA",
        "cnpj": "12345678000190"
      }
    },
    "bloco_c": {
      "c100": {
        "ind_oper": "0",
        "ind_emit": "0",
        "cod_part": "CLIENTE001",
        "cod_mod": "55",
        "cod_sit": "00",
        "ser": "1",
        "num_doc": "123456",
        "chv_nfe": "12345678901234567890123456789012345678901234",
        "dt_doc": "15012024",
        "dt_e_s": "15012024",
        "vl_doc": "127.25",
        "ind_pgto": "0",
        "vl_desc": "0.00",
        "vl_abat_nt": "0.00",
        "vl_merc": "100.00",
        "ind_frt": "0",
        "vl_frt": "0.00",
        "vl_seg": "0.00",
        "vl_out_da": "0.00",
        "vl_bc_icms": "100.00",
        "vl_icms": "18.00",
        "vl_bc_icms_st": "0.00",
        "vl_icms_st": "0.00",
        "vl_ipi": "0.00",
        "vl_pis": "1.65",
        "vl_cofins": "7.60",
        "vl_pis_st": "0.00",
        "vl_cofins_st": "0.00"
      }
    }
  }
}
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 8 | Próximos passos

1. **[Conciliação Bancária](./conciliacao-bancaria)** - Automatizar conciliação
2. **[Relatórios Fiscais](./relatorios-fiscais)** - Gerar relatórios obrigatórios
3. **[Integração com PIX](./pix-avancado)** - Conectar pagamentos PIX

> *Agora você domina integrações com NFe. Use essas técnicas para automatizar completamente seus processos fiscais!*

---

:::tip **Dica Pro**
Mantenha um backup de todas as NFe emitidas e seus XMLs. A SEFAZ pode solicitar essas informações em auditorias.
:::

:::warning **Importante**
Sempre teste integrações NFe em ambiente de homologação antes de usar em produção. Erros podem resultar em problemas fiscais.
:::

:::info **Recurso Adicional**
Considere usar serviços como NFe.io, API NFe ou sistemas ERP que já possuem integração com SEFAZ para simplificar o processo.
:::
