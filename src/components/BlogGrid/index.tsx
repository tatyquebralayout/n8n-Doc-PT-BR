import React from 'react';
import clsx from 'clsx';
import BlogCard from '../BlogCard';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  authors: Array<{
    name: string;
    url?: string;
    image_url?: string;
  }>;
  tags: string[];
  readingTime?: string;
  image?: string;
  slug: string;
  featured?: boolean;
}

interface BlogGridProps {
  posts: BlogPost[];
  title?: string;
  subtitle?: string;
  showFeatured?: boolean;
  maxPosts?: number;
  className?: string;
}

export default function BlogGrid({
  posts,
  title,
  subtitle,
  showFeatured = true,
  maxPosts,
  className,
}: BlogGridProps): JSX.Element {
  const featuredPosts = showFeatured ? posts.filter(post => post.featured) : [];
  const regularPosts = posts.filter(post => !post.featured);
  
  const displayPosts = maxPosts ? posts.slice(0, maxPosts) : posts;
  const displayFeaturedPosts = showFeatured ? featuredPosts.slice(0, 2) : [];
  const displayRegularPosts = maxPosts 
    ? regularPosts.slice(0, maxPosts - displayFeaturedPosts.length)
    : regularPosts;

  return (
    <section className={clsx(styles.blogGrid, className)}>
      {(title || subtitle) && (
        <div className={styles.sectionHeader}>
          {title && <h2 className={styles.sectionTitle}>{title}</h2>}
          {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
        </div>
      )}
      
      {showFeatured && displayFeaturedPosts.length > 0 && (
        <div className={styles.featuredSection}>
          <h3 className={styles.featuredTitle}>Artigos em Destaque</h3>
          <div className={styles.featuredGrid}>
            {displayFeaturedPosts.map((post) => (
              <BlogCard
                key={post.slug}
                {...post}
                featured={true}
              />
            ))}
          </div>
        </div>
      )}
      
      {displayRegularPosts.length > 0 && (
        <div className={styles.regularSection}>
          {showFeatured && displayFeaturedPosts.length > 0 && (
            <h3 className={styles.regularTitle}>Todos os Artigos</h3>
          )}
          <div className={styles.regularGrid}>
            {displayRegularPosts.map((post) => (
              <BlogCard
                key={post.slug}
                {...post}
              />
            ))}
          </div>
        </div>
      )}
      
      {displayPosts.length === 0 && (
                 <div className={styles.emptyState}>
           <div className={styles.emptyIcon}>
             <IonicIcon name="newspaper-outline" />
           </div>
          <h3 className={styles.emptyTitle}>Nenhum artigo encontrado</h3>
          <p className={styles.emptyDescription}>
            Em breve teremos novos artigos para você!
          </p>
        </div>
      )}
    </section>
  );
} 