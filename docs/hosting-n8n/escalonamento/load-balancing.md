---
sidebar_position: 1
title: Load Balancing
description: Como implementar balanceamento de carga para n8n em produção
keywords: [n8n, load balancing, balanceamento, carga, nginx, produção]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="trending-up-outline" size={32} color="#ea4b71" /> Load Balancing

Este documento explica como **implementar balanceamento de carga** para n8n em ambiente de produção, abordando configuração de nginx como proxy reverso, distribuição de requisições entre múltiplas instâncias, health checks automáticos, failover inteligente, e estratégias de alta disponibilidade que garantem performance consistente e tolerância a falhas em implementações empresariais de grande escala.

## <IonicIcon name="school-outline" size={24} color="#ea4b71" /> O que você vai aprender

- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> Configuração de nginx como load balancer
- <IonicIcon name="server-outline" size={16} color="#6b7280" /> Estratégias de distribuição de carga
- <IonicIcon name="refresh-outline" size={16} color="#6b7280" /> Health checks e failover
- <IonicIcon name="analytics-outline" size={16} color="#6b7280" /> Monitoramento de performance
- <IonicIcon name="shield-checkmark-outline" size={16} color="#6b7280" /> Configurações de segurança

---

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> Por que usar Load Balancing?

### <IonicIcon name="flash-outline" size={20} color="#10b981" /> Benefícios do Load Balancing

**Sem Load Balancing (Instância Única):**
- ❌ **Ponto único de falha** - Se o servidor cair, tudo para
- ❌ **Limitação de performance** - Apenas um servidor processando
- ❌ **Sem escalabilidade** - Não pode adicionar servidores
- ❌ **Downtime durante manutenção** - Atualizações param o serviço

**Com Load Balancing (Múltiplas Instâncias):**
- ✅ **Alta disponibilidade** - Falhas não afetam o serviço
- ✅ **Performance melhorada** - Múltiplos servidores processando
- ✅ **Escalabilidade horizontal** - Adicione servidores conforme necessário
- ✅ **Zero downtime** - Manutenção sem interrupção
- ✅ **Distribuição inteligente** - Carga distribuída automaticamente

### <IonicIcon name="server-outline" size={20} color="#10b981" /> Quando Usar Load Balancing

**Use load balancing quando:**
- Tem **muitos usuários simultâneos**
- Precisa de **alta disponibilidade**
- Quer **escalabilidade automática**
- Processa **workflows críticos**
- Precisa de **manutenção sem downtime**

---

## <IonicIcon name="construct-outline" size={24} color="#ea4b71" /> Estratégias de Distribuição

### <IonicIcon name="trending-up-outline" size={20} color="#10b981" /> Algoritmos de Balanceamento

#### **Round Robin (Padrão)**
```nginx
upstream n8n_backend {
    server n8n-1:5678;
    server n8n-2:5678;
    server n8n-3:5678;
}
```

#### **Least Connections**
```nginx
upstream n8n_backend {
    least_conn;
    server n8n-1:5678;
    server n8n-2:5678;
    server n8n-3:5678;
}
```

#### **IP Hash (Sticky Sessions)**
```nginx
upstream n8n_backend {
    ip_hash;
    server n8n-1:5678;
    server n8n-2:5678;
    server n8n-3:5678;
}
```

#### **Weighted Round Robin**
```nginx
upstream n8n_backend {
    server n8n-1:5678 weight=3;
    server n8n-2:5678 weight=2;
    server n8n-3:5678 weight=1;
}
```

### <IonicIcon name="server-outline" size={20} color="#10b981" /> Configuração por Tipo de Tráfego

#### **Distribuição Inteligente**
```nginx
# Upstream para diferentes tipos de tráfego
upstream n8n_api {
    least_conn;
    server n8n-1:5678 max_fails=3 fail_timeout=30s;
    server n8n-2:5678 max_fails=3 fail_timeout=30s;
    server n8n-3:5678 max_fails=3 fail_timeout=30s;
}

upstream n8n_webhooks {
    ip_hash;  # Sticky sessions para webhooks
    server n8n-1:5678 max_fails=3 fail_timeout=30s;
    server n8n-2:5678 max_fails=3 fail_timeout=30s;
    server n8n-3:5678 max_fails=3 fail_timeout=30s;
}

upstream n8n_ui {
    round_robin;
    server n8n-1:5678 max_fails=3 fail_timeout=30s;
    server n8n-2:5678 max_fails=3 fail_timeout=30s;
    server n8n-3:5678 max_fails=3 fail_timeout=30s;
}
```

---

## <IonicIcon name="settings-outline" size={24} color="#ea4b71" /> Configuração Nginx

### <IonicIcon name="construct-outline" size={20} color="#10b981" /> Configuração Básica

#### **nginx.conf Principal**
```nginx
events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    # Configurações básicas
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 100M;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=webhook:10m rate=30r/s;
    limit_req_zone $binary_remote_addr zone=ui:10m rate=5r/s;

    # Upstream para n8n
    upstream n8n_backend {
        least_conn;
        server n8n-1:5678 max_fails=3 fail_timeout=30s;
        server n8n-2:5678 max_fails=3 fail_timeout=30s;
        server n8n-3:5678 max_fails=3 fail_timeout=30s;
        keepalive 32;
    }

    # Incluir configurações do site
    include /etc/nginx/sites-enabled/*;
}
```

#### **Configuração do Site**
```nginx
# /etc/nginx/sites-available/n8n

# Redirecionar HTTP para HTTPS
server {
    listen 80;
    server_name seudominio.com www.seudominio.com;
    return 301 https://$server_name$request_uri;
}

# Configuração HTTPS
server {
    listen 443 ssl http2;
    server_name seudominio.com www.seudominio.com;

    # Certificados SSL
    ssl_certificate /etc/letsencrypt/live/seudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seudominio.com/privkey.pem;

    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # API endpoints com rate limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://n8n_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Health check
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
    }

    # Webhook endpoints com rate limiting
    location /webhook/ {
        limit_req zone=webhook burst=50 nodelay;
        proxy_pass http://n8n_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;

        # Timeouts maiores para webhooks
        proxy_connect_timeout 120s;
        proxy_send_timeout 120s;
        proxy_read_timeout 120s;

        # Health check
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
    }

    # Interface de usuário
    location / {
        limit_req zone=ui burst=10 nodelay;
        proxy_pass http://n8n_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Health check
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
    }
}
```

### <IonicIcon name="server-outline" size={20} color="#10b981" /> Configuração Avançada

#### **Load Balancing com Health Checks**
```nginx
upstream n8n_backend {
    least_conn;
    
    # Servidores com health checks
    server n8n-1:5678 max_fails=3 fail_timeout=30s;
    server n8n-2:5678 max_fails=3 fail_timeout=30s;
    server n8n-3:5678 max_fails=3 fail_timeout=30s;
    
    # Configurações de keepalive
    keepalive 32;
    keepalive_requests 100;
    keepalive_timeout 60s;
}

# Health check endpoint
location /healthz {
    access_log off;
    return 200 "healthy\n";
    add_header Content-Type text/plain;
}
```

#### **Configuração com Sticky Sessions**
```nginx
# Para webhooks que precisam de sessão consistente
upstream n8n_webhooks {
    ip_hash;
    server n8n-1:5678 max_fails=3 fail_timeout=30s;
    server n8n-2:5678 max_fails=3 fail_timeout=30s;
    server n8n-3:5678 max_fails=3 fail_timeout=30s;
}

# Para API e UI que podem ser distribuídas
upstream n8n_api {
    least_conn;
    server n8n-1:5678 max_fails=3 fail_timeout=30s;
    server n8n-2:5678 max_fails=3 fail_timeout=30s;
    server n8n-3:5678 max_fails=3 fail_timeout=30s;
}
```

---

## <IonicIcon name="server-outline" size={24} color="#ea4b71" /> HAProxy (Alternativa)

### <IonicIcon name="construct-outline" size={20} color="#10b981" /> Configuração HAProxy

#### **haproxy.cfg**
```bash
global
    log /dev/log local0
    log /dev/log local1 notice
    chroot /var/lib/haproxy
    stats socket /run/haproxy/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user haproxy
    group haproxy
    daemon
    maxconn 4096

defaults
    log     global
    mode    http
    option  httplog
    option  dontlognull
    timeout connect 5000
    timeout client  50000
    timeout server  50000
    option  redispatch
    retries 3

# Frontend para HTTP
frontend n8n_http
    bind *:80
    redirect scheme https if !{ ssl_fc }

# Frontend para HTTPS
frontend n8n_https
    bind *:443 ssl crt /etc/ssl/certs/n8n.pem
    mode http
    
    # ACLs para diferentes tipos de tráfego
    acl is_api path_beg /api/
    acl is_webhook path_beg /webhook/
    acl is_health path /healthz
    
    # Rate limiting
    stick-table type ip size 100k expire 30s store http_req_rate(10s)
    http-request track-sc0 src
    http-request deny deny_status 429 if { sc_http_req_rate(0) gt 10 }
    
    # Roteamento baseado em ACLs
    use_backend n8n_webhooks if is_webhook
    use_backend n8n_api if is_api
    use_backend n8n_ui if !is_api !is_webhook !is_health
    use_backend n8n_health if is_health

# Backend para webhooks (sticky sessions)
backend n8n_webhooks
    balance roundrobin
    option httpchk GET /healthz
    http-check expect status 200
    
    # Servidores
    server n8n-1 n8n-1:5678 check maxconn 100 cookie n8n-1
    server n8n-2 n8n-2:5678 check maxconn 100 cookie n8n-2
    server n8n-3 n8n-3:5678 check maxconn 100 cookie n8n-3
    
    # Configurações de failover
    option redispatch
    retries 3
    timeout connect 5s
    timeout server 30s

# Backend para API (least connections)
backend n8n_api
    balance leastconn
    option httpchk GET /healthz
    http-check expect status 200
    
    # Servidores
    server n8n-1 n8n-1:5678 check maxconn 100
    server n8n-2 n8n-2:5678 check maxconn 100
    server n8n-3 n8n-3:5678 check maxconn 100
    
    # Configurações de failover
    option redispatch
    retries 3
    timeout connect 5s
    timeout server 30s

# Backend para UI (round robin)
backend n8n_ui
    balance roundrobin
    option httpchk GET /healthz
    http-check expect status 200
    
    # Servidores
    server n8n-1 n8n-1:5678 check maxconn 100
    server n8n-2 n8n-2:5678 check maxconn 100
    server n8n-3 n8n-3:5678 check maxconn 100
    
    # Configurações de failover
    option redispatch
    retries 3
    timeout connect 5s
    timeout server 30s

# Backend para health check
backend n8n_health
    mode http
    http-request return status 200 content-type text/plain string "healthy\n"
```

---

## <IonicIcon name="refresh-outline" size={24} color="#ea4b71" /> Health Checks e Failover

### <IonicIcon name="construct-outline" size={20} color="#10b981" /> Configuração de Health Checks

#### **Endpoint de Health Check**
```bash
# Configurar endpoint de health check no n8n
N8N_HEALTH_CHECK_ENDPOINT=/healthz
N8N_HEALTH_CHECK_TIMEOUT=5000
N8N_HEALTH_CHECK_INTERVAL=30000
```

#### **Script de Health Check Avançado**
```bash
#!/bin/bash
# advanced-health-check.sh

N8N_HOST="localhost"
N8N_PORT="5678"
HEALTH_ENDPOINT="/healthz"

# Verificar se n8n está respondendo
if curl -f -s --max-time 5 "http://$N8N_HOST:$N8N_PORT$HEALTH_ENDPOINT" > /dev/null; then
    echo "OK: n8n está saudável"
    exit 0
else
    echo "ERROR: n8n não está respondendo"
    exit 1
fi
```

### <IonicIcon name="notifications-outline" size={20} color="#10b981" /> Monitoramento de Failover

#### **Script de Monitoramento**
```bash
#!/bin/bash
# monitor-load-balancer.sh

# Configurações
BACKEND_SERVERS=("n8n-1" "n8n-2" "n8n-3")
WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

echo "=== Monitoramento do Load Balancer ==="
echo

# Verificar cada servidor backend
for server in "${BACKEND_SERVERS[@]}"; do
    if curl -f -s --max-time 5 "http://$server:5678/healthz" > /dev/null; then
        echo "✅ $server: Saudável"
    else
        echo "❌ $server: Não respondendo"
        
        # Enviar notificação
        curl -X POST $WEBHOOK_URL \
          -H "Content-type: application/json" \
          -d "{\"text\":\"🚨 Servidor $server não está respondendo!\"}"
        
        # Tentar reiniciar o container
        docker restart $server
    fi
done

echo

# Verificar distribuição de carga
echo "=== Distribuição de Carga ==="
for server in "${BACKEND_SERVERS[@]}"; do
    CONNECTIONS=$(docker exec $server netstat -an | grep :5678 | grep ESTABLISHED | wc -l)
    echo "$server: $CONNECTIONS conexões ativas"
done
```

---

## <IonicIcon name="analytics-outline" size={24} color="#ea4b71" /> Monitoramento de Performance

### <IonicIcon name="speedometer-outline" size={20} color="#10b981" /> Métricas Essenciais

#### **Script de Métricas**
```bash
#!/bin/bash
# load-balancer-metrics.sh

echo "=== Métricas do Load Balancer ==="
echo

# Status do nginx
echo "1. Status do Nginx:"
systemctl status nginx --no-pager -l
echo

# Configuração do nginx
echo "2. Configuração do Nginx:"
nginx -t
echo

# Logs de erro recentes
echo "3. Logs de Erro (últimas 10 linhas):"
tail -10 /var/log/nginx/error.log
echo

# Estatísticas de conexões
echo "4. Estatísticas de Conexões:"
netstat -an | grep :80 | grep ESTABLISHED | wc -l
netstat -an | grep :443 | grep ESTABLISHED | wc -l
echo

# Distribuição de carga
echo "5. Distribuição de Carga:"
for server in n8n-1 n8n-2 n8n-3; do
    CONNECTIONS=$(docker exec $server netstat -an | grep :5678 | grep ESTABLISHED | wc -l)
    echo "$server: $CONNECTIONS conexões"
done
echo

# Performance do nginx
echo "6. Performance do Nginx:"
curl -s http://localhost/nginx_status
```

### <IonicIcon name="notifications-outline" size={20} color="#10b981" /> Alertas Automáticos

#### **Configuração de Alertas**
```bash
#!/bin/bash
# load-balancer-alerts.sh

# Configurações
WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
ALERT_THRESHOLD_CONNECTIONS=1000
ALERT_THRESHOLD_ERROR_RATE=5

# Verificar número de conexões
TOTAL_CONNECTIONS=$(netstat -an | grep :443 | grep ESTABLISHED | wc -l)
if [ $TOTAL_CONNECTIONS -gt $ALERT_THRESHOLD_CONNECTIONS ]; then
    curl -X POST $WEBHOOK_URL \
      -H "Content-type: application/json" \
      -d "{\"text\":\"⚠️ Muitas conexões: $TOTAL_CONNECTIONS\"}"
fi

# Verificar taxa de erro
ERROR_RATE=$(tail -100 /var/log/nginx/access.log | grep -E " 5[0-9][0-9] " | wc -l)
if [ $ERROR_RATE -gt $ALERT_THRESHOLD_ERROR_RATE ]; then
    curl -X POST $WEBHOOK_URL \
      -H "Content-type: application/json" \
      -d "{\"text\":\"⚠️ Taxa de erro alta: $ERROR_RATE erros\"}"
fi
```

---

## <IonicIcon name="shield-checkmark-outline" size={24} color="#ea4b71" /> Configurações de Segurança

### <IonicIcon name="construct-outline" size={20} color="#10b981" /> Rate Limiting

#### **Configuração Avançada de Rate Limiting**
```nginx
# Rate limiting por tipo de endpoint
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=webhook:10m rate=30r/s;
limit_req_zone $binary_remote_addr zone=ui:10m rate=5r/s;
limit_req_zone $binary_remote_addr zone=admin:10m rate=2r/s;

# Aplicar rate limiting
location /api/ {
    limit_req zone=api burst=20 nodelay;
    # ... resto da configuração
}

location /webhook/ {
    limit_req zone=webhook burst=50 nodelay;
    # ... resto da configuração
}

location /admin/ {
    limit_req zone=admin burst=5 nodelay;
    # ... resto da configuração
}
```

### <IonicIcon name="server-outline" size={20} color="#10b981" /> Headers de Segurança

#### **Security Headers Avançados**
```nginx
# Headers de segurança
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https: wss:;" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

---

## <IonicIcon name="construct-outline" size={24} color="#ea4b71" /> Troubleshooting

### <IonicIcon name="warning-outline" size={20} color="#10b981" /> Problemas Comuns

#### **Load balancer não distribui carga**
```bash
# Verificar configuração nginx
nginx -t

# Verificar se os servidores estão respondendo
for server in n8n-1 n8n-2 n8n-3; do
    echo "=== $server ==="
    curl -I http://$server:5678/healthz
done

# Verificar logs nginx
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

#### **Rate limiting muito restritivo**
```bash
# Verificar logs de rate limiting
grep "limiting requests" /var/log/nginx/error.log

# Ajustar configurações
# Editar /etc/nginx/nginx.conf e aumentar os limites
```

#### **SSL/TLS não funciona**
```bash
# Verificar certificados
openssl x509 -in /etc/letsencrypt/live/seudominio.com/fullchain.pem -text -noout

# Verificar configuração SSL
nginx -t

# Testar conexão SSL
openssl s_client -connect seudominio.com:443 -servername seudominio.com
```

---

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> Checklist de Produção

### <IonicIcon name="server-outline" size={20} color="#10b981" /> Configuração

- [ ] Load balancer configurado
- [ ] Múltiplos backends configurados
- [ ] Health checks implementados
- [ ] Failover automático testado
- [ ] SSL/TLS configurado

### <IonicIcon name="rocket-outline" size={20} color="#10b981" /> Performance

- [ ] Rate limiting aplicado
- [ ] Gzip compression ativado
- [ ] Keepalive configurado
- [ ] Timeouts adequados
- [ ] Monitoramento ativo

### <IonicIcon name="analytics-outline" size={20} color="#10b981" /> Monitoramento

- [ ] Métricas sendo coletadas
- [ ] Logs centralizados
- [ ] Alertas configurados
- [ ] Dashboard de monitoramento
- [ ] Backup de configurações

### <IonicIcon name="shield-checkmark-outline" size={20} color="#10b981" /> Segurança

- [ ] Security headers configurados
- [ ] Rate limiting aplicado
- [ ] Acesso restrito por IP (se necessário)
- [ ] Logs de auditoria ativos
- [ ] Certificados SSL válidos

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> Próximos Passos

Agora que você configurou o load balancing:

1. **[Clustering](./clustering)** - Configure clustering para alta disponibilidade
2. **[Performance](./performance)** - Otimize performance do sistema
3. **[Segurança](../seguranca/autenticacao)** - Configure autenticação avançada
4. **[Backup e Recovery](../seguranca/backup-recovery)** - Implemente estratégias de backup

---

:::tip **Dica Pro**
Configure pelo menos 3 backends para alta disponibilidade real. Monitore a distribuição de carga e ajuste os algoritmos conforme necessário.
:::

:::warning **Importante**
Sempre teste o failover em ambiente de desenvolvimento antes de aplicar em produção. Falhas de load balancing podem causar interrupção total do serviço.
:::
