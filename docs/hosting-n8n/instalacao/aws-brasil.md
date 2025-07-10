---
sidebar_position: 5
title: AWS Brasil
description: Como configurar n8n na AWS Brasil com foco na região de São Paulo
keywords: [n8n, aws, brasil, são paulo, us-east-1, ec2, rds, vpc, compliance]
---

# <ion-icon name="cloud-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> AWS Brasil

Este guia detalha como **configurar n8n na AWS Brasil**, focando na região us-east-1 (São Paulo), configurações de compliance brasileiro, otimização de custos, e implementação de alta disponibilidade seguindo as melhores práticas para o mercado brasileiro.

## <ion-icon name="cloud-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Região AWS Brasil

### us-east-1 (São Paulo)

A região de São Paulo oferece:

- **Baixa latência** para usuários brasileiros
- **Compliance LGPD** com data residency
- **Cobrança em BRL** (sem conversão de moeda)
- **Suporte local** em português

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Arquitetura Recomendada

### Componentes da Infraestrutura

```yaml
# <ion-icon name="cloud-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> docker-compose.yml para AWS Brasil
version: '3.8'
services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_PROTOCOL=https
      - N8N_HOST=seu-dominio.com.br
      - N8N_PORT=5678
      - N8N_USER_MANAGEMENT_DISABLED=false
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=seu-rds-endpoint.us-east-1.rds.amazonaws.com
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=${DB_USER}
      - DB_POSTGRESDB_PASSWORD=${DB_PASSWORD}
      - GENERIC_TIMEZONE=America/Sao_Paulo
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      - WEBHOOK_URL=https://seu-dominio.com.br
      - EXECUTIONS_DATA_SAVE_ON_ERROR=all
      - EXECUTIONS_DATA_SAVE_ON_SUCCESS=all
      - EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=true
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=168
      - EXECUTIONS_DATA_PRUNE_TIMEOUT=3600
    volumes:
      - n8n_data:/home/node/.n8n
    networks:
      - n8n_network
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    container_name: n8n-redis
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - n8n_network

  nginx:
    image: nginx:alpine
    container_name: n8n-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    networks:
      - n8n_network
    depends_on:
      - n8n

volumes:
  n8n_data:
  redis_data:

networks:
  n8n_network:
    driver: bridge
```

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração de Recursos AWS

### EC2 Instance Types

**Para Desenvolvimento:**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> t3.medium (2 vCPU, 4GB RAM)
Instance Type: t3.medium
vCPU: 2
RAM: 4GB
Storage: 20GB gp3
Custo: ~R$ 150/mês
```

**Para Produção:**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> t3.large (2 vCPU, 8GB RAM)
Instance Type: t3.large
vCPU: 2
RAM: 8GB
Storage: 50GB gp3
Custo: ~R$ 300/mês
```

**Para Alta Performance:**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> c6i.large (2 vCPU, 4GB RAM, otimizado para CPU)
Instance Type: c6i.large
vCPU: 2
RAM: 4GB
Storage: 100GB gp3
Custo: ~R$ 400/mês
```

### RDS PostgreSQL

**Configuração Recomendada:**

```bash
# <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> db.t3.micro (para desenvolvimento)
Engine: PostgreSQL 15
Instance: db.t3.micro
Storage: 20GB gp3
Multi-AZ: false
Backup: 7 dias
Custo: ~R$ 80/mês

# <ion-icon name="server-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> db.t3.small (para produção)
Engine: PostgreSQL 15
Instance: db.t3.small
Storage: 50GB gp3
Multi-AZ: true
Backup: 30 dias
Custo: ~R$ 200/mês
```

### VPC e Segurança

**Configuração de Rede:**

```bash
# <ion-icon name="key-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> VPC Configuration
CIDR Block: 10.0.0.0/16
Availability Zones: us-east-1a, us-east-1b
Public Subnets: 10.0.1.0/24, 10.0.2.0/24
Private Subnets: 10.0.10.0/24, 10.0.11.0/24

# <ion-icon name="shield-checkmark-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Security Groups
n8n-sg:
  - Port 80 (HTTP) - 0.0.0.0/0
  - Port 443 (HTTPS) - 0.0.0.0/0
  - Port 5678 (n8n) - 0.0.0.0/0

rds-sg:
  - Port 5432 (PostgreSQL) - n8n-sg
```

## <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Otimização de Custos

### Estratégias de Economia

**1. Reserved Instances:**

```bash
# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Economia de até 72% com reserva de 3 anos
t3.large - On-Demand: R$ 300/mês
t3.large - Reserved (3 anos): R$ 84/mês
Economia: R$ 216/mês (72%)
```

**2. Spot Instances (Desenvolvimento):**

```bash
# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Economia de até 90% para workloads não críticos
t3.large - On-Demand: R$ 300/mês
t3.large - Spot: R$ 30/mês
Economia: R$ 270/mês (90%)
```

**3. S3 Intelligent Tiering:**

```bash
# <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Backup automático com otimização de custo
Standard: R$ 0,023/GB/mês
IA: R$ 0,0125/GB/mês
Archive: R$ 0,004/GB/mês
```

## <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Compliance Brasileiro

### LGPD (Lei Geral de Proteção de Dados)

**Configurações de Privacidade:**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Variáveis de ambiente para LGPD
N8N_ENCRYPTION_KEY=chave-criptografia-forte
N8N_USER_MANAGEMENT_DISABLED=false
N8N_BASIC_AUTH_ACTIVE=true
EXECUTIONS_DATA_SAVE_ON_ERROR=none
EXECUTIONS_DATA_SAVE_ON_SUCCESS=none
EXECUTIONS_DATA_PRUNE=true
EXECUTIONS_DATA_MAX_AGE=30
```

**Auditoria e Logs:**

```bash
# <ion-icon name="cloud-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> CloudTrail para auditoria
- Log de todas as ações administrativas
- Retenção de logs por 90 dias (mínimo LGPD)
- Alertas para acesso não autorizado
- Backup criptografado dos logs
```

### Marco Civil da Internet

**Requisitos de Armazenamento:**

```bash
# <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração de logs para Marco Civil
- Logs de acesso por 6 meses
- Logs de aplicação por 1 ano
- Backup em múltiplas regiões
- Criptografia em repouso
```

## <ion-icon name="cloud-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Deployment Automatizado

### Terraform para AWS Brasil

```hcl
# <ion-icon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> main.tf
provider "aws" {
  region = "us-east-1"
}

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> VPC
resource "aws_vpc" "n8n_vpc" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "n8n-vpc"
    Environment = "production"
    Project = "n8n-automation"
  }
}

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> EC2 Instance
resource "aws_instance" "n8n_server" {
  ami           = "ami-0c02fb55956c7d316" # Amazon Linux 2
  instance_type = "t3.large"
  
  vpc_security_group_ids = [aws_security_group.n8n_sg.id]
  subnet_id              = aws_subnet.n8n_public.id
  
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y docker
              systemctl start docker
              systemctl enable docker
              usermod -a -G docker ec2-user
              docker run -d --name n8n \
                -p 5678:5678 \
                -e N8N_PROTOCOL=https \
                -e N8N_HOST=${aws_route53_record.n8n.fqdn} \
                n8nio/n8n
              EOF
  
  tags = {
    Name = "n8n-server"
  }
}

# <ion-icon name="server-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> RDS PostgreSQL
resource "aws_db_instance" "n8n_database" {
  identifier = "n8n-db"
  
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = "db.t3.small"
  
  allocated_storage     = 50
  storage_type         = "gp3"
  storage_encrypted    = true
  
  db_name  = "n8n"
  username = var.db_username
  password = var.db_password
  
  backup_retention_period = 30
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = true
  
  tags = {
    Name = "n8n-database"
  }
}
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Monitoramento e Alertas

### CloudWatch

**Métricas Essenciais:**

```bash
# <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Métricas EC2
- CPU Utilization > 80%
- Memory Utilization > 85%
- Disk Space > 90%
- Network In/Out

# <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Métricas RDS
- CPU Utilization > 70%
- Free Storage Space < 10GB
- Database Connections > 80%
- Read/Write IOPS

# <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Métricas Application
- HTTP 5xx Errors > 1%
- Response Time > 2s
- Active Workflows
- Failed Executions
```

**Alertas em Português:**

```bash
# <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> SNS Topic para alertas
Subject: "Alerta n8n - CPU alta"
Message: "A instância n8n está com CPU em 85%. Verifique imediatamente."
```

## <ion-icon name="bug-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Troubleshooting

### Problemas Comuns

**1. Alto Latência:**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar região
aws ec2 describe-regions --region-names us-east-1

# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Testar conectividade
ping seu-endpoint.us-east-1.rds.amazonaws.com
```

**2. Custos Elevados:**

```bash
# <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar uso de recursos
aws ce get-cost-and-usage \
  --time-period Start=2024-01-01,End=2024-01-31 \
  --granularity MONTHLY \
  --metrics BlendedCost
```

**3. Problemas de Backup:**

```bash
# <ion-icon name="document-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Verificar snapshots RDS
aws rds describe-db-snapshots \
  --db-instance-identifier n8n-db
```

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Dicas para o Brasil

### Otimizações Específicas

1. **Fuso Horário:** Sempre use `America/Sao_Paulo`
2. **Moeda:** Configure alertas de custo em BRL
3. **Suporte:** AWS Brasil oferece suporte em português
4. **Compliance:** Implemente logs para LGPD desde o início
5. **Backup:** Use múltiplas regiões para disaster recovery

### Recursos Úteis

- **[AWS Brasil](https://aws.amazon.com/pt/)** - Portal oficial
- **[AWS Training](https://aws.amazon.com/pt/training/)** - Cursos gratuitos
- **[AWS User Groups Brasil](https://aws.amazon.com/pt/events/aws-user-groups/)** - Comunidade local
- **[AWS Pricing Calculator](https://calculator.aws/)** - Calculadora de custos

---

**Próximos passos:**

1. **[Google Cloud Brasil](./gcp-brasil)** - Configuração no GCP
2. **[Azure Brasil](./azure-brasil)** - Configuração no Azure
3. **[Compliance LGPD](../compliance/lgpd)** - Configurações de privacidade
