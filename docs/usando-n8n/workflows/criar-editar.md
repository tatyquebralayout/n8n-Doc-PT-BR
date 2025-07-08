---
sidebar_position: 2
title: Criar e Editar Workflows
description: Guia completo para criar e editar workflows no n8n
keywords: [n8n, workflows, criar, editar, nodes, triggers, conexões]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="add-circle-outline" size={32} color="#ea4b71" /> Criar e Editar Workflows

Aprenda os fundamentos para criar e editar workflows eficientes no n8n, desde o conceito inicial até a implementação completa.

---

## <IonicIcon name="bulb-outline" size={24} color="#ea4b71" /> 1 | Planejamento do Workflow

### <IonicIcon name="document-text-outline" size={20} color="#10b981" /> Definindo o Objetivo

**Antes de começar, responda:**

1. **Qual problema** você quer resolver?
2. **Quais dados** você precisa processar?
3. **Quais sistemas** você precisa integrar?
4. **Qual o resultado** esperado?
5. **Com que frequência** deve executar?

### <IonicIcon name="git-branch-outline" size={20} color="#10b981" /> Estrutura Básica

**Todo workflow precisa de:**

```
[TRIGGER] → [PROCESSAMENTO] → [AÇÃO] → [RESULTADO]
```

**Exemplo prático:**
```
[Novo Email] → [Extrair Dados] → [Salvar no Google Sheets] → [Notificar Slack]
```

---

## <IonicIcon name="create-outline" size={24} color="#ea4b71" /> 2 | Criando seu Primeiro Workflow

### <IonicIcon name="play-outline" size={20} color="#10b981" /> Passo a Passo

1. **Acesse o n8n** e clique em **"Novo Workflow"**
2. **Escolha um trigger** (Manual, Schedule, Webhook)
3. **Configure o trigger** com os parâmetros necessários
4. **Adicione nodes** de processamento
5. **Conecte os nodes** na sequência desejada
6. **Configure cada node** com suas credenciais
7. **Teste o workflow** com dados de exemplo
8. **Ative o workflow** quando estiver pronto

### <IonicIcon name="settings-outline" size={20} color="#10b981" /> Configuração do Trigger

**Tipos de trigger disponíveis:**

| Tipo | Uso | Frequência |
|------|-----|------------|
| **Manual** | Testes e execução sob demanda | Quando necessário |
| **Schedule** | Tarefas agendadas | Diário, semanal, mensal |
| **Webhook** | Eventos em tempo real | Imediato |
| **Polling** | Verificação periódica | A cada X minutos |

**Exemplo de configuração Schedule:**
```json
{
  "rule": {
    "interval": [
      {
        "field": "minute",
        "value": "0"
      },
      {
        "field": "hour",
        "value": "9"
      }
    ]
  }
}
```

---

## <IonicIcon name="construct-outline" size={24} color="#ea4b71" /> 3 | Trabalhando com Nodes

### <IonicIcon name="apps-outline" size={20} color="#10b981" /> Tipos de Nodes

**Categorias principais:**

- **🔗 App Nodes**: Integrações com serviços externos
- **⚙️ Core Nodes**: Funcionalidades básicas do n8n
- **🔄 Function Nodes**: Lógica customizada
- **📊 Data Nodes**: Manipulação de dados
- **🎯 Trigger Nodes**: Iniciadores de workflow

### <IonicIcon name="options-outline" size={20} color="#10b981" /> Configurando Nodes

**Campos comuns:**

```json
{
  "resource": "message",
  "operation": "send",
  "channel": "{{ $json.channel }}",
  "text": "{{ $json.message }}",
  "additionalFields": {
    "username": "n8n Bot",
    "icon_emoji": ":robot_face:"
  }
}
```

### <IonicIcon name="link-outline" size={20} color="#10b981" /> Conectando Nodes

**Tipos de conexão:**

- **✅ Sucesso**: Executa quando node anterior funciona
- **❌ Erro**: Executa quando node anterior falha
- **🔄 Retry**: Tenta novamente em caso de falha
- **⏭️ Skip**: Pula para o próximo node

---

## <IonicIcon name="pencil-outline" size={24} color="#ea4b71" /> 4 | Editando Workflows Existentes

### <IonicIcon name="copy-outline" size={20} color="#10b981" /> Modo de Edição

**Para editar um workflow:**

1. **Abra o workflow** na lista de workflows
2. **Clique em "Editar"** no canto superior direito
3. **Faça as alterações** necessárias
4. **Teste as mudanças** antes de salvar
5. **Salve o workflow** com Ctrl+S ou Cmd+S

### <IonicIcon name="git-branch-outline" size={20} color="#10b981" /> Versionamento

**O n8n mantém histórico:**

- **Versões automáticas** a cada salvamento
- **Comentários** para documentar mudanças
- **Rollback** para versões anteriores
- **Comparação** entre versões

### <IonicIcon name="duplicate-outline" size={20} color="#10b981" /> Duplicação e Templates

**Para reutilizar workflows:**

1. **Duplique** o workflow existente
2. **Modifique** para o novo caso de uso
3. **Salve** com novo nome
4. **Compartilhe** como template se necessário

---

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> 5 | Boas Práticas

### <IonicIcon name="naming-outline" size={20} color="#10b981" /> Nomenclatura

**Use nomes descritivos:**

- ✅ **"Enviar Relatório Diário - Marketing"**
- ✅ **"Sincronizar Clientes - CRM para Sheets"**
- ❌ **"Workflow 1"**
- ❌ **"Teste"**

### <IonicIcon name="document-text-outline" size={20} color="#10b981" /> Documentação

**Adicione descrições:**

```markdown
# Workflow: Enviar Relatório Diário
- **Propósito**: Envia relatório de vendas diário para equipe
- **Trigger**: Schedule (diário às 18h)
- **Dados processados**: Vendas do dia, métricas de conversão
- **Saída**: Email + Slack notification
- **Responsável**: Equipe de Marketing
```

### <IonicIcon name="shield-outline" size={20} color="#10b981" /> Segurança

**Proteja seus workflows:**

- **Use credenciais** em vez de hardcoded values
- **Valide dados** de entrada
- **Trate erros** adequadamente
- **Monitore execuções** regularmente

---

## <IonicIcon name="bug-outline" size={24} color="#ea4b71" /> 6 | Debugging e Testes

### <IonicIcon name="play-circle-outline" size={20} color="#10b981" /> Testando Workflows

**Estratégia de teste:**

1. **Teste individual** cada node
2. **Use dados de exemplo** realistas
3. **Verifique saídas** em cada etapa
4. **Teste cenários de erro**
5. **Valide resultados finais**

### <IonicIcon name="alert-circle-outline" size={20} color="#10b981" /> Identificando Problemas

**Sinais de problemas:**

- **Nodes vermelhos**: Erro na execução
- **Conexões quebradas**: Nodes não conectados
- **Dados vazios**: Falta de dados de entrada
- **Timeout**: Execução muito lenta

### <IonicIcon name="medical-outline" size={20} color="#10b981" /> Ferramentas de Debug

**Recursos disponíveis:**

- **Logs detalhados** de cada execução
- **Visualização de dados** em cada node
- **Teste de credenciais** individual
- **Simulação** de execução

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> 7 | Próximos passos

1. **[Organizar Workflows](./organizar)** - Estruturar projetos
2. **[Otimizar Performance](./otimizar)** - Melhorar eficiência
3. **[Usar Workflows em Produção](../execucoes/componentes-execucoes)** - Deploy e monitoramento

> *Agora você tem os fundamentos para criar workflows eficientes. Continue aprendendo para dominar o n8n!*

---

:::tip **Dica Pro**
Comece com workflows simples e vá aumentando a complexidade gradualmente. É melhor ter vários workflows simples do que um muito complexo.
:::

:::warning **Importante**
Sempre teste seus workflows antes de ativá-los em produção. Use dados de teste que não afetem sistemas reais.
:::

:::info **Recurso Adicional**
Use o modo "Execute Once" para testar workflows sem ativá-los permanentemente.
::: 