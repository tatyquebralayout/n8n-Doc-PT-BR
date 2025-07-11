---
title: Debugging
description: Guia completo sobre técnicas de debugging no n8n, incluindo ferramentas, estratégias e boas práticas para resolver problemas
sidebar_position: 2
keywords: [n8n, debugging, debug, troubleshooting, problemas, logs, inspeção]
---

# <ion-icon name="bug-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Debugging

O **debugging** é uma habilidade essencial para desenvolvedores n8n. Este guia ensina como identificar, diagnosticar e resolver problemas em seus workflows de forma eficiente.

## O que é Debugging?

**Debugging** é o processo de identificar e corrigir erros ou problemas em workflows. No n8n, isso envolve:

- **Identificar** onde o problema está ocorrendo
- **Analisar** os dados em cada node
- **Testar** diferentes cenários
- **Corrigir** o problema identificado
- **Validar** que a correção funcionou

### Por que Debugging é Importante?

- **Reduz tempo** de desenvolvimento
- **Melhora qualidade** dos workflows
- **Previne problemas** em produção
- **Facilita manutenção** de código
- **Aumenta confiança** nas automações

## Ferramentas de Debugging

### 1. Debug Helper

O **Debug Helper** é a ferramenta mais importante para debugging no n8n.

#### Como Usar

1. **Adicione** o node Debug Helper ao seu workflow
2. **Conecte** após o node que você quer inspecionar
3. **Execute** o workflow
4. **Clique** no Debug Helper para ver os dados

#### Configuração

```javascript
// Configuração básica do Debug Helper
{
  "name": "Debug Dados",
  "description": "Inspeciona dados do node anterior",
  "options": {
    "showData": true,
    "showMetadata": true
  }
}
```

#### Exemplo de Uso

```javascript
// Debug Helper após HTTP Request
// Mostra a resposta completa da API
{
  "status": 200,
  "data": {
    "usuarios": [
      {
        "id": 1,
        "nome": "João Silva",
        "email": "joao@exemplo.com"
      }
    ]
  },
  "headers": {
    "content-type": "application/json"
  }
}
```

### 2. Execution History

O **Execution History** mostra o histórico completo de execuções.

#### Como Acessar

1. **Vá para** "Executions" no menu lateral
2. **Clique** na execução que você quer analisar
3. **Navegue** pelos nodes para ver dados

#### Informações Disponíveis

- **Status** de cada node
- **Dados** de entrada e saída
- **Tempo** de execução
- **Erros** detalhados
- **Logs** de console

### 3. Console Logs

Use **console.log** para adicionar logs customizados.

#### Sintaxe

```javascript
// Code Node - Logs básicos
console.log('Dados recebidos:', $json);
console.error('Erro encontrado:', error);
console.warn('Aviso importante:', warning);
console.info('Informação:', info);
```

#### Logs Estruturados

```javascript
// Code Node - Log estruturado
console.log(JSON.stringify({
  nivel: 'INFO',
  mensagem: 'Processando dados',
  timestamp: new Date().toISOString(),
  dados: $json,
  node: 'Nome do Node'
}, null, 2));
```

### 4. Data Pinning

O **Data Pinning** permite congelar dados para debugging.

#### Como Usar

1. **Execute** o workflow até o node desejado
2. **Clique** no node para ver os dados
3. **Clique** no ícone de pin para congelar
4. **Continue** desenvolvendo com dados fixos

#### Benefícios

- **Dados consistentes** durante desenvolvimento
- **Evita requisições** repetidas a APIs
- **Acelera** o processo de debugging
- **Permite** trabalhar offline

## Estratégias de Debugging

### 1. Debugging Step-by-Step

#### Abordagem Sistemática

1. **Identifique** o problema
2. **Localize** onde está ocorrendo
3. **Adicione** Debug Helpers
4. **Analise** os dados
5. **Teste** hipóteses
6. **Corrija** o problema
7. **Valide** a correção

#### Exemplo Prático

```javascript
// Workflow com Debug Helpers
Manual Trigger → Debug Helper 1 → HTTP Request → Debug Helper 2 → Processamento → Debug Helper 3
```

### 2. Debugging com Condições

#### Usar If Nodes para Debug

```javascript
// If Node - Debug condicional
{
  "condition": "{{ $json.debug === true }}",
  "true": "Debug Helper",
  "false": "Processamento Normal"
}
```

#### Debug com Switch

```javascript
// Switch Node - Múltiplos caminhos de debug
{
  "rules": [
    {
      "condition": "{{ $json.tipo === 'erro' }}",
      "output": "Debug Erro"
    },
    {
      "condition": "{{ $json.tipo === 'sucesso' }}",
      "output": "Debug Sucesso"
    },
    {
      "condition": "{{ $json.tipo === 'aviso' }}",
      "output": "Debug Aviso"
    }
  ]
}
```

### 3. Debugging de APIs

#### Verificar Requisições

```javascript
// Code Node - Debug de API
const debugAPI = {
  url: $json.url,
  method: $json.method,
  headers: $json.headers,
  body: $json.body,
  timestamp: new Date().toISOString()
};

console.log('Requisição API:', JSON.stringify(debugAPI, null, 2));

// Fazer a requisição
const response = await fetch($json.url, {
  method: $json.method,
  headers: $json.headers,
  body: JSON.stringify($json.body)
});

const responseData = await response.json();

console.log('Resposta API:', JSON.stringify(responseData, null, 2));

return { json: responseData };
```

#### Validar Respostas

```javascript
// Code Node - Validação de resposta
const validarResposta = (resposta) => {
  const validacoes = {
    tem_dados: resposta && Object.keys(resposta).length > 0,
    tem_campo_obrigatorio: resposta && resposta.id,
    formato_correto: typeof resposta === 'object',
    status_valido: resposta.status === 'success'
  };
  
  console.log('Validações:', validacoes);
  
  const todasValidas = Object.values(validacoes).every(v => v);
  
  if (!todasValidas) {
    console.error('Resposta inválida:', resposta);
    throw new Error('Resposta da API inválida');
  }
  
  return resposta;
};

const respostaValidada = validarResposta($json);
return { json: respostaValidada };
```

### 4. Debugging de Dados

#### Inspecionar Estrutura

```javascript
// Code Node - Inspeção de dados
const inspecionarDados = (dados) => {
  console.log('=== INSPEÇÃO DE DADOS ===');
  console.log('Tipo:', typeof dados);
  console.log('É array:', Array.isArray(dados));
  console.log('É objeto:', typeof dados === 'object' && !Array.isArray(dados));
  console.log('Chaves:', Object.keys(dados));
  console.log('Valores:', Object.values(dados));
  console.log('Tamanho:', Object.keys(dados).length);
  console.log('Dados completos:', JSON.stringify(dados, null, 2));
  console.log('========================');
  
  return dados;
};

return { json: inspecionarDados($json) };
```

#### Validar Tipos

```javascript
// Code Node - Validação de tipos
const validarTipos = (dados) => {
  const tipos = {
    nome: typeof dados.nome,
    idade: typeof dados.idade,
    email: typeof dados.email,
    ativo: typeof dados.ativo
  };
  
  console.log('Tipos dos campos:', tipos);
  
  const tiposEsperados = {
    nome: 'string',
    idade: 'number',
    email: 'string',
    ativo: 'boolean'
  };
  
  const tiposCorretos = Object.keys(tipos).every(campo => 
    tipos[campo] === tiposEsperados[campo]
  );
  
  if (!tiposCorretos) {
    console.error('Tipos incorretos:', tipos);
    throw new Error('Tipos de dados incorretos');
  }
  
  return dados;
};
```

## Problemas Comuns e Soluções

### 1. Dados Não Aparecem

#### Sintomas
- Node retorna dados vazios
- Workflow para de funcionar
- Erro "undefined"

#### Soluções

```javascript
// Code Node - Verificar dados
const verificarDados = (dados) => {
  console.log('Dados recebidos:', dados);
  
  if (!dados) {
    console.error('Dados são null ou undefined');
    return { erro: 'Dados não fornecidos' };
  }
  
  if (Object.keys(dados).length === 0) {
    console.error('Dados estão vazios');
    return { erro: 'Dados vazios' };
  }
  
  return dados;
};

return { json: verificarDados($json) };
```

### 2. Expressões Não Funcionam

#### Sintomas
- Expressão retorna erro
- Dados não são acessados corretamente
- Workflow falha

#### Soluções

```javascript
// Code Node - Debug de expressões
const debugExpressao = (expressao, valor) => {
  console.log('Expressão:', expressao);
  console.log('Valor:', valor);
  console.log('Tipo:', typeof valor);
  
  try {
    // Testar a expressão
    const resultado = eval(expressao);
    console.log('Resultado:', resultado);
    return resultado;
  } catch (error) {
    console.error('Erro na expressão:', error.message);
    return null;
  }
};

// Exemplo de uso
const nome = debugExpressao('$json.nome', $json.nome);
const email = debugExpressao('$json.email', $json.email);
```

### 3. APIs Não Respondem

#### Sintomas
- Timeout de requisições
- Erro de conectividade
- Status codes de erro

#### Soluções

```javascript
// Code Node - Debug de API
const debugAPI = async (url, options) => {
  console.log('Testando API:', url);
  console.log('Opções:', options);
  
  try {
    const startTime = Date.now();
    const response = await fetch(url, options);
    const endTime = Date.now();
    
    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers));
    console.log('Tempo de resposta:', endTime - startTime, 'ms');
    
    if (!response.ok) {
      console.error('Erro HTTP:', response.status, response.statusText);
      return { erro: `HTTP ${response.status}: ${response.statusText}` };
    }
    
    const data = await response.json();
    console.log('Dados recebidos:', data);
    
    return data;
  } catch (error) {
    console.error('Erro de conectividade:', error.message);
    return { erro: error.message };
  }
};
```

### 4. Workflow Lento

#### Sintomas
- Execução demora muito
- Timeouts frequentes
- Performance degradada

#### Soluções

```javascript
// Code Node - Monitor de performance
const monitorPerformance = async (operacao, nome) => {
  const startTime = Date.now();
  console.log(`Iniciando ${nome}...`);
  
  try {
    const resultado = await operacao();
    const endTime = Date.now();
    const duracao = endTime - startTime;
    
    console.log(`${nome} concluído em ${duracao}ms`);
    
    if (duracao > 5000) {
      console.warn(`${nome} demorou mais de 5 segundos!`);
    }
    
    return resultado;
  } catch (error) {
    const endTime = Date.now();
    const duracao = endTime - startTime;
    
    console.error(`${nome} falhou após ${duracao}ms:`, error.message);
    throw error;
  }
};

// Exemplo de uso
const resultado = await monitorPerformance(
  () => processarDados($json),
  'Processamento de Dados'
);
```

## Boas Práticas

### 1. Estratégia de Debugging

- **Comece simples**: Teste com dados básicos
- **Use Debug Helpers**: Adicione em pontos estratégicos
- **Log estruturado**: Use JSON.stringify para logs
- **Teste incrementalmente**: Adicione um node por vez
- **Documente problemas**: Mantenha registro de soluções

### 2. Organização

- **Nomeie nodes** de forma descritiva
- **Use comentários** para explicar lógica
- **Agrupe** nodes relacionados
- **Mantenha** workflows organizados
- **Versionamento**: Use controle de versão

### 3. Performance

- **Monitore** tempo de execução
- **Otimize** requisições desnecessárias
- **Use cache** quando possível
- **Configure** timeouts adequados
- **Teste** com volumes reais

### 4. Segurança

- **Não logue** dados sensíveis
- **Use variáveis** de ambiente
- **Valide** dados de entrada
- **Teste** cenários de erro
- **Monitore** logs de segurança

## Ferramentas Avançadas

### 1. Custom Debug Nodes

```javascript
// Code Node - Debug customizado
const debugCustomizado = {
  timestamp: new Date().toISOString(),
  workflow: 'Nome do Workflow',
  node: 'Nome do Node',
  dados: $json,
  metadata: {
    versao: '1.0.0',
    ambiente: 'desenvolvimento',
    usuario: 'desenvolvedor'
  }
};

// Salvar em arquivo ou banco
console.log('Debug Customizado:', JSON.stringify(debugCustomizado, null, 2));

return { json: debugCustomizado };
```

### 2. Debug com Contexto

```javascript
// Code Node - Debug com contexto
const debugComContexto = (dados, contexto) => {
  const debugInfo = {
    dados: dados,
    contexto: contexto,
    timestamp: new Date().toISOString(),
    memoria: process.memoryUsage(),
    uptime: process.uptime()
  };
  
  console.log('Debug com Contexto:', JSON.stringify(debugInfo, null, 2));
  
  return debugInfo;
};

const contexto = {
  etapa: 'processamento',
  tentativa: 1,
  origem: 'webhook'
};

return { json: debugComContexto($json, contexto) };
```

### 3. Debug Distribuído

```javascript
// Code Node - Debug distribuído
const enviarDebugRemoto = async (dados) => {
  const debugData = {
    id: Date.now().toString(),
    dados: dados,
    timestamp: new Date().toISOString(),
    workflow: 'Nome do Workflow'
  };
  
  try {
    // Enviar para serviço de debug
    await fetch('https://debug-service.com/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(debugData)
    });
    
    console.log('Debug enviado remotamente:', debugData.id);
  } catch (error) {
    console.error('Erro ao enviar debug:', error.message);
  }
  
  return dados;
};

await enviarDebugRemoto($json);
return { json: $json };
```

## Troubleshooting

### Problemas Comuns

#### Debug Helper não mostra dados
- Verifique se o node está conectado
- Confirme se o workflow foi executado
- Teste com dados simples
- Verifique logs de erro

#### Console logs não aparecem
- Verifique se o Code Node está configurado
- Confirme se não há erros de sintaxe
- Teste com console.log simples
- Verifique Execution History

#### Performance lenta
- Use Data Pinning para desenvolvimento
- Configure timeouts adequados
- Otimize requisições
- Monitore recursos

### Debug

1. **Use Debug Helper** frequentemente
2. **Configure logging** detalhado
3. **Teste incrementalmente**
4. **Monitore performance**
5. **Documente soluções**

## Próximos Passos

- [Tratamento de Erros](/logica-e-dados/flow-logic/error-handling.md) - Lidar com falhas
- [Expressões n8n](/logica-e-dados/expressoes.md) - Usar expressões para debug
- [HTTP Request](/integracoes/builtin-nodes/http-requests/http-request.md) - Debug de APIs
- [Code Node](/integracoes/builtin-nodes/core-nodes/code.md) - JavaScript para debugging
- [Monitoring](/usando-n8n/monitoring/index.md) - Monitorar workflows em produção 