---
sidebar_position: 10
title: Troubleshooting
description: Resolução de problemas comuns durante os primeiros passos com n8n
keywords: [n8n, troubleshooting, problemas, erros, solução, primeiros passos]
---

# Troubleshooting

## Problemas Comuns de Instalação

### Erro de Porta em Uso

**Sintoma:** `Error: listen EADDRINUSE: address already in use :::5678`

**Solução:**
```bash
# Verificar processos usando a porta 5678
lsof -i :5678

# Matar o processo (substitua PID pelo número do processo)
kill -9 PID

# Ou usar uma porta diferente
n8n start --port 5679
```

### Problemas de Permissão

**Sintoma:** `EACCES: permission denied`

**Solução:**
```bash
# Para instalação global
sudo npm install -g n8n

# Para instalação local
npm install n8n --prefix ~/.local
```

## Problemas de Conexão

### Erro de Rede

**Sintoma:** `ECONNREFUSED` ou `ENOTFOUND`

**Solução:**
- Verificar conexão com internet
- Verificar firewall/proxy
- Testar com `curl` ou `ping`

### Problemas com Webhooks

**Sintoma:** Webhooks não funcionam

**Solução:**
- Verificar se o n8n está acessível externamente
- Configurar HTTPS para produção
- Verificar configurações de firewall

## Problemas de Workflow

### Workflow Não Executa

**Verificações:**
1. Trigger está ativo?
2. Credenciais estão configuradas?
3. Nodes estão conectados corretamente?
4. Há erros no log?

### Dados Não Aparecem

**Verificações:**
1. Mapeamento de dados está correto?
2. Formato dos dados está adequado?
3. Nodes de processamento estão funcionando?

## Problemas de Performance

### Execução Lenta

**Otimizações:**
- Reduzir número de execuções simultâneas
- Usar batch processing quando possível
- Otimizar queries de banco de dados

### Alto Uso de Memória

**Soluções:**
- Aumentar memória disponível
- Otimizar workflows complexos
- Usar subworkflows para modularizar

## Logs e Debugging

### Como Ver Logs

```bash
# Logs detalhados
n8n start --log-level debug

# Logs em arquivo
n8n start --log-output-file n8n.log
```

### Informações Úteis para Debug

- Versão do n8n
- Sistema operacional
- Node.js version
- Configurações de ambiente
- Logs de erro completos

## Suporte Adicional

Se os problemas persistirem:

1. **Verificar documentação oficial:** [n8n.io/docs](https://n8n.io/docs)
2. **Comunidade:** [Discord n8n](https://discord.gg/n8n)
3. **GitHub Issues:** [n8n-io/n8n](https://github.com/n8n-io/n8n/issues)
4. **Comunidade brasileira:** [Discord n8n Brasil](https://discord.gg/n8nbrasil) 