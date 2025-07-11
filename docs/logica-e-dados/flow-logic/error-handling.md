---
title: Tratamento de Erros
description: Guia completo sobre como tratar erros e falhas em workflows n8n, incluindo estratégias, boas práticas e exemplos práticos
sidebar_position: 1
keywords: [n8n, tratamento, erros, falhas, exceções, debugging, robustez]
---

# <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Tratamento de Erros

O **tratamento de erros** é fundamental para criar workflows robustos e confiáveis no n8n. Este guia ensina como identificar, prevenir e tratar diferentes tipos de falhas em suas automações.

## O que são Erros?

**Erros** são situações inesperadas que impedem o funcionamento normal de um workflow. Eles podem ocorrer por diversos motivos:

- **Problemas de conectividade** com APIs externas
- **Dados inválidos** ou malformados
- **Configurações incorretas** de nodes
- **Limites de rate** atingidos
- **Timeouts** de requisições
- **Credenciais expiradas** ou inválidas

### Impacto dos Erros

Erros não tratados podem causar:

- **Interrupção** do workflow
- **Perda de dados** importantes
- **Experiência ruim** do usuário
- **Problemas de compliance** em processos críticos
- **Custos** com reprocessamento

## Tipos de Erros

### 1. Erros de Conectividade

```javascript
// Exemplo: API não disponível
{
  "error": "ECONNREFUSED",
  "message": "Connection refused",
  "code": "ENOTFOUND"
}
```

**Causas comuns:**
- Serviço offline
- Problemas de rede
- Firewall bloqueando
- DNS não resolvido

### 2. Erros de Autenticação

```javascript
// Exemplo: Token expirado
{
  "error": "unauthorized",
  "message": "Invalid or expired token",
  "status": 401
}
```

**Causas comuns:**
- Credenciais expiradas
- Tokens inválidos
- Permissões insuficientes
- Configuração incorreta

### 3. Erros de Dados

```javascript
// Exemplo: Campo obrigatório ausente
{
  "error": "validation_error",
  "message": "Required field 'email' is missing",
  "field": "email"
}
```

**Causas comuns:**
- Campos obrigatórios ausentes
- Formato de dados incorreto
- Validações falhando
- Dados corrompidos

### 4. Erros de Rate Limiting

```javascript
// Exemplo: Muitas requisições
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests",
  "retry_after": 60
}
```

**Causas comuns:**
- Limite de API atingido
- Muitas requisições simultâneas
- Configuração inadequada de delays

### 5. Erros de Timeout

```javascript
// Exemplo: Requisição demorou muito
{
  "error": "timeout",
  "message": "Request timed out after 30 seconds",
  "timeout": 30000
}
```

**Causas comuns:**
- Serviço lento
- Rede instável
- Timeout configurado muito baixo
- Processamento complexo

## Estratégias de Tratamento

### 1. Prevenção de Erros

#### Validação de Dados

```javascript
// Code Node - Validação de entrada
const dados = $json;

// Validar campos obrigatórios
const validacoes = {
  nome: dados.nome && dados.nome.length > 0,
  email: dados.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email),
  idade: dados.idade && dados.idade >= 18
};

// Verificar se todos os campos são válidos
const dadosValidos = Object.values(validacoes).every(v => v);

if (!dadosValidos) {
  throw new Error('Dados inválidos: ' + Object.keys(validacoes).filter(k => !validacoes[k]).join(', '));
}

return { json: dados };
```

#### Verificação de Conectividade

```javascript
// Code Node - Teste de conectividade
const testarConectividade = async (url) => {
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      timeout: 5000 
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

const conectividade = await testarConectividade('https://api.exemplo.com');

if (!conectividade) {
  throw new Error('API não está disponível');
}

return { json: { conectividade: true } };
```

### 2. Tratamento de Erros com Try-Catch

#### Tratamento Básico

```javascript
// Code Node - Tratamento básico
try {
  // Operação que pode falhar
  const resultado = await processarDados($json);
  return { json: resultado };
} catch (error) {
  // Log do erro
  console.error('Erro ao processar dados:', error.message);
  
  // Retornar dados de erro estruturados
  return {
    json: {
      sucesso: false,
      erro: error.message,
      timestamp: new Date().toISOString(),
      dados_originais: $json
    }
  };
}
```

#### Tratamento Específico por Tipo

```javascript
// Code Node - Tratamento específico
try {
  const resultado = await fazerRequisicao($json);
  return { json: resultado };
} catch (error) {
  // Tratar diferentes tipos de erro
  if (error.code === 'ECONNREFUSED') {
    return {
      json: {
        erro: 'Serviço indisponível',
        acao: 'Tentar novamente em 5 minutos',
        tipo: 'CONECTIVIDADE'
      }
    };
  } else if (error.status === 401) {
    return {
      json: {
        erro: 'Credenciais inválidas',
        acao: 'Renovar token de acesso',
        tipo: 'AUTENTICACAO'
      }
    };
  } else if (error.status === 429) {
    return {
      json: {
        erro: 'Rate limit atingido',
        acao: 'Aguardar antes de tentar novamente',
        tipo: 'RATE_LIMIT'
      }
    };
  } else {
    return {
      json: {
        erro: 'Erro desconhecido',
        acao: 'Contatar suporte',
        tipo: 'DESCONHECIDO',
        detalhes: error.message
      }
    };
  }
}
```

### 3. Retry Logic

#### Retry Simples

```javascript
// Code Node - Retry simples
const fazerRequisicaoComRetry = async (dados, maxTentativas = 3) => {
  for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
    try {
      const resultado = await fazerRequisicao(dados);
      return resultado;
    } catch (error) {
      console.log(`Tentativa ${tentativa} falhou:`, error.message);
      
      if (tentativa === maxTentativas) {
        throw error;
      }
      
      // Aguardar antes da próxima tentativa
      await new Promise(resolve => setTimeout(resolve, 1000 * tentativa));
    }
  }
};

try {
  const resultado = await fazerRequisicaoComRetry($json);
  return { json: resultado };
} catch (error) {
  return {
    json: {
      sucesso: false,
      erro: 'Falha após todas as tentativas',
      detalhes: error.message
    }
  };
}
```

#### Retry com Backoff Exponencial

```javascript
// Code Node - Retry com backoff exponencial
const fazerRequisicaoComBackoff = async (dados, maxTentativas = 5) => {
  for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
    try {
      const resultado = await fazerRequisicao(dados);
      return resultado;
    } catch (error) {
      console.log(`Tentativa ${tentativa} falhou:`, error.message);
      
      if (tentativa === maxTentativas) {
        throw error;
      }
      
      // Backoff exponencial: 1s, 2s, 4s, 8s, 16s
      const delay = Math.pow(2, tentativa - 1) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};
```

### 4. Fallback Strategies

#### Caminho Alternativo

```javascript
// Code Node - Fallback strategy
const processarComFallback = async (dados) => {
  try {
    // Tentar método principal
    return await processarMetodoPrincipal(dados);
  } catch (error) {
    console.log('Método principal falhou, tentando fallback:', error.message);
    
    try {
      // Tentar método alternativo
      return await processarMetodoAlternativo(dados);
    } catch (fallbackError) {
      // Ambos falharam
      throw new Error(`Método principal e fallback falharam: ${error.message}, ${fallbackError.message}`);
    }
  }
};
```

#### Dados de Cache

```javascript
// Code Node - Cache como fallback
const processarComCache = async (dados) => {
  try {
    // Tentar obter dados frescos
    const dadosFrescos = await obterDadosFrescos(dados);
    
    // Salvar no cache
    await salvarCache(dados.chave, dadosFrescos);
    
    return dadosFrescos;
  } catch (error) {
    console.log('Erro ao obter dados frescos, usando cache:', error.message);
    
    try {
      // Tentar usar cache
      const dadosCache = await obterCache(dados.chave);
      
      if (dadosCache) {
        return {
          ...dadosCache,
          origem: 'cache',
          timestamp_cache: new Date().toISOString()
        };
      } else {
        throw new Error('Cache não disponível');
      }
    } catch (cacheError) {
      throw new Error(`Dados frescos e cache falharam: ${error.message}, ${cacheError.message}`);
    }
  }
};
```

## Workflows de Tratamento de Erros

### 1. Workflow com Error Handling

```
Manual Trigger → Validação → HTTP Request → Processamento → Sucesso
                    ↓
                Validação Falhou → Error Handler → Notificação
                    ↓
            HTTP Request Falhou → Retry Logic → Fallback → Notificação
```

### 2. Configuração do Error Handler

```javascript
// Error Handler Node
const erro = $json;

// Classificar tipo de erro
const tipoErro = (() => {
  if (erro.code === 'ECONNREFUSED') return 'CONECTIVIDADE';
  if (erro.status === 401) return 'AUTENTICACAO';
  if (erro.status === 429) return 'RATE_LIMIT';
  if (erro.message.includes('timeout')) return 'TIMEOUT';
  return 'DESCONHECIDO';
})();

// Preparar notificação
const notificacao = {
  tipo: tipoErro,
  mensagem: erro.message,
  timestamp: new Date().toISOString(),
  workflow: 'Nome do Workflow',
  dados_originais: erro.dados_originais || {},
  acao_necessaria: (() => {
    switch (tipoErro) {
      case 'CONECTIVIDADE': return 'Verificar conectividade de rede';
      case 'AUTENTICACAO': return 'Renovar credenciais';
      case 'RATE_LIMIT': return 'Aguardar antes de tentar novamente';
      case 'TIMEOUT': return 'Aumentar timeout ou otimizar requisição';
      default: return 'Contatar suporte técnico';
    }
  })()
};

return { json: notificacao };
```

### 3. Workflow de Monitoramento

```
Schedule Trigger → Health Check → If (Status OK) → Log Sucesso
                        ↓
                    Status Error → Error Handler → Alert → Dashboard
```

## Configuração de Nodes

### 1. HTTP Request com Error Handling

```javascript
// Configuração do HTTP Request
{
  "method": "POST",
  "url": "https://api.exemplo.com/dados",
  "timeout": 30000,
  "retry": {
    "enabled": true,
    "maxTries": 3,
    "waitBetweenTries": 5000
  },
  "continueOnFail": true,
  "options": {
    "allowUnauthorizedCerts": false,
    "response": {
      "response": {
        "fullResponse": true
      }
    }
  }
}
```

### 2. Code Node com Error Handling

```javascript
// Code Node - Configuração
const processarDados = async (dados) => {
  // Validação de entrada
  if (!dados || !dados.campo_obrigatorio) {
    throw new Error('Campo obrigatório ausente');
  }
  
  // Processamento
  const resultado = await processar(dados);
  
  // Validação de saída
  if (!resultado || !resultado.id) {
    throw new Error('Resultado inválido');
  }
  
  return resultado;
};

try {
  const resultado = await processarDados($json);
  return { json: resultado };
} catch (error) {
  // Log estruturado
  console.error('Erro no processamento:', {
    erro: error.message,
    dados: $json,
    timestamp: new Date().toISOString()
  });
  
  // Retornar erro estruturado
  return {
    json: {
      sucesso: false,
      erro: error.message,
      tipo: 'PROCESSAMENTO',
      dados_entrada: $json
    }
  };
}
```

## Monitoramento e Alertas

### 1. Logs Estruturados

```javascript
// Code Node - Log estruturado
const logEstruturado = {
  nivel: 'ERROR',
  mensagem: error.message,
  tipo: tipoErro,
  workflow: 'Nome do Workflow',
  node: 'Nome do Node',
  timestamp: new Date().toISOString(),
  dados: {
    entrada: $json,
    contexto: contextoAdicional
  },
  stack: error.stack
};

console.error(JSON.stringify(logEstruturado));
```

### 2. Alertas Automáticos

```javascript
// Code Node - Sistema de alertas
const enviarAlerta = async (erro) => {
  const alerta = {
    titulo: 'Erro no Workflow n8n',
    mensagem: erro.message,
    severidade: 'ALTA',
    workflow: 'Nome do Workflow',
    timestamp: new Date().toISOString(),
    acao: 'Verificar logs e corrigir problema'
  };
  
  // Enviar para Slack
  await enviarParaSlack(alerta);
  
  // Enviar email
  await enviarEmail(alerta);
  
  // Salvar no banco
  await salvarAlerta(alerta);
};

await enviarAlerta(error);
```

### 3. Dashboard de Monitoramento

```javascript
// Code Node - Métricas de erro
const calcularMetricas = (erros) => {
  return {
    total_erros: erros.length,
    erros_por_tipo: erros.reduce((acc, erro) => {
      acc[erro.tipo] = (acc[erro.tipo] || 0) + 1;
      return acc;
    }, {}),
    erros_por_hora: erros.filter(erro => 
      new Date(erro.timestamp) > new Date(Date.now() - 3600000)
    ).length,
    taxa_erro: (erros.length / total_execucoes) * 100
  };
};
```

## Boas Práticas

### 1. Estratégia de Tratamento

- **Sempre valide** dados de entrada
- **Use try-catch** em operações críticas
- **Implemente retry logic** para falhas temporárias
- **Configure timeouts** adequados
- **Monitore** erros em produção

### 2. Logging

- **Use logs estruturados** para facilitar análise
- **Inclua contexto** suficiente para debug
- **Configure níveis** de log apropriados
- **Centralize** logs para análise
- **Retenha** logs por período adequado

### 3. Notificações

- **Configure alertas** para erros críticos
- **Use canais apropriados** (Slack, email, SMS)
- **Inclua contexto** útil nas notificações
- **Evite spam** de alertas
- **Configure escalação** de alertas

### 4. Recuperação

- **Implemente fallbacks** para operações críticas
- **Use circuit breakers** para serviços instáveis
- **Configure graceful degradation**
- **Teste** cenários de falha
- **Documente** procedimentos de recuperação

## Troubleshooting

### Problemas Comuns

#### Workflow para de funcionar
- Verifique logs de erro
- Confirme conectividade
- Valide credenciais
- Teste com dados simples

#### Erros recorrentes
- Implemente retry logic
- Configure timeouts adequados
- Monitore rate limits
- Use circuit breakers

#### Performance degradada
- Otimize requisições
- Implemente cache
- Configure timeouts
- Monitore recursos

### Debug

1. **Use Debug Helper** para inspecionar dados
2. **Configure logging** detalhado
3. **Teste cenários** de erro
4. **Monitore métricas** de performance
5. **Use ferramentas** de monitoramento

## Próximos Passos

- [Debugging](/logica-e-dados/flow-logic/debugging.md) - Técnicas de debugging
- [Expressões n8n](/logica-e-dados/expressoes.md) - Usar expressões para validação
- [HTTP Request](/integracoes/builtin-nodes/http-requests/http-request.md) - Configurar requisições robustas
- [Code Node](/integracoes/builtin-nodes/core-nodes/code.md) - JavaScript avançado para tratamento de erros
- [Monitoring](/usando-n8n/monitoring/index.md) - Monitorar workflows em produção 