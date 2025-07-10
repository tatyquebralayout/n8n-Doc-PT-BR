import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import BlogCard from '@site/src/components/BlogCard';
import IonicIcon from '@site/src/components/IonicIcon';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  author: string;
  tags?: string[];
  image?: string;
  featured?: boolean;
  slug: string;
}

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps): JSX.Element {
  if (posts.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <IonicIcon name="megaphone-outline" className={styles.emptyStateIcon} />
          <h2 className={styles.emptyStateTitle}>Nenhuma notícia encontrada</h2>
          <p className={styles.emptyStateDescription}>
            Ainda não temos notícias publicadas. Fique atento às próximas atualizações!
          </p>
        </div>
      </div>
    );
  }

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className={styles.container}>
      {featuredPosts.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Destaques</h2>
          <div className={styles.featuredGrid}>
            {featuredPosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                {...post}
              />
            ))}
          </div>
        </section>
      )}

      {regularPosts.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Todas as Notícias</h2>
          <div className={styles.grid}>
            {regularPosts.map((post) => (
              <BlogCard
                key={post.slug}
                {...post}
              />
            ))}
          </div>
        </section>
      )}

      <div className={styles.contributionSection}>
        <h3 className={styles.contributionTitle}>Participe da Comunidade</h3>
        <p className={styles.contributionDescription}>
          Quer contribuir com notícias ou sugestões? Junte-se à nossa comunidade e ajude a construir o futuro da automação no Brasil.
        </p>
        <Link to="/docs/contribuir/esta-documentacao/como-contribuir" className={styles.contributionButton}>
          Como Contribuir
          <IonicIcon name="arrow-forward" className={styles.contributionButtonIcon} />
        </Link>
      </div>
    </div>
  );
} 