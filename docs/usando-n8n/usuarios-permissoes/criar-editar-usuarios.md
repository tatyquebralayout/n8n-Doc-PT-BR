---
sidebar_position: 2
title: Criar e Editar Usuários
description: Como adicionar, configurar e gerenciar usuários no n8n
keywords: [n8n, usuários, criar, editar, gerenciar, equipe, colaboração]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="person-add-outline" size={32} color="#ea4b71" /> Criar e Editar Usuários

Aprenda como adicionar novos membros à sua equipe, configurar suas permissões e gerenciar o acesso ao n8n de forma segura.

---

## <IonicIcon name="settings-outline" size={24} color="#ea4b71" /> 1 | Acessando Gerenciamento de Usuários

### <IonicIcon name="people-circle-outline" size={20} color="#10b981" /> Menu de Usuários

1. **Acesse o menu lateral** → Clique em **"Usuários"**
2. **Visualize todos os usuários** ativos
3. **Filtre por role** ou status
4. **Pesquise** usuários específicos

### <IonicIcon name="shield-outline" size={20} color="#10b981" /> Permissões Necessárias

**Para gerenciar usuários, você precisa:**
- **Role de Admin** ou **Owner**
- **Acesso** ao painel administrativo
- **Permissão** para criar/editar usuários

---

## <IonicIcon name="add-circle-outline" size={24} color="#ea4b71" /> 2 | Criando Novos Usuários

### <IonicIcon name="person-outline" size={20} color="#10b981" /> Passo a Passo

1. **Clique em "+ Adicionar Usuário"**
2. **Preencha os campos obrigatórios:**
   - **Nome completo**: Nome e sobrenome
   - **Email**: Endereço de email válido
   - **Role**: Função no sistema
3. **Configure opções adicionais:**
   - **Senha temporária** (se aplicável)
   - **Grupos** de usuários
   - **Tags** para organização
4. **Clique em "Criar Usuário"**

### <IonicIcon name="mail-outline" size={20} color="#10b981" /> Convite por Email

**Para convites automáticos:**

```json
{
  "inviteSettings": {
    "sendEmail": true,
    "emailTemplate": "default",
    "expirationDays": 7,
    "requirePasswordChange": true
  }
}
```

---

## <IonicIcon name="pencil-outline" size={24} color="#ea4b71" /> 3 | Editando Usuários Existentes

### <IonicIcon name="options-outline" size={20} color="#10b981" /> Ações Disponíveis

**Para cada usuário, você pode:**

- **Editar perfil**: Nome, email, role
- **Alterar senha**: Reset de senha
- **Suspender**: Desativar temporariamente
- **Excluir**: Remover permanentemente
- **Auditar**: Ver histórico de atividades

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> Alterando Roles

**Mudanças de role:**

1. **Acesse o usuário** na lista
2. **Clique em "Editar"**
3. **Selecione nova role** no dropdown
4. **Confirme a mudança**
5. **Notifique o usuário** sobre a alteração

---

## <IonicIcon name="key-outline" size={24} color="#ea4b71" /> 4 | Configurações de Autenticação

### <IonicIcon name="lock-closed-outline" size={20} color="#10b981" /> Métodos de Login

**Opções disponíveis:**

- **Email/Senha**: Autenticação tradicional
- **SSO (SAML/OAuth)**: Login corporativo
- **2FA**: Autenticação de dois fatores
- **LDAP**: Integração com diretório ativo

### <IonicIcon name="phone-portrait-outline" size={20} color="#10b981" /> Configurando 2FA

**Para ativar 2FA:**

1. **Acesse configurações** do usuário
2. **Clique em "Segurança"**
3. **Ative "Autenticação de dois fatores"**
4. **Escaneie QR code** com app autenticador
5. **Confirme** com código de verificação

---

## <IonicIcon name="people-outline" size={24} color="#ea4b71" /> 5 | Organizando Usuários

### <IonicIcon name="folder-outline" size={20} color="#10b981" /> Grupos de Usuários

**Crie grupos para facilitar gerenciamento:**

- **Equipe de Marketing**: Acesso a workflows de marketing
- **Equipe Financeira**: Acesso a dados financeiros
- **Desenvolvedores**: Acesso completo a workflows
- **Viewers**: Apenas visualização

### <IonicIcon name="pricetag-outline" size={20} color="#10b981" /> Tags e Categorização

**Use tags para organização:**

- **Departamento**: Marketing, Vendas, TI
- **Localização**: São Paulo, Rio de Janeiro
- **Projeto**: Projeto A, Projeto B
- **Senioridade**: Junior, Pleno, Senior

---

## <IonicIcon name="eye-outline" size={24} color="#ea4b71" /> 6 | Auditoria e Monitoramento

### <IonicIcon name="analytics-outline" size={20} color="#10b981" /> Logs de Atividade

**Monitore estas atividades:**

- **Login/Logout**: Horários de acesso
- **Criação de workflows**: Novos workflows criados
- **Execuções**: Workflows executados
- **Alterações**: Modificações em configurações
- **Acessos a dados**: Visualização de informações sensíveis

### <IonicIcon name="notifications-outline" size={20} color="#10b981" /> Alertas de Segurança

**Configure notificações para:**

```json
{
  "securityAlerts": {
    "failedLogins": {
      "threshold": 3,
      "action": "notify_admin"
    },
    "unusualActivity": {
      "newLocation": true,
      "unusualHours": true,
      "action": "notify_user"
    },
    "roleChanges": {
      "action": "notify_admin"
    }
  }
}
```

---

## <IonicIcon name="trash-outline" size={24} color="#ea4b71" /> 7 | Gerenciando Saídas

### <IonicIcon name="pause-circle-outline" size={20} color="#10b981" /> Suspensão Temporária

**Para suspender um usuário:**

1. **Acesse o usuário** na lista
2. **Clique em "Suspender"**
3. **Defina período** de suspensão
4. **Adicione motivo** (opcional)
5. **Confirme** a suspensão

### <IonicIcon name="close-circle-outline" size={20} color="#10b981" /> Exclusão Permanente

**Para excluir um usuário:**

1. **Faça backup** dos dados do usuário
2. **Transfira workflows** para outro usuário
3. **Revogue credenciais** compartilhadas
4. **Clique em "Excluir"**
5. **Confirme** a exclusão

---

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> 8 | Boas Práticas

### <IonicIcon name="shield-outline" size={20} color="#10b981" /> Segurança

- ✅ **Use roles mínimos** necessários
- ✅ **Ative 2FA** para todos os usuários
- ✅ **Monitore atividades** regularmente
- ✅ **Revogue acessos** de usuários que saíram
- ❌ **Não compartilhe** contas entre usuários
- ❌ **Evite** roles com privilégios excessivos

### <IonicIcon name="document-text-outline" size={20} color="#10b981" /> Documentação

**Mantenha registros de:**

- **Usuários criados** e suas roles
- **Mudanças de permissão** e motivos
- **Suspensões** e exclusões
- **Políticas** de acesso da empresa

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> 9 | Próximos passos

1. **[Roles e Permissões](./roles-permissoes)** - Definir níveis de acesso
2. **[Autenticação](./autenticacao)** - Configurar login seguro
3. **[Monitoramento](../monitoring/visualizar-execucoes)** - Acompanhar atividades

> *Agora você sabe como gerenciar usuários de forma segura. Mantenha sua equipe organizada e protegida!*

---

:::tip **Dica Pro**
Crie um processo de onboarding para novos usuários, incluindo treinamento sobre segurança e uso adequado do n8n.
:::

:::warning **Importante**
Sempre revogue acessos de usuários que deixam a empresa imediatamente. Não espere para fazer isso.
:::

:::info **Recurso Adicional**
Considere integrar com sistemas de gerenciamento de identidade (IAM) para automação de provisionamento de usuários.
::: 