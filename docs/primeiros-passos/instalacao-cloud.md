---
sidebar_position: 3
title: n8n Cloud
description: Guia completo para instalação e configuração do n8n Cloud
slug: /primeiros-passos/instalacao-cloud
keywords: [n8n, cloud, saas, hospedado, instalação]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="cloud-outline" size={32} color="#10b981" /> n8n Cloud

O **n8n Cloud** é o serviço oficial hospedado pelos criadores do n8n, oferecendo uma experiência completa e gerenciada para executar seus workflows.

## <IonicIcon name="checkmark-circle-outline" size={24} color="#10b981" /> O que é o n8n Cloud?

O n8n Cloud é uma plataforma **Software-as-a-Service (SaaS)** que elimina toda a complexidade de infraestrutura, permitindo que você foque exclusivamente na criação e execução de seus workflows.

### **Principais Características:**

- ✅ **Zero configuração** - Comece em segundos
- ✅ **Escalabilidade automática** - Cresce com suas necessidades
- ✅ **Backups automáticos** - Seus dados sempre seguros
- ✅ **Monitoramento 24/7** - Equipe n8n cuida da infraestrutura
- ✅ **Recursos Enterprise** - RBAC, ambientes, SAML incluídos

---

## <IonicIcon name="card-outline" size={24} color="#10b981" /> Planos e Preços

### **Free Trial**
- **Duração**: 14 dias
- **Execuções**: 1.000 execuções
- **Usuários**: Até 5 usuários
- **Recursos**: Todos os recursos incluídos

### **Starter Plan**
- **Preço**: $20/mês por usuário
- **Execuções**: 10.000 execuções/mês
- **Usuários**: Ilimitados
- **Suporte**: Email

### **Professional Plan**
- **Preço**: $50/mês por usuário
- **Execuções**: 50.000 execuções/mês
- **Usuários**: Ilimitados
- **Suporte**: Email + Chat
- **Recursos**: Ambientes, RBAC avançado

### **Enterprise Plan**
- **Preço**: Sob consulta
- **Execuções**: Ilimitadas
- **Recursos**: SAML, SSO, SLA garantido
- **Suporte**: Dedicado

---

## <IonicIcon name="rocket-outline" size={24} color="#10b981" /> Como Começar

### **1. Criar Conta**

1. Acesse [cloud.n8n.io](https://cloud.n8n.io)
2. Clique em **"Start Free Trial"**
3. Preencha seus dados:
   - **Nome completo**
   - **Email corporativo**
   - **Senha segura**
4. Confirme seu email

### **2. Configuração Inicial**

Após o login, você será direcionado para o dashboard:

1. **Escolha seu workspace** (ou crie um novo)
2. **Configure domínio personalizado** (opcional)
3. **Adicione membros da equipe** (opcional)
4. **Configure notificações** (opcional)

### **3. Primeiro Workflow**

1. Clique em **"Create Workflow"**
2. Escolha um template ou comece do zero
3. Configure seu primeiro trigger
4. Teste a execução

---

## <IonicIcon name="settings-outline" size={24} color="#10b981" /> Configurações Avançadas

### **Domínio Personalizado**

Configure um domínio próprio para sua instância:

1. Vá em **Settings > Workspace**
2. Clique em **"Custom Domain"**
3. Adicione seu domínio
4. Configure DNS conforme instruções
5. Aguarde a verificação (pode levar até 24h)

### **Integração com SSO**

Para planos Professional e Enterprise:

1. **Settings > Authentication**
2. Configure **SAML** ou **OAuth**
3. Adicione provedores de identidade
4. Configure mapeamento de usuários

### **Ambientes**

Crie ambientes separados para desenvolvimento e produção:

1. **Settings > Environments**
2. Clique em **"Create Environment"**
3. Configure variáveis específicas
4. Defina permissões por ambiente

---

## <IonicIcon name="shield-checkmark-outline" size={24} color="#10b981" /> Segurança e Compliance

### **Certificações**
- **SOC 2 Type II** - Controles de segurança
- **GDPR** - Conformidade com dados europeus
- **ISO 27001** - Gestão de segurança da informação

### **Recursos de Segurança**
- **Criptografia em trânsito** - TLS 1.3
- **Criptografia em repouso** - AES-256
- **Backups automáticos** - Diários e redundantes
- **Monitoramento 24/7** - Detecção de anomalias

### **Controles de Acesso**
- **RBAC** - Controle granular de permissões
- **2FA** - Autenticação de dois fatores
- **Audit logs** - Registro completo de atividades
- **IP whitelist** - Restrição por endereços IP

---

## <IonicIcon name="analytics-outline" size={24} color="#10b981" /> Monitoramento e Analytics

### **Dashboard de Execuções**
- **Taxa de sucesso** por workflow
- **Tempo de execução** médio
- **Erros mais comuns** e soluções
- **Uso de recursos** e otimizações

### **Alertas e Notificações**
- **Falhas críticas** em tempo real
- **Limite de execuções** próximo
- **Performance degradada**
- **Manutenções programadas**

---

## <IonicIcon name="help-circle-outline" size={24} color="#10b981" /> Suporte e Recursos

### **Canais de Suporte**
- **Documentação oficial** - Guias detalhados
- **Community Forum** - Troca de experiências
- **Discord** - Suporte em tempo real
- **Email** - Suporte técnico direto

### **Recursos Adicionais**
- **Templates prontos** - Workflows pré-configurados
- **Webinars** - Treinamentos semanais
- **Best practices** - Guias de otimização
- **API Reference** - Documentação técnica

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#10b981" /> Próximos Passos

Agora que você conhece o n8n Cloud:

1. **[Criar Primeiro Workflow](./primeiro-workflow)** - Aprenda a construir workflows
2. **[Conceitos Básicos](./conceitos-basicos)** - Entenda os fundamentos
3. **[Integrações](../integracoes/index)** - Conecte suas aplicações

### **Outros Métodos de Instalação**

- **[Self-hosted](./instalacao)** - Controle total da infraestrutura
- **[Instalação Local via npm](./instalacao-npm)** - Para desenvolvimento

---

:::tip **Dica Pro**
Comece com o **Free Trial** para experimentar todos os recursos. Você pode migrar facilmente para planos pagos conforme suas necessidades crescem.
:::

:::info **Migração de Self-hosted**
Já tem uma instância self-hosted? O n8n oferece ferramentas para migrar workflows e dados para o Cloud sem interrupção.
::: 
