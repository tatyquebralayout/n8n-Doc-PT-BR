---
sidebar_position: 1
title: Guia de Instalação do n8n – Visão Panorâmica
description: Visão geral dos métodos de instalação do n8n e como escolher a melhor opção
slug: /tutorial-basico/guia-instalacao
keywords: [n8n, instalação, cloud, self-hosted, npm, docker, guia]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="compass-outline" size={32} color="#ea4b71" /> Guia de Instalação do **n8n** – Visão Panorâmica

Bem-vindo(a) à **documentação brasileira** do n8n! Nesta seção você descobrirá **sobre o que** vamos falar – os três métodos oficiais de instalação do n8n –, entenderá **por que** cada abordagem existe e aprenderá **como** escolher a que melhor se encaixa no seu cenário. Nas próximas páginas, cada método será detalhado passo a passo, com exemplos práticos e recomendações de melhores práticas.

---

## <IonicIcon name="help-circle-outline" size={24} color="#ea4b71" /> 1 | Por que três rotas de instalação?

| Necessidade frequente                     | Caminho recomendado                                                          |
| ----------------------------------------- | ---------------------------------------------------------------------------- |
| **Agilidade e zero‑manutenção**           | **n8n Cloud** – SaaS mantido pelo próprio time do n8n                        |
| **Controle total e personalização**       | **Self‑hosted** – você gerencia a infraestrutura (Docker, VPS, on‑prem etc.) |
| **Experimentos locais e desenvolvimento** | **Instalação local via `npm`** – roda em minutos no seu laptop               |

> *Ter opções flexíveis permite que o projeto evolua de protótipo a produção sem trocar de ferramenta.*

---

## <IonicIcon name="list-outline" size={24} color="#ea4b71" /> 2 | Métodos Oficiais de Instalação

### <IonicIcon name="cloud-outline" size={20} color="#10b981" /> a) n8n Cloud

* **O que é?** Serviço totalmente hospedado, gerenciado e escalável pelos criadores do n8n.
* **Ideal para** times que buscam *time‑to‑value* imediato, suporte oficial e zero sobrecarga operacional.
* **Vantagens‑chave**
  * Provisionamento instantâneo – crie a conta e comece em segundos.
  * Escalabilidade automática, backups diários e monitoramento incluídos.
  * Recursos Enterprise nativos (RBAC, ambientes, SAML).
* **Pontos de atenção**
  * Plano pago (com *free trial*). Cobrança por usuário e/ou execuções.
  * Customizações de sistema operacional ou banco de dados não estão sob seu controle.

### <IonicIcon name="server-outline" size={20} color="#10b981" /> b) Self‑hosted (Auto‑hospedado)

* **O que é?** Você instala o n8n em sua própria infraestrutura – VPS, bare‑metal ou Kubernetes.
* **Sabores disponíveis**
  * **Community Edition** – gratuita.
  * **Enterprise Edition** – recursos avançados sob licença.
* **Quando escolher?**
  * Integração com redes privadas, VPNs ou bancos on‑prem.
  * Exigências de compliance, soberania de dados ou políticas internas rigorosas.
  * Necessidade de plugins e extensões de código específicos.
* **Pré‑requisitos essenciais**
  * **Docker** (recomendado) ou instalação manual.
  * PostgreSQL + Redis para escalar com filas.
  * Know‑how DevOps: TLS, backups e observabilidade.

### <IonicIcon name="logo-npm" size={20} color="#10b981" /> c) Instalação Local via **npm** (Node.js)

* **Objetivo**: ambiente sandbox para desenvolvimento, testes rápidos ou demonstrações offline.
* **Requisitos mínimos**
  * **Node.js ≥ 20.19 ≤ 24.x** e **npm**.
* **Passo‑a‑passo turbo**
  1. Instalar globalmente: `npm install -g n8n`
  2. Iniciar: `n8n` ou `n8n start`
* **Limitações**
  * Sem HTTPS/túnel por padrão – use `--tunnel` se precisar de webhooks externos.
  * Não indicado para produção sem hardening de segurança.

---

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> 3 | Qual rota escolher?

| Cenário real                                                   | Caminho sugerido |
| -------------------------------------------------------------- | ---------------- |
| **MVP ou PoC pública em minutos**                              | **n8n Cloud**    |
| **Produção de alto volume + requisitos de segurança próprios** | **Self‑hosted**  |
| **Criação de nodes customizados ou testes offline**            | **npm local**    |

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> 4 | Próximos passos

1. **[n8n Cloud](./instalacao-cloud)** – preços, isolamento e SLA.
2. **[Self‑hosted](./instalacao-self-hosted)** – guias Docker, escalabilidade e boas práticas DevOps.
3. **[npm local](./instalacao-npm)** – fluxo de desenvolvimento, debug e upgrade.

> *Siga conosco nas próximas páginas para mergulhar em cada opção e escolher, implementar e manter o método que mais se ajusta ao seu projeto.*

---

:::tip **Dica Pro**
Não tem certeza de qual método escolher? Comece com **npm local** para experimentar rapidamente, depois migre para **n8n Cloud** ou **Self-hosted** conforme suas necessidades evoluem.
::: 