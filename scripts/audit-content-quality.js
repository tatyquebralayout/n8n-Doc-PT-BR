#!/usr/bin/env node

/**
 * 🔍 Script de Auditoria de Qualidade de Conteúdo
 * Analisa automaticamente a documentação e identifica problemas de conteúdo
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

const REPO_OWNER = process.env.REPO_OWNER || 'tatyquebralayout';
const REPO_NAME = process.env.REPO_NAME || 'n8n-Doc-pt-BR';
const DOCS_PATH = path.join(__dirname, '..', 'docs');

// Critérios de qualidade para análise
const QUALITY_CRITERIA = {
  minContentLength: 500, // Mínimo de caracteres
  maxContentLength: 10000, // Máximo recomendado
  requiredSections: ['## ', '### '], // Deve ter pelo menos 2 níveis de heading
  commonIssues: [
    'Em construção',
    'TODO',
    'FIXME',
    'XXX',
    'em breve',
    'será implementado',
    'falta implementar'
  ],
  brokenPatterns: [
    /\[.*\]\(#\)/g, // Links vazios
    /\[.*\]\(\)/g, // Links vazios
    /!\[.*\]\(\)/g, // Imagens vazias
    /\[.*\]\(http:\/\/\)/g, // Links HTTP inseguros
  ],
  qualityIndicators: [
    'exemplo',
    'tutorial',
    'passo a passo',
    'código',
    'screenshot',
    'imagem',
    'vídeo'
  ]
};

class ContentAuditor {
  constructor() {
    this.results = {
      totalFiles: 0,
      issues: [],
      recommendations: [],
      statistics: {
        emptyFiles: 0,
        shortContent: 0,
        longContent: 0,
        missingHeadings: 0,
        brokenLinks: 0,
        constructionPages: 0,
        qualityScore: 0
      }
    };
  }

  async auditAllContent() {
    console.log('🔍 Iniciando auditoria de qualidade de conteúdo...\n');
    
    await this.scanDirectory(DOCS_PATH);
    this.calculateQualityScore();
    this.generateRecommendations();
    
    console.log('📊 Auditoria concluída!\n');
    this.printResults();
    
    return this.results;
  }

  async scanDirectory(dirPath, relativePath = '') {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const itemRelativePath = path.join(relativePath, item);
      
      if (fs.statSync(fullPath).isDirectory()) {
        await this.scanDirectory(fullPath, itemRelativePath);
      } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
        await this.auditFile(fullPath, itemRelativePath);
      }
    }
  }

  async auditFile(filePath, relativePath) {
    this.results.totalFiles++;
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const contentLength = content.length;
      const issues = [];
      
      // 1. Verificar conteúdo vazio ou muito curto
      if (contentLength === 0) {
        this.results.statistics.emptyFiles++;
        issues.push({
          type: 'empty_file',
          severity: 'high',
          message: 'Arquivo completamente vazio'
        });
      } else if (contentLength < QUALITY_CRITERIA.minContentLength) {
        this.results.statistics.shortContent++;
        issues.push({
          type: 'short_content',
          severity: 'medium',
          message: `Conteúdo muito curto (${contentLength} caracteres, mínimo recomendado: ${QUALITY_CRITERIA.minContentLength})`
        });
      }
      
      // 2. Verificar conteúdo muito longo
      if (contentLength > QUALITY_CRITERIA.maxContentLength) {
        this.results.statistics.longContent++;
        issues.push({
          type: 'long_content',
          severity: 'low',
          message: `Conteúdo muito longo (${contentLength} caracteres, máximo recomendado: ${QUALITY_CRITERIA.maxContentLength})`
        });
      }
      
      // 3. Verificar estrutura de headings
      const hasHeadings = QUALITY_CRITERIA.requiredSections.some(section => content.includes(section));
      if (!hasHeadings && contentLength > QUALITY_CRITERIA.minContentLength) {
        this.results.statistics.missingHeadings++;
        issues.push({
          type: 'missing_headings',
          severity: 'medium',
          message: 'Falta estrutura de headings (##, ###)'
        });
      }
      
      // 4. Verificar indicadores de conteúdo em construção
      const constructionIndicators = QUALITY_CRITERIA.commonIssues.filter(issue => 
        content.toLowerCase().includes(issue.toLowerCase())
      );
      if (constructionIndicators.length > 0) {
        this.results.statistics.constructionPages++;
        issues.push({
          type: 'under_construction',
          severity: 'high',
          message: `Página em construção: ${constructionIndicators.join(', ')}`
        });
      }
      
      // 5. Verificar links quebrados
      const brokenLinks = [];
      QUALITY_CRITERIA.brokenPatterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
          brokenLinks.push(...matches);
        }
      });
      if (brokenLinks.length > 0) {
        this.results.statistics.brokenLinks++;
        issues.push({
          type: 'broken_links',
          severity: 'high',
          message: `Links quebrados encontrados: ${brokenLinks.length}`
        });
      }
      
      // 6. Verificar indicadores de qualidade
      const qualityIndicators = QUALITY_CRITERIA.qualityIndicators.filter(indicator => 
        content.toLowerCase().includes(indicator.toLowerCase())
      );
      const qualityScore = qualityIndicators.length;
      
      if (issues.length > 0) {
        this.results.issues.push({
          file: relativePath,
          path: filePath,
          contentLength,
          qualityScore,
          issues
        });
      }
      
    } catch (error) {
      this.results.issues.push({
        file: relativePath,
        path: filePath,
        issues: [{
          type: 'read_error',
          severity: 'high',
          message: `Erro ao ler arquivo: ${error.message}`
        }]
      });
    }
  }

  calculateQualityScore() {
    const totalFiles = this.results.totalFiles;
    const problemFiles = this.results.issues.length;
    const healthyFiles = totalFiles - problemFiles;
    
    this.results.statistics.qualityScore = Math.round((healthyFiles / totalFiles) * 100);
  }

  generateRecommendations() {
    const stats = this.results.statistics;
    const recommendations = [];
    
    // Recomendações baseadas nos problemas encontrados
    if (stats.emptyFiles > 0) {
      recommendations.push({
        priority: 'high',
        category: 'conteúdo',
        title: 'Arquivos Vazios',
        description: `${stats.emptyFiles} arquivos estão completamente vazios`,
        action: 'Adicionar conteúdo ou remover arquivos desnecessários'
      });
    }
    
    if (stats.constructionPages > 0) {
      recommendations.push({
        priority: 'high',
        category: 'conteúdo',
        title: 'Páginas em Construção',
        description: `${stats.constructionPages} páginas estão marcadas como "em construção"`,
        action: 'Completar conteúdo ou remover páginas temporárias'
      });
    }
    
    if (stats.shortContent > 0) {
      recommendations.push({
        priority: 'medium',
        category: 'qualidade',
        title: 'Conteúdo Insuficiente',
        description: `${stats.shortContent} páginas têm conteúdo muito curto`,
        action: 'Expandir conteúdo com mais detalhes, exemplos e explicações'
      });
    }
    
    if (stats.brokenLinks > 0) {
      recommendations.push({
        priority: 'high',
        category: 'navegação',
        title: 'Links Quebrados',
        description: `${stats.brokenLinks} arquivos contêm links quebrados`,
        action: 'Corrigir ou remover links que não funcionam'
      });
    }
    
    if (stats.missingHeadings > 0) {
      recommendations.push({
        priority: 'medium',
        category: 'estrutura',
        title: 'Estrutura de Headings',
        description: `${stats.missingHeadings} páginas não têm estrutura clara de headings`,
        action: 'Adicionar títulos e subtítulos para melhor organização'
      });
    }
    
    // Recomendações gerais de qualidade
    if (stats.qualityScore < 70) {
      recommendations.push({
        priority: 'high',
        category: 'geral',
        title: 'Qualidade Geral Baixa',
        description: `Score de qualidade: ${stats.qualityScore}%`,
        action: 'Priorizar revisão e melhoria do conteúdo existente'
      });
    }
    
    this.results.recommendations = recommendations;
  }

  printResults() {
    console.log('📈 **RELATÓRIO DE QUALIDADE DE CONTEÚDO**\n');
    
    // Estatísticas gerais
    console.log('📊 **Estatísticas Gerais:**');
    console.log(`   📄 Total de arquivos: ${this.results.totalFiles}`);
    console.log(`   ⚠️  Arquivos com problemas: ${this.results.issues.length}`);
    console.log(`   ✅ Score de qualidade: ${this.results.statistics.qualityScore}%\n`);
    
    // Problemas por categoria
    console.log('🚨 **Problemas Encontrados:**');
    console.log(`   📭 Arquivos vazios: ${this.results.statistics.emptyFiles}`);
    console.log(`   📝 Conteúdo insuficiente: ${this.results.statistics.shortContent}`);
    console.log(`   🚧 Páginas em construção: ${this.results.statistics.constructionPages}`);
    console.log(`   🔗 Links quebrados: ${this.results.statistics.brokenLinks}`);
    console.log(`   📋 Sem estrutura de headings: ${this.results.statistics.missingHeadings}\n`);
    
    // Top 10 arquivos com mais problemas
    console.log('🔥 **Top 10 Arquivos com Mais Problemas:**');
    const topProblems = this.results.issues
      .sort((a, b) => b.issues.length - a.issues.length)
      .slice(0, 10);
    
    topProblems.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file.file} (${file.issues.length} problemas)`);
      file.issues.forEach(issue => {
        const emoji = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢';
        console.log(`      ${emoji} ${issue.message}`);
      });
    });
    
    // Recomendações
    console.log('\n💡 **Recomendações Prioritárias:**');
    this.results.recommendations
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .forEach((rec, _index) => {
        const emoji = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
        console.log(`   ${emoji} **${rec.title}** (${rec.category})`);
        console.log(`      ${rec.description}`);
        console.log(`      ➡️  ${rec.action}\n`);
      });
  }

  async createGitHubIssues() {
    if (!process.env.GITHUB_TOKEN) {
      console.log('⚠️  GITHUB_TOKEN não encontrado. Pulando criação de issues...');
      return;
    }

    try {
      // Usar import dinâmico para o Octokit
      const { Octokit } = await import('@octokit/rest');
      const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
      
      console.log('🚀 Criando issues no GitHub baseadas na auditoria...\n');
      
      // Criar issue principal com relatório
      const reportBody = this.generateReportMarkdown();
      
      const { data: issue } = await octokit.rest.issues.create({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        title: `📊 Relatório de Auditoria de Conteúdo - ${new Date().toISOString().split('T')[0]}`,
        body: reportBody,
        labels: ['📝 Documentação', '🔍 Auditoria', '📊 Relatório']
      });
      
      console.log(`✅ Issue principal criada: ${issue.html_url}`);
      
      // Criar issues específicas para problemas críticos
      const criticalIssues = this.results.recommendations.filter(rec => rec.priority === 'high');
      
      for (const rec of criticalIssues) {
        const issueBody = this.generateIssueBody(rec);
        
        try {
          const { data: specificIssue } = await octokit.rest.issues.create({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            title: `🔴 [CRÍTICO] ${rec.title}`,
            body: issueBody,
            labels: ['📝 Documentação', '🔴 Crítica', '🔧 Manutenção']
          });
          
          console.log(`✅ Issue específica criada: ${specificIssue.html_url}`);
        } catch (error) {
          console.log(`❌ Erro ao criar issue para ${rec.title}: ${error.message}`);
        }
      }
      
    } catch (error) {
      console.log(`❌ Erro ao criar issues: ${error.message}`);
    }
  }

  generateReportMarkdown() {
    return `# 📊 Relatório de Auditoria de Conteúdo

## 📈 Estatísticas Gerais
- **Total de arquivos:** ${this.results.totalFiles}
- **Arquivos com problemas:** ${this.results.issues.length}
- **Score de qualidade:** ${this.results.statistics.qualityScore}%

## 🚨 Problemas Encontrados
- 📭 **Arquivos vazios:** ${this.results.statistics.emptyFiles}
- 📝 **Conteúdo insuficiente:** ${this.results.statistics.shortContent}
- 🚧 **Páginas em construção:** ${this.results.statistics.constructionPages}
- 🔗 **Links quebrados:** ${this.results.statistics.brokenLinks}
- 📋 **Sem estrutura de headings:** ${this.results.statistics.missingHeadings}

## 💡 Recomendações Prioritárias
${this.results.recommendations.map(rec => `
### ${rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢'} ${rec.title}
**Categoria:** ${rec.category}
**Descrição:** ${rec.description}
**Ação:** ${rec.action}
`).join('\n')}

## 📋 Arquivos com Mais Problemas
${this.results.issues.slice(0, 10).map((file, index) => `
${index + 1}. **${file.file}** (${file.issues.length} problemas)
${file.issues.map(issue => `   - ${issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢'} ${issue.message}`).join('\n')}
`).join('\n')}

---
*Relatório gerado automaticamente em ${new Date().toLocaleString('pt-BR')}*`;
  }

  generateIssueBody(recommendation) {
    return `## 🎯 Problema
${recommendation.description}

## 📋 Ação Necessária
${recommendation.action}

## 📊 Contexto
- **Categoria:** ${recommendation.category}
- **Prioridade:** ${recommendation.priority}
- **Identificado em:** ${new Date().toLocaleDateString('pt-BR')}

## ✅ Critérios de Aceitação
- [ ] Problema identificado e documentado
- [ ] Solução implementada
- [ ] Qualidade verificada
- [ ] Documentação atualizada

## 🔗 Referências
- Relatório completo de auditoria
- Guia de qualidade de conteúdo
- Padrões da documentação`;
  }
}

// Função principal
async function main() {
  try {
    const auditor = new ContentAuditor();
    await auditor.auditAllContent();
    
    // Perguntar se deve criar issues
    if (process.argv.includes('--create-issues')) {
      await auditor.createGitHubIssues();
    } else {
      console.log('\n💡 Para criar issues automaticamente, execute:');
      console.log('   node scripts/audit-content-quality.js --create-issues');
    }
    
  } catch (error) {
    console.error('❌ Erro durante auditoria:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { ContentAuditor };
