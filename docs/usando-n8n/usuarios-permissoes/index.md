---
sidebar_position: 1
title: Usuários e Permissões
description: Aprenda a gerenciar usuários, definir permissões e controlar acesso no n8n
keywords: [n8n, usuários, permissões, acesso, roles, segurança, administração]
---

:::warning
<ion-icon name="time-outline" style={{ fontSize: '18px', color: '#f59e0b' }}></ion-icon> Esta página ainda está em processo de validação. O conteúdo pode sofrer alterações.
:::

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Usuários e Permissões

Bem-vindo à seção de gerenciamento de usuários e permissões do n8n! Aqui você aprenderá como configurar acesso seguro e colaborativo para sua equipe.

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você encontrará aqui

### Gerenciamento de Usuários

- **Criar e Editar Usuários**: Adicionar e configurar membros da equipe
- **Roles e Permissões**: Definir níveis de acesso apropriados
- **Autenticação**: Configurar métodos de login seguros

### Controle de Acesso

- **Políticas de Segurança**: Estabelecer regras de acesso
- **Auditoria**: Monitorar atividades dos usuários
- **Integração**: Conectar com sistemas de autenticação externos

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Conceitos Fundamentais

### O que são Roles?

Roles (funções) são grupos de permissões que definem o que cada usuário pode fazer no n8n:

- **Owner**: Acesso total ao sistema
- **Admin**: Gerenciamento de usuários e configurações
- **Editor**: Criar e editar workflows
- **Viewer**: Apenas visualizar workflows

### Hierarquia de Permissões

O n8n segue o princípio do menor privilégio:

- **Usuários recebem** apenas as permissões necessárias
- **Acesso é revogado** quando não é mais necessário
- **Atividades são registradas** para auditoria
- **Segurança é priorizada** sobre conveniência

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Comece com [Criar e Editar Usuários](./criar-editar-usuarios)** para adicionar sua equipe
2. **Aprenda sobre [Roles e Permissões](./roles-permissoes)** para definir acesso
3. **Explore [Autenticação](./autenticacao)** para configurar login seguro

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[Credenciais](../credenciais/compartilhamento)** - Compartilhar credenciais com usuários
- **[Monitoramento](../monitoring/visualizar-execucoes)** - Acompanhar atividades
- **[Segurança](../../hosting-n8n/seguranca/autenticacao)** - Configurações de segurança avançadas
