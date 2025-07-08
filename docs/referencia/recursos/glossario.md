---
id: glossario
title: Glossário
sidebar_label: Glossário
---

# Glossário

Este glossário contém termos técnicos, conceitos e definições relacionados ao n8n e automação de workflows.

## A

### **API (Application Programming Interface)**
Interface que permite que diferentes sistemas se comuniquem entre si. No n8n, APIs são usadas para conectar com serviços externos.

### **App Node**
Node específico para integração com aplicações de terceiros (Gmail, Slack, Google Sheets, etc.).

### **Authentication**
Processo de verificação de identidade para acessar sistemas ou serviços. No n8n, pode ser via API keys, OAuth, ou credenciais básicas.

### **Automation**
Processo de executar tarefas automaticamente sem intervenção manual, usando workflows programados.

## B

### **Backup**
Cópia de segurança de workflows, credenciais e configurações para recuperação em caso de falha.

### **Batch Processing**
Processamento de múltiplos itens de dados em lotes, em vez de um por vez.

### **Binary Data**
Dados não-textuais como imagens, arquivos PDF, ou outros formatos binários.

### **Branch**
Caminho alternativo em um workflow baseado em condições específicas.

## C

### **Canvas**
Área de trabalho visual onde workflows são criados e editados no n8n.

### **Circuit Breaker**
Padrão de design para prevenir falhas em cascata, interrompendo automaticamente operações que falham repetidamente.

### **Code Node**
Node que permite executar código JavaScript personalizado dentro de um workflow.

### **Community Node**
Node criado pela comunidade n8n, disponível através do npm.

### **Condition**
Expressão lógica que determina o fluxo de execução em um workflow.

### **Connection**
Linha que conecta nodes em um workflow, definindo o fluxo de dados.

### **Credential**
Informação de autenticação armazenada de forma segura para conectar com serviços externos.

### **Cron Expression**
Formato para definir agendamentos de execução (ex: "0 9 * * *" = diário às 9h).

## D

### **Data Mapping**
Processo de transformar dados de um formato para outro, mapeando campos entre sistemas.

### **Debug**
Processo de identificar e corrigir erros em workflows.

### **Deployment**
Processo de colocar workflows em produção para uso real.

### **Docker**
Plataforma de containerização usada para executar n8n em ambientes isolados.

## E

### **Error Handling**
Estratégias e técnicas para tratar falhas e erros em workflows.

### **Execution**
Instância específica de um workflow sendo executado com dados reais.

### **Execution Data**
Dados gerados durante a execução de um workflow, incluindo logs e resultados.

### **Expression**
Código que permite acessar e manipular dados dinamicamente no n8n.

## F

### **Filter**
Node que permite filtrar dados baseado em condições específicas.

### **Flow Control**
Nodes que controlam o fluxo de execução (IF, Switch, Merge, etc.).

### **Function Node**
Node que permite executar funções JavaScript personalizadas.

## G

### **Git**
Sistema de controle de versão usado para gerenciar código e workflows.

### **Graph**
Representação visual de um workflow como um grafo de nodes conectados.

## H

### **Hosting**
Processo de executar n8n em um servidor ou serviço de nuvem.

### **HTTP Request**
Node que permite fazer requisições HTTP para APIs externas.

### **Hook**
Ponto de entrada em um sistema que permite integração com workflows.

## I

### **Integration**
Processo de conectar diferentes sistemas e aplicações para trocar dados.

### **Item**
Unidade básica de dados processada por um node no n8n.

### **Iteration**
Processo de repetir uma operação para múltiplos itens de dados.

## J

### **JSON (JavaScript Object Notation)**
Formato de dados usado para trocar informações entre sistemas.

### **JavaScript**
Linguagem de programação usada em Code Nodes e expressões do n8n.

## L

### **Log**
Registro de eventos e atividades durante a execução de workflows.

### **Loop**
Estrutura que repete uma operação para múltiplos itens.

## M

### **Manual Trigger**
Node que permite executar workflows manualmente através da interface.

### **Merge**
Node que combina dados de múltiplas fontes em um único fluxo.

### **Monitoring**
Processo de acompanhar a performance e saúde de workflows em execução.

## N

### **Node**
Unidade básica de processamento em um workflow n8n.

### **Node.js**
Runtime JavaScript usado pelo n8n para execução.

## O

### **OAuth**
Protocolo de autorização usado para autenticação segura com serviços de terceiros.

### **Output**
Dados gerados por um node após processamento.

## P

### **Parameter**
Configuração específica de um node que define seu comportamento.

### **Pipeline**
Sequência de nodes que processam dados em etapas.

### **Production**
Ambiente onde workflows são executados para uso real (não teste).

### **Proxy**
Servidor intermediário que facilita comunicação entre sistemas.

## Q

### **Queue**
Sistema que gerencia execuções de workflows em ordem.

## R

### **Rate Limiting**
Limitação da frequência de requisições para APIs externas.

### **Retry**
Tentativa automática de reexecutar uma operação que falhou.

### **Runtime**
Ambiente onde workflows são executados.

## S

### **Schedule Trigger**
Node que executa workflows em horários programados.

### **Script**
Código JavaScript executado em Code Nodes.

### **Set Node**
Node que permite definir ou modificar valores de campos.

### **Split**
Node que divide dados em múltiplos fluxos.

### **Subworkflow**
Workflow que é chamado por outro workflow como um node.

### **Switch**
Node que direciona dados para diferentes caminhos baseado em condições.

## T

### **Template**
Workflow pré-configurado que pode ser usado como base para novos workflows.

### **Test Data**
Dados de exemplo usados para testar workflows.

### **Timeout**
Limite de tempo para execução de uma operação.

### **Token**
Credencial de acesso usada para autenticação com APIs.

### **Trigger**
Node que inicia a execução de um workflow.

## U

### **URL**
Endereço web usado para acessar APIs ou serviços.

### **User**
Pessoa que cria, edita ou executa workflows no n8n.

## V

### **Variable**
Valor que pode ser reutilizado em diferentes partes de um workflow.

### **Version Control**
Sistema para gerenciar diferentes versões de workflows.

## W

### **Webhook**
Método de comunicação que permite que sistemas enviem dados automaticamente.

### **Workflow**
Sequência de nodes que automatiza um processo ou tarefa.

### **Workspace**
Ambiente de trabalho onde workflows são criados e gerenciados.

## X

### **XML**
Formato de dados usado para troca de informações entre sistemas.

## Y

### **YAML**
Formato de dados usado para configurações e documentação.

## Z

### **Zapier**
Plataforma de automação similar ao n8n, usado como referência.

---

## Termos Específicos do n8n

### **n8n**
Plataforma de automação de workflows open-source.

### **n8n Cloud**
Versão hospedada do n8n oferecida pela equipe oficial.

### **n8n Desktop**
Versão desktop do n8n para uso local.

### **n8n CLI**
Interface de linha de comando para gerenciar n8n.

### **n8n API**
API que permite gerenciar n8n programaticamente.

## Termos de Automação

### **ETL (Extract, Transform, Load)**
Processo de extrair dados de uma fonte, transformá-los e carregá-los em um destino.

### **RPA (Robotic Process Automation)**
Automação de tarefas repetitivas usando software.

### **API-First**
Abordagem de desenvolvimento que prioriza APIs como interface principal.

### **Event-Driven**
Arquitetura baseada em eventos que acionam ações automáticas.

### **Microservices**
Arquitetura de software baseada em serviços independentes.

## Termos de Integração

### **REST API**
Interface de programação baseada em HTTP para comunicação entre sistemas.

### **GraphQL**
Linguagem de consulta para APIs que permite solicitar dados específicos.

### **SOAP**
Protocolo para troca de dados estruturados em aplicações web.

### **WebSocket**
Protocolo de comunicação bidirecional em tempo real.

### **Message Queue**
Sistema que gerencia mensagens entre aplicações.

## Termos de Segurança

### **Encryption**
Processo de codificar dados para proteger informações sensíveis.

### **SSL/TLS**
Protocolos de segurança para comunicação criptografada.

### **Two-Factor Authentication (2FA)**
Método de autenticação que requer dois fatores de verificação.

### **API Key**
Chave de acesso usada para autenticar requisições a APIs.

### **Bearer Token**
Token de acesso usado para autenticação em APIs.

## Termos de Performance

### **Latency**
Tempo de resposta de uma operação.

### **Throughput**
Quantidade de dados processados por unidade de tempo.

### **Scalability**
Capacidade de um sistema de lidar com aumento de carga.

### **Caching**
Armazenamento temporário de dados para melhorar performance.

### **Load Balancing**
Distribuição de carga entre múltiplos servidores.

## Termos de Monitoramento

### **Metrics**
Medidas quantitativas de performance e comportamento.

### **Alerting**
Sistema de notificações para eventos importantes.

### **Logging**
Registro de eventos e atividades do sistema.

### **Dashboard**
Interface visual para monitorar métricas e status.

### **Health Check**
Verificação periódica do status de um sistema.

---

**Recursos Relacionados:**
- [Conceitos Básicos](../../primeiros-passos/conceitos-basicos.md)
- [Referência da API](../api/referencia-api.md)
- [Guias de Performance](../../referencia/guias/performance-guide.md)
