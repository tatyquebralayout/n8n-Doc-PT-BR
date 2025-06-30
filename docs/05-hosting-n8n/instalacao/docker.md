---
sidebar_position: 1
title: Introdução ao Docker
description: Guia completo para deploy do n8n usando Docker
keywords: [n8n, docker, deployment, containerização, produção]
---

# 🐳 Introdução ao Docker

Bem-vindo ao guia completo de deployment do n8n usando Docker! Este guia te levará do zero à produção com uma instalação robusta e segura.

## 🎯 O que você vai aprender

- ✅ Como configurar n8n com Docker
- ✅ Variáveis de ambiente essenciais
- ✅ Configuração de volumes e persistência
- ✅ Configuração de rede e segurança
- ✅ Monitoramento e logs
- ✅ Backup e recuperação

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- 🐳 **Docker** instalado (versão 20.10 ou superior)
- 🔧 **Docker Compose** instalado (versão 1.28 ou superior)
- 💾 **Pelo menos 2GB de RAM** disponível
- 🌐 **Porta 5678** disponível (ou outra de sua escolha)

## 🚀 Instalação Rápida

Para uma instalação básica de desenvolvimento:

```bash
# Executar n8n com Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  n8nio/n8n

# Acessar em http://localhost:5678
```

:::warning Atenção
Este comando é apenas para testes rápidos. Para produção, use Docker Compose com volumes persistentes.
:::

## 🏗️ Próximos Passos

1. **[NPM](./npm)** - Instalação via NPM
2. **[Cloud](./cloud)** - Deploy em cloud providers
3. **[Desktop](./desktop)** - Aplicação desktop
4. **[Configuração](../configuracao/variaveis-ambiente)** - Variáveis de ambiente

## 💡 Dica

Para uma experiência mais suave, recomendamos começar com o Docker Compose, que já inclui todas as configurações necessárias para um ambiente de produção.

---

**🔗 Links úteis:**
- [Documentação oficial Docker n8n](https://docs.n8n.io/hosting/installation/docker/)
- [Imagem oficial no Docker Hub](https://hub.docker.com/r/n8nio/n8n)
- [Repositório n8n no GitHub](https://github.com/n8n-io/n8n)
