---
sidebar_position: 1
title: Segurança
description: Guia completo de segurança para n8n - autenticação, permissões, backup e monitoramento
keywords: [n8n, segurança, autenticação, permissões, backup, monitoramento, rbac, sso, 2fa]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="shield-checkmark-outline" size={32} color="#ea4b71" /> Segurança

Bem-vindo ao guia completo de **segurança para n8n**! Esta seção abrange todos os aspectos essenciais para proteger sua instalação n8n em ambiente de produção, desde autenticação básica até estratégias avançadas de disaster recovery.

## <IonicIcon name="school-outline" size={24} color="#ea4b71" /> O que você encontrará aqui

### 🔐 **Autenticação e Controle de Acesso**
- **Métodos de autenticação** seguros e robustos
- **Integração com sistemas empresariais** (LDAP, Active Directory, SSO)
- **Autenticação de dois fatores** (2FA) para proteção adicional
- **Controle de sessão** e políticas de timeout
- **Restrições de IP** e acesso geográfico

### 👥 **Gerenciamento de Usuários e Permissões**
- **Sistema RBAC** (Role-Based Access Control) completo
- **Permissões granulares** por workflow e credencial
- **Segregação de ambientes** (dev, staging, prod)
- **Templates organizacionais** para diferentes tamanhos de empresa
- **Auditoria completa** de atividades e mudanças

### 💾 **Backup e Recuperação**
- **Estratégia 3-2-1** para proteção máxima de dados
- **Scripts automatizados** para backup contínuo
- **Backup na nuvem** (AWS S3, Google Cloud Storage)
- **Disaster recovery** e planos de continuidade
- **Testes de restauração** automatizados

### 📊 **Monitoramento e Observabilidade**
- **Métricas essenciais** de sistema e aplicação
- **Sistema de alertas** proativos e inteligentes
- **Dashboards** de monitoramento em tempo real
- **Logs estruturados** e centralização
- **Integração com ferramentas APM** populares

---

## <IonicIcon name="shield-outline" size={24} color="#ea4b71" /> Conceitos Fundamentais

### <IonicIcon name="key-outline" size={20} color="#10b981" /> Princípio do Menor Privilégio

**Dê apenas as permissões necessárias** para cada usuário realizar suas funções específicas. Isso minimiza o risco de acesso não autorizado e limita o impacto de comprometimentos.

```javascript
// ❌ Ruim - Privilégios excessivos
{
  "role": "viewer",
  "permissions": ["read", "write", "delete", "admin"]
}

// ✅ Bom - Privilégios mínimos
{
  "role": "viewer", 
  "permissions": ["read"]
}
```

### <IonicIcon name="eye-off-outline" size={20} color="#10b981" /> Defesa em Profundidade

**Múltiplas camadas de segurança** que protegem contra diferentes tipos de ameaças:

1. **Autenticação forte** (2FA, biometria)
2. **Controle de acesso granular** (RBAC)
3. **Criptografia** (em trânsito e em repouso)
4. **Monitoramento contínuo** (logs, alertas)
5. **Backup e recuperação** (disaster recovery)

### <IonicIcon name="time-outline" size={20} color="#10b981" /> Zero Trust

**Nunca confie, sempre verifique** - cada acesso deve ser autenticado e autorizado, independentemente da origem:

- **Verificação contínua** de identidade
- **Acesso baseado em contexto** (localização, horário, dispositivo)
- **Monitoramento de comportamento** anômalo
- **Revogação rápida** de acessos

---

## <IonicIcon name="document-text-outline" size={24} color="#ea4b71" /> Tópicos de Segurança

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> [Autenticação e Acesso](./autenticacao)

Configure métodos de autenticação seguros e controle de acesso robusto:

- **Autenticação básica** com políticas de senha forte
- **2FA (Autenticação de dois fatores)** para proteção adicional
- **SSO (Single Sign-On)** com SAML, OAuth 2.0 e OpenID Connect
- **LDAP/Active Directory** para integração empresarial
- **Controle de sessão** e restrições de IP
- **Timeout e políticas** de segurança

**[→ Ver Autenticação e Acesso](./autenticacao)**

### <IonicIcon name="people-outline" size={20} color="#10b981" /> [Usuários e Permissões](./usuarios-permissoes)

Implemente controle granular de acesso com sistema RBAC:

- **Roles padrão** (Owner, Admin, Editor, Viewer)
- **Roles customizados** para necessidades específicas
- **Permissões por workflow** e credencial
- **Segregação de ambientes** (dev, staging, prod)
- **Templates organizacionais** para diferentes empresas
- **Auditoria completa** de atividades

**[→ Ver Usuários e Permissões](./usuarios-permissoes)**

### <IonicIcon name="backup-outline" size={20} color="#10b981" /> [Backup e Recovery](./backup-recovery)

Proteja seus dados com estratégias robustas de backup:

- **Estratégia 3-2-1** (3 cópias, 2 mídias, 1 fora do local)
- **Scripts automatizados** para PostgreSQL, MySQL, workflows
- **Backup na nuvem** (AWS S3, Google Cloud Storage)
- **Disaster recovery** com planos de recuperação
- **Testes de restauração** automatizados
- **RTO e RPO** definidos e monitorados

**[→ Ver Backup e Recovery](./backup-recovery)**

### <IonicIcon name="analytics-outline" size={20} color="#10b981" /> [Monitoramento e Alertas](./monitoring)

Monitore a saúde e performance do seu n8n:

- **Métricas essenciais** de sistema e aplicação
- **Sistema de alertas** proativos e inteligentes
- **Dashboards** com Grafana e Prometheus
- **Logs estruturados** e centralização (ELK Stack)
- **Integração APM** (New Relic, AppDynamics, Datadog)
- **Observabilidade completa** em tempo real

**[→ Ver Monitoramento e Alertas](./monitoring)**

---

## <IonicIcon name="construct-outline" size={24} color="#ea4b71" /> Implementação por Fase

### <IonicIcon name="rocket-outline" size={20} color="#10b981" /> Fase 1: Fundamentos (Semana 1-2)

**Configuração básica de segurança:**

- [ ] Autenticação básica configurada
- [ ] Política de senhas forte implementada
- [ ] Timeout de sessão definido
- [ ] Logs de acesso ativados
- [ ] Backup básico configurado

### <IonicIcon name="shield-outline" size={20} color="#10b981" /> Fase 2: Controle de Acesso (Semana 3-4)

**Implementação de RBAC e permissões:**

- [ ] Sistema RBAC configurado
- [ ] Roles e permissões definidos
- [ ] Usuários organizados em grupos
- [ ] Auditoria de acesso ativada
- [ ] 2FA implementado para admins

### <IonicIcon name="cloud-upload-outline" size={20} color="#10b981" /> Fase 3: Backup e Recuperação (Semana 5-6)

**Estratégia robusta de proteção de dados:**

- [ ] Backup automatizado configurado
- [ ] Backup na nuvem implementado
- [ ] Scripts de restauração criados
- [ ] Testes de backup realizados
- [ ] Plano de DR documentado

### <IonicIcon name="analytics-outline" size={20} color="#10b981" /> Fase 4: Monitoramento (Semana 7-8)

**Observabilidade e alertas:**

- [ ] Métricas de sistema configuradas
- [ ] Dashboards de monitoramento criados
- [ ] Sistema de alertas implementado
- [ ] Logs centralizados
- [ ] Integração APM configurada

---

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> Checklist de Segurança

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> Autenticação

- [ ] HTTPS configurado e funcionando
- [ ] Autenticação básica ativada
- [ ] 2FA implementado para usuários críticos
- [ ] Política de senhas forte definida
- [ ] Timeout de sessão configurado
- [ ] Restrições de IP implementadas (se necessário)

### <IonicIcon name="people-circle-outline" size={20} color="#10b981" /> Controle de Acesso

- [ ] Sistema RBAC implementado
- [ ] Roles e permissões definidos
- [ ] Princípio do menor privilégio aplicado
- [ ] Auditoria de acesso ativada
- [ ] Revisão regular de permissões
- [ ] Procedimentos de onboarding/offboarding

### <IonicIcon name="backup-outline" size={20} color="#10b981" /> Proteção de Dados

- [ ] Estratégia de backup 3-2-1 implementada
- [ ] Backup automatizado funcionando
- [ ] Backup na nuvem configurado
- [ ] Testes de restauração realizados
- [ ] Criptografia em repouso ativada
- [ ] Retenção de dados definida

### <IonicIcon name="analytics-outline" size={20} color="#10b981" /> Monitoramento

- [ ] Métricas essenciais coletadas
- [ ] Sistema de alertas configurado
- [ ] Dashboards de monitoramento criados
- [ ] Logs centralizados e estruturados
- [ ] Incidentes documentados
- [ ] Revisão regular de segurança

---

## <IonicIcon name="warning-outline" size={24} color="#ea4b71" /> Cenários de Risco

### <IonicIcon name="alert-triangle-outline" size={20} color="#f59e0b" /> Riscos de Segurança

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| **Credenciais comprometidas** | Alto | 2FA, rotação de senhas, monitoramento |
| **Acesso não autorizado** | Alto | RBAC, auditoria, restrições de IP |
| **Perda de dados** | Crítico | Backup 3-2-1, disaster recovery |
| **Downtime** | Alto | Monitoramento, alertas, redundância |
| **Conformidade** | Médio | Logs, auditoria, políticas documentadas |

### <IonicIcon name="shield-outline" size={20} color="#10b981" /> Medidas de Proteção

- **Detecção precoce** através de monitoramento contínuo
- **Resposta rápida** com alertas automatizados
- **Recuperação eficiente** com backups testados
- **Prevenção proativa** com políticas de segurança
- **Conformidade contínua** com auditorias regulares

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> Próximos Passos

Agora que você entende os fundamentos de segurança:

1. **[Autenticação e Acesso](./autenticacao)** - Configure métodos de login seguros
2. **[Usuários e Permissões](./usuarios-permissoes)** - Implemente controle granular de acesso
3. **[Backup e Recovery](./backup-recovery)** - Proteja seus dados críticos
4. **[Monitoramento e Alertas](./monitoring)** - Monitore a saúde do sistema

---

## <IonicIcon name="link-outline" size={24} color="#ea4b71" /> Recursos Úteis

### <IonicIcon name="document-text-outline" size={20} color="#10b981" /> Documentação Oficial

- <IonicIcon name="link-outline" size={16} color="#6b7280" /> [Documentação n8n](https://docs.n8n.io/)
- <IonicIcon name="shield-checkmark-outline" size={16} color="#6b7280" /> [Segurança n8n](https://docs.n8n.io/hosting/security/)
- <IonicIcon name="people-outline" size={16} color="#6b7280" /> [Gerenciamento de Usuários](https://docs.n8n.io/hosting/user-management/)
- <IonicIcon name="backup-outline" size={16} color="#6b7280" /> [Backup e Restore](https://docs.n8n.io/hosting/backup-restore/)

### <IonicIcon name="school-outline" size={20} color="#10b981" /> Ferramentas Recomendadas

- <IonicIcon name="logo-grafana" size={16} color="#6b7280" /> **Grafana** - Dashboards de monitoramento
- <IonicIcon name="logo-prometheus" size={16} color="#6b7280" /> **Prometheus** - Coleta de métricas
- <IonicIcon name="logo-elastic" size={16} color="#6b7280" /> **ELK Stack** - Centralização de logs
- <IonicIcon name="logo-aws" size={16} color="#6b7280" /> **AWS S3** - Backup na nuvem
- <IonicIcon name="logo-google" size={16} color="#6b7280" /> **Google Cloud Storage** - Backup na nuvem

### <IonicIcon name="people-circle-outline" size={20} color="#10b981" /> Comunidade

- <IonicIcon name="logo-discord" size={16} color="#6b7280" /> [Discord n8n](https://discord.gg/n8n)
- <IonicIcon name="logo-github" size={16} color="#6b7280" /> [GitHub n8n](https://github.com/n8n-io/n8n)
- <IonicIcon name="logo-stackoverflow" size={16} color="#6b7280" /> [Stack Overflow](https://stackoverflow.com/questions/tagged/n8n)

---

:::tip **Dica Pro**
Implemente a segurança em fases, começando pelos fundamentos e progredindo para recursos avançados. Sempre teste suas configurações antes de aplicar em produção.
:::

:::warning **Importante**
A segurança é um processo contínuo. Revise regularmente suas configurações, monitore logs e mantenha-se atualizado com as melhores práticas.
:::

:::info **Recurso Adicional**
Considere realizar auditorias de segurança trimestrais e testes de penetração anuais para manter sua instalação n8n segura.
::: 