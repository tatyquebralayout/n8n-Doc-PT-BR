---
sidebar_position: 3
title: Compartilhamento de Credenciais
description: Como compartilhar credenciais de forma segura com sua equipe no n8n
keywords: [n8n, credenciais, compartilhamento, equipe, colaboração, segurança]
---


# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Compartilhamento de Credenciais

Aprenda como compartilhar credenciais de forma segura com sua equipe, mantendo o controle de acesso e a segurança dos dados.

---

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 1 | Por que Compartilhar Credenciais?

###  Benefícios

- **Colaboração em equipe**: Múltiplos usuários podem usar as mesmas integrações
- **Centralização**: Uma única fonte de verdade para credenciais
- **Controle de acesso**: Gerenciar quem pode usar quais credenciais
- **Auditoria**: Rastrear quem usou cada credencial

###  Considerações de Segurança

- **Princípio do menor privilégio**: Compartilhe apenas o necessário
- **Monitoramento**: Acompanhe o uso das credenciais
- **Renovação**: Mantenha credenciais atualizadas
- **Isolamento**: Separe credenciais por ambiente (dev/prod)

---

## <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 2 | Configurando Compartilhamento

###  Passo a Passo

1. **Acesse a credencial** que deseja compartilhar
2. **Clique em "Compartilhar"** ou "Configurações"
3. **Selecione usuários** ou grupos
4. **Defina permissões**:
   - **Leitura**: Pode usar a credencial
   - **Escrita**: Pode editar a credencial
   - **Administrador**: Pode compartilhar e excluir
5. **Configure notificações** (opcional)
6. **Salve as configurações**

###  Tipos de Permissão

| Permissão | Pode Usar | Pode Editar | Pode Compartilhar | Pode Excluir |
|-----------|-----------|-------------|-------------------|--------------|
| **Leitura** | ✅ | ❌ | ❌ | ❌ |
| **Escrita** | ✅ | ✅ | ❌ | ❌ |
| **Administrador** | ✅ | ✅ | ✅ | ✅ |

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 3 | Cenários de Uso

###  Equipe de Marketing

**Credenciais compartilhadas:**
- Google Analytics
- Facebook Ads
- Mailchimp
- HubSpot

**Estratégia:**
- Uma credencial por plataforma
- Acesso de leitura para todos
- Apenas líderes com acesso de escrita

###  Equipe Financeira

**Credenciais compartilhadas:**
- Stripe
- PayPal
- QuickBooks
- Banco de dados contábil

**Estratégia:**
- Credenciais separadas por ambiente
- Acesso restrito a membros da equipe
- Auditoria rigorosa de uso

###  Equipe de Desenvolvimento

**Credenciais compartilhadas:**
- GitHub
- AWS/Google Cloud
- Slack
- Jira

**Estratégia:**
- Credenciais por projeto
- Rotação regular de tokens
- Monitoramento de uso

---

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 4 | Boas Práticas de Segurança

###  Controle de Acesso

- ✅ **Audite regularmente** quem tem acesso
- ✅ **Remova acessos** de usuários que saíram
- ✅ **Use grupos** para facilitar gerenciamento
- ✅ **Documente** o propósito de cada credencial
- ❌ **Não compartilhe** credenciais pessoais
- ❌ **Evite** credenciais com privilégios excessivos

###  Rotação e Renovação

- **Tokens OAuth**: Renove a cada 90 dias
- **API Keys**: Rotacione a cada 6 meses
- **Senhas**: Mude a cada 3 meses
- **Certificados**: Renove antes da expiração

###  Monitoramento

- **Logs de acesso**: Monitore quem usa cada credencial
- **Alertas**: Configure notificações para uso suspeito
- **Relatórios**: Gere relatórios mensais de uso
- **Auditoria**: Revise permissões trimestralmente

---

## <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 5 | Configurações Avançadas

###  Expiração Automática

Configure credenciais para expirar automaticamente:

```json
{
  "expirationDate": "2024-12-31T23:59:59Z",
  "notifyBeforeExpiration": 30,
  "autoRenew": false
}
```

###  Restrições de IP

Limite o acesso por endereço IP:

```json
{
  "allowedIPs": [
    "192.168.1.0/24",
    "10.0.0.0/8"
  ],
  "blockedIPs": [
    "203.0.113.0/24"
  ]
}
```

###  Horários de Acesso

Defina janelas de tempo para uso:

```json
{
  "allowedHours": {
    "start": "09:00",
    "end": "18:00",
    "timezone": "America/Sao_Paulo"
  },
  "allowedDays": ["monday", "tuesday", "wednesday", "thursday", "friday"]
}
```

---

## <ion-icon name="bug-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 6 | Troubleshooting

###  Problemas Comuns

**"Credencial não encontrada"**
- Verifique se a credencial foi compartilhada
- Confirme se você tem permissão de leitura
- Tente recarregar a página

**"Acesso negado"**
- Solicite permissão ao administrador
- Verifique se a credencial não expirou
- Confirme se está no IP permitido

**"Token expirado"**
- Renove o token OAuth
- Verifique se o refresh token ainda é válido
- Entre em contato com o administrador

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> 7 | Próximos passos

1. **[Boas Práticas](./boas-praticas)** - Manter segurança
2. **[Usar Credenciais em Workflows](../execucoes/componentes-execucoes)** - Aplicar na prática
3. **[Gerenciar Usuários](../usuarios-permissoes)** - Configurar equipe

> *O compartilhamento seguro de credenciais é fundamental para o trabalho em equipe. Sempre priorize a segurança!*

---

:::tip **Dica Pro**
Crie uma política de credenciais para sua organização. Documente regras claras sobre compartilhamento, rotação e monitoramento.
:::

:::warning **Importante**
Nunca compartilhe credenciais por email, chat ou outros canais não seguros. Use sempre o sistema de compartilhamento do n8n.
::: 
