---
sidebar_position: 1
title: Instalação do n8n
description: Aprenda como instalar o n8n em diferentes ambientes
slug: /tutorial-basico/instalacao
keywords: [n8n, instalação, docker, npm, setup]
---

# Instalação do n8n

Existem várias formas de instalar e executar o n8n. Escolha a opção que melhor se adapta ao seu ambiente.

## Opções de Instalação

### 🐳 Docker (Recomendado)

A forma mais rápida e fácil de começar:

```bash
# Executar n8n com Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  n8nio/n8n
```

Acesse http://localhost:5678 no seu navegador.

### 📦 NPM

Para instalação via npm (requer Node.js 18+):

```bash
# Instalar globalmente
npm install n8n -g

# Executar
n8n start
```

### 🔧 NPX (Sem instalação)

Para testar sem instalar:

```bash
npx n8n
```

## Configuração Inicial

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
# Porta da aplicação
N8N_PORT=5678

# URL base (importante para webhooks)
N8N_PROTOCOL=https
N8N_HOST=seu-dominio.com

# Fuso horário
GENERIC_TIMEZONE=America/Sao_Paulo

# Banco de dados (opcional)
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

## Verificando a Instalação

### 1. Interface Web

Acesse `http://localhost:5678` e verifique se a interface carrega corretamente.

### 2. Teste Básico

1. Clique em **"+ Adicionar primeiro passo"**
2. Procure por **"Manual Trigger"**
3. Clique em **"Executar Workflow"**
4. Você deve ver uma execução bem-sucedida

## Próximos Passos

Agora que o n8n está instalado e funcionando:

1. 📖 [Conceitos Básicos](./conceitos-basicos) - Entenda os fundamentos
2. 🔧 [Primeiro Workflow](./primeiro-workflow) - Crie seu primeiro fluxo
3. 🔗 [Conectar Aplicações](./conectar-aplicacoes) - Integre suas ferramentas

## Solução de Problemas

### Problemas Comuns

#### Porta já em uso
```bash
# Verificar qual processo está usando a porta 5678
netstat -tulpn | grep 5678

# Usar uma porta diferente
N8N_PORT=5679 n8n start
```

#### Problemas de permissão (Linux/Mac)
```bash
# Dar permissões corretas
sudo chown -R $(whoami) ~/.n8n
```

#### Erro de memória
```bash
# Aumentar limite de memória do Node.js
NODE_OPTIONS="--max-old-space-size=4096" n8n start
```

### Logs

Para debugar problemas, verifique os logs:

```bash
# Logs mais detalhados
N8N_LOG_LEVEL=debug n8n start

# Com Docker
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