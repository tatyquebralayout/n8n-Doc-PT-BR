---
sidebar_position: 2
title: Instalação Self-hosted do n8n
description: Guia completo para instalação self-hosted do n8n com Docker e npm
slug: /primeiros-passos/instalacao
keywords: [n8n, instalação, docker, npm, setup, self-hosted]
---


# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalação Self-hosted do n8n

Esta página detalha os métodos de instalação **self-hosted** do n8n, incluindo Docker (recomendado) e npm. Para uma visão geral de todos os métodos, consulte o [Guia de Instalação – Visão Panorâmica](./guia-instalacao).

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Opções de Instalação

### Docker (Recomendado)

A forma mais rápida e fácil de começar:

```bash
# <ion-icon name="cloud-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Executar n8n com Docker
docker run -it --rm \
--name n8n \
-p 5678:5678 \
n8nio/n8n
```

 Acesse <http://localhost:5678> no seu navegador.

### NPM

Para instalação via npm (requer Node.js 18+):

```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalar globalmente
npm install n8n -g

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Executar
n8n start
```

### NPX (Sem instalação)

Para testar sem instalar:

```bash
npx n8n
```

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração Inicial

### 1. Primeiro Acesso

Após a instalação, acesse `http://localhost:5678` e você verá a tela de configuração inicial.

### 2. Criar Conta de Administrador

:::warning Importante
Na primeira execução, você deve criar uma conta de administrador para proteger sua instância.
:::

1. Preencha os dados do administrador:

- **Nome**: Seu nome completo
- **Email**: Seu endereço de email
- **Senha**: Uma senha segura

2. Clique em **Criar Conta**

### 3. Configurações Básicas

#### Variáveis de Ambiente

Você pode configurar o n8n usando variáveis de ambiente:

```bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Porta da aplicação
N8N_PORT=5678

# <ion-icon name="git-network-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> URL base (importante para webhooks)
N8N_PROTOCOL=https
N8N_HOST=seu-dominio.com

# <ion-icon name="time-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Fuso horário
GENERIC_TIMEZONE=America/Sao_Paulo

# <ion-icon name="analytics-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Banco de dados (opcional)
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=localhost
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=senha_segura
```

#### Docker Compose (Recomendado para produção)

Crie um arquivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
n8n:
image: n8nio/n8n
restart: unless-stopped
ports:
- "5678:5678"
environment:
- N8N_PROTOCOL=https
- N8N_HOST=seu-dominio.com
- GENERIC_TIMEZONE=America/Sao_Paulo
- WEBHOOK_URL=https://seu-dominio.com/
volumes:
- n8n_data:/home/node/.n8n

postgres:
image: postgres:13
restart: unless-stopped
environment:
- POSTGRES_DB=n8n
- POSTGRES_USER=n8n
- POSTGRES_PASSWORD=senha_segura
volumes:
- postgres_data:/var/lib/postgresql/data

volumes:
n8n_data:
postgres_data:
```

Execute com:

```bash
docker-compose up -d
```

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificando a Instalação

### 1. Interface Web

Acesse `http://localhost:5678` e verifique se a interface carrega corretamente.

### 2. Teste Básico

1. Clique em **"+ Adicionar primeiro passo"**
2. Procure por **"Manual Trigger"**
3. Clique em **"Executar Workflow"**
4. Você deve ver uma execução bem-sucedida

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

Agora que o n8n está instalado e funcionando:

1. **[Conceitos Básicos](./conceitos-basicos)** - Entenda os fundamentos
2. **[Primeiro Workflow](./primeiro-workflow)** - Crie seu primeiro fluxo
3. **[Conectar Aplicações](./conectar-aplicacoes)** - Integre suas ferramentas

### Outros Métodos de Instalação

- **[n8n Cloud](./instalacao-cloud)** - Instalação via serviço hospedado
- **[Instalação Local via npm](./instalacao-npm)** - Para desenvolvimento e testes

## <ion-icon name="bug-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Solução de Problemas

### Problemas Comuns

#### Porta já em uso

```bash
# <ion-icon name="git-branch-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar qual processo está usando a porta 5678
netstat -tulpn | grep 5678

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Usar uma porta diferente
N8N_PORT=5679 n8n start
```

#### Problemas de permissão (Linux/Mac)

```bash
# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Dar permissões corretas
sudo chown -R $(whoami) ~/.n8n
```

#### Erro de memória

```bash
# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Aumentar limite de memória do Node.js
NODE_OPTIONS="--max-old-space-size=4096" n8n start
```

### Logs

Para debugar problemas, verifique os logs:

```bash
# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Logs mais detalhados
N8N_LOG_LEVEL=debug n8n start

# <ion-icon name="cloud-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Com Docker
docker logs container_id
```

:::tip Precisa de ajuda?
Se encontrar problemas, consulte:

- [FAQ](../faq)
- [Comunidade Discord](https://discord.gg/n8n)
- [GitHub Issues](https://github.com/n8n-io/n8n/issues)
:::

---

**Instalação concluída!** Vamos para os [Conceitos Básicos](./conceitos-basicos) para entender como o n8n funciona.
