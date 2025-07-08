---
sidebar_position: 1
title: Manual Trigger
description: Iniciar workflows manualmente para testes e execuções pontuais
keywords: [n8n, manual, trigger, execução, teste, workflow]
---

# <IonicIcon name="hand-left-outline" size={32} color="#ea4b71" /> Manual Trigger

O **Manual Trigger** é o trigger mais simples do n8n. Ele permite **executar workflows manualmente** clicando em um botão, sendo perfeito para testes, execuções pontuais e fluxos que não precisam ser automatizados.

## <IonicIcon name="bulb-outline" size={24} color="#ea4b71" /> **Conceito Principal**

**Manual Trigger = "Executar Quando EU Clicar"**

Este é um **TRIGGER** que:
- <IonicIcon name="play-outline" size={16} color="#6b7280" /> **INICIA** o workflow quando clicado
- <IonicIcon name="time-outline" size={16} color="#6b7280" /> **Não aguarda** eventos externos
- <IonicIcon name="checkmark-circle-outline" size={16} color="#6b7280" /> **Perfeito** para testes e debug
- <IonicIcon name="play-circle-outline" size={16} color="#6b7280" /> **Sempre** o primeiro node do workflow

> **<IonicIcon name="information-circle-outline" size={16} color="#ea4b71" /> Diferença Fundamental:** Manual Trigger INICIA workflows. Nodes de ação (como Set, HTTP Request) PROCESSAM dados dentro do workflow.

## <IonicIcon name="cog-outline" size={24} color="#ea4b71" /> **Como Funciona**

```mermaid
graph LR
A[👤 Usuário] -->|Clica "Execute"| B[⚡ Manual Trigger]
B --> C[⚙️ Set Node]
C --> D[🌐 HTTP Request]
D --> E[✅ Finalizado]
```

### <IonicIcon name="arrow-forward-circle-outline" size={20} color="#10b981" /> **Fluxo de Execução:**
1. <IonicIcon name="finger-print-outline" size={16} color="#6b7280" /> **Usuário clica** no botão "Execute Workflow"
2. <IonicIcon name="flash-outline" size={16} color="#6b7280" /> **Manual Trigger dispara** e passa dados iniciais
3. <IonicIcon name="arrow-forward-outline" size={16} color="#6b7280" /> **Workflow continua** com os próximos nodes
4. <IonicIcon name="checkmark-circle-outline" size={16} color="#6b7280" /> **Execução termina** e mostra resultados

## <IonicIcon name="settings-outline" size={24} color="#ea4b71" /> **Configurações**

### <IonicIcon name="enter-outline" size={20} color="#10b981" /> **Dados de Entrada**
O Manual Trigger pode passar dados iniciais para o workflow:

#### <IonicIcon name="ellipse-outline" size={18} color="#10b981" /> **Dados Vazios (Padrão)**
```json
{}
```

#### <IonicIcon name="create-outline" size={18} color="#10b981" /> **Dados Customizados**
```json
{
"nome": "João Silva",
"email": "joao@email.com",
"teste": true,
"timestamp": "2024-01-15T10:30:00Z"
}
```

### <IonicIcon name="code-slash-outline" size={20} color="#10b981" /> **Usar Dados Dinâmicos**
```json
{
"usuario": "{{$user.email}}",
"data_execucao": "{{new Date().toISOString()}}",
"ambiente": "producao"
}
```

## <IonicIcon name="briefcase-outline" size={24} color="#ea4b71" /> **Casos de Uso Práticos**

### <IonicIcon name="bug-outline" size={20} color="#10b981" /> **1. Teste de Workflows**
```
Manual Trigger → Set (dados de teste) → HTTP Request (API) → Verificar resposta
```

**Exemplo prático:**
- <IonicIcon name="hand-left-outline" size={16} color="#6b7280" /> **Manual Trigger:** `{"cep": "01310-100"}`
- <IonicIcon name="cloud-outline" size={16} color="#6b7280" /> **HTTP Request:** Consultar ViaCEP
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Resultado:** Testar se API retorna dados corretos

---

### <IonicIcon name="document-text-outline" size={20} color="#10b981" /> **2. Processamento de Dados Pontuais**
```
Manual Trigger → Google Sheets (ler) → Function (processar) → Slack (notificar)
```

**Cenário:** Relatório mensal manual
- <IonicIcon name="hand-left-outline" size={16} color="#6b7280" /> **Manual Trigger:** Executar quando precisar
- <IonicIcon name="grid-outline" size={16} color="#6b7280" /> **Google Sheets:** Ler dados do mês
- <IonicIcon name="calculator-outline" size={16} color="#6b7280" /> **Function:** Calcular métricas
- <IonicIcon name="logo-slack" size={16} color="#6b7280" /> **Slack:** Enviar resumo para equipe

---

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> **3. Operações Administrativas**
```
Manual Trigger → Database (cleanup) → Email (confirmar)
```

**Exemplo:** Limpeza de dados antigos
- <IonicIcon name="hand-left-outline" size={16} color="#6b7280" /> **Manual Trigger:** `{"dias_retencao": 90}`
- <IonicIcon name="server-outline" size={16} color="#6b7280" /> **Database:** Remover registros antigos
- <IonicIcon name="mail-outline" size={16} color="#6b7280" /> **Email:** Confirmar quantos registros foram removidos

---

### <IonicIcon name="sync-outline" size={20} color="#10b981" /> **4. Sincronização Manual**
```
Manual Trigger → API A (buscar) → Transform (converter) → API B (salvar)
```

**Cenário:** Sincronizar dados entre sistemas
- <IonicIcon name="hand-left-outline" size={16} color="#6b7280" /> **Manual Trigger:** Quando necessário
- <IonicIcon name="cloud-download-outline" size={16} color="#6b7280" /> **API A:** Buscar dados atualizados
- <IonicIcon name="swap-horizontal-outline" size={16} color="#6b7280" /> **Transform:** Converter formato
- <IonicIcon name="cloud-upload-outline" size={16} color="#6b7280" /> **API B:** Salvar no sistema destino

## <IonicIcon name="trophy-outline" size={24} color="#ea4b71" /> **Vantagens do Manual Trigger**

### <IonicIcon name="construct-outline" size={20} color="#10b981" /> **Controle Total**
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> Você decide **quando** executar
- <IonicIcon name="shield-outline" size={16} color="#6b7280" /> Perfeito para **operações sensíveis**
- <IonicIcon name="close-circle-outline" size={16} color="#6b7280" /> **Zero chance** de execução acidental

### <IonicIcon name="flask-outline" size={20} color="#10b981" /> **Ideal para Testes**
- <IonicIcon name="bug-outline" size={16} color="#6b7280" /> **Debug** de workflows complexos
- <IonicIcon name="checkmark-done-outline" size={16} color="#6b7280" /> **Validar** lógica antes de automatizar
- <IonicIcon name="link-outline" size={16} color="#6b7280" /> **Testar** integrações com APIs

### <IonicIcon name="heart-outline" size={20} color="#10b981" /> **Simplicidade**
- <IonicIcon name="settings-outline" size={16} color="#6b7280" /> **Sem configuração** complexa
- <IonicIcon name="link-outline" size={16} color="#6b7280" /> **Sem dependências** externas
- <IonicIcon name="checkmark-circle-outline" size={16} color="#6b7280" /> **Funciona** imediatamente

### <IonicIcon name="options-outline" size={20} color="#10b981" /> **Flexibilidade**
- <IonicIcon name="create-outline" size={16} color="#6b7280" /> **Dados customizados** a cada execução
- <IonicIcon name="git-branch-outline" size={16} color="#6b7280" /> **Diferentes cenários** de teste
- <IonicIcon name="toggle-outline" size={16} color="#6b7280" /> **Controle** de ambiente (teste/produção)

## <IonicIcon name="warning-outline" size={24} color="#ea4b71" /> **Limitações**

### <IonicIcon name="person-outline" size={20} color="#10b981" /> **Não é Automático**
- <IonicIcon name="hand-left-outline" size={16} color="#6b7280" /> Precisa de **intervenção humana**
- <IonicIcon name="trending-up-outline" size={16} color="#6b7280" /> **Não escala** para alta frequência
- <IonicIcon name="moon-outline" size={16} color="#6b7280" /> **Não funciona** fora do horário comercial

### <IonicIcon name="calendar-outline" size={20} color="#10b981" /> **Sem Agendamento**
- <IonicIcon name="time-outline" size={16} color="#6b7280" /> **Não executa** em horários específicos
- <IonicIcon name="repeat-outline" size={16} color="#6b7280" /> **Não repete** automaticamente
- Para isso, use **[Schedule Trigger](./schedule-trigger)**

### <IonicIcon name="desktop-outline" size={20} color="#10b981" /> **Dependente de Interface**
- <IonicIcon name="enter-outline" size={16} color="#6b7280" /> Precisa **acessar o n8n**
- <IonicIcon name="link-outline" size={16} color="#6b7280" /> **Não funciona** via API externa
- Para isso, use **[Webhook Trigger](../event-based/webhook-trigger)**

## <IonicIcon name="construct-outline" size={24} color="#ea4b71" /> **Configuração Avançada**

### <IonicIcon name="git-branch-outline" size={20} color="#10b981" /> **Dados Condicionais**
```json
{
"ambiente": "{{$user.email.includes('admin') ? 'producao' : 'teste'}}",
"permissoes": ["{{$user.role}}"],
"timestamp": "{{new Date().toISOString()}}"
}
```

### <IonicIcon name="person-circle-outline" size={20} color="#10b981" /> **Configurações por Usuário**
```json
{
"usuario_id": "{{$user.id}}",
"usuario_email": "{{$user.email}}",
"configuracao": {
"limite_registros": "{{$user.role === 'admin' ? 1000 : 100}}",
"acesso_completo": "{{$user.role === 'admin'}}"
}
}
```

## <IonicIcon name="bookmark-outline" size={24} color="#ea4b71" /> **Melhores Práticas**

### <IonicIcon name="code-outline" size={20} color="#10b981" /> **1. Use para Desenvolvimento**
```
Desenvolvimento: Manual Trigger
Produção: Schedule/Webhook Trigger
```

### <IonicIcon name="flask-outline" size={20} color="#10b981" /> **2. Dados de Teste Realistas**
```json
{
"cliente_teste": {
"nome": "João Silva",
"email": "joao.teste@empresa.com",
"documento": "123.456.789-00"
}
}
```

### <IonicIcon name="document-text-outline" size={20} color="#10b981" /> **3. Documentar Propósito**
```json
{
"proposito": "Teste de integração com API de pagamentos",
"responsavel": "admin@empresa.com",
"versao_workflow": "1.2.3"
}
```

### <IonicIcon name="information-circle-outline" size={20} color="#10b981" /> **4. Incluir Metadados**
```json
{
"execucao_manual": true,
"ambiente": "desenvolvimento",
"data_execucao": "{{new Date().toISOString()}}",
"dados": {
// Seus dados aqui
}
}
```

## <IonicIcon name="swap-horizontal-outline" size={24} color="#ea4b71" /> **Transição para Automação**

### <IonicIcon name="arrow-forward-outline" size={20} color="#10b981" /> **Workflow Manual → Automático**

#### <IonicIcon name="play-outline" size={18} color="#10b981" /> **1. Começar Manual:**
```
Manual Trigger → Lógica do Workflow
```

#### <IonicIcon name="checkmark-done-outline" size={18} color="#10b981" /> **2. Testar Completamente:**
- <IonicIcon name="git-branch-outline" size={16} color="#6b7280" /> Diferentes cenários
- <IonicIcon name="warning-outline" size={16} color="#6b7280" /> Tratamento de erros
- <IonicIcon name="speedometer-outline" size={16} color="#6b7280" /> Performance

#### <IonicIcon name="rocket-outline" size={18} color="#10b981" /> **3. Migrar para Automático:**
```
Schedule Trigger → Mesma Lógica do Workflow
```

### <IonicIcon name="copy-outline" size={20} color="#10b981" /> **Manter Ambos**
```
Manual Trigger (testes) 
→ Subworkflow Comum
Schedule Trigger (prod) 
```

## <IonicIcon name="arrow-forward-circle-outline" size={24} color="#ea4b71" /> **Próximos Passos**

Depois de dominar Manual Trigger, evolua para:

1. <IonicIcon name="time-outline" size={16} color="#6b7280" /> **[Schedule Trigger](./schedule-trigger)** - Para execução automática
2. <IonicIcon name="globe-outline" size={16} color="#6b7280" /> **[Webhook Trigger](../event-based/webhook-trigger)** - Para eventos externos
3. <IonicIcon name="create-outline" size={16} color="#6b7280" /> **[Set Node](../../builtin-nodes/data-processing/set)** - Para manipular dados

## <IonicIcon name="checkbox-outline" size={24} color="#ea4b71" /> **Checklist de Uso**

### <IonicIcon name="play-circle-outline" size={20} color="#10b981" /> **Antes de Executar:**
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Dados de entrada definidos
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Workflow testado por partes
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Credenciais configuradas
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Ambiente correto (teste/prod)

### <IonicIcon name="construct-outline" size={20} color="#10b981" /> **Durante Desenvolvimento:**
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Use dados realistas mas seguros
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Teste cenários de erro
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Valide todas as saídas
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Documente comportamentos

### <IonicIcon name="rocket-outline" size={20} color="#10b981" /> **Antes da Produção:**
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Substitua por trigger automático
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Configure monitoramento
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Teste em ambiente similar à produção
- <IonicIcon name="square-outline" size={16} color="#6b7280" /> Defina plano de rollback

---

**<IonicIcon name="hand-left-outline" size={16} color="#ea4b71" /> Manual Trigger = Seu botão de controle total sobre o workflow!**
