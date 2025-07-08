---
sidebar_position: 3
title: Instalação na Nuvem
description: Como instalar e configurar n8n em provedores de nuvem
keywords: [n8n, cloud, nuvem, aws, azure, gcp, instalação]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="cloud-outline" size={32} color="#ea4b71" /> Instalação na Nuvem

Este guia detalha como **instalar n8n em provedores de nuvem**, incluindo n8n Cloud oficial e deployment em AWS, Azure, Google Cloud e outros provedores.

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> Opções de Cloud

### **n8n Cloud (Oficial)**
Serviço totalmente gerenciado pelos criadores do n8n.

### **Self-hosted em Cloud**
Deploy em sua própria infraestrutura na nuvem.

---

## <IonicIcon name="cloud-outline" size={24} color="#ea4b71" /> n8n Cloud (Oficial)

### **O que é o n8n Cloud?**
O n8n Cloud é uma plataforma **Software-as-a-Service (SaaS)** que elimina toda a complexidade de infraestrutura, permitindo que você foque exclusivamente na criação e execução de seus workflows.

### **Principais Características:**
- ✅ **Zero configuração** - Comece em segundos
- ✅ **Escalabilidade automática** - Cresce com suas necessidades
- ✅ **Backups automáticos** - Seus dados sempre seguros
- ✅ **Monitoramento 24/7** - Equipe n8n cuida da infraestrutura
- ✅ **Recursos Enterprise** - RBAC, ambientes, SAML incluídos

---

## <IonicIcon name="card-outline" size={24} color="#ea4b71" /> Planos e Preços

### **Free Trial**
- **Duração**: 14 dias
- **Execuções**: 1.000 execuções
- **Usuários**: Até 5 usuários
- **Recursos**: Todos os recursos incluídos

### **Starter Plan**
- **Preço**: $20/mês por usuário
- **Execuções**: 10.000 execuções/mês
- **Usuários**: Ilimitados
- **Suporte**: Email

### **Professional Plan**
- **Preço**: $50/mês por usuário
- **Execuções**: 50.000 execuções/mês
- **Usuários**: Ilimitados
- **Suporte**: Email + Chat
- **Recursos**: Ambientes, RBAC avançado

### **Enterprise Plan**
- **Preço**: Sob consulta
- **Execuções**: Ilimitadas
- **Recursos**: SAML, SSO, SLA garantido
- **Suporte**: Dedicado

---

## <IonicIcon name="rocket-outline" size={24} color="#ea4b71" /> Como Começar

### **1. Criar Conta**
1. Acesse [cloud.n8n.io](https://cloud.n8n.io)
2. Clique em **"Start Free Trial"**
3. Preencha seus dados:
   - **Nome completo**
   - **Email corporativo**
   - **Senha segura**
4. Confirme seu email

### **2. Configuração Inicial**
Após o login, você será direcionado para o dashboard:

1. **Escolha seu workspace** (ou crie um novo)
2. **Configure domínio personalizado** (opcional)
3. **Adicione membros da equipe** (opcional)
4. **Configure notificações** (opcional)

### **3. Primeiro Workflow**
1. Clique em **"Create Workflow"**
2. Escolha um template ou comece do zero
3. Configure seu primeiro trigger
4. Teste a execução

---

## <IonicIcon name="settings-outline" size={24} color="#ea4b71" /> Configurações Avançadas

### **Domínio Personalizado**
Configure um domínio próprio para sua instância:

1. Vá em **Settings > Workspace**
2. Clique em **"Custom Domain"**
3. Adicione seu domínio
4. Configure DNS conforme instruções
5. Aguarde a verificação (pode levar até 24h)

### **Integração com SSO**
Para planos Professional e Enterprise:

1. **Settings > Authentication**
2. Configure **SAML** ou **OAuth**
3. Adicione provedores de identidade
4. Configure mapeamento de usuários

### **Ambientes**
Crie ambientes separados para desenvolvimento e produção:

1. **Settings > Environments**
2. Clique em **"Create Environment"**
3. Configure variáveis específicas
4. Defina permissões por ambiente

---

## <IonicIcon name="shield-checkmark-outline" size={24} color="#ea4b71" /> Segurança e Compliance

### **Certificações**
- **SOC 2 Type II** - Controles de segurança
- **GDPR** - Conformidade com dados europeus
- **ISO 27001** - Gestão de segurança da informação

### **Recursos de Segurança**
- **Criptografia em trânsito** - TLS 1.3
- **Criptografia em repouso** - AES-256
- **Backups automáticos** - Diários e redundantes
- **Monitoramento 24/7** - Detecção de anomalias

### **Controles de Acesso**
- **RBAC** - Controle granular de permissões
- **2FA** - Autenticação de dois fatores
- **Audit logs** - Registro completo de atividades
- **IP whitelist** - Restrição por endereços IP

---

## <IonicIcon name="analytics-outline" size={24} color="#ea4b71" /> Monitoramento e Analytics

### **Dashboard de Execuções**
- **Taxa de sucesso** por workflow
- **Tempo de execução** médio
- **Erros mais comuns** e soluções
- **Uso de recursos** e otimizações

### **Alertas e Notificações**
- **Falhas críticas** em tempo real
- **Limite de execuções** próximo
- **Performance degradada**
- **Manutenções programadas**

---

## <IonicIcon name="server-outline" size={24} color="#ea4b71" /> Self-hosted em Cloud

### **AWS (Amazon Web Services)**

#### **EC2 com Docker**
```bash
# Criar instância EC2
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t3.medium \
  --key-name sua-key \
  --security-group-ids sg-xxxxxxxxx \
  --subnet-id subnet-xxxxxxxxx

# Conectar via SSH
ssh -i sua-key.pem ubuntu@seu-ip

# Instalar Docker
sudo apt update
sudo apt install docker.io docker-compose

# Executar n8n
docker run -d \
  --name n8n \
  -p 80:5678 \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n
```

#### **ECS (Elastic Container Service)**
```yaml
# task-definition.json
{
  "family": "n8n",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "n8n",
      "image": "n8nio/n8n:latest",
      "portMappings": [
        {
          "containerPort": 5678,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "N8N_PROTOCOL",
          "value": "https"
        },
        {
          "name": "N8N_HOST",
          "value": "seu-dominio.com"
        }
      ]
    }
  ]
}
```

### **Google Cloud Platform (GCP)**

#### **Compute Engine**
```bash
# Criar instância
gcloud compute instances create n8n-instance \
  --zone=us-central1-a \
  --machine-type=e2-medium \
  --image-family=ubuntu-2004-lts \
  --image-project=ubuntu-os-cloud

# Conectar via SSH
gcloud compute ssh n8n-instance --zone=us-central1-a

# Instalar e executar n8n
sudo apt update
sudo apt install docker.io docker-compose
sudo docker run -d --name n8n -p 80:5678 n8nio/n8n
```

#### **Cloud Run**
```yaml
# cloudbuild.yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['run', '-d', '--name', 'n8n', '-p', '8080:5678', 'n8nio/n8n']
```

### **Microsoft Azure**

#### **Azure VM**
```bash
# Criar VM
az vm create \
  --resource-group n8n-rg \
  --name n8n-vm \
  --image UbuntuLTS \
  --size Standard_B2s \
  --admin-username azureuser

# Conectar via SSH
ssh azureuser@seu-ip

# Instalar e executar n8n
sudo apt update
sudo apt install docker.io docker-compose
sudo docker run -d --name n8n -p 80:5678 n8nio/n8n
```

#### **Azure Container Instances**
```bash
# Criar container
az container create \
  --resource-group n8n-rg \
  --name n8n-container \
  --image n8nio/n8n:latest \
  --ports 5678 \
  --dns-name-label n8n-app
```

---

## <IonicIcon name="construct-outline" size={24} color="#ea4b71" /> Configuração Avançada

### **Load Balancer**
```yaml
# AWS Application Load Balancer
apiVersion: v1
kind: Service
metadata:
  name: n8n-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 5678
  selector:
    app: n8n
```

### **Auto Scaling**
```yaml
# Kubernetes HPA
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: n8n-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: n8n
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### **Monitoramento**
```yaml
# Prometheus monitoring
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
    - job_name: 'n8n'
      static_configs:
      - targets: ['n8n:5678']
```

---

## <IonicIcon name="help-circle-outline" size={24} color="#ea4b71" /> Suporte e Recursos

### **Canais de Suporte**
- **Documentação oficial** - Guias detalhados
- **Community Forum** - Troca de experiências
- **Discord** - Suporte em tempo real
- **Email** - Suporte técnico direto

### **Recursos Adicionais**
- **Templates prontos** - Workflows pré-configurados
- **Webinars** - Treinamentos semanais
- **Best practices** - Guias de otimização
- **API Reference** - Documentação técnica

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> Próximos Passos

Agora que você conhece as opções de cloud:

1. **[Criar Primeiro Workflow](../../primeiros-passos/primeiro-workflow)** - Aprenda a construir workflows
2. **[Conceitos Básicos](../../primeiros-passos/conceitos-basicos)** - Entenda os fundamentos
3. **[Integrações](../../integracoes/index)** - Conecte suas aplicações

### **Outros Métodos de Instalação**
- **[Docker](./docker)** - Containerização para produção
- **[NPM](./npm)** - Instalação local para desenvolvimento
- **[Desktop](./desktop)** - Aplicação desktop

---

:::tip **Dica Pro**
Para **time-to-value** rápido, comece com **n8n Cloud**. Para **controle total** e **customização**, use **self-hosted** em sua infraestrutura de cloud.
:::

:::info **Escolha da Cloud**
**n8n Cloud** é ideal para equipes que querem focar no produto. **Self-hosted** é melhor para controle total e integração com infraestrutura existente.
:::

:::warning **Considerações**
Para **self-hosted** em cloud, considere custos de infraestrutura, manutenção e monitoramento. **n8n Cloud** inclui tudo isso no preço.
:::

---

**<IonicIcon name="link-outline" size={16} color="#ea4b71" /> Links úteis:**
- <IonicIcon name="cloud-outline" size={16} color="#6b7280" /> [n8n Cloud](https://cloud.n8n.io)
- <IonicIcon name="document-text-outline" size={16} color="#6b7280" /> [Documentação oficial](https://docs.n8n.io/)
- <IonicIcon name="logo-github" size={16} color="#6b7280" /> [Repositório n8n](https://github.com/n8n-io/n8n)
