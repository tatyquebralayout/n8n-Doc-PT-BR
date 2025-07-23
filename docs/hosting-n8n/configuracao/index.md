---
sidebar_position: 1
title: Configuração
description: Configure n8n para ambientes de produção robustos e seguros
keywords: [n8n, configuração, variáveis, banco de dados, redis, ssl, https]
---

# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração do n8n

Configure sua instância n8n para ambientes de produção com segurança, performance e escalabilidade. Esta seção abrange todas as configurações essenciais para um deploy robusto.

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você encontrará aqui

- [Variáveis de Ambiente](#variaveis-de-ambiente): Configuração essencial e segurança
- [Banco de Dados](#banco-de-dados): PostgreSQL, MySQL e otimizações
- [Sistema de Filas](#sistema-de-filas): Redis e processamento distribuído
- [SSL/HTTPS](#ssl-https): Segurança e certificados
- [Conceitos Fundamentais](#conceitos-fundamentais): Arquitetura e componentes
- [Checklist de Produção](#checklist-de-producao): Configurações essenciais

---

## <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Variáveis de Ambiente {#variaveis-de-ambiente}

**[Configuração Completa](./variaveis-ambiente)** – Variáveis essenciais, segurança, performance e separação de ambientes

**Principais configurações:**
- **N8N_BASIC_AUTH_ACTIVE**: Autenticação básica
- **N8N_ENCRYPTION_KEY**: Chave de criptografia
- **N8N_DATABASE_TYPE**: Tipo de banco de dados
- **N8N_REDIS_URL**: URL do Redis para filas

---

## <ion-icon name="server-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Banco de Dados {#banco-de-dados}

**[Configuração Completa](./database)** – PostgreSQL (recomendado), MySQL, otimizações e backup

**Opções disponíveis:**
- **PostgreSQL**: Recomendado para produção
- **MySQL**: Alternativa compatível
- **SQLite**: Apenas para desenvolvimento

---

## <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Sistema de Filas {#sistema-de-filas}

**[Configuração Completa](./queues)** – Redis, processamento distribuído, workers e escalabilidade

**Benefícios:**
- **Processamento paralelo** de workflows
- **Escalabilidade horizontal** com múltiplos workers
- **Resiliência** contra falhas
- **Performance** otimizada

---

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> SSL/HTTPS {#ssl-https}

**[Configuração Completa](./ssl-https)** – HTTPS seguro, certificados, Nginx e security headers

**Segurança essencial:**
- **Certificados SSL/TLS** para criptografia
- **Security headers** para proteção
- **Renovação automática** de certificados
- **Configuração Nginx** para proxy reverso

---

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conceitos Fundamentais {#conceitos-fundamentais}

### Arquitetura de Configuração

O n8n utiliza uma arquitetura modular que permite:

- **Separação de responsabilidades** entre componentes
- **Escalabilidade independente** de cada serviço
- **Configuração flexível** para diferentes ambientes
- **Manutenção simplificada** com isolamento

### Componentes Principais

1. **Web Server**: Interface e API REST
2. **Database**: Armazenamento persistente
3. **Queue System**: Processamento assíncrono
4. **File Storage**: Arquivos temporários
5. **Reverse Proxy**: SSL e load balancing

### Ambientes de Configuração

- **Desenvolvimento**: Configuração mínima
- **Teste**: Configuração similar à produção
- **Produção**: Configuração completa e segura

---

## <ion-icon name="checkmark-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Checklist de Produção {#checklist-de-producao}

### Segurança
- [ ] **Autenticação configurada** (Basic Auth ou OAuth)
- [ ] **HTTPS habilitado** com certificado válido
- [ ] **Variáveis sensíveis** em variáveis de ambiente
- [ ] **Firewall configurado** para portas necessárias

### Performance
- [ ] **Banco de dados otimizado** (PostgreSQL recomendado)
- [ ] **Redis configurado** para filas
- [ ] **Logs configurados** para monitoramento
- [ ] **Backup automatizado** implementado

### Monitoramento
- [ ] **Health checks** configurados
- [ ] **Alertas** para falhas críticas
- [ ] **Métricas** de performance coletadas
- [ ] **Logs centralizados** para análise

---

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Configure [Variáveis de Ambiente](./variaveis-ambiente)** para sua instância
2. **Configure [Banco de Dados](./database)** para produção
3. **Implemente [SSL/HTTPS](./ssl-https)** para segurança

---

## <ion-icon name="link-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[Instalação](../instalacao/)** – Instale antes de configurar
- **[Segurança](../seguranca/)** – Proteja sua instância
- **[Escalonamento](../escalonamento/)** – Otimize performance

---

> <span style={{fontSize: '18px', fontWeight: 'bold'}}>**Configure sua instância para produção e garanta automações seguras e escaláveis!**</span>
