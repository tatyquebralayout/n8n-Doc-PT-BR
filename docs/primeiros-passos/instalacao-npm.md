---
sidebar_position: 5
title: Instalação Local via npm
description: Guia para instalação local do n8n via npm para desenvolvimento e testes
slug: /primeiros-passos/instalacao-npm
keywords: [n8n, npm, instalação local, desenvolvimento, node.js]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="logo-npm" size={32} color="#10b981" /> Instalação Local via npm

A instalação local via **npm** é ideal para desenvolvimento, testes rápidos e experimentação offline. É a forma mais simples de começar com o n8n.

## <IonicIcon name="checkmark-circle-outline" size={24} color="#10b981" /> Quando Usar npm?

### **Cenários Ideais:**

- 🧪 **Desenvolvimento** - Criar e testar nodes customizados
- 🔬 **Experimentos** - Testar integrações rapidamente
- 📚 **Aprendizado** - Estudar o n8n sem configurações complexas
- 🚀 **Demonstrações** - Apresentar funcionalidades offline
- 🔧 **Debug** - Investigar problemas localmente

### **Limitações:**

- ⚠️ **Sem HTTPS** - Webhooks externos podem não funcionar
- 🔒 **Segurança básica** - Não recomendado para produção
- 📊 **Performance limitada** - Sem otimizações de produção
- 💾 **Dados locais** - Sem backup automático

---

## <IonicIcon name="construct-outline" size={24} color="#10b981" /> Pré-requisitos

### **Node.js e npm**

```bash
# Verificar versões
node --version  # Deve ser ≥ 20.19 ≤ 24.x
npm --version   # Qualquer versão recente

# Instalar Node.js (se necessário)
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS
brew install node

# Windows
# Baixar de https://nodejs.org/
```

### **Requisitos do Sistema**

- **RAM**: Mínimo 2GB, recomendado 4GB+
- **Disco**: 1GB livre para instalação
- **Rede**: Conexão para download de dependências
- **Porta**: 5678 disponível (ou configurável)

---

## <IonicIcon name="rocket-outline" size={24} color="#10b981" /> Instalação Rápida

### **1. Instalação Global (Recomendado)**

```bash
# Instalar n8n globalmente
npm install n8n -g

# Verificar instalação
n8n --version
```

### **2. Primeira Execução**

```bash
# Iniciar n8n
n8n

# Ou com comando explícito
n8n start
```

### **3. Acessar Interface**

Abra seu navegador e acesse: `http://localhost:5678`

---

## <IonicIcon name="settings-outline" size={24} color="#10b981" /> Configuração Avançada

### **Variáveis de Ambiente**

```bash
# Configurações básicas
export N8N_PORT=5678
export N8N_PROTOCOL=http
export N8N_HOST=localhost
export GENERIC_TIMEZONE=America/Sao_Paulo

# Executar com configurações
N8N_PORT=5678 \
N8N_PROTOCOL=http \
N8N_HOST=localhost \
GENERIC_TIMEZONE=America/Sao_Paulo \
n8n start
```

### **Arquivo .env**

Crie um arquivo `.env` no diretório onde executa o n8n:

```bash
# .env
N8N_PORT=5678
N8N_PROTOCOL=http
N8N_HOST=localhost
GENERIC_TIMEZONE=America/Sao_Paulo
N8N_LOG_LEVEL=info
N8N_USER_MANAGEMENT_DISABLED=false
```

### **Configuração de Túnel (Webhooks)**

Para receber webhooks externos:

```bash
# Instalar ngrok
npm install -g ngrok

# Em um terminal, iniciar túnel
ngrok http 5678

# Em outro terminal, iniciar n8n com túnel
n8n start --tunnel
```

---

## <IonicIcon name="code-outline" size={24} color="#10b981" /> Desenvolvimento

### **Instalação para Desenvolvimento**

```bash
# Clonar repositório
git clone https://github.com/n8n-io/n8n.git
cd n8n

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

### **Criar Nodes Customizados**

```bash
# Criar estrutura de node
mkdir my-custom-node
cd my-custom-node

# Inicializar projeto
npm init -y

# Instalar dependências do n8n
npm install n8n-core n8n-workflow

# Estrutura básica
mkdir src
touch src/MyNode.ts
```

### **Exemplo de Node Customizado**

```typescript
// src/MyNode.ts
import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class MyNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Meu Node',
    name: 'myNode',
    icon: 'file:myNode.svg',
    group: ['transform'],
    version: 1,
    description: 'Descrição do meu node customizado',
    defaults: {
      name: 'Meu Node',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Operação',
        name: 'operation',
        type: 'string',
        default: 'process',
        description: 'Operação a ser executada',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const operation = this.getNodeParameter('operation', i) as string;
      
      // Sua lógica aqui
      const processedData = {
        ...items[i].json,
        processed: true,
        operation,
      };

      returnData.push({
        json: processedData,
      });
    }

    return [returnData];
  }
}
```

---

## <IonicIcon name="bug-outline" size={24} color="#10b981" /> Debug e Troubleshooting

### **Logs Detalhados**

```bash
# Logs de debug
N8N_LOG_LEVEL=debug n8n start

# Logs específicos
N8N_LOG_LEVEL=error n8n start

# Salvar logs em arquivo
N8N_LOG_LEVEL=debug n8n start > n8n.log 2>&1
```

### **Problemas Comuns**

#### **Porta já em uso**
```bash
# Verificar processo usando a porta
netstat -tulpn | grep 5678
lsof -i :5678

# Usar porta diferente
N8N_PORT=5679 n8n start
```

#### **Permissões (Linux/Mac)**
```bash
# Corrigir permissões
sudo chown -R $(whoami) ~/.n8n
chmod -R 755 ~/.n8n
```

#### **Erro de memória**
```bash
# Aumentar limite de memória
NODE_OPTIONS="--max-old-space-size=4096" n8n start
```

#### **Problemas de rede**
```bash
# Verificar conectividade
curl -I http://localhost:5678

# Testar webhooks
curl -X POST http://localhost:5678/webhook/test
```

---

## <IonicIcon name="sync-outline" size={24} color="#10b981" /> Atualizações

### **Atualizar n8n**

```bash
# Verificar versão atual
n8n --version

# Atualizar para última versão
npm update -g n8n

# Atualizar para versão específica
npm install -g n8n@1.100.0
```

### **Gerenciar Versões**

```bash
# Listar versões instaladas
npm list -g n8n

# Instalar versão específica
npm install -g n8n@1.99.0

# Voltar para versão anterior
npm install -g n8n@1.98.0
```

---

## <IonicIcon name="folder-outline" size={24} color="#10b981" /> Estrutura de Arquivos

### **Diretórios Importantes**

```bash
# Dados do n8n
~/.n8n/

# Workflows salvos
~/.n8n/workflows/

# Credenciais
~/.n8n/credentials/

# Logs
~/.n8n/logs/

# Configurações
~/.n8n/config/
```

### **Backup Manual**

```bash
# Backup dos dados
tar -czf n8n-backup-$(date +%Y%m%d).tar.gz ~/.n8n/

# Backup específico de workflows
cp -r ~/.n8n/workflows/ ./backup-workflows/
```

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#10b981" /> Próximos Passos

Agora que você tem o n8n rodando localmente:

1. **[Criar Primeiro Workflow](./primeiro-workflow)** - Aprenda a construir workflows
2. **[Conceitos Básicos](./conceitos-basicos)** - Entenda os fundamentos
3. **[Desenvolver Nodes Customizados](../integracoes/criar-nodes/tutorial-desenvolvimento)** - Crie suas próprias integrações

### **Outros Métodos de Instalação**

- **[n8n Cloud](./instalacao-cloud)** - Serviço hospedado oficial
- **[Self-hosted](./instalacao-self-hosted)** - Controle total da infraestrutura

---

:::tip **Dica Pro**
Use a instalação npm para **prototipagem rápida** e **desenvolvimento**. Quando estiver pronto para produção, migre para **n8n Cloud** ou **Self-hosted**.
:::

:::info **Desenvolvimento Local**
Para desenvolvimento de nodes customizados, a instalação npm é essencial. Você pode testar suas integrações rapidamente sem configurações complexas.
:::

:::warning **Limitações**
Lembre-se: a instalação npm é para **desenvolvimento e testes**. Para produção, use **n8n Cloud** ou **Self-hosted** com configurações adequadas de segurança.
::: 