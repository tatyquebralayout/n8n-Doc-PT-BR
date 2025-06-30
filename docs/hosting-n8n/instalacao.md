---
sidebar_position: 1
title: Instalação do n8n
description: Guia completo para instalar n8n usando diferentes métodos
keywords: [n8n, instalação, deployment, docker, npm, cloud, desktop]
---

# 🔧 Instalação do n8n

Bem-vindo ao guia completo de instalação do n8n! Aqui você encontrará todas as formas disponíveis para instalar e executar o n8n, desde desenvolvimento local até produção em larga escala.

## 🎯 Escolha seu Método de Instalação

O n8n oferece múltiplas formas de instalação para atender diferentes necessidades e níveis de experiência:

### 🐳 Docker (Recomendado para Produção)
Containerização completa com isolamento e facilidade de deployment.
- ✅ **Melhor para:** Produção, ambientes isolados
- ✅ **Vantagens:** Isolamento, portabilidade, fácil escalabilidade
- ✅ **Requisitos:** Docker instalado

**[📖 Ver guia Docker →](./instalacao/docker)**

### 📦 NPM (Ideal para Desenvolvimento)
Instalação direta via Node Package Manager.
- ✅ **Melhor para:** Desenvolvimento, testes locais
- ✅ **Vantagens:** Instalação rápida, controle total
- ✅ **Requisitos:** Node.js 18+ e npm

**[📖 Ver guia NPM →](./instalacao/npm)**

### ☁️ Cloud (Solução Gerenciada)
Plataforma n8n Cloud totalmente gerenciada.
- ✅ **Melhor para:** Uso empresarial, sem manutenção
- ✅ **Vantagens:** Zero configuração, suporte oficial
- ✅ **Requisitos:** Apenas uma conta

**[📖 Ver guia Cloud →](./instalacao/cloud)**

### 💻 Desktop (Interface Nativa)
Aplicação desktop para uso local.
- ✅ **Melhor para:** Usuários não-técnicos, uso pessoal
- ✅ **Vantagens:** Interface nativa, instalação simples
- ✅ **Requisitos:** Windows, macOS ou Linux

**[📖 Ver guia Desktop →](./instalacao/desktop)**

## 🤔 Qual Método Escolher?

### Para Desenvolvimento Local
```
🥇 NPM → Flexibilidade total
🥈 Docker → Ambiente isolado
🥉 Desktop → Interface amigável
```

### Para Produção
```
🥇 Docker → Containerização robusta
🥈 Cloud → Solução gerenciada
🥉 NPM → Controle granular
```

### Para Empresas
```
🥇 Cloud → Suporte oficial + SLA
🥈 Docker → Deploy próprio
🥉 NPM → Controle total
```

## 📋 Requisitos Gerais

Independente do método escolhido, certifique-se de ter:

### Requisitos Mínimos
- **RAM:** 512 MB (2GB+ recomendado)
- **CPU:** 1 core (2+ cores recomendado)
- **Armazenamento:** 1GB (10GB+ para produção)
- **Rede:** Porta 5678 disponível (ou personalizada)

### Requisitos por SO
| Sistema | Suporte | Notas |
|---------|---------|-------|
| **Linux** | ✅ Completo | Recomendado para produção |
| **macOS** | ✅ Completo | Ótimo para desenvolvimento |
| **Windows** | ✅ Completo | Use WSL2 para melhor performance |

## 🚀 Início Rápido

Para testar rapidamente o n8n:

```bash
# Usando Docker (mais rápido)
docker run -it --rm -p 5678:5678 n8nio/n8n

# Usando NPM (mais direto)
npx n8n
```

:::tip Dica
Para uma primeira experiência, recomendamos começar com o **Docker** para produção ou **NPM** para desenvolvimento local.
:::

## 🔗 Próximos Passos

Após a instalação:

1. **[Configuração](./configuracao/variaveis-ambiente)** - Variables de ambiente essenciais
2. **[Segurança](./seguranca/autenticacao)** - Configurar autenticação e HTTPS
3. **[Escalonamento](./escalonamento/clustering)** - Preparar para crescimento

## ❓ Precisa de Ajuda?

- 📚 **[Troubleshooting](../../referencia/troubleshooting)** - Problemas comuns
- 💬 **[Comunidade n8n](https://community.n8n.io)** - Fórum oficial
- 🐛 **[GitHub Issues](https://github.com/n8n-io/n8n/issues)** - Reportar bugs

---

**🎯 Escolha seu método preferido acima e siga o guia específico para começar!** 