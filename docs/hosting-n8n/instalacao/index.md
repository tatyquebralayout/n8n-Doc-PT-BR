---
sidebar_position: 1
title: Instalação
description: Guias completos para instalar n8n em diferentes ambientes
keywords: [n8n, instalação, docker, npm, cloud, desktop, aws, azure, gcp]
---

# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Instalação do n8n

Escolha o método de instalação mais adequado para seu ambiente e necessidades. Cada opção oferece diferentes benefícios em termos de facilidade, controle e escalabilidade.

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você encontrará aqui

- [Métodos de Instalação](#metodos-de-instalacao): Docker, NPM, Cloud e Desktop
- [Deploy na Nuvem](#deploy-na-nuvem): AWS, Azure e GCP
- [Conceitos Fundamentais](#conceitos-fundamentais): Escolhendo o método ideal
- [Comparação de Métodos](#comparacao-de-metodos): Vantagens e desvantagens

---

## <ion-icon name="construct-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Métodos de Instalação {#metodos-de-instalacao}

### [Docker](./docker)
**Containerização completa** com isolamento e facilidade de deployment
- **Ideal para:** Produção, ambientes isolados
- **Vantagens:** Isolamento, portabilidade, fácil escalabilidade
- **Requisitos:** Docker instalado

### [NPM](./npm)
**Instalação direta** via Node Package Manager
- **Ideal para:** Desenvolvimento, testes locais
- **Vantagens:** Instalação rápida, controle total
- **Requisitos:** Node.js 18+ e npm

### [Cloud](./cloud)
**Plataforma n8n Cloud** totalmente gerenciada
- **Ideal para:** Uso empresarial, sem manutenção
- **Vantagens:** Zero configuração, suporte oficial
- **Requisitos:** Apenas uma conta

### [Desktop](./desktop)
**Aplicação desktop** para uso local
- **Ideal para:** Usuários não-técnicos, uso pessoal
- **Vantagens:** Interface nativa, instalação simples
- **Requisitos:** Windows, macOS ou Linux

---

## <ion-icon name="cloud-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Deploy na Nuvem {#deploy-na-nuvem}

### [AWS Brasil](./aws-brasil)
**Deploy específico** para AWS Brasil
- **Ideal para:** Empresas brasileiras, compliance LGPD
- **Vantagens:** Infraestrutura local, suporte em português
- **Requisitos:** Conta AWS Brasil

### [Azure Brasil](./azure-brasil)
**Deploy no Microsoft Azure** Brasil
- **Ideal para:** Empresas que usam ecossistema Microsoft
- **Vantagens:** Integração com serviços Microsoft
- **Requisitos:** Conta Azure

### [GCP Brasil](./gcp-brasil)
**Deploy no Google Cloud Platform** Brasil
- **Ideal para:** Empresas que usam ecossistema Google
- **Vantagens:** Integração com serviços Google
- **Requisitos:** Conta GCP

---

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conceitos Fundamentais {#conceitos-fundamentais}

### Escolhendo o Método Ideal

**Para Desenvolvimento:**
- **Desktop** ou **NPM** para testes rápidos
- **Docker** para ambientes isolados

**Para Produção:**
- **Docker** para controle total
- **Cloud** para facilidade de manutenção
- **Nuvem** (AWS/Azure/GCP) para escalabilidade

**Para Empresas:**
- **Cloud** para simplicidade
- **Docker** em infraestrutura própria para controle
- **Nuvem** para compliance e segurança

---

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Comparação de Métodos {#comparacao-de-metodos}

| Método | Facilidade | Controle | Escalabilidade | Manutenção |
|--------|------------|----------|----------------|------------|
| **Desktop** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐ | ⭐⭐⭐⭐⭐ |
| **NPM** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Docker** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Cloud** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Nuvem** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |

---

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Escolha seu método** baseado em suas necessidades
2. **Siga o guia específico** para instalação
3. **Configure** sua instância após instalação

---

## <ion-icon name="link-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[Configuração](../configuracao/)** – Configure após instalação
- **[Segurança](../seguranca/)** – Proteja sua instância
- **[Escalonamento](../escalonamento/)** – Otimize performance

---

> <span style={{fontSize: '18px', fontWeight: 'bold'}}>**Escolha o método ideal e comece sua jornada de automação com n8n!**</span>
