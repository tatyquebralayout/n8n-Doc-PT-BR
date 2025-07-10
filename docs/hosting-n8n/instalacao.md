---
sidebar_position: 1
title: Introdução
description: Guia completo para hospedar n8n em produção - instalação, configuração, escalonamento e segurança
keywords: [n8n, hosting, hospedagem, produção, instalação, configuração, escalonamento, segurança]
---


# <ion-icon name="information-circle-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Introdução

Bem-vindo ao guia completo de **hospedagem n8n em produção**! Esta seção abrange todos os aspectos essenciais para implantar, configurar, escalar e proteger sua instalação n8n em ambiente empresarial.

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você encontrará aqui

### 🚀 **Instalação e Deploy**

- **Métodos de instalação** (Docker, NPM, Cloud, Desktop)
- **Deploy em provedores** (AWS, Azure, GCP)
- **Configuração inicial** e primeiros passos
- **Ambientes de desenvolvimento** e produção

### ⚙️ **Configuração e Otimização**

- **Variáveis de ambiente** essenciais
- **Configuração de banco de dados** (PostgreSQL, MySQL)
- **Sistema de filas** com Redis
- **SSL/HTTPS** e certificados

### 📈 **Escalonamento e Performance**

- **Clustering** e alta disponibilidade
- **Load balancing** e distribuição de carga
- **Otimização de performance** e monitoramento
- **Estratégias de crescimento**

### 🔒 **Segurança e Compliance**

- **Autenticação** e controle de acesso
- **Usuários e permissões** (RBAC)
- **Backup e recovery** estratégias
- **Monitoramento** e alertas

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Instalação e Deploy {#instalação-e-deploy}

### [Instalação via Docker](./instalacao/docker)

**Containerização completa** com isolamento e facilidade de deployment:

- **Melhor para:** Produção, ambientes isolados
- **Vantagens:** Isolamento, portabilidade, fácil escalabilidade
- **Requisitos:** Docker instalado

**[→ Ver guia Docker](./instalacao/docker)**

### [Instalação via NPM](./instalacao/npm)

**Instalação direta** via Node Package Manager:

- **Melhor para:** Desenvolvimento, testes locais
- **Vantagens:** Instalação rápida, controle total
- **Requisitos:** Node.js 18+ e npm

**[→ Ver guia NPM](./instalacao/npm)**

### [Instalação na Nuvem](./instalacao/cloud)

**Plataforma n8n Cloud** totalmente gerenciada:

- **Melhor para:** Uso empresarial, sem manutenção
- **Vantagens:** Zero configuração, suporte oficial
- **Requisitos:** Apenas uma conta

**[→ Ver guia Cloud](./instalacao/cloud)**

### [Instalação Desktop](./instalacao/desktop)

**Aplicação desktop** para uso local:

- **Melhor para:** Usuários não-técnicos, uso pessoal
- **Vantagens:** Interface nativa, instalação simples
- **Requisitos:** Windows, macOS ou Linux

**[→ Ver guia Desktop](./instalacao/desktop)**

### [Deploy AWS Brasil](./instalacao/aws-brasil)

**Deploy específico** para AWS Brasil:

- **Melhor para:** Empresas brasileiras, compliance LGPD
- **Vantagens:** Infraestrutura local, suporte em português
- **Requisitos:** Conta AWS Brasil

**[→ Ver guia AWS Brasil](./instalacao/aws-brasil)**

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração e Otimização

### [Variáveis de Ambiente](./configuracao/variaveis-ambiente)

**Configuração de variáveis** essenciais para produção:

- **Configurações básicas** e avançadas
- **Segurança** e separação de ambientes
- **Exemplos** para Docker/Kubernetes

**[→ Ver Variáveis de Ambiente](./configuracao/variaveis-ambiente)**

### [Configuração de Database](./configuracao/database)

**Guia para banco de dados** em produção:

- **PostgreSQL** (recomendado) e MySQL
- **Otimizações** e configurações avançadas
- **Backup**, replicação e cloud

**[→ Ver Configuração de Database](./configuracao/database)**

### [Configuração de Filas](./configuracao/queues)

**Sistema de filas** para processamento escalável:

- **Redis** para processamento distribuído
- **Workers** e gerenciamento de jobs
- **Escalabilidade** e monitoramento

**[→ Ver Configuração de Filas](./configuracao/queues)**

### [SSL/HTTPS](./configuracao/ssl-https)

**Configuração de HTTPS** seguro:

- **Certificados** e renovação automática
- **Nginx** e proxy reverso
- **Security headers** e checklist

**[→ Ver SSL/HTTPS](./configuracao/ssl-https)**

---

## <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Escalonamento e Performance

### [Clustering](./escalonamento/clustering)

**Alta disponibilidade** com clustering:

- **Kubernetes** e Docker Swarm
- **Configuração** de múltiplos nós
- **Failover** e recuperação

**[→ Ver Clustering](./escalonamento/clustering)**

### [Load Balancing](./escalonamento/load-balancing)

**Distribuição de carga** e balanceamento:

- **Nginx**, HAProxy e Traefik
- **Estratégias** de balanceamento
- **Health checks** e monitoramento

**[→ Ver Load Balancing](./escalonamento/load-balancing)**

### [Performance](./escalonamento/performance)

**Otimização** e monitoramento de performance:

- **Métricas** essenciais e benchmarks
- **Otimizações** de banco e cache
- **Monitoramento** e alertas

**[→ Ver Performance](./escalonamento/performance)**

---

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Segurança e Compliance

### [Autenticação e Acesso](./seguranca/autenticacao)

**Métodos de autenticação** seguros:

- **2FA**, SSO e LDAP/AD
- **Controle de sessão** e timeout
- **Restrições de IP** e segurança

**[→ Ver Autenticação e Acesso](./seguranca/autenticacao)**

### [Usuários e Permissões](./seguranca/usuarios-permissoes)

**Controle granular** de acesso:

- **Sistema RBAC** completo
- **Permissões** por workflow e credencial
- **Auditoria** e templates organizacionais

**[→ Ver Usuários e Permissões](./seguranca/usuarios-permissoes)**

### [Backup e Recovery](./seguranca/backup-recovery)

**Estratégias robustas** de proteção de dados:

- **Estratégia 3-2-1** para backup
- **Scripts automatizados** e cloud
- **Disaster recovery** e testes

**[→ Ver Backup e Recovery](./seguranca/backup-recovery)**

### [Monitoramento e Alertas](./seguranca/monitoring)

**Observabilidade** e alertas proativos:

- **Métricas** essenciais de sistema
- **Dashboards** e centralização de logs
- **Integração APM** e alertas

**[→ Ver Monitoramento e Alertas](./seguranca/monitoring)**

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Qual Método Escolher?

### Para Desenvolvimento Local

```
NPM → Flexibilidade total
Docker → Ambiente isolado
Desktop → Interface amigável
```

### Para Produção

```
Docker → Containerização robusta
Cloud → Solução gerenciada
NPM → Controle granular
```

### Para Empresas

```
Cloud → Suporte oficial + SLA
Docker → Deploy próprio
Clustering → Alta disponibilidade
```

---

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Requisitos Gerais

Independente do método escolhido, certifique-se de ter:

### Requisitos Mínimos

- **RAM:** 512 MB (2GB+ recomendado)
- **CPU:** 1 core (2+ cores recomendado)
- **Armazenamento:** 1GB (10GB+ para produção)
- **Rede:** Porta 5678 disponível (ou personalizada)

### Requisitos por SO

| Sistema | Suporte | Notas |
|---------|---------|-------|
| **Linux** | Completo | Recomendado para produção |
| **macOS** | Completo | Ótimo para desenvolvimento |
| **Windows** | Completo | Use WSL2 para melhor performance |

---

## <ion-icon name="play-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Início Rápido

Para testar rapidamente o n8n:

```bash
# <ion-icon name="cloud-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Usando Docker (mais rápido)
docker run -it --rm -p 5678:5678 n8nio/n8n

# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Usando NPM (mais direto)
npx n8n
```

:::tip Dica
Para uma primeira experiência, recomendamos começar com o **Docker** para produção ou **NPM** para desenvolvimento local.
:::

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Implementação por Fase

### Fase 1: Instalação (Semana 1)

- [ ] Escolher método de instalação
- [ ] Configurar ambiente básico
- [ ] Testar funcionalidade
- [ ] Configurar backup básico

### Fase 2: Configuração (Semana 2)

- [ ] Configurar banco de dados
- [ ] Configurar variáveis de ambiente
- [ ] Implementar SSL/HTTPS
- [ ] Configurar autenticação básica

### Fase 3: Segurança (Semana 3)

- [ ] Implementar RBAC
- [ ] Configurar 2FA
- [ ] Configurar backup robusto
- [ ] Implementar monitoramento

### Fase 4: Escalonamento (Semana 4)

- [ ] Configurar clustering
- [ ] Implementar load balancing
- [ ] Otimizar performance
- [ ] Configurar alertas avançados

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Checklist de Produção

### Instalação

- [ ] Método de instalação escolhido
- [ ] Ambiente configurado
- [ ] Funcionalidade testada
- [ ] Documentação criada

### Configuração

- [ ] Banco de dados configurado
- [ ] Variáveis de ambiente definidas
- [ ] SSL/HTTPS implementado
- [ ] Autenticação configurada

### Segurança

- [ ] RBAC implementado
- [ ] Backup configurado
- [ ] Monitoramento ativo
- [ ] Logs centralizados

### Escalonamento

- [ ] Clustering configurado
- [ ] Load balancing implementado
- [ ] Performance otimizada
- [ ] Alertas configurados

---

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

Agora que você conhece as opções de hosting:

1. **[Escolha seu método de instalação](#instalação-e-deploy)** - Docker, NPM, Cloud ou Desktop
2. **[Configure seu ambiente](./configuracao/variaveis-ambiente)** - Variáveis e configurações essenciais
3. **[Implemente segurança](./seguranca/autenticacao)** - Autenticação e controle de acesso
4. **[Prepare para escalar](./escalonamento/clustering)** - Clustering e alta disponibilidade

---

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Úteis

### Documentação Oficial

- [Documentação n8n](https://docs.n8n.io/)
- [Hosting n8n](https://docs.n8n.io/hosting/)
- [Segurança n8n](https://docs.n8n.io/hosting/security/)

### Comunidade

- [Discord n8n](https://discord.gg/n8n)
- [GitHub n8n](https://github.com/n8n-io/n8n)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/n8n)

---

:::tip **Dica Pro**
Implemente a hospedagem em fases, começando pelos fundamentos e progredindo para recursos avançados. Sempre teste suas configurações antes de aplicar em produção.
:::

:::warning **Importante**
Para produção, sempre use HTTPS, configure backup automático e implemente monitoramento. A segurança e disponibilidade são críticas.
:::

:::info **Recurso Adicional**
Considere usar n8n Cloud para começar rapidamente e migrar para self-hosted conforme suas necessidades crescem.
:::

---

**Escolha seu método preferido acima e siga o guia específico para começar!**
