---
sidebar_position: 1
title: Guia de Instalação do n8n – Visão Panorâmica
description: Visão geral dos métodos de instalação do n8n e como escolher a melhor opção
slug: /primeiros-passos/guia-instalacao
keywords: [n8n, instalação, cloud, self-hosted, npm, docker, guia]
---

<ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Guia de Instalação do **n8n** – Visão Panorâmica

Bem-vindo(a) à **documentação brasileira** do n8n! Nesta seção você descobrirá **sobre o que** vamos falar – os três métodos oficiais de instalação do n8n –, entenderá **por que** cada abordagem existe e aprenderá **como** escolher a que melhor se encaixa no seu cenário. Nas próximas páginas, cada método será detalhado passo a passo, com exemplos práticos e recomendações de melhores práticas.

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Por que três rotas de instalação?

| Necessidade frequente                     | Caminho recomendado                                                          |
| ----------------------------------------- | ---------------------------------------------------------------------------- |
| **Agilidade e zero‑manutenção**           | **n8n Cloud** – SaaS mantido pelo próprio time do n8n                        |
| **Controle total e personalização**       | **Self‑hosted** – você gerencia a infraestrutura (Docker, VPS, on‑prem etc.) |
| **Experimentos locais e desenvolvimento** | **Instalação local via `npm`** – roda em minutos no seu laptop               |

:::tip **Flexibilidade do n8n**
Ter opções flexíveis permite que o projeto evolua de protótipo a produção sem trocar de ferramenta.
:::

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Plataformas Disponíveis

### n8n Cloud

* **O que é?** Serviço totalmente hospedado, gerenciado e escalável pelos criadores do n8n.
* **Ideal para** times que buscam *time‑to‑value* imediato, suporte oficial e zero sobrecarga operacional.
* **Vantagens‑chave**
  * Provisionamento instantâneo – crie a conta e comece em segundos.
  * Escalabilidade automática, backups diários e monitoramento incluídos.
  * Recursos Enterprise nativos (RBAC, ambientes, SAML).
  * One-click upgrades para as versões mais recentes.
  * Managed OAuth para autenticação.
* **Pontos de atenção**
  * Plano pago (com *free trial*). Cobrança por usuário e/ou execuções.
  * Customizações de sistema operacional ou banco de dados não estão sob seu controle.
  * **Restrição geográfica**: Não disponível na Rússia e Belarus.

### Self‑hosted (Auto‑hospedado)

* **O que é?** Você instala o n8n em sua própria infraestrutura – VPS, bare‑metal ou Kubernetes.
* **Opções disponíveis**
  * **Community Edition** – gratuita, licença Sustainable Use.
  * **Enterprise Edition** – recursos avançados sob licença comercial.
* **Quando escolher?**
  * Integração com redes privadas, VPNs ou bancos on‑prem.
  * Exigências de compliance, soberania de dados ou políticas internas rigorosas.
  * Necessidade de plugins e extensões de código específicos.
  * Controle total sobre dados e infraestrutura.
* **Pré‑requisitos essenciais**
  * **Docker** (recomendado) ou instalação manual.
  * PostgreSQL + Redis para escalar com filas.
  * Know‑how DevOps: TLS, backups e observabilidade.

### Instalação Local via **npm** (Node.js)

* **Objetivo**: ambiente sandbox para desenvolvimento, testes rápidos ou demonstrações offline.
* **Requisitos mínimos**
  * **Node.js ≥ 20.19 ≤ 24.x** e **npm**.
  * RAM: mínimo 2GB, recomendado 4GB+.
  * Disco: 1GB livre para instalação.
* **Passo‑a‑passo turbo**
  1. Instalar globalmente: `npm install -g n8n`
  2. Iniciar: `n8n` ou `n8n start`
  3. Acessar: `http://localhost:5678`
* **Limitações**
  * Sem HTTPS/túnel por padrão – use `--tunnel` se precisar de webhooks externos.
  * Não indicado para produção sem hardening de segurança.
  * Dados salvos localmente (SQLite por padrão).

:::warning **Importante**
A instalação local via npm é ideal para desenvolvimento e testes, mas não é recomendada para produção sem configurações adequadas de segurança.
:::

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Qual rota escolher?

| Cenário real                                                   | Caminho sugerido |
| -------------------------------------------------------------- | ---------------- |
| **MVP ou PoC pública em minutos**                              | **n8n Cloud**    |
| **Produção de alto volume + requisitos de segurança próprios** | **Self‑hosted**  |
| **Criação de nodes customizados ou testes offline**            | **npm local**    |
| **Integração com sistemas legados on-premise**                 | **Self‑hosted**  |
| **Demonstrações e workshops**                                  | **npm local**    |
| **Compliance rigoroso (LGPD, GDPR, etc.)**                     | **Self‑hosted**  |

:::tip Dica Pro
Não tem certeza de qual método escolher? Comece com npm local para experimentar rapidamente, depois migre para n8n Cloud ou Self-hosted conforme suas necessidades evoluem.
:::

---

## <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Licenças e Versões

### Versões Gratuitas

* **n8n Cloud**: Trial gratuito de 14 dias
* **Self-hosted Community Edition**: Totalmente gratuito
* **npm local**: Totalmente gratuito

### Versões Pagas

* **n8n Cloud**: Planos pagos por usuário/execuções
* **Self-hosted Enterprise**: Licença comercial para recursos avançados

### Licenciamento

O n8n utiliza o modelo **fair-code**:
* **Sustainable Use License** para a Community Edition
* **Enterprise License** para recursos comerciais

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos passos

1. **[n8n Cloud](./instalacao-cloud)** – preços, isolamento e SLA.
2. **[Self-hosted (Auto-hospedado)](./instalacao-self-hosted)** – guias Docker, escalabilidade e boas práticas DevOps.

<div style={{fontSize: '1.2em', fontWeight: 'bold', margin: '2rem 0', padding: '1rem', borderLeft: '4px solid #ea4b71', backgroundColor: '#f8f9fa'}}>

**Siga conosco nas próximas páginas para mergulhar em cada opção e escolher, implementar e manter o método que mais se ajusta ao seu projeto.**

</div>
