---
sidebar_position: 1
title: Instalação via Docker
description: Guia completo para instalar n8n usando Docker
keywords: [n8n, docker, deployment, containerização, produção]
---

# <IonicIcon name="logo-docker" size={32} color="#ea4b71" /> Instalação via Docker

Este guia mostrará como instalar e executar o n8n usando Docker, a forma mais robusta e recomendada para ambientes de produção.

## <IonicIcon name="school-outline" size={24} color="#ea4b71" /> O que você vai aprender

- <IonicIcon name="settings-outline" size={16} color="#6b7280" /> Como configurar n8n com Docker
- <IonicIcon name="code-outline" size={16} color="#6b7280" /> Variáveis de ambiente essenciais
- <IonicIcon name="folder-outline" size={16} color="#6b7280" /> Configuração de volumes e persistência
- <IonicIcon name="shield-checkmark-outline" size={16} color="#6b7280" /> Configuração de rede e segurança
- <IonicIcon name="analytics-outline" size={16} color="#6b7280" /> Monitoramento e logs
- <IonicIcon name="save-outline" size={16} color="#6b7280" /> Backup e recuperação

## <IonicIcon name="checkbox-outline" size={24} color="#ea4b71" /> Pré-requisitos

Antes de começar, certifique-se de ter:

- <IonicIcon name="logo-docker" size={16} color="#6b7280" /> **Docker** instalado (versão 20.10 ou superior)
- <IonicIcon name="copy-outline" size={16} color="#6b7280" /> **Docker Compose** instalado (versão 1.28 ou superior)
- <IonicIcon name="hardware-chip-outline" size={16} color="#6b7280" /> **Pelo menos 2GB de RAM** disponível
- <IonicIcon name="globe-outline" size={16} color="#6b7280" /> **Porta 5678** disponível (ou outra de sua escolha)

## <IonicIcon name="flash-outline" size={24} color="#ea4b71" /> Instalação Rápida

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

## <IonicIcon name="arrow-forward-circle-outline" size={24} color="#ea4b71" /> Próximos Passos

1. <IonicIcon name="logo-npm" size={16} color="#6b7280" /> **[NPM](./npm)** - Instalação via NPM
2. <IonicIcon name="cloud-outline" size={16} color="#6b7280" /> **[Cloud](./cloud)** - Deploy em cloud providers
3. <IonicIcon name="desktop-outline" size={16} color="#6b7280" /> **[Desktop](./desktop)** - Aplicação desktop
4. <IonicIcon name="settings-outline" size={16} color="#6b7280" /> **[Configuração](../configuracao/variaveis-ambiente)** - Variáveis de ambiente

## <IonicIcon name="bulb-outline" size={24} color="#ea4b71" /> Dica

Para uma experiência mais suave, recomendamos começar com o Docker Compose, que já inclui todas as configurações necessárias para um ambiente de produção.

---

**<IonicIcon name="link-outline" size={16} color="#ea4b71" /> Links úteis:**
- <IonicIcon name="document-text-outline" size={16} color="#6b7280" /> [Documentação oficial Docker n8n](https://docs.n8n.io/hosting/installation/docker/)
- <IonicIcon name="logo-docker" size={16} color="#6b7280" /> [Imagem oficial no Docker Hub](https://hub.docker.com/r/n8nio/n8n)
- <IonicIcon name="logo-github" size={16} color="#6b7280" /> [Repositório n8n no GitHub](https://github.com/n8n-io/n8n)
