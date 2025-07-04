---
sidebar_position: 1
title: Google Sheets
description: Integração completa do n8n com Google Sheets para automação de planilhas
keywords: [n8n, google sheets, planilhas, automação, integração]
---

# <IonicIcon name="grid-outline" size={32} color="#ea4b71" /> Google Sheets

A integração do Google Sheets é uma das mais populares do n8n, permitindo automatizar completamente suas planilhas e dados.

## <IonicIcon name="construct-outline" size={24} color="#ea4b71" /> O que você pode fazer

- <IonicIcon name="eye-outline" size={16} color="#6b7280" /> **Ler dados** de planilhas existentes
- <IonicIcon name="add-outline" size={16} color="#6b7280" /> **Criar novas linhas** automaticamente
- <IonicIcon name="create-outline" size={16} color="#6b7280" /> **Atualizar células** específicas
- <IonicIcon name="trash-outline" size={16} color="#6b7280" /> **Deletar dados** quando necessário
- <IonicIcon name="document-outline" size={16} color="#6b7280" /> **Criar novas planilhas** programaticamente
- <IonicIcon name="shield-checkmark-outline" size={16} color="#6b7280" /> **Gerenciar permissões** de acesso

## <IonicIcon name="checkbox-outline" size={24} color="#ea4b71" /> Pré-requisitos

### <IonicIcon name="logo-google" size={20} color="#10b981" /> 1. Conta Google
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> Conta Google ativa
- <IonicIcon name="grid-outline" size={16} color="#6b7280" /> Acesso ao Google Sheets

### <IonicIcon name="key-outline" size={20} color="#10b981" /> 2. Credenciais OAuth2
- <IonicIcon name="cloud-outline" size={16} color="#6b7280" /> Criar projeto no Google Cloud Console
- <IonicIcon name="checkmark-circle-outline" size={16} color="#6b7280" /> Ativar Google Sheets API
- <IonicIcon name="settings-outline" size={16} color="#6b7280" /> Configurar OAuth2 credentials

## <IonicIcon name="flash-outline" size={24} color="#ea4b71" /> Configuração Rápida

### <IonicIcon name="key-outline" size={20} color="#10b981" /> 1. Criar Credencial
1. <IonicIcon name="arrow-forward-outline" size={16} color="#6b7280" /> **Vá em:** Credentials → Add new
2. <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Escolha:** Google OAuth2 API
3. <IonicIcon name="settings-outline" size={16} color="#6b7280" /> **Configure:** Client ID e Client Secret
4. <IonicIcon name="shield-checkmark-outline" size={16} color="#6b7280" /> **Autorize:** Sua conta Google

### <IonicIcon name="add-circle-outline" size={20} color="#10b981" /> 2. Adicionar Node
1. <IonicIcon name="search-outline" size={16} color="#6b7280" /> **Busque:** "Google Sheets" no menu de nodes
2. <IonicIcon name="move-outline" size={16} color="#6b7280" /> **Arrastar:** Para o canvas
3. <IonicIcon name="link-outline" size={16} color="#6b7280" /> **Conectar:** Sua credencial OAuth2

## <IonicIcon name="options-outline" size={24} color="#ea4b71" /> Operações Disponíveis

### <IonicIcon name="eye-outline" size={20} color="#10b981" /> Read (Ler Dados)
```json
{
"operation": "read",
"documentId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
"sheetName": "Class Data",
"range": "A2:F"
}
```

### <IonicIcon name="add-outline" size={20} color="#10b981" /> Append (Adicionar Linha)
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

### <IonicIcon name="create-outline" size={20} color="#10b981" /> Update (Atualizar Dados)
```json
{
"operation": "update",
"documentId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
"sheetName": "Sheet1",
"range": "B2",
"values": [["Novo Valor"]]
}
```

### <IonicIcon name="trash-outline" size={20} color="#10b981" /> Clear (Limpar Dados)
```json
{
"operation": "clear",
"documentId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
"sheetName": "Sheet1",
"range": "A1:F10"
}
```

## <IonicIcon name="briefcase-outline" size={24} color="#ea4b71" /> Casos de Uso Populares

### <IonicIcon name="person-add-outline" size={20} color="#10b981" /> Lead Capture
```
Webhook → Validação → Google Sheets (Append)
```
**Cenário:** Formulário no site salva leads automaticamente

### <IonicIcon name="analytics-outline" size={20} color="#10b981" /> Relatórios Automáticos
```
Schedule → API Call → Transform → Google Sheets
```
**Cenário:** Relatórios diários de vendas

### <IonicIcon name="storefront-outline" size={20} color="#10b981" /> E-commerce Sync
```
Shopify Webhook → Google Sheets → Email Notification
```
**Cenário:** Novos pedidos salvos em planilha

### <IonicIcon name="business-outline" size={20} color="#10b981" /> CRM Integration
```
Google Sheets → CRM API → Slack Notification
```
**Cenário:** Sincronizar dados entre sistemas

## <IonicIcon name="bulb-outline" size={24} color="#ea4b71" /> Dicas e Truques

### <IonicIcon name="speedometer-outline" size={20} color="#10b981" /> Performance
- <IonicIcon name="target-outline" size={16} color="#6b7280" /> **Use ranges específicos** em vez de ler planilha inteira
- <IonicIcon name="albums-outline" size={16} color="#6b7280" /> **Batch operations** para múltiplas linhas
- <IonicIcon name="save-outline" size={16} color="#6b7280" /> **Cache data** quando possível

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> Segurança
- <IonicIcon name="checkmark-done-outline" size={16} color="#6b7280" /> **Permissions mínimas** nas credenciais OAuth2
- <IonicIcon name="shield-outline" size={16} color="#6b7280" /> **Validate data** antes de escrever
- <IonicIcon name="business-outline" size={16} color="#6b7280" /> **Use service accounts** para produção

### <IonicIcon name="flash-outline" size={20} color="#10b981" /> Responsividade
- <IonicIcon name="warning-outline" size={16} color="#6b7280" /> **Error handling** para conexões lentas
- <IonicIcon name="refresh-outline" size={16} color="#6b7280" /> **Retry logic** para operações falhadas
- <IonicIcon name="time-outline" size={16} color="#6b7280" /> **Timeout settings** apropriados

## <IonicIcon name="settings-outline" size={24} color="#ea4b71" /> Configurações Avançadas

### <IonicIcon name="business-outline" size={20} color="#10b981" /> Service Account (Recomendado para Produção)
```json
{
"type": "service_account",
"project_id": "seu-projeto",
"private_key_id": "key-id",
"private_key": "-----BEGIN PRIVATE KEY-----\n...\n",
"client_email": "service@projeto.iam.gserviceaccount.com"
}
```

### <IonicIcon name="albums-outline" size={20} color="#10b981" /> Batch Updates
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

## <IonicIcon name="construct-outline" size={24} color="#ea4b71" /> Troubleshooting

### <IonicIcon name="close-circle-outline" size={20} color="#10b981" /> Erro: "Invalid credentials"
```bash
Verificar Client ID e Secret
Reautorizar no OAuth2
Confirmar APIs habilitadas
```

### <IonicIcon name="lock-closed-outline" size={20} color="#10b981" /> Erro: "Permission denied"
```bash
Verificar permissões da planilha
Confirmar email do service account
Testar com editor permissions
```

### <IonicIcon name="warning-outline" size={20} color="#10b981" /> Erro: "Quota exceeded"
```bash
Implementar rate limiting
Usar batch operations
Considerar service account
```

## <IonicIcon name="link-outline" size={24} color="#ea4b71" /> Links Úteis

- <IonicIcon name="document-text-outline" size={16} color="#6b7280" /> **[Google Sheets API](https://developers.google.com/sheets/api)** - Documentação oficial
- <IonicIcon name="cloud-outline" size={16} color="#6b7280" /> **[Google Cloud Console](https://console.cloud.google.com)** - Gerenciar credenciais
- <IonicIcon name="library-outline" size={16} color="#6b7280" /> **[n8n Google Sheets docs](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)** - Documentação específica

---

**<IonicIcon name="arrow-forward-circle-outline" size={16} color="#ea4b71" /> Próximos passos:** Configure suas credenciais OAuth2 e comece a automatizar suas planilhas!
