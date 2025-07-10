# Histórico de Workflows

O histórico de workflows no n8n é uma ferramenta essencial para auditoria, debugging e análise de performance. Esta seção aborda como acessar, interpretar e utilizar o histórico de execuções para melhorar seus workflows.

## Visão Geral

O histórico de workflows mantém um registro completo de todas as execuções, incluindo dados de entrada, saída, erros e métricas de performance. Essas informações são fundamentais para:

- **Auditoria**: Rastrear mudanças e execuções
- **Debugging**: Identificar e corrigir problemas
- **Performance**: Analisar tempo de execução e recursos
- **Compliance**: Manter registros para conformidade regulatória

## Acessando o Histórico

### Interface Web

Navegue até o histórico através da interface:

1. **Workflows** → Selecione um workflow
2. **Executions** → Visualize execuções recentes
3. **History** → Acesse histórico completo

### API de Histórico

Acesse o histórico programaticamente:

```javascript
// Listar execuções de um workflow
const execucoes = await fetch('/api/v1/workflows/123/executions', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

// Obter detalhes de uma execução específica
const execucao = await fetch('/api/v1/executions/456', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
```

## Estrutura do Histórico

### Informações Básicas

Cada entrada no histórico contém:

```json
{
  "id": "exec_123456789",
  "workflowId": "workflow_123",
  "status": "success",
  "startedAt": "2024-01-15T10:30:00Z",
  "finishedAt": "2024-01-15T10:30:45Z",
  "duration": 45000,
  "triggeredBy": "manual",
  "executionData": {
    "resultData": [...],
    "runData": {...}
  }
}
```

### Estados de Execução

- **Success**: Execução concluída com sucesso
- **Error**: Execução falhou com erro
- **Running**: Execução em andamento
- **Waiting**: Execução aguardando recursos
- **Canceled**: Execução cancelada manualmente

## Análise de Execuções

### Visualização de Dados

Analise os dados de entrada e saída de cada node:

```javascript
// Extrair dados de uma execução
const analisarExecucao = (execucao) => {
  const { resultData, runData } = execucao.executionData;
  
  // Dados de entrada do primeiro node
  const inputData = resultData[0].data;
  
  // Dados de saída do último node
  const outputData = resultData[resultData.length - 1].data;
  
  // Métricas de performance
  const metricas = {
    totalNodes: resultData.length,
    tempoTotal: execucao.duration,
    tempoMedioPorNode: execucao.duration / resultData.length
  };
  
  return { inputData, outputData, metricas };
};
```

### Identificação de Problemas

Detecte padrões de erro e performance:

```javascript
// Analisar padrões de erro
const analisarErros = (execucoes) => {
  const erros = execucoes.filter(e => e.status === 'error');
  
  const padroes = erros.reduce((acc, execucao) => {
    const erro = execucao.executionData.error;
    const tipo = erro.type || 'unknown';
    
    if (!acc[tipo]) {
      acc[tipo] = { count: 0, exemplos: [] };
    }
    
    acc[tipo].count++;
    acc[tipo].exemplos.push({
      id: execucao.id,
      message: erro.message,
      timestamp: execucao.startedAt
    });
    
    return acc;
  }, {});
  
  return padroes;
};
```

## Auditoria e Compliance

### Rastreamento de Mudanças

Monitore alterações em workflows:

```javascript
// Rastrear mudanças de workflow
const rastrearMudancas = async (workflowId, periodo) => {
  const execucoes = await buscarExecucoes(workflowId, periodo);
  
  const mudancas = execucoes.map(execucao => ({
    id: execucao.id,
    timestamp: execucao.startedAt,
    versao: execucao.workflowVersion,
    usuario: execucao.triggeredBy,
    alteracoes: execucao.changes || []
  }));
  
  return mudancas;
};
```

### Logs de Auditoria

Configure logs detalhados para compliance:

```javascript
// Configurar logs de auditoria
const configurarAuditoria = () => {
  return {
    // Log de todas as execuções
    logExecucoes: true,
    
    // Log de dados sensíveis
    logDadosSensiveis: false,
    
    // Retenção de logs
    retencaoLogs: '90d',
    
    // Campos a mascarar
    camposMascarados: ['password', 'token', 'api_key'],
    
    // Notificações de eventos críticos
    notificacoes: {
      erros: true,
      execucoesLongas: true,
      acessosNaoAutorizados: true
    }
  };
};
```

## Performance e Otimização

### Análise de Performance

Identifique gargalos e otimize workflows:

```javascript
// Analisar performance de nodes
const analisarPerformance = (execucao) => {
  const { runData } = execucao.executionData;
  const metricas = [];
  
  Object.entries(runData).forEach(([nodeId, data]) => {
    const inicio = new Date(data.startTime);
    const fim = new Date(data.endTime);
    const duracao = fim - inicio;
    
    metricas.push({
      nodeId,
      nodeName: data.nodeName,
      duracao,
      status: data.status,
      tentativas: data.attempts || 1
    });
  });
  
  // Ordenar por duração (mais lento primeiro)
  return metricas.sort((a, b) => b.duracao - a.duracao);
};
```

### Alertas de Performance

Configure alertas para execuções problemáticas:

```javascript
// Configurar alertas de performance
const configurarAlertas = () => {
  return {
    // Tempo máximo de execução
    tempoMaximo: 300000, // 5 minutos
    
    // Número máximo de tentativas
    tentativasMaximas: 3,
    
    // Uso de memória
    memoriaMaxima: 512, // MB
    
    // Notificações
    notificacoes: {
      email: 'admin@empresa.com',
      slack: '#alertas-n8n',
      webhook: 'https://api.exemplo.com/alertas'
    }
  };
};
```

## Debugging Avançado

### Replay de Execuções

Reproduza execuções para debugging:

```javascript
// Replay de execução
const replayExecucao = async (execucaoId) => {
  const execucao = await buscarExecucao(execucaoId);
  
  // Extrair dados de entrada
  const dadosEntrada = execucao.executionData.resultData[0].data;
  
  // Executar workflow com dados originais
  const novaExecucao = await executarWorkflow({
    workflowId: execucao.workflowId,
    data: dadosEntrada,
    modo: 'debug'
  });
  
  return novaExecucao;
};
```

### Comparação de Execuções

Compare execuções para identificar diferenças:

```javascript
// Comparar duas execuções
const compararExecucoes = (exec1, exec2) => {
  const diferencas = {
    tempo: exec2.duration - exec1.duration,
    status: exec1.status === exec2.status ? 'igual' : 'diferente',
    dados: {}
  };
  
  // Comparar dados de entrada
  const dados1 = exec1.executionData.resultData[0].data;
  const dados2 = exec2.executionData.resultData[0].data;
  
  diferencas.dados.entrada = compararObjetos(dados1, dados2);
  
  // Comparar dados de saída
  const saida1 = exec1.executionData.resultData[exec1.executionData.resultData.length - 1].data;
  const saida2 = exec2.executionData.resultData[exec2.executionData.resultData.length - 1].data;
  
  diferencas.dados.saida = compararObjetos(saida1, saida2);
  
  return diferencas;
};
```

## Relatórios e Dashboards

### Relatórios Automatizados

Gere relatórios de execução:

```javascript
// Gerar relatório mensal
const gerarRelatorioMensal = async (mes, ano) => {
  const execucoes = await buscarExecucoesPorPeriodo(mes, ano);
  
  const relatorio = {
    periodo: `${mes}/${ano}`,
    totalExecucoes: execucoes.length,
    execucoesSucesso: execucoes.filter(e => e.status === 'success').length,
    execucoesErro: execucoes.filter(e => e.status === 'error').length,
    tempoMedio: calcularTempoMedio(execucoes),
    workflowsMaisExecutados: analisarWorkflowsPopulares(execucoes),
    errosMaisComuns: analisarErrosComuns(execucoes)
  };
  
  return relatorio;
};
```

### Dashboards de Monitoramento

Crie dashboards em tempo real:

```javascript
// Configurar dashboard
const configurarDashboard = () => {
  return {
    metricas: [
      {
        nome: 'Execuções por Hora',
        tipo: 'contador',
        query: 'SELECT COUNT(*) FROM executions WHERE started_at >= NOW() - INTERVAL 1 HOUR'
      },
      {
        nome: 'Taxa de Sucesso',
        tipo: 'percentual',
        query: 'SELECT (COUNT(CASE WHEN status = "success" THEN 1 END) * 100.0 / COUNT(*)) as taxa FROM executions WHERE started_at >= NOW() - INTERVAL 24 HOUR'
      },
      {
        nome: 'Tempo Médio de Execução',
        tipo: 'tempo',
        query: 'SELECT AVG(duration) as tempo_medio FROM executions WHERE started_at >= NOW() - INTERVAL 24 HOUR'
      }
    ],
    alertas: [
      {
        condicao: 'taxa_sucesso < 95',
        mensagem: 'Taxa de sucesso abaixo de 95%'
      },
      {
        condicao: 'tempo_medio > 300000',
        mensagem: 'Tempo médio de execução acima de 5 minutos'
      }
    ]
  };
};
```

## Configurações de Retenção

### Política de Retenção

Configure quanto tempo manter o histórico:

```javascript
// Configurar política de retenção
const configurarRetencao = () => {
  return {
    // Retenção por tipo de execução
    sucesso: '30d',      // 30 dias
    erro: '90d',         // 90 dias
    cancelada: '7d',     // 7 dias
    
    // Backup antes da exclusão
    backupAntesExclusao: true,
    
    // Arquivamento
    arquivamento: {
      ativo: true,
      destino: 's3://backup-n8n/historico/',
      formato: 'parquet',
      compressao: 'gzip'
    },
    
    // Limpeza automática
    limpezaAutomatica: {
      ativo: true,
      frequencia: 'diaria',
      horario: '02:00'
    }
  };
};
```

### Exportação de Dados

Exporte histórico para análise externa:

```javascript
// Exportar histórico
const exportarHistorico = async (filtros, formato) => {
  const execucoes = await buscarExecucoesComFiltros(filtros);
  
  switch (formato) {
    case 'csv':
      return gerarCSV(execucoes);
    case 'json':
      return gerarJSON(execucoes);
    case 'excel':
      return gerarExcel(execucoes);
    case 'parquet':
      return gerarParquet(execucoes);
    default:
      throw new Error('Formato não suportado');
  }
};
```

## Integração com Ferramentas Externas

### ELK Stack

Envie logs para Elasticsearch:

```javascript
// Configurar integração ELK
const configurarELK = () => {
  return {
    elasticsearch: {
      url: 'https://elasticsearch.empresa.com',
      index: 'n8n-executions',
      username: 'n8n-user',
      password: 'senha-segura'
    },
    
    logstash: {
      pipeline: 'n8n-pipeline',
      filtros: [
        'parse_json',
        'date',
        'geoip'
      ]
    },
    
    kibana: {
      dashboard: 'n8n-monitoring',
      visualizacoes: [
        'execucoes-por-hora',
        'taxa-sucesso',
        'tempo-medio-execucao'
      ]
    }
  };
};
```

### Grafana

Configure dashboards no Grafana:

```javascript
// Configurar Grafana
const configurarGrafana = () => {
  return {
    url: 'https://grafana.empresa.com',
    datasource: 'n8n-postgres',
    
    dashboards: [
      {
        nome: 'N8N Overview',
        paineis: [
          {
            titulo: 'Execuções por Status',
            tipo: 'pie',
            query: 'SELECT status, COUNT(*) FROM executions GROUP BY status'
          },
          {
            titulo: 'Tempo de Execução',
            tipo: 'line',
            query: 'SELECT started_at, duration FROM executions ORDER BY started_at'
          }
        ]
      }
    ],
    
    alertas: [
      {
        nome: 'Alta Taxa de Erro',
        condicao: 'rate(executions{status="error"}[5m]) > 0.1',
        notificacao: 'slack'
      }
    ]
  };
};
```

## Boas Práticas

### Organização do Histórico

- **Configure retenção adequada** baseada em necessidades de compliance
- **Implemente backup automático** do histórico
- **Use tags e labels** para organizar execuções
- **Monitore uso de espaço** em disco
- **Configure alertas proativos** para problemas

### Análise Eficiente

- **Use filtros** para reduzir volume de dados
- **Implemente cache** para consultas frequentes
- **Agende relatórios** automáticos
- **Configure dashboards** em tempo real
- **Documente padrões** de erro comuns

### Segurança

- **Mascare dados sensíveis** nos logs
- **Implemente controle de acesso** ao histórico
- **Use criptografia** para dados em repouso
- **Monitore acessos** ao histórico
- **Configure auditoria** de consultas

## Recursos Adicionais

### Documentação Oficial
- [Executions API](https://docs.n8n.io/api/executions/)
- [Workflow History](https://docs.n8n.io/workflows/history/)

### Ferramentas Relacionadas
- **ELK Stack**: Análise de logs
- **Grafana**: Dashboards e alertas
- **Prometheus**: Métricas de sistema
- **Jaeger**: Distributed tracing

---

**Próximo**: [Configurações de Workflow](./configuracoes) - Configure parâmetros e opções avançadas 