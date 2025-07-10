import React from 'react';
import Layout from '@theme/Layout';
import BlogHero from '@site/src/components/BlogHero';
import BlogGrid from '@site/src/components/BlogGrid';

// Dados das notícias da comunidade
const communityNews = [
  {
    title: '🎉 1000+ Estrelas no GitHub!',
    description: 'A comunidade n8n Brasil alcançou um marco importante com mais de 1000 estrelas no repositório oficial.',
    date: '15 de Janeiro, 2024',
    author: 'Equipe n8n Brasil',
    tags: ['comunidade', 'marco', 'github'],
    featured: true,
    slug: '/blog/1000-estrelas-github'
  },
  {
    title: '🤝 Nova Parceria: n8n + Startup Brasil',
    description: 'Anunciamos uma parceria estratégica para democratizar a automação entre startups brasileiras.',
    date: '20 de Janeiro, 2024',
    author: 'Equipe n8n Brasil',
    tags: ['parceria', 'startup', 'anúncio'],
    featured: true,
    slug: '/blog/parceria-startup-brasil'
  },
  {
    title: '📈 Progresso da Documentação - Janeiro 2024',
    description: 'Confira os avanços na tradução e localização da documentação do n8n para português brasileiro.',
    date: '25 de Janeiro, 2024',
    author: 'Equipe n8n Brasil',
    tags: ['progresso', 'documentação', 'tradução'],
    featured: false,
    slug: '/blog/progresso-documentacao-janeiro-2024'
  },
  {
    title: '💭 Reflexão: O Futuro da Automação no Brasil',
    description: 'Nossas reflexões sobre como a automação pode transformar empresas brasileiras nos próximos anos.',
    date: '30 de Janeiro, 2024',
    author: 'Equipe n8n Brasil',
    tags: ['reflexão', 'futuro', 'automação'],
    featured: false,
    slug: '/blog/reflexao-futuro-automacao-brasil'
  },
  {
    title: '🎯 Meta Atingida: 50 Contribuidores Ativos',
    description: 'Celebramos o alcance de 50 contribuidores ativos na comunidade n8n Brasil.',
    date: '5 de Fevereiro, 2024',
    author: 'Equipe n8n Brasil',
    tags: ['comunidade', 'meta', 'contribuidores'],
    featured: false,
    slug: '/blog/meta-50-contribuidores'
  },
  {
    title: '📢 Anúncio: Novo Canal no Discord',
    description: 'Criamos um canal dedicado para discussões sobre integrações brasileiras no Discord.',
    date: '10 de Fevereiro, 2024',
    author: 'Equipe n8n Brasil',
    tags: ['anúncio', 'discord', 'comunidade'],
    featured: false,
    slug: '/blog/novo-canal-discord'
  }
];

export default function Blog(): JSX.Element {
  return (
    <Layout
      title="Notícias - n8n Brasil"
      description="Fique por dentro das novidades, progressos e anúncios da comunidade n8n Brasil"
    >
      <BlogHero
        title="Notícias da Comunidade"
        description="Fique por dentro dos progressos, anúncios e reflexões da comunidade n8n Brasil."
        stats={{
          posts: communityNews.length,
          authors: 3,
          tags: 12
        }}
      />
      
      <main>
        <BlogGrid posts={communityNews} />
      </main>
    </Layout>
  );
} 