---
sidebar_position: 1
title: Navegação no Editor UI
description: Guia completo da interface e navegação do editor n8n
sidebar_label: Navegação no Editor UI
---

# Navegação no Editor UI

O editor n8n oferece uma interface intuitiva e poderosa para criar e gerenciar workflows. Este guia detalha todos os elementos da interface e como navegar eficientemente.

## Visão Geral da Interface

A interface do n8n é dividida em áreas principais que trabalham em conjunto:

```mermaid\ngraph TD\n    A[Barra Superior] --> B[Área Principal]\n    B --> C[Sidebar Esquerda]\n    B --> D[Canvas do Workflow]\n    B --> E[Sidebar Direita]\n    C --> F[Biblioteca de Nodes]\n    C --> G[Execuções]\n    C --> H[Configurações]\n    E --> I[Propriedades do Node]\n    E --> J[Configurações do Workflow]\n```\n\n## Barra Superior\n\n### Menu Principal\n\n- **File**: Salvar, exportar, importar workflows\n- **Edit**: Desfazer, refazer, copiar, colar\n- **View**: Alternar visibilidade de elementos\n- **Help**: Documentação, sobre, suporte\n\n### Botões de Ação\n\n- **Execute Workflow**: Executa o workflow atual\n- **Stop Execution**: Para execuções em andamento\n- **Save**: Salva alterações\n- **Share**: Compartilha o workflow\n\n### Indicadores de Status\n\n- **Connection Status**: Status da conexão com o servidor\n- **Execution Status**: Status da última execução\n- **Version**: Versão atual do n8n\n\n## Sidebar Esquerda\n\n### Biblioteca de Nodes\n\nOrganizada por categorias:\n\n#### Core Nodes\n\n- **Manual Trigger**: Inicia workflows manualmente\n- **Schedule Trigger**: Executa em intervalos programados\n- **Webhook**: Recebe dados via HTTP\n- **HTTP Request**: Faz requisições HTTP\n- **Code**: Executa código JavaScript/Python\n- **Set**: Define valores de campos\n- **IF**: Lógica condicional\n- **Switch**: Múltiplas condições\n- **Merge**: Combina dados de múltiplos nodes\n- **Split In Batches**: Divide dados em lotes\n\n#### App Nodes\n\n- **Communication**: Email, Slack, Discord\n- **Productivity**: Google Sheets, Trello, Notion\n- **E-commerce**: Shopify, WooCommerce\n- **Marketing**: Mailchimp, HubSpot\n- **Finance**: PayPal, Stripe\n\n### Execuções\n\n- **Recent Executions**: Últimas execuções do workflow\n- **Execution Details**: Logs e dados detalhados\n- **Debug Information**: Informações para depuração\n\n### Configurações\n\n- **Workflow Settings**: Configurações gerais\n- **Credentials**: Gerenciamento de credenciais\n- **Variables**: Variáveis de ambiente\n\n## Canvas do Workflow\n\n### Área de Trabalho\n\n- **Zoom Controls**: Zoom in/out, fit to screen\n- **Pan**: Arrastar para navegar\n- **Grid**: Grade de alinhamento\n- **Mini-map**: Visão geral do workflow\n\n### Nodes\n\n- **Drag & Drop**: Arrastar nodes da biblioteca\n- **Connection Points**: Conectar nodes com setas\n- **Node Types**: Diferentes cores por categoria\n- **Status Indicators**: Sucesso, erro, em execução\n\n### Conexões\n\n- **Data Flow**: Setas mostram fluxo de dados\n- **Connection Types**: Diferentes tipos de conexão\n- **Validation**: Validação automática de conexões\n\n## Sidebar Direita\n\n### Propriedades do Node\n\nQuando um node está selecionado:\n\n#### Configurações Básicas\n\n- **Node Name**: Nome identificador\n- **Description**: Descrição opcional\n- **Tags**: Tags para organização\n\n#### Parâmetros Específicos\n\n- **Authentication**: Configuração de credenciais\n- **Operation**: Operação específica do node\n- **Fields**: Campos de entrada/saída\n- **Options**: Opções avançadas\n\n#### Validação\n\n- **Required Fields**: Campos obrigatórios\n- **Validation Rules**: Regras de validação\n- **Error Messages**: Mensagens de erro\n\n### Configurações do Workflow\n\n- **General**: Nome, descrição, tags\n- **Settings**: Configurações de execução\n- **Variables**: Variáveis globais\n- **Permissions**: Permissões de acesso\n\n## Atalhos de Teclado\n\n### Navegação\n\n- `Ctrl + S`: Salvar workflow\n- `Ctrl + Z`: Desfazer\n- `Ctrl + Y`: Refazer\n- `Ctrl + C`: Copiar node selecionado\n- `Ctrl + V`: Colar node\n- `Delete`: Remover node selecionado\n- `Ctrl + A`: Selecionar todos os nodes\n- `Ctrl + D`: Duplicar node\n\n### Zoom e Navegação\n\n- `Ctrl + +`: Zoom in\n- `Ctrl + -`: Zoom out\n- `Ctrl + 0`: Reset zoom\n- `Space + Drag`: Pan no canvas\n- `Ctrl + F`: Fit to screen\n\n### Execução\n\n- `F5`: Executar workflow\n- `Ctrl + F5`: Executar com debug\n- `Escape`: Parar execução\n\n### Busca\n\n- `Ctrl + F`: Buscar nodes\n- `Ctrl + Shift + F`: Buscar em todo o workflow

## Dicas de Produtividade

### Organização

1. **Use Tags**: Organize workflows com tags descritivas
2. **Nomes Descritivos**: Dê nomes claros aos nodes
3. **Comentários**: Adicione comentários para documentar
4. **Agrupamento**: Agrupe nodes relacionados

### Debugging

1. **Test Mode**: Use modo de teste para validar
2. **Execution Logs**: Analise logs detalhadamente
3. **Data Preview**: Visualize dados em cada node
4. **Error Handling**: Implemente tratamento de erros

### Performance

1. **Batch Processing**: Use nodes de batch para grandes volumes
2. **Rate Limiting**: Configure limites de taxa
3. **Caching**: Use cache quando apropriado
4. **Optimization**: Otimize queries e operações

## Recursos Avançados

### Templates

- **Built-in Templates**: Templates pré-definidos
- **Custom Templates**: Crie seus próprios templates
- **Community Templates**: Templates da comunidade

### Versioning

- **Version Control**: Controle de versão integrado
- **Backup**: Backup automático de workflows
- **Restore**: Restaurar versões anteriores

### Collaboration

- **Sharing**: Compartilhar workflows
- **Comments**: Comentários colaborativos
- **Permissions**: Controle de acesso granular

## Troubleshooting

### Problemas Comuns

1. **Connection Issues**: Verificar credenciais e conectividade
2. **Data Format**: Validar formato dos dados
3. **Rate Limits**: Respeitar limites de API
4. **Memory Usage**: Monitorar uso de memória

### Ferramentas de Debug

- **Execution Inspector**: Inspecionar execuções
- **Data Viewer**: Visualizar dados estruturados
- **Error Tracker**: Rastrear erros
- **Performance Monitor**: Monitorar performance

## Recursos Adicionais

### Documentação Oficial

- [Interface Overview](https://docs.n8n.io/workflows/editor/)
- [Keyboard Shortcuts](https://docs.n8n.io/workflows/editor/keyboard-shortcuts/)
- [Node Reference](https://docs.n8n.io/integrations/)

### Comunidade

- [n8n Community](https://community.n8n.io/)
- [GitHub Discussions](https://github.com/n8n-io/n8n/discussions)
- [Discord Server](https://discord.gg/n8n)

### Vídeos Tutoriais

- [Interface Tutorial](https://www.youtube.com/watch?v=example)
- [Productivity Tips](https://www.youtube.com/watch?v=example)
- [Advanced Features](https://www.youtube.com/watch?v=example)

---

**Próximos Passos:**

- [Configuração de Credenciais](../credenciais/criar-editar)
- [Execução de Workflows](../execucoes)
- [Tratamento de Erros](../../logica-e-dados/flow-logic/error-handling)
