# 🎨 Paleta de Cores - n8n Documentation Brasil

## 🎯 Paleta Principal

### 🔥 **Cor Primária Principal**
```css
--ifm-color-primary: #ea4b71;
```
**#ea4b71** - Cor vibrante característica da marca n8n

### 🌈 **Variações da Cor Primária**
```css
--ifm-color-primary-dark: #E84B3D;     /* Cinnabar - cor oficial mais escura */
--ifm-color-primary-darker: #f8591a;   /* Laranja intenso n8n */
--ifm-color-primary-darkest: #E63E26;  /* Tom mais escuro */
--ifm-color-primary-light: #FF7D6D;    /* Tom mais claro */
--ifm-color-primary-lighter: #FF9189;  /* Tom ainda mais claro */
--ifm-color-primary-lightest: #FFA399; /* Tom mais suave */
```

## 🔍 **Análise Técnica das Cores**

### **#ea4b71** (Cor Principal)
- **RGB:** 234, 75, 113
- **HSL:** 342°, 78%, 61%
- **CMYK:** 0%, 68%, 52%, 8%
- **Uso:** Logo, botões primários, links, destaques

### **#E84B3D** (Cinnabar)
- **RGB:** 232, 75, 61
- **HSL:** 5°, 79%, 57%
- **CMYK:** 0%, 68%, 74%, 9%
- **Uso:** Hover states, elementos ativos

### **#f8591a** (Laranja Intenso)
- **RGB:** 248, 89, 26
- **HSL:** 17°, 94%, 54%
- **CMYK:** 0%, 64%, 90%, 3%
- **Uso:** Elementos secundários, ênfases

## 🎨 **Cores Secundárias Implementadas**

```css
/* Cores funcionais baseadas na marca n8n */
--ifm-color-secondary: #f8591a;      /* Laranja intenso oficial */
--ifm-color-accent: #E84B3D;         /* Cinnabar para destaques */
--ifm-color-success: #10b981;        /* Verde para sucesso */
--ifm-color-warning: #f59e0b;        /* Amarelo para avisos */
--ifm-color-danger: #ef4444;         /* Vermelho para erros */
--ifm-color-info: #0ea5e9;           /* Azul para informações */
```

## 🌗 **Adaptação para Dark Mode**

### **Light Mode**
- **Ícone:** `#ea4b71` (cor n8n)
- **Texto:** `#2D2D2D` (cinza escuro)
- **Background:** `#FFFFFF` (branco)

### **Dark Mode**
- **Ícone:** `#ea4b71` (mantém a cor)
- **Texto:** `#FFFFFF` (branco)
- **Background:** `#1b1b1d` (cinza muito escuro)

## 📐 **Logo Oficial SVG**

### **Estrutura**
O logo oficial n8n consiste em 2 paths SVG:

1. **`path-icon`** - O ícone com círculos conectados
2. **`path-name`** - O texto "n8n"

### **Implementação**
- **Arquivo Light:** `static/img/n8n-logo.svg`
- **Arquivo Dark:** `static/img/n8n-logo-dark.svg`
- **Dimensões:** 120x40px (padrão navbar)

## 🎯 **Guidelines de Uso**

### ✅ **Permitido**
- Usar `#ea4b71` como cor principal em qualquer elemento
- Aplicar variações da paleta para estados hover/active
- Manter proporções do logo SVG original
- Adaptar cores do texto para dark/light mode

### ❌ **Evitar**
- Alterar a cor `#ea4b71` do ícone
- Distorcer as proporções do logo
- Usar cores fora da paleta oficial
- Combinar com cores que conflitem visualmente

## 🔗 **Referências**

### **Fontes das Cores**
- **Marca oficial n8n** - https://n8n.io
- **Path SVG oficial** - Fornecido diretamente da marca
- **Análise de cores** - ColorHexa, Figma Color Tools

### **Verificação de Acessibilidade**
- **Contraste mínimo:** 4.5:1 (WCAG AA)
- **Teste em:** Light mode, Dark mode, Daltônicos
- **Ferramentas:** WebAIM Contrast Checker

---

**📝 Nota:** Esta paleta foi cuidadosamente selecionada para manter a identidade visual oficial do n8n enquanto garante uma experiência excepcional para a comunidade brasileira.

**🎨 Atualizado:** Janeiro 2025 - Cores extraídas diretamente da marca oficial n8n 