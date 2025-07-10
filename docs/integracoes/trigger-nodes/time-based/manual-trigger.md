---
sidebar_position: 1
title: Manual Trigger
description: Iniciar workflows manualmente para testes e execuções pontuais
keywords: [n8n, manual, trigger, execução, teste, workflow]
---

# <ion-icon name="document-text-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Manual Trigger

O **Manual Trigger** é o trigger mais simples do n8n. Ele permite **executar workflows manualmente** clicando em um botão, sendo perfeito para testes, execuções pontuais e fluxos que não precisam ser automatizados.

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Conceito Principal**

**Manual Trigger = "Executar Quando EU Clicar"**

Este é um **TRIGGER** que:

- **INICIA** o workflow quando clicado
- **Não aguarda** eventos externos
- **Perfeito** para testes e debug
- **Sempre** o primeiro node do workflow

> **Diferença Fundamental:** Manual Trigger INICIA workflows. Nodes de ação (como Set, HTTP Request) PROCESSAM dados dentro do workflow.

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Como Funciona**

```mermaid
graph LR
A[👤 Usuário] -->|Clica "Execute"| B[⚡ Manual Trigger]
B --> C[⚙️ Set Node]
C --> D[🌐 HTTP Request]
D --> E[✅ Finalizado]
```

### **Fluxo de Execução:**

1. **Usuário clica** no botão "Execute Workflow"
2. **Manual Trigger dispara** e passa dados iniciais
3. **Workflow continua** com os próximos nodes
4. **Execução termina** e mostra resultados

## <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Configurações**

### **Dados de Entrada**

O Manual Trigger pode passar dados iniciais para o workflow:

#### **Dados Vazios (Padrão)**

```json
{}
```

#### **Dados Customizados**

```json
{
"nome": "João Silva",
"email": "joao@email.com",
"teste": true,
"timestamp": "2024-01-15T10:30:00Z"
}
```

### **Usar Dados Dinâmicos**

```json
{
"usuario": "{{$user.email}}",
"data_execucao": "{{new Date().toISOString()}}",
"ambiente": "producao"
}
```

## <ion-icon name="bulb-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Casos de Uso Práticos**

### **1. Teste de Workflows**

```
Manual Trigger → Set (dados de teste) → HTTP Request (API) → Verificar resposta
```

**Exemplo prático:**

- **Manual Trigger:** `{"cep": "01310-100"}`
- **HTTP Request:** Consultar ViaCEP
- **Resultado:** Testar se API retorna dados corretos

---

### **2. Processamento de Dados Pontuais**

```
Manual Trigger → Google Sheets (ler) → Function (processar) → Slack (notificar)
```

**Cenário:** Relatório mensal manual

- **Manual Trigger:** Executar quando precisar
- **Google Sheets:** Ler dados do mês
- **Function:** Calcular métricas
- **Slack:** Enviar resumo para equipe

---

### **3. Operações Administrativas**

```
Manual Trigger → Database (cleanup) → Email (confirmar)
```

**Exemplo:** Limpeza de dados antigos

- **Manual Trigger:** `{"dias_retencao": 90}`
- **Database:** Remover registros antigos
- **Email:** Confirmar quantos registros foram removidos

---

### **4. Sincronização Manual**

```
Manual Trigger → API A (buscar) → Transform (converter) → API B (salvar)
```

**Cenário:** Sincronizar dados entre sistemas

- **Manual Trigger:** Quando necessário
- **API A:** Buscar dados atualizados
- **Transform:** Converter formato
- **API B:** Salvar no sistema destino

## <ion-icon name="document-text-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Vantagens do Manual Trigger**

### **Controle Total**

- Você decide **quando** executar
- Perfeito para **operações sensíveis**
- **Zero chance** de execução acidental

### **Ideal para Testes**

- **Debug** de workflows complexos
- **Validar** lógica antes de automatizar
- **Testar** integrações com APIs

### **Simplicidade**

- **Sem configuração** complexa
- **Sem dependências** externas
- **Funciona** imediatamente

### **Flexibilidade**

- **Dados customizados** a cada execução
- **Diferentes cenários** de teste
- **Controle** de ambiente (teste/produção)

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Limitações**

### **Não é Automático**

- Precisa de **intervenção humana**
- **Não escala** para alta frequência
- **Não funciona** fora do horário comercial

### **Sem Agendamento**

- **Não executa** em horários específicos
- **Não repete** automaticamente
- Para isso, use **[Schedule Trigger](./schedule-trigger)**

### **Dependente de Interface**

- Precisa **acessar o n8n**
- **Não funciona** via API externa
- Para isso, use **[Webhook Trigger](../event-based/webhook-trigger)**

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Configuração Avançada**

### **Dados Condicionais**

```json
{
"ambiente": "{{$user.email.includes('admin') ? 'producao' : 'teste'}}",
"permissoes": ["{{$user.role}}"],
"timestamp": "{{new Date().toISOString()}}"
}
```

### **Configurações por Usuário**

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

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Melhores Práticas**

### **1. Use para Desenvolvimento**

```
Desenvolvimento: Manual Trigger
Produção: Schedule/Webhook Trigger
```

### **2. Dados de Teste Realistas**

```json
{
"cliente_teste": {
"nome": "João Silva",
"email": "joao.teste@empresa.com",
"documento": "123.456.789-00"
}
}
```

### **3. Documentar Propósito**

```json
{
"proposito": "Teste de integração com API de pagamentos",
"responsavel": "admin@empresa.com",
"versao_workflow": "1.2.3"
}
```

### **4. Incluir Metadados**

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

## <ion-icon name="git-branch-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Transição para Automação**

### **Workflow Manual → Automático**

#### **1. Começar Manual:**

```
Manual Trigger → Lógica do Workflow
```

#### **2. Testar Completamente:**

- Diferentes cenários
- Tratamento de erros
- Performance

#### **3. Migrar para Automático:**

```
Schedule Trigger → Mesma Lógica do Workflow
```

### **Manter Ambos**

```
Manual Trigger (testes) 
→ Subworkflow Comum
Schedule Trigger (prod) 
```

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Próximos Passos**

Depois de dominar Manual Trigger, evolua para:

1. **[Schedule Trigger](./schedule-trigger)** - Para execução automática
2. **[Webhook Trigger](../event-based/webhook-trigger)** - Para eventos externos
3. **[Set Node](../../builtin-nodes/data-processing/set)** - Para manipular dados

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> **Checklist de Uso**

### **Antes de Executar:**

- Dados de entrada definidos
- Workflow testado por partes
- Credenciais configuradas
- Ambiente correto (teste/prod)

### **Durante Desenvolvimento:**

- Use dados realistas mas seguros
- Teste cenários de erro
- Valide todas as saídas
- Documente comportamentos

### **Antes da Produção:**

- Substitua por trigger automático
- Configure monitoramento
- Teste em ambiente similar à produção
- Defina plano de rollback

---

**Manual Trigger = Seu botão de controle total sobre o workflow!**
