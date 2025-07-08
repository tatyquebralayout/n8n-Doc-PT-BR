---
sidebar_position: 2
title: Instalação via NPM
description: Como instalar n8n usando npm para máximo controle e customização
keywords: [n8n, npm, instalação, nodejs, customização, desenvolvimento]
---


# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalação via NPM

Este guia detalha como **instalar n8n via npm** para máximo controle e customização, ideal para desenvolvimento, testes e ambientes personalizados.

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Quando Usar NPM?

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

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Pré-requisitos

### **Node.js e npm**
```bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar versões
node --version  # Deve ser ≥ 20.19 ≤ 24.x
npm --version   # Qualquer versão recente

# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalar Node.js (se necessário)
# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> macOS
brew install node

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Windows
# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Baixar de https://nodejs.org/
```

### **Requisitos do Sistema**
- **RAM**: Mínimo 2GB, recomendado 4GB+
- **Disco**: 1GB livre para instalação
- **Rede**: Conexão para download de dependências
- **Porta**: 5678 disponível (ou configurável)

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Instalação Rápida

### **1. Instalação Global (Recomendado)**
```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalar n8n globalmente
npm install n8n -g

# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar instalação
n8n --version
```

### **2. Primeira Execução**
```bash
# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Iniciar n8n
n8n

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Ou com comando explícito
n8n start
```

### **3. Acessar Interface**
Abra seu navegador e acesse: `http://localhost:5678`

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração Avançada

### **Variáveis de Ambiente**
```bash
# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurações básicas
export N8N_PORT=5678
export N8N_PROTOCOL=http
export N8N_HOST=localhost
export GENERIC_TIMEZONE=America/Sao_Paulo

# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Executar com configurações
N8N_PORT=5678 \
N8N_PROTOCOL=http \
N8N_HOST=localhost \
GENERIC_TIMEZONE=America/Sao_Paulo \
n8n start
```

### **Arquivo .env**
Crie um arquivo `.env` no diretório onde executa o n8n:
```bash
# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> .env
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
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalar ngrok
npm install -g ngrok

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Em um terminal, iniciar túnel
ngrok http 5678

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Em outro terminal, iniciar n8n com túnel
n8n start --tunnel
```

---

## <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Desenvolvimento

### **Instalação para Desenvolvimento**
```bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Clonar repositório
git clone https://github.com/n8n-io/n8n.git
cd n8n

# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalar dependências
npm install

# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Executar em modo desenvolvimento
npm run dev
```

### **Criar Nodes Customizados**
```bash
# <ion-icon name="code-slash-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Criar estrutura de node
mkdir my-custom-node
cd my-custom-node

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Inicializar projeto
npm init -y

# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalar dependências do n8n
npm install n8n-core n8n-workflow

# <ion-icon name="folder-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Estrutura básica
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

## <ion-icon name="bug-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Debug e Troubleshooting

### **Logs Detalhados**
```bash
# <ion-icon name="bug-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Logs de debug
N8N_LOG_LEVEL=debug n8n start

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Logs específicos
N8N_LOG_LEVEL=error n8n start

# <ion-icon name="grid-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Salvar logs em arquivo
N8N_LOG_LEVEL=debug n8n start > n8n.log 2>&1
```

### **Problemas Comuns**

#### **Porta já em uso**
```bash
# <ion-icon name="git-branch-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar processo usando a porta
netstat -tulpn | grep 5678
lsof -i :5678

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Usar porta diferente
N8N_PORT=5679 n8n start
```

#### **Permissões (Linux/Mac)**
```bash
# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Corrigir permissões
sudo chown -R $(whoami) ~/.n8n
chmod -R 755 ~/.n8n
```

#### **Erro de memória**
```bash
# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Aumentar limite de memória
NODE_OPTIONS="--max-old-space-size=4096" n8n start
```

#### **Problemas de rede**
```bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar conectividade
curl -I http://localhost:5678

# <ion-icon name="git-network-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Testar webhooks
curl -X POST http://localhost:5678/webhook/test
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Atualizações

### **Atualizar n8n**
```bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Verificar versão atual
n8n --version

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Atualizar para última versão
npm update -g n8n

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Atualizar para versão específica
npm install -g n8n@1.100.0
```

### **Gerenciar Versões**
```bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Listar versões instaladas
npm list -g n8n

# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalar versão específica
npm install -g n8n@1.99.0

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Voltar para versão anterior
npm install -g n8n@1.98.0
```

---

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Estrutura de Arquivos

### **Diretórios Importantes**
```bash
# <ion-icon name="analytics-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Dados do n8n
~/.n8n/

# <ion-icon name="git-branch-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Workflows salvos
~/.n8n/workflows/

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Credenciais
~/.n8n/credentials/

# <ion-icon name="document-text-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Logs
~/.n8n/logs/

# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurações
~/.n8n/config/
```

### **Backup Manual**
```bash
# <ion-icon name="analytics-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Backup dos dados
tar -czf n8n-backup-$(date +%Y%m%d).tar.gz ~/.n8n/

# <ion-icon name="git-branch-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Backup específico de workflows
cp -r ~/.n8n/workflows/ ./backup-workflows/
```

---

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

Agora que você tem o n8n rodando localmente:

1. **[Criar Primeiro Workflow](../../primeiros-passos/primeiro-workflow)** - Aprenda a construir workflows
2. **[Conceitos Básicos](../../primeiros-passos/conceitos-basicos)** - Entenda os fundamentos
3. **[Desenvolver Nodes Customizados](../../integracoes/criar-nodes/tutorial-desenvolvimento)** - Crie suas próprias integrações

### **Outros Métodos de Instalação**
- **[Docker](./docker)** - Containerização para produção
- **[Cloud](./cloud)** - Serviço hospedado oficial
- **[Desktop](./desktop)** - Aplicação desktop

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

---

** Links úteis:**
-  [Documentação oficial n8n](https://docs.n8n.io/)
-  [Repositório n8n no GitHub](https://github.com/n8n-io/n8n)
-  [Pacote n8n no npm](https://www.npmjs.com/package/n8n)
