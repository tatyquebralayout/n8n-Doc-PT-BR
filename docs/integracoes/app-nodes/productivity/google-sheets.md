---
sidebar_position: 1
title: Google Sheets
description: Integração completa do n8n com Google Sheets para automação de planilhas
keywords: [n8n, google sheets, planilhas, automação, integração]
---

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Google Sheets

A integração do Google Sheets é uma das mais populares do n8n, permitindo automatizar completamente suas planilhas e dados.

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você pode fazer

-  **Ler dados** de planilhas existentes
-  **Criar novas linhas** automaticamente
-  **Atualizar células** específicas
-  **Deletar dados** quando necessário
-  **Criar novas planilhas** programaticamente
-  **Gerenciar permissões** de acesso

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Pré-requisitos

###  1. Conta Google
-  Conta Google ativa
-  Acesso ao Google Sheets

###  2. Credenciais OAuth2
-  Criar projeto no Google Cloud Console
-  Ativar Google Sheets API
-  Configurar OAuth2 credentials

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração Rápida

###  1. Criar Credencial
1.  **Vá em:** Credentials → Add new
2.  **Escolha:** Google OAuth2 API
3.  **Configure:** Client ID e Client Secret
4.  **Autorize:** Sua conta Google

###  2. Adicionar Node
1.  **Busque:** "Google Sheets" no menu de nodes
2.  **Arrastar:** Para o canvas
3.  **Conectar:** Sua credencial OAuth2

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Operações Disponíveis

###  Read (Ler Dados)
```json
{
"operation": "read",
"documentId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
"sheetName": "Class Data",
"range": "A2:F"
}
```

###  Append (Adicionar Linha)
```json
{
"operation": "append",
"documentId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
"sheetName": "Sheet1",
"values": [
["João", "joao@email.com", "Premium", "2024-01-15"]
]
}
```

###  Update (Atualizar Dados)
```json
{
"operation": "update",
"documentId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
"sheetName": "Sheet1",
"range": "B2",
"values": [["Novo Valor"]]
}
```

###  Clear (Limpar Dados)
```json
{
"operation": "clear",
"documentId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
"sheetName": "Sheet1",
"range": "A1:F10"
}
```

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Casos de Uso Populares

###  Lead Capture
```
Webhook → Validação → Google Sheets (Append)
```
**Cenário:** Formulário no site salva leads automaticamente

###  Relatórios Automáticos
```
Schedule → API Call → Transform → Google Sheets
```
**Cenário:** Relatórios diários de vendas

###  E-commerce Sync
```
Shopify Webhook → Google Sheets → Email Notification
```
**Cenário:** Novos pedidos salvos em planilha

###  CRM Integration
```
Google Sheets → CRM API → Slack Notification
```
**Cenário:** Sincronizar dados entre sistemas

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Dicas e Truques

###  Performance
-  **Use ranges específicos** em vez de ler planilha inteira
-  **Batch operations** para múltiplas linhas
-  **Cache data** quando possível

###  Segurança
-  **Permissions mínimas** nas credenciais OAuth2
-  **Validate data** antes de escrever
-  **Use service accounts** para produção

###  Responsividade
-  **Error handling** para conexões lentas
-  **Retry logic** para operações falhadas
-  **Timeout settings** apropriados

## <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configurações Avançadas

###  Service Account (Recomendado para Produção)
```json
{
"type": "service_account",
"project_id": "seu-projeto",
"private_key_id": "key-id",
"private_key": "-----BEGIN PRIVATE KEY-----\n...\n",
"client_email": "service@projeto.iam.gserviceaccount.com"
}
```

###  Batch Updates
```json
{
"operation": "batchUpdate",
"requests": [
{
"updateCells": {
"range": "Sheet1!A1:B2",
"rows": [
{"values": [{"userEnteredValue": {"stringValue": "Nome"}}]},
{"values": [{"userEnteredValue": {"stringValue": "João"}}]}
]
}
}
]
}
```

## <ion-icon name="bug-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Troubleshooting

###  Erro: "Invalid credentials"
```bash
Verificar Client ID e Secret
Reautorizar no OAuth2
Confirmar APIs habilitadas
```

###  Erro: "Permission denied"
```bash
Verificar permissões da planilha
Confirmar email do service account
Testar com editor permissions
```

###  Erro: "Quota exceeded"
```bash
Implementar rate limiting
Usar batch operations
Considerar service account
```

## <ion-icon name="link-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Links Úteis

-  **[Google Sheets API](https://developers.google.com/sheets/api)** - Documentação oficial
-  **[Google Cloud Console](https://console.cloud.google.com)** - Gerenciar credenciais
-  **[n8n Google Sheets docs](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)** - Documentação específica

---

** Próximos passos:** Configure suas credenciais OAuth2 e comece a automatizar suas planilhas!
