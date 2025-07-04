#!/usr/bin/env node

/**
 * 🔍 Análise de Lacunas de Conteúdo
 * Compara nossa documentação com a documentação oficial do n8n
 * e identifica conteúdo faltante ou desatualizado
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

const DOCS_PATH = path.join(__dirname, '..', 'docs');
const REPO_OWNER = process.env.REPO_OWNER || 'tatyquebralayout';
const REPO_NAME = process.env.REPO_NAME || 'n8n-Doc-pt-BR';

// Mapeamento da documentação oficial do n8n
const OFFICIAL_DOCS_STRUCTURE = {
  'getting-started': {
    priority: 'critical',
    pages: [
      'quickstarts',
      'introduction',
      'choose-your-n8n',
      'video-courses',
      'text-courses'
    ],
    description: 'Primeiros passos essenciais'
  },
  'using-n8n': {
    priority: 'high',
    pages: [
      'interface/editor-ui',
      'executions',
      'expressions',
      'variables',
      'credentials',
      'workflows'
    ],
    description: 'Como usar o n8n'
  },
  'integrations': {
    priority: 'critical',
    pages: [
      'builtin-nodes',
      'app-nodes',
      'trigger-nodes',
      'community-nodes',
      'creating-nodes'
    ],
    description: 'Integrações e nodes'
  },
  'hosting': {
    priority: 'high',
    pages: [
      'installation',
      'configuration',
      'security',
      'scaling',
      'database'
    ],
    description: 'Instalação e hosting'
  },
  'data': {
    priority: 'medium',
    pages: [
      'data-structure',
      'data-flow',
      'data-mapping',
      'binary-data',
      'data-editing'
    ],
    description: 'Manipulação de dados'
  },
  'flow-logic': {
    priority: 'medium',
    pages: [
      'splitting',
      'merging',
      'looping',
      'error-handling',
      'waiting',
      'subworkflows'
    ],
    description: 'Lógica de fluxo'
  },
  'advanced-ai': {
    priority: 'high',
    pages: [
      'ai-tutorial',
      'langchain',
      'examples',
      'evaluations'
    ],
    description: 'IA avançada'
  },
  'api': {
    priority: 'medium',
    pages: [
      'authentication',
      'endpoints',
      'playground',
      'pagination'
    ],
    description: 'API REST'
  },
  'embed': {
    priority: 'low',
    pages: [
      'prerequisites',
      'configuration',
      'deployment',
      'management'
    ],
    description: 'Incorporação'
  },
  'community': {
    priority: 'medium',
    pages: [
      'contributing',
      'code-of-conduct',
      'support',
      'resources'
    ],
    description: 'Comunidade'
  }
};

// Integrações brasileiras específicas que devemos ter
const BRAZILIAN_INTEGRATIONS = {
  'financeiro': {
    priority: 'high',
    integrations: [
      'pix',
      'boleto',
      'itau',
      'bradesco',
      'santander',
      'nubank',
      'mercado-pago',
      'pagseguro',
      'cielo',
      'stone'
    ]
  },
  'governo': {
    priority: 'high',
    integrations: [
      'receita-federal',
      'cnpj',
      'cpf',
      'sintegra',
      'nfe',
      'nfce',
      'sped',
      'e-social'
    ]
  },
  'localizacao': {
    priority: 'medium',
    integrations: [
      'viacep',
      'correios',
      'ibge',
      'maps-google-br',
      'loggi',
      'jadlog'
    ]
  },
  'ecommerce': {
    priority: 'medium',
    integrations: [
      'mercado-livre',
      'americanas',
      'magazine-luiza',
      'shopee',
      'olx',
      'enjoei'
    ]
  }
};

class ContentGapAnalyzer {
  constructor() {
    this.gaps = [];
    this.existingContent = new Map();
    this.recommendations = [];
  }

  async analyzeGaps() {
    console.log('🔍 Iniciando análise de lacunas de conteúdo...\n');
    
    // 1. Mapear conteúdo existente
    await this.mapExistingContent();
    
    // 2. Analisar lacunas da documentação oficial
    await this.analyzeOfficialDocsGaps();
    
    // 3. Analisar lacunas de integrações brasileiras
    await this.analyzeBrazilianIntegrationsGaps();
    
    // 4. Gerar recomendações
    this.generateRecommendations();
    
    // 5. Apresentar resultados
    this.presentResults();
    
    return {
      gaps: this.gaps,
      recommendations: this.recommendations,
      existingContent: Array.from(this.existingContent.entries())
    };
  }

  async mapExistingContent() {
    console.log('📋 Mapeando conteúdo existente...');
    
    const scanDirectory = (dir, basePath = '') => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativePath = path.join(basePath, item);
        
        if (fs.statSync(fullPath).isDirectory()) {
          scanDirectory(fullPath, relativePath);
        } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
          const content = fs.readFileSync(fullPath, 'utf8');
          const wordCount = content.split(/\s+/).length;
          const isComplete = !content.includes('Em construção') && 
                           !content.includes('TODO') && 
                           wordCount > 100;
          
          this.existingContent.set(relativePath, {
            path: fullPath,
            wordCount,
            isComplete,
            lastModified: fs.statSync(fullPath).mtime
          });
        }
      }
    };
    
    scanDirectory(DOCS_PATH);
    console.log(`   ✅ Mapeados ${this.existingContent.size} arquivos`);
  }

  async analyzeOfficialDocsGaps() {
    console.log('🔍 Analisando lacunas da documentação oficial...');
    
    for (const [section, info] of Object.entries(OFFICIAL_DOCS_STRUCTURE)) {
      const sectionGaps = [];
      
      for (const page of info.pages) {
        const possiblePaths = [
          `${section}/${page}.md`,
          `${section}/${page}.mdx`,
          `${section}/${page}/index.md`,
          `${section}/${page}/index.mdx`,
          // Variações em português
          `${section}/${page.replace(/-/g, '_')}.md`,
          `${section.replace(/-/g, '_')}/${page}.md`,
          // Mapeamentos específicos
          this.mapEnglishToPortuguese(section, page)
        ].filter(Boolean);
        
        const exists = possiblePaths.some(p => this.existingContent.has(p));
        
        if (!exists) {
          sectionGaps.push({
            section,
            page,
            priority: info.priority,
            description: info.description,
            suggestedPath: possiblePaths[0],
            type: 'missing'
          });
        } else {
          // Verificar se está completo
          const existingPath = possiblePaths.find(p => this.existingContent.has(p));
          const contentInfo = this.existingContent.get(existingPath);
          
          if (!contentInfo.isComplete) {
            sectionGaps.push({
              section,
              page,
              priority: info.priority,
              description: info.description,
              existingPath,
              type: 'incomplete',
              wordCount: contentInfo.wordCount
            });
          }
        }
      }
      
      if (sectionGaps.length > 0) {
        this.gaps.push({
          section,
          priority: info.priority,
          description: info.description,
          gaps: sectionGaps
        });
      }
    }
    
    console.log(`   ✅ Identificadas lacunas em ${this.gaps.length} seções`);
  }

  async analyzeBrazilianIntegrationsGaps() {
    console.log('🇧🇷 Analisando lacunas de integrações brasileiras...');
    
    for (const [category, info] of Object.entries(BRAZILIAN_INTEGRATIONS)) {
      const categoryGaps = [];
      
      for (const integration of info.integrations) {
        const possiblePaths = [
          `integracoes-br/${category}/${integration}.md`,
          `integracoes-br/${category}/${integration}.mdx`,
          `integracoes/${category}/${integration}.md`,
          `integracoes/builtin-nodes/${integration}.md`
        ];
        
        const exists = possiblePaths.some(p => this.existingContent.has(p));
        
        if (!exists) {
          categoryGaps.push({
            category,
            integration,
            priority: info.priority || 'medium',
            type: 'missing_brazilian',
            suggestedPath: possiblePaths[0]
          });
        }
      }
      
      if (categoryGaps.length > 0) {
        this.gaps.push({
          section: `integracoes-br-${category}`,
          priority: info.priority || 'medium',
          description: `Integrações brasileiras - ${category}`,
          gaps: categoryGaps
        });
      }
    }
    
    console.log(`   ✅ Identificadas lacunas em integrações brasileiras`);
  }

  mapEnglishToPortuguese(section, page) {
    const mappings = {
      'getting-started': 'tutorial-basico',
      'using-n8n': 'usando-n8n',
      'integrations': 'integracoes',
      'hosting': 'hosting-n8n',
      'data': 'logica-e-dados/02-data',
      'flow-logic': 'logica-e-dados/01-flow-logic',
      'advanced-ai': 'advanced-ai',
      'api': 'api',
      'embed': 'embed',
      'community': 'comunidade'
    };
    
    const pageMapping = {
      'quickstarts': 'quickstart-rapido',
      'introduction': 'conceitos-basicos',
      'choose-your-n8n': 'instalacao',
      'video-courses': 'cursos-em-video',
      'text-courses': 'cursos-em-texto',
      'editor-ui': 'interface/navegacao-editor-ui',
      'executions': 'execucoes',
      'builtin-nodes': 'builtin-nodes',
      'app-nodes': 'app-nodes',
      'trigger-nodes': 'trigger-nodes',
      'community-nodes': 'community-nodes',
      'creating-nodes': 'criar-nodes'
    };
    
    const mappedSection = mappings[section] || section;
    const mappedPage = pageMapping[page] || page;
    
    return `${mappedSection}/${mappedPage}.md`;
  }

  generateRecommendations() {
    console.log('💡 Gerando recomendações...');
    
    // Agrupar por prioridade
    const criticalGaps = this.gaps.filter(g => g.priority === 'critical');
    const highGaps = this.gaps.filter(g => g.priority === 'high');
    const mediumGaps = this.gaps.filter(g => g.priority === 'medium');
    
    // Recomendações críticas
    if (criticalGaps.length > 0) {
      this.recommendations.push({
        priority: 'critical',
        title: 'Conteúdo Crítico Faltante',
        description: `${criticalGaps.length} seções críticas precisam ser criadas`,
        action: 'Criar imediatamente - essencial para usuários básicos',
        sections: criticalGaps.map(g => g.section)
      });
    }
    
    // Recomendações de alta prioridade
    if (highGaps.length > 0) {
      this.recommendations.push({
        priority: 'high',
        title: 'Conteúdo Importante Faltante',
        description: `${highGaps.length} seções importantes precisam ser criadas`,
        action: 'Criar em seguida - importante para usuários avançados',
        sections: highGaps.map(g => g.section)
      });
    }
    
    // Conteúdo incompleto
    const incompleteCount = this.gaps.reduce((count, section) => {
      return count + section.gaps.filter(g => g.type === 'incomplete').length;
    }, 0);
    
    if (incompleteCount > 0) {
      this.recommendations.push({
        priority: 'medium',
        title: 'Conteúdo Incompleto',
        description: `${incompleteCount} páginas estão incompletas`,
        action: 'Completar conteúdo existente antes de criar novo',
        type: 'completion'
      });
    }
    
    // Integrações brasileiras
    const brazilianGaps = this.gaps.filter(g => g.section.includes('integracoes-br'));
    if (brazilianGaps.length > 0) {
      this.recommendations.push({
        priority: 'high',
        title: 'Integrações Brasileiras',
        description: `${brazilianGaps.length} categorias de integrações brasileiras faltantes`,
        action: 'Criar diferencial competitivo para mercado brasileiro',
        type: 'brazilian_specific'
      });
    }
    
    console.log(`   ✅ Geradas ${this.recommendations.length} recomendações`);
  }

  presentResults() {
    console.log('\n📊 **ANÁLISE DE LACUNAS DE CONTEÚDO**\n');
    
    // Estatísticas gerais
    const totalGaps = this.gaps.reduce((sum, section) => sum + section.gaps.length, 0);
    const criticalGaps = this.gaps.filter(g => g.priority === 'critical').length;
    const highGaps = this.gaps.filter(g => g.priority === 'high').length;
    
    console.log('📈 **Estatísticas Gerais:**');
    console.log(`   📄 Arquivos existentes: ${this.existingContent.size}`);
    console.log(`   ❌ Lacunas identificadas: ${totalGaps}`);
    console.log(`   🔴 Críticas: ${criticalGaps}`);
    console.log(`   🟠 Alta prioridade: ${highGaps}`);
    
    // Lacunas por seção
    console.log('\n🔍 **Lacunas por Seção:**');
    this.gaps.forEach(section => {
      const emoji = section.priority === 'critical' ? '🔴' : 
                   section.priority === 'high' ? '🟠' : '🟡';
      console.log(`   ${emoji} **${section.section}** (${section.gaps.length} lacunas)`);
      console.log(`      ${section.description}`);
      
      section.gaps.slice(0, 3).forEach(gap => {
        const type = gap.type === 'missing' ? '❌ Faltante' : 
                    gap.type === 'incomplete' ? '⚠️ Incompleto' : '🇧🇷 BR Específico';
        console.log(`      • ${type}: ${gap.page || gap.integration}`);
      });
      
      if (section.gaps.length > 3) {
        console.log(`      ... e mais ${section.gaps.length - 3} lacunas`);
      }
      console.log('');
    });
    
    // Recomendações
    console.log('💡 **Recomendações Prioritárias:**');
    this.recommendations.forEach((rec, index) => {
      const emoji = rec.priority === 'critical' ? '🔴' : 
                   rec.priority === 'high' ? '🟠' : '🟡';
      console.log(`   ${emoji} **${rec.title}**`);
      console.log(`      ${rec.description}`);
      console.log(`      ➡️  ${rec.action}\n`);
    });
    
    // Próximos passos
    console.log('🎯 **Próximos Passos Recomendados:**');
    console.log('   1. Foque primeiro no conteúdo CRÍTICO');
    console.log('   2. Complete páginas incompletas antes de criar novas');
    console.log('   3. Priorize integrações brasileiras para diferencial');
    console.log('   4. Use este relatório para criar issues específicas');
    console.log('   5. Estabeleça cronograma de criação de conteúdo');
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
      
      console.log('\n🚀 Criando issues baseadas na análise de lacunas...');
      
      // Issue principal com relatório completo
      const reportBody = this.generateReportMarkdown();
      
      const { data: mainIssue } = await octokit.rest.issues.create({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        title: `🔍 Análise de Lacunas de Conteúdo - ${new Date().toISOString().split('T')[0]}`,
        body: reportBody,
        labels: ['📝 Documentação', '🔍 Auditoria', '📊 Análise', '📋 Planejamento']
      });
      
      console.log(`  ✅ Issue principal criada: ${mainIssue.html_url}`);
      
      // Issues específicas para seções críticas
      const criticalSections = this.gaps.filter(g => g.priority === 'critical');
      
      for (const section of criticalSections) {
        const issueBody = this.generateSectionIssueBody(section);
        
        try {
          const { data: sectionIssue } = await octokit.rest.issues.create({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            title: `🔴 [CRÍTICO] Criar seção: ${section.section}`,
            body: issueBody,
            labels: ['📝 Documentação', '🔴 Crítica', '🆕 Criação', '📋 Epic']
          });
          
          console.log(`  ✅ Issue crítica criada: ${sectionIssue.html_url}`);
        } catch (error) {
          console.log(`  ❌ Erro ao criar issue para ${section.section}: ${error.message}`);
        }
      }
      
    } catch (error) {
      console.log(`❌ Erro ao criar issues: ${error.message}`);
    }
  }

  generateReportMarkdown() {
    const totalGaps = this.gaps.reduce((sum, section) => sum + section.gaps.length, 0);
    
    return `# 🔍 Análise de Lacunas de Conteúdo

## 📊 Resumo Executivo
- **Arquivos existentes:** ${this.existingContent.size}
- **Lacunas identificadas:** ${totalGaps}
- **Seções com lacunas:** ${this.gaps.length}

## 🎯 Recomendações Prioritárias
${this.recommendations.map(rec => `
### ${rec.priority === 'critical' ? '🔴' : rec.priority === 'high' ? '🟠' : '🟡'} ${rec.title}
**Descrição:** ${rec.description}
**Ação:** ${rec.action}
`).join('\n')}

## 📋 Lacunas Detalhadas
${this.gaps.map(section => `
### ${section.priority === 'critical' ? '🔴' : section.priority === 'high' ? '🟠' : '🟡'} ${section.section}
**Descrição:** ${section.description}
**Lacunas:** ${section.gaps.length}

${section.gaps.map(gap => `- ${gap.type === 'missing' ? '❌' : gap.type === 'incomplete' ? '⚠️' : '🇧🇷'} ${gap.page || gap.integration}`).join('\n')}
`).join('\n')}

---
*Análise gerada automaticamente em ${new Date().toLocaleString('pt-BR')}*`;
  }

  generateSectionIssueBody(section) {
    return `## 🎯 Objetivo
Criar conteúdo completo para a seção **${section.section}** identificada como ${section.priority.toUpperCase()} na análise de lacunas.

## 📋 Conteúdo Faltante
${section.gaps.map(gap => `- [ ] **${gap.page || gap.integration}** ${gap.type === 'incomplete' ? '(incompleto)' : '(faltante)'}`).join('\n')}

## 📝 Descrição
${section.description}

## ✅ Critérios de Aceitação
- [ ] Todo conteúdo listado criado
- [ ] Conteúdo testado e funcional
- [ ] Linguagem clara e didática
- [ ] Exemplos práticos incluídos
- [ ] Navegação funcionando

## 🎯 Impacto
**${section.priority.toUpperCase()}** - ${section.priority === 'critical' ? 'Essencial para funcionamento básico' : 'Importante para experiência completa'}

## 📊 Prioridade
Esta seção foi identificada como **${section.priority}** na análise automática de lacunas de conteúdo.`;
  }
}

// Função principal
async function main() {
  try {
    const analyzer = new ContentGapAnalyzer();
    const results = await analyzer.analyzeGaps();
    
    // Criar issues se solicitado
    if (process.argv.includes('--create-issues')) {
      await analyzer.createGitHubIssues();
    } else {
      console.log('\n💡 Para criar issues automaticamente, execute:');
      console.log('   node scripts/analyze-content-gaps.js --create-issues');
    }
    
    // Salvar relatório em arquivo
    if (process.argv.includes('--save-report')) {
      const reportPath = path.join(__dirname, '..', 'content-gaps-report.md');
      fs.writeFileSync(reportPath, analyzer.generateReportMarkdown());
      console.log(`\n📄 Relatório salvo em: ${reportPath}`);
    }
    
  } catch (error) {
    console.error('❌ Erro durante análise:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { ContentGapAnalyzer };