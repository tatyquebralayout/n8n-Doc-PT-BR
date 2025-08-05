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

```javascript\n// Listar execuções de um workflow\nconst execucoes = await fetch('/api/v1/workflows/123/executions', {\n  method: 'GET',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY'\n  }\n});\n\n// Obter detalhes de uma execução específica\nconst execucao = await fetch('/api/v1/executions/456', {\n  method: 'GET',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY'\n  }\n});\n```\n\n## Estrutura do Histórico\n\n### Informações Básicas\n\nCada entrada no histórico contém:\n\n```json\n{\n  "id": "exec_123456789",\n  "workflowId": "workflow_123",\n  "status": "success",\n  "startedAt": "2024-01-15T10:30:00Z",\n  "finishedAt": "2024-01-15T10:30:45Z",\n  "duration": 45000,\n  "triggeredBy": "manual",\n  "executionData": {\n    "resultData": [...],\n    "runData": {...}\n  }\n}\n```\n\n### Estados de Execução\n\n- **Success**: Execução concluída com sucesso\n- **Error**: Execução falhou com erro\n- **Running**: Execução em andamento\n- **Waiting**: Execução aguardando recursos\n- **Canceled**: Execução cancelada manualmente\n\n## Análise de Execuções\n\n### Visualização de Dados\n\nAnalise os dados de entrada e saída de cada node:\n\n```javascript\n// Extrair dados de uma execução\nconst analisarExecucao = (execucao) => {\n  const { resultData, runData } = execucao.executionData;\n  \n  // Dados de entrada do primeiro node\n  const inputData = resultData[0].data;\n  \n  // Dados de saída do último node\n  const outputData = resultData[resultData.length - 1].data;\n  \n  // Métricas de performance\n  const metricas = {\n    totalNodes: resultData.length,\n    tempoTotal: execucao.duration,\n    tempoMedioPorNode: execucao.duration / resultData.length\n  };\n  \n  return { inputData, outputData, metricas };\n};\n```\n\n### Identificação de Problemas\n\nDetecte padrões de erro e performance:\n\n```javascript\n// Analisar padrões de erro\nconst analisarErros = (execucoes) => {\n  const erros = execucoes.filter(e => e.status === 'error');\n  \n  const padroes = erros.reduce((acc, execucao) => {\n    const erro = execucao.executionData.error;\n    const tipo = erro.type || 'unknown';\n    \n    if (!acc[tipo]) {\n      acc[tipo] = { count: 0, exemplos: [] };\n    }\n    \n    acc[tipo].count++;\n    acc[tipo].exemplos.push({\n      id: execucao.id,\n      message: erro.message,\n      timestamp: execucao.startedAt\n    });\n    \n    return acc;\n  }, {});\n  \n  return padroes;\n};\n```\n\n## Auditoria e Compliance\n\n### Rastreamento de Mudanças\n\nMonitore alterações em workflows:\n\n```javascript\n// Rastrear mudanças de workflow\nconst rastrearMudancas = async (workflowId, periodo) => {\n  const execucoes = await buscarExecucoes(workflowId, periodo);\n  \n  const mudancas = execucoes.map(execucao => ({\n    id: execucao.id,\n    timestamp: execucao.startedAt,\n    versao: execucao.workflowVersion,\n    usuario: execucao.triggeredBy,\n    alteracoes: execucao.changes || []\n  }));\n  \n  return mudancas;\n};\n```\n\n### Logs de Auditoria\n\nConfigure logs detalhados para compliance:\n\n```javascript\n// Configurar logs de auditoria\nconst configurarAuditoria = () => {\n  return {\n    // Log de todas as execuções\n    logExecucoes: true,\n    \n    // Log de dados sensíveis\n    logDadosSensiveis: false,\n    \n    // Retenção de logs\n    retencaoLogs: '90d',\n    \n    // Campos a mascarar\n    camposMascarados: ['password', 'token', 'api_key'],\n    \n    // Notificações de eventos críticos\n    notificacoes: {\n      erros: true,\n      execucoesLongas: true,\n      acessosNaoAutorizados: true\n    }\n  };\n};\n```\n\n## Performance e Otimização\n\n### Análise de Performance\n\nIdentifique gargalos e otimize workflows:\n\n```javascript\n// Analisar performance de nodes\nconst analisarPerformance = (execucao) => {\n  const { runData } = execucao.executionData;\n  const metricas = [];\n  \n  Object.entries(runData).forEach(([nodeId, data]) => {\n    const inicio = new Date(data.startTime);\n    const fim = new Date(data.endTime);\n    const duracao = fim - inicio;\n    \n    metricas.push({\n      nodeId,\n      nodeName: data.nodeName,\n      duracao,\n      status: data.status,\n      tentativas: data.attempts || 1\n    });\n  });\n  \n  // Ordenar por duração (mais lento primeiro)\n  return metricas.sort((a, b) => b.duracao - a.duracao);\n};\n```\n\n### Alertas de Performance\n\nConfigure alertas para execuções problemáticas:\n\n```javascript\n// Configurar alertas de performance\nconst configurarAlertas = () => {\n  return {\n    // Tempo máximo de execução\n    tempoMaximo: 300000, // 5 minutos\n    \n    // Número máximo de tentativas\n    tentativasMaximas: 3,\n    \n    // Uso de memória\n    memoriaMaxima: 512, // MB\n    \n    // Notificações\n    notificacoes: {\n      email: 'admin@empresa.com',\n      slack: '#alertas-n8n',\n      webhook: 'https://api.exemplo.com/alertas'\n    }\n  };\n};\n```\n\n## Debugging Avançado\n\n### Replay de Execuções\n\nReproduza execuções para debugging:\n\n```javascript\n// Replay de execução\nconst replayExecucao = async (execucaoId) => {\n  const execucao = await buscarExecucao(execucaoId);\n  \n  // Extrair dados de entrada\n  const dadosEntrada = execucao.executionData.resultData[0].data;\n  \n  // Executar workflow com dados originais\n  const novaExecucao = await executarWorkflow({\n    workflowId: execucao.workflowId,\n    data: dadosEntrada,\n    modo: 'debug'\n  });\n  \n  return novaExecucao;\n};\n```\n\n### Comparação de Execuções\n\nCompare execuções para identificar diferenças:\n\n```javascript\n// Comparar duas execuções\nconst compararExecucoes = (exec1, exec2) => {\n  const diferencas = {\n    tempo: exec2.duration - exec1.duration,\n    status: exec1.status === exec2.status ? 'igual' : 'diferente',\n    dados: {}\n  };\n  \n  // Comparar dados de entrada\n  const dados1 = exec1.executionData.resultData[0].data;\n  const dados2 = exec2.executionData.resultData[0].data;\n  \n  diferencas.dados.entrada = compararObjetos(dados1, dados2);\n  \n  // Comparar dados de saída\n  const saida1 = exec1.executionData.resultData[exec1.executionData.resultData.length - 1].data;\n  const saida2 = exec2.executionData.resultData[exec2.executionData.resultData.length - 1].data;\n  \n  diferencas.dados.saida = compararObjetos(saida1, saida2);\n  \n  return diferencas;\n};\n```\n\n## Relatórios e Dashboards\n\n### Relatórios Automatizados\n\nGere relatórios de execução:\n\n```javascript\n// Gerar relatório mensal\nconst gerarRelatorioMensal = async (mes, ano) => {\n  const execucoes = await buscarExecucoesPorPeriodo(mes, ano);\n  \n  const relatorio = {\n    periodo: `${mes}/${ano}`,\n    totalExecucoes: execucoes.length,\n    execucoesSucesso: execucoes.filter(e => e.status === 'success').length,\n    execucoesErro: execucoes.filter(e => e.status === 'error').length,\n    tempoMedio: calcularTempoMedio(execucoes),\n    workflowsMaisExecutados: analisarWorkflowsPopulares(execucoes),\n    errosMaisComuns: analisarErrosComuns(execucoes)\n  };\n  \n  return relatorio;\n};\n```\n\n### Dashboards de Monitoramento\n\nCrie dashboards em tempo real:\n\n```javascript\n// Configurar dashboard\nconst configurarDashboard = () => {\n  return {\n    metricas: [\n      {\n        nome: 'Execuções por Hora',\n        tipo: 'contador',\n        query: 'SELECT COUNT(*) FROM executions WHERE started_at >= NOW() - INTERVAL 1 HOUR'\n      },\n      {\n        nome: 'Taxa de Sucesso',\n        tipo: 'percentual',\n        query: 'SELECT (COUNT(CASE WHEN status = "success" THEN 1 END) * 100.0 / COUNT(*)) as taxa FROM executions WHERE started_at >= NOW() - INTERVAL 24 HOUR'\n      },\n      {\n        nome: 'Tempo Médio de Execução',\n        tipo: 'tempo',\n        query: 'SELECT AVG(duration) as tempo_medio FROM executions WHERE started_at >= NOW() - INTERVAL 24 HOUR'\n      }\n    ],\n    alertas: [\n      {\n        condicao: 'taxa_sucesso < 95',\n        mensagem: 'Taxa de sucesso abaixo de 95%'\n      },\n      {\n        condicao: 'tempo_medio > 300000',\n        mensagem: 'Tempo médio de execução acima de 5 minutos'\n      }\n    ]\n  };\n};\n```\n\n## Configurações de Retenção\n\n### Política de Retenção\n\nConfigure quanto tempo manter o histórico:\n\n```javascript\n// Configurar política de retenção\nconst configurarRetencao = () => {\n  return {\n    // Retenção por tipo de execução\n    sucesso: '30d',      // 30 dias\n    erro: '90d',         // 90 dias\n    cancelada: '7d',     // 7 dias\n    \n    // Backup antes da exclusão\n    backupAntesExclusao: true,\n    \n    // Arquivamento\n    arquivamento: {\n      ativo: true,\n      destino: 's3://backup-n8n/historico/',\n      formato: 'parquet',\n      compressao: 'gzip'\n    },\n    \n    // Limpeza automática\n    limpezaAutomatica: {\n      ativo: true,\n      frequencia: 'diaria',\n      horario: '02:00'\n    }\n  };\n};\n```\n\n### Exportação de Dados\n\nExporte histórico para análise externa:\n\n```javascript\n// Exportar histórico\nconst exportarHistorico = async (filtros, formato) => {\n  const execucoes = await buscarExecucoesComFiltros(filtros);\n  \n  switch (formato) {\n    case 'csv':\n      return gerarCSV(execucoes);\n    case 'json':\n      return gerarJSON(execucoes);\n    case 'excel':\n      return gerarExcel(execucoes);\n    case 'parquet':\n      return gerarParquet(execucoes);\n    default:\n      throw new Error('Formato não suportado');\n  }\n};\n```\n\n## Integração com Ferramentas Externas\n\n### ELK Stack\n\nEnvie logs para Elasticsearch:\n\n```javascript\n// Configurar integração ELK\nconst configurarELK = () => {\n  return {\n    elasticsearch: {\n      url: 'https://elasticsearch.empresa.com',\n      index: 'n8n-executions',\n      username: 'n8n-user',\n      password: 'senha-segura'\n    },\n    \n    logstash: {\n      pipeline: 'n8n-pipeline',\n      filtros: [\n        'parse_json',\n        'date',\n        'geoip'\n      ]\n    },\n    \n    kibana: {\n      dashboard: 'n8n-monitoring',\n      visualizacoes: [\n        'execucoes-por-hora',\n        'taxa-sucesso',\n        'tempo-medio-execucao'\n      ]\n    }\n  };\n};\n```\n\n### Grafana\n\nConfigure dashboards no Grafana:\n\n```javascript\n// Configurar Grafana\nconst configurarGrafana = () => {\n  return {\n    url: 'https://grafana.empresa.com',\n    datasource: 'n8n-postgres',\n    \n    dashboards: [\n      {\n        nome: 'N8N Overview',\n        paineis: [\n          {\n            titulo: 'Execuções por Status',\n            tipo: 'pie',\n            query: 'SELECT status, COUNT(*) FROM executions GROUP BY status'\n          },\n          {\n            titulo: 'Tempo de Execução',\n            tipo: 'line',\n            query: 'SELECT started_at, duration FROM executions ORDER BY started_at'\n          }\n        ]\n      }\n    ],\n    \n    alertas: [\n      {\n        nome: 'Alta Taxa de Erro',\n        condicao: 'rate(executions{status="error"}[5m]) > 0.1',\n        notificacao: 'slack'\n      }\n    ]\n  };\n};\n```

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
