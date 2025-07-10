import React, { useState, useMemo } from 'react';
import styles from './styles.module.css';

interface Integration {
  name: string;
  category: string;
  description: string;
  type: 'popular' | 'new' | 'brazilian' | 'all';
  users?: string;
}

const integrations: Integration[] = [
  // IA e Machine Learning
  { name: 'OpenAI', category: 'IA e Machine Learning', description: 'GPT, DALL-E, Whisper', type: 'new' },
  { name: 'Google AI', category: 'IA e Machine Learning', description: 'Vertex AI, Gemini', type: 'new' },
  { name: 'Azure AI', category: 'IA e Machine Learning', description: 'Cognitive Services', type: 'all' },
  { name: 'Anthropic', category: 'IA e Machine Learning', description: 'Claude', type: 'new' },
  { name: 'Hugging Face', category: 'IA e Machine Learning', description: 'Modelos customizados', type: 'new' },
  { name: 'LangChain', category: 'IA e Machine Learning', description: 'Frameworks de IA', type: 'new' },
  { name: 'Pinecone', category: 'IA e Machine Learning', description: 'Vector databases', type: 'new' },

  // Comunicação e Chat
  { name: 'Slack', category: 'Comunicação e Chat', description: 'Mensagens, canais, webhooks', type: 'popular', users: '15.2k' },
  { name: 'Discord', category: 'Comunicação e Chat', description: 'Servidores, bots, notificações', type: 'all' },
  { name: 'Microsoft Teams', category: 'Comunicação e Chat', description: 'Chat, reuniões, arquivos', type: 'all' },
  { name: 'Telegram', category: 'Comunicação e Chat', description: 'Bots, mensagens, grupos', type: 'all' },
  { name: 'WhatsApp Business', category: 'Comunicação e Chat', description: 'API oficial', type: 'all' },
  { name: 'Gmail', category: 'Comunicação e Chat', description: 'Email e automação', type: 'popular', users: '12.8k' },
  { name: 'SMS', category: 'Comunicação e Chat', description: 'Twilio, AWS SNS', type: 'all' },

  // Análise de Dados e BI
  { name: 'Google Analytics', category: 'Análise de Dados e BI', description: 'Métricas web', type: 'all' },
  { name: 'Tableau', category: 'Análise de Dados e BI', description: 'Dashboards e relatórios', type: 'all' },
  { name: 'Power BI', category: 'Análise de Dados e BI', description: 'Análise de dados', type: 'all' },
  { name: 'Looker', category: 'Análise de Dados e BI', description: 'Business intelligence', type: 'all' },
  { name: 'Mixpanel', category: 'Análise de Dados e BI', description: 'Analytics de produto', type: 'all' },

  // E-commerce e Vendas
  { name: 'Shopify', category: 'E-commerce e Vendas', description: 'Loja online completa', type: 'all' },
  { name: 'WooCommerce', category: 'E-commerce e Vendas', description: 'E-commerce WordPress', type: 'all' },
  { name: 'Magento', category: 'E-commerce e Vendas', description: 'Plataforma enterprise', type: 'all' },
  { name: 'Salesforce', category: 'E-commerce e Vendas', description: 'CRM e vendas', type: 'all' },
  { name: 'HubSpot', category: 'E-commerce e Vendas', description: 'Marketing e vendas', type: 'all' },

  // Marketing e Email
  { name: 'Mailchimp', category: 'Marketing e Email', description: 'Email marketing', type: 'all' },
  { name: 'ConvertKit', category: 'Marketing e Email', description: 'Marketing para criadores', type: 'all' },
  { name: 'ActiveCampaign', category: 'Marketing e Email', description: 'Automação de marketing', type: 'all' },
  { name: 'SendGrid', category: 'Marketing e Email', description: 'Email transacional', type: 'all' },

  // Cloud e Infraestrutura
  { name: 'AWS', category: 'Cloud e Infraestrutura', description: 'Amazon Web Services', type: 'all' },
  { name: 'Google Cloud', category: 'Cloud e Infraestrutura', description: 'GCP services', type: 'all' },
  { name: 'Microsoft Azure', category: 'Cloud e Infraestrutura', description: 'Cloud Microsoft', type: 'all' },
  { name: 'DigitalOcean', category: 'Cloud e Infraestrutura', description: 'Cloud hosting', type: 'all' },

  // Bancos de Dados
  { name: 'PostgreSQL', category: 'Bancos de Dados', description: 'Banco relacional', type: 'all' },
  { name: 'MySQL', category: 'Bancos de Dados', description: 'Banco de dados open source', type: 'all' },
  { name: 'MongoDB', category: 'Bancos de Dados', description: 'Banco NoSQL', type: 'all' },
  { name: 'Redis', category: 'Bancos de Dados', description: 'Cache e sessões', type: 'all' },
  { name: 'Supabase', category: 'Bancos de Dados', description: 'Backend as a Service', type: 'all' },

  // Produtividade e Colaboração
  { name: 'Notion', category: 'Produtividade e Colaboração', description: 'Workspace colaborativo', type: 'all' },
  { name: 'Airtable', category: 'Produtividade e Colaboração', description: 'Banco de dados visual', type: 'all' },
  { name: 'Trello', category: 'Produtividade e Colaboração', description: 'Gestão de projetos', type: 'all' },
  { name: 'Asana', category: 'Produtividade e Colaboração', description: 'Gestão de tarefas', type: 'all' },
  { name: 'Google Sheets', category: 'Produtividade e Colaboração', description: 'Planilhas e dados', type: 'popular', users: '11.5k' },

  // Armazenamento e Arquivos
  { name: 'Google Drive', category: 'Armazenamento e Arquivos', description: 'Armazenamento Google', type: 'all' },
  { name: 'Dropbox', category: 'Armazenamento e Arquivos', description: 'Sincronização de arquivos', type: 'all' },
  { name: 'OneDrive', category: 'Armazenamento e Arquivos', description: 'Microsoft cloud storage', type: 'all' },
  { name: 'AWS S3', category: 'Armazenamento e Arquivos', description: 'Object storage', type: 'all' },

  // Mídia e Conteúdo
  { name: 'YouTube', category: 'Mídia e Conteúdo', description: 'Vídeos e canais', type: 'all' },
  { name: 'Spotify', category: 'Mídia e Conteúdo', description: 'Música e podcasts', type: 'all' },
  { name: 'Instagram', category: 'Mídia e Conteúdo', description: 'Redes sociais', type: 'all' },
  { name: 'Canva', category: 'Mídia e Conteúdo', description: 'Design gráfico', type: 'all' },
  { name: 'Figma', category: 'Mídia e Conteúdo', description: 'Design colaborativo', type: 'all' },

  // Financeiro e Pagamentos
  { name: 'Stripe', category: 'Financeiro e Pagamentos', description: 'Processamento de pagamentos', type: 'all' },
  { name: 'PayPal', category: 'Financeiro e Pagamentos', description: 'Pagamentos online', type: 'all' },
  { name: 'Square', category: 'Financeiro e Pagamentos', description: 'Pagamentos móveis', type: 'all' },
  { name: 'Mercado Pago', category: 'Financeiro e Pagamentos', description: 'Pagamentos Brasil', type: 'brazilian' },

  // Serviços Brasileiros
  { name: 'PIX', category: 'Serviços Brasileiros', description: 'Pagamentos instantâneos', type: 'brazilian' },
  { name: 'NFe', category: 'Serviços Brasileiros', description: 'Nota fiscal eletrônica', type: 'brazilian' },
  { name: 'Receita Federal', category: 'Serviços Brasileiros', description: 'Consultas CNPJ/CPF', type: 'brazilian' },
  { name: 'Correios', category: 'Serviços Brasileiros', description: 'Rastreamento e fretes', type: 'brazilian' },
  { name: 'ViaCEP', category: 'Serviços Brasileiros', description: 'Consulta de CEPs', type: 'brazilian' },
  { name: 'Serasa', category: 'Serviços Brasileiros', description: 'Consultas de crédito', type: 'brazilian' },
  { name: 'Banco Central', category: 'Serviços Brasileiros', description: 'APIs oficiais', type: 'brazilian' },

  // Desenvolvimento e DevOps
  { name: 'GitHub', category: 'Desenvolvimento e DevOps', description: 'Controle de versão', type: 'all' },
  { name: 'GitLab', category: 'Desenvolvimento e DevOps', description: 'DevOps platform', type: 'all' },
  { name: 'Bitbucket', category: 'Desenvolvimento e DevOps', description: 'Git hosting', type: 'all' },
  { name: 'Docker', category: 'Desenvolvimento e DevOps', description: 'Containerização', type: 'all' },
  { name: 'Jira', category: 'Desenvolvimento e DevOps', description: 'Gestão de projetos', type: 'all' },

  // Monitoramento e Analytics
  { name: 'Grafana', category: 'Monitoramento e Analytics', description: 'Visualização de dados', type: 'all' },
  { name: 'Prometheus', category: 'Monitoramento e Analytics', description: 'Monitoramento', type: 'all' },
  { name: 'Datadog', category: 'Monitoramento e Analytics', description: 'Observabilidade', type: 'all' },
  { name: 'Sentry', category: 'Monitoramento e Analytics', description: 'Error tracking', type: 'all' },

  // Core Nodes
  { name: 'HTTP Request', category: 'Core Nodes', description: 'Requisições customizadas', type: 'popular', users: '10.9k' },
  { name: 'Webhook', category: 'Core Nodes', description: 'Triggers externos', type: 'popular', users: '9.7k' },
  { name: 'Code', category: 'Core Nodes', description: 'Execução de código', type: 'all' },
  { name: 'Function', category: 'Core Nodes', description: 'Funções customizadas', type: 'all' },
];

const IntegrationSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'new' | 'brazilian'>('all');

  const filteredIntegrations = useMemo(() => {
    let filtered = integrations;

    // Aplicar filtro
    if (activeFilter !== 'all') {
      filtered = filtered.filter(integration => integration.type === activeFilter);
    }

    // Aplicar busca
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(integration =>
        integration.name.toLowerCase().includes(term) ||
        integration.category.toLowerCase().includes(term) ||
        integration.description.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [searchTerm, activeFilter]);

  const handleFilterClick = (filter: 'all' | 'popular' | 'new' | 'brazilian') => {
    setActiveFilter(filter);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Buscar integrações..."
          className={styles.integrationSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={styles.searchFilters}>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            Todas
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'popular' ? styles.active : ''}`}
            onClick={() => handleFilterClick('popular')}
          >
            Populares
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'new' ? styles.active : ''}`}
            onClick={() => handleFilterClick('new')}
          >
            Novas
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'brazilian' ? styles.active : ''}`}
            onClick={() => handleFilterClick('brazilian')}
          >
            Brasileiras
          </button>
        </div>
      </div>

      <div className={styles.resultsSection}>
        {searchTerm || activeFilter !== 'all' ? (
          <>
            <h3 className={styles.resultsTitle}>
              {filteredIntegrations.length} integração{filteredIntegrations.length !== 1 ? 'ões' : ''} encontrada{filteredIntegrations.length !== 1 ? 's' : ''}
              {searchTerm && ` para "${searchTerm}"`}
              {activeFilter !== 'all' && ` (${activeFilter === 'popular' ? 'Populares' : activeFilter === 'new' ? 'Novas' : 'Brasileiras'})`}
            </h3>
            
            {filteredIntegrations.length > 0 ? (
              <div className={styles.integrationsGrid}>
                {filteredIntegrations.map((integration, index) => (
                  <div key={index} className={styles.integrationCard}>
                    <div className={styles.integrationHeader}>
                      <h4 className={styles.integrationName}>{integration.name}</h4>
                      {integration.users && (
                        <span className={styles.userCount}>{integration.users}</span>
                      )}
                    </div>
                    <p className={styles.integrationCategory}>{integration.category}</p>
                    <p className={styles.integrationDescription}>{integration.description}</p>
                    <div className={styles.integrationType}>
                      <span className={`${styles.typeBadge} ${styles[integration.type]}`}>
                        {integration.type === 'popular' ? 'Popular' : 
                         integration.type === 'new' ? 'Nova' : 
                         integration.type === 'brazilian' ? 'Brasileira' : 'Geral'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <p>Nenhuma integração encontrada.</p>
                <p>Tente ajustar os filtros ou termos de busca.</p>
              </div>
            )}
          </>
        ) : (
          <div className={styles.initialState}>
            <p>Digite um termo de busca ou selecione um filtro para encontrar integrações.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegrationSearch; 