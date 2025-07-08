---
sidebar_position: 1
title: Instalação
sidebar_label: Visão Geral
---
import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="cloud-download-outline" size={32} /> Visão Geral da Instalação

Existem várias maneiras de instalar e executar o n8n, desde um simples comando npx até deploy em clusters Kubernetes. Escolha a opção que melhor se adapta à sua necessidade.

## <IonicIcon name="options-outline" size={24} color="#ea4b71" /> Escolha seu Método de Instalação

O n8n oferece múltiplas formas de instalação para atender diferentes necessidades e níveis de experiência:

### <IonicIcon name="logo-docker" size={20} color="#10b981" /> Docker (Recomendado para Produção)
Containerização completa com isolamento e facilidade de deployment.
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Melhor para:** Produção, ambientes isolados
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Vantagens:** Isolamento, portabilidade, fácil escalabilidade
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Requisitos:** Docker instalado

<IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" /> **[ Ver guia Docker →](./instalacao/docker)**

### <IonicIcon name="logo-npm" size={20} color="#10b981" /> NPM (Ideal para Desenvolvimento)
Instalação direta via Node Package Manager.
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Melhor para:** Desenvolvimento, testes locais
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Vantagens:** Instalação rápida, controle total
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Requisitos:** Node.js 18+ e npm

<IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" /> **[ Ver guia NPM →](./instalacao/npm)**

### <IonicIcon name="cloud-outline" size={20} color="#10b981" /> Cloud (Solução Gerenciada)
Plataforma n8n Cloud totalmente gerenciada.
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Melhor para:** Uso empresarial, sem manutenção
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Vantagens:** Zero configuração, suporte oficial
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Requisitos:** Apenas uma conta

<IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" /> **[ Ver guia Cloud →](./instalacao/cloud)**

### <IonicIcon name="desktop-outline" size={20} color="#10b981" /> Desktop (Interface Nativa)
Aplicação desktop para uso local.
- <IonicIcon name="checkmark-outline" size={16} color="#6b7280" /> **Melhor para:** Usuários não-técnicos, uso pessoal
- <IonicIcon name="star-outline" size={16} color="#6b7280" /> **Vantagens:** Interface nativa, instalação simples
- <IonicIcon name="construct-outline" size={16} color="#6b7280" /> **Requisitos:** Windows, macOS ou Linux

<IonicIcon name="arrow-forward-outline" size={16} color="#ea4b71" /> **[ Ver guia Desktop →](./instalacao/desktop)**

## <IonicIcon name="help-circle-outline" size={24} color="#ea4b71" /> Qual Método Escolher?

### <IonicIcon name="code-outline" size={20} color="#10b981" /> Para Desenvolvimento Local
```
NPM → Flexibilidade total
Docker → Ambiente isolado
Desktop → Interface amigável
```

### <IonicIcon name="rocket-outline" size={20} color="#10b981" /> Para Produção
```
Docker → Containerização robusta
Cloud → Solução gerenciada
NPM → Controle granular
```

### <IonicIcon name="business-outline" size={20} color="#10b981" /> Para Empresas
```
Cloud → Suporte oficial + SLA
Docker → Deploy próprio
NPM → Controle total
```

## <IonicIcon name="hardware-chip-outline" size={24} color="#ea4b71" /> Requisitos Gerais

Independente do método escolhido, certifique-se de ter:

### <IonicIcon name="speedometer-outline" size={20} color="#10b981" /> Requisitos Mínimos
- <IonicIcon name="hardware-chip-outline" size={16} color="#6b7280" /> **RAM:** 512 MB (2GB+ recomendado)
- <IonicIcon name="cpu-outline" size={16} color="#6b7280" /> **CPU:** 1 core (2+ cores recomendado)
- <IonicIcon name="save-outline" size={16} color="#6b7280" /> **Armazenamento:** 1GB (10GB+ para produção)
- <IonicIcon name="globe-outline" size={16} color="#6b7280" /> **Rede:** Porta 5678 disponível (ou personalizada)

### Requisitos por SO
| Sistema | Suporte | Notas |
|---------|---------|-------|
| **Linux** | Completo | Recomendado para produção |
| **macOS** | Completo | Ótimo para desenvolvimento |
| **Windows** | Completo | Use WSL2 para melhor performance |

## Início Rápido

Para testar rapidamente o n8n:

```bash
# Usando Docker (mais rápido)
docker run -it --rm -p 5678:5678 n8nio/n8n

# Usando NPM (mais direto)
npx n8n
```

:::tip Dica
Para uma primeira experiência, recomendamos começar com o **Docker** para produção ou **NPM** para desenvolvimento local.
:::

## Próximos Passos

Após a instalação:

1. **[Configuração](./configuracao/variaveis-ambiente)** - Variables de ambiente essenciais
2. **[Segurança](./seguranca/autenticacao)** - Configurar autenticação e HTTPS
3. **[Escalonamento](./escalonamento/clustering)** - Preparar para crescimento

## Precisa de Ajuda?

- **[Troubleshooting](../../referencia/troubleshooting)** - Problemas comuns
- **[Comunidade n8n](https://community.n8n.io)** - Fórum oficial
- **[GitHub Issues](https://github.com/n8n-io/n8n/issues)** - Reportar bugs

---

** Escolha seu método preferido acima e siga o guia específico para começar!** 
