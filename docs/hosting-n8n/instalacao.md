---
sidebar_position: 1
title: Introdução
description: Guia completo para hospedar n8n em produção - instalação, configuração, escalonamento e segurança
keywords: [n8n, hosting, hospedagem, produção, instalação, configuração, escalonamento, segurança]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="server-outline" size={32} color="#ea4b71" /> Introdução

Bem-vindo ao guia completo de **hospedagem n8n em produção**! Esta seção abrange todos os aspectos essenciais para implantar, configurar, escalar e proteger sua instalação n8n em ambiente empresarial.

## <IonicIcon name="school-outline" size={24} color="#ea4b71" /> O que você encontrará aqui

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

## <IonicIcon name="rocket-outline" size={24} color="#ea4b71" /> Instalação e Deploy

### <IonicIcon name="logo-docker" size={20} color="#10b981" /> [Instalação via Docker](./instalacao/docker)

**Containerização completa** com isolamento e facilidade de deployment:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Melhor para:** Produção, ambientes isolados
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Vantagens:** Isolamento, portabilidade, fácil escalabilidade
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Requisitos:** Docker instalado

**[→ Ver guia Docker](./instalacao/docker)**

### <IonicIcon name="logo-npm" size={20} color="#10b981" /> [Instalação via NPM](./instalacao/npm)

**Instalação direta** via Node Package Manager:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Melhor para:** Desenvolvimento, testes locais
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Vantagens:** Instalação rápida, controle total
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Requisitos:** Node.js 18+ e npm

**[→ Ver guia NPM](./instalacao/npm)**

### <IonicIcon name="cloud-outline" size={20} color="#10b981" /> [Instalação na Nuvem](./instalacao/cloud)

**Plataforma n8n Cloud** totalmente gerenciada:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Melhor para:** Uso empresarial, sem manutenção
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Vantagens:** Zero configuração, suporte oficial
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Requisitos:** Apenas uma conta

**[→ Ver guia Cloud](./instalacao/cloud)**

### <IonicIcon name="desktop-outline" size={20} color="#10b981" /> [Instalação Desktop](./instalacao/desktop)

**Aplicação desktop** para uso local:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Melhor para:** Usuários não-técnicos, uso pessoal
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Vantagens:** Interface nativa, instalação simples
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Requisitos:** Windows, macOS ou Linux

**[→ Ver guia Desktop](./instalacao/desktop)**

### <IonicIcon name="logo-aws" size={20} color="#10b981" /> [Deploy AWS Brasil](./instalacao/aws-brasil)

**Deploy específico** para AWS Brasil:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Melhor para:** Empresas brasileiras, compliance LGPD
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Vantagens:** Infraestrutura local, suporte em português
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Requisitos:** Conta AWS Brasil

**[→ Ver guia AWS Brasil](./instalacao/aws-brasil)**

---

## <IonicIcon name="settings-outline" size={24} color="#ea4b71" /> Configuração e Otimização

### <IonicIcon name="key-outline" size={20} color="#10b981" /> [Variáveis de Ambiente](./configuracao/variaveis-ambiente)

**Configuração de variáveis** essenciais para produção:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Configurações básicas** e avançadas
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Segurança** e separação de ambientes
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Exemplos** para Docker/Kubernetes

**[→ Ver Variáveis de Ambiente](./configuracao/variaveis-ambiente)**

### <IonicIcon name="server-outline" size={20} color="#10b981" /> [Configuração de Database](./configuracao/database)

**Guia para banco de dados** em produção:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **PostgreSQL** (recomendado) e MySQL
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Otimizações** e configurações avançadas
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Backup**, replicação e cloud

**[→ Ver Configuração de Database](./configuracao/database)**

### <IonicIcon name="trending-up-outline" size={20} color="#10b981" /> [Configuração de Filas](./configuracao/queues)

**Sistema de filas** para processamento escalável:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Redis** para processamento distribuído
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Workers** e gerenciamento de jobs
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Escalabilidade** e monitoramento

**[→ Ver Configuração de Filas](./configuracao/queues)**

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> [SSL/HTTPS](./configuracao/ssl-https)

**Configuração de HTTPS** seguro:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Certificados** e renovação automática
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Nginx** e proxy reverso
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Security headers** e checklist

**[→ Ver SSL/HTTPS](./configuracao/ssl-https)**

---

## <IonicIcon name="trending-up-outline" size={24} color="#ea4b71" /> Escalonamento e Performance

### <IonicIcon name="git-network-outline" size={20} color="#10b981" /> [Clustering](./escalonamento/clustering)

**Alta disponibilidade** com clustering:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Kubernetes** e Docker Swarm
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Configuração** de múltiplos nós
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Failover** e recuperação

**[→ Ver Clustering](./escalonamento/clustering)**

### <IonicIcon name="share-outline" size={20} color="#10b981" /> [Load Balancing](./escalonamento/load-balancing)

**Distribuição de carga** e balanceamento:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Nginx**, HAProxy e Traefik
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Estratégias** de balanceamento
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Health checks** e monitoramento

**[→ Ver Load Balancing](./escalonamento/load-balancing)**

### <IonicIcon name="speedometer-outline" size={20} color="#10b981" /> [Performance](./escalonamento/performance)

**Otimização** e monitoramento de performance:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Métricas** essenciais e benchmarks
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Otimizações** de banco e cache
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Monitoramento** e alertas

**[→ Ver Performance](./escalonamento/performance)**

---

## <IonicIcon name="shield-checkmark-outline" size={24} color="#ea4b71" /> Segurança e Compliance

### <IonicIcon name="key-outline" size={20} color="#10b981" /> [Autenticação e Acesso](./seguranca/autenticacao)

**Métodos de autenticação** seguros:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **2FA**, SSO e LDAP/AD
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Controle de sessão** e timeout
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Restrições de IP** e segurança

**[→ Ver Autenticação e Acesso](./seguranca/autenticacao)**

### <IonicIcon name="people-outline" size={20} color="#10b981" /> [Usuários e Permissões](./seguranca/usuarios-permissoes)

**Controle granular** de acesso:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Sistema RBAC** completo
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Permissões** por workflow e credencial
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Auditoria** e templates organizacionais

**[→ Ver Usuários e Permissões](./seguranca/usuarios-permissoes)**

### <IonicIcon name="backup-outline" size={20} color="#10b981" /> [Backup e Recovery](./seguranca/backup-recovery)

**Estratégias robustas** de proteção de dados:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Estratégia 3-2-1** para backup
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Scripts automatizados** e cloud
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Disaster recovery** e testes

**[→ Ver Backup e Recovery](./seguranca/backup-recovery)**

### <IonicIcon name="analytics-outline" size={20} color="#10b981" /> [Monitoramento e Alertas](./seguranca/monitoring)

**Observabilidade** e alertas proativos:
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Métricas** essenciais de sistema
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Dashboards** e centralização de logs
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Integração APM** e alertas

**[→ Ver Monitoramento e Alertas](./seguranca/monitoring)**

---

## <IonicIcon name="help-circle-outline" size={24} color="#ea4b71" /> Qual Método Escolher?

### <IonicIcon name="code-outline" size={20} color="#10b981" /> Para Desenvolvimento Local
```
NPM → Flexibilidade total
Docker → Ambiente isolado
Desktop → Interface amigável
```

### <IonicIcon name="rocket-outline" size={20} color="#10b981" /> Para Produção
```
Docker → Containerização robusta
Cloud → Solução gerenciada
NPM → Controle granular
```

### <IonicIcon name="business-outline" size={20} color="#10b981" /> Para Empresas
```
Cloud → Suporte oficial + SLA
Docker → Deploy próprio
Clustering → Alta disponibilidade
```

---

## <IonicIcon name="hardware-chip-outline" size={24} color="#ea4b71" /> Requisitos Gerais

Independente do método escolhido, certifique-se de ter:

### <IonicIcon name="speedometer-outline" size={20} color="#10b981" /> Requisitos Mínimos
- <IonicIcon name="hardware-chip-outline" size={16} color="#6b7280" /> **RAM:** 512 MB (2GB+ recomendado)
- <IonicIcon name="cpu-outline" size={16} color="#6b7280" /> **CPU:** 1 core (2+ cores recomendado)
- <IonicIcon name="save-outline" size={16} color="#6b7280" /> **Armazenamento:** 1GB (10GB+ para produção)
- <IonicIcon name="globe-outline" size={16} color="#6b7280" /> **Rede:** Porta 5678 disponível (ou personalizada)

### Requisitos por SO
| Sistema | Suporte | Notas |
|---------|---------|-------|
| **Linux** | Completo | Recomendado para produção |
| **macOS** | Completo | Ótimo para desenvolvimento |
| **Windows** | Completo | Use WSL2 para melhor performance |

---

## <IonicIcon name="flash-outline" size={24} color="#ea4b71" /> Início Rápido

Para testar rapidamente o n8n:

```bash
# Usando Docker (mais rápido)
docker run -it --rm -p 5678:5678 n8nio/n8n

# Usando NPM (mais direto)
npx n8n
```

:::tip Dica
Para uma primeira experiência, recomendamos começar com o **Docker** para produção ou **NPM** para desenvolvimento local.
:::

---

## <IonicIcon name="construct-outline" size={24} color="#ea4b71" /> Implementação por Fase

### <IonicIcon name="rocket-outline" size={20} color="#10b981" /> Fase 1: Instalação (Semana 1)
- [ ] Escolher método de instalação
- [ ] Configurar ambiente básico
- [ ] Testar funcionalidade
- [ ] Configurar backup básico

### <IonicIcon name="settings-outline" size={20} color="#10b981" /> Fase 2: Configuração (Semana 2)
- [ ] Configurar banco de dados
- [ ] Configurar variáveis de ambiente
- [ ] Implementar SSL/HTTPS
- [ ] Configurar autenticação básica

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> Fase 3: Segurança (Semana 3)
- [ ] Implementar RBAC
- [ ] Configurar 2FA
- [ ] Configurar backup robusto
- [ ] Implementar monitoramento

### <IonicIcon name="trending-up-outline" size={20} color="#10b981" /> Fase 4: Escalonamento (Semana 4)
- [ ] Configurar clustering
- [ ] Implementar load balancing
- [ ] Otimizar performance
- [ ] Configurar alertas avançados

---

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> Checklist de Produção

### <IonicIcon name="rocket-outline" size={20} color="#10b981" /> Instalação
- [ ] Método de instalação escolhido
- [ ] Ambiente configurado
- [ ] Funcionalidade testada
- [ ] Documentação criada

### <IonicIcon name="settings-outline" size={20} color="#10b981" /> Configuração
- [ ] Banco de dados configurado
- [ ] Variáveis de ambiente definidas
- [ ] SSL/HTTPS implementado
- [ ] Autenticação configurada

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> Segurança
- [ ] RBAC implementado
- [ ] Backup configurado
- [ ] Monitoramento ativo
- [ ] Logs centralizados

### <IonicIcon name="trending-up-outline" size={20} color="#10b981" /> Escalonamento
- [ ] Clustering configurado
- [ ] Load balancing implementado
- [ ] Performance otimizada
- [ ] Alertas configurados

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> Próximos Passos

Agora que você conhece as opções de hosting:

1. **[Escolha seu método de instalação](#instalação-e-deploy)** - Docker, NPM, Cloud ou Desktop
2. **[Configure seu ambiente](./configuracao/variaveis-ambiente)** - Variáveis e configurações essenciais
3. **[Implemente segurança](./seguranca/autenticacao)** - Autenticação e controle de acesso
4. **[Prepare para escalar](./escalonamento/clustering)** - Clustering e alta disponibilidade

---

## <IonicIcon name="link-outline" size={24} color="#ea4b71" /> Recursos Úteis

### <IonicIcon name="document-text-outline" size={20} color="#10b981" /> Documentação Oficial
- <IonicIcon name="link-outline" size={16} color="#6b7280" /> [Documentação n8n](https://docs.n8n.io/)
- <IonicIcon name="server-outline" size={16} color="#6b7280" /> [Hosting n8n](https://docs.n8n.io/hosting/)
- <IonicIcon name="shield-checkmark-outline" size={16} color="#6b7280" /> [Segurança n8n](https://docs.n8n.io/hosting/security/)

### <IonicIcon name="people-circle-outline" size={20} color="#10b981" /> Comunidade
- <IonicIcon name="logo-discord" size={16} color="#6b7280" /> [Discord n8n](https://discord.gg/n8n)
- <IonicIcon name="logo-github" size={16} color="#6b7280" /> [GitHub n8n](https://github.com/n8n-io/n8n)
- <IonicIcon name="logo-stackoverflow" size={16} color="#6b7280" /> [Stack Overflow](https://stackoverflow.com/questions/tagged/n8n)

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
