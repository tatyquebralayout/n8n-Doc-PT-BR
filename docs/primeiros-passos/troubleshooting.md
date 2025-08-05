---
sidebar_position: 10
title: Troubleshooting
description: Resolução de problemas comuns durante os primeiros passos com n8n
keywords: [n8n, troubleshooting, problemas, erros, solução, primeiros passos]
---

<IonicIcon name="warning-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

## Troubleshooting

Resolução de problemas comuns durante os primeiros passos com n8n.

---

<IonicIcon name="settings-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

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

---

<IonicIcon name="git-network-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

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

---

<IonicIcon name="code-slash-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

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

---

<IonicIcon name="analytics-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

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

---

<IonicIcon name="document-text-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

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

---

<IonicIcon name="chevron-forward-outline" style={{fontSize: '24px', color: '#ea4b71'}} />

## Suporte Adicional

Se os problemas persistirem:

1. **[Verificar documentação oficial](https://n8n.io/docs)** - Guias detalhados
2. **[Comunidade Discord](https://discord.gg/n8n)** - Suporte em tempo real
3. **[GitHub Issues](https://github.com/n8n-io/n8n/issues)** - Reportar bugs
4. **[Comunidade brasileira](https://discord.gg/n8nbrasil)** - Suporte em português

> *Não conseguiu resolver seu problema? Entre em contato com nossa comunidade para obter ajuda adicional!*

---

:::tip **Dica Pro**
Use o Debug Helper frequentemente para inspecionar dados e identificar problemas nos workflows.
:::

:::warning **Importante**
Sempre verifique os logs antes de reportar problemas para obter informações mais detalhadas.
:::

:::info **Recurso Adicional**
Consulte a documentação oficial do n8n para soluções específicas de cada tipo de problema.
:::
