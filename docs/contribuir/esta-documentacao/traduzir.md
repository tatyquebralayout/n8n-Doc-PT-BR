---
sidebar_position: 3
title: Guia de Tradução e Localização
description: Como traduzir e localizar conteúdo para esta documentação brasileira do n8n
keywords: [n8n, tradução, localização, português, brasil]
---

# 🌍 Guia de Tradução e Localização

## 🎯 Objetivo

Este guia orienta como **traduzir e localizar** conteúdo da documentação oficial do n8n para o **contexto brasileiro**, adaptando não apenas o idioma, mas também exemplos, referências e contexto cultural.

:::info Importante
Esta é uma documentação **independente** criada pela comunidade brasileira. Não somos uma tradução oficial do n8n, mas uma **adaptação contextualizada** para brasileiros.
:::

## 🇧🇷 Princípios da Localização

### 📝 **Não é Só Tradução**
- **Tradução**: Converter idioma
- **Localização**: Adaptar contexto cultural
- **Contextualização**: Incluir realidade brasileira
- **Personalização**: Focar nas necessidades locais

### 🎯 **Foco no Usuário Brasileiro**
- Usar **português brasileiro** padrão
- Incluir **exemplos brasileiros** relevantes
- Referenciar **serviços populares** no Brasil
- Considerar **infraestrutura** local

## 📋 Processo de Tradução

### 1. 🔍 **Identificação de Conteúdo**

#### Fontes para Traduzir
- [Documentação oficial n8n](https://docs.n8n.io)
- [Blog oficial n8n](https://blog.n8n.io)
- [Community posts](https://community.n8n.io)
- [YouTube n8n](https://youtube.com/@n8n-io)

#### Prioridades
1. **Alta**: Conceitos fundamentais e primeiros passos
2. **Média**: Nodes específicos e integrações
3. **Baixa**: Recursos avançados e edge cases

### 2. 📚 **Preparação**

#### Antes de Começar
- [ ] Verificar se o tópico já existe
- [ ] Definir público-alvo (iniciante/intermediário/avançado)
- [ ] Listar termos técnicos a serem padronizados
- [ ] Identificar exemplos que precisam ser localizados

#### Ferramentas Úteis
- **DeepL**: Para tradução inicial
- **Google Translate**: Para verificação
- **Linguee**: Para contexto de uso
- **Dicionário Michaelis**: Para termos técnicos

### 3. ✍️ **Processo de Tradução**

#### Estrutura Recomendada
```markdown
# Título Traduzido

:::info Referência
Esta documentação é baseada em: [Link para fonte original]
:::

Introdução adaptada para contexto brasileiro...

## Conteúdo traduzido e localizado...
```

#### Workflow de Tradução
1. **Tradução inicial** (70% do tempo)
2. **Localização** (20% do tempo)
3. **Revisão e teste** (10% do tempo)

## 🔧 Diretrizes de Tradução

### 📝 **Termos Técnicos**

#### Manter em Inglês
- **Workflow** (não "fluxo de trabalho")
- **Node** (não "nó")
- **Trigger** (não "gatilho")
- **Webhook** (não "gancho web")
- **API** (não "interface de programação")

#### Traduzir
- **Setup** → **Configuração**
- **Deploy** → **Implantação**
- **Debug** → **Depuração**
- **Dashboard** → **Painel**
- **Template** → **Modelo**

### 🎨 **Estilo e Tom**

#### ✅ Prefira
- **Tom conversacional**: "Vamos configurar..." 
- **Linguagem acessível**: Evite jargões desnecessários
- **Exemplos práticos**: Casos reais brasileiros
- **Instruções claras**: Passo a passo detalhado

#### ❌ Evite
- **Tradução literal** sem contexto
- **Anglicismos** desnecessários
- **Termos rebuscados** quando há alternativa simples
- **Exemplos** que não fazem sentido no Brasil

### 🌟 **Localização Específica**

#### 💰 **Monetário**
```markdown
❌ Incorreto: "$10 USD"
✅ Correto: "R$ 50,00"
```

#### 🕐 **Temporal**
```markdown
❌ Incorreto: "3:00 PM EST"
✅ Correto: "15:00 (horário de Brasília)"
```

#### 🌍 **Geográfico**
```markdown
❌ Incorreto: "US zip code"
✅ Correto: "CEP brasileiro"
```

#### 📱 **Serviços Populares**
```markdown
❌ Incorreto: "Connect to Stripe"
✅ Correto: "Conectar ao PagSeguro ou Mercado Pago"
```

## 🛠️ Exemplos Práticos

### 📊 **Exemplo: Tradução de Node**

#### Original (Inglês)
```markdown
# HTTP Request Node

The HTTP Request node allows you to make HTTP requests to any URL.

## Configuration
1. Set the URL
2. Choose HTTP method
3. Add headers if needed
```

#### Traduzido e Localizado
```markdown
# Node HTTP Request

O node HTTP Request permite fazer requisições HTTP para qualquer URL.

:::tip Exemplo Brasileiro
Ideal para integrar com APIs brasileiras como ViaCEP, Receita Federal, ou seu próprio sistema.
:::

## Configuração
1. Definir a URL (ex: `https://viacep.com.br/ws/01310-100/json/`)
2. Escolher método HTTP (GET, POST, etc.)
3. Adicionar cabeçalhos se necessário
```

### 🔗 **Exemplo: Localização de Integração**

#### Original
```markdown
# Slack Integration

Connect n8n to Slack to automate notifications.

Example: Send message when new customer signs up.
```

#### Localizado
```markdown
# Integração com Slack

Conecte o n8n ao Slack para automatizar notificações.

:::note Alternativas Brasileiras
Considere também integrações com:
- Microsoft Teams (popular em empresas)
- WhatsApp Business API
- Telegram Bot API
:::

Exemplo: Enviar mensagem quando novo cliente se cadastra no seu e-commerce.
```

## ✅ Checklist de Qualidade

### 📝 **Revisão Linguística**
- [ ] Português brasileiro correto
- [ ] Concordância verbal e nominal
- [ ] Pontuação adequada
- [ ] Termos técnicos consistentes

### 🇧🇷 **Revisão de Localização**
- [ ] Exemplos fazem sentido no Brasil
- [ ] Moeda em reais quando aplicável
- [ ] Serviços brasileiros mencionados
- [ ] Contexto cultural apropriado

### 🔧 **Revisão Técnica**
- [ ] Informações tecnicamente corretas
- [ ] Links funcionando
- [ ] Código testado
- [ ] Screenshots atualizados

## 🎯 Tipos de Conteúdo

### 📚 **Tutoriais**
- Adaptar exemplos para negócios brasileiros
- Usar dados fictícios realistas (CPF, CNPJ, CEP)
- Incluir casos de uso locais

### 🔗 **Integrações**
- Priorizar serviços populares no Brasil
- Incluir alternativas locais
- Explicar relevância no contexto brasileiro

### 📊 **Conceitos Técnicos**
- Manter precisão técnica
- Usar exemplos familiares
- Incluir diagramas quando necessário

## 🤝 Colaboração

### 👥 **Revisão por Pares**
- Peça revisão de outro colaborador brasileiro
- Valide exemplos com pessoas da área
- Teste instruções passo a passo

### 📢 **Feedback da Comunidade**
- Abra issues para discussão
- Aceite sugestões de melhoria
- Documente decisões de tradução controversas

## 📈 Métricas de Sucesso

### 🎯 **Objetivos**
- Reduzir barreira linguística para brasileiros
- Aumentar adoção do n8n no Brasil
- Criar referência de qualidade em português

### 📊 **Indicadores**
- Tempo de leitura/compreensão
- Feedback positivo da comunidade
- Redução de dúvidas básicas
- Aumento de contribuições brasileiras

---

**💡 Lembre-se:** O objetivo não é apenas traduzir, mas **tornar o n8n acessível** para a comunidade brasileira!

**🤝 Precisa de ajuda?** Abra uma discussão ou issue para colaborarmos juntos na tradução.
