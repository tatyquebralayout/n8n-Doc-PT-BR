---
sidebar_position: 1
title: Introdução
description: Configure e gerencie sua instância n8n em produção
keywords: [n8n, hosting, produção, configuração, deployment, servidor]
---

# <ion-icon name="server-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Hosting n8n

O n8n pode ser hospedado de várias formas, desde instalações locais até ambientes de produção escaláveis. Esta seção abrange tudo o que você precisa saber para configurar e manter uma instância n8n robusta e segura.

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você encontrará aqui

- [Instalação e Configuração](#instalacao-e-configuracao): Guias para diferentes ambientes
- [Segurança e Compliance](#seguranca-e-compliance): Autenticação, backup e LGPD
- [Escalonamento](#escalonamento): Clustering, load balancing e performance
- [Cloud e On-Premises](#cloud-e-on-premises): AWS, Azure, GCP e Docker
- [Conceitos Fundamentais](#conceitos-fundamentais): Tipos de deploy e componentes
- [Arquiteturas de Deploy](#arquiteturas-de-deploy): Single, multi-instance e microservices

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Instalação e Configuração {#instalacao-e-configuracao}

- **Instalação**: Guias para diferentes ambientes
- **Configuração**: Ajuste parâmetros e variáveis
- **Database**: Configure bancos de dados
- **Queues**: Configure filas de processamento

---

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Segurança e Compliance {#seguranca-e-compliance}

- **Autenticação**: Configure acesso seguro
- **Backup e Recovery**: Proteja seus dados
- **Monitoring**: Monitore performance e saúde
- **LGPD**: Conformidade com regulamentações brasileiras

---

## <ion-icon name="trending-up-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Escalonamento {#escalonamento}

- **Clustering**: Configure múltiplas instâncias
- **Load Balancing**: Distribua carga entre servidores
- **Performance**: Otimize para alta demanda

---

## <ion-icon name="cloud-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Cloud e On-Premises {#cloud-e-on-premises}

- **AWS Brasil**: Deploy na Amazon Web Services
- **Azure Brasil**: Deploy no Microsoft Azure
- **GCP Brasil**: Deploy no Google Cloud Platform
- **Docker**: Containerização e orquestração

---

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conceitos Fundamentais {#conceitos-fundamentais}

### Tipos de Deploy

- **Self-hosted**: Controle total sobre infraestrutura
- **Cloud**: Escalabilidade e gerenciamento simplificado
- **Hybrid**: Combinação de recursos locais e na nuvem
- **Containerized**: Deploy em containers (Docker/Kubernetes)

### Componentes do Sistema

- **Web Server**: Interface web do n8n
- **Database**: Armazenamento de workflows e execuções
- **Queue System**: Processamento assíncrono
- **File Storage**: Armazenamento de arquivos temporários

### Requisitos de Sistema

- **CPU**: Mínimo 2 cores, recomendado 4+
- **RAM**: Mínimo 4GB, recomendado 8GB+
- **Storage**: SSD recomendado para performance
- **Network**: Conexão estável para APIs externas

---

## <ion-icon name="git-network-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Arquiteturas de Deploy {#arquiteturas-de-deploy}

### Single Instance

Ideal para desenvolvimento e pequenas cargas:

- **Vantagens**: Simplicidade, baixo custo
- **Desvantagens**: Sem alta disponibilidade
- **Uso**: Desenvolvimento, testes, pequenas empresas

### Multi-Instance

Para ambientes de produção com alta disponibilidade:

- **Load Balancer**: Distribui carga entre instâncias
- **Shared Database**: Banco de dados centralizado
- **Shared Storage**: Armazenamento compartilhado
- **Health Checks**: Monitoramento de saúde

### Microservices

Para ambientes complexos e escaláveis:

- **API Gateway**: Roteamento de requisições
- **Service Discovery**: Descoberta automática de serviços
- **Configuration Management**: Gerenciamento centralizado
- **Monitoring**: Observabilidade completa

---

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Escolha sua [Instalação](./instalacao/)** baseada em suas necessidades
2. **Configure [Segurança](./seguranca/)** para proteger sua instância
3. **Otimize [Performance](./escalonamento/)** para sua carga de trabalho

---

## <ion-icon name="link-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[Primeiros Passos](../primeiros-passos/)** – Conceitos básicos
- **[Usando n8n](../usando-n8n/index.md)** – Guias práticos
- **[API](../api/)** – Automação via API
- **[Comunidade](../comunidade/)** – Suporte e discussões

---

> <span style={{fontSize: '18px', fontWeight: 'bold'}}>**Configure sua infraestrutura para automações em escala e leve o n8n para produção!**</span>
