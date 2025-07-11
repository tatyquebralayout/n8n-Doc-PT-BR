:::info
<ion-icon name="shield-checkmark-outline" style={{ fontSize: '18px', color: '#17a2b8' }}></ion-icon> Esta página da documentação foi validada tecnicamente e didaticamente.
:::

---
sidebar_position: 8
title: Templates
description: Como usar e criar templates de workflows no n8n
keywords: [n8n, templates, workflows, marketplace, reutilização]
---

# <ion-icon name="library-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Templates de Workflows

Os **templates** são workflows pré-construídos que você pode importar e personalizar para suas necessidades específicas. Eles aceleram o desenvolvimento e fornecem exemplos práticos de automação.

## <ion-icon name="information-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> O que são Templates?

Templates são workflows completos e funcionais que podem ser:

- **Importados** diretamente no n8n
- **Personalizados** para suas necessidades
- **Executados** imediatamente após configuração
- **Compartilhados** com a comunidade

### Benefícios dos Templates

- **Início Rápido**: Comece com workflows funcionais
- **Aprendizado**: Veja como outros resolvem problemas
- **Produtividade**: Economize tempo de desenvolvimento
- **Inspiração**: Descubra novas possibilidades

## <ion-icon name="grid-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Tipos de Templates

### Templates Oficiais

Criados pela equipe n8n:

- **Integrações Populares**: Gmail, Slack, Google Sheets
- **Casos de Uso Comuns**: Notificações, sincronização de dados
- **Workflows Educativos**: Exemplos de conceitos específicos
- **Templates Empresariais**: Soluções para negócios

### Templates Comunitários

Compartilhados pela comunidade:

- **Casos de Uso Específicos**: Soluções para nichos
- **Integrações Personalizadas**: Conectores customizados
- **Workflows Avançados**: Automações complexas
- **Templates Regionais**: Adaptados para mercados específicos

### Templates Personalizados

Criados por você:

- **Workflows Internos**: Para sua organização
- **Templates Reutilizáveis**: Para projetos similares
- **Documentação Viva**: Exemplos para sua equipe

## <ion-icon name="download-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Como Usar Templates

### 1. Encontrar Templates

#### Marketplace Oficial

1. Acesse [n8n.io/templates](https://n8n.io/templates)
2. Navegue por categorias ou use busca
3. Filtre por popularidade, data ou tipo

#### Comunidade

- **GitHub**: Repositórios da comunidade
- **Fóruns**: Compartilhamentos em discussões
- **Blogs**: Templates em artigos e tutoriais

### 2. Importar Template

#### Via Interface Web

1. **Copie o JSON** do template
2. No n8n, clique em **"Import from URL"**
3. Cole o JSON e clique em **"Import"**
4. Configure credenciais necessárias

#### Via Arquivo

1. **Baixe o arquivo JSON** do template
2. No n8n, clique em **"Import from File"**
3. Selecione o arquivo baixado
4. Configure credenciais necessárias

### 3. Configurar Template

Após importar:

1. **Revise o workflow** para entender a lógica
2. **Configure credenciais** necessárias
3. **Ajuste parâmetros** para seu caso
4. **Teste a execução** antes de usar

## <ion-icon name="settings-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Categorias Populares

### Comunicação

- **Notificações por Email**: Alertas automáticos
- **Integração com Slack**: Mensagens e webhooks
- **WhatsApp Business**: Automação de mensagens
- **SMS Automatizado**: Notificações por texto

### E-commerce

- **Sincronização de Pedidos**: Entre plataformas
- **Atualização de Estoque**: Controle automático
- **Notificações de Cliente**: Follow-ups automáticos
- **Relatórios de Vendas**: Análises automáticas

### Marketing

- **Automação de Email**: Sequências de marketing
- **Integração com CRM**: Sincronização de leads
- **Análise de Redes Sociais**: Monitoramento de menções
- **Relatórios de Campanha**: Métricas automáticas

### Financeiro

- **Conciliação Bancária**: Sincronização de transações
- **Relatórios Financeiros**: Geração automática
- **Notificações de Pagamento**: Alertas de recebimento
- **Integração com Contabilidade**: Sincronização de dados

## <ion-icon name="create-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Como Criar Templates

### 1. Desenvolver o Workflow

1. **Crie um workflow** funcional e bem estruturado
2. **Teste completamente** antes de compartilhar
3. **Documente a lógica** com comentários
4. **Use nomes descritivos** para nodes

### 2. Preparar para Compartilhamento

#### Limpar Dados Sensíveis

- **Remova credenciais** específicas
- **Substitua dados reais** por exemplos
- **Use variáveis** para configurações
- **Documente dependências** necessárias

#### Adicionar Documentação

```markdown
# Nome do Template

## Descrição
Breve descrição do que o workflow faz.

## Pré-requisitos
- Credenciais necessárias
- Configurações específicas
- Dependências externas

## Como Usar
1. Importe o template
2. Configure credenciais
3. Ajuste parâmetros
4. Execute o workflow

## Personalização
Dicas para adaptar o template.
```

### 3. Compartilhar o Template

#### Marketplace Oficial

1. Acesse [n8n Creator Hub](https://www.notion.so/n8n/n8n-Creator-hub-7bd2cbe0fce0449198ecb23ff4a2f76f)
2. Siga o processo de submissão
3. Aguarde revisão da equipe
4. Template publicado no marketplace

#### Comunidade

- **GitHub**: Crie um repositório público
- **Fóruns**: Compartilhe em discussões
- **Blogs**: Escreva artigos com templates

## <ion-icon name="warning-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Boas Práticas

### Ao Usar Templates

1. **Revise o código** antes de executar
2. **Configure credenciais** adequadamente
3. **Teste em ambiente** de desenvolvimento
4. **Personalize** para suas necessidades
5. **Documente** suas modificações

### Ao Criar Templates

1. **Mantenha simplicidade** na estrutura
2. **Use nomes descritivos** para nodes
3. **Adicione comentários** explicativos
4. **Teste com dados** de exemplo
5. **Documente dependências** claramente

### Segurança

- **Nunca inclua credenciais** reais
- **Use dados de exemplo** representativos
- **Valide inputs** e outputs
- **Teste casos de erro** comuns

## <ion-icon name="arrow-forward-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Próximos Passos

1. **[Explorar Integrações](../app-nodes/)** - Conectar com serviços
2. **[Criar Workflows](../usando-n8n/workflows/criar-editar)** - Desenvolver automações
3. **[Contribuir com Templates](../../contribuir/n8n-oficial/contribuir-modelos)** - Compartilhar conhecimento

## <ion-icon name="help-circle-outline" style={{ fontSize: '24px', color: '#ea4b71' }}></ion-icon> Recursos Úteis

### Links Externos

- **[n8n Templates](https://n8n.io/templates)** - Marketplace oficial
- **[n8n Creator Hub](https://www.notion.so/n8n/n8n-Creator-hub-7bd2cbe0fce0449198ecb23ff4a2f76f)** - Submissão de templates
- **[GitHub Examples](https://github.com/n8n-io/n8n/tree/master/packages/cli/templates)** - Exemplos oficiais

### Documentação Relacionada

- **[Criar Workflows](../usando-n8n/workflows/criar-editar)** - Desenvolvimento de workflows
- **[Integrações](../app-nodes/)** - Conectores disponíveis
- **[Contribuir](../../contribuir/n8n-oficial/contribuir-modelos)** - Como compartilhar templates

---

**<ion-icon name="library-outline" style={{ fontSize: '16px', color: '#ea4b71' }}></ion-icon> Templates aceleram sua jornada de automação!** 