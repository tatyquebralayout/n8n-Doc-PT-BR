---
sidebar_position: 1
title: Embed
description: Integre o n8n em suas aplicações através do sistema de embed
keywords: [n8n, embed, integração, iframe, white-label, workflow]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="code-outline" size={32} color="#ea4b71" /> Embed do n8n

Bem-vindo à seção de Embed do n8n! Aqui você aprenderá como integrar o n8n em suas aplicações através do sistema de embed, permitindo oferecer automação como parte de sua plataforma.

---

## <IonicIcon name="school-outline" size={24} color="#ea4b71" /> O que você encontrará aqui

Selecione abaixo o tópico desejado para acessar guias completos de integração, configuração e gerenciamento do n8n embarcado:

---

- [<IonicIcon name="checkbox-outline" size={20} color="#10b981" /> Preparação](./preparacao)
  <br/><span style={{ color: '#6b7280' }}>Pré-requisitos técnicos, infraestrutura, domínios permitidos, CORS, segurança e checklist completo.</span>

- [<IonicIcon name="rocket-outline" size={20} color="#10b981" /> Implementação](./implementacao)
  <br/><span style={{ color: '#6b7280' }}>Configuração de parâmetros, implantação em produção, SSO, performance, monitoramento e troubleshooting.</span>

- [<IonicIcon name="settings-outline" size={20} color="#10b981" /> Gerenciamento](./gerenciamento)
  <br/><span style={{ color: '#6b7280' }}>Controle de workflows, white labelling, versionamento, auditoria, backup e integração com sistemas externos.</span>

---

## <IonicIcon name="bulb-outline" size={24} color="#ea4b71" /> Conceitos Fundamentais

### <IonicIcon name="construct-outline" size={20} color="#10b981" /> Sistema de Embed
O n8n oferece um sistema de embed que permite:
- <IonicIcon name="link-outline" size={16} color="#6b7280" /> Integrar workflows em aplicações web
- <IonicIcon name="color-palette-outline" size={16} color="#6b7280" /> Personalizar a interface do usuário
- <IonicIcon name="shield-checkmark-outline" size={16} color="#6b7280" /> Controlar acesso e permissões
- <IonicIcon name="flash-outline" size={16} color="#6b7280" /> Oferecer automação como serviço

### <IonicIcon name="business-outline" size={20} color="#10b981" /> Casos de Uso
O embed é ideal para:
- **SaaS Platforms**: Oferecer automação aos clientes
- **Aplicações Empresariais**: Integrar workflows internos
- **Marketplaces**: Vender automações personalizadas
- **Dashboards**: Visualizar dados de workflows

### <IonicIcon name="trending-up-outline" size={20} color="#10b981" /> Benefícios
- **Experiência Integrada**: n8n se torna parte da sua aplicação
- **Controle Total**: Gerencie usuários e permissões
- **Personalização**: Adapte a interface às suas necessidades
- **Escalabilidade**: Suporte a múltiplos usuários e organizações

---

## <IonicIcon name="server-outline" size={24} color="#ea4b71" /> Arquitetura

### <IonicIcon name="layers-outline" size={20} color="#10b981" /> Componentes Principais
1. **n8n Instance**: Instância do n8n configurada para embed
2. **Embed Interface**: Interface personalizada para seus usuários
3. **Authentication System**: Sistema de autenticação integrado
4. **Workflow Management**: Gerenciamento de workflows por usuário

### <IonicIcon name="arrow-forward-outline" size={20} color="#10b981" /> Fluxo de Integração
1. **Preparação**: Configure a instância do n8n
2. **Implementação**: Integre via iframe ou API
3. **Gerenciamento**: Administre usuários e workflows

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> Próximos Passos

1. **Revise os [Pré-requisitos](./preparacao/prerequisitos)** para entender os requisitos
2. **Configure a [Implementação](./implementacao/configuracao)** para começar
3. **Aprenda sobre [Gerenciamento](./gerenciamento/gerenciar-workflows)** para administrar

---

## <IonicIcon name="link-outline" size={24} color="#ea4b71" /> Recursos Relacionados

- **[Tutorial Básico](../tutorial-basico/instalacao)** - Conceitos fundamentais
- **[Hosting n8n](../hosting-n8n/instalacao)** - Configuração de instância
- **[API](../api)** - Integração programática

---

:::tip **Dica Pro**
Comece pela seção de Preparação para garantir que todos os pré-requisitos estejam atendidos antes de implementar o embed.
:::

:::info **Recurso Adicional**
Consulte a documentação oficial do n8n para detalhes técnicos avançados sobre o sistema de embed.
::: 