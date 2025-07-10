import React from 'react';
import Layout from '@theme/Layout';
import BlogHero from '@site/src/components/BlogHero';
import BlogGrid from '@site/src/components/BlogGrid';
import IonicIcon from '@site/src/components/IonicIcon';

// Dados reais dos posts do blog
const blogPosts = [
  {
    title: 'Bem-vindo ao Blog n8n Brasil! 🇧🇷',
    description: 'Olá, comunidade n8n! É com grande satisfação que inauguramos o Blog n8n Brasil, um espaço dedicado a compartilhar conhecimento, experiências e novidades sobre automação de workflows no Brasil.',
    date: '2024-01-15',
    authors: [
      {
        name: 'Tatiana Barros',
        url: 'https://github.com/tatyquebralayout',
        image_url: 'https://github.com/tatyquebralayout.png',
      },
      {
        name: 'Carlos de Lima Junior',
        url: 'https://github.com/CJBiohacker',
        image_url: 'https://github.com/CJBiohacker.png',
      },
    ],
    tags: ['comunidade', 'n8n', 'brasil'],
    readingTime: '5 min de leitura',
    slug: 'bem-vindo-ao-blog-n8n-brasil',
    featured: true,
    image: '/img/blog/welcome-blog.jpg',
  },
  {
    title: 'Guia Completo: Como Instalar n8n no Brasil 🇧🇷',
    description: 'Instalar o n8n no Brasil pode ser um desafio devido às particularidades da nossa infraestrutura e regulamentações. Neste guia, vamos cobrir as melhores práticas e soluções específicas para o contexto brasileiro.',
    date: '2024-01-20',
    authors: [
      {
        name: 'Tatiana Barros',
        url: 'https://github.com/tatyquebralayout',
        image_url: 'https://github.com/tatyquebralayout.png',
      },
    ],
    tags: ['instalação', 'tutorial', 'docker', 'npm'],
    readingTime: '8 min de leitura',
    slug: 'guia-instalacao-n8n-brasil',
    featured: true,
  },
  {
    title: 'Caso de Uso: Automatizando Pagamentos PIX com n8n 💰',
    description: 'Neste artigo, vamos explorar um caso de uso real de como uma empresa brasileira automatizou seus pagamentos PIX usando n8n, reduzindo tempo manual e eliminando erros humanos.',
    date: '2024-01-25',
    authors: [
      {
        name: 'Carlos de Lima Junior',
        url: 'https://github.com/CJBiohacker',
        image_url: 'https://github.com/CJBiohacker.png',
      },
    ],
    tags: ['pix', 'automação', 'caso-uso', 'financeiro', 'webhook'],
    readingTime: '12 min de leitura',
    slug: 'caso-uso-pix-automacao',
  },
];

export default function BlogPage(): JSX.Element {
  return (
    <Layout
      title="Blog n8n Brasil"
      description="Artigos, tutoriais e novidades da comunidade n8n no Brasil"
    >
      <BlogHero
        title="Blog n8n Brasil"
        description="Artigos, tutoriais e novidades da comunidade n8n no Brasil. Compartilhamos conhecimento, experiências e casos de uso reais para democratizar a automação no Brasil."
        stats={{
          posts: blogPosts.length,
          authors: 2,
          tags: 12,
        }}
      />
      
      <main>
        <BlogGrid
          posts={blogPosts}
          title="Últimos Artigos"
          subtitle="Fique por dentro das novidades, tutoriais e casos de uso da comunidade n8n no Brasil"
          showFeatured={true}
        />
        
        <section style={{
          maxWidth: 'var(--ifm-container-width)',
          margin: '0 auto',
          padding: '4rem var(--ifm-spacing-horizontal)',
          textAlign: 'center',
          background: 'var(--ifm-color-emphasis-50)',
          marginTop: '4rem',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            margin: '0 0 1rem 0',
            color: 'var(--ifm-color-emphasis-900)',
          }}>
            Quer Contribuir?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: 'var(--ifm-color-emphasis-700)',
            margin: '0 0 2rem 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Tem uma experiência interessante com n8n? Compartilhe conosco! 
            Aceitamos artigos sobre casos de uso práticos, tutoriais técnicos e análises de integrações.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <a
              href="https://github.com/n8n-brasil/n8n-Doc-PT-BR/issues"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'var(--ifm-color-primary)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--ifm-color-primary-dark)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--ifm-color-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <IonicIcon name="logo-github" />
              Sugerir Artigo
            </a>
            <a
              href="https://github.com/n8n-brasil/n8n-Doc-PT-BR/discussions"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                color: 'var(--ifm-color-primary)',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                border: '2px solid var(--ifm-color-primary)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--ifm-color-primary)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--ifm-color-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <IonicIcon name="chatbubbles-outline" />
              Participar da Discussão
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
} 