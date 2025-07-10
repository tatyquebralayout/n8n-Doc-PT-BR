---
sidebar_position: 1
title: Introdução
description: Nodes de trigger para iniciar workflows automaticamente
keywords: [n8n, trigger nodes, gatilhos, webhooks, agendamento, eventos]
---

# <ion-icon name="information-circle-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Introdução

Os trigger nodes são o ponto de partida de qualquer workflow automatizado. Eles permitem que seus workflows sejam iniciados automaticamente baseados em eventos, horários ou ações específicas.

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você encontrará aqui

### App Triggers

- **Aplicações específicas**: Triggers de serviços como Gmail, Slack, GitHub
- **Eventos em tempo real**: Resposta a mudanças em aplicações
- **Integração nativa**: Triggers otimizados para cada serviço

### Event-based Triggers

- **Webhook Trigger**: Receba dados via HTTP
- **Email Trigger**: Processe emails automaticamente
- **File Trigger**: Monitore mudanças em arquivos

### Time-based Triggers

- **Manual Trigger**: Execução manual
- **Schedule Trigger**: Execução agendada
- **Cron Trigger**: Execução baseada em expressões cron

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conceitos Fundamentais

### O que são Trigger Nodes?

Trigger nodes são nodes especiais que:

- **Iniciam workflows** automaticamente
- **Aguardam eventos** específicos
- **Recebem dados** de fontes externas
- **Disparam execuções** baseadas em condições

### Tipos de Triggers

- **Event-driven**: Baseados em eventos externos
- **Time-based**: Baseados em horários
- **Manual**: Iniciados pelo usuário
- **Conditional**: Baseados em condições

### Fluxo de Dados

1. **Trigger**: Evento ou condição ativa o trigger
2. **Data**: Dados são capturados pelo trigger
3. **Processing**: Workflow processa os dados
4. **Output**: Resultados são enviados para destinos

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Categorias de Triggers

### App Triggers

Triggers específicos de aplicações:

- **Email**: Novos emails, respostas, anexos
- **Chat**: Novas mensagens, menções, reações
- **CRM**: Novos leads, mudanças de status
- **E-commerce**: Novos pedidos, mudanças de estoque

### Event-based Triggers

Triggers baseados em eventos:

- **Webhooks**: Receba dados de qualquer aplicação
- **File Changes**: Monitore mudanças em arquivos
- **Database**: Mudanças em bancos de dados
- **API Events**: Eventos de APIs externas

### Time-based Triggers

Triggers baseados em tempo:

- **Schedule**: Execução em horários específicos
- **Cron**: Expressões cron complexas
- **Interval**: Execução a cada X tempo
- **Manual**: Execução sob demanda

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Explore [App Triggers](./app-triggers/)** para triggers de aplicações específicas
2. **Aprenda [Event-based](./event-based/)** para triggers baseados em eventos
3. **Configure [Time-based](./time-based/)** para execução agendada

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Boas Práticas

### Configuração

- **Escolha o trigger apropriado** para seu caso de uso
- **Configure webhooks** de forma segura
- **Teste triggers** antes de usar em produção
- **Monitore execuções** regularmente

### Performance

- **Evite polling** quando webhooks estão disponíveis
- **Configure rate limits** adequadamente
- **Otimize horários** de execução
- **Monitore uso de recursos**

### Segurança

- **Valide dados** de entrada
- **Use HTTPS** para webhooks
- **Configure autenticação** adequada
- **Monitore logs** de acesso

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Casos de Uso Comuns

### Automação de Negócios

- **Novos leads**: Processe leads automaticamente
- **Pedidos**: Processe pedidos em tempo real
- **Notificações**: Envie alertas baseados em eventos
- **Relatórios**: Gere relatórios agendados

### Integração de Sistemas

- **Sincronização**: Sincronize dados entre sistemas
- **Backup**: Backup automático de dados
- **Monitoramento**: Monitore sistemas e serviços
- **Deploy**: Deploy automático baseado em eventos

### Produtividade

- **Lembretes**: Lembretes e notificações
- **Agendamento**: Agendamento automático
- **Processamento**: Processamento de dados em lote
- **Comunicação**: Comunicação automática

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[Built-in Nodes](../builtin-nodes/)** - Funcionalidades nativas
- **[App Nodes](../app-nodes/)** - Integrações com aplicações
- **[Webhooks](../webhooks)** - Conecte com aplicações via webhooks
- **[Flow Logic](../../logica-e-dados/01-flow-logic/)** - Controle de fluxo

---

**<ion-icon name="play-circle-outline" style={{ fontSize: '16px', color: '#ea4b71' }}></ion-icon> Automatize seus workflows com triggers inteligentes!**
