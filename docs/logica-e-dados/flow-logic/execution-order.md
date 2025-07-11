---
sidebar_position: 7
title: Ordem de Execução
description: Entenda como o n8n determina a ordem de execução dos nodes
keywords: [n8n, execução, ordem, sequência, workflow, nodes]
---

# <ion-icon name="play-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Ordem de Execução

O n8n determina a ordem de execução dos nodes baseado nas conexões que você cria no workflow. Entender como isso funciona é fundamental para criar workflows eficientes e previsíveis.

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Como a Ordem é Determinada

### Fluxo Sequencial

Por padrão, o n8n executa os nodes em **ordem sequencial** baseado nas conexões:

```mermaid
graph LR
    A[Trigger] --> B[HTTP Request]
    B --> C[Transform Data]
    C --> D[Send Email]
    
    A --> A1[1º]
    B --> B1[2º]
    C --> C1[3º]
    D --> D1[4º]
```

### Execução Paralela

Quando múltiplos nodes não dependem um do outro, eles podem executar em **paralelo**:

```mermaid
graph LR
    A[Trigger] --> B[HTTP Request 1]
    A --> C[HTTP Request 2]
    A --> D[HTTP Request 3]
    
    B --> E[Merge]
    C --> E
    D --> E
    E --> F[Process Result]
```

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Tipos de Conexões

### Conexão Simples

- Um node conecta diretamente ao próximo
- Execução sequencial garantida
- Dados fluem de um para o outro

### Conexões Múltiplas

- Um node pode conectar a múltiplos nodes
- Todos os nodes conectados executam
- Útil para processamento paralelo

### Conexões Condicionais

- Usando nodes como IF ou Switch
- Apenas o caminho condicional executará
- Permite lógica de decisão no workflow

## <ion-icon name="code-slash-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Exemplos de Ordem de Execução

### Exemplo 1: Fluxo Linear

```mermaid
graph LR
    A[Webhook] --> B[Get Data]
    B --> C[Process Data]
    C --> D[Save to Database]
    D --> E[Send Notification]
    
    A --> A1[1º: Recebe trigger]
    B --> B1[2º: Busca dados]
    C --> C1[3º: Processa]
    D --> D1[4º: Salva]
    E --> E1[5º: Notifica]
```

### Exemplo 2: Processamento Paralelo

```mermaid
graph LR
    A[Trigger] --> B[Get Users]
    A --> C[Get Products]
    A --> D[Get Orders]
    
    B --> E[Merge Data]
    C --> E
    D --> E
    E --> F[Generate Report]
    
    B --> B1[Executa em paralelo]
    C --> C1[Executa em paralelo]
    D --> D1[Executa em paralelo]
    E --> E1[Aguarda todos]
    F --> F1[Processa resultado]
```

### Exemplo 3: Fluxo Condicional

```mermaid
graph LR
    A[Trigger] --> B[Check Condition]
    B --> C[Process A]
    B --> D[Process B]
    
    C --> E[Merge Results]
    D --> E
    E --> F[Final Step]
    
    B --> B1[1º: Verifica condição]
    C --> C1[2º: Executa se verdadeiro]
    D --> D1[2º: Executa se falso]
    E --> E1[3º: Combina resultados]
    F --> F1[4º: Finaliza]
```

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Considerações Importantes

### Dependências

- Nodes só executam quando **todos os inputs** estão prontos
- Se um node falha, os nodes dependentes não executam
- Use **Error Handling** para tratar falhas

### Performance

- **Execução paralela** pode melhorar performance
- **Execução sequencial** é mais previsível
- Monitore tempo de execução de cada node

### Recursos

- Cada execução consome recursos do sistema
- Muitas execuções paralelas podem sobrecarregar
- Use **Rate Limiting** quando necessário

## <ion-icon name="chevron-forward-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Boas Práticas

### Para Workflows Simples

1. **Mantenha fluxo linear** quando possível
2. **Use nomes descritivos** para nodes
3. **Documente dependências** importantes

### Para Workflows Complexos

1. **Separe em sub-workflows** para melhor organização
2. **Use Merge nodes** para combinar fluxos paralelos
3. **Implemente error handling** em pontos críticos

### Para Performance

1. **Execute em paralelo** quando possível
2. **Use Execute Once** para operações únicas
3. **Monitore logs** para identificar gargalos

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **Aprenda sobre [Error Handling](./error-handling)** para tratar falhas
2. **Explore [Merging](./merging)** para combinar fluxos
3. **Entenda [Subworkflows](./subworkflows)** para organização

## <ion-icon name="school-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Relacionados

- **[Error Handling](./error-handling)** - Tratamento de erros
- **[Merging](./merging)** - Combinar fluxos de dados
- **[Subworkflows](./subworkflows)** - Organizar workflows complexos
- **[Core Nodes](../integracoes/builtin-nodes/core-nodes/)** - Nodes fundamentais
