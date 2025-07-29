<div align="center">
<img src="https://raw.githubusercontent.com/n8n-brasil/n8n-Doc-PT-BR/main/static/img/banner_n8n_ptbr.png" alt="Banner da Documentação n8n PT-BR - Automação de Workflows em Português" width="800">
</div>

# N8N Documentation BR

> Documentação NÃO‑OFICIAL do n8n.
> _Este projeto não possui vínculo com o time oficial do n8n e serve como complemento, referência e apoio aos usuários do Brasil._

[![Deploy Status](https://github.com/n8n-brasil/n8n-Doc-PT-BR/workflows/Deploy%20Docusaurus%20to%20GitHub%20Pages/badge.svg)](https://github.com/n8n-brasil/n8n-Doc-PT-BR/actions)
[![Sync Release Notes](https://github.com/n8n-brasil/n8n-Doc-PT-BR/workflows/Sync%20n8n%20Release%20Notes/badge.svg)](https://github.com/n8n-brasil/n8n-Doc-PT-BR/actions)
[![Sync Releases](https://github.com/n8n-brasil/n8n-Doc-PT-BR/workflows/Sync%20n8n%20Official%20Releases/badge.svg)](https://github.com/n8n-brasil/n8n-Doc-PT-BR/actions)

[![GitHub stars](https://img.shields.io/github/stars/n8n-brasil/n8n-Doc-PT-BR?style=social)](https://github.com/n8n-brasil/n8n-Doc-PT-BR/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/n8n-brasil/n8n-Doc-PT-BR?style=social)](https://github.com/n8n-brasil/n8n-Doc-PT-BR/network)
[![GitHub issues](https://img.shields.io/github/issues/n8n-brasil/n8n-Doc-PT-BR)](https://github.com/n8n-brasil/n8n-Doc-PT-BR/issues)
[![GitHub license](https://img.shields.io/github/license/n8n-brasil/n8n-Doc-PT-BR)](https://github.com/n8n-brasil/n8n-Doc-PT-BR/blob/main/LICENSE)

Documentação completa do n8n em português brasileiro - Hub de conhecimento para a comunidade brasileira de automação

---

## O que é o n8n?

> **n8n - Automação de Workflows Segura para Times Técnicos**

O n8n é uma plataforma de automação de workflows que oferece a times técnicos a flexibilidade do código com a velocidade do _no-code_. Com mais de 400 integrações, capacidades nativas de IA e uma licença _fair-code_, o n8n permite que você construa automações poderosas enquanto mantém controle total sobre seus dados e deployments.

<p align="center">
<a href="https://n8n.io" target="_blank"><img src="https://img.shields.io/badge/Site_Oficial-n8n.io-blueviolet?style=for-the-badge" alt="Site Oficial n8n.io"></a>
<a href="https://docs.n8n.io" target="_blank"><img src="https://img.shields.io/badge/Documentação-Oficial-blue?style=for-the-badge" alt="Documentação Oficial"></a>
<a href="https://n8n.io/integrations" target="_blank"><img src="https://img.shields.io/badge/Integrações-400%2B-green?style=for-the-badge" alt="Integrações"></a>
<a href="https://n8n.io/templates" target="_blank"><img src="https://img.shields.io/badge/Templates-Workflows-orange?style=for-the-badge" alt="Templates de Workflows"></a>
<a href="https://community.n8n.io" target="_blank"><img src="https://img.shields.io/badge/Fórum-Comunidade-ff4a73?style=for-the-badge" alt="Fórum da Comunidade"></a>
</p>

---

## Projeto Documentação n8n Pt-BR

Esta iniciativa **não oficial** foi criada por [Tatiana Barros](https://github.com/tatyquebralayout) e [Carlos de Lima Junior](https://github.com/CJBiohacker), com a proposta de tornar a experiência com o n8n mais acessível à comunidade brasileira.

Inspirada pela documentação oficial, esta versão em português busca **complementar** o conteúdo original, eliminando barreiras linguísticas e criando uma ponte de aprendizado para quem está começando ou deseja se aprofundar no universo da automação.

Além de compartilhar conhecimento, este projeto convida qualquer pessoa a praticar e evoluir em **escrita técnica**, promovendo um espaço aberto para colaboração, troca de experiências e fortalecimento do ecossistema n8n no Brasil.

A Documentação n8n Pt-BR é **comunitária, open source e em evolução constante** — feita por devs, para devs.

---

## O que você vai encontrar

A documentação está organizada nas seguintes seções principais:

- **[Usando n8n](/intro):** Do zero ao seu primeiro workflow. Aprenda os conceitos básicos, a usar a interface e a manipular dados.
- **[Deployment](/hosting-n8n/instalacao):** Guias completos para hospedar e configurar o n8n em diferentes ambientes, de Docker a nuvens públicas.
- **[Cursos](/cursos):** Conteúdo estruturado em formato de texto e vídeo para aprendizado sequencial, do nível básico ao avançado.
- **[Comunidade](/contribuir):** Saiba como contribuir para este projeto e para o ecossistema n8n.
- **[Referência](/referencia):** Guias de migração, dicas de performance, solução de problemas e um glossário de termos técnicos.
- **[Release Notes](/release-notes/index):** Fique por dentro de todas as novidades, melhorias e correções a cada versão do n8n. <!-- Temporariamente desabilitado -->

---

## Estrutura da Documentação

Nossa documentação está organizada de forma lógica e intuitiva:

### **Seções Principais**
- **`/intro`** - Introdução e conceitos fundamentais
- **`/primeiros-passos`** - Guias de instalação e primeiros workflows
- **`/usando-n8n`** - Uso prático da plataforma
- **`/integracoes`** - Catálogo de integrações e nodes
- **`/integracoes-br`** - Integrações específicas do Brasil
- **`/logica-e-dados`** - Manipulação de dados e lógica de workflows
- **`/hosting-n8n`** - Deployment e hospedagem
- **`/embed`** - Integração do n8n em aplicações
- **`/cursos`** - Cursos estruturados em texto e vídeo
- **`/comunidade`** - Recursos da comunidade
- **`/contribuir`** - Como contribuir com o projeto
- **`/referencia`** - Guias técnicos e glossário
- **`/privacidade-seguranca`** - LGPD e boas práticas de segurança
- **`/advanced-ai`** - Recursos avançados de IA
- **`/api`** - Documentação da API
- **`/catalogo`** - Catálogo de serviços e integrações

### **Sistema de Validação de Overlaps**
Para manter a qualidade e evitar redundâncias, implementamos um sistema automatizado de validação:

- **Configuração centralizada**: `sidebars.json` define a estrutura hierárquica
- **Detecção automática**: Script identifica conteúdo duplicado e similar
- **Guidelines claras**: CONTRIBUTING.md com diretrizes para evitar overlaps
- **Relatórios detalhados**: Análise completa de problemas estruturais

**Comandos de validação:**
```bash
npm run validate-overlaps  # Executar validação completa
npm run check-overlaps     # Comando alternativo
```

**Status de validação:**
- <ion-icon name="checkmark-circle-outline" style="color: green;"></ion-icon> **Validado** - Conteúdo revisado e sem overlaps
- <ion-icon name="time-outline" style="color: orange;"></ion-icon> **Em Progresso** - Conteúdo em desenvolvimento
- <ion-icon name="alert-circle-outline" style="color: red;"></ion-icon> **Overlaps Detectados** - Requer revisão

---

## Onde acessar

- **Documentação online:**
[https://n8n-brasil.github.io/n8n-Doc-PT-BR/](https://n8n-brasil.github.io/n8n-Doc-PT-BR/)

---

## Como Contribuir com a Documentação Brasileira

Este é um projeto de código aberto, feito para a comunidade BR n8n, e sua ajuda é fundamental para mantermos a documentação rica e atualizada. Qualquer pessoa pode sugerir melhorias, corrigir erros, criar novos tutoriais ou ajudar na revisão!

- **Para um guia técnico rápido** sobre como configurar seu ambiente e submeter sua primeira contribuição, veja nosso arquivo: [`CONTRIBUTING.md`](./CONTRIBUTING.md).
- **[Contribuir com esta Documentação](/docs/contribuir/esta-documentacao/)**: Se você quer ajudar a melhorar esta documentação, corrigindo textos, adicionando exemplos ou traduzindo, comece por aqui.
- **[Contribuir com o n8n (Oficial)](/docs/contribuir/projeto-n8n/)**: Se seu objetivo é colaborar diretamente com o código-fonte do n8n, criar novos nodes ou participar da documentação oficial em inglês.

Agradecemos imensamente a todos que dedicam seu tempo para fortalecer o n8n no Brasil!

---

## Configuração e Ambiente Local

> Para rodar o projeto localmente e contribuir, siga as instruções detalhadas no nosso guia de contribuição.

Para ver os passos completos, consulte o arquivo: **[`CONTRIBUTING.md`](./CONTRIBUTING.md)**

---

## 🚀 Como Executar

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (recomendado)
npm run start:smart

# Ou usar comandos alternativos:
npm run start:clean    # Mata processos na porta 3000 e inicia
npm run start:alt      # Inicia na porta 3001
npm run dev           # Comando tradicional
```

### Comandos Úteis

```bash
# Matar processos nas portas 3000, 3001, 3002
npm run kill-port

# Build para produção
npm run build

# Servir build de produção
npm run serve
```

### Solução de Problemas

**Porta 3000 em uso:**

```bash
# Opção 1: Usar o comando inteligente
npm run start:smart

# Opção 2: Matar processos manualmente
npm run kill-port
npm run start

# Opção 3: Usar porta alternativa
npm run start:alt
```

---

Desenvolvido com carinho para a comunidade n8n Brasil.

> _Esta documentação é independente e não substitui a [documentação oficial do n8n](https://docs.n8n.io/)._
