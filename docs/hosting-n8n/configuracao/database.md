---
sidebar_position: 2
title: Configuração de Database
description: Como configurar banco de dados para n8n em produção
keywords: [n8n, database, banco de dados, postgresql, mysql, configuração]
---


# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração de Database

Este documento explica como **configurar banco de dados** para n8n em ambiente de produção, abordando escolha entre PostgreSQL e MySQL, configuração de conexões, otimização de performance, backup e recovery, migrações entre versões, e estratégias de escalabilidade que garantem armazenamento confiável e eficiente de workflows, execuções, e credenciais em implementações empresariais robustas.

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que você vai aprender

-  Escolha entre PostgreSQL e MySQL
-  Configuração de conexões
-  Otimização de performance
-  Backup e recovery
-  Estratégias de escalabilidade

---

## <ion-icon name="analytics-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Escolha do Banco de Dados

###  PostgreSQL (Recomendado)

**Vantagens:**
- ✅ **Melhor performance** para workloads complexos
- ✅ **Suporte completo** a JSON e arrays
- ✅ **Transações ACID** robustas
- ✅ **Recursos avançados** (views, procedures, triggers)
- ✅ **Comunidade ativa** e documentação extensa
- ✅ **Escalabilidade** horizontal e vertical

**Recomendado para:**
- Produção empresarial
- Workflows complexos
- Alto volume de dados
- Requisitos de compliance

###  MySQL (Alternativa)

**Vantagens:**
- ✅ **Fácil configuração** e manutenção
- ✅ **Ampla adoção** na comunidade
- ✅ **Boa performance** para workloads simples
- ✅ **Recursos de replicação** nativos

**Recomendado para:**
- Ambientes de desenvolvimento
- Workflows simples
- Equipes com experiência em MySQL
- Infraestrutura existente MySQL

###  SQLite (Desenvolvimento)

**Vantagens:**
- ✅ **Zero configuração** - arquivo único
- ✅ **Portátil** - funciona em qualquer lugar
- ✅ **Ideal para desenvolvimento** e testes

**Limitações:**
- ❌ **Não recomendado** para produção
- ❌ **Concorrência limitada** - um escritor por vez
- ❌ **Sem recursos** de rede

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração PostgreSQL

###  Instalação Rápida

#### **Ubuntu/Debian**
```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalar PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Iniciar serviço
sudo systemctl start postgresql
sudo systemctl enable postgresql

# <ion-icon name="person-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Criar usuário e banco
sudo -u postgres createuser --interactive n8n
sudo -u postgres createdb n8n
```

#### **CentOS/RHEL**
```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalar PostgreSQL
sudo yum install postgresql-server postgresql-contrib

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Inicializar banco
sudo postgresql-setup initdb

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Iniciar serviço
sudo systemctl start postgresql
sudo systemctl enable postgresql

# <ion-icon name="person-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Criar usuário e banco
sudo -u postgres createuser --interactive n8n
sudo -u postgres createdb n8n
```

#### **Docker**
```bash
# <ion-icon name="cloud-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Executar PostgreSQL com Docker
docker run -d \
  --name postgres-n8n \
  -e POSTGRES_DB=n8n \
  -e POSTGRES_USER=n8n \
  -e POSTGRES_PASSWORD=senha_segura \
  -v postgres_data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:15
```

###  Configuração Avançada

#### **postgresql.conf - Otimizações**
```bash
# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> /etc/postgresql/15/main/postgresql.conf

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Memória
shared_buffers = 256MB          # 25% da RAM
effective_cache_size = 1GB      # 75% da RAM
work_mem = 4MB                  # Para queries complexas
maintenance_work_mem = 64MB     # Para manutenção

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Conexões
max_connections = 100           # Ajuste conforme necessidade
max_worker_processes = 8        # Para paralelização

# <ion-icon name="document-text-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Logs
log_destination = 'stderr'
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_rotation_age = 1d
log_rotation_size = 100MB

# <ion-icon name="speedometer-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Performance
random_page_cost = 1.1          # Para SSDs
effective_io_concurrency = 200  # Para SSDs
checkpoint_completion_target = 0.9
wal_buffers = 16MB
```

#### **pg_hba.conf - Segurança**
```bash
# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> /etc/postgresql/15/main/pg_hba.conf

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Conexões locais
local   all             postgres                                peer
local   all             all                                     md5

# <ion-icon name="repeat-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Conexões de rede (ajuste IPs conforme necessário)
host    n8n             n8n             127.0.0.1/32            md5
host    n8n             n8n             ::1/128                 md5
host    n8n             n8n             192.168.1.0/24          md5
```

###  Variáveis de Ambiente

```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração PostgreSQL
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=localhost
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=senha_segura

# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurações avançadas
DB_POSTGRESDB_SCHEMA=public
DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED=false
DB_POSTGRESDB_SSL_CA=/path/to/ca-certificate.crt
DB_POSTGRESDB_SSL_CERT=/path/to/client-certificate.crt
DB_POSTGRESDB_SSL_KEY=/path/to/client-key.key
```

---

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Configuração MySQL

###  Instalação Rápida

#### **Ubuntu/Debian**
```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Instalar MySQL
sudo apt update
sudo apt install mysql-server

# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração inicial
sudo mysql_secure_installation

# <ion-icon name="person-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Criar usuário e banco
sudo mysql -u root -p
```

```sql
-- No MySQL
CREATE DATABASE n8n;
CREATE USER 'n8n'@'localhost' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON n8n.* TO 'n8n'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### **Docker**
```bash
# <ion-icon name="cloud-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Executar MySQL com Docker
docker run -d \
  --name mysql-n8n \
  -e MYSQL_DATABASE=n8n \
  -e MYSQL_USER=n8n \
  -e MYSQL_PASSWORD=senha_segura \
  -e MYSQL_ROOT_PASSWORD=root_senha_segura \
  -v mysql_data:/var/lib/mysql \
  -p 3306:3306 \
  mysql:8.0
```

###  Configuração Avançada

#### **my.cnf - Otimizações**
```ini
# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> /etc/mysql/mysql.conf.d/mysqld.cnf

[mysqld]
# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Memória
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
innodb_log_buffer_size = 16M
key_buffer_size = 256M

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Conexões
max_connections = 200
max_connect_errors = 1000

# <ion-icon name="document-text-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Logs
log_error = /var/log/mysql/error.log
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2

# <ion-icon name="speedometer-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Performance
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT
innodb_file_per_table = 1
```

###  Variáveis de Ambiente

```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração MySQL
DB_TYPE=mysqldb
DB_MYSQLDB_HOST=localhost
DB_MYSQLDB_PORT=3306
DB_MYSQLDB_DATABASE=n8n
DB_MYSQLDB_USER=n8n
DB_MYSQLDB_PASSWORD=senha_segura

# <ion-icon name="key-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configurações avançadas
DB_MYSQLDB_CHARSET=utf8mb4
DB_MYSQLDB_SSL_REJECT_UNAUTHORIZED=false
DB_MYSQLDB_SSL_CA=/path/to/ca-certificate.crt
DB_MYSQLDB_SSL_CERT=/path/to/client-certificate.crt
DB_MYSQLDB_SSL_KEY=/path/to/client-key.key
```

---

## <ion-icon name="speedometer-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Otimização de Performance

###  PostgreSQL

#### **Índices Recomendados**
```sql
-- Índices para melhorar performance
CREATE INDEX idx_executions_workflow_id ON executions(workflow_id);
CREATE INDEX idx_executions_started_at ON executions(started_at);
CREATE INDEX idx_executions_finished_at ON executions(finished_at);
CREATE INDEX idx_executions_status ON executions(status);

-- Índice para busca por texto
CREATE INDEX idx_workflows_name ON workflows USING gin(to_tsvector('portuguese', name));
```

#### **Configurações de Performance**
```sql
-- Configurar estatísticas
ALTER DATABASE n8n SET default_statistics_target = 100;
ALTER DATABASE n8n SET random_page_cost = 1.1;
ALTER DATABASE n8n SET effective_io_concurrency = 200;

-- Vacuum e analyze
VACUUM ANALYZE;
```

###  MySQL

#### **Índices Recomendados**
```sql
-- Índices para melhorar performance
CREATE INDEX idx_executions_workflow_id ON executions(workflow_id);
CREATE INDEX idx_executions_started_at ON executions(started_at);
CREATE INDEX idx_executions_finished_at ON executions(finished_at);
CREATE INDEX idx_executions_status ON executions(status);

-- Índice para busca por texto
CREATE FULLTEXT INDEX idx_workflows_name ON workflows(name);
```

#### **Configurações de Performance**
```sql
-- Configurar engine
ALTER TABLE executions ENGINE=InnoDB;
ALTER TABLE workflows ENGINE=InnoDB;

-- Otimizar tabelas
OPTIMIZE TABLE executions;
OPTIMIZE TABLE workflows;
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Backup e Recovery

###  Backup Automático

#### **PostgreSQL - Script de Backup**
```bash
#!/bin/bash
# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> backup-postgres.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/postgres"
DB_NAME="n8n"
DB_USER="n8n"
BACKUP_FILE="$BACKUP_DIR/n8n_$DATE.sql"

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Criar diretório se não existir
mkdir -p $BACKUP_DIR

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Backup completo
pg_dump -h localhost -U $DB_USER -d $DB_NAME > $BACKUP_FILE

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Comprimir backup
gzip $BACKUP_FILE

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Manter apenas últimos 7 backups
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "Backup criado: $BACKUP_FILE.gz"
```

#### **MySQL - Script de Backup**
```bash
#!/bin/bash
# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> backup-mysql.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mysql"
DB_NAME="n8n"
DB_USER="n8n"
BACKUP_FILE="$BACKUP_DIR/n8n_$DATE.sql"

# <ion-icon name="sparkles-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Criar diretório se não existir
mkdir -p $BACKUP_DIR

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Backup completo
mysqldump -h localhost -u $DB_USER -p$DB_PASSWORD $DB_NAME > $BACKUP_FILE

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Comprimir backup
gzip $BACKUP_FILE

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Manter apenas últimos 7 backups
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "Backup criado: $BACKUP_FILE.gz"
```

###  Restauração

#### **PostgreSQL - Restaurar Backup**
```bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Descomprimir backup
gunzip n8n_20241201_120000.sql.gz

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Restaurar backup
psql -h localhost -U n8n -d n8n < n8n_20241201_120000.sql
```

#### **MySQL - Restaurar Backup**
```bash
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Descomprimir backup
gunzip n8n_20241201_120000.sql.gz

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Restaurar backup
mysql -h localhost -u n8n -p n8n < n8n_20241201_120000.sql
```

###  Cron Jobs

```bash
# <ion-icon name="time-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Adicionar ao crontab
# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Backup diário às 2h da manhã
0 2 * * * /path/to/backup-postgres.sh

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Backup semanal completo
0 2 * * 0 /path/to/backup-postgres-full.sh
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Escalabilidade

###  Replicação

#### **PostgreSQL - Replicação Master-Slave**
```bash
# <ion-icon name="server-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Master (postgresql.conf)
wal_level = replica
max_wal_senders = 3
wal_keep_segments = 64

# <ion-icon name="document-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Slave (recovery.conf)
standby_mode = 'on'
primary_conninfo = 'host=master_ip port=5432 user=replicator password=senha'
restore_command = 'cp /var/lib/postgresql/wal/%f %p'
```

#### **MySQL - Replicação Master-Slave**
```sql
-- Master
GRANT REPLICATION SLAVE ON *.* TO 'replicator'@'%' IDENTIFIED BY 'senha';

-- Slave
CHANGE MASTER TO
  MASTER_HOST='master_ip',
  MASTER_USER='replicator',
  MASTER_PASSWORD='senha',
  MASTER_LOG_FILE='mysql-bin.000001',
  MASTER_LOG_POS=154;
```

###  Cloud Databases

#### **AWS RDS PostgreSQL**
```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração RDS
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=seu-cluster.cluster-xyz.us-east-1.rds.amazonaws.com
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=senha_segura
DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED=false
```

#### **Google Cloud SQL**
```bash
# <ion-icon name="settings-outline" style={{ fontSize: '32px', color: '#ea4b71' }}></ion-icon> Configuração Cloud SQL
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=/cloudsql/project:region:instance
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=senha_segura
```

---

## <ion-icon name="cloud-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Docker Compose

###  PostgreSQL Completo

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=${DB_PASSWORD}
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      - postgres
    networks:
      - n8n_network

  postgres:
    image: postgres:15
    restart: unless-stopped
    environment:
      - POSTGRES_DB=n8n
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./postgresql.conf:/etc/postgresql/postgresql.conf
    command: postgres -c config_file=/etc/postgresql/postgresql.conf
    networks:
      - n8n_network

  pgadmin:
    image: dpage/pgadmin4:latest
    restart: unless-stopped
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@seudominio.com
      - PGADMIN_DEFAULT_PASSWORD=${PGADMIN_PASSWORD}
    ports:
      - "5050:80"
    depends_on:
      - postgres
    networks:
      - n8n_network

volumes:
  n8n_data:
  postgres_data:

networks:
  n8n_network:
    driver: bridge
```

---

## <ion-icon name="eye-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Monitoramento

###  Métricas PostgreSQL

```sql
-- Queries lentas
SELECT query, mean_time, calls, total_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Uso de tabelas
SELECT schemaname, tablename, n_tup_ins, n_tup_upd, n_tup_del
FROM pg_stat_user_tables
ORDER BY n_tup_ins + n_tup_upd + n_tup_del DESC;

-- Conexões ativas
SELECT count(*) as active_connections
FROM pg_stat_activity
WHERE state = 'active';
```

###  Métricas MySQL

```sql
-- Status do servidor
SHOW STATUS LIKE 'Connections';
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Slow_queries';

-- Queries lentas
SELECT * FROM mysql.slow_log
WHERE start_time > DATE_SUB(NOW(), INTERVAL 1 HOUR)
ORDER BY query_time DESC
LIMIT 10;
```

---

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Checklist de Produção

###  Configuração

- [ ] PostgreSQL 15+ ou MySQL 8.0+ instalado
- [ ] Usuário dedicado criado para n8n
- [ ] Banco de dados criado com charset UTF-8
- [ ] Variáveis de ambiente configuradas
- [ ] Conexão testada e funcionando

###  Performance

- [ ] Índices criados nas tabelas principais
- [ ] Configurações de memória otimizadas
- [ ] Logs de queries lentas ativados
- [ ] Estatísticas atualizadas regularmente
- [ ] Vacuum/Analyze configurado

###  Backup

- [ ] Script de backup automático configurado
- [ ] Backup testado e funcionando
- [ ] Retenção de backups definida
- [ ] Backup em localização segura
- [ ] Procedimento de restauração documentado

###  Segurança

- [ ] Senha forte configurada
- [ ] Acesso restrito por IP (se aplicável)
- [ ] SSL configurado (se necessário)
- [ ] Usuário com privilégios mínimos
- [ ] Logs de acesso ativados

---

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

Agora que você configurou o banco de dados:

1. **[Configuração de Filas](./queues)** - Configure Redis para processamento escalável
2. **[Configuração SSL/HTTPS](./ssl-https)** - Configure HTTPS seguro
3. **[Segurança](../seguranca/autenticacao)** - Configure autenticação avançada
4. **[Backup e Recovery](../seguranca/backup-recovery)** - Implemente estratégias de backup

---

:::tip **Dica Pro**
Para produção, sempre use PostgreSQL com configurações otimizadas. É mais robusto e oferece melhor performance para workloads complexos.
:::

:::warning **Importante**
Configure backups automáticos e teste regularmente a restauração. Dados perdidos podem ser catastróficos para workflows críticos.
:::
