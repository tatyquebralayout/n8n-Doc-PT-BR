---
sidebar_position: 2
title: PIX Avançado
description: Integrações avançadas com PIX para automação de pagamentos e recebimentos
keywords: [n8n, pix, pagamentos, recebimentos, automação, banco central, qr code]
---


# <ion-icon name="card-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> PIX Avançado

Aprenda a implementar integrações avançadas com PIX para automatizar pagamentos, recebimentos e gestão financeira no contexto brasileiro.

---

## <ion-icon name="card-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 1 | Tipos de PIX

### PIX por Chave

**Integração com chaves PIX:**

```javascript
// Gerar QR Code PIX
{
  "chave_pix": "joao@email.com",
  "beneficiario": "João Silva",
  "valor": 150.00,
  "descricao": "Pagamento de serviço",
  "cidade": "São Paulo",
  "cep": "01234-567"
}
```

### PIX por QR Code

**QR Code estático e dinâmico:**

```javascript
// QR Code Estático
{
  "tipo": "estatico",
  "chave": "12345678901",
  "beneficiario": "Empresa LTDA",
  "cidade": "São Paulo",
  "cep": "01234-567"
}

// QR Code Dinâmico
{
  "tipo": "dinamico",
  "url": "https://api.banco.com/pix/qrcode",
  "expira_em": "30 minutos",
  "valor": 250.00
}
```

---

## <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 2 | Workflows de Pagamento

### Criar Cobrança PIX

**Exemplo: Workflow de cobrança automática:**

```javascript
// Workflow: Cobrança PIX Automática
[
  {
    "node": "Trigger - Nova Venda",
    "acao": "Detectar nova venda no sistema"
  },
  {
    "node": "Function - Gerar PIX",
    "acao": "Criar cobrança PIX com dados da venda"
  },
  {
    "node": "HTTP Request - API Banco",
    "acao": "Enviar cobrança para API do banco"
  },
  {
    "node": "Email - Enviar PIX",
    "acao": "Enviar QR Code por email"
  },
  {
    "node": "Slack - Notificação",
    "acao": "Notificar equipe sobre nova cobrança"
  }
]
```

### Monitorar Pagamentos

**Workflow de monitoramento:**

```javascript
// Monitorar pagamentos PIX
{
  "trigger": "Webhook - Banco Central",
  "filtros": {
    "status": "CONCLUIDO",
    "valor_minimo": 10.00,
    "prazo_expiracao": "24 horas"
  },
  "acoes": [
    "Atualizar status no CRM",
    "Enviar confirmação por email",
    "Gerar nota fiscal",
    "Atualizar estoque"
  ]
}
```

---

## <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 3 | APIs de Bancos Brasileiros

### Open Banking

**Integração com Open Banking:**

```javascript
// Configuração Open Banking
{
  "banco": "Banco do Brasil",
  "endpoint": "https://api.bb.com.br/open-banking/pix",
  "autenticacao": {
    "tipo": "OAuth 2.0",
    "client_id": "seu_client_id",
    "client_secret": "seu_client_secret",
    "escopo": "pix.write pix.read"
  },
  "operacoes": [
    "criar_cobranca",
    "consultar_status",
    "listar_transacoes",
    "gerar_qrcode"
  ]
}
```

### APIs Específicas

**Exemplos de APIs bancárias:**

| Banco | API | Endpoint | Autenticação |
|-------|-----|----------|--------------|
| **Itaú** | PIX API | `/pix/v1/cob` | Bearer Token |
| **Bradesco** | PIX API | `/pix/v1/cobranca` | OAuth 2.0 |
| **Santander** | PIX API | `/pix/v1/cob` | API Key |
| **Caixa** | PIX API | `/pix/v1/cobranca` | Certificado |

---

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 4 | Segurança e Compliance

### LGPD e Segurança

**Requisitos de segurança:**

```javascript
// Políticas de segurança PIX
{
  "lgpd": {
    "consentimento": true,
    "finalidade": "Pagamento de serviços",
    "retencao": "5 anos",
    "acesso": "Apenas pessoal autorizado"
  },
  "criptografia": {
    "transmissao": "TLS 1.3",
    "armazenamento": "AES-256",
    "chaves": "Rotação automática"
  },
  "auditoria": {
    "logs": "Todas as transações",
    "backup": "Diário",
    "monitoramento": "24/7"
  }
}
```

### Validações

**Validações obrigatórias:**

```javascript
// Validar dados PIX
{{ (function(dados) {
  const erros = [];
  
  // Validar CPF/CNPJ
  if (!dados.chave_pix.match(/^\d{11}$|^\d{14}$/)) {
    erros.push("Chave PIX inválida");
  }
  
  // Validar valor
  if (dados.valor <= 0 || dados.valor > 100000) {
    erros.push("Valor fora do limite permitido");
  }
  
  // Validar descrição
  if (dados.descricao.length > 140) {
    erros.push("Descrição muito longa");
  }
  
  return {
    valido: erros.length === 0,
    erros: erros
  };
})($json.dados_pix) }}
```

---

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 5 | Casos de Uso Empresariais

### E-commerce

**Automação para lojas online:**

```javascript
// Workflow E-commerce PIX
{
  "trigger": "Nova ordem de compra",
  "processo": [
    {
      "step": 1,
      "acao": "Gerar cobrança PIX",
      "dados": {
        "valor": "{{ $json.total }}",
        "descricao": "Pedido #{{ $json.id }}",
        "expiracao": "30 minutos"
      }
    },
    {
      "step": 2,
      "acao": "Enviar QR Code",
      "canal": "Email + WhatsApp"
    },
    {
      "step": 3,
      "acao": "Monitorar pagamento",
      "timeout": "30 minutos"
    },
    {
      "step": 4,
      "acao": "Confirmar pedido",
      "se": "pagamento_confirmado"
    }
  ]
}
```

### B2B

**Pagamentos entre empresas:**

```javascript
// Workflow B2B PIX
{
  "trigger": "Fatura vencida",
  "processo": [
    {
      "step": 1,
      "acao": "Verificar limite de crédito",
      "condicao": "cliente_em_dia"
    },
    {
      "step": 2,
      "acao": "Gerar cobrança PIX",
      "dados": {
        "valor": "{{ $json.valor_fatura }}",
        "vencimento": "{{ $json.data_vencimento }}",
        "multa": "2% ao dia"
      }
    },
    {
      "step": 3,
      "acao": "Enviar lembretes",
      "frequencia": "Diária até pagamento"
    }
  ]
}
```

---

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 6 | Relatórios e Analytics

### Métricas de PIX

**KPIs importantes:**

```javascript
// Métricas PIX
{{ (function(transacoes) {
  const total = transacoes.length;
  const sucesso = transacoes.filter(t => t.status === 'CONCLUIDO').length;
  const falhas = transacoes.filter(t => t.status === 'FALHOU').length;
  const pendentes = transacoes.filter(t => t.status === 'PENDENTE').length;
  
  return {
    total_transacoes: total,
    taxa_sucesso: (sucesso / total) * 100,
    taxa_falha: (falhas / total) * 100,
    pendentes: pendentes,
    valor_total: transacoes.reduce((acc, t) => acc + t.valor, 0),
    ticket_medio: transacoes.reduce((acc, t) => acc + t.valor, 0) / total
  };
})($json.transacoes_pix) }}
```

### Análise Temporal

**Padrões de pagamento:**

```javascript
// Análise temporal PIX
{{ (function(transacoes) {
  const porHora = transacoes.reduce((acc, t) => {
    const hora = new Date(t.data).getHours();
    acc[hora] = (acc[hora] || 0) + 1;
    return acc;
  }, {});
  
  const porDia = transacoes.reduce((acc, t) => {
    const dia = new Date(t.data).toLocaleDateString('pt-BR', { weekday: 'long' });
    acc[dia] = (acc[dia] || 0) + 1;
    return acc;
  }, {});
  
  return {
    pico_horario: Object.entries(porHora).sort((a, b) => b[1] - a[1])[0],
    dia_mais_ativo: Object.entries(porDia).sort((a, b) => b[1] - a[1])[0],
    distribuicao_horaria: porHora,
    distribuicao_diaria: porDia
  };
})($json.transacoes_pix) }}
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 7 | Próximos passos

1. **[Integração com Nota Fiscal](./nfe-integracao)** - Automatizar NFe
2. **[Conciliação Bancária](./conciliacao-bancaria)** - Automatizar conciliação
3. **[Relatórios Fiscais](./relatorios-fiscais)** - Gerar relatórios obrigatórios

> *Agora você domina integrações avançadas com PIX. Use essas técnicas para automatizar completamente seus processos financeiros!*

---

:::tip **Dica Pro**
Implemente webhooks para receber notificações em tempo real sobre pagamentos PIX, evitando polling desnecessário.
:::

:::warning **Importante**
Sempre teste integrações PIX em ambiente de sandbox antes de usar em produção. Erros podem resultar em perda financeira.
:::

:::info **Recurso Adicional**
Considere usar serviços como Mercado Pago, PagSeguro ou Stone para simplificar integrações PIX complexas.
:::
