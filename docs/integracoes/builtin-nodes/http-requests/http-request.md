---
title: Node HTTP Request
description: Aprenda a usar o node HTTP Request no n8n para fazer requisições a APIs REST e integrar com qualquer serviço
sidebar_position: 1
keywords: [n8n, http request, api, rest, integração, automação]
---

# <ion-icon name="globe-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Node HTTP Request

O node **HTTP Request** é um dos nodes mais versáteis do n8n. Ele permite que você faça requisições HTTP para consultar dados de qualquer aplicação ou serviço que tenha uma API REST. Você pode usar este node como um node regular ou conectá-lo a um [agente de IA](/advanced-ai/nodes-ia/ai-agent) para funcionar como uma [ferramenta](/advanced-ai/exemplos-casos/ferramentas-ia).

Quando você usa este node, está criando uma chamada de API REST. É importante ter um entendimento básico de terminologia e conceitos de API.

Existem duas formas de criar uma requisição HTTP: configurando os [parâmetros do node](#parâmetros-do-node) ou [importando um comando curl](#importar-comando-curl).

/// note | Credenciais
Consulte [Credenciais HTTP Request](/integracoes/credential-nodes/http-request) para orientações sobre como configurar autenticação.
///

## Quando usar o HTTP Request

O node HTTP Request é ideal para:

- **Integrar com APIs não suportadas**: Conectar com serviços que não têm nodes específicos
- **Automações customizadas**: Criar integrações específicas para seu negócio
- **Prototipagem rápida**: Testar APIs antes de criar nodes dedicados
- **Operações avançadas**: Requisições complexas com headers e parâmetros customizados

## Parâmetros do Node

### Método

Selecione o método HTTP para a requisição:

- **GET**: Buscar dados (padrão)
- **POST**: Enviar dados
- **PUT**: Atualizar dados
- **PATCH**: Atualizar parcialmente
- **DELETE**: Remover dados
- **HEAD**: Obter apenas headers
- **OPTIONS**: Verificar opções disponíveis

### URL

Digite o endpoint que você quer usar. Exemplos:

```
https://api.exemplo.com/v1/usuarios
https://jsonplaceholder.typicode.com/posts
https://viacep.com.br/ws/01001000/json/
```

### Autenticação

O n8n recomenda usar a opção **Tipo de Credencial Predefinida** quando disponível. Ela oferece uma forma mais fácil de configurar e gerenciar credenciais, comparado a configurar credenciais genéricas.

#### Credenciais predefinidas

Credenciais para integrações suportadas pelo n8n, incluindo nodes integrados e da comunidade. Use **Tipo de Credencial Predefinida** para operações customizadas sem configuração extra.

#### Credenciais genéricas

Credenciais para integrações não suportadas pelo n8n. Você precisará configurar manualmente o processo de autenticação, incluindo especificar os endpoints de API necessários, parâmetros obrigatórios e o método de autenticação.

Você pode selecionar um dos seguintes métodos:

- **Basic auth**: Autenticação básica (usuário/senha)
- **Custom auth**: Autenticação customizada
- **Digest auth**: Autenticação digest
- **Header auth**: Autenticação via headers
- **OAuth1 API**: Autenticação OAuth 1.0
- **OAuth2 API**: Autenticação OAuth 2.0
- **Query auth**: Autenticação via parâmetros de query

### Enviar Parâmetros de Query

Parâmetros de query atuam como filtros nas requisições HTTP. Se a API que você está interagindo suporta parâmetros de query e a requisição que você está fazendo precisa de um filtro, ative esta opção.

**Especifique seus parâmetros de query** usando uma das opções disponíveis:

- **Usando Campos Abaixo**: Digite pares **Nome**/**Valor** de **Parâmetros de Query**. Para adicionar mais pares, selecione **Adicionar Parâmetro**.
- **Usando JSON**: Digite **JSON** para definir seus parâmetros de query.

**Exemplo prático - ViaCEP:**
```
Nome: cep
Valor: 01001000
```

### Enviar Headers

Use este parâmetro para enviar headers com sua requisição. Headers contêm metadados ou contexto sobre sua requisição.

**Especifique Headers** usando uma das opções disponíveis:

- **Usando Campos Abaixo**: Digite pares **Nome**/**Valor** de **Parâmetros de Header**
- **Usando JSON**: Digite **JSON** para definir seus parâmetros de header

**Exemplos comuns:**
```
Content-Type: application/json
Authorization: Bearer seu-token-aqui
User-Agent: n8n-workflow/1.0
```

### Enviar Body

Se você precisa enviar um body com sua requisição de API, ative esta opção.

Depois selecione o **Tipo de Conteúdo do Body** que melhor corresponde ao formato do conteúdo que você deseja enviar.

#### Form URLencoded

Use esta opção para enviar seu body como `application/x-www-form-urlencoded`.

**Especifique Body** usando uma das opções disponíveis:

- **Usando Campos Abaixo**: Digite pares **Nome**/**Valor** de **Parâmetros do Body**
- **Usando Campo Único**: Digite seus pares nome/valor em um único parâmetro **Body** com formato `campo1=valor1&campo2=valor2`

#### Form-Data

Use esta opção para enviar seu body como `multipart/form-data`.

Configure seus **Parâmetros do Body** selecionando o **Tipo de Parâmetro**:

- Escolha **Form Data** para digitar pares **Nome**/**Valor**
- Escolha **Arquivo Binário n8n** para extrair o body de um arquivo que o node tem acesso

#### JSON

Use esta opção para enviar seu body como JSON.

**Especifique Body** usando uma das opções disponíveis:

- **Usando Campos Abaixo**: Digite pares **Nome**/**Valor** de **Parâmetros do Body**
- **Usando JSON**: Digite **JSON** para definir seu body

**Exemplo de JSON:**
```json
{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "idade": 30,
  "ativo": true
}
```

#### Arquivo Binário n8n

Use esta opção para enviar o conteúdo de um arquivo armazenado no n8n como body.

Digite o nome do campo de entrada que contém o arquivo como **Nome do Campo de Dados de Entrada**.

#### Raw

Use esta opção para enviar dados brutos no body.

- **Content Type**: Digite o header `Content-Type` para usar no conteúdo do body
- **Body**: Digite o conteúdo do body bruto para enviar

## Opções do Node

Selecione **Adicionar Opção** para visualizar e selecionar estas opções. As opções estão disponíveis para todos os parâmetros, a menos que seja observado o contrário.

### Formato de Array em Parâmetros de Query

/// note | Disponibilidade da opção
Esta opção só está disponível quando você ativa **Enviar Parâmetros de Query**.
///

Use esta opção para controlar o formato para arrays incluídos em parâmetros de query. Escolha entre estas opções:

- **Sem Colchetes**: Arrays serão formatados como nome=valor para cada item no array, por exemplo: `foo=bar&foo=qux`
- **Apenas Colchetes**: O node adiciona colchetes após cada nome de array, por exemplo: `foo[]=bar&foo[]=qux`
- **Colchetes com Índices**: O node adiciona colchetes com um valor de índice após cada nome de array, por exemplo: `foo[0]=bar&foo[1]=qux`

### Batching (Processamento em Lotes)

Controle como processar grandes números de itens de entrada:

- **Itens por Lote**: Digite o número de itens de entrada para incluir em cada lote
- **Intervalo do Lote**: Digite o tempo para esperar entre cada lote de requisições em milissegundos. Digite 0 para nenhum intervalo

### Ignorar Problemas SSL

Por padrão, o n8n só baixa a resposta se a validação do certificado SSL for bem-sucedida. Se você quiser baixar a resposta mesmo se a validação do certificado SSL falhar, ative esta opção.

### Headers em Minúsculas

Escolha se deve colocar nomes de headers em minúsculas (ativado, padrão) ou não (desativado).

### Redirecionamentos

Escolha se deve seguir redirecionamentos (ativado por padrão) ou não (desativado). Se ativado, digite o número máximo de redirecionamentos que a requisição deve seguir em **Máximo de Redirecionamentos**.

### Resposta

Use esta opção para definir alguns detalhes sobre a resposta da API esperada, incluindo:

- **Incluir Headers e Status da Resposta**: Por padrão, o node retorna apenas o body. Ative esta opção para retornar a resposta completa (headers e código de status da resposta) além do body
- **Nunca Erro**: Por padrão, o node retorna sucesso apenas quando a resposta retorna com um código 2xx. Ative esta opção para retornar sucesso independentemente do código retornado
- **Formato da Resposta**: Selecione o formato em que os dados são retornados. Escolha entre:
  - **Autodetectar** (padrão): O node detecta e formata a resposta baseado nos dados retornados
  - **Arquivo**: Selecione esta opção para colocar a resposta em um arquivo
  - **JSON**: Selecione esta opção para formatar a resposta como JSON
  - **Texto**: Selecione esta opção para formatar a resposta como texto simples

### Paginação

Use esta opção para paginar resultados, útil para lidar com resultados de query que são muito grandes para a API retornar em uma única chamada.

/// note | Inspecione os dados da API primeiro
Antes de configurar paginação, execute o node uma vez para ver a estrutura dos dados retornados pela API. Isso ajudará você a entender como configurar a paginação corretamente.
///

## Exemplos Práticos

### Exemplo 1: Consultar CEP via ViaCEP

**Configuração:**
- **Método**: GET
- **URL**: `https://viacep.com.br/ws/{{ $json.cep }}/json/`

**Resultado esperado:**
```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

### Exemplo 2: Enviar dados para API REST

**Configuração:**
- **Método**: POST
- **URL**: `https://api.exemplo.com/usuarios`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{ $json.token }}`
- **Body (JSON)**:
```json
{
  "nome": "{{ $json.nome }}",
  "email": "{{ $json.email }}",
  "telefone": "{{ $json.telefone }}"
}
```

### Exemplo 3: Upload de arquivo

**Configuração:**
- **Método**: POST
- **URL**: `https://api.exemplo.com/upload`
- **Body**: Form-Data
- **Parâmetros**:
  - Nome: `arquivo`, Tipo: `Arquivo Binário n8n`
  - Nome: `descricao`, Tipo: `Form Data`, Valor: `{{ $json.descricao }}`

## Troubleshooting

### Problemas Comuns

#### Erro 401 - Não Autorizado
- Verifique se as credenciais estão configuradas corretamente
- Confirme se o token de autenticação não expirou
- Verifique se o header `Authorization` está sendo enviado

#### Erro 404 - Não Encontrado
- Confirme se a URL está correta
- Verifique se o endpoint existe na API
- Teste a URL diretamente no navegador ou Postman

#### Erro 500 - Erro Interno do Servidor
- Verifique se o formato dos dados enviados está correto
- Confirme se todos os campos obrigatórios estão preenchidos
- Verifique a documentação da API para requisitos específicos

### Dicas de Debug

1. **Use a opção "Incluir Headers e Status da Resposta"** para ver detalhes completos
2. **Teste com "Nunca Erro" ativado** para ver respostas de erro
3. **Use o node Debug Helper** antes do HTTP Request para verificar os dados
4. **Execute manualmente** para testar a configuração

## Próximos Passos

- [Node Webhook](/integracoes/builtin-nodes/http-requests/webhook) - Para receber requisições HTTP
- [Credenciais HTTP Request](/integracoes/credential-nodes/http-request) - Configurar autenticação
- [Expressões n8n](/logica-e-dados/expressoes) - Usar dados dinâmicos nas requisições
- [Tratamento de Erros](/logica-e-dados/flow-logic/error-handling) - Lidar com falhas nas requisições
