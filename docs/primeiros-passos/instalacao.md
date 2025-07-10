---
sidebar_position: 2
title: Instalação Self-hosted do n8n
description: Guia completo para instalação self-hosted do n8n com Docker e npm
slug: /primeiros-passos/instalacao
keywords: [n8n, instalação, docker, npm, setup, self-hosted]
---

# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalação Self-hosted do n8n

Esta página detalha os métodos de instalação **self-hosted** do n8n, incluindo Docker (recomendado) e npm. Para uma visão geral de todos os métodos, consulte o [Guia de Instalação – Visão Panorâmica](./guia-instalacao).

:::warning **Conhecimento Técnico Necessário**
<ion-icon name="alert-triangle-outline" style={{ fontSize: '16px', color: '#f59e0b' }}></ion-icon> O self-hosting do n8n requer conhecimento técnico, incluindo:

* Configuração e gerenciamento de servidores e containers
* Gerenciamento de recursos de aplicação e escalabilidade
* Segurança de servidores e aplicações
* Configuração do n8n

O n8n recomenda self-hosting apenas para usuários experientes. Erros podem levar a perda de dados, problemas de segurança e tempo de inatividade. Se você não tem experiência em gerenciar servidores, recomendamos o [n8n Cloud](./instalacao-cloud).
:::


:::note **Versões do n8n**
<ion-icon name="time-outline" style={{ fontSize: '16px', color: '#3b82f6' }}></ion-icon> O n8n lança uma nova versão menor na maioria das semanas. A versão `latest` é para uso em produção. `next` é a versão mais recente e deve ser tratada como beta: pode ser instável.

**Versão atual `latest`**: 1.101.1  
**Versão atual `next`**: 1.102.1
:::

## <ion-icon name="list-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Pré-requisitos

### Para Instalação via npm
- **Node.js**: Versão entre 20.19 e 24.x, inclusive
- **npm**: Versão mais recente

### Para Instalação via Docker
- **Docker Desktop** (Windows/Mac) ou **Docker Engine** (Linux)
- **Docker Compose** (opcional, para configurações avançadas)

:::note **Usuários Linux**
<ion-icon name="desktop-outline" style={{ fontSize: '16px', color: '#3b82f6' }}></ion-icon> O Docker Desktop está disponível para Mac e Windows. Usuários Linux devem instalar o [Docker Engine](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/install/) individualmente para sua distribuição.
:::

## <ion-icon name="download-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Métodos de Instalação

### Comparação dos Métodos

| Método | Facilidade | Recursos | Manutenção | Recomendado para |
|--------|------------|----------|------------|------------------|
| **Docker** | ⭐⭐⭐⭐⭐ | Completo | Fácil | Produção |
| **npm** | ⭐⭐⭐ | Básico | Moderada | Desenvolvimento |
| **npx** | ⭐⭐ | Limitado | N/A | Teste |

### Docker (Recomendado)

O Docker oferece as seguintes vantagens:

* <ion-icon name="checkmark-circle-outline" style={{ fontSize: '16px', color: '#10b981' }}></ion-icon> Instala o n8n em um ambiente limpo
* <ion-icon name="checkmark-circle-outline" style={{ fontSize: '16px', color: '#10b981' }}></ion-icon> Configuração mais fácil para seu banco de dados preferido
* <ion-icon name="checkmark-circle-outline" style={{ fontSize: '16px', color: '#10b981' }}></ion-icon> Evita problemas devido a diferentes sistemas operacionais
* <ion-icon name="checkmark-circle-outline" style={{ fontSize: '16px', color: '#10b981' }}></ion-icon> Evita problemas de compatibilidade
* <ion-icon name="checkmark-circle-outline" style={{ fontSize: '16px', color: '#10b981' }}></ion-icon> Facilita a migração para novos hosts ou ambientes

#### Instalação Básica

```bash title="Criar volume para persistência"
docker volume create n8n_data
```

```bash title="Executar n8n com Docker"
docker run -it --rm \
--name n8n \
-p 5678:5678 \
-v n8n_data:/home/node/.n8n \
docker.n8n.io/n8nio/n8n
```

Este comando cria um volume para armazenar dados persistentes, baixa a imagem necessária do n8n e inicia seu container na porta `5678`. Para salvar seu trabalho entre reinicializações do container, ele também monta um volume Docker, `n8n_data`, para persistir seus dados localmente.

Após a execução, você pode acessar o n8n abrindo: [http://localhost:5678](http://localhost:5678)



<details>
<summary><ion-icon name="settings-outline" style={{ fontSize: '16px', color: '#6b7280' }}></ion-icon> <strong>Configurações Avançadas do Docker</strong> <ion-icon name="chevron-down-outline" style={{ fontSize: '14px', color: '#6b7280' }}></ion-icon></summary>

#### Usando com PostgreSQL

Por padrão, o n8n usa SQLite para salvar credenciais, execuções passadas e workflows. O n8n também suporta PostgreSQL, configurável usando variáveis de ambiente.

Para usar o n8n com PostgreSQL, execute os seguintes comandos, substituindo os placeholders pelos seus valores reais:

```bash title="n8n com PostgreSQL"
docker volume create n8n_data

docker run -it --rm \
--name n8n \
-p 5678:5678 \
-e DB_TYPE=postgresdb \
-e DB_POSTGRESDB_DATABASE=<POSTGRES_DATABASE> \
-e DB_POSTGRESDB_HOST=<POSTGRES_HOST> \
-e DB_POSTGRESDB_PORT=<POSTGRES_PORT> \
-e DB_POSTGRESDB_USER=<POSTGRES_USER> \
-e DB_POSTGRESDB_SCHEMA=<POSTGRES_SCHEMA> \
-e DB_POSTGRESDB_PASSWORD=<POSTGRES_PASSWORD> \
-v n8n_data:/home/node/.n8n \
docker.n8n.io/n8nio/n8n
```

#### Configurando Fuso Horário

Para definir o fuso horário que o n8n deve usar, você pode definir a variável de ambiente `GENERIC_TIMEZONE`. Nós orientados a agendamento, como o Schedule Trigger, usam isso para determinar o fuso horário correto.

```bash title="Configurar fuso horário"
docker volume create n8n_data

docker run -it --rm \
--name n8n \
-p 5678:5678 \
-e GENERIC_TIMEZONE="America/Sao_Paulo" \
-e TZ="America/Sao_Paulo" \
-v n8n_data:/home/node/.n8n \
docker.n8n.io/n8nio/n8n
```

</details>

---

### npm

npm é uma forma rápida de começar com o n8n na sua máquina local.

#### Testar com npx

Você pode testar o n8n sem instalá-lo usando npx:

```bash title="Teste rápido com npx"
npx n8n
```

Este comando baixará tudo que é necessário para iniciar o n8n. Você pode então acessar o n8n e começar a construir workflows abrindo [http://localhost:5678](http://localhost:5678).



#### Instalar Globalmente com npm

Para instalar o n8n globalmente, use npm:

```bash title="Instalação via npm"
npm install n8n -g
```

Para instalar ou atualizar para uma versão específica do n8n, use a sintaxe `@` para especificar a versão:

```bash title="Instalar versão específica"
npm install -g n8n@1.101.1
```

Para instalar a versão `next`:

```bash title="Instalar versão next"
npm install -g n8n@next
```

Após a instalação, inicie o n8n executando:

```bash title="Iniciar n8n"
n8n
# ou
n8n start
```

## <ion-icon name="construct-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração Inicial

### Primeiro Acesso

Após a instalação, acesse `http://localhost:5678` e você verá a tela de configuração inicial.

### Criar Conta de Administrador

:::warning **Importante**
<ion-icon name="shield-checkmark-outline" style={{ fontSize: '16px', color: '#f59e0b' }}></ion-icon> Na primeira execução, você deve criar uma conta de administrador para proteger sua instância.
:::

1. Preencha os dados do administrador:
   - **Nome**: Seu nome completo
   - **Email**: Seu endereço de email
   - **Senha**: Uma senha segura

2. Clique em **Criar Conta**

<details>
<summary><ion-icon name="options-outline" style={{ fontSize: '16px', color: '#6b7280' }}></ion-icon> <strong>Configurações Avançadas</strong> <ion-icon name="chevron-down-outline" style={{ fontSize: '14px', color: '#6b7280' }}></ion-icon></summary>

### Configurações Avançadas

#### Variáveis de Ambiente

Você pode configurar o n8n usando variáveis de ambiente:

```bash title="Variáveis de ambiente básicas"
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

```yaml title="Docker Compose com PostgreSQL"
version: '3.8'

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
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

```bash title="Iniciar com Docker Compose"
docker-compose up -d
```

</details>

## <ion-icon name="search-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificando a Instalação

### Interface Web

Acesse `http://localhost:5678` e verifique se a interface carrega corretamente.

### Verificar Status (Docker)

Se estiver usando Docker, você pode verificar o status do container:

```bash title="Verificar status do container"
docker ps
```

### Verificar Logs (Docker)

Para ver os logs em tempo real:

```bash title="Ver logs do container"
docker logs -f n8n
```

### Teste Básico

1. Clique em **"+ Adicionar primeiro passo"**
2. Procure por **"Manual Trigger"**
3. Clique em **"Executar Workflow"**
4. Você deve ver uma execução bem-sucedida



## <ion-icon name="refresh-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Atualizando o n8n

### Atualização via Docker

Para atualizar o n8n no Docker:

```bash title="Atualizar n8n no Docker"
# 1. Baixar a versão mais recente
docker pull docker.n8n.io/n8nio/n8n

# 2. Parar o container atual
docker stop <container_id>

# 3. Remover o container
docker rm <container_id>

# 4. Iniciar com a nova imagem
docker run -it --rm \
--name n8n \
-p 5678:5678 \
-v n8n_data:/home/node/.n8n \
docker.n8n.io/n8nio/n8n
```

### Atualização via npm

```bash title="Atualizar n8n via npm"
# Atualizar para a versão mais recente
npm update -g n8n

# Instalar a versão next
npm install -g n8n@next
```

### Revertendo uma Atualização

Se precisar reverter uma atualização:

1. Instale a versão anterior desejada
2. Se a atualização envolveu migração de banco de dados:
   - Verifique a documentação e notas de versão
   - Execute `n8n db:revert` na versão atual para reverter o banco

:::info **Backup Recomendado**
<ion-icon name="cloud-upload-outline" style={{ fontSize: '16px', color: '#3b82f6' }}></ion-icon> Sempre faça backup dos seus dados antes de atualizar o n8n em produção.
:::

## <ion-icon name="medical-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Solução de Problemas

### Problemas Comuns

#### Porta já em uso

```bash title="Resolver conflito de porta"
# Verificar qual processo está usando a porta 5678
netstat -tulpn | grep 5678

# Usar uma porta diferente
N8N_PORT=5679 n8n start
```

#### Problemas de permissão (Linux/Mac)

```bash title="Corrigir permissões (Linux/Mac)"
# Dar permissões corretas
sudo chown -R $(whoami) ~/.n8n
```

#### Erro de memória

```bash title="Aumentar memória do Node.js"
# Aumentar limite de memória do Node.js
NODE_OPTIONS="--max-old-space-size=4096" n8n start
```

#### Problemas no Windows

Se você está enfrentando problemas no Windows, certifique-se de que seu ambiente Node.js está configurado corretamente. Siga o [guia da Microsoft para instalar NodeJS no Windows](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).

### Logs

Para debugar problemas, verifique os logs:

```bash title="Verificar logs detalhados"
# Logs mais detalhados
N8N_LOG_LEVEL=debug n8n start

# Com Docker
docker logs container_id
```

<details>
<summary><ion-icon name="analytics-outline" style={{ fontSize: '16px', color: '#6b7280' }}></ion-icon> <strong>Comandos de Diagnóstico Avançados</strong> <ion-icon name="chevron-down-outline" style={{ fontSize: '14px', color: '#6b7280' }}></ion-icon></summary>

### Comandos de Diagnóstico Avançados

#### Verificar Recursos do Sistema

```bash title="Verificar uso de recursos"
# Verificar uso de CPU e memória
docker stats n8n

# Verificar espaço em disco
df -h
```

#### Verificar Conectividade

```bash title="Testar conectividade"
# Testar se a porta está acessível
curl -I http://localhost:5678

# Verificar se o container está respondendo
docker exec n8n curl -I http://localhost:5678
```

#### Verificar Configurações

```bash title="Verificar configurações"
# Verificar variáveis de ambiente
docker exec n8n env | grep N8N

# Verificar arquivos de configuração
docker exec n8n ls -la /home/node/.n8n
```

</details>

---

Se encontrar problemas, consulte:

- [FAQ](../faq)
- [Comunidade Discord](https://discord.gg/n8n)
- [GitHub Issues](https://github.com/n8n-io/n8n/issues)
- [Fórum da Comunidade](https://community.n8n.io/c/questions/12)

## <ion-icon name="arrow-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

Agora que o n8n está instalado e funcionando:

- [x] <ion-icon name="checkmark-circle-outline" style={{ fontSize: '16px', color: '#10b981' }}></ion-icon> **Instalação concluída**
- [ ] <ion-icon name="book-outline" style={{ fontSize: '16px', color: '#6b7280' }}></ion-icon> **[Conceitos Básicos](./conceitos-basicos)** - Entenda os fundamentos
- [ ] <ion-icon name="play-outline" style={{ fontSize: '16px', color: '#6b7280' }}></ion-icon> **[Primeiro Workflow](./primeiro-workflow)** - Crie seu primeiro fluxo
- [ ] <ion-icon name="link-outline" style={{ fontSize: '16px', color: '#6b7280' }}></ion-icon> **[Conectar Aplicações](./conectar-aplicacoes)** - Integre suas ferramentas

### Outros Métodos de Instalação

- <ion-icon name="cloud-outline" style={{ fontSize: '16px', color: '#3b82f6' }}></ion-icon> **[n8n Cloud](./instalacao-cloud)** - Instalação via serviço hospedado
- <ion-icon name="code-outline" style={{ fontSize: '16px', color: '#6b7280' }}></ion-icon> **[Self-hosted (Auto-hospedado)](./instalacao-self-hosted)** - Para desenvolvimento e produção

---

> <span style={{fontSize: '18px', fontWeight: 'bold'}}>**"A instalação é apenas o primeiro passo. O verdadeiro poder do n8n está na automação que você vai criar!"**</span>


