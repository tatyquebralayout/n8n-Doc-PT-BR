---
sidebar_position: 4
title: Instalação Desktop
description: Como instalar n8n Desktop para uso local e desenvolvimento
keywords: [n8n, desktop, instalação, local, desenvolvimento, windows, mac]
---

import IonicIcon from '@site/src/components/IonicIcon';

# <IonicIcon name="desktop-outline" size={32} color="#ea4b71" /> Instalação Desktop

Este guia detalha como **instalar n8n Desktop** para uso local e desenvolvimento, oferecendo uma experiência nativa e simplificada.

## <IonicIcon name="checkmark-circle-outline" size={24} color="#ea4b71" /> O que é o n8n Desktop?

O n8n Desktop é uma **aplicação nativa** que permite executar o n8n localmente sem necessidade de configurações complexas de servidor ou Docker. É ideal para usuários que preferem uma experiência mais simples e integrada ao sistema operacional.

### **Principais Características:**
- ✅ **Instalação simples** - Download e instalação direta
- ✅ **Interface nativa** - Integração com o sistema operacional
- ✅ **Sem configuração** - Funciona imediatamente após instalação
- ✅ **Sincronização** - Conecta com n8n Cloud
- ✅ **Offline** - Funciona sem conexão com internet
- ✅ **Portátil** - Pode ser executado de qualquer lugar

---

## <IonicIcon name="checkbox-outline" size={24} color="#ea4b71" /> Pré-requisitos

### **Requisitos do Sistema**
- **Sistema Operacional**: Windows 10+, macOS 10.15+, Linux (Ubuntu 18.04+)
- **RAM**: Mínimo 4GB, recomendado 8GB+
- **Disco**: 2GB livre para instalação
- **Processador**: Dual-core ou superior
- **Rede**: Conexão para download e atualizações

### **Requisitos Específicos por SO**

#### **Windows**
- Windows 10 ou superior (64-bit)
- .NET Framework 4.7.2 ou superior
- Visual C++ Redistributable

#### **macOS**
- macOS 10.15 (Catalina) ou superior
- Processador Intel ou Apple Silicon

#### **Linux**
- Ubuntu 18.04+ ou distribuição compatível
- GLIBC 2.17 ou superior

---

## <IonicIcon name="rocket-outline" size={24} color="#ea4b71" /> Instalação

### **Windows**

#### **Download e Instalação**
1. Acesse [n8n.io/desktop](https://n8n.io/desktop)
2. Baixe o instalador para Windows (.exe)
3. Execute o arquivo baixado
4. Siga o assistente de instalação
5. Inicie o n8n Desktop

#### **Instalação via Chocolatey**
```powershell
# Instalar Chocolatey (se necessário)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Instalar n8n Desktop
choco install n8n-desktop
```

#### **Instalação via Winget**
```powershell
winget install n8n.n8n-desktop
```

### **macOS**

#### **Download e Instalação**
1. Acesse [n8n.io/desktop](https://n8n.io/desktop)
2. Baixe o instalador para macOS (.dmg)
3. Abra o arquivo .dmg
4. Arraste o n8n para a pasta Applications
5. Inicie o n8n Desktop

#### **Instalação via Homebrew**
```bash
# Instalar Homebrew (se necessário)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar n8n Desktop
brew install --cask n8n-desktop
```

### **Linux**

#### **Ubuntu/Debian**
```bash
# Adicionar repositório
wget -qO- https://packages.n8n.io/gpg.key | sudo apt-key add -
echo "deb https://packages.n8n.io/ubuntu/ focal main" | sudo tee /etc/apt/sources.list.d/n8n.list

# Atualizar e instalar
sudo apt update
sudo apt install n8n-desktop
```

#### **Fedora/RHEL**
```bash
# Adicionar repositório
sudo dnf config-manager --add-repo https://packages.n8n.io/fedora/n8n.repo

# Instalar
sudo dnf install n8n-desktop
```

#### **Snap (Ubuntu)**
```bash
sudo snap install n8n-desktop
```

---

## <IonicIcon name="settings-outline" size={24} color="#ea4b71" /> Configuração Inicial

### **Primeiro Acesso**
1. **Inicie o n8n Desktop**
2. **Aguarde a inicialização** (pode levar alguns segundos)
3. **Acesse a interface** - geralmente em `http://localhost:5678`
4. **Crie sua conta** de administrador

### **Configurações Básicas**
```bash
# Configurações padrão
Porta: 5678
Protocolo: http
Host: localhost
Timezone: Sistema operacional
```

### **Configurações Avançadas**
```bash
# Arquivo de configuração (opcional)
# Windows: %APPDATA%\n8n\config.json
# macOS: ~/Library/Application Support/n8n/config.json
# Linux: ~/.config/n8n/config.json

{
  "port": 5678,
  "protocol": "http",
  "host": "localhost",
  "timezone": "America/Sao_Paulo",
  "logLevel": "info"
}
```

---

## <IonicIcon name="sync-outline" size={24} color="#ea4b71" /> Sincronização com n8n Cloud

### **Conectar com n8n Cloud**
1. **Abra o n8n Desktop**
2. **Vá em Settings > Cloud**
3. **Clique em "Connect to n8n Cloud"**
4. **Faça login** com sua conta n8n Cloud
5. **Escolha o workspace** para sincronizar

### **Sincronização de Workflows**
- **Upload**: Envie workflows locais para o Cloud
- **Download**: Baixe workflows do Cloud para local
- **Sync**: Mantenha ambos sincronizados
- **Backup**: Use o Cloud como backup automático

### **Configurações de Sincronização**
```json
{
  "cloudSync": {
    "enabled": true,
    "autoSync": true,
    "workspace": "seu-workspace",
    "syncInterval": 300000
  }
}
```

---

## <IonicIcon name="folder-outline" size={24} color="#ea4b71" /> Estrutura de Arquivos

### **Localização dos Dados**
```bash
# Windows
%APPDATA%\n8n\

# macOS
~/Library/Application Support/n8n/

# Linux
~/.config/n8n/
```

### **Diretórios Importantes**
```bash
n8n/
├── workflows/          # Workflows salvos
├── credentials/        # Credenciais
├── logs/              # Logs da aplicação
├── config.json        # Configurações
└── database.sqlite    # Banco de dados local
```

### **Backup Manual**
```bash
# Windows
xcopy "%APPDATA%\n8n" "C:\backup\n8n" /E /I

# macOS/Linux
cp -r ~/.config/n8n ~/backup/n8n
```

---

## <IonicIcon name="code-outline" size={24} color="#ea4b71" /> Desenvolvimento

### **Modo Desenvolvedor**
```bash
# Habilitar modo desenvolvedor
# Windows: n8n-desktop.exe --dev
# macOS: n8n-desktop --dev
# Linux: n8n-desktop --dev
```

### **Logs de Desenvolvimento**
```bash
# Windows
%APPDATA%\n8n\logs\desktop.log

# macOS
~/Library/Application Support/n8n/logs/desktop.log

# Linux
~/.config/n8n/logs/desktop.log
```

### **Configuração para Desenvolvimento**
```json
{
  "development": {
    "enabled": true,
    "logLevel": "debug",
    "devTools": true,
    "autoReload": true
  }
}
```

---

## <IonicIcon name="shield-checkmark-outline" size={24} color="#ea4b71" /> Segurança

### **Configurações de Segurança**
- **Autenticação local** - Conta de administrador
- **Criptografia** - Dados criptografados localmente
- **Firewall** - Use firewall do sistema operacional
- **Atualizações** - Mantenha sempre atualizado

### **Boas Práticas**
```bash
# Configurar firewall (Windows)
netsh advfirewall firewall add rule name="n8n Desktop" dir=in action=allow protocol=TCP localport=5678

# Configurar firewall (macOS)
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /Applications/n8n\ Desktop.app

# Configurar firewall (Linux)
sudo ufw allow 5678/tcp
```

---

## <IonicIcon name="bug-outline" size={24} color="#ea4b71" /> Troubleshooting

### **Problemas Comuns**

#### **Aplicação não inicia**
```bash
# Verificar logs
# Windows: %APPDATA%\n8n\logs\desktop.log
# macOS: ~/Library/Application Support/n8n/logs/desktop.log
# Linux: ~/.config/n8n/logs/desktop.log

# Reinstalar aplicação
# Desinstale e baixe novamente do site oficial
```

#### **Porta já em uso**
```bash
# Verificar processo usando a porta
# Windows
netstat -ano | findstr :5678

# macOS/Linux
lsof -i :5678

# Alterar porta na configuração
{
  "port": 5679
}
```

#### **Problemas de sincronização**
```bash
# Verificar conexão com internet
ping cloud.n8n.io

# Limpar cache de sincronização
# Remova a pasta de cache e reconecte
```

#### **Performance lenta**
```bash
# Verificar recursos do sistema
# Windows: Task Manager
# macOS: Activity Monitor
# Linux: htop

# Aumentar memória disponível
# Feche outras aplicações
```

---

## <IonicIcon name="sync-outline" size={24} color="#ea4b71" /> Atualizações

### **Atualizações Automáticas**
- **Habilitadas por padrão**
- **Verificação diária** de novas versões
- **Download automático** de atualizações
- **Instalação manual** requerida

### **Atualizações Manuais**
```bash
# Verificar versão atual
# Vá em Help > About

# Baixar nova versão
# Acesse n8n.io/desktop

# Instalar atualização
# Execute o novo instalador
```

### **Configurações de Atualização**
```json
{
  "updates": {
    "enabled": true,
    "checkInterval": 86400000,
    "autoDownload": true,
    "channel": "stable"
  }
}
```

---

## <IonicIcon name="help-circle-outline" size={24} color="#ea4b71" /> Suporte

### **Recursos de Ajuda**
- **Documentação oficial** - Guias detalhados
- **Community Forum** - Troca de experiências
- **Discord** - Suporte em tempo real
- **GitHub Issues** - Reportar bugs

### **Logs para Suporte**
```bash
# Coletar logs para suporte
# Windows
copy "%APPDATA%\n8n\logs\*" "C:\temp\n8n-logs\"

# macOS
cp ~/Library/Application\ Support/n8n/logs/* ~/Desktop/n8n-logs/

# Linux
cp ~/.config/n8n/logs/* ~/Desktop/n8n-logs/
```

---

## <IonicIcon name="arrow-forward-outline" size={24} color="#ea4b71" /> Próximos Passos

Agora que você tem o n8n Desktop instalado:

1. **[Criar Primeiro Workflow](../../primeiros-passos/primeiro-workflow)** - Aprenda a construir workflows
2. **[Conceitos Básicos](../../primeiros-passos/conceitos-basicos)** - Entenda os fundamentos
3. **[Integrações](../../integracoes/index)** - Conecte suas aplicações

### **Outros Métodos de Instalação**
- **[Docker](./docker)** - Containerização para produção
- **[NPM](./npm)** - Instalação local para desenvolvimento
- **[Cloud](./cloud)** - Serviço hospedado oficial

---

:::tip **Dica Pro**
O **n8n Desktop** é ideal para **usuários não-técnicos** e **desenvolvimento local**. Para **produção**, considere **n8n Cloud** ou **Docker**.
:::

:::info **Vantagens do Desktop**
- **Instalação simples** sem conhecimentos técnicos
- **Funciona offline** para desenvolvimento
- **Sincronização** com n8n Cloud
- **Interface nativa** integrada ao sistema
:::

:::warning **Limitações**
O **n8n Desktop** é para **uso pessoal** e **desenvolvimento**. Para **produção** e **equipes**, use **n8n Cloud** ou **self-hosted**.
:::

---

**<IonicIcon name="link-outline" size={16} color="#ea4b71" /> Links úteis:**
- <IonicIcon name="desktop-outline" size={16} color="#6b7280" /> [Download n8n Desktop](https://n8n.io/desktop)
- <IonicIcon name="document-text-outline" size={16} color="#6b7280" /> [Documentação oficial](https://docs.n8n.io/)
- <IonicIcon name="logo-github" size={16} color="#6b7280" /> [Repositório n8n](https://github.com/n8n-io/n8n)
